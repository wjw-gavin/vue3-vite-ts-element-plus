<template>
  <div class="login-wrap">
    <div class="logo-box flex items-center">
      <img class="w-60px" src="@/assets/svg/logo.svg" alt="" />
      <div class="ml-5 font-bold text-5">offbeat-ui</div>
    </div>
    <div class="login">
      <div class="main-left_img">
        <img :src="loginLeft" alt="" />
      </div>
      <div class="login-model flex-center">
        <div class="content">
          <el-form ref="formRef" :model="loginForm" :rules="formRules">
            <el-tabs id="login-tab" v-model="activeTab">
              <div class="tip" />
              <el-tab-pane label="账号登录" name="password">
                <el-form-item label="" prop="mobile">
                  <el-input
                    v-model="loginForm.mobile"
                    type="number"
                    class="m-2"
                    placeholder="请输入手机号"
                  >
                    <template #prefix>
                      <el-icon :size="22"><iphone /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item v-if="activeTab === 'password'" prop="password">
                  <el-input
                    v-model="loginForm.password"
                    type="password"
                    show-password
                    class="m-2"
                    placeholder="请输入密码"
                  >
                    <template #prefix>
                      <el-icon :size="22"><lock /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="验证码登录" name="code">
                <el-form-item label="" prop="mobile">
                  <el-input
                    v-model="loginForm.mobile"
                    placeholder="请输入手机号"
                    class="m-2"
                  >
                    <template #prefix>
                      <el-icon :size="22"><iphone /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  v-if="activeTab === 'code'"
                  prop="code"
                  class="code-item"
                >
                  <el-input
                    v-model="loginForm.code"
                    maxlength="6"
                    class="m-2"
                    placeholder="请输入验证码"
                  >
                    <template #prefix>
                      <el-icon :size="22"><discount /></el-icon>
                    </template>
                  </el-input>
                  <el-button
                    link
                    type="primary"
                    :loading="codeLoading"
                    :disabled="
                      codeText !== '获取验证码' && codeText !== '重新发送'
                    "
                    @click="handleCode"
                  >
                    {{ codeText }}
                  </el-button>
                </el-form-item>
              </el-tab-pane>
            </el-tabs>
            <el-form-item class="footer-btn">
              <el-button
                type="primary"
                :loading="loginLoading"
                class="w-50 m-2"
                @click="loginFun"
              >
                登 录
              </el-button>
            </el-form-item>
          </el-form>
          <footer>
            <p>
              offbeat-ui 备案号：
              <a class="c-primary decoration-none" href="#" target="_blank">
                京ICP备xxx号-x
              </a>
            </p>
          </footer>
        </div>
        <!-- 底部 -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Iphone, Lock } from '@element-plus/icons-vue'
import { onMounted, reactive, ref, toRefs } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { isMobile } from 'native-lodash'
import { useCountDown } from '@/hooks'
import { login } from '@/api/login'
import { elv, setToken } from '@/utils'
import router from '@/router'
import loginLeft from '@/assets/svg/login_left.svg'
import type { FormInstance, FormRules } from 'element-plus'

const codeLoading = ref(false)
const loginLoading = ref(false)
const activeTab = ref('password')
const codeText = ref('获取验证码')
const formRef = ref<FormInstance>()
const form = reactive({
  loginForm: {
    mobile: '18688880001',
    code: '',
    password: 'g123456'
  }
})
const { loginForm } = toRefs(form)
const formRules = reactive<FormRules>({
  mobile: [{ required: true, validator: elv.isMobile(), trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

// 获取验证码
const handleCode = () => {
  if (!(codeText.value === '获取验证码' || codeText.value === '重新发送'))
    return

  if (!isMobile(form.loginForm.mobile)) {
    ElMessage.error('请输入正确手机号')
    return
  }
  getcode()
  const countDown = useCountDown({
    time: 60 * 1000,
    onChange: (current) => {
      if (current.seconds === 0) {
        countDown.pause()
        codeText.value = '重新发送'
      } else {
        codeText.value = `${current.seconds}s`
      }
    }
  })
  countDown.start()
}

const getcode = () => {
  codeLoading.value = true

  setTimeout(() => {
    ElMessage.success('获取成功')
    codeLoading.value = false
  }, 1000)
}

// 触发登录
const loginFun = () => {
  // 表单校验
  formRef.value?.validate((valid) => {
    if (valid) {
      // 验证通过
      loginLoading.value = true
      login(form.loginForm)
        .then((res) => {
          setToken(res.token)
          loginLoading.value = false
          router.push('/home')
        })
        .catch(() => {
          loginLoading.value = false
        })
    } else {
      return false
    }
  })
}

// 回车事件
onMounted(() => {
  onKeyStroke('Enter', () => {
    if (loginLoading.value) return
    loginFun()
  })
})
</script>
<style lang="scss" scoped>
.logo-box {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 12px 0px rgba(63, 78, 96, 0.08);
  top: 0;
  left: 0;
  z-index: 100;
  padding: 10px 20px 15px;
}
.el-form {
  width: 408px;
  padding: 50px 21px;
  background: #ffffff;
  :deep(.el-input__inner) {
    height: 60px;
    line-height: 60px;
  }
  :deep(.el-tabs__item) {
    width: 200px;
    text-align: center;
    font-size: 24px;
    color: #666666;
  }
  ::placeholder {
    font-size: 16px;
    color: #c0c4cc;
  }
  :deep(.el-tabs__item.is-active) {
    color: #181818;
  }
  .code-item .el-button {
    position: absolute;
    height: 22px;
    line-height: 22px;
    top: 30px;
    right: 20px;
    border-left: 1px solid #d8d9e1;
    padding-left: 15px;
    font-weight: 500;
    font-size: 16px;
    border-radius: 0;
  }
  .footer-btn .el-button {
    width: 100%;
    height: 60px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
    border: none;
  }
}

.login-wrap {
  width: 100%;
  height: 100%;
  background: #f5f6fa;
  display: flex;
  flex-direction: column;
}

.login {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 40px;
  background-image: url(@/assets/svg/login_bg.svg);
  background-size: 100% 100%;
  .main-left_img {
    flex: 1;
    margin-top: -60px;
    padding-left: 40px;
    img {
      width: 90%;
    }
  }
  .login-model {
    width: 700px;
    margin-top: -40px;
  }
  .content {
    height: 520px;
    box-shadow: #0000001a 0 2px 10px 2px;
    background: #fff;
    overflow: hidden;
  }
}
footer p {
  width: 100%;
  text-align: center;
  margin-top: 40px;
  font-size: 14px;
  color: #999;
}
</style>
