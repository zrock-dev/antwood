import axios from 'axios';
import { SERVER_DOMAIN } from './Requester';

export const getSneakerById = async (id) => {
	return {
		_id: '6543c443d88b1c5386061b89',
		name: 'Chuck Taylor All Star High Top',
		description:
			'The Converse Chuck Taylor All Star is the one that started it all for Converse. When it comes to sneakers, there’s nothing more pure than a canvas upper and a vulcanized rubber sole. This is the sneaker that spawned countless imitators, with its star-centered patch, rubber toe cap, toe bumper and striping.',
		price: 85,
		colors: [
			{
				_id: '6543c46cd88b1c5386061b8b',
				color: 'white'
			},
			{
				_id: '6543c46cd88b1c5386061b8c',
				color: 'black'
			},
			{
				_id: '6543c46cd88b1c5386061b8d',
				color: 'red'
			},
			{
				_id: '6543c46cd88b1c5386061b8e',
				color: 'navy'
			},
			{
				_id: '6543c46cd88b1c5386061b8f',
				color: 'black'
			}
		],
		types: [
			{
				ID: '6543c46cd88b1c5386061b8e',
				images: [
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842797/solestyle/product_images/Converse/wdsghfgybkmwkwi42pty.webp',
						id: 'solestyle/product_images/Converse/wdsghfgybkmwkwi42pty'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842797/solestyle/product_images/Converse/kqzogbwws1cotagxuduq.webp',
						id: 'solestyle/product_images/Converse/kqzogbwws1cotagxuduq'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842797/solestyle/product_images/Converse/ykwl7tpzdxxcwtt9qzkv.webp',
						id: 'solestyle/product_images/Converse/ykwl7tpzdxxcwtt9qzkv'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842797/solestyle/product_images/Converse/julfjl00yndmypkhk1l9.webp',
						id: 'solestyle/product_images/Converse/julfjl00yndmypkhk1l9'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842797/solestyle/product_images/Converse/axqwfgo8lwxxkeo492au.webp',
						id: 'solestyle/product_images/Converse/axqwfgo8lwxxkeo492au'
					}
				],
				sizes: [11, 11.5],
				quantity: 30
			},
			{
				ID: '6543c46cd88b1c5386061b8c',
				images: [
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842508/solestyle/product_images/Converse/hgrishmdv852cyvxgxz5.webp',
						id: 'solestyle/product_images/Converse/hgrishmdv852cyvxgxz5'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842508/solestyle/product_images/Converse/rvqxa9xaxug6pvpjv3el.webp',
						id: 'solestyle/product_images/Converse/rvqxa9xaxug6pvpjv3el'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842508/solestyle/product_images/Converse/eplgquncfcu1j3mnjope.webp',
						id: 'solestyle/product_images/Converse/eplgquncfcu1j3mnjope'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842508/solestyle/product_images/Converse/xgpn3rhksi4m3rr0ru5k.webp',
						id: 'solestyle/product_images/Converse/xgpn3rhksi4m3rr0ru5k'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842508/solestyle/product_images/Converse/yq86ao2cvxsi8sa8gntf.webp',
						id: 'solestyle/product_images/Converse/yq86ao2cvxsi8sa8gntf'
					}
				],
				sizes: [
					3, 3.5, 4, 4.5, 5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 13, 16
				],
				quantity: 45
			},
			{
				ID: '6543c46cd88b1c5386061b8d',
				images: [
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842651/solestyle/product_images/Converse/pi2dueiemp2njc2jgdir.webp',
						id: 'solestyle/product_images/Converse/pi2dueiemp2njc2jgdir'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842651/solestyle/product_images/Converse/hbdf07zmnagllcp0bznz.webp',
						id: 'solestyle/product_images/Converse/hbdf07zmnagllcp0bznz'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842652/solestyle/product_images/Converse/muuf5o6oxfj9bn9hewbl.webp',
						id: 'solestyle/product_images/Converse/muuf5o6oxfj9bn9hewbl'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842652/solestyle/product_images/Converse/sm4e8wyozyon36myhhcv.webp',
						id: 'solestyle/product_images/Converse/sm4e8wyozyon36myhhcv'
					}
				],
				sizes: [3.5, 8.5],
				quantity: 5
			},
			{
				ID: '6543c46cd88b1c5386061b8b',
				images: [
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842196/solestyle/product_images/Converse/rywp5fkxnzazalbe7gun.webp',
						id: 'solestyle/product_images/Converse/rywp5fkxnzazalbe7gun'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842196/solestyle/product_images/Converse/q7lwxhwdyr9wamhk8kwl.webp',
						id: 'solestyle/product_images/Converse/q7lwxhwdyr9wamhk8kwl'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842196/solestyle/product_images/Converse/wimpn3rzuos0hsxq6trc.webp',
						id: 'solestyle/product_images/Converse/wimpn3rzuos0hsxq6trc'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842196/solestyle/product_images/Converse/ks9szmq4hmnrbxpdhgw0.webp',
						id: 'solestyle/product_images/Converse/ks9szmq4hmnrbxpdhgw0'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842196/solestyle/product_images/Converse/oz6t6vhawyop3tbtx5gu.webp',
						id: 'solestyle/product_images/Converse/oz6t6vhawyop3tbtx5gu'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698842196/solestyle/product_images/Converse/j4bqkn5jnpoctq6b28xv.webp',
						id: 'solestyle/product_images/Converse/j4bqkn5jnpoctq6b28xv'
					}
				],
				sizes: [
					3, 3.5, 4, 4.5, 5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 13, 16
				],
				quantity: 30
			},
			{
				ID: '6543c46cd88b1c5386061b8f',
				images: [
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698843056/solestyle/product_images/Converse/lgjdxve0pj6xogv16wgp.webp',
						id: 'solestyle/product_images/Converse/x2ufs9zgbpuizoy8hxgo'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698843056/solestyle/product_images/Converse/x2ufs9zgbpuizoy8hxgo.webp',
						id: 'solestyle/product_images/Converse/lgjdxve0pj6xogv16wgp'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698843056/solestyle/product_images/Converse/rvtqvufur6e4qelzxyv0.webp',
						id: 'solestyle/product_images/Converse/rvtqvufur6e4qelzxyv0'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698843056/solestyle/product_images/Converse/px2wwun9wnfvqo6myv66.webp',
						id: 'solestyle/product_images/Converse/px2wwun9wnfvqo6myv66'
					},
					{
						url: 'https://res.cloudinary.com/dex16gvvy/image/upload/v1698843056/solestyle/product_images/Converse/lojvncvjxj5sldozbb7i.webp',
						id: 'solestyle/product_images/Converse/lojvncvjxj5sldozbb7i'
					}
				],
				sizes: [3, 3.5, 4, 4.5, 5, 5.5, 7.5, 8, 8.5, 9, 9.5],
				quantity: 10
			}
		],
		tags: [
			'white',
			'black',
			'red',
			'navy',
			'black monochrome',
			'high top',
			'men',
			'women',
			'kids',
			'canvas',
			'vulcanized sole',
			'classic',
			'iconic',
			'chuck taylor',
			'star patch',
			'rubber toe cap',
			'striping',
			'retro',
			'footwear',
			'fashion',
			'sneakers',
			'footwear',
			'stylish',
			'lace-up',
			'casual',
			'sporty',
			'heritage',
			'vintage',
			'trendy'
		],
		lastDate: '2023-11-02T15:46:53.027Z',
		salesQuantity: 100,
		promotionCode: '000000000000000000000000',
		brand: 'converse'
	};
};

export const getAllProductsByPagination = async (page) => {
	const response = await axios.get(`${SERVER_DOMAIN}/sneakers?page=${page}`);
	return response.data;
};
