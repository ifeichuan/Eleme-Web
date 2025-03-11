import type { Ref } from 'vue'
import { ref, onMounted } from 'vue'

/**
 * 可滚动元素类型
 * 可以是HTMLElement或Window对象
 */
type ScrollElement = HTMLElement | Window

// 默认根元素为window
const defaultRoot = window
// 匹配可滚动的CSS overflow属性值的正则表达式
const overflowScrollReg = /scroll|auto|overlay/i

/**
 * 判断节点是否为元素节点
 * 排除HTML和BODY标签，确保是普通元素节点
 * @param node 待检测的元素
 * @returns 是否为有效的元素节点
 */
function isElement(node: Element) {
  const ELEMENT_NODE_TYPE = 1
  return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE
}

/**
 * 获取元素的可滚动父元素
 * 沿着DOM树向上查找，直到找到第一个具有可滚动特性的父元素
 * @param el 起始元素
 * @param root 查找的根元素限制，默认为window
 * @returns 找到的第一个可滚动父元素，如果没找到则返回root
 */
function getScrollElement(el: Element, root: ScrollElement) {
  let node = el
  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node)
    if (overflowScrollReg.test(overflowY)) {
      return node as HTMLElement
    }
    node = node.parentNode as Element
  }
  return root
}

/**
 * 获取元素可滚动父元素的Hook
 *
 * 用于查找元素最近的可滚动父容器，常用于滚动监听、虚拟列表等场景
 *
 * @param el 目标元素的ref引用
 * @param root 查找的根元素限制，默认为window
 * @returns 可滚动父元素的ref引用
 *
 * @example
 * const elementRef = ref<HTMLElement>()
 * const scrollParent = useScrollParent(elementRef)
 *
 * // 在onMounted后可以访问
 * onMounted(() => {
 *   console.log(scrollParent.value) // 可滚动的父元素
 * })
 */
export function useScrollParent(el: Ref<Element>, root: ScrollElement = defaultRoot) {
  // 创建响应式引用存储可滚动父元素
  const scrollParent = ref<ScrollElement>()

  // 在组件挂载后查找可滚动父元素
  onMounted(() => {
    if (el.value) {
      scrollParent.value = getScrollElement(el.value, root)
    }
  })

  return scrollParent
}
