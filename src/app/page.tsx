"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>router.replace query param test</h1>
      <p>
        <Link href="/page-a?foo=bar&test=true">
          Go to /page-a?foo=bar&test=true
        </Link>
      </p>
    </div>
  );
}
