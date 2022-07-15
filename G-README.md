## 自定义列展示
```ts
    // **module.ts
    tableHeadList: [
      {
        label: 'xxxxx',
        prop: 'yyy',
        slotName: 'yyy'
      }
    ]
```
```html
    <!-- 根据tableHeadList slotName字端 动态插入 插槽 -->
    <template v-for="item in tableHeadListSlotName" :key="item.slotName" #[item.slotName]="{ row }">
      <span v-if="row" :class="row.state === 'online' ? 'text-success' : 'text-warning'">
        {{ row[item.prop] }}
      </span>
    </template>
```
```ts
import store from '@/store'
import type { TableHeadList } from '@/types/storeModule'

const tableHeadListSlotName = computed(() => {
  const tableHeadList = store.state[storeModelName].tableHeadList
  return tableHeadList.filter((item: TableHeadList) => item.slotName)
})
```
## 列表有删除及分页
处理了列表删除最后一页数据后，分页显示不正常的问题
```js
  import { updateTableByDel } from '@/utils'

  // 删除成功后执行
  updateTableByDel({ storeModelName }) // utils/index
```


## 列表有删除、多选及分页
处理了列表删除最后一页数据后，分页显示不正常的问题，
处理了可选择列表，分页多选及删除的问题
```js
  import GTablePage from '@/components/TablePage/index.vue'
  import { updateTableByDel } from '@/utils'

  // g-table-page 增加 ref="gTableRef"
  const gTableRef = ref<InstanceType<typeof GTablePage> | null>(null)

  // 删除成功后执行
  updateTableByDel({ storeModelName, row })
  gTableRef.value?.toggleRowSelection(row)

  // module -> state 添加
  const state = {
    multipleSelection: []
  }

  // module -> mutations 添加
  // 更新列表多选数据
  updateSelection(state, payload) {
    state.multipleSelection = payload
  }
```
