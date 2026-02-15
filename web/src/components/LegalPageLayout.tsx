// components/LegalPageLayout.tsx
"use client";

import { useState, useEffect } from "react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export default function LegalPageLayout({
  title,
  lastModified,
  children,
}: {
  title: string;
  lastModified: string;
  children: React.ReactNode;
}) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    // Build TOC from h2/h3 elements in the content
    const headings = document.querySelectorAll(
      ".legal-content h2, .legal-content h3"
    );
    const items: TOCItem[] = [];
    headings.forEach((h) => {
      const id = h.id || h.textContent?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") || "";
      if (!h.id) h.id = id;
      items.push({
        id,
        title: h.textContent || "",
        level: h.tagName === "H2" ? 2 : 3,
      });
    });
    setTocItems(items);
  }, []);

  return (
    <main>
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-sm text-gray-500">Last Modified: {lastModified}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 flex gap-12">
          {/* Sidebar TOC - desktop only */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="sticky top-24 space-y-1 text-sm max-h-[70vh] overflow-y-auto">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block py-1 text-gray-500 hover:text-blue-600 transition ${
                    item.level === 3 ? "pl-4" : "font-medium text-gray-700"
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="legal-content flex-1 max-w-3xl prose prose-gray prose-headings:scroll-mt-24">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}