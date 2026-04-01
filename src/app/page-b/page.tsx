"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function PageBContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [locationHref, setLocationHref] = useState("");

  useEffect(() => {
    setLocationHref(window.location.href);
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>Page B</h1>
      <p>usePathname(): <code>{pathname}</code></p>
      <p>useSearchParams(): <code>{searchParams.toString() || "(empty)"}</code></p>
      <p>window.location.href: <code>{locationHref}</code></p>

      <h2>Step 3: Navigate back to page-a WITHOUT query parameters</h2>
      <p style={{ color: "gray" }}>
        Expected: URL becomes <code>/page-a</code> (no query params)<br />
        Actual (bug): URL becomes <code>/page-a?foo=bar&amp;test=true</code> (stale params restored)
      </p>
      <button
        id="btn-replace-to-a"
        onClick={() => router.replace("/page-a")}
        style={{ fontSize: 18, padding: "8px 16px", cursor: "pointer" }}
      >
        router.replace("/page-a") →
      </button>
    </div>
  );
}

export default function PageB() {
  return (
    <Suspense>
      <PageBContent />
    </Suspense>
  );
}
