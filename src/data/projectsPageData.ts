export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDetails?: string;
  youtubeId: string;
  embedUrl: string;
  impactMetrics?: string[];
}

export interface ClientTestimonialItem {
  name: string;
  role: string;
  company: string;
  quote: string;
  image?: string;
  videoUrl?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  bullets?: string[];
}

export const ALL_PROJECTS: ProjectItem[] = [
  {
    id: "nisau-uk",
    title: "NISAU UK",
    category: "Video Production",
    description: "NISAU UK's multi-city India tour, highlighting events, interactions, and opportunities promoting UK education across eight major cities.",
    fullDetails: "A comprehensive multi-city production spanning Mumbai, Delhi, Bengaluru, Hyderabad, and Kolkata, capturing key student summits, leadership roundtables, and international educational exchanges with high-impact visual storytelling.",
    youtubeId: "hSJInJOvAok",
    embedUrl: "https://www.youtube.com/embed/hSJInJOvAok",
    impactMetrics: ["8 Major Cities Covered", "Multi-Camera Event Coverage", "High-Reach Social Campaign"],
  },
  {
    id: "hgh-india",
    title: "HGH India",
    category: "Corporate Video Production",
    description: "Showcased HGH India's 4-day trade show with drones, gimbals, LED animations, and interviews, highlighting its scale, exhibitors, and industry impact.",
    fullDetails: "Extensive multi-camera on-ground coverage featuring 4K drone cinematography, steady gimbal tracking shots across sprawling exhibition halls, and real-time exhibitor testimonials.",
    youtubeId: "svyT8BLT1NQ",
    embedUrl: "https://www.youtube.com/embed/svyT8BLT1NQ",
    impactMetrics: ["4-Day Trade Expo", "30+ Exhibitor Spotlights", "4K Drone & Gimbal Cinematography"],
  },
  {
    id: "pipal-tree",
    title: "Pipal Tree",
    category: "Social Documentary",
    description: "The 'Seed Savers' documentary explores Karnataka's rural seed conservation, blending 50 farmer interviews with visuals to preserve ancient farming traditions.",
    fullDetails: "An emotive agrarian narrative tracing indigenous seed preservation efforts across Karnataka, documenting generational wisdom and biodiversity resilience.",
    youtubeId: "N2TbCri2RwY",
    embedUrl: "https://www.youtube.com/embed/N2TbCri2RwY",
    impactMetrics: ["50 Farmer In-Depth Interviews", "Rural Karnataka Heartland", "Cultural Archival Heritage"],
  },
  {
    id: "sneha",
    title: "SNEHA",
    category: "CSR Video",
    description: "Produced a compelling volunteer showcase film for SNEHA, capturing 50 interviews to highlight their impact, challenges, and collaborations across Mumbai.",
    fullDetails: "A poignant documentary spotlighting grassroots healthcare and nutrition volunteers operating in informal settlements across the Mumbai metropolitan region.",
    youtubeId: "BfQ9FoCpBRo",
    embedUrl: "https://www.youtube.com/embed/BfQ9FoCpBRo",
    impactMetrics: ["50 Volunteer Interviews", "Grassroots Health Initiatives", "Donor & Partner Engagement"],
  },
  {
    id: "htpf-sneha",
    title: "HTPF + SNEHA",
    category: "CSR Video Production",
    description: "Created a community impact video for HTPF and SNEHA, blending testimonials and data to showcase three years of transformative health and well-being efforts.",
    fullDetails: "A comprehensive three-year retrospective evaluating health interventions, maternal care support, and measurable community milestones with authentic on-ground footage.",
    youtubeId: "uj1crM45QXk",
    embedUrl: "https://www.youtube.com/embed/uj1crM45QXk",
    impactMetrics: ["3-Year Milestone Retrospective", "Transformative Health Data", "Community Voices"],
  },
  {
    id: "liberty-insurance",
    title: "Liberty Insurance",
    category: "Cinematography",
    description: "Liberty Insurance's Annual Event in Mumbai, showcasing key moments, live-streamed Townhall, and created an energetic highlight video resonating globally.",
    fullDetails: "Dynamic multi-angle event coverage, live broadcast integration, executive keynote capture, and a fast-paced global highlight reel capturing brand vitality.",
    youtubeId: "DgIY-9VDe7I",
    embedUrl: "https://www.youtube.com/embed/DgIY-9VDe7I",
    impactMetrics: ["Live-Streamed Townhall", "Multi-Angle Camera Setup", "Global Corporate Highlight"],
  },
  {
    id: "aditya-birla-sun-life-insurance",
    title: "Aditya Birla Sun Life Insurance",
    category: "Employee Engagement",
    description: "Collaborated with ABSLI to create a heartfelt 'Surprise Your Spouse' video series and event coverage, strengthening employee engagement and celebrating team culture.",
    fullDetails: "A heart-warming episodic internal series capturing authentic emotional reactions, marital appreciation, and company culture celebrations across nationwide offices.",
    youtubeId: "Ceo98UjRn0Y",
    embedUrl: "https://www.youtube.com/embed/Ceo98UjRn0Y",
    impactMetrics: ["Episodic Workplace Series", "Pan-India Corporate Branches", "High Internal Morale Impact"],
  },
  {
    id: "jll-india",
    title: "JLL India",
    category: "Employee Video",
    description: "Collaborated with JLL India to create a diversity-focused brand film, featuring multi-city shoots, employee stories in a poetic format, and superhero-themed visual motifs.",
    fullDetails: "A high-concept corporate narrative exploring inclusion and excellence, combining cinematic cinematography across commercial real estate skylines with rhythmic verse.",
    youtubeId: "OAsHZjUofIk",
    embedUrl: "https://www.youtube.com/embed/OAsHZjUofIk",
    impactMetrics: ["Diversity & Inclusion Focus", "Multi-City Skyline Shoots", "Poetic Narrative Style"],
  },
];

export const CLIENT_TESTIMONIALS: ClientTestimonialItem[] = [
  {
    name: "Dipttii Khanna",
    role: "Founder & Lead Interior Designer",
    company: "Dipti Khanna Designs",
    quote: "Hi, I'm Dipttii Khanna from Dipti Khanna Designs. We are an interior design firm based in Mumbai and I've got a lot of my site shoot videography done from Rohan and his team. Their ideation and how they've gone about taking the video, with client testimonials, client bites, along with my walkthroughs has been exceptionally well taken and really nice.",
    image: "https://storage.googleapis.com/mkv_imagesbackend/project_testimonials/675d8130c7db4_Dipttii Khanna.png",
  },
  {
    name: "Rachit Mundra",
    role: "Founder",
    company: "Baybot",
    quote: "Hi, I'm Rachit, founder of Baybot. We are a D2C electronics brand with security systems and pets. When we founded the company we wanted explainer videos on how the products work and marketing videos where Rohan was of great help. He understood the products in detail, helped us create fantastic videos with text overlays and technical breakdowns. When the products were ready, the videos were ready.",
    videoUrl: "https://storage.googleapis.com/mkv_imagesbackend/testimonials/videos/6764ff53a9932_Testimonial from Rachit Mundra (1).mp4",
  },
];

export const PROJECT_FAQS: FaqItem[] = [
  {
    question: "What types of industries has Make My Vid worked with?",
    answer: "Make My Vid has collaborated with a diverse range of industries, including education, healthcare, technology, finance, real estate, entertainment, and e-commerce. This broad experience allows us to tailor our video production services to meet the unique needs and goals of each sector. Whether it’s corporate branding for Fortune 500 companies, product explainer videos for startups, or event coverage for international organizations, we bring industry-specific expertise to every project.",
  },
  {
    question: "What advanced tools and technologies are used in Make My Vid’s projects?",
    answer: "Make My Vid employs cutting-edge tools and technologies across the entire production pipeline:",
    bullets: [
      "Cinematography equipment: High-definition cameras like the Sony A7S3, gimbals, drones, and prime lenses for dynamic shots.",
      "Post-production suite: Adobe Premiere Pro for editing, After Effects for animation and motion design, and Audition for audio refinement.",
      "Specialized capture: Timelapse, hyperlapse, and 360-degree cameras for immersive spatial visuals.",
      "LED display optimization: Custom high-resolution formatting for large event stages and video walls.",
      "AI and automation: Modern AI workflows for rapid transcriptions, intelligent cuts, and advanced object tracking.",
    ],
  },
  {
    question: "How does Make My Vid incorporate storytelling into its video projects?",
    answer: "Storytelling is at the heart of every project at Make My Vid. We focus on:",
    bullets: [
      "Understanding the brand's narrative: Deeply exploring the client’s mission, values, and goals to weave their true story into the video.",
      "Emotion-driven content: Crafting scripts and visuals that connect with the audience on a personal, human level.",
      "Seamless transitions and pacing: Using dynamic editing, sound design, and motion graphics to maintain viewer engagement throughout.",
      "Highlighting key messages: Ensuring the audience clearly understands core takeaways by aligning visuals, audio, and typography.",
      "Deep understanding of Target Audience: Each film is tailored to resonate with and motivate the specific target demographic.",
    ],
  },
  {
    question: "How have Make My Vid’s projects helped clients achieve their goals?",
    answer: "Our projects consistently deliver measurable results for clients across the globe:",
    bullets: [
      "Enhanced brand visibility: Videos for brands like Wol3D helped secure Shark Tank funding by effectively communicating innovation and value.",
      "Increased employee engagement: Initiatives like Aditya Birla Capital's 'Surprise Your Spouse' series boosted workplace morale and retention.",
      "Improved sales performance: High-converting product explainer videos for Baybot and Campure drove significant uplifts on platforms like Amazon and direct storefronts.",
    ],
  },
  {
    question: "What range of video formats does Make My Vid specialize in?",
    answer: "Make My Vid specializes in a comprehensive spectrum of video formats tailored to modern multi-platform distribution:",
    bullets: [
      "Corporate videos: Brand anthems, employee engagement films, onboarding series, and annual corporate showcases.",
      "Product videos: Technical explainers, unboxings, 3D animated demonstrations, and TVCs.",
      "Event coverage: Multi-day summits, keynote live streaming, delegate soundbites, and aftermovies.",
      "Educational content: Masterclasses, interactive training modules, and corporate webinars.",
      "Social media reels and ads: Snappy, high-retention short-form content optimized for Instagram, YouTube Shorts, and LinkedIn.",
    ],
  },
  {
    question: "How does Make My Vid collaborate with clients during a project?",
    answer: "Collaboration is transparent, communicative, and agile at every stage:",
    bullets: [
      "Initial consultation: Aligning on creative objectives, audience persona, visual tone, and project milestones.",
      "Pre-production blueprint: Scriptwriting, storyboarding, location scouting, and talent coordination.",
      "Production phase: Professional on-set direction with live client monitoring feeds where requested.",
      "Post-production iterations: Structured feedback rounds with frame-accurate review tools for seamless approvals.",
    ],
  },
];
