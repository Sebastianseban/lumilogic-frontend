import { notFound } from "next/navigation";
import BlockRenderer from "@/components/BlockRenderer";

export async function generateMetadata({ params }) {
  const res = await fetch(
    `http://localhost:4000/api/v1/pages/${params.slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return {};
  const { data: page } = await res.json();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description,
  };
}

export default async function Page({ params }) {
  const res = await fetch(
    `http://localhost:4000/api/v1/pages/${params.slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) notFound();

  const { data: page } = await res.json();

  return (
    <main className="bg-[#020617]">
      <BlockRenderer blocks={page.blocks} />
    </main>
  );
}