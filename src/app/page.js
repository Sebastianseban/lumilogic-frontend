import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import Image from "next/image";

export default function Home() {
  return (
   <div className="w-full bg-[#070C1C] px-[72px]">
     <HeroSection/>
     <StatsSection/>
     <WhyChooseSection/>
     <TestimonialsSection/>
   </div>
  );
}
