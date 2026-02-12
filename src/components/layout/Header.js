
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Menu, X } from "lucide-react";
import api from "@/lib/api";
import MegaMenu from "./MegaMenu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    api.get("/menu").then((res) => setMenu(res.data.data));
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-[#070C1C]/80 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative w-[40px] h-[42px] lg:w-[67px] lg:h-[72px]">
            <Image src="/images/logo.svg" alt="LumiLogic" fill />
          </div>
          <div>
            <h1 className="text-white font-bold text-[24px] lg:text-[48px] leading-none">
              LumiLogic
            </h1>
            <span className="text-[10px] tracking-widest text-gray-400">
              AI & Cloud Consulting
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className="nav-link">HOME</Link>

          <MegaMenu menu={menu} />

          <Link href="/about" className="nav-link">ABOUT US</Link>

          <Link
            href="/enquiry"
            className="flex items-center gap-2 rounded-[16px] bg-[#CE80DD] px-6 py-2 text-sm font-medium text-white shadow-lg"
          >
            <Mail size={16} />
            ENQUIRY
          </Link>
        </nav>

        {/* MOBILE TOGGLE */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <style jsx>{`
        .nav-link {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: white;
        }
        .nav-link:hover {
          color: #ce80dd;
        }
      `}</style>
    </header>
  );
}