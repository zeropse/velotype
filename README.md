# Velotype

Velotype is a typing practice web app built with React and Vite. It supports multiple word lists, tracks your stats over time, and provides a clean, themeable interface.

## Tech Stack

- React 19
- Vite 7
- React Router
- Tailwind CSS
- ShadCN UI

## Getting Started

### Prerequisites

- Node.js
- pnpm, npm, or yarn installed globally

### Install Dependencies

Using pnpm (recommended):

```bash
pnpm install
```

Using npm:

```bash
npm install
```

### Run the Dev Server

```bash
pnpm dev
```

Then open the URL printed in the terminal.

### Build for Production

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Project Structure

- [src](src) – application source code
  - [pages](src/pages) – route-level pages (Home, About, History, NotFound)
  - [components](src/components) – shared UI and feature components
  - [layout](src/layout) – layout and navigation
  - [lib](src/lib) – utilities, language and words helpers, history logic
  - [style](src/style) – global styles and theme handling
- [public](public) – static assets and word list JSON files

## Scripts

Defined in [package.json](package.json):

- `pnpm dev` – start development server
- `pnpm build` – build for production
- `pnpm preview` – preview production build
- `pnpm lint` – run ESLint

## License

This project is licensed under the terms described in [LICENSE](LICENSE).
