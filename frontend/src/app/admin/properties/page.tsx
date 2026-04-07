import { properties } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Plus, Search, Pencil, Trash2, Eye, Check, X } from "lucide-react";

export const metadata = {
  title: "Properties — Admin — Telal Development",
};

const statusBadge: Record<string, string> = {
  AVAILABLE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  SOLD: "bg-red-500/10 text-red-400 border-red-500/20",
  OFF_PLAN: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  UNDER_CONSTRUCTION: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  RESERVED: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function AdminPropertiesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-white">Properties</h1>
        <button className="btn-gold gap-2">
          <Plus className="w-4 h-4" />
          Add Property
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-black-deep border border-black-border rounded-sm px-3 py-2 flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 text-gray-mid" />
          <input
            type="text"
            placeholder="Search properties..."
            className="bg-transparent text-sm text-white placeholder:text-gray-mid focus:outline-none w-full"
          />
        </div>
        <select className="input-luxury w-auto min-w-[140px] text-sm">
          <option value="">All Types</option>
          <option value="RESIDENTIAL">Residential</option>
          <option value="COMMERCIAL">Commercial</option>
          <option value="MIXED_USE">Mixed-Use</option>
          <option value="OFF_PLAN">Off-Plan</option>
        </select>
        <select className="input-luxury w-auto min-w-[140px] text-sm">
          <option value="">All Statuses</option>
          <option value="AVAILABLE">Available</option>
          <option value="SOLD">Sold</option>
          <option value="OFF_PLAN">Off-Plan</option>
          <option value="RESERVED">Reserved</option>
        </select>
        <select className="input-luxury w-auto min-w-[140px] text-sm">
          <option value="">All Cities</option>
          <option value="Riyadh">Riyadh</option>
          <option value="Jeddah">Jeddah</option>
          <option value="Eastern Province">Eastern Province</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-black-deep border border-black-border rounded-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black-border">
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Image</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Title</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Type</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Status</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">City</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Price</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Views</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Published</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop) => (
              <tr key={prop.id} className="border-b border-black-border/50 last:border-0 hover:bg-white/[0.01]">
                <td className="px-5 py-3">
                  <div className="w-12 h-9 bg-black-surface border border-black-border rounded-sm flex items-center justify-center">
                    <Eye className="w-3 h-3 text-gray-mid" />
                  </div>
                </td>
                <td className="px-5 py-3">
                  <p className="text-sm text-white font-medium truncate max-w-[200px]">{prop.title}</p>
                  <p className="text-xs text-gray-mid">{prop.location}</p>
                </td>
                <td className="px-5 py-3 text-sm text-gray-light">{prop.type.replace("_", " ")}</td>
                <td className="px-5 py-3">
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-sm border ${statusBadge[prop.status] || ""}`}>
                    {prop.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-gray-light">{prop.city}</td>
                <td className="px-5 py-3 text-sm text-white">{formatPrice(prop.price)}</td>
                <td className="px-5 py-3 text-sm text-gray-light">{prop.views.toLocaleString()}</td>
                <td className="px-5 py-3">
                  {prop.isPublished ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <X className="w-4 h-4 text-gray-mid" />
                  )}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-gray-light hover:text-gold transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 text-gray-light hover:text-error transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination placeholder */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-mid">
          Showing 1 to {properties.length} of {properties.length} properties
        </p>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1.5 text-xs text-gray-mid bg-black-deep border border-black-border rounded-sm hover:border-gold/30 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1.5 text-xs text-black bg-gold rounded-sm">1</button>
          <button className="px-3 py-1.5 text-xs text-gray-mid bg-black-deep border border-black-border rounded-sm hover:border-gold/30 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
