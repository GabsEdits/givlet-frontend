<script context="module">
	import Icon from '@iconify/svelte';
	import { organizations } from '$lib/organizations';
</script>

<div class="flex flex-col gap-5">
	<div class="flex flex-col justify-center items-center gap-2">
		<h2 class="text-3xl font-semibold">Organizations</h2>
		<p class="text-base text-gray-500">
			Explore our organizations that make the organizations possible.
		</p>
	</div>
	<div class="flex flex-col gap-8 items-center justify-center w-full mt-8">
		{#each organizations as organization, index (index)}
			<div
				class="flex flex-row items-center justify-between gap-2 bg-givlet-paper border border-white shadow-xl py-5 px-8 rounded-2xl w-full"
			>
				<div class="flex flex-row gap-2 justify-center items-center w-max">
					<img
						src={organization.logo}
						alt={organization.name}
						class="w-16 h-16 rounded-full object-cover"
					/>
					<div class="flex flex-col gap-2 justify-center">
						<h2 class="text-xl md:text-2xl font-semibold">
							{organization.name}
						</h2>
						<p class="text-base md:text-lg w-xl">
							{organization.description}
						</p>
					</div>
				</div>
				<button
					class="flex flex-row items-center justify-center gap-2 bg-givlet-paper border border-white shadow-md py-2 px-8 rounded-full w-max font-bold cursor-pointer"
					on:click={() => navigator.clipboard.writeText(organization.website)}
				>
					<Icon icon="material-symbols:info-outline" class="size-5" />
					Website
				</button>
			</div>
		{/each}
	</div>
</div>
