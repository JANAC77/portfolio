import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Manual dependency-free .env parser for local testing
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value.trim();
    }
  });
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'vercel-api-emulator',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url.startsWith('/api/contact')) {
            try {
              // Load the serverless handler module dynamically
              const handlerModule = await server.ssrLoadModule('./api/contact.js');
              const handler = handlerModule.default;

              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });

              req.on('end', async () => {
                try {
                  req.body = body ? JSON.parse(body) : {};

                  // Mock Vercel response helper methods
                  const mockRes = {
                    statusCode: 200,
                    headers: {},
                    setHeader(name, value) {
                      this.headers[name] = value;
                      res.setHeader(name, value);
                    },
                    status(code) {
                      this.statusCode = code;
                      res.statusCode = code;
                      return this;
                    },
                    json(data) {
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify(data));
                      return this;
                    },
                    end(data) {
                      res.end(data);
                      return this;
                    }
                  };

                  await handler(req, mockRes);
                } catch (err) {
                  console.error('API Emulator Execution Error:', err);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: err.message }));
                }
              });
              return;
            } catch (err) {
              console.error('API Emulator Load Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Failed to load local serverless function emulator.' }));
              return;
            }
          }
          next();
        });
      }
    }
  ],
});
