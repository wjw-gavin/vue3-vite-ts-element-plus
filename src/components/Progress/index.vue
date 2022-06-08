<template>
  <el-progress
    bind="$attrs"
    :troke-width="strokeWidth"
    :ext-inside="textInside"
    :ercentage="percentage"
    :olor="customColor"
    :class="[animation ? 'progress-animated progress-striped' : '']"
  />
</template>
<script lang="ts">
/**
 * @Description: 进度条组件
 */
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'GProgress',
  props: {
    // 是否启用动画效果
    percentage: {
      type: Number,
      default: 0
    },
    // 是否启用动画效果
    animation: {
      type: Boolean,
      default: true
    },
    // 环形时显示文字要设置为 false
    textInside: {
      type: Boolean,
      default: true
    },
    // 进度条上下宽度
    strokeWidth: {
      type: Number,
      default: 20
    },
    // 进度条颜色
    customColor: {
      type: String,
      default: '#062c6e'
    }
  }
})
</script>

<style lang="scss" scoped>
@keyframes progress-bar-stripes {
  0% {
    background-position-x: 1rem;
  }
}

:deep(.el-progress) {
  .el-progress-bar__inner {
    overflow: hidden;
    white-space: nowrap;
    transition: width 0.6s ease;
  }

  .el-progress-bar__innerText {
    margin: 0 10px;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.progress-animated {
  :deep(.el-progress-bar__inner) {
    animation: progress-bar-stripes 1s linear infinite;
  }
}

.progress-striped {
  :deep(.el-progress-bar__inner) {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1rem 1rem;
  }
}
</style>
