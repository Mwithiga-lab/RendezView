import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getEvents, getMockEvents } from '@/lib/actions';
import EventCard from '@/components/EventCard';
import EventFilters from '@/components/EventFilters';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type HomePageProps = {
  searchParams?: {
    query?: string;
    sortBy?: string;
  };
};

function EventGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function UserEventList({ query, sortBy }: { query?: string; sortBy?: string }) {
  const events = await getEvents({ query, sortBy });

  if (events.length === 0) {
    return null;
  }

  return (
    <section>
       <div className="flex items-center gap-2 mb-6">
          <Star className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Your Events</h2>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}


async function ExampleEventList({ query, sortBy }: { query?: string; sortBy?: string }) {
  const events = await getMockEvents({ query, sortBy });

  return (
     <section>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Examples</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
  );
}

export default function Home({ searchParams }: HomePageProps) {
  const query = searchParams?.query || '';
  const sortBy = searchParams?.sortBy || 'date';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tighter text-primary">RendezView</h1>
          <p className="text-muted-foreground mt-1">Discover and create your next event.</p>
        </div>
        <Button asChild size="lg">
          <Link href="/create">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Event
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <EventFilters />
      </div>
      
      <div className="space-y-12">
        <Suspense key={`user-${query}-${sortBy}`} fallback={<EventGridSkeleton />}>
          <UserEventList query={query} sortBy={sortBy} />
        </Suspense>

        <Suspense key={`examples-${query}-${sortBy}`} fallback={<EventGridSkeleton />}>
          <ExampleEventList query={query} sortBy={sortBy} />
        </Suspense>
      </div>
    </div>
  );
}
