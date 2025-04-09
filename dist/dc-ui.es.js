import { computed as w, createElementBlock as E, openBlock as O, Fragment as ot, createCommentVNode as A, mergeProps as D, unref as $, toDisplayString as N, normalizeProps as it, normalizeStyle as st, normalizeClass as at, inject as ct, watch as L, effectScope as ut, reactive as B, toRefs as lt } from "vue";
const M = (e, t = 1) => {
  if (typeof e != "string" || !e) return;
  e = e.trim().replace(/^#/, ""), e.length === 3 && (e = e.split("").map((s) => s + s).join(""));
  const n = parseInt(e.substring(0, 2), 16), r = parseInt(e.substring(2, 4), 16), o = parseInt(e.substring(4, 6), 16);
  return `rgba(${n}, ${r}, ${o}, ${t})`;
}, ft = {
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
  setup(e) {
    const t = e, n = w(() => {
      const r = (o, s) => {
        for (const i of o) {
          if (i.value == s || i.label == s)
            return i;
          if (i.children && Array.isArray(i.children)) {
            const a = r(i.children, s);
            if (a) return a;
          }
        }
        return null;
      };
      return Array.isArray(t.options) ? r(t.options, t.value) || {
        value: t.value,
        label: t.value,
        textColor: "#666",
        bgColor: "#ebeef5"
      } : {
        value: t.value,
        label: t.value,
        textColor: "#666",
        bgColor: "#ebeef5"
      };
    });
    return (r, o) => {
      var s, i, a, c, f, u, l, p, d;
      return O(), E(ot, null, [
        e.type === "tag" ? (O(), E("span", D({ key: 0 }, r.$attrs, {
          style: {
            background: ((s = n.value) == null ? void 0 : s.bgColor) || $(M)((i = n.value) == null ? void 0 : i.remark, 0.1),
            color: ((a = n.value) == null ? void 0 : a.textColor) || $(M)((c = n.value) == null ? void 0 : c.remark, 1)
          },
          class: "dict"
        }), N(((f = n.value) == null ? void 0 : f.label) || e.value || "-"), 17)) : A("", !0),
        e.type === "text" ? (O(), E("span", it(D({ key: 1 }, r.$attrs)), N(((u = n.value) == null ? void 0 : u.label) || "-"), 17)) : A("", !0),
        e.type === "tag" && ((l = n.value) != null && l.listClass) ? (O(), E("span", D({ key: 2 }, r.$attrs, {
          class: ["dict", (p = n.value) == null ? void 0 : p.listClass]
        }), N(((d = n.value) == null ? void 0 : d.label) || "-"), 17)) : A("", !0)
      ], 64);
    };
  }
}, dt = {
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
  setup(e) {
    const t = e, n = w(() => {
      const r = (o, s) => {
        for (const i of o) {
          if (i.dictKey === s)
            return i;
          if (i.children && Array.isArray(i.children)) {
            const a = r(i.children, s);
            if (a) return a;
          }
        }
        return null;
      };
      return Array.isArray(t.options) && t.options.length && r(t.options, t.value) || t.value;
    });
    return (r, o) => {
      var s, i;
      return O(), E("span", {
        class: at(["dict", (s = n.value) == null ? void 0 : s.listClass]),
        style: st({ color: e.color })
      }, N(((i = n.value) == null ? void 0 : i.label) || "-"), 7);
    };
  }
};
function pt() {
  return K().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function K() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const ht = typeof Proxy == "function", vt = "devtools-plugin:setup", gt = "plugin:settings:set";
let y, I;
function mt() {
  var e;
  return y !== void 0 || (typeof window < "u" && window.performance ? (y = !0, I = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (y = !0, I = globalThis.perf_hooks.performance) : y = !1), y;
}
function _t() {
  return mt() ? I.now() : Date.now();
}
class yt {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const r = {};
    if (t.settings)
      for (const i in t.settings) {
        const a = t.settings[i];
        r[i] = a.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let s = Object.assign({}, r);
    try {
      const i = localStorage.getItem(o), a = JSON.parse(i);
      Object.assign(s, a);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return s;
      },
      setSettings(i) {
        try {
          localStorage.setItem(o, JSON.stringify(i));
        } catch {
        }
        s = i;
      },
      now() {
        return _t();
      }
    }, n && n.on(gt, (i, a) => {
      i === this.plugin.id && this.fallbacks.setSettings(a);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, a) => this.target ? this.target.on[a] : (...c) => {
        this.onQueue.push({
          method: a,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, a) => this.target ? this.target[a] : a === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(a) ? (...c) => (this.targetQueue.push({
        method: a,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[a](...c)) : (...c) => new Promise((f) => {
        this.targetQueue.push({
          method: a,
          args: c,
          resolve: f
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function bt(e, t) {
  const n = e, r = K(), o = pt(), s = ht && n.enableEarlyProxy;
  if (o && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s))
    o.emit(vt, e, t);
  else {
    const i = s ? new yt(n, o) : null;
    (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: i
    }), i && t(i.proxiedTarget);
  }
}
/*!
 * vuex v4.1.0
 * (c) 2022 Evan You
 * @license MIT
 */
var Q = "store";
function F(e) {
  return e === void 0 && (e = null), ct(e !== null ? e : Q);
}
function m(e, t) {
  Object.keys(e).forEach(function(n) {
    return t(e[n], n);
  });
}
function Et(e) {
  return e !== null && typeof e == "object";
}
function Ot(e) {
  return e && typeof e.then == "function";
}
function v(e, t) {
  if (!e)
    throw new Error("[vuex] " + t);
}
function Nt(e, t) {
  return function() {
    return e(t);
  };
}
function z(e, t, n) {
  return t.indexOf(e) < 0 && (n && n.prepend ? t.unshift(e) : t.push(e)), function() {
    var r = t.indexOf(e);
    r > -1 && t.splice(r, 1);
  };
}
function J(e, t) {
  e._actions = /* @__PURE__ */ Object.create(null), e._mutations = /* @__PURE__ */ Object.create(null), e._wrappedGetters = /* @__PURE__ */ Object.create(null), e._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  var n = e.state;
  C(e, n, [], e._modules.root, !0), V(e, n, t);
}
function V(e, t, n) {
  var r = e._state, o = e._scope;
  e.getters = {}, e._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var s = e._wrappedGetters, i = {}, a = {}, c = ut(!0);
  c.run(function() {
    m(s, function(f, u) {
      i[u] = Nt(f, e), a[u] = w(function() {
        return i[u]();
      }), Object.defineProperty(e.getters, u, {
        get: function() {
          return a[u].value;
        },
        enumerable: !0
        // for local getters
      });
    });
  }), e._state = B({
    data: t
  }), e._scope = c, e.strict && Dt(e), r && n && e._withCommit(function() {
    r.data = null;
  }), o && o.stop();
}
function C(e, t, n, r, o) {
  var s = !n.length, i = e._modules.getNamespace(n);
  if (r.namespaced && (e._modulesNamespaceMap[i] && process.env.NODE_ENV !== "production" && console.error("[vuex] duplicate namespace " + i + " for the namespaced module " + n.join("/")), e._modulesNamespaceMap[i] = r), !s && !o) {
    var a = G(t, n.slice(0, -1)), c = n[n.length - 1];
    e._withCommit(function() {
      process.env.NODE_ENV !== "production" && c in a && console.warn(
        '[vuex] state field "' + c + '" was overridden by a module with the same name at "' + n.join(".") + '"'
      ), a[c] = r.state;
    });
  }
  var f = r.context = St(e, i, n);
  r.forEachMutation(function(u, l) {
    var p = i + l;
    wt(e, p, u, f);
  }), r.forEachAction(function(u, l) {
    var p = u.root ? l : i + l, d = u.handler || u;
    Ct(e, p, d, f);
  }), r.forEachGetter(function(u, l) {
    var p = i + l;
    At(e, p, u, f);
  }), r.forEachChild(function(u, l) {
    C(e, t, n.concat(l), u, o);
  });
}
function St(e, t, n) {
  var r = t === "", o = {
    dispatch: r ? e.dispatch : function(s, i, a) {
      var c = S(s, i, a), f = c.payload, u = c.options, l = c.type;
      if ((!u || !u.root) && (l = t + l, process.env.NODE_ENV !== "production" && !e._actions[l])) {
        console.error("[vuex] unknown local action type: " + c.type + ", global type: " + l);
        return;
      }
      return e.dispatch(l, f);
    },
    commit: r ? e.commit : function(s, i, a) {
      var c = S(s, i, a), f = c.payload, u = c.options, l = c.type;
      if ((!u || !u.root) && (l = t + l, process.env.NODE_ENV !== "production" && !e._mutations[l])) {
        console.error("[vuex] unknown local mutation type: " + c.type + ", global type: " + l);
        return;
      }
      e.commit(l, f, u);
    }
  };
  return Object.defineProperties(o, {
    getters: {
      get: r ? function() {
        return e.getters;
      } : function() {
        return W(e, t);
      }
    },
    state: {
      get: function() {
        return G(e.state, n);
      }
    }
  }), o;
}
function W(e, t) {
  if (!e._makeLocalGettersCache[t]) {
    var n = {}, r = t.length;
    Object.keys(e.getters).forEach(function(o) {
      if (o.slice(0, r) === t) {
        var s = o.slice(r);
        Object.defineProperty(n, s, {
          get: function() {
            return e.getters[o];
          },
          enumerable: !0
        });
      }
    }), e._makeLocalGettersCache[t] = n;
  }
  return e._makeLocalGettersCache[t];
}
function wt(e, t, n, r) {
  var o = e._mutations[t] || (e._mutations[t] = []);
  o.push(function(i) {
    n.call(e, r.state, i);
  });
}
function Ct(e, t, n, r) {
  var o = e._actions[t] || (e._actions[t] = []);
  o.push(function(i) {
    var a = n.call(e, {
      dispatch: r.dispatch,
      commit: r.commit,
      getters: r.getters,
      state: r.state,
      rootGetters: e.getters,
      rootState: e.state
    }, i);
    return Ot(a) || (a = Promise.resolve(a)), e._devtoolHook ? a.catch(function(c) {
      throw e._devtoolHook.emit("vuex:error", c), c;
    }) : a;
  });
}
function At(e, t, n, r) {
  if (e._wrappedGetters[t]) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] duplicate getter key: " + t);
    return;
  }
  e._wrappedGetters[t] = function(s) {
    return n(
      r.state,
      // local state
      r.getters,
      // local getters
      s.state,
      // root state
      s.getters
      // root getters
    );
  };
}
function Dt(e) {
  L(function() {
    return e._state.data;
  }, function() {
    process.env.NODE_ENV !== "production" && v(e._committing, "do not mutate vuex store state outside mutation handlers.");
  }, { deep: !0, flush: "sync" });
}
function G(e, t) {
  return t.reduce(function(n, r) {
    return n[r];
  }, e);
}
function S(e, t, n) {
  return Et(e) && e.type && (n = t, t = e, e = e.type), process.env.NODE_ENV !== "production" && v(typeof e == "string", "expects string as the type, but found " + typeof e + "."), { type: e, payload: t, options: n };
}
var xt = "vuex bindings", k = "vuex:mutations", x = "vuex:actions", b = "vuex", jt = 0;
function It(e, t) {
  bt(
    {
      id: "org.vuejs.vuex",
      app: e,
      label: "Vuex",
      homepage: "https://next.vuex.vuejs.org/",
      logo: "https://vuejs.org/images/icons/favicon-96x96.png",
      packageName: "vuex",
      componentStateTypes: [xt]
    },
    function(n) {
      n.addTimelineLayer({
        id: k,
        label: "Vuex Mutations",
        color: R
      }), n.addTimelineLayer({
        id: x,
        label: "Vuex Actions",
        color: R
      }), n.addInspector({
        id: b,
        label: "Vuex",
        icon: "storage",
        treeFilterPlaceholder: "Filter stores..."
      }), n.on.getInspectorTree(function(r) {
        if (r.app === e && r.inspectorId === b)
          if (r.filter) {
            var o = [];
            Z(o, t._modules.root, r.filter, ""), r.rootNodes = o;
          } else
            r.rootNodes = [
              X(t._modules.root, "")
            ];
      }), n.on.getInspectorState(function(r) {
        if (r.app === e && r.inspectorId === b) {
          var o = r.nodeId;
          W(t, o), r.state = Vt(
            Pt(t._modules, o),
            o === "root" ? t.getters : t._makeLocalGettersCache,
            o
          );
        }
      }), n.on.editInspectorState(function(r) {
        if (r.app === e && r.inspectorId === b) {
          var o = r.nodeId, s = r.path;
          o !== "root" && (s = o.split("/").filter(Boolean).concat(s)), t._withCommit(function() {
            r.set(t._state.data, s, r.state.value);
          });
        }
      }), t.subscribe(function(r, o) {
        var s = {};
        r.payload && (s.payload = r.payload), s.state = o, n.notifyComponentUpdate(), n.sendInspectorTree(b), n.sendInspectorState(b), n.addTimelineEvent({
          layerId: k,
          event: {
            time: Date.now(),
            title: r.type,
            data: s
          }
        });
      }), t.subscribeAction({
        before: function(r, o) {
          var s = {};
          r.payload && (s.payload = r.payload), r._id = jt++, r._time = Date.now(), s.state = o, n.addTimelineEvent({
            layerId: x,
            event: {
              time: r._time,
              title: r.type,
              groupId: r._id,
              subtitle: "start",
              data: s
            }
          });
        },
        after: function(r, o) {
          var s = {}, i = Date.now() - r._time;
          s.duration = {
            _custom: {
              type: "duration",
              display: i + "ms",
              tooltip: "Action duration",
              value: i
            }
          }, r.payload && (s.payload = r.payload), s.state = o, n.addTimelineEvent({
            layerId: x,
            event: {
              time: Date.now(),
              title: r.type,
              groupId: r._id,
              subtitle: "end",
              data: s
            }
          });
        }
      });
    }
  );
}
var R = 8702998, Tt = 6710886, Lt = 16777215, Y = {
  label: "namespaced",
  textColor: Lt,
  backgroundColor: Tt
};
function q(e) {
  return e && e !== "root" ? e.split("/").slice(-2, -1)[0] : "Root";
}
function X(e, t) {
  return {
    id: t || "root",
    // all modules end with a `/`, we want the last segment only
    // cart/ -> cart
    // nested/cart/ -> cart
    label: q(t),
    tags: e.namespaced ? [Y] : [],
    children: Object.keys(e._children).map(
      function(n) {
        return X(
          e._children[n],
          t + n + "/"
        );
      }
    )
  };
}
function Z(e, t, n, r) {
  r.includes(n) && e.push({
    id: r || "root",
    label: r.endsWith("/") ? r.slice(0, r.length - 1) : r || "Root",
    tags: t.namespaced ? [Y] : []
  }), Object.keys(t._children).forEach(function(o) {
    Z(e, t._children[o], n, r + o + "/");
  });
}
function Vt(e, t, n) {
  t = n === "root" ? t : t[n];
  var r = Object.keys(t), o = {
    state: Object.keys(e.state).map(function(i) {
      return {
        key: i,
        editable: !0,
        value: e.state[i]
      };
    })
  };
  if (r.length) {
    var s = Gt(t);
    o.getters = Object.keys(s).map(function(i) {
      return {
        key: i.endsWith("/") ? q(i) : i,
        editable: !1,
        value: T(function() {
          return s[i];
        })
      };
    });
  }
  return o;
}
function Gt(e) {
  var t = {};
  return Object.keys(e).forEach(function(n) {
    var r = n.split("/");
    if (r.length > 1) {
      var o = t, s = r.pop();
      r.forEach(function(i) {
        o[i] || (o[i] = {
          _custom: {
            value: {},
            display: i,
            tooltip: "Module",
            abstract: !0
          }
        }), o = o[i]._custom.value;
      }), o[s] = T(function() {
        return e[n];
      });
    } else
      t[n] = T(function() {
        return e[n];
      });
  }), t;
}
function Pt(e, t) {
  var n = t.split("/").filter(function(r) {
    return r;
  });
  return n.reduce(
    function(r, o, s) {
      var i = r[o];
      if (!i)
        throw new Error('Missing module "' + o + '" for path "' + t + '".');
      return s === n.length - 1 ? i : i._children;
    },
    t === "root" ? e : e.root._children
  );
}
function T(e) {
  try {
    return e();
  } catch (t) {
    return t;
  }
}
var g = function(t, n) {
  this.runtime = n, this._children = /* @__PURE__ */ Object.create(null), this._rawModule = t;
  var r = t.state;
  this.state = (typeof r == "function" ? r() : r) || {};
}, tt = { namespaced: { configurable: !0 } };
tt.namespaced.get = function() {
  return !!this._rawModule.namespaced;
};
g.prototype.addChild = function(t, n) {
  this._children[t] = n;
};
g.prototype.removeChild = function(t) {
  delete this._children[t];
};
g.prototype.getChild = function(t) {
  return this._children[t];
};
g.prototype.hasChild = function(t) {
  return t in this._children;
};
g.prototype.update = function(t) {
  this._rawModule.namespaced = t.namespaced, t.actions && (this._rawModule.actions = t.actions), t.mutations && (this._rawModule.mutations = t.mutations), t.getters && (this._rawModule.getters = t.getters);
};
g.prototype.forEachChild = function(t) {
  m(this._children, t);
};
g.prototype.forEachGetter = function(t) {
  this._rawModule.getters && m(this._rawModule.getters, t);
};
g.prototype.forEachAction = function(t) {
  this._rawModule.actions && m(this._rawModule.actions, t);
};
g.prototype.forEachMutation = function(t) {
  this._rawModule.mutations && m(this._rawModule.mutations, t);
};
Object.defineProperties(g.prototype, tt);
var _ = function(t) {
  this.register([], t, !1);
};
_.prototype.get = function(t) {
  return t.reduce(function(n, r) {
    return n.getChild(r);
  }, this.root);
};
_.prototype.getNamespace = function(t) {
  var n = this.root;
  return t.reduce(function(r, o) {
    return n = n.getChild(o), r + (n.namespaced ? o + "/" : "");
  }, "");
};
_.prototype.update = function(t) {
  et([], this.root, t);
};
_.prototype.register = function(t, n, r) {
  var o = this;
  r === void 0 && (r = !0), process.env.NODE_ENV !== "production" && rt(t, n);
  var s = new g(n, r);
  if (t.length === 0)
    this.root = s;
  else {
    var i = this.get(t.slice(0, -1));
    i.addChild(t[t.length - 1], s);
  }
  n.modules && m(n.modules, function(a, c) {
    o.register(t.concat(c), a, r);
  });
};
_.prototype.unregister = function(t) {
  var n = this.get(t.slice(0, -1)), r = t[t.length - 1], o = n.getChild(r);
  if (!o) {
    process.env.NODE_ENV !== "production" && console.warn(
      "[vuex] trying to unregister module '" + r + "', which is not registered"
    );
    return;
  }
  o.runtime && n.removeChild(r);
};
_.prototype.isRegistered = function(t) {
  var n = this.get(t.slice(0, -1)), r = t[t.length - 1];
  return n ? n.hasChild(r) : !1;
};
function et(e, t, n) {
  if (process.env.NODE_ENV !== "production" && rt(e, n), t.update(n), n.modules)
    for (var r in n.modules) {
      if (!t.getChild(r)) {
        process.env.NODE_ENV !== "production" && console.warn(
          "[vuex] trying to add a new module '" + r + "' on hot reloading, manual reload is needed"
        );
        return;
      }
      et(
        e.concat(r),
        t.getChild(r),
        n.modules[r]
      );
    }
}
var U = {
  assert: function(e) {
    return typeof e == "function";
  },
  expected: "function"
}, $t = {
  assert: function(e) {
    return typeof e == "function" || typeof e == "object" && typeof e.handler == "function";
  },
  expected: 'function or object with "handler" function'
}, H = {
  getters: U,
  mutations: U,
  actions: $t
};
function rt(e, t) {
  Object.keys(H).forEach(function(n) {
    if (t[n]) {
      var r = H[n];
      m(t[n], function(o, s) {
        v(
          r.assert(o),
          Mt(e, n, s, o, r.expected)
        );
      });
    }
  });
}
function Mt(e, t, n, r, o) {
  var s = t + " should be " + o + ' but "' + t + "." + n + '"';
  return e.length > 0 && (s += ' in module "' + e.join(".") + '"'), s += " is " + JSON.stringify(r) + ".", s;
}
var h = function e(t) {
  var n = this;
  t === void 0 && (t = {}), process.env.NODE_ENV !== "production" && (v(typeof Promise < "u", "vuex requires a Promise polyfill in this browser."), v(this instanceof e, "store must be called with the new operator."));
  var r = t.plugins;
  r === void 0 && (r = []);
  var o = t.strict;
  o === void 0 && (o = !1);
  var s = t.devtools;
  this._committing = !1, this._actions = /* @__PURE__ */ Object.create(null), this._actionSubscribers = [], this._mutations = /* @__PURE__ */ Object.create(null), this._wrappedGetters = /* @__PURE__ */ Object.create(null), this._modules = new _(t), this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null), this._subscribers = [], this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null), this._scope = null, this._devtools = s;
  var i = this, a = this, c = a.dispatch, f = a.commit;
  this.dispatch = function(p, d) {
    return c.call(i, p, d);
  }, this.commit = function(p, d, nt) {
    return f.call(i, p, d, nt);
  }, this.strict = o;
  var u = this._modules.root.state;
  C(this, u, [], this._modules.root), V(this, u), r.forEach(function(l) {
    return l(n);
  });
}, P = { state: { configurable: !0 } };
h.prototype.install = function(t, n) {
  t.provide(n || Q, this), t.config.globalProperties.$store = this;
  var r = this._devtools !== void 0 ? this._devtools : process.env.NODE_ENV !== "production" || !1;
  r && It(t, this);
};
P.state.get = function() {
  return this._state.data;
};
P.state.set = function(e) {
  process.env.NODE_ENV !== "production" && v(!1, "use store.replaceState() to explicit replace store state.");
};
h.prototype.commit = function(t, n, r) {
  var o = this, s = S(t, n, r), i = s.type, a = s.payload, c = s.options, f = { type: i, payload: a }, u = this._mutations[i];
  if (!u) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] unknown mutation type: " + i);
    return;
  }
  this._withCommit(function() {
    u.forEach(function(p) {
      p(a);
    });
  }), this._subscribers.slice().forEach(function(l) {
    return l(f, o.state);
  }), process.env.NODE_ENV !== "production" && c && c.silent && console.warn(
    "[vuex] mutation type: " + i + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
  );
};
h.prototype.dispatch = function(t, n) {
  var r = this, o = S(t, n), s = o.type, i = o.payload, a = { type: s, payload: i }, c = this._actions[s];
  if (!c) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] unknown action type: " + s);
    return;
  }
  try {
    this._actionSubscribers.slice().filter(function(u) {
      return u.before;
    }).forEach(function(u) {
      return u.before(a, r.state);
    });
  } catch (u) {
    process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in before action subscribers: "), console.error(u));
  }
  var f = c.length > 1 ? Promise.all(c.map(function(u) {
    return u(i);
  })) : c[0](i);
  return new Promise(function(u, l) {
    f.then(function(p) {
      try {
        r._actionSubscribers.filter(function(d) {
          return d.after;
        }).forEach(function(d) {
          return d.after(a, r.state);
        });
      } catch (d) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in after action subscribers: "), console.error(d));
      }
      u(p);
    }, function(p) {
      try {
        r._actionSubscribers.filter(function(d) {
          return d.error;
        }).forEach(function(d) {
          return d.error(a, r.state, p);
        });
      } catch (d) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in error action subscribers: "), console.error(d));
      }
      l(p);
    });
  });
};
h.prototype.subscribe = function(t, n) {
  return z(t, this._subscribers, n);
};
h.prototype.subscribeAction = function(t, n) {
  var r = typeof t == "function" ? { before: t } : t;
  return z(r, this._actionSubscribers, n);
};
h.prototype.watch = function(t, n, r) {
  var o = this;
  return process.env.NODE_ENV !== "production" && v(typeof t == "function", "store.watch only accepts a function."), L(function() {
    return t(o.state, o.getters);
  }, n, Object.assign({}, r));
};
h.prototype.replaceState = function(t) {
  var n = this;
  this._withCommit(function() {
    n._state.data = t;
  });
};
h.prototype.registerModule = function(t, n, r) {
  r === void 0 && (r = {}), typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && (v(Array.isArray(t), "module path must be a string or an Array."), v(t.length > 0, "cannot register the root module by using registerModule.")), this._modules.register(t, n), C(this, this.state, t, this._modules.get(t), r.preserveState), V(this, this.state);
};
h.prototype.unregisterModule = function(t) {
  var n = this;
  typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && v(Array.isArray(t), "module path must be a string or an Array."), this._modules.unregister(t), this._withCommit(function() {
    var r = G(n.state, t.slice(0, -1));
    delete r[t[t.length - 1]];
  }), J(this);
};
h.prototype.hasModule = function(t) {
  return typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && v(Array.isArray(t), "module path must be a string or an Array."), this._modules.isRegistered(t);
};
h.prototype.hotUpdate = function(t) {
  this._modules.update(t), J(this, !0);
};
h.prototype._withCommit = function(t) {
  var n = this._committing;
  this._committing = !0, t(), this._committing = n;
};
Object.defineProperties(h.prototype, P);
const kt = { style: { display: "inline-block" } }, Rt = {
  __name: "index",
  props: {
    // 需要展示的类名 比如用户 user
    objectName: {
      type: String,
      default: null
    },
    // 绑定的值
    modelValue: {
      type: [String, Number],
      default: null
    },
    // 显示的键名
    showLabel: {
      type: String,
      default: null
    }
  },
  setup(e) {
    const t = F();
    console.log(t);
    const n = e, r = B({
      // 输入框数据
      iptTagData: [],
      // 当前对象
      currentObject: null
    }), { iptTagData: o, currentObject: s } = lt(r);
    L(
      () => n.modelValue,
      async (a, c) => {
        try {
          s.value = cacheData[n.objectName];
          let f;
          if (Array.isArray(a))
            f = a.map((l) => (l == null ? void 0 : l.id) || l);
          else if (typeof a == "object" && a !== null)
            try {
              f = [a == null ? void 0 : a.id];
            } catch {
              f = "";
            }
          else typeof a == "string" ? f = a.split(",") : typeof a == "number" ? f = [String(a)] : f = "";
          if (!f || Array.isArray(f) && f.length === 0) return;
          await ComponentApi.cache.getView({
            url: s.value.url,
            data: f
          });
          const u = t.getters.globalData[s.value.url];
          r.iptTagData = f.map((l) => u[l] || l);
        } catch (f) {
          return console.error(f), `Error: ${f.message}`;
        }
      },
      { deep: !0, immediate: !0 }
    );
    const i = w(() => Array.isArray(o.value) && o.value.length ? o.value.map((a) => {
      var f, u;
      let c = a.id;
      if ((f = s.value) != null && f.defaultLabel || n != null && n.showLabel)
        try {
          c = a[((u = s.value) == null ? void 0 : u.defaultLabel) || (n == null ? void 0 : n.showLabel)];
        } catch {
          c = a.id;
        }
      return c;
    }).join("，") : "-");
    return (a, c) => (O(), E("div", kt, N(i.value || n.modelValue || "-"), 1));
  }
}, Ut = F();
let j = {};
const Ht = (e) => {
  j = { ...j, ...e }, Ut.dispatch("setCacheData", e == null ? void 0 : e.cacheData), console.log("setGlobalConfig:", j, "config:", e);
}, Kt = {
  install(e, t) {
    e.component("dc-dict", ft), e.component("dc-dict-key", dt), e.component("dc-view", Rt), Ht(t);
  }
};
export {
  Kt as default
};
