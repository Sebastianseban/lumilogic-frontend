import HeroSection from "./home/HeroSection";
import StatsSection from "./home/StatsSection";
import WhyChooseSection from "./home/WhyChooseSection";
import TestimonialsSection from "./home/TestimonialsSection";

const BLOCKS = {
  hero: HeroSection,
  stats: StatsSection,
  why_choose: WhyChooseSection,
  testimonials: TestimonialsSection,
};

export default function BlockRenderer({ blocks = [] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const Component = BLOCKS[block.type];
        if (!Component) return null;
        return <Component key={index} {...block} />;
      })}
    </>
  );
}