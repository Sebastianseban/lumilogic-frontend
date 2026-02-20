
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Mail, Menu, X } from "lucide-react";
import api from "@/lib/api";
import MegaMenu from "./MegaMenu";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    api.get("/menu").then((res) => setMenu(res.data.data));
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setExpandedCategoryId(null);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-[#070C1C]/80 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setIsOpen(false)}>
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

      {/* MOBILE MENU */}
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close mobile menu overlay"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[95] bg-black/40 lg:hidden"
          />

          <aside className="fixed right-0 top-0 z-[110] h-screen w-[86%] max-w-[360px] border-l border-white/10 bg-[#070C1C] px-5 pb-8 pt-24 shadow-2xl lg:hidden overflow-y-auto">
            <nav className="space-y-2">
              <Link
                href="/"
                className="block rounded-lg px-3 py-3 text-sm font-bold tracking-[0.12em] text-white hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                HOME
              </Link>

              {menu.map((category) => {
                const hasChildren = Array.isArray(category.children) && category.children.length > 0;
                const isExpanded = expandedCategoryId === category._id;

                if (!hasChildren) {
                  return (
                    <Link
                      key={category._id}
                      href={`/${category.slug}`}
                      className="block rounded-lg px-3 py-3 text-sm font-bold tracking-[0.12em] text-white hover:bg-white/5"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.title.toUpperCase()}
                    </Link>
                  );
                }

                return (
                  <div key={category._id} className="rounded-lg border border-white/10 bg-white/[0.02]">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedCategoryId(isExpanded ? null : category._id)
                      }
                      className="flex w-full items-center justify-between px-3 py-3 text-left text-sm font-bold tracking-[0.12em] text-white"
                    >
                      {category.title.toUpperCase()}
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>

                    {isExpanded && (
                      <div className="border-t border-white/10 px-2 py-2">
                        {category.children.map((child) => {
                          const childHasChildren =
                            Array.isArray(child.children) && child.children.length > 0;

                          if (!childHasChildren) {
                            return (
                              <Link
                                key={child._id}
                                href={`/${child.slug}`}
                                className="block rounded-md px-3 py-2 text-sm text-white/85 hover:bg-white/5 hover:text-white"
                                onClick={() => setIsOpen(false)}
                              >
                                {child.title}
                              </Link>
                            );
                          }

                          return (
                            <div key={child._id} className="mb-1 rounded-md">
                              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#CE80DD]">
                                {child.title}
                              </p>
                              {child.children.map((grandChild) => (
                                <Link
                                  key={grandChild._id}
                                  href={`/${grandChild.slug}`}
                                  className="block rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {grandChild.title}
                                </Link>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              <Link
                href="/about"
                className="block rounded-lg px-3 py-3 text-sm font-bold tracking-[0.12em] text-white hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                ABOUT US
              </Link>

              <Link
                href="/enquiry"
                className="mt-4 flex items-center justify-center gap-2 rounded-[14px] bg-[#CE80DD] px-4 py-3 text-sm font-semibold text-white shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                <Mail size={16} />
                ENQUIRY
              </Link>
            </nav>
          </aside>
        </>
      )}

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
