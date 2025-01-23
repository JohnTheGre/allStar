import adapter from '@sveltejs/adapter-netlify';
import { sveltePreprocess } from 'svelte-preprocess';

const config = {
  preprocess: sveltePreprocess(),
  kit: {
    adapter: adapter(),
    paths: {
      base: '', // Optional: Only set if your app is hosted on a subpath
    },
  },
};

export default config;
