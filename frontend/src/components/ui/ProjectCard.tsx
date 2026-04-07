import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Project } from "@/types";
import { Badge } from "./Badge";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const statusVariant: Record<string, "gold" | "success" | "neutral"> = {
  PLANNING: "neutral",
  UNDER_CONSTRUCTION: "gold",
  COMPLETED: "success",
};

function ProjectCard({ project, className }: ProjectCardProps) {
  const { name, slug, status, coverImage, location, type } = project;

  return (
    <Link
      href={`/projects/${slug}`}
      className={cn("group block", className)}
    >
      <div className="relative overflow-hidden rounded-sm bg-black-surface border border-black-border transition-all duration-500 ease-luxury hover:border-gold/20 hover:shadow-[0_8px_40px_rgba(201,168,76,0.08)]">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={coverImage || "/images/placeholder-project.jpg"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <Badge variant={statusVariant[status] || "neutral"} size="sm">
              {status.replace(/_/g, " ")}
            </Badge>
          </div>

          {/* Bottom content over image */}
          <div className="absolute bottom-0 inset-x-0 p-4">
            <p className="text-xs font-accent uppercase tracking-wider text-gold/80 mb-1">
              {type}
            </p>
            <h3 className="text-xl font-display text-white mb-2 group-hover:text-gold transition-colors duration-300">
              {name}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-gray-light">
                <MapPin className="h-3 w-3 text-gold/60 shrink-0" />
                <span className="text-xs font-body">{location}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gold/0 group-hover:text-gold transition-all duration-500 group-hover:translate-x-0 -translate-x-2" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { ProjectCard, type ProjectCardProps };
