
export default function FeatureSplitBlock({ data }) {
  const isImageRight = data?.imagePosition !== "left";

  return (
    <section className="py-20 bg-[#0f172a]"> {/* bg-darker class */}
      <div className="container mx-auto px-6">
        <div
          className={`flex flex-col lg:flex-row items-center gap-16 ${
            isImageRight ? "" : "lg:flex-row-reverse"
          }`}
        >
          {/* Text Content */}
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
              {data?.heading}
            </h2>
            <p className="text-[#94a3b8] text-lg md:text-xl leading-[1.8]">
              {data?.description}
            </p>
          </div>

          {/* Image / Icon Content */}
          <div className="flex-1 flex justify-center items-center">
            {/* If data.image is an icon class, we use the <i> tag, otherwise <img> */}
            {data?.isIcon ? (
              <div className="animate-[float_6s_ease-in-out_infinite]">
                 <i className={`${data?.image} text-[10rem] text-[#60a5fa] opacity-80`}></i>
              </div>
            ) : (
              <div className="relative group">
                {/* Glow effect behind the image */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#60a5fa] to-[#ce80dd] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <img
                  src={data?.image || 'https://placehold.co/600x400'}
                  alt={data?.heading || 'Feature Image'}
                  className="relative rounded-xl shadow-2xl w-full max-w-lg object-cover animate-[float_6s_ease-in-out_infinite]"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Adding the float animation to your Tailwind config is required, 
          but here it is as an inline style for immediate effect */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
