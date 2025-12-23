const navigationLinks: NavigationItem[] = [
  {
    label: 'Services',
    children: [
      {
        title: 'Conversion Systems',
        items: [
          { label: 'B2B Sales Funnels', to: '/services/b2b-funnels', description: 'Automated sales channels.' },
          { label: 'Ecommerce Solutions', to: '/services/ecommerce', description: 'Scalable React-based storefronts.' },
          { label: 'Fractional CMO', to: '/services/fractional-cmo', description: 'Strategic marketing execution.' }
        ]
      },
      {
        title: 'Infrastructure & Growth',
        items: [
          { label: 'Design & Dev', to: '/services/web-development', description: 'React & GSAP high-performance builds.' },
          { label: 'SEO & Growth', to: '/services/seo', description: 'Dominating B2B search results.' },
          { label: 'Managed Hosting', to: '/services/hosting-maintenance', description: 'Zero-downtime maintenance.' }
        ]
      }
    ]
  },
  { label: 'Work', to: '/work' },
  { label: 'Contact', to: '/contact', badge: 'Free Audit' }
];