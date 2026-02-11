import { create } from 'zustand';
import api from '@/lib/api';

export const usePagesStore = create((set) => ({
  pages: [],
  isLoading: false,
  error: '',

  fetchPages: async () => {
    try {
      set({ isLoading: true, error: '' });
      const res = await api.get('/admin/pages');
      set({ pages: res.data.data || [] });
    } catch (e) {
      set({ error: 'Failed to load pages' });
    } finally {
      set({ isLoading: false });
    }
  },

  deletePage: async (id) => {
    if (!confirm('Delete this page?')) return;
    await api.delete(`/admin/pages/${id}`);
    set((state) => ({
      pages: state.pages.filter((p) => p._id !== id),
    }));
  },
}));