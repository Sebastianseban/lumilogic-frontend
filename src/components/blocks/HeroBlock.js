

import Link from "next/link";

export default function HeroBlock({ data }) {
  return (
    <section className="relative min-h-[600px] pt-40 pb-24 text-center overflow-hidden bg-[#020617]">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-60 bg-cover bg-center"
        style={{ backgroundImage: `url(${data?.backgroundImage || 'app_migration_hero.png'})` }}
      />

      {/* Hero Overlay - Replicating the linear-gradient from your HTML */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to bottom, rgba(2, 6, 23, 0.3) 0%, rgba(2, 6, 23, 0.9) 80%, #020617 100%)"
        }}
      />

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-6">
        {data?.subheading && (
          <p className="text-[#93c5fd] text-sm md:text-base uppercase tracking-[0.2em] mb-4">
            {data.subheading}
          </p>
        )}
        <h1 
          className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight"
          style={{ textShadow: "0 0 30px rgba(96, 165, 250, 0.6)" }}
        >
          {data?.heading}
        </h1>
        
        <p 
          className="max-w-3xl mx-auto text-lg md:text-xl text-[#e2e8f0] mb-10 leading-relaxed"
          style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)" }}
        >
          {data?.description}
        </p>

        {data?.ctaLink && (
          <Link
            href={data?.ctaLink}
            className="inline-flex items-center bg-[#60a5fa] hover:bg-[#3b82f6] text-white px-8 py-3 rounded-md font-semibold transition-all duration-300 shadow-lg"
          >
            {data.ctaText || "Enquire Now"}
          </Link>
        )}
      </div>
    </section>
  );
}
