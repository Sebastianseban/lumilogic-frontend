// components/blocks/FeatureSplitBlock.jsx
export default function FeatureSplitBlock({ data }) {
  const isImageRight = data.imagePosition === "right";

  return (
    <section className="py-20 px-6 lg:px-16 text-white">
      <div
        className={`flex flex-col lg:flex-row items-center gap-12 ${
          isImageRight ? "" : "lg:flex-row-reverse"
        }`}
      >
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">{data.heading}</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            {data.description}
          </p>
        </div>
        <div className="flex-1 w-full">
          <img
            src={data.image}
            alt={data.heading}
            className="rounded-xl shadow-lg w-full max-w-md mx-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}