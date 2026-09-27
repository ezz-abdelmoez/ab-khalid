import { z } from "zod";

export const socialLinkSchema = z.object({
  platform: z.string(),
  url: z.string(),
  label: z.string(),
});

export const profileSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  initials: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  bio: z.string().min(1),
  longBio: z.string().min(1),
  heroImage: z.string().min(1),
  heroImage2: z.string().optional(),
  backgroundImage: z.string().optional(),
  location: z.string().min(1),
  availability: z.string().min(1),
  socialLinks: z.array(socialLinkSchema),
  email: z.string().optional(),
  phone: z.string().optional(),
});

export const statisticSchema = z.object({
  id: z.string(),
  value: z.union([z.number(), z.string()]),
  suffix: z.string().optional(),
  label: z.string(),
  description: z.string(),
  humorous: z.boolean(),
});

export const timelineItemSchema = z.object({
  id: z.string(),
  year: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  achievement: z.string().optional(),
  humorous: z.boolean().optional(),
});

export const skillSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.string(),
  level: z.string(),
  description: z.string(),
  category: z.string(),
});

export const experienceSchema = z.object({
  id: z.string(),
  position: z.string(),
  company: z.string(),
  year: z.string(),
  duration: z.string(),
  description: z.string(),
  achievements: z.array(z.string()),
  humorousSubtitle: z.string().optional(),
  type: z.string().optional(),
});

export const achievementSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  icon: z.string(),
  year: z.string().optional(),
  image: z.string().optional(),
  humorous: z.boolean(),
  category: z.string().optional(),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  longDescription: z.string().optional(),
  status: z.string(),
  image: z.string().optional(),
  technologies: z.array(z.string()),
  highlights: z.array(z.string()),
  featured: z.boolean(),
  link: z.string().optional(),
  humorous: z.boolean().optional(),
});

export const testimonialSchema = z.object({
  id: z.string(),
  quote: z.string(),
  author: z.string(),
  role: z.string().optional(),
  avatar: z.string().optional(),
  relation: z.string().optional(),
});

export const galleryItemSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  caption: z.string(),
  category: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const easterEggSchema = z.object({
  id: z.string(),
  trigger: z.string(),
  title: z.string(),
  message: z.string(),
  reward: z.string().optional(),
  hint: z.string().optional(),
});

export const contactSchema = z.object({
  email: z.string(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  location: z.string(),
  availability: z.string(),
  message: z.string(),
  socialLinks: z.array(socialLinkSchema),
});

export const homeSchema = z.object({
  profile: profileSchema,
  statistics: z.array(statisticSchema),
  featuredAchievements: z.array(achievementSchema),
  featuredProjects: z.array(projectSchema),
});

export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    meta: z
      .object({
        total: z.number().optional(),
        timestamp: z.string(),
      })
      .optional(),
  });

export function validateFixture<T>(schema: z.ZodType<T>, data: unknown, fixtureName: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Fixture Validation Failed] ${fixtureName}:`, result.error.format());
    throw new Error(`Invalid fixture: ${fixtureName}`);
  }
  return result.data;
}
