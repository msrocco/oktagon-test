import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { IoIosPaper } from 'react-icons/io';

export const sidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Campaigns',
    path: '/campaigns',
    icon: <IoIosPaper />,
    cName: 'nav-text',
  },
];
