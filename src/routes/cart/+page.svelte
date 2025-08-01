<script lang="ts">
	import { cartStore } from '$lib/stores/cartStore';
	import { projects } from '$lib/projects';
	import { addToInventory, getUserFromCookie } from '$lib/user';
	import { onMount } from 'svelte';
	import Paper from '$lib/Paper.svelte';

	let cart = [];
	let user = null;

	// Subscribe to the cart store
	cartStore.subscribe((value) => {
		cart = value;
	});

	// Get user from cookie
	onMount(() => {
		const cookieString = document.cookie;
		user = getUserFromCookie(cookieString);
	});

	async function donate() {
		if (!user) {
			alert('Please log in to donate.');
			return;
		}

		// Process each item in the cart
		for (const item of cart) {
			// Update the user's inventory
			addToInventory(user, item.name, item.cartCount, (cookie) => {
				document.cookie = cookie;
			});

			// Find the project and component in the projects library
			const project = projects.find((proj) =>
				proj.components.some((component) => component.name === item.name)
			);

			if (project) {
				const component = project.components.find((comp) => comp.name === item.name);

				// Update the component's available count
				if (component) {
					component.available += item.cartCount;
				}

				// Calculate the donation amount
				const donationAmount = item.cartCount * item.price;

				// Update the leaderboard
				const existingDonor = project.leaderboard.find((donor) => donor.name === user.name);
				if (existingDonor) {
					existingDonor.amount += donationAmount;
				} else {
					project.leaderboard.push({
						name: user.name,
						amount: donationAmount,
						profilePicture: user.profilePicture
					});
				}

				// Sort the leaderboard by donation amount
				project.leaderboard.sort((a, b) => b.amount - a.amount);

				// Call the API to persist the updated project
				await updateProjectAPI(project);
			}
		}

		// Clear the cart after donation
		cartStore.set([]);
		alert('Thank you for your donation!');
	}

	async function updateProjectAPI(project) {
		try {
			const response = await fetch('/api/update-projects', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(project)
			});

			if (!response.ok) {
				const error = await response.json();
				console.error('Failed to update project:', error);
				alert(`Failed to update project: ${error.error}`);
			}
		} catch (error) {
			console.error('Error calling update-projects API:', error);
			alert('An error occurred while updating the project.');
		}
	}
</script>

<Paper activeTab="cart">
	<div class="flex flex-col items-center gap-6">
		<h1 class="text-2xl font-bold">Your Cart</h1>
		{#if cart.length > 0}
			<div class="flex flex-col gap-4 w-full">
				{#each cart as item, index (item.name)}
					<div
						class="flex items-center justify-between p-4 bg-givlet-paper dark:bg-givlet-paper-800 rounded-lg"
						{...{ key: index }}
					>
						<div class="flex items-center gap-4">
							<img src={item.image} alt={item.name} class="w-10 h-10 rounded-full" />
							<p class="text-lg font-semibold">{item.name}</p>
						</div>
						<p class="text-lg font-semibold text-green-500">
							{item.cartCount} x ${item.price.toFixed(2)}
						</p>
					</div>
				{/each}
			</div>
			<button
				class="py-2 px-4 bg-green-500 text-white rounded-lg text-sm md:text-base hover:bg-green-600 transition"
				on:click={donate}
			>
				Donate
			</button>
		{:else}
			<p class="text-gray-500">Your cart is empty.</p>
		{/if}
	</div>
</Paper>
