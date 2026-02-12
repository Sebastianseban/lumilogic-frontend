
"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection({ data }) {
  
  const heading = data?.heading;
  const description = data?.description;

  
  const isHome = !data;

  return (
    <section className="relative sm:min-h-screen w-full overflow-hidden text-white">
      {/* --- HERO CONTENT --- */}
      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-6 pt-24 md:px-10 md:pt-32 lg:pt-48">
        
     
        <div className="relative z-20 max-w-2xl mt-20 md:mt-40 lg:mt-64">
          {isHome ? (
            <>
              <p className="font-['Inter'] text-[24px] md:text-[32px] font-light leading-none text-[#FCF8FF]">
                Empower Your Business with
              </p>
              
              <h1 className="mt-4 md:mt-6 font-['Inter'] text-[35px] sm:text-[50px] md:text-[64px] font-[800] leading-[1.1] text-[#5A4AE8]">
                <span className="bg-gradient-to-r from-[#5A4AE8] to-[#599FF9] bg-clip-text text-transparent">
                  AI & Cloud-Native
                  <br className="hidden sm:block" />
                  Technologies
                </span>
              </h1>
            </>
          ) : (
            <>
              <h1 className="font-['Inter'] text-[35px] sm:text-[45px] md:text-[50px] font-[800] leading-[1.1] text-[#5A4AE8]">
                <span className="bg-gradient-to-r from-[#5A4AE8] to-[#599FF9] bg-clip-text text-transparent">
                  {heading}
                </span>
              </h1>
              {description && (
                <p className="mt-6 text-[18px] md:text-[20px] text-[#F2F3FB] font-light leading-relaxed opacity-90">
                  {description}
                </p>
              )}
            </>
          )}

         
          {isHome && (
            <Link
              href="/services"
              className="mt-8 flex items-center justify-center w-[180px] md:w-[199px] h-[41px] rounded-[16px] border border-[#CE80DD] text-white transition-all hover:bg-[#CE80DD]/10 hover:shadow-[0_0_15px_rgba(206,128,221,0.4)]"
            >
              <span className="font-['Inter'] text-[#CE80DD] font-[500] text-[12px] md:text-[14px] leading-[100%] tracking-[0%] uppercase">
                OUR SERVICES &gt;&gt;&gt;
              </span>
            </Link>
          )}
        </div>

        {/* --- BRAIN IMAGE --- */}
        {/* Only show on Home for now unless we have a dynamic image field */}
        {isHome && (
          <div className="pointer-events-none absolute left-[460px] hidden lg:block top-20">
            <div className="relative h-[1254px] w-[896px]">
              <Image
                src="/images/hero/heroimage.png"
                alt="AI Brain"
                width={896}
                height={1254}
                priority
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}