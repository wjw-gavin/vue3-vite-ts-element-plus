import{_ as s,o as a,c as o,O as e}from"./chunks/framework.6664f35c.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"pages/components/select.md","filePath":"pages/components/select.md","lastUpdated":1687845105000}'),n={name:"pages/components/select.md"},l=e(`<h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>为什么要二次封装 <code>select</code> ？不知道你有没有这种感觉，如果一个页面有很多个 <code>select</code> 组件，你会写很多 <code>el-select</code> 和 <code>el-option</code>，再加上属性一多，整个页面的代码量噌的一下就变的巨多，这是我封装的初衷。具体功能请查看<a href="https://github.com/wjw-gavin/vue3-vite-ts-element-plus/blob/vue_nest/src/components/Search/index.vue" target="_blank" rel="noreferrer">源码</a>。</p><h2 id="部分功能" tabindex="-1">部分功能 <a class="header-anchor" href="#部分功能" aria-label="Permalink to &quot;部分功能&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>具体功能逻辑请查看源代码~（props）</p></div><ul><li>简化代码，每个需要 select 的地方，只需要一个标签 <code>&lt;o-select /&gt;</code> 外加绑定值和传入下拉的数据即可实现；</li><li>修改默认属性，比如：<code>clearable</code> 和 <code>filterable</code> 等，我这里需要默认为 true 的，不然每个组件都要添加一遍；</li><li>可扩展，传入的数据格式默认为 <code>[{id: &#39;111&#39;, name: &#39;王二小&#39;}]</code>，如果想要修改，比如是 id 和 text，传入<code>props=&quot;{value: &#39;id&#39;, label: &#39;text&#39;}&quot;</code>；</li><li><code>search-key</code>，传入该属性，会启用远程搜索，<strong>为什么是 <code>search-key</code>？</strong>，因为我这里所有搜索接口都规范成 <code>/api/\${search-key}/autocomplete/options</code>，所以哪种数据的下拉数据，传入该数据的搜索类型即可；</li><li><code>value-key</code>，传入该属性，绑定数据为对象类型；</li></ul><h2 id="使用示例" tabindex="-1">使用示例 <a class="header-anchor" href="#使用示例" aria-label="Permalink to &quot;使用示例&quot;">​</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">o-select</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">v-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">status</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  :options=&quot;options&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">placeholder</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">请选择状态</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">/&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> status </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> options </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">启用</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">禁用</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span></span></code></pre></div>`,7),p=[l];function t(c,r,D,i,y,d){return a(),o("div",null,p)}const A=s(n,[["render",t]]);export{C as __pageData,A as default};
