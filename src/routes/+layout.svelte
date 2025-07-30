<script lang="ts">
	import '../app.css';
	import Header from '../components/Header.svelte';

	let { children } = $props();
	let activeTab = $state(String);

	// Determine activeTab based on the current URL
	let url: string;
	if (typeof window !== 'undefined') {
		url = window.location.pathname;
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
	} else {
		activeTab = '';
	}
</script>

<Header {activeTab} />
<div class="py-16 px-20 bg-givlet-paper rounded-4xl border border-white">
	{@render children()}
</div>
