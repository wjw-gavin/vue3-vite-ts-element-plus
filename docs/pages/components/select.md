## 介绍

为什么要二次封装 `select` ？不知道你有没有这种感觉，如果一个页面有很多个 `select` 组件，你会写很多 `el-select` 和 `el-option`，再加上属性一多，整个页面的代码量噌的一下就变的巨多，这是我封装的初衷。具体功能请查看[源码](https://github.com/wjw-gavin/vue3-vite-ts-element-plus/blob/vue_nest/src/components/Search/index.vue)。

## 部分功能

:::tip
具体功能逻辑请查看源代码~（props）
:::

- 简化代码，每个需要 select 的地方，只需要一个标签 `<o-select />` 外加绑定值和传入下拉的数据即可实现；
- 修改默认属性，比如：`clearable` 和 `filterable` 等，我这里需要默认为 true 的，不然每个组件都要添加一遍；
- 可扩展，传入的数据格式默认为 `[{id: '111', name: '王二小'}]`，如果想要修改，比如是 id 和 text，传入`props="{value: 'id', label: 'text'}"`；
- `search-key`，传入该属性，会启用远程搜索，**为什么是 `search-key`？**，因为我这里所有搜索接口都规范成 `/api/${search-key}/autocomplete/options`，所以哪种数据的下拉数据，传入该数据的搜索类型即可；
- `value-key`，传入该属性，绑定数据为对象类型；
