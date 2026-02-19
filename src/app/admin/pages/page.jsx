
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Eye, Trash2, Loader2 } from 'lucide-react';
import { usePagesStore } from '@/store/usePagesStore';

export default function PagesPage() {
  const { pages, fetchPages, deletePage, isLoading, error } = usePagesStore();
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this page?');
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await deletePage(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Pages</h1>
          <p className="text-slate-600">Manage your website pages</p>
        </div>
        <Link
          href="/admin/pages/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus size={20} />
          New Page
        </Link>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-lg text-slate-600">Loading pages...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-10 h-10 text-red-500" />
            </div>
            <p className="text-xl text-slate-900 mb-2">{error}</p>
            <button
              onClick={() => fetchPages()}
              className="px-6 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : pages.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Plus className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No pages yet</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Get started by creating your first page.
            </p>
            <Link
              href="/admin/pages/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg hover:shadow-xl transition-all"
            >
              <Plus size={20} />
              Create First Page
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-5 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Slug</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-slate-700 uppercase tracking-wider hidden md:table-cell">Type</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-slate-700 uppercase tracking-wider hidden lg:table-cell">Status</th>
                  <th className="px-6 py-5 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {pages.map((page) => (
                  <tr key={page._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5 font-medium text-slate-900 max-w-md truncate">
                      {page.title}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600">
                      /{page.slug}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600 capitalize hidden md:table-cell">
                      {page.type}
                    </td>
                    <td className="px-6 py-5 hidden lg:table-cell">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        page.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {page.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          href={`/admin/pages/${page._id}`}
                          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <a
                          href={`/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                          title="View Live"
                        >
                          <Eye size={18} />
                        </a>
                        <button
                          onClick={() => handleDelete(page._id)}
                          disabled={deletingId === page._id}
                          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                          title="Delete"
                        >
                          {deletingId === page._id ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
