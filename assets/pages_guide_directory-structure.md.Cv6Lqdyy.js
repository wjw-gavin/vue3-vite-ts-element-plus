import{_ as a,o as n,c as p,ae as e}from"./chunks/framework.CxG1Jajp.js";const m=JSON.parse('{"title":"说明","description":"","frontmatter":{},"headers":[],"relativePath":"pages/guide/directory-structure.md","filePath":"pages/guide/directory-structure.md","lastUpdated":1772196163000}'),l={name:"pages/guide/directory-structure.md"};function t(i,s,c,o,r,d){return n(),p("div",null,[...s[0]||(s[0]=[e(`<div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>文档目前还不完善，努力更新中...</p></div><h1 id="说明" tabindex="-1">说明 <a class="header-anchor" href="#说明" aria-label="Permalink to &quot;说明&quot;">​</a></h1><p>该项目是从自己的项目中整理出来的，因个人能力有限，一些设计和处理或许欠佳，还请大佬们指正。旨在能给大家一些参考之处。</p><h1 id="目录介绍" tabindex="-1">目录介绍 <a class="header-anchor" href="#目录介绍" aria-label="Permalink to &quot;目录介绍&quot;">​</a></h1><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>├── src</span></span>
<span class="line"><span>│   ├── api                           // 请求后台 api</span></span>
<span class="line"><span>│   ├── assets                        // 放置一些静态资源</span></span>
<span class="line"><span>│   │     │── images                  // 图片资源</span></span>
<span class="line"><span>│   │     │── styles                  // 样式资源</span></span>
<span class="line"><span>│   │     │    └── element-plus.scss  // 覆盖 element-plus 原有样式</span></span>
<span class="line"><span>│   │     │    └── element-theme.scss // 主题颜色</span></span>
<span class="line"><span>│   │     │    └── index.scss         // 全局样式</span></span>
<span class="line"><span>│   │     │── svg                     // svg 文件</span></span>
<span class="line"><span>│   ├── icons                           // 自定义图标 SVG 文件 (unplugin-icons)</span></span>
<span class="line"><span>│   ├── components                    // 全局的公共组件，main.ts 自动注入</span></span>
<span class="line"><span>│   ├── directives                    // 指令</span></span>
<span class="line"><span>│   ├── hooks                         // 封装的一些 hook</span></span>
<span class="line"><span>│   ├── http                          // axios 封装请求，统一处理接口请求</span></span>
<span class="line"><span>│   ├── layout                        // 主题布局</span></span>
<span class="line"><span>│   ├── router                        // 路由</span></span>
<span class="line"><span>│   │     │── modules                 // 路由模块 （store 接口相同）</span></span>
<span class="line"><span>│   │     │── index.ts                // 路由守卫</span></span>
<span class="line"><span>│   │     │── routes.ts               // 自动导入所有路由</span></span>
<span class="line"><span>│   ├── stores                        // 状态管理 Pinia 相关</span></span>
<span class="line"><span>│   ├── types                         // 一些数据类型</span></span>
<span class="line"><span>│   ├── utils                         // 常用的工具方法</span></span>
<span class="line"><span>│   │     └── auth.ts                 // Cookie 方法</span></span>
<span class="line"><span>│   │     └── basic.ts                // 工具方法</span></span>
<span class="line"><span>│   │     └── elementPlus.ts          // 二次封装 element 方法</span></span>
<span class="line"><span>│   │     └── elValidation.ts         // element from 表单校验方法封装</span></span>
<span class="line"><span>│   ├── views                         // 系统页面</span></span></code></pre></div>`,5)])])}const h=a(l,[["render",t]]);export{m as __pageData,h as default};
