"use client";

import { useState } from "react";
import { blogPosts, faqs, testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Pencil, Trash2, Plus } from "lucide-react";

type Tab = "blog" | "faqs" | "testimonials";

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<Tab>("blog");

  const tabs: { key: Tab; label: string }[] = [
    { key: "blog", label: "Blog Posts" },
    { key: "faqs", label: "FAQs" },
    { key: "testimonials", label: "Testimonials" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-white">Content</h1>
        <button type="button" className="btn-gold gap-2">
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-black-border">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "px-5 py-3 text-sm transition-colors border-b-2 -mb-px",
              activeTab === tab.key
                ? "text-gold border-gold"
                : "text-gray-light border-transparent hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Blog Posts Tab */}
      {activeTab === "blog" && (
        <div className="bg-black-deep border border-black-border rounded-sm overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black-border">
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Title</th>
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Category</th>
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Author</th>
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Published</th>
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map((post) => (
                <tr key={post.id} className="border-b border-black-border/50 last:border-0 hover:bg-white/[0.01]">
                  <td className="px-5 py-3">
                    <p className="text-sm text-white truncate max-w-[300px]">{post.title}</p>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-light">{post.category}</td>
                  <td className="px-5 py-3 text-sm text-gray-light">{post.author}</td>
                  <td className="px-5 py-3 text-sm text-gray-mid">
                    {new Date(post.publishedAt ?? Date.now()).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button type="button" title="Edit post" className="p-1.5 text-gray-light hover:text-gold transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" title="Delete post" className="p-1.5 text-gray-light hover:text-error transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* FAQs Tab */}
      {activeTab === "faqs" && (
        <div className="bg-black-deep border border-black-border rounded-sm overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black-border">
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Question</th>
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Category</th>
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq.id} className="border-b border-black-border/50 last:border-0 hover:bg-white/[0.01]">
                  <td className="px-5 py-3">
                    <p className="text-sm text-white truncate max-w-[400px]">{faq.question}</p>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-light">{faq.category}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button type="button" title="Edit FAQ" className="p-1.5 text-gray-light hover:text-gold transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" title="Delete FAQ" className="p-1.5 text-gray-light hover:text-error transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Testimonials Tab */}
      {activeTab === "testimonials" && (
        <div className="bg-black-deep border border-black-border rounded-sm overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black-border">
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Name</th>
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Role</th>
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Quote</th>
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Rating</th>
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id} className="border-b border-black-border/50 last:border-0 hover:bg-white/[0.01]">
                  <td className="px-5 py-3 text-sm text-white">{t.clientName}</td>
                  <td className="px-5 py-3 text-sm text-gray-light">{t.clientTitle}</td>
                  <td className="px-5 py-3">
                    <p className="text-sm text-gray-light truncate max-w-[300px]">{t.content}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-sm text-gold">{"★".repeat(t.rating)}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button type="button" title="Edit testimonial" className="p-1.5 text-gray-light hover:text-gold transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" title="Delete testimonial" className="p-1.5 text-gray-light hover:text-error transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
