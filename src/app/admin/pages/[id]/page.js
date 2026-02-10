'use client';

// Components
import BlockBuilder from '@/components/admin/pages/BlockBuilder';

export default function PageEditor({ params }) {
  const router = useRouter();
  // Unwrap params using React.use() if this was a server component, but here in client component params is a promise in Next 15+ or prop in older.
  // Assuming Next 14/15 client component structure.
  
  const [pageData, setPageData] = useState({
     title: 'Cloud Migration Services',
     slug: 'cloud-migration-services',
     status: 'Published',
     seoTitle: '',
     seoDescription: '',
     blocks: [
        { id: '1', type: 'hero', data: { heading: 'Migrate to the Cloud', subheading: 'Trusted by Enterprises', description: 'Seamless migration with zero downtime.', ctaText: 'Start Now' } },
        { id: '2', type: 'services_grid', data: { heading: 'Our Services', services: [{ id: 1, title: 'Assessment', description: 'Analyze your infrastructure', icon: 'BarChart' }] } }
     ] 
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSeo, setShowSeo] = useState(false);

  // Helper to handle updates
  const updatePage = (field, value) => {
    setPageData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    console.log('Saving Page Data:', pageData);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    setHasUnsavedChanges(false);
    // Notification toast would go here
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] -m-8"> 
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center gap-4">
            <Link href="/admin/pages" className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft size={20} />
            </Link>
            <div>
                <input 
                    type="text" 
                    value={pageData.title}
                    onChange={(e) => updatePage('title', e.target.value)}
                    className="block text-lg font-bold text-gray-900 border-none p-0 focus:ring-0 placeholder-gray-400"
                    placeholder="Page Title"
                />
                 <div className="flex items-center text-xs text-gray-500 gap-2 mt-0.5">
                    <span className="font-mono bg-gray-100 px-1 rounded text-gray-600">/{pageData.slug}</span>
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => setShowSeo(!showSeo)}>
                        Edit SEO & Slug
                    </button>
                 </div>
            </div>
        </div>

        <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 mr-4 border-r border-gray-200 pr-4">
                <span className={`h-2.5 w-2.5 rounded-full ${pageData.status === 'Published' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                <select 
                    value={pageData.status}
                    onChange={(e) => updatePage('status', e.target.value)}
                    className="text-sm border-none focus:ring-0 text-gray-600 font-medium cursor-pointer"
                >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                </select>
             </div>

            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium transition-colors">
                <Eye size={18} />
                <span className="hidden sm:inline">Preview</span>
            </button>
            <button 
                onClick={handleSave}
                disabled={isSaving}
                className={`flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-md shadow-sm transition-all
                    ${isSaving ? 'bg-blue-400 cursor-wait' : hasUnsavedChanges ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}
                `}
            >
                {isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'Saved'}
                {!isSaving && !hasUnsavedChanges && <Check size={16} />}
                {!isSaving && hasUnsavedChanges && <Save size={16} />}
            </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden bg-gray-100">
        {/* Main Editor Area */}
        <div className="flex-1 overflow-y-auto">
            {/* SEO Settings Panel (Collapsible) */}
            {showSeo && (
                <div className="bg-white border-b border-gray-200 p-6 animate-in slide-in-from-top-2">
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                                <Globe size={16} className="text-gray-400"/> 
                                SEO Settings
                            </h3>
                             <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Page Slug</label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">/</span>
                                        <input
                                            type="text"
                                            value={pageData.slug}
                                            onChange={(e) => updatePage('slug', e.target.value)}
                                            className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">SEO Title</label>
                                    <input
                                        type="text"
                                        value={pageData.seoTitle}
                                        onChange={(e) => updatePage('seoTitle', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                                        placeholder={pageData.title}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">SEO Description</label>
                                    <textarea
                                        rows={3}
                                        value={pageData.seoDescription}
                                        onChange={(e) => updatePage('seoDescription', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                                    />
                                </div>
                             </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Search Preview</h4>
                            <div className="bg-white p-3 rounded shadow-sm">
                                <div className="text-blue-800 text-lg hover:underline cursor-pointer truncate">
                                    {pageData.seoTitle || pageData.title} | LumiLogic
                                </div>
                                <div className="text-green-700 text-xs mt-0.5">
                                    https://lumilogic.com/{pageData.slug}
                                </div>
                                <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                                    {pageData.seoDescription || "No description set. Search engines will display text from the page content."}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Block Builder Canvas */}
            <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <BlockBuilder blocks={pageData.blocks} onChange={(blocks) => updatePage('blocks', blocks)} />
            </div>
        </div>
      </div>
    </div>
  );
}
