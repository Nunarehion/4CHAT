<script>
  import { login } from "$lib/api";
  import { goto } from "$app/navigation";

  let username = "";
  let password = "";
  let error = "";
  let loading = false;

  /** @returns {Promise<void>} */
  const submit = async () => {
    error = "";
    loading = true;
    try {
      await login({ username, password });
      await goto("/protected");
    } catch (e) {
      // @ts-ignore
      error = e && e.message ? e.message : String(e);
    } finally {
      loading = false;
    }
  };
</script>

<div class="container">
  <div class="card" role="region" aria-labelledby="login-title">
    <div class="brand">
      <div class="logo" aria-hidden="true">@</div>
      <div>
        <div id="login-title" class="title">Вход в аккаунт</div>
        <div class="subtitle">Введите свои учётные данные для продолжения</div>
      </div>
    </div>

    <form
      on:submit|preventDefault={submit}
      aria-describedby={error ? "error-msg" : undefined}
    >
      {#if error}
        <div id="error-msg" class="error" role="alert">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M11.001 7h2v6h-2zM11 15h2v2h-2z" fill="#b91c1c" />
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
              stroke="#b91c1c"
              stroke-width="1.2"
              fill="none"
            />
          </svg>
          <div>{error}</div>
        </div>
      {/if}

      <label>
        Имя пользователя
        <input
          class="input"
          bind:value={username}
          placeholder="Введите логин или email"
          autocomplete="username"
          required
          aria-label="Имя пользователя"
        />
      </label>

      <label>
        Пароль
        <input
          class="input"
          type="password"
          bind:value={password}
          placeholder="Минимум 8 символов"
          autocomplete="current-password"
          required
          aria-label="Пароль"
        />
      </label>

      <div class="meta-row">
        <div style="font-size:0.82rem;color:#6b7280;">* Поля обязательны</div>
        <a class="forgot" href="/forgot-password">Забыли пароль?</a>
      </div>

      <button class="btn" type="submit" disabled={loading} aria-busy={loading}>
        {#if loading}Подождите...{:else}Войти{/if}
      </button>

      <div class="link-row">
        Нет аккаунта? <a href="/registration">Зарегистрироваться</a>
      </div>
    </form>
  </div>
</div>

<style>
  .container {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 2rem;
  }

  .card {
    width: 100%;
    max-width: 420px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(16, 24, 40, 0.08);
    padding: 2rem;
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;
    border: 1px solid rgba(15, 23, 36, 0.04);
  }

  /* .card:focus-within {
    transform: translateY(-4px);
    box-shadow: 0 18px 40px rgba(16, 24, 40, 0.12);
  } */

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
    background: linear-gradient(135deg, #2563eb, #7c3aed);
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

  form {
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
    transition:
      box-shadow 0.12s ease,
      border-color 0.12s ease,
      transform 0.12s ease;
  }

  .input:focus {
    border-color: #60a5fa;
    box-shadow: 0 6px 20px rgba(96, 165, 250, 0.12);
    transform: translateY(-1px);
  }

  .input::placeholder {
    color: #94a3b8;
  }

  .meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: #475569;
  }

  .forgot {
    color: #2563eb;
    text-decoration: none;
  }

  .forgot:hover {
    text-decoration: underline;
  }

  .btn {
    height: 46px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.95rem;
    transition:
      transform 0.12s ease,
      box-shadow 0.12s ease,
      opacity 0.12s ease;
    background: linear-gradient(90deg, #2563eb, #7c3aed);
    color: white;
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.12);
  }

  .btn:active {
    transform: translateY(1px) scale(0.998);
  }

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

  .link-row a:hover {
    text-decoration: underline;
  }

  .error {
    background: #fff1f2;
    color: #b91c1c;
    border: 1px solid rgba(185, 28, 28, 0.08);
    padding: 0.6rem 0.75rem;
    border-radius: 8px;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    .card {
      padding: 1.25rem;
      border-radius: 10px;
    }

    .logo {
      width: 40px;
      height: 40px;
    }
  }
</style>
