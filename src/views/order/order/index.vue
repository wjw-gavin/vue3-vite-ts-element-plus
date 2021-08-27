<template>
  <div class="time-range-page">
    <nf-table-page :store-model-name="storeModelName" :show-table-operation="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const storeModelName = ref('orderModule')

    return {
      storeModelName
    }
  }
})
</script>
