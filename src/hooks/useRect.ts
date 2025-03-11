import type { Ref } from 'vue'
import { unref } from 'vue'

/**
 * 判断传入值是否为window对象
 * @param val 待检测的值
 * @returns 是否为window对象
 */
const isWindow = (val: unknown) => val === window

/**
 * 创建一个DOMRect对象
 * @param width 宽度
 * @param height 高度
 * @returns 包含位置和尺寸信息的DOMRect类似对象
 */
function makeDOMRect(width: number, height: number) {
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height
  }
}

/**
 * 获取元素的大小及其相对于视口的位置
 * 
 * 可用于获取元素的尺寸和位置信息，支持DOM元素、Window对象或其ref引用
 * 
 * @param elementOrRef 目标元素、Window对象或其ref引用
 * @returns DOMRect对象，包含元素的位置和尺寸信息
 * 
 * @example
 * // 直接传入DOM元素
 * const rect = useRect(document.querySelector('.my-element'))
 * 
 * // 传入ref
 * const elementRef = ref<HTMLElement>()
 * const rect = useRect(elementRef)
 * console.log(rect.width, rect.height, rect.top, rect.left)
 */
export function useRect(elementOrRef: Element | Window | Ref<Element | Window>) {
  // 解包ref获取实际元素
  const element = unref(elementOrRef)

  // 处理window对象
  if (isWindow(element)) {
    const { innerWidth, innerHeight } = element as Window
    return makeDOMRect(innerWidth, innerHeight)
  }

  // 处理DOM元素
  if ((element as Element).getBoundingClientRect) {
    return (element as Element).getBoundingClientRect()
  }

  // 处理无效元素
  return makeDOMRect(0, 0)
}
