import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log("=== Next.js 16.2.1 + output:export - router.replace query param test ===\n");

  // 1. Visit page-a with query parameters
  await page.goto("http://localhost:3099/page-a?foo=bar&test=true");
  await page.waitForLoadState("networkidle");
  const urlBefore = page.url();
  console.log("1. Initial URL:", urlBefore);

  // 2. Click router.replace("/page-b") button (different path)
  await page.click("#btn-replace-path");
  await page.waitForTimeout(1000);
  const urlAfterReplace = page.url();
  console.log("2. After router.replace('/page-b'):", urlAfterReplace);

  const replacedUrl = new URL(urlAfterReplace);
  console.log("   pathname:", replacedUrl.pathname);
  console.log("   search:", replacedUrl.search);
  console.log("   query params preserved?", replacedUrl.search.length > 0 ? "YES (bug!)" : "NO (expected)");

  // 3. Go back and test router.replace("/page-a") (same path, no query)
  await page.goto("http://localhost:3099/page-a?foo=bar&test=true");
  await page.waitForLoadState("networkidle");
  console.log("\n3. Back to page-a with query:", page.url());

  await page.click("#btn-replace-same");
  await page.waitForTimeout(1000);
  const urlAfterReplaceSame = page.url();
  console.log("4. After router.replace('/page-a') (same path, no query):", urlAfterReplaceSame);

  const sameUrl = new URL(urlAfterReplaceSame);
  console.log("   pathname:", sameUrl.pathname);
  console.log("   search:", sameUrl.search);
  console.log("   query params preserved?", sameUrl.search.length > 0 ? "YES (bug!)" : "NO (expected)");

  // 4. Test router.push("/page-b") (different path)
  await page.goto("http://localhost:3099/page-a?foo=bar&test=true");
  await page.waitForLoadState("networkidle");
  console.log("\n5. Back to page-a with query:", page.url());

  await page.click("#btn-push-path");
  await page.waitForTimeout(1000);
  const urlAfterPush = page.url();
  console.log("6. After router.push('/page-b'):", urlAfterPush);

  const pushedUrl = new URL(urlAfterPush);
  console.log("   pathname:", pushedUrl.pathname);
  console.log("   search:", pushedUrl.search);
  console.log("   query params preserved?", pushedUrl.search.length > 0 ? "YES (bug!)" : "NO (expected)");

  // 5. Multi-step flow: page-a?query -> router.push(page-b) -> router.replace(page-a)
  console.log("\n=== Multi-step redirect flow ===");
  await page.goto("http://localhost:3099/page-a?foo=bar&test=true");
  await page.waitForLoadState("networkidle");
  console.log("7. Start at page-a with query:", page.url());

  // Navigate to page-b via router.push (simulates a redirect)
  await page.click("#btn-push-path");
  await page.waitForTimeout(1000);
  console.log("8. After router.push('/page-b'):", page.url());

  // From page-b, router.replace("/page-a") (simulates navigating back after an action)
  await page.click("#btn-replace-to-a");
  await page.waitForTimeout(1000);
  const finalUrl = page.url();
  console.log("9. After router.replace('/page-a') from page-b:", finalUrl);

  const final = new URL(finalUrl);
  console.log("   pathname:", final.pathname);
  console.log("   search:", final.search);
  console.log("   query params preserved?", final.search.length > 0 ? "YES (bug!)" : "NO (expected)");

  await browser.close();
}

main().catch(console.error);
