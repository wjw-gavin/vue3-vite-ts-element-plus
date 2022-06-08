<template>
  <div class="g-upload">
    <ul v-if="listType === 'picture-card'" class="el-upload-list el-upload-list--picture-card">
      <li v-for="(img, index) in filePreviewList" :key="index" class="el-upload-list__item">
        <el-image
          class="image"
          :src="(img as string)"
          fit="fill"
          style="width: 100%"
        />
        <span class="item-delete">
          <i class="el-icon-circle-close" @click="handleRemove(index, img)"></i>
        </span>
      </li>
    </ul>
    <el-upload
      :action="action"
      :disabled="disabled"
      :show-file-list="false"
      :on-success="addEventOnSuccess"
      :on-error="addEventOnError"
      :headers="headers"
      :accept="accept"
      :list-type="listType"
      :on-progress="addOnProgress"
      :before-upload="beforeFileUpload"
      :multiple="multiple"
    >
      <template v-if="listType === 'picture-card'" #default>
        <i class="el-icon-plus"></i>
      </template>
      <template v-else #default>
        <slot name="content"></slot>
      </template>
    </el-upload>
    <div
      v-if="percentage != 0 && percentage != 100 && showProgress"
      class="el-loading-mask is-fullscreen"
    >
      <div class="el-loading-spinner">
        <g-progress :percentage="percentage" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, PropType } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import type { UploadFile, UploadFiles } from 'element-plus'
import { getToken } from '@/utils/auth'
export default defineComponent({
  name: 'GUpload',
  props: {
    // 上传地址
    action: {
      type: String,
      default: ''
    },
    // 图片列表
    filePreviewList: {
      type: Array,
      default: () => <unknown>[]
    },
    // disabled
    disabled: {
      type: Boolean,
      default: false
    },
    // 允许上传的文件类型
    accept: {
      type: String,
      default: 'image/png, image/jpg, image/jpeg'
    },
    // 文件列表的类型
    listType: {
      type: String as PropType<'text' | 'picture' | 'picture-card'>,
      default: 'picture-card'
    },
    // 是否允许上传多个
    multiple: {
      type: Boolean,
      default: true
    },
    // 上传成功回调
    uploadSuccess: {
      type: Function,
      default: null
    },
    fileRemove: {
      type: Function,
      default: null
    },
    // 文件上传成功的提示文字
    successMsg: {
      type: String,
      default: ''
    },
    // 文件上传之前
    beforeUpload: {
      type: Function,
      default: null
    },
    // 是否显示进度条
    showProgress: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const headers = { 'X-TOKEN': getToken() }
    const percentage = ref(0)
    let localUrl: any[] = reactive([])
    let loading: any = null

    // 文件上传之前钩子
    const beforeFileUpload = (file: any) => {
      if (props.beforeUpload) {
        return props.beforeUpload(file)
      } else {
        return true
      }
    }
    // 开始上传 (event, file, fileList)
    const addOnProgress = (event) => {
      percentage.value = 0
      if (props.showProgress) {
        const percent = Math.floor(event.percent)
        // 防止上传完接口还没有返回成功值，所以此处给定percentage的最大值为99，成功的钩子中再置为100
        percentage.value = percent === 100 ? 99 : percent
      } else {
        loading = ElLoading.service({
          lock: true,
          text: '文件上传中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }
    }
    // 上传成功
    const addEventOnSuccess = (response: any, file: UploadFile, fileList: UploadFiles) => {
      if (response.status.code === 0) {
        if (props.uploadSuccess) {
          const item = <
            {
              id: string | number
              name: string
            }
          >{
            id: response.data.file,
            name: file.url as string
          }
          localUrl.push(item)
          props.uploadSuccess(response.data, file, fileList)
        }
      } else {
        ElMessage.error(response.message || '上传失败')
      }
      if (props.showProgress) {
        percentage.value = 100
        return
      }
      loading.close()
    }
    // 上传失败
    const addEventOnError = () => {
      ElMessage.error('上传失败')
      if (props.showProgress) {
        percentage.value = 0
        return
      }
      loading.close()
    }
    // 删除图片
    const handleRemove = (index: number, img: any) => {
      let id = ''
      if (img.indexOf('blob') !== -1) {
        localUrl.forEach((item: { name: string; id: string; }) => {
          if (item.name === img) {
            id = item.id
          }
        })
      } else if (img.indexOf('?') !== -1) {
        let str = img.split('?')[0]
        id = str.substring(img.lastIndexOf('/') + 1, img.length)
      } else {
        id = img.substring(img.lastIndexOf('/') + 1, img.length)
      }
      // props.filePreviewList.splice(index, 1)
      if (props.fileRemove) {
        props.fileRemove(Number(id))
      }
    }
    return {
      headers,
      percentage,
      beforeFileUpload,
      addOnProgress,
      addEventOnSuccess,
      addEventOnError,
      handleRemove
    }
  }
})
</script>

<style lang="scss" scoped>
.g-upload {
  & > div {
    display: inline-block;
  }

  .el-upload-list--picture-card {
    float: left;
  }
}

.el-upload-list__item {
  overflow: inherit;
  position: relative;

  &:hover {
    .item-delete {
      display: block;
    }
  }

  .item-delete {
    position: absolute;
    top: -12px;
    right: -12px;
    z-index: 10;
    line-height: 1;
    padding: 5px;
    display: none;

    .el-icon-circle-close {
      font-size: 25px;
      cursor: pointer;
      background-color: #fff;
      border-radius: 50%;
    }
  }
}

.el-loading-mask {
  background-color: rgba(0, 0, 0, 0.6);
}

.el-loading-spinner {
  width: 800px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
