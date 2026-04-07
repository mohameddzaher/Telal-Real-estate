import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, formatArea } from "@/lib/utils";
import { type Property } from "@/types";
import { Badge } from "./Badge";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

function PropertyCard({ property, className }: PropertyCardProps) {
  const {
    slug,
    title,
    type,
    status,
    price,
    currency,
    area,
    bedrooms,
    bathrooms,
    location,
    images,
    isFeatured,
  } = property;

  const coverImage = images?.[0]?.url || "/images/placeholder-property.jpg";
  const coverAlt = images?.[0]?.alt || title;

  return (
    <Link
      href={`/properties/${slug}`}
      className={cn("group block", className)}
    >
      <div className="relative overflow-hidden rounded-sm bg-black-surface border border-black-border transition-all duration-500 ease-luxury hover:border-gold/20 hover:shadow-[0_8px_40px_rgba(201,168,76,0.08)]">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={coverImage}
            alt={coverAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Type tag */}
          <div className="absolute top-3 left-3">
            <Badge variant="gold" size="sm">
              {type.replace(/_/g, " ")}
            </Badge>
          </div>

          {/* Featured badge */}
          {isFeatured && (
            <div className="absolute top-3 right-3">
              <Badge variant="gold" size="sm">
                Featured
              </Badge>
            </div>
          )}

          {/* Status */}
          <div className="absolute bottom-3 left-3">
            <Badge
              variant={status === "AVAILABLE" ? "success" : "neutral"}
              size="sm"
            >
              {status.replace(/_/g, " ")}
            </Badge>
          </div>
        </div>

        {/* Details */}
        <div className="relative p-4 transition-transform duration-500 ease-luxury group-hover:-translate-y-1">
          <h3 className="text-base font-display text-white mb-1 line-clamp-1 group-hover:text-gold transition-colors duration-300">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 text-gray-light mb-3">
            <MapPin className="h-3 w-3 text-gold/60 shrink-0" />
            <span className="text-xs font-body truncate">{location}</span>
          </div>

          {/* Price */}
          <p className="text-lg font-display text-gold mb-3">
            {formatPrice(price, currency)}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 pt-3 border-t border-black-border">
            {bedrooms !== undefined && (
              <div className="flex items-center gap-1.5 text-gray-light">
                <Bed className="h-3.5 w-3.5 text-gold/50" />
                <span className="text-xs font-body">{bedrooms}</span>
              </div>
            )}
            {bathrooms !== undefined && (
              <div className="flex items-center gap-1.5 text-gray-light">
                <Bath className="h-3.5 w-3.5 text-gold/50" />
                <span className="text-xs font-body">{bathrooms}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-gray-light">
              <Square className="h-3.5 w-3.5 text-gold/50" />
              <span className="text-xs font-body">{formatArea(area)}</span>
            </div>
            <ArrowRight className="h-3.5 w-3.5 ml-auto text-gold/0 group-hover:text-gold transition-all duration-500 group-hover:translate-x-0 -translate-x-2" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export { PropertyCard, type PropertyCardProps };
