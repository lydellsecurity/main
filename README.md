# Lydell Security | Elite Incident Response

Premium, 2026-ready website for Lydell Security's rebrand as an elite Incident Response specialist agency.

![License](https://img.shields.io/badge/license-private-red)
![React](https://img.shields.io/badge/React-18.2-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4)

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment

### Netlify (Recommended)

#### Option 1: Git Integration (Automatic)
1. Push this repo to GitHub/GitLab/Bitbucket
2. Log into [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your Git provider and select this repository
5. Netlify auto-detects settings from `netlify.toml`
6. Click "Deploy site"

#### Option 2: CLI Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site (first time)
netlify init

# Deploy preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

#### Option 3: Manual Drag & Drop
```bash
# Build the project
npm run build

# Drag the 'dist' folder to Netlify's deploy dropzone
```

---

## Custom Domain Setup

1. In Netlify dashboard → Site settings → Domain management
2. Add custom domain: `lydellsecurity.com`
3. Update DNS records at your registrar:

```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     [your-site].netlify.app
```

4. Enable HTTPS (automatic with Netlify)

---

## Project Structure

```
lydell-hero/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx       # Main hero with grid animation
│   │   ├── EmergencyDial.jsx     # 15-min response component
│   │   ├── ServicesSection.jsx   # Core services
│   │   ├── PedigreeSection.jsx   # Fed/NYSE credentials
│   │   └── TechStackSection.jsx  # 2026 tech stack
│   ├── App.jsx             # Main application
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles + Tailwind
├── netlify.toml            # Netlify configuration
├── tailwind.config.js      # Tailwind customization
├── vite.config.js          # Vite configuration
└── BRAND_GUIDELINES.md     # Complete brand documentation
```

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2+ | UI framework |
| Tailwind CSS | 3.4+ | Styling |
| Vite | 5.0+ | Build tool |
| Netlify | - | Hosting & deployment |

---

## Design System

### Colors
- **Deep Obsidian** `#0A0A0F` — Primary background
- **Neon Cobalt** `#0066FF` — Primary accent
- **Electric Cyan** `#00D4FF` — Secondary accent
- **Alert Crimson** `#FF3366` — Emergency states

### Typography
- **Headlines:** JetBrains Mono
- **Body:** Inter
- **Metrics:** Space Grotesk

---

## Environment Variables (Optional)

Create `.env.local` for environment-specific config:

```env
# API endpoints (if needed)
VITE_API_URL=https://api.lydellsecurity.com

# Analytics
VITE_GA_ID=G-XXXXXXXXXX
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at `localhost:5173` |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## License

Private — Lydell Security © 2026

---

## Support

For technical issues with this codebase, contact the development team.
For emergency incident response: **response@lydellsecurity.com**
