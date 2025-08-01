<script>
	import Icon from '@iconify/svelte';
	import Paper from '$lib/Paper.svelte';
</script>

<Paper activeTab="about">
	<div class="flex flex-col items-center gap-6">
		<div class="flex flex-col items-center gap-2">
			<h1 class="text-3xl font-bold">About Us</h1>
			<p class="text-lg">Information about Givlet; our mission, vision, and values.</p>
		</div>
		{#each [{ icon: 'material-symbols:approval-delegation-outline', title: 'Our Mission', text: 'At Givlet, our mission is to empower individuals and organizations to make a positive impact in the world through charitable giving. We strive to create a platform that connects donors with meaningful projects and initiatives, fostering a culture of generosity and social responsibility.' }, { icon: 'material-symbols:target', title: 'Goals', text: 'Our primary goal is to facilitate transparent and efficient charitable donations, ensuring that funds reach those who need them most. We aim to build a community of like-minded individuals and organizations dedicated to making a difference in the world, one contribution at a time.' }] as section, index (section.title)}
			<div
				class="flex flex-col p-8 gap-2 rounded-lg bg-givlet-paper dark:bg-givlet-paper-800 shadow-lg border border-white dark:border-white/10"
				{...{ key: index }}
			>
				<div class="flex flex-row items-center justify-center gap-2 w-max">
					<Icon icon={section.icon} class="size-8 text-gray-700 dark:text-gray-300" />
					<h2 class="text-2xl font-bold">{section.title}</h2>
				</div>
				<p class="text-lg">{section.text}</p>
			</div>
		{/each}
	</div>
</Paper>
