import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: vercel(),
		vite: {
			server: {
				proxy: {
					'/validate': {
						target: 'http://dataapi-278515.ew.r.appspot.com/',
						changeOrigin: true
					}
				}
			}
		}
	}
};

export default config;
