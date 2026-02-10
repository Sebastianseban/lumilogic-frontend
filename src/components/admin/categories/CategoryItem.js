import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff, ChevronRight, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

export function CategoryItem({ 
  category, 
  depth, 
  onSelect, 
  isSelected, 
  onToggleExpand, 
  isExpanded,
  onToggleStatus 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id, data: category });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    marginLeft: `${depth * 24}px`, // Indentation
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "group flex items-center gap-2 py-2 px-3 mb-1 rounded-md border border-transparent transition-colors",
        isSelected ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50 border-transparent",
        isDragging && "opacity-50 ring-2 ring-blue-500 bg-blue-50 z-10"
      )}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing p-1 rounded hover:bg-gray-200/50"
      >
        <GripVertical size={16} />
      </button>

      {/* Expand/Collapse */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleExpand(category.id);
        }}
        className={clsx(
            "p-0.5 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-200/50",
            !category.children?.length && "invisible"
        )}
      >
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Title */}
      <div 
        className="flex-1 cursor-pointer truncate font-medium text-sm text-gray-700"
        onClick={() => onSelect(category)}
      >
        {category.title}
      </div>

      {/* Status Toggle */}
      <button
        onClick={(e) => {
            e.stopPropagation();
            onToggleStatus(category.id);
        }}
        className={clsx(
            "p-1 rounded transition-colors",
            category.active ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"
        )}
        title={category.active ? "Active" : "Inactive"}
      >
        {category.active ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
    </div>
  );
}
