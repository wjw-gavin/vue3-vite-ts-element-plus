<template>
  <div class="o-form-wrap relative mb-2.5" :class="{ 'mb-20': showFooter }">
    <el-card>
      <template v-if="title" #header>
        <div class="flex justify-between">
          <span>{{ title }}</span>

          <slot name="header-right" />
        </div>
      </template>
      <slot />
    </el-card>

    <footer
      v-if="showFooter"
      class="form-btn-warp"
      :class="[layoutStore.isCollapse ? 'left-74px' : 'left-230px']"
    >
      <el-button v-if="showCancel" class="w-25" @click="$router.back()">
        返 回
      </el-button>
      <el-button
        v-if="showConfirm"
        class="w-25 ml-4"
        type="primary"
        :loading="loading"
        @click="onConfirm"
      >
        {{ confirmText }}
      </el-button>
      <slot name="footer-btn" />
    </footer>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { throttle } from 'lodash-es'
import { makeNumberProp, makeStringProp, truthProp } from '@/utils'
import { useLayoutStore } from '@/stores'

defineOptions({
  name: 'OFormWrap'
})

const emit = defineEmits(['confirm'])

const props = defineProps({
  title: makeStringProp(''),
  showFooter: truthProp,
  showCancel: truthProp,
  cancelText: makeStringProp('取消'),
  showConfirm: truthProp,
  confirmText: makeStringProp('确认'),
  showRightBtn: truthProp,
  throttleTime: makeNumberProp(1000)
})

const layoutStore = useLayoutStore()

const loading = ref(false)

// 默认支持防连点间隔1s
// 也可以修改时间间隔或通过loading方式实现防连点
const onConfirm = throttle(() => {
  if (!loading.value) {
    emit('confirm', (value = false) => {
      loading.value = value
    })
  }
}, props.throttleTime)
</script>

<style lang="scss" scoped>
.el-card {
  :deep(.el-card__header) {
    font-size: 16px;
    color: var(--el-color-primary);
    font-weight: 700;
    line-height: 2em;
  }
}

.form-btn-warp {
  position: fixed;
  z-index: 4;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 20px;
  perspective: none;
  background-color: #fff;
  border-radius: 4px;
  transition: 0.3s ease-in-out;
  backface-visibility: hidden;
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.05);
}
</style>
@/stores/modules/layout
