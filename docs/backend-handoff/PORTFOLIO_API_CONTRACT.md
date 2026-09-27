# API Contract — عقد الـ API

## Base URL

- Mock: يتم التعامل معه داخلياً عبر MockTransport (لا يوجد server)
- HTTP: `NEXT_PUBLIC_API_BASE_PATH` (افتراضي `/api`)

## Endpoints

جميع الـ endpoints تبدأ بـ `/v1/` وتُرجع:

```ts
interface ApiResponse<T> {
  data: T;
  meta?: {
    total?: number;
    timestamp: string; // ISO string
  };
}
```

### GET /v1/home

يرجع البيانات الرئيسية للصفحة الرئيسية.

```ts
Response: ApiResponse<HomeDto>

HomeDto {
  profile: ProfileDto;
  statistics: StatisticDto[]; // 3 items featured
  featuredAchievements: AchievementDto[];
  featuredProjects: ProjectDto[];
}
```

### GET /v1/profile

```ts
Response: ApiResponse<ProfileDto>
```

### GET /v1/statistics

```ts
Response: ApiResponse<StatisticDto[]>
// Minimum 6 items
// All have humorous: true
```

### GET /v1/timeline

```ts
Response: ApiResponse<TimelineItemDto[]>
// Minimum 5 items
// Ordered chronologically
```

### GET /v1/skills

```ts
Response: ApiResponse<SkillDto[]>
// Minimum 6 items
```

### GET /v1/experience

```ts
Response: ApiResponse<ExperienceDto[]>
// Minimum 3 items
// Ordered newest first
```

### GET /v1/achievements

```ts
Response: ApiResponse<AchievementDto[]>
// Minimum 6 items
// All have humorous: true (for fictional awards)
```

### GET /v1/projects

```ts
Response: ApiResponse<ProjectDto[]>
// Minimum 4 items
// Some have status: "TOP SECRET" (easter egg)
// featured: boolean for highlighting
```

### GET /v1/testimonials

```ts
Response: ApiResponse<TestimonialDto[]>
// Minimum 5 items
// Fictional but affectionate testimonials
```

### GET /v1/gallery

```ts
Response: ApiResponse<GalleryItemDto[]>
// Minimum 8 items
// Various categories
```

### GET /v1/easter-eggs

```ts
Response: ApiResponse<EasterEggDto[]>
// Minimum 5 items
// Triggers: logo-5-clicks, infinity-stat-click, etc.
```

### GET /v1/contact

```ts
Response: ApiResponse<ContactDto>
```

## Error Handling

### 404 Not Found
```json
{
  "code": "NOT_FOUND",
  "message": "البيانات غير موجودة: /v1/xyz",
  "status": 404
}
```

### Validation Error (Mock only)
```json
{
  "code": "VALIDATION_ERROR",
  "message": "خطأ في التحقق من البيانات",
  "status": 500,
  "details": { ...zod errors }
}
```

### Timeout (HTTP only)
```json
{
  "code": "TIMEOUT",
  "message": "انتهت مهلة الطلب",
  "status": 408
}
```

## Headers

### Request
```
Content-Type: application/json
Accept: application/json
```

### Response (HTTP)
```
Content-Type: application/json
X-Timestamp: ISO string
```

## Future Considerations

- Pagination: `?page=1&limit=10` (optional, not required for v1)
- Filtering: `?featured=true` (optional)
- Sorting: `?sort=year&order=desc` (optional)
- Authentication: Bearer token (for admin endpoints, future)
- Image upload: `POST /v1/upload` (future)

## Mock Behavior

- Simulates 250-450ms delay
- Validates all fixtures with Zod
- Returns 404 for unknown endpoints
- No actual HTTP calls

## HTTP Behavior (Future)

- Should implement same contract
- Should validate incoming data with Zod (shared schemas)
- Should handle CORS for frontend
- Should support same error format
