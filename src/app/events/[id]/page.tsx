import { getEventById } from '@/lib/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

type EventPageProps = {
  params: {
    id: string;
  };
};

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }
  
  const isDataUri = event.image.startsWith('data:image');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
            <Image
              src={event.image}
              alt={event.name}
              layout="fill"
              objectFit="cover"
              unoptimized={isDataUri}
              data-ai-hint="event detail"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="p-0">
              <Badge variant="secondary" className="w-fit mb-2">{event.category}</Badge>
              <CardTitle className="text-4xl font-extrabold tracking-tighter text-primary">
                {event.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-6">
              <div className="space-y-4 text-lg text-muted-foreground">
                 <div className="flex items-center gap-3">
                  <CalendarIcon className="h-6 w-6 text-accent" />
                  <span>{format(new Date(event.date), 'PPPP, p')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPinIcon className="h-6 w-6 text-accent" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <UsersIcon className="h-6 w-6 text-accent" />
                  <span>Targeted for: {event.targetAudience}</span>
                </div>
              </div>

              <Separator className="my-8 bg-primary/20" />
              
              <div>
                <h3 className="font-bold text-xl mb-2 text-foreground">About this event</h3>
                <p className="text-foreground/80 leading-relaxed">{event.description}</p>
              </div>

              {event.promotionalText && (
                <div className="mt-8">
                  <h3 className="font-bold text-xl mb-2 text-foreground">Read More</h3>
                  <p className="text-foreground/80 leading-relaxed">{event.promotionalText}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
