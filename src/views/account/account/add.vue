<template>
  <nf-form-wrap title="账户管理" :on-save-btn-click="onSaveBtnClick">
    <el-form
      ref="ruleForm"
      :model="formData"
      :rules="formRules"
      label-width="95px"
    >
      <div class="item-box">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="formData.name" placeholder="请输入姓名" maxlength="10" />
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone">
          <el-input
            v-model="formData.phone"
            :disabled="isEditing"
            maxlength="11"
            placeholder="请输入常用手机号，用于账户登录"
          />
        </el-form-item>
        <el-form-item label="账户身份：" prop="roles">
          <el-checkbox-group v-model="formData.roles">
            <el-checkbox v-for="(item, index) in roleList" :key="index" :label="item['id']">
              {{ item['name'] }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
    </el-form>
  </nf-form-wrap>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue'
import { ElForm, ElFormItem, ElCheckboxGroup, ElCheckbox, ElInput, ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import store from '@/store'
import { getRoleList, handleAccount, getUserInfoById } from '@/api/account'
export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElCheckboxGroup,
    ElCheckbox,
    ElInput
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userInfo = computed(() => store.state['user'].userInfo)
    const isEditing = ref(false)
    const ruleForm: any = ref(null)
    const roleData = reactive({
      roleList: []
    })
    const formData = reactive({
      name: '',
      phone: '',
      roles: [],
      operator: userInfo.value.userId
    })
    const formRules = reactive({
      name: [{ required: true, message: '请输入正确的姓名', trigger: 'blur' }],
      roles: [{ required: true, message: '请选择权限', trigger: 'blur' }]
    })
    const userId = route.query.userId
    isEditing.value = userId ? true : false

    // 获取角色列表
    const getRoles = () => {
      getRoleList({
        pageNo: 1,
        pageSize: 10,
        options: {}
      }).then((res) => {
        roleData.roleList = res.list
      })
    }
    getRoles()
    const getAccountInfo = () => {
      getUserInfoById(userId).then((res) => {
        formData.name = res.name
        formData.phone = res.phone
        formData.roles = res.roles
      })
    }
    // 编辑获取详情
    if (isEditing.value) {
      getAccountInfo()
    }
    // 保存提交
    const onSaveBtnClick = (loading) => {
      ruleForm.value.validate((valid) => {
        if (valid) {
          loading(true)
          const params = {
            userId: '',
            name: formData.name,
            phone: formData.phone,
            roles: formData.roles,
            operator: formData.operator
          }
          if (isEditing.value) {
            params.userId = userId as string
          }
          handleAccount(isEditing.value ? 'put' : 'post', params)
            .then(() => {
              loading(false)
              ElMessage.success('提交成功')
              if (isEditing.value && userInfo.value.userId === userId) {
                store.dispatch('user/getUserInfo')
              }
              router.back()
            })
            .catch(() => {
              loading(false)
            })
        } else {
          return false
        }
      })
    }
    return {
      ...toRefs(roleData),
      ruleForm,
      isEditing,
      formData,
      formRules,
      onSaveBtnClick
    }
  }
})
</script>

<style lang="scss" scoped>
.item-box {
  width: 400px;
}
</style>
