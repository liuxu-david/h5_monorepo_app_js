export const isObject = (data) => {
    return Object.prototype.toString.call(data) === '[object Object]';
};
// JSON深拷贝(处理不了Date实例, RegExp实例, 存在循环引用的数据)
export const deepCloneJSON = (data) => JSON.parse(JSON.stringify(data));