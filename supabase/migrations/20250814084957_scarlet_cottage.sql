/*
  # Insert sample services data

  1. Sample Data
    - Insert initial services for the e-commerce store
    - Includes web development, design, and consulting services
    - All services are active and ready for purchase

  2. Services Included
    - Landing Page Development
    - Business Website
    - UI/UX Design Package
    - SaaS Development
    - Design Mentorship
    - Website Audit & Optimization
*/

INSERT INTO services (name, description, price, image_url, category, features, is_active) VALUES
(
  'Landing Page Development',
  'High-converting landing page designed to drive leads and sales',
  299900,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  'Web Development',
  ARRAY['Mobile-responsive design', 'SEO optimization', 'Analytics integration', '2-week delivery'],
  true
),
(
  'Business Website',
  'Complete business website with CMS and advanced features',
  799900,
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
  'Web Development',
  ARRAY['5-7 custom pages', 'Content management', 'Blog setup', '4-6 week delivery'],
  true
),
(
  'UI/UX Design Package',
  'Complete UI/UX design for your digital product',
  499900,
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
  'Design',
  ARRAY['User research', 'Wireframes', 'UI design', 'Interactive prototype'],
  true
),
(
  'SaaS Development',
  'End-to-end SaaS platform development',
  1999900,
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
  'Development',
  ARRAY['Scalable architecture', 'User authentication', 'Payment integration', '12-16 week delivery'],
  true
),
(
  'Design Mentorship',
  'One-on-one design mentorship and career guidance',
  79900,
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
  'Mentorship',
  ARRAY['4 one-hour sessions', 'Portfolio review', 'Career guidance', '1-month program'],
  true
),
(
  'Website Audit & Optimization',
  'Comprehensive website analysis and optimization recommendations',
  149900,
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  'Consulting',
  ARRAY['Performance audit', 'SEO analysis', 'UX review', 'Detailed report'],
  true
);