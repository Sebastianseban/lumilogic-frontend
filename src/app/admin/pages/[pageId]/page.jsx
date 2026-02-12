// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { ArrowLeft, Save, Eye } from 'lucide-react';
// import Link from 'next/link';
// import { usePageEditorStore } from '@/store/usePageEditorStore';
// import { useCategoryStore } from '@/store/useCategoryStore';
// import PageMetaForm from '@/components/admin/pages/PageMetaForm';
// import BlockBuilder from '@/components/admin/pages/BlockBuilder';

// export default function EditPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { page, fetchPage, updatePage, isSaving } = usePageEditorStore();
//   const { categories, fetchCategories } = useCategoryStore();
  
//   const [meta, setMeta] = useState(null);
//   const [blocks, setBlocks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch categories on mount
//   useState(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (params.pageId) {
//       setLoading(true);
//       fetchPage(params.pageId)
//         .then(() => setLoading(false))
//         .catch(() => {
//           setError('Failed to load page');
//           setTimeout(() => router.push('/admin/pages'), 2000);
//         });
//     }
//   }, [params.pageId]);

//   useEffect(() => {
//     if (page) {
//       setMeta({
//         title: page.title || '',
//         slug: page.slug || '',
//         description: page.description || '',
//         type: page.type || 'service',
//         categoryId: page.categoryId || '',
//         isPublished: page.isPublished || false
//       });
//       setBlocks(page.blocks || []);
//     }
//   }, [page]);

//   const handleSave = async () => {
//     if (!meta?.title || !meta?.slug) {
//       setError('Title and slug are required');
//       return;
//     }

//     try {
//       setError('');
//       await updatePage(params.pageId, { ...meta, blocks });
//       setError('');
//       // Show success message briefly
//       const successDiv = document.createElement('div');
//       successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
//       successDiv.textContent = 'Page updated successfully!';
//       document.body.appendChild(successDiv);
//       setTimeout(() => successDiv.remove(), 3000);
//     } catch (err) {
//       setError('Failed to update page. Please try again.');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading page...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error && !meta) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">{error}</p>
//           <p className="text-gray-500">Redirecting...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!meta) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-gray-600">Page not found</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-4">
//           <Link 
//             href="/admin/pages"
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <ArrowLeft size={20} className="text-gray-600" />
//           </Link>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Edit Page</h1>
//             <p className="text-sm text-gray-500 mt-1">{meta.title || 'Untitled Page'}</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           {meta.slug && (
//             <a
//               href={`/${meta.slug}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
//             >
//               <Eye size={16} />
//               Preview
//             </a>
//           )}
//           <button
//             onClick={handleSave}
//             disabled={isSaving}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <Save size={16} />
//             {isSaving ? 'Saving...' : 'Save Changes'}
//           </button>
//         </div>
//       </div>

//       {error && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
//           {error}
//         </div>
//       )}

//       {/* Page Metadata */}
//       <div className="mb-6">
//         <PageMetaForm 
//           meta={meta} 
//           onChange={setMeta} 
//           categories={categories} 
//         />
//       </div>

//       {/* Content Blocks */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Blocks</h2>
//         <BlockBuilder blocks={blocks} onChange={setBlocks} />
//       </div>
//     </div>
//   );
// }
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
      fetchPage(params.pageId)
        .then(() => setLoading(false))
        .catch(() => {
          setError('Failed to load page');
          setTimeout(() => router.push('/admin/pages'), 2000);
        });
    }
  }, [params.pageId, fetchPage, router]);

  useEffect(() => {
    if (page) {
      setMeta({
        title: page.title || '',
        slug: page.slug || '',
        seo: page.seo || { title: '', description: '' },
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
            <h1 className="text-2xl font-bold">Edit Page</h1>
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