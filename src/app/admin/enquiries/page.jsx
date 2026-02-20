'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Loader2,
  Mail,
  RefreshCw,
  Search,
  UserRound,
} from 'lucide-react';
import api from '@/lib/api';

const LIMIT = 10;

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'closed', label: 'Closed' },
  { value: 'spam', label: 'Spam' },
];

const FILTER_STATUS_OPTIONS = [{ value: '', label: 'All' }, ...STATUS_OPTIONS];

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.response?.data?.error || fallback;

const normalizeEnquiry = (item) => ({
  id: item?._id || item?.id || '',
  fullName: item?.fullName || item?.name || '',
  workEmail: item?.workEmail || item?.email || '',
  company: item?.company || '',
  serviceSlug: item?.serviceSlug || item?.service?.slug || '',
  projectDetails: item?.projectDetails || item?.message || '',
  status: item?.status || 'new',
  createdAt: item?.createdAt || item?.created_at || '',
});

const parseListResponse = (res, page, limit) => {
  const root = res?.data || {};
  const data = root?.data;

  let items = [];
  let totalItems = 0;
  let totalPages = 0;
  let hasNextPage = false;

  if (Array.isArray(data)) {
    items = data;
  } else if (data && typeof data === 'object') {
    items = data.items || data.docs || data.results || data.enquiries || [];
    totalItems = Number(
      data.totalItems || data.total || data.count || data.totalCount || 0
    );
    totalPages = Number(data.totalPages || data.pages || 0);
    hasNextPage = Boolean(data.hasNextPage);
  }

  if (!totalItems) {
    const meta = root?.meta || {};
    totalItems = Number(meta.totalItems || meta.total || 0);
  }

  if (!totalPages && totalItems > 0) {
    totalPages = Math.ceil(totalItems / limit);
  }

  return {
    items: (items || []).map(normalizeEnquiry),
    totalItems,
    totalPages,
    hasNextPage,
    canNext:
      totalPages > 0 ? page < totalPages : hasNextPage || (items || []).length >= limit,
  };
};

const formatDate = (dateValue) => {
  if (!dateValue) return '—';
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString();
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [listError, setListError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedId, setSelectedId] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState('');

  const [statusFilter, setStatusFilter] = useState('new');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [canNext, setCanNext] = useState(false);

  const [statusDraft, setStatusDraft] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusError, setStatusError] = useState('');

  const activeStatus = useMemo(() => {
    const fromDetail = selectedEnquiry?.status;
    if (fromDetail) return fromDetail;
    return statusDraft || '';
  }, [selectedEnquiry?.status, statusDraft]);

  useEffect(() => {
    let cancelled = false;

    const fetchList = async () => {
      setIsLoadingList(true);
      setListError('');

      try {
        const params = {
          page,
          limit: LIMIT,
          search,
        };

        if (statusFilter) {
          params.status = statusFilter;
        }

        const res = await api.get('/admin/enquiries', { params });
        if (cancelled) return;

        const parsed = parseListResponse(res, page, LIMIT);
        setEnquiries(parsed.items);
        setTotalItems(parsed.totalItems);
        setTotalPages(parsed.totalPages);
        setCanNext(parsed.canNext);

        if (parsed.items.length === 0) {
          setSelectedId('');
          setSelectedEnquiry(null);
        } else if (!selectedId || !parsed.items.some((item) => item.id === selectedId)) {
          setSelectedId(parsed.items[0].id);
        }
      } catch (error) {
        if (cancelled) return;
        setListError(getErrorMessage(error, 'Failed to load enquiries.'));
      } finally {
        if (!cancelled) setIsLoadingList(false);
      }
    };

    fetchList();

    return () => {
      cancelled = true;
    };
  }, [page, search, statusFilter, refreshKey]);

  useEffect(() => {
    if (!selectedId) return;

    let cancelled = false;

    const fetchDetail = async () => {
      setIsLoadingDetail(true);
      setDetailError('');
      setStatusMessage('');
      setStatusError('');

      try {
        const res = await api.get(`/admin/enquiries/${selectedId}`);
        if (cancelled) return;
        const item = normalizeEnquiry(res?.data?.data || {});
        setSelectedEnquiry(item);
        setStatusDraft(item.status || 'new');
      } catch (error) {
        if (cancelled) return;
        setDetailError(getErrorMessage(error, 'Failed to load enquiry details.'));
      } finally {
        if (!cancelled) setIsLoadingDetail(false);
      }
    };

    fetchDetail();

    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  const applySearch = () => {
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleStatusUpdate = async () => {
    if (!selectedId || !statusDraft) return;
    setIsUpdatingStatus(true);
    setStatusMessage('');
    setStatusError('');

    try {
      const payload = { status: statusDraft };

      try {
        await api.patch(`/admin/enquiries/${selectedId}/status`, payload);
      } catch (patchError) {
        const statusCode = patchError?.response?.status;
        if (statusCode === 404 || statusCode === 405) {
          await api.put(`/admin/enquiries/${selectedId}/status`, payload);
        } else {
          throw patchError;
        }
      }

      setStatusMessage('Status updated successfully.');
      setRefreshKey((value) => value + 1);

      const res = await api.get(`/admin/enquiries/${selectedId}`);
      const item = normalizeEnquiry(res?.data?.data || {});
      setSelectedEnquiry(item);
      setStatusDraft(item.status || statusDraft);
    } catch (error) {
      setStatusError(getErrorMessage(error, 'Failed to update status.'));
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Enquiries</h1>
        <p className="text-slate-600">Manage customer enquiries and update their status.</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-slate-700">Search</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') applySearch();
              }}
              placeholder="Search by name, email, company..."
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="button"
              onClick={applySearch}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              <Search size={16} />
              Search
            </button>
          </div>
        </div>

        <div className="w-full md:w-56">
          <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilterChange(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {FILTER_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => setRefreshKey((value) => value + 1)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Enquiry List
            </h2>
            <span className="text-sm text-slate-500">
              {totalItems > 0 ? `${totalItems} total` : `${enquiries.length} shown`}
            </span>
          </div>

          {isLoadingList ? (
            <div className="p-10 text-center text-slate-600">
              <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-blue-600" />
              Loading enquiries...
            </div>
          ) : listError ? (
            <div className="p-10 text-center text-red-600">{listError}</div>
          ) : enquiries.length === 0 ? (
            <div className="p-10 text-center text-slate-500">No enquiries found.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {enquiries.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full px-5 py-4 text-left transition ${
                      isSelected ? 'bg-blue-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {item.fullName || 'Unnamed'}
                        </p>
                        <p className="mt-1 text-xs text-slate-600">{item.workEmail || '—'}</p>
                        <p className="mt-1 text-xs text-slate-500">{item.company || '—'}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                        {(item.status || 'new').replace('_', ' ')}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
            <p className="text-xs text-slate-500">
              Page {page}
              {totalPages > 0 ? ` of ${totalPages}` : ''}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                disabled={page <= 1}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setPage((value) => value + 1)}
                disabled={!canNext}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-700">
            Enquiry Detail
          </h2>

          {!selectedId ? (
            <p className="text-sm text-slate-500">Select an enquiry to view details.</p>
          ) : isLoadingDetail ? (
            <div className="py-8 text-center text-slate-600">
              <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-blue-600" />
              Loading details...
            </div>
          ) : detailError ? (
            <p className="text-sm text-red-600">{detailError}</p>
          ) : selectedEnquiry ? (
            <div className="space-y-5">
              <div className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <UserRound className="mt-0.5 h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Full Name</p>
                    <p className="text-sm font-medium text-slate-900">
                      {selectedEnquiry.fullName || '—'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Work Email</p>
                    <p className="text-sm font-medium text-slate-900">
                      {selectedEnquiry.workEmail || '—'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Company</p>
                <p className="mt-1 text-sm text-slate-900">{selectedEnquiry.company || '—'}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Service Slug</p>
                <p className="mt-1 text-sm text-slate-900">
                  {selectedEnquiry.serviceSlug || '—'}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Submitted At</p>
                <p className="mt-1 text-sm text-slate-900">
                  {formatDate(selectedEnquiry.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Project Details</p>
                <p className="mt-1 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800">
                  {selectedEnquiry.projectDetails || '—'}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">Update Status</p>
                <div className="flex gap-2">
                  <select
                    value={statusDraft}
                    onChange={(e) => setStatusDraft(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleStatusUpdate}
                    disabled={isUpdatingStatus || !statusDraft || statusDraft === activeStatus}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isUpdatingStatus ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Save
                      </>
                    )}
                  </button>
                </div>
                {statusMessage && (
                  <p className="mt-2 text-xs font-medium text-green-600">{statusMessage}</p>
                )}
                {statusError && (
                  <p className="mt-2 text-xs font-medium text-red-600">{statusError}</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">No detail available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
