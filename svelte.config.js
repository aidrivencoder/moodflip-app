import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: adapter({
      // You can specify options here if needed
      // out: 'build',
      // precompress: false,
      // envPrefix: ''
    })
  },
  preprocess: vitePreprocess()
};
