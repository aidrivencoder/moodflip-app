# MoodFlip

MoodFlip is a web application built with Svelte and Vite that helps users reframe negative situations into more positive perspectives. The app provides a simple interface where users can:

1. Input a challenging situation
2. Receive AI-generated alternative viewpoints
3. Share their reframed perspectives
4. View their history of mood flips

## Development Journey

This project has been developed entirely using browser-based development environments:

1. Started with [bolt.new](https://bolt.new) for initial setup and development
2. Continued development using [StackBlitz](https://stackblitz.com)
3. Currently using GitHub Codespaces for ongoing development

This demonstrates the power of modern cloud development environments, allowing full-featured development work directly in the browser without any local setup.

## Tech Stack

- **Frontend Framework**: Svelte
- **Build Tool**: Vite
- **Styling**: CSS with component-scoped styles
- **Development**: Browser-based IDEs (bolt.new, StackBlitz, GitHub Codespaces)

## Key Features

- **Situation Input**: Users can describe challenging situations they want to reframe
- **Response Cards**: Displays AI-generated alternative perspectives
- **Share Functionality**: Easy sharing of reframed situations
- **History Tracking**: View past mood flips and their reframes

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── FlipHistory.svelte
│   │   ├── ResponseCard.svelte
│   │   ├── ShareButtons.svelte
│   │   └── SituationInput.svelte
│   ├── styles/
│   │   └── MoodFlip.css
│   ├── Counter.svelte
│   └── MoodFlip.svelte
├── App.svelte
└── main.js
```
