<template>
  <div class="login-wrap">
    <div class="logo-img">
      <img src="@/assets/imgs/default-avatar.png" alt="" />
    </div>
    <div class="login">
      <div class="main-left_img">
        <img src="@/assets/imgs/login-bg.png" alt="" />
      </div>
      <div class="login-model">
        <div class="content">
          <div class="text-center text-2xl font-semibold mb-5">运营管理系统</div>
          <el-form ref="formRef" :model="loginForm" :rules="formRules">
            <el-tabs id="login-tab" v-model="activeTab" @tab-click="handleTabClick">
              <div class="tip">同一手机号可登录牛卡福网络旗下的万金油和牛运宝等产品</div>
              <el-tab-pane label="账号登录" name="password">
                <el-form-item label="" prop="phone">
                  <el-input v-model="loginForm.phone" type="number" placeholder="请输入手机号">
                    <template #prefix>
                      <el-icon><iphone /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item v-if="activeTab === 'password'" prop="password">
                  <el-input v-model="loginForm.password" type="password" placeholder="请输入密码">
                    <template #prefix>
                      <el-icon><lock /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="验证码登录" name="code">
                <el-form-item label="" prop="phone">
                  <el-input v-model="loginForm.phone" placeholder="请输入手机号">
                    <template #prefix>
                      <el-icon><iphone /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item v-if="activeTab === 'code'" prop="code" class="code-item">
                  <el-input v-model="loginForm.code" maxlength="6" placeholder="请输入验证码">
                    <template #prefix>
                      <el-icon><discount /></el-icon>
                    </template>
                  </el-input>
                  <el-button
                    type="text"
                    :loading="codeLoading"
                    :class="{ disabled: codeText !== '获取验证码' && codeText !== '重新发送' }"
                    @click="handleCode"
                  >
                    {{ codeText }}
                  </el-button>
                </el-form-item>
              </el-tab-pane>
            </el-tabs>
            <el-form-item class="footer-btn">
              <el-button type="primary" :loading="loginLoading" @click="login"> 登 录 </el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 底部 -->
        <footer>
          <p>牛卡福网络 备案号：京ICP备16011619号-1</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted, onBeforeUnmount } from 'vue'
import { ElForm, ElFormItem, ElInput, ElTabs, ElTabPane, ElMessage, ElIcon } from 'element-plus'
import { login } from '@/api/login'
import { setToken } from '@/utils/auth'
import { isPhone } from '@/utils/validation'
import elv from '@/utils/elValidation'
import store from '@/store'
import router from '@/router'
let timer: any

export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElTabs,
    ElTabPane,
    ElIcon
  },
  setup() {
    const time = ref(60)
    const codeLoading = ref(false)
    const loginLoading = ref(false)
    const activeTab = ref('password')
    const codeText = ref('获取验证码')
    const formRef = ref<any>(null)
    const form = reactive({
      loginForm: {
        phone: '',
        code: '',
        password: ''
      }
    })
    const formRules = reactive({
      phone: [{ required: true, validator: elv.isPhone(), trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
    })

    let barNode: HTMLElement | null = null
    onMounted(() => {
      const tabs: HTMLElement = document.getElementById('login-tab') as HTMLElement
      barNode = tabs.querySelector('.el-tabs__active-bar') as HTMLElement
      if (activeTab.value === 'password') {
        barNode.classList.add('password')
        barNode.classList.remove('code')
      } else {
        barNode.classList.remove('password')
        barNode.classList.add('code')
      }
      window.addEventListener('keyup', enterClick)
    })
    // 切换登录方式
    let tabIndex = '0'
    const handleTabClick = (item) => {
      const tab = item.props
      if (tabIndex === item.index) return
      tabIndex = item.index
      if (tab.name === 'password') {
        ;(barNode as HTMLElement).classList.add('password')
        ;(barNode as HTMLElement).classList.remove('code')
      } else {
        ;(<HTMLElement>barNode).classList.remove('password')
        ;(<HTMLElement>barNode).classList.add('code')
      }
    }
    // 获取验证码
    const handleCode = () => {
      if (!(codeText.value === '获取验证码' || codeText.value === '重新发送')) return

      if (form.loginForm.phone === '') {
        ElMessage.error('请输入手机号')
        return
      }
      if (!isPhone(form.loginForm.phone)) return
      codeLoading.value = true
      codeText.value = time.value + 's'
      timer = setInterval(() => {
        codeText.value = --time.value + 's'
        if (time.value <= 0) {
          clearInterval(timer)
          time.value = 60
          codeText.value = '重新发送'
        }
      }, 1000)
      getCode({
        event: 'login',
        phone: form.loginForm.phone
      })
        .then(() => {
          ElMessage.success('验证码发送成功')
          codeLoading.value = false
          if (timer) {
            clearInterval(timer)
            time.value = 60
            codeText.value = '重新发送'
          }
        })
        .catch(() => {
          codeLoading.value = false
          time.value = 60
          codeText.value = '重新发送'
        })
    }
    // 回车事件
    const enterClick = (event) => {
      if (loginLoading.value || event.keyCode !== 13) return
      loginFun()
    }

    const loginSuccess = (res) => {
      setToken(res.nToken)
      loginLoading.value = false
      store.commit('user/updateUserInfo', {
        userId: res.userId,
        userName: res.name,
        roles: res.roles,
        phone: res.phone
      })
      router.push('/home')
    }
    // 触发登录
    const loginFun = () => {
      // 表单校验
      formRef.value.validate((valid) => {
        if (valid) {
          // 验证通过
          loginLoading.value = true
          if (activeTab.value === 'password') {
            const params = {
              phone: form.loginForm.phone,
              password: form.loginForm.password
            }
            login(params)
              .then((res) => {
                loginSuccess(res)
              })
              .catch(() => {
                loginLoading.value = false
              })
          } else {
            const params = {
              phone: form.loginForm.phone,
              code: form.loginForm.code
            }
            login(params)
              .then((res) => {
                loginSuccess(res)
              })
              .catch(() => {
                loginLoading.value = false
              })
          }
        } else {
          return false
        }
      })
    }
    onBeforeUnmount(() => {
      window.removeEventListener('keyup', enterClick)
    })
    return {
      ...toRefs(form),
      loginLoading,
      codeLoading,
      activeTab,
      codeText,
      formRef,
      formRules,
      handleTabClick,
      handleCode,
      login
    }
  }
})
</script>
<style lang="scss" scoped>
.el-form {
  :deep(.el-input__inner) {
    height: 60px;
    line-height: 60px;
  }

  .el-button {
    padding: 15px 20px;
  }
}

.login-wrap {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f5f6fa;
}

.main-left_img {
  flex-shrink: 0;
  width: 665px;
  height: 568px;

  img {
    width: 100%;
  }
}

.login {
  height: 100%;
  min-height: 545px;
  min-width: 1000px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  box-sizing: border-box;
}

.logo-img {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 22px 70px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(63, 78, 96, 0.08);
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .line {
    height: 30px;
    width: 1px;
    background: #e3e3e3;
    margin: 0 24px;
  }

  .wjy-logo,
  .tyb-logo {
    height: 35px;
  }

  img {
    height: 100%;
  }
}

.desc {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 11%;
  color: #fff;

  h2 {
    font-size: 60px;
    margin-top: 0;
    margin-bottom: 36px;
  }

  p {
    font-size: 36px;
  }
}

.login-model {
  width: 440px;
  margin-left: 190px;
  flex-shrink: 0;
}

.content {
  background: #fff;
  padding: 34px 16px;

  .tip {
    color: #828384;
    font-size: 12px;
    margin: 15px 0 30px 0;
    text-align: center;
  }
}

:deep(.el-form-item) {
  .el-input--prefix {
    .el-input__prefix {
      left: 14px;
      display: flex;
      align-items: center;
    }

    img {
      width: 17px;
      height: 22px;
    }

    .el-input__inner {
      padding-left: 45px;
    }
  }
}

:deep(.code-item) {
  border-radius: 4px;
  border: 1px solid #dcdfe6;

  .el-form-item__content {
    display: flex;
  }

  .el-input__inner {
    border: 0;
    height: 58px;
    line-height: 58px;
  }

  .el-button {
    width: 160px;
    position: relative;
    padding: 14px 20px;
    font-weight: 500;

    &.disabled {
      color: #c0c4cc;
    }

    &:hover {
      opacity: 0.7;
    }

    &::before {
      content: '';
      width: 1px;
      height: 23px;
      background: #eaebef;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

footer {
  color: #999;
  text-align: center;
  margin-top: 80px;

  p {
    font-weight: 400;
    margin-bottom: 0;
  }
}

:deep(.el-tabs) {
  .el-tabs__item {
    color: #777782;
    font-size: 24px;

    &.is-active {
      color: $text-color;
    }
  }

  .el-tabs__nav-wrap::after {
    height: 1px;
  }

  .el-tabs__nav {
    padding: 20px 0;
  }

  .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
  }

  .el-tabs__content {
    padding: 0 45px;
  }
}

.footer-btn {
  padding: 0 45px;
  margin-bottom: 30px;

  .el-button {
    width: 100%;
    margin-top: 54px;
  }
}
</style>
