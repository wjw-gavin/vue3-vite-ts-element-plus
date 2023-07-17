<template>
  <el-form ref="myFormRef" label-position="top" :model="myForm" :inline="true">
    <template v-for="item in searchItems" :key="item.prop">
      <!--------------------------- 时间区间 --------------------->
      <template v-if="item.type === 'dateRange'">
        <el-form-item :prop="item.prop[0]" :label="item.label[0]">
          <el-date-picker
            v-model="myForm[item.prop[0]]"
            :type="item.subType || 'date'"
            :disabled-date="disabledStart"
            :placeholder="getPlaceHolder(item.placeholder, 0)"
            :format="item.format ? item.format : 'yyyy-MM-dd HH:mm:ss'"
            :value-format="item.format ? item.format : 'yyyy-MM-dd HH:mm:ss'"
          />
        </el-form-item>
        <el-form-item :prop="item.prop[1]" :label="item.label[1]">
          <el-date-picker
            v-model="myForm[item.prop[1]]"
            :type="item.subType || 'date'"
            :disabled-date="disabledEnd"
            :placeholder="getPlaceHolder(item.placeholder, 1)"
            :format="item.format ? item.format : 'yyyy-MM-dd HH:mm:ss'"
            :value-format="item.format ? item.format : 'yyyy-MM-dd HH:mm:ss'"
          />
        </el-form-item>
      </template>
      <!------------------ 单个表单项 --------------------->
      <el-form-item v-else :prop="item.prop" :label="(item.label as string)">
        <!-- 基础输入框 -->
        <el-input
          v-if="item.type === 'text'"
          v-model="myForm[item.prop as string]"
          clearable
          :placeholder="item.placeholder as string || '请输入' + item.label"
        />

        <!-- 下拉选择框 -->
        <o-select
          v-else-if="item.type === 'select'"
          v-model="myForm[item.prop as string]"
          :multiple="item.multiple"
          :option-key="item.optionsKey"
          :placeholder="'请选择' + item.label"
          :prop="item.optionProp"
          :options="item.options"
        />

        <!-- 远程搜索选择框 -->
        <o-select
          v-else-if="item.type === 'autocomplete'"
          v-model="myForm[item.prop as string]"
          :multiple="item.multiple"
          :search-key="item.searchKey"
          :options="item.options"
          remote-show-suffix
          :placeholder="item.placeholder as string || '请输入' + item.label"
        />

        <!-- 单独日期 -->
        <el-date-picker
          v-if="item.type === 'date' || item.type === 'datetime'"
          v-model="myForm[item.prop as string]"
          :type="item.type"
          :format="item.format ? item.format : 'yyyy-MM-dd HH:mm:ss'"
          :value-format="item.format ? item.format : 'yyyy-MM-dd HH:mm:ss'"
          :placeholder="getPlaceHolder(item.placeholder)"
        />
      </el-form-item>
    </template>
    <div class="mt-7.5">
      <el-button @click="resetForm(myFormRef)">重置</el-button>
      <el-button type="primary" @click="submitForm"> 查询 </el-button>
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
  searchItems: makeArrayProp<ISearchItem>()
})

const myForm = reactive<TObject>({})
const myFormRef = ref<FormInstance>()

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
      myForm[item.prop[0]] = val0
      myForm[item.prop[1]] = val1
    } else {
      let val = ''
      if (item.defaultValue) {
        val = item.defaultValue as string
      }
      myForm[item.prop as string] = val
    }
  })
}

const submitForm = () => {
  let result = cloneDeep(myForm)
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

/*********** 时间区间 控制开始与结束日期 begin *************/
const disabledStart = (time: Date) => {
  let key = ''
  props.searchItems.forEach((item: ISearchItem) => {
    if (item.type === 'dateRange' && Array.isArray(item.prop)) {
      key = item.prop[1]
    }
  })
  const eDate = myForm[key]
  if (eDate) {
    return time.getTime() > new Date(eDate).getTime()
  }
}

const disabledEnd = (time: Date) => {
  let key = ''
  props.searchItems.forEach((item: ISearchItem) => {
    if (item.type === 'dateRange' && Array.isArray(item.prop)) {
      key = item.prop[0]
    }
  })
  const sDate = myForm[key]
  if (sDate) {
    return time.getTime() < new Date(sDate).getTime()
  }
}
/*********** 时间区间 控制开始与结束日期 end *************/

onMounted(initFormFelid)
</script>
<style lang="scss" scoped>
.el-form.el-form--label-top {
  .el-form-item {
    margin-bottom: 8px;
  }

  .el-form-item,
  .el-date-editor .el-input__wrapper {
    width: 250px !important;
  }
}
</style>
