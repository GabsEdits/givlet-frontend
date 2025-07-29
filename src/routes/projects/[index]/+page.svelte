<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { projectStore } from '$lib/stores/projectStore';
	import { addToInventory, saveUserToCookie, getUserFromCookie } from '$lib/user';
	import Popup3D from '$lib/components/Popup3D.svelte';
	import Icon from '@iconify/svelte';

	export let data;

	// Extract project from the data prop and set it in the store
	const { project } = data;
	projectStore.set(project);

	// Subscribe to the store to get the current project
	let currentProject;
	projectStore.subscribe((value) => {
		currentProject = value;
	});

	let user = null;
	onMount(() => {
		const cookieString = document.cookie;
		user = getUserFromCookie(cookieString);
	});

	type Component = {
		name: string;
		image: string;
		needed: number;
		available: number;
		cartCount: number;
	};

	function increaseCartCount(component: Component): void {
		if (component.cartCount + component.available < component.needed) {
			component.cartCount += 1;
			projectStore.set({ ...currentProject });
			console.log(`Increased cartCount for ${component.name}:`, component.cartCount);
		}
	}

	function decreaseCartCount(component: Component): void {
		if (component.cartCount > 0) {
			component.cartCount -= 1;
			projectStore.set({ ...currentProject });
			console.log(`Decreased cartCount for ${component.name}:`, component.cartCount);
		}
	}

	async function applyChangesToProject(): Promise<void> {
		currentProject.components.forEach((component) => {
			const donatedCount = component.cartCount;
			const donationAmount = donatedCount * component.price;

			component.available += donatedCount;

			if (user) {
				addToInventory(user, component.name, donatedCount, (cookie) => {
					document.cookie = cookie;
				});

				const existingDonor = currentProject.leaderboard.find((donor) => donor.name === user.name);
				if (existingDonor) {
					existingDonor.amount += donationAmount;
				} else {
					currentProject.leaderboard.push({
						name: user.name,
						amount: donationAmount,
						profilePicture: user.profilePicture
					});
				}

				currentProject.leaderboard.sort((a, b) => b.amount - a.amount);
			}

			component.cartCount = 0;
		});

		completionPercentage = calculateCompletion();

		await updateProjectsFile();

		console.log('Updated project:', currentProject);
		alert('Changes applied successfully!');
	}

	function calculateCompletion(): number {
		const totalNeeded = currentProject.components.reduce(
			(sum: number, c: Component) => sum + c.needed,
			0
		);
		const totalAvailable = currentProject.components.reduce(
			(sum: number, c: Component) => sum + c.available,
			0
		);
		return Math.round((totalAvailable / totalNeeded) * 100);
	}

	let completionPercentage: number = calculateCompletion();
	let isPopupOpen = false;

	function togglePopup() {
		isPopupOpen = !isPopupOpen;
	}

	// Carbon Offset Calculator
	let numberOfTrees = 0;
	let carbonOffset = 0;

	function calculateCarbonOffset() {
		// Assume each tree offsets 21 kg of CO2 per year
		carbonOffset = numberOfTrees * 21;
	}

	async function updateProjectsFile(): Promise<void> {
		const response = await fetch('/api/update-projects', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(currentProject)
		});

		if (!response.ok) {
			console.error('Failed to update projects.js');
			alert('Failed to update projects.js');
		}
	}
</script>

<div class="flex flex-col items-center gap-6">
	{#if currentProject && currentProject.components}
		<div
			class="flex relative z-20 flex-col gap-5 items-center justify-center w-full text-white rounded-4xl px-6 py-16 md:px-18 md:py-28 overflow-hidden"
			style="
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.55) 100%), url({currentProject.image}) black 80% / cover no-repeat;
	"
		>
			<h2 class="text-xl md:text-3xl font-semibold">{currentProject.name}</h2>
			<p class="max-w-full md:max-w-3/4 text-lg md:text-base text-center">
				{currentProject.description}
			</p>
			<div class="absolute bottom-0 left-0 w-full">
				<div class="bg-transparent dark:bg-zinc-800 rounded-full h-4 mt-4 w-full">
					<div class="bg-green-500 h-4 rounded-full" style="width: {completionPercentage}%;"></div>
				</div>
			</div>
		</div>
		<div class="flex flex-row gap-2 w-full">
			<div
				class="flex items-center flex-col gap-2 bg-givlet-paper border border-white shadow-xl py-5 px-8 rounded-2xl w-full"
			>
				<div class="flex flex-wrap items-center justify-center max-w-full gap-4">
					{#each currentProject.components as component, index (index)}
						<div
							class="flex flex-col justify-center items-center gap-4 p-4"
							style="border-right: {index !== currentProject.components.length - 1 &&
							typeof window !== 'undefined' &&
							window.innerWidth >= 768
								? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
									? '1px solid rgba(255, 255, 255, 0.1)'
									: '1px solid rgba(0, 0, 0, 0.1)'
								: 'none'};"
						>
							<img
								src={component.image}
								alt={component.name}
								class="w-12 md:w-16 unique-class-{index}"
							/>
							<div class="flex-1 text-center">
								<h2 class="text-lg md:text-xl font-semibold">{component.name}</h2>
								<p class="text-xs md:text-sm font-bold">
									{component.available}/<span class="text-[8px] md:text-[10px] opacity-60"
										>{component.needed}</span
									>
								</p>
							</div>
							<!-- Counter -->
							<div class="flex items-center gap-2">
								<button
									class="py-1 px-2 md:py-1 md:px-3 bg-gray-100 dark:bg-zinc-800 text-black dark:text-white rounded-lg font-semibold text-sm md:text-base"
									on:click={() => decreaseCartCount(component)}
									disabled={component.cartCount === 0}
								>
									-
								</button>
								<span class="text-base md:text-lg font-semibold">{component.cartCount}</span>
								<button
									class="py-1 px-2 md:py-1 md:px-3 bg-gray-100 dark:bg-zinc-800 text-black dark:text-white rounded-lg font-semibold text-sm md:text-base"
									on:click={() => increaseCartCount(component)}
									disabled={component.cartCount + component.available >= component.needed}
								>
									+
								</button>
							</div>
						</div>
					{/each}
				</div>
				<button
					class="flex flex-row gap-2 py-2 px-16 rounded-full bg-givlet-paper border border-white shadow-md w-max font-bold text-sm md:text-base hover:bg-white hover:text-black hover:border dark:hover:bg-black dark:hover:text-white transition"
					on:click={applyChangesToProject}
				>
					<Icon icon="material-symbol:cart-outline" class="size-5" />
					Add to Cart
				</button>
			</div>
			<div
				class="flex flex-col gap-2 items-center bg-givlet-paper border border-white shadow-xl py-5 px-8 rounded-2xl w-[50%]"
			>
				<h2 class="text-xl md:text-2xl font-semibold">Leaderboard</h2>
				<div class="flex flex-col gap-4 w-full">
					{#if currentProject.leaderboard.length > 0}
						{#each currentProject.leaderboard as donor, index (index)}
							<div class="flex items-center justify-between p-4 dark:bg-zinc-800 rounded-lg">
								<div class="flex items-center gap-4">
									<img
										src={donor.profilePicture}
										alt="{donor.name}'s profile picture"
										class="w-10 h-10 rounded-full border border-gray-300"
									/>
									<p class="text-lg font-semibold">{donor.name}</p>
								</div>
								<p class="text-lg font-semibold text-green-500">${donor.amount.toFixed(2)}</p>
							</div>
						{/each}
					{:else}
						<p class="text-gray-500">No donations yet. Be the first to contribute!</p>
					{/if}
				</div>
			</div>
		</div>

		<div
			class="flex items-center justify-center bg-givlet-paper border border-white shadow-xl py-5 px-8 rounded-2xl w-full h-[500px]"
		>
			<p>Placeholder here for 3D (VIEW ONLY)</p>
		</div>

		<div class="flex flex-row gap-2">
			<div
				class="flex items-center flex-col gap-2 bg-givlet-paper border border-white shadow-xl py-5 px-8 rounded-2xl w-[60%]"
			>
				<Icon icon="material-symbols:info-outline" class="size-10 mb-2" />
				<h2 class="text-xl md:text-2xl font-semibold">About the Organizer</h2>
				<p class="text-base md:text-lg">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio mollitia itaque quidem ipsum
					ratione quisquam magni nam consectetur vitae doloremque fugit ut, dolores sit voluptatum
					veniam iure commodi ea quasi. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
					Maiores unde quia ipsa. Ad reiciendis minus vero dignissimos qui. Eius voluptate omnis
					repellendus soluta quod magni nostrum ad cumque minima aliquid! Lorem, ipsum dolor sit
					amet consectetur adipisicing elit. At quidem, assumenda doloribus fugiat possimus illo ad
					Lorem ipsum dolor sit, amet consectetur
				</p>
			</div>
			<div
				class="flex items-center flex-col gap-2 bg-givlet-paper border border-white shadow-xl py-5 px-8 rounded-2xl w-[60%]"
			>
				<Icon icon="material-symbols:help-outline" class="size-10 mb-2" />
				<h2 class="text-xl md:text-2xl font-semibold">Why help this particular project?</h2>
				<p class="text-base md:text-lg">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio mollitia itaque quidem ipsum
					ratione quisquam magni nam consectetur vitae doloremque fugit ut, dolores sit voluptatum
					veniam iure commodi ea quasi. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
					Maiores unde quia ipsa. Ad reiciendis minus vero dignissimos qui. Eius voluptate omnis				</p>
			</div>
		</div>

		{#if isPopupOpen && currentProject}
			<Popup3D projectName={currentProject.name} onClose={togglePopup} />
		{/if}

		<!-- Carbon Offset Calculator UI -->
		{#if currentProject.name.toLowerCase().includes('trees')}
			<div class="flex flex-col gap-2">
				<h2 class="text-xl md:text-2xl font-semibold mt-6">Carbon Offset Calculator</h2>
				<div class="flex flex-col items-center gap-4 w-full">
					<div class="flex items-center gap-2">
						<label for="numberOfTrees" class="text-sm md:text-base font-semibold"
							>Number of Trees:</label
						>
						<input
							id="numberOfTrees"
							type="number"
							class="py-1 px-2 md:py-1 md:px-3 bg-gray-100 dark:bg-zinc-800 text-black dark:text-white rounded-lg text-sm md:text-base"
							bind:value={numberOfTrees}
							min="0"
						/>
					</div>
					<button
						class="py-2 px-4 bg-green-500 text-white rounded-lg text-sm md:text-base hover:bg-green-600 transition"
						on:click={calculateCarbonOffset}
					>
						Calculate Carbon Offset
					</button>
					<p class="text-sm md:text-base font-semibold">
						Carbon Offset: {carbonOffset} kg CO<sub>2</sub>/year
					</p>
				</div>
			</div>
		{/if}
	{:else}
		<p class="text-red-500">Project not found or data is invalid.</p>
	{/if}
</div>
