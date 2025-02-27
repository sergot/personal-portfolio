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
    title: 'Senior Software Developer + DevOps Engineer',
    company: 'Adobe',
    location: 'remote, Poland',
    type: 'Full-time',
    startDate: '2024',
    endDate: 'Present',
    description: [
      'Working on Adobe Experience Manager as a Cloud Service',
      'Working on new features related to alert automation',
      'Working on automating stress testing'
    ],
    technologies: ['Python', 'Grafana', 'Prometheus', 'Helm', 'Docker', 'Kubernetes', 'Go', 'Azure']
  },
  {
    id: 'job2',
    title: 'Senior Software Developer',
    company: 'Żabka NANO',
    location: 'remote, Poland',
    type: 'Full-time',
    startDate: '2023',
    endDate: '2024',
    description: [
      'Worked on the autonomous convenience store, more: https://zabkagroup.com/convenience/nano/',
      'Worked on new features: designing, planning, coding and releasing',
      'Bug fixing and maintaining application and services to achieve maximum reliability',
      'Maintaining CI/CD in CircleCi and Azure DevOps',
      'SRE and on-call responsibilities'
    ],
    technologies: ['Python', 'FastAPI', 'Kubernetes', 'Azure']
  },
  {
    id: 'job3',
    title: 'Software Developer',
    company: 'ZAGENO',
    location: 'remote, Poland',
    type: 'Full-time',
    startDate: '2022',
    endDate: '2022',
    description: [
      'Worked on a professional science/medical marketplace platform',
      'Designed and developed microservices based on Apache Kafka (with tests)',
      'Maintained, fixed and added features to legacy Django application (with tests)',
      'Developed a crawler bot using Python with Scrapy/Zyte',
      'Maintained CI/CD process in GitHub Actions'
    ],
    technologies: ['Python', 'Django', 'FastAPI', 'Git', 'GCP', 'Apache Kafka']
  },
  {
    id: 'job4',
    title: 'Software Developer',
    company: 'Adzuna',
    location: 'remote, Poland',
    type: 'Full-time',
    startDate: '2018',
    endDate: '2022',
    description: [
      'Lead a challenging project related to job-searching in the UK in collaboration with UK government',
      'Implemented new features based on client requirements',
      'Designed CI/CD processes in Jenkins'
    ],
    technologies: ['Perl', 'AWS', 'Solr', 'MongoDB', 'PostgreSQL', 'Python']
  },
  {
    id: 'job5',
    title: 'Perl Developer',
    company: 'Sidnet',
    location: 'remote, Poland',
    type: 'Full-time',
    startDate: '2016',
    endDate: '2018',
    description: [
      'Full-stack developer',
      'Designed and developed new features to OTRS (Open Ticket Request System)',
      'Maintained and fixed bugs in legacy code',
      'Built REST APIs for external systems'
    ],
    technologies: ['Perl', 'Solr', 'Dancer', 'MySQL']
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
      'Developed and maintained the biggest polish e-commerce platform',
      'Implemented responsive UI components using React',
      'Developed and maintained OTRS (Open Ticket Request System)',
      'Developed an customer support platform using Java and Vue.js'
    ],
    technologies: ['Java', 'Vue.js', 'Perl', 'MongoDB', 'MySQL', 'Python']
  }
]; 