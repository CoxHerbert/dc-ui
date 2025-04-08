const o = {
  api: null
}, i = (l, a) => {
  a ? (o.api = a.api, l.config.globalProperties.$globalData = o, console.log(l, a)) : console.warn("[init] 初始化缺少 options.api 参数！");
};
export {
  i as default
};
