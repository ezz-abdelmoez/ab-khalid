# عبدالله خالد — الملف الرسمي للأسطورة™

Portfolio شخصي بأسلوب سينمائي فكاهي تفخيمي مصري — 80% بريميوم portfolio حقيقي، 20% كوميديا مصرية محببة.

## الفكرة

الموقع يبدو في البداية كـ portfolio تنفيذي فخم لشخص عالمي، ثم يكشف تدريجياً عن:

- تفخيم كوميدي مصري أصيل
- إنجازات وهمية واضحة أنها فكاهية
- إحصائيات مضحكة (99.9% ثقة، ∞ أفكار)
- شهادات فكاهية
- Easter Eggs مخفية
- وضع الأسطورة 👑

**الكوميديا دائماً تفخيمية ومحبة، ليست سخرية.**

> "عندما تظهر المشكلة، لا نبحث عن حل... نبحث عن عبدالله."

## التقنيات

- **Framework**: Next.js 16 App Router
- **Language**: TypeScript strict
- **UI**: React 19, Tailwind CSS v4, shadcn/ui, lucide-react
- **Animations**: Framer Motion
- **Data**: TanStack Query, Zod, Mock-first architecture
- **Fonts**: Cairo + JetBrains Mono (via @fontsource)
- **Testing**: Vitest

## البنية المعمارية Mock-first

```
UI
 ↓
TanStack Query Hooks
 ↓
API Client Factory
 ↓
Transport Layer
 ├── Mock Transport (JSON fixtures + Zod validation)
 └── Fetch Transport (future REST API)
```

التبديل بين mock و http عبر:

```env
NEXT_PUBLIC_API_MODE=mock # أو http
```

بدون إعادة كتابة مكونات الـ UI.

## التشغيل

```bash
pnpm install
pnpm dev
```

ثم افتح http://localhost:3000

## الأوامر

```bash
pnpm lint   # فحص الكود
pnpm test   # اختبارات Mock API
pnpm build  # بناء الإنتاج
pnpm start  # تشغيل الإنتاج
```

## Easter Eggs

- اضغط على اللوجو 5 مرات
- اضغط على إحصائية ∞
- ابحث عن بادج "للمختصين فقط" في الفوتر
- اضغط على مشروع مصنف "سري للغاية"
- جرب كود كونامي الشهير ↑↑↓↓←→←→BA
- فعّل وضع الأسطورة 👑

## الأقسام

- Hero سينمائي مع loading فكاهي
- إحصائيات متحركة
- القصة + Timeline
- القدرات الخارقة
- المسيرة المهنية
- الإنجازات (جوائز فكاهية)
- المشاريع (عمليات كبرى)
- لوحة الأداء
- شهادة العظمة
- التوصيات
- معرض الصور
- تواصل مع الأسطورة

## الوثائق

- `docs/backend-handoff/README.md` — شرح البنية
- `docs/backend-handoff/PORTFOLIO_DATA_MODEL.md` — نموذج البيانات
- `docs/backend-handoff/PORTFOLIO_API_CONTRACT.md` — عقد الـ API
- `docs/backend-handoff/PORTFOLIO_BACKEND_BLUEPRINT.md` — مخطط الـ Backend

## التخصيص

جميع البيانات في:

```
src/lib/api/mock/fixtures/
```

و الإعدادات في:

```
src/lib/site-config.ts
```

غيّر الاسم، الصور، الروابط، الإنجازات بسهولة.

## Definition of Done

- [x] RTL Arabic
- [x] Hero سينمائي
- [x] Gallery
- [x] Animations
- [x] Dark/Light mode
- [x] Mobile responsive
- [x] Mock API + Zod
- [x] No direct fixture imports in UI
- [x] No direct fetch in UI
- [x] Statistics animated
- [x] Achievements
- [x] Projects
- [x] Testimonials
- [x] Easter Eggs
- [x] Legend Mode
- [x] Custom 404
- [x] Custom Loading
- [x] Custom Error
- [x] Alt text
- [x] Reduced motion
- [x] SEO
- [x] Backend handoff docs
- [x] pnpm lint ✓
- [x] pnpm test ✓
- [x] pnpm build ✓

---

تم بناء هذا الموقع بكمية غير ضرورية من الثقة بالنفس ✨
