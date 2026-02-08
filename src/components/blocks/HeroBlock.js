// components/blocks/HeroBlock.jsx
import Link from "next/link";

export default function HeroBlock({ data }) {
  return (
    <section
      className="relative min-h-[80vh] flex items-center text-white"
      style={{
        backgroundImage: `url(${data.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-5xl px-6 lg:px-16">
        <h1 className="text-5xl font-bold mb-4">{data.heading}</h1>
        <h2 className="text-2xl mb-4 text-gray-200">{data.subheading}</h2>
        <p className="max-w-2xl mb-6 text-gray-300">{data.description}</p>

        <Link
          href={data.ctaLink}
          className="inline-block bg-[#CE80DD] px-6 py-3 rounded-lg font-semibold"
        >
          {data.ctaText}
        </Link>
      </div>
    </section>
  );
}