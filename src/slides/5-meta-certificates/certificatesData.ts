import type { CertificateNode } from '../../types';

export interface PhysicsCertificateNode extends CertificateNode {
  offsetX: number;
  offsetY: number;
  status?: 'completed' | 'in-progress' | 'upcoming';
}

export const certificatesData: PhysicsCertificateNode[] = [
  {
    id: 1,
    title: 'Introduction to Front-End Development',
    duration: '19 hours',
    credentialId: '2N92TVJMQQHU',
    link: 'https://www.coursera.org/account/accomplishments/verify/2N92TVJMQQHU',
    offsetX: 0,
    offsetY: 0,
    status: 'completed'
  },
  {
    id: 2,
    title: 'Programming with JavaScript',
    duration: '48 hours',
    credentialId: '40EXC4ZYGHDU',
    link: 'https://www.coursera.org/account/accomplishments/verify/40EXC4ZYGHDU',
    offsetX: 0,
    offsetY: 0,
    status: 'completed'
  },
  {
    id: 3,
    title: 'Version Control',
    duration: '16 hours',
    credentialId: 'Q0XAECF646GI',
    link: 'https://www.coursera.org/account/accomplishments/verify/Q0XAECF646GI',
    offsetX: 0,
    offsetY: 0,
    status: 'completed'
  },
  {
    id: 4,
    title: 'HTML and CSS in depth',
    duration: '29 hours',
    credentialId: '92TGQYIPQQYI',
    link: 'https://www.coursera.org/account/accomplishments/verify/92TGQYIPQQYI',
    offsetX: 0,
    offsetY: 0,
    status: 'completed'
  },
  {
    id: 5,
    title: 'React Basics',
    duration: '30 hours',
    credentialId: 'NG8GIR33A8I5',
    link: 'https://www.coursera.org/account/accomplishments/verify/NG8GIR33A8I5',
    offsetX: 0,
    offsetY: 0,
    status: 'completed'
  },
  {
    id: 6,
    title: 'Advanced React',
    duration: '26 hours',
    credentialId: 'BFSJ2MSS47R9',
    link: 'https://www.coursera.org/account/accomplishments/verify/BFSJ2MSS47R9',
    offsetX: 0,
    offsetY: 0,
    status: 'completed'
  },
  {
    id: 7,
    title: 'Programming in Python',
    duration: 'In Progress (28%)',
    credentialId: 'PENDING',
    link: '#',
    offsetX: 0,
    offsetY: 0,
    status: 'in-progress'
  },
  {
    id: 8,
    title: 'Introduction to Databases for Back-End Development',
    duration: 'In Progress (24%)',
    credentialId: 'PENDING',
    link: '#',
    offsetX: 0,
    offsetY: 0,
    status: 'in-progress'
  },
  {
    id: 9,
    title: 'Django Web Framework',
    duration: 'Upcoming',
    credentialId: 'PENDING',
    link: '#',
    offsetX: 0,
    offsetY: 0,
    status: 'upcoming'
  },
  {
    id: 10,
    title: 'APIs',
    duration: 'Upcoming',
    credentialId: 'PENDING',
    link: '#',
    offsetX: 0,
    offsetY: 0,
    status: 'upcoming'
  }
];
