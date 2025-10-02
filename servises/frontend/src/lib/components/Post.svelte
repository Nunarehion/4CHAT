<script>
  export let title = "ghjkl";
  export let author = "";
  export let username = "";
  export let date = "";
</script>

<div class="card">
  <div class="card-header">
    {title}
    <div class="autor-avatar"></div>
    <div class="user-info">
      <div class="author-name">{author}</div>
      <div class="user-name">{username}</div>
      <div class="date-create">{date}</div>
    </div>
    <div class="action-menu"></div>
  </div>
  <div class="content"></div>
  <div class="action-panel"></div>
</div>

<style lang="stylus">
.card
  background: red
  width 400px
  height 400px

  &-header
    background green
    color gold

  .autor-avatar
    width 40px
    height 40px
    background #ccc
    border-radius 50%

  .user-info
    display flex
    flex-direction column

    .author-name
      font-weight bold

    .user-name
      color rgba(0,0,0,0.6)

    .date-create
      font-size 12px
      color rgba(0,0,0,0.4)

  .content
    padding 12px

  .action-panel
    padding 8px
</style>
