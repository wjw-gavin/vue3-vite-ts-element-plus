<template>
  <div class="text-right mt-2.5">
    <el-pagination
      v-if="isPagination"
      v-model:current-page="currentPage"
      v-model:page-size="per_page"
      v-bind="$attrs"
      background
      :total="total"
      :page-sizes="per_pages"
      :layout="layout"
    />
  </div>
</template>

<script lang="ts">
/**
 * @Description: 分页组件
 */
import { defineComponent, reactive, toRefs, onUpdated } from 'vue'
interface OPTIONS {
  isPagination: boolean
  currentPage: number
  per_page: number
  per_pages: number[]
  layout: string
}
export default defineComponent({
  name: 'GPagination',
  props: {
    total: {
      type: Number,
      default: 10
    }
  },
  setup(props, { attrs }) {
    const defaultOptions = reactive<OPTIONS>({
      isPagination: true,
      currentPage: 1,
      per_page: 20,
      per_pages: [10, 20, 30, 40, 50, 100],
      layout: 'total, sizes, prev, pager, next, jumper'
    })

    Object.assign(defaultOptions, attrs)

    onUpdated(() => {
      Object.assign(defaultOptions, attrs)
    })

    return {
      ...toRefs(defaultOptions)
    }
  }
})
</script>

<style lang="scss" scoped>
.el-pagination {
  &::after,
  &::before {
    display: initial;
    content: '';
  }
}
</style>
