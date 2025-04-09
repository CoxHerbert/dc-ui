import { resolveComponent as y, createElementBlock as i, openBlock as u, createVNode as z, createBlock as A, createCommentVNode as p, mergeProps as c, withCtx as $, renderSlot as k, computed as S, Fragment as B, unref as C, toDisplayString as d, normalizeProps as P, normalizeStyle as I, normalizeClass as D } from "vue";
const M = (t, n) => {
  const e = t.__vccOpts || t;
  for (const [r, l] of n)
    e[r] = l;
  return e;
}, N = {
  name: "MyTable",
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: null
    }
  },
  emits: ["update:pagination"],
  methods: {
    handlePageChange(t) {
      this.$emit("update:pagination", {
        ...this.pagination,
        currentPage: t
      });
    }
  }
};
function T(t, n, e, r, l, o) {
  const a = y("el-table"), s = y("el-pagination");
  return u(), i("div", null, [
    z(a, c({ data: e.tableData }, t.$attrs), {
      default: $(() => [
        k(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["data"]),
    e.pagination ? (u(), A(s, {
      key: 0,
      total: e.pagination.total,
      "current-page": e.pagination.currentPage,
      "page-size": e.pagination.pageSize,
      onCurrentChange: o.handlePageChange
    }, null, 8, ["total", "current-page", "page-size", "onCurrentChange"])) : p("", !0)
  ]);
}
const O = /* @__PURE__ */ M(N, [["render", T]]), j = {
  __name: "MyButton",
  props: {
    type: {
      type: String,
      default: "primary"
    }
  },
  setup(t) {
    return (n, e) => {
      const r = y("el-button");
      return u(), A(r, c(n.$attrs, {
        type: t.type,
        class: "my-button"
      }), {
        default: $(() => [
          k(n.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["type"]);
    };
  }
}, V = /* @__PURE__ */ M(j, [["__scopeId", "data-v-87bcc8fa"]]), h = (t, n = 1) => {
  if (typeof t != "string" || !t) return;
  t = t.trim().replace(/^#/, ""), t.length === 3 && (t = t.split("").map((o) => o + o).join(""));
  const e = parseInt(t.substring(0, 2), 16), r = parseInt(t.substring(2, 4), 16), l = parseInt(t.substring(4, 6), 16);
  return `rgba(${e}, ${r}, ${l}, ${n})`;
}, w = {
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
    const n = t, e = S(() => {
      const r = (l, o) => {
        for (const a of l) {
          if (a.value == o || a.label == o)
            return a;
          if (a.children && Array.isArray(a.children)) {
            const s = r(a.children, o);
            if (s) return s;
          }
        }
        return null;
      };
      return Array.isArray(n.options) ? r(n.options, n.value) || {
        value: n.value,
        label: n.value,
        textColor: "#666",
        bgColor: "#ebeef5"
      } : {
        value: n.value,
        label: n.value,
        textColor: "#666",
        bgColor: "#ebeef5"
      };
    });
    return (r, l) => {
      var o, a, s, g, f, m, b, v, _;
      return u(), i(B, null, [
        t.type === "tag" ? (u(), i("span", c({ key: 0 }, r.$attrs, {
          style: {
            background: ((o = e.value) == null ? void 0 : o.bgColor) || C(h)((a = e.value) == null ? void 0 : a.remark, 0.1),
            color: ((s = e.value) == null ? void 0 : s.textColor) || C(h)((g = e.value) == null ? void 0 : g.remark, 1)
          },
          class: "dict"
        }), d(((f = e.value) == null ? void 0 : f.label) || t.value || "-"), 17)) : p("", !0),
        t.type === "text" ? (u(), i("span", P(c({ key: 1 }, r.$attrs)), d(((m = e.value) == null ? void 0 : m.label) || "-"), 17)) : p("", !0),
        t.type === "tag" && ((b = e.value) != null && b.listClass) ? (u(), i("span", c({ key: 2 }, r.$attrs, {
          class: ["dict", (v = e.value) == null ? void 0 : v.listClass]
        }), d(((_ = e.value) == null ? void 0 : _.label) || "-"), 17)) : p("", !0)
      ], 64);
    };
  }
}, E = {
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
    const n = t, e = S(() => {
      const r = (l, o) => {
        for (const a of l) {
          if (a.dictKey === o)
            return a;
          if (a.children && Array.isArray(a.children)) {
            const s = r(a.children, o);
            if (s) return s;
          }
        }
        return null;
      };
      return Array.isArray(n.options) && n.options.length && r(n.options, n.value) || n.value;
    });
    return (r, l) => {
      var o, a;
      return u(), i("span", {
        class: D(["dict", (o = e.value) == null ? void 0 : o.listClass]),
        style: I({ color: t.color })
      }, d(((a = e.value) == null ? void 0 : a.label) || "-"), 7);
    };
  }
}, K = {
  install(t) {
    t.component("MyTable", O), t.component("MyButton", V), t.component("dc-dict", w), t.component("dc-dict-key", E);
  }
};
export {
  K as default
};
