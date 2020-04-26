<template>
  <div id="app">
    <cb-button type="warning">测试按钮</cb-button>
    <cb-button class="btn-margin" type="warning" round>警告按钮</cb-button>
    <cb-button class="btn-margin" type="danger" round>危险按钮</cb-button>
    <cb-button class="btn-margin" type="info" icon="iconshanchu" round>删除</cb-button>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
  .app{
    background-color: hotpink;
  }
</style>
