export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
}

export const jobs: Job[] = [
  {
    id: 'job1',
    title: 'Senior Software Developer & DevOps Engineer',
    company: 'Adobe',
    location: 'Remote, Poland',
    type: 'Full-time',
    startDate: '2024',
    endDate: 'Present',
    description: [
      'Architecting and implementing alert automation systems for Adobe Experience Manager as a Cloud Service',
      'Developing and optimizing stress testing automation frameworks, identifying performance bottlenecks before production deployment',
      'Collaborating with cross-functional teams to implement SRE best practices and enhance system reliability across cloud environments',
      'Designing and implementing monitoring dashboards with Grafana and Prometheus that provide real-time visibility into system performance'
    ],
    technologies: ['Python', 'Grafana', 'Prometheus', 'Helm', 'Docker', 'Kubernetes', 'Go', 'Azure']
  },
  {
    id: 'job2',
    title: 'Senior Software Developer',
    company: 'Zabka NANO',
    location: 'Remote, Poland',
    type: 'Full-time',
    startDate: '2023',
    endDate: '2024',
    description: [
      'Development for Poland\'s first autonomous convenience store network (https://zabkagroup.com/convenience/nano/), enabling 24/7 shopping experiences without staff',
      'Designed and implemented core microservices architecture using FastAPI',
      'Engineered fault-tolerant systems with 99.9% uptime through comprehensive error handling, automated recovery processes, and proactive monitoring',
      'Streamlined CI/CD pipelines in CircleCI and Azure DevOps, enabling 3x more frequent releases',
      'Served as on-call engineer, resolving critical production issues'
    ],
    technologies: ['Python', 'FastAPI', 'Kubernetes', 'Azure', 'CircleCI', 'Microservices']
  },
  {
    id: 'job3',
    title: 'Software Developer',
    company: 'ZAGENO',
    location: 'Remote, Poland',
    type: 'Full-time',
    startDate: '2022',
    endDate: '2022',
    description: [
      'Developed high-throughput microservices for a scientific marketplace platform using Apache Kafka and FastAPI',
      'Refactored legacy Django application and migrated to FastAPI and Spring microservices',
      'Created and deployed a sophisticated data extraction system using Python/Scrapy that automated collection product listings from supplier websites',
      'Implemented comprehensive test suites achieving 90%+ code coverage, significantly reducing production bugs',
      'Optimized GitHub Actions workflows, enabling continuous deployment'
    ],
    technologies: ['Python', 'Django', 'FastAPI', 'Git', 'GCP', 'Apache Kafka', 'Scrapy', 'GitHub Actions']
  },
  {
    id: 'job4',
    title: 'Software Developer',
    company: 'Adzuna',
    location: 'Remote, Poland',
    type: 'Full-time',
    startDate: '2018',
    endDate: '2022',
    description: [
      'Led development of a strategic UK government job-search platform, collaborating directly with government stakeholders',
      'Architected and implemented a high-performance job matching algorithm that improved search relevance by 65% and increased user engagement by 40%',
      'Designed scalable data processing pipelines handling job listings across multiple regions',
      'Established robust CI/CD processes in Jenkins that enabled multiple daily releases'
    ],
    technologies: ['Perl', 'AWS', 'Solr', 'MongoDB', 'PostgreSQL', 'Python', 'Jenkins']
  },
  {
    id: 'job5',
    title: 'Perl Developer',
    company: 'Sidnet',
    location: 'Remote, Poland',
    type: 'Full-time',
    startDate: '2016',
    endDate: '2018',
    description: [
      'Developed custom enterprise solutions for OTRS (Open Ticket Request System) that improved ticket resolution time by 35%',
      'Designed and implemented RESTful APIs that facilitated seamless integration with 10+ external systems and services',
      'Optimized database queries and application performance',
      'Refactored legacy codebase, reducing technical debt by 40% and improving maintainability'
    ],
    technologies: ['Perl', 'Solr', 'Dancer', 'MySQL', 'REST API', 'JavaScript', 'OTRS']
  },
  {
    id: 'job6',
    title: 'Software Engineer',
    company: 'Allegro',
    location: 'Poznań, Poland',
    type: 'Full-time',
    startDate: '2014',
    endDate: '2016',
    description: [
      'Contributed to Poland\'s largest e-commerce platform',
      'Developed responsive UI components using React',
      'Engineered high-performance backend microservices',
      'Created an internal customer support platform using Java and Vue.js that reduced ticket resolution time by 40%',
      'Participated in system architecture design sessions and implemented scalable solutions for business-critical features'
    ],
    technologies: ['Java', 'Vue.js', 'React', 'Perl', 'MongoDB', 'MySQL', 'Python', 'Microservices']
  }
]; 