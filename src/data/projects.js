export const projects = [
  {
    id: 'root-finder',
    title: 'Root Finder',
    tagline: 'Discover race-based travel businesses worldwide',
    description:
      'A full-stack travel discovery platform for finding race-based businesses hotels, cafes, and restaurants worldwide. Built with a production-ready architecture featuring auth, database, and cloud storage.',
    longDescription: `Root Finder is a global discovery platform designed to connect travelers with Asian-owned businesses worldwide. The platform features real-time search with advanced filters (cuisine type, location radius, rating), user authentication with Supabase Auth, business listings with reviews, and a clean responsive UI built on React + Tailwind CSS.

The PostgreSQL schema (managed via Supabase) handles complex relational data — business listings, user accounts, reviews, and images with SEO optimization applied for production deployment.`,
    tech: ['React', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Auth'],
    github: 'https://github.com/SharadHub/root-finder',
    liveUrl: 'https://root-finder-two.vercel.app',
    type: 'Full Stack',
    color: '#00ff88',
    preview: {
      type: 'mockup',
      pages: [
        {
          name: 'Home',
          layout: 'hero',
          headline: 'Find Asian-owned businesses near you',
          subline: 'Hotels · Cafés · Restaurants · Worldwide',
          cta: 'Explore Now',
          accent: '#00ff88',
        },
        {
          name: 'Search',
          layout: 'search',
          filters: ['All', 'Hotels', 'Cafés', 'Restaurants'],
          cards: [
            { name: 'Himalayan Café', rating: 4.8, city: 'Kathmandu', type: 'Café' },
            { name: 'Sakura Inn', rating: 4.6, city: 'Tokyo', type: 'Hotel' },
            { name: 'Pho Garden', rating: 4.9, city: 'Hanoi', type: 'Restaurant' },
            { name: 'Lotus Kitchen', rating: 4.7, city: 'Singapore', type: 'Restaurant' },
          ],
        },
        {
          name: 'Detail',
          layout: 'detail',
          business: {
            name: 'Himalayan Café',
            rating: 4.8,
            reviews: 142,
            tags: ['Nepali Cuisine', 'Tea', 'Wi-Fi'],
            desc: 'Authentic Himalayan cuisine in the heart of Kathmandu.',
          },
        },
      ],
    },
    features: [
      'Supabase Auth (email + OAuth)',
      'PostgreSQL schema with RLS policies',
      'Real-time search & filters',
      'Cloud image storage',
      'SEO-optimized for production',
      'Fully responsive UI',
    ],
    status: 'Live',
  },
  {
    id: 'seo-marketplace',
    title: 'SEO Marketplace',
    tagline: 'Connect businesses with SEO professionals',
    description:
      'A comprehensive full-stack platform connecting businesses with SEO professionals, featuring user authentication, project management, and payment integration.',
    longDescription: `A marketplace platform where businesses post SEO projects and professionals bid on them. Features include dual-role auth (client/freelancer), project milestone management, and a bidding system.`,
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    github: 'https://github.com/SharadHub/Updated-SEOMARKETPLACE',
    type: 'Full Stack',
    color: '#a78bfa',
    preview: {
      type: 'mockup',
      pages: [
        {
          name: 'Marketplace',
          layout: 'marketplace',
          listings: [
            { title: 'E-commerce SEO Audit', budget: '$200', bids: 8, tags: ['On-page', 'Technical'] },
            { title: 'Blog Link Building', budget: '$150', bids: 5, tags: ['Off-page', 'Backlinks'] },
            { title: 'Local SEO Campaign', budget: '$300', bids: 12, tags: ['Local', 'GMB'] },
          ],
          accent: '#a78bfa',
        },
      ],
    },
    features: [
      'Dual-role auth (client/freelancer)',
      'Project bidding system',
      'Milestone management',
      'User profiles & portfolios',
      'Project search & filters',
    ],
    status: 'Completed',
  },
];

export const skills = {
  frontend: [
    { name: 'React.js', level: 90 },
    { name: 'JavaScript (ES6+)', level: 88 },
    { name: 'Tailwind CSS', level: 85 },
    { name: 'HTML5 / CSS3', level: 92 },
    { name: 'Responsive Design', level: 87 },
  ],
  backend: [
    { name: 'Node.js', level: 75 },
    { name: 'Express.js', level: 73 },
    { name: 'REST APIs', level: 82 },
    { name: 'Python', level: 70 },
  ],
  database: [
    { name: 'MongoDB', level: 78 },
    { name: 'PostgreSQL', level: 75 },
    { name: 'Supabase', level: 80 },
    { name: 'MySQL', level: 72 },
  ],
  tools: [
    { name: 'Git & GitHub', level: 88 },
    { name: 'VS Code', level: 95 },
    { name: 'Postman', level: 82 },
    { name: 'npm', level: 85 },
  ],
};
