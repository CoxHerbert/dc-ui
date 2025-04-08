const o = {
  install(l, t) {
    const e = document.createElement("div");
    e.innerText = "DcUi 插件已加载", e.style.position = "fixed", e.style.top = "0", e.style.left = "0", e.style.zIndex = 99999, e.style.background = "yellow", document.body.appendChild(e), console.log(t), l.config.globalProperties.$myLibraryConfig = t.config;
  }
};
export {
  o as default
};
