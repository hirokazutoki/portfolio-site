import { visit } from 'unist-util-visit';
import fs from 'node:fs';
import path from 'node:path';

const CACHE_FILE = path.resolve('.cache/link-card-ogp.json');

function loadCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function saveCache(cache) {
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

function extractMetaProperty(html, property) {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']*)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${property}["']`, 'i'),
  ];
  for (const re of patterns) {
    const match = html.match(re);
    if (match) return match[1];
  }
  return null;
}

function extractMetaName(html, name) {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["']`, 'i'),
  ];
  for (const re of patterns) {
    const match = html.match(re);
    if (match) return match[1];
  }
  return null;
}

function extractTitleTag(html) {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? match[1] : null;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function fetchOgp(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LinkCardBot/1.0)' },
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const html = await res.text();
    const title = extractMetaProperty(html, 'og:title') ?? extractTitleTag(html) ?? url;
    const image = extractMetaProperty(html, 'og:image');
    return { title, image };
  } finally {
    clearTimeout(timeout);
  }
}

export function remarkLinkCard() {
  return async (tree) => {
    const cache = loadCache();
    let cacheChanged = false;

    const targets = [];
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!parent || node.children.length !== 1 || node.children[0].type !== 'link') return;
      targets.push({ index, parent, url: node.children[0].url });
    });

    for (const { index, parent, url } of targets) {
      let data = cache[url];
      if (!data) {
        try {
          data = await fetchOgp(url);
          cache[url] = data;
          cacheChanged = true;
        } catch (err) {
          console.warn(`[remark-link-card] Failed to fetch OGP for ${url}:`, err.message);
          continue;
        }
      }

      const hostname = new URL(url).hostname;
      const imageHtml = data.image
        ? `<img class="link-card-image" src="${escapeHtml(data.image)}" alt="" loading="lazy">`
        : '';

      const html = `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="link-card">${imageHtml}<div class="link-card-body"><div class="link-card-title">${escapeHtml(data.title)}</div><div class="link-card-url">${escapeHtml(hostname)}</div></div></a>`;

      parent.children[index] = { type: 'html', value: html };
    }

    if (cacheChanged) saveCache(cache);
  };
}
