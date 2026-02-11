'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Eye, Trash2 } from 'lucide-react';
import { usePagesStore } from '@/store/usePagesStore';

export default function PagesPage() {
  const { pages, fetchPages, deletePage, isLoading } = usePagesStore();

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Pages
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Manage website pages
          </p>
        </div>

        <Link
          href="/admin/pages/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg
            bg-[var(--accent)] text-[#0B1023]"
        >
          <Plus size={16} />
          New Page
        </Link>
      </div>

      {/* Table */}
      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] overflow-hidden">
        {isLoading ? (
          <p className="p-6 text-[var(--text-muted)]">Loading…</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--border-subtle)]">
              <tr className="text-left text-[var(--text-muted)]">
                <th className="p-4">Title</th>
                <th>Slug</th>
                <th>Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr
                  key={page._id}
                  className="border-b border-[var(--border-subtle)] hover:bg-[#1A2148]"
                >
                  <td className="p-4 font-medium">
                    {page.title}
                  </td>
                  <td>/{page.slug}</td>
                  <td>
                    {page.isPublished ? (
                      <span className="text-green-400">Published</span>
                    ) : (
                      <span className="text-yellow-400">Draft</span>
                    )}
                  </td>
                  <td className="p-4 flex justify-end gap-3">
                    <Link href={`/admin/pages/${page._id}`}>
                      <Edit size={18} />
                    </Link>
                    <a href={`/${page.slug}`} target="_blank">
                      <Eye size={18} />
                    </a>
                    <button onClick={() => deletePage(page._id)}>
                      <Trash2 size={18} className="text-red-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}