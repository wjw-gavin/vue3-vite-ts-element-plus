<template>
  <div class="login-wrap">
    <div class="login">
      <div class="logo-img">
        <img src="@/assets/imgs/logo.png" alt="" />
      </div>
      <div class="desc">
        <h2>万能管家</h2>
        <p>让油站管理更智能</p>
      </div>
      <div class="login-model">
        <div class="content">
          <el-form ref="formRef" :model="loginForm" :rules="formRules">
            <el-tabs id="login-tab" v-model="activeTab" @tab-click="handleTabClick">
              <el-tab-pane label="密码登录" name="password">
                <el-form-item label="" prop="mobile">
                  <el-input v-model="loginForm.mobile" type="number" placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item v-if="activeTab === 'password'" prop="password">
                  <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="验证码登录" name="code">
                <el-form-item label="" prop="mobile">
                  <el-input v-model="loginForm.mobile" type="number" placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item v-if="activeTab === 'code'" prop="code" class="code-item">
                  <el-input v-model="loginForm.code" maxlength="6" placeholder="验证码" />
                  <el-button
                    type="text"
                    :loading="codeLoading"
                    :class="{ active: codeText !== '获取验证码' }"
                    @click="handleCode"
                  >
                    {{ codeText }}
                  </el-button>
                </el-form-item>
              </el-tab-pane>
            </el-tabs>
            <el-form-item class="float-right" />
            <el-button
              class="btn-block"
              type="primary"
              round
              :loading="loginLoading"
              @click="login"
            >
              登 录
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <footer>
      <p>©2021 牛卡福集团</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted, onBeforeUnmount } from 'vue'
import { ElForm, ElFormItem, ElInput, ElTabs, ElTabPane, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getCode, loginByPwd, loginByCode } from '@/api/login'
import { setToken } from '@/utils/auth'
import { isPhone } from '@/utils/validation'
let timer: any

export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElTabs,
    ElTabPane
  },
  setup() {
    const router = useRouter()
    const { commit } = useStore()
    const time = ref(60)
    const codeLoading = ref(false)
    const loginLoading = ref(false)
    const activeTab = ref('password')
    const codeText = ref('获取验证码')
    const formRef = ref<any>(null)
    const form = reactive({
      loginForm: {
        mobile: '',
        code: '',
        password: ''
      }
    })
    const formRules = {
      mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
    }
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
        (barNode as HTMLElement).classList.add('password')
        ;(barNode as HTMLElement).classList.remove('code')
      } else {
        (<HTMLElement>barNode).classList.remove('password')
        ;(<HTMLElement>barNode).classList.add('code')
      }
    }
    // 获取验证码
    const handleCode = () => {
      if (!(codeText.value === '获取验证码' || codeText.value === '重新获取')) return

      if (form.loginForm.mobile === '') {
        ElMessage.error('请输入手机号')
        return
      }
      if (!isPhone(form.loginForm.mobile)) return
      codeLoading.value = true
      codeText.value = time.value + '秒后获取'
      timer = setInterval(() => {
        codeText.value = --time.value + '秒后获取'
        if (time.value <= 0) {
          clearInterval(timer)
          time.value = 60
          codeText.value = '重新获取'
        }
      }, 1000)
      getCode({
        event: 'login',
        mobile: form.loginForm.mobile
      })
        .then(() => {
          ElMessage.success('验证码发送成功')
          codeLoading.value = false
          if (timer) {
            clearInterval(timer)
            time.value = 60
            codeText.value = '重新获取'
          }
        })
        .catch(() => {
          codeLoading.value = false
          time.value = 60
          codeText.value = '重新获取'
        })
    }
    // 回车事件
    const enterClick = (event) => {
      if (loginLoading.value) return
      if (event.keyCode === 13) {
        login()
      }
    }

    const loginSuccess = (res) => {
      setToken(res.ntoken)
      loginLoading.value = false
      commit('user/updateUserInfo', {
        userId: res.userId,
        userName: res.userName,
        companyId: res.companyId,
        companyName: res.companyName
      })
      router.push('/home')
    }
    // 触发登录
    const login = () => {
      // 表单校验
      formRef.value.validate((valid) => {
        if (valid) {
          // 验证通过
          loginLoading.value = true
          if (activeTab.value === 'password') {
            const params = {
              mobile: form.loginForm.mobile,
              password: form.loginForm.password
            }
            loginByPwd(params).then((res) => {
              loginSuccess(res)
            })
          } else {
            const params = {
              mobile: form.loginForm.mobile,
              code: form.loginForm.code
            }
            loginByCode(params).then((res) => {
              loginSuccess(res)
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
    height: 46px;
    line-height: 46px;
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
}

.login {
  background: url('../../assets/imgs/login-bg.png') no-repeat center#fafcff;
  background-size: 100% 100%;
  height: 100%;
  min-height: 545px;
  min-width: 1000px;
  margin: 0 auto;
  position: relative;
}

.logo-img {
  position: absolute;
  width: 156px;
  height: 41px;
  margin: 0;
  left: 67px;
  top: 70px;

  img {
    width: 100%;
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
  position: absolute;
  right: 11%;
  top: 50%;
  transform: translateY(-50%);
  width: 461px;
}

.content {
  background: #fff;
  box-shadow: 0 0 3px 0 #edf4fb;
  padding: 80px 58px;
  border-radius: 16px;
}

:deep(.code-item) {
  border-radius: 4px;
  border: 1px solid #dcdfe6;

  .el-form-item__content {
    display: flex;
  }

  .el-input__inner {
    border: 0;
    height: 44px;
    line-height: 44px;
  }

  .el-button {
    width: 160px;
    position: relative;
    padding: 14px 20px;
    font-weight: 500;

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

.btn-block {
  width: 100%;
  margin-top: 40px;
  box-shadow: 0 2px 7px 0 rgba(3, 35, 84, 0.43);
}

footer {
  position: absolute;
  color: #cec8d8;
  bottom: 35px;
  line-height: 20px;
  left: 50%;
  transform: translateX(-50%);

  p {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    margin-top: 10px;
    margin-bottom: 0;
  }
}

:deep(.el-tabs) {
  .el-tabs__item {
    color: #777782;
    transition: font-size 0.3s;

    &.is-active {
      font-size: 36px;
      color: $text-color;
    }
  }

  .el-tabs__nav-wrap::after {
    height: 0;
    width: 0;
  }

  .el-tabs__active-bar {
    height: 8px;
    border-radius: 5px;
    background-color: $primary;
    width: 30px !important;

    &.password {
      transform: translateX(78px) !important;
    }

    &.code {
      transform: translateX(222px) !important;
    }
  }

  .el-tabs__header {
    margin-bottom: 40px;
  }

  .el-tabs__nav {
    width: 100%;
    padding: 20px 0;
    display: flex;
    justify-content: space-around;
  }
}
</style>
