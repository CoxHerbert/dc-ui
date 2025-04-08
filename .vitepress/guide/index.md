
> ✅ 你需要自定义一个 `<demo-preview>` 组件，实现 Markdown 中 Vue 代码的渲染和高亮。

    ---
    
    ## 🧩 三、自定义代码预览组件 `<demo-preview />`
    
    你可以在 `.vitepress/theme` 目录下添加自定义组件用于代码演示。
    
    ### 示例：`.vitepress/theme/components/demo-preview.vue`
    
    ```vue
    <template>
      <div class="demo-block">
        <div class="demo-content">
          <slot />
        </div>
        <pre><code><slot name="code" /></code></pre>
      </div>
    </template>
    
    <style scoped>
    .demo-block {
      border: 1px solid #eee;
      margin-bottom: 20px;
      padding: 16px;
    }
    </style>
    