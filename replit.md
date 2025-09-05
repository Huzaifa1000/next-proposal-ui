# ProposalAI - AI-Powered Proposal Writing Tool

## Project Overview
This is a Next.js application called "ProposalAI" that helps users transform RFPs (Request for Proposals) into winning proposals using AI-powered writing assistance. The application features a modern UI built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## Technical Stack
- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript
- **UI Framework**: React 19
- **Styling**: Tailwind CSS v4 with custom color tokens
- **UI Components**: shadcn/ui (Radix UI components)
- **Icons**: Lucide React
- **Fonts**: Geist Sans and Geist Mono
- **Theme**: Light/Dark mode support with next-themes

## Project Structure
- `/app` - Next.js App Router pages and layouts
  - `/dashboard` - Main dashboard with analytics, proposals, settings
  - `/login`, `/signup`, `/forgot-password` - Authentication pages
  - `/proposal/[id]` - Individual proposal viewer
- `/components` - Reusable React components
  - `/ui` - shadcn/ui components
- `/contexts` - React contexts (auth-context)
- `/hooks` - Custom React hooks
- `/lib` - Utility functions
- `/public` - Static assets

## Key Features
- AI-powered RFP analysis and proposal generation
- Smart pricing builder with industry benchmarks
- Team collaboration with real-time editing
- Proposal analytics and tracking
- Template library
- Modern responsive design

## Development Setup
- **Dependencies**: Installed with `npm install --legacy-peer-deps` (due to React 19 compatibility)
- **Dev Server**: Runs on port 5000 with `npm run dev -- --port 5000 --hostname 0.0.0.0`
- **Build**: `npm run build`
- **Production**: `npm start`

## Replit Configuration
- **Workflow**: Frontend Server configured for port 5000
- **Next.js Config**: Configured for Replit proxy environment with:
  - Cache-Control headers for development
  - allowedDevOrigins for cross-origin requests
  - Disabled ESLint and TypeScript build errors for faster development
- **Deployment**: Configured for autoscale deployment target

## Recent Changes (September 2025)
- Successfully imported from GitHub
- Installed dependencies with legacy peer deps to resolve React 19 compatibility
- Configured Next.js for Replit environment
- Set up development workflow on port 5000
- Configured deployment settings for production
- Added cache control headers for development
- Configured allowedDevOrigins for Replit proxy support

## User Preferences
- Modern UI with professional design
- AI-focused proposal writing tool
- Clean, component-based architecture
- TypeScript for type safety