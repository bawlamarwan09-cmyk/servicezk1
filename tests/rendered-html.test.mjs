import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render(pathname = "/", accept = "text/html") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept },
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
  assert.match(html, /<html lang="en-AE">/i);
  assert.match(
    html,
    /<title>Commercial Cleaning &amp; Building Maintenance Dubai \| Evolura<\/title>/i,
  );
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/evolura-technical-services\.bawlamarwan09\.chatgpt\.site"/i,
  );
  assert.match(html, /Commercial Cleaning &amp;/i);
  assert.match(html, /Building Maintenance/i);
  assert.match(html, /in Dubai &amp; UAE/i);
  assert.match(html, /Get a Free WhatsApp Quote/i);
  assert.match(html, /Request a Free Quote/i);
  assert.match(html, /id="request-service"/i);

  const quoteForm = html.match(
    /<form[^>]*class="[^"]*\brequest-form\b[^"]*"[^>]*>[\s\S]*?<\/form>/i,
  )?.[0];
  assert.ok(quoteForm, "the free-quote form should be server-rendered");
  assert.deepEqual(
    [...quoteForm.matchAll(/\bname="([^"]+)"/gi)].map((match) => match[1]),
    ["name", "phone", "service", "location", "message"],
    "the quote form should contain exactly the five approved fields",
  );
  assert.doesNotMatch(quoteForm, /\bname="(?:email|property|date|consent)"/i);
  assert.doesNotMatch(quoteForm, /type="checkbox"/i);

  assert.match(html, /info@evolurats\.com/i);
  assert.match(html, /LocalBusiness/i);
  assert.match(html, /FAQPage/i);
  assert.match(html, /commercial-office-cleaning-dubai/i);
  assert.match(html, /facility-management-services-uae/i);
  assert.doesNotMatch(
    html,
    /class="[^"]*\bseo-service-card\b[^"]*\breveal\b/i,
    "service cards must remain fully opaque while they enter the viewport",
  );
  assert.match(
    html,
    /Current images are illustrative service previews[\s\S]{0,30}not client projects/i,
  );
  assert.doesNotMatch(html, /AggregateRating|ratingValue|reviewCount|testimonial/i);
  assert.doesNotMatch(
    html,
    /\b\d{2,}\+\s*(?:clients?|customers?|projects?|reviews?|years?|sites?)\b/i,
  );
  assert.doesNotMatch(html, /\b(?:award[- ]winning|ISO(?:\s+\d+)? certified|#1|best[- ]rated)\b/i);
  assert.doesNotMatch(html, /<meta[^>]+name="keywords"/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("serves focused, canonical service pages", async () => {
  const routes = [
    ["/services/commercial-office-cleaning-dubai", /Commercial and office cleaning services in Dubai/i],
    ["/services/deep-post-construction-cleaning-dubai", /Deep and post-construction cleaning in Dubai/i],
    ["/services/building-maintenance-dubai", /Reliable building maintenance services in Dubai/i],
    ["/services/mep-hvac-maintenance-dubai", /MEP and HVAC maintenance services in Dubai/i],
    ["/services/facility-management-services-uae", /Facility management services across the UAE/i],
  ];

  for (const [route, heading] of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, heading, route);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://[^\"]+${route}"`, "i"), route);
    assert.match(html, /Service/i, route);
    assert.match(html, /BreadcrumbList/i, route);
    assert.match(html, /FAQPage/i, route);
  }
});

test("publishes crawl directives and a complete sitemap", async () => {
  const [robotsResponse, sitemapResponse] = await Promise.all([
    render("/robots.txt", "text/plain"),
    render("/sitemap.xml", "application/xml"),
  ]);

  assert.equal(robotsResponse.status, 200);
  assert.equal(sitemapResponse.status, 200);

  const [robots, sitemap] = await Promise.all([
    robotsResponse.text(),
    sitemapResponse.text(),
  ]);

  assert.match(robots, /User-Agent:\s*\*/i);
  assert.match(robots, /Allow:\s*\//i);
  assert.match(robots, /Sitemap:\s*https:\/\/[^\s]+\/sitemap\.xml/i);
  assert.match(sitemap, /commercial-office-cleaning-dubai/i);
  assert.match(sitemap, /deep-post-construction-cleaning-dubai/i);
  assert.match(sitemap, /building-maintenance-dubai/i);
  assert.match(sitemap, /mep-hvac-maintenance-dubai/i);
  assert.match(sitemap, /facility-management-services-uae/i);
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
  assert.match(component, /Request a Free Quote/);
  assert.doesNotMatch(component, /<span>\{service\.number\}<\/span>/);
  assert.doesNotMatch(component, /type="checkbox"/);
  assert.doesNotMatch(component, /name="(?:email|property|date|consent)"/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(styles, /@keyframes service-card-scroll-lift/);
  assert.match(styles, /scroll-margin-top/);
  assert.match(page, /Commercial Cleaning & Building Maintenance Dubai \| Evolura/);
  assert.match(layout, /Evolura Technical Services/);
  assert.match(layout, /LocalBusiness/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await access(new URL("public/evolura-hero.webp", root));
  await access(new URL("public/evolura-hero-960.webp", root));
  await assert.rejects(access(new URL("app/_sites-preview", root)));
});
