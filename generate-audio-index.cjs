// generate-audio-index.js
const fs = require("fs");
const path = require("path");

const audioDir = path.join(__dirname, "/public/audio");
const indexFile = path.join(audioDir, "index.json");

const files = fs.readdirSync(audioDir)
  .filter(f => f.endsWith(".ogg"))
  .map(filename => ({
    name: filename.replace(".ogg", ""),
    src: `/audio/${filename}`
  }));

fs.writeFileSync(indexFile, JSON.stringify(files, null, 2));
console.log(`✅ 生成音频列表，共 ${files.length} 个：audio/index.json`);
