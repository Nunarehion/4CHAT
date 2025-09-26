<script lang="ts">
import { onMount } from 'svelte';
let timeoutId: ReturnType<typeof setTimeout>;

onMount(() => {
  timeoutId = setTimeout(() => {
    window.location.href = '/';
  }, 5000);
});

export function destroy() {
  clearTimeout(timeoutId);
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  font-family: system-ui, sans-serif;
  background: #f9f9f9;
  color: #333;
}
h1 { font-size: 4rem; margin: 0; }
p { margin: 1rem 0; font-size: 1.2rem; }
a { color: #0066cc; text-decoration: underline; }
</style>

<div class="container">
  <h1>404</h1>
  <p>Страница не найдена.</p>
  <p><a href="/">Вернуться на главную</a></p>
  <p>Через 5 секунд вы будете автоматически перенаправлены.</p>
</div>
