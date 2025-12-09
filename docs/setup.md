# Setup Guide

## Installation
```bash
# From the root of the monorepo
npm install
```

## Adding the UI Kit to a project
```typescript
import { UiKitModule } from '@boreal/ui-kit';
@NgModule({
  imports: [UiKitModule],
})
export class AppModule {}
```

## Development Commands
- **Build**: `npx nx build ui-kit`
- **Test**: `npx nx test ui-kit`
- **Storybook**: `npx nx storybook ui-kit` (runs on http://localhost:6006)

## Prerequisites
- Node.js >= 18
- npm >= 9
- Nx workspace already set up (already present in this repo)
