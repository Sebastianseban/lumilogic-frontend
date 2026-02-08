

export default function BenefitsGridBlock({ data }) {
  return (
    <section className="py-20 px-6 bg-[#020617]"> {/* section-padding */}
      <div className="container mx-auto">

        {/* Header matching your HTML structure */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
          {data.heading}
        </h2>
        <p className="text-center text-[#94a3b8] max-w-2xl mx-auto mb-12">
          {data.subheading || "We follow a structured and proven methodology to ensure smooth transitions with minimal risk."}
        </p>

        {/* The process-grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.benefits.map((benefit, index) => (
            <div
              key={index}
              className="process-card group relative bg-[rgba(30,41,59,0.5)] p-8 rounded-[12px] border border-[rgba(148,163,184,0.1)] transition-all duration-300 hover:-translate-y-[5px] hover:border-[#CE80DD]"
            >
              {/* The process-number */}
              <div className="text-[2rem] font-bold text-[#CE80DD] opacity-50 mb-4 font-inter">
                {(index + 1).toString().padStart(2, '0')}
              </div>

              {/* Title and Description */}
              <h3 className="text-xl font-bold mb-3 text-white">
                {benefit.title}
              </h3>
              <p className="text-[#94a3b8] leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .process-card {
           /* Ensure the border transition uses your accent-purple variable */
           transition: transform 0.3s, border-color 0.3s;
        }
      `}</style>
    </section>
  );
}