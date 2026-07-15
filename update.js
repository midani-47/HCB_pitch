const fs = require('fs');
let html = fs.readFileSync('prototype1.html', 'utf-8');

// We will do a full rewrite in node to handle the multi-line replacements easily, 
// then write it back to prototype1.html
