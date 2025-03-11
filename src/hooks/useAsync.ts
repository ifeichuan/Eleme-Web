import { ref, type UnwrapRef } from 'vue';

/**
 * 异步操作的状态管理Hook
 * @param asyncFunc 异步函数
 * @param initValue 初始值
 * @param immediate 是否立即执行
 * @returns 返回异步操作的状态、数据和控制方法
 */
export function useAsync<T>(asyncFunc: () => Promise<T>, initValue: T, immediate: boolean = true) {
  // 加载状态
  const pedding = ref(false);
  // 异步操作的返回数据
  const data = ref(initValue);
  // 错误信息
  const error = ref(null);

  /**
   * 执行异步操作
   * @returns Promise
   */
  const excute = function () {
    // 设置加载状态
    pedding.value = true;
    // 清空错误信息
    error.value = null;

    return asyncFunc()
      .then((res) => {
        // 更新数据
        data.value = res as UnwrapRef<T>;
        // 关闭加载状态
        pedding.value = false;
      })
      .catch((rej) => {
        // 保存错误信息
        error.value = rej;
        // 关闭加载状态
        pedding.value = false;
      });
  };

  // 如果需要立即执行
  if (immediate) {
    excute();
  }

  // 返回状态和控制方法
  return {
    pedding,  // 加载状态
    data,     // 异步数据
    error,    // 错误信息
    excute,   // 执行方法
  };
}
