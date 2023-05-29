import type { App, DirectiveBinding } from 'vue'

// 自动获取焦点
function focusDirective(app: App) {
  app.directive('focus', {
    mounted(el: HTMLElement) {
      el.focus()
    }
  })
}

/**
 *
 * @description 限制输入小数点后几位
 * v-limit 默认为 2 位
 * v-limit="limit" 只能输入小数点后 limit 位
 * limit 绝对值要大于 0
 */
function inputLimitDirective(app: App) {
  app.directive('limit', {
    mounted(el: HTMLInputElement, binding: DirectiveBinding, vnode: any) {
      if (binding.value === 0) {
        console.error('limit 绝对值必须大于0')
      }

      const limit = Math.abs(binding.value) || 2

      let input = <HTMLInputElement | null>null
      if (el.nodeName === 'INPUT') {
        input = el
      } else {
        input = el.querySelector('input')
      }

      input!.addEventListener('input', (e: Event) => {
        let value = (e.target as HTMLInputElement).value
        const reg = new RegExp(`^\\d*(\\.?\\d{0,${limit}})`, 'g')
        value = value.match(reg)![0] || ''
        if (vnode.dirs.length > 0) {
          vnode.dirs[0].instance.$emit('update:modelValue', value)
        }
      })
    }
  })
}

export function directives(app: App) {
  // 注册指令
  focusDirective(app), inputLimitDirective(app)
}
