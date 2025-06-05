# Patentomics Website

A modern website showcasing research on patent quality prediction using large language models and machine learning.

## About

This website presents research that applies ChatGPT embeddings and deep learning to predict patent application success and quality. The research achieves a 42% R-squared score in predicting patent value and demonstrates practical applications in innovation assessment and portfolio construction.

## Features

- **Research Overview**: Comprehensive presentation of methodology and findings
- **Key Metrics**: Interactive display of research results (42% R-squared, 6.6% annual returns, 10pp improvement)
- **Responsive Design**: Modern, mobile-friendly interface with dark mode support
- **Static Export**: Optimized for GitHub Pages deployment

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Fonts**: Geist (Vercel's font family)
- **Deployment**: Static export for GitHub Pages

## Development

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production (creates static export)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Build static export

## Deployment

The site is configured for automatic deployment to GitHub Pages:

1. Push changes to the main branch
2. GitHub Actions automatically builds and deploys the site
3. The site is available at your GitHub Pages URL

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
public/                      # Static assets
```

## Research

This website showcases research by Stephen Yang (Pace Academy) on using AI to understand innovation quality and success. The research demonstrates how large language models can be applied to patent analysis for improved innovation assessment.

## Contact

**Author**: Stephen Yang  
**Institution**: Pace Academy  
**Email**: stephen.yang25@paceacademy.org