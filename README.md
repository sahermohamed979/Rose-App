# Rose App

A modern, highly performant, and fully internationalized Next.js web application built with the latest features of Next.js 16 (App Router) and React 19.

---

## 🚀 Key Features

- **🌐 Robust Internationalization (i18n)**: Out-of-the-box multi-locale routing and localization for English (`en`) and Arabic (`ar`) utilizing `next-intl`. Includes dynamic layout support (RTL for Arabic, LTR for English).
- **⚡ Next.js 16 (App Router)**: Configured with React Server Components (RSC), optimized client rendering, and nested layout boundaries.
- **🎨 Tailwind CSS v4**: Built with the next-generation Tailwind engine utilizing modern `@tailwindcss/postcss` and PostCSS integration.
- **🧱 Premium UI Foundation**:
  - Unstyled, accessible primitives from `@base-ui/react`.
  - Modern styling components utilizing the **Shadcn** CLI configured for Tailwind v4.
- **🔄 Robust Caching & Querying**: Integrated TanStack React Query (`@tanstack/react-query`) v5 for seamless asynchronous server state management.
- **📝 Form Validation**: Fully type-safe forms with `react-hook-form` integrated with `zod` schemas.
- **🛠️ Production-Ready Tooling**: Strict ESLint rules, automated Prettier formatting, and Husky pre-commit hooks.

---

## 📂 Project Structure

The project follows a clean, feature-driven structure to keep code scalable and organized:

```
rose-app/
├── src/
│   ├── app/                 # Next.js App Router root
│   │   ├── [locale]/        # Localized layouts and routes (en, ar)
│   │   │   ├── layout.tsx   # Localized base layout (sets dir/lang)
│   │   │   └── page.tsx     # Home page
│   │   └── globals.css      # Core global styles (with Tailwind direct imports)
│   ├── features/            # Domain-specific business components & state
│   ├── i18n/                # Internationalization config (routing, request, etc.)
│   │   ├── messages/        # Translation JSON catalogs
│   │   └── routing.ts       # Supported locales and routing behavior
│   ├── shared/              # Reusable common code across features
│   │   ├── assets/          # Static assets (images, icons)
│   │   ├── components/      # UI components & Shadcn blocks
│   │   │   └── ui/          # Low-level UI primitives
│   │   ├── context/         # React Context and Global Providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── layout/          # Page layouts (headers, footers)
│   │   ├── lib/             # Third-party wrappers, schemas, and utils
│   │   └── skeletons/       # Loading skeletons
│   └── proxy.ts             # next-intl localized redirect middleware
```

---

## 🛠️ Tech Stack & Dependencies

### Core Frameworks

- **React 19.2.4**
- **Next.js 16.2.9**
- **TypeScript**

### Styling & UI

- **Tailwind CSS v4**
- **Base UI (`@base-ui/react`)**: Accessible primitives for custom designs.
- **Shadcn**: Component configuration (`components.json` is set to `base-nova` style).
- **Lucide React**: Vector icons.

### State & Logic

- **TanStack React Query v5**: Server state management with React Query Devtools.
- **React Hook Form**: Form state management.
- **Zod**: Type-safe schema validation.

---

## ⚙️ Path Aliases

To keep imports clean, path aliases are configured in `tsconfig.json` and `components.json`:

- `@/*` pointing to `./src/*`
- `@/shared/components/*` for components
- `@/shared/lib/*` for library code and utilities
- `@/shared/hooks/*` for hooks

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** installed (v18+ recommended).

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production

To build a production bundle:

```bash
npm run build
```

To run the built production version:

```bash
npm run start
```

---

## 🧪 Linting & Formatting

We maintain a strict code quality standard using ESLint, Prettier, and Husky pre-commit hooks.

- **Lint Code**:

  ```bash
  npm run lint
  ```

  _Features custom rules: checks for `no-console` warnings, enforces `prefer-const`, strict quality checks (`eqeqeq`, `curly`), and unused variables configuration._

- **Format Code**:

  ```bash
  npx prettier --write .
  ```

- **Git Hooks**: Pre-commit hooks run automatically on staged files via `husky` and `lint-staged`.

---

## 🌐 Localization Guide (next-intl)

### Adding a new language

1. Define the locale in `src/i18n/routing.ts`.
2. Add the corresponding JSON file under `src/i18n/messages/{locale}.json`.
3. The layout in `src/app/[locale]/layout.tsx` will automatically detect the language direction (`rtl` or `ltr`) based on the locale:
   ```typescript
   lang={locale}
   dir={locale === 'ar' ? 'rtl' : 'ltr'}
   ```
