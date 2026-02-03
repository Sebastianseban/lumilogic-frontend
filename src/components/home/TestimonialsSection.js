// "use client";

// import Image from "next/image";

// import { MoveLeft, MoveRight } from "lucide-react";

// export default function TestimonialsSection() {
//   return (
//     <section className="relative w-full px-6 py-24 text-white">
//       <div className="mx-auto max-w-7xl">
//         {/* SECTION TITLE - Figma: 862px x 77px Hug */}

//         <div className="mb-20 flex justify-between items-center ">
//           <h2 className="font-['Inter'] font-[700] text-[48px] leading-[100%] uppercase bg-gradient-to-b from-[#5A4AE8] to-[#599FF9] bg-clip-text text-transparent py-2">
//             What our customer says about us
//           </h2>

//         <div className="flex gap-6">
//             <div className="border-2 border-[#CE80DD] px-7 py-1 rounded-2xl">
//             <MoveLeft className="text-[#CE80DD]" />
//           </div>
//           <div className="border-2 border-[#CE80DD] px-7 py-1 rounded-2xl">
//             <MoveRight className="text-[#CE80DD]" />
//           </div>
//         </div>

//                 {/* TESTIMONIAL CARD - Matches Figma Panel Exactly */}

//         </div>
//                 <div 
//           className="w-full max-w-[1296px] min-h-[550px] mx-auto relative rounded-[40px] bg-[#082044] border border-[#599FF9]/20"
//           style={{
//             padding: '40px 24px', // Figma Padding: T/B 40, L/R 24
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '38px' // Figma Gap: 38px
//           }}
//         >
//           {/* Client Info Area */}
//           <div className="flex items-center gap-4">
//             <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-[#599FF9]/30">
//               <Image 
//                 src="/images/clinet.svg" // Ensure this path exists
//                 alt="Client"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <div className="flex flex-col">
//               <h4 className="font-['Inter'] font-bold text-white text-[18px]">Client name</h4>
//               <p className="text-[#CE80DD] text-[14px] font-medium">CTO , Company name</p>
//             </div>
//           </div>

//           {/* Testimonial Text */}
//           <p className="font-['Inter'] text-[18px] leading-[1.8] text-[#F2F3FB] opacity-90">
//             Lorem ipsum dolor sit amet consectetur. Tristique amet netus odio enim justo tellus ac ante. 
//             Vitae pulvinar aliquet massa etiam nec congue. Bibendum in diam aliquam eget lorem diam et 
//             ullamcorper varius. Ullamcorper tincidunt eros habitasse sit lectus donec in tellus. 
//             Venenatis hac nec auctor arcu sed eget quis orci. Ornare tortor sit sapien nulla in amet. 
//             Proin vestibulum sem arcu turpis suspendisse tempor. Nisl tincidunt pretium tempor odio. 
//             Urna diam ornare auctor viverra sed vel feugiat vulputate. Et ut commodo tincidunt ac. 
//             In nisl vulputate consectetur in bibendum. Platea aliquam felis vestibulum fermentum. 
//             Malesuada vel integer lectus velit lectus. Nec parturient lobortis dignissim fames varius.
//             <br /><br />
//             Mattis tortor id amet erat in magna. Congue vestibulum ut feugiat duis dui eu tincidunt imperdiet. 
//             Consectetur dignissim scelerisque aenean etiam. Euismod fermentum ipsum dictum aenean facilisis 
//             quam sit egestas molestie. Fermentum viverra elementum netus sagittis arcu ullamcorper. 
//             Urna id convallis dictumst scelerisque vitae proin scelerisque integer molestie. 
//             Morbi interdum varius nunc iaculis. Quis hac urna cursus eu hendrerit.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";
import { MoveLeft, MoveRight } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="relative w-full px-4 md:px-6 py-16 md:py-24 text-white">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER AREA - Stacks on mobile, side-by-side on md+ */}
        <div className="mb-10 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <h2 className="font-['Inter'] font-[700] text-[30px] sm:text-[36px] md:text-[48px] leading-[1.1] uppercase bg-gradient-to-b from-[#5A4AE8] to-[#599FF9] bg-clip-text text-transparent py-2 max-w-2xl">
            What our customer says about us
          </h2>

          <div className="flex gap-4 self-end md:self-auto">
            <button className="border-2 border-[#CE80DD] px-5 py-1 md:px-7 md:py-1 rounded-2xl transition-colors hover:bg-[#CE80DD]/10" aria-label="Previous testimonial">
              <MoveLeft className="text-[#CE80DD]" />
            </button>
            <button className="border-2 border-[#CE80DD] px-5 py-1 md:px-7 md:py-1 rounded-2xl transition-colors hover:bg-[#CE80DD]/10" aria-label="Next testimonial">
              <MoveRight className="text-[#CE80DD]" />
            </button>
          </div>
        </div>

        {/* TESTIMONIAL CARD */}
        <div 
          className="w-full max-w-[1296px] mx-auto relative rounded-[32px] md:rounded-[40px] bg-[#082044] border border-[#599FF9]/20 flex flex-col gap-6 md:gap-[38px] p-6 md:p-10 lg:p-[40px_24px]"
        >
          {/* Client Info Area */}
          <div className="flex items-center gap-4">
            <div className="relative w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full overflow-hidden border-2 border-[#599FF9]/30 shrink-0">
              <Image 
                src="/images/clinet.svg" 
                alt="Client Avatar"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="font-['Inter'] font-bold text-white text-[16px] md:text-[18px]">Client name</h4>
              <p className="text-[#CE80DD] text-[13px] md:text-[14px] font-medium uppercase tracking-wider">CTO, Company name</p>
            </div>
          </div>

          {/* Testimonial Text - Font size reduced for mobile */}
          <div className="font-['Inter'] text-[15px] md:text-[18px] leading-[1.6] md:leading-[1.8] text-[#F2F3FB] opacity-90">
            <p>
              Lorem ipsum dolor sit amet consectetur. Tristique amet netus odio enim justo tellus ac ante. 
              Vitae pulvinar aliquet massa etiam nec congue. Bibendum in diam aliquam eget lorem diam et 
              ullamcorper varius. Ullamcorper tincidunt eros habitasse sit lectus donec in tellus. 
              Venenatis hac nec auctor arcu sed eget quis orci. Ornare tortor sit sapien nulla in amet.
            </p>
            <br />
            <p className="hidden xs:block">
              Mattis tortor id amet erat in magna. Congue vestibulum ut feugiat duis dui eu tincidunt imperdiet. 
              Consectetur dignissim scelerisque aenean etiam. Euismod fermentum ipsum dictum aenean facilisis 
              quam sit egestas molestie. Fermentum viverra elementum netus sagittis arcu ullamcorper.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}