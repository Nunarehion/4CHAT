<!-- src/routes/register/+page.svelte -->
<script lang="ts">
  import { register } from "$lib/api";
  import { goto } from '$app/navigation';

  let username = "";
  let email = "";
  let password = "";
  let confirm = "";
  let error: string = "";
  let success = false;
  let loading = false;

  const submit = async (): Promise<void> => {
    error = "";
    success = false;

    if (password !== confirm) {
      error = "Пароли не совпадают";
      return;
    }
    if (password.length < 8) {
      error = "Пароль должен быть минимум 8 символов";
      return;
    }

    loading = true;
    try {
      await register({ username, email, password });
      success = true;
      setTimeout(() => goto("/login"), 1200);
    } catch (e: unknown) {
      error = e instanceof Error ? e.message : String(e);
    } finally {
      loading = false;
    }
  };
</script>

<div class="container">
  <div class="card" role="region" aria-labelledby="reg-title">
    <div class="brand">
      <div class="logo" aria-hidden="true">DD</div>
      <div>
        <div id="reg-title" class="title">Создать аккаунт</div>
        <div class="subtitle">Зарегистрируйтесь, чтобы получить доступ</div>
      </div>
    </div>

    <form class="reg-form" on:submit|preventDefault={submit} aria-describedby={error ? "error-msg" : undefined}>
      {#if error}
        <div id="error-msg" class="error" role="alert">{error}</div>
      {/if}
      {#if success}
        <div class="success" role="status">Регистрация прошла успешно! Перенаправляем…</div>
      {/if}

      <label>
        Имя пользователя
        <input
          class="input"
          bind:value={username}
          placeholder="Отображаемое имя"
          autocomplete="username"
          required
          aria-label="Имя пользователя"
        />
      </label>

      <label>
        Email
        <input
          class="input"
          type="email"
          bind:value={email}
          placeholder="you@example.com"
          autocomplete="email"
          required
          aria-label="Email"
        />
      </label>

      <label>
        Пароль
        <input
          class="input"
          type="password"
          bind:value={password}
          placeholder="Минимум 8 символов"
          autocomplete="new-password"
          required
          aria-label="Пароль"
        />
      </label>

      <label>
        Подтверждение пароля
        <input
          class="input"
          type="password"
          bind:value={confirm}
          placeholder="Повторите пароль"
          autocomplete="new-password"
          required
          aria-label="Подтверждение пароля"
        />
      </label>

      <button class="btn" type="submit" disabled={loading} aria-busy={loading}>
        {#if loading}Создание…{:else}Зарегистрироваться{/if}
      </button>

      <div class="link-row">
        Уже есть аккаунт? <a href="/login">Войти</a>
      </div>
    </form>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: linear-gradient(180deg, #f6fbff 0%, #ffffff 60%);
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
    max-width: 520px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(16,24,40,0.08);
    padding: 2rem;
    transition: transform .18s ease, box-shadow .18s ease;
    border: 1px solid rgba(15,23,36,0.04);
  }
  .card:focus-within {
    transform: translateY(-4px);
    box-shadow: 0 18px 40px rgba(16,24,40,0.12);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  .logo {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: linear-gradient(135deg,#2563eb,#7c3aed);
    display: grid;
    place-items: center;
    color: white;
    font-weight: 700;
    font-size: 1.05rem;
  }
  .title {
    font-size: 1.15rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .subtitle {
    margin-top: 0.25rem;
    font-size: 0.88rem;
    color: #475569;
  }

  .reg-form {
    margin-top: 1rem;
    display: grid;
    gap: 0.75rem;
  }

  label {
    display: grid;
    gap: 0.35rem;
    font-size: 0.9rem;
    color: #0f1724;
  }

  .input {
    height: 44px;
    padding: 0 0.75rem;
    border-radius: 8px;
    border: 1px solid #e6eef8;
    background: #fbfdff;
    outline: none;
    font-size: 0.95rem;
    transition: box-shadow .12s ease, border-color .12s ease, transform .12s ease;
  }
  .input:focus {
    border-color: #60a5fa;
    box-shadow: 0 6px 20px rgba(96,165,250,0.12);
    transform: translateY(-1px);
  }
  .input::placeholder { color: #94a3b8; }

  .meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: #475569;
  }

  .btn {
    height: 46px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.95rem;
    transition: transform .12s ease, box-shadow .12s ease, opacity .12s ease;
    background: linear-gradient(90deg,#2563eb,#7c3aed);
    color: white;
    box-shadow: 0 8px 20px rgba(99,102,241,0.12);
  }
  .btn:active { transform: translateY(1px) scale(.998); }
  .btn[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }

  .link-row {
    text-align: center;
    margin-top: 0.6rem;
    font-size: 0.9rem;
    color: #475569;
  }
  .link-row a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;
  }
  .link-row a:hover { text-decoration: underline; }

  .error {
    background: #fff1f2;
    color: #b91c1c;
    border: 1px solid rgba(185,28,28,0.08);
    padding: 0.6rem 0.75rem;
    border-radius: 8px;
    font-size: 0.9rem;
  }

  .success {
    background: #f0fdf4;
    color: #065f46;
    border: 1px solid rgba(6,95,70,0.08);
    padding: 0.6rem 0.75rem;
    border-radius: 8px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    .card { padding: 1.25rem; border-radius: 10px; }
    .logo { width: 40px; height: 40px; }
  }
</style>
