import { z } from 'zod';

const ImageSchema = z.object({
  url: z.string().url().nullable().optional(),
  publicId: z.string().nullable().optional(),
});

const WorksAtSchema = z.object({
  companyName: z.string().nullable().optional(),
  jobTitle: z.string().nullable().optional(),
});

const LocationSchema = z.object({
  country: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  postCode: z.number().nullable().optional(),
  streetAddress: z.string().nullable().optional(),
});

const BirthDateSchema = z.object({
  day: z.number().min(1).max(31).nullable(),
  month: z
    .union([
      z.literal('january'),
      z.literal('february'),
      z.literal('march'),
      z.literal('april'),
      z.literal('may'),
      z.literal('june'),
      z.literal('july'),
      z.literal('august'),
      z.literal('september'),
      z.literal('october'),
      z.literal('november'),
      z.literal('december'),
    ])
    .nullable(),
  year: z.number().min(1900).max(new Date().getFullYear()).nullable(),
});

export const contactSchema = z
  .object({
    avatar: ImageSchema.optional(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(1, 'Phone number is required'),
    worksAt: WorksAtSchema,
    location: LocationSchema,
    birthday: BirthDateSchema,
  })
  .refine(
    (data) => {
      const { companyName, jobTitle } = data.worksAt;
      const anyFilled = companyName || jobTitle;
      const allFilled = companyName && jobTitle;
      return !anyFilled || allFilled;
    },
    {
      message: 'If one worksAt field is filled, all must be filled.',
      path: ['worksAt'],
    }
  )
  .refine(
    (data) => {
      const { country, city, postCode, streetAddress } = data.location;
      const anyFilled = country || city || postCode || streetAddress;
      const allFilled = country && city && postCode && streetAddress;
      return !anyFilled || allFilled;
    },
    {
      message: 'If one location field is filled, all must be filled.',
      path: ['location'],
    }
  )
  .refine(
    (data) => {
      const { day, month, year } = data.birthday;
      const anyFilled = day || month || year;
      const allFilled = day && month && year;
      return !anyFilled || allFilled;
    },
    {
      message: 'If one birthday field is filled, all must be filled.',
      path: ['birthday'],
    }
  );
