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
import { computed, ref } from 'vue'
import { throttle } from 'lodash-es'
import { makeNumberProp, makeStringProp, truthProp } from '@/utils'

defineOptions({
  name: 'ODialog'
})

const emit = defineEmits(['cancel', 'confirm', 'update:modelValue'])

const props = defineProps({
  disabled: Boolean,
  modelValue: Boolean,
  showCancel: truthProp,
  cancelText: makeStringProp('取消'),
  showConfirm: truthProp,
  confirmText: makeStringProp('确认'),
  customFooter: Boolean,
  closeOnClickModal: Boolean,
  throttleTime: makeNumberProp(1000)
})

const loading = ref(false)

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

// 默认支持防连点间隔1s
// 也可以修改时间间隔或通过loading方式实现防连点
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
