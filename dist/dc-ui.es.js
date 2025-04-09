import { computed as _, createElementBlock as i, openBlock as u, Fragment as $, createCommentVNode as p, mergeProps as d, unref as f, toDisplayString as c, normalizeProps as S, normalizeStyle as h, normalizeClass as D, inject as I } from "vue";
const k = (t, e = 1) => {
  if (typeof t != "string" || !t) return;
  t = t.trim().replace(/^#/, ""), t.length === 3 && (t = t.split("").map((n) => n + n).join(""));
  const l = parseInt(t.substring(0, 2), 16), o = parseInt(t.substring(2, 4), 16), a = parseInt(t.substring(4, 6), 16);
  return `rgba(${l}, ${o}, ${a}, ${e})`;
}, z = {
  __name: "index",
  props: {
    // 类型
    type: {
      type: String,
      default: "tag"
    },
    // 数据
    options: {
      type: Array,
      default: null
    },
    // 当前的值
    value: [Number, String, Array]
  },
  setup(t) {
    const e = t, l = _(() => {
      const o = (a, n) => {
        for (const r of a) {
          if (r.value == n || r.label == n)
            return r;
          if (r.children && Array.isArray(r.children)) {
            const s = o(r.children, n);
            if (s) return s;
          }
        }
        return null;
      };
      return Array.isArray(e.options) ? o(e.options, e.value) || {
        value: e.value,
        label: e.value,
        textColor: "#666",
        bgColor: "#ebeef5"
      } : {
        value: e.value,
        label: e.value,
        textColor: "#666",
        bgColor: "#ebeef5"
      };
    });
    return (o, a) => {
      var n, r, s, g, b, m, v, C, A;
      return u(), i($, null, [
        t.type === "tag" ? (u(), i("span", d({ key: 0 }, o.$attrs, {
          style: {
            background: ((n = l.value) == null ? void 0 : n.bgColor) || f(k)((r = l.value) == null ? void 0 : r.remark, 0.1),
            color: ((s = l.value) == null ? void 0 : s.textColor) || f(k)((g = l.value) == null ? void 0 : g.remark, 1)
          },
          class: "dict"
        }), c(((b = l.value) == null ? void 0 : b.label) || t.value || "-"), 17)) : p("", !0),
        t.type === "text" ? (u(), i("span", S(d({ key: 1 }, o.$attrs)), c(((m = l.value) == null ? void 0 : m.label) || "-"), 17)) : p("", !0),
        t.type === "tag" && ((v = l.value) != null && v.listClass) ? (u(), i("span", d({ key: 2 }, o.$attrs, {
          class: ["dict", (C = l.value) == null ? void 0 : C.listClass]
        }), c(((A = l.value) == null ? void 0 : A.label) || "-"), 17)) : p("", !0)
      ], 64);
    };
  }
}, N = {
  __name: "index",
  props: {
    // 类型
    type: {
      type: String,
      default: ""
    },
    // 数据
    options: {
      type: Array,
      default: null
    },
    // 当前的值
    value: [Number, String, Array],
    color: {
      type: String,
      default: null
    }
  },
  setup(t) {
    const e = t, l = _(() => {
      const o = (a, n) => {
        for (const r of a) {
          if (r.dictKey === n)
            return r;
          if (r.children && Array.isArray(r.children)) {
            const s = o(r.children, n);
            if (s) return s;
          }
        }
        return null;
      };
      return Array.isArray(e.options) && e.options.length && o(e.options, e.value) || e.value;
    });
    return (o, a) => {
      var n, r;
      return u(), i("span", {
        class: D(["dict", (n = l.value) == null ? void 0 : n.listClass]),
        style: h({ color: t.color })
      }, c(((r = l.value) == null ? void 0 : r.label) || "-"), 7);
    };
  }
}, j = { style: { display: "inline-block" } }, B = {
  __name: "index",
  setup(t) {
    const e = I("globalConfig");
    return console.log(e, "globalConfig"), (l, o) => (u(), i("div", j, c(f(e)), 1));
  }
};
let y = {};
const G = (t) => {
  y.cacheData = t == null ? void 0 : t.cacheData, console.log("setGlobalConfig:", y, "config:", t);
}, w = {
  install(t, e) {
    t.provide("globalConfig", y), t.component("dc-dict", z), t.component("dc-dict-key", N), t.component("dc-view", B), G(e);
  }
};
export {
  w as default
};
