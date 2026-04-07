"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { faqs } from "@/lib/data";
import { FAQ_CATEGORIES } from "@/lib/constants";
import { Search, Plus, Minus } from "lucide-react";

export default function FAQClient() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const published = useMemo(() => faqs.filter((f) => f.isPublished), []);

  const filtered = useMemo(() => {
    let result = published;
    if (activeCategory !== "All") {
      result = result.filter((f) => f.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q)
      );
    }
    return result;
  }, [published, activeCategory, search]);

  const toggle = useCallback(
    (id: string) => setOpenId((prev) => (prev === id ? null : id)),
    []
  );

  return (
    <>
      {/* Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-mid" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search frequently asked questions..."
            className="input-luxury pl-12"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {["All", ...FAQ_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-sm text-sm uppercase tracking-wider transition-all duration-300 ${
              activeCategory === cat
                ? "bg-gold text-black-DEFAULT"
                : "bg-black-surface border border-black-border text-gray-light hover:border-gold/30 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filtered.length === 0 && (
          <p className="text-center body-text py-12">
            No questions found matching your search.
          </p>
        )}

        {filtered.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="border border-black-border rounded-sm overflow-hidden bg-black-surface"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <span className="font-display text-lg text-white pr-4 group-hover:text-gold transition-colors duration-300">
                  {faq.question}
                </span>
                <span className="shrink-0 w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-gold" />
                  ) : (
                    <Plus className="w-4 h-4 text-gold" />
                  )}
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-500 ease-luxury"
                style={{
                  maxHeight: isOpen ? "500px" : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="px-6 pb-6 body-text">{faq.answer}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-20 pt-16 border-t border-black-border">
        <h2 className="heading-section text-white mb-4">
          Still Have Questions?
        </h2>
        <p className="body-text max-w-xl mx-auto mb-8">
          Our team is happy to help. Get in touch and we will respond within
          24 hours.
        </p>
        <Link href="/contact" className="btn-gold">
          Contact Us
        </Link>
      </div>
    </>
  );
}
