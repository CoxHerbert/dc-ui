import { resolveComponent as o, createElementBlock as m, openBlock as r, createVNode as f, createBlock as c, createCommentVNode as y, mergeProps as i, withCtx as s, renderSlot as p } from "vue";
const u = (t, a) => {
  const e = t.__vccOpts || t;
  for (const [n, l] of a)
    e[n] = l;
  return e;
}, h = {
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
function b(t, a, e, n, l, d) {
  const g = o("el-table"), _ = o("el-pagination");
  return r(), m("div", null, [
    f(g, i({ data: e.tableData }, t.$attrs), {
      default: s(() => [
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
    }, null, 8, ["total", "current-page", "page-size", "onCurrentChange"])) : y("", !0)
  ]);
}
const C = /* @__PURE__ */ u(h, [["render", b]]), k = {
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
        default: s(() => [
          p(a.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["type"]);
    };
  }
}, v = /* @__PURE__ */ u(k, [["__scopeId", "data-v-87bcc8fa"]]), B = [C, v], P = {
  install(t) {
    B.forEach((a) => {
      t.component(a.name, a);
    });
  }
};
export {
  P as default
};
