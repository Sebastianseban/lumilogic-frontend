"use client";

import { Lightbulb, Handshake, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function WhyChooseSection() {
  const features = [
    {
      title: "Innovative Solutions",
      desc: "Experience the forefront of AI innovation with LumiLogic. Our cutting-edge technology is designed to revolutionize the way you engage with your customers, ensuring you stay ahead of the competition.",
      icon: (
        <Image
          src="/images/hero/idea.svg"
          alt="AI Brain"
          width={72}
          height={120}
          priority
          className="object-contain"
          
        />
      ),
    },
    {
      title: "Tailored Approach",
      desc: "We understand that every business is unique. That's why we take a personalized approach to every client, working closely with you to understand your specific needs and goals and tailor our solutions accordingly.",
      icon:    <Image
          src="/images/handshake.svg"
          alt="AI Brain"
          width={120}
          height={85}
          priority
          className="object-contain "
          
        />
    },
    {
      title: "NextGen Solutions",
      desc: "With LumiLogic, you're not just investing in today's solutions; you're investing in the future. Our technology is constantly evolving to keep pace with the latest advancements in AI, ensuring your business stays ahead of the curve.",
      icon:    <Image
          src="/images/trending.svg"
          alt="AI Brain"
          width={110}
          height={93}
          priority
          className="object-contain"
          
        />
    },
  ];

  return (
    <section className="relative w-full px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        {/* SECTION TITLE - Figma: 862px x 77px Hug */}

        <div className="mx-auto mb-20 flexjustify-center text-center">
          <h2 className="font-['Inter'] font-[700] text-[58px] leading-[100%] uppercase bg-gradient-to-b from-[#5A4AE8] to-[#599FF9] bg-clip-text text-transparent py-2">
            WHY CHOOSE LUMILOGIC?
          </h2>
        </div>

        {/* FEATURES GRID */}
    

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 justify-items-center">
  {features.map((item, index) => (
    <div
      key={index}
      className="relative flex flex-col items-center text-center"
      style={{
        width: '405px',
        height: '479px',
      }}
    >
      {/* GRADIENT BORDER + BACKGROUND 
        - 4px border width 
        - 40px border radius
        - Vertical gradient: #5A4AE8 to #599FF9 (180deg)
      */}
      <div 
        className="absolute inset-0 rounded-[40px] border-[4px] border-transparent"
        style={{
          background: `
            linear-gradient(#070C1C, #070C1C) padding-box, 
            linear-gradient(180deg, #5A4AE8 0%, #599FF9 100%) border-box
          `,
        }}
      />

      {/* CONTENT AREA 
          Applying your exact padding and gap specs
      */}
      <div className="
        relative z-10 w-full h-full 
        pt-[40px] pr-[16px] pb-[40px] pl-[16px] 
        flex flex-col items-center gap-[24px]
      ">
        <div className="flex h-24 w-24 items-center justify-center shrink-0">
          {item.icon}
        </div>

        <h3 className="font-['Inter'] mt-[64px] font-semibold text-[32px] leading-tight text-[#F9F9FF]">
          {item.title}
        </h3>

        <p className="font-['Inter']  text-[16px] leading-[1.8] text-[#BED6FE]">
          {item.desc}
        </p>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
}
