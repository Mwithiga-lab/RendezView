import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import type { Event } from '@/lib/types';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const isDataUri = event.image.startsWith('data:image');
  return (
    <Link href={`/events/${event.id}`} className="group block">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0 relative">
          <Image
            src={event.image}
            alt={event.name}
            width={600}
            height={400}
            unoptimized={isDataUri}
            data-ai-hint="event"
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge variant="secondary" className="absolute top-3 right-3">{event.category}</Badge>
        </CardHeader>
        <CardContent className="p-4 flex-1">
          <CardTitle className="text-lg leading-snug font-semibold mb-2 group-hover:text-primary transition-colors">
            {event.name}
          </CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground flex flex-col items-start gap-2">
           <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-primary" />
            <span>{format(new Date(event.date), 'PPP')}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-primary" />
            <span>{event.location}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
