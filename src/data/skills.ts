export type SkillCategory = 'Frontend' | 'Backend' | 'DevOps & Cloud' | 'Databases & Data' | 'Tools & Methodologies';

interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
  frameworks: string[];
}

export const categories: SkillCategory[] = ['Backend', 'DevOps & Cloud', 'Databases & Data', 'Frontend', 'Tools & Methodologies'];

export const skills: Skill[] = [
  {
    name: 'Python',
    icon: 'SiPython',
    category: 'Backend',
    frameworks: ['FastAPI', 'Django', 'Flask', 'SQLAlchemy', 'Pytest', 'MyPy', 'Asyncio', 'Pydantic']
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
    name: 'Docker',
    icon: 'SiDocker',
    category: 'DevOps & Cloud',
    frameworks: []
  },
  {
    name: 'Kubernetes',
    icon: 'SiKubernetes',
    category: 'DevOps & Cloud',
    frameworks: ['Helm', 'Prometheus', 'Grafana', 'kubectl', 'Operators']
  },
  {
    name: 'AWS',
    icon: 'SiAmazon',
    category: 'DevOps & Cloud',
    frameworks: []
  },
  {
    name: 'Azure',
    icon: 'VscAzure',
    category: 'DevOps & Cloud',
    frameworks: []
  },
  {
    name: 'Google Cloud',
    icon: 'SiGooglecloud',
    category: 'DevOps & Cloud',
    frameworks: []
  },
  {
    name: 'CI/CD',
    icon: 'SiGithubactions',
    category: 'DevOps & Cloud',
    frameworks: ['GitHub Actions', 'Jenkins', 'CircleCI']
  },
  {
    name: 'PostgreSQL',
    icon: 'SiPostgresql',
    category: 'Databases & Data',
    frameworks: []
  },
  {
    name: 'MongoDB',
    icon: 'SiMongodb',
    category: 'Databases & Data',
    frameworks: []
  },
  {
    name: 'MySQL',
    icon: 'SiMysql',
    category: 'Databases & Data',
    frameworks: []
  },
  {
    name: 'Redis',
    icon: 'SiRedis',
    category: 'Databases & Data',
    frameworks: []
  },
  {
    name: 'Elasticsearch',
    icon: 'SiElasticsearch',
    category: 'Databases & Data',
    frameworks: []
  },
  {
    name: 'Apache Kafka',
    icon: 'SiApachekafka',
    category: 'Databases & Data',
    frameworks: []
  },
  {
    name: 'Git',
    icon: 'SiGit',
    category: 'Tools & Methodologies',
    frameworks: ['GitHub', 'Bitbucket', 'GitLab']
  },
  {
    name: 'Agile',
    icon: 'SiJirasoftware',
    category: 'Tools & Methodologies',
    frameworks: []
  },
  {
    name: 'Testing',
    icon: 'SiTestinglibrary',
    category: 'Tools & Methodologies',
    frameworks: ['Unit Testing', 'Integration Testing', 'E2E Testing', 'TDD', 'BDD', 'Mocking']
  },
  {
    name: 'System Design',
    icon: 'SiDiagramsdotnet',
    category: 'Tools & Methodologies',
    frameworks: ['Architecture Patterns', 'Scalability', 'High Availability', 'Fault Tolerance', 'Performance Optimization']
  }
]; 