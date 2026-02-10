
  'use client';

  import { useEffect, useMemo } from 'react';
  import { Plus } from 'lucide-react';
  import { useCategoryStore } from '@/store/useCategoryStore';
  import CategoryTree from '@/components/admin/categories/CategoryTree';
  import CategoryEditor from '@/components/admin/categories/CategoryEditor';

  export default function CategoriesPage() {
    const {
      categories,
      selectedId,
      isLoading,
      isSaving,
      error,
      fetchCategories,
      selectCategory,
      createCategory,
      updateCategory,
      deleteCategory,
      toggleStatus,
    } = useCategoryStore();

    useEffect(() => {
      fetchCategories();
    }, []);

    const selectedCategory = useMemo(
      () => findById(categories, selectedId),
      [categories, selectedId]
    );

    const handleSave = (data) => {
      if (data?.id) updateCategory(data.id, data);
      else createCategory(data);
    };

    return (
      <div className="h-[calc(100vh-6rem)] flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
            <p className="text-sm text-gray-500">
              Control navigation, hierarchy and visibility
            </p>
          </div>

          <button
            onClick={() => selectCategory(null)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
          >
            <Plus size={16} />
            New Category
          </button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b font-semibold bg-gray-50">
              Structure
            </div>
            <div className="p-4 overflow-y-auto">
              {isLoading ? (
                <p className="text-sm text-gray-400">Loading...</p>
              ) : (
                <CategoryTree
                  categories={categories}
                  selectedId={selectedId}
                  onSelect={(c) => selectCategory(c.id)}
                  onToggleStatus={toggleStatus}
                />
              )}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b font-semibold bg-gray-50">
              {selectedCategory ? 'Edit Category' : 'Create Category'}
            </div>
            <div className="p-6 overflow-y-auto">
              <CategoryEditor
                category={selectedCategory}
                categories={categories}
                onSave={handleSave}
                onDelete={deleteCategory}
                onCancel={() => selectCategory(null)}
                isSaving={isSaving}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const findById = (items, id) => {
    if (!id) return null;
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };
