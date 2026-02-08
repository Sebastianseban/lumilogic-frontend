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

export default function ServicesGridBlock({ data }) {
  return (
    <section className="py-20 bg-[#0f172a]"> {/* Matches bg-darker */}
      <div className="container mx-auto px-6">
        {/* Centered Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">
          {data.heading}
        </h2>

        {/* .list-grid-2 implementation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {data.services.map((service, i) => (
            <div
              key={i}
              className="flex items-center gap-[15px] bg-[#1e293b] p-5 rounded-lg border border-transparent transition-all duration-300 hover:border-[#60a5fa]/30 group"
            >
              {/* Icon - .check-list-item i */}
              <div className="text-[#60a5fa] text-[1.2rem] flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <i className={`fa-solid ${service.icon || 'fa-arrow-right-arrow-left'}`}></i>
              </div>

              {/* Text - .check-list-item span */}
              <span className="text-[#e2e8f0] font-medium text-lg">
                {service.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}