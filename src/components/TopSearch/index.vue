<template>
  <div v-if="searchData.length > 0" class="g-top-search">
    <el-form
      ref="searchForm"
      :model="formData"
      :inline="true"
      :label-width="searchLabelWidth"
    >
      <template v-for="item in searchData" :key="item.id">
        <template v-if="item.type === 'complex'">
          <el-form-item
            v-for="(autocomplete, $index) in item.children"
            :key="autocomplete.id"
            class="complex"
            :label="$index === 0 ? item.name + '：' : ''"
            :prop="autocomplete.paramName"
          >
            <el-select
              v-model="formData[autocomplete.paramName]"
              :popper-append-to-body="false"
              class="search-item"
              value-key="key"
              clearable
              filterable
              :loading="loading"
              placeholder=""
              @change="
                (value) => {
                  cascaderHandleChange(value, item.children, Number($index))
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

        <el-form-item v-else :prop="item.paramName" :label="item.name + '：'">
          <!-- 输入框 -->
          <!-- @input="formatNumber(item)" -->
          <el-input
            v-if="item.type === 'text' || item.type === 'number'"
            v-model="formData[item.paramName]"
            class="search-item"
            :name="item.paramName"
            :type="item.type"
            :placeholder="item.hint"
            clearable
          />
          <!-- 下拉选择框 -->
          <g-select
            v-else-if="item.type === 'select' || item.type === 'multi_select'"
            v-model:value="formData[item.paramName]"
            class="search-item"
            :placeholder="item.hint"
            :multiple="item.type === 'multi_select'"
            :collapse-tags="item.type === 'multi_select'"
            :options="item.options"
          />

          <!-- 远程搜索选择框 -->
          <g-select
            v-else-if="item.type === 'auto_complete'"
            v-model:value="formData[item.paramName]"
            class="search-item"
            :placeholder="item.hint"
            :search-key="item.id"
            :options="item.options"
          />

          <!-- 日期选择 -->
          <el-date-picker
            v-else-if="item.type === 'date'"
            v-model="formData[item.paramName]"
            :append-to-body="false"
            class="search-item"
            :name="item.paramName"
            type="date"
            :placeholder="'请选择' + item.hint"
            format="YYYY-MM-DD"
            value-format="x"
          />

          <!-- 日期选择范围 -->
          <el-date-picker
            v-else-if="item.type === 'time_range' || item.type === 'date_range'"
            v-model="formData[item.paramName]"
            class="search-item"
            :name="item.paramName"
            :type="item.type === 'time_range' ? 'datetimerange' : 'daterange'"
            :start-placeholder="item.hint || ''"
            :end-placeholder="item.hint || ''"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="x"
            :clearable="item.defaultValue ? false : true"
          />
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" :loading="isLoading" @click="handleSearch"> 查询 </el-button>
        <el-button :loading="isLoading" @click="resetSearch"> 重置 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
/**
 * @Description: 列表搜索项组件
 */
import { defineComponent, computed, ref, reactive } from 'vue'
import { ElForm, ElFormItem, ElSelect, ElOption, ElInput, ElDatePicker } from 'element-plus'
import { useStore } from 'vuex'
import { cloneDeep, omit, forIn } from 'lodash-es'
import { isEmptyData } from '@/utils/validation'
import { get } from '@/http/request'
export default defineComponent({
  name: 'GTopSearch',
  components: {
    ElForm,
    ElFormItem,
    ElSelect,
    ElOption,
    ElInput,
    ElDatePicker
  },
  props: {
    // store模块 名称
    storeModelName: {
      type: String,
      default: ''
    },
    // 搜索项label宽度
    searchLabelWidth: {
      type: String,
      default: '90px'
    },
    // 按钮点击事件回调
    searchClick: {
      type: Function,
      default: null
    },
    // 按钮loading，请求是否完成，防止需要拼接数据的地方发生重复
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const store = useStore()
    const loading = ref(false)
    const formData: Record<string, any> = reactive({})
    const searchData = computed(() => {
      const data = store.state[props.storeModelName].searchData || []
      data.forEach((item) => {
        if (item.defaultValue) {
          formData[item.paramName] = item.defaultValue
        }
      })
      return data
    })

    // 限制input[number]只能输入正整数
    // const formatNumber = (item) => {
    //   if (item.type !== 'number') return
    //   formData[item.paramName] = (formData[item.paramName] as string).replace(/[^\d]/g, '')
    // }
    // 级联复合搜索
    const cascaderHandleChange = (value: any, children: any, index: number) => {
      if (index + 1 === children.length) return // 排除随后一项
      // 如果清空前一项，后面选项置空
      if (!value) {
        for (let i = index + 1; i < children.length; i++) {
          formData[children[i].id] = null
          children[i].options = []
        }
        return
      }
      const url = `/management/centery/search_item/option/${children[index + 1].id}`
      const key = children[index].id
      const param = {}
      param[key] = value
      get(url, { condition: param }).then((res) => {
        children[index + 1].options = res
      })
    }
    // 点击搜索
    const handleSearch = () => {
      if (props.searchClick) {
        let result = cloneDeep(formData)
        forIn(result, (val, key) => {
          if (isEmptyData(val)) {
            result = omit(result, key)
          }
        })
        props.searchClick(result)
      }
    }
    // 重置
    const resetSearch = () => {
      searchData.value.forEach((item) => {
        switch (item.type) {
          case 'auto_complete':
            item['options'] = []
            formData[item.paramName] = ''
            break
          case 'multi_select':
            formData[item.paramName] = []
            break
          default:
            formData[item.paramName] = ''
        }
        if (item.defaultValue && (item.type === 'time_range' || item.type === 'date_range')) {
          formData[item.paramName] = item.defaultValue
        }
      })
      const result = {}
      forIn(formData, (val, key) => {
        if (!isEmptyData(val)) {
          result[key] = val
        }
      })
      props.searchClick(result)
    }

    return {
      loading,
      formData,
      searchData,
      // formatNumber,
      resetSearch,
      handleSearch,
      cascaderHandleChange
    }
  }
})
</script>

<style lang="scss" scoped>
.g-top-search {
  padding: 10px 10px 0 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .el-form--inline .el-form-item {
    width: auto;

    &.complex {
      margin-bottom: 0;

      .search-item {
        margin-right: 80px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .search-item {
    width: 260px;

    :deep(.el-range-editor.el-input__inner) {
      justify-content: space-between;
    }
  }
}

.el-form {
  box-sizing: border-box;
  width: 100%;
}
</style>
