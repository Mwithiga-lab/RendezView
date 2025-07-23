
import type { Event } from './types';

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Tech Innovators Conference 2025',
    category: 'Conference',
    date: '2025-11-15T09:00:00.000Z',
    location: 'Silicon Valley, CA',
    description:
      'Join the brightest minds in technology as they discuss the future of AI, blockchain, and quantum computing. A three-day event full of keynotes, workshops, and networking opportunities.',
    promotionalText: "Don't miss the biggest tech conference of the year! Get your early bird tickets now and be part of the future.",
    image: 'https://placehold.co/600x400.png',
    targetAudience: 'Professionals',
    isMock: true,
  },
  {
    id: '2',
    name: 'Annual Charity Gala',
    category: 'Gala',
    date: '2025-12-01T18:00:00.000Z',
    location: 'Metropolitan Museum, New York',
    description: 'An elegant evening of dining, dancing, and auctions to support children\'s education. All proceeds go to the "Future Minds" foundation.',
    promotionalText: 'Join us for a night of elegance and purpose. Your presence can change a child\'s life. Reserve your table today!',
    image: 'https://placehold.co/600x400.png',
    targetAudience: 'Philanthropists',
    isMock: true,
  },
  {
    id: '3',
    name: 'Indie Music Fest',
    category: 'Music',
    date: '2025-10-25T14:00:00.000Z',
    location: 'Green Park, London',
    description: 'Discover your new favorite band at the Indie Music Fest. A full day of live performances from emerging artists across various genres.',
    promotionalText: 'Vibes, music, and sunshine! Grab your friends and get ready for an unforgettable day at Indie Music Fest.',
    image: 'https://placehold.co/600x400.png',
    targetAudience: 'Young Adults',
    isMock: true,
  },
];
