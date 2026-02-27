<template>
  <el-dialog
    v-model="dialogVisible"
    v-bind="$attrs"
    draggable
    :close-on-click-modal="closeOnClickModal"
  >
    <slot />

    <template #footer>
      <div>
        <el-button v-if="showCancel" @click="onCancel">
          {{ cancelText }}
        </el-button>
        <el-button
          v-if="showConfirm"
          type="primary"
          :loading="loading"
          :disabled="disabled"
          @click="onConfirm"
        >
          {{ confirmText }}
        </el-button>
      </div>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { throttle } from 'lodash-es'
import { makeNumberProp, makeStringProp, truthProp } from '@/utils'

defineOptions({
  name: 'ODialog'
})

const props = defineProps({
  disabled: Boolean,
  showCancel: truthProp,
  cancelText: makeStringProp('取消'),
  showConfirm: truthProp,
  confirmText: makeStringProp('确认'),
  customFooter: Boolean,
  closeOnClickModal: Boolean,
  throttleTime: makeNumberProp(1000)
})

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm', loading: (value?: boolean) => void): void
}>()

// Vue 3.5+ defineModel 替代手动 computed + emit
const dialogVisible = defineModel<boolean>({ default: false })

const loading = ref(false)

// 默认支持防连点间隔1s
const onConfirm = throttle(() => {
  if (!loading.value) {
    emit('confirm', (value = false) => {
      loading.value = value
    })
  }
}, props.throttleTime)

const onCancel = () => {
  dialogVisible.value = false
  emit('cancel')
}
</script>
