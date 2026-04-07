import type { Metadata } from "next";
import { UserCog, Mail, Phone, MapPin, MoreVertical } from "lucide-react";

export const metadata: Metadata = {
  title: "Agent Management",
};

const agents = [
  {
    id: "1",
    name: "Fahad Al-Qahtani",
    email: "fahad@telaldevelopment.com",
    phone: "+966 50 987 6543",
    region: "Riyadh",
    activeListings: 12,
    closedDeals: 34,
    rating: 4.9,
    status: "active",
  },
  {
    id: "2",
    name: "Sara Al-Dosari",
    email: "sara@telaldevelopment.com",
    phone: "+966 50 111 2233",
    region: "Jeddah",
    activeListings: 8,
    closedDeals: 22,
    rating: 4.8,
    status: "active",
  },
  {
    id: "3",
    name: "Khalid Ibrahim",
    email: "khalid@telaldevelopment.com",
    phone: "+966 50 444 5566",
    region: "Eastern Province",
    activeListings: 5,
    closedDeals: 15,
    rating: 4.7,
    status: "active",
  },
];

export default function AgentsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-white">Agent Management</h1>
          <p className="text-gray-light text-sm mt-1">{agents.length} agents</p>
        </div>
        <button className="btn-gold text-sm">
          <UserCog className="w-4 h-4 mr-2" />
          Add Agent
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-black-deep border border-black-border rounded-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-display text-lg">
                    {agent.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">{agent.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">
                    {agent.status}
                  </span>
                </div>
              </div>
              <button className="text-gray-mid hover:text-white">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-gray-light text-xs">
                <Mail className="w-3 h-3" />
                <span>{agent.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-light text-xs">
                <Phone className="w-3 h-3" />
                <span>{agent.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-light text-xs">
                <MapPin className="w-3 h-3" />
                <span>{agent.region}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-black-border">
              <div className="text-center">
                <p className="text-white font-display text-lg">{agent.activeListings}</p>
                <p className="text-gray-mid text-xs">Listings</p>
              </div>
              <div className="text-center">
                <p className="text-white font-display text-lg">{agent.closedDeals}</p>
                <p className="text-gray-mid text-xs">Deals</p>
              </div>
              <div className="text-center">
                <p className="text-gold font-display text-lg">{agent.rating}</p>
                <p className="text-gray-mid text-xs">Rating</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
