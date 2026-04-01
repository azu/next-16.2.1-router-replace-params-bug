"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PageB() {
  const router = useRouter();
  return (
    <div style={{ padding: 20 }}>
      <h1>Page B</h1>
      <p>Current URL: <code id="current-url">{typeof window !== "undefined" ? window.location.href : ""}</code></p>
      <button
        id="btn-replace-to-a"
        onClick={() => router.replace("/page-a")}
      >
        router.replace(&quot;/page-a&quot;)
      </button>
      <p>
        <Link href="/page-a?foo=bar&test=true">Back to Page A with query</Link>
      </p>
    </div>
  );
}
