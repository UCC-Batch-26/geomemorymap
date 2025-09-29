// This is where we connect to Cloudinary so our app knows
// where to send and grab pictures from
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    console.log('Cloudinary file.originalname:', file.originalname);
    console.log('Cloudinary file.mimetype:', file.mimetype);

    return {
      folder: 'geomemorymap',
      resource_type: 'image',
      //allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      public_id: `${Date.now()}-${path.parse(file.originalname).name}`,
    };
  },
});

export { cloudinary, storage };