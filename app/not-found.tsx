import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

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
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/" 
            className="btn bg-white text-navy border-white hover:bg-gray-100"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="btn btn-outline-white"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
