// components/blocks/LogoGridBlock.jsx
export default function LogoGridBlock({ data }) {
  return (
    <section className="py-24 px-6 lg:px-16 bg-[#0B1020] text-white">
      <h2 className="text-3xl font-bold mb-12">
        {data.heading}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-12 items-center">
        {data.logos.map((logo) => (
          <div key={logo.name} className="text-center">
            <img
              src={logo.image}
              alt={logo.name}
              className="mx-auto h-16 object-contain"
            />
            <p className="mt-2 text-sm text-gray-400">
              {logo.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}