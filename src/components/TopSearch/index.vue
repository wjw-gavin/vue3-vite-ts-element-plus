<template>
  <div v-if="searchData.length > 0" class="g-top-search">
    <el-form
      ref="searchForm"
      :model="formData"
      :inline="true"
      label-position="top"
      :label-width="searchLabelWidth"
    >
      <template v-for="item in searchData" :key="item.id">
        <template v-if="item.type === 'complex'">
          <el-form-item
            v-for="(autocomplete, $index) in item.children"
            :key="autocomplete.id"
            class="complex"
            :label="$index === 0 ? item.name + '：' : ''"
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

        <el-form-item v-else :label="item.name + '：'">
          <!-- 输入框 -->
          <el-input
            v-if="item.type === 'text' || item.type === 'number'"
            v-model="formData[item.id]"
            class="search-item"
            :type="item.type"
            :placeholder="'请输入' + item.hint"
            clearable
          />
          <!-- 下拉选择框 -->
          <g-top-select
            v-else-if="item.type === 'select' || item.type === 'multi_select'"
            v-model="formData[item.id]"
            class="search-item"
            value-key="key"
            :placeholder="'请选择' + item.hint"
            :multiple="item.type === 'multi_select'"
            :collapse-tags="item.type === 'multi_select'"
            :options="item.options"
          />

          <!-- 远程搜索选择框 -->
          <g-top-select
            v-else-if="item.type === 'auto_complete'"
            v-model="formData[item.id]"
            class="search-item"
            value-key="key"
            :placeholder="'请输入' + item.hint"
            :search-key="item.id"
            :options="item.options"
          />

          <!-- 日期选择 -->
          <el-date-picker
            v-else-if="item.type === 'date'"
            v-model="formData[item.id]"
            :append-to-body="false"
            class="search-item"
            type="date"
            :placeholder="'请选择' + item.hint"
            format="YYYY-MM-DD"
            value-format="x"
          />

          <!-- 日期选择范围 -->
          <el-date-picker
            v-else-if="item.type === 'time_range' || item.type === 'date_range'"
            v-model="formData[item.id]"
            class="search-item"
            :type="item.type === 'time_range' ? 'datetimerange' : 'daterange'"
            :start-placeholder="'请选择' + item.hint || '请选择'"
            :end-placeholder="'请选择' + item.hint || '请选择'"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="x"
            :clearable="item.defaultValue ? false : true"
          />
        </el-form-item>
      </template>
      <el-form-item class="search-btns">
        <el-button type="primary" :loading="isLoading" @click="handleSearch"> 查 询 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
/**
 * @Description: 列表搜索项组件
 */
import { defineComponent, computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { cloneDeep, omit, forIn } from 'lodash-es'
import { isEmpty } from '@/utils/validation'
import { get } from '@/http'
import { transfromForFrontend } from '@/utils/searchTransform'
import GTopSelect from './select.vue'
export default defineComponent({
  name: 'GTopSearch',
  components: {
    GTopSelect
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
      default: ''
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

    const searchData = computed(() => {
      const data = store.state[props.storeModelName].searchData || []
      return data
    })
    // 从store取出搜索数据后，要还原回搜索组件绑定的格式
    const condition = store.state[props.storeModelName].params.condition
    const formData: any = reactive(transfromForFrontend(condition))
    for (let i in formData) {
      searchData.value.forEach((item: { type: string; id: string; options: any[]; }) => {
        if (item.type === 'auto_complete') {
          // 现在只有auto_complete的会有问题
          if (item.id === i) {
            item.options = [formData[i]]
          }
        }
      })
    }
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
          if (isEmpty(val)) {
            result = omit(result, key)
          }
        })
        props.searchClick(result)
      }
    }

    return {
      loading,
      formData,
      searchData,
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
    margin-bottom: 10px;
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
.search-btns {
  display: flex !important;
  :deep(.el-form-item__content) {
    display: flex;
    align-items: flex-end;
  }
}
</style>
