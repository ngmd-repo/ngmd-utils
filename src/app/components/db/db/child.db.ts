import { TShowState } from '@ngmd/utils/types';

export const ChildDB = {
  someValues: [
    'some',
    'array',
    'items',
  ],
  numbers: [1, 2, 3],
  cat: { name: 'Kuzya', type: 'Cat' },
  card: {
    items: [1, 2, 3],
  },
  visibleMode: 'show' as TShowState,
  'nav-options': [
    { path: '/home', title: 'Home', userRole: 'Merchant' },
    { path: '/about', title: 'About', userRole: 'Merchant' },
    { path: '/admin-panel', title: 'Admin Panel', userRole: 'Admin' },
  ],
  pet: { name: 'Kuzya', type: 'Cat' },
  mode: 'show',
  user: { id: 1, name: 'test', role: 'Admin', address: { city: 'Kansas' } },
  users: [
    { id: 1, name: 'test', role: 'Admin', address: { city: 'Kansas' } },
    { id: 2, name: 'test', role: 'Merchant', address: { city: 'Nebraska' } },
    { id: 3, name: 'test', role: 'Editor', address: { city: 'Albuquerque' } },
  ],
} as const;
