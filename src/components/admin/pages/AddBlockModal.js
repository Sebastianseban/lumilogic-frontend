import React from 'react';
import { X, Layout, Image, List, Settings, CheckSquare, Grid } from 'lucide-react';

const BLOCK_TYPES = [
  { type: 'hero', label: 'Hero Section', icon: Layout, description: 'Large simplified header with background image.' },
  { type: 'feature_split', label: 'Feature Split', icon: Image, description: 'Image on one side, text on the other.' },
  { type: 'services_grid', label: 'Services Grid', icon: Grid, description: 'Grid of service cards with icons.' },
  { type: 'process_grid', label: 'Process Steps', icon: List, description: 'Step-by-step process flow.' },
  { type: 'logo_grid', label: 'Logo Cloud', icon: CheckSquare, description: 'Grid of client or partner logos.' },
  { type: 'benefits_grid', label: 'Benefits Grid', icon: Settings, description: 'Grid of key benefits or features.' },
];

export default function AddBlockModal({ isOpen, onClose, onAddBlock }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start justify-between mb-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Add Content Block
              </h3>
              <button 
                onClick={onClose}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BLOCK_TYPES.map((block) => {
                const Icon = block.icon;
                return (
                  <button
                    key={block.type}
                    onClick={() => {
                        onAddBlock(block.type);
                        onClose();
                    }}
                    className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center group"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-white text-gray-600 group-hover:text-blue-600 transition-colors">
                      <Icon size={24} />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{block.label}</h4>
                    <p className="text-xs text-gray-500">{block.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
