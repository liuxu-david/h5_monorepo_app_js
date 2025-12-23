import { deepCloneJSON, isObject } from './tools/index';

// 将回调执行的方法都田间到window上,供原生调用
export const updateAppCallbacks = (cbMap) => {
    Object.assign(appCallbacks.value, cbMap);
    // 添加到window对象的appCallbacks属性上(使用单独的appCallbacks字段管理H5与APP的通信方法，减少window对象的属性占用)
    const appCbValue = appCallbacks.value;
    if (!('appCallbacks' in window)) {
        window.appCallbacks = appCbValue;
        return;
    }
    Object.assign(window.appCallbacks, appCbValue);
};
// h5调用原生(通知原生事件)
export const callAppMethods = async (podata) => {
    const osName = uni.getSystemInfoSync()?.osName;
    console.log("🚀 ~ callAppMethods ~ :", osName)
    switch (osName) {
        case 'android':
            window?.injectedObject?.vueToAndroid(JSON.stringify(podata));
            break;
        case 'ios':
            window?.webkit?.messageHandlers?.vueToIos?.postMessage(JSON.stringify(podata));
            break;
        default:
            break;
    }
};
// 原生调用h5都会执行这里,通过window上挂载的方法,进行对应的回调调用
// android调用js（传入参数回调（控制触发的函数）的情况下，是返回整个传入的对象）
export const androidToVue = (podata) => {
    console.log('androidToVue', podata);
    // 根据android返回的podata中的fnctype，在window对象上找到对应回调函数
    const { fnctype, data } = podata;
    // callbackJson的方式可对同一个页面的不同地方调用同一个接口进行区分
    const { callbackJson } = data;
    let json;
    if (isObject(callbackJson) && Object.keys(callbackJson).length) {
        json = callbackJson;
    } else if (typeof callbackJson === 'string' && callbackJson) {
        json = JSON.parse(callbackJson);
    } else {
        json = { data: {} };
    }
    const { data: dataInJson } = json;
    const { _fnctype } = dataInJson;
    const cbName = _fnctype || fnctype;
    // window对象不存在appCallbacks属性，说明未添加App回调方法到window对象上
    if (!('appCallbacks' in window)) return;
    const cb = window.appCallbacks[cbName];
    // 确认是函数，调用
    typeof cb === 'function' && cb(podata);
};
// ios调用js （传入参数回调（控制触发的函数）的情况下，是传入data内的对象）
export const iosToVue = (podata) => {
    console.log('iosToVue格式化处理前', JSON.parse(JSON.stringify(podata)));
    podata = iosPodataToAndroidPodata(podata);
    console.log('iosToVue格式化处理后', podata);
    // 根据ios返回的podata中的fnctype，在window对象上找到对应回调函数
    const { fnctype, data } = podata;
    // callbackJson的方式可对同一个页面的不同地方调用同一个接口进行区分
    const { callbackJson } = data;
    console.log('callbackJson', callbackJson);
    let json;
    if (isObject(callbackJson) && Object.keys(callbackJson).length) {
        console.log(1);
        json = { fnctype, data: callbackJson };
    } else if (typeof callbackJson === 'string' && callbackJson) {
        console.log(2);
        json = JSON.parse(callbackJson);
    } else {
        console.log(3);
        json = { data: {} };
    }
    const { data: dataInJson } = json;
    const { _fnctype } = dataInJson;
    const cbName = _fnctype || fnctype;
    // window对象不存在appCallbacks属性，说明未添加App回调方法到window对象上
    if (!('appCallbacks' in window)) return;
    const cb = window.appCallbacks[cbName];
    // 确认是函数，调用
    typeof cb === 'function' && cb(podata);
};
const iosPodataToAndroidPodata = (podata) => {
    const { fnctype, data } = podata;
    const { callbackJson } = data;
    const newPodata = deepCloneJSON(podata);
    if (isObject(callbackJson) && Object.keys(callbackJson).length) {
        newPodata.data.callbackJson = JSON.stringify({ fnctype, data: callbackJson });
    } else if (isObject(newPodata.data)) {
        newPodata.data.callbackJson = '';
    }
    return newPodata;
};
