
'use client';

import { useEffect, useState } from 'react';
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
    seo: {
      title: '',
      description: '',
    },
    type: 'service',
    categoryId: '',
    isPublished: false,
  });

  const [blocks, setBlocks] = useState([]);
  const [error, setError] = useState('');

  /* ✅ FIXED */
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to create page.'
      );
    }
  };

  return (
    <div className="p-6 text-[var(--text-primary)]">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/pages"
            className="p-2 hover:bg-[var(--bg-surface)] rounded-lg transition"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl text-black font-bold">Create New Page</h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Add page details and content blocks
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 
          bg-[var(--accent)] text-[#0B1023]
          text-sm font-medium rounded-md
          hover:opacity-90 transition
          disabled:opacity-50"
        >
          <Save size={16} />
          {isSaving ? 'Creating...' : 'Create Page'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 
        bg-red-500/10 border border-red-500/30 
        rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Metadata */}
      <div className="mb-6">
        <PageMetaForm 
          meta={meta} 
          onChange={setMeta} 
          categories={categories} 
        />
      </div>

      {/* Blocks */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Content Blocks
        </h2>
        <BlockBuilder blocks={blocks} onChange={setBlocks} />
      </div>
    </div>
  );
}