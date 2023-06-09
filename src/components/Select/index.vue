<template>
  <el-select
    v-model="value"
    v-bind="$attrs"
    :filterable="!!searchKey || filterable"
    :remote="!!searchKey"
    :clearable="clearable"
    collapse-tags
    reserve-keyword
    :loading="loading"
  >
    <el-option
      v-for="option in _options"
      :key="option[prop.value]"
      :label="option[prop.label]"
      :value="valueKey ? option : option[prop.value]"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { type PropType, computed, ref, watchEffect } from 'vue'
import type { IOptionProp } from './types'

defineOptions({
  name: 'OSelect',
  inheritAttrs: true
})

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  // 如果设置了该属性，绑定值为对象
  valueKey: {
    type: String,
    default: ''
  },
  // 搜索内容的key，如果设置了该属性，会启用远程搜索
  searchKey: {
    type: String,
    default: ''
  },
  // 是否可搜索
  filterable: {
    type: Boolean,
    default: true
  },
  // 是否可清除
  clearable: {
    type: Boolean,
    default: true
  },
  // 下拉数据
  options: {
    type: Array,
    default: () => []
  },
  // 绑定值
  modelValue: {
    type: [String, Number, Object],
    default: ''
  },
  prop: {
    type: Object as PropType<IOptionProp>,
    default: () => {
      return {
        label: 'name',
        value: 'id'
      }
    }
  }
})

const loading = ref(false)
const _options = ref<any[]>([])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

watchEffect(() => {
  _options.value = props.options
})
</script>
