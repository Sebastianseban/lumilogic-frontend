"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import BlockRenderer from "@/components/blocks/BlockRenderer";

const findCategoryBySlug = (items, slug) => {
  for (const item of items || []) {
    if (item?.slug === slug) return item;
    const found = findCategoryBySlug(item?.children || [], slug);
    if (found) return found;
  }
  return null;
};

const getCategoryLinks = (category) => {
  const links = [];
  const seen = new Set();

  const pushLink = (node, parentTitle = "") => {
    if (!node?.slug || seen.has(node.slug)) return;
    seen.add(node.slug);
    links.push({
      id: node._id || `${parentTitle}-${node.slug}`,
      title: parentTitle ? `${parentTitle} / ${node.title}` : node.title,
      slug: node.slug,
    });
  };

  for (const child of category?.children || []) {
    if (child?.children?.length) {
      for (const grandChild of child.children) {
        pushLink(grandChild, child.title);
      }
    } else {
      pushLink(child);
    }
  }

  return links;
};

export default function Page() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const [page, setPage] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    const loadContent = async () => {
      setLoading(true);
      setError(null);
      setPage(null);
      setCategory(null);

      try {
        const pageRes = await api.get(`/pages/${slug}`);
        if (cancelled) return;
        setPage(pageRes?.data?.data || null);
        setLoading(false);
        return;
      } catch (_) {
        // Fall back to category landing when route matches a category slug.
      }

      try {
        const menuRes = await api.get("/menu");
        if (cancelled) return;
        const menu = menuRes?.data?.data || [];
        const matchedCategory = findCategoryBySlug(menu, slug);

        if (matchedCategory) {
          setCategory(matchedCategory);
        } else {
          setError("Page not found.");
        }
      } catch (_) {
        if (!cancelled) {
          setError("Failed to load page content.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadContent();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return <div className="pt-32 text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="pt-32 text-center text-red-500">{error}</div>;
  }

  if (category) {
    const categoryLinks = getCategoryLinks(category);

    return (
      <main className="pt-32 min-h-screen text-white">
        <section className="mx-auto max-w-6xl px-6 py-14 lg:px-10">
          <p className="text-xs tracking-[0.2em] uppercase text-[#CE80DD]">Category</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold">{category.title}</h1>
          <p className="mt-4 text-white/70 max-w-2xl">
            Browse the available pages in this section.
          </p>

          {categoryLinks.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryLinks.map((item) => (
                <Link
                  key={item.id}
                  href={`/${item.slug}`}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-[#4EA1FF]/60 hover:bg-white/[0.06]"
                >
                  <div className="text-sm text-white/80">{item.title}</div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-6 text-white/70">
              No child pages are linked to this category yet.
            </div>
          )}
        </section>
      </main>
    );
  }

  if (!page) {
    return <div className="pt-32 text-center text-white">Page not found</div>;
  }

  return (
    <main className="pt-32">
      {page.blocks && page.blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </main>
  );
}
