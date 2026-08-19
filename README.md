# Student Services Portal

## Project Description

A TypeScript-based web application for managing university student services. This project demonstrates professional development practices including TypeScript with strong typing, Git version control, and AI-assisted development. It serves as the foundation for a larger University Student Services Portal system.

## Requirements

- Node.js (v18 or higher)
- npm (v8 or higher)
- Git (v2.30 or higher)
- TypeScript (v5.x)
- A GitHub account

## Development Environment

The following software versions were verified during the laboratory:

| Tool | Version |
|------|---------|
| Git | 2.47.0.windows.2 |
| Node.js | v24.14.0 |
| npm | 11.9.0 |
| TypeScript | 5.7.2 |
| pnpm | Not installed (npm used instead) |
| ESLint | 8.57.1 |
| Prettier | 3.9.6 |

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/SafeWorm59/student-services-portal.git
   ```

2. Navigate to the project directory:
   ```bash
   cd student-services-portal
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. (Optional) Install TypeScript globally:
   ```bash
   npm install -g typescript
   ```

## How to Run the Project

1. Compile the TypeScript code:
   ```bash
   npm run build
   ```
   This compiles `src/index.ts` into JavaScript in the `dist/` directory.

2. Run the compiled output:
   ```bash
   npm start
   ```
   Or run both steps in sequence:
   ```bash
   npm run dev
   ```

## How to Run Linting

```bash
npm run lint
```

This runs ESLint with TypeScript support across all `.ts` files. If you want to automatically fix fixable issues, run:

```bash
npm run lint:fix
```

## How to Format Code

To format all files:
```bash
npm run format
```

To check formatting without making changes:
```bash
npm run format:check
```

## Development Workflow

This project follows a professional Git/GitHub collaboration workflow:

1. **Clone** the repository to your local machine.
2. **Create a feature branch** for any new work:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Develop** your feature with frequent, meaningful commits.
4. **Run linting and formatting** before committing:
   ```bash
   npm run lint && npm run format
   ```
5. **Commit** with a clear, conventional commit message (e.g., `feat: add student status formatter`).
6. **Push** your branch to GitHub:
   ```bash
   git push -u origin feature/your-feature-name
   ```
7. **Open a Pull Request** on GitHub, linking the relevant Issue.
8. **Request a code review** from a teammate or instructor.
9. **Address review feedback** by updating the branch (additional commits are auto-included in the PR).
10. **Merge** the PR after approval, then delete the feature branch.

Current branches:
- `master` — the main production branch
- `feature/student-status` — the active feature branch (status formatter)

## AI Usage Policy

AI tools (specifically ChatGPT) may be used to assist development. All AI-generated code must be:

1. **Reviewed** — Every AI suggestion must be read and understood before use.
2. **Modified when necessary** — Adjust the AI's output to match project conventions, type-safety requirements, and security practices.
3. **Tested** — Run TypeScript compilation, linting, formatting, and manual tests to verify correctness.
4. **Verified** — Cross-reference unfamiliar syntax or APIs with official documentation.
5. **Committed responsibly** — Only commit code that has been thoroughly reviewed and validated.

The student must be able to explain and justify every line of AI-generated code that is committed. See `AI-REVIEW.md` for the AI review form and `VERIFICATION.md` for documentation verification records.

---

## Technical Notes

### Why a Generic `ApiResponse<T>` Is Preferable to `data: any`

The lab uses a generic interface:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
}
```

This is used as `ApiResponse<Student>` and `ApiResponse<Student[]>`.

A non-generic alternative would be:

```typescript
interface ApiResponse {
  success: boolean;
  data: any;
}
```

The generic version is preferable because:

1. **Type safety at compile time** — With generics, TypeScript checks that `data` matches the expected type. With `any`, the compiler disables all checking on `data`, allowing type errors to slip through. For example, `ApiResponse<Student>` would catch an accidental `data: number` at compile time, while `ApiResponse` with `data: any` would not.
2. **IDE support** — Autocompletion, inline documentation, and refactoring tools work correctly with generics but are lost with `any`.
3. **Self-documenting code** — The generic `<T>` makes the contract explicit: a caller knows exactly what type of data to expect.
4. **Future-proofing** — As the codebase grows, generics compose naturally (e.g., `ApiResponse<Student[]>`, `ApiResponse<Course>`). Replacing `any` with `unknown` plus runtime validation everywhere would be more verbose.

In this project, the `@typescript-eslint/no-explicit-any` rule is set to `"error"`, so using `any` would fail linting.

### Why TypeScript Interfaces Alone Cannot Guarantee External Data Validity

The `Student` interface defines the shape of a student object at compile time:

```typescript
interface Student {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}
```

However, TypeScript interfaces are **erased at runtime** — they exist only in the source code and are not present in the compiled JavaScript. When data comes from an external source (e.g., an API response, a JSON file, or user input), TypeScript has no way to validate it. The `validateStudent` function in this project accepts `unknown` and performs runtime checks on each field (`typeof obj.id !== 'number'`, `obj.status !== 'active' && obj.status !== 'inactive'`, etc.) before returning a typed `Student` object. Without this runtime validation, an API could return `{ id: '1', name: 42, status: 'pending' }` and TypeScript would happily assign it to a `Student` variable, causing bugs at runtime.

### `.gitignore` Pattern Explanations

| Pattern | Reason |
|---------|--------|
| `node_modules/` | External dependencies installed by npm — can be reinstalled from package.json, should never be committed |
| `dist/` | Compiled JavaScript output — generated from TypeScript source, can be rebuilt with `npm run build` |
| `.env` | Environment-specific secrets (API keys, database credentials) — must never be committed to version control |
| `*.log` | Log files generated by the application — contain no source code, can be regenerated |
| `*.tsbuildinfo` | TypeScript incremental compilation cache — can be safely regenerated |
| `.env.local`, `.env.production` | Variant environment files that may contain secrets |
| `.vscode/`, `.idea/` | Editor-specific configuration — personal IDE settings, not project-portable |
| `*.swp`, `*.swo`, `*~` | Vim/Emacs temporary swap files — editor artifacts not part of the project |
| `.DS_Store` | macOS folder metadata — OS-specific, not relevant to the project |
| `build/`, `coverage/` | Additional build outputs and test coverage reports |
| `logs/` | Directory for structured log files |
| `package-lock.json`, `yarn.lock` | Lock files — excluded here to avoid platform-specific conflicts, though this is a project decision |
