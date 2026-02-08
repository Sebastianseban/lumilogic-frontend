
"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function MegaMenu({ menu }) {
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [activeChild, setActiveChild] = useState(null);
  const menuRef = useRef(null);

  /* Reset active child when category changes */
  useEffect(() => {
    if (openCategoryId) {
      const category = menu.find((c) => c._id === openCategoryId);
      setActiveChild(category?.children?.[0] || null);
    }
  }, [openCategoryId, menu]);

  /* Close menu on outside click */
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenCategoryId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex gap-8" ref={menuRef}>
      {menu.map((category) => {
        const isOpen = openCategoryId === category._id;

        return (
          <div key={category._id} className="relative">
            {/* TOP NAV ITEM */}
            <span
              className={`nav-link cursor-pointer ${
                isOpen ? "text-[#CE80DD]" : ""
              }`}
              onClick={() =>
                setOpenCategoryId(isOpen ? null : category._id)
              }
            >
              {category.title.toUpperCase()}
            </span>

            {/* MEGA MENU */}
            {isOpen &&
              category.children &&
              category.children.length > 0 && (
                <div className="absolute left-0 top-full mt-4 z-50">
                  <div className="flex rounded-md overflow-hidden bg-[#1B1E27] border border-white/5 shadow-2xl">

                    {/* LEFT COLUMN */}
                    <div className="min-w-[280px] py-2">
                      {category.children.map((child) => {
                        const isActive =
                          activeChild && activeChild._id === child._id;

                        return (
                          <div
                            key={child._id}
                            onMouseEnter={() => setActiveChild(child)}
                            className={`flex items-center justify-between px-4 py-2 cursor-pointer transition
                              ${
                                isActive
                                  ? "bg-[#232632] text-[#4EA1FF]"
                                  : "hover:bg-[#232632] text-gray-200"
                              }
                            `}
                          >
                            <span className="text-sm">
                              {child.title}
                            </span>
                            <span className="text-lg opacity-70">›</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* RIGHT COLUMN */}
<div className="min-w-[320px] bg-[#20232E] py-2">

  {/* CASE 1: child has sub-children */}
  {activeChild?.children?.length > 0 &&
    activeChild.children.map((child) => (
      <Link
        key={child._id}
        href={`/${child.slug}`}
        className="block px-4 py-2 text-sm text-gray-300
                   hover:bg-[#2A2E3D] hover:text-white transition"
        onClick={() => setOpenCategoryId(null)}
      >
        {child.title}
      </Link>
    ))
  }

  {/* CASE 2: no sub-children → link to category page */}
  {activeChild &&
    (!activeChild.children || activeChild.children.length === 0) && (
      <Link
        href={`/${activeChild.slug}`}
        className="block px-4 py-2 text-sm text-gray-300
                   hover:bg-[#2A2E3D] hover:text-white transition"
        onClick={() => setOpenCategoryId(null)}
      >
        {activeChild.title}
      </Link>
    )
  }

</div>
                  </div>
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
}   