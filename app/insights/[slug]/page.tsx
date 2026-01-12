import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPostSlugs, markdownToHtml, getAllPosts } from '@/lib/blog'
import { Calendar, Clock, ArrowLeft, User, ArrowRight } from 'lucide-react'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const content = await markdownToHtml(post.content)
  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero-gradient pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <Link 
              href="/insights" 
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>
            
            <span className="inline-block bg-alert text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/70">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article 
                className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-slate-850 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-navy prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-850 prose-ul:text-gray-600 prose-ol:text-gray-600 prose-li:my-1 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-850 prose-pre:text-gray-100"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Author Box */}
              <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center text-white font-heading font-bold text-xl flex-shrink-0">
                    JB
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-1">{post.author}</h3>
                    <p className="text-navy font-medium text-sm mb-3">CEO & Principal Consultant</p>
                    <p className="text-gray-600 text-sm">
                      Jr Barksdale has 20+ years of incident response experience at Fortune 500 
                      financial institutions. GREM certified, he now leads Lydell Security's 
                      AI incident response practice.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* CTA Box */}
                <div className="bg-navy rounded-xl p-6 text-white mb-8">
                  <h3 className="font-heading font-bold text-lg mb-3">Need AI Security Help?</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Our team specializes in AI incident response and security assessments.
                  </p>
                  <Link href="/contact" className="btn bg-white text-navy border-white hover:bg-gray-100 w-full text-sm">
                    Contact Us
                  </Link>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.slug}
                          href={`/insights/${relatedPost.slug}`}
                          className="block group"
                        >
                          <span className="text-xs text-gray-500 uppercase tracking-wide">
                            {relatedPost.category}
                          </span>
                          <h4 className="font-heading font-semibold text-sm group-hover:text-navy transition-colors">
                            {relatedPost.title}
                          </h4>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-cta-gradient text-center">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              Protect Your AI Systems
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Don't wait for an incident. Get proactive about AI security today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-lg bg-white text-alert border-white hover:bg-gray-100">
                Schedule Consultation
              </Link>
              <Link href="/ai-incident-response" className="btn btn-outline-white btn-lg">
                Learn About AI-IRF
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
