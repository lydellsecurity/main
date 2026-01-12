# Lydell Security Website

A modern, production-ready website for Lydell Security - The AI Incident Response Authority.

Built with **Next.js 14**, **Tailwind CSS**, and optimized for **Netlify** deployment.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Netlify](https://img.shields.io/badge/Netlify-Ready-00C7B7?style=for-the-badge&logo=netlify)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/lydell-security-website.git
cd lydell-security-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory, ready for Netlify.

## 📁 Project Structure

```
lydell-security-nextjs/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout with nav/footer
│   ├── globals.css               # Global styles + Tailwind
│   ├── about/page.tsx            # About page
│   ├── contact/page.tsx          # Contact form
│   ├── ai-incident-response/     # Flagship service page
│   ├── services/                 # Service pages
│   │   ├── page.tsx              # Services hub
│   │   ├── threat-services/
│   │   ├── security-assessments/
│   │   ├── cloud-security/
│   │   ├── solution-deployment/
│   │   └── adversarial-testing/
│   ├── insights/                 # Blog section
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/page.tsx       # Individual posts
│   ├── resources/page.tsx        # Resources & downloads
│   ├── privacy/page.tsx          # Privacy policy
│   └── terms/page.tsx            # Terms of service
├── components/                   # Reusable components
│   ├── Navbar.tsx
│   └── Footer.tsx
├── content/                      # Markdown content
│   └── blog/                     # Blog posts (.md files)
├── lib/                          # Utility functions
│   └── blog.ts                   # Blog processing utilities
├── public/                       # Static assets
│   └── images/
├── netlify.toml                  # Netlify configuration
├── tailwind.config.ts            # Tailwind configuration
├── next.config.js                # Next.js configuration
└── package.json
```

## 🎨 Design System

### Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Navy (Primary) | `#1A365D` | `navy` | Headers, branding |
| Navy Light | `#2C5282` | `navy-light` | Hover states |
| Navy Dark | `#0F2744` | `navy-dark` | Dark accents |
| Alert Red | `#C53030` | `alert` | CTAs, urgency |
| Alert Light | `#E53E3E` | `alert-light` | Hover states |
| Alert Dark | `#9B2C2C` | `alert-dark` | Active states |

### Typography

- **Headings**: Montserrat (Bold 700)
- **Body**: Open Sans (Regular 400)

### Components

Pre-built button classes:
- `.btn` - Base button styles
- `.btn-primary` - Red CTA button
- `.btn-secondary` - Navy button
- `.btn-outline` - Outlined button
- `.btn-outline-white` - White outline (for dark backgrounds)
- `.btn-lg` / `.btn-sm` - Size variants

## 📝 Adding Blog Posts

Create a new `.md` file in `content/blog/`:

```markdown
---
title: "Your Post Title"
date: "2026-01-15"
excerpt: "Brief description of the post"
category: "AI Security"
author: "Jr Barksdale"
---

# Your Post Title

Your content here in markdown...
```

The blog system will automatically:
- Parse frontmatter
- Calculate read time
- Generate static pages
- Add to the blog listing

## 🚢 Deployment to Netlify

### Option 1: Git Integration (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Log into [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Netlify auto-detects settings from `netlify.toml`
6. Click "Deploy site"

### Option 2: Manual Deploy

```bash
# Build the site
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=out
```

### Environment Variables

No environment variables required for basic deployment. For advanced features:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (optional) |

## 📧 Contact Form

The contact form is configured for Netlify Forms. It will automatically work when deployed to Netlify.

For other hosting providers, update `app/contact/page.tsx` to use your preferred form handling solution (Formspree, custom API, etc.).

## 🔧 Customization

### Updating Contact Information

Edit these files:
- `components/Footer.tsx` - Footer contact info
- `app/contact/page.tsx` - Contact page details
- `app/about/page.tsx` - About page contact section

### Adding New Services

1. Create a new folder in `app/services/your-service/`
2. Add a `page.tsx` file following the existing service page pattern
3. Update the navigation in `components/Navbar.tsx`
4. Update the footer links in `components/Footer.tsx`
5. Add to the services hub at `app/services/page.tsx`

### Modifying Colors

Edit `tailwind.config.ts` to update the color palette:

```typescript
colors: {
  navy: {
    DEFAULT: '#YOUR_COLOR',
    light: '#YOUR_COLOR',
    dark: '#YOUR_COLOR',
  },
  // ...
}
```

## 📊 SEO

Each page includes:
- Custom metadata via Next.js Metadata API
- Open Graph tags for social sharing
- Structured page titles
- Meta descriptions

Update metadata in each page's `metadata` export:

```typescript
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description for SEO',
}
```

## 🧪 Development Tips

### Hot Reload
The dev server automatically reloads when you save changes.

### TypeScript
Full TypeScript support is included. Type errors will show in your terminal and IDE.

### Tailwind IntelliSense
Install the "Tailwind CSS IntelliSense" VS Code extension for autocomplete.

## 📄 License

Private - Lydell Security LLC © 2025

## 🤝 Support

- Email: support@lydellsecurity.com
- Phone: 770-243-9064

---

Built with ❤️ for Lydell Security
