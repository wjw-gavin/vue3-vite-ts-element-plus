<template>
  <div class="g-form-wrap relative mb-2.5" :class="{ 'show-footer': showFooter }">
    <el-card>
      <template v-if="title" #header>
        <span>{{ title }}</span>
      </template>
      <slot></slot>
    </el-card>
    <!-- 如果没有按钮 默认footer不显示 -->
    <footer v-if="showFooter" class="form-btn-warp" :class="[isCollapse ? 'collapsed' : '']">
      <el-button
        v-if="onSaveBtnClick"
        type="primary"
        :loading="isLoading"
        @click="handleSaveClick"
      >
        {{ saveBtnText }}
      </el-button>
      <el-button v-if="showBackBtn" @click="$router.back()"> 返 回 </el-button>
      <slot name="footer-btn"></slot>
    </footer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'GFormWrap',
  props: {
    // 按钮点击事件回调
    onSaveBtnClick: {
      type: Function,
      default: null
    },
    // 标题文字
    title: {
      type: String,
      default: ''
    },
    // 提交按钮文字
    saveBtnText: {
      type: String,
      default: '提 交'
    },
    // 是否显示返回按钮
    showBackBtn: {
      type: Boolean,
      default: true
    },
    // 是否显示按钮组
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const { state } = useStore()
    const isLoading = ref(false)

    const handleSaveClick = () => {
      if (props.onSaveBtnClick) {
        props.onSaveBtnClick((loading = true) => {
          isLoading.value = loading
        })
      }
    }

    return {
      isLoading,
      isCollapse: computed(() => state.layout.isCollapse),
      handleSaveClick
    }
  }
})
</script>
<style lang="scss" scoped>
.g-form-wrap {
  &.show-footer {
    margin-bottom: 80px;
  }

  .el-card {
    box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.05);
  }
}

.el-card {
  :deep(.el-card__header) {
    font-size: 16px;
    color: $primary;
    font-weight: 700;
  }
}

.form-btn-warp {
  width: 100%;
  padding: 20px;
  position: fixed;
  z-index: 4;
  bottom: 0;
  right: 0;
  background-color: #fff;
  left: 220px;
  transition: 0.3s ease-in-out;
  perspective: none;
  backface-visibility: hidden;
  box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.1);

  &.collapsed {
    left: 62px;
  }

  button {
    width: 100px;

    & + .el-button {
      margin-left: 15px;
    }
  }
}
</style>
