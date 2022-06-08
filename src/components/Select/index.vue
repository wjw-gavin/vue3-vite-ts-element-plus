<template>
  <el-select
    :model-value="value"
    v-bind="$attrs"
    :value-key="valueKey ? valueKey : ''"
    :filterable="!!searchKey || filterable"
    :remote="!!searchKey"
    :clearable="clearable"
    :multiple="multiple"
    collapse-tags
    reserve-keyword
    :loading="loading"
    :popper-append-to-body="popperAppendToBody"
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    @change="changeEvent"
  >
    <el-option
      v-for="option in optionList"
      :key="option[props.key]"
      :label="option[props.value]"
      :value="valueKey ? option : option[props.key]"
    />
  </el-select>
</template>

<script lang="ts">
/**
 * @Description: 下拉组件
 */
import { defineComponent, reactive, PropType, toRefs } from 'vue'
import { get } from '@/http/request'
interface Options {
  key: number | string
  value: string
}
export default defineComponent({
  name: 'GSelect',
  props: {
    // 占位符
    placeholder: {
      type: String,
      default: ''
    },
    // 是否插入body
    popperAppendToBody: {
      type: Boolean,
      default: false
    },
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
    // 是否可多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 下拉数据
    options: {
      type: Array as PropType<Options[]>,
      default: () => []
    },
    // 绑定值
    value: {
      type: [String, Number, Object],
      default: ''
    },
    // 选中的值(name)
    selectValue: {
      type: String,
      default: ''
    },
    // 选中的key(id)
    selectKey: {
      type: String,
      default: ''
    },
    // 默认key，value，如果是id name，传入props="{key: 'id', value: 'name'}"
    props: {
      type: Object,
      default: () => {
        return {
          key: 'key',
          value: 'value'
        }
      }
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const select = reactive({
      loading: false,
      optionList: []
    })
    // 远程搜索
    const remoteMethod = (query: string) => {
      if (query.trim() !== '') {
        select.loading = true
        let url = `management/center/search/autocomplete/${props.searchKey}`
        get(url, { keyword: query }).then((res: any) => {
          select.loading = false
          select.optionList = res
        })
      } else {
        select.optionList = []
      }
    }
    // 选中值改变
    const changeEvent = (val: string | unknown) => {
      emit('update:value', val)
    }

    return {
      ...toRefs(select),
      changeEvent,
      remoteMethod
    }
  }
})
</script>
