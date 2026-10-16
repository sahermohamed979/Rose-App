# 🌹 Rose App — Enterprise E-Commerce Platform

> **Production-grade, highly performant, and bi-directionally internationalized luxury e-commerce architecture built with Next.js 16 (App Router), React 19, and TypeScript.**

[![Next.js](<https://img.shields.io/badge/Next.js-16%20(App%20Router)-black?style=for-the-badge&logo=next.js>)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](<https://img.shields.io/badge/TypeScript-5%20(Strict)-3178C6?style=for-the-badge&logo=typescript>)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=react-query)](https://tanstack.com/query)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Architecture](https://img.shields.io/badge/Architecture-Feature--Sliced-8A2BE2?style=for-the-badge)](#-system-architecture--design-decisions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 📱 Senior-Level LinkedIn Announcements

Copy and paste either template directly to LinkedIn to showcase your system design and engineering depth:

<details open>
<summary><b>Option 1: Senior Software Engineer — Deep Dive & System Architecture (Recommended)</b></summary>

```markdown
Architecting for Production: Building an enterprise-grade luxury e-commerce platform with Next.js 16, React 19, and TypeScript 🚀

When designing e-commerce web applications at scale, the biggest trap is treating the frontend as just a collection of UI screens. Real-world platforms require deliberate system design: resilient state synchronization, strict schema boundaries, zero-layout-shift localization, and minimal client bundle overhead.

Over the past few weeks, I engineered Rose App — a high-performance flower and luxury gifting e-commerce platform built to solve these architectural challenges.

Here are some of the key technical decisions and architectural patterns implemented:

🧠 1. Server-First Architecture (Next.js 16 App Router & React 19)
• Minimized JavaScript delivered to the client by maximizing React Server Components (RSC) for initial page loads and data-heavy storefront catalogs.
• Strictly isolated client components (`"use client"`) to interactive leaves (e.g. address map picker, cart drawer, OTP validation), preventing hydration waterfalls.

🌐 2. Bi-Directional i18n with Zero Cumulative Layout Shift (CLS)
• Integrated native bi-directional localization (Arabic RTL & English LTR) using `next-intl`.
• Designed the UI system with CSS logical properties and directional typography scaling to ensure seamless layout mirroring without styling duplication.

⚡ 3. Deterministic State Synchronization & Optimistic UI
• Leveraged TanStack React Query v5 with centralized Query Key Factories.
• Implemented optimistic updates on cart modifications, coupon redemptions, and wishlist toggles, ensuring instant perceived performance with automatic rollback on network failure.

🗺️ 4. Geospatial Logistics & Performance Isolation
• Integrated interactive pinpoint delivery address mapping with Leaflet and React-Leaflet.
• Code-split heavy client bundles (Leaflet maps and Recharts telemetry graphs) with dynamic loading boundaries and skeleton fallbacks to protect Core Web Vitals.

🎨 5. 3D WebGL Immersion & GPU Performance (Three.js & React Three Fiber)
• Engineered an interactive procedural 3D hero centerpiece featuring a bouquet of roses and luxury gift box with cursor-driven damping physics.
• Designed high-performance particle burst systems using `THREE.InstancedMesh` to render hundreds of animating 3D primitives in a single GPU draw call at 60 FPS.
• Code-split WebGL bundles via dynamic SSR-disabled imports (`next/dynamic({ ssr: false })`) and React Suspense to guarantee zero impact on First Contentful Paint.

🛡️ 6. Type Safety & Defensive Engineering
• Enforced strict TypeScript mode with zero `any` policy.
• Runtime schema validation using Zod (`z.infer`) across all API payloads, query parameters, and multi-step checkout forms (React Hook Form).
• Automated static analysis via pre-commit git hooks (Husky + lint-staged + ESLint + Prettier).

📊 7. Administrative Telemetry & Observability
• Real-time business metrics dashboard featuring revenue trajectory analysis, order fulfillment status distributions, and user lifecycle analytics powered by Recharts.

Engineering is about trade-offs: picking the right abstractions, keeping code maintainable, and prioritizing user experience and runtime resilience above all.

Explore the repository & architectural breakdown:
🔗 GitHub: [Insert your GitHub Link]
🌐 Live Demo: [Insert your Live Link]

Fellow engineers: How are you managing client vs. server boundaries in React 19? Would love to connect and hear your thoughts in the comments! 👇

#SoftwareEngineering #Nextjs #React19 #TypeScript #Threejs #WebGL #SystemDesign #WebPerformance #FrontendArchitecture #TailwindCSS #CleanCode #Ecommerce #FullStack
```

</details>

<br />

<details>
<summary><b>Option 2: Senior Frontend Lead — Impact & Engineering Highlights</b></summary>

```markdown
🌹 Engineering a high-performance e-commerce platform from the ground up: Rose App (Next.js 16 • React 19 • TypeScript • Tailwind CSS v4)

As frontend systems grow in complexity, clean architecture and strict separation of concerns become non-negotiable.

Here is what I prioritized when building Rose App:

🔹 Architecture: Feature-sliced modular design separating domain business logic, API services, and presentation primitives.
🔹 Performance: Next.js 16 Server Components to keep client JS slim, paired with streaming Suspense boundaries.
🔹 3D WebGL: Immersive procedural Three.js / React Three Fiber hero experience with single-draw-call InstancedMesh particles and zero-SSR code splitting.
🔹 Localization: Native bi-directional English (LTR) & Arabic (RTL) with next-intl and zero CLS layout adaptation.
🔹 Data Layer: TanStack Query v5 with centralized query key factories and optimistic state updates for cart & checkout flows.
🔹 Geolocation: Interactive Leaflet map integration for precise pin-drop delivery logistics.
🔹 Analytics: Interactive executive dashboard with real-time revenue and order fulfillment tracking via Recharts.
🔹 Quality: End-to-end type safety with TypeScript & Zod schemas, backed by automated Husky/lint-staged pipelines.

Check out the code and system design overview:
🔗 GitHub: [Insert your GitHub Link]
🌐 Live Application: [Insert your Live Link]

Feedback and technical discussions are always welcome!

#FrontendArchitecture #WebDevelopment #React19 #Nextjs #TypeScript #Threejs #TailwindCSS #SoftwareEngineering #TechLead
```

</details>

---

## 🏗️ System Architecture & Design Decisions

### 1. Feature-Sliced Architecture

Rather than grouping files strictly by technical role (all components in one folder, all hooks in another), the codebase is organized by **Domain Features** (`src/features/*`). Each domain feature acts as a self-contained module containing its own:

- `apis/` & `services/`: Network contract wrappers and endpoint definitions.
- `components/`: Domain-specific UI representations.
- `hooks/`: Custom state machines and React Query wrappers.
- `schemas/`: Zod validation models and inferred TypeScript types.
- `screens/`: Assembled composite views.
- `skeletons/`: Layout-shift preventing Suspense fallbacks.

### 2. Server vs. Client Boundary Strategy

- **Default to RSC**: Data fetching and static layouts occur exclusively on the server, eliminating client-side API credential exposure and slashing bundle size.
- **Isolated Leaf Interactivity**: `"use client"` is pushed down to the lowest possible component trees (e.g., button triggers, input fields, interactive map pins) to prevent unnecessary client-side re-renders.

### 3. Server State Management Strategy

- **Client Cache Decoupling**: Global application state is divided cleanly between ephemeral UI state and server state.
- **Query Key Factories**: All query keys are strictly typed and centralized to guarantee deterministic invalidation and prevent stale-while-revalidate inconsistencies across routes.
- **Optimistic UI Updates**: High-frequency shopping actions (cart addition, quantity toggling, wishlist updates) provide instant feedback with rollback capabilities.

### 4. Zero-CLS Bi-Directional Localization

- Multi-locale routing powered by `next-intl` supports **English (LTR)** and **Arabic (RTL)**.
- Document-level dynamic direction handling (`dir="rtl" | "ltr"`).
- CSS Logical Properties (`margin-inline`, `padding-inline`, `inset-inline`) eliminate custom directional overrides and ensure zero Cumulative Layout Shift during locale switches.

### 5. 3D WebGL Architecture & GPU Performance

- **Zero-Hydration Penalty**: The 3D scene is decoupled using `next/dynamic` (`ssr: false`) and React `Suspense`, completely avoiding hydration overhead and keeping initial bundle sizes minimal.
- **Batched Instanced Rendering**: Ambient and side-burst particle effects (mini flowers, petals, hearts, gift boxes, sparks) are rendered via `THREE.InstancedMesh`, condensing hundreds of animated 3D geometries into single GPU draw calls.
- **Pointer Interaction & Responsiveness**: Features delta-damped cursor tracking (`THREE.MathUtils.damp`) for fluid camera and model tilt, paired with viewport-aware responsive scaling across mobile, tablet, and desktop displays.

---

## 🚀 Feature Matrix

### 🛒 Customer E-Commerce Engine

- **Interactive 3D Hero Experience**: Procedural Three.js / React Three Fiber centerpiece with floating rose bouquet, cursor tilt dynamics, soft ambient glows, and batched particle bursts.
- **Curated Collections**: Occasion-based and category-based dynamic discovery workflows.
- **Search & Filter Pipeline**: Debounced server-side search coupled with multi-attribute filtering.
- **Shopping Cart & Wishlist**: Persistent synchronized storage with real-time server reconciliations.
- **Multi-Step Checkout Pipeline**:
  - Interactive map pin-drop delivery locator using Leaflet.
  - Multi-address persistence with CRUD capabilities.
  - Dynamic promo code validation with instant price computation.
  - Granular delivery scheduling and payment orchestration.
- **Order Tracking & Receipts**: Real-time status pipeline with itemized order tracking.

### 📊 Administrative Telemetry & Operations

- **KPI Metrics Cards**: Gross order values, fulfillment efficiency rates, and active user metrics.
- **Data Visualizations**: Recharts-powered telemetry showing sales volume, revenue momentum, and status distributions.
- **User Profile & Security**: Account management, avatar processing, and credential workflows.

### 🛡️ Authentication & Verification

- NextAuth session orchestration with credential validation.
- OTP verification mechanism utilizing `input-otp`.
- International phone standard compliance via `react-phone-number-input`.
- Comprehensive client and server validation using `zod` schemas.

---

## 📂 Repository Topology

```
rose-app/
├── src/
│   ├── app/                      # Next.js App Router Root
│   │   └── [locale]/             # Localized routes (en, ar)
│   │       ├── (auth)/           # Authentication route groups
│   │       ├── (main)/           # Storefront, catalog, cart, checkout
│   │       ├── dashboard/        # Analytics & administration
│   │       ├── layout.tsx        # Base localized layout (sets lang & dir)
│   │       └── globals.css       # Tailwind CSS v4 design tokens
│   │
│   ├── features/                 # Domain-driven feature boundaries
│   │   ├── auth/                 # Authentication state, forms, & OTP logic
│   │   ├── cart/                 # Cart state, drawer, and mutations
│   │   ├── checkout/             # Stepper, address map (Leaflet), discounts
│   │   ├── dashboard/            # Analytics telemetry & management views
│   │   ├── home/                 # Landing view assemblies, 3D Three.js canvas & curated banners
│   │   ├── notifications/        # Web Push notification services
│   │   ├── orders/               # Purchase fulfillment & order history
│   │   ├── products/             # Product specifications, galleries, & cards
│   │   └── wishlist-page/        # Saved items & synchronization
│   │
│   ├── i18n/                     # Internationalization layer
│   │   ├── messages/             # Localized dictionary catalogs (en.json, ar.json)
│   │   └── routing.ts            # Locale definitions & routing constraints
│   │
│   └── shared/                   # Shared cross-domain primitives
│       ├── components/ui/        # Accessible UI primitives (@base-ui/react, Shadcn)
│       ├── context/              # Context providers
│       ├── hooks/                # Universal utility hooks
│       └── lib/                  # Centralized client configurations & utilities
```

---

## 🛠️ Technology Stack & Architectural Dependencies

| Layer                    | Technology                          | Architectural Rationale                                                                 |
| ------------------------ | ----------------------------------- | --------------------------------------------------------------------------------------- |
| **Framework**            | Next.js 16 (App Router)             | React Server Components, server actions, route handlers, and streaming                  |
| **Runtime**              | React 19                            | Enhanced concurrent capabilities, improved compiler support, and modern hooks           |
| **Language**             | TypeScript 5 (Strict)               | End-to-end static verification, discriminated unions, zero `any` policy                 |
| **Design System**        | Tailwind CSS v4 + Base UI           | High performance PostCSS engine, accessible unstyled primitives, zero CSS bloat         |
| **3D Graphics & WebGL**  | Three.js + React Three Fiber + Drei | Procedural 3D visuals, GPU InstancedMesh particles, and zero-SSR dynamic code splitting |
| **Server State**         | TanStack React Query v5             | Decoupled server state, automated cache invalidation, and optimistic mutations          |
| **Internationalization** | next-intl v4                        | First-class App Router localization with automated LTR/RTL document structuring         |
| **Forms & Schemas**      | React Hook Form + Zod               | Uncontrolled performant form inputs with single-source-of-truth type inference          |
| **Geospatial Mapping**   | Leaflet + React Leaflet             | Interactive, lightweight delivery location coordinate picking                           |
| **Telemetry & Charts**   | Recharts                            | Composable SVG analytics visualizations for administrative metrics                      |
| **Push & Notifications** | Web Push API + Sonner               | Reliable event dispatching and non-blocking toast messaging                             |

---

## ⚡ Quickstart & Local Setup

### System Prerequisites

- **Node.js**: v18.17+ or v20+ (LTS recommended)
- **Package Manager**: npm, pnpm, or yarn

### 1. Clone the repository

```bash
git clone https://github.com/sahermohamed979/Rose-App.git
cd Rose-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to inspect the application.

### 4. Build and validate production bundle

```bash
npm run build
npm run start
```

---

## 🧪 Quality Assurance & CI Guardrails

To prevent regressions and maintain senior engineering standards, strict static analysis and formatting pipelines are automated:

```bash
# Execute ESLint static analysis
npm run lint

# Check code formatting with Prettier
npx prettier --check .

# Auto-format files across project
npx prettier --write .
```

- **Git Hooks**: Pre-commit validation is automated through `husky` and `lint-staged`, guaranteeing that only formatted, lint-clean code can be committed.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
