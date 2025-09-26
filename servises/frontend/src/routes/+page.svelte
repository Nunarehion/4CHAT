<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { auth } from '$lib/authStore';
  import { goto } from '$app/navigation';

  // При загрузке корневой страницы проверяем состояние auth‑store
  onMount(() => {
    const { access } = get(auth);

    // Если токен есть – считаем пользователя авторизованным
    if (access) {
      // перенаправляем на защищённый роут
      goto('/protected');
    } else {
      // иначе – на страницу входа
      goto('/login');
    }
  });
</script>

<!-- Пустой шаблон – пользователь сразу будет переадресован -->
