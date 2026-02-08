export default function BenefitsGridBlock({ data }) {
  return (
    <section className="py-24 px-6 lg:px-16 text-white">
      <h2 className="text-3xl font-bold mb-12">
        {data.heading}
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {data.benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="bg-[#1B1E27] p-6 rounded-xl"
          >
            <h3 className="font-semibold mb-2">
              {benefit.title}
            </h3>
            <p className="text-gray-400 text-sm">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}