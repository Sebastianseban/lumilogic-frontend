// src/features/categories/category.mapper.js
export const normalizeCategory = (category) => ({
  id: category._id,
  title: category.title || '',
  slug: category.slug || '',
  parentId:
    typeof category.parentId === 'object' && category.parentId
      ? category.parentId._id
      : category.parentId || null,
  order: category.order ?? 0,
  active: category.isActive ?? true,
  children: (category.children || []).map(normalizeCategory),
});

export const buildCategoryPayload = (data) => ({
  title: data.title,
  slug: data.slug,
  parentId: data.parentId || null,
  order: Number(data.order) || 0,
  isActive: Boolean(data.active),
});