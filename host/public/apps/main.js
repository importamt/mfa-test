import { createMfaApp as z } from "@mfa/framework";
function U(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var A = { exports: {} }, s = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var R = Symbol.for("react.transitional.element"), D = Symbol.for("react.portal"), Y = Symbol.for("react.fragment"), G = Symbol.for("react.strict_mode"), B = Symbol.for("react.profiler"), Z = Symbol.for("react.consumer"), W = Symbol.for("react.context"), V = Symbol.for("react.forward_ref"), q = Symbol.for("react.suspense"), K = Symbol.for("react.memo"), k = Symbol.for("react.lazy"), w = Symbol.iterator;
function X(e) {
  return e === null || typeof e != "object" ? null : (e = w && e[w] || e["@@iterator"], typeof e == "function" ? e : null);
}
var O = {
  isMounted: function() {
    return !1;
  },
  enqueueForceUpdate: function() {
  },
  enqueueReplaceState: function() {
  },
  enqueueSetState: function() {
  }
}, S = Object.assign, P = {};
function p(e, t, r) {
  this.props = e, this.context = t, this.refs = P, this.updater = r || O;
}
p.prototype.isReactComponent = {};
p.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
p.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function H() {
}
H.prototype = p.prototype;
function g(e, t, r) {
  this.props = e, this.context = t, this.refs = P, this.updater = r || O;
}
var b = g.prototype = new H();
b.constructor = g;
S(b, p.prototype);
b.isPureReactComponent = !0;
var N = Array.isArray, u = { H: null, A: null, T: null, S: null, V: null }, $ = Object.prototype.hasOwnProperty;
function x(e, t, r, n, a, c) {
  return r = c.ref, {
    $$typeof: R,
    type: e,
    key: t,
    ref: r !== void 0 ? r : null,
    props: c
  };
}
function J(e, t) {
  return x(
    e.type,
    t,
    void 0,
    void 0,
    void 0,
    e.props
  );
}
function _(e) {
  return typeof e == "object" && e !== null && e.$$typeof === R;
}
function Q(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(r) {
    return t[r];
  });
}
var C = /\/+/g;
function y(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Q("" + e.key) : t.toString(36);
}
function T() {
}
function F(e) {
  switch (e.status) {
    case "fulfilled":
      return e.value;
    case "rejected":
      throw e.reason;
    default:
      switch (typeof e.status == "string" ? e.then(T, T) : (e.status = "pending", e.then(
        function(t) {
          e.status === "pending" && (e.status = "fulfilled", e.value = t);
        },
        function(t) {
          e.status === "pending" && (e.status = "rejected", e.reason = t);
        }
      )), e.status) {
        case "fulfilled":
          return e.value;
        case "rejected":
          throw e.reason;
      }
  }
  throw e;
}
function m(e, t, r, n, a) {
  var c = typeof e;
  (c === "undefined" || c === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else
    switch (c) {
      case "bigint":
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case R:
          case D:
            o = !0;
            break;
          case k:
            return o = e._init, m(
              o(e._payload),
              t,
              r,
              n,
              a
            );
        }
    }
  if (o)
    return a = a(e), o = n === "" ? "." + y(e, 0) : n, N(a) ? (r = "", o != null && (r = o.replace(C, "$&/") + "/"), m(a, t, r, "", function(v) {
      return v;
    })) : a != null && (_(a) && (a = J(
      a,
      r + (a.key == null || e && e.key === a.key ? "" : ("" + a.key).replace(
        C,
        "$&/"
      ) + "/") + o
    )), t.push(a)), 1;
  o = 0;
  var l = n === "" ? "." : n + ":";
  if (N(e))
    for (var i = 0; i < e.length; i++)
      n = e[i], c = l + y(n, i), o += m(
        n,
        t,
        r,
        c,
        a
      );
  else if (i = X(e), typeof i == "function")
    for (e = i.call(e), i = 0; !(n = e.next()).done; )
      n = n.value, c = l + y(n, i++), o += m(
        n,
        t,
        r,
        c,
        a
      );
  else if (c === "object") {
    if (typeof e.then == "function")
      return m(
        F(e),
        t,
        r,
        n,
        a
      );
    throw t = String(e), Error(
      "Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead."
    );
  }
  return o;
}
function E(e, t, r) {
  if (e == null) return e;
  var n = [], a = 0;
  return m(e, n, "", "", function(c) {
    return t.call(r, c, a++);
  }), n;
}
function ee(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(
      function(r) {
        (e._status === 0 || e._status === -1) && (e._status = 1, e._result = r);
      },
      function(r) {
        (e._status === 0 || e._status === -1) && (e._status = 2, e._result = r);
      }
    ), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var I = typeof reportError == "function" ? reportError : function(e) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var t = new window.ErrorEvent("error", {
      bubbles: !0,
      cancelable: !0,
      message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
      error: e
    });
    if (!window.dispatchEvent(t)) return;
  } else if (typeof process == "object" && typeof process.emit == "function") {
    process.emit("uncaughtException", e);
    return;
  }
  console.error(e);
};
function te() {
}
s.Children = {
  map: E,
  forEach: function(e, t, r) {
    E(
      e,
      function() {
        t.apply(this, arguments);
      },
      r
    );
  },
  count: function(e) {
    var t = 0;
    return E(e, function() {
      t++;
    }), t;
  },
  toArray: function(e) {
    return E(e, function(t) {
      return t;
    }) || [];
  },
  only: function(e) {
    if (!_(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  }
};
s.Component = p;
s.Fragment = Y;
s.Profiler = B;
s.PureComponent = g;
s.StrictMode = G;
s.Suspense = q;
s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u;
s.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function(e) {
    return u.H.useMemoCache(e);
  }
};
s.cache = function(e) {
  return function() {
    return e.apply(null, arguments);
  };
};
s.cloneElement = function(e, t, r) {
  if (e == null)
    throw Error(
      "The argument must be a React element, but you passed " + e + "."
    );
  var n = S({}, e.props), a = e.key, c = void 0;
  if (t != null)
    for (o in t.ref !== void 0 && (c = void 0), t.key !== void 0 && (a = "" + t.key), t)
      !$.call(t, o) || o === "key" || o === "__self" || o === "__source" || o === "ref" && t.ref === void 0 || (n[o] = t[o]);
  var o = arguments.length - 2;
  if (o === 1) n.children = r;
  else if (1 < o) {
    for (var l = Array(o), i = 0; i < o; i++)
      l[i] = arguments[i + 2];
    n.children = l;
  }
  return x(e.type, a, void 0, void 0, c, n);
};
s.createContext = function(e) {
  return e = {
    $$typeof: W,
    _currentValue: e,
    _currentValue2: e,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  }, e.Provider = e, e.Consumer = {
    $$typeof: Z,
    _context: e
  }, e;
};
s.createElement = function(e, t, r) {
  var n, a = {}, c = null;
  if (t != null)
    for (n in t.key !== void 0 && (c = "" + t.key), t)
      $.call(t, n) && n !== "key" && n !== "__self" && n !== "__source" && (a[n] = t[n]);
  var o = arguments.length - 2;
  if (o === 1) a.children = r;
  else if (1 < o) {
    for (var l = Array(o), i = 0; i < o; i++)
      l[i] = arguments[i + 2];
    a.children = l;
  }
  if (e && e.defaultProps)
    for (n in o = e.defaultProps, o)
      a[n] === void 0 && (a[n] = o[n]);
  return x(e, c, void 0, void 0, null, a);
};
s.createRef = function() {
  return { current: null };
};
s.forwardRef = function(e) {
  return { $$typeof: V, render: e };
};
s.isValidElement = _;
s.lazy = function(e) {
  return {
    $$typeof: k,
    _payload: { _status: -1, _result: e },
    _init: ee
  };
};
s.memo = function(e, t) {
  return {
    $$typeof: K,
    type: e,
    compare: t === void 0 ? null : t
  };
};
s.startTransition = function(e) {
  var t = u.T, r = {};
  u.T = r;
  try {
    var n = e(), a = u.S;
    a !== null && a(r, n), typeof n == "object" && n !== null && typeof n.then == "function" && n.then(te, I);
  } catch (c) {
    I(c);
  } finally {
    u.T = t;
  }
};
s.unstable_useCacheRefresh = function() {
  return u.H.useCacheRefresh();
};
s.use = function(e) {
  return u.H.use(e);
};
s.useActionState = function(e, t, r) {
  return u.H.useActionState(e, t, r);
};
s.useCallback = function(e, t) {
  return u.H.useCallback(e, t);
};
s.useContext = function(e) {
  return u.H.useContext(e);
};
s.useDebugValue = function() {
};
s.useDeferredValue = function(e, t) {
  return u.H.useDeferredValue(e, t);
};
s.useEffect = function(e, t, r) {
  var n = u.H;
  if (typeof r == "function")
    throw Error(
      "useEffect CRUD overload is not enabled in this build of React."
    );
  return n.useEffect(e, t);
};
s.useId = function() {
  return u.H.useId();
};
s.useImperativeHandle = function(e, t, r) {
  return u.H.useImperativeHandle(e, t, r);
};
s.useInsertionEffect = function(e, t) {
  return u.H.useInsertionEffect(e, t);
};
s.useLayoutEffect = function(e, t) {
  return u.H.useLayoutEffect(e, t);
};
s.useMemo = function(e, t) {
  return u.H.useMemo(e, t);
};
s.useOptimistic = function(e, t) {
  return u.H.useOptimistic(e, t);
};
s.useReducer = function(e, t, r) {
  return u.H.useReducer(e, t, r);
};
s.useRef = function(e) {
  return u.H.useRef(e);
};
s.useState = function(e) {
  return u.H.useState(e);
};
s.useSyncExternalStore = function(e, t, r) {
  return u.H.useSyncExternalStore(
    e,
    t,
    r
  );
};
s.useTransition = function() {
  return u.H.useTransition();
};
s.version = "19.1.1";
A.exports = s;
var f = A.exports;
const h = /* @__PURE__ */ U(f);
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const re = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ne = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, r, n) => n ? n.toUpperCase() : r.toLowerCase()
), j = (e) => {
  const t = ne(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, M = (...e) => e.filter((t, r, n) => !!t && t.trim() !== "" && n.indexOf(t) === r).join(" ").trim(), oe = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var se = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ae = f.forwardRef(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: n,
    className: a = "",
    children: c,
    iconNode: o,
    ...l
  }, i) => f.createElement(
    "svg",
    {
      ref: i,
      ...se,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: n ? Number(r) * 24 / Number(t) : r,
      className: M("lucide", a),
      ...!c && !oe(l) && { "aria-hidden": "true" },
      ...l
    },
    [
      ...o.map(([v, L]) => f.createElement(v, L)),
      ...Array.isArray(c) ? c : [c]
    ]
  )
);
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d = (e, t) => {
  const r = f.forwardRef(
    ({ className: n, ...a }, c) => f.createElement(ae, {
      ref: c,
      iconNode: t,
      className: M(
        `lucide-${re(j(e))}`,
        `lucide-${e}`,
        n
      ),
      ...a
    })
  );
  return r.displayName = j(e), r;
};
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ce = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], ie = d("chevron-left", ce);
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ue = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], le = d("chevron-right", ue);
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fe = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], me = d("play", fe);
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pe = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], de = d("search", pe);
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ee = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
], he = d("user", Ee);
function ve() {
  const e = [
    "드라마",
    "예능",
    "영화",
    "스포츠",
    "애니",
    "뉴스",
    "라이브"
  ];
  return /* @__PURE__ */ React.createElement("nav", { className: "fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between px-6 py-4 max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-8" }, /* @__PURE__ */ React.createElement("div", { className: "text-red-500 font-bold text-2xl" }, "TVING"), /* @__PURE__ */ React.createElement("div", { className: "hidden md:flex space-x-6" }, e.map((t) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: t,
      className: "text-white hover:text-red-400 transition-colors text-sm"
    },
    t
  )))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ React.createElement("button", { className: "text-white hover:text-gray-300 transition-colors" }, /* @__PURE__ */ React.createElement(de, { size: 20 })), /* @__PURE__ */ React.createElement("button", { className: "text-white hover:text-gray-300 transition-colors" }, /* @__PURE__ */ React.createElement(he, { size: 20 })))));
}
function ye() {
  const e = [
    {
      id: 1,
      title: "타이틀 공개됩니다. 타이틀 공개",
      subtitle: "이번 주 금요일 밤 11시 30분 첫 방송",
      color: "bg-orange-500"
    },
    {
      id: 2,
      title: "타이틀 공개됩니다. 타이틀 공개",
      subtitle: "매주 일요일 밤 10시 50분 첫 방송",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "타이틀 공개됩니다. 타이틀 공개",
      subtitle: "이번 주 금요일 밤 11시 30분 첫 방송",
      color: "bg-gray-700"
    },
    {
      id: 4,
      title: "타이틀 공개됩니다. 타이틀 공개",
      subtitle: "매주 일요일 밤 10시 50분 첫 방송",
      color: "bg-purple-600"
    }
  ];
  return /* @__PURE__ */ React.createElement("section", { className: "bg-black mt-16 py-8" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-6" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("button", { className: "absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors" }, /* @__PURE__ */ React.createElement(ie, { size: 40 })), /* @__PURE__ */ React.createElement("div", { className: "flex space-x-4 px-12 overflow-x-auto scrollbar-hide" }, e.map((t, r) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: t.id,
      className: `flex-shrink-0 w-80 h-48 ${t.color} rounded-lg p-6 relative overflow-hidden`
    },
    /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-br from-transparent to-black/30" }),
    /* @__PURE__ */ React.createElement("div", { className: "relative z-10 h-full flex flex-col justify-end text-white" }, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-lg mb-2" }, t.title), /* @__PURE__ */ React.createElement("p", { className: "text-sm opacity-90" }, t.subtitle))
  ))), /* @__PURE__ */ React.createElement("button", { className: "absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors" }, /* @__PURE__ */ React.createElement(le, { size: 40 })))));
}
const Re = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";
function ge(e) {
  const [t, r] = f.useState(!1), n = () => {
    r(!0);
  }, { src: a, alt: c, style: o, className: l, ...i } = e;
  return t ? /* @__PURE__ */ h.createElement(
    "div",
    {
      className: `inline-block bg-gray-100 text-center align-middle ${l ?? ""}`,
      style: o
    },
    /* @__PURE__ */ h.createElement("div", { className: "flex items-center justify-center w-full h-full" }, /* @__PURE__ */ h.createElement("img", { src: Re, alt: "Error loading image", ...i, "data-original-url": a }))
  ) : /* @__PURE__ */ h.createElement("img", { src: a, alt: c, className: l, style: o, ...i, onError: n });
}
function be() {
  const e = [
    {
      id: 1,
      title: "최원일의 라이프",
      season: "시즌1",
      episode: "1화",
      thumbnail: "https://images.unsplash.com/photo-1489599147144-e0d3dfb930fc?w=300&h=400&fit=crop",
      isVOnly: !1
    },
    {
      id: 2,
      title: "우영씨 모십시다",
      season: "2기",
      episode: "7화",
      thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=400&fit=crop",
      isVOnly: !0
    },
    {
      id: 3,
      title: "최강야구",
      season: "2화",
      episode: "",
      thumbnail: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=300&h=400&fit=crop",
      isVOnly: !1
    },
    {
      id: 4,
      title: "짱구는 못말려",
      season: "시즌23",
      episode: "5화",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      isVOnly: !1
    },
    {
      id: 5,
      title: "자우림 시즌2",
      season: "시즌2",
      episode: "1화",
      thumbnail: "https://images.unsplash.com/photo-1618946168171-e80b2a741a98?w=300&h=400&fit=crop",
      isVOnly: !0
    },
    {
      id: 6,
      title: "자우림 시즌2",
      season: "시즌2",
      episode: "1화",
      thumbnail: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=300&h=400&fit=crop",
      isVOnly: !0
    },
    {
      id: 7,
      title: "술트루스 의사쌤",
      season: "시즌1",
      episode: "4화",
      thumbnail: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&h=400&fit=crop",
      isVOnly: !1
    },
    {
      id: 8,
      title: "오오오! 마이 베이비",
      season: "시즌21",
      episode: "13화",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      isVOnly: !1
    }
  ];
  return /* @__PURE__ */ React.createElement("section", { className: "bg-black py-8" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-white text-xl font-bold mb-6" }, "Luke님이 시청하는 콘텐츠"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4" }, e.map((t) => /* @__PURE__ */ React.createElement("div", { key: t.id, className: "group cursor-pointer" }, /* @__PURE__ */ React.createElement("div", { className: "relative aspect-[3/4] rounded-lg overflow-hidden mb-2" }, /* @__PURE__ */ React.createElement(
    ge,
    {
      src: t.thumbnail,
      alt: t.title,
      className: "w-full h-full object-cover transition-transform group-hover:scale-105"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 backdrop-blur-sm rounded-full p-3" }, /* @__PURE__ */ React.createElement(me, { fill: "white", className: "text-white", size: 24 }))), t.isVOnly && /* @__PURE__ */ React.createElement("div", { className: "absolute top-2 right-2" }, /* @__PURE__ */ React.createElement("span", { className: "bg-red-600 text-white text-xs px-2 py-1 rounded font-bold" }, "V ONLY")), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-2 left-2" }, /* @__PURE__ */ React.createElement("span", { className: "bg-black/70 text-white text-xs px-2 py-1 rounded" }, t.season, " ", t.episode && `• ${t.episode}`))), /* @__PURE__ */ React.createElement("div", { className: "text-white text-sm truncate" }, t.title))))));
}
function xe() {
  return /* @__PURE__ */ React.createElement("section", { className: "bg-black py-8" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-6" }, /* @__PURE__ */ React.createElement("div", { className: "relative bg-gradient-to-r from-purple-900 via-blue-800 to-purple-900 rounded-xl overflow-hidden h-32" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 opacity-20" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-4 left-8 w-8 h-8 bg-yellow-400 rounded rotate-12" }), /* @__PURE__ */ React.createElement("div", { className: "absolute top-8 right-16 w-6 h-6 bg-green-400 rounded-full" }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-6 left-24 w-4 h-4 bg-pink-400 rounded" }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-4 right-8 w-10 h-3 bg-orange-400 rounded-full" }), /* @__PURE__ */ React.createElement("div", { className: "absolute top-6 left-1/3 w-5 h-5 bg-red-400 rotate-45" }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-8 right-1/3 w-7 h-7 bg-blue-400 rounded-full" })), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 h-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("h2", { className: "text-white text-4xl font-bold mb-2" }, "TVING ", /* @__PURE__ */ React.createElement("span", { className: "inline-flex items-center" }, "📺🎬"), " FESTA"))), /* @__PURE__ */ React.createElement("div", { className: "absolute right-8 top-1/2 transform -translate-y-1/2 text-6xl opacity-30" }, "🎪"))));
}
function _e() {
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-black" }, /* @__PURE__ */ React.createElement(ve, null), /* @__PURE__ */ React.createElement(ye, null), /* @__PURE__ */ React.createElement(be, null), /* @__PURE__ */ React.createElement(xe, null));
}
function we() {
  return /* @__PURE__ */ React.createElement(_e, null);
}
const { mount: Ce, unmount: Te } = z("main", we);
export {
  Ce as mount,
  Te as unmount
};
