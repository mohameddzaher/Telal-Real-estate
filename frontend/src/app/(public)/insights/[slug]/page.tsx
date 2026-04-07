import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data";
import { SITE_CONFIG } from "@/lib/constants";
import { truncate } from "@/lib/utils";
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Share2,
  MessageSquare,
  Briefcase,
  Link2,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts
    .filter((p) => p.isPublished)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${SITE_CONFIG.name}`,
    description: post.excerpt,
  };
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug && p.isPublished);

  if (!post) {
    notFound();
  }

  const related = blogPosts
    .filter(
      (p) =>
        p.id !== post.id && p.category === post.category && p.isPublished
    )
    .slice(0, 3);

  // If not enough from same category, fill with others
  const relatedPosts =
    related.length < 2
      ? [
          ...related,
          ...blogPosts
            .filter(
              (p) =>
                p.id !== post.id &&
                !related.find((r) => r.id === p.id) &&
                p.isPublished
            )
            .slice(0, 3 - related.length),
        ]
      : related;

  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    datePublished: post.publishedAt
      ? new Date(post.publishedAt).toISOString()
      : undefined,
    image: post.coverImage,
    mainEntityOfPage: `${SITE_CONFIG.url}/insights/${post.slug}`,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Image placeholder */}
        <div className="aspect-[21/9] relative overflow-hidden">
          <img src={post.coverImage || "/images/placeholder-blog.jpg"} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black-DEFAULT via-black-DEFAULT/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 section-padding pb-12">
            <div className="container-luxury">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-gray-light hover:text-gold text-sm uppercase tracking-wider transition-colors duration-300 mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Insights
              </Link>
              <span className="block mb-4">
                <span className="px-3 py-1 bg-gold/90 text-black-DEFAULT text-xs uppercase tracking-wider rounded-sm font-medium">
                  {post.category}
                </span>
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-display text-white font-light tracking-tight leading-tight mb-6 max-w-4xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-light">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                {publishDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {publishDate}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="section-padding bg-black-deep">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">
            {/* Body content */}
            <div className="space-y-6 text-gray-light leading-relaxed text-base">
              <p className="text-lg text-white/90 leading-relaxed">
                {post.excerpt}
              </p>
              <p>
                {post.body}
              </p>
              <p>
                The Middle Eastern luxury real estate market continues to evolve
                at a remarkable pace, driven by the ambitious Vision 2030
                programme and an influx of international investment. Developers
                like Telal are at the forefront of this transformation,
                delivering projects that rival the world&apos;s most prestigious
                addresses.
              </p>
              <p>
                Key trends shaping the market include a growing demand for
                sustainable and smart living spaces, the rise of mixed-use
                developments that create vibrant communities, and an increasing
                focus on wellness-oriented design. Off-plan investment continues
                to attract both domestic and international buyers, drawn by
                competitive pricing and strong capital appreciation potential.
              </p>
              <p>
                As the Kingdom positions itself as a global destination for
                business, tourism, and luxury living, the real estate sector
                stands to benefit enormously. Forward-thinking developers who
                prioritise quality, innovation, and client experience will
                define the next chapter of the Middle East&apos;s property
                landscape.
              </p>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-black-border">
                <p className="text-sm text-gray-mid mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-black-surface border border-black-border rounded-sm text-xs text-gray-light uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 pt-8 border-t border-black-border">
              <p className="text-sm text-gray-mid mb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share This Article
              </p>
              <div className="flex gap-3">
                <button
                  aria-label="Share on Twitter"
                  className="w-10 h-10 rounded-sm bg-black-surface border border-black-border flex items-center justify-center text-gray-light hover:text-gold hover:border-gold/30 transition-colors duration-300"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button
                  aria-label="Share on LinkedIn"
                  className="w-10 h-10 rounded-sm bg-black-surface border border-black-border flex items-center justify-center text-gray-light hover:text-gold hover:border-gold/30 transition-colors duration-300"
                >
                  <Briefcase className="w-4 h-4" />
                </button>
                <button
                  aria-label="Copy link"
                  className="w-10 h-10 rounded-sm bg-black-surface border border-black-border flex items-center justify-center text-gray-light hover:text-gold hover:border-gold/30 transition-colors duration-300"
                >
                  <Link2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-black-DEFAULT border-t border-black-border">
          <div className="container-luxury">
            <div className="mb-12">
              <p className="eyebrow mb-4">Continue Reading</p>
              <h2 className="heading-section text-white">Related Articles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/insights/${related.slug}`}
                  className="card-luxury group flex flex-col"
                >
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img src={related.coverImage || "/images/placeholder-blog.jpg"} alt={related.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gold/90 text-black-DEFAULT text-xs uppercase tracking-wider rounded-sm font-medium">
                        {related.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-xl text-white group-hover:text-gold transition-colors duration-300 mb-3">
                      {related.title}
                    </h3>
                    <p className="body-text text-sm mb-4 flex-1">
                      {truncate(related.excerpt, 120)}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-light">
                      <span>{related.author}</span>
                      <span>{related.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="section-padding bg-black-deep border-t border-black-border">
        <div className="container-luxury text-center">
          <p className="eyebrow mb-4">Stay Informed</p>
          <h2 className="heading-section text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="body-text max-w-xl mx-auto mb-8">
            Get the latest market insights, project launches, and investment
            opportunities delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-luxury flex-1"
            />
            <Link href="/newsletter" className="btn-gold whitespace-nowrap">
              Subscribe
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
