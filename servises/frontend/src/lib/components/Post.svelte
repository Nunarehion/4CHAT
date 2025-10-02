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

  /**
   * @param {string} str
   * @returns {string}
   */
  function truncate(str) {
    return str.length > 320 ? str.slice(0, 320) : str;
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
        ><!-- Icon from Flowbite Icons by Themesberg - https://github.com/themesberg/flowbite-icons/blob/main/LICENSE --><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="3"
          d="M12 6h.01M12 12h.01M12 18h.01"
        /></svg
      >
    </div>
  </div>
  <div class="card-content">{content}</div>
  <div class="card-footer">
    <div class="action-panel">
      <div class="icon"></div>
      <div class="icon"></div>
      <div class="icon"></div>
    </div>
    <div class="date-create">{date}</div>
  </div>
</div>

<style lang="stylus">
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
            background #ccc
</style>
