"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  X, 
  Facebook, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight 
} from "lucide-react";
import api from "@/lib/api";

const toHref = (slug) => {
  if (!slug) return "#";
  return `/${String(slug).replace(/^\/+/, "")}`;
};

const uniqueLinks = (links) => {
  const seen = new Set();
  return links.filter((item) => {
    const key = item.href || item.label;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const extractLeafLinks = (items = []) => {
  const result = [];

  const walk = (nodes) => {
    for (const node of nodes || []) {
      const children = Array.isArray(node?.children) ? node.children : [];
      if (children.length > 0) {
        walk(children);
      } else if (node?.title && node?.slug) {
        result.push({ label: node.title, href: toHref(node.slug) });
      }
    }
  };

  walk(items);
  return result;
};

export default function Footer() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    let cancelled = false;

    api
      .get("/menu")
      .then((res) => {
        if (!cancelled) {
          setMenu(res?.data?.data || []);
        }
      })
      .catch(() => {
        if (!cancelled) setMenu([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const usefulLinks = useMemo(() => {
    const links = uniqueLinks([
      { label: "Home", href: "/" },
      ...(menu || []).map((item) => ({
        label: item?.title || "",
        href: toHref(item?.slug),
      })),
      { label: "About Us", href: "/about" },
      { label: "Enquiry", href: "/enquiry" },
    ]).filter((item) => item.label && item.href !== "#");

    return links.length > 0
      ? links
      : [
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Enquiry", href: "/enquiry" },
        ];
  }, [menu]);

  const serviceLinks = useMemo(() => {
    const servicesNode =
      (menu || []).find((item) => {
        const title = (item?.title || "").toLowerCase();
        const slug = (item?.slug || "").toLowerCase();
        return title === "services" || slug === "services";
      }) || null;

    const source = servicesNode
      ? servicesNode.children?.length
        ? servicesNode.children
        : [servicesNode]
      : menu;

    const links = uniqueLinks(extractLeafLinks(source)).slice(0, 12);

    return links.length > 0
      ? links
      : [
          { label: "About Us", href: "/about" },
          { label: "Enquiry", href: "/enquiry" },
        ];
  }, [menu]);

  return (
    <footer className="w-full bg-[#020617] pt-24 pb-12 px-6 text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* COLUMN 1: LOGO & ABOUT */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <Image 
                src="/images/logo.svg" 
                alt="LumiLogic Logo" 
                width={40} 
                height={43} 
                className="object-contain"
              />

                 <div className="flex flex-col">
            <h1 className="font-['Inter'] font-bold text-[24px] lg:text-[28px] leading-none text-white">
              LumiLogic
            </h1>
            <span className="text-[8px] lg:text-[12px] tracking-[0.1em] text-[#9C9E9D] font-medium">
              AI & Cloud Consulting
            </span>
          </div>
            </div>
            <p className="text-[#9C9E9D] text-[16px] leading-[1.6] max-w-[320px]">
              Lorem ipsum dolor sit amet consectetur. Fermentum ut dui nulla consectetur id pellentesque pretium et. Tortor nisl elementum magna venenatis cursus posuere feugiat. Massa dolor orci vel at tincidunt eu nec aliquam.
            </p>
            {/* Social Icons - Bordered Squares */}
            <div className="flex gap-4">
              {[X, Facebook, Instagram, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 border border-white/20 rounded-md flex items-center justify-center hover:border-[#CE80DD] hover:text-[#CE80DD] transition-all">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* COLUMN 2: USEFUL LINKS */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[#CE80DD] font-bold text-[18px] uppercase tracking-wider">Useful Links</h4>
            <ul className="flex flex-col gap-4">
              {usefulLinks.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link href={link.href} className="group flex items-center gap-2 text-[#F2F3FB] text-[15px] hover:text-[#CE80DD] transition-colors">
                    <ChevronRight size={18} className="text-[#CE80DD] group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SERVICES */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[#CE80DD] font-bold text-[18px] uppercase tracking-wider">Services</h4>
            <ul className="flex flex-col gap-4">
              {serviceLinks.map((service) => (
                <li key={`${service.label}-${service.href}`}>
                  <Link href={service.href} className="group flex items-center gap-2 text-[#F2F3FB] text-[15px] hover:text-[#CE80DD] transition-colors">
                    <ChevronRight size={18} className="text-[#CE80DD] group-hover:translate-x-1 transition-transform" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: CONTACT US */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[#CE80DD] font-bold text-[18px] uppercase tracking-wider">Contact Us</h4>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <MapPin className="text-[#CE80DD] shrink-0" size={24} />
                <p className="text-[#F2F3FB] text-[15px] leading-relaxed">
                  8 Sentosa Gateway, Sentosa Island,<br />
                  Singapore, Southwest,<br />
                  098269, Singapore
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-[#CE80DD] shrink-0" size={24} />
                <p className="text-[#F2F3FB] text-[15px]">+65-855-502-49</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-[#CE80DD] shrink-0" size={24} />
                <p className="text-[#F2F3FB] text-[15px]">info@lumilogic.ai</p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT AREA */}
        <div className="pt-8 border-t border-white/10 flex justify-center items-center">
          <p className="text-[#F2F3FB] text-[14px] flex items-center gap-1">
            <span className="text-lg">©</span>LumiLogic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
