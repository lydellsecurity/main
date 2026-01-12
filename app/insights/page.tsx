import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Thought leadership on AI security, threat intelligence, incident response, and cybersecurity best practices from Lydell Security.',
}

const categoryColors: Record<string, string> = {
  'AI Security': 'bg-alert',
  'Threat Intel': 'bg-navy',
  'Framework': 'bg-green-600',
  'Technical': 'bg-purple-600',
}

export default function InsightsPage() {
  const posts = getAllPosts()

  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero-gradient pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Insights & Research
            </h1>
            <p className="text-xl text-white/80 max-w-2xl">
              Thought leadership on AI security, threat intelligence, and incident response 
              from our team of cybersecurity experts.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section bg-white">
        <div className="container-custom">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className="card card-hover group overflow-hidden p-0"
                >
                  <div className="h-48 bg-gradient-to-br from-navy to-navy-light relative">
                    <span className={`absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] || 'bg-navy'}`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-heading font-bold text-xl mb-3 group-hover:text-navy transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-navy font-semibold text-sm group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">Stay Informed</h2>
            <p className="text-gray-600 mb-8">
              Get the latest insights on AI security and threat intelligence delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg border border-gray-300 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none w-full sm:w-80"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
