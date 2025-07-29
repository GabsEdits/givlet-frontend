<script lang="ts">
	import { onMount } from 'svelte';
	import { generateRandomUser, getUserFromCookie, saveUserToCookie } from '$lib/user';
	import Icon from '@iconify/svelte';

	let user: { name: string; streak: number; profilePicture: string; lastLogin: string } | null =
		null;
	let isDropdownOpen = false;
	let searchQuery = '';
	let isSearchOpen = false;

	onMount(() => {
		const cookieString = document.cookie;
		const cookieUser = getUserFromCookie(cookieString);

		if (
			cookieUser &&
			typeof cookieUser === 'object' &&
			'name' in cookieUser &&
			'streak' in cookieUser &&
			'profilePicture' in cookieUser &&
			'lastLogin' in cookieUser &&
			typeof cookieUser.name === 'string' &&
			typeof cookieUser.streak === 'number' &&
			typeof cookieUser.profilePicture === 'string' &&
			typeof cookieUser.lastLogin === 'string'
		) {
			user = cookieUser;
			const today = new Date().toISOString().split('T')[0];
			if (user.lastLogin !== today) {
				user.streak += 1;
				user.lastLogin = today;
				saveUserToCookie(user, (cookie) => {
					document.cookie = cookie;
				});
			}
		} else {
			user = generateRandomUser();
			user.lastLogin = new Date().toISOString().split('T')[0];
			saveUserToCookie(user, (cookie) => {
				document.cookie = cookie;
			});
		}
	});

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	function toggleSearch() {
		isSearchOpen = !isSearchOpen;
	}

	function handleSearch(event: Event) {
		const target = event.target as HTMLInputElement;
		searchQuery = target.value;
		// Implement search logic here
	}
</script>

<div class="flex justify-center mb-12 items-center">
	<div
		class="flex items-center justify-center gap-8 bg-givlet-paper backdrop-blur-md px-8 py-2 rounded-2xl border border-white"
	>
		<p class="font-semibold text-black">Givlet</p>

		<div class="flex items-center justify-center gap-4">
			<button class="p-2 rounded-lg bg-sky-100 text-black">
				<Icon icon="mdi:home-outline" class="size-5" />
			</button>
			<button class="p-2 rounded-lg bg-transparent text-black">
				<Icon icon="mdi:gift-outline" class="size-5" />
			</button>
			<button class="p-2 rounded-lg bg-transparent text-black">
				<Icon icon="mdi:medal-outline" class="size-5" />
			</button>
			<button class="p-2 rounded-lg bg-transparent text-black">
				<Icon icon="mdi:cart-outline" class="size-5" />
			</button>
			<button class="p-2 rounded-lg bg-transparent text-black">
				<Icon icon="mdi:information-outline" class="size-5" />
			</button>
			<button onclick={toggleSearch} class="p-2 rounded-lg bg-transparent text-black">
				<Icon icon="mdi:magnify" class="size-5" />
			</button>
		</div>

		{#if isSearchOpen}
			<div class="absolute top-16 left-1/2 transform -translate-x-1/2 bg-givlet-paper border border-white p-4 rounded-2xl shadow-lg">
				<input
					type="text"
					placeholder="Search..."
					class="p-2 border border-gray-300 rounded-lg w-64"
					oninput={handleSearch}
				/>
			</div>
		{/if}

		{#if user}
			<button onclick={toggleDropdown} class="flex flex-row items-center justify-center cursor-pointer">
				<img
					src={user.profilePicture}
					alt="{user.name}'s profile picture"
					class="size-6 rounded-full bg-zinc-800 border border-gray-300"
				/>
				<Icon icon="mdi:chevron-down" class="size-3" />
			</button>
		{/if}
	</div>
</div>
