# GEMINI.md

This file provides instructional context about the `pishop-frontend` project for Large Language Models (LLMs) like Gemini.

## Project Overview

`pishop-frontend` is a modern, high-performance e-commerce storefront built with Next.js and Payload CMS. It serves as the frontend for the PiShop e-commerce platform. The project is designed to be highly configurable and extensible, with a focus on performance and user experience.

### Key Technologies

*   **Framework:** [Next.js](https://nextjs.org/) (with App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **CMS:** [Payload CMS](https://payloadcms.com/) (integrated)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Package Manager:** [pnpm](https://pnpm.io/)
*   **Containerization:** [Docker](https://www.docker.com/)
*   **Deployment:** [Kubernetes](https://kubernetes.io/)

### Architecture

The project follows a standard Next.js project structure.

*   `app/`: Contains the Next.js App Router pages and layouts.
*   `src/`: Contains the source code for the application, including Payload CMS configuration, collections, components, and utilities.
*   `src/collections/`: Defines the data models (collections) for Payload CMS.
*   `src/components/`: Contains reusable React components.
*   `src/payload.config.ts`: The main configuration file for Payload CMS.
*   `public/`: Contains static assets like images and fonts.

## Building and Running

### Prerequisites

*   Node.js 22.x or later
*   pnpm
*   Docker (for containerized development and deployment)

### Development

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```

2.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

### Production

1.  **Build the application:**
    ```bash
    pnpm build
    ```

2.  **Start the production server:**
    ```bash
    pnpm start
    ```

### Other Commands

*   **Linting:**
    ```bash
    pnpm lint
    ```

*   **Generate Payload Types:**
    ```bash
    pnpm payload
    ```

## Development Conventions

### Code Style

*   The project uses [Prettier](https://prettier.io/) for code formatting and [ESLint](https://eslint.org/) for linting.
*   Configuration files: `.prettierrc.json`, `eslint.config.mjs`.
*   Run `pnpm lint` to check for and fix linting issues.

### Commit Messages

*   This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Environment Variables

*   Environment variables are managed using `.env` files.
*   A `.env.example` file is provided as a template. Copy it to `.env.local` for local development.
