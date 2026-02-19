'use client';

import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import BlockWrapper from './BlockWrapper';
import AddBlockModal from './AddBlockModal';

// Import Editors
import HeroEditor from '@/components/admin/blocks/editors/HeroEditor';
import FeatureSplitEditor from '@/components/admin/blocks/editors/FeatureSplitEditor';
import ServicesGridEditor from '@/components/admin/blocks/editors/ServicesGridEditor';
import ProcessGridEditor from '@/components/admin/blocks/editors/ProcessGridEditor';
import LogoGridEditor from '@/components/admin/blocks/editors/LogoGridEditor';
import BenefitsGridEditor from '@/components/admin/blocks/editors/BenefitsGridEditor';
import {
  getDefaultBlockData,
  normalizeBlockData,
  normalizeBlockType,
} from '@/lib/blockData';

export default function BlockBuilder({ blocks = [], onChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper function to update block data
  const handleUpdateBlockData = (index, newData) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], data: newData };
    onChange(newBlocks);
  };

  const handleUpdateBlock = (index, updatedBlock) => {
    const newBlocks = [...blocks];
    newBlocks[index] = updatedBlock;
    onChange(newBlocks);
  };
  
  const handleMoveBlock = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= blocks.length) return;
    const newBlocks = [...blocks];
    const [moved] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, moved);
    onChange(newBlocks);
  };

  const handleDeleteBlock = (index) => {
    if(confirm('Delete this block?')) {
        const newBlocks = blocks.filter((_, i) => i !== index);
        onChange(newBlocks);
    }
  };

    const handleAddBlock = (type) => {
    const normalizedType = normalizeBlockType(type);
    const newBlock = {
        id: Date.now().toString(), // Simple ID
        type: normalizedType,
        data: getDefaultBlockData(normalizedType),
        hidden: false
    };
    onChange([...blocks, newBlock]);
    setIsModalOpen(false);
  };

  const DefaultEditor = ({ type }) => (
      <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-400">
          Editor for {type} coming soon...
      </div>
  );

  const EDITOR_MAP = {
      'hero': HeroEditor,
      'feature_split': FeatureSplitEditor,
      'services_grid': ServicesGridEditor,
      'process_grid': ProcessGridEditor,
      'logo_grid': LogoGridEditor,
      'benefits_grid': BenefitsGridEditor,
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-4">
        {blocks.map((block, index) => {
            const blockType = normalizeBlockType(block?.type);
            const normalizedData = normalizeBlockData(blockType, block?.data);
            const EditorComponent = EDITOR_MAP[blockType] || (() => <DefaultEditor type={blockType} />);
            
            return (
                <BlockWrapper
                    key={block._id || block.id || index}
                    block={block}
                    index={index}
                    totalBlocks={blocks.length}
                    onMoveUp={() => handleMoveBlock(index, index - 1)}
                    onMoveDown={() => handleMoveBlock(index, index + 1)}
                    onDelete={() => handleDeleteBlock(index)}
                    onUpdate={(updatedBlock) => handleUpdateBlock(index, updatedBlock)}
                >
                    <EditorComponent 
                        data={normalizedData} 
                        onChange={(newData) => handleUpdateBlockData(index, normalizeBlockData(blockType, newData))} 
                    />
                </BlockWrapper>
            );
        })}

        {blocks.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500">No content blocks yet. Click below to add one.</p>
            </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg w-full max-w-2xl hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <PlusCircle size={24} />
          </div>
          <span className="font-medium text-gray-600 group-hover:text-blue-700">Add Content Block</span>
        </button>
      </div>
      
      <AddBlockModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddBlock={handleAddBlock} 
      />
    </div>
  );
}
