
export default function LogoGridBlock({ data }) {
  const logos = data?.logos || [];

  return (
    <section className="py-20 bg-[#0f172a]"> {/* bg-darker */}
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          {data?.heading}
        </h2>

        {/* .tech-grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {logos.map((logo, index) => {
            const imageSrc = logo?.imageUrl || logo?.image;
            return (
            <div
              key={logo?.id || index}
              className="bg-[rgba(15,23,42,0.6)] p-[25px] rounded-[10px] border-t-3 border-[#60a5fa] text-center transition-all duration-300 hover:bg-[rgba(15,23,42,0.8)]"
            >
              {/* Image/Logo area */}
              {imageSrc && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={imageSrc}
                    alt={logo?.name || 'Logo'}
                    className="h-12 object-contain filter brightness-110"
                  />
                </div>
              )}

              {/* h4 in your HTML */}
              <h4 className="text-lg font-semibold mb-[10px] text-[#e2e8f0]">
                {logo?.name}
              </h4>

              {/* p in your HTML */}
              <p className="text-[#94a3b8] text-[0.9rem] leading-relaxed">
                {logo?.description}
              </p>
            </div>
            );
          })}
        </div>
      </div>

      {/* Tailwind doesn't have border-t-3 by default, adding via style or arbitrary class */}
      <style jsx>{`
        .border-t-3 {
          border-top-width: 3px;
        }
      `}</style>
    </section>
  );
}
