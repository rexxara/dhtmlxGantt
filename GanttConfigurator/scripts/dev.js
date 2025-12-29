import path from 'path';
import { createServer } from 'vite';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const port = process.env.FGC_DESIGNER_GENERATED_AVAILABLE_PORT;

  const viteDevServer = await createServer({
    root: path.resolve(__dirname, '../'),
    configFile: path.resolve(__dirname, '../vite.config.ts'),
    server: {
      host: true,
      port: port,
      strictPort: true,
    },
  });

  await viteDevServer.listen(port);
  await viteDevServer.printUrls();
})();
