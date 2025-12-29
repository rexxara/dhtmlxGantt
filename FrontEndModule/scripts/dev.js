import path from 'path';
import { createServer } from 'vite';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
(async () => {
  const port = process.env.FGC_AVAILABLE_PORT;
  const origin = `http://localhost:${port}`;
  const viteDevServer = await createServer({
    root: path.resolve(__dirname, '../'),
    configFile: path.resolve(__dirname, '../vite.config.ts'),
    base: `${origin}/Forguncy/`,
    server: {
      host: true,
      port: port,
      strictPort: true,
      hmr: true,
      origin: origin,
    },
  });
  await viteDevServer.listen(~~port);
  await viteDevServer.printUrls();
})();
