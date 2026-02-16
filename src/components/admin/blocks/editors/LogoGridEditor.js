import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import ImageUploader from '@/components/admin/common/ImageUploader';

export default function LogoGridEditor({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleAddLogo = () => {
    const currentLogos = data.logos || [];
    handleChange('logos', [...currentLogos, { id: Date.now(), name: '', imageUrl: '', image: '' }]);
  };

  const handleUpdateLogo = (index, field, value) => {
     const newLogos = [...(data.logos || [])];
     newLogos[index] = { ...newLogos[index], [field]: value };
     handleChange('logos', newLogos);
  };

  const handleDeleteLogo = (index) => {
     const newLogos = [...(data.logos || [])];
     newLogos.splice(index, 1);
     handleChange('logos', newLogos);
  };

  return (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-700">Section Heading</label>
            <input 
                type="text" 
                value={data.heading || ''} 
                onChange={(e) => handleChange('heading', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
                placeholder="Trusted By"
            />
        </div>

       <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium text-gray-900">Logos</h4>
                <button 
                    type="button"
                    onClick={handleAddLogo}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                    <Plus size={16} />
                    Add Logo
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(data.logos || []).map((logo, index) => (
                    <div key={logo.id || index} className="relative p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <button 
                            onClick={() => handleDeleteLogo(index)}
                            className="absolute top-2 right-2 z-10 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                            title="Remove logo"
                        >
                            <Trash2 size={14} />
                        </button>
                        
                        <div className="space-y-3">
                            <input 
                                type="text" 
                                value={logo.name} 
                                onChange={(e) => handleUpdateLogo(index, 'name', e.target.value)}
                                className="block w-full border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 text-sm px-3 py-2 border" 
                                placeholder="Client Name"
                            />

                            <ImageUploader
                              value={logo.imageUrl || ''}
                              onChange={(url) => {
                                const newLogos = [...(data.logos || [])];
                                newLogos[index] = {
                                  ...newLogos[index],
                                  imageUrl: url,
                                  image: url,
                                };
                                handleChange('logos', newLogos);
                              }}
                              aspectRatio="1/1"
                              maxSizeMB={2}
                              allowedFormats={['image/png', 'image/svg+xml', 'image/webp']}
                            />
                        </div>
                    </div>
                ))}
            </div>
       </div>
    </div>
  );
}
