import cloudinary from '../config/cloudinary';

/**
 * Upload an image to Cloudinary from a base64 data-URL (or remote URL) string.
 * Cloudinary handles optimization/resizing on upload, so no local processing is needed.
 * @param {string} base64Image - Base64 data URL (e.g. "data:image/png;base64,....") or a URL
 * @param {string} folder - Folder name in Cloudinary (default: 'blogs')
 * @returns {Promise<{url: string, publicId: string}>}
 */
export const uploadToCloudinary = async (base64Image, folder = 'blogs') => {
    try {
        if (!base64Image || typeof base64Image !== 'string') {
            throw new Error('Invalid image data');
        }

        const result = await cloudinary.uploader.upload(base64Image, {
            folder,
            resource_type: 'image',
            // Optimize + cap dimensions on Cloudinary's side (replaces the old sharp step)
            transformation: [
                { width: 1000, height: 1000, crop: 'limit' },
                { quality: 'auto', fetch_format: 'auto' },
            ],
        });

        return {
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Failed to upload image to Cloudinary');
    }
};

/**
 * Delete an image from Cloudinary by its public_id.
 * @param {string} publicId - Cloudinary public_id of the asset to delete
 * @returns {Promise<void>}
 */
export const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return;
        await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
    } catch (error) {
        // Don't throw — a failed cleanup shouldn't block the main operation
        console.error('Cloudinary delete error:', error);
    }
};

/**
 * Delete multiple images from Cloudinary.
 * @param {string[]} publicIds - Array of Cloudinary public_ids to delete
 * @returns {Promise<void>}
 */
export const deleteMultipleFromCloudinary = async (publicIds) => {
    try {
        if (!publicIds || publicIds.length === 0) return;
        await cloudinary.api.delete_resources(publicIds, { resource_type: 'image' });
    } catch (error) {
        console.error('Cloudinary delete multiple error:', error);
    }
};

/**
 * Best-effort extraction of a Cloudinary public_id from a secure URL.
 * Used as a fallback for blogs saved before we stored publicId explicitly.
 * @param {string} url - Cloudinary image URL
 * @returns {string|null}
 */
export const publicIdFromUrl = (url) => {
    try {
        if (!url || typeof url !== 'string') return null;
        // .../upload/v123456/folder/name.jpg  ->  folder/name
        const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
        return match ? match[1] : null;
    } catch {
        return null;
    }
};
