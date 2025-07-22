'use server';

/**
 * @fileOverview An AI agent for generating event descriptions and promotional text.
 *
 * - generateEventDescription - A function that generates event descriptions and promotional text.
 * - GenerateEventDescriptionInput - The input type for the generateEventDescription function.
 * - GenerateEventDescriptionOutput - The return type for the generateEventDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEventDescriptionInputSchema = z.object({
  eventName: z.string().describe('The name of the event.'),
  eventCategory: z.string().describe('The category of the event (e.g., music, sports, conference).'),
  targetAudience: z.string().describe('The target audience for the event (e.g., young adults, professionals, families).'),
  eventDetails: z.string().describe('Details about the event, such as speakers, activities, and location.'),
  desiredTone: z.string().describe('The desired tone of the description (e.g., professional, casual, exciting).'),
});
export type GenerateEventDescriptionInput = z.infer<typeof GenerateEventDescriptionInputSchema>;

const GenerateEventDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated event description.'),
  promotionalText: z.string().describe('The generated promotional text for the event.'),
});
export type GenerateEventDescriptionOutput = z.infer<typeof GenerateEventDescriptionOutputSchema>;

export async function generateEventDescription(input: GenerateEventDescriptionInput): Promise<GenerateEventDescriptionOutput> {
  return generateEventDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEventDescriptionPrompt',
  input: {schema: GenerateEventDescriptionInputSchema},
  output: {schema: GenerateEventDescriptionOutputSchema},
  prompt: `You are an AI assistant specializing in creating event descriptions and promotional text.

  Based on the following information, generate a compelling event description and promotional text to attract attendees.

  Event Name: {{{eventName}}}
  Event Category: {{{eventCategory}}}
  Target Audience: {{{targetAudience}}}
  Event Details: {{{eventDetails}}}
  Desired Tone: {{{desiredTone}}}

  Description:
  Promotional Text: `,
});

const generateEventDescriptionFlow = ai.defineFlow(
  {
    name: 'generateEventDescriptionFlow',
    inputSchema: GenerateEventDescriptionInputSchema,
    outputSchema: GenerateEventDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
