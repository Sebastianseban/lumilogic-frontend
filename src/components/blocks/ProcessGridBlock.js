
export default function ProcessGridBlock({ data }) {
  const steps = data?.steps || [];

  return (
    <section className="py-20 px-6 bg-[#020617]"> {/* section-padding */}
      <div className="container mx-auto">
        {/* Centered Header */}
        <h2 className="text-3xl md:text-[2.5rem] font-bold mb-4 text-center text-white leading-tight">
          {data?.heading}
        </h2>
        <p className="text-center text-[#94a3b8] max-w-2xl mx-auto mb-12 text-lg">
          {data?.description}
        </p>

        {/* The process-grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {steps.map((step, index) => (
            <div
              key={step?.id || index}
              className="group relative bg-[rgba(30,41,59,0.5)] p-[30px] rounded-[12px] border border-[rgba(148,163,184,0.1)] transition-all duration-300 hover:-translate-y-[5px] hover:border-[#CE80DD]"
            >
              {/* .process-number */}
              <div className="text-[2rem] font-bold text-[#CE80DD] opacity-50 mb-[15px]">
                {/* Dynamically ensures 01, 02 format if not provided in data */}
                {step?.number || (index + 1).toString().padStart(2, '0')}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold mb-3 text-white">
                {step?.title}
              </h3>
              <p className="text-[#94a3b8] text-[0.95rem] leading-relaxed">
                {step?.description}
              </p>

              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
