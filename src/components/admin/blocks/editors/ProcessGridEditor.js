import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export default function ProcessGridEditor({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleAddStep = () => {
    const currentSteps = data.steps || [];
    handleChange('steps', [...currentSteps, { id: Date.now(), title: '', description: '' }]);
  };

  const handleUpdateStep = (index, field, value) => {
     const newSteps = [...(data.steps || [])];
     newSteps[index] = { ...newSteps[index], [field]: value };
     handleChange('steps', newSteps);
  };

  const handleDeleteStep = (index) => {
     const newSteps = [...(data.steps || [])];
     newSteps.splice(index, 1);
     handleChange('steps', newSteps);
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
                    placeholder="Our Process"
                />
            </div>
            <div>
                 <label className="block text-sm font-medium text-gray-700">Section Description</label>
                 <textarea
                    rows={2}
                    value={data.description || ''} 
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
                    placeholder="How we work..."
                />
            </div>
       </div>

       <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium text-gray-900">Process Steps</h4>
                <button 
                    type="button"
                    onClick={handleAddStep}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                    <Plus size={16} />
                    Add Step
                </button>
            </div>

            <div className="space-y-3">
                {(data.steps || []).map((step, index) => (
                    <div key={step.id || index} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="pt-2 text-gray-400 cursor-move flex flex-col items-center gap-1">
                            <span className="text-xs font-bold text-gray-500">{(index + 1).toString().padStart(2, '0')}</span>
                            <GripVertical size={16} />
                        </div>
                        <div className="flex-1 space-y-3">
                            <div>
                                <input 
                                    type="text" 
                                    value={step.title} 
                                    onChange={(e) => handleUpdateStep(index, 'title', e.target.value)}
                                    className="block w-full border-gray-300 rounded bg-white shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-1 border font-medium" 
                                    placeholder="Step Title"
                                />
                            </div>
                            <div>
                                <textarea 
                                    rows={2}
                                    value={step.description} 
                                    onChange={(e) => handleUpdateStep(index, 'description', e.target.value)}
                                    className="block w-full border-gray-300 rounded bg-white shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-1 border" 
                                    placeholder="Description of this step..."
                                />
                            </div>
                        </div>
                        <button 
                            onClick={() => handleDeleteStep(index)}
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
