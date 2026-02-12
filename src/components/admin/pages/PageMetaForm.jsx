

// Helper to flatten categories with indentation
const flattenCategories = (categories, depth = 0) => {
  return categories.reduce((acc, cat) => {
    const prefix = depth > 0 ? '\u00A0'.repeat(depth * 4) + '- ' : '';
    acc.push({ ...cat, title: prefix + cat.title });
    if (cat.children && cat.children.length > 0) {
      acc.push(...flattenCategories(cat.children, depth + 1));
    }
    return acc;
  }, []);
};

export default function PageMetaForm({ meta = {}, onChange, categories = [] }) {
  const handleChange = (field, value) => {
    onChange({
      ...meta,
      [field]: value,
    });
  };

  const handleSeoChange = (field, value) => {
    onChange({
      ...meta,
      seo: {
        ...meta.seo,
        [field]: value,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      
      {/* PAGE TITLE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Page Title
        </label>
        <input
          type="text"
          value={meta.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter page title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* SLUG */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Slug
        </label>
        <input
          type="text"
          value={meta.slug || ''}
          onChange={(e) => handleChange('slug', e.target.value)}
          placeholder="page-url-slug"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          URL: /{meta.slug || 'page-url-slug'}
        </p>
      </div>

      {/* PAGE TYPE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Page Type
        </label>
        <select
          value={meta.type || 'service'}
          onChange={(e) => handleChange('type', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="service">Service Page</option>
          <option value="home">Home Page</option>
          <option value="solution">Solution Page</option>
          <option value="about">About Page</option>
          <option value="static">Static Page</option>
        </select>
      </div>

      {/* CATEGORY (only if not home) */}
      {meta.type !== 'home' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={meta.categoryId || ''}
            onChange={(e) => handleChange('categoryId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {flattenCategories(categories).map((cat) => (
              <option key={cat.id || cat._id} value={cat.id || cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* SEO TITLE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          SEO Title
        </label>
        <input
          type="text"
          value={meta?.seo?.title || ''}
          onChange={(e) => handleSeoChange('title', e.target.value)}
          placeholder="SEO optimized title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* SEO DESCRIPTION */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Meta Description
        </label>
        <textarea
          rows={3}
          value={meta?.seo?.description || ''}
          onChange={(e) => handleSeoChange('description', e.target.value)}
          placeholder="Brief description for SEO"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* PUBLISH TOGGLE */}
      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="isPublished"
          checked={meta.isPublished || false}
          onChange={(e) => handleChange('isPublished', e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
          Published
        </label>
      </div>
    </div>
  );
}