# Star Wars Planet Explorer

## Overview

This project is a web application that allows users to explore planets from the Star Wars universe. It utilizes the [SWAPI](https://swapi.dev/) (Star Wars API) to fetch and display information about various planets.

## Features

- Paginated list of Star Wars planets
- Search functionality to find specific planets
- Detailed view of individual planets
- Responsive design for mobile and desktop
- Server-side rendering for improved performance and SEO

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS
- [Jest](https://jestjs.io/) - JavaScript testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing utilities for React
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions) - Next.js feature for handling form submissions and data mutations

## Getting Started

1. Clone the repository:
   git clone https://github.com/your-username/star-wars-planet-explorer.git

2. Install dependencies:
   pnpm install

3. Start the development server:
   pnpm dev

4. Open your browser and navigate to http://localhost:3000

## Running Tests

To run the test suite:
pnpm test

## Project Structure
- `src/` - Source code directory
  - `app/` - Next.js app router pages and layouts
  - `components/` - React components
    - `ui/` - UI components (button, card, carousel, etc.)
  - `lib/` - Utility functions and helpers
  - `server/` - Server-side logic and API calls
  - `types/` - TypeScript type definitions
- `public/` - Static files
