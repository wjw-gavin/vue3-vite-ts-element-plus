import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/system/user'
import type { IUser } from '@/api/system/modal/userModel'

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser>({
    name: '',
    sex: '',
    mobile: ''
  })

  const getUser = async () => {
    const data = await getUserInfo()
    updateUser(data)
  }

  const updateUser = (payload: IUser) => {
    Object.assign(user.value, payload)
  }

  return {
    user,
    getUser,
    updateUser
  }
})
