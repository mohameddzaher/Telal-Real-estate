"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";

const published = testimonials.filter((t) => t.isPublished);

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % published.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + published.length) % published.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const testimonial = published[current];

  return (
    <section className="section-padding bg-black">
      <div className="container-luxury max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="eyebrow mb-4">Testimonials</p>
          <h2 className="heading-section text-white">What Our Clients Say</h2>
        </motion.div>

        <div className="relative min-h-[280px] flex flex-col items-center justify-center">
          {/* Large quote marks */}
          <span className="absolute top-0 left-1/2 -translate-x-1/2 font-display text-[6rem] leading-none text-gold/20 select-none pointer-events-none">
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pt-12"
            >
              <p className="font-display text-xl sm:text-2xl font-light text-white/90 leading-relaxed mb-8 max-w-3xl">
                {testimonial.content}
              </p>
              <p className="text-gold font-body text-sm font-medium">
                {testimonial.clientName}
              </p>
              {testimonial.clientTitle && (
                <p className="text-gray-mid font-body text-xs mt-1">
                  {testimonial.clientTitle}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-10 h-10 flex items-center justify-center border border-black-border rounded-sm text-gray-light hover:border-gold/40 hover:text-gold transition-colors duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs text-gray-mid font-body tracking-wider">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(published.length).padStart(2, "0")}
          </span>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 flex items-center justify-center border border-black-border rounded-sm text-gray-light hover:border-gold/40 hover:text-gold transition-colors duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
