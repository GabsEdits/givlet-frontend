import { writable } from 'svelte/store';

type CartItem = {
	name: string;
	image: string;
	needed: number;
	available: number;
	cartCount: number;
	price: number;
};

export const cartStore = writable<CartItem[]>([]);

export function addToCart(item: CartItem) {
	cartStore.update((cart) => {
		const existingItem = cart.find((cartItem) => cartItem.name === item.name);
		if (existingItem) {
			existingItem.cartCount += item.cartCount;
		} else {
			cart.push({ ...item });
		}
		return cart;
	});
}
