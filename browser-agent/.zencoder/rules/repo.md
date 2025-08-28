---
description: Repository Information Overview
alwaysApply: true
---

# Browser Agent Information

## Summary
A Next.js project that implements a browser agent capable of automating web browsing tasks. The agent uses OpenAI's agent framework and Playwright to control a browser, navigate websites, interact with elements, and extract information from web pages.

## Structure
- **src/app**: Next.js application files including API routes and frontend components
- **src/lib**: Core functionality including browser automation tools and user context
- **src/types**: TypeScript type definitions
- **public**: Static assets for the Next.js application

## Language & Runtime
**Language**: JavaScript
**Version**: ES6+
**Framework**: Next.js 15.5.2
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- @openai/agents: ^0.0.17 - OpenAI's agent framework
- @surfly/d2snap: GitHub package for DOM snapshots
- playwright: ^1.55.0 - Browser automation library
- next: 15.5.2 - React framework
- react: 19.1.0 - UI library
- jsdom: ^26.1.0 - DOM implementation for Node.js
- zod: ^3.25.76 - Schema validation library

**Development Dependencies**:
- eslint: ^9 - Code linting
- tailwindcss: ^4 - Utility-first CSS framework
- @tailwindcss/postcss: ^4 - PostCSS plugin for Tailwind

## Build & Installation
```bash
npm install
npm run dev    # Development server
npm run build  # Production build
npm start      # Start production server
```

## Browser Automation
**Core Technology**: Playwright (Chromium)
**Browser Control**: Headless mode disabled for visual feedback
**Key Features**:
- DOM snapshot extraction
- Element interaction (click, fill)
- Navigation
- Visual highlighting of elements during interaction
- Scrolling control
- Typing simulation with configurable delay

## API
**Main Endpoint**: `/api/browser-agent`
**Method**: POST
**Request Format**: JSON with `query` field containing user instructions
**Agent Configuration**:
- Max turns: 30
- Tools: Browser initialization, navigation, DOM extraction, element interaction

## User Context
**Implementation**: Predefined user profile in `src/lib/userContext.js`
**Data Categories**:
- Personal information
- Skills and projects
- Work experience
- Education
- Job preferences
- Additional information
- Social links

## Testing
**Framework**: Not explicitly defined
**Test Location**: `/api/test` and `/api/test-agent` endpoints
```