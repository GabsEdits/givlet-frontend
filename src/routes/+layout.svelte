<script lang="ts">
	import '../app.css';
	import Header from '../components/Header.svelte';
	import { onDestroy } from 'svelte';


	let { children } = $props();
	let activeTab = $state('');

	// Update activeTab dynamically as the URL changes
	if (typeof window !== 'undefined') {
		const updateActiveTab = () => {
			const url = window.location.pathname;
			if (url === '/' || url === '') {
				activeTab = 'home';
			} else if (url === '/organizations') {
				activeTab = 'organizations';
			} else if (url === '/leaderboard') {
				activeTab = 'leaderboard';
			} else if (url === '/cart') {
				activeTab = 'cart';
			} else if (url === '/about') {
				activeTab = 'about';
			} else {
				activeTab = '';
			}
		};

		// Initial update
		updateActiveTab();

		// Listen for URL changes
		window.addEventListener('popstate', updateActiveTab);
		window.addEventListener('pushstate', updateActiveTab);
		window.addEventListener('replacestate', updateActiveTab);

		// Cleanup event listeners on component destroy
		onDestroy(() => {
			window.removeEventListener('popstate', updateActiveTab);
			window.removeEventListener('pushstate', updateActiveTab);
			window.removeEventListener('replacestate', updateActiveTab);
		});
	}
</script>

<Header {activeTab} />
<div class="py-16 px-20 bg-givlet-paper dark:bg-givlet-paper-900 rounded-4xl border border-white dark:border-white/10">
	{@render children()}
</div>
