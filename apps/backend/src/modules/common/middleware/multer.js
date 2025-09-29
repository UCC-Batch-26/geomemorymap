// This is where picture files people upload
// Think of it as the "middle" guy that takes a photo
// and passes it to Cloudinary
import { storage } from '#modules/config/cloudinary.js';
import multer from 'multer';

const upload = multer({
  storage,
  limits: {
    // 5 MB
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    //console.log('Mimetype received:', file.mimetype);

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error('Only JPEG, PNG, and WEBP images are allowed'), false);
    }
    callback(null, true); // let the photo through if everything's okay
  },
});

export default upload;
