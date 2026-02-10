import React from 'react';
import { ArrowUp, ArrowDown, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { clsx } from 'clsx';
// We'll import sortable hook later if we want full drag and drop, 
// for now using manual up/down arrows as per user request (simpler).

export default function BlockWrapper({ 
  block, 
  index, 
  totalBlocks, 
  onMoveUp, 
  onMoveDown, 
  onDelete, 
  onUpdate,
  children 
}) {
  
  const handleToggleVisibility = () => {
     onUpdate({ ...block, hidden: !block.hidden });
  };

  return (
    <div className={clsx(
        "bg-white rounded-lg shadow-sm border mb-4 transition-all",
        block.hidden ? "border-gray-200 bg-gray-50 opacity-75" : "border-gray-200 hover:border-blue-300"
    )}>
      {/* Block Header / Controls */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-lg">
        <div className="flex items-center gap-3">
            <span className="text-gray-400 cursor-move">
                <GripVertical size={16} />
            </span>
            <span className="font-semibold text-sm text-gray-700 uppercase tracking-wide">
                {block.type.replace('_', ' ')}
            </span>
             {block.hidden && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-200 text-gray-500 uppercase">
                    Hidden
                </span>
            )}
        </div>
        
        <div className="flex items-center gap-1">
             <button 
                onClick={handleToggleVisibility}
                title={block.hidden ? "Show Block" : "Hide Block"}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded"
            >
                {block.hidden ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            <div className="h-4 w-px bg-gray-300 mx-1"></div>
            <button 
                onClick={onMoveUp}
                disabled={index === 0}
                title="Move Up"
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <ArrowUp size={16} />
            </button>
             <button 
                onClick={onMoveDown}
                disabled={index === totalBlocks - 1}
                title="Move Down"
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <ArrowDown size={16} />
            </button>
             <div className="h-4 w-px bg-gray-300 mx-1"></div>
             <button 
                onClick={onDelete}
                title="Delete Block"
                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
            >
                <Trash2 size={16} />
            </button>
        </div>
      </div>
      
      {/* Block Content (The Editor) */}
      <div className={clsx("p-6", block.hidden && "hidden")}>
         {children}
      </div>
    </div>
  );
}
