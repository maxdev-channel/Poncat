import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function imageProxyPlugin(): Plugin {
  return {
    name: 'image-proxy-plugin',
    configureServer(server) {
      server.middlewares.use('/api/proxy-image', async (req, res) => {
        try {
          const reqUrl = new URL(req.url || '', 'http://localhost');
          const targetUrl = reqUrl.searchParams.get('url');
          if (!targetUrl) {
            res.statusCode = 400;
            return res.end('Missing url parameter');
          }
          const response = await fetch(targetUrl);
          const buffer = await response.arrayBuffer();
          const contentType = response.headers.get('content-type') || 'image/jpeg';
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Content-Type', contentType);
          res.setHeader('Cache-Control', 'public, max-age=31536000');
          res.end(Buffer.from(buffer));
        } catch (err) {
          console.error('Image proxy error:', err);
          res.statusCode = 500;
          res.end('Failed to proxy image');
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), imageProxyPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
