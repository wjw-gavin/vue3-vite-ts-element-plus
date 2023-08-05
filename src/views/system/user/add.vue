<template>
  <o-form-wrap title="用户管理" @confirm="onConfirm">
    <el-form
      ref="ruleForm"
      class="w-70"
      :model="formData"
      :rules="formRules"
      label-position="top"
    >
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="formData.mobile"
          placeholder="请输入手机号"
          :disabled="isEditing"
        />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name" placeholder="请输入姓名" />
      </el-form-item>

      <el-form-item v-if="!isEditing" label="默认密码" prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="请输入默认密码"
        />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="formData.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属角色：" prop="role_ids">
        <o-select
          v-model="formData.role_ids"
          multiple
          option-key="role_option"
          placeholder="请选择所属角色"
        />
      </el-form-item>
      <el-form-item label="用户头像：">
        <el-upload
          ref="upload"
          class="w-35 h-35 flex-center rd-1.5 b-1 b-dashed border-base"
          :action="`${baseURL}/file/upload`"
          :headers="headers"
          :limit="1"
          :show-file-list="false"
          :on-success="onAvatarSuccess"
          :on-exceed="onExceed"
        >
          <img v-if="formData.avatar" :src="formData.avatar" class="avatar" />
          <el-icon v-else><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
  </o-form-wrap>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { ElMessage, genFileId } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { baseURL } from '@/http'
import { useUserStore } from '@/stores/user'
import { createUser, getUserInfo, updateUser } from '@/api/system/user'
import { elv, getToken } from '@/utils'
import type { IUser } from '@/api/system/modal/userModel'
import type {
  FormInstance,
  FormRules,
  UploadInstance,
  UploadProps,
  UploadRawFile
} from 'element-plus'

const route = useRoute()
const router = useRouter()
const usestore = useUserStore()

const avatar = ref('')
const isEditing = ref(false)

const id = route.params.id
const headers = {
  'X-TOKEN': getToken()
}

isEditing.value = id ? true : false

const upload = ref<UploadInstance>()
const ruleForm = ref<FormInstance>()
const formData = reactive<IUser>({
  sex: '男',
  name: '',
  avatar: '',
  mobile: '',
  password: '',
  role_ids: []
})
const formRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
  mobile: [{ required: true, validator: elv.isMobile(), trigger: 'blur' }],
  password: [{ required: true, message: '请输入默认密码', trigger: 'blur' }],
  role_ids: [{ required: true, message: '请选择用户角色', trigger: 'change' }]
})

const userInfo = async () => {
  const info = await getUserInfo(+id)
  Object.assign(formData, info)
}

const onAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  formData.avatar = response.data.url
  avatar.value = URL.createObjectURL(uploadFile.raw!)
}

const onExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)

  const fileRaw = uploadFiles[0].raw!
  avatar.value = URL.createObjectURL(fileRaw)

  upload.value!.submit()
}

const onConfirm = () => {
  ruleForm.value?.validate(async (valid) => {
    if (valid) {
      if (isEditing.value) {
        await updateUser(formData)
        ElMessage.success('编辑成功')
        if (usestore.user.id === formData.id) {
          usestore.getUser()
        }
      } else {
        await createUser(formData)
        ElMessage.success('添加成功')
      }

      router.back()
    } else {
      return false
    }
  })
}

onBeforeMount(() => {
  if (isEditing.value) userInfo()
})
</script>

<style lang="scss">
.el-upload {
  width: 100%;
  height: 100%;
}
</style>
