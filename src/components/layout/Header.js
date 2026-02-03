

"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "AWS & LL", href: "/aws" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-[#070C1C]/80 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10 lg:py-5">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-2 lg:gap-4 group shrink-0">
          <div className="relative w-[40px] h-[42px] lg:w-[67px] lg:h-[72px]">
            <Image
              src="/images/logo.svg"
              alt="LumiLogic Logo"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="font-['Inter'] font-bold text-[24px] lg:text-[47.64px] leading-none text-white">
              LumiLogic
            </h1>
            <span className="text-[8px] lg:text-[12px] tracking-[0.1em] text-[#9C9E9D] font-medium">
              AI & Cloud Consulting
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="text-[14px] font-bold tracking-widest text-white hover:text-[#CE80DD] transition-colors uppercase"
            >
              {link.name}
            </Link>
          ))}
          
          <Link
            href="/enquiry"
            className="flex h-[41px] items-center gap-2 rounded-[16px] bg-[#CE80DD] px-6 text-[14px] font-medium text-white transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-purple-500/20"
          >
            <Mail size={16} />
            ENQUIRY
          </Link>
        </nav>

        {/* MOBILE HAMBURGER BUTTON */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 top-[72px]  lg:hidden bg-[#070C1C] transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex min-h-screen bg-[#070C1C] flex-col items-center gap-8 pt-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-[18px] font-bold tracking-widest text-white uppercase"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/enquiry"
            onClick={() => setIsOpen(false)}
            className="mt-4 flex h-[50px] w-[200px] items-center justify-center gap-2 rounded-[16px] bg-[#CE80DD] text-[16px] font-medium text-white"
          >
            <Mail size={18} />
            ENQUIRY
          </Link>
        </nav>
      </div>
    </header>
  );
}