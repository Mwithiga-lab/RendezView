'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { mockEvents } from './mock-data';
import type { Event } from './types';

// This is a mock database. In a real app, you'd use a database.
let events: Event[] = [...mockEvents];

export async function getEvents(params?: { query?: string; sortBy?: string }): Promise<Event[]> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  let filteredEvents = [...events];

  if (params?.query) {
    const query = params.query.toLowerCase();
    filteredEvents = filteredEvents.filter(
      (event) =>
        event.name.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query)
    );
  }

  if (params?.sortBy === 'name') {
    filteredEvents.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Default sort by date
    filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  return filteredEvents;
}

export async function getEventById(id: string): Promise<Event | undefined> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return events.find((event) => event.id === id);
}

export async function createEvent(eventData: Omit<Event, 'id' | 'image'> & { image?: string }) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newEvent: Event = {
    ...eventData,
    id: (events.length + 1).toString(),
    image: eventData.image || 'https://placehold.co/600x400',
  };
  events.unshift(newEvent);
  revalidatePath('/');
  redirect(`/events/${newEvent.id}`);
}
