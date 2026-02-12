'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { usePageEditorStore } from '@/store/usePageEditorStore';
import { useCategoryStore } from '@/store/useCategoryStore';
import PageMetaForm from '@/components/admin/pages/PageMetaForm';
import BlockBuilder from '@/components/admin/pages/BlockBuilder';

export default function NewPage() {
  const router = useRouter();
  const { createPage, isSaving } = usePageEditorStore();
  const { categories, fetchCategories } = useCategoryStore();
  
  const [meta, setMeta] = useState({
    title: '',
    slug: '',
    description: '',
    type: 'service',
    isPublished: false
  });
  const [blocks, setBlocks] = useState([]);
  const [error, setError] = useState('');

  // Fetch categories on mount
  useState(() => {
    fetchCategories();
  }, []);

  const handleSave = async () => {
    if (!meta.title || !meta.slug) {
      setError('Title and slug are required');
      return;
    }

    try {
      setError('');
      const newPage = await createPage({ ...meta, blocks });
      router.push(`/admin/pages/${newPage._id}`);
    } catch (err) {
      console.error('Create page error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to create page. Please try again.');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/pages"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Page</h1>
            <p className="text-sm text-gray-500 mt-1">Add page details and content blocks</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={16} />
          {isSaving ? 'Creating...' : 'Create Page'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Page Metadata */}
      <div className="mb-6">
        <PageMetaForm 
          meta={meta} 
          onChange={setMeta} 
          categories={categories} 
        />
      </div>

      {/* Content Blocks */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Blocks</h2>
        <BlockBuilder blocks={blocks} onChange={setBlocks} />
      </div>
    </div>
  );
}
