'use server';

/**
 * @fileOverview An AI agent for generating event images.
 *
 * - generateEventImage - A function that generates an image for an event.
 * - GenerateEventImageInput - The input type for the generateEventImage function.
 * - GenerateEventImageOutput - The return type for the generateEventImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEventImageInputSchema = z.object({
  eventName: z.string().describe('The name of the event.'),
  eventCategory: z.string().describe('The category of the event (e.g., music, sports, conference).'),
});
export type GenerateEventImageInput = z.infer<typeof GenerateEventImageInputSchema>;

const GenerateEventImageOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated image as a data URI.'),
});
export type GenerateEventImageOutput = z.infer<typeof GenerateEventImageOutputSchema>;

export async function generateEventImage(input: GenerateEventImageInput): Promise<GenerateEventImageOutput> {
  const {media} = await ai.generate({
    model: 'googleai/gemini-2.0-flash-preview-image-generation',
    prompt: `Generate a visually appealing and relevant image for an event with the name "${input.eventName}" in the category "${input.eventCategory}". The image should be vibrant and suitable for a promotional event banner.`,
    config: {
      responseModalities: ['TEXT', 'IMAGE'],
    },
  });

  if (!media?.url) {
    throw new Error('Image generation failed.');
  }

  return { imageUrl: media.url };
}
