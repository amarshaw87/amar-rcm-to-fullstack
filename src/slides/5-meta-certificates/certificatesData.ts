import type { CertificateNode } from '../../types';

export interface PhysicsCertificateNode extends CertificateNode {
  offsetX: number;
  offsetY: number;
}

export const certificatesData: PhysicsCertificateNode[] = [
  {
    id: 1,
    title: 'Introduction to Front-End Development',
    duration: '19 hours',
    credentialId: '2N92TVJMQQHU',
    link: 'https://www.coursera.org/account/accomplishments/verify/2N92TVJMQQHU',
    offsetX: 0,
    offsetY: 0
  },
  {
    id: 2,
    title: 'Programming with JavaScript',
    duration: '48 hours',
    credentialId: '40EXC4ZYGHDU',
    link: 'https://www.coursera.org/account/accomplishments/verify/40EXC4ZYGHDU',
    offsetX: 0,
    offsetY: 0
  },
  {
    id: 3,
    title: 'Version Control',
    duration: '16 hours',
    credentialId: 'Q0XAECF646GI',
    link: 'https://www.coursera.org/account/accomplishments/verify/Q0XAECF646GI',
    offsetX: 0,
    offsetY: 0
  },
  {
    id: 4,
    title: 'HTML and CSS in depth',
    duration: '29 hours',
    credentialId: '92TGQYIPQQYI',
    link: 'https://www.coursera.org/account/accomplishments/verify/92TGQYIPQQYI',
    offsetX: 0,
    offsetY: 0
  },
  {
    id: 5,
    title: 'React Basics',
    duration: '30 hours',
    credentialId: 'NG8GIR33A8I5',
    link: 'https://www.coursera.org/account/accomplishments/verify/NG8GIR33A8I5',
    offsetX: 0,
    offsetY: 0
  },
  {
    id: 6,
    title: 'Advanced React',
    duration: '26 hours',
    credentialId: 'BFSJ2MSS47R9',
    link: 'https://www.coursera.org/account/accomplishments/verify/BFSJ2MSS47R9',
    offsetX: 0,
    offsetY: 0
  }
];
