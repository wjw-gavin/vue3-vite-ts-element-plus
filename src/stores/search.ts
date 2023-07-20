import { ref } from 'vue'
import { defineStore } from 'pinia'
import searchConfig from '@/assets/enum/search'
import { getSearchConfig } from '@/api/common'
import type { ISearchItem } from '@/types'

export const useSearchStore = defineStore('search', () => {
  const searchReady = ref(false) // 列表依赖搜索项，等搜索项获取完成后再获取列表
  const searchList = ref<ISearchItem[]>([])

  const getSearchList = async () => {
    searchReady.value = false
    const searchId = searchConfig[location.pathname]
    if (!searchId) {
      searchReady.value = true
    } else {
      searchList.value = await getSearchConfig(searchId)
      searchReady.value = true
    }
  }

  return {
    searchList,
    searchReady,
    getSearchList
  }
})
