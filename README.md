# Next.js 16.2.1 `router.replace` preserves stale query parameters in static exports

## Bug

When using `output: "export"` with Next.js 16.2.1, `router.replace(path)` and `router.push(path)` preserve query parameters from a previously visited URL when navigating back to the same pathname, even though the target URL has no query string.

This is a regression from Next.js 16.1.6, where `router.replace("/page-a")` correctly cleared query parameters.

## Affected versions

- **Broken**: Next.js 16.2.0, 16.2.1
- **Working**: Next.js 16.1.6

## Reproduction

```bash
pnpm install
pnpm run build
pnpm run start
# In another terminal:
pnpm test
```

### Expected output (Next.js 16.1.6)

```
4. After router.replace('/page-a') (same path, no query): http://localhost:3099/page-a
   query params preserved? NO (expected)

9. After router.replace('/page-a') from page-b: http://localhost:3099/page-a
   query params preserved? NO (expected)
```

### Actual output (Next.js 16.2.1)

```
4. After router.replace('/page-a') (same path, no query): http://localhost:3099/page-a?foo=bar&test=true
   query params preserved? YES (bug!)

9. After router.replace('/page-a') from page-b: http://localhost:3099/page-a?foo=bar&test=true
   query params preserved? YES (this is the driver-web bug!)
```

## Scenarios

| Scenario | 16.1.6 | 16.2.1 |
|---|---|---|
| `router.replace("/page-b")` (different path) | params cleared | params cleared |
| `router.replace("/page-a")` (same path, no query) | params cleared | **params preserved (bug)** |
| `/page-a?q=1` → `router.push("/page-b")` → `router.replace("/page-a")` | params cleared | **params preserved (bug)** |

## Impact

This breaks any application that relies on `router.replace(path)` or `router.push(path)` to navigate to a clean URL without query parameters. In particular:

- Redirect chains that check `window.location.href` for specific query parameters will loop
- `useSearchParams()` returns stale values after navigation
- URL-driven state management breaks when old parameters persist

## Configuration

```ts
// next.config.ts
const nextConfig: NextConfig = {
  output: "export",
};
```

## Notes

- The bug only occurs with `output: "export"` (static site generation). `next dev` works correctly.
- `router.replace` to a **different** pathname correctly clears query parameters. The bug only triggers when navigating to a pathname that was previously visited with query parameters.
