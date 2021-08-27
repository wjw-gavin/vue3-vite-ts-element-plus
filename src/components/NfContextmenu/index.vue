<template>
  <transition nae="fade" mode="out-in">
    <div
      v-if="showContextmenu"
      id="nf-contextmenu"
      ref="contextmenu"
      class="nf-contextmenu"
    >
      <slot name="content"></slot>
    </div>
  </transition>
</template>

<script lang="ts">
//    <nf-contextmenu :show-contextmenu.sync="showContextmenu">
//       <ul slot="content">
//         <li>11111</li>
//         <li>22222</li>
//         <li>33333</li>
//       </ul>
//     </nf-contextmenu>
//     <el-tag style="margin-left: 220px" @contextmenu.native.prevent="contextmenuClick">右键菜单</el-tag>
/**
 * @Description: 右键菜单容器组件
 * @Author: wjw
 * @Date: 2021-08-18 18:33:53
 */
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'NfContextmenu',
  props: {
    showContextmenu: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:showContextmenu'],
  setup(props, { emit }) {
    const contextmenu = ref<any>(null)
    const slideClick = (e) => {
      // 当弹框不包含被点击的元素时，关闭弹框
      if (contextmenu.value) {
        if (contextmenu.value.contains(e.target)) {
          emit('update:showContextmenu', false)
        }
      }
    }
    return {
      contextmenu,
      slideClick
    }
  },
  mounted() {
    document.addEventListener('click', this.slideClick)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.slideClick)
  },
  methods: {}
})
</script>

<style lang="scss" scoped>
.nf-contextmenu {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  min-width: 100px;
  z-index: 100;
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
}
</style>
