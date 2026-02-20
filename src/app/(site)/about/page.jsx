import Link from "next/link";
import { BrainCircuit, CloudCog, ShieldCheck, Target } from "lucide-react";

export const metadata = {
  title: "About Us | LumiLogic",
  description: "Learn about LumiLogic and how we deliver AI and cloud-native transformation.",
};

const pillars = [
  {
    title: "AI Strategy & Delivery",
    description:
      "We design practical AI roadmaps and ship production-ready solutions aligned with business outcomes.",
    icon: BrainCircuit,
  },
  {
    title: "Cloud-Native Engineering",
    description:
      "From migration to modernization, we help teams build resilient systems on AWS with speed and control.",
    icon: CloudCog,
  },
  {
    title: "Security & Governance",
    description:
      "We embed security, compliance, and operational governance into every stage of your platform journey.",
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070C1C] pt-32 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-[#4EA1FF]/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#CE80DD]/20 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 pb-24 md:px-10 lg:px-[72px]">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#CE80DD]">
            About LumiLogic
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            We help organizations turn AI and cloud ambition into measurable results.
          </h1>
          <p className="mt-5 text-base text-white/75">
            LumiLogic is an AI and cloud consulting company focused on building scalable
            digital platforms, modernizing applications, and accelerating data-driven
            decision making for growth-focused businesses.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="mb-4 inline-flex rounded-lg bg-[#CE80DD]/15 p-2 text-[#CE80DD]">
              <Target size={18} />
            </div>
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="mt-3 text-white/75">
              To make advanced technology practical and impactful. We combine strategic
              thinking with engineering execution so teams can move faster, reduce risk,
              and create durable competitive advantage.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111733]/60 p-6 md:p-8">
            <h2 className="text-2xl font-semibold">What We Believe</h2>
            <ul className="mt-4 space-y-3 text-white/75">
              <li>Outcome first, technology second.</li>
              <li>Simple architectures scale better than complicated ones.</li>
              <li>Security and reliability are non-negotiable.</li>
              <li>Strong partnerships drive better transformation outcomes.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#4EA1FF]/60 hover:bg-white/[0.06]"
              >
                <div className="mb-4 inline-flex rounded-lg bg-[#4EA1FF]/15 p-2 text-[#4EA1FF]">
                  <Icon size={18} />
                </div>
                <h3 className="text-lg font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-sm text-white/70">{pillar.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-[#131A39] to-[#1D1536] p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Let&apos;s work on your next transformation.</h2>
          <p className="mt-3 max-w-3xl text-white/75">
            Whether you&apos;re starting with cloud migration or scaling enterprise AI, our team can
            help you define, build, and run with confidence.
          </p>
          <div className="mt-6">
            <Link
              href="/enquiry"
              className="inline-flex items-center justify-center rounded-xl bg-[#CE80DD] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#bc6dcb]"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
