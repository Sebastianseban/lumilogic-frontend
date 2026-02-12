import React from 'react';
import { Plus, Trash2, GripVertical, Box } from 'lucide-react';

export default function ServicesGridEditor({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleAddService = () => {
    const currentServices = data.services || [];
    handleChange('services', [...currentServices, { id: Date.now(), title: '', description: '', icon: 'Box' }]);
  };

  const handleUpdateService = (index, field, value) => {
     const newServices = [...(data.services || [])];
     newServices[index] = { ...newServices[index], [field]: value };
     handleChange('services', newServices);
  };

  const handleDeleteService = (index) => {
     const newServices = [...(data.services || [])];
     newServices.splice(index, 1);
     handleChange('services', newServices);
  };

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Section Heading</label>
                <input 
                    type="text" 
                    value={data.heading || ''} 
                    onChange={(e) => handleChange('heading', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
                    placeholder="Our Services"
                />
            </div>
            <div>
                 <label className="block text-sm font-medium text-gray-700">Section Description</label>
                 <input 
                    type="text" 
                    value={data.description || ''} 
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
                    placeholder="Optional description text"
                />
            </div>
       </div>

       <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium text-gray-900">Service Items</h4>
                <button 
                    type="button"
                    onClick={handleAddService}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                    <Plus size={16} />
                    Add Service
                </button>
            </div>

            <div className="space-y-3">
                {(data.services || []).map((service, index) => (
                    <div key={service.id || index} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="pt-2 text-gray-400 cursor-move">
                            <GripVertical size={16} />
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Title</label>
                                <input 
                                    type="text" 
                                    value={service.title} 
                                    onChange={(e) => handleUpdateService(index, 'title', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded bg-white shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-1 border" 
                                />
                            </div>
                             <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Icon</label>
                                {/* Simple dropdown for now, would be an icon picker */}
                                <select 
                                     value={service.icon} 
                                     onChange={(e) => handleUpdateService(index, 'icon', e.target.value)}
                                     className="mt-1 block w-full border-gray-300 rounded bg-white shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-1 border" 
                                >
                                    <option value="Box">Box</option>
                                    <option value="Cloud">Cloud</option>
                                    <option value="Database">Database</option>
                                    <option value="Shield">Shield</option>
                                    <option value="BarChart">BarChart</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-500 uppercase">Description</label>
                                <textarea 
                                    rows={2}
                                    value={service.description} 
                                    onChange={(e) => handleUpdateService(index, 'description', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded bg-white shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-1 border" 
                                />
                            </div>
                        </div>
                        <button 
                            onClick={() => handleDeleteService(index)}
                            className="text-gray-400 hover:text-red-500 p-1"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
       </div>
    </div>
  );
}
