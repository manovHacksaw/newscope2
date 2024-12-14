import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
    _id: string,
  name: string;
  email: string;
  role: 'admin' | 'author' | 'reader';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['admin', 'author', 'reader'],
    default: 'reader',
  },
  avatar: {
    type: String,
  },
}, { 
  timestamps: true
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;

