import { useRoutingStore as U, useNotificationStore as j, useState as D, React as h, createMfaApp as Y } from "@mfa/framework";
var A = { exports: {} }, a = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var R = Symbol.for("react.transitional.element"), G = Symbol.for("react.portal"), B = Symbol.for("react.fragment"), Z = Symbol.for("react.strict_mode"), W = Symbol.for("react.profiler"), V = Symbol.for("react.consumer"), q = Symbol.for("react.context"), K = Symbol.for("react.forward_ref"), X = Symbol.for("react.suspense"), J = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), N = Symbol.iterator;
function Q(e) {
  return e === null || typeof e != "object" ? null : (e = N && e[N] || e["@@iterator"], typeof e == "function" ? e : null);
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
}, P = Object.assign, $ = {};
function m(e, t, n) {
  this.props = e, this.context = t, this.refs = $, this.updater = n || O;
}
m.prototype.isReactComponent = {};
m.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
m.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function H() {
}
H.prototype = m.prototype;
function g(e, t, n) {
  this.props = e, this.context = t, this.refs = $, this.updater = n || O;
}
var b = g.prototype = new H();
b.constructor = g;
P(b, m.prototype);
b.isPureReactComponent = !0;
var w = Array.isArray, l = { H: null, A: null, T: null, S: null, V: null }, L = Object.prototype.hasOwnProperty;
function x(e, t, n, r, s, i) {
  return n = i.ref, {
    $$typeof: R,
    type: e,
    key: t,
    ref: n !== void 0 ? n : null,
    props: i
  };
}
function F(e, t) {
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
function ee(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var C = /\/+/g;
function y(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? ee("" + e.key) : t.toString(36);
}
function k() {
}
function te(e) {
  switch (e.status) {
    case "fulfilled":
      return e.value;
    case "rejected":
      throw e.reason;
    default:
      switch (typeof e.status == "string" ? e.then(k, k) : (e.status = "pending", e.then(
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
function f(e, t, n, r, s) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else
    switch (i) {
      case "bigint":
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case R:
          case G:
            o = !0;
            break;
          case S:
            return o = e._init, f(
              o(e._payload),
              t,
              n,
              r,
              s
            );
        }
    }
  if (o)
    return s = s(e), o = r === "" ? "." + y(e, 0) : r, w(s) ? (n = "", o != null && (n = o.replace(C, "$&/") + "/"), f(s, t, n, "", function(v) {
      return v;
    })) : s != null && (_(s) && (s = F(
      s,
      n + (s.key == null || e && e.key === s.key ? "" : ("" + s.key).replace(
        C,
        "$&/"
      ) + "/") + o
    )), t.push(s)), 1;
  o = 0;
  var u = r === "" ? "." : r + ":";
  if (w(e))
    for (var c = 0; c < e.length; c++)
      r = e[c], i = u + y(r, c), o += f(
        r,
        t,
        n,
        i,
        s
      );
  else if (c = Q(e), typeof c == "function")
    for (e = c.call(e), c = 0; !(r = e.next()).done; )
      r = r.value, i = u + y(r, c++), o += f(
        r,
        t,
        n,
        i,
        s
      );
  else if (i === "object") {
    if (typeof e.then == "function")
      return f(
        te(e),
        t,
        n,
        r,
        s
      );
    throw t = String(e), Error(
      "Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead."
    );
  }
  return o;
}
function E(e, t, n) {
  if (e == null) return e;
  var r = [], s = 0;
  return f(e, r, "", "", function(i) {
    return t.call(n, i, s++);
  }), r;
}
function ne(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(
      function(n) {
        (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
      },
      function(n) {
        (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
      }
    ), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var T = typeof reportError == "function" ? reportError : function(e) {
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
function re() {
}
a.Children = {
  map: E,
  forEach: function(e, t, n) {
    E(
      e,
      function() {
        t.apply(this, arguments);
      },
      n
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
a.Component = m;
a.Fragment = B;
a.Profiler = W;
a.PureComponent = g;
a.StrictMode = Z;
a.Suspense = X;
a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l;
a.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function(e) {
    return l.H.useMemoCache(e);
  }
};
a.cache = function(e) {
  return function() {
    return e.apply(null, arguments);
  };
};
a.cloneElement = function(e, t, n) {
  if (e == null)
    throw Error(
      "The argument must be a React element, but you passed " + e + "."
    );
  var r = P({}, e.props), s = e.key, i = void 0;
  if (t != null)
    for (o in t.ref !== void 0 && (i = void 0), t.key !== void 0 && (s = "" + t.key), t)
      !L.call(t, o) || o === "key" || o === "__self" || o === "__source" || o === "ref" && t.ref === void 0 || (r[o] = t[o]);
  var o = arguments.length - 2;
  if (o === 1) r.children = n;
  else if (1 < o) {
    for (var u = Array(o), c = 0; c < o; c++)
      u[c] = arguments[c + 2];
    r.children = u;
  }
  return x(e.type, s, void 0, void 0, i, r);
};
a.createContext = function(e) {
  return e = {
    $$typeof: q,
    _currentValue: e,
    _currentValue2: e,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  }, e.Provider = e, e.Consumer = {
    $$typeof: V,
    _context: e
  }, e;
};
a.createElement = function(e, t, n) {
  var r, s = {}, i = null;
  if (t != null)
    for (r in t.key !== void 0 && (i = "" + t.key), t)
      L.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (s[r] = t[r]);
  var o = arguments.length - 2;
  if (o === 1) s.children = n;
  else if (1 < o) {
    for (var u = Array(o), c = 0; c < o; c++)
      u[c] = arguments[c + 2];
    s.children = u;
  }
  if (e && e.defaultProps)
    for (r in o = e.defaultProps, o)
      s[r] === void 0 && (s[r] = o[r]);
  return x(e, i, void 0, void 0, null, s);
};
a.createRef = function() {
  return { current: null };
};
a.forwardRef = function(e) {
  return { $$typeof: K, render: e };
};
a.isValidElement = _;
a.lazy = function(e) {
  return {
    $$typeof: S,
    _payload: { _status: -1, _result: e },
    _init: ne
  };
};
a.memo = function(e, t) {
  return {
    $$typeof: J,
    type: e,
    compare: t === void 0 ? null : t
  };
};
a.startTransition = function(e) {
  var t = l.T, n = {};
  l.T = n;
  try {
    var r = e(), s = l.S;
    s !== null && s(n, r), typeof r == "object" && r !== null && typeof r.then == "function" && r.then(re, T);
  } catch (i) {
    T(i);
  } finally {
    l.T = t;
  }
};
a.unstable_useCacheRefresh = function() {
  return l.H.useCacheRefresh();
};
a.use = function(e) {
  return l.H.use(e);
};
a.useActionState = function(e, t, n) {
  return l.H.useActionState(e, t, n);
};
a.useCallback = function(e, t) {
  return l.H.useCallback(e, t);
};
a.useContext = function(e) {
  return l.H.useContext(e);
};
a.useDebugValue = function() {
};
a.useDeferredValue = function(e, t) {
  return l.H.useDeferredValue(e, t);
};
a.useEffect = function(e, t, n) {
  var r = l.H;
  if (typeof n == "function")
    throw Error(
      "useEffect CRUD overload is not enabled in this build of React."
    );
  return r.useEffect(e, t);
};
a.useId = function() {
  return l.H.useId();
};
a.useImperativeHandle = function(e, t, n) {
  return l.H.useImperativeHandle(e, t, n);
};
a.useInsertionEffect = function(e, t) {
  return l.H.useInsertionEffect(e, t);
};
a.useLayoutEffect = function(e, t) {
  return l.H.useLayoutEffect(e, t);
};
a.useMemo = function(e, t) {
  return l.H.useMemo(e, t);
};
a.useOptimistic = function(e, t) {
  return l.H.useOptimistic(e, t);
};
a.useReducer = function(e, t, n) {
  return l.H.useReducer(e, t, n);
};
a.useRef = function(e) {
  return l.H.useRef(e);
};
a.useState = function(e) {
  return l.H.useState(e);
};
a.useSyncExternalStore = function(e, t, n) {
  return l.H.useSyncExternalStore(
    e,
    t,
    n
  );
};
a.useTransition = function() {
  return l.H.useTransition();
};
a.version = "19.1.1";
A.exports = a;
var p = A.exports;
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oe = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), se = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), I = (e) => {
  const t = se(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, M = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), ae = (e) => {
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
var ie = {
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
const ce = p.forwardRef(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: s = "",
    children: i,
    iconNode: o,
    ...u
  }, c) => p.createElement(
    "svg",
    {
      ref: c,
      ...ie,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: M("lucide", s),
      ...!i && !ae(u) && { "aria-hidden": "true" },
      ...u
    },
    [
      ...o.map(([v, z]) => p.createElement(v, z)),
      ...Array.isArray(i) ? i : [i]
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
  const n = p.forwardRef(
    ({ className: r, ...s }, i) => p.createElement(ce, {
      ref: i,
      iconNode: t,
      className: M(
        `lucide-${oe(I(e))}`,
        `lucide-${e}`,
        r
      ),
      ...s
    })
  );
  return n.displayName = I(e), n;
};
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const le = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], ue = d("chevron-left", le);
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fe = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], me = d("chevron-right", fe);
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pe = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], de = d("play", pe);
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const he = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], Ee = d("search", he);
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ve = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
], ye = d("user", ve);
function Re() {
  const { navigate: e } = U(), { addNotification: t } = j(), n = [
    "드라마",
    "예능",
    "영화",
    "스포츠",
    "애니",
    "뉴스",
    "라이브"
  ], r = (o) => {
    t({
      type: "info",
      title: o,
      message: `${o} 카테고리로 이동합니다`
    });
  }, s = () => {
    e("/");
  }, i = () => {
    e("/login");
  };
  return /* @__PURE__ */ React.createElement("nav", { className: "fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between px-6 py-4 max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-8" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "text-red-500 font-bold text-2xl cursor-pointer",
      onClick: s
    },
    "TVING"
  ), /* @__PURE__ */ React.createElement("div", { className: "hidden md:flex space-x-6" }, n.map((o) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: o,
      className: "text-white hover:text-red-400 transition-colors text-sm",
      onClick: () => r(o)
    },
    o
  )))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ React.createElement("button", { className: "text-white hover:text-gray-300 transition-colors" }, /* @__PURE__ */ React.createElement(Ee, { size: 20 })), /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "text-white hover:text-gray-300 transition-colors",
      onClick: i
    },
    /* @__PURE__ */ React.createElement(ye, { size: 20 })
  ))));
}
function ge() {
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
  return /* @__PURE__ */ React.createElement("section", { className: "bg-black mt-16 py-8" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-6" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("button", { className: "absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors" }, /* @__PURE__ */ React.createElement(ue, { size: 40 })), /* @__PURE__ */ React.createElement("div", { className: "flex space-x-4 px-12 overflow-x-auto scrollbar-hide" }, e.map((t, n) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: t.id,
      className: `flex-shrink-0 w-80 h-48 ${t.color} rounded-lg p-6 relative overflow-hidden`
    },
    /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-br from-transparent to-black/30" }),
    /* @__PURE__ */ React.createElement("div", { className: "relative z-10 h-full flex flex-col justify-end text-white" }, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-lg mb-2" }, t.title), /* @__PURE__ */ React.createElement("p", { className: "text-sm opacity-90" }, t.subtitle))
  ))), /* @__PURE__ */ React.createElement("button", { className: "absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors" }, /* @__PURE__ */ React.createElement(me, { size: 40 })))));
}
const be = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";
function xe(e) {
  const [t, n] = D(!1), r = () => {
    n(!0);
  }, { src: s, alt: i, style: o, className: u, ...c } = e;
  return t ? /* @__PURE__ */ h.createElement(
    "div",
    {
      className: `inline-block bg-gray-100 text-center align-middle ${u ?? ""}`,
      style: o
    },
    /* @__PURE__ */ h.createElement("div", { className: "flex items-center justify-center w-full h-full" }, /* @__PURE__ */ h.createElement("img", { src: be, alt: "Error loading image", ...c, "data-original-url": s }))
  ) : /* @__PURE__ */ h.createElement("img", { src: s, alt: i, className: u, style: o, ...c, onError: r });
}
function _e() {
  const { addNotification: e } = j(), t = [
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
  return /* @__PURE__ */ React.createElement("section", { className: "bg-black py-8" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-white text-xl font-bold mb-6" }, "Luke님이 시청하는 콘텐츠"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4" }, t.map((n) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: n.id,
      className: "group cursor-pointer",
      onClick: () => {
        e({
          type: "info",
          title: n.title,
          message: `${n.season} ${n.episode || ""} 재생을 시작합니다`
        });
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "relative aspect-[3/4] rounded-lg overflow-hidden mb-2" }, /* @__PURE__ */ React.createElement(
      xe,
      {
        src: n.thumbnail,
        alt: n.title,
        className: "w-full h-full object-cover transition-transform group-hover:scale-105"
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 backdrop-blur-sm rounded-full p-3" }, /* @__PURE__ */ React.createElement(de, { fill: "white", className: "text-white", size: 24 }))), n.isVOnly && /* @__PURE__ */ React.createElement("div", { className: "absolute top-2 right-2" }, /* @__PURE__ */ React.createElement("span", { className: "bg-red-600 text-white text-xs px-2 py-1 rounded font-bold" }, "V ONLY")), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-2 left-2" }, /* @__PURE__ */ React.createElement("span", { className: "bg-black/70 text-white text-xs px-2 py-1 rounded" }, n.season, " ", n.episode && `• ${n.episode}`))),
    /* @__PURE__ */ React.createElement("div", { className: "text-white text-sm truncate" }, n.title)
  )))));
}
function Ne() {
  return /* @__PURE__ */ React.createElement("section", { className: "bg-black py-8" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-6" }, /* @__PURE__ */ React.createElement("div", { className: "relative bg-gradient-to-r from-purple-900 via-blue-800 to-purple-900 rounded-xl overflow-hidden h-32" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 opacity-20" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-4 left-8 w-8 h-8 bg-yellow-400 rounded rotate-12" }), /* @__PURE__ */ React.createElement("div", { className: "absolute top-8 right-16 w-6 h-6 bg-green-400 rounded-full" }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-6 left-24 w-4 h-4 bg-pink-400 rounded" }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-4 right-8 w-10 h-3 bg-orange-400 rounded-full" }), /* @__PURE__ */ React.createElement("div", { className: "absolute top-6 left-1/3 w-5 h-5 bg-red-400 rotate-45" }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-8 right-1/3 w-7 h-7 bg-blue-400 rounded-full" })), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 h-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("h2", { className: "text-white text-4xl font-bold mb-2" }, "TVING ", /* @__PURE__ */ React.createElement("span", { className: "inline-flex items-center" }, "📺🎬"), " FESTA"))), /* @__PURE__ */ React.createElement("div", { className: "absolute right-8 top-1/2 transform -translate-y-1/2 text-6xl opacity-30" }, "🎪"))));
}
function we() {
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-black" }, /* @__PURE__ */ React.createElement(Re, null), /* @__PURE__ */ React.createElement(ge, null), /* @__PURE__ */ React.createElement(_e, null), /* @__PURE__ */ React.createElement(Ne, null));
}
function Ce() {
  return /* @__PURE__ */ React.createElement(we, null);
}
const { mount: Te, unmount: Ie } = Y("main", Ce);
export {
  Te as mount,
  Ie as unmount
};
