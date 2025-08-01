export const projects = [
	{
		name: 'New School in Sudan',
		description:
			'We are building a new school in Sudan to provide quality education to children in the region.',
		reason:
			'To provide quality education to children in Sudan. We aim to build a new school that will serve the local community, providing a safe and supportive environment for learning.',
		image:
			'https://assets.globalpartnership.org/s3fs-public/styles/standard_blog_banner/public/slide_ietm/slide_item_image/2016%20GPE_K_Lynch-LU0A7996.jpg?VersionId=XFxz2VJ6b8A1hcxi3hjt_ehDKaqRK4M6&itok=p8GYPAXx',
		components: [
			{
				name: 'Bricks',
				needed: 10000,
				available: 0,
				price: 0.5,
				image: '/icons/brick.png',
				cartCount: 0
			},
			{
				name: 'Tables',
				needed: 50,
				available: 0,
				price: 20,
				image: '/icons/table.png',
				cartCount: 0
			},
			{
				name: 'Chairs',
				needed: 100,
				available: 0,
				price: 10,
				image: '/icons/chair.png',
				cartCount: 0
			},
			{
				name: 'Blackboards',
				needed: 10,
				available: 0,
				price: 50,
				image: '/icons/blackboard.png',
				cartCount: 0
			},
			{
				name: 'Books',
				needed: 200,
				available: 0,
				price: 5,
				image: '/icons/book.png',
				cartCount: 0
			}
		],
		leaderboard: [
			{
				name: 'Happy Fox',
				amount: 21,
				profilePicture:
					'https://api.dicebear.com/6.x/identicon/svg?seed=7d5891ca-e9ec-4978-8e05-1204018f9707'
			},
			{
				name: 'Clever Koala',
				amount: 2,
				profilePicture:
					'https://api.dicebear.com/6.x/identicon/svg?seed=34c46257-7a47-4853-a476-322b474517f1'
			}
		],
		organizer: {
			name: 'Global Education Fund',
			description:
				'We are dedicated to providing quality education to children in need around the world. Our mission is to ensure that every child has access to a safe and supportive learning environment. We work with local communities to build schools, provide educational resources, and support teachers. Join us in our mission to empower the next generation through education.'
		}
	},
	{
		name: 'Planting Trees in Nigeria',
		reason:
			'To combat deforestation and promote biodiversity in Nigeria. We aim to plant 2000 trees to restore natural habitats and improve air quality.',
		description: 'Planting trees in Nigeria to combat deforestation and promote biodiversity.',
		image: 'https://naturenews.africa/wp-content/uploads/2023/07/Tree-planting-.jpg',
		components: [
			{
				name: 'Trees',
				needed: 2000,
				available: 0,
				price: 15,
				image: '/icons/tree.png',
				cartCount: 0
			}
		],
		leaderboard: [
			{
				name: 'Wise Fox',
				amount: 165,
				profilePicture:
					'https://api.dicebear.com/6.x/identicon/svg?seed=dc0b8f10-ef22-48d6-ae82-e598374ae086'
			}
		],
		organizer: {
			name: 'Green Earth Initiative',
			description:
				'We are committed to protecting the environment and promoting sustainable practices. Our mission is to combat climate change and preserve natural resources for future generations. We work on various projects including tree planting, waste management, and renewable energy initiatives. Join us in our efforts to create a greener planet.'
		}
	}
];
