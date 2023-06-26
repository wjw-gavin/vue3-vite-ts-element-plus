## Layout(递归菜单)

整体布局，头部是系统及个人信息，侧边栏是菜单，中间是内容区。

菜单使用了**递归菜单**，具体数据类型如下：

```ts
interface Menu {
  id: string
  name: string
  path?: string
  icon?: string
  children?: Menu[]
}
```

## 效果图

![layout.png](../../images/layout.png)
