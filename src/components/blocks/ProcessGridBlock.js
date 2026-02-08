// components/blocks/ProcessGridBlock.jsx
export default function ProcessGridBlock({ data }) {
  return (
    <section className="py-20 px-6 lg:px-16 text-white">
      <h2 className="text-3xl font-bold mb-4">{data.heading}</h2>
      <p className="mb-10 text-gray-400">{data.description}</p>

      <div className="grid md:grid-cols-3 gap-8">
        {data.steps.map(step => (
          <div key={step.number} className="bg-[#1B1E27] p-6 rounded-xl">
            <div className="text-[#CE80DD] text-xl font-bold mb-2">
              {step.number}
            </div>
            <h3 className="font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-400 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}