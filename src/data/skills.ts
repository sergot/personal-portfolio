export type SkillCategory = 'Frontend' | 'Backend' | 'DevOps' | 'Database';

interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
  frameworks: string[];
}

export const categories: SkillCategory[] = ['Backend', 'DevOps', 'Database', 'Frontend'];

export const skills: Skill[] = [
  {
    name: 'React',
    icon: 'SiReact',
    category: 'Frontend',
    frameworks: []
  },
  {
    name: 'Vue.js',
    icon: 'SiVuedotjs',
    category: 'Frontend',
    frameworks: []
  },
  {
    name: 'TypeScript',
    icon: 'SiTypescript',
    category: 'Frontend',
    frameworks: []
  },
  {
    name: 'JavaScript',
    icon: 'SiJavascript',
    category: 'Frontend',
    frameworks: []
  },
  {
    name: 'Python',
    icon: 'SiPython',
    category: 'Backend',
    frameworks: ['FastAPI', 'Django', 'Flask', 'SQLAlchemy', 'Pytest', 'Pandas']
  },
  {
    name: 'Go',
    icon: 'SiGo',
    category: 'Backend',
    frameworks: ['Gin', 'Echo', 'GORM', 'Testify', 'Ent', 'Generics']
  },
  {
    name: 'Perl',
    icon: 'GiCamel',
    category: 'Backend',
    frameworks: ['Mojolicious', 'Dancer', 'DBI', 'Moose', 'Raku', 'OTRS', 'CPAN']
  },
  {
    name: 'Docker',
    icon: 'SiDocker',
    category: 'DevOps',
    frameworks: ['Docker Compose', 'Docker Operator']
  },
  {
    name: 'Kubernetes',
    icon: 'SiKubernetes',
    category: 'DevOps',
    frameworks: ['Helm', 'Prometheus', 'Grafana', 'kubectl']
  },
  {
    name: 'AWS',
    icon: 'SiAmazon',
    category: 'DevOps',
    frameworks: []
  },
  {
    name: 'Azure',
    icon: 'VscAzure',
    category: 'DevOps',
    frameworks: []
  },
  {
    name: 'Google Cloud',
    icon: 'SiGooglecloud',
    category: 'DevOps',
    frameworks: []
  },
  {
    name: 'Git',
    icon: 'SiGit',
    category: 'DevOps',
    frameworks: ['GitHub', 'Bitbucket', 'GitLab']
  },
  {
    name: 'PostgreSQL',
    icon: 'SiPostgresql',
    category: 'Database',
    frameworks: []
  },
  {
    name: 'MongoDB',
    icon: 'SiMongodb',
    category: 'Database',
    frameworks: []
  },
  {
    name: 'MySQL',
    icon: 'SiMysql',
    category: 'Database',
    frameworks: []
  }
]; 