<script lang="ts">
  import { onMount } from "svelte";
  import { getProtected, logout } from "$lib/api";
  import { goto } from "$app/navigation";

  let data: any = null;
  let err: string = "";
  let loading = true;
  let logoutLoading = false;

  onMount(async () => {
    loading = true;
    err = "";
    try {
      data = await getProtected();
    } catch (e) {
      err = e instanceof Error ? e.message : String(e);
    } finally {
      loading = false;
    }
  });

  const handleLogout = async () => {
    logoutLoading = true;
    try {
      await logout();
    } catch (e) {
      console.warn("Logout error:", e);
    } finally {
      logoutLoading = false;
      goto("/login");
    }
  };
</script>

<div class="container">
  <div class="card" role="main" aria-labelledby="protected-title">
    <header class="header">
      <div>
        <h1 id="protected-title">Защищённая страница</h1>
        <p class="subtitle">Данные с защищённого эндпоинта</p>
      </div>

      <button class="btn-logout" on:click={handleLogout} disabled={logoutLoading} aria-busy={logoutLoading}>
        {#if logoutLoading}Выход…{:else}Выйти{/if}
      </button>
    </header>

    <section class="content">
      {#if err}
        <div class="error" role="alert">{err}</div>
      {:else if loading}
        <p>Загрузка…</p>
      {:else if data}
        <pre class="json">{JSON.stringify(data, null, 2)}</pre>
      {:else}
        <p>Нет данных.</p>
      {/if}
    </section>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: linear-gradient(180deg,#f8fafc 0%,#ffffff 60%);
    color: #0f1724;
  }

  .container {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 2rem;
  }

  .card {
    width: 100%;
    max-width: 980px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 12px 30px rgba(16,24,40,0.06);
    padding: 1.5rem;
    border: 1px solid rgba(15,23,36,0.04);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  h1 { margin: 0; font-size: 1.25rem; }
  .subtitle { margin: 0.25rem 0 0; color: #475569; }

  .btn-logout {
    padding: 0.5rem 0.9rem;
    background: linear-gradient(90deg,#ef4444,#dc2626);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }
  .btn-logout[disabled] { opacity: 0.7; cursor: not-allowed; }

  .content p { margin: 0.5rem 0; color: #334155; }
  .error {
    background: #fff1f2;
    color: #b91c1c;
    border: 1px solid rgba(185,28,28,0.08);
    padding: 0.6rem 0.75rem;
    border-radius: 8px;
    font-size: 0.95rem;
  }

  .json {
    background: #0f1724;
    color: #e6eef8;
    padding: 1rem;
    border-radius: 8px;
    overflow: auto;
    max-height: 60vh;
  }

  @media (max-width: 720px) {
    .card { padding: 1rem; }
  }
</style>
