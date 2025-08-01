<script lang="ts">
	import { projects } from '$lib/projects';
	import { SvelteMap } from 'svelte/reactivity';
	import Paper from '$lib/Paper.svelte';

	let generalLeaderboard: { name: string; amount: number; profilePicture: string }[] = [];

	function generateGeneralLeaderboard(): void {
		const leaderboardMap = new SvelteMap<
			string,
			{ name: string; amount: number; profilePicture: string }
		>();

		projects.forEach((project) => {
			project.leaderboard.forEach((doner) => {
				if (leaderboardMap.has(doner.name)) {
					const existingDoner = leaderboardMap.get(doner.name);
					if (existingDoner) {
						existingDoner.amount += doner.amount;
					}
				} else {
					leaderboardMap.set(doner.name, { ...doner });
				}
			});
		});

		generalLeaderboard = Array.from(leaderboardMap.values()).sort((a, b) => b.amount - a.amount);
	}

	generateGeneralLeaderboard();
</script>

<Paper activeTab="leaderboard">
<div class="flex flex-col items-center gap-6">
	<h1 class="text-2xl font-bold">Leaderboard</h1>
	<p class="text-base text-gray-500">
		See the top contributors across all projects. Your contributions make a difference!
	</p>
	{#if generalLeaderboard.length > 0}
		<div class="flex flex-col gap-4 w-full">
			{#each generalLeaderboard as doner, index (doner.name)}
				<div class="flex items-center justify-between p-4 rounded-lg" {...{ key: index }}>
					<div class="flex flex-row items-center gap-4">
						<img
							src={doner.profilePicture}
							alt={doner.name}
							class="w-10 h-10 rounded-full border border-gray-300"
						/>
						<p class="text-lg font-semibold">{doner.name}</p>
					</div>
					<p class="text-lg font-semibold text-green-500">
						${doner.amount.toFixed(2)}
					</p>
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-gray-500">No donations yet. Be the first to contribute!</p>
	{/if}
</div>
</Paper>
