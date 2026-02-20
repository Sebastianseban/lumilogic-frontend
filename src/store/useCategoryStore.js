// src/store/useCategoryStore.js
import { create } from 'zustand';
import api from '@/lib/api';
import {
  normalizeCategory,
  buildCategoryPayload,
} from '@/features/categories/category.mapper';

const getApiErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.response?.data?.error || fallback;

export const useCategoryStore = create((set, get) => ({
  categories: [],
  selectedId: null,
  isLoading: true,
  isSaving: false,
  error: '',

  /* ---------------- FETCH ---------------- */
  fetchCategories: async () => {
    try {
      set({ isLoading: true, error: '' });
      const res = await api.get('/admin/categories');
      const raw = res?.data?.data || [];
      set({ categories: raw.map(normalizeCategory) });
    } catch (e) {
      set({ error: 'Failed to load categories' });
    } finally {
      set({ isLoading: false });
    }
  },

  /* ---------------- SELECT ---------------- */
  selectCategory: (id) => set({ selectedId: id }),

  /* ---------------- CREATE ---------------- */
  createCategory: async (formData) => {
    try {
      set({ isSaving: true, error: '' });
      const payload = buildCategoryPayload(formData);
      const res = await api.post('/admin/categories', payload);
      set({ selectedId: res?.data?.data?._id || null });
      await get().fetchCategories();
    } catch (error) {
      set({ error: getApiErrorMessage(error, 'Failed to create category') });
    } finally {
      set({ isSaving: false });
    }
  },

  /* ---------------- UPDATE ---------------- */
  updateCategory: async (id, formData) => {
    try {
      set({ isSaving: true, error: '' });
      const payload = buildCategoryPayload(formData);
      await api.put(`/admin/categories/${id}`, payload);
      await get().fetchCategories();
    } catch (error) {
      set({ error: getApiErrorMessage(error, 'Failed to update category') });
    } finally {
      set({ isSaving: false });
    }
  },

  /* ---------------- DELETE ---------------- */
  deleteCategory: async (id) => {
    try {
      set({ isSaving: true, error: '' });
      await api.delete(`/admin/categories/${id}`);
      set({ selectedId: null });
      await get().fetchCategories();
    } catch (error) {
      set({ error: getApiErrorMessage(error, 'Failed to delete category') });
    } finally {
      set({ isSaving: false });
    }
  },

  /* ---------------- TOGGLE STATUS ---------------- */
  toggleStatus: async (id) => {
    const category = findById(get().categories, id);
    if (!category) return;

    await get().updateCategory(id, {
      ...category,
      active: !category.active,
    });
  },
}));

const findById = (items, id) => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children?.length) {
      const found = findById(item.children, id);
      if (found) return found;
    }
  }
  return null;
};
