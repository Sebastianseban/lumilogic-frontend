/**
 * Example usage of ImageUploader component
 * This file demonstrates various ways to use the ImageUploader
 */

import React, { useState } from 'react';
import ImageUploader from '@/components/admin/common/ImageUploader';

export default function ImageUploaderExamples() {
  const [heroImage, setHeroImage] = useState('');
  const [logo, setLogo] = useState('');
  const [gallery, setGallery] = useState(['', '', '']);

  const handleGalleryChange = (index, url) => {
    const newGallery = [...gallery];
    newGallery[index] = url;
    setGallery(newGallery);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <h1 className="text-3xl font-bold text-gray-900">
        ImageUploader Component Examples
      </h1>

      {/* Example 1: Hero Image */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            1. Hero/Banner Image (16:9)
          </h2>
          <p className="text-sm text-gray-600">
            Wide format image perfect for hero sections
          </p>
        </div>
        
        <ImageUploader
          label="Hero Background Image"
          value={heroImage}
          onChange={setHeroImage}
          aspectRatio="16/9"
          maxSizeMB={10}
        />

        {heroImage && (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-800">
              ✓ Image uploaded successfully!
            </p>
            <p className="text-xs text-green-600 mt-1 break-all">
              URL: {heroImage}
            </p>
          </div>
        )}
      </section>

      {/* Example 2: Logo/Avatar */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            2. Logo/Avatar (Square 1:1)
          </h2>
          <p className="text-sm text-gray-600">
            Square format with limited file types and smaller size
          </p>
        </div>
        
        <div className="max-w-md">
          <ImageUploader
            label="Company Logo"
            value={logo}
            onChange={setLogo}
            aspectRatio="1/1"
            maxSizeMB={2}
            allowedFormats={['image/png', 'image/svg+xml', 'image/webp']}
          />
        </div>

        {logo && (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-800">
              ✓ Logo uploaded successfully!
            </p>
          </div>
        )}
      </section>

      {/* Example 3: Image Gallery */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            3. Image Gallery (Multiple Images)
          </h2>
          <p className="text-sm text-gray-600">
            Upload multiple images for a gallery
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gallery.map((image, index) => (
            <ImageUploader
              key={index}
              label={`Gallery Image ${index + 1}`}
              value={image}
              onChange={(url) => handleGalleryChange(index, url)}
              aspectRatio="4/3"
              maxSizeMB={5}
            />
          ))}
        </div>

        {gallery.some(img => img) && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              {gallery.filter(img => img).length} of {gallery.length} images uploaded
            </p>
          </div>
        )}
      </section>

      {/* Example 4: Integration in a Form */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            4. Integration in a Form
          </h2>
          <p className="text-sm text-gray-600">
            How to use ImageUploader within a typical form
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Description
              </label>
              <textarea
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                placeholder="Enter product description"
              />
            </div>

            <ImageUploader
              label="Product Image"
              value=""
              onChange={(url) => console.log('Product image:', url)}
              aspectRatio="1/1"
              maxSizeMB={5}
            />

            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Product
            </button>
          </form>
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Code Examples
        </h2>

        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
{`// Basic usage
<ImageUploader
  label="Background Image"
  value={data.image}
  onChange={(url) => setData({ ...data, image: url })}
/>

// With custom settings
<ImageUploader
  label="Logo"
  value={logo}
  onChange={setLogo}
  aspectRatio="1/1"
  maxSizeMB={2}
  allowedFormats={['image/png', 'image/svg+xml']}
/>

// In an editor component
const handleChange = (field, value) => {
  onChange({ ...data, [field]: value });
};

<ImageUploader
  label="Hero Image"
  value={data.heroImage || ''}
  onChange={(url) => handleChange('heroImage', url)}
  aspectRatio="16/9"
/>`}
          </pre>
        </div>
      </section>

      {/* Features List */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Drag and drop support',
            'Real-time upload progress',
            'Image preview with remove option',
            'File type validation',
            'File size validation',
            'Custom aspect ratios',
            'Responsive design',
            'Error handling with user feedback',
            'Direct Cloudinary upload',
            'Secure signed uploads',
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
