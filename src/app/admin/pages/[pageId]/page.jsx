
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Link from 'next/link';
import { usePageEditorStore } from '@/store/usePageEditorStore';
import { useCategoryStore } from '@/store/useCategoryStore';
import PageMetaForm from '@/components/admin/pages/PageMetaForm';
import BlockBuilder from '@/components/admin/pages/BlockBuilder';

export default function EditPage() {
  const params = useParams();
  const router = useRouter();

  const { page, fetchPage, updatePage, isSaving } = usePageEditorStore();
  const { categories, fetchCategories } = useCategoryStore();

  const [meta, setMeta] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /* ✅ FIXED */
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (params.pageId) {
      setLoading(true);
      setError('');
      fetchPage(params.pageId)
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load page:', err);
          
          let errorMessage = 'Failed to load page. ';
          
          if (err.response) {
            // Server responded with error
            if (err.response.status === 404) {
              errorMessage += 'Page not found. It may have been deleted.';
            } else if (err.response.status === 401 || err.response.status === 403) {
              errorMessage += 'Authentication error. Please log in again.';
            } else {
              errorMessage += `Server error (${err.response.status}): ${err.response.data?.message || 'Unknown error'}`;
            }
          } else if (err.request) {
            // Request made but no response
            errorMessage += 'Backend is not responding. Please ensure the server is running.';
          } else {
            // Something else happened
            errorMessage += err.message || 'Unknown error occurred.';
          }
          
          setError(errorMessage);
          setLoading(false);
          setTimeout(() => router.push('/admin/pages'), 5000);
        });
    }
  }, [params.pageId, fetchPage, router]);

  useEffect(() => {
    if (page) {
      setMeta({
        title: page.title || '',
        slug: page.slug || '',
        seo: {
          title: page.seo?.title || page.seoTitle || '',
          description: page.seo?.description || page.description || ''
        },
        type: page.type || 'service',
        categoryId: page.categoryId || '',
        isPublished: page.isPublished || false
      });
      setBlocks(page.blocks || []);
    }
  }, [page]);

  const handleSave = async () => {
    if (!meta?.title || !meta?.slug) {
      setError('Title and slug are required');
      return;
    }

    try {
      setError('');
      await updatePage(params.pageId, { ...meta, blocks });
      setSuccess('Page updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to update page. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[var(--text-muted)]">
        Loading page...
      </div>
    );
  }

  if (error && !meta) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="max-w-2xl w-full bg-red-500/10 border border-red-500/30 rounded-lg p-6">
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-red-400 mb-3">Error Loading Page</p>
            <p className="text-red-300">{error}</p>
          </div>

          <div className="bg-[var(--bg-surface)] rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">
              Troubleshooting Steps:
            </p>
            <ul className="text-sm text-[var(--text-muted)] space-y-1 list-disc list-inside">
              <li>Check if the backend server is running</li>
              <li>Verify the page ID in the URL is correct</li>
              <li>Check browser console for detailed error logs</li>
              <li>Ensure you're logged in (check authentication token)</li>
              <li>Try refreshing the page</li>
            </ul>
          </div>

          <div className="flex gap-3 justify-center">
            <Link
              href="/admin/pages"
              className="px-4 py-2 bg-[var(--accent)] text-[#0B1023] rounded-md hover:opacity-90 transition"
            >
              Go to Pages List
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-md hover:opacity-80 transition"
            >
              Retry
            </button>
          </div>

          <p className="text-center text-sm text-[var(--text-muted)] mt-4">
            Auto-redirecting to pages list in 5 seconds...
          </p>
        </div>
      </div>
    );
  }

  if (!meta) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[var(--text-muted)]">
        Page not found
      </div>
    );
  }

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
            <h1 className="text-2xl text-black font-bold">Edit Page</h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              {meta.title || 'Untitled Page'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {meta.slug && (
            <a
              href={`/${meta.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 
              bg-[var(--bg-surface)] border border-[var(--border-subtle)]
              text-sm rounded-md hover:opacity-80 transition"
            >
              <Eye size={16} />
              Preview
            </a>
          )}

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
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 
        bg-red-500/10 border border-red-500/30 
        rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="mb-6 p-4 
        bg-green-500/10 border border-green-500/30 
        rounded-lg text-green-400 text-sm">
          {success}
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