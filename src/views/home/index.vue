<template>
  <div class="bg-white rd h-75">
    <div class="flex items-center h-full">
      <div class="w-28 h-28 ml-10 rd-99 overflow-hidden">
        <img class="w-full" :src="user.avatar || avatar" alt="" />
      </div>
      <div class="pr-5 pl-10">
        <h2 class="text-5 font-bold m0">
          你好，<span>{{ user.name }}</span>
        </h2>
        <p class="c-#787f95 pt-4 m0">登录日期：{{ currentTime }}</p>
        <p class="c-#787f95 pt-4 m0">{{ soulWord }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { random } from 'lodash-es'
import dayjs from 'dayjs'
import { useUserStore } from '@/stores'
import soulSoother from '@/assets/typings/home'
import avatar from '@/icons/avatar.svg'

// 首页心灵鸡汤
const word = soulSoother[random(0, soulSoother.length - 1)]
const soulWord = ref(word)
const currentTime = ref(dayjs().format('YYYY-MM-DD'))

const userStore = useUserStore()
const user = computed(() => userStore.user)
</script>
@/stores/modules/user
