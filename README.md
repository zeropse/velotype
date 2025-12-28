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

## Project Structure

```
src/ – application source code
├── pages/ – route-level pages (Home, About, History, NotFound)
├── components/ – shared UI and feature components
├── layout/ – layout and navigation
├── lib/ – utilities, language and words helpers, history logic
└── style/ – global styles and theme handling
public/ – static assets and word list JSON files
```

## Scripts

- `pnpm dev` – start development server
- `pnpm build` – build for production
- `pnpm preview` – preview production build
- `pnpm lint` – run ESLint

## License

This project is licensed under the [MIT LICENSE](LICENSE).
