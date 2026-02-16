import React from 'react';
import ImageUploader from '@/components/admin/common/ImageUploader';

export default function HeroEditor({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700">Heading</label>
            <input 
                type="text" 
                value={data.heading || ''} 
                onChange={(e) => handleChange('heading', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
                placeholder="e.g. Transform Your Business"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Subheading</label>
            <input 
                type="text" 
                value={data.subheading || ''} 
                onChange={(e) => handleChange('subheading', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
                placeholder="e.g. Cloud Migration Services"
            />
        </div>
        <div>
             <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
                rows={4}
                value={data.description || ''} 
                onChange={(e) => handleChange('description', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
                placeholder="Brief description of the value proposition..."
            />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">CTA Text</label>
                <input 
                    type="text" 
                    value={data.ctaText || ''} 
                    onChange={(e) => handleChange('ctaText', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
                    placeholder="Get Started"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">CTA Link</label>
                <input 
                    type="text" 
                    value={data.ctaLink || ''} 
                    onChange={(e) => handleChange('ctaLink', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
                    placeholder="/contact"
                />
            </div>
        </div>
      </div>

      <div className="space-y-4">
        <ImageUploader
          label="Background Image"
          value={data.backgroundImage || ''}
          onChange={(url) => handleChange('backgroundImage', url)}
          aspectRatio="16/9"
          maxSizeMB={10}
        />
      </div>
    </div>
  );
}
