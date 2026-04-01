"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function PageAContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [locationHref, setLocationHref] = useState("");

  useEffect(() => {
    setLocationHref(window.location.href);
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>Page A</h1>
      <p>usePathname(): <code>{pathname}</code></p>
      <p>useSearchParams(): <code>{searchParams.toString() || "(empty)"}</code></p>
      <p>window.location.href: <code>{locationHref}</code></p>

      <h2>Step 2: Navigate to page-b</h2>
      <button
        id="btn-push-path"
        onClick={() => router.push("/page-b")}
        style={{ fontSize: 18, padding: "8px 16px", cursor: "pointer" }}
      >
        router.push("/page-b") →
      </button>
    </div>
  );
}

export default function PageA() {
  return (
    <Suspense>
      <PageAContent />
    </Suspense>
  );
}
