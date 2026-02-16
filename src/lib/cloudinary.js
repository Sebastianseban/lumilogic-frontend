import axios from 'axios';
import api from './api';

/**
 * Upload an image to Cloudinary using signed upload
 * @param {File} file - The image file to upload
 * @param {Function} onProgress - Optional callback for upload progress (0-100)
 * @returns {Promise<{url: string, publicId: string}>} - The uploaded image URL and public ID
 */
export const uploadImageToCloudinary = async (file, onProgress = null) => {
  try {
    // Step 1: Get signed upload parameters from backend
    const { data: signData } = await api.get('/uploads/sign');
    
    if (!signData.success) {
      throw new Error('Failed to get upload signature');
    }

    const { cloudName, apiKey, timestamp, folder, signature } = signData.data;

    // Step 2: Prepare form data for Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('folder', folder);

    // Step 3: Upload to Cloudinary
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    
    const { data: uploadResponse } = await axios.post(cloudinaryUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });

    // Step 4: Return the secure URL and public ID
    return {
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      width: uploadResponse.width,
      height: uploadResponse.height,
      format: uploadResponse.format,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    
    if (error.response) {
      throw new Error(
        error.response.data?.error?.message || 
        'Failed to upload image to Cloudinary'
      );
    } else if (error.request) {
      throw new Error('Network error: Unable to reach upload server');
    } else {
      throw new Error(error.message || 'Failed to upload image');
    }
  }
};

/**
 * Validate image file before upload
 * @param {File} file - The file to validate
 * @param {Object} options - Validation options
 * @returns {Object} - { valid: boolean, error: string }
 */
export const validateImageFile = (file, options = {}) => {
  const {
    maxSizeMB = 10,
    allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  } = options;

  // Check if file exists
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  // Check file type
  if (!allowedFormats.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${allowedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')}`,
    };
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxSizeMB}MB`,
    };
  }

  return { valid: true, error: null };
};
