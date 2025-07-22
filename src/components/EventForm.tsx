'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createEvent } from '@/lib/actions';
import { generateDescriptionAction } from '@/app/create/actions';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(3, 'Event name must be at least 3 characters.'),
  category: z.string().min(2, 'Category is required.'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Please enter a valid date.',
  }),
  location: z.string().min(3, 'Location is required.'),
  targetAudience: z.string().min(3, 'Target audience is required.'),
  eventDetails: z.string().min(10, 'Please provide some details for AI generation.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  promotionalText: z.string().optional(),
});

type EventFormValues = z.infer<typeof formSchema>;

export default function EventForm() {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: '',
      date: '',
      location: '',
      targetAudience: '',
      eventDetails: '',
      description: '',
      promotionalText: '',
    },
  });

  const handleGenerateWithAI = async () => {
    const { name, category, targetAudience, eventDetails } = form.getValues();
    if (!name || !category || !targetAudience || !eventDetails) {
      toast({
        title: 'Missing Information',
        description: 'Please fill out Event Name, Category, Target Audience, and Event Details before using AI.',
        variant: 'destructive',
      });
      return;
    }

    setIsAiLoading(true);
    try {
      const result = await generateDescriptionAction({
        eventName: name,
        eventCategory: category,
        targetAudience: targetAudience,
        eventDetails: eventDetails,
        desiredTone: 'Exciting and professional',
      });
      
      if (result.success && result.data) {
        form.setValue('description', result.data.description, { shouldValidate: true });
        form.setValue('promotionalText', result.data.promotionalText, { shouldValidate: true });
        toast({
          title: 'Content Generated!',
          description: 'The description and promotional text have been filled in.',
        });
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      toast({
        title: 'AI Generation Failed',
        description: `An error occurred: ${error instanceof Error ? error.message : String(error)}`,
        variant: 'destructive',
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const onSubmit = async (values: EventFormValues) => {
    setIsSubmitting(true);
    try {
      await createEvent(values);
      // The redirect is handled by the server action
      toast({
        title: 'Event Created Successfully!',
        description: 'You will be redirected shortly.',
      });
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: `An error occurred: ${error instanceof Error ? error.message : String(error)}`,
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6 p-8 bg-card rounded-lg shadow-sm border">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Event Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Annual Tech Conference" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Conference, Music, Art" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date and Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Silicon Valley, CA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audience</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Professionals, Students" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">AI Content Assistant</h3>
            <p className="text-sm text-muted-foreground">Provide some key details, and let our AI craft a compelling description for you.</p>
          </div>

          <FormField
            control={form.control}
            name="eventDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Details for AI</FormLabel>
                <FormControl>
                  <Textarea placeholder="List speakers, topics, activities, what makes it special, etc." {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="button" variant="outline" onClick={handleGenerateWithAI} disabled={isAiLoading} className="w-full">
            {isAiLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4 text-accent" />
            )}
            Generate with AI
          </Button>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Full Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="A detailed description of the event." {...field} rows={6} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="promotionalText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Promotional Text (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="A short, catchy text for social media or ads." {...field} rows={3} />
                </FormControl>
                <FormDescription>This text can be used for marketing purposes.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>

        <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Event
        </Button>
      </form>
    </Form>
  );
}
