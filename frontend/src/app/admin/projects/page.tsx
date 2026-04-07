"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  Building2,
  Calendar,
  Users,
} from "lucide-react";

const statusColors: Record<string, string> = {
  COMPLETED: "bg-success/20 text-success",
  UNDER_CONSTRUCTION: "bg-gold/20 text-gold",
  PLANNING: "bg-gray-mid/20 text-gray-light",
};

const statusLabels: Record<string, string> = {
  COMPLETED: "Completed",
  UNDER_CONSTRUCTION: "Under Construction",
  PLANNING: "Planning",
};

export default function AdminProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-white">Projects</h1>
          <p className="text-gray-light text-sm mt-1">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button className="btn-gold text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 bg-black-deep border border-black-border rounded-sm px-3 py-2 flex-1">
          <Search className="w-4 h-4 text-gray-mid" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm text-white placeholder:text-gray-mid focus:outline-none w-full"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-black-deep border border-black-border rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/50"
        >
          <option value="all">All Statuses</option>
          <option value="COMPLETED">Completed</option>
          <option value="UNDER_CONSTRUCTION">Under Construction</option>
          <option value="PLANNING">Planning</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="bg-black-deep border border-black-border rounded-sm overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-64 h-48 md:h-auto relative shrink-0">
                <img
                  src={project.coverImage}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <span
                  className={cn(
                    "absolute top-3 left-3 text-xs px-2 py-1 rounded-sm",
                    statusColors[project.status] || "bg-gray-mid/20 text-gray-light"
                  )}
                >
                  {statusLabels[project.status] || project.status}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-display text-lg">
                      {project.name}
                    </h3>
                    <p className="text-gray-light text-xs mt-1">
                      {project.nameAr}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 text-gray-mid hover:text-gold transition-colors"
                      title="Edit project"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-gray-mid hover:text-error transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-light text-sm mt-3 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-1.5 text-gray-mid text-xs">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{project.type}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-mid text-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </div>
                  {project.totalUnits && (
                    <div className="flex items-center gap-1.5 text-gray-mid text-xs">
                      <Users className="w-3.5 h-3.5" />
                      <span>{project.totalUnits} Units</span>
                    </div>
                  )}
                  {project.completionDate && (
                    <div className="flex items-center gap-1.5 text-gray-mid text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(project.completionDate).toLocaleDateString(
                          "en-US",
                          { month: "short", year: "numeric" }
                        )}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-sm",
                      project.isPublished
                        ? "bg-success/20 text-success"
                        : "bg-gray-mid/20 text-gray-mid"
                    )}
                  >
                    {project.isPublished ? "Published" : "Draft"}
                  </span>
                  {project.isFeatured && (
                    <span className="text-xs px-2 py-0.5 rounded-sm bg-gold/20 text-gold">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-mid">No projects found</p>
          </div>
        )}
      </div>
    </div>
  );
}
