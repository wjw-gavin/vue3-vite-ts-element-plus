import { unref } from 'vue'
import type { Ref } from 'vue'
import { ElLoading } from 'element-plus'
import type { LoadingOptions } from 'element-plus'

interface IOptionsType extends LoadingOptions {
  immediate?: true
}

const defaultOptions = {
  lock: true,
  text: '加载中...',
  immediate: true
}

export function useLoading(options?: IOptionsType) {
  let loadingInstance: ReturnType<typeof ElLoading.service>
  const _options = { ...defaultOptions, ...options }

  const loading = (showLoading: boolean | Ref<boolean> = true) => {
    if (unref(showLoading)) {
      loadingInstance = ElLoading.service(_options)
    } else {
      loadingInstance.close()
    }
  }

  if (_options.immediate) {
    loading(true)
  }

  return loading
}
