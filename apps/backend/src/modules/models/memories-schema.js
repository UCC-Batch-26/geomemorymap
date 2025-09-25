import mongoose, { Schema } from 'mongoose';

const memorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: String,
    },
    media: [
      {
        url: String,
        type: {
          type: String,
          enum: ['image', 'video', 'audio'],
          default: 'image',
        },
      },
    ],
    tags: [String],
    dates: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const Memory = mongoose.model('Memory', memorySchema);
