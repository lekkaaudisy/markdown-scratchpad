<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	let { children, onclose }: { children: Snippet; onclose: () => void } = $props();

	let modal_element: HTMLDivElement;

	onMount(() => {
		function handle_keydown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				onclose();
			}
		}

		window.addEventListener('keydown', handle_keydown);

		modal_element.focus();

		return () => {
			window.removeEventListener('keydown', handle_keydown);
		};
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="overlay" onclick={onclose}>
	<div
		class="modal"
		role="dialog"
		aria-modal="true"
		bind:this={modal_element}
		tabindex="-1"
		onclick={(event) => event.stopPropagation()}
	>
		{@render children()}
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal {
		background: var(--bg-secondary);
		padding: 2rem;
		border-radius: 8px;
		max-width: 400px;
		width: 90%;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
		border: 1px solid var(--border-color);
	}

	.modal:focus {
		outline: 2px solid var(--accent-color);
		outline-offset: 2px;
	}
</style>