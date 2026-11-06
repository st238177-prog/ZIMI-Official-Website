# ZIMI — The Sound of a New Era
### Ultra-Premium International Musician Portfolio & Digital Experience

---

## 1. Project Overview & Creative Direction

**ZIMI — The Sound of a New Era** is a bespoke, production-ready international recording artist digital experience. Designed for international electronic, ambient, and cinematic sound artist **ZIMI**, the interface is built from the ground up to embody:

- **Aesthetic Direction**: Futuristic, cinematic, dark luxury, and architectural purity.
- **Color Discipline**:
  - Obsidian Black (`#050608`) — 60% dominant canvas field.
  - Deep Midnight (`#090D14`) — 30% structural surfaces and glass panels.
  - Metallic Silver (`#C8CDD5`) — Typography, subtle hairline borders, and hardware accents.
  - Electric Blue (`#397BFF`) & Soft Blue Glow (`#75A9FF`) — 10% high-intent action focal points.
- **Strict Anti-Slop Guidelines**:
  - No generic AI pill badges or candy badges.
  - Unboxed metadata with typographic separators (`·`).
  - Strict Top Bar Contract (1-line wordmark, concise links, 1 primary action).
  - Authentic, truthful claims — no fabricated awards, invented statistics, or fake reviews.
  - Full accessibility: WCAG AA contrast, focus rings, and `@media (prefers-reduced-motion: reduce)` overrides.

---

## 2. Technical Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8 + ESNext
- **Styling**: Tailwind CSS v4 (native `@import "tailwindcss";` and `@custom-variant dark`)
- **Iconography**: Lucide React
- **Audio Architecture**: Web Audio API (real-time harmonic synthesizers + `AnalyserNode` frequency spectrum canvas) + Official YouTube IFrame API integration for external reference tracks.
- **Metadata & SEO**: Schema.org `MusicGroup` JSON-LD structured data, OpenGraph tags, Twitter cards, `robots.txt`, and `sitemap.xml`.

---

## 3. Project Architecture

```
/
├── index.html                  # HTML entry point, SEO metadata, fonts & Schema.org JSON-LD
├── metadata.json               # AI Studio project definition
├── package.json                # Dependencies and build scripts
├── tsconfig.json               # TypeScript compiler options
├── vite.config.ts              # Vite bundler configuration
├── .env.example                # Safe environment variable documentation template
├── public/
│   ├── robots.txt              # Search engine crawler instructions
│   └── sitemap.xml             # XML sitemap with priority rankings
├── src/
│   ├── main.tsx                # Application mounting point
│   ├── App.tsx                 # Root layout, queue state, and section orchestration
│   ├── index.css               # Design tokens, keyframes, scrollbar & reduced-motion rules
│   ├── assets/
│   │   └── images/             # Generated high-resolution editorial artist photography & covers
│   ├── data/
│   │   └── artistData.ts       # Centralized, typed content repository for all artist data
│   ├── utils/
│   │   └── audioEngine.ts      # Web Audio synthesizer, media source decoder & analyser
│   └── components/
│       ├── Preloader.tsx           # Intro sequence with ZIMI frequency initialization
│       ├── Navigation.tsx          # Top Bar Contract header with mobile drawer
│       ├── Hero.tsx                # Split cinematic hero with architectural metrics strip
│       ├── FloatingInstruments.tsx # Ambient, non-blocking 3D musical SVG artifacts
│       ├── LatestRelease.tsx       # Dual-tab featured spotlight (ZIMI original vs. external demo)
│       ├── Discography.tsx         # Filterable catalog with expandable track compositions
│       ├── MusicPlayer.tsx         # Persistent dock audio player with live spectrum visualizer
│       ├── SonicIdentity.tsx       # 4 sound pillars, hardware synth specs, and genre taxonomy
│       ├── AboutArtist.tsx         # Modular laboratory photography, biography & creative philosophy
│       ├── VideoGallery.tsx        # 4K visual films & live performance modal viewer
│       ├── TourSchedule.tsx        # Dual mode: tour status announcement & prospective routing
│       ├── PhotoGallery.tsx        # Responsive photography grid with full-screen EXIF lightbox
│       ├── Collaborations.tsx      # Production, engineering, and visual partner directory
│       ├── PressSection.tsx        # Media dossier with 1-click downloadable press kit (EPK)
│       ├── BookingSection.tsx      # Formal proposal form with validation & mailto fallback
│       └── Footer.tsx              # Wordmark, streaming links, legal modals, and back-to-top
```

---

## 4. Installation & Local Development

### Prerequisites
- Node.js $\ge 18.0.0$ or Bun $\ge 1.0.0$
- npm or bun package manager

### Steps
1. Clone the repository to your local workstation:
   ```bash
   git clone <repository-url>
   cd zimi-music-portfolio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch development server:
   ```bash
   npm run dev
   ```
   The local preview will be available at `http://localhost:3000`.

---

## 5. Production Build & Deployment

### Production Compilation
To verify types and generate an optimized production bundle:
```bash
# Type check and lint
npm run lint

# Compile production assets into /dist
npm run build
```

### Static Hosting Deployment (Vercel / Netlify / Cloudflare Pages)
1. Set the **Build Command** to: `npm run build`
2. Set the **Output Directory** to: `dist`
3. Set the **Install Command** to: `npm install`
4. Assign your custom production domain (e.g., `zimi-official.com`).

---

## 6. Artist Content Replacement Guide

All copy, imagery, releases, tour dates, and contacts are centralized in **`/src/data/artistData.ts`**. Management or content editors can customize the site without editing UI components:

### A. Replacing Tracks & Master Audio Files
1. Copy final mastered `.mp3` or `.wav` files into `/public/audio/` (e.g. `/public/audio/aether-protocol.mp3`).
2. In `/src/data/artistData.ts`, find the release in `ARTIST_DATA.releases`:
   ```typescript
   {
     id: "track-1",
     title: "Aether Protocol (Genesis)",
     duration: "4:32",
     durationSeconds: 272,
     bpm: 124,
     key: "F minor",
     synthPreset: "aether",
     audioUrl: "/audio/aether-protocol.mp3", // <-- Add direct file path here
     audioStatus: "master_ready",             // <-- Changes badge to Master Audio
     description: "Official studio master recording."
   }
   ```

### B. Removing the Temporary Jimi Hendrix Demo Track
Once ZIMI's official master files are uploaded:
1. In `src/components/LatestRelease.tsx`, toggle the default tab or remove the demo tab.
2. In `src/data/artistData.ts`, remove `demoTrack` and `demoRelease`.

### C. Updating Tour Dates
In `/src/data/artistData.ts`, update `ARTIST_DATA.tourDates`:
```typescript
{
  id: "tour-london-2026",
  date: "OCTOBER 15, 2026",
  day: "15",
  month: "OCT",
  city: "London",
  country: "United Kingdom",
  venue: "Royal Albert Hall",
  status: "Announced", // 'Announced' | 'Presale' | 'Sold Out' | 'Routing Proposal'
  ticketUrl: "https://verified-ticket-vendor.com/zimi",
  isUpcoming: true,
  isProspective: false
}
```

### D. Updating Press Reviews & Quotes
In `/src/data/artistData.ts`, replace the sample templates in `ARTIST_DATA.press` with verified quotes from music publications upon release.

---

## 7. Connecting a Backend for Direct Booking Submissions

The booking form currently features complete client-side validation and immediate pre-filled `mailto:` transmission. To enable direct in-browser database or email dispatch:

1. Create a server route (e.g. `/api/booking` via Express or Next.js serverless functions).
2. Install a mail transport library (e.g. `resend` or `nodemailer`).
3. Configure environment variables in `.env`:
   ```env
   BOOKING_DISPATCH_EMAIL="management@zimi-official.com"
   RESEND_API_KEY="re_your_api_key_here"
   ```
4. Update `handleSubmit` in `src/components/BookingSection.tsx` to `fetch('/api/booking', { method: 'POST', body: JSON.stringify(formData) })`.

---

## 8. Backup & Version Control

To backup the project state to GitHub or an enterprise Git server:
```bash
git init
git add .
git commit -m "ZIMI Production-Ready Master Release v1.0.0"
git branch -M main
git remote add origin https://github.com/your-organization/zimi-portfolio.git
git push -u origin main
```

---

## 9. Final Client Handover Checklist

- [x] Production build passes with 0 errors (`npm run build`).
- [x] TypeScript compiler passes with 0 errors (`tsc --noEmit`).
- [x] All 16 sections verified across mobile, tablet, laptop, and 4K viewports.
- [x] Web Audio API ambient soundscape engine verified and operational.
- [x] Jimi Hendrix *Purple Haze* external demo stream verified with official attribution.
- [x] Zero copyrighted audio hosted locally.
- [x] Booking proposal validation verified with working mailto client fallback.
- [x] Lightbox photo gallery verified with keyboard arrow/escape controls.
- [x] Electronic Press Kit (EPK) 1-click download verified (`ZIMI_Official_EPK_2026.txt`).
- [x] Schema.org `MusicGroup` JSON-LD, OpenGraph, and Twitter tags verified.
- [x] `robots.txt` and `sitemap.xml` verified in `public/`.
- [ ] *Pending Client*: Upload final ZIMI master WAV/MP3 files into `/public/audio/`.
- [ ] *Pending Client*: Connect production SMTP or transactional mail API keys.
- [ ] *Pending Client*: Configure production DNS custom domain records.
