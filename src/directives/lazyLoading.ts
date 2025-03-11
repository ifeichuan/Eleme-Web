import type { App, DirectiveBinding } from 'vue'

/**
 * 创建懒加载指令
 * @param observer IntersectionObserver实例，用于监听元素是否进入视口
 * @returns Vue自定义指令对象
 */
const vLazy = (observer: IntersectionObserver) => {
  return {
    // 在绑定元素的父组件被挂载之前调用
    beforeMount: (el: HTMLImageElement, binding: DirectiveBinding) => {
      // 添加懒加载样式类
      el.classList.add('op-lazyload')
      const { value } = binding
      // 将真实图片地址存储在dataset中
      el.dataset.origin = value
      // 开始观察元素
      observer.observe(el)
    }
  }
}

/**
 * Vue插件对象，用于注册懒加载指令
 */
const lazyPlugin = {
  install(app: App) {
    // 创建IntersectionObserver实例
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((item) => {
          // 当元素进入视口时
          if (item.isIntersecting) {
            // 获取目标元素
            const el = item.target as HTMLImageElement
            // 将dataset中存储的真实图片地址设置到src属性
            el.src = el.dataset.origin as string
            // 移除懒加载样式类
            el.classList.remove('op-lazyload')
            // 停止观察该元素
            observer.unobserve(el)
          }
        })
      },
      {
        // 配置项：当目标元素的可见性超过视口底部100px时触发回调
        rootMargin: '0px 0px -100px 0px'
      }
    )

    // 注册全局自定义指令 v-lazy
    app.directive('lazy', vLazy(observer))
  }
}

export default lazyPlugin
