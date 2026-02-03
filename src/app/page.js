// import HeroSection from "@/components/home/HeroSection";
// import StatsSection from "@/components/home/StatsSection";
// import TestimonialsSection from "@/components/home/TestimonialsSection";
// import WhyChooseSection from "@/components/home/WhyChooseSection";
// import Image from "next/image";

// export default function Home() {
//   return (
//    <div className="w-full bg-[#070C1C] px-[72px]">
//      <HeroSection/>
//      <StatsSection/>
//      <WhyChooseSection/>
//      <TestimonialsSection/>
//    </div>
//   );
// }
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";

export default function Home() {
  return (
    /* Changed px-[72px] to responsive padding:
       - px-4: Small mobile (16px)
       - md:px-10: Tablets (40px)
       - lg:px-[72px]: Desktop (Your original spec)
    */
    <main className="w-full bg-[#070C1C] px-4 md:px-10 lg:px-[72px] overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <WhyChooseSection />
      <TestimonialsSection />
    </main>
  );
}