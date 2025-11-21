const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(process.cwd(), 'content/articles');

// Get slug from arguments
const args = process.argv.slice(2);
const slug = args[0];

if (!slug) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: Please provide a filename slug.');
  console.log('Usage: npm run new-post <filename-slug>');
  console.log('Example: npm run new-post my-new-feature');
  process.exit(1);
}

// Ensure directory exists
if (!fs.existsSync(articlesDir)) {
  console.error(`Directory not found: ${articlesDir}`);
  process.exit(1);
}

// Find max ID from existing files
const files = fs.readdirSync(articlesDir);
let maxId = 0;

files.forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
  try {
    const { data } = matter(content);
    if (data.id) {
      const numId = parseInt(data.id);
      if (!isNaN(numId) && numId > maxId) {
        maxId = numId;
      }
    }
  } catch (e) {
    // ignore errors
  }
});

const newId = maxId + 1;
const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

const template = `---
id: ${newId}
title: "New Article Title"
date: "${date}"
category: "Tech"
tags: []
excerpt: "Article excerpt goes here..."
author: "xe-Non"
---

Write your content here...
`;

const filePath = path.join(articlesDir, `${slug}.md`);

if (fs.existsSync(filePath)) {
  console.error('\x1b[31m%s\x1b[0m', `Error: File already exists: ${filePath}`);
  process.exit(1);
}

fs.writeFileSync(filePath, template);

console.log('\x1b[32m%s\x1b[0m', `Success! Created new article: ${filePath}`);
console.log(`Article ID: ${newId}`);
