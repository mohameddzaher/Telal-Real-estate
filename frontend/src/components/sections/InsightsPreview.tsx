"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { truncate } from "@/lib/utils";

const latestPosts = blogPosts.filter((p) => p.isPublished).slice(0, 3);

export default function InsightsPreview() {
  return (
    <section className="section-padding bg-black-deep">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="eyebrow mb-4">Market Insights</p>
          <h2 className="heading-section text-white">
            Knowledge &amp; Perspectives
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <Link
                href={`/insights/${post.slug}`}
                className="group card-luxury block h-full"
              >
                {/* Image placeholder */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-black-surface to-black-deep transition-transform duration-700 ease-luxury group-hover:scale-105" />
                  <span className="absolute bottom-3 left-3 px-3 py-1 text-xs uppercase tracking-wider bg-gold/90 text-black rounded-sm font-body font-medium">
                    {post.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-lg text-white mb-2 leading-snug group-hover:text-gold transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-light font-body leading-relaxed mb-4">
                    {truncate(post.excerpt, 120)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-mid font-body">
                      {post.readTime} min read
                    </span>
                    <span className="text-xs text-gold font-body uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      Read
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <Link href="/insights" className="btn-ghost">
            All Insights
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
