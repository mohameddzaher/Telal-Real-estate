import { CreditCard, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: "Payments — My Portal — Telal Development",
};

const payments = [
  {
    id: "p1",
    description: "Booking Deposit — Rimal Gardens Villa",
    amount: 437500,
    dueDate: "Feb 10, 2026",
    status: "paid" as const,
    paidDate: "Feb 8, 2026",
  },
  {
    id: "p2",
    description: "First Installment (10%)",
    amount: 875000,
    dueDate: "Mar 10, 2026",
    status: "paid" as const,
    paidDate: "Mar 9, 2026",
  },
  {
    id: "p3",
    description: "Second Installment (15%)",
    amount: 1312500,
    dueDate: "Jun 10, 2026",
    status: "pending" as const,
  },
  {
    id: "p4",
    description: "Third Installment (15%)",
    amount: 1312500,
    dueDate: "Sep 10, 2026",
    status: "pending" as const,
  },
  {
    id: "p5",
    description: "Fourth Installment (20%)",
    amount: 1750000,
    dueDate: "Dec 10, 2026",
    status: "pending" as const,
  },
  {
    id: "p6",
    description: "Handover Payment (35%)",
    amount: 3062500,
    dueDate: "Mar 10, 2027",
    status: "pending" as const,
  },
];

const statusConfig = {
  paid: {
    label: "Paid",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: CheckCircle,
  },
  pending: {
    label: "Pending",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    icon: Clock,
  },
  overdue: {
    label: "Overdue",
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
    icon: AlertTriangle,
  },
};

export default function PortalPaymentsPage() {
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const paidPercentage = Math.round((paidAmount / totalAmount) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-white">Payment Tracker</h1>
        <p className="text-sm text-gray-light mt-1">
          Track your payment milestones for Rimal Gardens Villa
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-black-deep border border-black-border rounded-sm p-5">
          <CreditCard className="w-5 h-5 text-gold mb-3" />
          <p className="font-display text-xl text-white">{formatPrice(totalAmount)}</p>
          <p className="text-xs text-gray-light">Total Amount</p>
        </div>
        <div className="bg-black-deep border border-black-border rounded-sm p-5">
          <CheckCircle className="w-5 h-5 text-success mb-3" />
          <p className="font-display text-xl text-white">{formatPrice(paidAmount)}</p>
          <p className="text-xs text-gray-light">Paid</p>
        </div>
        <div className="bg-black-deep border border-black-border rounded-sm p-5">
          <Clock className="w-5 h-5 text-amber-400 mb-3" />
          <p className="font-display text-xl text-white">{formatPrice(totalAmount - paidAmount)}</p>
          <p className="text-xs text-gray-light">Remaining</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-black-deep border border-black-border rounded-sm p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-light">Payment Progress</span>
          <span className="text-sm text-gold">{paidPercentage}%</span>
        </div>
        <div className="h-2 bg-black-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-gold rounded-full transition-all duration-500"
            style={{ width: `${paidPercentage}%` }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-black-deep border border-black-border rounded-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black-border">
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Description</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Amount</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Due Date</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => {
              const config = statusConfig[payment.status];
              return (
                <tr key={payment.id} className="border-b border-black-border/50 last:border-0 hover:bg-white/[0.01]">
                  <td className="px-5 py-3 text-sm text-white">{payment.description}</td>
                  <td className="px-5 py-3 text-sm text-gold font-display">
                    {formatPrice(payment.amount)}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-light">{payment.dueDate}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-sm border ${config.badge}`}>
                      <config.icon className="w-3 h-3" />
                      {config.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
