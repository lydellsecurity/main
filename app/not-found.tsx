import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-heading font-bold text-white/20 mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="btn bg-white text-navy border-white hover:bg-gray-100 inline-flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
      </div>
    </div>
  )
}
