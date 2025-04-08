const l = {
  api: null
}, o = (i, a) => {
  a ? (l.api = a.api, i.config.globalProperties.$globalData = l) : console.warn("[init] 初始化缺少 options.api 参数！");
};
export {
  o as default
};
