'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadImageToCloudinary, validateImageFile } from '@/lib/cloudinary';

export default function ImageUploader({ 
  value, 
  onChange, 
  label = 'Image',
  maxSizeMB = 10,
  allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  aspectRatio = null, // e.g., '16/9' for hero images
  className = ''
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Reset states
    setError('');
    setProgress(0);

    // Validate file
    const validation = validateImageFile(file, { maxSizeMB, allowedFormats });
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    try {
      setUploading(true);

      // Upload to Cloudinary
      const result = await uploadImageToCloudinary(file, (percent) => {
        setProgress(percent);
      });

      // Call onChange with the uploaded image URL
      onChange(result.url);
      setProgress(100);
    } catch (err) {
      setError(err.message || 'Upload failed');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    onChange('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Upload Area */}
      {!value && (
        <div
          onClick={handleClick}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative mt-1 flex justify-center px-6 pt-5 pb-6 
            border-2 border-dashed rounded-md cursor-pointer
            transition-all duration-200
            ${dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:bg-gray-50'
            }
            ${uploading ? 'pointer-events-none opacity-60' : ''}
          `}
        >
          <div className="space-y-2 text-center">
            {uploading ? (
              <>
                <Loader2 className="mx-auto h-12 w-12 text-blue-500 animate-spin" />
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Uploading... {progress}%</p>
                  <div className="mt-2 w-48 bg-gray-200 rounded-full h-2 mx-auto">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <span className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    Upload a file
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  {allowedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')} up to {maxSizeMB}MB
                </p>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            className="sr-only"
            accept={allowedFormats.join(',')}
            onChange={handleFileInputChange}
            disabled={uploading}
          />
        </div>
      )}

      {/* Preview */}
      {value && !uploading && (
        <div className="relative mt-2 rounded-md overflow-hidden border border-gray-300 bg-gray-50">
          <div 
            className="relative w-full bg-gray-100"
            style={{ 
              paddingBottom: aspectRatio ? `calc(100% / (${aspectRatio}))` : '50%' 
            }}
          >
            <img
              src={value}
              alt="Uploaded preview"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div 
              className="absolute inset-0 hidden items-center justify-center bg-gray-200"
            >
              <ImageIcon className="h-12 w-12 text-gray-400" />
            </div>
          </div>
          
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full 
                     hover:bg-red-600 transition-colors shadow-lg"
            title="Remove image"
          >
            <X size={16} />
          </button>

          {/* Image URL Display */}
          <div className="p-2 bg-white border-t border-gray-200">
            <p className="text-xs text-gray-500 truncate" title={value}>
              {value}
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
