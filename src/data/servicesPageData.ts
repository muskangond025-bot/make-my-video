export interface SpotlightService {
  id: string;
  title: string;
  image: string;
  description: string;
  tag: string;
  slug: string;
}

export interface KeyFeatureItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ServiceDetailItem {
  id: string;
  title: string;
  headline: string;
  description: string;
  deliverables?: string[];
}

export interface ServiceFaqItem {
  category?: string;
  question: string;
  answer: string;
  bullets?: string[];
}

export const SPOTLIGHT_SERVICES: SpotlightService[] = [
  {
    id: "multi-city",
    title: "Multi City Video Production",
    tag: "Pan-India Production",
    description: "End-to-end multi-camera production and ground logistics across India's tier-1 and tier-2 hubs with uniform creative standards.",
    image: "https://storage.googleapis.com/mkv_imagesbackend/sliders/67972e266515d_Copy of MMV Website service page (1330 x 1780 px) (2) (1) (1).png",
    slug: "multi-city-videos-production",
  },
  {
    id: "remote-editing",
    title: "Remote Video Editing Services",
    tag: "Global Post-Production",
    description: "Outsource editing to our high-caliber remote post-production studio with lightning-fast turnarounds and cloud review tools.",
    image: "https://storage.googleapis.com/mkv_imagesbackend/sliders/67972eb47e0e2_MMV Website service page 440 x 622 (2).png",
    slug: "remote-editing-work",
  },
];

export const KEY_FEATURES: KeyFeatureItem[] = [
  {
    id: "custom-solutions",
    title: "Tailored to Your Target Audience",
    description: "Be it designing award videos for your valued employees or communicating a new product launch to your consumers; our team understands your target audience and designs customised video solutions.",
    image: "https://storage.googleapis.com/mkv_imagesbackend/key_features/677e6c5986be7_1.png",
  },
  {
    id: "unbeatable-deadlines",
    title: "100% On-Time Delivery Record",
    description: "We can gracefully flaunt that we have never missed any vital deadlines set by our clients till date. Whether it is delivering an overnight edit of a 2 day long shoot or creating 300+ nomination videos within 2 days, we always deliver on time... everytime.",
    image: "https://storage.googleapis.com/mkv_imagesbackend/key_features/677e6c7f4678e_2.png",
  },
  {
    id: "value-abundance",
    title: "The Law of Abundance",
    description: "We follow the law of abundance, where we make sure that we always deliver more value than clients' expectations. Be it a startup based in New Delhi or an MNC based in New York, our cost-effective video solutions are designed to add value to your communication and brand appeal.",
    image: "https://storage.googleapis.com/mkv_imagesbackend/key_features/677e6c9d9551e_3.png",
  },
];

export const ALL_SERVICES_CATALOG: ServiceDetailItem[] = [
  {
    id: "multi-city-production",
    title: "Multi City Video Production",
    headline: "FIND YOUR WAY TO GREATNESS",
    description: "We offer comprehensive video production and editing services across India, catering to diverse needs. From corporate shoots to creative storytelling, we deliver exceptional quality with a variety of styles. Equipped with advanced gear, we ensure every project stands out, meeting all your visual needs seamlessly.",
    deliverables: ["4K Multi-Camera Setups", "Drone & Aerial Filming", "Pan-India Local Crew Coordination", "Standardized Brand Grading"],
  },
  {
    id: "remote-editing-work",
    title: "Remote Video Editing Services",
    headline: "FIND YOUR WAY TO GREATNESS",
    description: "Outsource your video editing needs to our expert team with seamless remote editing services. No matter your location, we deliver high-quality editing tailored to your project requirements. From corporate videos to creative projects, our skilled editors ensure polished results that exceed expectations.",
    deliverables: ["Cloud Storage Ingestion", "Frame.io Timecode Reviews", "Color Grading & Sound Master", "Rapid Overnight Turnarounds"],
  },
  {
    id: "corporate-av",
    title: "Corporate AV & Brand Films",
    headline: "FIND YOUR WAY TO GREATNESS",
    description: "Elevate your brand with our corporate AV services, designed to showcase your story, values, and offerings through stunning visuals and professional production. From concept to execution, we create impactful videos that connect with your audience, leaving a lasting impression.",
    deliverables: ["Executive Interviews", "Brand Anthem Films", "Investor Relations Showcases", "Custom Sound Design & Music"],
  },
  {
    id: "trade-shows-exhibitions",
    title: "Trade Shows & Exhibition Videos",
    headline: "FIND YOUR WAY TO GREATNESS",
    description: "Bring your trade shows and exhibitions to life with impactful videos that showcase your brand, products, and audience engagement. We capture the energy, interactions, and highlights, creating compelling visuals that effectively communicate your event's success and leave a lasting impression.",
    deliverables: ["Gimbal Walkthroughs", "Exhibitor & Visitor Bites", "LED Wall Video Loops", "Same-Day Teaser Reels"],
  },
  {
    id: "corporate-events",
    title: "Corporate Events & Townhalls",
    headline: "FIND YOUR WAY TO GREATNESS",
    description: "Capture the essence of your corporate events with our expert video production services. We focus on preserving key moments, highlights, and emotions, crafting videos that enhance your brand’s presence. From dynamic coverage to polished editing, we ensure your event stands out and engages your audience.",
    deliverables: ["Annual General Meetings", "Awards & Gala Nights", "Behind-The-Scenes Snippets", "Social Media Cutdowns"],
  },
  {
    id: "live-telecast",
    title: "Live Telecast & Multi-Platform Streaming",
    headline: "FIND YOUR WAY TO GREATNESS",
    description: "Take your events global with Make My Vid's professional live-streaming services. We deliver high-quality broadcasts that ensure a seamless and engaging experience for your audience, no matter where they are. From corporate events to special occasions, we make every moment count in real time.",
    deliverables: ["Redundant Streaming Uplinks", "Multi-Destination Broadcast (YouTube, Zoom, LinkedIn)", "Lower Third Graphics & Overlays", "Full Archived Recordings"],
  },
  {
    id: "conferences-panels",
    title: "Conferences & Panel Discussions",
    headline: "FIND YOUR WAY TO GREATNESS",
    description: "Capture the essence of your conferences and panel discussions with our expert video production services. We professionally document every moment, from keynote speeches to audience interactions, creating impactful videos that showcase your event's insights, highlights, and key messages with precision.",
    deliverables: ["Slide Deck Synchronisation", "Multi-Angle Speaker Isolation", "Key Takeaway Clips", "Podcast & Audio Master Exports"],
  },
  {
    id: "social-initiatives",
    title: "Social Initiatives & CSR Documentation",
    headline: "FIND YOUR WAY TO GREATNESS",
    description: "Bring your social initiatives to life with powerful video and photo coverage that highlights their real-world impact. We craft compelling visuals to tell your story, inspiring action and engagement. Showcase the change you're making and motivate others to join your mission for a better future.",
    deliverables: ["Human-Centric Interviews", "Rural & On-Ground Cinematography", "Impact Data Visualization", "Donor & Partner Reports"],
  },
];

export const FEATURED_CAPABILITIES: string[] = [
  "Scripting & Voiceover Services",
  "Social Media Content & Viral Reels",
  "Creative Direction & Storyboarding",
  "3D Motion Graphics & Animation",
  "Aerial Cinematography & FPV Drones",
];

export const SERVICE_FAQS: ServiceFaqItem[] = [
  {
    category: "Cost & Scope",
    question: "How much does video production cost?",
    answer: "The cost depends on the project's scope, including video length, complexity, shooting locations, talent, and specific post-production requirements. Contact us for a tailored quote structured to maximize your return on investment.",
  },
  {
    category: "Logistics",
    question: "How does Make My Vid coordinate and manage video production across multiple cities?",
    answer: "Make My Vid uses a streamlined process to manage multi-city video production effectively:",
    bullets: [
      "Pre-Production Planning: Developing detailed schedules, shot lists, and location-specific strategies to ensure seamless execution.",
      "Local Teams and Resources: Leveraging verified partnerships with experienced local videographers and production crews across tier-1 and tier-2 Indian cities.",
      "Centralized Communication: Utilizing real-time project management dashboards to keep client stakeholders and crews aligned.",
      "Consistent Equipment and Standards: Enforcing uniform Sony FX / A7 series camera packages, pro lighting setups, and strict color grading guidelines.",
    ],
  },
  {
    category: "Industries",
    question: "What industries benefit most from multi-city video production services?",
    answer: "Industries that frequently rely on our multi-city video production include:",
    bullets: [
      "International Organisations: Capturing nationwide delegation tours and student summits across 8+ major cities.",
      "Corporates with Multi-City Branches: Employer branding campaigns and diversity films with synchronized shoots in Mumbai, Bengaluru, Delhi, and Hyderabad.",
      "Trade Show Organisers: Flagship trade expos replicated across geographic epicenters.",
      "Healthcare, Pharma & CSR: Documenting public health initiatives and field operations across rural states.",
      "Education & Training: Large-scale institutional convocations and academic summits.",
    ],
  },
  {
    category: "Quality",
    question: "Can Make My Vid maintain consistent quality and branding across various locations?",
    answer: "Yes, Make My Vid guarantees brand consistency through:",
    bullets: [
      "Standardized Production Protocols: Detailed shooting blueprints, framing specs, and lighting temperatures.",
      "Centralized Post-Production: All raw footage is ingested and assembled in our core Mumbai studio for unified typography, color science, and sound mixing.",
      "Creative Direction Oversight: A single creative lead supervises every multi-city production end-to-end.",
      "Quality Assurance: Rigorous multi-stage QA review before any render reaches the client.",
    ],
  },
  {
    category: "Remote Edit",
    question: "How does Make My Vid collaborate with clients for remote editing projects?",
    answer: "Our remote editing workflow is frictionless and transparent:",
    bullets: [
      "Secure High-Speed Ingestion: Upload raw footage effortlessly via Google Drive, Dropbox, or secure FTP.",
      "Timecoded Feedback Loops: Frame-accurate timestamp commenting via Frame.io for effortless revisions.",
      "Dedicated Slack / WhatsApp Communication: Real-time status updates and direct editor interaction.",
      "Rapid Iterations: Standard drafts turned around within 24 to 48 hours.",
    ],
  },
  {
    category: "Post Suite",
    question: "What tools and platforms are used for seamless remote editing services?",
    answer: "We utilize industry-standard creative and post-production software:",
    bullets: [
      "Editing Suites: Adobe Premiere Pro, DaVinci Resolve Studio, and Final Cut Pro.",
      "Motion Design: Adobe After Effects and Cinema 4D.",
      "Audio Suite: Adobe Audition, iZotope RX, and Adobe Podcast AI audio restoration.",
      "Collaboration: Frame.io, Dropbox, and Slack.",
    ],
  },
  {
    category: "Events",
    question: "What types of corporate events does Make My Vid specialize in covering?",
    answer: "We specialize in capturing high-stakes corporate occasions including Annual General Meetings (AGMs), flagship product unveils, leadership townhalls, awards galas, delegate summits, and employee celebrations.",
  },
  {
    category: "Live Stream",
    question: "How does Make My Vid ensure smooth live telecast experiences for events?",
    answer: "We guarantee seamless streaming through dedicated bonded cellular uplinks, redundant backup encoders, multi-camera video switchers, lower-third graphics integration, and real-time audio mastering.",
  },
];
