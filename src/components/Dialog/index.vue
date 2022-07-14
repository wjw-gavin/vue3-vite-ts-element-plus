<template>
  <el-dialog
    v-model="visibleRef"
    v-bind="$attrs"
    :title="title"
    :append-to-body="appendToBody"
    :close-on-click-modal="closeOnClickModal"
    :width="width"
    draggable
    @close="dialogClose"
  >
    <!-- 自定义内容 -->
    <slot></slot>

    <template v-if="!customFooterBtns" #footer>
      <span>
        <el-button v-if="showCancelBtn" @click="visibleRef = false">{{ cancelBtnText }}</el-button>
        <el-button
          v-if="clickSureBtn"
          type="primary"
          :disabled="disabled"
          :loading="saveBtnLoading"
          @click="dialogSureClick"
        >
          {{ saveBtnText }}
        </el-button>
      </span>
    </template>
    <!-- 显示自定义底部 -->
    <slot v-if="customFooterBtns" name="footer"></slot>
  </el-dialog>
</template>

<script lang="ts">
/**
 * @Description: el-dialog 二次封装
 */
import { defineComponent, watchEffect, ref } from 'vue'
export default defineComponent({
  name: 'GDialog',
  props: {
    // 是否插入到body
    appendToBody: {
      type: Boolean,
      default: false
    },
    // 是否显示弹框
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: '提示'
    },
    // 弹框宽度
    width: {
      type: String,
      default: '500px'
    },
    // 点击遮罩隐藏
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    // 自定义底部按钮
    customFooterBtns: {
      type: Boolean,
      default: false
    },
    // 按钮点击事件回调
    clickSureBtn: {
      type: Function,
      default: null
    },
    // 按钮点击事件回调
    closeDialog: {
      type: Function,
      default: null
    },
    // 是否可点击
    disabled: {
      type: Boolean,
      default: false
    },
    // 确认按钮文字
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    // 确认按钮文字
    saveBtnText: {
      type: String,
      default: '确 认'
    },
    // 关闭按钮文字
    cancelBtnText: {
      type: String,
      default: '取 消'
    }
  },
  emits: ['update:dialogVisible'],
  setup(props, { emit }) {
    const saveBtnLoading = ref(false)
    const visibleRef = ref(false)
    const dialogSureClick = () => {
      if (props.clickSureBtn) {
        props.clickSureBtn((loading = false) => {
          saveBtnLoading.value = loading
        })
      }
    }
    const dialogClose = () => {
      // 关闭弹框回调（嵌套有用）
      if (props.closeDialog) {
        props.closeDialog()
      } else {
        saveBtnLoading.value = false
        emit('update:dialogVisible', false)
      }
    }
    watchEffect(() => {
      visibleRef.value = props.dialogVisible
    })
    return {
      saveBtnLoading,
      visibleRef,
      dialogSureClick,
      dialogClose
    }
  }
})
</script>
