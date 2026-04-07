import { Download, FileText, File, FileCheck } from "lucide-react";

export const metadata = {
  title: "Documents — My Portal — Telal Development",
};

const documents = [
  { id: "d1", name: "Purchase Agreement — Rimal Gardens Villa", type: "Contract", date: "Mar 15, 2026", size: "2.4 MB", icon: FileCheck },
  { id: "d2", name: "Property Valuation Report", type: "Report", date: "Mar 10, 2026", size: "1.8 MB", icon: FileText },
  { id: "d3", name: "Payment Schedule", type: "Financial", date: "Mar 8, 2026", size: "450 KB", icon: File },
  { id: "d4", name: "Floor Plan — Unit 2401", type: "Blueprint", date: "Feb 28, 2026", size: "5.2 MB", icon: FileText },
  { id: "d5", name: "KYC Verification Documents", type: "Legal", date: "Feb 15, 2026", size: "3.1 MB", icon: FileCheck },
];

const typeBadge: Record<string, string> = {
  Contract: "bg-gold/10 text-gold border-gold/20",
  Report: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Financial: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Blueprint: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Legal: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export default function PortalDocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-white">Documents</h1>
        <p className="text-sm text-gray-light mt-1">
          Your contracts, reports, and important files
        </p>
      </div>

      <div className="bg-black-deep border border-black-border rounded-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black-border">
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Document</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Type</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Date</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Size</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b border-black-border/50 last:border-0 hover:bg-white/[0.01]">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <doc.icon className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="text-sm text-white">{doc.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-sm border ${typeBadge[doc.type] || ""}`}>
                    {doc.type}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-gray-light">{doc.date}</td>
                <td className="px-5 py-3 text-sm text-gray-mid">{doc.size}</td>
                <td className="px-5 py-3">
                  <button className="p-1.5 text-gold hover:text-gold-light transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
