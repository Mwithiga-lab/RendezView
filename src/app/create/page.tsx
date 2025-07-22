import EventForm from '@/components/EventForm';

export default function CreateEventPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl text-primary">
          Create Your Next Event
        </h1>
        <p className="mt-3 max-w-md mx-auto text-muted-foreground">
          Fill in the details below. Use our AI assistant to help craft the perfect description!
        </p>
      </div>
      <EventForm />
    </div>
  );
}
