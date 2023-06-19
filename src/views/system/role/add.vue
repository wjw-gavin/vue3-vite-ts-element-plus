<template>
  <o-form-wrap title="角色管理" @confirm="onConfirm">
    <el-form
      ref="ruleForm"
      class="w-100"
      :model="formData"
      :rules="formRules"
      label-position="top"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色状态" prop="name">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1" size="large">启用</el-radio>
          <el-radio :label="0" size="large">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色描述：" prop="desc">
        <el-input v-model="formData.desc" placeholder="请输入角色描述" />
      </el-form-item>
    </el-form>
  </o-form-wrap>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { createRole, getRoleInfo, updateRole } from '@/api/system/role'
import type { ILoading } from '@/types'
import type { IRole } from '@/api/system/modal/roleModel'
import type { FormInstance, FormRules } from 'element-plus'

const route = useRoute()
const router = useRouter()

const isEditing = ref(false)
const id = route.params.id

isEditing.value = id ? true : false

const ruleForm = ref<FormInstance>()
const formData = reactive<IRole>({
  name: '',
  desc: '',
  status: 1
})
const formRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  desc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
})

const articleInfo = async () => {
  const info = await getRoleInfo(+id)
  Object.assign(formData, info)
}

// onConfirm 组件默认自带防连点 间隔为 1s，
// 也可以通过 loading 方法设置 button 的 loading 实现防连点
const onConfirm = (loading: ILoading) => {
  ruleForm.value?.validate(async (valid) => {
    if (valid) {
      loading(true)
      if (isEditing.value) {
        await updateRole(formData)
        ElMessage.success('编辑成功')
      } else {
        await createRole(formData)
        ElMessage.success('添加成功')
      }

      loading(false)
      router.back()
    } else {
      return false
    }
  })
}

onBeforeMount(() => {
  if (isEditing.value) articleInfo()
})
</script>
