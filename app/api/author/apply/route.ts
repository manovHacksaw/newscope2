import { MongoClient } from 'mongodb';
import Grid from 'gridfs-stream';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Readable } from 'stream';
import { z } from 'zod';

// Improved type safety and validation
const ApplicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  bio: z.string().min(10, "Bio must be at least 10 characters")
});

let gfs: Grid.Grid;
let client: MongoClient;

async function connectMongo() {
  if (!client || !client.isConnected()) {
    client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017", { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    await client.connect();
  }
  const db = client.db(process.env.MONGODB_DATABASE || 'your_database');
  gfs = Grid(db, MongoClient);
  gfs.collection('fs');  // Default collection for GridFS
}

export async function POST(request: NextRequest) {
  console.log("Hitting api/author/apply");

  try {
    // Use formData instead of json() for file uploads
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const mobile = formData.get('mobile') as string;
    const bio = formData.get('bio') as string;
    const resume = formData.get('resume') as File;

    // Comprehensive input validation
    if (!resume) {
      return NextResponse.json({
        success: false,
        message: 'Resume file is required'
      }, { status: 400 });
    }

    // Validate inputs using Zod schema
    const validationResult = ApplicationSchema.safeParse({ 
      name, 
      email, 
      mobile, 
      bio 
    });

    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        errors: validationResult.error.errors
      }, { status: 400 });
    }

    // Ensure MongoDB connection
    await connectMongo();

    // Convert resume file to readable stream
    const fileBuffer = await resume.arrayBuffer();
    const fileStream = Readable.from([fileBuffer]);

    // Prepare the file metadata for GridFS
    const fileData = {
      filename: `${Date.now()}-${resume.name}`,
      content_type: resume.type,
      metadata: { 
        user: name,
        submissionDate: new Date()
      }
    };

    return new Promise<NextResponse>((resolve, reject) => {
      // Create write stream to upload file into MongoDB GridFS
      const writeStream = gfs.createWriteStream(fileData);
      
      writeStream.on('error', (error) => {
        console.error('File upload error:', error);
        reject(NextResponse.json({
          success: false,
          message: 'Failed to upload resume'
        }, { status: 500 }));
      });

      writeStream.on('close', async (file) => {
        console.log('File uploaded to MongoDB GridFS');

        try {
          // Prepare the email
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: process.env.NOTIFICATION_EMAIL || 'newscoope.in@gmail.com',
            subject: 'New Author Application',
            html: `
              <h2>New Author Application</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Mobile:</strong> ${mobile}</p>
              <p><strong>Bio:</strong> ${bio}</p>
              <p><strong>Resume:</strong> <a href="/files/${file._id}">View Resume</a></p>
            `
          };

          // Send the email notification
          await transporter.sendMail(mailOptions);

          resolve(NextResponse.json({
            success: true,
            message: 'Application submitted successfully',
            data: {
              name,
              email,
              mobile,
              resumePath: `/files/${file._id}` // URL to access file
            }
          }, { status: 200 }));

        } catch (emailError) {
          console.error('Email sending error:', emailError);
          resolve(NextResponse.json({
            success: false,
            message: 'Application received but failed to send notification'
          }, { status: 206 })); // Partial Content status
        }
      });

      // Pipe the file stream
      fileStream.pipe(writeStream);
    });

  } catch (error) {
    console.error('Error in author application:', error);

    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    }, { status: 500 });
  }
}

// Optional: Cleanup connection on server shutdown
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
});