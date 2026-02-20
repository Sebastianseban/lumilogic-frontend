import { Mail, MapPin, Phone, Clock } from "lucide-react";
import EnquiryForm from "@/components/enquiry/EnquiryForm";

export const metadata = {
  title: "Enquiry | LumiLogic",
  description: "Get in touch with LumiLogic for AI and cloud consulting.",
};

export default function EnquiryPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070C1C] pt-32 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#4EA1FF]/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#CE80DD]/20 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 pb-24 md:px-10 lg:px-[72px]">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#CE80DD]">
            Let&apos;s Build Together
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Tell us what you need and we&apos;ll get back to you.
          </h1>
          <p className="mt-4 text-base text-white/75">
            Share your requirements for cloud migration, AI initiatives, or modernization.
            Our team responds within one business day.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <p className="mt-2 text-sm text-white/70">
              Reach us directly or submit the enquiry form.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <Mail className="mt-1 text-[#CE80DD]" size={18} />
                <div>
                  <p className="text-sm text-white/60">Email</p>
                  <p className="text-sm font-medium">info@lumilogic.ai</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="mt-1 text-[#CE80DD]" size={18} />
                <div>
                  <p className="text-sm text-white/60">Phone</p>
                  <p className="text-sm font-medium">+65-855-502-49</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="mt-1 text-[#CE80DD]" size={18} />
                <div>
                  <p className="text-sm text-white/60">Office</p>
                  <p className="text-sm font-medium">
                    8 Sentosa Gateway, Sentosa Island, Singapore 098269
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="mt-1 text-[#CE80DD]" size={18} />
                <div>
                  <p className="text-sm text-white/60">Hours</p>
                  <p className="text-sm font-medium">Mon - Fri, 9:00 AM - 6:00 PM (SGT)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111733]/60 p-6 shadow-2xl backdrop-blur-sm md:p-8">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
