<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, truthProp } from '@/utils'

defineOptions({
  name: 'SvgIcon'
})

const props = defineProps({
  name: truthProp,
  color: makeStringProp('#303133'),
  prefix: makeStringProp('icon')
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style lang="scss">
.svg-icon {
  height: 1em;
  width: 1em;
}
</style>
