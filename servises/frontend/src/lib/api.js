export async function ping() {
  const resp = await fetch('/api/ping/');
  if (!resp.ok) throw new Error('Network error');
  return await resp.json();   // {status: "ok", message: "pong"}
}
