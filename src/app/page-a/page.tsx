"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PageA() {
  const router = useRouter();
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((prev) => [...prev, msg]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Page A</h1>
      <p>Current URL: <code id="current-url">{typeof window !== "undefined" ? window.location.href : ""}</code></p>

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button
          id="btn-replace-path"
          onClick={() => {
            addLog(`Before replace: ${window.location.href}`);
            router.replace("/page-b");
            setTimeout(() => {
              addLog(`After replace: ${window.location.href}`);
            }, 500);
          }}
        >
          router.replace(&quot;/page-b&quot;)
        </button>

        <button
          id="btn-push-path"
          onClick={() => {
            addLog(`Before push: ${window.location.href}`);
            router.push("/page-b");
            setTimeout(() => {
              addLog(`After push: ${window.location.href}`);
            }, 500);
          }}
        >
          router.push(&quot;/page-b&quot;)
        </button>

        <button
          id="btn-replace-same"
          onClick={() => {
            addLog(`Before replace same: ${window.location.href}`);
            router.replace("/page-a");
            setTimeout(() => {
              addLog(`After replace same: ${window.location.href}`);
            }, 500);
          }}
        >
          router.replace(&quot;/page-a&quot;) (same path, no query)
        </button>
      </div>

      <h2 style={{ marginTop: 20 }}>Log</h2>
      <pre id="log" style={{ background: "#f0f0f0", padding: 10 }}>
        {log.join("\n")}
      </pre>
    </div>
  );
}
