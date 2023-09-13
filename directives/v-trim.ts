import { DirectiveFunction, DirectiveOptions } from 'vue/types/umd'

let input: HTMLInputElement | null = null
const eventHandler = (event: Event) => {
  const target = event.target as HTMLInputElement

  target.value = target?.value?.trim() ?? ''
}

const defineDirective: DirectiveOptions | DirectiveFunction | undefined = {
  inserted(el) {
    input = el.querySelector('input, textarea') as HTMLInputElement

    if (!input) return

    input.addEventListener('blur', eventHandler, true)
  },

  unbind() {
    if (!input) return

    input.removeEventListener('blur', eventHandler, true)
  },
}

export default defineDirective
