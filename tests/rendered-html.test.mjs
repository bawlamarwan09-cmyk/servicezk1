import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete Evolura landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Evolura Technical Services \| Cleaning &amp; Maintenance in Dubai<\/title>/i);
  assert.match(html, /Clean spaces\./i);
  assert.match(html, /Well-maintained/i);
  assert.match(html, /Cleaning services/i);
  assert.match(html, /Maintenance services/i);
  assert.match(html, /Request a service/i);
  assert.match(html, /id="request-service"/i);
  assert.match(html, /name="phone"/i);
  assert.match(html, /name="service"/i);
  assert.match(html, /info@evolurats\.com/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("keeps service requests accessible and production-ready", async () => {
  const [page, component, styles, layout, packageJson] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/EvoluraLanding.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("package.json", root), "utf8"),
  ]);

  assert.match(page, /EvoluraLanding/);
  assert.match(component, /https:\/\/wa\.me\/971503112307/);
  assert.match(component, /aria-live="polite"/);
  assert.match(component, /Skip to main content/);
  assert.match(component, /type="checkbox" required/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(styles, /scroll-margin-top/);
  assert.match(layout, /Evolura Technical Services/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await access(new URL("public/evolura-hero.webp", root));
  await access(new URL("public/evolura-hero-960.webp", root));
  await assert.rejects(access(new URL("app/_sites-preview", root)));
});
