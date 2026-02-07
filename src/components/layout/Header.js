

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Menu, X } from "lucide-react";
import api from "@/lib/api";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState([]);

  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [activeChild, setActiveChild] = useState(null);

  /* ---------------- FETCH MENU ---------------- */
  useEffect(() => {
    api.get("/menu").then((res) => setMenu(res.data.data));
  }, []);

  /* Reset child when category changes */
  useEffect(() => {
    if (openCategoryId) {
      const category = menu.find((c) => c._id === openCategoryId);
      setActiveChild(category?.children?.[0] ?? null);
    }
  }, [openCategoryId, menu]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-[#070C1C]/80 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
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

          {menu.map((category) => (
            <div
              key={category._id}
              className="relative"
              onMouseEnter={() => setOpenCategoryId(category._id)}
              onMouseLeave={() => setOpenCategoryId(null)}
            >
              <span className="nav-link cursor-pointer">
                {category.title.toUpperCase()}
              </span>

              {openCategoryId === category._id && category.children?.length > 0 && (
                <div className="absolute left-0 top-full mt-4 z-50 pointer-events-auto">

                  <div className="flex rounded-md overflow-hidden bg-[#1B1E27] border border-white/5 shadow-2xl">

                    {/* LEFT COLUMN */}
                    <div className="min-w-[280px] py-2">
                      {category.children.map((child) => {
                        const isActive = activeChild?._id === child._id;

                        return (
                          <div
                            key={child._id}
                            onMouseEnter={() => setActiveChild(child)}
                            className={`flex items-center justify-between px-4 py-2 cursor-pointer transition
                              ${isActive
                                ? "bg-[#232632] text-[#4EA1FF]"
                                : "hover:bg-[#232632] text-gray-200"}
                            `}
                          >
                            <span className="text-sm">{child.title}</span>
                            <span className="text-lg opacity-70">›</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="min-w-[320px] bg-[#20232E] py-2">
                      {activeChild?.pages?.map((page) => (
                        <Link
                          key={page.slug}
                          href={`/${page.slug}`}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2A2E3D] hover:text-white transition"
                        >
                          {page.title}
                        </Link>
                      ))}
                    </div>

                  </div>
                </div>
              )}
            </div>
          ))}

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

      {/* NAV LINK STYLE */}
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