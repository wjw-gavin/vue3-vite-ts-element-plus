<template>
  <div class="g-export">
    <el-button :type="type" :loading="loading" @click="exportExcel">
      {{ text }}
    </el-button>
  </div>
</template>

<script lang="ts">
/**
 * @Description: 导出excel组件
 */
import { defineComponent, toRefs, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { omit } from 'lodash-es'
import { getToken } from '@/utils/auth'
import { download } from '@/utils/utils'
import exportKey from '@/utils/pageType/export'
import downKey from '@/utils/pageType/download'
import axios from '@/http/axios'
export default defineComponent({
  name: 'GExport',
  props: {
    // store模块 名称
    storeModelName: {
      type: String,
      default: ''
    },
    // 类型（导出和下载模板）
    type: {
      type: String,
      default: 'export'
    }
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const btnOptions = reactive({
      loading: false,
      type: props.type === 'export' ? 'default' : 'text',
      text: props.type === 'export' ? '导出' : '下载导入模板'
    })
    const params = computed(() => store.state[props.storeModelName].params)

    const exportExcel = () => {
      const title = route.meta.title as string
      let postData = {}
      let remainderParams = omit(params, ['page', 'pageSize'])
      postData = Object.assign({}, { options: params.value.options }, remainderParams)
      btnOptions.loading = true
      btnOptions.type = props.type === 'export' ? 'default' : 'text'
      btnOptions.text = props.type === 'export' ? '导出' : '下载导入模板'
      let key = ''
      if (props.type === 'export') {
        key = exportKey[route.path]
      } else {
        key = downKey[route.path]
      }
      const apiUrl = `/company/${key}/export/excel`
      axios({
        method: 'POST',
        url: apiUrl,
        data: postData,
        responseType: 'blob',
        headers: {
          nToken: getToken()
        }
      })
        .then((res: any) => {
          btnOptions.loading = false
          let blob = new Blob([res], {
            type: 'application/vnd.ms-excel'
          })
          let url = URL.createObjectURL(blob)
          download(url, title)
          URL.revokeObjectURL(url)
        })
        .catch(() => {
          btnOptions.loading = false
        })
    }
    return {
      ...toRefs(btnOptions),
      exportExcel
    }
  }
})
</script>
