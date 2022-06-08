<template>
  <g-form-wrap title="修改密码" :on-save-btn-click="onSaveBtnClick">
    <el-form
      ref="ruleForm"
      :model="formData"
      :rules="formRules"
      label-width="95px"
    >
      <div class="w-96">
        <el-form-item label="手机号：">
          <el-input v-model="userInfo.phone" disabled />
        </el-form-item>
        <el-form-item label="新密码：" prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            autocomplete="new-password"
            placeholder="请输入6-12位英文数字组合"
          />
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPassword">
          <el-input
            v-model="formData.checkPassword"
            type="password"
            placeholder="请输入6-12位英文数字组合"
          />
        </el-form-item>
      </div>
    </el-form>
  </g-form-wrap>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import store from '@/store'
export default defineComponent({
  setup() {
    const ruleForm: any = ref(null)
    const formData = reactive({
      password: '',
      checkPassword: ''
    })

    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (formData.checkPassword !== '') {
          ruleForm.value.validateField('checkPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== formData.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    const formRules = reactive({
      password: [{ required: true, validator: validatePass, trigger: 'blur' }],
      checkPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }]
    })

    const userInfo = computed(() => store.state['user'].userInfo)

    const onSaveBtnClick = (loading) => {
      loading(true)
      ruleForm.value.validate((valid) => {
        if (valid) {
          setTimeout(() => {
            loading(false)
            ElMessage.success('修改成功')
          }, 1000)
        } else {
          return false
        }
      })
    }
    return {
      formData,
      ruleForm,
      formRules,
      userInfo,
      onSaveBtnClick
    }
  }
})
</script>
