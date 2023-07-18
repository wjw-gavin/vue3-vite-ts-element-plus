<template>
  <el-form ref="formRef" :model="form" label-position="top" :inline="true">
    <template v-for="item in searchItems" :key="item.prop">
      <template v-if="item.type === 'complex'">
        <el-form-item
          v-for="(autocomplete, $index) in item.children"
          :key="autocomplete.id"
          class="complex"
          :label="$index === 0 ? item.label + '' : ''"
        >
          <el-select
            v-model="form[autocomplete.paramName]"
            :popper-append-to-body="false"
            class="search-item"
            value-key="key"
            clearable
            filterable
            :loading="loading"
            placeholder=""
            @change="
              (value) => {
                cascaderHandleChange(value, item.children, $index)
              }
            "
          >
            <el-option
              v-for="option in autocomplete.options"
              :key="option.key"
              :label="option.value"
              :value="option.key"
            />
          </el-select>
        </el-form-item>
      </template>

      <el-form-item v-else :prop="item.prop" :label="(item.label as string)">
        <!-- 基础输入框 -->
        <el-input
          v-if="item.type === 'text'"
          v-model="form[item.prop as string]"
          clearable
          :placeholder="item.placeholder as string || '请输入' + item.label"
        />

        <!-- 下拉选择框 -->
        <o-select
          v-else-if="item.type === 'select'"
          v-model="form[item.prop as string]"
          :multiple="item.multiple"
          :option-key="item.optionsKey"
          :placeholder="'请选择' + item.label"
          :prop="item.optionProp"
          :options="item.options"
        />

        <!-- 远程搜索选择框 -->
        <o-select
          v-else-if="item.type === 'autocomplete'"
          v-model="form[item.prop as string]"
          :multiple="item.multiple"
          :search-key="item.searchKey"
          :options="item.options"
          remote-show-suffix
          :placeholder="item.placeholder as string || '请输入' + item.label"
        />

        <!-- 单独日期 -->
        <el-date-picker
          v-if="item.type === 'date' || item.type === 'datetime'"
          v-model="form[item.prop as string]"
          :type="item.type"
          :format="item.format ? item.format : 'yyyy-MM-dd HH:mm:ss'"
          :value-format="item.format ? item.format : 'yyyy-MM-dd HH:mm:ss'"
          :placeholder="getPlaceHolder(item.placeholder)"
        />
      </el-form-item>
    </template>
    <div class="flex items-end mb-10px">
      <el-button @click="resetForm(formRef)">重置</el-button>
      <el-button type="primary" :loading="loading" @click="submitForm">
        查询
      </el-button>
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { cloneDeep, isArray, isEmpty, omit } from 'lodash-es'
import { makeArrayProp } from '@/utils'
import type { FormInstance } from 'element-plus'
import type { ISearchItem, TObject } from '@/types'

defineOptions({ name: 'OSearch' })

const emit = defineEmits(['submitSearch'])

const props = defineProps({
  loading: Boolean,
  searchItems: makeArrayProp<ISearchItem>()
})

const form = reactive<TObject>({})
const formRef = ref<FormInstance>()

const getPlaceHolder = (placeholder?: string | string[], index?: number) => {
  if (isEmpty(placeholder)) return '请选择'
  if (isArray(placeholder)) {
    return placeholder[index!]
  } else {
    return placeholder
  }
}

const initFormFelid = () => {
  props.searchItems.forEach((item: ISearchItem) => {
    if (!item.prop) {
      return
    }
    if (item.type === 'dateRange') {
      let val0 = ''
      if (item.defaultValue && item.defaultValue[0]) {
        //设置开始日期默认值
        val0 = item.defaultValue[0]
      }
      let val1: Date | string = ''
      if (item.defaultValue && item.defaultValue[1]) {
        //设置结束日期默认值
        val1 = item.defaultValue[1]
      }
      form[item.prop[0]] = val0
      form[item.prop[1]] = val1
    } else {
      let val = ''
      if (item.defaultValue) {
        val = item.defaultValue as string
      }
      form[item.prop as string] = val
    }
  })
}

// 级联复合搜索
const cascaderHandleChange = (value: any, children: any, index: number) => {
  if (index + 1 === children.length) return // 排除随后一项
  // 如果清空前一项，后面选项置空
  if (!value) {
    for (let i = index + 1; i < children.length; i++) {
      form[children[i].id] = null
      children[i].options = []
    }
    return
  }
  const url = `/search/options/${children[index + 1].id}`
  const key = children[index].id
  const param: TObject = {}
  param[key] = value
  console.log(url)

  // get(url, { condition: param }).then((res) => {
  //   children[index + 1].options = res
  // })
}

const submitForm = () => {
  let result = cloneDeep(form)
  Object.keys(result).forEach((key) => {
    const val = result[key]
    if (!val && val !== 0) {
      result = omit(result, key)
    }
  })
  emit('submitSearch', result)
}

const resetForm = (formEl: FormInstance | undefined) => {
  formEl?.resetFields()
  submitForm()
}

onMounted(initFormFelid)
</script>
<style lang="scss" scoped>
.el-form.el-form--label-top {
  .el-form-item {
    margin-bottom: 10px;
    margin-right: 20px;
  }

  .el-form-item,
  .el-date-editor .el-input__wrapper {
    width: 250px !important;
  }
}
</style>
