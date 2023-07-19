<template>
  <el-card class="mb-2.5">
    <el-form ref="formRef" :model="form" label-position="top" :inline="true">
      <template v-for="item in searchList" :key="item.id">
        <template v-if="item.type === 'complex'">
          <el-form-item
            v-for="(autocomplete, $index) in item.children"
            :key="autocomplete.id"
            class="complex"
            :label="item.name"
          >
            <o-select
              v-model="form[autocomplete.id]"
              :loading="loading"
              :placeholder="item.hint"
              :options="item.options"
              @change="
              (value: string) => {
                cascaderHandleChange(value, item.children!, $index)
              }
            "
            />
          </el-form-item>
        </template>

        <el-form-item v-else :label="item.name">
          <!-- 基础输入框 -->
          <el-input
            v-if="item.type === 'text'"
            v-model="form[item.id]"
            clearable
            :placeholder="item.hint"
          />

          <!-- 下拉选择框 -->
          <o-select
            v-else-if="item.type === 'select' || item.type === 'multi_select'"
            v-model="form[item.id]"
            :multiple="item.multi_select"
            :placeholder="item.hint"
            :collapse-tags="item.type === 'multi_select'"
            :options="item.options"
          />

          <!-- 远程搜索选择框 -->
          <o-select
            v-else-if="item.type === 'auto_complete'"
            v-model="form[item.id]"
            :multiple="item.multi_select"
            :search-key="item.id"
            :options="item.options"
            remote-show-suffix
            :placeholder="item.hint"
          />

          <!-- 日期 -->
          <el-date-picker
            v-if="item.type === 'date' || item.type === 'date_time'"
            v-model="form[item.id]"
            :type="item.type === 'date' ? 'date' : 'datetime'"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :placeholder="item.hint"
          />

          <!-- 日期选择范围 -->
          <el-date-picker
            v-else-if="item.type === 'time_range' || item.type === 'date_range'"
            v-model="form[item.id]"
            :type="item.type === 'time_range' ? 'datetimerange' : 'daterange'"
            :start-placeholder="item.hint"
            :end-placeholder="item.hint"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="x"
          />
        </el-form-item>
      </template>
      <div class="flex items-end mb-10px">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" :loading="loading" @click="submitForm">
          查询
        </el-button>
      </div>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { cloneDeep, omit } from 'lodash-es'
import { useSearchStore } from '@/stores/search'
import { getOptions } from '@/api/common'
import type { FormInstance } from 'element-plus'
import type { ISearchItem, TObject } from '@/types'

defineOptions({ name: 'OSearch' })

const emit = defineEmits(['search'])

defineProps({
  loading: Boolean
})

const searchStore = useSearchStore()

const form = reactive<TObject>({})
const formRef = ref<FormInstance>()

const searchList = computed(() => searchStore.searchList)

// TODO: 级联复合搜索
const cascaderHandleChange = async (
  value: string,
  children: ISearchItem[],
  index: number
) => {
  if (index + 1 === children.length) return // 随后一项

  // 如果清空前一项，后面选项置空
  if (!value) {
    for (let i = index + 1; i < children.length; i++) {
      form[children[i].id] = ''
      children[i].options = []
    }
    return
  }

  const key = children[index].id
  const options = await getOptions(key)
  children[index + 1].options = options
}

const submitForm = () => {
  let result = cloneDeep(form)
  Object.keys(result).forEach((key) => {
    const val = result[key]
    if (!val && val !== 0) {
      result = omit(result, key)
    }
  })
  emit('search', result)
}

const resetForm = () => {
  formRef.value?.resetFields()
  submitForm()
}
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
