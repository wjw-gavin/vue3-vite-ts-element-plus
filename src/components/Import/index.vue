<template>
  <div class="g-import">
    <g-upload
      :action="uploadUrl"
      :multiple="false"
      list-type="text"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,.csv"
      :before-upload="beforeFileUpload"
      :upload-success="handleFileSuccess"
    >
      <template #content>
        <el-button>导入</el-button>
      </template>
    </g-upload>
    <g-dialog
      v-model:dialog-visible="dialogVisible"
      title="导入结果"
      width="600px"
      cancel-btn-text="确认"
    >
      <el-table :data="result" border max-height="400">
        <el-table-column prop="mobile" label="手机号">
          <template #default="{ row }">
            {{ row.mobile }}
          </template>
        </el-table-column>
        <el-table-column prop="result" label="处理结果">
          <template #default="{ row }">
            <span :class="[row.result === '失败' ? 'error' : 'warning']">{{ row.result }}</span>
          </template>
        </el-table-column>
      </el-table>
    </g-dialog>
  </div>
</template>

<script lang="ts">
/**
 * @Description: 导入组件
 */
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import importTypes from '@/utils/page/import'
export default defineComponent({
  name: 'GImport',
  props: {
    // store模块 名称
    storeModelName: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const dialogVisible = ref(false)
    const uploadUrl = `company/${importTypes[route.path]}/import/excel`
    // 导入前
    const beforeFileUpload = (file: File) => {
      const fileName = file.name
      const index1 = fileName.lastIndexOf('.')
      const index2 = fileName.length
      const suffix = fileName.substring(index1 + 1, index2) //后缀名
      if (suffix === 'xls' || suffix === 'xlsx' || suffix === 'cvs') {
        return true
      } else {
        ElMessage.warning('请上传excel文件')
        return false
      }
    }
    // 导入成功回调
    let result: any[] = reactive([])
    const handleFileSuccess = (data: { failUser: any[]; existUser: any[]; }) => {
      if (data.failUser.length === 0 && data.existUser.length === 0) {
        ElMessage.success('导入成功')
      } else {
        dialogVisible.value = true
        const failUser = data.failUser.map((item: number) => {
          return {
            mobile: item,
            result: '失败'
          }
        })
        const existUser = data.existUser.map((item: number) => {
          return {
            mobile: item,
            result: '已存在'
          }
        })
        result = [...failUser, ...existUser]
      }
      store.dispatch('data/getTableData', props.storeModelName)
    }
    return {
      result,
      dialogVisible,
      uploadUrl,
      beforeFileUpload,
      handleFileSuccess
    }
  }
})
</script>

<style lang="scss" scoped>
.warning {
  color: $warning;
}

.error {
  color: $error;
}
</style>
