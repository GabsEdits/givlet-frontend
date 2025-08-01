<script lang="ts">
	import Header from '../components/Header.svelte';
	let { activeTab, children } = $props();
</script>

<Header {activeTab} />

<div
	class="py-8 md:py-16 px-5 md:px-20 bg-givlet-paper dark:bg-givlet-paper-900 rounded-4xl border border-white dark:border-white/10"
>
	{@render children()}
</div>
