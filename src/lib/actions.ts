'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { mockEvents } from './mock-data';
import type { Event } from './types';

// This is a mock database. In a real app, you'd use a database.
let events: Event[] = [];

async function filterAndSortEvents(eventList: Event[], params?: { query?: string; sortBy?: string }): Promise<Event[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    let filteredEvents = [...eventList];

    if (params?.query) {
        const query = params.query.toLowerCase();
        filteredEvents = filteredEvents.filter(
        (event) =>
            event.name.toLowerCase().includes(query) ||
            (event.location && event.location.toLowerCase().includes(query)) ||
            (event.category && event.category.toLowerCase().includes(query))
        );
    }

    if (params?.sortBy === 'name') {
        filteredEvents.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        // Default sort by date
        filteredEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return filteredEvents;
}


export async function getEvents(params?: { query?: string; sortBy?: string }): Promise<Event[]> {
  return filterAndSortEvents(events, params);
}

export async function getMockEvents(params?: { query?: string; sortBy?: string }): Promise<Event[]> {
    return filterAndSortEvents(mockEvents, params);
}

export async function getEventById(id: string): Promise<Event | undefined> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const allEvents = [...events, ...mockEvents];
  return allEvents.find((event) => event.id === id);
}

export async function createEvent(eventData: Omit<Event, 'id'> & { image?: string }) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newEvent: Event = {
    ...eventData,
    id: `user-${(events.length + 1)}-${Date.now()}`,
    image: eventData.image || 'https://placehold.co/600x400',
    isMock: false,
  };
  events.unshift(newEvent);
  revalidatePath('/');
  redirect(`/events/${newEvent.id}`);
}
