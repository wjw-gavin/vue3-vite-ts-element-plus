<template>
  <div class="h-75 rd bg-white">
    <div class="h-full flex items-center">
      <div class="ml-10 h-28 w-28 overflow-hidden rd-99">
        <img class="w-full" :src="user.avatar || avatar" alt="">
      </div>
      <div class="pl-10 pr-5">
        <h2 class="m0 text-5 font-bold">
          你好，<span>{{ user.name }}</span>
        </h2>
        <p class="m0 pt-4 c-#787f95">登录日期：{{ currentTime }}</p>
        <p class="m0 pt-4 c-#787f95">{{ soulWord }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import { random } from 'lodash-es'
import soulSoother from '@/assets/typings/home'
import { useUserStore } from '@/stores'
import avatar from '@/icons/avatar.svg'

// 首页心灵鸡汤
const word = soulSoother[random(0, soulSoother.length - 1)]
const soulWord = ref(word)
const currentTime = ref(dayjs().format('YYYY-MM-DD'))

const userStore = useUserStore()
const user = computed(() => userStore.user)
</script>
