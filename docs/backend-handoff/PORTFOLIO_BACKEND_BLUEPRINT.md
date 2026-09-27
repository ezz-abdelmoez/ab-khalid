# Backend Blueprint — مخطط الـ Backend المستقبلي

## اقتراح التقنيات

### Option 1: Node.js + Express + MongoDB (سريع)
```
- Express.js
- MongoDB + Mongoose
- Zod (shared validation)
- Multer for image upload
- JWT for admin auth
```

### Option 2: Next.js API Routes (أبسط - نفس المشروع)
```
- Keep everything in Next.js
- API routes in app/api/v1/*
- Prisma + PostgreSQL or SQLite
- NextAuth for admin
- Vercel Blob for images
```

### Option 3: NestJS + PostgreSQL (Enterprise)
```
- NestJS
- PostgreSQL + TypeORM/Prisma
- Swagger docs
- Class-validator (or Zod)
- S3 for images
```

## Database Schema (مقترح)

### Collections/Tables

#### profiles
- id: string (PK)
- name, shortName, initials, title, subtitle, bio, longBio
- heroImage, heroImage2, backgroundImage
- location, availability, email, phone
- socialLinks: JSON
- createdAt, updatedAt

#### statistics
- id: string (PK)
- value: string (can be number or "∞")
- suffix, label, description
- humorous: boolean
- order: number
- createdAt

#### timeline
- id: string (PK)
- year, title, description, image, achievement
- humorous: boolean
- order: number

#### skills
- id: string (PK)
- title, icon, level, description, category
- order: number

#### experiences
- id: string (PK)
- position, company, year, duration, description
- achievements: JSON array
- humorousSubtitle, type
- order: number (newest first)

#### achievements
- id: string (PK)
- title, subtitle, description, icon, year, image
- humorous: boolean
- category, featured: boolean
- order: number

#### projects
- id: string (PK)
- title, description, longDescription, status, image
- technologies: JSON array
- highlights: JSON array
- featured: boolean
- link, humorous
- order: number

#### testimonials
- id: string (PK)
- quote, author, role, avatar, relation
- order: number

#### gallery
- id: string (PK)
- image, title, caption, category
- width, height
- order: number

#### easter_eggs
- id: string (PK)
- trigger, title, message, reward, hint

#### contacts
- single row table or config
- email, phone, whatsapp, location, availability, message
- socialLinks: JSON

## API Implementation Checklist

- [ ] Implement all 12 endpoints from contract
- [ ] Use same DTOs as frontend
- [ ] Validate with Zod (share schemas via package)
- [ ] Handle image uploads
- [ ] Add CORS
- [ ] Add rate limiting
- [ ] Add logging
- [ ] Add error handling middleware
- [ ] Return same error format
- [ ] Add timestamp in meta

## Admin Dashboard (Future)

### Features
- Login (email/password)
- CRUD for all entities
- Image upload with preview
- Reorder via drag & drop
- Preview changes
- Publish/unpublish

### Tech
- Next.js app router with protected routes
- Or separate React admin (react-admin, refine)

### Pages
```
/admin/login
/admin/profile
/admin/statistics
/admin/timeline
/admin/skills
/admin/experience
/admin/achievements
/admin/projects
/admin/testimonials
/admin/gallery
/admin/easter-eggs
/admin/contact
```

## Image Upload

### Requirements
- Accept jpg, png, webp
- Max 5MB
- Generate thumbnails (optional)
- Store in S3 / Vercel Blob / local / Cloudinary
- Return URL

### Endpoint
```
POST /v1/upload
Content-Type: multipart/form-data

Response:
{
  data: {
    url: "/images/...",
    thumbnailUrl: "/images/thumbs/..."
  }
}
```

## Authentication (Future - Optional)

- Only needed for admin
- JWT
- Endpoints:
  - POST /v1/auth/login
  - POST /v1/auth/logout
  - GET /v1/auth/me
- Protect admin endpoints with middleware

## Deployment

### Frontend (Current)
- Vercel (recommended for Next.js)
- Or any Node hosting

### Backend (Future)
- Same Vercel project (if using Next API routes)
- Or separate: Railway, Render, Fly.io, AWS

### Environment Variables (Backend)
```
DATABASE_URL=...
JWT_SECRET=...
S3_BUCKET=...
S3_REGION=...
S3_ACCESS_KEY=...
S3_SECRET_KEY=...
CORS_ORIGIN=https://ab-khalid.example.com
```

## Migration from Mock to HTTP

1. Implement backend with same contract
2. Test with Postman/Insomnia
3. Change `NEXT_PUBLIC_API_MODE=http` in frontend .env
4. Set `NEXT_PUBLIC_API_BASE_PATH` to backend URL
5. Deploy both

No frontend code changes needed!

## Content Management

Since content is currently in JSON fixtures, you can:

1. **Keep JSON** for simplicity (edit files directly)
2. **Move to DB** for dynamic updates
3. **Use CMS** like Sanity, Contentful, Strapi (if want visual editor)

Recommendation for v1 backend: Use DB with admin CRUD, keep same JSON structure.

## Analytics (Future)

- Track page views
- Track easter egg discoveries
- Track legend mode usage
- Track contact clicks

Could use:
- Plausible, Umami (privacy-friendly)
- Or custom events endpoint

## SEO (Backend should support)

- Return same metadata
- Support Open Graph images
- Sitemap generation: GET /sitemap.xml
- Robots.txt: GET /robots.txt
