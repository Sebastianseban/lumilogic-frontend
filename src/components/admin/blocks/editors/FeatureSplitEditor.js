import React from 'react';
import { AlignLeft, AlignRight } from 'lucide-react';
import { clsx } from 'clsx';
import ImageUploader from '@/components/admin/common/ImageUploader';

export default function FeatureSplitEditor({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Heading</label>
                    <input 
                        type="text" 
                        value={data.heading || ''} 
                        onChange={(e) => handleChange('heading', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea 
                        rows={6}
                        value={data.description || ''} 
                        onChange={(e) => handleChange('description', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
                    />
                </div>
           </div>
           
           <div className="space-y-4">
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Image Position</label>
                     <div className="flex gap-4">
                        <button 
                            type="button"
                            onClick={() => handleChange('imagePosition', 'left')}
                            className={clsx(
                                "flex-1 py-3 px-4 border rounded-md flex flex-col items-center justify-center gap-2 transition-all",
                                data.imagePosition === 'left' ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500" : "border-gray-200 hover:border-gray-300"
                            )}
                        >
                            <AlignLeft size={24} />
                            <span className="text-xs font-medium">Image Left</span>
                        </button>
                        <button 
                            type="button"
                            onClick={() => handleChange('imagePosition', 'right')}
                            className={clsx(
                                "flex-1 py-3 px-4 border rounded-md flex flex-col items-center justify-center gap-2 transition-all",
                                (!data.imagePosition || data.imagePosition === 'right') ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500" : "border-gray-200 hover:border-gray-300"
                            )}
                        >
                            <AlignRight size={24} />
                            <span className="text-xs font-medium">Image Right</span>
                        </button>
                     </div>
                </div>

                <ImageUploader
                  label="Feature Image"
                  value={data.image || ''}
                  onChange={(url) => handleChange('image', url)}
                  aspectRatio="4/3"
                  maxSizeMB={10}
                />
           </div>
       </div>
    </div>
  );
}

