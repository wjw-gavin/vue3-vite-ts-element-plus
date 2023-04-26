<template>
  <el-form ref="myFormRef" label-position="top" :model="myForm" :inline="true">
    <template v-for="item in searchItems" :key="item.prop">
      <!--------------------------- 时间区间 --------------------->
      <template v-if="item.type === 'dateRange'">
        <el-form-item :prop="item.prop[0]" :label="item.name[0]">
          <el-date-picker
            v-model="myForm[item.prop[0]]"
            :type="item.subType || 'date'"
            :disabled-date="disabledStart"
            :placeholder="getPlaceHolder(item.placeholder, 0)"
            :format="item.format ? item.format : 'yyyy-MM-dd HH:mm:ss'"
            :value-format="item.format ? item.format : 'yyyy-MM-dd HH:mm:ss'"
          />
        </el-form-item>
        <el-form-item :prop="item.prop[1]" :label="item.name[1]">
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
      <el-form-item v-else :prop="item.prop" :label="(item.name as string)">
        <!-- 基础输入框 -->
        <el-input
          v-if="item.type === 'text'"
          v-model="myForm[item.prop as string]"
          clearable
          :placeholder="getPlaceHolder(item.placeholder)"
        />

        <!-- 下拉选择框 -->
        <o-select
          v-else-if="item.type === 'select'"
          v-model="myForm[item.prop as string]"
          :multiple="item.multiple"
          :placeholder="getPlaceHolder(item.placeholder)"
          :prop="item.optionProp"
          :options="item.options"
        />

        <!-- 远程搜索选择框 -->
        <o-select
          v-else-if="item.type === 'autocomplete'"
          v-model="myForm[item.prop as string]"
          remote
          :multiple="item.multiple"
          :placeholder="getPlaceHolder(item.placeholder)"
          :remote-method="((query: string) => { remoteMethod(query, item) })"
          :options="item.options"
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
    <div class="mt-23px">
      <el-button @click="resetForm(myFormRef)">重置</el-button>
      <el-button type="primary" @click="submitForm"> 查询 </el-button>
    </div>
  </el-form>
</template>
<script lang="ts">
import { type PropType, defineComponent, reactive, ref } from 'vue'
import { cloneDeep, isArray, isEmpty, omit } from 'lodash-es'
import type { FormInstance } from 'element-plus'
import type { ISearchItem, TObject } from '@/types'

export default defineComponent({
  name: 'OSearch',
  props: {
    searchItems: {
      type: Array as PropType<ISearchItem[]>,
      default: () => []
    }
  },
  emits: ['submitSearch'],
  setup(props, { emit }) {
    const loading = ref(false)
    const myForm = reactive<TObject>({})
    const myFormRef = ref<FormInstance>()

    const getPlaceHolder = (
      placeholder?: string | string[],
      index?: number
    ) => {
      if (isEmpty(placeholder)) return '请选择'
      if (isArray(placeholder)) {
        return placeholder[index!]
      } else {
        return placeholder
      }
    }
    //下拉 接口数据
    const getDropList = (item: ISearchItem) => {
      const data = [
        {
          id: 1,
          name: 'eeeee'
        },
        {
          id: 2,
          name: 'fffff'
        },
        {
          id: 3,
          name: 'ggggg'
        }
      ]
      item.options = data
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
        //下拉框数据初始化
        if (item.api) {
          getDropList(item)
        }
      })
    }
    initFormFelid()

    const submitForm = () => {
      let result = cloneDeep(myForm)
      Object.keys(result).forEach((key) => {
        const val = result[key]
        if (!val) {
          result = omit(result, key)
        }
      })
      emit('submitSearch', result)
    }

    const resetForm = (formEl: FormInstance | undefined) => {
      formEl?.resetFields()
    }

    const remoteMethod = (query: string, item: ISearchItem) => {
      if (query) {
        loading.value = true
        setTimeout(() => {
          loading.value = false
          //请求接口数据
          const data = [
            {
              id: 1,
              name: 'aaa'
            },
            {
              id: 2,
              name: 'bbb'
            },
            {
              id: 3,
              name: 'ccc'
            }
          ]
          item.options = data
        }, 200)
      } else {
        item.options = []
      }
    }

    /*********** 时间区间 控制开始与结束日期 begin *************/
    const disabledStart = (time: Date) => {
      let key = ''
      props.searchItems.forEach((item: ISearchItem) => {
        if (item.type === 'dateRange' && Array.isArray(item.prop)) {
          key = item.prop[1] as string
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
          key = item.prop[0] as string
        }
      })
      const sDate = myForm[key]
      if (sDate) {
        return time.getTime() < new Date(sDate).getTime()
      }
    }
    /*********** 时间区间 控制开始与结束日期 end *************/

    return {
      loading,
      remoteMethod,
      disabledStart,
      disabledEnd,
      myForm,
      myFormRef,
      submitForm,
      resetForm,
      getPlaceHolder
    }
  }
})
</script>
<style lang="scss">
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
