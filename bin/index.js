#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const skillSourceDir = path.join(__dirname, '..', 'skill');

// Parse command line arguments
const args = process.argv.slice(2);
let targetIde = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--target' && i + 1 < args.length) {
    targetIde = args[i + 1];
  }
}

// Determine target directory
let targetDir;
if (targetIde === 'cursor') {
  targetDir = path.join(process.cwd(), '.cursor', 'skills', 'cloudinary-get-started');
} else if (targetIde === 'agents') {
  targetDir = path.join(process.cwd(), '.agents', 'skills', 'cloudinary-get-started');
} else if (targetIde === 'claude' || !targetIde) {
  // Default to .claude/skills
  targetDir = path.join(process.cwd(), '.claude', 'skills', 'cloudinary-get-started');
} else {
  console.error(`Error: Unknown target IDE "${targetIde}"`);
  console.error('Valid options: cursor, agents, claude (default)');
  process.exit(1);
}

// Create target directory if it doesn't exist
const parentDir = path.dirname(targetDir);
if (!fs.existsSync(parentDir)) {
  fs.mkdirSync(parentDir, { recursive: true });
}

// Copy skill directory to target
try {
  if (fs.existsSync(targetDir)) {
    // Remove existing skill directory
    fs.rmSync(targetDir, { recursive: true, force: true });
  }

  fs.cpSync(skillSourceDir, targetDir, { recursive: true });
  console.log(`✓ Installed cloudinary-get-started to ${targetDir}`);
  console.log(`\nTo use the skill, run:`);
  console.log(`  /cloudinary-get-started`);
} catch (error) {
  console.error(`Error installing skill: ${error.message}`);
  process.exit(1);
}
