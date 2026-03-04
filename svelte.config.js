import adapter from '@sveltejs/adapter-static';

const isDev = process.env.NODE_ENV === 'development';
const repoName = 'Winux-Pages';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build'
    }),
    paths: {
      base: isDev ? '' : `/${repoName}`
    },
    prerender: {
      handleHttpError: 'warn'
    }
  }
};

export default config;
