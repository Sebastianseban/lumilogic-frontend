"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

const initialForm = {
  fullName: "",
  workEmail: "",
  company: "",
  serviceSlug: "",
  projectDetails: "",
};

const collectLeafMenuOptions = (items, path = [], options = [], seen = new Set()) => {
  for (const item of items || []) {
    const title = item?.title?.trim();
    const slug = item?.slug?.trim();
    const children = Array.isArray(item?.children) ? item.children : [];
    const nextPath = title ? [...path, title] : path;

    if (children.length > 0) {
      collectLeafMenuOptions(children, nextPath, options, seen);
      continue;
    }

    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    options.push({
      value: slug,
      label: nextPath.length ? nextPath.join(" / ") : slug,
    });
  }

  return options;
};

const getErrorMessage = (error) => {
  const apiMessage =
    error?.response?.data?.message || error?.response?.data?.error;
  return apiMessage || "Failed to submit enquiry. Please try again.";
};

export default function EnquiryForm() {
  const [form, setForm] = useState(initialForm);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadServiceOptions = async () => {
      setIsLoadingServices(true);
      try {
        const res = await api.get("/menu");
        if (cancelled) return;
        const menu = res?.data?.data || [];
        const options = collectLeafMenuOptions(menu);
        setServiceOptions(options);
      } catch (_) {
        if (!cancelled) {
          setServiceOptions([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingServices(false);
        }
      }
    };

    loadServiceOptions();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const payload = {
        fullName: form.fullName.trim(),
        workEmail: form.workEmail.trim(),
        company: form.company.trim(),
        serviceSlug: form.serviceSlug,
        projectDetails: form.projectDetails.trim(),
      };

      const response = await api.post("/enquiries", payload);
      setSuccessMessage(
        response?.data?.message || "Enquiry submitted successfully."
      );
      setForm(initialForm);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold">Enquiry Form</h2>
      <p className="mt-2 text-sm text-white/70">
        Fill out the form and our team will reach out shortly.
      </p>

      {successMessage && (
        <div className="mt-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {errorMessage}
        </div>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="mb-2 block text-sm text-white/70">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-[#0A1029] px-4 py-3 text-sm outline-none transition placeholder:text-white/30 focus:border-[#4EA1FF]"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="workEmail" className="mb-2 block text-sm text-white/70">
              Work Email
            </label>
            <input
              id="workEmail"
              name="workEmail"
              type="email"
              required
              value={form.workEmail}
              onChange={(e) => handleChange("workEmail", e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-[#0A1029] px-4 py-3 text-sm outline-none transition placeholder:text-white/30 focus:border-[#4EA1FF]"
              placeholder="name@company.com"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="company" className="mb-2 block text-sm text-white/70">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              required
              value={form.company}
              onChange={(e) => handleChange("company", e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-[#0A1029] px-4 py-3 text-sm outline-none transition placeholder:text-white/30 focus:border-[#4EA1FF]"
              placeholder="Your company"
            />
          </div>

          <div>
            <label htmlFor="serviceSlug" className="mb-2 block text-sm text-white/70">
              Service Interest
            </label>
            <select
              id="serviceSlug"
              name="serviceSlug"
              required
              value={form.serviceSlug}
              onChange={(e) => handleChange("serviceSlug", e.target.value)}
              disabled={isLoadingServices || serviceOptions.length === 0}
              className="w-full rounded-xl border border-white/15 bg-[#0A1029] px-4 py-3 text-sm outline-none transition focus:border-[#4EA1FF]"
            >
              {isLoadingServices ? (
                <option value="" disabled>
                  Loading services...
                </option>
              ) : serviceOptions.length === 0 ? (
                <option value="" disabled>
                  No services available
                </option>
              ) : (
                <>
                  <option value="" disabled>
                    Select a service
                  </option>
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </>
              )}
            </select>
            {!isLoadingServices && serviceOptions.length === 0 && (
              <p className="mt-2 text-xs text-red-300">
                Unable to load services from menu API.
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="projectDetails" className="mb-2 block text-sm text-white/70">
            Project Details
          </label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            rows={6}
            required
            value={form.projectDetails}
            onChange={(e) => handleChange("projectDetails", e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-[#0A1029] px-4 py-3 text-sm outline-none transition placeholder:text-white/30 focus:border-[#4EA1FF]"
            placeholder="Need help with cloud migration and modernization roadmap."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-xl bg-[#CE80DD] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#bc6dcb] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Submitting..." : "Submit Enquiry"}
        </button>
      </form>
    </>
  );
}
