import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { getSearchConfig } from '@/api/common'
import type { ISearchItem } from '@/types'

export const useSearchStore = defineStore('search', () => {
  const searchList = ref<ISearchItem[]>([])

  const getSearchList = async () => {
    searchList.value = await getSearchConfig('role')
  }

  onMounted(getSearchList)

  return {
    searchList
  }
})
