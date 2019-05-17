<template>
  <transition name="fade">
    <div
      v-if="dialogShow"
      class="posFT maskHs full zIndexH"
      @click.stop="$emit('update:dialogShow', false)">
      <div class="posCC bgcFf borderRa5R BS p_20AM" @click.stop>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['dialogShow']
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>

</style>
