export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: 'SSL Support for Raku',
    description: 'Led the Google Summer of Code project for the Perl Foundation that implemented comprehensive SSL/TLS support for the Raku programming language. This module is now used by developers worldwide for secure communications.',
    technologies: ['Raku', 'C', 'OpenSSL', 'Network Protocols', 'Security'],
    githubUrl: 'https://github.com/raku-community-modules/HTTP-UserAgent'
  },
  {
    title: 'TibiaCores',
    description: 'Social platform for the MMO game Tibia that streamlines team organization through shareable participation lists. Features secure authentication via Discord and Google, anonymous user accounts, and a responsive interface built with Go backend and React frontend. Designed to enhance player coordination for in-game events and activities.',
    technologies: ['Go', 'PostgreSQL', 'Vue.js', 'TypeScript'],
    githubUrl: 'https://github.com/sergot/tibiacores',
    liveUrl: 'https://tibiacores.com'
  },
  {
    title: 'Personal Portfolio Website',
    description: 'Designed and developed a modern, responsive portfolio website with dark mode support, smooth animations, and automated PDF resume generation. Features server-side rendering, optimized performance, and comprehensive SEO.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Puppeteer'],
    githubUrl: 'https://github.com/sergot/personal-portfolio',
    liveUrl: 'https://sergot.pl'
  }
];