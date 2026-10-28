# Habitly — Modern Habit Tracker & Landing Page

> A clean, accessible, and responsive habit tracking web application built with React and Tailwind CSS. Built for the Frontend Developer Assignment.

---

## 🚀 Quick Setup & Run Instructions

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# The app runs locally at http://localhost:5173

# 3. Production build (tested & zero errors)
npm run build

# 4. Preview production build
npm run preview
```

---

## 🎨 Design Choices & Rationale

| Dimension | Decision | UX / Design Justification |
| :--- | :--- | :--- |
| **Color Palette** | **Emerald & Teal** (`#10B981`, `#059669`) with **Amber** streaks & **Indigo** accents | In behavioral psychology, green is tied to natural growth, self-improvement, and accomplishment without triggering anxiety or high cortisol. Amber represents the warm "spark" of streak momentum, while deep slate neutrals maintain strict **WCAG 2.1 AA** contrast ratios in both light and dark modes. |
| **Typography** | **Plus Jakarta Sans** (Logo & Display) + **Inter** (Dashboard UI) | **Plus Jakarta Sans (ExtraBold 800)** provides a confident, modern startup brand identity for the logo, while **Inter** delivers exceptional legibility, generous x-height, and neutral optical rhythm across dense habit metrics and interactive controls. |
| **Spacing & Radius** | **8pt Grid** (`rounded-xl` 12px, `rounded-2xl` 16px, `rounded-3xl` 24px) | Strict 8pt grid scale ensures proportional breathing room across screen sizes. Soft curves evoke a welcoming, human, and forgiving atmosphere rather than an intimidating, cold enterprise dashboard. |
| **Visual Hierarchy** | **Z-Pattern Landing & F-Pattern Dashboard** | High-contrast hero headline with a single unambiguous CTA button, supported by contextual category color-coding and primary/secondary button states with distinct visual weights. |

---

## 💡 What UX Problem Did You Notice and Fix?

> *"Traditional habit apps interrupt users with abrasive confirmation modal dialogs upon deletion and create a 'dopamine gap' by making check-offs feel like uninspiring database edits. In Habitly, I replaced disruptive deletion confirmation popups with an instant-delete flow backed by a non-blocking 5-second countdown Undo toast, reducing friction while guaranteeing full recovery safety. Furthermore, I engineered instantaneous optimistic check-offs paired with micro-celebration particle bursts and streak increments, transforming habit maintenance from a mundane chore into an intrinsically rewarding daily win."*

---

## ✨ Features Implemented

### Part 1: Landing Page
- **Navigation Header**: Responsive navbar with logo, smooth-scroll links, dark/light mode toggle, and "Open Habit Tracker" CTA.
- **Hero Section**: Value-driven headline, subtext, high-conversion primary CTA, and an **interactive preview card** allowing visitors to test habit check-off directly on the hero!
- **3 Core Features**: "Gentle Streak Engine", "Instant 1-Click Checkoff & Safe Undo", and "Smart Categories & Search Matrix".
- **Social Proof / Testimonials**: 3 authentic user review cards with 5-star ratings, avatars, and role tags.
- **Pricing Matrix**: 3 transparent tiers (Free Starter, Habit Pro, Lifetime) with an interactive **Monthly / Annual toggle** featuring a "Save 28%" highlight.
- **Accessible Footer**: Full navigation, accessibility credentials, and a keyboard shortcut quick reference.

### Part 2: "My Habits" Dashboard
- **Local Data Engine**: Seeded from `initialHabits.json` and persisted in `localStorage`.
- **Search & Multi-Filters**:
  - Instant text search across habit titles and intention cues with `Ctrl+K` shortcut.
  - Category tabs (All, Health, Fitness, Productivity, Mindfulness, Learning).
  - Status toggle (All, Pending Today, Completed Today).
  - Frequency toggle (All, Daily, Weekly).
- **Sorting**: By highest streak, alphabetical (A–Z / Z–A), or newest created.
- **Add Habit Form with Inline Validation**:
  - Accessible modal dialog (focus trap, `Escape` key close, auto-focus first input).
  - Real-time and on-submit inline validation with clear error messages, `aria-invalid`, and `aria-describedby`.
- **Instant Check-off**:
  - Optimistic update, streak increment, animated progress bar updates, and confetti micro-celebration.
- **Delete with 5-Second Undo**:
  - Deleting shows a non-blocking toast with a visual countdown timer and an "Undo" action to restore the habit to its exact position.

### 5 Mandatory UX States (Built & Reviewer-Ready)
1. 🦴 **Skeleton Loading**: Realistic shimmering card skeletons (not just a spinner) matching actual card dimensions.
2. 🌿 **Empty State**: Friendly graphic, supportive copy, and an immediate "Create Your First Habit" CTA.
3. 🔍 **No Results State**: Shows when search/filters return 0 results with an instant "Reset All Filters" button.
4. ⚠️ **Error State**: Simulates server failure (503 Service Unavailable) with an accessible "Retry Connection" recovery.
5. 🔔 **Success Feedback**: Accessible toast notifications (`role="status"`, `aria-live="polite"`) for creating, completing, deleting, and undoing habits.

> 🛠️ **Reviewer State Toolbar**: A dedicated test bar at the top of the "My Habits" screen allows reviewers to trigger **Simulate Loading**, **Simulate Error**, **Trigger Empty State**, and **Reset Sample Data** with a single click.

---

## 🎁 Bonus Features Included
- 🌓 **Dark Mode**: High-contrast, custom dark theme with system preference auto-detection and persistent storage.
- 📅 **7-Day Weekly Progress Matrix**: Interactive dot row (Mon–Sun) showing completion consistency for each habit.
- ⚡ **Reduced Motion Support**: Fully respects `@media (prefers-reduced-motion: reduce)`.
- ⌨️ **100% Keyboard Accessible**:
  - `Tab` / `Shift+Tab` across all cards, buttons, and form inputs.
  - `Space` / `Enter` to check off habits or trigger actions.
  - `Escape` to close modal dialogs.
  - `Ctrl+K` (or `Cmd+K`) to jump directly to search.
  - High-contrast visible focus rings (`focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2`).

---

## 🛠️ Tech Stack & Rules Compliance
- **React 18** (Functional components, custom hooks, context API).
- **Tailwind CSS** (Utility CSS only — **NO pre-built UI kits like Material UI or Bootstrap** were used).
- **Lucide React** (Clean, accessible SVG iconography).
- **Canvas-Confetti** (Lightweight micro-celebration feedback).
- **Vite** (Lightning-fast development and build pipeline).

