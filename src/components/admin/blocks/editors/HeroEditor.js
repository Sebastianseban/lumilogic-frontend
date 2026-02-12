import React from 'react';
import { Upload } from 'lucide-react';

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
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
             {/* Preview placeholder */}
             <div className="mt-2 h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-sm">
                 Image Preview Area
             </div>
        </div>
      </div>
    </div>
  );
}
