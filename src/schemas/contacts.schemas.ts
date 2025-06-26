import { z } from 'zod';

const ImageSchema = z.object({
  url: z.string().url(),
  publicId: z.string(),
});

const WorksAtSchema = z.object({
  companyName: z.string(),
  jobTitle: z.string(),
});

const LocationSchema = z.object({
  country: z.string(),
  city: z.string(),
  postCode: z.number(),
  streetAddress: z.string(),
});

const BirthDateSchema = z.object({
  day: z.number().min(1).max(31),
  month: z.union([
    z.literal('January'),
    z.literal('February'),
    z.literal('March'),
    z.literal('April'),
    z.literal('May'),
    z.literal('June'),
    z.literal('July'),
    z.literal('August'),
    z.literal('September'),
    z.literal('October'),
    z.literal('November'),
    z.literal('December'),
  ]),
  year: z.number().min(1900).max(new Date().getFullYear()),
});

export const contactSchema = z.object({
  avatar: ImageSchema.optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone number is required'),
  worksAt: WorksAtSchema.optional(),
  location: LocationSchema.optional(),
  birthday: BirthDateSchema.optional(),
});
