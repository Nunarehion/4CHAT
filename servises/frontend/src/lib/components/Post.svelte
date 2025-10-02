<script>
  /** @type {string} */
  let text =
    "В маленьком прибрежном городке каждое утро начиналось с мягкого шороха волн и запаха свежего хлеба из булочной на углу. Жители спешили по своим делам, но всегда находили минуту, чтобы обменяться улыбкой и коротким приветствием. Старинные дома хранили истории поколений, а узкие улочки вели к смотровой площадке, где вид на бескрайнее море напоминал о вечном круговороте времени. Этот город был домом для тех, кто ценил простые радости.";

  /** @type {any} */
  let {
    author = "Пользователь",
    username = "@user777",
    date = "15 июня 2025",
    content = text,
  } = $props();

  let all_content = $state(false);

  /**
   * @param {string} str
   * @returns {string}
   */
  function truncate(str) {
    return str.length > 150 ? str.slice(0, 150) : str;
  }
</script>

<div class="card">
  <div class="card-header">
    <div class="autor-avatar"></div>
    <div class="user-info">
      <div class="author-name">{author}</div>
      <div class="user-name">{username}</div>
    </div>
    <div class="action-menu">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="3"
          d="M12 6h.01M12 12h.01M12 18h.01"
        /></svg
      >
    </div>
  </div>
  <div class="card-content">
    {#if all_content}
      {content}
    {:else}
      {truncate(content)}
      <span
        class="btn-text"
        onclick={() => {
          all_content = !all_content;
        }}
        aria-hidden="true">Показать полностью</span
      >
    {/if}
  </div>
  <div class="card-footer">
    <div class="action-panel">
      <div class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <!-- Icon from Flowbite Icons by Themesberg - https://github.com/themesberg/flowbite-icons/blob/main/LICENSE --><path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
          /></svg
        >

        <svg
          style="display: none"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          ><!-- Icon from Flowbite Icons by Themesberg - https://github.com/themesberg/flowbite-icons/blob/main/LICENSE --><path
            fill="currentColor"
            d="m12.75 20.66l6.184-7.098c2.677-2.884 2.559-6.506.754-8.705c-.898-1.095-2.206-1.816-3.72-1.855c-1.293-.034-2.652.43-3.963 1.442c-1.315-1.012-2.678-1.476-3.973-1.442c-1.515.04-2.825.76-3.724 1.855c-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a1 1 0 0 0 .743-.34Z"
          />
        </svg>
      </div>
      <div class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          ><!-- Icon from Flowbite Icons by Themesberg - https://github.com/themesberg/flowbite-icons/blob/main/LICENSE --><path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4z"
          /></svg
        >
      </div>
      <div class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          ><!-- Icon from Flowbite Icons by Themesberg - https://github.com/themesberg/flowbite-icons/blob/main/LICENSE --><path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14.5 8.046H11V6.119c0-.921-.9-1.446-1.524-.894l-5.108 4.49a1.2 1.2 0 0 0 0 1.739l5.108 4.49c.624.556 1.524.027 1.524-.893v-1.928h2a3.023 3.023 0 0 1 3 3.046V19a5.593 5.593 0 0 0-1.5-10.954"
          /></svg
        >
      </div>
    </div>
    <div class="date-create">{date}</div>
  </div>
</div>

<style lang="stylus">
.btn-text {
  color: var(--color-primary-500)
  white-space: nowrap
  text-decoration: underline
  cursor: pointer
}
.card
    display: flex
    flex-direction: column
    background: var(--color-surface)
    border: var(--color-border)
    box-shadow: var(--shadow-card)
    border-radius: var(--card-radius)
    padding: var(--container-padding)
    width 400px
    min-height: min-content
    margin: 1rem
    gap: 1rem
    &-header
        display: flex
        gap: var(--space-lg)
    &-content
        flex: 1 0 auto
    &-footer
        display: flex


    .autor-avatar
        width 3rem
        height 3rem
        background #ccc
        border-radius 10%

    .user-info
        display flex
        flex-direction column
        flex: 1 0 auto

    .author-name
        font-weight bold

    .user-name
        color rgba(0,0,0,0.6)

    .date-create
        margin: auto
        font-size 12px
        color rgba(0,0,0,0.4)

    .content
        padding 0px

    .action-panel
        display: flex
        gap: var(--space-md)
        padding var(--space-sm)
        flex: 1 0 auto
        .icon
            width 1.5rem
            aspect-ratio: 1/1
            svg
              color: #ccc
            &:active svg
              color: var(--color-red)
            &.active svg
              color: var(--color-red)


</style>
