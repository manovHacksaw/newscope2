import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Improved type safety and validation
const ApplicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  resume: z.string().url("Resume must be a valid URL"), // Ensures the resume is a valid URL
});

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming form data
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const mobile = formData.get('mobile') as string;
    const bio = formData.get('bio') as string;
    const resume = formData.get('resume') as string;

    // Validate inputs using Zod schema
    const validationResult = ApplicationSchema.safeParse({ name, email, mobile, bio, resume });

    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        errors: validationResult.error.errors,
      }, { status: 400 });
    }

    // Send email notification with the provided resume URL
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
        <p><strong>Resume:</strong> <a href="${resume}" target="_blank">View Resume</a></p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        name,
        email,
        mobile,
        bio,
        resume,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Error in author application:', error);

    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    }, { status: 500 });
  }
}
