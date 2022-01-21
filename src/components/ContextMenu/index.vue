<template>
  <transition nae="fade" mode="out-in">
    <div v-if="showContextmenu" ref="target" class="g-contextmenu">
      <slot name="content"></slot>
    </div>
  </transition>
</template>

<script lang="ts">
// <g-contextmenu v-model:show-contextmenu="showContextmenu">
//   <template #content>
//     <ul>
//       <li>11111</li>
//       <li>22222</li>
//       <li>33333</li>
//     </ul>
//   </template>
// </g-contextmenu>
// <el-tag style="margin-left: 220px" @contextmenu.right.prevent="showContextmenu = true">右键菜单</el-tag>
/**
 * @Description: 右键菜单容器组件
 */
import { defineComponent, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
export default defineComponent({
  name: 'GContextmenu',
  props: {
    showContextmenu: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:showContextmenu'],
  setup(props, { emit }) {
    const target = ref(null)

    onClickOutside(target, () => {
      emit('update:showContextmenu', false)
    })
    return { target }
  }
})
</script>

<style lang="scss" scoped>
.g-contextmenu {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  min-width: 100px;
  z-index: 9999;
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
}
</style>
