<script lang="ts">
  import { onMount } from "svelte";
  import { ping } from "$lib/api.js";

  let loading: boolean = true;
  let error: string | null = null;
  let data: { status: string; message: string } | null = null;

  onMount(async () => {
    try {
      data = await ping();
    } catch (e) {
      error = (e as Error).message ?? String(e);
    } finally {
      loading = false;
    }
  });

  import Form from "$lib/components/Form.svelte";
</script>

<Form />

{#if loading}
  <p>Загрузка…</p>
{:else if error}
  <p style="color:red">Ошибка: {error}</p>
{:else}
  <h2>Тестовый эндпоинт</h2>
  <pre>{JSON.stringify(data, null, 2)}</pre>
{/if}
