import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { blogPosts } from "@/lib/data";
import { truncate } from "@/lib/utils";
import { ArrowRight, Clock, User } from "lucide-react";

export const metadata: Metadata = {
  title: `Market Insights | ${SITE_CONFIG.name}`,
  description:
    "Expert analysis, market trends, and investment guides from Telal Development — your trusted source for Middle Eastern luxury real estate insights.",
};

export default function InsightsPage() {
  const published = blogPosts.filter((p) => p.isPublished);
  const featured = published[0];
  const rest = published.slice(1);

  return (
    <main>
      {/* Hero */}
      <section className="section-padding bg-black-DEFAULT bg-noise relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="container-luxury relative z-10 text-center">
          <p className="eyebrow mb-6">Knowledge Centre</p>
          <h1 className="heading-display text-gradient-gold mb-6">
            MARKET INSIGHTS
          </h1>
          <p className="body-text max-w-2xl mx-auto">
            Expert analysis, investment guides, and thought leadership from
            the forefront of the Middle East&apos;s luxury real estate market.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="section-padding bg-black-deep">
          <div className="container-luxury">
            <Link
              href={`/insights/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 card-luxury overflow-hidden"
            >
              <div className="aspect-[16/10] lg:aspect-auto relative overflow-hidden">
                <img src={featured.coverImage || "/images/placeholder-blog.jpg"} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black-DEFAULT/50 hidden lg:block" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gold/90 text-black-DEFAULT text-xs uppercase tracking-wider rounded-sm font-medium">
                    {featured.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <p className="eyebrow mb-4">Featured Article</p>
                <h2 className="font-display text-3xl md:text-4xl text-white group-hover:text-gold transition-colors duration-300 mb-4">
                  {featured.title}
                </h2>
                <p className="body-text mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-gray-light mb-6">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {featured.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readTime} min read
                  </span>
                  {featured.publishedAt && (
                    <span>
                      {new Date(featured.publishedAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </span>
                  )}
                </div>
                <span className="inline-flex items-center gap-2 text-gold text-sm uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      {rest.length > 0 && (
        <section className="section-padding bg-black-DEFAULT">
          <div className="container-luxury">
            <div className="mb-12">
              <h2 className="heading-section text-white">Latest Articles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <Link
                  key={post.id}
                  href={`/insights/${post.slug}`}
                  className="card-luxury group flex flex-col"
                >
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img src={post.coverImage || "/images/placeholder-blog.jpg"} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gold/90 text-black-DEFAULT text-xs uppercase tracking-wider rounded-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-xl text-white group-hover:text-gold transition-colors duration-300 mb-3">
                      {post.title}
                    </h3>
                    <p className="body-text text-sm mb-4 flex-1">
                      {truncate(post.excerpt, 140)}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-light">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min
                      </span>
                      {post.publishedAt && (
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
