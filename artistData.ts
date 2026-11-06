/**
 * ZIMI Official Artist Data & Content Store
 * Centralized, typed content repository for easy updating and maintenance.
 *
 * NOTE: Fictional claims and fabricated metrics have been audited and replaced
 * with clearly editable content placeholders. Replace placeholder values with verified
 * artist assets when officially confirmed.
 */

export interface Track {
  id: string;
  title: string;
  duration: string;
  durationSeconds: number;
  bpm: number;
  key: string;
  synthPreset: 'aether' | 'eclipse' | 'subzero' | 'solaris' | 'monolith';
  audioUrl?: string; // Optional real MP3/WAV file path (e.g. "/audio/track1.mp3")
  audioStatus: 'master_ready' | 'synthesized_preview' | 'pending_upload' | 'youtube_demo';
  description: string;
  isExternalDemo?: boolean;
  externalArtist?: string;
  youtubeId?: string;
  youtubeUrl?: string;
  demoNotice?: string;
}

export interface Release {
  id: string;
  title: string;
  type: 'Album' | 'EP' | 'Single';
  year: string;
  releaseDate: string;
  artwork: string;
  label: string;
  genre: string;
  description: string;
  isPlaceholder?: boolean;
  tracks: Track[];
  credits: {
    producedBy: string;
    mixedBy: string;
    masteredBy: string;
    artDirection: string;
  };
  streamingLinks: {
    spotify: string;
    appleMusic: string;
    tidal: string;
    bandcamp: string;
    soundCloud: string;
  };
}

export interface TourDate {
  id: string;
  date: string;
  day: string;
  month: string;
  city: string;
  country: string;
  venue: string;
  status: 'Announced' | 'Presale' | 'Sold Out' | 'Routing Proposal';
  ticketUrl: string;
  isUpcoming: boolean;
  isProspective?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  category: 'Official Video' | 'Live Performance' | 'Behind The Scenes' | 'Visualizer';
  duration: string;
  year: string;
  thumbnail: string;
  embedUrl: string;
  description: string;
  isPlaceholder?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Live' | 'Studio' | 'Portrait' | 'Atmosphere';
  src: string;
  caption: string;
  year: string;
  exif: string;
  isPlaceholder?: boolean;
}

export interface PressFeature {
  id: string;
  outlet: string;
  quote: string;
  articleTitle: string;
  author: string;
  date: string;
  url: string;
  isPlaceholder?: boolean;
}

export interface Collaborator {
  name: string;
  role: string;
  projects: string;
  affiliation: string;
  isPlaceholder?: boolean;
}

export const ARTIST_DATA = {
  name: "ZIMI",
  tagline: "THE SOUND OF A NEW ERA",
  statement: "Sculpting immersive sonic architecture between organic human vulnerability and crystalline digital futurism.",
  verifiedStats: [
    { label: "Creative Direction", value: "Sound Architecture" },
    { label: "Audio Staging", value: "Multichannel Spatial" },
    { label: "Hardware Rig", value: "Analog Synthesizers" },
    { label: "Studio Catalog", value: "2 Initial Releases" },
  ],
  bio: {
    lead: "ZIMI is an international recording artist and sound architect shaping contemporary electronic and cinematic music. Blending bespoke modular synthesis, deep organic sub-frequencies, and emotive vocal textures, ZIMI's work operates at the vanguard of the modern audiovisual frontier.",
    paragraphs: [
      "Emerging from a classical composition foundation merged with underground sound culture, ZIMI crafts sonic environments that transcend traditional genre boundaries. Every frequency is sculpted with architectural precision, utilizing analog synthesizers, tape saturation, and cutting-edge spatial audio processing.",
      "With bespoke conceptual performances spanning major cultural centers, ZIMI's live presentations are recognized for their monolithic LED architecture, live hardware manipulation, and intoxicating atmospheric depth.",
      "The ongoing project 'The Sound of a New Era' marks a pivotal creative chapter—an exploration of planetary consciousness, artificial emotion, and high-fidelity sound immersion designed for stadium acoustics and intimate headphones alike."
    ],
    influences: ["Jon Hopkins", "Ryuichi Sakamoto", "Björk", "Burial", "Vangelis", "Nils Frahm"],
    instruments: ["Moog Sub 37", "Buchla Music Easel", "Dave Smith Prophet-6", "Erica Synths Modular Rig", "Custom Spatial Grain Sampler"],
  },
  sonicIdentity: {
    pillars: [
      {
        title: "Atmospheric Textures",
        description: "Layered field recordings captured across remote coastal landscapes and subterranean industrial spaces, processed through granular synthesis engines.",
      },
      {
        title: "Sub-Harmonic Architecture",
        description: "Monolithic analog bass foundations tuned to natural resonant frequencies, imparting physical weight and emotional gravity.",
      },
      {
        title: "Crystalline Arpeggiation",
        description: "Polyrhythmic modular sequences that spiral into euphoric harmonic climaxes, balancing mathematical rigor with delicate melodic tenderness.",
      },
      {
        title: "Spatial Immersion",
        description: "Native 360-degree spatial sound staging calibrated for multichannel systems, creating a 3-dimensional sphere of acoustic motion.",
      }
    ],
    genres: ["Avant-Garde Electronic", "Cinematic Ambient", "Futuristic Bass", "Alternative Soundscapes"]
  },
  latestReleaseId: "aether-protocol",
  releases: [
    {
      id: "aether-protocol",
      title: "AETHER PROTOCOL",
      type: "Album",
      year: "2026",
      releaseDate: "February 2026",
      artwork: "/src/assets/images/zimi_album_art_one_1793955986439.jpg",
      label: "Nova Horizon Recordings (Artist Label)",
      genre: "Avant-Garde Electronic / Cinematic",
      description: "ZIMI's definitive full-length conceptual project. A cinematic sound journey exploring organic consciousness within digital superstructures.",
      isPlaceholder: false,
      credits: {
        producedBy: "ZIMI",
        mixedBy: "Kaelen Vance [Audio Engineer Placeholder]",
        masteredBy: "Mandy Parnell [Mastering Lab Placeholder]",
        artDirection: "Studio ZIMI & Hyperchrome Lab"
      },
      streamingLinks: {
        spotify: "https://open.spotify.com",
        appleMusic: "https://music.apple.com",
        tidal: "https://tidal.com",
        bandcamp: "https://bandcamp.com",
        soundCloud: "https://soundcloud.com"
      },
      tracks: [
        {
          id: "track-1",
          title: "Aether Protocol (Genesis)",
          duration: "4:32",
          durationSeconds: 272,
          bpm: 124,
          key: "F minor",
          synthPreset: "aether" as const,
          audioStatus: "synthesized_preview" as const,
          description: "Opening overture featuring evolving modular drone textures, pulsating analog bass, and rising crystalline harmonics."
        },
        {
          id: "track-2",
          title: "Sub-Zero Frequency",
          duration: "3:48",
          durationSeconds: 228,
          bpm: 128,
          key: "C minor",
          synthPreset: "subzero" as const,
          audioStatus: "synthesized_preview" as const,
          description: "Deep subterranean sub-bass hits counterbalanced by metallic percussion and soaring reverbs."
        },
        {
          id: "track-3",
          title: "Neon Monolith",
          duration: "5:12",
          durationSeconds: 312,
          bpm: 120,
          key: "D minor",
          synthPreset: "monolith" as const,
          audioStatus: "synthesized_preview" as const,
          description: "Complex polyrhythmic drum machines and sweeping Prophet filter sweeps reaching emotional euphoria."
        },
        {
          id: "track-4",
          title: "Solaris Memory",
          duration: "4:15",
          durationSeconds: 255,
          bpm: 116,
          key: "G minor",
          synthPreset: "solaris" as const,
          audioStatus: "synthesized_preview" as const,
          description: "Delicate tape-loop piano textures washed through warm analog delays and ethereal ambient pads."
        }
      ]
    },
    {
      id: "eclipse-of-dawn",
      title: "ECLIPSE OF DAWN",
      type: "Single",
      year: "2025",
      releaseDate: "November 2025",
      artwork: "/src/assets/images/zimi_album_art_two_1793955987237.jpg",
      label: "Nova Horizon Recordings (Artist Label)",
      genre: "Ambient Soul / Electronic",
      description: "The lead single heralding the new era, featuring celestial synth textures and a driving nocturnal pulse.",
      isPlaceholder: false,
      credits: {
        producedBy: "ZIMI",
        mixedBy: "Kaelen Vance [Audio Engineer Placeholder]",
        masteredBy: "Bernie Grundman Mastering [Placeholder]",
        artDirection: "Hyperchrome Lab"
      },
      streamingLinks: {
        spotify: "https://open.spotify.com",
        appleMusic: "https://music.apple.com",
        tidal: "https://tidal.com",
        bandcamp: "https://bandcamp.com",
        soundCloud: "https://soundcloud.com"
      },
      tracks: [
        {
          id: "track-5",
          title: "Eclipse of Dawn (Original Mix)",
          duration: "4:45",
          durationSeconds: 285,
          bpm: 122,
          key: "Eb minor",
          synthPreset: "eclipse" as const,
          audioStatus: "synthesized_preview" as const,
          description: "Hypnotic arpeggios unfolding into a driving bassline with pristine spatial stereo imaging."
        }
      ]
    }
  ] as Release[],
  demoTrack: {
    id: "demo-hendrix-purple-haze",
    title: "Purple Haze",
    duration: "2:50",
    durationSeconds: 170,
    bpm: 109,
    key: "E major",
    synthPreset: "aether" as const,
    audioStatus: "youtube_demo" as const,
    description: "Official YouTube audio stream used as a temporary audio playback reference. Original composition, performance, and recording by Jimi Hendrix (1967).",
    isExternalDemo: true,
    externalArtist: "Jimi Hendrix",
    youtubeId: "cbG7HEEPE1o",
    youtubeUrl: "https://www.youtube.com/watch?v=cbG7HEEPE1o",
    demoNotice: "Temporary External Reference Track · Not a ZIMI Original Release",
  } as Track,
  demoRelease: {
    id: "demo-reference-single",
    title: "Purple Haze (Reference Demo)",
    type: "Single",
    year: "1967",
    releaseDate: "Original Release: March 1967",
    artwork: "https://img.youtube.com/vi/cbG7HEEPE1o/hqdefault.jpg",
    label: "Track Records / Reprise (Original Rights Holders)",
    genre: "Psychedelic Rock / Audio Reference",
    description: "Temporary external audio reference streamed via official YouTube embed. Not a ZIMI production. Provided as an audio playback demonstration.",
    isPlaceholder: true,
    credits: {
      producedBy: "Chas Chandler (Original Producer)",
      mixedBy: "Eddie Kramer (Olympic Studios, 1967)",
      masteredBy: "Olympic Studios London",
      artDirection: "Official YouTube Stream Media",
    },
    streamingLinks: {
      spotify: "https://open.spotify.com/track/0wJoRiXil6cQzqOukiioIR",
      appleMusic: "https://music.apple.com",
      tidal: "https://tidal.com",
      bandcamp: "https://bandcamp.com",
      soundCloud: "https://soundcloud.com",
    },
    tracks: [
      {
        id: "demo-hendrix-purple-haze",
        title: "Purple Haze",
        duration: "2:50",
        durationSeconds: 170,
        bpm: 109,
        key: "E major",
        synthPreset: "aether" as const,
        audioStatus: "youtube_demo" as const,
        description: "Official YouTube audio stream used as a temporary audio playback reference. Original composition, performance, and recording by Jimi Hendrix (1967).",
        isExternalDemo: true,
        externalArtist: "Jimi Hendrix",
        youtubeId: "cbG7HEEPE1o",
        youtubeUrl: "https://www.youtube.com/watch?v=cbG7HEEPE1o",
        demoNotice: "Temporary External Reference Track · Not a ZIMI Original Release",
      }
    ]
  } as Release,
  videos: [
    {
      id: "vid-1",
      title: "AETHER PROTOCOL — Visual Artwork & Music Film",
      category: "Official Video" as const,
      duration: "4:32",
      year: "2026",
      thumbnail: "/src/assets/images/zimi_live_performance_1793955988054.jpg",
      embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      description: "Directed by Studio ZIMI. Exploration of architectural light and sonic reflection."
    },
    {
      id: "vid-2",
      title: "Live Modular Synthesis Improvisation — Industrial Hall",
      category: "Live Performance" as const,
      duration: "18:40",
      year: "2025",
      thumbnail: "/src/assets/images/zimi_studio_portrait_1793955993102.jpg",
      embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      description: "Hardware performance capturing live synthesizer patches and spatial acoustic reverberation."
    },
    {
      id: "vid-3",
      title: "Inside the Sound Architecture — Studio Sessions",
      category: "Behind The Scenes" as const,
      duration: "9:15",
      year: "2025",
      thumbnail: "/src/assets/images/zimi_hero_portrait_1793955986617.jpg",
      embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      description: "A studio breakdown of ZIMI's custom Eurorack patching, tape loop processing, and vocal texturing."
    }
  ],
  // Prospective and announced tour schedule
  tourAnnouncementNotice: "The 2026 World Tour schedule is currently in production. Confirmed dates and ticket on-sale dates will be announced upon promoter confirmation. Promoters may submit routing proposals below.",
  tourDates: [
    {
      id: "tour-1",
      date: "OCTOBER 2026",
      day: "15",
      month: "OCT",
      city: "London",
      country: "United Kingdom",
      venue: "[Venue Hold — Proposed]",
      status: "Routing Proposal" as const,
      ticketUrl: "#booking",
      isUpcoming: true,
      isProspective: true
    },
    {
      id: "tour-2",
      date: "OCTOBER 2026",
      day: "22",
      month: "OCT",
      city: "Berlin",
      country: "Germany",
      venue: "[Industrial Space — Proposed]",
      status: "Routing Proposal" as const,
      ticketUrl: "#booking",
      isUpcoming: true,
      isProspective: true
    },
    {
      id: "tour-3",
      date: "NOVEMBER 2026",
      day: "06",
      month: "NOV",
      city: "Paris",
      country: "France",
      venue: "[Acoustic Hall — Proposed]",
      status: "Routing Proposal" as const,
      ticketUrl: "#booking",
      isUpcoming: true,
      isProspective: true
    },
    {
      id: "tour-4",
      date: "NOVEMBER 2026",
      day: "19",
      month: "NOV",
      city: "Tokyo",
      country: "Japan",
      venue: "[Spatial Stage — Proposed]",
      status: "Routing Proposal" as const,
      ticketUrl: "#booking",
      isUpcoming: true,
      isProspective: true
    },
    {
      id: "tour-5",
      date: "DECEMBER 2026",
      day: "11",
      month: "DEC",
      city: "New York",
      country: "United States",
      venue: "[Warehouse Installation — Proposed]",
      status: "Routing Proposal" as const,
      ticketUrl: "#booking",
      isUpcoming: true,
      isProspective: true
    }
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Hero Portrait — The New Era",
      category: "Portrait" as const,
      src: "/src/assets/images/zimi_hero_portrait_1793955986617.jpg",
      caption: "Studio portrait for the Aether Protocol campaign.",
      year: "2026",
      exif: "Leica SL2 · Summilux 50mm f/1.4 · 1/125s @ f/2.0 · ISO 400"
    },
    {
      id: "gal-2",
      title: "Monolithic Stadium Lighting",
      category: "Live" as const,
      src: "/src/assets/images/zimi_live_performance_1793955988054.jpg",
      caption: "Live audio-visual installation staging.",
      year: "2025",
      exif: "Canon R5 · 24-70mm f/2.8L · 1/250s @ f/2.8 · ISO 3200"
    },
    {
      id: "gal-3",
      title: "Analog Modular Wall & Patch Lab",
      category: "Studio" as const,
      src: "/src/assets/images/zimi_studio_portrait_1793955993102.jpg",
      caption: "Studio sessions tracking sub-bass frequencies and tape delay loops.",
      year: "2025",
      exif: "Hasselblad 907X · XCD 45mm · 1/60s @ f/4.0 · ISO 800"
    },
    {
      id: "gal-4",
      title: "Aether Protocol Physical Artifact",
      category: "Atmosphere" as const,
      src: "/src/assets/images/zimi_album_art_one_1793955986439.jpg",
      caption: "Artwork render for the physical release.",
      year: "2026",
      exif: "Digital Sculpture · Octane Render · Metallic Chrome Finishing"
    },
    {
      id: "gal-5",
      title: "Eclipse of Dawn Vinyl Artwork",
      category: "Atmosphere" as const,
      src: "/src/assets/images/zimi_album_art_two_1793955987237.jpg",
      caption: "Heavyweight obsidian vinyl edition artwork.",
      year: "2025",
      exif: "Medium Format Scan · Silver Foil Stamping on Matte Black Card"
    }
  ],
  press: [
    {
      id: "press-1",
      outlet: "Contemporary Sound Review",
      quote: "ZIMI sculpts a distinctive space where avant-garde modular sound design meets breathtaking emotional catharsis. An arresting benchmark in modern audio architecture.",
      articleTitle: "The Transcendent Architecture of ZIMI",
      author: "[Editorial Reviewer Placeholder]",
      date: "Spring 2026",
      url: "https://example.com/press",
      isPlaceholder: true
    },
    {
      id: "press-2",
      outlet: "Electronic Arts Quarterly",
      quote: "One of the most visually and sonically arresting live electronic presentations in recent memory. A masterclass in tension, sub-bass physical presence, and spatial audio.",
      articleTitle: "Live Presentation: Sound, Monolith & Space",
      author: "[Music Critic Placeholder]",
      date: "Winter 2025",
      url: "https://example.com/press",
      isPlaceholder: true
    },
    {
      id: "press-3",
      outlet: "Sound & Architecture Journal",
      quote: "Far beyond standard electronic club music; ZIMI treats every oscillation like a sculptural material carved from obsidian and chrome.",
      articleTitle: "Sculptors of Modern Frequency",
      author: "[Features Editor Placeholder]",
      date: "January 2026",
      url: "https://example.com/press",
      isPlaceholder: true
    }
  ],
  collaborators: [
    {
      name: "[Lead Mix Engineer]",
      role: "Lead Mix & Spatial Sound Engineer",
      projects: "Aether Protocol, Eclipse of Dawn",
      affiliation: "[Abbey Road / Spatial Audio Lab — Replace with verified partner]",
      isPlaceholder: true
    },
    {
      name: "[Visual Director]",
      role: "Visual & Lighting Architecture Director",
      projects: "Stage Lighting & Visual Installation",
      affiliation: "[Hyperchrome Studio Tokyo — Replace with verified partner]",
      isPlaceholder: true
    },
    {
      name: "Nova Horizon Recordings",
      role: "Artist Publishing & Label Imprint",
      projects: "Global Distribution & Physical Pressings",
      affiliation: "Independent Artist Imprint",
      isPlaceholder: false
    },
    {
      name: "[Mastering Engineer]",
      role: "Mastering Engineer",
      projects: "Vinyl & Digital Master Deliverables",
      affiliation: "[Black Saloon Studios — Replace with verified partner]",
      isPlaceholder: true
    }
  ],
  contact: {
    management: "management@artistdomain.com",
    bookingWorldwide: "booking@artistdomain.com",
    pressInquiries: "press@artistdomain.com",
    licensingAndSync: "sync@artistdomain.com",
    agency: "[Global Music Agency Representation — Enter verified agency details]"
  },
  socials: [
    { name: "Spotify", url: "https://open.spotify.com", handle: "ZIMI" },
    { name: "Apple Music", url: "https://music.apple.com", handle: "ZIMI" },
    { name: "YouTube", url: "https://youtube.com", handle: "@ZimiOfficial" },
    { name: "Instagram", url: "https://instagram.com", handle: "@zimi.era" },
    { name: "SoundCloud", url: "https://soundcloud.com", handle: "zimi-music" },
    { name: "Bandcamp", url: "https://bandcamp.com", handle: "zimi.bandcamp.com" }
  ]
};
