// // components/blocks/ServicesGridBlock.jsx
// export default function ServicesGridBlock({ data }) {
//   return (
//     <section className="py-24 px-6 lg:px-16 text-white">
//       <h2 className="text-3xl font-bold mb-12">
//         {data.heading}
//       </h2>

//       <div className="grid md:grid-cols-3 gap-8">
//         {data.services.map((service, i) => (
//           <div
//             key={i}
//             className="bg-[#1B1E27] p-6 rounded-xl"
//           >
//             <h3 className="font-semibold mb-2">
//               {service.title}
//             </h3>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import { Box, Cloud, Database, Shield, BarChart3 } from "lucide-react";

const ICON_MAP = {
  Box,
  Cloud,
  Database,
  Shield,
  BarChart: BarChart3,
};

export default function ServicesGridBlock({ data }) {
  const services = data?.services || [];

  return (
    <section className="py-20 bg-[#0f172a]"> {/* Matches bg-darker */}
      <div className="container mx-auto px-6">
        {/* Centered Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">
          {data?.heading}
        </h2>
        {data?.description && (
          <p className="text-center text-[#94a3b8] max-w-3xl mx-auto mb-10 text-lg">
            {data.description}
          </p>
        )}

        {/* .list-grid-2 implementation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {services.map((service, i) => {
            const Icon = ICON_MAP[service?.icon] || Box;
            return (
              <div
                key={service?.id || i}
                className="flex items-start gap-[15px] bg-[#1e293b] p-5 rounded-lg border border-transparent transition-all duration-300 hover:border-[#60a5fa]/30 group"
              >
              <div className="text-[#60a5fa] flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Icon size={22} />
              </div>

              {/* Text - .check-list-item span */}
              <div>
                <h3 className="text-[#e2e8f0] font-medium text-lg">
                  {service?.title}
                </h3>
                {service?.description && (
                  <p className="text-[#94a3b8] text-sm mt-1 leading-relaxed">
                    {service.description}
                  </p>
                )}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
