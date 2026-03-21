# Frontend Interview Prep

A Next.js app for senior frontend interview preparation: **roadmap**, **coding practice with an in-browser IDE** (Monaco Editor + tests), **UI katas**, **system design**, **FEI-style Q&A**, and **AI practice** (OpenAI).

## Features

| Area | Route | Notes |
|------|--------|--------|
| **8-week roadmap** | `/` | Weekly plan, topics, links to resources |
| **Practice (IDE)** | `/practice` | Question bank from JSON; split view (description / solution + Monaco editor + run tests) |
| **Coding catalog** | `/coding` | Large problem list (local state) |
| **UI katas** | `/ui-katas` | Implementation prompts |
| **System design** | `/system-design` | Prompts & study notes |
| **From my interview** | `/fei-questions` | Curated Q&A + optional **Practice with AI** (needs `OPENAI_API_KEY`) |

### Practice IDE (`/practice`)

- **Monaco Editor** (VS Code engine): syntax highlighting, **IntelliSense / suggestions** while typing, formatting.
- **Automated tests** run in the browser via a small runner (`src/lib/runCode.ts`).
- **Progress** is stored in `localStorage` under `practice-completed-ids` until you move to Firebase.

### Data: JSON → Firebase (planned)

- Question bank: **`src/data/practice-questions.json`**
- Shape is defined in **`src/types/practice.ts`**
- Loader: **`src/lib/practiceQuestions.ts`** — replace `import practiceData from ...json` with a `fetch` to Firestore / your API when ready.
- Placeholder: **`src/lib/firebase.ts`** (Google Auth + Firestore sync TBD).

### Environment

```bash
cp .env.example .env.local
# Add OPENAI_API_KEY for /fei-questions "Practice with AI"
```

Never commit `.env.local`.

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Tech stack

- **Next.js 15** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS v4**
- **Monaco Editor** (`@monaco-editor/react`, `monaco-editor`)
- **OpenAI** (server route `src/app/api/interview/route.ts`)

## Project structure (high level)

```
src/
  app/
    layout.tsx              # Root layout + AppShell (sidebar)
    page.tsx                # Roadmap home
    practice/
      page.tsx              # Question list + filters
      [id]/page.tsx         # Single question + IDE
      components/
        CodePlayground.tsx  # Monaco (client, dynamic import)
        PracticeWorkspace.tsx
    fei-questions/          # Q&A + InterviewPanel
    api/interview/          # Streaming + non-streaming AI chat
  data/
    practice-questions.json # Replace with API/Firestore later
    fei-questions.ts
  lib/
    practiceQuestions.ts
    runCode.ts
    firebase.ts             # Stub
  types/
    practice.ts
```

## Deploy

Use a patched **Next.js** version (see Netlify/Vercel security advisories). Set env vars on the host; for AI features, add `OPENAI_API_KEY` to the deployment environment.

## Security note

Do **not** paste API tokens or keys into chat or commit them. Use host secrets / `.env.local` only.

## License

Private / personal use unless you add a license.
