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
    :remote-method="remoteMethod"
    @clear="onClear"
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
import { type PropType, computed, onBeforeMount, ref, watchEffect } from 'vue'
import { getAutocompleteOptions, getOptions } from '@/api/common'
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
  // 搜索 key，相当于后端 controller，如果设置了该属性，会启用远程搜索
  searchKey: {
    type: String,
    default: ''
  },
  // 获取指定 key 的下拉数据，如果设置了该属性，会自定请求 options
  // 注意：optionKey, searchKey 只能同时传一个
  optionKey: {
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

if (props.optionKey && props.searchKey) {
  console.error('optionKey 和 searchKey 只能同时传一个')
}

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const getDefaultOptions = async () => {
  const result = await getOptions(props.optionKey)
  _options.value = result
}

const remoteMethod = async (query: string) => {
  if (query.trim() !== '') {
    loading.value = true
    const result = await getAutocompleteOptions(props.searchKey, query)
    loading.value = false
    _options.value = result
  } else {
    _options.value = []
  }
}

const onClear = () => {
  if (props.searchKey) {
    _options.value = []
  }
}

onBeforeMount(() => {
  if (props.optionKey) getDefaultOptions()
})

watchEffect(() => {
  _options.value = props.options
})
</script>
