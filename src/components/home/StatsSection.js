
"use client";

export default function MetricsSection() {
  const stats = [
    { value: "7X", label: "Boost in support team", color: "bg-[#CE80DD]", textColor: "text-white" },
    { value: "40%", label: "Reduction in support costs", color: "bg-[#F9F9FF]", textColor: "text-[#414752]" },
    { value: "70%", label: "Resolution rate", color: "bg-[#CE80DD]", textColor: "text-white" },
    { value: "20%", label: "Improvement in performance", color: "bg-white", textColor: "text-[#414752]" },
  ];

  return (
    <section className="relative w-full px-0 py-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* MAIN CONTAINER CARD */}
        {/* Adjusted rounded corners and padding for mobile */}
        <div className="rounded-[24px] md:rounded-[40px] bg-[#082044] px-5 py-12 md:px-10 lg:px-20">
          
          {/* HEADING */}
          <div className="mx-auto text-center">
            <h2 className="font-['Inter'] font-[700] text-[24px] sm:text-[32px] md:text-[40px] leading-tight lg:leading-[64px] text-white">
              Accelerating performance with AI strategies that turn vision into measurable impact.
            </h2>
            <p className="mt-6 text-[16px] md:text-[20px] text-[#F2F3FB] font-[400] leading-relaxed max-w-3xl mx-auto opacity-90">
              Our goal at LumiLogic is to use AI's disruptive potential to improve and deepen relationships between companies and their clients.
            </p>
          </div>

          {/* METRIC CARDS GRID */}
          {/* Gap reduced for mobile to keep the flow tight */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.color} flex flex-col items-center justify-center rounded-t-[24px] rounded-br-[24px] pt-12 pb-8 md:pt-[80px] md:pb-[40px] px-4 text-center transition-transform hover:scale-105`}
              >
                {/* Changed text-[85px] to text-[60px] on small mobile 
                   to prevent horizontal overflow 
                */}
                <span className={`font-['Inter'] font-[800] text-[60px] md:text-[85px] leading-none ${stat.textColor}`}>
                  {stat.value}
                </span>
                <p className={`mt-4 text-[13px] md:text-[14px] font-semibold uppercase tracking-wide ${stat.textColor} opacity-90`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}