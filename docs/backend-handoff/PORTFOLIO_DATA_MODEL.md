# Data Model — نموذج البيانات

## Profile
```ts
interface ProfileDto {
  name: string; // "عبدالله خالد"
  shortName: string; // "عبدالله"
  initials: string; // "ع خ"
  title: string; // المسمى الوظيفي الفكاهي
  subtitle: string; // "Senior Professional في مجال «سيبها عليا»"
  bio: string; // نبذة قصيرة
  longBio: string; // نبذة طويلة
  heroImage: string; // "/images/hero/portrait.jpg"
  heroImage2?: string;
  backgroundImage?: string;
  location: string; // "القاهرة، مصر"
  availability: string; // "متاح للمشاريع الأسطورية"
  socialLinks: SocialLinkDto[];
  email?: string;
  phone?: string;
}
```

## Statistics
```ts
interface StatisticDto {
  id: string;
  value: number | string; // يمكن أن يكون "∞" أو 99.9
  suffix?: string; // "%", "+", etc
  label: string; // "معدل الثقة"
  description: string;
  humorous: boolean; // دائماً true للإحصائيات الفكاهية
}
```

## Timeline
```ts
interface TimelineItemDto {
  id: string;
  year: string; // "2024"
  title: string; // "مرحلة السيطرة"
  description: string;
  image?: string;
  achievement?: string;
  humorous?: boolean;
}
```

## Skills
```ts
interface SkillDto {
  id: string;
  title: string; // "حل المشاكل"
  icon: string; // "🧠" emoji
  level: string; // "أسطوري", "Turbo", "قهوة واحدة"
  description: string;
  category: string; // "core", "work", "leadership"
}
```

## Experience
```ts
interface ExperienceDto {
  id: string;
  position: string;
  company: string;
  year: string; // "2024 — الآن"
  duration: string;
  description: string;
  achievements: string[];
  humorousSubtitle?: string;
  type?: string; // "fulltime", "consulting"
}
```

## Achievements
```ts
interface AchievementDto {
  id: string;
  title: string; // "جائزة «سيبها عليا»"
  subtitle: string;
  description: string;
  icon: string; // "🏆"
  year?: string;
  image?: string;
  humorous: boolean;
  category?: string;
}
```

## Projects
```ts
interface ProjectDto {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  status: string; // "MISSION ACCOMPLISHED", "TOP SECRET", "COMPLETED"
  image?: string;
  technologies: string[];
  highlights: string[];
  featured: boolean;
  link?: string;
  humorous?: boolean;
}
```

## Testimonials
```ts
interface TestimonialDto {
  id: string;
  quote: string; // النص الفكاهي المحبب
  author: string;
  role?: string;
  avatar?: string;
  relation?: string; // "زميل عمل", "الإدارة العليا"
}
```

## Gallery
```ts
interface GalleryItemDto {
  id: string;
  image: string;
  title: string;
  caption: string;
  category?: string;
  width?: number;
  height?: number;
}
```

## Easter Eggs
```ts
interface EasterEggDto {
  id: string;
  trigger: string; // "logo-5-clicks", "infinity-stat-click"
  title: string;
  message: string;
  reward?: string;
  hint?: string;
}
```

## Contact
```ts
interface ContactDto {
  email: string;
  phone?: string;
  whatsapp?: string;
  location: string;
  availability: string;
  message: string;
  socialLinks: SocialLinkDto[];
}
```

## ملاحظات
- جميع النصوص عربية مصرية فكاهية تفخيمية
- `humorous: true` يعني أن البيانات فكاهية ويجب عدم تقديمها كحقائق مهنية جادة
- الصور حالياً placeholders - في الـ backend الحقيقي ستكون URLs حقيقية
- التواريخ نصية مرنة ("2024 — الآن") وليست Date objects
