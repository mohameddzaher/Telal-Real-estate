import Link from "next/link";
import { properties } from "@/lib/data";
import { formatPrice, formatArea } from "@/lib/utils";
import { Heart, Bed, Bath, Maximize, MapPin } from "lucide-react";

export const metadata = {
  title: "Saved Properties — My Portal — Telal Development",
};

export default function PortalPropertiesPage() {
  const savedProperties = properties.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-white">Saved Properties</h1>
        <p className="text-sm text-gray-light mt-1">
          Properties you&apos;ve saved for later
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedProperties.map((property) => (
          <div
            key={property.id}
            className="bg-black-deep border border-black-border rounded-sm overflow-hidden group hover:border-gold/20 transition-all duration-500"
          >
            {/* Image placeholder */}
            <div className="relative aspect-[4/3] bg-black-surface flex items-center justify-center">
              <span className="text-gray-mid text-xs uppercase tracking-wider">Property Image</span>
              {/* Remove favorite button */}
              <button className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center hover:bg-error/20 hover:border-error/30 transition-colors">
                <Heart className="w-4 h-4 text-gold fill-gold" />
              </button>
              {/* Status badge */}
              <span className="absolute top-3 left-3 text-xs px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-white/10 text-white rounded-sm">
                {property.status.replace("_", " ")}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <Link href={`/properties/${property.slug}`}>
                <h3 className="font-display text-lg text-white group-hover:text-gold transition-colors">
                  {property.title}
                </h3>
              </Link>
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-light">
                <MapPin className="w-3 h-3" />
                {property.location}, {property.city}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mt-4 text-xs text-gray-light">
                {property.bedrooms && (
                  <span className="flex items-center gap-1">
                    <Bed className="w-3 h-3" /> {property.bedrooms} Beds
                  </span>
                )}
                {property.bathrooms && (
                  <span className="flex items-center gap-1">
                    <Bath className="w-3 h-3" /> {property.bathrooms} Baths
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Maximize className="w-3 h-3" /> {formatArea(property.area)}
                </span>
              </div>

              {/* Price */}
              <div className="mt-4 pt-4 border-t border-black-border flex items-center justify-between">
                <span className="font-display text-lg text-gold">
                  {formatPrice(property.price)}
                </span>
                <Link
                  href={`/properties/${property.slug}`}
                  className="text-xs text-gold hover:text-gold-light transition-colors uppercase tracking-wider"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
