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
    description: 'Led the Google Summer of Code project for the Perl Foundation that implemented comprehensive SSL/TLS support for the Raku programming language. This critical infrastructure component is now used by thousands of developers worldwide for secure communications.',
    technologies: ['Raku', 'C', 'OpenSSL', 'Network Protocols', 'Security'],
    githubUrl: 'https://github.com/sergot/http-useragent'
  },
  {
    title: 'Personal Portfolio Website',
    description: 'Designed and developed a modern, responsive portfolio website with dark mode support, smooth animations, and automated PDF resume generation. Features server-side rendering, optimized performance (100/100 Lighthouse score), and comprehensive SEO.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Puppeteer'],
    githubUrl: 'https://github.com/sergot/sergot-com',
    liveUrl: 'https://sergot.pl'
  }
]; 