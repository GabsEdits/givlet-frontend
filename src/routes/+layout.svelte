<script lang="ts">
	import '../app.css';
	import Header from '../components/Header.svelte';

	let { children } = $props();
</script>

<Header />
<div class="py-16 px-20 bg-givlet-paper rounded-4xl border border-white">
	{@render children()}
</div>
