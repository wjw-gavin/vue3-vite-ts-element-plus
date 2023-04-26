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
import { throttle } from 'lodash-es'
import { computed, ref } from 'vue'

defineOptions({
  name: 'ODialog'
})

const props = defineProps({
  // 是否显示弹框
  modelValue: {
    type: Boolean,
    default: false
  },
  // 点击遮罩隐藏
  closeOnClickModal: {
    type: Boolean,
    default: false
  },
  // 自定义底部按钮
  customFooter: {
    type: Boolean,
    default: false
  },
  // 不可点击
  disabled: {
    type: Boolean,
    default: false
  },
  // 节流时间
  throttleTime: {
    type: Number,
    default: 1000
  },
  // 是否显示取消按钮
  showCancel: {
    type: Boolean,
    default: true
  },
  // 取消按钮文字
  cancelText: {
    type: String,
    default: '取 消'
  },
  // 是否显示确认按钮
  showConfirm: {
    type: Boolean,
    default: true
  },
  // 确认按钮文字
  confirmText: {
    type: String,
    default: '确 认'
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const loading = ref(false)

const dialogVisible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
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
  emit('cancel')
  emit('update:modelValue', false)
}
</script>
