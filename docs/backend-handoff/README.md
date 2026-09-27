# Backend Handoff — الملف الرسمي للأسطورة

## نظرة عامة

هذا المشروع مبني بمعمارية **Mock-first** جاهزة للتحول إلى backend حقيقي بدون إعادة كتابة مكونات الـ UI.

```
UI (React Components)
 ↓
TanStack Query Hooks (src/hooks/use-api.ts)
 ↓
API Client (src/lib/api/client/index.ts)
 ↓
Transport Layer
 ├── Mock Transport (src/lib/api/transport/mock-transport.ts)
 └── Fetch Transport (src/lib/api/transport/fetch-transport.ts)
       ↓
Future REST API
```

## المبدأ الأساسي

- الـ UI **لا يستورد** JSON fixtures مباشرة
- الـ UI **لا يستدعي** fetch مباشرة
- الـ UI **لا يعرف** هل البيانات من mock أم HTTP
- التبديل يتم عبر متغير بيئة واحد

## التبديل بين Mock و HTTP

في `.env.local`:

```env
# للعمل مع البيانات الوهمية (الافتراضي)
NEXT_PUBLIC_API_MODE=mock

# للعمل مع API حقيقي
NEXT_PUBLIC_API_MODE=http
NEXT_PUBLIC_API_BASE_PATH=/api
API_INTERNAL_URL=http://localhost:5067
```

غيّر `NEXT_PUBLIC_API_MODE` من `mock` إلى `http` وسيعمل المشروع مع backend حقيقي بدون تعديل أي component.

## مسؤوليات Frontend vs Backend

### Frontend (الحالي)
- عرض البيانات
- التحقق من البيانات بـ Zod
- إدارة الحالة بـ TanStack Query
- الأنيميشن والتفاعلات
- Easter Eggs و Legend Mode

### Backend (المستقبلي)
- توفير نفس الـ endpoints بنفس الـ DTOs
- تخزين البيانات (DB)
- رفع الصور
- لوحة تحكم لإدارة المحتوى
- المصادقة (اختياري)

## كيفية إضافة Endpoint جديد

1. أضف الـ DTO في `src/lib/api/contracts/index.ts`
2. أضف الـ Zod schema في `src/lib/api/schemas/index.ts`
3. أضف fixture في `src/lib/api/mock/fixtures/`
4. أضف method في `ApiClient` في `src/lib/api/client/index.ts`
5. أضف hook في `src/hooks/use-api.ts`
6. استخدم الـ hook في الـ UI

## Fixtures الحالية

جميع البيانات الوهمية موجودة في:
```
src/lib/api/mock/fixtures/
├── profile.json
├── statistics.json
├── timeline.json
├── skills.json
├── experience.json
├── achievements.json
├── projects.json
├── testimonials.json
├── gallery.json
├── easter-eggs.json
├── contact.json
└── home.json
```

كل fixture يتم التحقق منه بـ Zod عند التحميل في MockTransport.

## الاختبارات

```bash
pnpm test
```

تختبر:
- تحميل البيانات
- التحقق بـ Zod
- أخطاء 404
- التبديل بين mock/http
- عدم استيراد fixtures مباشرة في UI

## ملاحظات للمطور الخلفي

- حافظ على نفس أسماء الحقول
- حافظ على نفس أنواع البيانات
- `humorous: true` يعني أن الإحصائية/الإنجاز فكاهي ويجب عرضه بشكل مميز
- الصور حالياً placeholders - ستحتاج نظام رفع صور
- جميع النصوص عربية RTL - تأكد من دعم UTF-8
