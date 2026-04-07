import { type Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  ChevronRight,
  ArrowRight,
  Layers,
} from "lucide-react";
import { projects } from "@/lib/data";
import { SITE_CONFIG } from "@/lib/constants";
import { ProjectStatus } from "@/types";
import { truncate } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Projects | ${SITE_CONFIG.name}`,
  description:
    "Explore Telal Development's landmark projects across Saudi Arabia — from iconic residential towers and mixed-use communities to world-class commercial complexes.",
};

const STATUS_TABS = [
  { label: "All", value: "all" },
  { label: "Completed", value: ProjectStatus.COMPLETED },
  { label: "Under Construction", value: ProjectStatus.UNDER_CONSTRUCTION },
  { label: "Planning", value: ProjectStatus.PLANNING },
] as const;

const STATUS_LABELS: Record<ProjectStatus, string> = {
  [ProjectStatus.COMPLETED]: "Completed",
  [ProjectStatus.UNDER_CONSTRUCTION]: "Under Construction",
  [ProjectStatus.PLANNING]: "Planning",
};

const STATUS_COLORS: Record<ProjectStatus, string> = {
  [ProjectStatus.COMPLETED]: "bg-success/20 text-success",
  [ProjectStatus.UNDER_CONSTRUCTION]: "bg-gold/20 text-gold",
  [ProjectStatus.PLANNING]: "bg-blue-500/20 text-blue-400",
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function ProjectsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const publishedProjects = projects.filter((p) => p.isPublished);

  const filteredProjects = publishedProjects.filter((p) => {
    if (!searchParams.status || searchParams.status === "all") return true;
    return p.status === searchParams.status;
  });

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative bg-black-deep py-32 md:py-40">
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="container-luxury relative z-10 text-center">
          <nav className="mb-8 flex items-center justify-center gap-2 text-sm text-gray-light">
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-gray-mid" />
            <span className="text-gold">Projects</span>
          </nav>
          <h1 className="font-display text-4xl font-light tracking-tight text-white md:text-display">
            OUR PROJECTS
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-light">
            Landmark developments that shape skylines and redefine communities.
            Each Telal project is a testament to our commitment to excellence,
            innovation, and the art of luxury living.
          </p>
        </div>
      </section>

      {/* Status Filter Tabs */}
      <section className="border-b border-black-border bg-black-surface">
        <div className="container-luxury flex items-center justify-center py-6">
          <div className="flex flex-wrap gap-2">
            {STATUS_TABS.map((tab) => {
              const isActive =
                searchParams.status === tab.value ||
                (!searchParams.status && tab.value === "all");
              return (
                <Link
                  key={tab.value}
                  href={{
                    pathname: "/projects",
                    query:
                      tab.value !== "all" ? { status: tab.value } : undefined,
                  }}
                  className={`rounded-sm px-5 py-2.5 text-xs uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-gold text-black"
                      : "border border-black-border text-gray-light hover:border-gold/40 hover:text-gold"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects List */}
      <section className="section-padding">
        <div className="container-luxury">
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-mid">
                No projects match your criteria.
              </p>
              <Link href="/projects" className="btn-gold mt-6 inline-block">
                View All Projects
              </Link>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredProjects.map((project, index) => {
                const isReversed = index % 2 === 1;
                return (
                  <article
                    key={project.id}
                    className="card-luxury overflow-hidden"
                  >
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 ${isReversed ? "lg:[direction:rtl]" : ""}`}
                    >
                      {/* Cover Image */}
                      <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
                        <div className="h-full w-full bg-gradient-to-br from-black-surface to-black-deep" />
                        <span
                          className={`absolute left-4 top-4 rounded-sm px-3 py-1 text-xs font-medium uppercase tracking-wider ${STATUS_COLORS[project.status]} ${isReversed ? "lg:[direction:ltr]" : ""}`}
                        >
                          {STATUS_LABELS[project.status]}
                        </span>
                      </div>

                      {/* Content */}
                      <div
                        className={`flex flex-col justify-center p-8 md:p-12 ${isReversed ? "lg:[direction:ltr]" : ""}`}
                      >
                        <p className="eyebrow">{project.type}</p>
                        <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-white md:text-4xl">
                          {project.name}
                        </h2>
                        <div className="mt-2 h-px w-16 bg-gold" />

                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-light">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gold" />
                            <span>{project.location}</span>
                          </div>
                          {project.totalUnits && (
                            <div className="flex items-center gap-2">
                              <Layers className="h-4 w-4 text-gold" />
                              <span>{project.totalUnits} Units</span>
                            </div>
                          )}
                          {project.launchDate && (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gold" />
                              <span>{formatDate(project.launchDate)}</span>
                            </div>
                          )}
                        </div>

                        <p className="mt-6 text-base leading-relaxed text-gray-light">
                          {truncate(project.description, 220)}
                        </p>

                        <div className="mt-8">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="btn-ghost group/btn gap-2"
                          >
                            View Project
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
