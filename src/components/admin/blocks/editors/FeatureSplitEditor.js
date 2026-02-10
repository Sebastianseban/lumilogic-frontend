import React from 'react';
import { Upload, AlignLeft, AlignRight } from 'lucide-react';
import { clsx } from 'clsx';

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
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea 
                        rows={6}
                        value={data.description || ''} 
                        onChange={(e) => handleChange('description', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
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

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Feature Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input type="file" className="sr-only" />
                        </label>
                        </div>
                    </div>
                    </div>
                </div>
           </div>
       </div>
    </div>
  );
}
