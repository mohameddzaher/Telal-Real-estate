"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/data";
import { ProjectStatus } from "@/types";

const showcaseProjects = projects.filter((p) => p.isFeatured).slice(0, 3);

function statusBadge(status: ProjectStatus) {
  const map: Record<ProjectStatus, { label: string; cls: string }> = {
    [ProjectStatus.COMPLETED]: {
      label: "Completed",
      cls: "bg-success/10 text-success border-success/30",
    },
    [ProjectStatus.UNDER_CONSTRUCTION]: {
      label: "Under Construction",
      cls: "bg-gold/10 text-gold border-gold/30",
    },
    [ProjectStatus.PLANNING]: {
      label: "Planning",
      cls: "bg-gray-mid/10 text-gray-light border-gray-mid/30",
    },
  };
  const badge = map[status];
  return (
    <span
      className={`inline-block px-3 py-1 text-xs uppercase tracking-wider border rounded-sm font-body ${badge.cls}`}
    >
      {badge.label}
    </span>
  );
}

export default function ProjectsShowcase() {
  return (
    <section className="section-padding bg-black">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="eyebrow mb-4">Our Projects</p>
          <h2 className="heading-section text-white">
            Landmark Developments
          </h2>
        </motion.div>

        <div className="space-y-20 lg:space-y-32">
          {showcaseProjects.map((project, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`flex flex-col ${
                  isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-8 lg:gap-16 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-[60%] aspect-[16/10] rounded-sm overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-black-surface to-black-deep" />
                </div>

                {/* Text */}
                <div className="w-full lg:w-[40%]">
                  <div className="mb-4">{statusBadge(project.status)}</div>
                  <h3 className="font-display text-2xl md:text-3xl font-light text-white mb-2">
                    {project.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-gold/60 font-body mb-4">
                    {project.type} &mdash; {project.location}
                  </p>
                  <p className="body-text mb-6 line-clamp-4">
                    {project.description}
                  </p>
                  {project.totalUnits && (
                    <p className="text-sm text-gray-mid font-body mb-6">
                      {project.totalUnits} total units
                    </p>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-gold text-sm font-body uppercase tracking-wider group"
                  >
                    View Project
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
