<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content">
        <div class="userInfo">
          <div class="userImg">
            <img src="@/assets/imgs/default-avatar.png" alt="" />
          </div>
          <div class="userRight">
            <h2 class="name">
              你好，<span>{{ userInfo.userName }}</span>
            </h2>
            <p class="loginTime">登录日期：{{ currentTime }}</p>
            <p class="userWord">{{ soulWord }}</p>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { random } from 'lodash-es'
import dayjs from 'dayjs'
import soulSoother from '@/assets/typings/home'
export default defineComponent({
  setup() {
    // 首页心灵鸡汤
    const word = soulSoother[random(0, soulSoother.length - 1)]
    const soulWord = ref(word)
    const currentTime = ref(dayjs().format('YYYY-MM-DD'))

    const store = useStore()

    return {
      soulWord,
      currentTime,
      userInfo: computed(() => store.state.user.userInfo)
    }
  }
})
</script>

<style scoped lang="scss">
.grid-content {
  background-color: #fff;
  border-radius: 4px;
  height: 295px;

  .loginTime {
    color: #787f95;
    padding-top: 12px;
  }
}

.userInfo {
  display: flex;
  align-items: center;
  height: 100%;

  .userImg {
    width: 120px;
    min-width: 100px;
    height: 120px;
    border-radius: 50%;
    margin-left: 40px;
    vertical-align: middle;

    img {
      width: 100%;
    }
  }
}

.userRight {
  padding: 0 20px 0 40px;

  .name {
    font-size: 20px;
    font-weight: bold;
  }

  h2 {
    font-size: 22px;
    color: #121c40;
    margin: 0;
    border: 0;
    font-weight: 400;
  }

  .userWord {
    font-size: 14px;
    color: #787f95;
    margin-top: 15px;
    line-height: 1.4;
  }
}
</style>
