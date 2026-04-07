import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-display text-hero text-gold/10 leading-none select-none">
          404
        </p>
        <h1 className="font-display text-3xl md:text-4xl text-white -mt-12 relative z-10">
          Page Not Found
        </h1>
        <p className="text-gray-light text-base mt-4 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn-gold mt-8 inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
