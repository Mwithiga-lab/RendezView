export interface Event {
  id: string;
  name: string;
  category: string;
  date: string; // ISO string
  location: string;
  description: string;
  promotionalText?: string;
  image: string;
  targetAudience: string;
}
