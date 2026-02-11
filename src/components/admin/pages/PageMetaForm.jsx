export default function PageMetaForm({ page, onChange }) {
  return (
    <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] p-6 space-y-4">
      <div>
        <label className="text-sm text-[var(--text-muted)]">Slug</label>
        <input
          value={page.slug}
          onChange={(e) =>
            onChange({ ...page, slug: e.target.value })
          }
          className="w-full mt-1 px-3 py-2 rounded-md bg-[#0F1538]"
        />
      </div>

      <div>
        <label className="text-sm text-[var(--text-muted)]">
          SEO Title
        </label>
        <input
          value={page.seo.title}
          onChange={(e) =>
            onChange({
              ...page,
              seo: { ...page.seo, title: e.target.value },
            })
          }
          className="w-full mt-1 px-3 py-2 rounded-md bg-[#0F1538]"
        />
      </div>

      <div>
        <label className="text-sm text-[var(--text-muted)]">
          SEO Description
        </label>
        <textarea
          rows={3}
          value={page.seo.description}
          onChange={(e) =>
            onChange({
              ...page,
              seo: { ...page.seo, description: e.target.value },
            })
          }
          className="w-full mt-1 px-3 py-2 rounded-md bg-[#0F1538]"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={page.isPublished}
          onChange={(e) =>
            onChange({ ...page, isPublished: e.target.checked })
          }
        />
        <span>Published</span>
      </label>
    </div>
  );
}