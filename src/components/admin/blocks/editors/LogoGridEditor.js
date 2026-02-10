import React from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';

export default function LogoGridEditor({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleAddLogo = () => {
    const currentLogos = data.logos || [];
    handleChange('logos', [...currentLogos, { id: Date.now(), name: '', imageUrl: '' }]);
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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {(data.logos || []).map((logo, index) => (
                    <div key={logo.id || index} className="relative p-3 bg-gray-50 rounded-lg border border-gray-200 group">
                        <button 
                            onClick={() => handleDeleteLogo(index)}
                            className="absolute top-1 right-1 text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={14} />
                        </button>
                        
                        <div className="aspect-square bg-gray-200 rounded mb-2 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                             {logo.imageUrl ? (
                                 <img src={logo.imageUrl} alt={logo.name} className="w-full h-full object-contain" />
                             ) : (
                                 <Upload size={20} className="text-gray-400" />
                             )}
                        </div>

                        <input 
                            type="text" 
                            value={logo.name} 
                            onChange={(e) => handleUpdateLogo(index, 'name', e.target.value)}
                            className="block w-full border-none bg-transparent text-center text-xs font-medium focus:ring-0 p-0 placeholder-gray-400" 
                            placeholder="Client Name"
                        />
                    </div>
                ))}
            </div>
       </div>
    </div>
  );
}
