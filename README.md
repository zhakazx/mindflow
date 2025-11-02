# Mindflow

A visual journal application that transforms your thoughts into an interactive bubble canvas. Built with React, TypeScript, and Vite for a modern, responsive experience.

## Features

- **Visual Thought Management**: Capture and organize thoughts as animated bubbles on an interactive canvas
- **Tagging System**: Categorize thoughts with custom tags for better organization
- **Local Storage**: All thoughts are saved locally in your browser
- **Responsive Design**: Clean, modern interface built with Tailwind CSS
- **Interactive Canvas**: Click on bubbles to view, edit, or delete thoughts

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React hooks with localStorage persistence

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mindflow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build

## Usage

1. **Adding Thoughts**: Click the + button in the bottom-right corner to add a new thought
2. **Viewing Thoughts**: Click on any bubble to view its full content and details
3. **Organizing**: Use tags to categorize and organize your thoughts
4. **Deleting**: Remove unwanted thoughts through the view modal

## Project Structure

```
src/
├── components/          # React components
│   ├── AddThoughtModal.tsx
│   ├── BubbleCanvas.tsx
│   └── ViewThoughtModal.tsx
├── hooks/              # Custom React hooks
│   ├── useCanvasAnimation.ts
│   └── useLocalStorage.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── bubbleUtils.ts
├── MindflowJournal.tsx # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Development

This project uses ESLint for code linting and TypeScript for type safety. The codebase follows modern React patterns with functional components and hooks.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
