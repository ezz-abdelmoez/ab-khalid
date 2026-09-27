export interface SocialLinkDto {
  platform: string;
  url: string;
  label: string;
}

export interface ProfileDto {
  name: string;
  shortName: string;
  initials: string;
  title: string;
  subtitle: string;
  bio: string;
  longBio: string;
  heroImage: string;
  heroImage2?: string;
  backgroundImage?: string;
  location: string;
  availability: string;
  socialLinks: SocialLinkDto[];
  email?: string;
  phone?: string;
}

export interface StatisticDto {
  id: string;
  value: number | string;
  suffix?: string;
  label: string;
  description: string;
  humorous: boolean;
}

export interface TimelineItemDto {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
  achievement?: string;
  humorous?: boolean;
}

export interface SkillDto {
  id: string;
  title: string;
  icon: string;
  level: string;
  description: string;
  category: string;
}

export interface ExperienceDto {
  id: string;
  position: string;
  company: string;
  year: string;
  duration: string;
  description: string;
  achievements: string[];
  humorousSubtitle?: string;
  type?: string;
}

export interface AchievementDto {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  year?: string;
  image?: string;
  humorous: boolean;
  category?: string;
}

export interface ProjectDto {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  status: string;
  image?: string;
  technologies: string[];
  highlights: string[];
  featured: boolean;
  link?: string;
  humorous?: boolean;
}

export interface TestimonialDto {
  id: string;
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  relation?: string;
}

export interface GalleryItemDto {
  id: string;
  image: string;
  title: string;
  caption: string;
  category?: string;
  width?: number;
  height?: number;
}

export interface EasterEggDto {
  id: string;
  trigger: string;
  title: string;
  message: string;
  reward?: string;
  hint?: string;
}

export interface ContactDto {
  email: string;
  phone?: string;
  whatsapp?: string;
  location: string;
  availability: string;
  message: string;
  socialLinks: SocialLinkDto[];
}

export interface HomeDto {
  profile: ProfileDto;
  statistics: StatisticDto[];
  featuredAchievements: AchievementDto[];
  featuredProjects: ProjectDto[];
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total?: number;
    timestamp: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}
