import { resolveComponent as y, createElementBlock as u, openBlock as c, createVNode as z, createBlock as h, createCommentVNode as p, mergeProps as A, withCtx as k, renderSlot as S, Fragment as I, normalizeStyle as $, unref as l, toDisplayString as d, normalizeClass as M } from "vue";
const B = (t, n) => {
  const e = t.__vccOpts || t;
  for (const [o, s] of n)
    e[o] = s;
  return e;
}, P = {
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
function D(t, n, e, o, s, a) {
  const r = y("el-table"), i = y("el-pagination");
  return c(), u("div", null, [
    z(r, A({ data: e.tableData }, t.$attrs), {
      default: k(() => [
        S(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["data"]),
    e.pagination ? (c(), h(i, {
      key: 0,
      total: e.pagination.total,
      "current-page": e.pagination.currentPage,
      "page-size": e.pagination.pageSize,
      onCurrentChange: a.handlePageChange
    }, null, 8, ["total", "current-page", "page-size", "onCurrentChange"])) : p("", !0)
  ]);
}
const N = /* @__PURE__ */ B(P, [["render", D]]), T = {
  __name: "MyButton",
  props: {
    type: {
      type: String,
      default: "primary"
    }
  },
  setup(t) {
    return (n, e) => {
      const o = y("el-button");
      return c(), h(o, A(n.$attrs, {
        type: t.type,
        class: "my-button"
      }), {
        default: k(() => [
          S(n.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["type"]);
    };
  }
}, O = /* @__PURE__ */ B(T, [["__scopeId", "data-v-87bcc8fa"]]), v = (t, n = 1) => {
  if (typeof t != "string" || !t) return;
  t = t.trim().replace(/^#/, ""), t.length === 3 && (t = t.split("").map((a) => a + a).join(""));
  const e = parseInt(t.substring(0, 2), 16), o = parseInt(t.substring(2, 4), 16), s = parseInt(t.substring(4, 6), 16);
  return `rgba(${e}, ${o}, ${s}, ${n})`;
}, j = { key: 1 }, V = {
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
    const n = t, e = computed(() => {
      const o = (s, a) => {
        for (const r of s) {
          if (r.value == a || r.label == a)
            return r;
          if (r.children && Array.isArray(r.children)) {
            const i = o(r.children, a);
            if (i) return i;
          }
        }
        return null;
      };
      return Array.isArray(n.options) ? o(n.options, n.value) || {
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
    return (o, s) => {
      var a, r, i, g, f, m, b, _, C;
      return c(), u(I, null, [
        t.type === "tag" ? (c(), u("span", {
          key: 0,
          style: $({
            background: ((a = l(e)) == null ? void 0 : a.bgColor) || l(v)((r = l(e)) == null ? void 0 : r.remark, 0.1),
            color: ((i = l(e)) == null ? void 0 : i.textColor) || l(v)((g = l(e)) == null ? void 0 : g.remark, 1)
          }),
          class: "dict"
        }, d(((f = l(e)) == null ? void 0 : f.label) || t.value || "-"), 5)) : p("", !0),
        t.type === "text" ? (c(), u("span", j, d(((m = l(e)) == null ? void 0 : m.label) || "-"), 1)) : p("", !0),
        t.type === "tag" && ((b = l(e)) != null && b.listClass) ? (c(), u("span", {
          key: 2,
          class: M(["dict", (_ = l(e)) == null ? void 0 : _.listClass])
        }, d(((C = l(e)) == null ? void 0 : C.label) || "-"), 3)) : p("", !0)
      ], 64);
    };
  }
}, w = {
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
    const n = t, e = computed(() => {
      const o = (s, a) => {
        for (const r of s) {
          if (r.dictKey === a)
            return r;
          if (r.children && Array.isArray(r.children)) {
            const i = o(r.children, a);
            if (i) return i;
          }
        }
        return null;
      };
      return Array.isArray(n.options) && n.options.length && o(n.options, n.value) || n.value;
    });
    return (o, s) => {
      var a, r;
      return c(), u("span", {
        class: M(["dict", (a = l(e)) == null ? void 0 : a.listClass]),
        style: $({ color: t.color })
      }, d(((r = l(e)) == null ? void 0 : r.label) || "-"), 7);
    };
  }
}, E = {
  install(t) {
    t.component("MyTable", N), t.component("MyButton", O), t.component("dc-dict", V), t.component("dc-dict-key", w);
  }
};
export {
  E as default
};
