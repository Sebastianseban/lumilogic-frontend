
"use client";



export default function MetricsSection() {
  const stats = [
    { value: "7X", label: "Boost in support team", color: "bg-[#CE80DD]", textColor: "text-white" },
    { value: "40%", label: "Reduction in support costs", color: "bg-[#F9F9FF]", textColor: "text-[#414752]" },
    { value: "70%", label: "Resolution rate", color: "bg-[#CE80DD]", textColor: "text-white" },
    { value: "20%", label: "Improvement in performance", color: "bg-white", textColor: "text-[#414752]" },
  ];

  return (
    <section className="relative w-full px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* MAIN CONTAINER CARD */}
        <div className="rounded-[40px]  bg-[#082044] px-8 py-16 lg:px-20">
          
          {/* HEADING - Figma Specs Applied */}
          <div className="mx-auto  text-center">
            <h2 className="font-['Inter'] font-[700] text-[32px] md:text-[40px] leading-[1.2] lg:leading-[64px] tracking-[0%] text-white">
              Accelerating performance with AI strategies that turn vision into measurable impact.
            </h2>
            <p className="mt-6 text-[20px] text-[#F2F3FB] font-[400] leading-relaxed max-w-3xl mx-auto">
              Our goal at LumiLogic is to use AI's disruptive potential to improve and deepen relationships between companies and their clients.
            </p>
          </div>

          {/* METRIC CARDS GRID */}
          <div className="mt-16 grid grid-cols-1 gap-[56px] sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.color} flex flex-col items-center justify-center rounded-t-[24px]  rounded-br-[24px]  pt-[80px] pb-[40px] px-6 text-center transition-transform hover:scale-105`}
              >
                <span className={`font-['Inter'] font-[800] text-[85px] leading-none ${stat.textColor}`}>
                  {stat.value}
                </span>
                <p className={`mt-4 text-[14px] font-medium leading-tight ${stat.textColor} opacity-80`}>
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