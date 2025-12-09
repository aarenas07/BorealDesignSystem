# FAQ

**Q: How do I run Storybook for the UI Kit?**
A: From the repository root run `npx nx storybook ui-kit`. It will start on `http://localhost:6006`.

**Q: How do I add a new component?**
A: Create the component under `libs/ui-kit/src/lib/components/<component-name>`, add a Storybook story in `*.stories.ts`, write unit tests in `*.spec.ts`, and export it from `ui-kit.module.ts`.

**Q: How can I switch themes at runtime?**
A: Inject `ThemeService` and call `setTheme('sicof-dark')` or any registered theme name.

**Q: What are the prerequisites for contributing?**
A: Node.js >= 18, npm >= 9, and the Nx workspace already set up. Follow the contributing guide in `docs/contributing.md`.

**Q: How do I run unit tests for the UI Kit?**
A: Execute `npx nx test ui-kit`.

**Q: Where can I find the component API documentation?**
A: The `docs/components.md` file lists each component with a brief description and a link to its Storybook story.

---
> **Tip**: If you encounter missing icons, ensure the icon font is loaded in `storybook-styles.scss`.
