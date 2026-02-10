'use client';

import React, { useState, useMemo } from 'react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CategoryItem } from './CategoryItem';

// Helper to flatten tree for rendering
const flattenTree = (items, expandedIds, depth = 0) => {
  let flat = [];
  for (const item of items) {
    flat.push({ ...item, depth });
    if (expandedIds.includes(item.id) && item.children) {
      flat = flat.concat(flattenTree(item.children, expandedIds, depth + 1));
    }
  }
  return flat;
};

// Helper to find item by id deep in tree - useful for updates
const findItem = (items, id) => {
    for (const item of items) {
        if (item.id === id) return item;
        if (item.children) {
            const found = findItem(item.children, id);
            if (found) return found;
        }
    }
    return null;
}

export default function CategoryTree({ categories, onSelect, selectedId, onToggleStatus }) {
  const [expandedIds, setExpandedIds] = useState([]);
  const [activeId, setActiveId] = useState(null); // For drag overlay

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Initial expand all for demo if needed, or manage via prop
  // For now start with top level expanded? User can toggle.
  
  const flattenedItems = useMemo(() => 
    flattenTree(categories, expandedIds), 
  [categories, expandedIds]);

  const toggleExpand = (id) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    if (active.id !== over.id) {
        // Simple reorder implementation for now
        // A full tree reorder (changing parents) is complex. 
        // We will implement basic reordering within the flattened list for visual feedback 
        // but updating the actual tree structure requires more logic (finding parent, moving node).
        // For this Step 1, we will just log the move or do a simple array move if in same parent.
        
        // Use a simpler approach for the prototype: 
        // Just callback that a move happened.
        console.log('Moved', active.id, 'to', over.id);
    }
  };

  const activeItem = activeId ? findItem(categories, activeId) : null;

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter} 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={flattenedItems.map(i => i.id)} 
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-1">
          {flattenedItems.map((category) => (
            <CategoryItem 
              key={category.id} 
              category={category} 
              depth={category.depth}
              isSelected={selectedId === category.id}
              onSelect={onSelect}
              isExpanded={expandedIds.includes(category.id)}
              onToggleExpand={toggleExpand}
              onToggleStatus={onToggleStatus || (() => {})}
            />
          ))}
        </div>
      </SortableContext>
      
      <DragOverlay>
        {activeId && activeItem ? (
           <div className="opacity-80">
             <CategoryItem 
                category={activeItem} 
                depth={0} 
                isExpanded={false}
                onSelect={() => {}}
                isSelected={false}
                onToggleExpand={() => {}}
                onToggleStatus={() => {}}
             />
           </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
