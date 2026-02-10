'use client';

import Link from 'next/link';
import { Plus, Edit, Eye, Copy, Trash2, Search } from 'lucide-react';

export default function PagesList() {
  // Mock Data
  const pages = [
    { id: 1, title: 'Home', slug: 'home', status: 'Published', lastUpdated: '2023-10-25', category: 'General' },
    { id: 2, title: 'Cloud Migration Services', slug: 'cloud-migration-services', status: 'Published', lastUpdated: '2023-10-24', category: 'Cloud' },
    { id: 3, title: 'About Us', slug: 'about-us', status: 'Draft', lastUpdated: '2023-10-20', category: 'General' },
    { id: 4, title: 'Contact', slug: 'contact', status: 'Published', lastUpdated: '2023-10-15', category: 'General' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and edit your website content.</p>
        </div>
        <Link 
          href="/admin/pages/new" 
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={16} />
          Create New Page
        </Link>
      </div>

      {/* Filters / Search Bar (simplified) */}
      <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search pages..."
              />
          </div>
          <select className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>All Statuses</option>
              <option>Published</option>
              <option>Draft</option>
          </select>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{page.title}</div>
                  <div className="text-xs text-gray-500">{page.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">/{page.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    page.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {page.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {page.lastUpdated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/pages/${page.id}`} className="text-blue-600 hover:text-blue-900" title="Edit">
                        <Edit size={18} />
                    </Link>
                    <a href={`/${page.slug}`} target="_blank" className="text-gray-400 hover:text-gray-600" title="Preview">
                        <Eye size={18} />
                    </a>
                    <button className="text-gray-400 hover:text-gray-600" title="Duplicate">
                        <Copy size={18} />
                    </button>
                     <button className="text-red-400 hover:text-red-600" title="Delete">
                        <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
