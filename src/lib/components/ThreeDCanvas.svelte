<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let canvasContainer: HTMLDivElement;

	onMount(() => {
		// Scene setup
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
		camera.position.z = 10;

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
		canvasContainer.appendChild(renderer.domElement);

		// Add a simple school-like structure
		const schoolGeometry = new THREE.BoxGeometry(4, 2, 2);
		const schoolMaterial = new THREE.MeshBasicMaterial({ color: 0x8b0000 });
		const school = new THREE.Mesh(schoolGeometry, schoolMaterial);
		scene.add(school);

		const roofGeometry = new THREE.ConeGeometry(2.5, 1, 4);
		const roofMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
		const roof = new THREE.Mesh(roofGeometry, roofMaterial);
		roof.position.y = 1.5;
		roof.rotation.y = Math.PI / 4;
		scene.add(roof);

		// Render the scene
		renderer.render(scene, camera);

		// Cleanup on component destroy
		return () => {
			renderer.dispose();
			scene.clear();
		};
	});
</script>

<style>
	.canvas-container {
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>

<div bind:this={canvasContainer} class="canvas-container overflow-hidden rounded-xl"></div>
