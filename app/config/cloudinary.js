import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary. Supports either a single CLOUDINARY_URL
// (cloudinary://<api_key>:<api_secret>@<cloud_name>) or the individual vars.
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export default cloudinary;
