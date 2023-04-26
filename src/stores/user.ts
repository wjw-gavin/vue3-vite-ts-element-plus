import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/user'
import type { IUser } from '@/api/user/model/userModel'

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser>({
    name: '',
    phone: '',
    company: ''
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
