"use client";

import { useState } from "react";
import { LayoutGrid, List, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "NEGOTIATING" | "CLOSED_WON" | "CLOSED_LOST";

interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  date: string;
  status: LeadStatus;
}

const leads: Lead[] = [
  { id: "l1", name: "Faisal Al-Otaibi", email: "faisal@example.com", source: "Website", date: "Apr 5, 2026", status: "NEW" },
  { id: "l2", name: "Sara Al-Dosari", email: "sara@example.com", source: "Referral", date: "Apr 5, 2026", status: "CONTACTED" },
  { id: "l3", name: "Khalid Al-Mutairi", email: "khalid@example.com", source: "Instagram", date: "Apr 4, 2026", status: "QUALIFIED" },
  { id: "l4", name: "Nora Al-Rashid", email: "nora@example.com", source: "Website", date: "Apr 4, 2026", status: "NEW" },
  { id: "l5", name: "Ahmed Al-Zahrani", email: "ahmed@example.com", source: "Event", date: "Apr 3, 2026", status: "NEGOTIATING" },
  { id: "l6", name: "Hana Al-Shamsi", email: "hana@example.com", source: "LinkedIn", date: "Apr 3, 2026", status: "QUALIFIED" },
  { id: "l7", name: "Tariq Al-Rasheed", email: "tariq@example.com", source: "Website", date: "Apr 2, 2026", status: "CLOSED_WON" },
  { id: "l8", name: "Mona Al-Harbi", email: "mona@example.com", source: "Referral", date: "Apr 1, 2026", status: "CONTACTED" },
  { id: "l9", name: "Rashed Al-Otaibi", email: "rashed@example.com", source: "Website", date: "Mar 30, 2026", status: "CLOSED_LOST" },
  { id: "l10", name: "Layla Al-Fahad", email: "layla@example.com", source: "Event", date: "Apr 5, 2026", status: "NEGOTIATING" },
];

const columns: { status: LeadStatus; label: string; color: string }[] = [
  { status: "NEW", label: "New", color: "bg-blue-500" },
  { status: "CONTACTED", label: "Contacted", color: "bg-amber-500" },
  { status: "QUALIFIED", label: "Qualified", color: "bg-emerald-500" },
  { status: "NEGOTIATING", label: "Negotiating", color: "bg-purple-500" },
  { status: "CLOSED_WON", label: "Won", color: "bg-gold" },
  { status: "CLOSED_LOST", label: "Lost", color: "bg-red-500" },
];

const statusBadge: Record<string, string> = {
  NEW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  CONTACTED: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  QUALIFIED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  NEGOTIATING: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  CLOSED_WON: "bg-gold/10 text-gold border-gold/20",
  CLOSED_LOST: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminLeadsPage() {
  const [view, setView] = useState<"kanban" | "list">("kanban");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-white">Lead Management</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("kanban")}
            className={cn(
              "p-2 rounded-sm border transition-colors",
              view === "kanban"
                ? "bg-gold/10 border-gold/20 text-gold"
                : "bg-black-deep border-black-border text-gray-light hover:border-gold/20"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={cn(
              "p-2 rounded-sm border transition-colors",
              view === "list"
                ? "bg-gold/10 border-gold/20 text-gold"
                : "bg-black-deep border-black-border text-gray-light hover:border-gold/20"
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bulk action bar placeholder */}
      <div className="bg-black-deep border border-black-border rounded-sm px-5 py-3 flex items-center gap-4">
        <span className="text-xs text-gray-mid">{leads.length} leads total</span>
        <div className="flex-1" />
        <button className="text-xs text-gold hover:text-gold-light transition-colors">Export</button>
        <button className="text-xs text-gold hover:text-gold-light transition-colors">Bulk Assign</button>
      </div>

      {view === "kanban" ? (
        /* Kanban View */
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((col) => {
            const colLeads = leads.filter((l) => l.status === col.status);
            return (
              <div key={col.status} className="min-w-[250px] flex-1">
                {/* Column header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full ${col.color}`} />
                  <span className="text-xs text-gray-light uppercase tracking-wider">{col.label}</span>
                  <span className="text-xs text-gray-mid ml-auto">{colLeads.length}</span>
                </div>
                {/* Cards */}
                <div className="space-y-2">
                  {colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-black-deep border border-black-border rounded-sm p-4 hover:border-gold/20 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <p className="text-sm text-white font-medium">{lead.name}</p>
                        <button className="text-gray-mid hover:text-white transition-colors">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-light mt-1">{lead.email}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-mid">{lead.source}</span>
                        <span className="text-xs text-gray-mid">{lead.date}</span>
                      </div>
                    </div>
                  ))}
                  {colLeads.length === 0 && (
                    <div className="border border-dashed border-black-border rounded-sm p-6 text-center">
                      <p className="text-xs text-gray-mid">No leads</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-black-deep border border-black-border rounded-sm overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black-border">
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Name</th>
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Email</th>
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Source</th>
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-black-border/50 last:border-0 hover:bg-white/[0.01]">
                  <td className="px-5 py-3 text-sm text-white">{lead.name}</td>
                  <td className="px-5 py-3 text-sm text-gray-light">{lead.email}</td>
                  <td className="px-5 py-3 text-sm text-gray-light">{lead.source}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-sm border ${statusBadge[lead.status]}`}>
                      {lead.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-mid">{lead.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
