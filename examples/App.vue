<template>
  <div id="app">
    <cb-button type="warning">测试按钮</cb-button>
  </div>
</template>

<script>
import CbButton from "../packages/button";
export default {
  name: 'App',
  components: {
    CbButton
  }
}
</script>

<style lang="scss" scoped>
  .app{
    background-color: hotpink;
  }
</style>
