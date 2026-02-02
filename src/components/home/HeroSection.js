"use client";

import Image from "next/image";
import Link from "next/link";


export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden  text-white">
      {/* --- HERO CONTENT --- */}
      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-10 pt-32 lg:pt-48">
        <div className="relative z-60 max-w-2xl mt-65">
          <p className="font-['Inter'] text-[32px] font-light leading-none text-[#FCF8FF]">
            Empower Your Business with
          </p>
          <h1 className="mt-6 font-['Inter'] text-[64px] font-[800] leading-[1.1] text-[#5A4AE8]">
            <span className="bg-gradient-to-r from-[#5A4AE8] to-[#599FF9] bg-clip-text text-transparent">
              AI & Cloud-Native
              <br />
              Technologies
            </span>
          </h1>

          {/* Rounded Outline Button from Screenshot */}
          <Link
            href="/services"
            className="mt-5 flex items-center justify-center w-[199px] h-[41px] rounded-[16px] border border-[#CE80DD] text-white transition-all hover:bg-[#CE80DD]/10 hover:shadow-[0_0_15px_rgba(206,128,221,0.4)]"
          >
            <span className="font-['Inter'] text-[#CE80DD] font-[500] text-[14px] leading-[100%] tracking-[0%] uppercase">
              OUR SERVICES &gt;&gt;&gt;
            </span>
          </Link>
        </div>

        {/* --- BRAIN IMAGE (Figma Specs) --- */}
        <div className="pointer-events-none absolute left-[460px] hidden lg:block">
          <div className="relative h-[1254px] w-[896px]">
            <Image
              src="/images/hero/san 1 1.png"
              alt="AI Brain"
              width={896}
              height={1254}
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
