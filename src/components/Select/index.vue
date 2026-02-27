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
import { onBeforeMount, ref } from 'vue'
import type { PropType } from 'vue'
import { getAutoComplete, getOptions } from '@/api/common'
import type { IOptionProp } from '@/types'
import { makeArrayProp, makeStringProp, truthProp } from '@/utils'

defineOptions({
  name: 'OSelect',
  inheritAttrs: true
})

const props = defineProps({
  options: makeArrayProp<any>(),
  // 如果设置了该属性，绑定值为对象
  valueKey: makeStringProp(''),
  // 搜索 key，如果设置了该属性，会启用远程搜索
  searchKey: makeStringProp(''),
  // 获取指定 key 的下拉数据，如果设置了该属性，会自动请求 options
  // 注意：optionKey, searchKey 只能同时传一个
  optionKey: makeStringProp(''),
  clearable: truthProp,
  filterable: truthProp,
  prop: {
    type: Object as PropType<IOptionProp>,
    default: () => ({
      key: 'key',
      value: 'value'
    })
  }
})

// Vue 3.5+ defineModel
const value = defineModel<string | number | object>({ default: '' })

const loading = ref(false)
const _options = ref<IOptionProp[]>([])

if (props.optionKey && props.searchKey) {
  console.error('optionKey 和 searchKey 只能同时传一个')
}

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
