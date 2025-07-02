const guide_content = `# Welcome to Markdown Scratchpad! 👋

## Basic Syntax

**Bold Text** (\`**Bold Text**\`)

*Italic Text* (\`*Italic Text*\`)

~~Strikethrough~~ (\`~~Strikethrough~~\`)

## Headings

# H1
## H2
### H3

## Lists

- Unordered List Item 1
- Unordered List Item 2

1. Ordered List Item 1
2. Ordered List Item 2

## Links and Images

[SvelteKit Docs](https://svelte.dev/docs/kit/introduction)

![Svelte Logo](https://svelte.dev/svelte-logo.svg)

## Code

Inline \`code\` looks like this.

\`\`\`javascript
// Code block
function greet() {
  console.log("Hello, world!");
}
\`\`\`
`;

/** @type {import('./$types').PageServerLoad} */
export function load() {
  return {
    initial_content: guide_content,
  };
}
