import { type Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Building2,
  Calendar,
  ChevronRight,
  Layers,
  Clock,
  ArrowRight,
  BedDouble,
  Bath,
  Maximize2,
} from "lucide-react";
import { projects, properties } from "@/lib/data";
import { SITE_CONFIG } from "@/lib/constants";
import { formatPrice, formatArea } from "@/lib/utils";
import { ProjectStatus } from "@/types";

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

export async function generateStaticParams() {
  return projects
    .filter((p) => p.isPublished)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.name} | ${SITE_CONFIG.name}`,
    description: project.description.slice(0, 160),
    openGraph: {
      title: project.name,
      description: project.description.slice(0, 160),
      type: "website",
    },
  };
}

const MILESTONES = [
  { phase: "Planning & Design", description: "Concept development, architectural design, and regulatory approvals" },
  { phase: "Foundation & Structure", description: "Groundwork, foundation laying, and structural engineering" },
  { phase: "Construction", description: "Core construction, MEP systems, and building envelope" },
  { phase: "Finishing & Fit-Out", description: "Interior finishing, landscaping, and amenity installation" },
  { phase: "Handover", description: "Final inspections, quality assurance, and unit handover" },
];

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find(
    (p) => p.slug === params.slug && p.isPublished
  );

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-white">
            Project Not Found
          </h1>
          <Link href="/projects" className="btn-gold mt-8 inline-block">
            View All Projects
          </Link>
        </div>
      </main>
    );
  }

  const projectProperties = properties.filter(
    (p) => p.projectId === project.id && p.isPublished
  );

  const keyFacts = [
    { icon: <Building2 className="h-5 w-5" />, label: "Type", value: project.type },
    { icon: <MapPin className="h-5 w-5" />, label: "Location", value: project.location },
    ...(project.totalUnits
      ? [{ icon: <Layers className="h-5 w-5" />, label: "Total Units", value: String(project.totalUnits) }]
      : []),
    ...(project.launchDate
      ? [{ icon: <Calendar className="h-5 w-5" />, label: "Launch Date", value: formatDate(project.launchDate) }]
      : []),
    ...(project.completionDate
      ? [{ icon: <Clock className="h-5 w-5" />, label: "Completion", value: formatDate(project.completionDate) }]
      : []),
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <img src={project.coverImage || "/images/placeholder-project.jpg"} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="container-luxury relative z-10 flex h-full flex-col justify-end pb-12">
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-light">
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-gray-mid" />
            <Link
              href="/projects"
              className="transition-colors hover:text-gold"
            >
              Projects
            </Link>
            <ChevronRight className="h-3 w-3 text-gray-mid" />
            <span className="text-gold">{project.name}</span>
          </nav>
          <span
            className={`mb-4 inline-block w-fit rounded-sm px-3 py-1 text-xs font-medium uppercase tracking-wider ${STATUS_COLORS[project.status]}`}
          >
            {STATUS_LABELS[project.status]}
          </span>
          <h1 className="font-display text-3xl font-light tracking-tight text-white md:text-4xl lg:text-display">
            {project.name}
          </h1>
          <p className="mt-3 text-lg text-gray-light">{project.type}</p>
        </div>
      </section>

      {/* Key Facts Bar */}
      <section className="border-b border-black-border bg-black-surface">
        <div className="container-luxury">
          <div className="grid grid-cols-2 divide-x divide-black-border md:grid-cols-5">
            {keyFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col items-center gap-2 py-6"
              >
                <div className="text-gold">{fact.icon}</div>
                <p className="text-xs uppercase tracking-wider text-gray-mid">
                  {fact.label}
                </p>
                <p className="text-center font-display text-lg font-light text-white">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding">
        <div className="container-luxury max-w-4xl">
          <p className="eyebrow">About the Project</p>
          <h2 className="mt-4 font-display text-3xl font-light tracking-tight text-white md:text-4xl">
            {project.name}
          </h2>
          <div className="mt-4 h-px w-16 bg-gold" />
          <p className="mt-8 text-lg leading-relaxed text-gray-light">
            {project.description}
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding border-t border-black-border">
        <div className="container-luxury">
          <p className="eyebrow">Visual Tour</p>
          <h2 className="mt-4 font-display text-3xl font-light tracking-tight text-white md:text-4xl">
            Project Gallery
          </h2>
          <div className="mt-4 h-px w-16 bg-gold" />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {(project.gallery.length > 0 ? project.gallery : [project.coverImage]).map((imgUrl, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-sm border border-black-border ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]"
                }`}
              >
                <img src={imgUrl} alt={`${project.name} gallery ${i + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Within This Project */}
      {projectProperties.length > 0 && (
        <section className="section-padding border-t border-black-border">
          <div className="container-luxury">
            <p className="eyebrow">Available Units</p>
            <h2 className="mt-4 font-display text-3xl font-light tracking-tight text-white md:text-4xl">
              Properties in {project.name}
            </h2>
            <div className="mt-4 h-px w-16 bg-gold" />

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projectProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.slug}`}
                  className="card-luxury group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img src={property.images?.[0]?.url || "/images/placeholder-property.jpg"} alt={property.title} className="h-full w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-light text-white transition-colors group-hover:text-gold">
                      {property.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-1 text-sm text-gray-light">
                      <MapPin className="h-3.5 w-3.5 text-gold" />
                      <span>
                        {property.location}, {property.city}
                      </span>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                      <p className="font-display text-xl font-light text-gold">
                        {formatPrice(property.price, property.currency)}
                      </p>
                      <p className="flex items-center gap-1 text-sm text-gray-mid">
                        <Maximize2 className="h-3.5 w-3.5" />
                        {formatArea(property.area)}
                      </p>
                    </div>
                    {(property.bedrooms !== undefined ||
                      property.bathrooms !== undefined) && (
                      <div className="mt-4 flex gap-4 border-t border-black-border pt-4">
                        {property.bedrooms !== undefined && (
                          <div className="flex items-center gap-1.5 text-sm text-gray-light">
                            <BedDouble className="h-4 w-4 text-gray-mid" />
                            <span>
                              {property.bedrooms === 0
                                ? "Studio"
                                : `${property.bedrooms} Beds`}
                            </span>
                          </div>
                        )}
                        {property.bathrooms !== undefined && (
                          <div className="flex items-center gap-1.5 text-sm text-gray-light">
                            <Bath className="h-4 w-4 text-gray-mid" />
                            <span>{property.bathrooms} Baths</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Timeline / Milestones */}
      <section className="section-padding border-t border-black-border">
        <div className="container-luxury max-w-4xl">
          <p className="eyebrow">Development Timeline</p>
          <h2 className="mt-4 font-display text-3xl font-light tracking-tight text-white md:text-4xl">
            Project Milestones
          </h2>
          <div className="mt-4 h-px w-16 bg-gold" />

          <div className="mt-10 space-y-0">
            {MILESTONES.map((milestone, index) => {
              const isCompleted =
                project.status === ProjectStatus.COMPLETED ||
                (project.status === ProjectStatus.UNDER_CONSTRUCTION &&
                  index < 3) ||
                (project.status === ProjectStatus.PLANNING && index < 1);

              return (
                <div key={milestone.phase} className="relative flex gap-6">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                        isCompleted
                          ? "border-gold bg-gold/20"
                          : "border-black-border bg-black-deep"
                      }`}
                    >
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          isCompleted ? "bg-gold" : "bg-gray-mid"
                        }`}
                      />
                    </div>
                    {index < MILESTONES.length - 1 && (
                      <div
                        className={`h-16 w-px ${
                          isCompleted ? "bg-gold/40" : "bg-black-border"
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-12">
                    <h3
                      className={`font-display text-xl font-light ${
                        isCompleted ? "text-white" : "text-gray-mid"
                      }`}
                    >
                      {milestone.phase}
                    </h3>
                    <p className="mt-1 text-sm text-gray-mid">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding border-t border-black-border">
        <div className="container-luxury">
          <div className="mx-auto max-w-2xl rounded-sm border border-black-border bg-black-surface p-10 text-center md:p-16">
            <div className="absolute inset-0 bg-radial-gold pointer-events-none opacity-10" />
            <p className="eyebrow">Get in Touch</p>
            <h2 className="mt-4 font-display text-3xl font-light tracking-tight text-white md:text-4xl">
              Interested in This Project?
            </h2>
            <p className="mt-4 text-base text-gray-light">
              Our dedicated team is ready to provide you with detailed
              information, arrange private viewings, and help you find the
              perfect unit within {project.name}.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="btn-gold gap-2">
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="btn-ghost gap-2"
              >
                Call {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
