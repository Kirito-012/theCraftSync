import { s3, bucketName } from '../config/aws';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

/**
 * Upload image to AWS S3 from base64 string
 * @param {string} base64Image - Base64 encoded image string
 * @param {string} folder - Folder name in S3 bucket (default: 'products')
 * @returns {Promise<{url: string, key: string}>}
 */
export const uploadToS3 = async (base64Image, folder = 'products') => {
    try {
        // Check if base64Image is valid
        if (!base64Image || typeof base64Image !== 'string') {
            throw new Error('Invalid image data');
        }

        // Extract base64 data and convert to buffer
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');

        // Process image with Sharp (resize and optimize)
        const processedImage = await sharp(imageBuffer)
            .resize(1000, 1000, {
                fit: 'inside',
                withoutEnlargement: true,
            })
            .jpeg({ quality: 80 })
            .toBuffer();

        // Generate unique filename
        const timestamp = Date.now();
        const uniqueId = uuidv4();
        const filename = `${timestamp}-${uniqueId}.jpg`;
        const key = `${folder}/${filename}`;

        // Upload to S3
        const uploadParams = {
            Bucket: bucketName,
            Key: key,
            Body: processedImage,
            ContentType: 'image/jpeg',
        };

        const uploadResult = await s3.upload(uploadParams).promise();

        return {
            url: uploadResult.Location,
            key: uploadResult.Key,
        };
    } catch (error) {
        console.error('S3 upload error:', error);
        throw new Error('Failed to upload image to S3');
    }
};

/**
 * Delete image from S3
 * @param {string} key - S3 object key of the image to delete
 * @returns {Promise<void>}
 */
export const deleteFromS3 = async (key) => {
    try {
        const deleteParams = {
            Bucket: bucketName,
            Key: key,
        };

        await s3.deleteObject(deleteParams).promise();
    } catch (error) {
        console.error('S3 delete error:', error);
        throw new Error('Failed to delete image from S3');
    }
};

/**
 * Delete multiple images from S3
 * @param {string[]} keys - Array of S3 object keys to delete
 * @returns {Promise<void>}
 */
export const deleteMultipleFromS3 = async (keys) => {
    try {
        if (!keys || keys.length === 0) {
            return;
        }

        // S3 deleteObjects can handle up to 1000 objects per request
        const deleteParams = {
            Bucket: bucketName,
            Delete: {
                Objects: keys.map((key) => ({ Key: key })),
                Quiet: false,
            },
        };

        await s3.deleteObjects(deleteParams).promise();
    } catch (error) {
        console.error('S3 delete multiple error:', error);
        throw new Error('Failed to delete images from S3');
    }
};
