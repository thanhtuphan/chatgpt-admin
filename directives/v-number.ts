import { DirectiveFunction, DirectiveOptions } from 'vue/types/umd'

let input: HTMLInputElement | null = null
const eventHandler = (event: Event) => {
  const target = event.target as HTMLInputElement

  target.value = target?.value.replace(/[^0-9]/g, '').replace(/^0(\d+)/g, '$1')
}

const defineDirective: DirectiveOptions | DirectiveFunction | undefined = {
  inserted(el) {
    input = el.querySelector('input, textarea') as HTMLInputElement

    if (!input) return

    input.addEventListener('input', eventHandler, true)
  },

  unbind() {
    if (!input) return

    input.removeEventListener('input', eventHandler, true)
  },
}

export default defineDirective
