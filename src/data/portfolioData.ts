export interface ExperienceItem {
  id: string;
  period: string;
  duration: string;
  organization: string;
  role: string;
  location: string;
  summary: string;
  highlights: string[];
  competencies: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  institution: string;
  level: string;
  location: string;
}

export type SkillCategory = 'all' | 'administrative' | 'strengths' | 'languages';

export interface CapabilityItem {
  id: string;
  index: string;
  title: string;
  category: Exclude<SkillCategory, 'all'>;
  categoryLabel: string;
  resumeLabel: string;
  description: string;
}

export const PORTFOLIO_PROFILE = {
  fullName: 'Elaine L. Pacia',
  brandName: 'Elaine Pacia',
  kicker: 'Cainta, Rizal · Administrative & Operations',
  headline: 'Organized, adaptable, and ready to contribute.',
  objective:
    'To attain professional work experience that will be helpful to enhance my skills and ability',
  portraitPath: '/assets/aistudio/1795487186968_b4b9a9eb.jpg',
  contact: {
    phone: '09674437658',
    email: 'elainepacia088@gmail.com',
    address: 'K-10 939 Easter St., Saint Gregory Village, Brgy. San Isidro, Cainta, Rizal',
    shortLocation: 'Cainta, Rizal, Philippines',
  },
  languages: [
    { name: 'English', proficiency: 'Professional Working Proficiency' },
    { name: 'Filipino', proficiency: 'Native / Bilingual Proficiency' },
  ],
  summaryFacts: [
    { label: 'Core Focus', value: 'Admin & Operations' },
    { label: 'Software', value: 'Microsoft Office' },
    { label: 'Languages', value: 'English · Filipino' },
    { label: 'Location', value: 'Cainta, Rizal' },
  ],
} as const;

export const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    id: 'mi-yummy-mango',
    period: '2023',
    duration: '6 Months',
    organization: 'Mi Yummy Mango',
    role: 'Staff',
    location: 'Retail & Food Service Operations',
    summary:
      'Supported daily store operations and frontline customer service in a fast-paced retail environment, maintaining consistency, speed, and hospitality.',
    highlights: [
      'Delivered attentive, courteous customer service and accurate order fulfillment during peak hours.',
      'Maintained organized counter stations, inventory readiness, and clean presentation standards.',
      'Adapted seamlessly across front-of-house and preparation tasks in coordination with the store team.',
    ],
    competencies: ['Customer Service', 'Flexibility', 'Time Management', 'Team Coordination'],
  },
  {
    id: 'abe-admin',
    period: '2019',
    duration: 'Academic & Office Role',
    organization: 'ABE International Business College',
    role: 'Encoder / Admin Assistant',
    location: 'Cainta Campus',
    summary:
      'Assisted administrative operations through accurate data encoding, structured document organization, and daily Microsoft Office workflows.',
    highlights: [
      'Encoded student and institutional records with high accuracy and attention to detail.',
      'Prepared, formatted, and organized administrative documents using Microsoft Office applications.',
      'Supported office staff with filing, scheduling coordination, and prompt clerical assistance.',
    ],
    competencies: ['Data Encoding', 'Microsoft Office', 'Record Organization', 'Attention to Detail'],
  },
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    id: 'one-cainta-college',
    period: '2019',
    institution: 'One Cainta College',
    level: 'Tertiary Education',
    location: 'Cainta, Rizal',
  },
  {
    id: 'abe-college',
    period: '2017–2019',
    institution: 'ABE International Business College',
    level: 'Senior High / Business Studies',
    location: 'Cainta, Rizal',
  },
  {
    id: 'gisr-nhs',
    period: '2013–2017',
    institution: 'Governor Isidro S. Rodriguez Sr. Memorial National High School',
    level: 'Junior High School',
    location: 'Cainta, Rizal',
  },
  {
    id: 'san-roque-elem',
    period: '2007–2013',
    institution: 'San Roque Elementary School',
    level: 'Elementary Education',
    location: 'Cainta, Rizal',
  },
];

export const CAPABILITIES_LIST: CapabilityItem[] = [
  {
    id: 'ms-office',
    index: '01',
    title: 'Microsoft Office Proficiency',
    category: 'administrative',
    categoryLabel: 'Administrative & Tools',
    resumeLabel: 'Proficient in Microsoft Office',
    description:
      'Confident working with Word, Excel, and PowerPoint for structured documentation, encoding, spreadsheets, and everyday office reporting.',
  },
  {
    id: 'organization-detail',
    index: '02',
    title: 'Organization & Detail Precision',
    category: 'administrative',
    categoryLabel: 'Administrative & Tools',
    resumeLabel: 'Organize and details skills',
    description:
      'Methodical approach to record keeping, file classification, and error-free data entry built during administrative encoding work.',
  },
  {
    id: 'creativity',
    index: '03',
    title: 'Creativity & Fresh Thinking',
    category: 'strengths',
    categoryLabel: 'Personal Strengths',
    resumeLabel: 'Creativity',
    description:
      'Brings thoughtful visual presentation and resourceful problem-solving to documents, workspace setups, and daily tasks.',
  },
  {
    id: 'time-management',
    index: '04',
    title: 'Self-Starter & Time Management',
    category: 'strengths',
    categoryLabel: 'Personal Strengths',
    resumeLabel: 'Self-starter creative with strong time management',
    description:
      'Takes initiative without waiting to be asked, prioritizing responsibilities effectively to meet daily operational deadlines.',
  },
  {
    id: 'flexibility',
    index: '05',
    title: 'Flexibility & Adaptability',
    category: 'strengths',
    categoryLabel: 'Personal Strengths',
    resumeLabel: 'Flexibility',
    description:
      'Adjusts smoothly to shifting priorities, new software tools, and varied team needs across both office and frontline settings.',
  },
  {
    id: 'bilingual',
    index: '06',
    title: 'English & Filipino Fluency',
    category: 'languages',
    categoryLabel: 'Languages',
    resumeLabel: 'English · Filipino',
    description:
      'Clear written and spoken communication in both English and Filipino for client interactions, team collaboration, and office correspondence.',
  },
];

export const NAV_LINKS = [
  { id: 'objective', label: 'Objective', href: '#objective' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const;
