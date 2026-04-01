export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Next.js 16.2.1 router.replace query params bug</h1>
      <p>
        To reproduce, open this URL directly (full page load):
      </p>
      <pre>http://localhost:3099/page-a?foo=bar&amp;test=true</pre>
      <p>Then follow Step 2 → Step 3 on that page.</p>
    </div>
  );
}
