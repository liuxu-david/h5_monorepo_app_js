import { defineStore } from 'pinia';
import { reactive } from 'vue';

// 系统(/设备)信息全局管理
export const useSystemInfoStore = defineStore('system', () => {
  // 根据需要用到的属性创建systemInfo对象
  const systemInfo = reactive({
    windowHeight: 1000,
    windowWidth: 375,
    screenHeight: 1000,
    screenWidth: 375,
    osName: 'android',
  });
  const getOsNameByUserAgent = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera || '';
    const uaLowerCased = userAgent.toLowerCase();
    // 以下判断顺序不可变更
    if (uaLowerCased.includes('android')) return 'android';
    if (['iphone', 'ipad', 'mac os'].some((item) => uaLowerCased.includes(item))) return 'ios';
    if (uaLowerCased.includes('linux')) return 'linux';
    if (['x64', 'x86'].some((item) => uaLowerCased.includes(item))) return 'windows';
    return 'other';
  };

  // 更新systemInfo
  const updateSystemInfo = async () => {
    const newSystemInfo = await uni.getSystemInfo();
    // 只获取需要用到的属性
    for (let key in systemInfo) {
      systemInfo[key] = newSystemInfo[key];
    }
    // 如果因兼容性问题找不到osName字段，使用userAgent
    if (!('osName' in newSystemInfo)) {
      systemInfo.osName = getOsNameByUserAgent();
    }
  };
  return { systemInfo, updateSystemInfo };
});
