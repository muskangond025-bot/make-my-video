const fs = require('fs');
const path = require('path');

function patchFile(filePath, searchStr, replaceStr) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(searchStr)) {
    content = content.replace(searchStr, replaceStr);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully patched:', filePath);
  } else {
    console.log('Search pattern not found or already patched in:', filePath);
  }
}

// 1. Patch dist/index.mjs
const mjsPath = path.join('node_modules', 'next-themes', 'dist', 'index.mjs');
patchFile(
  mjsPath,
  'return t.createElement("script",{...w,suppressHydrationWarning:!0,nonce:typeof window=="undefined"?d:"",dangerouslySetInnerHTML:{__html:`(${M.toString()})(${p})`}})',
  'return typeof window=="undefined"?t.createElement("script",{...w,suppressHydrationWarning:!0,nonce:d,dangerouslySetInnerHTML:{__html:`(${M.toString()})(${p})`}}):null'
);

// 2. Patch dist/index.js
const jsPath = path.join('node_modules', 'next-themes', 'dist', 'index.js');
patchFile(
  jsPath,
  'return t.createElement("script",{...w,suppressHydrationWarning:!0,nonce:typeof window=="undefined"?m:"",dangerouslySetInnerHTML:{__html:`(${I.toString()})(${p})`}})',
  'return typeof window=="undefined"?t.createElement("script",{...w,suppressHydrationWarning:!0,nonce:m,dangerouslySetInnerHTML:{__html:`(${I.toString()})(${p})`}}):null'
);
