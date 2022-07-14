<template>
  <g-form-wrap itle="角色管理" :on-save-btn-click="onSaveBtnClick">
    <el-form
      ref="ruleForm"
      :model="formData"
      :rules="formRules"
      label-position="top"
      inline
    >
      <div class="w-full">
        <el-form-item class="w-96" label="角色名称：" prop="name">
          <el-input v-model="formData.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item class="w-96" label="联系方式：" prop="phone">
          <el-input v-model="formData.phone" type="number" placeholder="请输入手机号" />
        </el-form-item>
      </div>
    </el-form>
  </g-form-wrap>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import type { Loading } from '@/components/Dialog/types'
import { useRoute, useRouter } from 'vue-router'
import elv from '@/utils/elValidation'

const route = useRoute()
const router = useRouter()
const isEditing = ref(false)
const ruleForm = ref<FormInstance>()
const formData = reactive(<
  {
    name: string
    phone: string | number
  }
>{
  name: '',
  phone: ''
})
const formRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入正确的姓名', trigger: 'blur' }],
  phone: [{ required: true, validator: elv.isPhone(), trigger: 'blur' }]
})
const id = route.query.id as string
isEditing.value = id ? true : false

// 编辑时获取详情信息
const getDetail = () => {
  console.log('现在是编辑')
}
// 编辑时
if (isEditing.value) {
  getDetail()
}
// 保存提交
const onSaveBtnClick = (loading: Loading) => {
  ruleForm.value?.validate((valid) => {
    if (valid) {
      loading(true)
      if (isEditing.value) {
        ElMessage.success('编辑成功')
      } else {
        ElMessage.success('添加成功')
      }
      setTimeout(() => {
        loading(false)
        router.back()
      }, 1000)
    } else {
      return false
    }
  })
}
</script>
