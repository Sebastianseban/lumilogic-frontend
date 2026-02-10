import React from 'react';
import { Plus, Trash2, GripVertical, CheckCircle } from 'lucide-react';

export default function BenefitsGridEditor({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleAddBenefit = () => {
    const currentBenefits = data.benefits || [];
    handleChange('benefits', [...currentBenefits, { id: Date.now(), title: '', description: '', icon: 'CheckCircle' }]);
  };

  const handleUpdateBenefit = (index, field, value) => {
     const newBenefits = [...(data.benefits || [])];
     newBenefits[index] = { ...newBenefits[index], [field]: value };
     handleChange('benefits', newBenefits);
  };

  const handleDeleteBenefit = (index) => {
     const newBenefits = [...(data.benefits || [])];
     newBenefits.splice(index, 1);
     handleChange('benefits', newBenefits);
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
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
                    placeholder="Why Choose Us"
                />
            </div>
            <div>
                 <label className="block text-sm font-medium text-gray-700">Section Description</label>
                 <textarea
                    rows={2}
                    value={data.description || ''} 
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
                    placeholder="Key benefits..."
                />
            </div>
       </div>

       <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium text-gray-900">Benefits</h4>
                <button 
                    type="button"
                    onClick={handleAddBenefit}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                    <Plus size={16} />
                    Add Benefit
                </button>
            </div>

            <div className="space-y-3">
                {(data.benefits || []).map((benefit, index) => (
                    <div key={benefit.id || index} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="pt-2 text-gray-400 cursor-move">
                            <GripVertical size={16} />
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Title</label>
                                <input 
                                    type="text" 
                                    value={benefit.title} 
                                    onChange={(e) => handleUpdateBenefit(index, 'title', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-1 border" 
                                />
                            </div>
                             <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Icon</label>
                                <select 
                                     value={benefit.icon} 
                                     onChange={(e) => handleUpdateBenefit(index, 'icon', e.target.value)}
                                     className="mt-1 block w-full border-gray-300 rounded bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-1 border" 
                                >
                                    <option value="CheckCircle">CheckCircle</option>
                                    <option value="Star">Star</option>
                                    <option value="Zap">Zap</option>
                                    <option value="Shield">Shield</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-500 uppercase">Description</label>
                                <textarea 
                                    rows={2}
                                    value={benefit.description} 
                                    onChange={(e) => handleUpdateBenefit(index, 'description', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-1 border" 
                                />
                            </div>
                        </div>
                        <button 
                            onClick={() => handleDeleteBenefit(index)}
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
