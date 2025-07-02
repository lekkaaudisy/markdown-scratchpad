# 📝 Markdown Scratchpad

A clean, modern, and responsive live markdown editor built with **Svelte 5** and **SvelteKit**. This is a client-focused tool designed for quickly writing and previewing markdown without any distractions.

This very README was drafted and previewed using the Markdown Scratchpad itself!

## ✨ Features

- **Live Preview**: See your rendered HTML update instantly as you type.
- **Modern Dark/Light Theme**: Automatically detects your system preference and saves your choice in `localStorage`.
- **Responsive Design**: Works beautifully on desktop and mobile devices with a clean, stacked layout for smaller screens.
- **Copy Markdown**: A one-click button to copy your markdown source to the clipboard.
- **Reset to Default**: Quickly revert your changes back to the original guide text with a confirmation modal.
- **Client-Side Focused**: Built for speed, with all primary interactions happening instantly in the browser.
- **Zero Dependencies**: After the initial page load, no further server communication is needed.

## 🚀 Built With

- **Framework**: [SvelteKit](https://svelte.dev)
- **UI & Reactivity**: [Svelte 5 (Runes)](https://svelte.dev/blog/runes)
- **Markdown Parsing**: [Marked.js](https://marked.js.org/)

## 🔧 Getting Started

Want to run this project locally? Follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/lekkaaudisy/markdown-scratchpad.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd markdown-scratchpad
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

## 🏛️ Acknowledgements

- **Favicon Icon**: The application icon is from the wonderful [Matthew Abrahams](https://github.com/rrajra), part of the [Homarr Dashboard Icons](https://github.com/homarr-labs/dashboard-icons) collection.
