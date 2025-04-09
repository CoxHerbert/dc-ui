import nt from "element-plus";
import { getCurrentInstance as ot, computed as T, createElementBlock as E, openBlock as O, Fragment as it, createCommentVNode as C, normalizeStyle as U, unref as G, toDisplayString as N, normalizeClass as H, effectScope as st, reactive as ct, watch as K, createApp as at } from "vue";
const ut = { key: 1 }, lt = {
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
    const { proxy: t } = ot(), n = e, r = T(() => {
      const o = (s, i) => {
        for (const c of s) {
          if (c.value == i || c.label == i)
            return c;
          if (c.children && Array.isArray(c.children)) {
            const a = o(c.children, i);
            if (a) return a;
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
      var i, c, a, f, u, l, p, d, w;
      return O(), E(it, null, [
        e.type === "tag" ? (O(), E("span", {
          key: 0,
          style: U({
            background: ((i = r.value) == null ? void 0 : i.bgColor) || G(t).hexToRgba((c = r.value) == null ? void 0 : c.remark, 0.1),
            color: ((a = r.value) == null ? void 0 : a.textColor) || G(t).hexToRgba((f = r.value) == null ? void 0 : f.remark, 1)
          }),
          class: "dict"
        }, N(((u = r.value) == null ? void 0 : u.label) || e.value || "-"), 5)) : C("", !0),
        e.type === "text" ? (O(), E("span", ut, N(((l = r.value) == null ? void 0 : l.label) || "-"), 1)) : C("", !0),
        e.type === "tag" && ((p = r.value) != null && p.listClass) ? (O(), E("span", {
          key: 2,
          class: H(["dict", (d = r.value) == null ? void 0 : d.listClass])
        }, N(((w = r.value) == null ? void 0 : w.label) || "-"), 3)) : C("", !0)
      ], 64);
    };
  }
}, ft = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
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
    const t = e, n = T(() => {
      const r = (o, s) => {
        for (const i of o) {
          if (i.dictKey === s)
            return i;
          if (i.children && Array.isArray(i.children)) {
            const c = r(i.children, s);
            if (c) return c;
          }
        }
        return null;
      };
      return Array.isArray(t.options) && t.options.length && r(t.options, t.value) || t.value;
    });
    return (r, o) => {
      var s, i;
      return O(), E("span", {
        class: H(["dict", (s = n.value) == null ? void 0 : s.listClass]),
        style: U({ color: e.color })
      }, N(((i = n.value) == null ? void 0 : i.label) || "-"), 7);
    };
  }
}, pt = /* @__PURE__ */ ft(dt, [["__scopeId", "data-v-80d913c5"]]), B = {
  dcDict: lt,
  dcDictKey: pt
};
function ht() {
  return Q().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Q() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const vt = typeof Proxy == "function", mt = "devtools-plugin:setup", gt = "plugin:settings:set";
let y, D;
function _t() {
  var e;
  return y !== void 0 || (typeof window < "u" && window.performance ? (y = !0, D = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (y = !0, D = globalThis.perf_hooks.performance) : y = !1), y;
}
function yt() {
  return _t() ? D.now() : Date.now();
}
class bt {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const r = {};
    if (t.settings)
      for (const i in t.settings) {
        const c = t.settings[i];
        r[i] = c.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let s = Object.assign({}, r);
    try {
      const i = localStorage.getItem(o), c = JSON.parse(i);
      Object.assign(s, c);
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
        return yt();
      }
    }, n && n.on(gt, (i, c) => {
      i === this.plugin.id && this.fallbacks.setSettings(c);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, c) => this.target ? this.target.on[c] : (...a) => {
        this.onQueue.push({
          method: c,
          args: a
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, c) => this.target ? this.target[c] : c === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(c) ? (...a) => (this.targetQueue.push({
        method: c,
        args: a,
        resolve: () => {
        }
      }), this.fallbacks[c](...a)) : (...a) => new Promise((f) => {
        this.targetQueue.push({
          method: c,
          args: a,
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
function Et(e, t) {
  const n = e, r = Q(), o = ht(), s = vt && n.enableEarlyProxy;
  if (o && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s))
    o.emit(mt, e, t);
  else {
    const i = s ? new bt(n, o) : null;
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
var Ot = "store";
function g(e, t) {
  Object.keys(e).forEach(function(n) {
    return t(e[n], n);
  });
}
function wt(e) {
  return e !== null && typeof e == "object";
}
function Nt(e) {
  return e && typeof e.then == "function";
}
function v(e, t) {
  if (!e)
    throw new Error("[vuex] " + t);
}
function St(e, t) {
  return function() {
    return e(t);
  };
}
function F(e, t, n) {
  return t.indexOf(e) < 0 && (n && n.prepend ? t.unshift(e) : t.push(e)), function() {
    var r = t.indexOf(e);
    r > -1 && t.splice(r, 1);
  };
}
function J(e, t) {
  e._actions = /* @__PURE__ */ Object.create(null), e._mutations = /* @__PURE__ */ Object.create(null), e._wrappedGetters = /* @__PURE__ */ Object.create(null), e._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  var n = e.state;
  x(e, n, [], e._modules.root, !0), j(e, n, t);
}
function j(e, t, n) {
  var r = e._state, o = e._scope;
  e.getters = {}, e._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var s = e._wrappedGetters, i = {}, c = {}, a = st(!0);
  a.run(function() {
    g(s, function(f, u) {
      i[u] = St(f, e), c[u] = T(function() {
        return i[u]();
      }), Object.defineProperty(e.getters, u, {
        get: function() {
          return c[u].value;
        },
        enumerable: !0
        // for local getters
      });
    });
  }), e._state = ct({
    data: t
  }), e._scope = a, e.strict && It(e), r && n && e._withCommit(function() {
    r.data = null;
  }), o && o.stop();
}
function x(e, t, n, r, o) {
  var s = !n.length, i = e._modules.getNamespace(n);
  if (r.namespaced && (e._modulesNamespaceMap[i] && process.env.NODE_ENV !== "production" && console.error("[vuex] duplicate namespace " + i + " for the namespaced module " + n.join("/")), e._modulesNamespaceMap[i] = r), !s && !o) {
    var c = V(t, n.slice(0, -1)), a = n[n.length - 1];
    e._withCommit(function() {
      process.env.NODE_ENV !== "production" && a in c && console.warn(
        '[vuex] state field "' + a + '" was overridden by a module with the same name at "' + n.join(".") + '"'
      ), c[a] = r.state;
    });
  }
  var f = r.context = xt(e, i, n);
  r.forEachMutation(function(u, l) {
    var p = i + l;
    Ct(e, p, u, f);
  }), r.forEachAction(function(u, l) {
    var p = u.root ? l : i + l, d = u.handler || u;
    At(e, p, d, f);
  }), r.forEachGetter(function(u, l) {
    var p = i + l;
    Dt(e, p, u, f);
  }), r.forEachChild(function(u, l) {
    x(e, t, n.concat(l), u, o);
  });
}
function xt(e, t, n) {
  var r = t === "", o = {
    dispatch: r ? e.dispatch : function(s, i, c) {
      var a = S(s, i, c), f = a.payload, u = a.options, l = a.type;
      if ((!u || !u.root) && (l = t + l, process.env.NODE_ENV !== "production" && !e._actions[l])) {
        console.error("[vuex] unknown local action type: " + a.type + ", global type: " + l);
        return;
      }
      return e.dispatch(l, f);
    },
    commit: r ? e.commit : function(s, i, c) {
      var a = S(s, i, c), f = a.payload, u = a.options, l = a.type;
      if ((!u || !u.root) && (l = t + l, process.env.NODE_ENV !== "production" && !e._mutations[l])) {
        console.error("[vuex] unknown local mutation type: " + a.type + ", global type: " + l);
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
        return V(e.state, n);
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
function Ct(e, t, n, r) {
  var o = e._mutations[t] || (e._mutations[t] = []);
  o.push(function(i) {
    n.call(e, r.state, i);
  });
}
function At(e, t, n, r) {
  var o = e._actions[t] || (e._actions[t] = []);
  o.push(function(i) {
    var c = n.call(e, {
      dispatch: r.dispatch,
      commit: r.commit,
      getters: r.getters,
      state: r.state,
      rootGetters: e.getters,
      rootState: e.state
    }, i);
    return Nt(c) || (c = Promise.resolve(c)), e._devtoolHook ? c.catch(function(a) {
      throw e._devtoolHook.emit("vuex:error", a), a;
    }) : c;
  });
}
function Dt(e, t, n, r) {
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
function It(e) {
  K(function() {
    return e._state.data;
  }, function() {
    process.env.NODE_ENV !== "production" && v(e._committing, "do not mutate vuex store state outside mutation handlers.");
  }, { deep: !0, flush: "sync" });
}
function V(e, t) {
  return t.reduce(function(n, r) {
    return n[r];
  }, e);
}
function S(e, t, n) {
  return wt(e) && e.type && (n = t, t = e, e = e.type), process.env.NODE_ENV !== "production" && v(typeof e == "string", "expects string as the type, but found " + typeof e + "."), { type: e, payload: t, options: n };
}
var Tt = "vuex bindings", M = "vuex:mutations", A = "vuex:actions", b = "vuex", jt = 0;
function Vt(e, t) {
  Et(
    {
      id: "org.vuejs.vuex",
      app: e,
      label: "Vuex",
      homepage: "https://next.vuex.vuejs.org/",
      logo: "https://vuejs.org/images/icons/favicon-96x96.png",
      packageName: "vuex",
      componentStateTypes: [Tt]
    },
    function(n) {
      n.addTimelineLayer({
        id: M,
        label: "Vuex Mutations",
        color: k
      }), n.addTimelineLayer({
        id: A,
        label: "Vuex Actions",
        color: k
      }), n.addInspector({
        id: b,
        label: "Vuex",
        icon: "storage",
        treeFilterPlaceholder: "Filter stores..."
      }), n.on.getInspectorTree(function(r) {
        if (r.app === e && r.inspectorId === b)
          if (r.filter) {
            var o = [];
            X(o, t._modules.root, r.filter, ""), r.rootNodes = o;
          } else
            r.rootNodes = [
              q(t._modules.root, "")
            ];
      }), n.on.getInspectorState(function(r) {
        if (r.app === e && r.inspectorId === b) {
          var o = r.nodeId;
          W(t, o), r.state = Gt(
            kt(t._modules, o),
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
          layerId: M,
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
            layerId: A,
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
            layerId: A,
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
var k = 8702998, Lt = 6710886, Pt = 16777215, z = {
  label: "namespaced",
  textColor: Pt,
  backgroundColor: Lt
};
function Y(e) {
  return e && e !== "root" ? e.split("/").slice(-2, -1)[0] : "Root";
}
function q(e, t) {
  return {
    id: t || "root",
    // all modules end with a `/`, we want the last segment only
    // cart/ -> cart
    // nested/cart/ -> cart
    label: Y(t),
    tags: e.namespaced ? [z] : [],
    children: Object.keys(e._children).map(
      function(n) {
        return q(
          e._children[n],
          t + n + "/"
        );
      }
    )
  };
}
function X(e, t, n, r) {
  r.includes(n) && e.push({
    id: r || "root",
    label: r.endsWith("/") ? r.slice(0, r.length - 1) : r || "Root",
    tags: t.namespaced ? [z] : []
  }), Object.keys(t._children).forEach(function(o) {
    X(e, t._children[o], n, r + o + "/");
  });
}
function Gt(e, t, n) {
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
    var s = Mt(t);
    o.getters = Object.keys(s).map(function(i) {
      return {
        key: i.endsWith("/") ? Y(i) : i,
        editable: !1,
        value: I(function() {
          return s[i];
        })
      };
    });
  }
  return o;
}
function Mt(e) {
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
      }), o[s] = I(function() {
        return e[n];
      });
    } else
      t[n] = I(function() {
        return e[n];
      });
  }), t;
}
function kt(e, t) {
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
function I(e) {
  try {
    return e();
  } catch (t) {
    return t;
  }
}
var m = function(t, n) {
  this.runtime = n, this._children = /* @__PURE__ */ Object.create(null), this._rawModule = t;
  var r = t.state;
  this.state = (typeof r == "function" ? r() : r) || {};
}, Z = { namespaced: { configurable: !0 } };
Z.namespaced.get = function() {
  return !!this._rawModule.namespaced;
};
m.prototype.addChild = function(t, n) {
  this._children[t] = n;
};
m.prototype.removeChild = function(t) {
  delete this._children[t];
};
m.prototype.getChild = function(t) {
  return this._children[t];
};
m.prototype.hasChild = function(t) {
  return t in this._children;
};
m.prototype.update = function(t) {
  this._rawModule.namespaced = t.namespaced, t.actions && (this._rawModule.actions = t.actions), t.mutations && (this._rawModule.mutations = t.mutations), t.getters && (this._rawModule.getters = t.getters);
};
m.prototype.forEachChild = function(t) {
  g(this._children, t);
};
m.prototype.forEachGetter = function(t) {
  this._rawModule.getters && g(this._rawModule.getters, t);
};
m.prototype.forEachAction = function(t) {
  this._rawModule.actions && g(this._rawModule.actions, t);
};
m.prototype.forEachMutation = function(t) {
  this._rawModule.mutations && g(this._rawModule.mutations, t);
};
Object.defineProperties(m.prototype, Z);
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
  tt([], this.root, t);
};
_.prototype.register = function(t, n, r) {
  var o = this;
  r === void 0 && (r = !0), process.env.NODE_ENV !== "production" && et(t, n);
  var s = new m(n, r);
  if (t.length === 0)
    this.root = s;
  else {
    var i = this.get(t.slice(0, -1));
    i.addChild(t[t.length - 1], s);
  }
  n.modules && g(n.modules, function(c, a) {
    o.register(t.concat(a), c, r);
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
function tt(e, t, n) {
  if (process.env.NODE_ENV !== "production" && et(e, n), t.update(n), n.modules)
    for (var r in n.modules) {
      if (!t.getChild(r)) {
        process.env.NODE_ENV !== "production" && console.warn(
          "[vuex] trying to add a new module '" + r + "' on hot reloading, manual reload is needed"
        );
        return;
      }
      tt(
        e.concat(r),
        t.getChild(r),
        n.modules[r]
      );
    }
}
var $ = {
  assert: function(e) {
    return typeof e == "function";
  },
  expected: "function"
}, $t = {
  assert: function(e) {
    return typeof e == "function" || typeof e == "object" && typeof e.handler == "function";
  },
  expected: 'function or object with "handler" function'
}, R = {
  getters: $,
  mutations: $,
  actions: $t
};
function et(e, t) {
  Object.keys(R).forEach(function(n) {
    if (t[n]) {
      var r = R[n];
      g(t[n], function(o, s) {
        v(
          r.assert(o),
          Rt(e, n, s, o, r.expected)
        );
      });
    }
  });
}
function Rt(e, t, n, r, o) {
  var s = t + " should be " + o + ' but "' + t + "." + n + '"';
  return e.length > 0 && (s += ' in module "' + e.join(".") + '"'), s += " is " + JSON.stringify(r) + ".", s;
}
function Ut(e) {
  return new h(e);
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
  var i = this, c = this, a = c.dispatch, f = c.commit;
  this.dispatch = function(p, d) {
    return a.call(i, p, d);
  }, this.commit = function(p, d, w) {
    return f.call(i, p, d, w);
  }, this.strict = o;
  var u = this._modules.root.state;
  x(this, u, [], this._modules.root), j(this, u), r.forEach(function(l) {
    return l(n);
  });
}, L = { state: { configurable: !0 } };
h.prototype.install = function(t, n) {
  t.provide(n || Ot, this), t.config.globalProperties.$store = this;
  var r = this._devtools !== void 0 ? this._devtools : process.env.NODE_ENV !== "production" || !1;
  r && Vt(t, this);
};
L.state.get = function() {
  return this._state.data;
};
L.state.set = function(e) {
  process.env.NODE_ENV !== "production" && v(!1, "use store.replaceState() to explicit replace store state.");
};
h.prototype.commit = function(t, n, r) {
  var o = this, s = S(t, n, r), i = s.type, c = s.payload, a = s.options, f = { type: i, payload: c }, u = this._mutations[i];
  if (!u) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] unknown mutation type: " + i);
    return;
  }
  this._withCommit(function() {
    u.forEach(function(p) {
      p(c);
    });
  }), this._subscribers.slice().forEach(function(l) {
    return l(f, o.state);
  }), process.env.NODE_ENV !== "production" && a && a.silent && console.warn(
    "[vuex] mutation type: " + i + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
  );
};
h.prototype.dispatch = function(t, n) {
  var r = this, o = S(t, n), s = o.type, i = o.payload, c = { type: s, payload: i }, a = this._actions[s];
  if (!a) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] unknown action type: " + s);
    return;
  }
  try {
    this._actionSubscribers.slice().filter(function(u) {
      return u.before;
    }).forEach(function(u) {
      return u.before(c, r.state);
    });
  } catch (u) {
    process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in before action subscribers: "), console.error(u));
  }
  var f = a.length > 1 ? Promise.all(a.map(function(u) {
    return u(i);
  })) : a[0](i);
  return new Promise(function(u, l) {
    f.then(function(p) {
      try {
        r._actionSubscribers.filter(function(d) {
          return d.after;
        }).forEach(function(d) {
          return d.after(c, r.state);
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
          return d.error(c, r.state, p);
        });
      } catch (d) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in error action subscribers: "), console.error(d));
      }
      l(p);
    });
  });
};
h.prototype.subscribe = function(t, n) {
  return F(t, this._subscribers, n);
};
h.prototype.subscribeAction = function(t, n) {
  var r = typeof t == "function" ? { before: t } : t;
  return F(r, this._actionSubscribers, n);
};
h.prototype.watch = function(t, n, r) {
  var o = this;
  return process.env.NODE_ENV !== "production" && v(typeof t == "function", "store.watch only accepts a function."), K(function() {
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
  r === void 0 && (r = {}), typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && (v(Array.isArray(t), "module path must be a string or an Array."), v(t.length > 0, "cannot register the root module by using registerModule.")), this._modules.register(t, n), x(this, this.state, t, this._modules.get(t), r.preserveState), j(this, this.state);
};
h.prototype.unregisterModule = function(t) {
  var n = this;
  typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && v(Array.isArray(t), "module path must be a string or an Array."), this._modules.unregister(t), this._withCommit(function() {
    var r = V(n.state, t.slice(0, -1));
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
Object.defineProperties(h.prototype, L);
const Ht = {
  state: {
    dict: new Array()
  },
  actions: {
    // 获取字典
    getDict({ state: e }, t) {
      if (t == null && t == "")
        return null;
      try {
        for (let n = 0; n < e.dict.length; n++)
          if (e.dict[n].key == t)
            return e.dict[n].value;
      } catch {
        return null;
      }
    },
    // 设置字典
    setDict({ state: e }, { _key: t, value: n }) {
      t !== null && t !== "" && e.dict.push({
        key: t,
        value: n
      });
    }
  }
}, Kt = {
  state: {
    api: {},
    globalData: {}
  },
  actions: {
    UpdateApi({ commit: e }, t) {
      e("SET_API", t);
    }
  },
  mutations: {
    SET_API: (e, t) => {
      e.api = t;
    }
  }
}, Bt = {
  api: (e) => e.cache.api,
  globalData: (e) => e.cache.globalData
}, rt = Ut({
  modules: {
    dict: Ht,
    cache: Kt
  },
  getters: Bt
}), P = at({});
for (const [e, t] of Object.entries(B))
  P.component(e, t);
P.use(nt);
P.use(rt);
const Jt = {
  install(e, t) {
    window.$dcConfig = t, rt.dispatch("UpdateApi", t.api);
    for (const [n, r] of Object.entries(B))
      e.component(n, r);
  }
};
export {
  Jt as default
};
