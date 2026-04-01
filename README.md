# Next.js 16.2.1: `router.replace`/`router.push` restores stale query parameters from cache in static exports

## Bug

When using `output: "export"`, `router.replace(path)` or `router.push(path)` restores query parameters from a previously cached navigation entry, even though the target URL has no query string.

For example, if you visit `/page-a?foo=bar`, navigate away, and then call `router.replace("/page-a")`, the URL becomes `/page-a?foo=bar` instead of `/page-a`. This affects `window.location.href`, `useSearchParams()`, and the browser address bar.

## Affected versions

- **Broken**: Next.js 16.2.0, 16.2.1
- **Working**: Next.js 16.1.6

## Setup

```bash
pnpm install
pnpm run build
pnpm run start
```

## Manual reproduction

### Step 1: Open `/page-a?foo=bar&test=true` directly in browser

```
http://localhost:3099/page-a?foo=bar&test=true
```

This must be a full page load (type the URL in the address bar or refresh). This caches the URL with query parameters in the Next.js client router.

### Step 2: Click `router.push("/page-b")` button

The page navigates to `/page-b`. Address bar shows `localhost:3099/page-b` (no query parameters).

### Step 3: Click `router.replace("/page-a")` button

**Expected**: address bar shows `localhost:3099/page-a` (no query parameters).

**Actual (bug)**: address bar shows `localhost:3099/page-a?foo=bar&test=true`. The stale query parameters from Step 1 are restored from the router cache.

You can also confirm by running `window.location.href` in DevTools console.

## Automated test

```bash
# Start the server first, then in another terminal:
pnpm test
```

## Summary

| Scenario | 16.1.6 | 16.2.1 |
|---|---|---|
| `router.replace("/page-b")` (different path) | params cleared | params cleared |
| `router.replace("/page-a")` (same path, no query) | params cleared | **params restored from cache** |
| Visit `/page-a?q=1` → `router.push("/page-b")` → `router.replace("/page-a")` | params cleared | **params restored from cache** |

## Impact

- `window.location.href` returns a URL with stale query parameters
- `useSearchParams()` returns stale values
- Browser address bar shows stale query parameters
- Any logic that reads URL parameters after navigation gets incorrect values
- Redirect chains that check query parameters can enter infinite loops

## Configuration

```ts
// next.config.ts
const nextConfig: NextConfig = {
  output: "export",
};
```
