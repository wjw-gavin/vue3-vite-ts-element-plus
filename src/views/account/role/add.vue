<template>
  <nf-form-wrap title="角色管理" :on-save-btn-click="onSaveBtnClick">
    <el-form
      ref="ruleForm"
      :model="formData"
      :rules="formRules"
      label-position="top"
      inline
    >
      <div class="w-full">
        <el-form-item class="w-96" label="角色名称：" prop="name">
          <el-input v-model="formData.name" placeholder="请输入角色名称" />
        </el-form-item>
      </div>
      <div class="w-full">
        <div class="flex justify-start" style="width: 352px;">
          <el-input
            v-model="keywords"
            clearable
            placeholder="输入关键字搜索权限"
          />
          <el-button
            style="margin-left: 20px"
            class="ml-6"
            type="primary"
            @click="search(keywords)"
          >
            搜索
          </el-button>
        </div>

        <el-tabs ref="elTabs" type="card" style="margin-top: 20px">
          <!-- 这里通过变更 key 触发badge更新 -->
          <el-tab-pane v-for="(item, index) in groupList" :key="item.num ? item.num : index">
            <template #label>
              {{ item.value }}
              <el-badge v-if="item.num > 0" :value="item.num" class="item" />
            </template>
            <section
              v-for="(item1, index1) in item.children"
              :key="index1"
              class="box-card"
              style="margin-top: 20px"
            >
              <div class="box-card_header">
                <span class="box-card_title">{{ item1.value }}</span>
                <el-checkbox
                  v-model="item1.is_checked"
                  class="sall ml-8"
                  type="text"
                  :disabled="item1.disabled"
                  @change="selectAll(item1)"
                >
                  全选
                </el-checkbox>
              </div>
              <div v-if="item1.privileges" class="check-box">
                <div
                  v-for="(item2, index2) in item1.privileges"
                  :key="index2"
                  :class="[{ active: item2.isactive }, 'item2', 'checkDom']"
                >
                  <el-checkbox
                    v-model="item2.is_checked"
                    :disabled="item2.is_default"
                    @change="selectItem(item1)"
                  >
                    {{ item2.value }}
                  </el-checkbox>
                </div>
              </div>
            </section>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-form>
  </nf-form-wrap>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue'
import {
  ElForm,
  ElFormItem,
  ElCheckbox,
  ElTabs,
  ElTabPane,
  ElBadge,
  ElInput,
  ElMessage
} from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import store from '@/store'
import { getRoleData, getRoleDetail, handleRole } from '@/api/account'
interface FORM {
  id: string | number
  name: string
  creator?: string
  updater?: string
  privileges: any[]
}
export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElCheckbox,
    ElInput,
    ElTabs,
    ElTabPane,
    ElBadge
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userInfo = computed(() => store.state['user'].userInfo)
    const isEditing = ref(false)

    const keywords = ref('')
    const ruleForm: any = ref(null)
    const groups = reactive({
      groupList: []
    })
    const formData = reactive(<FORM>{
      id: '',
      name: '',
      privileges: []
    })
    const formRules = reactive({
      name: [{ required: true, message: '请输入正确的姓名', trigger: 'blur' }]
    })
    const id = route.query.id as string
    isEditing.value = id ? true : false
    // 获取所有权限
    const getPrivilegesCandidate = () => {
      getRoleData().then((res) => {
        groups.groupList = res
        groups.groupList.forEach((item: any) => {
          item.children.forEach((item1) => {
            if (item1.privileges) {
              item1.privileges.forEach((item2) => {
                if (item2.is_checked) {
                  selectItem(item1)
                }
              })
            }
          })
        })
      })
    }
    getPrivilegesCandidate()
    // 全选
    const selectAll = (data) => {
      groups.groupList.forEach((item: any) => {
        item.children.forEach((item1) => {
          if (item1.key === data.key) {
            if (item1.privileges) {
              item1.privileges.forEach((item2) => {
                if (!item2.is_default) {
                  item2.is_checked = data.is_checked
                }
              })
            }
          }
        })
      })
    }
    // 单个选
    const selectItem = (data) => {
      groups.groupList.forEach((item: any) => {
        item.children.forEach((item1) => {
          if (item1.key === data.key) {
            // 找到对应的item1
            if (item1.privileges) {
              if (item1.privileges.every((item2) => item2.is_checked)) {
                item.is_checked = true
              } else {
                item.is_checked = false
              }
              if (item1.privileges.every((item2) => !item2.is_default)) {
                item.is_checked = false
              } else {
                item.is_checked = true
              }
            }
          }
        })
      })
    }
    // 权限搜索
    const search = (val) => {
      groups.groupList.forEach((item: any) => {
        let n = 0
        item.children.forEach((item1) => {
          if (item1.privileges) {
            item1.privileges.forEach((item2) => {
              if (val && item2.value.indexOf(val) !== -1) {
                item2.isactive = true
                n++
              } else {
                item2.isactive = false
              }
            })
          }
        })
        item.num = n
      })
      console.log(groups.groupList)

    }
    // 编辑时获取详情信息
    const getDetail = () => {
      getRoleDetail(id).then((res) => {
        formData.name = res.name
        formData.privileges = []
        groups.groupList = res.privileges
        groups.groupList.forEach((item: any) => {
          item.children.forEach((item1) => {
            if (item1.privileges) {
              item1.privileges.forEach((item2) => {
                if (item2.is_checked) {
                  selectItem(item1)
                }
              })
            }
          })
        })
      })
    }
    // 编辑时
    if (isEditing.value) {
      getDetail()
    }
    // 保存提交
    const onSaveBtnClick = (loading) => {
      ruleForm.value.validate((valid) => {
        if (valid) {
          formData.privileges = []
          groups.groupList.forEach((item: any) => {
            item.children.forEach((item1) => {
              if (item1.privileges) {
                item1.privileges.forEach((item2) => {
                  if (item2.is_checked) {
                    formData.privileges.push(item2.key)
                  }
                })
              }
            })
          })
          loading(true)
          // 判断 编辑 和 新增
          if (isEditing.value) {
            formData.id = id
            formData.updater = userInfo.value.userId
          } else {
            formData.creator = userInfo.value.userId
          }
          handleRole(isEditing.value ? 'put' : 'post', formData)
            .then(() => {
              loading(false)
              ElMessage.success('操作成功')
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
      ...toRefs(groups),
      ruleForm,
      keywords,
      formData,
      formRules,
      onSaveBtnClick,
      selectAll,
      search,
      selectItem
    }
  }
})
</script>

<style lang="scss" scoped>
card-type {
  margin-bottom: 20px;
  & > label {
    margin-right: 10px;
  }
}
.box-card_header {
  height: 48px;
  background: rgba(250, 251, 252, 1);
  border-left: 3px solid $primary;
  text-indent: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.box-card_title {
  font-weight: bold;
  height: 48px;
  line-height: 48px;
}
.check-box {
  padding: 0 20px;
  .checkDom {
    display: inline-block;
    margin-top: 20px;
    margin-right: 20px;
  }
}
.item-btns {
  display: inline-block;
  margin-top: 35px;
  .el-button {
    padding: 5px 10px;
    font-size: 20px;
    font-weight: 600;
  }
}
.sall{
  :deep(.el-checkbox__label){
    margin-left: -20px;
  }
}
.active {
  :deep(.el-checkbox__label) {
    background-color: #feedbc;
  }
}
</style>
