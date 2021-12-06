import React from 'react'
//import PropTypes from 'prop-types'
import {
  DollarSign,
  Command,
  Lock,
  Users,
  Archive,
  FileText,
  FileMinus,
  Briefcase,
  Share
} from 'react-feather'
const navigationConfig = [
  {
    id: 'assets',
    title: 'Assets',
    type: 'item',
    icon: <DollarSign size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/assets/add'
  },
  {
    id: 'Liabilties',
    title: 'Liabilties',
    type: 'item',
    icon: <Command size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/liability/add'
  },
  {
    id: 'pwd',
    title: 'Password Vault',
    type: 'item',
    icon: <Lock size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/vault/password'
  },
  {
    id: 'nominee',
    title: 'Nominees',
    type: 'item',
    icon: <Users size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/nominee/list'
  },
  {
    id: 'vault',
    title: 'Documents',
    type: 'item',
    icon: <Archive size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/vault/document'
  },
  {
    id: 'diary',
    title: 'Secret Diary',
    type: 'item',
    icon: <FileText size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/diary'
  },
  {
    id: 'dailyspends',
    title: 'Daily Spends',
    type: 'item',
    icon: <FileMinus size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/spends'
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    type: 'item',
    icon: <Briefcase size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/portfolio'
  },
  {
    id: 'contact',
    title: 'Sender',
    type: 'item',
    icon: <Share size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/contactUs'
  }
]

export default navigationConfig
