import type { Metadata } from 'next'
import { Montserrat, Open_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://lydellsecurity.com'),
  title: {
    default: 'Lydell Security | AI Incident Response Authority',
    template: '%s | Lydell Security',
  },
  description: 'The AI Incident Response Authority. 20+ years Fortune 500 security experience. GREM certified. Threat services, security assessments, and the industry\'s first AI-IRF Framework.',
  keywords: ['AI incident response', 'cybersecurity consulting', 'incident response', 'AI security', 'GREM certified', 'Atlanta cybersecurity'],
  authors: [{ name: 'Lydell Security' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lydellsecurity.com',
    siteName: 'Lydell Security',
    title: 'Lydell Security | AI Incident Response Authority',
    description: 'The AI Incident Response Authority. 20+ years Fortune 500 security experience.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lydell Security | AI Incident Response Authority',
    description: 'The AI Incident Response Authority. 20+ years Fortune 500 security experience.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="min-h-screen bg-white">
        {/* Navbar is fixed, so it's outside normal flow */}
        <Navbar />
        {/* Main content - no pt-20 here because hero sections handle their own padding */}
        <main className="relative" style={{ zIndex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
