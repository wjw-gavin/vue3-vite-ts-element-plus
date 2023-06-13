<template>
  <o-form-wrap title="用户管理" @confirm="onConfirm">
    <el-form
      ref="ruleForm"
      :model="formData"
      :rules="formRules"
      label-position="top"
      inline
    >
      <el-form-item label="用户名称：" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="联系方式：" prop="mobile">
        <el-input
          v-model="formData.phone"
          type="number"
          placeholder="请输入手机号"
        />
      </el-form-item>
    </el-form>
  </o-form-wrap>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { elv } from '@/utils'
import type { FormInstance, FormRules } from 'element-plus'
import type { ILoading } from '@/types'

const route = useRoute()
const router = useRouter()

const isEditing = ref(false)
const id = route.params.id
isEditing.value = id ? true : false

const ruleForm = ref<FormInstance>()
const formData = reactive<{
  name: string
  phone: string | number
}>({
  name: '',
  phone: ''
})
const formRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入正确的姓名', trigger: 'blur' }],
  phone: [{ required: true, validator: elv.isMobile(), trigger: 'blur' }]
})

const onConfirm = (loading: ILoading) => {
  ruleForm.value?.validate((valid) => {
    if (valid) {
      loading(true)
      setTimeout(() => {
        if (isEditing.value) {
          ElMessage.success('编辑成功')
        } else {
          ElMessage.success('添加成功')
        }
        loading(false)
        router.back()
      }, 1000)
    } else {
      return false
    }
  })
}
</script>
