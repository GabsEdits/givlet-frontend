<script context="module">
	import Paper from '$lib/Paper.svelte';
	import { projects } from '$lib/projects';
</script>

<Paper activeTab="home">
	<div class="flex flex-col gap-5">
		<div class="flex flex-col justify-center items-center gap-2">
			<h2 class="text-3xl font-semibold">Projects</h2>
			<p class="text-base text-gray-500">
				Explore our projects and contribute to making a difference.
			</p>
		</div>
		<div class="flex flex-col gap-8 items-center justify-center w-full mt-8">
			{#each projects as project, index (index)}
				<div
					class="flex flex-col justify-center gap-6 w-full text-white rounded-4xl p-18"
					style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.30) 79.29%, rgba(0, 0, 0, 0.90) 100%), url({project.image}) lightgray 50% / cover no-repeat;"
				>
					<h2 class="text-2xl font-bold">{project.name}</h2>
					<p class="max-w-72">{project.description}</p>
					<div class="flex flex-row flex-wrap gap-2">
						<a
							href="/projects/{index}"
							class="flex items-center justify-center rounded-full px-8 bg-white/70 hover:bg-white/90 transition-colors duration-400 border border-white/70 backdrop-blur-xs text-black text-base font-semibold"
							>Donate</a
						>
						<button
							class="flex items-center justify-center rounded-full px-8 py-1 bg-transparent hover:bg-white/10 border border-white/30 backdrop-blur-xs text-white text-base font-semibold transition-colors duration-500 cursor-pointer"
							on:click={() => navigator.clipboard.writeText(`/projects/${index}`)}
						>
							Share
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Paper>
