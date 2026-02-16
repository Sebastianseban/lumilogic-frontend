import { create } from 'zustand';
import api from '@/lib/api';

export const usePageEditorStore = create((set) => ({
  page: null,
  isSaving: false,

  fetchPage: async (id) => {
    try {
      console.log('Fetching page with ID:', id);
      const res = await api.get(`/admin/pages/${id}`);
      console.log('Page fetched successfully:', res.data);
      set({ page: res.data.data });
    } catch (error) {
      console.error('Error fetching page:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      set({ page: null });
      throw error;
    }
  },

  // createPage: async (data) => {
  //   set({ isSaving: true });
  //   const res = await api.post('/admin/pages', data);
  //   set({ isSaving: false });
  //   return res.data.data;
  // },

  createPage: async (formData) => {
  set({ isSaving: true });

  const payload = {
    title: formData.title,
    slug: formData.slug,
    type: formData.type,
    categoryId: formData.categoryId || null,
    blocks: formData.blocks || [],
    seo: {
      title: formData.seo?.title || formData.seoTitle || formData.title,
      description: formData.seo?.description || formData.description || '',
    },
    isPublished: formData.isPublished || false,
  };

  const res = await api.post('/admin/pages', payload);

  set({ isSaving: false });
  return res.data.data;
},

  // updatePage: async (id, data) => {
  //   set({ isSaving: true });
  //   await api.put(`/admin/pages/${id}`, data);
  //   set({ isSaving: false });
  // },



  updatePage: async (id, formData) => {
  set({ isSaving: true });

  const payload = {
    title: formData.title,
    slug: formData.slug,
    type: formData.type,
    categoryId: formData.categoryId || null,
    blocks: formData.blocks || [],
    seo: {
      title: formData.seo?.title || formData.seoTitle || formData.title,
      description: formData.seo?.description || formData.description || '',
    },
    isPublished: formData.isPublished || false,
  };

  await api.put(`/admin/pages/${id}`, payload);

  set({ isSaving: false });
},
}));