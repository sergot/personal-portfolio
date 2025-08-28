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
  'Designed and implemented alert automation for Adobe Experience Manager (Cloud Service) reducing manual intervention',
  'Designed and implemented a fully functional, dynamic application load & stress testing framework in Kubernetes using Helm',
  'Engineered and optimized performance testing pipelines, identifying bottlenecks pre-production',
  'Drove adoption of SRE best practices across teams, improving reliability and MTTR',
  'Built real-time observability dashboards in Grafana/Prometheus exposing actionable SLO metrics'
    ],
    technologies: ['Python', 'Azure', 'Grafana', 'Prometheus', 'Helm', 'Docker', 'Kubernetes', 'Go']
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
      'Built Poland\'s first autonomous convenience store network (https://zabkagroup.com/convenience/nano/) enabling 24/7 staffless shopping',
      'Architected core FastAPI microservices powering real-time store operations',
      'Engineered fault-tolerant services achieving 99.9% uptime via recovery automation & proactive monitoring',
      'Optimized CI/CD in CircleCI & Azure DevOps delivering 3x more frequent, reliable releases',
      'Handled production on-call, rapidly resolving critical incidents'
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
      'Developed high-throughput marketplace microservices with Apache Kafka & FastAPI',
      'Refactored legacy Django monolith, incrementally migrating to FastAPI & Spring microservices',
      'Built scalable Python/Scrapy data extraction system automating supplier product ingestion',
      'Implemented test suites reaching 90%+ coverage, reducing production defects',
      'Streamlined GitHub Actions workflows enabling continuous deployment'
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
      'Led delivery of strategic UK government job-search platform with direct stakeholder collaboration',
      'Architected high-performance job matching algorithm improving relevance 65% and engagement 40%',
      'Designed scalable multi-region data ingestion & processing pipelines',
      'Implemented robust Jenkins CI/CD enabling multiple daily releases'
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
      'Delivered custom OTRS enterprise extensions improving ticket resolution time 35%',
      'Designed RESTful APIs integrating 10+ external systems',
      'Optimized database queries improving application responsiveness',
      'Refactored legacy codebase reducing technical debt 40% and boosting maintainability'
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
      'Contributed to Poland\'s largest e-commerce platform at scale',
      'Developed responsive React UI components elevating user experience',
      'Engineered high-performance backend microservices supporting growth',
      'Built internal Java/Vue.js support platform reducing ticket resolution time 40%',
      'Collaborated in architecture sessions delivering scalable, business-critical features'
    ],
    technologies: ['Java', 'Vue.js', 'React', 'Perl', 'MongoDB', 'MySQL', 'Python', 'Microservices']
  }
]; 