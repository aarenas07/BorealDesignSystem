# Contributing Guide

We welcome contributions to the **Boreal Design System** UI Kit. Follow these steps to get started.

## Prerequisites
- Node.js >= 18
- npm >= 9
- Nx workspace (already present in this repo)

## Fork & Clone
1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/BorealDesignSystem.git
   cd BorealDesignSystem
   ```

## Install Dependencies
```bash
npm install
```

## Development Workflow
1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Run the UI Kit in isolation**:
   ```bash
   npx nx serve ui-kit
   ```
   This will start Storybook for rapid UI feedback.
3. **Add or modify components** under `libs/ui-kit/src/lib/components`.
4. **Write unit tests** in `*.spec.ts` files alongside the component.
5. **Add Storybook stories** in `*.stories.ts`.
6. **Run tests**:
   ```bash
   npx nx test ui-kit
   ```
7. **Lint**:
   ```bash
   npx nx lint ui-kit
   ```
8. **Commit** your changes with clear messages.
9. **Push** and open a Pull Request.

## Pull Request Checklist
- [ ] Code follows the project's linting rules.
- [ ] Unit tests added and all pass.
- [ ] Storybook stories added/updated.
- [ ] Documentation updated (README, component docs, etc.).
- [ ] Changelog entry added if applicable.

## Code Style
- Use **Angular Standalone Components** where possible.
- Prefer **SCSS** for styling, leveraging the existing theme variables.
- Keep component APIs small and well‑typed.
- Write **clear JSDoc** comments for public inputs/outputs.

---
> **Tip**: Run `npx nx affected:test` to ensure changes don’t break other parts of the monorepo.
