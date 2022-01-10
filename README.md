# vue3.0 + vite + ts + element-plus
> element-plus基础模板例子，部分功能：递归菜单，二次封装了弹框（拖动）、表格、分页、上传、进度条等组件，并在列表页组合搜索、分页和表格等功能为一体，方便开发和维护。项目中接口是采用 yapi 模拟的数据。更多功能还在努力开发中~

# 说明
1. 项目是我个人通过真实业务整理出来的，所以可能整体并不适用于你，希望有部分地方能够帮到你；
2. 项目集成了 tailwindcss3.0(JIT)，但由于时间关系并没有所有都使用其搭建，验证是否生效可查看 views/statement/chart 文件；
3. 早期有些组件是 defineComponent 开发，后续新增的都是采用 setup 方式开发的，后续会统一为 setup；
4. 二次封装的组件，继承了 element-plus 原有属性和方法；
5. 项目还在开发中...
6. 文档还在编辑中...
# 安装项目依赖

cd `<app-name>` && yarn install

# 本地运行

yarn serve || yarn dev

# 打包

yarn build
