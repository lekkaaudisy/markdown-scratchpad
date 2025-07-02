<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import './styles.css';
	import Modal from '$lib/Modal.svelte';

	let { data } = $props();

	let copy_button_text = $state('Copy Markdown');
	let show_reset_modal = $state(false);
	let markdown_content = $state(data.initial_content);
	let theme = $state('dark');

	let html_output = $derived(marked.parse(markdown_content));
	let has_unsaved_changes = $derived(markdown_content !== data.initial_content);

	onMount(() => {
		const saved_theme = localStorage.getItem('theme');
		if (saved_theme) {
			theme = saved_theme;
		} else {
			const prefers_light = window.matchMedia('(prefers-color-scheme: light)').matches;
			theme = prefers_light ? 'light' : 'dark';
		}
	});

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.className = theme;
			localStorage.setItem('theme', theme);
		}
	});

	function toggle_theme() {
		theme = theme === 'light' ? 'dark' : 'light';
	}

	function open_reset_modal() {
		show_reset_modal = true;
	}

	function close_reset_modal() {
		show_reset_modal = false;
	}

	function confirm_reset() {
		markdown_content = data.initial_content;
		close_reset_modal();
	}

	function copy_markdown() {
		navigator.clipboard?.writeText(markdown_content).then(() => {
			copy_button_text = 'Copied!';
			setTimeout(() => (copy_button_text = 'Copy Markdown'), 2000);
		});
	}
</script>

<svelte:head>
	<title>Markdown Scratchpad</title>
</svelte:head>

<div class="editor-layout">
	<div class="pane">
		<div class="pane-header">
			<h3>Markdown</h3>
			<div class="actions">
				<button type="button" onclick={copy_markdown}>
					{copy_button_text}
				</button>
				{#if has_unsaved_changes}
					<button type="button" class="secondary" onclick={open_reset_modal}>Reset</button>
				{/if}
			</div>
		</div>
		<textarea bind:value={markdown_content} placeholder="Start writing..."></textarea>
	</div>

	<div class="pane preview">
		<div class="pane-header">
			<h3>Preview</h3>
			<div class="actions">
				<button class="icon-button" onclick={toggle_theme} aria-label="Toggle theme">
					{#if theme === 'light'}
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
					{/if}
				</button>
				<a
					class="icon-button"
					href="https://github.com/lekkaaudisy/markdown-scratchpad"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="View source on GitHub"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
				</a>
			</div>
		</div>
		<div class="preview-content">
			{@html html_output}
		</div>
	</div>
</div>

{#if show_reset_modal}
	<Modal onclose={close_reset_modal}>
		<div class="confirm-dialog">
			<h2>Confirm Reset</h2>
			<p>Are you sure? All of your unsaved changes will be lost.</p>
			<div class="modal-actions">
				<button class="secondary" onclick={close_reset_modal}>Cancel</button>
				<button onclick={confirm_reset}>OK, Reset</button>
			</div>
		</div>
	</Modal>
{/if}

<style>
	.preview-content :global(h1),
	.preview-content :global(h2),
	.preview-content :global(h3) {
		color: var(--accent-color);
		border-bottom: 1px solid var(--border-color);
		padding-bottom: 0.3em;
		margin-top: 2em;
	}

	.preview-content :global(p) {
		line-height: 1.7;
	}

	.preview-content :global(a) {
		color: var(--accent-color);
		text-decoration: none;
	}
	.preview-content :global(a:hover) {
		text-decoration: underline;
	}

	.preview-content :global(code) {
		background-color: var(--bg-secondary);
		padding: 0.2em 0.4em;
		border-radius: 4px;
		font-family: var(--font-mono);
		font-size: 0.9em;
	}

	.preview-content :global(pre) {
		background-color: var(--bg-secondary);
		padding: 1rem;
		border-radius: 6px;
		overflow-x: auto;
		border: 1px solid var(--border-color);
	}

	.preview-content :global(pre) > :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.preview-content :global(blockquote) {
		margin-left: 0;
		padding-left: 1em;
		border-left: 4px solid var(--border-color);
		color: var(--text-secondary);
	}

	.preview-content :global(ul),
	.preview-content :global(ol) {
		padding-left: 2em;
	}

		.confirm-dialog h2 {
		margin-top: 0;
		color: var(--text-primary);
	}
	.confirm-dialog p {
		margin: 1rem 0 2rem;
		color: var(--text-secondary);
	}
	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}

	.icon-button {
		display: flex;
		padding: 0.4em;
		background: none;
		color: var(--text-secondary);
	}
	.icon-button:hover {
		color: var(--text-primary);
	}
</style>
