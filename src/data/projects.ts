export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
}

export const projects: Project[] = [
  {
    title: 'Personal Portfolio Website',
    description: 'Modern, responsive portfolio website with dark mode support, smooth animations, and interactive components.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/sergot/sergot-com',
    liveUrl: 'https://sergot.com',
    image: '/placeholder.png',
  },
  {
    title: 'SSL support for Raku (Perl 6)',
    description: 'Google Summer of Code project for Perl Foundation, implemented SSL support for Raku.',
    technologies: ['Raku', 'C', 'Git'],
    githubUrl: 'https://github.com/sergot/http-useragent',
    // liveUrl: 'https://github.com/sergot/p6-SSL-Support',
    image: '/placeholder.png',
  },
  // Add more projects here
]; 