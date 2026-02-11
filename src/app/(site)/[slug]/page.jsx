"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import BlockRenderer from "@/components/blocks/BlockRenderer";

export default function Page() {
  const params = useParams();
  const slug = params?.slug;
  
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    api.get(`/pages/${slug}`)
      .then(res => {
        setPage(res.data.data);
        setError(null);
      })
      .catch(err => {
        setError("Failed to load page content.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="pt-32 text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="pt-32 text-center text-red-500">{error}</div>;
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