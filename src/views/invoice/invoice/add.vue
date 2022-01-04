<template>
  <nf-form-wrap title="申请开票" :on-save-btn-click="onSaveBtnClick">
    <div class="order-detail">
      <div class="cell">
        <div class="label">消费时间：</div>
        <div class="value">{{ query.time }}</div>
      </div>
      <div class="cell">
        <div class="label">货物名称：</div>
        <div class="value">{{ query.fuelName }}</div>
      </div>
      <div class="cell">
        <div class="label">数量（升）：</div>
        <div class="value">{{ query.fuelAmount }}</div>
      </div>
      <div class="cell">
        <div class="label">单价（元）：</div>
        <div class="value">{{ query.price }}</div>
      </div>
      <div class="cell items-center flex">
        <div class="label">开票金额（元）：</div>
        <div class="value">
          <el-input
            v-model="invoiceAmount"
            type="number"
            size="small"
            placeholder="最多两位小数的金额"
          />
        </div>
      </div>
    </div>
    <el-divider />
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      inline
      label-position="top"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="发票类型：" prop="titleType">
        <el-radio-group v-model="formData.titleType">
          <el-radio :label="1">企业单位</el-radio>
          <el-radio :label="2">个人/非企业单位</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="formData.titleType === 1" class="flex flex-wrap w-full">
        <el-form-item label="企业名称：" prop="companyName">
          <el-input v-model="formData.companyName" />
        </el-form-item>
        <el-form-item label="企业税号：" prop="companyTaxNo">
          <el-input v-model="formData.companyTaxNo" />
        </el-form-item>
        <el-form-item label="注册地址：" prop="companyAddress">
          <el-input v-model="formData.companyAddress" />
        </el-form-item>
        <el-form-item label="注册电话：" prop="companyPhone">
          <el-input v-model="formData.companyPhone" />
        </el-form-item>
        <el-form-item label="开户银行：" prop="companyBank">
          <el-input v-model="formData.companyBank" />
        </el-form-item>
        <el-form-item label="银行账号：" prop="companyBankAccount">
          <el-input v-model="formData.companyBankAccount" />
        </el-form-item>
        <el-form-item label="接收邮箱：" prop="email">
          <el-input v-model="formData.email" type="email" />
        </el-form-item>
        <el-form-item label="备注：" prop="remark" style="width: 530px">
          <el-input v-model="formData.remark" type="textarea" />
        </el-form-item>
      </div>
      <div v-else class="flex flex-wrap w-full">
        <el-form-item label="个人姓名：" prop="userName">
          <el-input v-model="formData.userName" />
        </el-form-item>
        <el-form-item class="w-full" label="接收邮箱：" prop="email">
          <el-input v-model="formData.email" type="email" />
        </el-form-item>
      </div>
    </el-form>
  </nf-form-wrap>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElForm, ElFormItem, ElRadioGroup, ElRadio, ElInput, ElDivider, ElMessage } from 'element-plus'
import { invoiceRequestAdd } from '@/api/invoice'
import { moneyYuanToCent } from '@/utils/utils'
import elv from '@/utils/elValidation'
export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElRadioGroup,
    ElRadio,
    ElInput,
    ElDivider
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const formRef: any = ref(null)
    const query = reactive(route.query)
    const rules = reactive({
      companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
      companyTaxNo: [{ required: true, message: '请输入公司税号', trigger: 'blur' }],
      // companyTaxNo: [{ required: true, validator: elv.isTaxNo(), trigger: 'blur' }],
      userName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      email: [{ required: true, validator: elv.isEmail(), trigger: 'blur' }]
    })
    const invoiceAmount = ref(query.invoiceAmount as string | number)
    const formData = reactive({
      titleType: 1,
      remark: '', //备注
      invoiceAmount: 0,
      email: '', //电子邮箱（用来发电子发票）
      companyName: '', //公司名称
      companyTaxNo: '', //公司税号
      companyAddress: '', //公司地址
      companyPhone: '', //公司电话
      companyBank: '', //公司开户行
      companyBankAccount: '', //公司开户行账号
      userPhone: '', //手机号码
      userName: '' //个人姓名
    })
    const onSaveBtnClick = (loading) => {
      formRef.value.validate((valid: boolean) => {
        if (valid) {
          loading(true)
          invoiceRequestAdd({
            content: JSON.stringify(formData),
            orders: [
              {
                orderId: query.orderId,
                invoiceAmount: moneyYuanToCent(invoiceAmount.value)
              }
            ],
            requestType: 1
          }).then(() => {
            loading(false)
            ElMessage.success('申请成功')
            router.back()
          }).catch(() => {
            loading(false)
          })
        }
      })
    }
    return {
      query,
      rules,
      formRef,
      formData,
      invoiceAmount,
      onSaveBtnClick
    }
  }
})
</script>

<style scoped lang="scss">
.cell {
  display: flex;
  justify-content: flex-start;
  .label {
    width: 120px;
  }
  & + .cell {
    margin-top: 15px;
  }
}
.el-form-item {
  :deep(.el-textarea__inner) {
    height: 40px;
  }
}
</style>
