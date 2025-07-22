'use server';

import {
  generateEventDescription,
  type GenerateEventDescriptionInput,
  type GenerateEventDescriptionOutput,
} from '@/ai/flows/generate-event-description';
import { z } from 'zod';

const ActionInputSchema = z.object({
  eventName: z.string().min(1, 'Event name is required.'),
  eventCategory: z.string().min(1, 'Event category is required.'),
  targetAudience: z.string().min(1, 'Target audience is required.'),
  eventDetails: z.string().min(10, 'Event details must be at least 10 characters.'),
  desiredTone: z.string(),
});

type ActionState = {
  success: boolean;
  data?: GenerateEventDescriptionOutput;
  error?: string;
};

export async function generateDescriptionAction(input: GenerateEventDescriptionInput): Promise<ActionState> {
  const parsedInput = ActionInputSchema.safeParse(input);
  if (!parsedInput.success) {
    const error = parsedInput.error.format()._errors.join(', ');
    console.error('Validation Error:', error);
    return { success: false, error: `Invalid input: ${error}` };
  }

  try {
    const result = await generateEventDescription(parsedInput.data);
    return { success: true, data: result };
  } catch (error) {
    console.error('AI Generation Error:', error);
    return { success: false, error: 'Failed to generate content from AI. Please try again.' };
  }
}
