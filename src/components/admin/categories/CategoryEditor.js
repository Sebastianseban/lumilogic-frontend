'use client';

import React, { useState, useEffect } from 'react';
import { Save, Trash2, X } from 'lucide-react';
import { clsx } from 'clsx';

export default function CategoryEditor({ category, onSave, onCancel, onDelete, categories }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    parentId: '',
    order: 0,
    active: true
  });

  useEffect(() => {
    if (category) {
      setFormData({
        title: category.title || '',
        slug: category.slug || '',
        parentId: category.parentId || '',
        order: category.order || 0,
        active: category.active ?? true
      });
    } else {
      // Defaults for new category
      setFormData({
        title: '',
        slug: '',
        parentId: '',
        order: 0,
        active: true
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
        const newData = {
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        };
        
        // Auto-generate slug from title if slug hasn't been manually edited (or just always for now)
        if (name === 'title' && !prev.slug) {
            newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        }
        
        return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...category, ...formData });
  };

  // Flatten categories for parent dropdown
  const flattenForSelect = (items, depth = 0, prefix = '') => {
    let result = [];
    for (const item of items) {
        // Prevent selecting self as parent or children of self as parent (circular)
        if (category && item.id === category.id) continue;
        
        result.push({
            id: item.id,
            title: `${prefix}${item.title}`
        });
        if (item.children) {
            result = result.concat(flattenForSelect(item.children, depth + 1, `${prefix}-- `));
        }
    }
    return result;
  };
  
  const parentOptions = flattenForSelect(categories || []);

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col">
        <div className="space-y-6">
            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    placeholder="e.g. Cloud Services"
                    required
                />
            </div>

            {/* Slug */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        /
                    </span>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                        placeholder="cloud-services"
                    />
                </div>
            </div>

            {/* Parent Category */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Parent Category</label>
                <select
                    name="parentId"
                    value={formData.parentId}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                >
                    <option value="">(None - Top Level)</option>
                    {parentOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.title}</option>
                    ))}
                </select>
            </div>

            {/* Order */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Order</label>
                <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                />
            </div>

            {/* Status */}
            <div className="flex items-center">
                <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, active: !prev.active }))}
                    className={clsx(
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                        formData.active ? 'bg-blue-600' : 'bg-gray-200'
                    )}
                    role="switch"
                    aria-checked={formData.active}
                >
                    <span
                        aria-hidden="true"
                        className={clsx(
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            formData.active ? 'translate-x-5' : 'translate-x-0'
                        )}
                    />
                </button>
                <span className="ml-3 text-sm font-medium text-gray-900">
                    {formData.active ? 'Active' : 'Inactive'}
                </span>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
            {category && (
                <button
                    type="button"
                    onClick={() => onDelete(category.id)}
                    className="flex items-center gap-2 px-4 py-2 border border-red-200 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-auto"
                >
                    <Trash2 size={16} />
                    Delete
                </button>
            )}
            
            <button
                type="button"
                onClick={onCancel}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <X size={16} />
                Cancel
            </button>
            
            <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <Save size={16} />
                Save Changes
            </button>
        </div>
    </form>
  );
}
