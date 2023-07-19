<template>
  <el-select
    v-model="value"
    v-bind="$attrs"
    :filterable="!!searchKey || filterable"
    :remote="!!searchKey"
    :clearable="clearable"
    reserve-keyword
    :loading="loading"
    :remote-method="searchKey ? remoteMethod : undefined"
    @clear="onClear"
  >
    <el-option
      v-for="option in _options"
      :key="option.key"
      :label="option[prop.value as 'value']"
      :value="valueKey ? option : option[prop.key as 'key']"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { type PropType, computed, onBeforeMount, ref } from 'vue'
import { makeArrayProp, makeStringProp, truthProp } from '@/utils'
import { getAutoComplete, getOptions } from '@/api/common'
import type { IOptionProp } from '@/types'

defineOptions({
  name: 'OSelect',
  inheritAttrs: true
})

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  options: makeArrayProp<any>(),
  // 如果设置了该属性，绑定值为对象
  valueKey: makeStringProp(''),
  // 搜索 key，相当于后端 controller，如果设置了该属性，会启用远程搜索
  searchKey: makeStringProp(''),
  // 获取指定 key 的下拉数据，如果设置了该属性，会自定请求 options
  // 注意：optionKey, searchKey 只能同时传一个
  optionKey: makeStringProp(''),
  clearable: truthProp,
  filterable: truthProp,
  modelValue: {
    type: [String, Number, Array] as PropType<string | number | object>,
    default: ''
  },
  prop: {
    type: Object as PropType<IOptionProp>,
    default: () => ({
      key: 'key',
      value: 'value'
    })
  }
})

const loading = ref(false)
const _options = ref<IOptionProp[]>([])

if (props.optionKey && props.searchKey) {
  console.error('optionKey 和 searchKey 只能同时传一个')
}

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
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
    const result = await getAutoComplete(props.searchKey, query)
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
  if (props.optionKey) {
    getDefaultOptions()
    return
  }
  _options.value = props.options
})
</script>
