import { resolveComponent as o, createElementBlock as m, openBlock as r, createVNode as y, createBlock as c, createCommentVNode as f, mergeProps as i, withCtx as u, renderSlot as p } from "vue";
const s = (t, a) => {
  const e = t.__vccOpts || t;
  for (const [n, l] of a)
    e[n] = l;
  return e;
}, b = {
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
function h(t, a, e, n, l, d) {
  const g = o("el-table"), _ = o("el-pagination");
  return r(), m("div", null, [
    y(g, i({ data: e.tableData }, t.$attrs), {
      default: u(() => [
        p(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["data"]),
    e.pagination ? (r(), c(_, {
      key: 0,
      total: e.pagination.total,
      "current-page": e.pagination.currentPage,
      "page-size": e.pagination.pageSize,
      onCurrentChange: d.handlePageChange
    }, null, 8, ["total", "current-page", "page-size", "onCurrentChange"])) : f("", !0)
  ]);
}
const C = /* @__PURE__ */ s(b, [["render", h]]), M = {
  __name: "MyButton",
  props: {
    type: {
      type: String,
      default: "primary"
    }
  },
  setup(t) {
    return (a, e) => {
      const n = o("el-button");
      return r(), c(n, i(a.$attrs, {
        type: t.type,
        class: "my-button"
      }), {
        default: u(() => [
          p(a.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["type"]);
    };
  }
}, B = /* @__PURE__ */ s(M, [["__scopeId", "data-v-87bcc8fa"]]), v = {
  install(t) {
    t.component("MyTable", C), t.component("MyButton", B);
  }
};
export {
  v as default
};
