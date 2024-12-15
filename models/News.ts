// models/News.ts

import mongoose, { Document, Schema, Model } from 'mongoose';

export interface INews extends Document {
  title: string;
  description: string;
  thumbnail: string;
  videoLink?: string;
  category: string;
  author: string; // Author as string (name)
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new Schema<INews>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    videoLink: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true, // Author is now a string
    },
  },
  {
    timestamps: true,
  }
);

const News: Model<INews> = mongoose.models.News || mongoose.model<INews>('News', newsSchema);

export default News;
