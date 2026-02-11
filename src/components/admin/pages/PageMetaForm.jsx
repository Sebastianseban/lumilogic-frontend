export default function PageMetaForm({ meta, onChange }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Page Title
        </label>
        <input
          type="text"
          value={meta?.title || ''}
          onChange={(e) => onChange({ ...meta, title: e.target.value })}
          placeholder="Enter page title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Slug
        </label>
        <input
          type="text"
          value={meta?.slug || ''}
          onChange={(e) => onChange({ ...meta, slug: e.target.value })}
          placeholder="page-url-slug"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="mt-1 text-xs text-gray-500">
          URL: /{meta?.slug || 'page-url-slug'}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Meta Description
        </label>
        <textarea
          rows={3}
          value={meta?.description || ''}
          onChange={(e) => onChange({ ...meta, description: e.target.value })}
          placeholder="Brief description for SEO"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="isPublished"
          checked={meta?.isPublished || false}
          onChange={(e) => onChange({ ...meta, isPublished: e.target.checked })}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
          Published
        </label>
      </div>
    </div>
  );
}