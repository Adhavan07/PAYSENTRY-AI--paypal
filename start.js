/**
 * PaySentry AI: Zero-Dependency Dual Runner
 * Spawns both backend server and Vite frontend client concurrently
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\x1b[36m%s\x1b[0m', '🛡️  Launching PaySentry AI Services (Server: 5000, Client: 3002)...');

// 1. Spawn Backend Server
const server = spawn('node', ['server/server.js'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

// 2. Spawn Frontend Client
const client = spawn('npm', ['--prefix', 'client', 'run', 'dev'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

function cleanup() {
  console.log('\n\x1b[33m%s\x1b[0m', 'Shutting down PaySentry AI services...');
  server.kill();
  client.kill();
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

