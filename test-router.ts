import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log("=== Next.js 16.2.1 + output:export — router.replace stale query params bug ===\n");

  // Step 1: Open /page-a?foo=bar&test=true (full page load)
  await page.goto("http://localhost:3099/page-a?foo=bar&test=true");
  await page.waitForLoadState("networkidle");
  console.log("Step 1 — Open /page-a?foo=bar&test=true:");
  console.log("  URL:", page.url());

  // Step 2: Click router.push("/page-b")
  await page.click("#btn-push-path");
  await page.waitForTimeout(1000);
  console.log("\nStep 2 — After router.push('/page-b'):");
  console.log("  URL:", page.url());

  // Step 3: Click router.replace("/page-a")
  await page.click("#btn-replace-to-a");
  await page.waitForTimeout(1000);
  const finalUrl = page.url();
  console.log("\nStep 3 — After router.replace('/page-a'):");
  console.log("  URL:", finalUrl);

  const url = new URL(finalUrl);
  if (url.search) {
    console.log("\n❌ BUG: stale query params restored:", url.search);
    console.log("  Expected: http://localhost:3099/page-a");
    console.log("  Actual:  ", finalUrl);
    process.exitCode = 1;
  } else {
    console.log("\n✅ OK: query params correctly cleared");
  }

  await browser.close();
}

main().catch(console.error);
