<template>
  <o-form-wrap title="文章管理" @confirm="onConfirm">
    <el-form
      ref="ruleForm"
      class="w-100"
      :model="formData"
      :rules="formRules"
      label-position="top"
    >
      <el-form-item label="文章标题：" prop="title">
        <el-input v-model="formData.title" placeholder="请输入文章标题" />
      </el-form-item>
      <el-form-item label="文章内容：" prop="content">
        <el-input
          v-model="formData.content"
          type="textarea"
          rows="10"
          placeholder="请输入文章内容"
        />
      </el-form-item>
    </el-form>
  </o-form-wrap>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import {
  createArticle,
  getArticleInfo,
  updateArticle
} from '@/api/base/article'
import type { ILoading } from '@/types'
import type { FormInstance, FormRules } from 'element-plus'
import type { IArticle } from '@/api/base/modal/articleModal'

const route = useRoute()
const router = useRouter()

const isEditing = ref(false)
const id = route.params.id

isEditing.value = id ? true : false

const ruleForm = ref<FormInstance>()
const formData = reactive<IArticle>({
  title: '',
  content: ''
})
const formRules = reactive<FormRules>({
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
})

const articleInfo = async () => {
  const info = await getArticleInfo(+id)
  Object.assign(formData, info)
}

const onConfirm = (loading: ILoading) => {
  ruleForm.value?.validate(async (valid) => {
    if (valid) {
      loading(true)
      if (isEditing.value) {
        await updateArticle(formData)
        ElMessage.success('编辑成功')
      } else {
        await createArticle(formData)
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
