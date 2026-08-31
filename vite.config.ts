import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			prerender: {
				handleMissingId: (details) => {
					if (details.id.startsWith('digit-')) {
						console.info('Ignoring src error coming from svg and not route');
					} else {
						throw new Error(details.message);
					}
				}
			}
		})
	]
});
