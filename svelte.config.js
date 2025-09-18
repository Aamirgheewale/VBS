import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit';

const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter()
  }
};

export default config;
