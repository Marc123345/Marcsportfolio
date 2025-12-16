module.exports = {
  plugins: ['spellcheck'],
  rules: {
    'spellcheck/spell-checker': [1, {
      comments: true,
      strings: true,
      identifiers: false,
      lang: 'en_US',
      skipWords: [
        // React & Web Development
        'jsx', 'react', 'useEffect', 'btn', 'iLight', 'tsx', 'tailwind',
        'supabase', 'vite', 'lucide', 'gsap', 'zustand', 'framer', 'tanstack',
        'zod', 'vitest', 'eslint', 'tsconfig', 'postcss', 'netlify', 'toml',
        'webp', 'woff', 'ttf', 'eot', 'svg', 'png', 'jpg', 'jpeg', 'gif',
        
        // Names & Brands
        'Friedman', 'Binns', 'Uza', 'TCYS', 'Videoleap', 'Annapolis', 'Irreplicable',
        'MarginX', 'AutoMarginX', 'MyTube', 'Awwwards', 'Pexels', 'LinkedIn',
        'Calendly', 'Figma', 'Jira', 'Postman', 'Deno', 'Hono', 'Zapier',
        
        // Technical Terms
        'api', 'apis', 'async', 'auth', 'backend', 'cors', 'cta', 'dom', 'env',
        'frontend', 'fullstack', 'json', 'jwt', 'npm', 'oauth', 'postgres',
        'postgresql', 'repo', 'seo', 'ui', 'ux', 'xhr', 'middleware',
        
        // Locations
        'Aviv', 'Tel'
      ],
      skipIfMatch: [
        'http://[^s]*', 
        'https://[^s]*', 
        '^[-\\w]+/[-\\w\\.]+$',
        '^[\\w\\.]+@[\\w\\.]+$' // Email addresses
      ],
    }],
  },
};