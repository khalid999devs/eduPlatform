import { AiFillDashboard } from 'react-icons/ai';
import { BsFilePersonFill } from 'react-icons/bs';
import { GiGraduateCap } from 'react-icons/gi';
import { MdPayment } from 'react-icons/md';

export const links = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Courses',
    path: '/courses',
  },
  {
    name: 'About',
    path: '/about',
  },
  // {
  //   name: 'Contact',
  //   path: '/contact-us',
  // },
];

export const quickLinks = [
  {
    name: 'Contact',
    path: '/contact-us',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Courses',
    path: '/courses',
  },

  {
    name: 'Privacy Policy',
    path: '/terms-policy',
  },
];

export const companyLinks = [
  {
    name: 'Privacy policy',
    path: '/privacy',
  },
  {
    name: 'Terms and conditions',
    path: '/terms',
  },
];

export const dashboardLinks = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: AiFillDashboard,
  },
  {
    name: 'My Profile',
    path: '/dashboard/my-profile',
    icon: BsFilePersonFill,
  },
  {
    name: 'Enrolled Courses',
    path: '/dashboard/enrolled-courses',
    icon: GiGraduateCap,
  },
  {
    name: 'Payment History',
    path: '/dashboard/payment-history',
    icon: MdPayment,
  },
];

const credentials = [
  `Illustration by <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">Icons 8</a> from <a href="https://icons8.com/illustrations">Ouch!</a>`,
];
