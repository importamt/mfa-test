var xr = (t) => {
  throw TypeError(t);
};
var Oc = (t, e, l) => e.has(t) || xr("Cannot " + l);
var r = (t, e, l) => (Oc(t, e, "read from private field"), l ? l.call(t) : e.get(t)), _ = (t, e, l) => e.has(t) ? xr("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, l), A = (t, e, l, u) => (Oc(t, e, "write to private field"), u ? u.call(t, l) : e.set(t, l), l), Q = (t, e, l) => (Oc(t, e, "access private method"), l);
var Bn = (t, e, l, u) => ({
  set _(a) {
    A(t, e, a, l);
  },
  get _() {
    return r(t, e, u);
  }
});
function Uh(t, e) {
  for (var l = 0; l < e.length; l++) {
    const u = e[l];
    if (typeof u != "string" && !Array.isArray(u)) {
      for (const a in u)
        if (a !== "default" && !(a in t)) {
          const n = Object.getOwnPropertyDescriptor(u, a);
          n && Object.defineProperty(t, a, n.get ? n : {
            enumerable: !0,
            get: () => u[a]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
function Rs(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Qh = { exports: {} }, q = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ds = Symbol.for("react.transitional.element"), S0 = Symbol.for("react.portal"), b0 = Symbol.for("react.fragment"), p0 = Symbol.for("react.strict_mode"), E0 = Symbol.for("react.profiler"), O0 = Symbol.for("react.consumer"), T0 = Symbol.for("react.context"), A0 = Symbol.for("react.forward_ref"), M0 = Symbol.for("react.suspense"), R0 = Symbol.for("react.memo"), Ch = Symbol.for("react.lazy"), Yr = Symbol.iterator;
function D0(t) {
  return t === null || typeof t != "object" ? null : (t = Yr && t[Yr] || t["@@iterator"], typeof t == "function" ? t : null);
}
var Hh = {
  isMounted: function() {
    return !1;
  },
  enqueueForceUpdate: function() {
  },
  enqueueReplaceState: function() {
  },
  enqueueSetState: function() {
  }
}, Nh = Object.assign, qh = {};
function ha(t, e, l) {
  this.props = t, this.context = e, this.refs = qh, this.updater = l || Hh;
}
ha.prototype.isReactComponent = {};
ha.prototype.setState = function(t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, t, e, "setState");
};
ha.prototype.forceUpdate = function(t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function xh() {
}
xh.prototype = ha.prototype;
function _s(t, e, l) {
  this.props = t, this.context = e, this.refs = qh, this.updater = l || Hh;
}
var zs = _s.prototype = new xh();
zs.constructor = _s;
Nh(zs, ha.prototype);
zs.isPureReactComponent = !0;
var Br = Array.isArray, et = { H: null, A: null, T: null, S: null, V: null }, Yh = Object.prototype.hasOwnProperty;
function Us(t, e, l, u, a, n) {
  return l = n.ref, {
    $$typeof: Ds,
    type: t,
    key: e,
    ref: l !== void 0 ? l : null,
    props: n
  };
}
function _0(t, e) {
  return Us(
    t.type,
    e,
    void 0,
    void 0,
    void 0,
    t.props
  );
}
function Qs(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Ds;
}
function z0(t) {
  var e = { "=": "=0", ":": "=2" };
  return "$" + t.replace(/[=:]/g, function(l) {
    return e[l];
  });
}
var Gr = /\/+/g;
function Tc(t, e) {
  return typeof t == "object" && t !== null && t.key != null ? z0("" + t.key) : e.toString(36);
}
function jr() {
}
function U0(t) {
  switch (t.status) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw t.reason;
    default:
      switch (typeof t.status == "string" ? t.then(jr, jr) : (t.status = "pending", t.then(
        function(e) {
          t.status === "pending" && (t.status = "fulfilled", t.value = e);
        },
        function(e) {
          t.status === "pending" && (t.status = "rejected", t.reason = e);
        }
      )), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw t.reason;
      }
  }
  throw t;
}
function yu(t, e, l, u, a) {
  var n = typeof t;
  (n === "undefined" || n === "boolean") && (t = null);
  var i = !1;
  if (t === null) i = !0;
  else
    switch (n) {
      case "bigint":
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (t.$$typeof) {
          case Ds:
          case S0:
            i = !0;
            break;
          case Ch:
            return i = t._init, yu(
              i(t._payload),
              e,
              l,
              u,
              a
            );
        }
    }
  if (i)
    return a = a(t), i = u === "" ? "." + Tc(t, 0) : u, Br(a) ? (l = "", i != null && (l = i.replace(Gr, "$&/") + "/"), yu(a, e, l, "", function(o) {
      return o;
    })) : a != null && (Qs(a) && (a = _0(
      a,
      l + (a.key == null || t && t.key === a.key ? "" : ("" + a.key).replace(
        Gr,
        "$&/"
      ) + "/") + i
    )), e.push(a)), 1;
  i = 0;
  var c = u === "" ? "." : u + ":";
  if (Br(t))
    for (var f = 0; f < t.length; f++)
      u = t[f], n = c + Tc(u, f), i += yu(
        u,
        e,
        l,
        n,
        a
      );
  else if (f = D0(t), typeof f == "function")
    for (t = f.call(t), f = 0; !(u = t.next()).done; )
      u = u.value, n = c + Tc(u, f++), i += yu(
        u,
        e,
        l,
        n,
        a
      );
  else if (n === "object") {
    if (typeof t.then == "function")
      return yu(
        U0(t),
        e,
        l,
        u,
        a
      );
    throw e = String(t), Error(
      "Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."
    );
  }
  return i;
}
function Gn(t, e, l) {
  if (t == null) return t;
  var u = [], a = 0;
  return yu(t, u, "", "", function(n) {
    return e.call(l, n, a++);
  }), u;
}
function Q0(t) {
  if (t._status === -1) {
    var e = t._result;
    e = e(), e.then(
      function(l) {
        (t._status === 0 || t._status === -1) && (t._status = 1, t._result = l);
      },
      function(l) {
        (t._status === 0 || t._status === -1) && (t._status = 2, t._result = l);
      }
    ), t._status === -1 && (t._status = 0, t._result = e);
  }
  if (t._status === 1) return t._result.default;
  throw t._result;
}
var wr = typeof reportError == "function" ? reportError : function(t) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var e = new window.ErrorEvent("error", {
      bubbles: !0,
      cancelable: !0,
      message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
      error: t
    });
    if (!window.dispatchEvent(e)) return;
  } else if (typeof process == "object" && typeof process.emit == "function") {
    process.emit("uncaughtException", t);
    return;
  }
  console.error(t);
};
function C0() {
}
q.Children = {
  map: Gn,
  forEach: function(t, e, l) {
    Gn(
      t,
      function() {
        e.apply(this, arguments);
      },
      l
    );
  },
  count: function(t) {
    var e = 0;
    return Gn(t, function() {
      e++;
    }), e;
  },
  toArray: function(t) {
    return Gn(t, function(e) {
      return e;
    }) || [];
  },
  only: function(t) {
    if (!Qs(t))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return t;
  }
};
q.Component = ha;
q.Fragment = b0;
q.Profiler = E0;
q.PureComponent = _s;
q.StrictMode = p0;
q.Suspense = M0;
q.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = et;
q.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function(t) {
    return et.H.useMemoCache(t);
  }
};
q.cache = function(t) {
  return function() {
    return t.apply(null, arguments);
  };
};
q.cloneElement = function(t, e, l) {
  if (t == null)
    throw Error(
      "The argument must be a React element, but you passed " + t + "."
    );
  var u = Nh({}, t.props), a = t.key, n = void 0;
  if (e != null)
    for (i in e.ref !== void 0 && (n = void 0), e.key !== void 0 && (a = "" + e.key), e)
      !Yh.call(e, i) || i === "key" || i === "__self" || i === "__source" || i === "ref" && e.ref === void 0 || (u[i] = e[i]);
  var i = arguments.length - 2;
  if (i === 1) u.children = l;
  else if (1 < i) {
    for (var c = Array(i), f = 0; f < i; f++)
      c[f] = arguments[f + 2];
    u.children = c;
  }
  return Us(t.type, a, void 0, void 0, n, u);
};
q.createContext = function(t) {
  return t = {
    $$typeof: T0,
    _currentValue: t,
    _currentValue2: t,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  }, t.Provider = t, t.Consumer = {
    $$typeof: O0,
    _context: t
  }, t;
};
q.createElement = function(t, e, l) {
  var u, a = {}, n = null;
  if (e != null)
    for (u in e.key !== void 0 && (n = "" + e.key), e)
      Yh.call(e, u) && u !== "key" && u !== "__self" && u !== "__source" && (a[u] = e[u]);
  var i = arguments.length - 2;
  if (i === 1) a.children = l;
  else if (1 < i) {
    for (var c = Array(i), f = 0; f < i; f++)
      c[f] = arguments[f + 2];
    a.children = c;
  }
  if (t && t.defaultProps)
    for (u in i = t.defaultProps, i)
      a[u] === void 0 && (a[u] = i[u]);
  return Us(t, n, void 0, void 0, null, a);
};
q.createRef = function() {
  return { current: null };
};
q.forwardRef = function(t) {
  return { $$typeof: A0, render: t };
};
q.isValidElement = Qs;
q.lazy = function(t) {
  return {
    $$typeof: Ch,
    _payload: { _status: -1, _result: t },
    _init: Q0
  };
};
q.memo = function(t, e) {
  return {
    $$typeof: R0,
    type: t,
    compare: e === void 0 ? null : e
  };
};
q.startTransition = function(t) {
  var e = et.T, l = {};
  et.T = l;
  try {
    var u = t(), a = et.S;
    a !== null && a(l, u), typeof u == "object" && u !== null && typeof u.then == "function" && u.then(C0, wr);
  } catch (n) {
    wr(n);
  } finally {
    et.T = e;
  }
};
q.unstable_useCacheRefresh = function() {
  return et.H.useCacheRefresh();
};
q.use = function(t) {
  return et.H.use(t);
};
q.useActionState = function(t, e, l) {
  return et.H.useActionState(t, e, l);
};
q.useCallback = function(t, e) {
  return et.H.useCallback(t, e);
};
q.useContext = function(t) {
  return et.H.useContext(t);
};
q.useDebugValue = function() {
};
q.useDeferredValue = function(t, e) {
  return et.H.useDeferredValue(t, e);
};
q.useEffect = function(t, e, l) {
  var u = et.H;
  if (typeof l == "function")
    throw Error(
      "useEffect CRUD overload is not enabled in this build of React."
    );
  return u.useEffect(t, e);
};
q.useId = function() {
  return et.H.useId();
};
q.useImperativeHandle = function(t, e, l) {
  return et.H.useImperativeHandle(t, e, l);
};
q.useInsertionEffect = function(t, e) {
  return et.H.useInsertionEffect(t, e);
};
q.useLayoutEffect = function(t, e) {
  return et.H.useLayoutEffect(t, e);
};
q.useMemo = function(t, e) {
  return et.H.useMemo(t, e);
};
q.useOptimistic = function(t, e) {
  return et.H.useOptimistic(t, e);
};
q.useReducer = function(t, e, l) {
  return et.H.useReducer(t, e, l);
};
q.useRef = function(t) {
  return et.H.useRef(t);
};
q.useState = function(t) {
  return et.H.useState(t);
};
q.useSyncExternalStore = function(t, e, l) {
  return et.H.useSyncExternalStore(
    t,
    e,
    l
  );
};
q.useTransition = function() {
  return et.H.useTransition();
};
q.version = "19.1.1";
Qh.exports = q;
var N = Qh.exports;
const jt = /* @__PURE__ */ Rs(N), Bh = /* @__PURE__ */ Uh({
  __proto__: null,
  default: jt
}, [N]);
var Gh = { exports: {} }, Nt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var H0 = N;
function jh(t) {
  var e = "https://react.dev/errors/" + t;
  if (1 < arguments.length) {
    e += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var l = 2; l < arguments.length; l++)
      e += "&args[]=" + encodeURIComponent(arguments[l]);
  }
  return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function $e() {
}
var Ht = {
  d: {
    f: $e,
    r: function() {
      throw Error(jh(522));
    },
    D: $e,
    C: $e,
    L: $e,
    m: $e,
    X: $e,
    S: $e,
    M: $e
  },
  p: 0,
  findDOMNode: null
}, N0 = Symbol.for("react.portal");
function q0(t, e, l) {
  var u = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: N0,
    key: u == null ? null : "" + u,
    children: t,
    containerInfo: e,
    implementation: l
  };
}
var Na = H0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function Fi(t, e) {
  if (t === "font") return "";
  if (typeof e == "string")
    return e === "use-credentials" ? e : "";
}
Nt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Ht;
Nt.createPortal = function(t, e) {
  var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
    throw Error(jh(299));
  return q0(t, e, null, l);
};
Nt.flushSync = function(t) {
  var e = Na.T, l = Ht.p;
  try {
    if (Na.T = null, Ht.p = 2, t) return t();
  } finally {
    Na.T = e, Ht.p = l, Ht.d.f();
  }
};
Nt.preconnect = function(t, e) {
  typeof t == "string" && (e ? (e = e.crossOrigin, e = typeof e == "string" ? e === "use-credentials" ? e : "" : void 0) : e = null, Ht.d.C(t, e));
};
Nt.prefetchDNS = function(t) {
  typeof t == "string" && Ht.d.D(t);
};
Nt.preinit = function(t, e) {
  if (typeof t == "string" && e && typeof e.as == "string") {
    var l = e.as, u = Fi(l, e.crossOrigin), a = typeof e.integrity == "string" ? e.integrity : void 0, n = typeof e.fetchPriority == "string" ? e.fetchPriority : void 0;
    l === "style" ? Ht.d.S(
      t,
      typeof e.precedence == "string" ? e.precedence : void 0,
      {
        crossOrigin: u,
        integrity: a,
        fetchPriority: n
      }
    ) : l === "script" && Ht.d.X(t, {
      crossOrigin: u,
      integrity: a,
      fetchPriority: n,
      nonce: typeof e.nonce == "string" ? e.nonce : void 0
    });
  }
};
Nt.preinitModule = function(t, e) {
  if (typeof t == "string")
    if (typeof e == "object" && e !== null) {
      if (e.as == null || e.as === "script") {
        var l = Fi(
          e.as,
          e.crossOrigin
        );
        Ht.d.M(t, {
          crossOrigin: l,
          integrity: typeof e.integrity == "string" ? e.integrity : void 0,
          nonce: typeof e.nonce == "string" ? e.nonce : void 0
        });
      }
    } else e == null && Ht.d.M(t);
};
Nt.preload = function(t, e) {
  if (typeof t == "string" && typeof e == "object" && e !== null && typeof e.as == "string") {
    var l = e.as, u = Fi(l, e.crossOrigin);
    Ht.d.L(t, l, {
      crossOrigin: u,
      integrity: typeof e.integrity == "string" ? e.integrity : void 0,
      nonce: typeof e.nonce == "string" ? e.nonce : void 0,
      type: typeof e.type == "string" ? e.type : void 0,
      fetchPriority: typeof e.fetchPriority == "string" ? e.fetchPriority : void 0,
      referrerPolicy: typeof e.referrerPolicy == "string" ? e.referrerPolicy : void 0,
      imageSrcSet: typeof e.imageSrcSet == "string" ? e.imageSrcSet : void 0,
      imageSizes: typeof e.imageSizes == "string" ? e.imageSizes : void 0,
      media: typeof e.media == "string" ? e.media : void 0
    });
  }
};
Nt.preloadModule = function(t, e) {
  if (typeof t == "string")
    if (e) {
      var l = Fi(e.as, e.crossOrigin);
      Ht.d.m(t, {
        as: typeof e.as == "string" && e.as !== "script" ? e.as : void 0,
        crossOrigin: l,
        integrity: typeof e.integrity == "string" ? e.integrity : void 0
      });
    } else Ht.d.m(t);
};
Nt.requestFormReset = function(t) {
  Ht.d.r(t);
};
Nt.unstable_batchedUpdates = function(t, e) {
  return t(e);
};
Nt.useFormState = function(t, e, l) {
  return Na.H.useFormState(t, e, l);
};
Nt.useFormStatus = function() {
  return Na.H.useHostTransitionStatus();
};
Nt.version = "19.1.1";
function wh() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(wh);
    } catch (t) {
      console.error(t);
    }
}
wh(), Gh.exports = Nt;
var Cs = Gh.exports;
const x0 = /* @__PURE__ */ Rs(Cs), Xh = /* @__PURE__ */ Uh({
  __proto__: null,
  default: x0
}, [Cs]);
var Zh = { exports: {} }, Wi = {}, Lh = { exports: {} }, Kh = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(t) {
  function e(D, B) {
    var Y = D.length;
    D.push(B);
    t: for (; 0 < Y; ) {
      var ct = Y - 1 >>> 1, gt = D[ct];
      if (0 < a(gt, B))
        D[ct] = B, D[Y] = gt, Y = ct;
      else break t;
    }
  }
  function l(D) {
    return D.length === 0 ? null : D[0];
  }
  function u(D) {
    if (D.length === 0) return null;
    var B = D[0], Y = D.pop();
    if (Y !== B) {
      D[0] = Y;
      t: for (var ct = 0, gt = D.length, qn = gt >>> 1; ct < qn; ) {
        var xn = 2 * (ct + 1) - 1, Ec = D[xn], xl = xn + 1, Yn = D[xl];
        if (0 > a(Ec, Y))
          xl < gt && 0 > a(Yn, Ec) ? (D[ct] = Yn, D[xl] = Y, ct = xl) : (D[ct] = Ec, D[xn] = Y, ct = xn);
        else if (xl < gt && 0 > a(Yn, Y))
          D[ct] = Yn, D[xl] = Y, ct = xl;
        else break t;
      }
    }
    return B;
  }
  function a(D, B) {
    var Y = D.sortIndex - B.sortIndex;
    return Y !== 0 ? Y : D.id - B.id;
  }
  if (t.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
    var n = performance;
    t.unstable_now = function() {
      return n.now();
    };
  } else {
    var i = Date, c = i.now();
    t.unstable_now = function() {
      return i.now() - c;
    };
  }
  var f = [], o = [], g = 1, v = null, s = 3, y = !1, E = !1, b = !1, O = !1, d = typeof setTimeout == "function" ? setTimeout : null, h = typeof clearTimeout == "function" ? clearTimeout : null, m = typeof setImmediate < "u" ? setImmediate : null;
  function S(D) {
    for (var B = l(o); B !== null; ) {
      if (B.callback === null) u(o);
      else if (B.startTime <= D)
        u(o), B.sortIndex = B.expirationTime, e(f, B);
      else break;
      B = l(o);
    }
  }
  function T(D) {
    if (b = !1, S(D), !E)
      if (l(f) !== null)
        E = !0, z || (z = !0, zt());
      else {
        var B = l(o);
        B !== null && pc(T, B.startTime - D);
      }
  }
  var z = !1, M = -1, R = 5, H = -1;
  function U() {
    return O ? !0 : !(t.unstable_now() - H < R);
  }
  function rt() {
    if (O = !1, z) {
      var D = t.unstable_now();
      H = D;
      var B = !0;
      try {
        t: {
          E = !1, b && (b = !1, h(M), M = -1), y = !0;
          var Y = s;
          try {
            e: {
              for (S(D), v = l(f); v !== null && !(v.expirationTime > D && U()); ) {
                var ct = v.callback;
                if (typeof ct == "function") {
                  v.callback = null, s = v.priorityLevel;
                  var gt = ct(
                    v.expirationTime <= D
                  );
                  if (D = t.unstable_now(), typeof gt == "function") {
                    v.callback = gt, S(D), B = !0;
                    break e;
                  }
                  v === l(f) && u(f), S(D);
                } else u(f);
                v = l(f);
              }
              if (v !== null) B = !0;
              else {
                var qn = l(o);
                qn !== null && pc(
                  T,
                  qn.startTime - D
                ), B = !1;
              }
            }
            break t;
          } finally {
            v = null, s = Y, y = !1;
          }
          B = void 0;
        }
      } finally {
        B ? zt() : z = !1;
      }
    }
  }
  var zt;
  if (typeof m == "function")
    zt = function() {
      m(rt);
    };
  else if (typeof MessageChannel < "u") {
    var ql = new MessageChannel(), g0 = ql.port2;
    ql.port1.onmessage = rt, zt = function() {
      g0.postMessage(null);
    };
  } else
    zt = function() {
      d(rt, 0);
    };
  function pc(D, B) {
    M = d(function() {
      D(t.unstable_now());
    }, B);
  }
  t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(D) {
    D.callback = null;
  }, t.unstable_forceFrameRate = function(D) {
    0 > D || 125 < D ? console.error(
      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
    ) : R = 0 < D ? Math.floor(1e3 / D) : 5;
  }, t.unstable_getCurrentPriorityLevel = function() {
    return s;
  }, t.unstable_next = function(D) {
    switch (s) {
      case 1:
      case 2:
      case 3:
        var B = 3;
        break;
      default:
        B = s;
    }
    var Y = s;
    s = B;
    try {
      return D();
    } finally {
      s = Y;
    }
  }, t.unstable_requestPaint = function() {
    O = !0;
  }, t.unstable_runWithPriority = function(D, B) {
    switch (D) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        D = 3;
    }
    var Y = s;
    s = D;
    try {
      return B();
    } finally {
      s = Y;
    }
  }, t.unstable_scheduleCallback = function(D, B, Y) {
    var ct = t.unstable_now();
    switch (typeof Y == "object" && Y !== null ? (Y = Y.delay, Y = typeof Y == "number" && 0 < Y ? ct + Y : ct) : Y = ct, D) {
      case 1:
        var gt = -1;
        break;
      case 2:
        gt = 250;
        break;
      case 5:
        gt = 1073741823;
        break;
      case 4:
        gt = 1e4;
        break;
      default:
        gt = 5e3;
    }
    return gt = Y + gt, D = {
      id: g++,
      callback: B,
      priorityLevel: D,
      startTime: Y,
      expirationTime: gt,
      sortIndex: -1
    }, Y > ct ? (D.sortIndex = Y, e(o, D), l(f) === null && D === l(o) && (b ? (h(M), M = -1) : b = !0, pc(T, Y - ct))) : (D.sortIndex = gt, e(f, D), E || y || (E = !0, z || (z = !0, zt()))), D;
  }, t.unstable_shouldYield = U, t.unstable_wrapCallback = function(D) {
    var B = s;
    return function() {
      var Y = s;
      s = B;
      try {
        return D.apply(this, arguments);
      } finally {
        s = Y;
      }
    };
  };
})(Kh);
Lh.exports = Kh;
var Y0 = Lh.exports;
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mt = Y0, Vh = N, B0 = Cs;
function p(t) {
  var e = "https://react.dev/errors/" + t;
  if (1 < arguments.length) {
    e += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var l = 2; l < arguments.length; l++)
      e += "&args[]=" + encodeURIComponent(arguments[l]);
  }
  return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function Jh(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
}
function Sn(t) {
  var e = t, l = t;
  if (t.alternate) for (; e.return; ) e = e.return;
  else {
    t = e;
    do
      e = t, e.flags & 4098 && (l = e.return), t = e.return;
    while (t);
  }
  return e.tag === 3 ? l : null;
}
function $h(t) {
  if (t.tag === 13) {
    var e = t.memoizedState;
    if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
  }
  return null;
}
function Xr(t) {
  if (Sn(t) !== t)
    throw Error(p(188));
}
function G0(t) {
  var e = t.alternate;
  if (!e) {
    if (e = Sn(t), e === null) throw Error(p(188));
    return e !== t ? null : t;
  }
  for (var l = t, u = e; ; ) {
    var a = l.return;
    if (a === null) break;
    var n = a.alternate;
    if (n === null) {
      if (u = a.return, u !== null) {
        l = u;
        continue;
      }
      break;
    }
    if (a.child === n.child) {
      for (n = a.child; n; ) {
        if (n === l) return Xr(a), t;
        if (n === u) return Xr(a), e;
        n = n.sibling;
      }
      throw Error(p(188));
    }
    if (l.return !== u.return) l = a, u = n;
    else {
      for (var i = !1, c = a.child; c; ) {
        if (c === l) {
          i = !0, l = a, u = n;
          break;
        }
        if (c === u) {
          i = !0, u = a, l = n;
          break;
        }
        c = c.sibling;
      }
      if (!i) {
        for (c = n.child; c; ) {
          if (c === l) {
            i = !0, l = n, u = a;
            break;
          }
          if (c === u) {
            i = !0, u = n, l = a;
            break;
          }
          c = c.sibling;
        }
        if (!i) throw Error(p(189));
      }
    }
    if (l.alternate !== u) throw Error(p(190));
  }
  if (l.tag !== 3) throw Error(p(188));
  return l.stateNode.current === l ? t : e;
}
function Fh(t) {
  var e = t.tag;
  if (e === 5 || e === 26 || e === 27 || e === 6) return t;
  for (t = t.child; t !== null; ) {
    if (e = Fh(t), e !== null) return e;
    t = t.sibling;
  }
  return null;
}
var I = Object.assign, j0 = Symbol.for("react.element"), jn = Symbol.for("react.transitional.element"), za = Symbol.for("react.portal"), Su = Symbol.for("react.fragment"), Wh = Symbol.for("react.strict_mode"), cf = Symbol.for("react.profiler"), w0 = Symbol.for("react.provider"), kh = Symbol.for("react.consumer"), qe = Symbol.for("react.context"), Hs = Symbol.for("react.forward_ref"), ff = Symbol.for("react.suspense"), sf = Symbol.for("react.suspense_list"), Ns = Symbol.for("react.memo"), Pe = Symbol.for("react.lazy"), rf = Symbol.for("react.activity"), X0 = Symbol.for("react.memo_cache_sentinel"), Zr = Symbol.iterator;
function Ea(t) {
  return t === null || typeof t != "object" ? null : (t = Zr && t[Zr] || t["@@iterator"], typeof t == "function" ? t : null);
}
var Z0 = Symbol.for("react.client.reference");
function of(t) {
  if (t == null) return null;
  if (typeof t == "function")
    return t.$$typeof === Z0 ? null : t.displayName || t.name || null;
  if (typeof t == "string") return t;
  switch (t) {
    case Su:
      return "Fragment";
    case cf:
      return "Profiler";
    case Wh:
      return "StrictMode";
    case ff:
      return "Suspense";
    case sf:
      return "SuspenseList";
    case rf:
      return "Activity";
  }
  if (typeof t == "object")
    switch (t.$$typeof) {
      case za:
        return "Portal";
      case qe:
        return (t.displayName || "Context") + ".Provider";
      case kh:
        return (t._context.displayName || "Context") + ".Consumer";
      case Hs:
        var e = t.render;
        return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
      case Ns:
        return e = t.displayName || null, e !== null ? e : of(t.type) || "Memo";
      case Pe:
        e = t._payload, t = t._init;
        try {
          return of(t(e));
        } catch {
        }
    }
  return null;
}
var Ua = Array.isArray, C = Vh.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = B0.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Wl = {
  pending: !1,
  data: null,
  method: null,
  action: null
}, hf = [], bu = -1;
function Re(t) {
  return { current: t };
}
function Et(t) {
  0 > bu || (t.current = hf[bu], hf[bu] = null, bu--);
}
function lt(t, e) {
  bu++, hf[bu] = t.current, t.current = e;
}
var Te = Re(null), Fa = Re(null), bl = Re(null), mi = Re(null);
function gi(t, e) {
  switch (lt(bl, e), lt(Fa, t), lt(Te, null), e.nodeType) {
    case 9:
    case 11:
      t = (t = e.documentElement) && (t = t.namespaceURI) ? Fo(t) : 0;
      break;
    default:
      if (t = e.tagName, e = e.namespaceURI)
        e = Fo(e), t = yv(e, t);
      else
        switch (t) {
          case "svg":
            t = 1;
            break;
          case "math":
            t = 2;
            break;
          default:
            t = 0;
        }
  }
  Et(Te), lt(Te, t);
}
function Iu() {
  Et(Te), Et(Fa), Et(bl);
}
function df(t) {
  t.memoizedState !== null && lt(mi, t);
  var e = Te.current, l = yv(e, t.type);
  e !== l && (lt(Fa, t), lt(Te, l));
}
function Si(t) {
  Fa.current === t && (Et(Te), Et(Fa)), mi.current === t && (Et(mi), nn._currentValue = Wl);
}
var yf = Object.prototype.hasOwnProperty, qs = mt.unstable_scheduleCallback, Ac = mt.unstable_cancelCallback, L0 = mt.unstable_shouldYield, K0 = mt.unstable_requestPaint, Ae = mt.unstable_now, V0 = mt.unstable_getCurrentPriorityLevel, Ph = mt.unstable_ImmediatePriority, Ih = mt.unstable_UserBlockingPriority, bi = mt.unstable_NormalPriority, J0 = mt.unstable_LowPriority, td = mt.unstable_IdlePriority, $0 = mt.log, F0 = mt.unstable_setDisableYieldValue, bn = null, Jt = null;
function vl(t) {
  if (typeof $0 == "function" && F0(t), Jt && typeof Jt.setStrictMode == "function")
    try {
      Jt.setStrictMode(bn, t);
    } catch {
    }
}
var $t = Math.clz32 ? Math.clz32 : P0, W0 = Math.log, k0 = Math.LN2;
function P0(t) {
  return t >>>= 0, t === 0 ? 32 : 31 - (W0(t) / k0 | 0) | 0;
}
var wn = 256, Xn = 4194304;
function Bl(t) {
  var e = t & 42;
  if (e !== 0) return e;
  switch (t & -t) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
      return 128;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t & 4194048;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return t & 62914560;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return t;
  }
}
function ki(t, e, l) {
  var u = t.pendingLanes;
  if (u === 0) return 0;
  var a = 0, n = t.suspendedLanes, i = t.pingedLanes;
  t = t.warmLanes;
  var c = u & 134217727;
  return c !== 0 ? (u = c & ~n, u !== 0 ? a = Bl(u) : (i &= c, i !== 0 ? a = Bl(i) : l || (l = c & ~t, l !== 0 && (a = Bl(l))))) : (c = u & ~n, c !== 0 ? a = Bl(c) : i !== 0 ? a = Bl(i) : l || (l = u & ~t, l !== 0 && (a = Bl(l)))), a === 0 ? 0 : e !== 0 && e !== a && !(e & n) && (n = a & -a, l = e & -e, n >= l || n === 32 && (l & 4194048) !== 0) ? e : a;
}
function pn(t, e) {
  return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
}
function I0(t, e) {
  switch (t) {
    case 1:
    case 2:
    case 4:
    case 8:
    case 64:
      return e + 250;
    case 16:
    case 32:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return -1;
    case 67108864:
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function ed() {
  var t = wn;
  return wn <<= 1, !(wn & 4194048) && (wn = 256), t;
}
function ld() {
  var t = Xn;
  return Xn <<= 1, !(Xn & 62914560) && (Xn = 4194304), t;
}
function Mc(t) {
  for (var e = [], l = 0; 31 > l; l++) e.push(t);
  return e;
}
function En(t, e) {
  t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
}
function tm(t, e, l, u, a, n) {
  var i = t.pendingLanes;
  t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
  var c = t.entanglements, f = t.expirationTimes, o = t.hiddenUpdates;
  for (l = i & ~l; 0 < l; ) {
    var g = 31 - $t(l), v = 1 << g;
    c[g] = 0, f[g] = -1;
    var s = o[g];
    if (s !== null)
      for (o[g] = null, g = 0; g < s.length; g++) {
        var y = s[g];
        y !== null && (y.lane &= -536870913);
      }
    l &= ~v;
  }
  u !== 0 && ud(t, u, 0), n !== 0 && a === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(i & ~e));
}
function ud(t, e, l) {
  t.pendingLanes |= e, t.suspendedLanes &= ~e;
  var u = 31 - $t(e);
  t.entangledLanes |= e, t.entanglements[u] = t.entanglements[u] | 1073741824 | l & 4194090;
}
function ad(t, e) {
  var l = t.entangledLanes |= e;
  for (t = t.entanglements; l; ) {
    var u = 31 - $t(l), a = 1 << u;
    a & e | t[u] & e && (t[u] |= e), l &= ~a;
  }
}
function xs(t) {
  switch (t) {
    case 2:
      t = 1;
      break;
    case 8:
      t = 4;
      break;
    case 32:
      t = 16;
      break;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      t = 128;
      break;
    case 268435456:
      t = 134217728;
      break;
    default:
      t = 0;
  }
  return t;
}
function Ys(t) {
  return t &= -t, 2 < t ? 8 < t ? t & 134217727 ? 32 : 268435456 : 8 : 2;
}
function nd() {
  var t = L.p;
  return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Av(t.type));
}
function em(t, e) {
  var l = L.p;
  try {
    return L.p = t, e();
  } finally {
    L.p = l;
  }
}
var Hl = Math.random().toString(36).slice(2), Dt = "__reactFiber$" + Hl, wt = "__reactProps$" + Hl, da = "__reactContainer$" + Hl, vf = "__reactEvents$" + Hl, lm = "__reactListeners$" + Hl, um = "__reactHandles$" + Hl, Lr = "__reactResources$" + Hl, On = "__reactMarker$" + Hl;
function Bs(t) {
  delete t[Dt], delete t[wt], delete t[vf], delete t[lm], delete t[um];
}
function pu(t) {
  var e = t[Dt];
  if (e) return e;
  for (var l = t.parentNode; l; ) {
    if (e = l[da] || l[Dt]) {
      if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
        for (t = Po(t); t !== null; ) {
          if (l = t[Dt]) return l;
          t = Po(t);
        }
      return e;
    }
    t = l, l = t.parentNode;
  }
  return null;
}
function ya(t) {
  if (t = t[Dt] || t[da]) {
    var e = t.tag;
    if (e === 5 || e === 6 || e === 13 || e === 26 || e === 27 || e === 3)
      return t;
  }
  return null;
}
function Qa(t) {
  var e = t.tag;
  if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
  throw Error(p(33));
}
function Uu(t) {
  var e = t[Lr];
  return e || (e = t[Lr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
}
function bt(t) {
  t[On] = !0;
}
var id = /* @__PURE__ */ new Set(), cd = {};
function cu(t, e) {
  ta(t, e), ta(t + "Capture", e);
}
function ta(t, e) {
  for (cd[t] = e, t = 0; t < e.length; t++)
    id.add(e[t]);
}
var am = RegExp(
  "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
), Kr = {}, Vr = {};
function nm(t) {
  return yf.call(Vr, t) ? !0 : yf.call(Kr, t) ? !1 : am.test(t) ? Vr[t] = !0 : (Kr[t] = !0, !1);
}
function ei(t, e, l) {
  if (nm(e))
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
          t.removeAttribute(e);
          return;
        case "boolean":
          var u = e.toLowerCase().slice(0, 5);
          if (u !== "data-" && u !== "aria-") {
            t.removeAttribute(e);
            return;
          }
      }
      t.setAttribute(e, "" + l);
    }
}
function Zn(t, e, l) {
  if (l === null) t.removeAttribute(e);
  else {
    switch (typeof l) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        t.removeAttribute(e);
        return;
    }
    t.setAttribute(e, "" + l);
  }
}
function _e(t, e, l, u) {
  if (u === null) t.removeAttribute(l);
  else {
    switch (typeof u) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        t.removeAttribute(l);
        return;
    }
    t.setAttributeNS(e, l, "" + u);
  }
}
var Rc, Jr;
function vu(t) {
  if (Rc === void 0)
    try {
      throw Error();
    } catch (l) {
      var e = l.stack.trim().match(/\n( *(at )?)/);
      Rc = e && e[1] || "", Jr = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
  return `
` + Rc + t + Jr;
}
var Dc = !1;
function _c(t, e) {
  if (!t || Dc) return "";
  Dc = !0;
  var l = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var u = {
      DetermineComponentFrameRoot: function() {
        try {
          if (e) {
            var v = function() {
              throw Error();
            };
            if (Object.defineProperty(v.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(v, []);
              } catch (y) {
                var s = y;
              }
              Reflect.construct(t, [], v);
            } else {
              try {
                v.call();
              } catch (y) {
                s = y;
              }
              t.call(v.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (y) {
              s = y;
            }
            (v = t()) && typeof v.catch == "function" && v.catch(function() {
            });
          }
        } catch (y) {
          if (y && s && typeof y.stack == "string")
            return [y.stack, s.stack];
        }
        return [null, null];
      }
    };
    u.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var a = Object.getOwnPropertyDescriptor(
      u.DetermineComponentFrameRoot,
      "name"
    );
    a && a.configurable && Object.defineProperty(
      u.DetermineComponentFrameRoot,
      "name",
      { value: "DetermineComponentFrameRoot" }
    );
    var n = u.DetermineComponentFrameRoot(), i = n[0], c = n[1];
    if (i && c) {
      var f = i.split(`
`), o = c.split(`
`);
      for (a = u = 0; u < f.length && !f[u].includes("DetermineComponentFrameRoot"); )
        u++;
      for (; a < o.length && !o[a].includes(
        "DetermineComponentFrameRoot"
      ); )
        a++;
      if (u === f.length || a === o.length)
        for (u = f.length - 1, a = o.length - 1; 1 <= u && 0 <= a && f[u] !== o[a]; )
          a--;
      for (; 1 <= u && 0 <= a; u--, a--)
        if (f[u] !== o[a]) {
          if (u !== 1 || a !== 1)
            do
              if (u--, a--, 0 > a || f[u] !== o[a]) {
                var g = `
` + f[u].replace(" at new ", " at ");
                return t.displayName && g.includes("<anonymous>") && (g = g.replace("<anonymous>", t.displayName)), g;
              }
            while (1 <= u && 0 <= a);
          break;
        }
    }
  } finally {
    Dc = !1, Error.prepareStackTrace = l;
  }
  return (l = t ? t.displayName || t.name : "") ? vu(l) : "";
}
function im(t) {
  switch (t.tag) {
    case 26:
    case 27:
    case 5:
      return vu(t.type);
    case 16:
      return vu("Lazy");
    case 13:
      return vu("Suspense");
    case 19:
      return vu("SuspenseList");
    case 0:
    case 15:
      return _c(t.type, !1);
    case 11:
      return _c(t.type.render, !1);
    case 1:
      return _c(t.type, !0);
    case 31:
      return vu("Activity");
    default:
      return "";
  }
}
function $r(t) {
  try {
    var e = "";
    do
      e += im(t), t = t.return;
    while (t);
    return e;
  } catch (l) {
    return `
Error generating stack: ` + l.message + `
` + l.stack;
  }
}
function ue(t) {
  switch (typeof t) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return t;
    case "object":
      return t;
    default:
      return "";
  }
}
function fd(t) {
  var e = t.type;
  return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
}
function cm(t) {
  var e = fd(t) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(
    t.constructor.prototype,
    e
  ), u = "" + t[e];
  if (!t.hasOwnProperty(e) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
    var a = l.get, n = l.set;
    return Object.defineProperty(t, e, {
      configurable: !0,
      get: function() {
        return a.call(this);
      },
      set: function(i) {
        u = "" + i, n.call(this, i);
      }
    }), Object.defineProperty(t, e, {
      enumerable: l.enumerable
    }), {
      getValue: function() {
        return u;
      },
      setValue: function(i) {
        u = "" + i;
      },
      stopTracking: function() {
        t._valueTracker = null, delete t[e];
      }
    };
  }
}
function pi(t) {
  t._valueTracker || (t._valueTracker = cm(t));
}
function sd(t) {
  if (!t) return !1;
  var e = t._valueTracker;
  if (!e) return !0;
  var l = e.getValue(), u = "";
  return t && (u = fd(t) ? t.checked ? "true" : "false" : t.value), t = u, t !== l ? (e.setValue(t), !0) : !1;
}
function Ei(t) {
  if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
  try {
    return t.activeElement || t.body;
  } catch {
    return t.body;
  }
}
var fm = /[\n"\\]/g;
function ie(t) {
  return t.replace(
    fm,
    function(e) {
      return "\\" + e.charCodeAt(0).toString(16) + " ";
    }
  );
}
function mf(t, e, l, u, a, n, i, c) {
  t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), e != null ? i === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + ue(e)) : t.value !== "" + ue(e) && (t.value = "" + ue(e)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), e != null ? gf(t, i, ue(e)) : l != null ? gf(t, i, ue(l)) : u != null && t.removeAttribute("value"), a == null && n != null && (t.defaultChecked = !!n), a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.name = "" + ue(c) : t.removeAttribute("name");
}
function rd(t, e, l, u, a, n, i, c) {
  if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (t.type = n), e != null || l != null) {
    if (!(n !== "submit" && n !== "reset" || e != null))
      return;
    l = l != null ? "" + ue(l) : "", e = e != null ? "" + ue(e) : l, c || e === t.value || (t.value = e), t.defaultValue = e;
  }
  u = u ?? a, u = typeof u != "function" && typeof u != "symbol" && !!u, t.checked = c ? t.checked : !!u, t.defaultChecked = !!u, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i);
}
function gf(t, e, l) {
  e === "number" && Ei(t.ownerDocument) === t || t.defaultValue === "" + l || (t.defaultValue = "" + l);
}
function Qu(t, e, l, u) {
  if (t = t.options, e) {
    e = {};
    for (var a = 0; a < l.length; a++)
      e["$" + l[a]] = !0;
    for (l = 0; l < t.length; l++)
      a = e.hasOwnProperty("$" + t[l].value), t[l].selected !== a && (t[l].selected = a), a && u && (t[l].defaultSelected = !0);
  } else {
    for (l = "" + ue(l), e = null, a = 0; a < t.length; a++) {
      if (t[a].value === l) {
        t[a].selected = !0, u && (t[a].defaultSelected = !0);
        return;
      }
      e !== null || t[a].disabled || (e = t[a]);
    }
    e !== null && (e.selected = !0);
  }
}
function od(t, e, l) {
  if (e != null && (e = "" + ue(e), e !== t.value && (t.value = e), l == null)) {
    t.defaultValue !== e && (t.defaultValue = e);
    return;
  }
  t.defaultValue = l != null ? "" + ue(l) : "";
}
function hd(t, e, l, u) {
  if (e == null) {
    if (u != null) {
      if (l != null) throw Error(p(92));
      if (Ua(u)) {
        if (1 < u.length) throw Error(p(93));
        u = u[0];
      }
      l = u;
    }
    l == null && (l = ""), e = l;
  }
  l = ue(e), t.defaultValue = l, u = t.textContent, u === l && u !== "" && u !== null && (t.value = u);
}
function ea(t, e) {
  if (e) {
    var l = t.firstChild;
    if (l && l === t.lastChild && l.nodeType === 3) {
      l.nodeValue = e;
      return;
    }
  }
  t.textContent = e;
}
var sm = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " "
  )
);
function Fr(t, e, l) {
  var u = e.indexOf("--") === 0;
  l == null || typeof l == "boolean" || l === "" ? u ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : u ? t.setProperty(e, l) : typeof l != "number" || l === 0 || sm.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
}
function dd(t, e, l) {
  if (e != null && typeof e != "object")
    throw Error(p(62));
  if (t = t.style, l != null) {
    for (var u in l)
      !l.hasOwnProperty(u) || e != null && e.hasOwnProperty(u) || (u.indexOf("--") === 0 ? t.setProperty(u, "") : u === "float" ? t.cssFloat = "" : t[u] = "");
    for (var a in e)
      u = e[a], e.hasOwnProperty(a) && l[a] !== u && Fr(t, a, u);
  } else
    for (var n in e)
      e.hasOwnProperty(n) && Fr(t, n, e[n]);
}
function Gs(t) {
  if (t.indexOf("-") === -1) return !1;
  switch (t) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var rm = /* @__PURE__ */ new Map([
  ["acceptCharset", "accept-charset"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
  ["crossOrigin", "crossorigin"],
  ["accentHeight", "accent-height"],
  ["alignmentBaseline", "alignment-baseline"],
  ["arabicForm", "arabic-form"],
  ["baselineShift", "baseline-shift"],
  ["capHeight", "cap-height"],
  ["clipPath", "clip-path"],
  ["clipRule", "clip-rule"],
  ["colorInterpolation", "color-interpolation"],
  ["colorInterpolationFilters", "color-interpolation-filters"],
  ["colorProfile", "color-profile"],
  ["colorRendering", "color-rendering"],
  ["dominantBaseline", "dominant-baseline"],
  ["enableBackground", "enable-background"],
  ["fillOpacity", "fill-opacity"],
  ["fillRule", "fill-rule"],
  ["floodColor", "flood-color"],
  ["floodOpacity", "flood-opacity"],
  ["fontFamily", "font-family"],
  ["fontSize", "font-size"],
  ["fontSizeAdjust", "font-size-adjust"],
  ["fontStretch", "font-stretch"],
  ["fontStyle", "font-style"],
  ["fontVariant", "font-variant"],
  ["fontWeight", "font-weight"],
  ["glyphName", "glyph-name"],
  ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
  ["glyphOrientationVertical", "glyph-orientation-vertical"],
  ["horizAdvX", "horiz-adv-x"],
  ["horizOriginX", "horiz-origin-x"],
  ["imageRendering", "image-rendering"],
  ["letterSpacing", "letter-spacing"],
  ["lightingColor", "lighting-color"],
  ["markerEnd", "marker-end"],
  ["markerMid", "marker-mid"],
  ["markerStart", "marker-start"],
  ["overlinePosition", "overline-position"],
  ["overlineThickness", "overline-thickness"],
  ["paintOrder", "paint-order"],
  ["panose-1", "panose-1"],
  ["pointerEvents", "pointer-events"],
  ["renderingIntent", "rendering-intent"],
  ["shapeRendering", "shape-rendering"],
  ["stopColor", "stop-color"],
  ["stopOpacity", "stop-opacity"],
  ["strikethroughPosition", "strikethrough-position"],
  ["strikethroughThickness", "strikethrough-thickness"],
  ["strokeDasharray", "stroke-dasharray"],
  ["strokeDashoffset", "stroke-dashoffset"],
  ["strokeLinecap", "stroke-linecap"],
  ["strokeLinejoin", "stroke-linejoin"],
  ["strokeMiterlimit", "stroke-miterlimit"],
  ["strokeOpacity", "stroke-opacity"],
  ["strokeWidth", "stroke-width"],
  ["textAnchor", "text-anchor"],
  ["textDecoration", "text-decoration"],
  ["textRendering", "text-rendering"],
  ["transformOrigin", "transform-origin"],
  ["underlinePosition", "underline-position"],
  ["underlineThickness", "underline-thickness"],
  ["unicodeBidi", "unicode-bidi"],
  ["unicodeRange", "unicode-range"],
  ["unitsPerEm", "units-per-em"],
  ["vAlphabetic", "v-alphabetic"],
  ["vHanging", "v-hanging"],
  ["vIdeographic", "v-ideographic"],
  ["vMathematical", "v-mathematical"],
  ["vectorEffect", "vector-effect"],
  ["vertAdvY", "vert-adv-y"],
  ["vertOriginX", "vert-origin-x"],
  ["vertOriginY", "vert-origin-y"],
  ["wordSpacing", "word-spacing"],
  ["writingMode", "writing-mode"],
  ["xmlnsXlink", "xmlns:xlink"],
  ["xHeight", "x-height"]
]), om = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function li(t) {
  return om.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
}
var Sf = null;
function js(t) {
  return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
}
var Eu = null, Cu = null;
function Wr(t) {
  var e = ya(t);
  if (e && (t = e.stateNode)) {
    var l = t[wt] || null;
    t: switch (t = e.stateNode, e.type) {
      case "input":
        if (mf(
          t,
          l.value,
          l.defaultValue,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name
        ), e = l.name, l.type === "radio" && e != null) {
          for (l = t; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll(
            'input[name="' + ie(
              "" + e
            ) + '"][type="radio"]'
          ), e = 0; e < l.length; e++) {
            var u = l[e];
            if (u !== t && u.form === t.form) {
              var a = u[wt] || null;
              if (!a) throw Error(p(90));
              mf(
                u,
                a.value,
                a.defaultValue,
                a.defaultValue,
                a.checked,
                a.defaultChecked,
                a.type,
                a.name
              );
            }
          }
          for (e = 0; e < l.length; e++)
            u = l[e], u.form === t.form && sd(u);
        }
        break t;
      case "textarea":
        od(t, l.value, l.defaultValue);
        break t;
      case "select":
        e = l.value, e != null && Qu(t, !!l.multiple, e, !1);
    }
  }
}
var zc = !1;
function yd(t, e, l) {
  if (zc) return t(e, l);
  zc = !0;
  try {
    var u = t(e);
    return u;
  } finally {
    if (zc = !1, (Eu !== null || Cu !== null) && (cc(), Eu && (e = Eu, t = Cu, Cu = Eu = null, Wr(e), t)))
      for (e = 0; e < t.length; e++) Wr(t[e]);
  }
}
function Wa(t, e) {
  var l = t.stateNode;
  if (l === null) return null;
  var u = l[wt] || null;
  if (u === null) return null;
  l = u[e];
  t: switch (e) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (u = !u.disabled) || (t = t.type, u = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !u;
      break t;
    default:
      t = !1;
  }
  if (t) return null;
  if (l && typeof l != "function")
    throw Error(
      p(231, e, typeof l)
    );
  return l;
}
var Ze = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), bf = !1;
if (Ze)
  try {
    var Oa = {};
    Object.defineProperty(Oa, "passive", {
      get: function() {
        bf = !0;
      }
    }), window.addEventListener("test", Oa, Oa), window.removeEventListener("test", Oa, Oa);
  } catch {
    bf = !1;
  }
var ml = null, ws = null, ui = null;
function vd() {
  if (ui) return ui;
  var t, e = ws, l = e.length, u, a = "value" in ml ? ml.value : ml.textContent, n = a.length;
  for (t = 0; t < l && e[t] === a[t]; t++) ;
  var i = l - t;
  for (u = 1; u <= i && e[l - u] === a[n - u]; u++) ;
  return ui = a.slice(t, 1 < u ? 1 - u : void 0);
}
function ai(t) {
  var e = t.keyCode;
  return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
}
function Ln() {
  return !0;
}
function kr() {
  return !1;
}
function Xt(t) {
  function e(l, u, a, n, i) {
    this._reactName = l, this._targetInst = a, this.type = u, this.nativeEvent = n, this.target = i, this.currentTarget = null;
    for (var c in t)
      t.hasOwnProperty(c) && (l = t[c], this[c] = l ? l(n) : n[c]);
    return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Ln : kr, this.isPropagationStopped = kr, this;
  }
  return I(e.prototype, {
    preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Ln);
    },
    stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Ln);
    },
    persist: function() {
    },
    isPersistent: Ln
  }), e;
}
var fu = {
  eventPhase: 0,
  bubbles: 0,
  cancelable: 0,
  timeStamp: function(t) {
    return t.timeStamp || Date.now();
  },
  defaultPrevented: 0,
  isTrusted: 0
}, Pi = Xt(fu), Tn = I({}, fu, { view: 0, detail: 0 }), hm = Xt(Tn), Uc, Qc, Ta, Ii = I({}, Tn, {
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  getModifierState: Xs,
  button: 0,
  buttons: 0,
  relatedTarget: function(t) {
    return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
  },
  movementX: function(t) {
    return "movementX" in t ? t.movementX : (t !== Ta && (Ta && t.type === "mousemove" ? (Uc = t.screenX - Ta.screenX, Qc = t.screenY - Ta.screenY) : Qc = Uc = 0, Ta = t), Uc);
  },
  movementY: function(t) {
    return "movementY" in t ? t.movementY : Qc;
  }
}), Pr = Xt(Ii), dm = I({}, Ii, { dataTransfer: 0 }), ym = Xt(dm), vm = I({}, Tn, { relatedTarget: 0 }), Cc = Xt(vm), mm = I({}, fu, {
  animationName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), gm = Xt(mm), Sm = I({}, fu, {
  clipboardData: function(t) {
    return "clipboardData" in t ? t.clipboardData : window.clipboardData;
  }
}), bm = Xt(Sm), pm = I({}, fu, { data: 0 }), Ir = Xt(pm), Em = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Om = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Tm = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};
function Am(t) {
  var e = this.nativeEvent;
  return e.getModifierState ? e.getModifierState(t) : (t = Tm[t]) ? !!e[t] : !1;
}
function Xs() {
  return Am;
}
var Mm = I({}, Tn, {
  key: function(t) {
    if (t.key) {
      var e = Em[t.key] || t.key;
      if (e !== "Unidentified") return e;
    }
    return t.type === "keypress" ? (t = ai(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Om[t.keyCode] || "Unidentified" : "";
  },
  code: 0,
  location: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  repeat: 0,
  locale: 0,
  getModifierState: Xs,
  charCode: function(t) {
    return t.type === "keypress" ? ai(t) : 0;
  },
  keyCode: function(t) {
    return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
  },
  which: function(t) {
    return t.type === "keypress" ? ai(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
  }
}), Rm = Xt(Mm), Dm = I({}, Ii, {
  pointerId: 0,
  width: 0,
  height: 0,
  pressure: 0,
  tangentialPressure: 0,
  tiltX: 0,
  tiltY: 0,
  twist: 0,
  pointerType: 0,
  isPrimary: 0
}), to = Xt(Dm), _m = I({}, Tn, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: Xs
}), zm = Xt(_m), Um = I({}, fu, {
  propertyName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), Qm = Xt(Um), Cm = I({}, Ii, {
  deltaX: function(t) {
    return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
  },
  deltaY: function(t) {
    return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Hm = Xt(Cm), Nm = I({}, fu, {
  newState: 0,
  oldState: 0
}), qm = Xt(Nm), xm = [9, 13, 27, 32], Zs = Ze && "CompositionEvent" in window, qa = null;
Ze && "documentMode" in document && (qa = document.documentMode);
var Ym = Ze && "TextEvent" in window && !qa, md = Ze && (!Zs || qa && 8 < qa && 11 >= qa), eo = " ", lo = !1;
function gd(t, e) {
  switch (t) {
    case "keyup":
      return xm.indexOf(e.keyCode) !== -1;
    case "keydown":
      return e.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Sd(t) {
  return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
}
var Ou = !1;
function Bm(t, e) {
  switch (t) {
    case "compositionend":
      return Sd(e);
    case "keypress":
      return e.which !== 32 ? null : (lo = !0, eo);
    case "textInput":
      return t = e.data, t === eo && lo ? null : t;
    default:
      return null;
  }
}
function Gm(t, e) {
  if (Ou)
    return t === "compositionend" || !Zs && gd(t, e) ? (t = vd(), ui = ws = ml = null, Ou = !1, t) : null;
  switch (t) {
    case "paste":
      return null;
    case "keypress":
      if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
        if (e.char && 1 < e.char.length)
          return e.char;
        if (e.which) return String.fromCharCode(e.which);
      }
      return null;
    case "compositionend":
      return md && e.locale !== "ko" ? null : e.data;
    default:
      return null;
  }
}
var jm = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};
function uo(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e === "input" ? !!jm[t.type] : e === "textarea";
}
function bd(t, e, l, u) {
  Eu ? Cu ? Cu.push(u) : Cu = [u] : Eu = u, e = Gi(e, "onChange"), 0 < e.length && (l = new Pi(
    "onChange",
    "change",
    null,
    l,
    u
  ), t.push({ event: l, listeners: e }));
}
var xa = null, ka = null;
function wm(t) {
  ov(t, 0);
}
function tc(t) {
  var e = Qa(t);
  if (sd(e)) return t;
}
function ao(t, e) {
  if (t === "change") return e;
}
var pd = !1;
if (Ze) {
  var Hc;
  if (Ze) {
    var Nc = "oninput" in document;
    if (!Nc) {
      var no = document.createElement("div");
      no.setAttribute("oninput", "return;"), Nc = typeof no.oninput == "function";
    }
    Hc = Nc;
  } else Hc = !1;
  pd = Hc && (!document.documentMode || 9 < document.documentMode);
}
function io() {
  xa && (xa.detachEvent("onpropertychange", Ed), ka = xa = null);
}
function Ed(t) {
  if (t.propertyName === "value" && tc(ka)) {
    var e = [];
    bd(
      e,
      ka,
      t,
      js(t)
    ), yd(wm, e);
  }
}
function Xm(t, e, l) {
  t === "focusin" ? (io(), xa = e, ka = l, xa.attachEvent("onpropertychange", Ed)) : t === "focusout" && io();
}
function Zm(t) {
  if (t === "selectionchange" || t === "keyup" || t === "keydown")
    return tc(ka);
}
function Lm(t, e) {
  if (t === "click") return tc(e);
}
function Km(t, e) {
  if (t === "input" || t === "change")
    return tc(e);
}
function Vm(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var kt = typeof Object.is == "function" ? Object.is : Vm;
function Pa(t, e) {
  if (kt(t, e)) return !0;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null)
    return !1;
  var l = Object.keys(t), u = Object.keys(e);
  if (l.length !== u.length) return !1;
  for (u = 0; u < l.length; u++) {
    var a = l[u];
    if (!yf.call(e, a) || !kt(t[a], e[a]))
      return !1;
  }
  return !0;
}
function co(t) {
  for (; t && t.firstChild; ) t = t.firstChild;
  return t;
}
function fo(t, e) {
  var l = co(t);
  t = 0;
  for (var u; l; ) {
    if (l.nodeType === 3) {
      if (u = t + l.textContent.length, t <= e && u >= e)
        return { node: l, offset: e - t };
      t = u;
    }
    t: {
      for (; l; ) {
        if (l.nextSibling) {
          l = l.nextSibling;
          break t;
        }
        l = l.parentNode;
      }
      l = void 0;
    }
    l = co(l);
  }
}
function Od(t, e) {
  return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Od(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
}
function Td(t) {
  t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
  for (var e = Ei(t.document); e instanceof t.HTMLIFrameElement; ) {
    try {
      var l = typeof e.contentWindow.location.href == "string";
    } catch {
      l = !1;
    }
    if (l) t = e.contentWindow;
    else break;
    e = Ei(t.document);
  }
  return e;
}
function Ls(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
}
var Jm = Ze && "documentMode" in document && 11 >= document.documentMode, Tu = null, pf = null, Ya = null, Ef = !1;
function so(t, e, l) {
  var u = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
  Ef || Tu == null || Tu !== Ei(u) || (u = Tu, "selectionStart" in u && Ls(u) ? u = { start: u.selectionStart, end: u.selectionEnd } : (u = (u.ownerDocument && u.ownerDocument.defaultView || window).getSelection(), u = {
    anchorNode: u.anchorNode,
    anchorOffset: u.anchorOffset,
    focusNode: u.focusNode,
    focusOffset: u.focusOffset
  }), Ya && Pa(Ya, u) || (Ya = u, u = Gi(pf, "onSelect"), 0 < u.length && (e = new Pi(
    "onSelect",
    "select",
    null,
    e,
    l
  ), t.push({ event: e, listeners: u }), e.target = Tu)));
}
function Yl(t, e) {
  var l = {};
  return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
}
var Au = {
  animationend: Yl("Animation", "AnimationEnd"),
  animationiteration: Yl("Animation", "AnimationIteration"),
  animationstart: Yl("Animation", "AnimationStart"),
  transitionrun: Yl("Transition", "TransitionRun"),
  transitionstart: Yl("Transition", "TransitionStart"),
  transitioncancel: Yl("Transition", "TransitionCancel"),
  transitionend: Yl("Transition", "TransitionEnd")
}, qc = {}, Ad = {};
Ze && (Ad = document.createElement("div").style, "AnimationEvent" in window || (delete Au.animationend.animation, delete Au.animationiteration.animation, delete Au.animationstart.animation), "TransitionEvent" in window || delete Au.transitionend.transition);
function su(t) {
  if (qc[t]) return qc[t];
  if (!Au[t]) return t;
  var e = Au[t], l;
  for (l in e)
    if (e.hasOwnProperty(l) && l in Ad)
      return qc[t] = e[l];
  return t;
}
var Md = su("animationend"), Rd = su("animationiteration"), Dd = su("animationstart"), $m = su("transitionrun"), Fm = su("transitionstart"), Wm = su("transitioncancel"), _d = su("transitionend"), zd = /* @__PURE__ */ new Map(), Of = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
  " "
);
Of.push("scrollEnd");
function ve(t, e) {
  zd.set(t, e), cu(e, [t]);
}
var ro = /* @__PURE__ */ new WeakMap();
function ce(t, e) {
  if (typeof t == "object" && t !== null) {
    var l = ro.get(t);
    return l !== void 0 ? l : (e = {
      value: t,
      source: e,
      stack: $r(e)
    }, ro.set(t, e), e);
  }
  return {
    value: t,
    source: e,
    stack: $r(e)
  };
}
var ee = [], Mu = 0, Ks = 0;
function ec() {
  for (var t = Mu, e = Ks = Mu = 0; e < t; ) {
    var l = ee[e];
    ee[e++] = null;
    var u = ee[e];
    ee[e++] = null;
    var a = ee[e];
    ee[e++] = null;
    var n = ee[e];
    if (ee[e++] = null, u !== null && a !== null) {
      var i = u.pending;
      i === null ? a.next = a : (a.next = i.next, i.next = a), u.pending = a;
    }
    n !== 0 && Ud(l, a, n);
  }
}
function lc(t, e, l, u) {
  ee[Mu++] = t, ee[Mu++] = e, ee[Mu++] = l, ee[Mu++] = u, Ks |= u, t.lanes |= u, t = t.alternate, t !== null && (t.lanes |= u);
}
function Vs(t, e, l, u) {
  return lc(t, e, l, u), Oi(t);
}
function va(t, e) {
  return lc(t, null, null, e), Oi(t);
}
function Ud(t, e, l) {
  t.lanes |= l;
  var u = t.alternate;
  u !== null && (u.lanes |= l);
  for (var a = !1, n = t.return; n !== null; )
    n.childLanes |= l, u = n.alternate, u !== null && (u.childLanes |= l), n.tag === 22 && (t = n.stateNode, t === null || t._visibility & 1 || (a = !0)), t = n, n = n.return;
  return t.tag === 3 ? (n = t.stateNode, a && e !== null && (a = 31 - $t(l), t = n.hiddenUpdates, u = t[a], u === null ? t[a] = [e] : u.push(e), e.lane = l | 536870912), n) : null;
}
function Oi(t) {
  if (50 < Ja)
    throw Ja = 0, Zf = null, Error(p(185));
  for (var e = t.return; e !== null; )
    t = e, e = t.return;
  return t.tag === 3 ? t.stateNode : null;
}
var Ru = {};
function km(t, e, l, u) {
  this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = u, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Vt(t, e, l, u) {
  return new km(t, e, l, u);
}
function Js(t) {
  return t = t.prototype, !(!t || !t.isReactComponent);
}
function je(t, e) {
  var l = t.alternate;
  return l === null ? (l = Vt(
    t.tag,
    e,
    t.key,
    t.mode
  ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 65011712, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
}
function Qd(t, e) {
  t.flags &= 65011714;
  var l = t.alternate;
  return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
    lanes: e.lanes,
    firstContext: e.firstContext
  }), t;
}
function ni(t, e, l, u, a, n) {
  var i = 0;
  if (u = t, typeof t == "function") Js(t) && (i = 1);
  else if (typeof t == "string")
    i = Ig(
      t,
      l,
      Te.current
    ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
  else
    t: switch (t) {
      case rf:
        return t = Vt(31, l, e, a), t.elementType = rf, t.lanes = n, t;
      case Su:
        return kl(l.children, a, n, e);
      case Wh:
        i = 8, a |= 24;
        break;
      case cf:
        return t = Vt(12, l, e, a | 2), t.elementType = cf, t.lanes = n, t;
      case ff:
        return t = Vt(13, l, e, a), t.elementType = ff, t.lanes = n, t;
      case sf:
        return t = Vt(19, l, e, a), t.elementType = sf, t.lanes = n, t;
      default:
        if (typeof t == "object" && t !== null)
          switch (t.$$typeof) {
            case w0:
            case qe:
              i = 10;
              break t;
            case kh:
              i = 9;
              break t;
            case Hs:
              i = 11;
              break t;
            case Ns:
              i = 14;
              break t;
            case Pe:
              i = 16, u = null;
              break t;
          }
        i = 29, l = Error(
          p(130, t === null ? "null" : typeof t, "")
        ), u = null;
    }
  return e = Vt(i, l, e, a), e.elementType = t, e.type = u, e.lanes = n, e;
}
function kl(t, e, l, u) {
  return t = Vt(7, t, u, e), t.lanes = l, t;
}
function xc(t, e, l) {
  return t = Vt(6, t, null, e), t.lanes = l, t;
}
function Yc(t, e, l) {
  return e = Vt(
    4,
    t.children !== null ? t.children : [],
    t.key,
    e
  ), e.lanes = l, e.stateNode = {
    containerInfo: t.containerInfo,
    pendingChildren: null,
    implementation: t.implementation
  }, e;
}
var Du = [], _u = 0, Ti = null, Ai = 0, ae = [], ne = 0, Pl = null, xe = 1, Ye = "";
function Gl(t, e) {
  Du[_u++] = Ai, Du[_u++] = Ti, Ti = t, Ai = e;
}
function Cd(t, e, l) {
  ae[ne++] = xe, ae[ne++] = Ye, ae[ne++] = Pl, Pl = t;
  var u = xe;
  t = Ye;
  var a = 32 - $t(u) - 1;
  u &= ~(1 << a), l += 1;
  var n = 32 - $t(e) + a;
  if (30 < n) {
    var i = a - a % 5;
    n = (u & (1 << i) - 1).toString(32), u >>= i, a -= i, xe = 1 << 32 - $t(e) + a | l << a | u, Ye = n + t;
  } else
    xe = 1 << n | l << a | u, Ye = t;
}
function $s(t) {
  t.return !== null && (Gl(t, 1), Cd(t, 1, 0));
}
function Fs(t) {
  for (; t === Ti; )
    Ti = Du[--_u], Du[_u] = null, Ai = Du[--_u], Du[_u] = null;
  for (; t === Pl; )
    Pl = ae[--ne], ae[ne] = null, Ye = ae[--ne], ae[ne] = null, xe = ae[--ne], ae[ne] = null;
}
var Ct = null, nt = null, Z = !1, Il = null, Ee = !1, Tf = Error(p(519));
function uu(t) {
  var e = Error(p(418, ""));
  throw Ia(ce(e, t)), Tf;
}
function oo(t) {
  var e = t.stateNode, l = t.type, u = t.memoizedProps;
  switch (e[Dt] = t, e[wt] = u, l) {
    case "dialog":
      G("cancel", e), G("close", e);
      break;
    case "iframe":
    case "object":
    case "embed":
      G("load", e);
      break;
    case "video":
    case "audio":
      for (l = 0; l < ln.length; l++)
        G(ln[l], e);
      break;
    case "source":
      G("error", e);
      break;
    case "img":
    case "image":
    case "link":
      G("error", e), G("load", e);
      break;
    case "details":
      G("toggle", e);
      break;
    case "input":
      G("invalid", e), rd(
        e,
        u.value,
        u.defaultValue,
        u.checked,
        u.defaultChecked,
        u.type,
        u.name,
        !0
      ), pi(e);
      break;
    case "select":
      G("invalid", e);
      break;
    case "textarea":
      G("invalid", e), hd(e, u.value, u.defaultValue, u.children), pi(e);
  }
  l = u.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || u.suppressHydrationWarning === !0 || dv(e.textContent, l) ? (u.popover != null && (G("beforetoggle", e), G("toggle", e)), u.onScroll != null && G("scroll", e), u.onScrollEnd != null && G("scrollend", e), u.onClick != null && (e.onclick = rc), e = !0) : e = !1, e || uu(t);
}
function ho(t) {
  for (Ct = t.return; Ct; )
    switch (Ct.tag) {
      case 5:
      case 13:
        Ee = !1;
        return;
      case 27:
      case 3:
        Ee = !0;
        return;
      default:
        Ct = Ct.return;
    }
}
function Aa(t) {
  if (t !== Ct) return !1;
  if (!Z) return ho(t), Z = !0, !1;
  var e = t.tag, l;
  if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Ff(t.type, t.memoizedProps)), l = !l), l && nt && uu(t), ho(t), e === 13) {
    if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(p(317));
    t: {
      for (t = t.nextSibling, e = 0; t; ) {
        if (t.nodeType === 8)
          if (l = t.data, l === "/$") {
            if (e === 0) {
              nt = ye(t.nextSibling);
              break t;
            }
            e--;
          } else
            l !== "$" && l !== "$!" && l !== "$?" || e++;
        t = t.nextSibling;
      }
      nt = null;
    }
  } else
    e === 27 ? (e = nt, Nl(t.type) ? (t = Pf, Pf = null, nt = t) : nt = e) : nt = Ct ? ye(t.stateNode.nextSibling) : null;
  return !0;
}
function An() {
  nt = Ct = null, Z = !1;
}
function yo() {
  var t = Il;
  return t !== null && (Gt === null ? Gt = t : Gt.push.apply(
    Gt,
    t
  ), Il = null), t;
}
function Ia(t) {
  Il === null ? Il = [t] : Il.push(t);
}
var Af = Re(null), ru = null, Be = null;
function tl(t, e, l) {
  lt(Af, e._currentValue), e._currentValue = l;
}
function we(t) {
  t._currentValue = Af.current, Et(Af);
}
function Mf(t, e, l) {
  for (; t !== null; ) {
    var u = t.alternate;
    if ((t.childLanes & e) !== e ? (t.childLanes |= e, u !== null && (u.childLanes |= e)) : u !== null && (u.childLanes & e) !== e && (u.childLanes |= e), t === l) break;
    t = t.return;
  }
}
function Rf(t, e, l, u) {
  var a = t.child;
  for (a !== null && (a.return = t); a !== null; ) {
    var n = a.dependencies;
    if (n !== null) {
      var i = a.child;
      n = n.firstContext;
      t: for (; n !== null; ) {
        var c = n;
        n = a;
        for (var f = 0; f < e.length; f++)
          if (c.context === e[f]) {
            n.lanes |= l, c = n.alternate, c !== null && (c.lanes |= l), Mf(
              n.return,
              l,
              t
            ), u || (i = null);
            break t;
          }
        n = c.next;
      }
    } else if (a.tag === 18) {
      if (i = a.return, i === null) throw Error(p(341));
      i.lanes |= l, n = i.alternate, n !== null && (n.lanes |= l), Mf(i, l, t), i = null;
    } else i = a.child;
    if (i !== null) i.return = a;
    else
      for (i = a; i !== null; ) {
        if (i === t) {
          i = null;
          break;
        }
        if (a = i.sibling, a !== null) {
          a.return = i.return, i = a;
          break;
        }
        i = i.return;
      }
    a = i;
  }
}
function Mn(t, e, l, u) {
  t = null;
  for (var a = e, n = !1; a !== null; ) {
    if (!n) {
      if (a.flags & 524288) n = !0;
      else if (a.flags & 262144) break;
    }
    if (a.tag === 10) {
      var i = a.alternate;
      if (i === null) throw Error(p(387));
      if (i = i.memoizedProps, i !== null) {
        var c = a.type;
        kt(a.pendingProps.value, i.value) || (t !== null ? t.push(c) : t = [c]);
      }
    } else if (a === mi.current) {
      if (i = a.alternate, i === null) throw Error(p(387));
      i.memoizedState.memoizedState !== a.memoizedState.memoizedState && (t !== null ? t.push(nn) : t = [nn]);
    }
    a = a.return;
  }
  t !== null && Rf(
    e,
    t,
    l,
    u
  ), e.flags |= 262144;
}
function Mi(t) {
  for (t = t.firstContext; t !== null; ) {
    if (!kt(
      t.context._currentValue,
      t.memoizedValue
    ))
      return !0;
    t = t.next;
  }
  return !1;
}
function au(t) {
  ru = t, Be = null, t = t.dependencies, t !== null && (t.firstContext = null);
}
function _t(t) {
  return Hd(ru, t);
}
function Kn(t, e) {
  return ru === null && au(t), Hd(t, e);
}
function Hd(t, e) {
  var l = e._currentValue;
  if (e = { context: e, memoizedValue: l, next: null }, Be === null) {
    if (t === null) throw Error(p(308));
    Be = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
  } else Be = Be.next = e;
  return l;
}
var Pm = typeof AbortController < "u" ? AbortController : function() {
  var t = [], e = this.signal = {
    aborted: !1,
    addEventListener: function(l, u) {
      t.push(u);
    }
  };
  this.abort = function() {
    e.aborted = !0, t.forEach(function(l) {
      return l();
    });
  };
}, Im = mt.unstable_scheduleCallback, tg = mt.unstable_NormalPriority, yt = {
  $$typeof: qe,
  Consumer: null,
  Provider: null,
  _currentValue: null,
  _currentValue2: null,
  _threadCount: 0
};
function Ws() {
  return {
    controller: new Pm(),
    data: /* @__PURE__ */ new Map(),
    refCount: 0
  };
}
function Rn(t) {
  t.refCount--, t.refCount === 0 && Im(tg, function() {
    t.controller.abort();
  });
}
var Ba = null, Df = 0, la = 0, Hu = null;
function eg(t, e) {
  if (Ba === null) {
    var l = Ba = [];
    Df = 0, la = br(), Hu = {
      status: "pending",
      value: void 0,
      then: function(u) {
        l.push(u);
      }
    };
  }
  return Df++, e.then(vo, vo), e;
}
function vo() {
  if (--Df === 0 && Ba !== null) {
    Hu !== null && (Hu.status = "fulfilled");
    var t = Ba;
    Ba = null, la = 0, Hu = null;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
}
function lg(t, e) {
  var l = [], u = {
    status: "pending",
    value: null,
    reason: null,
    then: function(a) {
      l.push(a);
    }
  };
  return t.then(
    function() {
      u.status = "fulfilled", u.value = e;
      for (var a = 0; a < l.length; a++) (0, l[a])(e);
    },
    function(a) {
      for (u.status = "rejected", u.reason = a, a = 0; a < l.length; a++)
        (0, l[a])(void 0);
    }
  ), u;
}
var mo = C.S;
C.S = function(t, e) {
  typeof e == "object" && e !== null && typeof e.then == "function" && eg(t, e), mo !== null && mo(t, e);
};
var tu = Re(null);
function ks() {
  var t = tu.current;
  return t !== null ? t : k.pooledCache;
}
function ii(t, e) {
  e === null ? lt(tu, tu.current) : lt(tu, e.pool);
}
function Nd() {
  var t = ks();
  return t === null ? null : { parent: yt._currentValue, pool: t };
}
var Dn = Error(p(460)), qd = Error(p(474)), uc = Error(p(542)), _f = { then: function() {
} };
function go(t) {
  return t = t.status, t === "fulfilled" || t === "rejected";
}
function Vn() {
}
function xd(t, e, l) {
  switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(Vn, Vn), e = l), e.status) {
    case "fulfilled":
      return e.value;
    case "rejected":
      throw t = e.reason, bo(t), t;
    default:
      if (typeof e.status == "string") e.then(Vn, Vn);
      else {
        if (t = k, t !== null && 100 < t.shellSuspendCounter)
          throw Error(p(482));
        t = e, t.status = "pending", t.then(
          function(u) {
            if (e.status === "pending") {
              var a = e;
              a.status = "fulfilled", a.value = u;
            }
          },
          function(u) {
            if (e.status === "pending") {
              var a = e;
              a.status = "rejected", a.reason = u;
            }
          }
        );
      }
      switch (e.status) {
        case "fulfilled":
          return e.value;
        case "rejected":
          throw t = e.reason, bo(t), t;
      }
      throw Ga = e, Dn;
  }
}
var Ga = null;
function So() {
  if (Ga === null) throw Error(p(459));
  var t = Ga;
  return Ga = null, t;
}
function bo(t) {
  if (t === Dn || t === uc)
    throw Error(p(483));
}
var Ie = !1;
function Ps(t) {
  t.updateQueue = {
    baseState: t.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null
  };
}
function zf(t, e) {
  t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
    baseState: t.baseState,
    firstBaseUpdate: t.firstBaseUpdate,
    lastBaseUpdate: t.lastBaseUpdate,
    shared: t.shared,
    callbacks: null
  });
}
function pl(t) {
  return { lane: t, tag: 0, payload: null, callback: null, next: null };
}
function El(t, e, l) {
  var u = t.updateQueue;
  if (u === null) return null;
  if (u = u.shared, J & 2) {
    var a = u.pending;
    return a === null ? e.next = e : (e.next = a.next, a.next = e), u.pending = e, e = Oi(t), Ud(t, null, l), e;
  }
  return lc(t, u, e, l), Oi(t);
}
function ja(t, e, l) {
  if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
    var u = e.lanes;
    u &= t.pendingLanes, l |= u, e.lanes = l, ad(t, l);
  }
}
function Bc(t, e) {
  var l = t.updateQueue, u = t.alternate;
  if (u !== null && (u = u.updateQueue, l === u)) {
    var a = null, n = null;
    if (l = l.firstBaseUpdate, l !== null) {
      do {
        var i = {
          lane: l.lane,
          tag: l.tag,
          payload: l.payload,
          callback: null,
          next: null
        };
        n === null ? a = n = i : n = n.next = i, l = l.next;
      } while (l !== null);
      n === null ? a = n = e : n = n.next = e;
    } else a = n = e;
    l = {
      baseState: u.baseState,
      firstBaseUpdate: a,
      lastBaseUpdate: n,
      shared: u.shared,
      callbacks: u.callbacks
    }, t.updateQueue = l;
    return;
  }
  t = l.lastBaseUpdate, t === null ? l.firstBaseUpdate = e : t.next = e, l.lastBaseUpdate = e;
}
var Uf = !1;
function wa() {
  if (Uf) {
    var t = Hu;
    if (t !== null) throw t;
  }
}
function Xa(t, e, l, u) {
  Uf = !1;
  var a = t.updateQueue;
  Ie = !1;
  var n = a.firstBaseUpdate, i = a.lastBaseUpdate, c = a.shared.pending;
  if (c !== null) {
    a.shared.pending = null;
    var f = c, o = f.next;
    f.next = null, i === null ? n = o : i.next = o, i = f;
    var g = t.alternate;
    g !== null && (g = g.updateQueue, c = g.lastBaseUpdate, c !== i && (c === null ? g.firstBaseUpdate = o : c.next = o, g.lastBaseUpdate = f));
  }
  if (n !== null) {
    var v = a.baseState;
    i = 0, g = o = f = null, c = n;
    do {
      var s = c.lane & -536870913, y = s !== c.lane;
      if (y ? (X & s) === s : (u & s) === s) {
        s !== 0 && s === la && (Uf = !0), g !== null && (g = g.next = {
          lane: 0,
          tag: c.tag,
          payload: c.payload,
          callback: null,
          next: null
        });
        t: {
          var E = t, b = c;
          s = e;
          var O = l;
          switch (b.tag) {
            case 1:
              if (E = b.payload, typeof E == "function") {
                v = E.call(O, v, s);
                break t;
              }
              v = E;
              break t;
            case 3:
              E.flags = E.flags & -65537 | 128;
            case 0:
              if (E = b.payload, s = typeof E == "function" ? E.call(O, v, s) : E, s == null) break t;
              v = I({}, v, s);
              break t;
            case 2:
              Ie = !0;
          }
        }
        s = c.callback, s !== null && (t.flags |= 64, y && (t.flags |= 8192), y = a.callbacks, y === null ? a.callbacks = [s] : y.push(s));
      } else
        y = {
          lane: s,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null
        }, g === null ? (o = g = y, f = v) : g = g.next = y, i |= s;
      if (c = c.next, c === null) {
        if (c = a.shared.pending, c === null)
          break;
        y = c, c = y.next, y.next = null, a.lastBaseUpdate = y, a.shared.pending = null;
      }
    } while (!0);
    g === null && (f = v), a.baseState = f, a.firstBaseUpdate = o, a.lastBaseUpdate = g, n === null && (a.shared.lanes = 0), Ul |= i, t.lanes = i, t.memoizedState = v;
  }
}
function Yd(t, e) {
  if (typeof t != "function")
    throw Error(p(191, t));
  t.call(e);
}
function Bd(t, e) {
  var l = t.callbacks;
  if (l !== null)
    for (t.callbacks = null, t = 0; t < l.length; t++)
      Yd(l[t], e);
}
var ua = Re(null), Ri = Re(0);
function po(t, e) {
  t = Ve, lt(Ri, t), lt(ua, e), Ve = t | e.baseLanes;
}
function Qf() {
  lt(Ri, Ve), lt(ua, ua.current);
}
function Is() {
  Ve = Ri.current, Et(ua), Et(Ri);
}
var _l = 0, x = null, F = null, ot = null, Di = !1, Nu = !1, nu = !1, _i = 0, tn = 0, qu = null, ug = 0;
function ft() {
  throw Error(p(321));
}
function tr(t, e) {
  if (e === null) return !1;
  for (var l = 0; l < e.length && l < t.length; l++)
    if (!kt(t[l], e[l])) return !1;
  return !0;
}
function er(t, e, l, u, a, n) {
  return _l = n, x = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, C.H = t === null || t.memoizedState === null ? vy : my, nu = !1, n = l(u, a), nu = !1, Nu && (n = jd(
    e,
    l,
    u,
    a
  )), Gd(t), n;
}
function Gd(t) {
  C.H = zi;
  var e = F !== null && F.next !== null;
  if (_l = 0, ot = F = x = null, Di = !1, tn = 0, qu = null, e) throw Error(p(300));
  t === null || pt || (t = t.dependencies, t !== null && Mi(t) && (pt = !0));
}
function jd(t, e, l, u) {
  x = t;
  var a = 0;
  do {
    if (Nu && (qu = null), tn = 0, Nu = !1, 25 <= a) throw Error(p(301));
    if (a += 1, ot = F = null, t.updateQueue != null) {
      var n = t.updateQueue;
      n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
    }
    C.H = rg, n = e(l, u);
  } while (Nu);
  return n;
}
function ag() {
  var t = C.H, e = t.useState()[0];
  return e = typeof e.then == "function" ? _n(e) : e, t = t.useState()[0], (F !== null ? F.memoizedState : null) !== t && (x.flags |= 1024), e;
}
function lr() {
  var t = _i !== 0;
  return _i = 0, t;
}
function ur(t, e, l) {
  e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
}
function ar(t) {
  if (Di) {
    for (t = t.memoizedState; t !== null; ) {
      var e = t.queue;
      e !== null && (e.pending = null), t = t.next;
    }
    Di = !1;
  }
  _l = 0, ot = F = x = null, Nu = !1, tn = _i = 0, qu = null;
}
function Yt() {
  var t = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  return ot === null ? x.memoizedState = ot = t : ot = ot.next = t, ot;
}
function ht() {
  if (F === null) {
    var t = x.alternate;
    t = t !== null ? t.memoizedState : null;
  } else t = F.next;
  var e = ot === null ? x.memoizedState : ot.next;
  if (e !== null)
    ot = e, F = t;
  else {
    if (t === null)
      throw x.alternate === null ? Error(p(467)) : Error(p(310));
    F = t, t = {
      memoizedState: F.memoizedState,
      baseState: F.baseState,
      baseQueue: F.baseQueue,
      queue: F.queue,
      next: null
    }, ot === null ? x.memoizedState = ot = t : ot = ot.next = t;
  }
  return ot;
}
function nr() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function _n(t) {
  var e = tn;
  return tn += 1, qu === null && (qu = []), t = xd(qu, t, e), e = x, (ot === null ? e.memoizedState : ot.next) === null && (e = e.alternate, C.H = e === null || e.memoizedState === null ? vy : my), t;
}
function ac(t) {
  if (t !== null && typeof t == "object") {
    if (typeof t.then == "function") return _n(t);
    if (t.$$typeof === qe) return _t(t);
  }
  throw Error(p(438, String(t)));
}
function ir(t) {
  var e = null, l = x.updateQueue;
  if (l !== null && (e = l.memoCache), e == null) {
    var u = x.alternate;
    u !== null && (u = u.updateQueue, u !== null && (u = u.memoCache, u != null && (e = {
      data: u.data.map(function(a) {
        return a.slice();
      }),
      index: 0
    })));
  }
  if (e == null && (e = { data: [], index: 0 }), l === null && (l = nr(), x.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
    for (l = e.data[e.index] = Array(t), u = 0; u < t; u++)
      l[u] = X0;
  return e.index++, l;
}
function Le(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function ci(t) {
  var e = ht();
  return cr(e, F, t);
}
function cr(t, e, l) {
  var u = t.queue;
  if (u === null) throw Error(p(311));
  u.lastRenderedReducer = l;
  var a = t.baseQueue, n = u.pending;
  if (n !== null) {
    if (a !== null) {
      var i = a.next;
      a.next = n.next, n.next = i;
    }
    e.baseQueue = a = n, u.pending = null;
  }
  if (n = t.baseState, a === null) t.memoizedState = n;
  else {
    e = a.next;
    var c = i = null, f = null, o = e, g = !1;
    do {
      var v = o.lane & -536870913;
      if (v !== o.lane ? (X & v) === v : (_l & v) === v) {
        var s = o.revertLane;
        if (s === 0)
          f !== null && (f = f.next = {
            lane: 0,
            revertLane: 0,
            action: o.action,
            hasEagerState: o.hasEagerState,
            eagerState: o.eagerState,
            next: null
          }), v === la && (g = !0);
        else if ((_l & s) === s) {
          o = o.next, s === la && (g = !0);
          continue;
        } else
          v = {
            lane: 0,
            revertLane: o.revertLane,
            action: o.action,
            hasEagerState: o.hasEagerState,
            eagerState: o.eagerState,
            next: null
          }, f === null ? (c = f = v, i = n) : f = f.next = v, x.lanes |= s, Ul |= s;
        v = o.action, nu && l(n, v), n = o.hasEagerState ? o.eagerState : l(n, v);
      } else
        s = {
          lane: v,
          revertLane: o.revertLane,
          action: o.action,
          hasEagerState: o.hasEagerState,
          eagerState: o.eagerState,
          next: null
        }, f === null ? (c = f = s, i = n) : f = f.next = s, x.lanes |= v, Ul |= v;
      o = o.next;
    } while (o !== null && o !== e);
    if (f === null ? i = n : f.next = c, !kt(n, t.memoizedState) && (pt = !0, g && (l = Hu, l !== null)))
      throw l;
    t.memoizedState = n, t.baseState = i, t.baseQueue = f, u.lastRenderedState = n;
  }
  return a === null && (u.lanes = 0), [t.memoizedState, u.dispatch];
}
function Gc(t) {
  var e = ht(), l = e.queue;
  if (l === null) throw Error(p(311));
  l.lastRenderedReducer = t;
  var u = l.dispatch, a = l.pending, n = e.memoizedState;
  if (a !== null) {
    l.pending = null;
    var i = a = a.next;
    do
      n = t(n, i.action), i = i.next;
    while (i !== a);
    kt(n, e.memoizedState) || (pt = !0), e.memoizedState = n, e.baseQueue === null && (e.baseState = n), l.lastRenderedState = n;
  }
  return [n, u];
}
function wd(t, e, l) {
  var u = x, a = ht(), n = Z;
  if (n) {
    if (l === void 0) throw Error(p(407));
    l = l();
  } else l = e();
  var i = !kt(
    (F || a).memoizedState,
    l
  );
  i && (a.memoizedState = l, pt = !0), a = a.queue;
  var c = Ld.bind(null, u, a, t);
  if (zn(2048, 8, c, [t]), a.getSnapshot !== e || i || ot !== null && ot.memoizedState.tag & 1) {
    if (u.flags |= 2048, aa(
      9,
      nc(),
      Zd.bind(
        null,
        u,
        a,
        l,
        e
      ),
      null
    ), k === null) throw Error(p(349));
    n || _l & 124 || Xd(u, e, l);
  }
  return l;
}
function Xd(t, e, l) {
  t.flags |= 16384, t = { getSnapshot: e, value: l }, e = x.updateQueue, e === null ? (e = nr(), x.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
}
function Zd(t, e, l, u) {
  e.value = l, e.getSnapshot = u, Kd(e) && Vd(t);
}
function Ld(t, e, l) {
  return l(function() {
    Kd(e) && Vd(t);
  });
}
function Kd(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var l = e();
    return !kt(t, l);
  } catch {
    return !0;
  }
}
function Vd(t) {
  var e = va(t, 2);
  e !== null && Wt(e, t, 2);
}
function Cf(t) {
  var e = Yt();
  if (typeof t == "function") {
    var l = t;
    if (t = l(), nu) {
      vl(!0);
      try {
        l();
      } finally {
        vl(!1);
      }
    }
  }
  return e.memoizedState = e.baseState = t, e.queue = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: Le,
    lastRenderedState: t
  }, e;
}
function Jd(t, e, l, u) {
  return t.baseState = l, cr(
    t,
    F,
    typeof u == "function" ? u : Le
  );
}
function ng(t, e, l, u, a) {
  if (ic(t)) throw Error(p(485));
  if (t = e.action, t !== null) {
    var n = {
      payload: a,
      action: t,
      next: null,
      isTransition: !0,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function(i) {
        n.listeners.push(i);
      }
    };
    C.T !== null ? l(!0) : n.isTransition = !1, u(n), l = e.pending, l === null ? (n.next = e.pending = n, $d(e, n)) : (n.next = l.next, e.pending = l.next = n);
  }
}
function $d(t, e) {
  var l = e.action, u = e.payload, a = t.state;
  if (e.isTransition) {
    var n = C.T, i = {};
    C.T = i;
    try {
      var c = l(a, u), f = C.S;
      f !== null && f(i, c), Eo(t, e, c);
    } catch (o) {
      Hf(t, e, o);
    } finally {
      C.T = n;
    }
  } else
    try {
      n = l(a, u), Eo(t, e, n);
    } catch (o) {
      Hf(t, e, o);
    }
}
function Eo(t, e, l) {
  l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
    function(u) {
      Oo(t, e, u);
    },
    function(u) {
      return Hf(t, e, u);
    }
  ) : Oo(t, e, l);
}
function Oo(t, e, l) {
  e.status = "fulfilled", e.value = l, Fd(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, $d(t, l)));
}
function Hf(t, e, l) {
  var u = t.pending;
  if (t.pending = null, u !== null) {
    u = u.next;
    do
      e.status = "rejected", e.reason = l, Fd(e), e = e.next;
    while (e !== u);
  }
  t.action = null;
}
function Fd(t) {
  t = t.listeners;
  for (var e = 0; e < t.length; e++) (0, t[e])();
}
function Wd(t, e) {
  return e;
}
function To(t, e) {
  if (Z) {
    var l = k.formState;
    if (l !== null) {
      t: {
        var u = x;
        if (Z) {
          if (nt) {
            e: {
              for (var a = nt, n = Ee; a.nodeType !== 8; ) {
                if (!n) {
                  a = null;
                  break e;
                }
                if (a = ye(
                  a.nextSibling
                ), a === null) {
                  a = null;
                  break e;
                }
              }
              n = a.data, a = n === "F!" || n === "F" ? a : null;
            }
            if (a) {
              nt = ye(
                a.nextSibling
              ), u = a.data === "F!";
              break t;
            }
          }
          uu(u);
        }
        u = !1;
      }
      u && (e = l[0]);
    }
  }
  return l = Yt(), l.memoizedState = l.baseState = e, u = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: Wd,
    lastRenderedState: e
  }, l.queue = u, l = hy.bind(
    null,
    x,
    u
  ), u.dispatch = l, u = Cf(!1), n = or.bind(
    null,
    x,
    !1,
    u.queue
  ), u = Yt(), a = {
    state: e,
    dispatch: null,
    action: t,
    pending: null
  }, u.queue = a, l = ng.bind(
    null,
    x,
    a,
    n,
    l
  ), a.dispatch = l, u.memoizedState = t, [e, l, !1];
}
function Ao(t) {
  var e = ht();
  return kd(e, F, t);
}
function kd(t, e, l) {
  if (e = cr(
    t,
    e,
    Wd
  )[0], t = ci(Le)[0], typeof e == "object" && e !== null && typeof e.then == "function")
    try {
      var u = _n(e);
    } catch (i) {
      throw i === Dn ? uc : i;
    }
  else u = e;
  e = ht();
  var a = e.queue, n = a.dispatch;
  return l !== e.memoizedState && (x.flags |= 2048, aa(
    9,
    nc(),
    ig.bind(null, a, l),
    null
  )), [u, n, t];
}
function ig(t, e) {
  t.action = e;
}
function Mo(t) {
  var e = ht(), l = F;
  if (l !== null)
    return kd(e, l, t);
  ht(), e = e.memoizedState, l = ht();
  var u = l.queue.dispatch;
  return l.memoizedState = t, [e, u, !1];
}
function aa(t, e, l, u) {
  return t = { tag: t, create: l, deps: u, inst: e, next: null }, e = x.updateQueue, e === null && (e = nr(), x.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (u = l.next, l.next = t, t.next = u, e.lastEffect = t), t;
}
function nc() {
  return { destroy: void 0, resource: void 0 };
}
function Pd() {
  return ht().memoizedState;
}
function fi(t, e, l, u) {
  var a = Yt();
  u = u === void 0 ? null : u, x.flags |= t, a.memoizedState = aa(
    1 | e,
    nc(),
    l,
    u
  );
}
function zn(t, e, l, u) {
  var a = ht();
  u = u === void 0 ? null : u;
  var n = a.memoizedState.inst;
  F !== null && u !== null && tr(u, F.memoizedState.deps) ? a.memoizedState = aa(e, n, l, u) : (x.flags |= t, a.memoizedState = aa(
    1 | e,
    n,
    l,
    u
  ));
}
function Ro(t, e) {
  fi(8390656, 8, t, e);
}
function Id(t, e) {
  zn(2048, 8, t, e);
}
function ty(t, e) {
  return zn(4, 2, t, e);
}
function ey(t, e) {
  return zn(4, 4, t, e);
}
function ly(t, e) {
  if (typeof e == "function") {
    t = t();
    var l = e(t);
    return function() {
      typeof l == "function" ? l() : e(null);
    };
  }
  if (e != null)
    return t = t(), e.current = t, function() {
      e.current = null;
    };
}
function uy(t, e, l) {
  l = l != null ? l.concat([t]) : null, zn(4, 4, ly.bind(null, e, t), l);
}
function fr() {
}
function ay(t, e) {
  var l = ht();
  e = e === void 0 ? null : e;
  var u = l.memoizedState;
  return e !== null && tr(e, u[1]) ? u[0] : (l.memoizedState = [t, e], t);
}
function ny(t, e) {
  var l = ht();
  e = e === void 0 ? null : e;
  var u = l.memoizedState;
  if (e !== null && tr(e, u[1]))
    return u[0];
  if (u = t(), nu) {
    vl(!0);
    try {
      t();
    } finally {
      vl(!1);
    }
  }
  return l.memoizedState = [u, e], u;
}
function sr(t, e, l) {
  return l === void 0 || _l & 1073741824 ? t.memoizedState = e : (t.memoizedState = l, t = Fy(), x.lanes |= t, Ul |= t, l);
}
function iy(t, e, l, u) {
  return kt(l, e) ? l : ua.current !== null ? (t = sr(t, l, u), kt(t, e) || (pt = !0), t) : _l & 42 ? (t = Fy(), x.lanes |= t, Ul |= t, e) : (pt = !0, t.memoizedState = l);
}
function cy(t, e, l, u, a) {
  var n = L.p;
  L.p = n !== 0 && 8 > n ? n : 8;
  var i = C.T, c = {};
  C.T = c, or(t, !1, e, l);
  try {
    var f = a(), o = C.S;
    if (o !== null && o(c, f), f !== null && typeof f == "object" && typeof f.then == "function") {
      var g = lg(
        f,
        u
      );
      Za(
        t,
        e,
        g,
        Ft(t)
      );
    } else
      Za(
        t,
        e,
        u,
        Ft(t)
      );
  } catch (v) {
    Za(
      t,
      e,
      { then: function() {
      }, status: "rejected", reason: v },
      Ft()
    );
  } finally {
    L.p = n, C.T = i;
  }
}
function cg() {
}
function Nf(t, e, l, u) {
  if (t.tag !== 5) throw Error(p(476));
  var a = fy(t).queue;
  cy(
    t,
    a,
    e,
    Wl,
    l === null ? cg : function() {
      return sy(t), l(u);
    }
  );
}
function fy(t) {
  var e = t.memoizedState;
  if (e !== null) return e;
  e = {
    memoizedState: Wl,
    baseState: Wl,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Le,
      lastRenderedState: Wl
    },
    next: null
  };
  var l = {};
  return e.next = {
    memoizedState: l,
    baseState: l,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Le,
      lastRenderedState: l
    },
    next: null
  }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
}
function sy(t) {
  var e = fy(t).next.queue;
  Za(t, e, {}, Ft());
}
function rr() {
  return _t(nn);
}
function ry() {
  return ht().memoizedState;
}
function oy() {
  return ht().memoizedState;
}
function fg(t) {
  for (var e = t.return; e !== null; ) {
    switch (e.tag) {
      case 24:
      case 3:
        var l = Ft();
        t = pl(l);
        var u = El(e, t, l);
        u !== null && (Wt(u, e, l), ja(u, e, l)), e = { cache: Ws() }, t.payload = e;
        return;
    }
    e = e.return;
  }
}
function sg(t, e, l) {
  var u = Ft();
  l = {
    lane: u,
    revertLane: 0,
    action: l,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, ic(t) ? dy(e, l) : (l = Vs(t, e, l, u), l !== null && (Wt(l, t, u), yy(l, e, u)));
}
function hy(t, e, l) {
  var u = Ft();
  Za(t, e, l, u);
}
function Za(t, e, l, u) {
  var a = {
    lane: u,
    revertLane: 0,
    action: l,
    hasEagerState: !1,
    eagerState: null,
    next: null
  };
  if (ic(t)) dy(e, a);
  else {
    var n = t.alternate;
    if (t.lanes === 0 && (n === null || n.lanes === 0) && (n = e.lastRenderedReducer, n !== null))
      try {
        var i = e.lastRenderedState, c = n(i, l);
        if (a.hasEagerState = !0, a.eagerState = c, kt(c, i))
          return lc(t, e, a, 0), k === null && ec(), !1;
      } catch {
      } finally {
      }
    if (l = Vs(t, e, a, u), l !== null)
      return Wt(l, t, u), yy(l, e, u), !0;
  }
  return !1;
}
function or(t, e, l, u) {
  if (u = {
    lane: 2,
    revertLane: br(),
    action: u,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, ic(t)) {
    if (e) throw Error(p(479));
  } else
    e = Vs(
      t,
      l,
      u,
      2
    ), e !== null && Wt(e, t, 2);
}
function ic(t) {
  var e = t.alternate;
  return t === x || e !== null && e === x;
}
function dy(t, e) {
  Nu = Di = !0;
  var l = t.pending;
  l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
}
function yy(t, e, l) {
  if (l & 4194048) {
    var u = e.lanes;
    u &= t.pendingLanes, l |= u, e.lanes = l, ad(t, l);
  }
}
var zi = {
  readContext: _t,
  use: ac,
  useCallback: ft,
  useContext: ft,
  useEffect: ft,
  useImperativeHandle: ft,
  useLayoutEffect: ft,
  useInsertionEffect: ft,
  useMemo: ft,
  useReducer: ft,
  useRef: ft,
  useState: ft,
  useDebugValue: ft,
  useDeferredValue: ft,
  useTransition: ft,
  useSyncExternalStore: ft,
  useId: ft,
  useHostTransitionStatus: ft,
  useFormState: ft,
  useActionState: ft,
  useOptimistic: ft,
  useMemoCache: ft,
  useCacheRefresh: ft
}, vy = {
  readContext: _t,
  use: ac,
  useCallback: function(t, e) {
    return Yt().memoizedState = [
      t,
      e === void 0 ? null : e
    ], t;
  },
  useContext: _t,
  useEffect: Ro,
  useImperativeHandle: function(t, e, l) {
    l = l != null ? l.concat([t]) : null, fi(
      4194308,
      4,
      ly.bind(null, e, t),
      l
    );
  },
  useLayoutEffect: function(t, e) {
    return fi(4194308, 4, t, e);
  },
  useInsertionEffect: function(t, e) {
    fi(4, 2, t, e);
  },
  useMemo: function(t, e) {
    var l = Yt();
    e = e === void 0 ? null : e;
    var u = t();
    if (nu) {
      vl(!0);
      try {
        t();
      } finally {
        vl(!1);
      }
    }
    return l.memoizedState = [u, e], u;
  },
  useReducer: function(t, e, l) {
    var u = Yt();
    if (l !== void 0) {
      var a = l(e);
      if (nu) {
        vl(!0);
        try {
          l(e);
        } finally {
          vl(!1);
        }
      }
    } else a = e;
    return u.memoizedState = u.baseState = a, t = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: t,
      lastRenderedState: a
    }, u.queue = t, t = t.dispatch = sg.bind(
      null,
      x,
      t
    ), [u.memoizedState, t];
  },
  useRef: function(t) {
    var e = Yt();
    return t = { current: t }, e.memoizedState = t;
  },
  useState: function(t) {
    t = Cf(t);
    var e = t.queue, l = hy.bind(null, x, e);
    return e.dispatch = l, [t.memoizedState, l];
  },
  useDebugValue: fr,
  useDeferredValue: function(t, e) {
    var l = Yt();
    return sr(l, t, e);
  },
  useTransition: function() {
    var t = Cf(!1);
    return t = cy.bind(
      null,
      x,
      t.queue,
      !0,
      !1
    ), Yt().memoizedState = t, [!1, t];
  },
  useSyncExternalStore: function(t, e, l) {
    var u = x, a = Yt();
    if (Z) {
      if (l === void 0)
        throw Error(p(407));
      l = l();
    } else {
      if (l = e(), k === null)
        throw Error(p(349));
      X & 124 || Xd(u, e, l);
    }
    a.memoizedState = l;
    var n = { value: l, getSnapshot: e };
    return a.queue = n, Ro(Ld.bind(null, u, n, t), [
      t
    ]), u.flags |= 2048, aa(
      9,
      nc(),
      Zd.bind(
        null,
        u,
        n,
        l,
        e
      ),
      null
    ), l;
  },
  useId: function() {
    var t = Yt(), e = k.identifierPrefix;
    if (Z) {
      var l = Ye, u = xe;
      l = (u & ~(1 << 32 - $t(u) - 1)).toString(32) + l, e = "«" + e + "R" + l, l = _i++, 0 < l && (e += "H" + l.toString(32)), e += "»";
    } else
      l = ug++, e = "«" + e + "r" + l.toString(32) + "»";
    return t.memoizedState = e;
  },
  useHostTransitionStatus: rr,
  useFormState: To,
  useActionState: To,
  useOptimistic: function(t) {
    var e = Yt();
    e.memoizedState = e.baseState = t;
    var l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: null,
      lastRenderedState: null
    };
    return e.queue = l, e = or.bind(
      null,
      x,
      !0,
      l
    ), l.dispatch = e, [t, e];
  },
  useMemoCache: ir,
  useCacheRefresh: function() {
    return Yt().memoizedState = fg.bind(
      null,
      x
    );
  }
}, my = {
  readContext: _t,
  use: ac,
  useCallback: ay,
  useContext: _t,
  useEffect: Id,
  useImperativeHandle: uy,
  useInsertionEffect: ty,
  useLayoutEffect: ey,
  useMemo: ny,
  useReducer: ci,
  useRef: Pd,
  useState: function() {
    return ci(Le);
  },
  useDebugValue: fr,
  useDeferredValue: function(t, e) {
    var l = ht();
    return iy(
      l,
      F.memoizedState,
      t,
      e
    );
  },
  useTransition: function() {
    var t = ci(Le)[0], e = ht().memoizedState;
    return [
      typeof t == "boolean" ? t : _n(t),
      e
    ];
  },
  useSyncExternalStore: wd,
  useId: ry,
  useHostTransitionStatus: rr,
  useFormState: Ao,
  useActionState: Ao,
  useOptimistic: function(t, e) {
    var l = ht();
    return Jd(l, F, t, e);
  },
  useMemoCache: ir,
  useCacheRefresh: oy
}, rg = {
  readContext: _t,
  use: ac,
  useCallback: ay,
  useContext: _t,
  useEffect: Id,
  useImperativeHandle: uy,
  useInsertionEffect: ty,
  useLayoutEffect: ey,
  useMemo: ny,
  useReducer: Gc,
  useRef: Pd,
  useState: function() {
    return Gc(Le);
  },
  useDebugValue: fr,
  useDeferredValue: function(t, e) {
    var l = ht();
    return F === null ? sr(l, t, e) : iy(
      l,
      F.memoizedState,
      t,
      e
    );
  },
  useTransition: function() {
    var t = Gc(Le)[0], e = ht().memoizedState;
    return [
      typeof t == "boolean" ? t : _n(t),
      e
    ];
  },
  useSyncExternalStore: wd,
  useId: ry,
  useHostTransitionStatus: rr,
  useFormState: Mo,
  useActionState: Mo,
  useOptimistic: function(t, e) {
    var l = ht();
    return F !== null ? Jd(l, F, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
  },
  useMemoCache: ir,
  useCacheRefresh: oy
}, xu = null, en = 0;
function Jn(t) {
  var e = en;
  return en += 1, xu === null && (xu = []), xd(xu, t, e);
}
function Ma(t, e) {
  e = e.props.ref, t.ref = e !== void 0 ? e : null;
}
function $n(t, e) {
  throw e.$$typeof === j0 ? Error(p(525)) : (t = Object.prototype.toString.call(e), Error(
    p(
      31,
      t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
    )
  ));
}
function Do(t) {
  var e = t._init;
  return e(t._payload);
}
function gy(t) {
  function e(d, h) {
    if (t) {
      var m = d.deletions;
      m === null ? (d.deletions = [h], d.flags |= 16) : m.push(h);
    }
  }
  function l(d, h) {
    if (!t) return null;
    for (; h !== null; )
      e(d, h), h = h.sibling;
    return null;
  }
  function u(d) {
    for (var h = /* @__PURE__ */ new Map(); d !== null; )
      d.key !== null ? h.set(d.key, d) : h.set(d.index, d), d = d.sibling;
    return h;
  }
  function a(d, h) {
    return d = je(d, h), d.index = 0, d.sibling = null, d;
  }
  function n(d, h, m) {
    return d.index = m, t ? (m = d.alternate, m !== null ? (m = m.index, m < h ? (d.flags |= 67108866, h) : m) : (d.flags |= 67108866, h)) : (d.flags |= 1048576, h);
  }
  function i(d) {
    return t && d.alternate === null && (d.flags |= 67108866), d;
  }
  function c(d, h, m, S) {
    return h === null || h.tag !== 6 ? (h = xc(m, d.mode, S), h.return = d, h) : (h = a(h, m), h.return = d, h);
  }
  function f(d, h, m, S) {
    var T = m.type;
    return T === Su ? g(
      d,
      h,
      m.props.children,
      S,
      m.key
    ) : h !== null && (h.elementType === T || typeof T == "object" && T !== null && T.$$typeof === Pe && Do(T) === h.type) ? (h = a(h, m.props), Ma(h, m), h.return = d, h) : (h = ni(
      m.type,
      m.key,
      m.props,
      null,
      d.mode,
      S
    ), Ma(h, m), h.return = d, h);
  }
  function o(d, h, m, S) {
    return h === null || h.tag !== 4 || h.stateNode.containerInfo !== m.containerInfo || h.stateNode.implementation !== m.implementation ? (h = Yc(m, d.mode, S), h.return = d, h) : (h = a(h, m.children || []), h.return = d, h);
  }
  function g(d, h, m, S, T) {
    return h === null || h.tag !== 7 ? (h = kl(
      m,
      d.mode,
      S,
      T
    ), h.return = d, h) : (h = a(h, m), h.return = d, h);
  }
  function v(d, h, m) {
    if (typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint")
      return h = xc(
        "" + h,
        d.mode,
        m
      ), h.return = d, h;
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case jn:
          return m = ni(
            h.type,
            h.key,
            h.props,
            null,
            d.mode,
            m
          ), Ma(m, h), m.return = d, m;
        case za:
          return h = Yc(
            h,
            d.mode,
            m
          ), h.return = d, h;
        case Pe:
          var S = h._init;
          return h = S(h._payload), v(d, h, m);
      }
      if (Ua(h) || Ea(h))
        return h = kl(
          h,
          d.mode,
          m,
          null
        ), h.return = d, h;
      if (typeof h.then == "function")
        return v(d, Jn(h), m);
      if (h.$$typeof === qe)
        return v(
          d,
          Kn(d, h),
          m
        );
      $n(d, h);
    }
    return null;
  }
  function s(d, h, m, S) {
    var T = h !== null ? h.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
      return T !== null ? null : c(d, h, "" + m, S);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case jn:
          return m.key === T ? f(d, h, m, S) : null;
        case za:
          return m.key === T ? o(d, h, m, S) : null;
        case Pe:
          return T = m._init, m = T(m._payload), s(d, h, m, S);
      }
      if (Ua(m) || Ea(m))
        return T !== null ? null : g(d, h, m, S, null);
      if (typeof m.then == "function")
        return s(
          d,
          h,
          Jn(m),
          S
        );
      if (m.$$typeof === qe)
        return s(
          d,
          h,
          Kn(d, m),
          S
        );
      $n(d, m);
    }
    return null;
  }
  function y(d, h, m, S, T) {
    if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
      return d = d.get(m) || null, c(h, d, "" + S, T);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case jn:
          return d = d.get(
            S.key === null ? m : S.key
          ) || null, f(h, d, S, T);
        case za:
          return d = d.get(
            S.key === null ? m : S.key
          ) || null, o(h, d, S, T);
        case Pe:
          var z = S._init;
          return S = z(S._payload), y(
            d,
            h,
            m,
            S,
            T
          );
      }
      if (Ua(S) || Ea(S))
        return d = d.get(m) || null, g(h, d, S, T, null);
      if (typeof S.then == "function")
        return y(
          d,
          h,
          m,
          Jn(S),
          T
        );
      if (S.$$typeof === qe)
        return y(
          d,
          h,
          m,
          Kn(h, S),
          T
        );
      $n(h, S);
    }
    return null;
  }
  function E(d, h, m, S) {
    for (var T = null, z = null, M = h, R = h = 0, H = null; M !== null && R < m.length; R++) {
      M.index > R ? (H = M, M = null) : H = M.sibling;
      var U = s(
        d,
        M,
        m[R],
        S
      );
      if (U === null) {
        M === null && (M = H);
        break;
      }
      t && M && U.alternate === null && e(d, M), h = n(U, h, R), z === null ? T = U : z.sibling = U, z = U, M = H;
    }
    if (R === m.length)
      return l(d, M), Z && Gl(d, R), T;
    if (M === null) {
      for (; R < m.length; R++)
        M = v(d, m[R], S), M !== null && (h = n(
          M,
          h,
          R
        ), z === null ? T = M : z.sibling = M, z = M);
      return Z && Gl(d, R), T;
    }
    for (M = u(M); R < m.length; R++)
      H = y(
        M,
        d,
        R,
        m[R],
        S
      ), H !== null && (t && H.alternate !== null && M.delete(
        H.key === null ? R : H.key
      ), h = n(
        H,
        h,
        R
      ), z === null ? T = H : z.sibling = H, z = H);
    return t && M.forEach(function(rt) {
      return e(d, rt);
    }), Z && Gl(d, R), T;
  }
  function b(d, h, m, S) {
    if (m == null) throw Error(p(151));
    for (var T = null, z = null, M = h, R = h = 0, H = null, U = m.next(); M !== null && !U.done; R++, U = m.next()) {
      M.index > R ? (H = M, M = null) : H = M.sibling;
      var rt = s(d, M, U.value, S);
      if (rt === null) {
        M === null && (M = H);
        break;
      }
      t && M && rt.alternate === null && e(d, M), h = n(rt, h, R), z === null ? T = rt : z.sibling = rt, z = rt, M = H;
    }
    if (U.done)
      return l(d, M), Z && Gl(d, R), T;
    if (M === null) {
      for (; !U.done; R++, U = m.next())
        U = v(d, U.value, S), U !== null && (h = n(U, h, R), z === null ? T = U : z.sibling = U, z = U);
      return Z && Gl(d, R), T;
    }
    for (M = u(M); !U.done; R++, U = m.next())
      U = y(M, d, R, U.value, S), U !== null && (t && U.alternate !== null && M.delete(U.key === null ? R : U.key), h = n(U, h, R), z === null ? T = U : z.sibling = U, z = U);
    return t && M.forEach(function(zt) {
      return e(d, zt);
    }), Z && Gl(d, R), T;
  }
  function O(d, h, m, S) {
    if (typeof m == "object" && m !== null && m.type === Su && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case jn:
          t: {
            for (var T = m.key; h !== null; ) {
              if (h.key === T) {
                if (T = m.type, T === Su) {
                  if (h.tag === 7) {
                    l(
                      d,
                      h.sibling
                    ), S = a(
                      h,
                      m.props.children
                    ), S.return = d, d = S;
                    break t;
                  }
                } else if (h.elementType === T || typeof T == "object" && T !== null && T.$$typeof === Pe && Do(T) === h.type) {
                  l(
                    d,
                    h.sibling
                  ), S = a(h, m.props), Ma(S, m), S.return = d, d = S;
                  break t;
                }
                l(d, h);
                break;
              } else e(d, h);
              h = h.sibling;
            }
            m.type === Su ? (S = kl(
              m.props.children,
              d.mode,
              S,
              m.key
            ), S.return = d, d = S) : (S = ni(
              m.type,
              m.key,
              m.props,
              null,
              d.mode,
              S
            ), Ma(S, m), S.return = d, d = S);
          }
          return i(d);
        case za:
          t: {
            for (T = m.key; h !== null; ) {
              if (h.key === T)
                if (h.tag === 4 && h.stateNode.containerInfo === m.containerInfo && h.stateNode.implementation === m.implementation) {
                  l(
                    d,
                    h.sibling
                  ), S = a(h, m.children || []), S.return = d, d = S;
                  break t;
                } else {
                  l(d, h);
                  break;
                }
              else e(d, h);
              h = h.sibling;
            }
            S = Yc(m, d.mode, S), S.return = d, d = S;
          }
          return i(d);
        case Pe:
          return T = m._init, m = T(m._payload), O(
            d,
            h,
            m,
            S
          );
      }
      if (Ua(m))
        return E(
          d,
          h,
          m,
          S
        );
      if (Ea(m)) {
        if (T = Ea(m), typeof T != "function") throw Error(p(150));
        return m = T.call(m), b(
          d,
          h,
          m,
          S
        );
      }
      if (typeof m.then == "function")
        return O(
          d,
          h,
          Jn(m),
          S
        );
      if (m.$$typeof === qe)
        return O(
          d,
          h,
          Kn(d, m),
          S
        );
      $n(d, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint" ? (m = "" + m, h !== null && h.tag === 6 ? (l(d, h.sibling), S = a(h, m), S.return = d, d = S) : (l(d, h), S = xc(m, d.mode, S), S.return = d, d = S), i(d)) : l(d, h);
  }
  return function(d, h, m, S) {
    try {
      en = 0;
      var T = O(
        d,
        h,
        m,
        S
      );
      return xu = null, T;
    } catch (M) {
      if (M === Dn || M === uc) throw M;
      var z = Vt(29, M, null, d.mode);
      return z.lanes = S, z.return = d, z;
    } finally {
    }
  };
}
var na = gy(!0), Sy = gy(!1), se = Re(null), Me = null;
function el(t) {
  var e = t.alternate;
  lt(vt, vt.current & 1), lt(se, t), Me === null && (e === null || ua.current !== null || e.memoizedState !== null) && (Me = t);
}
function by(t) {
  if (t.tag === 22) {
    if (lt(vt, vt.current), lt(se, t), Me === null) {
      var e = t.alternate;
      e !== null && e.memoizedState !== null && (Me = t);
    }
  } else ll();
}
function ll() {
  lt(vt, vt.current), lt(se, se.current);
}
function Ge(t) {
  Et(se), Me === t && (Me = null), Et(vt);
}
var vt = Re(0);
function Ui(t) {
  for (var e = t; e !== null; ) {
    if (e.tag === 13) {
      var l = e.memoizedState;
      if (l !== null && (l = l.dehydrated, l === null || l.data === "$?" || kf(l)))
        return e;
    } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
      if (e.flags & 128) return e;
    } else if (e.child !== null) {
      e.child.return = e, e = e.child;
      continue;
    }
    if (e === t) break;
    for (; e.sibling === null; ) {
      if (e.return === null || e.return === t) return null;
      e = e.return;
    }
    e.sibling.return = e.return, e = e.sibling;
  }
  return null;
}
function jc(t, e, l, u) {
  e = t.memoizedState, l = l(u, e), l = l == null ? e : I({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
}
var qf = {
  enqueueSetState: function(t, e, l) {
    t = t._reactInternals;
    var u = Ft(), a = pl(u);
    a.payload = e, l != null && (a.callback = l), e = El(t, a, u), e !== null && (Wt(e, t, u), ja(e, t, u));
  },
  enqueueReplaceState: function(t, e, l) {
    t = t._reactInternals;
    var u = Ft(), a = pl(u);
    a.tag = 1, a.payload = e, l != null && (a.callback = l), e = El(t, a, u), e !== null && (Wt(e, t, u), ja(e, t, u));
  },
  enqueueForceUpdate: function(t, e) {
    t = t._reactInternals;
    var l = Ft(), u = pl(l);
    u.tag = 2, e != null && (u.callback = e), e = El(t, u, l), e !== null && (Wt(e, t, l), ja(e, t, l));
  }
};
function _o(t, e, l, u, a, n, i) {
  return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(u, n, i) : e.prototype && e.prototype.isPureReactComponent ? !Pa(l, u) || !Pa(a, n) : !0;
}
function zo(t, e, l, u) {
  t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, u), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, u), e.state !== t && qf.enqueueReplaceState(e, e.state, null);
}
function iu(t, e) {
  var l = e;
  if ("ref" in e) {
    l = {};
    for (var u in e)
      u !== "ref" && (l[u] = e[u]);
  }
  if (t = t.defaultProps) {
    l === e && (l = I({}, l));
    for (var a in t)
      l[a] === void 0 && (l[a] = t[a]);
  }
  return l;
}
var Qi = typeof reportError == "function" ? reportError : function(t) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var e = new window.ErrorEvent("error", {
      bubbles: !0,
      cancelable: !0,
      message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
      error: t
    });
    if (!window.dispatchEvent(e)) return;
  } else if (typeof process == "object" && typeof process.emit == "function") {
    process.emit("uncaughtException", t);
    return;
  }
  console.error(t);
};
function py(t) {
  Qi(t);
}
function Ey(t) {
  console.error(t);
}
function Oy(t) {
  Qi(t);
}
function Ci(t, e) {
  try {
    var l = t.onUncaughtError;
    l(e.value, { componentStack: e.stack });
  } catch (u) {
    setTimeout(function() {
      throw u;
    });
  }
}
function Uo(t, e, l) {
  try {
    var u = t.onCaughtError;
    u(l.value, {
      componentStack: l.stack,
      errorBoundary: e.tag === 1 ? e.stateNode : null
    });
  } catch (a) {
    setTimeout(function() {
      throw a;
    });
  }
}
function xf(t, e, l) {
  return l = pl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
    Ci(t, e);
  }, l;
}
function Ty(t) {
  return t = pl(t), t.tag = 3, t;
}
function Ay(t, e, l, u) {
  var a = l.type.getDerivedStateFromError;
  if (typeof a == "function") {
    var n = u.value;
    t.payload = function() {
      return a(n);
    }, t.callback = function() {
      Uo(e, l, u);
    };
  }
  var i = l.stateNode;
  i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
    Uo(e, l, u), typeof a != "function" && (Ol === null ? Ol = /* @__PURE__ */ new Set([this]) : Ol.add(this));
    var c = u.stack;
    this.componentDidCatch(u.value, {
      componentStack: c !== null ? c : ""
    });
  });
}
function og(t, e, l, u, a) {
  if (l.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
    if (e = l.alternate, e !== null && Mn(
      e,
      l,
      a,
      !0
    ), l = se.current, l !== null) {
      switch (l.tag) {
        case 13:
          return Me === null ? Lf() : l.alternate === null && it === 0 && (it = 3), l.flags &= -257, l.flags |= 65536, l.lanes = a, u === _f ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([u]) : e.add(u), kc(t, u, a)), !1;
        case 22:
          return l.flags |= 65536, u === _f ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
            transitions: null,
            markerInstances: null,
            retryQueue: /* @__PURE__ */ new Set([u])
          }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([u]) : l.add(u)), kc(t, u, a)), !1;
      }
      throw Error(p(435, l.tag));
    }
    return kc(t, u, a), Lf(), !1;
  }
  if (Z)
    return e = se.current, e !== null ? (!(e.flags & 65536) && (e.flags |= 256), e.flags |= 65536, e.lanes = a, u !== Tf && (t = Error(p(422), { cause: u }), Ia(ce(t, l)))) : (u !== Tf && (e = Error(p(423), {
      cause: u
    }), Ia(
      ce(e, l)
    )), t = t.current.alternate, t.flags |= 65536, a &= -a, t.lanes |= a, u = ce(u, l), a = xf(
      t.stateNode,
      u,
      a
    ), Bc(t, a), it !== 4 && (it = 2)), !1;
  var n = Error(p(520), { cause: u });
  if (n = ce(n, l), Va === null ? Va = [n] : Va.push(n), it !== 4 && (it = 2), e === null) return !0;
  u = ce(u, l), l = e;
  do {
    switch (l.tag) {
      case 3:
        return l.flags |= 65536, t = a & -a, l.lanes |= t, t = xf(l.stateNode, u, t), Bc(l, t), !1;
      case 1:
        if (e = l.type, n = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (Ol === null || !Ol.has(n))))
          return l.flags |= 65536, a &= -a, l.lanes |= a, a = Ty(a), Ay(
            a,
            t,
            l,
            u
          ), Bc(l, a), !1;
    }
    l = l.return;
  } while (l !== null);
  return !1;
}
var My = Error(p(461)), pt = !1;
function Ot(t, e, l, u) {
  e.child = t === null ? Sy(e, null, l, u) : na(
    e,
    t.child,
    l,
    u
  );
}
function Qo(t, e, l, u, a) {
  l = l.render;
  var n = e.ref;
  if ("ref" in u) {
    var i = {};
    for (var c in u)
      c !== "ref" && (i[c] = u[c]);
  } else i = u;
  return au(e), u = er(
    t,
    e,
    l,
    i,
    n,
    a
  ), c = lr(), t !== null && !pt ? (ur(t, e, a), Ke(t, e, a)) : (Z && c && $s(e), e.flags |= 1, Ot(t, e, u, a), e.child);
}
function Co(t, e, l, u, a) {
  if (t === null) {
    var n = l.type;
    return typeof n == "function" && !Js(n) && n.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = n, Ry(
      t,
      e,
      n,
      u,
      a
    )) : (t = ni(
      l.type,
      null,
      u,
      e,
      e.mode,
      a
    ), t.ref = e.ref, t.return = e, e.child = t);
  }
  if (n = t.child, !hr(t, a)) {
    var i = n.memoizedProps;
    if (l = l.compare, l = l !== null ? l : Pa, l(i, u) && t.ref === e.ref)
      return Ke(t, e, a);
  }
  return e.flags |= 1, t = je(n, u), t.ref = e.ref, t.return = e, e.child = t;
}
function Ry(t, e, l, u, a) {
  if (t !== null) {
    var n = t.memoizedProps;
    if (Pa(n, u) && t.ref === e.ref)
      if (pt = !1, e.pendingProps = u = n, hr(t, a))
        t.flags & 131072 && (pt = !0);
      else
        return e.lanes = t.lanes, Ke(t, e, a);
  }
  return Yf(
    t,
    e,
    l,
    u,
    a
  );
}
function Dy(t, e, l) {
  var u = e.pendingProps, a = u.children, n = t !== null ? t.memoizedState : null;
  if (u.mode === "hidden") {
    if (e.flags & 128) {
      if (u = n !== null ? n.baseLanes | l : l, t !== null) {
        for (a = e.child = t.child, n = 0; a !== null; )
          n = n | a.lanes | a.childLanes, a = a.sibling;
        e.childLanes = n & ~u;
      } else e.childLanes = 0, e.child = null;
      return Ho(
        t,
        e,
        u,
        l
      );
    }
    if (l & 536870912)
      e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && ii(
        e,
        n !== null ? n.cachePool : null
      ), n !== null ? po(e, n) : Qf(), by(e);
    else
      return e.lanes = e.childLanes = 536870912, Ho(
        t,
        e,
        n !== null ? n.baseLanes | l : l,
        l
      );
  } else
    n !== null ? (ii(e, n.cachePool), po(e, n), ll(), e.memoizedState = null) : (t !== null && ii(e, null), Qf(), ll());
  return Ot(t, e, a, l), e.child;
}
function Ho(t, e, l, u) {
  var a = ks();
  return a = a === null ? null : { parent: yt._currentValue, pool: a }, e.memoizedState = {
    baseLanes: l,
    cachePool: a
  }, t !== null && ii(e, null), Qf(), by(e), t !== null && Mn(t, e, u, !0), null;
}
function si(t, e) {
  var l = e.ref;
  if (l === null)
    t !== null && t.ref !== null && (e.flags |= 4194816);
  else {
    if (typeof l != "function" && typeof l != "object")
      throw Error(p(284));
    (t === null || t.ref !== l) && (e.flags |= 4194816);
  }
}
function Yf(t, e, l, u, a) {
  return au(e), l = er(
    t,
    e,
    l,
    u,
    void 0,
    a
  ), u = lr(), t !== null && !pt ? (ur(t, e, a), Ke(t, e, a)) : (Z && u && $s(e), e.flags |= 1, Ot(t, e, l, a), e.child);
}
function No(t, e, l, u, a, n) {
  return au(e), e.updateQueue = null, l = jd(
    e,
    u,
    l,
    a
  ), Gd(t), u = lr(), t !== null && !pt ? (ur(t, e, n), Ke(t, e, n)) : (Z && u && $s(e), e.flags |= 1, Ot(t, e, l, n), e.child);
}
function qo(t, e, l, u, a) {
  if (au(e), e.stateNode === null) {
    var n = Ru, i = l.contextType;
    typeof i == "object" && i !== null && (n = _t(i)), n = new l(u, n), e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = qf, e.stateNode = n, n._reactInternals = e, n = e.stateNode, n.props = u, n.state = e.memoizedState, n.refs = {}, Ps(e), i = l.contextType, n.context = typeof i == "object" && i !== null ? _t(i) : Ru, n.state = e.memoizedState, i = l.getDerivedStateFromProps, typeof i == "function" && (jc(
      e,
      l,
      i,
      u
    ), n.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && qf.enqueueReplaceState(n, n.state, null), Xa(e, u, n, a), wa(), n.state = e.memoizedState), typeof n.componentDidMount == "function" && (e.flags |= 4194308), u = !0;
  } else if (t === null) {
    n = e.stateNode;
    var c = e.memoizedProps, f = iu(l, c);
    n.props = f;
    var o = n.context, g = l.contextType;
    i = Ru, typeof g == "object" && g !== null && (i = _t(g));
    var v = l.getDerivedStateFromProps;
    g = typeof v == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = e.pendingProps !== c, g || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || o !== i) && zo(
      e,
      n,
      u,
      i
    ), Ie = !1;
    var s = e.memoizedState;
    n.state = s, Xa(e, u, n, a), wa(), o = e.memoizedState, c || s !== o || Ie ? (typeof v == "function" && (jc(
      e,
      l,
      v,
      u
    ), o = e.memoizedState), (f = Ie || _o(
      e,
      l,
      f,
      u,
      s,
      o,
      i
    )) ? (g || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = u, e.memoizedState = o), n.props = u, n.state = o, n.context = i, u = f) : (typeof n.componentDidMount == "function" && (e.flags |= 4194308), u = !1);
  } else {
    n = e.stateNode, zf(t, e), i = e.memoizedProps, g = iu(l, i), n.props = g, v = e.pendingProps, s = n.context, o = l.contextType, f = Ru, typeof o == "object" && o !== null && (f = _t(o)), c = l.getDerivedStateFromProps, (o = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== v || s !== f) && zo(
      e,
      n,
      u,
      f
    ), Ie = !1, s = e.memoizedState, n.state = s, Xa(e, u, n, a), wa();
    var y = e.memoizedState;
    i !== v || s !== y || Ie || t !== null && t.dependencies !== null && Mi(t.dependencies) ? (typeof c == "function" && (jc(
      e,
      l,
      c,
      u
    ), y = e.memoizedState), (g = Ie || _o(
      e,
      l,
      g,
      u,
      s,
      y,
      f
    ) || t !== null && t.dependencies !== null && Mi(t.dependencies)) ? (o || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(u, y, f), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
      u,
      y,
      f
    )), typeof n.componentDidUpdate == "function" && (e.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && s === t.memoizedState || (e.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && s === t.memoizedState || (e.flags |= 1024), e.memoizedProps = u, e.memoizedState = y), n.props = u, n.state = y, n.context = f, u = g) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && s === t.memoizedState || (e.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && s === t.memoizedState || (e.flags |= 1024), u = !1);
  }
  return n = u, si(t, e), u = (e.flags & 128) !== 0, n || u ? (n = e.stateNode, l = u && typeof l.getDerivedStateFromError != "function" ? null : n.render(), e.flags |= 1, t !== null && u ? (e.child = na(
    e,
    t.child,
    null,
    a
  ), e.child = na(
    e,
    null,
    l,
    a
  )) : Ot(t, e, l, a), e.memoizedState = n.state, t = e.child) : t = Ke(
    t,
    e,
    a
  ), t;
}
function xo(t, e, l, u) {
  return An(), e.flags |= 256, Ot(t, e, l, u), e.child;
}
var wc = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0,
  hydrationErrors: null
};
function Xc(t) {
  return { baseLanes: t, cachePool: Nd() };
}
function Zc(t, e, l) {
  return t = t !== null ? t.childLanes & ~l : 0, e && (t |= fe), t;
}
function _y(t, e, l) {
  var u = e.pendingProps, a = !1, n = (e.flags & 128) !== 0, i;
  if ((i = n) || (i = t !== null && t.memoizedState === null ? !1 : (vt.current & 2) !== 0), i && (a = !0, e.flags &= -129), i = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
    if (Z) {
      if (a ? el(e) : ll(), Z) {
        var c = nt, f;
        if (f = c) {
          t: {
            for (f = c, c = Ee; f.nodeType !== 8; ) {
              if (!c) {
                c = null;
                break t;
              }
              if (f = ye(
                f.nextSibling
              ), f === null) {
                c = null;
                break t;
              }
            }
            c = f;
          }
          c !== null ? (e.memoizedState = {
            dehydrated: c,
            treeContext: Pl !== null ? { id: xe, overflow: Ye } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, f = Vt(
            18,
            null,
            null,
            0
          ), f.stateNode = c, f.return = e, e.child = f, Ct = e, nt = null, f = !0) : f = !1;
        }
        f || uu(e);
      }
      if (c = e.memoizedState, c !== null && (c = c.dehydrated, c !== null))
        return kf(c) ? e.lanes = 32 : e.lanes = 536870912, null;
      Ge(e);
    }
    return c = u.children, u = u.fallback, a ? (ll(), a = e.mode, c = Hi(
      { mode: "hidden", children: c },
      a
    ), u = kl(
      u,
      a,
      l,
      null
    ), c.return = e, u.return = e, c.sibling = u, e.child = c, a = e.child, a.memoizedState = Xc(l), a.childLanes = Zc(
      t,
      i,
      l
    ), e.memoizedState = wc, u) : (el(e), Bf(e, c));
  }
  if (f = t.memoizedState, f !== null && (c = f.dehydrated, c !== null)) {
    if (n)
      e.flags & 256 ? (el(e), e.flags &= -257, e = Lc(
        t,
        e,
        l
      )) : e.memoizedState !== null ? (ll(), e.child = t.child, e.flags |= 128, e = null) : (ll(), a = u.fallback, c = e.mode, u = Hi(
        { mode: "visible", children: u.children },
        c
      ), a = kl(
        a,
        c,
        l,
        null
      ), a.flags |= 2, u.return = e, a.return = e, u.sibling = a, e.child = u, na(
        e,
        t.child,
        null,
        l
      ), u = e.child, u.memoizedState = Xc(l), u.childLanes = Zc(
        t,
        i,
        l
      ), e.memoizedState = wc, e = a);
    else if (el(e), kf(c)) {
      if (i = c.nextSibling && c.nextSibling.dataset, i) var o = i.dgst;
      i = o, u = Error(p(419)), u.stack = "", u.digest = i, Ia({ value: u, source: null, stack: null }), e = Lc(
        t,
        e,
        l
      );
    } else if (pt || Mn(t, e, l, !1), i = (l & t.childLanes) !== 0, pt || i) {
      if (i = k, i !== null && (u = l & -l, u = u & 42 ? 1 : xs(u), u = u & (i.suspendedLanes | l) ? 0 : u, u !== 0 && u !== f.retryLane))
        throw f.retryLane = u, va(t, u), Wt(i, t, u), My;
      c.data === "$?" || Lf(), e = Lc(
        t,
        e,
        l
      );
    } else
      c.data === "$?" ? (e.flags |= 192, e.child = t.child, e = null) : (t = f.treeContext, nt = ye(
        c.nextSibling
      ), Ct = e, Z = !0, Il = null, Ee = !1, t !== null && (ae[ne++] = xe, ae[ne++] = Ye, ae[ne++] = Pl, xe = t.id, Ye = t.overflow, Pl = e), e = Bf(
        e,
        u.children
      ), e.flags |= 4096);
    return e;
  }
  return a ? (ll(), a = u.fallback, c = e.mode, f = t.child, o = f.sibling, u = je(f, {
    mode: "hidden",
    children: u.children
  }), u.subtreeFlags = f.subtreeFlags & 65011712, o !== null ? a = je(o, a) : (a = kl(
    a,
    c,
    l,
    null
  ), a.flags |= 2), a.return = e, u.return = e, u.sibling = a, e.child = u, u = a, a = e.child, c = t.child.memoizedState, c === null ? c = Xc(l) : (f = c.cachePool, f !== null ? (o = yt._currentValue, f = f.parent !== o ? { parent: o, pool: o } : f) : f = Nd(), c = {
    baseLanes: c.baseLanes | l,
    cachePool: f
  }), a.memoizedState = c, a.childLanes = Zc(
    t,
    i,
    l
  ), e.memoizedState = wc, u) : (el(e), l = t.child, t = l.sibling, l = je(l, {
    mode: "visible",
    children: u.children
  }), l.return = e, l.sibling = null, t !== null && (i = e.deletions, i === null ? (e.deletions = [t], e.flags |= 16) : i.push(t)), e.child = l, e.memoizedState = null, l);
}
function Bf(t, e) {
  return e = Hi(
    { mode: "visible", children: e },
    t.mode
  ), e.return = t, t.child = e;
}
function Hi(t, e) {
  return t = Vt(22, t, null, e), t.lanes = 0, t.stateNode = {
    _visibility: 1,
    _pendingMarkers: null,
    _retryCache: null,
    _transitions: null
  }, t;
}
function Lc(t, e, l) {
  return na(e, t.child, null, l), t = Bf(
    e,
    e.pendingProps.children
  ), t.flags |= 2, e.memoizedState = null, t;
}
function Yo(t, e, l) {
  t.lanes |= e;
  var u = t.alternate;
  u !== null && (u.lanes |= e), Mf(t.return, e, l);
}
function Kc(t, e, l, u, a) {
  var n = t.memoizedState;
  n === null ? t.memoizedState = {
    isBackwards: e,
    rendering: null,
    renderingStartTime: 0,
    last: u,
    tail: l,
    tailMode: a
  } : (n.isBackwards = e, n.rendering = null, n.renderingStartTime = 0, n.last = u, n.tail = l, n.tailMode = a);
}
function zy(t, e, l) {
  var u = e.pendingProps, a = u.revealOrder, n = u.tail;
  if (Ot(t, e, u.children, l), u = vt.current, u & 2)
    u = u & 1 | 2, e.flags |= 128;
  else {
    if (t !== null && t.flags & 128)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Yo(t, l, e);
        else if (t.tag === 19)
          Yo(t, l, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    u &= 1;
  }
  switch (lt(vt, u), a) {
    case "forwards":
      for (l = e.child, a = null; l !== null; )
        t = l.alternate, t !== null && Ui(t) === null && (a = l), l = l.sibling;
      l = a, l === null ? (a = e.child, e.child = null) : (a = l.sibling, l.sibling = null), Kc(
        e,
        !1,
        a,
        l,
        n
      );
      break;
    case "backwards":
      for (l = null, a = e.child, e.child = null; a !== null; ) {
        if (t = a.alternate, t !== null && Ui(t) === null) {
          e.child = a;
          break;
        }
        t = a.sibling, a.sibling = l, l = a, a = t;
      }
      Kc(
        e,
        !0,
        l,
        null,
        n
      );
      break;
    case "together":
      Kc(e, !1, null, null, void 0);
      break;
    default:
      e.memoizedState = null;
  }
  return e.child;
}
function Ke(t, e, l) {
  if (t !== null && (e.dependencies = t.dependencies), Ul |= e.lanes, !(l & e.childLanes))
    if (t !== null) {
      if (Mn(
        t,
        e,
        l,
        !1
      ), (l & e.childLanes) === 0)
        return null;
    } else return null;
  if (t !== null && e.child !== t.child)
    throw Error(p(153));
  if (e.child !== null) {
    for (t = e.child, l = je(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
      t = t.sibling, l = l.sibling = je(t, t.pendingProps), l.return = e;
    l.sibling = null;
  }
  return e.child;
}
function hr(t, e) {
  return t.lanes & e ? !0 : (t = t.dependencies, !!(t !== null && Mi(t)));
}
function hg(t, e, l) {
  switch (e.tag) {
    case 3:
      gi(e, e.stateNode.containerInfo), tl(e, yt, t.memoizedState.cache), An();
      break;
    case 27:
    case 5:
      df(e);
      break;
    case 4:
      gi(e, e.stateNode.containerInfo);
      break;
    case 10:
      tl(
        e,
        e.type,
        e.memoizedProps.value
      );
      break;
    case 13:
      var u = e.memoizedState;
      if (u !== null)
        return u.dehydrated !== null ? (el(e), e.flags |= 128, null) : l & e.child.childLanes ? _y(t, e, l) : (el(e), t = Ke(
          t,
          e,
          l
        ), t !== null ? t.sibling : null);
      el(e);
      break;
    case 19:
      var a = (t.flags & 128) !== 0;
      if (u = (l & e.childLanes) !== 0, u || (Mn(
        t,
        e,
        l,
        !1
      ), u = (l & e.childLanes) !== 0), a) {
        if (u)
          return zy(
            t,
            e,
            l
          );
        e.flags |= 128;
      }
      if (a = e.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), lt(vt, vt.current), u) break;
      return null;
    case 22:
    case 23:
      return e.lanes = 0, Dy(t, e, l);
    case 24:
      tl(e, yt, t.memoizedState.cache);
  }
  return Ke(t, e, l);
}
function Uy(t, e, l) {
  if (t !== null)
    if (t.memoizedProps !== e.pendingProps)
      pt = !0;
    else {
      if (!hr(t, l) && !(e.flags & 128))
        return pt = !1, hg(
          t,
          e,
          l
        );
      pt = !!(t.flags & 131072);
    }
  else
    pt = !1, Z && e.flags & 1048576 && Cd(e, Ai, e.index);
  switch (e.lanes = 0, e.tag) {
    case 16:
      t: {
        t = e.pendingProps;
        var u = e.elementType, a = u._init;
        if (u = a(u._payload), e.type = u, typeof u == "function")
          Js(u) ? (t = iu(u, t), e.tag = 1, e = qo(
            null,
            e,
            u,
            t,
            l
          )) : (e.tag = 0, e = Yf(
            null,
            e,
            u,
            t,
            l
          ));
        else {
          if (u != null) {
            if (a = u.$$typeof, a === Hs) {
              e.tag = 11, e = Qo(
                null,
                e,
                u,
                t,
                l
              );
              break t;
            } else if (a === Ns) {
              e.tag = 14, e = Co(
                null,
                e,
                u,
                t,
                l
              );
              break t;
            }
          }
          throw e = of(u) || u, Error(p(306, e, ""));
        }
      }
      return e;
    case 0:
      return Yf(
        t,
        e,
        e.type,
        e.pendingProps,
        l
      );
    case 1:
      return u = e.type, a = iu(
        u,
        e.pendingProps
      ), qo(
        t,
        e,
        u,
        a,
        l
      );
    case 3:
      t: {
        if (gi(
          e,
          e.stateNode.containerInfo
        ), t === null) throw Error(p(387));
        u = e.pendingProps;
        var n = e.memoizedState;
        a = n.element, zf(t, e), Xa(e, u, null, l);
        var i = e.memoizedState;
        if (u = i.cache, tl(e, yt, u), u !== n.cache && Rf(
          e,
          [yt],
          l,
          !0
        ), wa(), u = i.element, n.isDehydrated)
          if (n = {
            element: u,
            isDehydrated: !1,
            cache: i.cache
          }, e.updateQueue.baseState = n, e.memoizedState = n, e.flags & 256) {
            e = xo(
              t,
              e,
              u,
              l
            );
            break t;
          } else if (u !== a) {
            a = ce(
              Error(p(424)),
              e
            ), Ia(a), e = xo(
              t,
              e,
              u,
              l
            );
            break t;
          } else {
            switch (t = e.stateNode.containerInfo, t.nodeType) {
              case 9:
                t = t.body;
                break;
              default:
                t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
            }
            for (nt = ye(t.firstChild), Ct = e, Z = !0, Il = null, Ee = !0, l = Sy(
              e,
              null,
              u,
              l
            ), e.child = l; l; )
              l.flags = l.flags & -3 | 4096, l = l.sibling;
          }
        else {
          if (An(), u === a) {
            e = Ke(
              t,
              e,
              l
            );
            break t;
          }
          Ot(
            t,
            e,
            u,
            l
          );
        }
        e = e.child;
      }
      return e;
    case 26:
      return si(t, e), t === null ? (l = th(
        e.type,
        null,
        e.pendingProps,
        null
      )) ? e.memoizedState = l : Z || (l = e.type, t = e.pendingProps, u = ji(
        bl.current
      ).createElement(l), u[Dt] = e, u[wt] = t, At(u, l, t), bt(u), e.stateNode = u) : e.memoizedState = th(
        e.type,
        t.memoizedProps,
        e.pendingProps,
        t.memoizedState
      ), null;
    case 27:
      return df(e), t === null && Z && (u = e.stateNode = mv(
        e.type,
        e.pendingProps,
        bl.current
      ), Ct = e, Ee = !0, a = nt, Nl(e.type) ? (Pf = a, nt = ye(
        u.firstChild
      )) : nt = a), Ot(
        t,
        e,
        e.pendingProps.children,
        l
      ), si(t, e), t === null && (e.flags |= 4194304), e.child;
    case 5:
      return t === null && Z && ((a = u = nt) && (u = jg(
        u,
        e.type,
        e.pendingProps,
        Ee
      ), u !== null ? (e.stateNode = u, Ct = e, nt = ye(
        u.firstChild
      ), Ee = !1, a = !0) : a = !1), a || uu(e)), df(e), a = e.type, n = e.pendingProps, i = t !== null ? t.memoizedProps : null, u = n.children, Ff(a, n) ? u = null : i !== null && Ff(a, i) && (e.flags |= 32), e.memoizedState !== null && (a = er(
        t,
        e,
        ag,
        null,
        null,
        l
      ), nn._currentValue = a), si(t, e), Ot(t, e, u, l), e.child;
    case 6:
      return t === null && Z && ((t = l = nt) && (l = wg(
        l,
        e.pendingProps,
        Ee
      ), l !== null ? (e.stateNode = l, Ct = e, nt = null, t = !0) : t = !1), t || uu(e)), null;
    case 13:
      return _y(t, e, l);
    case 4:
      return gi(
        e,
        e.stateNode.containerInfo
      ), u = e.pendingProps, t === null ? e.child = na(
        e,
        null,
        u,
        l
      ) : Ot(
        t,
        e,
        u,
        l
      ), e.child;
    case 11:
      return Qo(
        t,
        e,
        e.type,
        e.pendingProps,
        l
      );
    case 7:
      return Ot(
        t,
        e,
        e.pendingProps,
        l
      ), e.child;
    case 8:
      return Ot(
        t,
        e,
        e.pendingProps.children,
        l
      ), e.child;
    case 12:
      return Ot(
        t,
        e,
        e.pendingProps.children,
        l
      ), e.child;
    case 10:
      return u = e.pendingProps, tl(e, e.type, u.value), Ot(
        t,
        e,
        u.children,
        l
      ), e.child;
    case 9:
      return a = e.type._context, u = e.pendingProps.children, au(e), a = _t(a), u = u(a), e.flags |= 1, Ot(t, e, u, l), e.child;
    case 14:
      return Co(
        t,
        e,
        e.type,
        e.pendingProps,
        l
      );
    case 15:
      return Ry(
        t,
        e,
        e.type,
        e.pendingProps,
        l
      );
    case 19:
      return zy(t, e, l);
    case 31:
      return u = e.pendingProps, l = e.mode, u = {
        mode: u.mode,
        children: u.children
      }, t === null ? (l = Hi(
        u,
        l
      ), l.ref = e.ref, e.child = l, l.return = e, e = l) : (l = je(t.child, u), l.ref = e.ref, e.child = l, l.return = e, e = l), e;
    case 22:
      return Dy(t, e, l);
    case 24:
      return au(e), u = _t(yt), t === null ? (a = ks(), a === null && (a = k, n = Ws(), a.pooledCache = n, n.refCount++, n !== null && (a.pooledCacheLanes |= l), a = n), e.memoizedState = {
        parent: u,
        cache: a
      }, Ps(e), tl(e, yt, a)) : (t.lanes & l && (zf(t, e), Xa(e, null, null, l), wa()), a = t.memoizedState, n = e.memoizedState, a.parent !== u ? (a = { parent: u, cache: u }, e.memoizedState = a, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = a), tl(e, yt, u)) : (u = n.cache, tl(e, yt, u), u !== a.cache && Rf(
        e,
        [yt],
        l,
        !0
      ))), Ot(
        t,
        e,
        e.pendingProps.children,
        l
      ), e.child;
    case 29:
      throw e.pendingProps;
  }
  throw Error(p(156, e.tag));
}
function ze(t) {
  t.flags |= 4;
}
function Bo(t, e) {
  if (e.type !== "stylesheet" || e.state.loading & 4)
    t.flags &= -16777217;
  else if (t.flags |= 16777216, !bv(e)) {
    if (e = se.current, e !== null && ((X & 4194048) === X ? Me !== null : (X & 62914560) !== X && !(X & 536870912) || e !== Me))
      throw Ga = _f, qd;
    t.flags |= 8192;
  }
}
function Fn(t, e) {
  e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? ld() : 536870912, t.lanes |= e, ia |= e);
}
function Ra(t, e) {
  if (!Z)
    switch (t.tailMode) {
      case "hidden":
        e = t.tail;
        for (var l = null; e !== null; )
          e.alternate !== null && (l = e), e = e.sibling;
        l === null ? t.tail = null : l.sibling = null;
        break;
      case "collapsed":
        l = t.tail;
        for (var u = null; l !== null; )
          l.alternate !== null && (u = l), l = l.sibling;
        u === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : u.sibling = null;
    }
}
function ut(t) {
  var e = t.alternate !== null && t.alternate.child === t.child, l = 0, u = 0;
  if (e)
    for (var a = t.child; a !== null; )
      l |= a.lanes | a.childLanes, u |= a.subtreeFlags & 65011712, u |= a.flags & 65011712, a.return = t, a = a.sibling;
  else
    for (a = t.child; a !== null; )
      l |= a.lanes | a.childLanes, u |= a.subtreeFlags, u |= a.flags, a.return = t, a = a.sibling;
  return t.subtreeFlags |= u, t.childLanes = l, e;
}
function dg(t, e, l) {
  var u = e.pendingProps;
  switch (Fs(e), e.tag) {
    case 31:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ut(e), null;
    case 1:
      return ut(e), null;
    case 3:
      return l = e.stateNode, u = null, t !== null && (u = t.memoizedState.cache), e.memoizedState.cache !== u && (e.flags |= 2048), we(yt), Iu(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (Aa(e) ? ze(e) : t === null || t.memoizedState.isDehydrated && !(e.flags & 256) || (e.flags |= 1024, yo())), ut(e), null;
    case 26:
      return l = e.memoizedState, t === null ? (ze(e), l !== null ? (ut(e), Bo(e, l)) : (ut(e), e.flags &= -16777217)) : l ? l !== t.memoizedState ? (ze(e), ut(e), Bo(e, l)) : (ut(e), e.flags &= -16777217) : (t.memoizedProps !== u && ze(e), ut(e), e.flags &= -16777217), null;
    case 27:
      Si(e), l = bl.current;
      var a = e.type;
      if (t !== null && e.stateNode != null)
        t.memoizedProps !== u && ze(e);
      else {
        if (!u) {
          if (e.stateNode === null)
            throw Error(p(166));
          return ut(e), null;
        }
        t = Te.current, Aa(e) ? oo(e) : (t = mv(a, u, l), e.stateNode = t, ze(e));
      }
      return ut(e), null;
    case 5:
      if (Si(e), l = e.type, t !== null && e.stateNode != null)
        t.memoizedProps !== u && ze(e);
      else {
        if (!u) {
          if (e.stateNode === null)
            throw Error(p(166));
          return ut(e), null;
        }
        if (t = Te.current, Aa(e))
          oo(e);
        else {
          switch (a = ji(
            bl.current
          ), t) {
            case 1:
              t = a.createElementNS(
                "http://www.w3.org/2000/svg",
                l
              );
              break;
            case 2:
              t = a.createElementNS(
                "http://www.w3.org/1998/Math/MathML",
                l
              );
              break;
            default:
              switch (l) {
                case "svg":
                  t = a.createElementNS(
                    "http://www.w3.org/2000/svg",
                    l
                  );
                  break;
                case "math":
                  t = a.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    l
                  );
                  break;
                case "script":
                  t = a.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild);
                  break;
                case "select":
                  t = typeof u.is == "string" ? a.createElement("select", { is: u.is }) : a.createElement("select"), u.multiple ? t.multiple = !0 : u.size && (t.size = u.size);
                  break;
                default:
                  t = typeof u.is == "string" ? a.createElement(l, { is: u.is }) : a.createElement(l);
              }
          }
          t[Dt] = e, t[wt] = u;
          t: for (a = e.child; a !== null; ) {
            if (a.tag === 5 || a.tag === 6)
              t.appendChild(a.stateNode);
            else if (a.tag !== 4 && a.tag !== 27 && a.child !== null) {
              a.child.return = a, a = a.child;
              continue;
            }
            if (a === e) break t;
            for (; a.sibling === null; ) {
              if (a.return === null || a.return === e)
                break t;
              a = a.return;
            }
            a.sibling.return = a.return, a = a.sibling;
          }
          e.stateNode = t;
          t: switch (At(t, l, u), l) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              t = !!u.autoFocus;
              break t;
            case "img":
              t = !0;
              break t;
            default:
              t = !1;
          }
          t && ze(e);
        }
      }
      return ut(e), e.flags &= -16777217, null;
    case 6:
      if (t && e.stateNode != null)
        t.memoizedProps !== u && ze(e);
      else {
        if (typeof u != "string" && e.stateNode === null)
          throw Error(p(166));
        if (t = bl.current, Aa(e)) {
          if (t = e.stateNode, l = e.memoizedProps, u = null, a = Ct, a !== null)
            switch (a.tag) {
              case 27:
              case 5:
                u = a.memoizedProps;
            }
          t[Dt] = e, t = !!(t.nodeValue === l || u !== null && u.suppressHydrationWarning === !0 || dv(t.nodeValue, l)), t || uu(e);
        } else
          t = ji(t).createTextNode(
            u
          ), t[Dt] = e, e.stateNode = t;
      }
      return ut(e), null;
    case 13:
      if (u = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
        if (a = Aa(e), u !== null && u.dehydrated !== null) {
          if (t === null) {
            if (!a) throw Error(p(318));
            if (a = e.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(p(317));
            a[Dt] = e;
          } else
            An(), !(e.flags & 128) && (e.memoizedState = null), e.flags |= 4;
          ut(e), a = !1;
        } else
          a = yo(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), a = !0;
        if (!a)
          return e.flags & 256 ? (Ge(e), e) : (Ge(e), null);
      }
      if (Ge(e), e.flags & 128)
        return e.lanes = l, e;
      if (l = u !== null, t = t !== null && t.memoizedState !== null, l) {
        u = e.child, a = null, u.alternate !== null && u.alternate.memoizedState !== null && u.alternate.memoizedState.cachePool !== null && (a = u.alternate.memoizedState.cachePool.pool);
        var n = null;
        u.memoizedState !== null && u.memoizedState.cachePool !== null && (n = u.memoizedState.cachePool.pool), n !== a && (u.flags |= 2048);
      }
      return l !== t && l && (e.child.flags |= 8192), Fn(e, e.updateQueue), ut(e), null;
    case 4:
      return Iu(), t === null && pr(e.stateNode.containerInfo), ut(e), null;
    case 10:
      return we(e.type), ut(e), null;
    case 19:
      if (Et(vt), a = e.memoizedState, a === null) return ut(e), null;
      if (u = (e.flags & 128) !== 0, n = a.rendering, n === null)
        if (u) Ra(a, !1);
        else {
          if (it !== 0 || t !== null && t.flags & 128)
            for (t = e.child; t !== null; ) {
              if (n = Ui(t), n !== null) {
                for (e.flags |= 128, Ra(a, !1), t = n.updateQueue, e.updateQueue = t, Fn(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                  Qd(l, t), l = l.sibling;
                return lt(
                  vt,
                  vt.current & 1 | 2
                ), e.child;
              }
              t = t.sibling;
            }
          a.tail !== null && Ae() > qi && (e.flags |= 128, u = !0, Ra(a, !1), e.lanes = 4194304);
        }
      else {
        if (!u)
          if (t = Ui(n), t !== null) {
            if (e.flags |= 128, u = !0, t = t.updateQueue, e.updateQueue = t, Fn(e, t), Ra(a, !0), a.tail === null && a.tailMode === "hidden" && !n.alternate && !Z)
              return ut(e), null;
          } else
            2 * Ae() - a.renderingStartTime > qi && l !== 536870912 && (e.flags |= 128, u = !0, Ra(a, !1), e.lanes = 4194304);
        a.isBackwards ? (n.sibling = e.child, e.child = n) : (t = a.last, t !== null ? t.sibling = n : e.child = n, a.last = n);
      }
      return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = Ae(), e.sibling = null, t = vt.current, lt(vt, u ? t & 1 | 2 : t & 1), e) : (ut(e), null);
    case 22:
    case 23:
      return Ge(e), Is(), u = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== u && (e.flags |= 8192) : u && (e.flags |= 8192), u ? l & 536870912 && !(e.flags & 128) && (ut(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : ut(e), l = e.updateQueue, l !== null && Fn(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), u = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (u = e.memoizedState.cachePool.pool), u !== l && (e.flags |= 2048), t !== null && Et(tu), null;
    case 24:
      return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), we(yt), ut(e), null;
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(p(156, e.tag));
}
function yg(t, e) {
  switch (Fs(e), e.tag) {
    case 1:
      return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 3:
      return we(yt), Iu(), t = e.flags, t & 65536 && !(t & 128) ? (e.flags = t & -65537 | 128, e) : null;
    case 26:
    case 27:
    case 5:
      return Si(e), null;
    case 13:
      if (Ge(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
        if (e.alternate === null)
          throw Error(p(340));
        An();
      }
      return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 19:
      return Et(vt), null;
    case 4:
      return Iu(), null;
    case 10:
      return we(e.type), null;
    case 22:
    case 23:
      return Ge(e), Is(), t !== null && Et(tu), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 24:
      return we(yt), null;
    case 25:
      return null;
    default:
      return null;
  }
}
function Qy(t, e) {
  switch (Fs(e), e.tag) {
    case 3:
      we(yt), Iu();
      break;
    case 26:
    case 27:
    case 5:
      Si(e);
      break;
    case 4:
      Iu();
      break;
    case 13:
      Ge(e);
      break;
    case 19:
      Et(vt);
      break;
    case 10:
      we(e.type);
      break;
    case 22:
    case 23:
      Ge(e), Is(), t !== null && Et(tu);
      break;
    case 24:
      we(yt);
  }
}
function Un(t, e) {
  try {
    var l = e.updateQueue, u = l !== null ? l.lastEffect : null;
    if (u !== null) {
      var a = u.next;
      l = a;
      do {
        if ((l.tag & t) === t) {
          u = void 0;
          var n = l.create, i = l.inst;
          u = n(), i.destroy = u;
        }
        l = l.next;
      } while (l !== a);
    }
  } catch (c) {
    W(e, e.return, c);
  }
}
function zl(t, e, l) {
  try {
    var u = e.updateQueue, a = u !== null ? u.lastEffect : null;
    if (a !== null) {
      var n = a.next;
      u = n;
      do {
        if ((u.tag & t) === t) {
          var i = u.inst, c = i.destroy;
          if (c !== void 0) {
            i.destroy = void 0, a = e;
            var f = l, o = c;
            try {
              o();
            } catch (g) {
              W(
                a,
                f,
                g
              );
            }
          }
        }
        u = u.next;
      } while (u !== n);
    }
  } catch (g) {
    W(e, e.return, g);
  }
}
function Cy(t) {
  var e = t.updateQueue;
  if (e !== null) {
    var l = t.stateNode;
    try {
      Bd(e, l);
    } catch (u) {
      W(t, t.return, u);
    }
  }
}
function Hy(t, e, l) {
  l.props = iu(
    t.type,
    t.memoizedProps
  ), l.state = t.memoizedState;
  try {
    l.componentWillUnmount();
  } catch (u) {
    W(t, e, u);
  }
}
function La(t, e) {
  try {
    var l = t.ref;
    if (l !== null) {
      switch (t.tag) {
        case 26:
        case 27:
        case 5:
          var u = t.stateNode;
          break;
        case 30:
          u = t.stateNode;
          break;
        default:
          u = t.stateNode;
      }
      typeof l == "function" ? t.refCleanup = l(u) : l.current = u;
    }
  } catch (a) {
    W(t, e, a);
  }
}
function Oe(t, e) {
  var l = t.ref, u = t.refCleanup;
  if (l !== null)
    if (typeof u == "function")
      try {
        u();
      } catch (a) {
        W(t, e, a);
      } finally {
        t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
      }
    else if (typeof l == "function")
      try {
        l(null);
      } catch (a) {
        W(t, e, a);
      }
    else l.current = null;
}
function Ny(t) {
  var e = t.type, l = t.memoizedProps, u = t.stateNode;
  try {
    t: switch (e) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        l.autoFocus && u.focus();
        break t;
      case "img":
        l.src ? u.src = l.src : l.srcSet && (u.srcset = l.srcSet);
    }
  } catch (a) {
    W(t, t.return, a);
  }
}
function Vc(t, e, l) {
  try {
    var u = t.stateNode;
    qg(u, t.type, l, e), u[wt] = e;
  } catch (a) {
    W(t, t.return, a);
  }
}
function qy(t) {
  return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Nl(t.type) || t.tag === 4;
}
function Jc(t) {
  t: for (; ; ) {
    for (; t.sibling === null; ) {
      if (t.return === null || qy(t.return)) return null;
      t = t.return;
    }
    for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
      if (t.tag === 27 && Nl(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
      t.child.return = t, t = t.child;
    }
    if (!(t.flags & 2)) return t.stateNode;
  }
}
function Gf(t, e, l) {
  var u = t.tag;
  if (u === 5 || u === 6)
    t = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(t, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(t), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = rc));
  else if (u !== 4 && (u === 27 && Nl(t.type) && (l = t.stateNode, e = null), t = t.child, t !== null))
    for (Gf(t, e, l), t = t.sibling; t !== null; )
      Gf(t, e, l), t = t.sibling;
}
function Ni(t, e, l) {
  var u = t.tag;
  if (u === 5 || u === 6)
    t = t.stateNode, e ? l.insertBefore(t, e) : l.appendChild(t);
  else if (u !== 4 && (u === 27 && Nl(t.type) && (l = t.stateNode), t = t.child, t !== null))
    for (Ni(t, e, l), t = t.sibling; t !== null; )
      Ni(t, e, l), t = t.sibling;
}
function xy(t) {
  var e = t.stateNode, l = t.memoizedProps;
  try {
    for (var u = t.type, a = e.attributes; a.length; )
      e.removeAttributeNode(a[0]);
    At(e, u, l), e[Dt] = t, e[wt] = l;
  } catch (n) {
    W(t, t.return, n);
  }
}
var Ne = !1, st = !1, $c = !1, Go = typeof WeakSet == "function" ? WeakSet : Set, St = null;
function vg(t, e) {
  if (t = t.containerInfo, Jf = Li, t = Td(t), Ls(t)) {
    if ("selectionStart" in t)
      var l = {
        start: t.selectionStart,
        end: t.selectionEnd
      };
    else
      t: {
        l = (l = t.ownerDocument) && l.defaultView || window;
        var u = l.getSelection && l.getSelection();
        if (u && u.rangeCount !== 0) {
          l = u.anchorNode;
          var a = u.anchorOffset, n = u.focusNode;
          u = u.focusOffset;
          try {
            l.nodeType, n.nodeType;
          } catch {
            l = null;
            break t;
          }
          var i = 0, c = -1, f = -1, o = 0, g = 0, v = t, s = null;
          e: for (; ; ) {
            for (var y; v !== l || a !== 0 && v.nodeType !== 3 || (c = i + a), v !== n || u !== 0 && v.nodeType !== 3 || (f = i + u), v.nodeType === 3 && (i += v.nodeValue.length), (y = v.firstChild) !== null; )
              s = v, v = y;
            for (; ; ) {
              if (v === t) break e;
              if (s === l && ++o === a && (c = i), s === n && ++g === u && (f = i), (y = v.nextSibling) !== null) break;
              v = s, s = v.parentNode;
            }
            v = y;
          }
          l = c === -1 || f === -1 ? null : { start: c, end: f };
        } else l = null;
      }
    l = l || { start: 0, end: 0 };
  } else l = null;
  for ($f = { focusedElem: t, selectionRange: l }, Li = !1, St = e; St !== null; )
    if (e = St, t = e.child, (e.subtreeFlags & 1024) !== 0 && t !== null)
      t.return = e, St = t;
    else
      for (; St !== null; ) {
        switch (e = St, n = e.alternate, t = e.flags, e.tag) {
          case 0:
            break;
          case 11:
          case 15:
            break;
          case 1:
            if (t & 1024 && n !== null) {
              t = void 0, l = e, a = n.memoizedProps, n = n.memoizedState, u = l.stateNode;
              try {
                var E = iu(
                  l.type,
                  a,
                  l.elementType === l.type
                );
                t = u.getSnapshotBeforeUpdate(
                  E,
                  n
                ), u.__reactInternalSnapshotBeforeUpdate = t;
              } catch (b) {
                W(
                  l,
                  l.return,
                  b
                );
              }
            }
            break;
          case 3:
            if (t & 1024) {
              if (t = e.stateNode.containerInfo, l = t.nodeType, l === 9)
                Wf(t);
              else if (l === 1)
                switch (t.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    Wf(t);
                    break;
                  default:
                    t.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          default:
            if (t & 1024) throw Error(p(163));
        }
        if (t = e.sibling, t !== null) {
          t.return = e.return, St = t;
          break;
        }
        St = e.return;
      }
}
function Yy(t, e, l) {
  var u = l.flags;
  switch (l.tag) {
    case 0:
    case 11:
    case 15:
      Fe(t, l), u & 4 && Un(5, l);
      break;
    case 1:
      if (Fe(t, l), u & 4)
        if (t = l.stateNode, e === null)
          try {
            t.componentDidMount();
          } catch (i) {
            W(l, l.return, i);
          }
        else {
          var a = iu(
            l.type,
            e.memoizedProps
          );
          e = e.memoizedState;
          try {
            t.componentDidUpdate(
              a,
              e,
              t.__reactInternalSnapshotBeforeUpdate
            );
          } catch (i) {
            W(
              l,
              l.return,
              i
            );
          }
        }
      u & 64 && Cy(l), u & 512 && La(l, l.return);
      break;
    case 3:
      if (Fe(t, l), u & 64 && (t = l.updateQueue, t !== null)) {
        if (e = null, l.child !== null)
          switch (l.child.tag) {
            case 27:
            case 5:
              e = l.child.stateNode;
              break;
            case 1:
              e = l.child.stateNode;
          }
        try {
          Bd(t, e);
        } catch (i) {
          W(l, l.return, i);
        }
      }
      break;
    case 27:
      e === null && u & 4 && xy(l);
    case 26:
    case 5:
      Fe(t, l), e === null && u & 4 && Ny(l), u & 512 && La(l, l.return);
      break;
    case 12:
      Fe(t, l);
      break;
    case 13:
      Fe(t, l), u & 4 && jy(t, l), u & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = Ag.bind(
        null,
        l
      ), Xg(t, l))));
      break;
    case 22:
      if (u = l.memoizedState !== null || Ne, !u) {
        e = e !== null && e.memoizedState !== null || st, a = Ne;
        var n = st;
        Ne = u, (st = e) && !n ? We(
          t,
          l,
          (l.subtreeFlags & 8772) !== 0
        ) : Fe(t, l), Ne = a, st = n;
      }
      break;
    case 30:
      break;
    default:
      Fe(t, l);
  }
}
function By(t) {
  var e = t.alternate;
  e !== null && (t.alternate = null, By(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Bs(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
}
var tt = null, Bt = !1;
function Ue(t, e, l) {
  for (l = l.child; l !== null; )
    Gy(t, e, l), l = l.sibling;
}
function Gy(t, e, l) {
  if (Jt && typeof Jt.onCommitFiberUnmount == "function")
    try {
      Jt.onCommitFiberUnmount(bn, l);
    } catch {
    }
  switch (l.tag) {
    case 26:
      st || Oe(l, e), Ue(
        t,
        e,
        l
      ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
      break;
    case 27:
      st || Oe(l, e);
      var u = tt, a = Bt;
      Nl(l.type) && (tt = l.stateNode, Bt = !1), Ue(
        t,
        e,
        l
      ), $a(l.stateNode), tt = u, Bt = a;
      break;
    case 5:
      st || Oe(l, e);
    case 6:
      if (u = tt, a = Bt, tt = null, Ue(
        t,
        e,
        l
      ), tt = u, Bt = a, tt !== null)
        if (Bt)
          try {
            (tt.nodeType === 9 ? tt.body : tt.nodeName === "HTML" ? tt.ownerDocument.body : tt).removeChild(l.stateNode);
          } catch (n) {
            W(
              l,
              e,
              n
            );
          }
        else
          try {
            tt.removeChild(l.stateNode);
          } catch (n) {
            W(
              l,
              e,
              n
            );
          }
      break;
    case 18:
      tt !== null && (Bt ? (t = tt, ko(
        t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
        l.stateNode
      ), sn(t)) : ko(tt, l.stateNode));
      break;
    case 4:
      u = tt, a = Bt, tt = l.stateNode.containerInfo, Bt = !0, Ue(
        t,
        e,
        l
      ), tt = u, Bt = a;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      st || zl(2, l, e), st || zl(4, l, e), Ue(
        t,
        e,
        l
      );
      break;
    case 1:
      st || (Oe(l, e), u = l.stateNode, typeof u.componentWillUnmount == "function" && Hy(
        l,
        e,
        u
      )), Ue(
        t,
        e,
        l
      );
      break;
    case 21:
      Ue(
        t,
        e,
        l
      );
      break;
    case 22:
      st = (u = st) || l.memoizedState !== null, Ue(
        t,
        e,
        l
      ), st = u;
      break;
    default:
      Ue(
        t,
        e,
        l
      );
  }
}
function jy(t, e) {
  if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
    try {
      sn(t);
    } catch (l) {
      W(e, e.return, l);
    }
}
function mg(t) {
  switch (t.tag) {
    case 13:
    case 19:
      var e = t.stateNode;
      return e === null && (e = t.stateNode = new Go()), e;
    case 22:
      return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Go()), e;
    default:
      throw Error(p(435, t.tag));
  }
}
function Fc(t, e) {
  var l = mg(t);
  e.forEach(function(u) {
    var a = Mg.bind(null, t, u);
    l.has(u) || (l.add(u), u.then(a, a));
  });
}
function Zt(t, e) {
  var l = e.deletions;
  if (l !== null)
    for (var u = 0; u < l.length; u++) {
      var a = l[u], n = t, i = e, c = i;
      t: for (; c !== null; ) {
        switch (c.tag) {
          case 27:
            if (Nl(c.type)) {
              tt = c.stateNode, Bt = !1;
              break t;
            }
            break;
          case 5:
            tt = c.stateNode, Bt = !1;
            break t;
          case 3:
          case 4:
            tt = c.stateNode.containerInfo, Bt = !0;
            break t;
        }
        c = c.return;
      }
      if (tt === null) throw Error(p(160));
      Gy(n, i, a), tt = null, Bt = !1, n = a.alternate, n !== null && (n.return = null), a.return = null;
    }
  if (e.subtreeFlags & 13878)
    for (e = e.child; e !== null; )
      wy(e, t), e = e.sibling;
}
var de = null;
function wy(t, e) {
  var l = t.alternate, u = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      Zt(e, t), Lt(t), u & 4 && (zl(3, t, t.return), Un(3, t), zl(5, t, t.return));
      break;
    case 1:
      Zt(e, t), Lt(t), u & 512 && (st || l === null || Oe(l, l.return)), u & 64 && Ne && (t = t.updateQueue, t !== null && (u = t.callbacks, u !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? u : l.concat(u))));
      break;
    case 26:
      var a = de;
      if (Zt(e, t), Lt(t), u & 512 && (st || l === null || Oe(l, l.return)), u & 4) {
        var n = l !== null ? l.memoizedState : null;
        if (u = t.memoizedState, l === null)
          if (u === null)
            if (t.stateNode === null) {
              t: {
                u = t.type, l = t.memoizedProps, a = a.ownerDocument || a;
                e: switch (u) {
                  case "title":
                    n = a.getElementsByTagName("title")[0], (!n || n[On] || n[Dt] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = a.createElement(u), a.head.insertBefore(
                      n,
                      a.querySelector("head > title")
                    )), At(n, u, l), n[Dt] = t, bt(n), u = n;
                    break t;
                  case "link":
                    var i = lh(
                      "link",
                      "href",
                      a
                    ).get(u + (l.href || ""));
                    if (i) {
                      for (var c = 0; c < i.length; c++)
                        if (n = i[c], n.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && n.getAttribute("rel") === (l.rel == null ? null : l.rel) && n.getAttribute("title") === (l.title == null ? null : l.title) && n.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                          i.splice(c, 1);
                          break e;
                        }
                    }
                    n = a.createElement(u), At(n, u, l), a.head.appendChild(n);
                    break;
                  case "meta":
                    if (i = lh(
                      "meta",
                      "content",
                      a
                    ).get(u + (l.content || ""))) {
                      for (c = 0; c < i.length; c++)
                        if (n = i[c], n.getAttribute("content") === (l.content == null ? null : "" + l.content) && n.getAttribute("name") === (l.name == null ? null : l.name) && n.getAttribute("property") === (l.property == null ? null : l.property) && n.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && n.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                          i.splice(c, 1);
                          break e;
                        }
                    }
                    n = a.createElement(u), At(n, u, l), a.head.appendChild(n);
                    break;
                  default:
                    throw Error(p(468, u));
                }
                n[Dt] = t, bt(n), u = n;
              }
              t.stateNode = u;
            } else
              uh(
                a,
                t.type,
                t.stateNode
              );
          else
            t.stateNode = eh(
              a,
              u,
              t.memoizedProps
            );
        else
          n !== u ? (n === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : n.count--, u === null ? uh(
            a,
            t.type,
            t.stateNode
          ) : eh(
            a,
            u,
            t.memoizedProps
          )) : u === null && t.stateNode !== null && Vc(
            t,
            t.memoizedProps,
            l.memoizedProps
          );
      }
      break;
    case 27:
      Zt(e, t), Lt(t), u & 512 && (st || l === null || Oe(l, l.return)), l !== null && u & 4 && Vc(
        t,
        t.memoizedProps,
        l.memoizedProps
      );
      break;
    case 5:
      if (Zt(e, t), Lt(t), u & 512 && (st || l === null || Oe(l, l.return)), t.flags & 32) {
        a = t.stateNode;
        try {
          ea(a, "");
        } catch (y) {
          W(t, t.return, y);
        }
      }
      u & 4 && t.stateNode != null && (a = t.memoizedProps, Vc(
        t,
        a,
        l !== null ? l.memoizedProps : a
      )), u & 1024 && ($c = !0);
      break;
    case 6:
      if (Zt(e, t), Lt(t), u & 4) {
        if (t.stateNode === null)
          throw Error(p(162));
        u = t.memoizedProps, l = t.stateNode;
        try {
          l.nodeValue = u;
        } catch (y) {
          W(t, t.return, y);
        }
      }
      break;
    case 3:
      if (hi = null, a = de, de = wi(e.containerInfo), Zt(e, t), de = a, Lt(t), u & 4 && l !== null && l.memoizedState.isDehydrated)
        try {
          sn(e.containerInfo);
        } catch (y) {
          W(t, t.return, y);
        }
      $c && ($c = !1, Xy(t));
      break;
    case 4:
      u = de, de = wi(
        t.stateNode.containerInfo
      ), Zt(e, t), Lt(t), de = u;
      break;
    case 12:
      Zt(e, t), Lt(t);
      break;
    case 13:
      Zt(e, t), Lt(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (gr = Ae()), u & 4 && (u = t.updateQueue, u !== null && (t.updateQueue = null, Fc(t, u)));
      break;
    case 22:
      a = t.memoizedState !== null;
      var f = l !== null && l.memoizedState !== null, o = Ne, g = st;
      if (Ne = o || a, st = g || f, Zt(e, t), st = g, Ne = o, Lt(t), u & 8192)
        t: for (e = t.stateNode, e._visibility = a ? e._visibility & -2 : e._visibility | 1, a && (l === null || f || Ne || st || jl(t)), l = null, e = t; ; ) {
          if (e.tag === 5 || e.tag === 26) {
            if (l === null) {
              f = l = e;
              try {
                if (n = f.stateNode, a)
                  i = n.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                else {
                  c = f.stateNode;
                  var v = f.memoizedProps.style, s = v != null && v.hasOwnProperty("display") ? v.display : null;
                  c.style.display = s == null || typeof s == "boolean" ? "" : ("" + s).trim();
                }
              } catch (y) {
                W(f, f.return, y);
              }
            }
          } else if (e.tag === 6) {
            if (l === null) {
              f = e;
              try {
                f.stateNode.nodeValue = a ? "" : f.memoizedProps;
              } catch (y) {
                W(f, f.return, y);
              }
            }
          } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === t) && e.child !== null) {
            e.child.return = e, e = e.child;
            continue;
          }
          if (e === t) break t;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break t;
            l === e && (l = null), e = e.return;
          }
          l === e && (l = null), e.sibling.return = e.return, e = e.sibling;
        }
      u & 4 && (u = t.updateQueue, u !== null && (l = u.retryQueue, l !== null && (u.retryQueue = null, Fc(t, l))));
      break;
    case 19:
      Zt(e, t), Lt(t), u & 4 && (u = t.updateQueue, u !== null && (t.updateQueue = null, Fc(t, u)));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      Zt(e, t), Lt(t);
  }
}
function Lt(t) {
  var e = t.flags;
  if (e & 2) {
    try {
      for (var l, u = t.return; u !== null; ) {
        if (qy(u)) {
          l = u;
          break;
        }
        u = u.return;
      }
      if (l == null) throw Error(p(160));
      switch (l.tag) {
        case 27:
          var a = l.stateNode, n = Jc(t);
          Ni(t, n, a);
          break;
        case 5:
          var i = l.stateNode;
          l.flags & 32 && (ea(i, ""), l.flags &= -33);
          var c = Jc(t);
          Ni(t, c, i);
          break;
        case 3:
        case 4:
          var f = l.stateNode.containerInfo, o = Jc(t);
          Gf(
            t,
            o,
            f
          );
          break;
        default:
          throw Error(p(161));
      }
    } catch (g) {
      W(t, t.return, g);
    }
    t.flags &= -3;
  }
  e & 4096 && (t.flags &= -4097);
}
function Xy(t) {
  if (t.subtreeFlags & 1024)
    for (t = t.child; t !== null; ) {
      var e = t;
      Xy(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
    }
}
function Fe(t, e) {
  if (e.subtreeFlags & 8772)
    for (e = e.child; e !== null; )
      Yy(t, e.alternate, e), e = e.sibling;
}
function jl(t) {
  for (t = t.child; t !== null; ) {
    var e = t;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        zl(4, e, e.return), jl(e);
        break;
      case 1:
        Oe(e, e.return);
        var l = e.stateNode;
        typeof l.componentWillUnmount == "function" && Hy(
          e,
          e.return,
          l
        ), jl(e);
        break;
      case 27:
        $a(e.stateNode);
      case 26:
      case 5:
        Oe(e, e.return), jl(e);
        break;
      case 22:
        e.memoizedState === null && jl(e);
        break;
      case 30:
        jl(e);
        break;
      default:
        jl(e);
    }
    t = t.sibling;
  }
}
function We(t, e, l) {
  for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
    var u = e.alternate, a = t, n = e, i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        We(
          a,
          n,
          l
        ), Un(4, n);
        break;
      case 1:
        if (We(
          a,
          n,
          l
        ), u = n, a = u.stateNode, typeof a.componentDidMount == "function")
          try {
            a.componentDidMount();
          } catch (o) {
            W(u, u.return, o);
          }
        if (u = n, a = u.updateQueue, a !== null) {
          var c = u.stateNode;
          try {
            var f = a.shared.hiddenCallbacks;
            if (f !== null)
              for (a.shared.hiddenCallbacks = null, a = 0; a < f.length; a++)
                Yd(f[a], c);
          } catch (o) {
            W(u, u.return, o);
          }
        }
        l && i & 64 && Cy(n), La(n, n.return);
        break;
      case 27:
        xy(n);
      case 26:
      case 5:
        We(
          a,
          n,
          l
        ), l && u === null && i & 4 && Ny(n), La(n, n.return);
        break;
      case 12:
        We(
          a,
          n,
          l
        );
        break;
      case 13:
        We(
          a,
          n,
          l
        ), l && i & 4 && jy(a, n);
        break;
      case 22:
        n.memoizedState === null && We(
          a,
          n,
          l
        ), La(n, n.return);
        break;
      case 30:
        break;
      default:
        We(
          a,
          n,
          l
        );
    }
    e = e.sibling;
  }
}
function dr(t, e) {
  var l = null;
  t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && Rn(l));
}
function yr(t, e) {
  t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Rn(t));
}
function ge(t, e, l, u) {
  if (e.subtreeFlags & 10256)
    for (e = e.child; e !== null; )
      Zy(
        t,
        e,
        l,
        u
      ), e = e.sibling;
}
function Zy(t, e, l, u) {
  var a = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 15:
      ge(
        t,
        e,
        l,
        u
      ), a & 2048 && Un(9, e);
      break;
    case 1:
      ge(
        t,
        e,
        l,
        u
      );
      break;
    case 3:
      ge(
        t,
        e,
        l,
        u
      ), a & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Rn(t)));
      break;
    case 12:
      if (a & 2048) {
        ge(
          t,
          e,
          l,
          u
        ), t = e.stateNode;
        try {
          var n = e.memoizedProps, i = n.id, c = n.onPostCommit;
          typeof c == "function" && c(
            i,
            e.alternate === null ? "mount" : "update",
            t.passiveEffectDuration,
            -0
          );
        } catch (f) {
          W(e, e.return, f);
        }
      } else
        ge(
          t,
          e,
          l,
          u
        );
      break;
    case 13:
      ge(
        t,
        e,
        l,
        u
      );
      break;
    case 23:
      break;
    case 22:
      n = e.stateNode, i = e.alternate, e.memoizedState !== null ? n._visibility & 2 ? ge(
        t,
        e,
        l,
        u
      ) : Ka(t, e) : n._visibility & 2 ? ge(
        t,
        e,
        l,
        u
      ) : (n._visibility |= 2, mu(
        t,
        e,
        l,
        u,
        (e.subtreeFlags & 10256) !== 0
      )), a & 2048 && dr(i, e);
      break;
    case 24:
      ge(
        t,
        e,
        l,
        u
      ), a & 2048 && yr(e.alternate, e);
      break;
    default:
      ge(
        t,
        e,
        l,
        u
      );
  }
}
function mu(t, e, l, u, a) {
  for (a = a && (e.subtreeFlags & 10256) !== 0, e = e.child; e !== null; ) {
    var n = t, i = e, c = l, f = u, o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        mu(
          n,
          i,
          c,
          f,
          a
        ), Un(8, i);
        break;
      case 23:
        break;
      case 22:
        var g = i.stateNode;
        i.memoizedState !== null ? g._visibility & 2 ? mu(
          n,
          i,
          c,
          f,
          a
        ) : Ka(
          n,
          i
        ) : (g._visibility |= 2, mu(
          n,
          i,
          c,
          f,
          a
        )), a && o & 2048 && dr(
          i.alternate,
          i
        );
        break;
      case 24:
        mu(
          n,
          i,
          c,
          f,
          a
        ), a && o & 2048 && yr(i.alternate, i);
        break;
      default:
        mu(
          n,
          i,
          c,
          f,
          a
        );
    }
    e = e.sibling;
  }
}
function Ka(t, e) {
  if (e.subtreeFlags & 10256)
    for (e = e.child; e !== null; ) {
      var l = t, u = e, a = u.flags;
      switch (u.tag) {
        case 22:
          Ka(l, u), a & 2048 && dr(
            u.alternate,
            u
          );
          break;
        case 24:
          Ka(l, u), a & 2048 && yr(u.alternate, u);
          break;
        default:
          Ka(l, u);
      }
      e = e.sibling;
    }
}
var Ca = 8192;
function hu(t) {
  if (t.subtreeFlags & Ca)
    for (t = t.child; t !== null; )
      Ly(t), t = t.sibling;
}
function Ly(t) {
  switch (t.tag) {
    case 26:
      hu(t), t.flags & Ca && t.memoizedState !== null && e1(
        de,
        t.memoizedState,
        t.memoizedProps
      );
      break;
    case 5:
      hu(t);
      break;
    case 3:
    case 4:
      var e = de;
      de = wi(t.stateNode.containerInfo), hu(t), de = e;
      break;
    case 22:
      t.memoizedState === null && (e = t.alternate, e !== null && e.memoizedState !== null ? (e = Ca, Ca = 16777216, hu(t), Ca = e) : hu(t));
      break;
    default:
      hu(t);
  }
}
function Ky(t) {
  var e = t.alternate;
  if (e !== null && (t = e.child, t !== null)) {
    e.child = null;
    do
      e = t.sibling, t.sibling = null, t = e;
    while (t !== null);
  }
}
function Da(t) {
  var e = t.deletions;
  if (t.flags & 16) {
    if (e !== null)
      for (var l = 0; l < e.length; l++) {
        var u = e[l];
        St = u, Jy(
          u,
          t
        );
      }
    Ky(t);
  }
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; )
      Vy(t), t = t.sibling;
}
function Vy(t) {
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      Da(t), t.flags & 2048 && zl(9, t, t.return);
      break;
    case 3:
      Da(t);
      break;
    case 12:
      Da(t);
      break;
    case 22:
      var e = t.stateNode;
      t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, ri(t)) : Da(t);
      break;
    default:
      Da(t);
  }
}
function ri(t) {
  var e = t.deletions;
  if (t.flags & 16) {
    if (e !== null)
      for (var l = 0; l < e.length; l++) {
        var u = e[l];
        St = u, Jy(
          u,
          t
        );
      }
    Ky(t);
  }
  for (t = t.child; t !== null; ) {
    switch (e = t, e.tag) {
      case 0:
      case 11:
      case 15:
        zl(8, e, e.return), ri(e);
        break;
      case 22:
        l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, ri(e));
        break;
      default:
        ri(e);
    }
    t = t.sibling;
  }
}
function Jy(t, e) {
  for (; St !== null; ) {
    var l = St;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        zl(8, l, e);
        break;
      case 23:
      case 22:
        if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
          var u = l.memoizedState.cachePool.pool;
          u != null && u.refCount++;
        }
        break;
      case 24:
        Rn(l.memoizedState.cache);
    }
    if (u = l.child, u !== null) u.return = l, St = u;
    else
      t: for (l = t; St !== null; ) {
        u = St;
        var a = u.sibling, n = u.return;
        if (By(u), u === l) {
          St = null;
          break t;
        }
        if (a !== null) {
          a.return = n, St = a;
          break t;
        }
        St = n;
      }
  }
}
var gg = {
  getCacheForType: function(t) {
    var e = _t(yt), l = e.data.get(t);
    return l === void 0 && (l = t(), e.data.set(t, l)), l;
  }
}, Sg = typeof WeakMap == "function" ? WeakMap : Map, J = 0, k = null, j = null, X = 0, V = 0, Kt = null, gl = !1, ma = !1, vr = !1, Ve = 0, it = 0, Ul = 0, eu = 0, mr = 0, fe = 0, ia = 0, Va = null, Gt = null, jf = !1, gr = 0, qi = 1 / 0, xi = null, Ol = null, Tt = 0, Tl = null, ca = null, Yu = 0, wf = 0, Xf = null, $y = null, Ja = 0, Zf = null;
function Ft() {
  if (J & 2 && X !== 0)
    return X & -X;
  if (C.T !== null) {
    var t = la;
    return t !== 0 ? t : br();
  }
  return nd();
}
function Fy() {
  fe === 0 && (fe = !(X & 536870912) || Z ? ed() : 536870912);
  var t = se.current;
  return t !== null && (t.flags |= 32), fe;
}
function Wt(t, e, l) {
  (t === k && (V === 2 || V === 9) || t.cancelPendingCommit !== null) && (fa(t, 0), Sl(
    t,
    X,
    fe,
    !1
  )), En(t, l), (!(J & 2) || t !== k) && (t === k && (!(J & 2) && (eu |= l), it === 4 && Sl(
    t,
    X,
    fe,
    !1
  )), De(t));
}
function Wy(t, e, l) {
  if (J & 6) throw Error(p(327));
  var u = !l && (e & 124) === 0 && (e & t.expiredLanes) === 0 || pn(t, e), a = u ? Eg(t, e) : Wc(t, e, !0), n = u;
  do {
    if (a === 0) {
      ma && !u && Sl(t, e, 0, !1);
      break;
    } else {
      if (l = t.current.alternate, n && !bg(l)) {
        a = Wc(t, e, !1), n = !1;
        continue;
      }
      if (a === 2) {
        if (n = e, t.errorRecoveryDisabledLanes & n)
          var i = 0;
        else
          i = t.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
        if (i !== 0) {
          e = i;
          t: {
            var c = t;
            a = Va;
            var f = c.current.memoizedState.isDehydrated;
            if (f && (fa(c, i).flags |= 256), i = Wc(
              c,
              i,
              !1
            ), i !== 2) {
              if (vr && !f) {
                c.errorRecoveryDisabledLanes |= n, eu |= n, a = 4;
                break t;
              }
              n = Gt, Gt = a, n !== null && (Gt === null ? Gt = n : Gt.push.apply(
                Gt,
                n
              ));
            }
            a = i;
          }
          if (n = !1, a !== 2) continue;
        }
      }
      if (a === 1) {
        fa(t, 0), Sl(t, e, 0, !0);
        break;
      }
      t: {
        switch (u = t, n = a, n) {
          case 0:
          case 1:
            throw Error(p(345));
          case 4:
            if ((e & 4194048) !== e) break;
          case 6:
            Sl(
              u,
              e,
              fe,
              !gl
            );
            break t;
          case 2:
            Gt = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(p(329));
        }
        if ((e & 62914560) === e && (a = gr + 300 - Ae(), 10 < a)) {
          if (Sl(
            u,
            e,
            fe,
            !gl
          ), ki(u, 0, !0) !== 0) break t;
          u.timeoutHandle = vv(
            jo.bind(
              null,
              u,
              l,
              Gt,
              xi,
              jf,
              e,
              fe,
              eu,
              ia,
              gl,
              n,
              2,
              -0,
              0
            ),
            a
          );
          break t;
        }
        jo(
          u,
          l,
          Gt,
          xi,
          jf,
          e,
          fe,
          eu,
          ia,
          gl,
          n,
          0,
          -0,
          0
        );
      }
    }
    break;
  } while (!0);
  De(t);
}
function jo(t, e, l, u, a, n, i, c, f, o, g, v, s, y) {
  if (t.timeoutHandle = -1, v = e.subtreeFlags, (v & 8192 || (v & 16785408) === 16785408) && (an = { stylesheets: null, count: 0, unsuspend: t1 }, Ly(e), v = l1(), v !== null)) {
    t.cancelPendingCommit = v(
      Xo.bind(
        null,
        t,
        e,
        n,
        l,
        u,
        a,
        i,
        c,
        f,
        g,
        1,
        s,
        y
      )
    ), Sl(t, n, i, !o);
    return;
  }
  Xo(
    t,
    e,
    n,
    l,
    u,
    a,
    i,
    c,
    f
  );
}
function bg(t) {
  for (var e = t; ; ) {
    var l = e.tag;
    if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
      for (var u = 0; u < l.length; u++) {
        var a = l[u], n = a.getSnapshot;
        a = a.value;
        try {
          if (!kt(n(), a)) return !1;
        } catch {
          return !1;
        }
      }
    if (l = e.child, e.subtreeFlags & 16384 && l !== null)
      l.return = e, e = l;
    else {
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return !0;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
  }
  return !0;
}
function Sl(t, e, l, u) {
  e &= ~mr, e &= ~eu, t.suspendedLanes |= e, t.pingedLanes &= ~e, u && (t.warmLanes |= e), u = t.expirationTimes;
  for (var a = e; 0 < a; ) {
    var n = 31 - $t(a), i = 1 << n;
    u[n] = -1, a &= ~i;
  }
  l !== 0 && ud(t, l, e);
}
function cc() {
  return J & 6 ? !0 : (Qn(0), !1);
}
function Sr() {
  if (j !== null) {
    if (V === 0)
      var t = j.return;
    else
      t = j, Be = ru = null, ar(t), xu = null, en = 0, t = j;
    for (; t !== null; )
      Qy(t.alternate, t), t = t.return;
    j = null;
  }
}
function fa(t, e) {
  var l = t.timeoutHandle;
  l !== -1 && (t.timeoutHandle = -1, Yg(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), Sr(), k = t, j = l = je(t.current, null), X = e, V = 0, Kt = null, gl = !1, ma = pn(t, e), vr = !1, ia = fe = mr = eu = Ul = it = 0, Gt = Va = null, jf = !1, e & 8 && (e |= e & 32);
  var u = t.entangledLanes;
  if (u !== 0)
    for (t = t.entanglements, u &= e; 0 < u; ) {
      var a = 31 - $t(u), n = 1 << a;
      e |= t[a], u &= ~n;
    }
  return Ve = e, ec(), l;
}
function ky(t, e) {
  x = null, C.H = zi, e === Dn || e === uc ? (e = So(), V = 3) : e === qd ? (e = So(), V = 4) : V = e === My ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Kt = e, j === null && (it = 1, Ci(
    t,
    ce(e, t.current)
  ));
}
function Py() {
  var t = C.H;
  return C.H = zi, t === null ? zi : t;
}
function Iy() {
  var t = C.A;
  return C.A = gg, t;
}
function Lf() {
  it = 4, gl || (X & 4194048) !== X && se.current !== null || (ma = !0), !(Ul & 134217727) && !(eu & 134217727) || k === null || Sl(
    k,
    X,
    fe,
    !1
  );
}
function Wc(t, e, l) {
  var u = J;
  J |= 2;
  var a = Py(), n = Iy();
  (k !== t || X !== e) && (xi = null, fa(t, e)), e = !1;
  var i = it;
  t: do
    try {
      if (V !== 0 && j !== null) {
        var c = j, f = Kt;
        switch (V) {
          case 8:
            Sr(), i = 6;
            break t;
          case 3:
          case 2:
          case 9:
          case 6:
            se.current === null && (e = !0);
            var o = V;
            if (V = 0, Kt = null, zu(t, c, f, o), l && ma) {
              i = 0;
              break t;
            }
            break;
          default:
            o = V, V = 0, Kt = null, zu(t, c, f, o);
        }
      }
      pg(), i = it;
      break;
    } catch (g) {
      ky(t, g);
    }
  while (!0);
  return e && t.shellSuspendCounter++, Be = ru = null, J = u, C.H = a, C.A = n, j === null && (k = null, X = 0, ec()), i;
}
function pg() {
  for (; j !== null; ) tv(j);
}
function Eg(t, e) {
  var l = J;
  J |= 2;
  var u = Py(), a = Iy();
  k !== t || X !== e ? (xi = null, qi = Ae() + 500, fa(t, e)) : ma = pn(
    t,
    e
  );
  t: do
    try {
      if (V !== 0 && j !== null) {
        e = j;
        var n = Kt;
        e: switch (V) {
          case 1:
            V = 0, Kt = null, zu(t, e, n, 1);
            break;
          case 2:
          case 9:
            if (go(n)) {
              V = 0, Kt = null, wo(e);
              break;
            }
            e = function() {
              V !== 2 && V !== 9 || k !== t || (V = 7), De(t);
            }, n.then(e, e);
            break t;
          case 3:
            V = 7;
            break t;
          case 4:
            V = 5;
            break t;
          case 7:
            go(n) ? (V = 0, Kt = null, wo(e)) : (V = 0, Kt = null, zu(t, e, n, 7));
            break;
          case 5:
            var i = null;
            switch (j.tag) {
              case 26:
                i = j.memoizedState;
              case 5:
              case 27:
                var c = j;
                if (!i || bv(i)) {
                  V = 0, Kt = null;
                  var f = c.sibling;
                  if (f !== null) j = f;
                  else {
                    var o = c.return;
                    o !== null ? (j = o, fc(o)) : j = null;
                  }
                  break e;
                }
            }
            V = 0, Kt = null, zu(t, e, n, 5);
            break;
          case 6:
            V = 0, Kt = null, zu(t, e, n, 6);
            break;
          case 8:
            Sr(), it = 6;
            break t;
          default:
            throw Error(p(462));
        }
      }
      Og();
      break;
    } catch (g) {
      ky(t, g);
    }
  while (!0);
  return Be = ru = null, C.H = u, C.A = a, J = l, j !== null ? 0 : (k = null, X = 0, ec(), it);
}
function Og() {
  for (; j !== null && !L0(); )
    tv(j);
}
function tv(t) {
  var e = Uy(t.alternate, t, Ve);
  t.memoizedProps = t.pendingProps, e === null ? fc(t) : j = e;
}
function wo(t) {
  var e = t, l = e.alternate;
  switch (e.tag) {
    case 15:
    case 0:
      e = No(
        l,
        e,
        e.pendingProps,
        e.type,
        void 0,
        X
      );
      break;
    case 11:
      e = No(
        l,
        e,
        e.pendingProps,
        e.type.render,
        e.ref,
        X
      );
      break;
    case 5:
      ar(e);
    default:
      Qy(l, e), e = j = Qd(e, Ve), e = Uy(l, e, Ve);
  }
  t.memoizedProps = t.pendingProps, e === null ? fc(t) : j = e;
}
function zu(t, e, l, u) {
  Be = ru = null, ar(e), xu = null, en = 0;
  var a = e.return;
  try {
    if (og(
      t,
      a,
      e,
      l,
      X
    )) {
      it = 1, Ci(
        t,
        ce(l, t.current)
      ), j = null;
      return;
    }
  } catch (n) {
    if (a !== null) throw j = a, n;
    it = 1, Ci(
      t,
      ce(l, t.current)
    ), j = null;
    return;
  }
  e.flags & 32768 ? (Z || u === 1 ? t = !0 : ma || X & 536870912 ? t = !1 : (gl = t = !0, (u === 2 || u === 9 || u === 3 || u === 6) && (u = se.current, u !== null && u.tag === 13 && (u.flags |= 16384))), ev(e, t)) : fc(e);
}
function fc(t) {
  var e = t;
  do {
    if (e.flags & 32768) {
      ev(
        e,
        gl
      );
      return;
    }
    t = e.return;
    var l = dg(
      e.alternate,
      e,
      Ve
    );
    if (l !== null) {
      j = l;
      return;
    }
    if (e = e.sibling, e !== null) {
      j = e;
      return;
    }
    j = e = t;
  } while (e !== null);
  it === 0 && (it = 5);
}
function ev(t, e) {
  do {
    var l = yg(t.alternate, t);
    if (l !== null) {
      l.flags &= 32767, j = l;
      return;
    }
    if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
      j = t;
      return;
    }
    j = t = l;
  } while (t !== null);
  it = 6, j = null;
}
function Xo(t, e, l, u, a, n, i, c, f) {
  t.cancelPendingCommit = null;
  do
    sc();
  while (Tt !== 0);
  if (J & 6) throw Error(p(327));
  if (e !== null) {
    if (e === t.current) throw Error(p(177));
    if (n = e.lanes | e.childLanes, n |= Ks, tm(
      t,
      l,
      n,
      i,
      c,
      f
    ), t === k && (j = k = null, X = 0), ca = e, Tl = t, Yu = l, wf = n, Xf = a, $y = u, e.subtreeFlags & 10256 || e.flags & 10256 ? (t.callbackNode = null, t.callbackPriority = 0, Rg(bi, function() {
      return iv(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), u = (e.flags & 13878) !== 0, e.subtreeFlags & 13878 || u) {
      u = C.T, C.T = null, a = L.p, L.p = 2, i = J, J |= 4;
      try {
        vg(t, e, l);
      } finally {
        J = i, L.p = a, C.T = u;
      }
    }
    Tt = 1, lv(), uv(), av();
  }
}
function lv() {
  if (Tt === 1) {
    Tt = 0;
    var t = Tl, e = ca, l = (e.flags & 13878) !== 0;
    if (e.subtreeFlags & 13878 || l) {
      l = C.T, C.T = null;
      var u = L.p;
      L.p = 2;
      var a = J;
      J |= 4;
      try {
        wy(e, t);
        var n = $f, i = Td(t.containerInfo), c = n.focusedElem, f = n.selectionRange;
        if (i !== c && c && c.ownerDocument && Od(
          c.ownerDocument.documentElement,
          c
        )) {
          if (f !== null && Ls(c)) {
            var o = f.start, g = f.end;
            if (g === void 0 && (g = o), "selectionStart" in c)
              c.selectionStart = o, c.selectionEnd = Math.min(
                g,
                c.value.length
              );
            else {
              var v = c.ownerDocument || document, s = v && v.defaultView || window;
              if (s.getSelection) {
                var y = s.getSelection(), E = c.textContent.length, b = Math.min(f.start, E), O = f.end === void 0 ? b : Math.min(f.end, E);
                !y.extend && b > O && (i = O, O = b, b = i);
                var d = fo(
                  c,
                  b
                ), h = fo(
                  c,
                  O
                );
                if (d && h && (y.rangeCount !== 1 || y.anchorNode !== d.node || y.anchorOffset !== d.offset || y.focusNode !== h.node || y.focusOffset !== h.offset)) {
                  var m = v.createRange();
                  m.setStart(d.node, d.offset), y.removeAllRanges(), b > O ? (y.addRange(m), y.extend(h.node, h.offset)) : (m.setEnd(h.node, h.offset), y.addRange(m));
                }
              }
            }
          }
          for (v = [], y = c; y = y.parentNode; )
            y.nodeType === 1 && v.push({
              element: y,
              left: y.scrollLeft,
              top: y.scrollTop
            });
          for (typeof c.focus == "function" && c.focus(), c = 0; c < v.length; c++) {
            var S = v[c];
            S.element.scrollLeft = S.left, S.element.scrollTop = S.top;
          }
        }
        Li = !!Jf, $f = Jf = null;
      } finally {
        J = a, L.p = u, C.T = l;
      }
    }
    t.current = e, Tt = 2;
  }
}
function uv() {
  if (Tt === 2) {
    Tt = 0;
    var t = Tl, e = ca, l = (e.flags & 8772) !== 0;
    if (e.subtreeFlags & 8772 || l) {
      l = C.T, C.T = null;
      var u = L.p;
      L.p = 2;
      var a = J;
      J |= 4;
      try {
        Yy(t, e.alternate, e);
      } finally {
        J = a, L.p = u, C.T = l;
      }
    }
    Tt = 3;
  }
}
function av() {
  if (Tt === 4 || Tt === 3) {
    Tt = 0, K0();
    var t = Tl, e = ca, l = Yu, u = $y;
    e.subtreeFlags & 10256 || e.flags & 10256 ? Tt = 5 : (Tt = 0, ca = Tl = null, nv(t, t.pendingLanes));
    var a = t.pendingLanes;
    if (a === 0 && (Ol = null), Ys(l), e = e.stateNode, Jt && typeof Jt.onCommitFiberRoot == "function")
      try {
        Jt.onCommitFiberRoot(
          bn,
          e,
          void 0,
          (e.current.flags & 128) === 128
        );
      } catch {
      }
    if (u !== null) {
      e = C.T, a = L.p, L.p = 2, C.T = null;
      try {
        for (var n = t.onRecoverableError, i = 0; i < u.length; i++) {
          var c = u[i];
          n(c.value, {
            componentStack: c.stack
          });
        }
      } finally {
        C.T = e, L.p = a;
      }
    }
    Yu & 3 && sc(), De(t), a = t.pendingLanes, l & 4194090 && a & 42 ? t === Zf ? Ja++ : (Ja = 0, Zf = t) : Ja = 0, Qn(0);
  }
}
function nv(t, e) {
  (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Rn(e)));
}
function sc(t) {
  return lv(), uv(), av(), iv();
}
function iv() {
  if (Tt !== 5) return !1;
  var t = Tl, e = wf;
  wf = 0;
  var l = Ys(Yu), u = C.T, a = L.p;
  try {
    L.p = 32 > l ? 32 : l, C.T = null, l = Xf, Xf = null;
    var n = Tl, i = Yu;
    if (Tt = 0, ca = Tl = null, Yu = 0, J & 6) throw Error(p(331));
    var c = J;
    if (J |= 4, Vy(n.current), Zy(
      n,
      n.current,
      i,
      l
    ), J = c, Qn(0, !1), Jt && typeof Jt.onPostCommitFiberRoot == "function")
      try {
        Jt.onPostCommitFiberRoot(bn, n);
      } catch {
      }
    return !0;
  } finally {
    L.p = a, C.T = u, nv(t, e);
  }
}
function Zo(t, e, l) {
  e = ce(l, e), e = xf(t.stateNode, e, 2), t = El(t, e, 2), t !== null && (En(t, 2), De(t));
}
function W(t, e, l) {
  if (t.tag === 3)
    Zo(t, t, l);
  else
    for (; e !== null; ) {
      if (e.tag === 3) {
        Zo(
          e,
          t,
          l
        );
        break;
      } else if (e.tag === 1) {
        var u = e.stateNode;
        if (typeof e.type.getDerivedStateFromError == "function" || typeof u.componentDidCatch == "function" && (Ol === null || !Ol.has(u))) {
          t = ce(l, t), l = Ty(2), u = El(e, l, 2), u !== null && (Ay(
            l,
            u,
            e,
            t
          ), En(u, 2), De(u));
          break;
        }
      }
      e = e.return;
    }
}
function kc(t, e, l) {
  var u = t.pingCache;
  if (u === null) {
    u = t.pingCache = new Sg();
    var a = /* @__PURE__ */ new Set();
    u.set(e, a);
  } else
    a = u.get(e), a === void 0 && (a = /* @__PURE__ */ new Set(), u.set(e, a));
  a.has(l) || (vr = !0, a.add(l), t = Tg.bind(null, t, e, l), e.then(t, t));
}
function Tg(t, e, l) {
  var u = t.pingCache;
  u !== null && u.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, k === t && (X & l) === l && (it === 4 || it === 3 && (X & 62914560) === X && 300 > Ae() - gr ? !(J & 2) && fa(t, 0) : mr |= l, ia === X && (ia = 0)), De(t);
}
function cv(t, e) {
  e === 0 && (e = ld()), t = va(t, e), t !== null && (En(t, e), De(t));
}
function Ag(t) {
  var e = t.memoizedState, l = 0;
  e !== null && (l = e.retryLane), cv(t, l);
}
function Mg(t, e) {
  var l = 0;
  switch (t.tag) {
    case 13:
      var u = t.stateNode, a = t.memoizedState;
      a !== null && (l = a.retryLane);
      break;
    case 19:
      u = t.stateNode;
      break;
    case 22:
      u = t.stateNode._retryCache;
      break;
    default:
      throw Error(p(314));
  }
  u !== null && u.delete(e), cv(t, l);
}
function Rg(t, e) {
  return qs(t, e);
}
var Yi = null, gu = null, Kf = !1, Bi = !1, Pc = !1, lu = 0;
function De(t) {
  t !== gu && t.next === null && (gu === null ? Yi = gu = t : gu = gu.next = t), Bi = !0, Kf || (Kf = !0, _g());
}
function Qn(t, e) {
  if (!Pc && Bi) {
    Pc = !0;
    do
      for (var l = !1, u = Yi; u !== null; ) {
        if (t !== 0) {
          var a = u.pendingLanes;
          if (a === 0) var n = 0;
          else {
            var i = u.suspendedLanes, c = u.pingedLanes;
            n = (1 << 31 - $t(42 | t) + 1) - 1, n &= a & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
          }
          n !== 0 && (l = !0, Lo(u, n));
        } else
          n = X, n = ki(
            u,
            u === k ? n : 0,
            u.cancelPendingCommit !== null || u.timeoutHandle !== -1
          ), !(n & 3) || pn(u, n) || (l = !0, Lo(u, n));
        u = u.next;
      }
    while (l);
    Pc = !1;
  }
}
function Dg() {
  fv();
}
function fv() {
  Bi = Kf = !1;
  var t = 0;
  lu !== 0 && (xg() && (t = lu), lu = 0);
  for (var e = Ae(), l = null, u = Yi; u !== null; ) {
    var a = u.next, n = sv(u, e);
    n === 0 ? (u.next = null, l === null ? Yi = a : l.next = a, a === null && (gu = l)) : (l = u, (t !== 0 || n & 3) && (Bi = !0)), u = a;
  }
  Qn(t);
}
function sv(t, e) {
  for (var l = t.suspendedLanes, u = t.pingedLanes, a = t.expirationTimes, n = t.pendingLanes & -62914561; 0 < n; ) {
    var i = 31 - $t(n), c = 1 << i, f = a[i];
    f === -1 ? (!(c & l) || c & u) && (a[i] = I0(c, e)) : f <= e && (t.expiredLanes |= c), n &= ~c;
  }
  if (e = k, l = X, l = ki(
    t,
    t === e ? l : 0,
    t.cancelPendingCommit !== null || t.timeoutHandle !== -1
  ), u = t.callbackNode, l === 0 || t === e && (V === 2 || V === 9) || t.cancelPendingCommit !== null)
    return u !== null && u !== null && Ac(u), t.callbackNode = null, t.callbackPriority = 0;
  if (!(l & 3) || pn(t, l)) {
    if (e = l & -l, e === t.callbackPriority) return e;
    switch (u !== null && Ac(u), Ys(l)) {
      case 2:
      case 8:
        l = Ih;
        break;
      case 32:
        l = bi;
        break;
      case 268435456:
        l = td;
        break;
      default:
        l = bi;
    }
    return u = rv.bind(null, t), l = qs(l, u), t.callbackPriority = e, t.callbackNode = l, e;
  }
  return u !== null && u !== null && Ac(u), t.callbackPriority = 2, t.callbackNode = null, 2;
}
function rv(t, e) {
  if (Tt !== 0 && Tt !== 5)
    return t.callbackNode = null, t.callbackPriority = 0, null;
  var l = t.callbackNode;
  if (sc() && t.callbackNode !== l)
    return null;
  var u = X;
  return u = ki(
    t,
    t === k ? u : 0,
    t.cancelPendingCommit !== null || t.timeoutHandle !== -1
  ), u === 0 ? null : (Wy(t, u, e), sv(t, Ae()), t.callbackNode != null && t.callbackNode === l ? rv.bind(null, t) : null);
}
function Lo(t, e) {
  if (sc()) return null;
  Wy(t, e, !0);
}
function _g() {
  Bg(function() {
    J & 6 ? qs(
      Ph,
      Dg
    ) : fv();
  });
}
function br() {
  return lu === 0 && (lu = ed()), lu;
}
function Ko(t) {
  return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : li("" + t);
}
function Vo(t, e) {
  var l = e.ownerDocument.createElement("input");
  return l.name = e.name, l.value = e.value, t.id && l.setAttribute("form", t.id), e.parentNode.insertBefore(l, e), t = new FormData(t), l.parentNode.removeChild(l), t;
}
function zg(t, e, l, u, a) {
  if (e === "submit" && l && l.stateNode === a) {
    var n = Ko(
      (a[wt] || null).action
    ), i = u.submitter;
    i && (e = (e = i[wt] || null) ? Ko(e.formAction) : i.getAttribute("formAction"), e !== null && (n = e, i = null));
    var c = new Pi(
      "action",
      "action",
      null,
      u,
      a
    );
    t.push({
      event: c,
      listeners: [
        {
          instance: null,
          listener: function() {
            if (u.defaultPrevented) {
              if (lu !== 0) {
                var f = i ? Vo(a, i) : new FormData(a);
                Nf(
                  l,
                  {
                    pending: !0,
                    data: f,
                    method: a.method,
                    action: n
                  },
                  null,
                  f
                );
              }
            } else
              typeof n == "function" && (c.preventDefault(), f = i ? Vo(a, i) : new FormData(a), Nf(
                l,
                {
                  pending: !0,
                  data: f,
                  method: a.method,
                  action: n
                },
                n,
                f
              ));
          },
          currentTarget: a
        }
      ]
    });
  }
}
for (var Ic = 0; Ic < Of.length; Ic++) {
  var tf = Of[Ic], Ug = tf.toLowerCase(), Qg = tf[0].toUpperCase() + tf.slice(1);
  ve(
    Ug,
    "on" + Qg
  );
}
ve(Md, "onAnimationEnd");
ve(Rd, "onAnimationIteration");
ve(Dd, "onAnimationStart");
ve("dblclick", "onDoubleClick");
ve("focusin", "onFocus");
ve("focusout", "onBlur");
ve($m, "onTransitionRun");
ve(Fm, "onTransitionStart");
ve(Wm, "onTransitionCancel");
ve(_d, "onTransitionEnd");
ta("onMouseEnter", ["mouseout", "mouseover"]);
ta("onMouseLeave", ["mouseout", "mouseover"]);
ta("onPointerEnter", ["pointerout", "pointerover"]);
ta("onPointerLeave", ["pointerout", "pointerover"]);
cu(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
cu(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
cu("onBeforeInput", [
  "compositionend",
  "keypress",
  "textInput",
  "paste"
]);
cu(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
cu(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
cu(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var ln = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
  " "
), Cg = new Set(
  "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ln)
);
function ov(t, e) {
  e = (e & 4) !== 0;
  for (var l = 0; l < t.length; l++) {
    var u = t[l], a = u.event;
    u = u.listeners;
    t: {
      var n = void 0;
      if (e)
        for (var i = u.length - 1; 0 <= i; i--) {
          var c = u[i], f = c.instance, o = c.currentTarget;
          if (c = c.listener, f !== n && a.isPropagationStopped())
            break t;
          n = c, a.currentTarget = o;
          try {
            n(a);
          } catch (g) {
            Qi(g);
          }
          a.currentTarget = null, n = f;
        }
      else
        for (i = 0; i < u.length; i++) {
          if (c = u[i], f = c.instance, o = c.currentTarget, c = c.listener, f !== n && a.isPropagationStopped())
            break t;
          n = c, a.currentTarget = o;
          try {
            n(a);
          } catch (g) {
            Qi(g);
          }
          a.currentTarget = null, n = f;
        }
    }
  }
}
function G(t, e) {
  var l = e[vf];
  l === void 0 && (l = e[vf] = /* @__PURE__ */ new Set());
  var u = t + "__bubble";
  l.has(u) || (hv(e, t, 2, !1), l.add(u));
}
function ef(t, e, l) {
  var u = 0;
  e && (u |= 4), hv(
    l,
    t,
    u,
    e
  );
}
var Wn = "_reactListening" + Math.random().toString(36).slice(2);
function pr(t) {
  if (!t[Wn]) {
    t[Wn] = !0, id.forEach(function(l) {
      l !== "selectionchange" && (Cg.has(l) || ef(l, !1, t), ef(l, !0, t));
    });
    var e = t.nodeType === 9 ? t : t.ownerDocument;
    e === null || e[Wn] || (e[Wn] = !0, ef("selectionchange", !1, e));
  }
}
function hv(t, e, l, u) {
  switch (Av(e)) {
    case 2:
      var a = n1;
      break;
    case 8:
      a = i1;
      break;
    default:
      a = Ar;
  }
  l = a.bind(
    null,
    e,
    l,
    t
  ), a = void 0, !bf || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (a = !0), u ? a !== void 0 ? t.addEventListener(e, l, {
    capture: !0,
    passive: a
  }) : t.addEventListener(e, l, !0) : a !== void 0 ? t.addEventListener(e, l, {
    passive: a
  }) : t.addEventListener(e, l, !1);
}
function lf(t, e, l, u, a) {
  var n = u;
  if (!(e & 1) && !(e & 2) && u !== null)
    t: for (; ; ) {
      if (u === null) return;
      var i = u.tag;
      if (i === 3 || i === 4) {
        var c = u.stateNode.containerInfo;
        if (c === a) break;
        if (i === 4)
          for (i = u.return; i !== null; ) {
            var f = i.tag;
            if ((f === 3 || f === 4) && i.stateNode.containerInfo === a)
              return;
            i = i.return;
          }
        for (; c !== null; ) {
          if (i = pu(c), i === null) return;
          if (f = i.tag, f === 5 || f === 6 || f === 26 || f === 27) {
            u = n = i;
            continue t;
          }
          c = c.parentNode;
        }
      }
      u = u.return;
    }
  yd(function() {
    var o = n, g = js(l), v = [];
    t: {
      var s = zd.get(t);
      if (s !== void 0) {
        var y = Pi, E = t;
        switch (t) {
          case "keypress":
            if (ai(l) === 0) break t;
          case "keydown":
          case "keyup":
            y = Rm;
            break;
          case "focusin":
            E = "focus", y = Cc;
            break;
          case "focusout":
            E = "blur", y = Cc;
            break;
          case "beforeblur":
          case "afterblur":
            y = Cc;
            break;
          case "click":
            if (l.button === 2) break t;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            y = Pr;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = ym;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = zm;
            break;
          case Md:
          case Rd:
          case Dd:
            y = gm;
            break;
          case _d:
            y = Qm;
            break;
          case "scroll":
          case "scrollend":
            y = hm;
            break;
          case "wheel":
            y = Hm;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = bm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = to;
            break;
          case "toggle":
          case "beforetoggle":
            y = qm;
        }
        var b = (e & 4) !== 0, O = !b && (t === "scroll" || t === "scrollend"), d = b ? s !== null ? s + "Capture" : null : s;
        b = [];
        for (var h = o, m; h !== null; ) {
          var S = h;
          if (m = S.stateNode, S = S.tag, S !== 5 && S !== 26 && S !== 27 || m === null || d === null || (S = Wa(h, d), S != null && b.push(
            un(h, S, m)
          )), O) break;
          h = h.return;
        }
        0 < b.length && (s = new y(
          s,
          E,
          null,
          l,
          g
        ), v.push({ event: s, listeners: b }));
      }
    }
    if (!(e & 7)) {
      t: {
        if (s = t === "mouseover" || t === "pointerover", y = t === "mouseout" || t === "pointerout", s && l !== Sf && (E = l.relatedTarget || l.fromElement) && (pu(E) || E[da]))
          break t;
        if ((y || s) && (s = g.window === g ? g : (s = g.ownerDocument) ? s.defaultView || s.parentWindow : window, y ? (E = l.relatedTarget || l.toElement, y = o, E = E ? pu(E) : null, E !== null && (O = Sn(E), b = E.tag, E !== O || b !== 5 && b !== 27 && b !== 6) && (E = null)) : (y = null, E = o), y !== E)) {
          if (b = Pr, S = "onMouseLeave", d = "onMouseEnter", h = "mouse", (t === "pointerout" || t === "pointerover") && (b = to, S = "onPointerLeave", d = "onPointerEnter", h = "pointer"), O = y == null ? s : Qa(y), m = E == null ? s : Qa(E), s = new b(
            S,
            h + "leave",
            y,
            l,
            g
          ), s.target = O, s.relatedTarget = m, S = null, pu(g) === o && (b = new b(
            d,
            h + "enter",
            E,
            l,
            g
          ), b.target = m, b.relatedTarget = O, S = b), O = S, y && E)
            e: {
              for (b = y, d = E, h = 0, m = b; m; m = du(m))
                h++;
              for (m = 0, S = d; S; S = du(S))
                m++;
              for (; 0 < h - m; )
                b = du(b), h--;
              for (; 0 < m - h; )
                d = du(d), m--;
              for (; h--; ) {
                if (b === d || d !== null && b === d.alternate)
                  break e;
                b = du(b), d = du(d);
              }
              b = null;
            }
          else b = null;
          y !== null && Jo(
            v,
            s,
            y,
            b,
            !1
          ), E !== null && O !== null && Jo(
            v,
            O,
            E,
            b,
            !0
          );
        }
      }
      t: {
        if (s = o ? Qa(o) : window, y = s.nodeName && s.nodeName.toLowerCase(), y === "select" || y === "input" && s.type === "file")
          var T = ao;
        else if (uo(s))
          if (pd)
            T = Km;
          else {
            T = Zm;
            var z = Xm;
          }
        else
          y = s.nodeName, !y || y.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? o && Gs(o.elementType) && (T = ao) : T = Lm;
        if (T && (T = T(t, o))) {
          bd(
            v,
            T,
            l,
            g
          );
          break t;
        }
        z && z(t, s, o), t === "focusout" && o && s.type === "number" && o.memoizedProps.value != null && gf(s, "number", s.value);
      }
      switch (z = o ? Qa(o) : window, t) {
        case "focusin":
          (uo(z) || z.contentEditable === "true") && (Tu = z, pf = o, Ya = null);
          break;
        case "focusout":
          Ya = pf = Tu = null;
          break;
        case "mousedown":
          Ef = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Ef = !1, so(v, l, g);
          break;
        case "selectionchange":
          if (Jm) break;
        case "keydown":
        case "keyup":
          so(v, l, g);
      }
      var M;
      if (Zs)
        t: {
          switch (t) {
            case "compositionstart":
              var R = "onCompositionStart";
              break t;
            case "compositionend":
              R = "onCompositionEnd";
              break t;
            case "compositionupdate":
              R = "onCompositionUpdate";
              break t;
          }
          R = void 0;
        }
      else
        Ou ? gd(t, l) && (R = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (R = "onCompositionStart");
      R && (md && l.locale !== "ko" && (Ou || R !== "onCompositionStart" ? R === "onCompositionEnd" && Ou && (M = vd()) : (ml = g, ws = "value" in ml ? ml.value : ml.textContent, Ou = !0)), z = Gi(o, R), 0 < z.length && (R = new Ir(
        R,
        t,
        null,
        l,
        g
      ), v.push({ event: R, listeners: z }), M ? R.data = M : (M = Sd(l), M !== null && (R.data = M)))), (M = Ym ? Bm(t, l) : Gm(t, l)) && (R = Gi(o, "onBeforeInput"), 0 < R.length && (z = new Ir(
        "onBeforeInput",
        "beforeinput",
        null,
        l,
        g
      ), v.push({
        event: z,
        listeners: R
      }), z.data = M)), zg(
        v,
        t,
        o,
        l,
        g
      );
    }
    ov(v, e);
  });
}
function un(t, e, l) {
  return {
    instance: t,
    listener: e,
    currentTarget: l
  };
}
function Gi(t, e) {
  for (var l = e + "Capture", u = []; t !== null; ) {
    var a = t, n = a.stateNode;
    if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || n === null || (a = Wa(t, l), a != null && u.unshift(
      un(t, a, n)
    ), a = Wa(t, e), a != null && u.push(
      un(t, a, n)
    )), t.tag === 3) return u;
    t = t.return;
  }
  return [];
}
function du(t) {
  if (t === null) return null;
  do
    t = t.return;
  while (t && t.tag !== 5 && t.tag !== 27);
  return t || null;
}
function Jo(t, e, l, u, a) {
  for (var n = e._reactName, i = []; l !== null && l !== u; ) {
    var c = l, f = c.alternate, o = c.stateNode;
    if (c = c.tag, f !== null && f === u) break;
    c !== 5 && c !== 26 && c !== 27 || o === null || (f = o, a ? (o = Wa(l, n), o != null && i.unshift(
      un(l, o, f)
    )) : a || (o = Wa(l, n), o != null && i.push(
      un(l, o, f)
    ))), l = l.return;
  }
  i.length !== 0 && t.push({ event: e, listeners: i });
}
var Hg = /\r\n?/g, Ng = /\u0000|\uFFFD/g;
function $o(t) {
  return (typeof t == "string" ? t : "" + t).replace(Hg, `
`).replace(Ng, "");
}
function dv(t, e) {
  return e = $o(e), $o(t) === e;
}
function rc() {
}
function $(t, e, l, u, a, n) {
  switch (l) {
    case "children":
      typeof u == "string" ? e === "body" || e === "textarea" && u === "" || ea(t, u) : (typeof u == "number" || typeof u == "bigint") && e !== "body" && ea(t, "" + u);
      break;
    case "className":
      Zn(t, "class", u);
      break;
    case "tabIndex":
      Zn(t, "tabindex", u);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      Zn(t, l, u);
      break;
    case "style":
      dd(t, u, n);
      break;
    case "data":
      if (e !== "object") {
        Zn(t, "data", u);
        break;
      }
    case "src":
    case "href":
      if (u === "" && (e !== "a" || l !== "href")) {
        t.removeAttribute(l);
        break;
      }
      if (u == null || typeof u == "function" || typeof u == "symbol" || typeof u == "boolean") {
        t.removeAttribute(l);
        break;
      }
      u = li("" + u), t.setAttribute(l, u);
      break;
    case "action":
    case "formAction":
      if (typeof u == "function") {
        t.setAttribute(
          l,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
        );
        break;
      } else
        typeof n == "function" && (l === "formAction" ? (e !== "input" && $(t, e, "name", a.name, a, null), $(
          t,
          e,
          "formEncType",
          a.formEncType,
          a,
          null
        ), $(
          t,
          e,
          "formMethod",
          a.formMethod,
          a,
          null
        ), $(
          t,
          e,
          "formTarget",
          a.formTarget,
          a,
          null
        )) : ($(t, e, "encType", a.encType, a, null), $(t, e, "method", a.method, a, null), $(t, e, "target", a.target, a, null)));
      if (u == null || typeof u == "symbol" || typeof u == "boolean") {
        t.removeAttribute(l);
        break;
      }
      u = li("" + u), t.setAttribute(l, u);
      break;
    case "onClick":
      u != null && (t.onclick = rc);
      break;
    case "onScroll":
      u != null && G("scroll", t);
      break;
    case "onScrollEnd":
      u != null && G("scrollend", t);
      break;
    case "dangerouslySetInnerHTML":
      if (u != null) {
        if (typeof u != "object" || !("__html" in u))
          throw Error(p(61));
        if (l = u.__html, l != null) {
          if (a.children != null) throw Error(p(60));
          t.innerHTML = l;
        }
      }
      break;
    case "multiple":
      t.multiple = u && typeof u != "function" && typeof u != "symbol";
      break;
    case "muted":
      t.muted = u && typeof u != "function" && typeof u != "symbol";
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
      break;
    case "autoFocus":
      break;
    case "xlinkHref":
      if (u == null || typeof u == "function" || typeof u == "boolean" || typeof u == "symbol") {
        t.removeAttribute("xlink:href");
        break;
      }
      l = li("" + u), t.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        l
      );
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      u != null && typeof u != "function" && typeof u != "symbol" ? t.setAttribute(l, "" + u) : t.removeAttribute(l);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      u && typeof u != "function" && typeof u != "symbol" ? t.setAttribute(l, "") : t.removeAttribute(l);
      break;
    case "capture":
    case "download":
      u === !0 ? t.setAttribute(l, "") : u !== !1 && u != null && typeof u != "function" && typeof u != "symbol" ? t.setAttribute(l, u) : t.removeAttribute(l);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      u != null && typeof u != "function" && typeof u != "symbol" && !isNaN(u) && 1 <= u ? t.setAttribute(l, u) : t.removeAttribute(l);
      break;
    case "rowSpan":
    case "start":
      u == null || typeof u == "function" || typeof u == "symbol" || isNaN(u) ? t.removeAttribute(l) : t.setAttribute(l, u);
      break;
    case "popover":
      G("beforetoggle", t), G("toggle", t), ei(t, "popover", u);
      break;
    case "xlinkActuate":
      _e(
        t,
        "http://www.w3.org/1999/xlink",
        "xlink:actuate",
        u
      );
      break;
    case "xlinkArcrole":
      _e(
        t,
        "http://www.w3.org/1999/xlink",
        "xlink:arcrole",
        u
      );
      break;
    case "xlinkRole":
      _e(
        t,
        "http://www.w3.org/1999/xlink",
        "xlink:role",
        u
      );
      break;
    case "xlinkShow":
      _e(
        t,
        "http://www.w3.org/1999/xlink",
        "xlink:show",
        u
      );
      break;
    case "xlinkTitle":
      _e(
        t,
        "http://www.w3.org/1999/xlink",
        "xlink:title",
        u
      );
      break;
    case "xlinkType":
      _e(
        t,
        "http://www.w3.org/1999/xlink",
        "xlink:type",
        u
      );
      break;
    case "xmlBase":
      _e(
        t,
        "http://www.w3.org/XML/1998/namespace",
        "xml:base",
        u
      );
      break;
    case "xmlLang":
      _e(
        t,
        "http://www.w3.org/XML/1998/namespace",
        "xml:lang",
        u
      );
      break;
    case "xmlSpace":
      _e(
        t,
        "http://www.w3.org/XML/1998/namespace",
        "xml:space",
        u
      );
      break;
    case "is":
      ei(t, "is", u);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = rm.get(l) || l, ei(t, l, u));
  }
}
function Vf(t, e, l, u, a, n) {
  switch (l) {
    case "style":
      dd(t, u, n);
      break;
    case "dangerouslySetInnerHTML":
      if (u != null) {
        if (typeof u != "object" || !("__html" in u))
          throw Error(p(61));
        if (l = u.__html, l != null) {
          if (a.children != null) throw Error(p(60));
          t.innerHTML = l;
        }
      }
      break;
    case "children":
      typeof u == "string" ? ea(t, u) : (typeof u == "number" || typeof u == "bigint") && ea(t, "" + u);
      break;
    case "onScroll":
      u != null && G("scroll", t);
      break;
    case "onScrollEnd":
      u != null && G("scrollend", t);
      break;
    case "onClick":
      u != null && (t.onclick = rc);
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!cd.hasOwnProperty(l))
        t: {
          if (l[0] === "o" && l[1] === "n" && (a = l.endsWith("Capture"), e = l.slice(2, a ? l.length - 7 : void 0), n = t[wt] || null, n = n != null ? n[l] : null, typeof n == "function" && t.removeEventListener(e, n, a), typeof u == "function")) {
            typeof n != "function" && n !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(e, u, a);
            break t;
          }
          l in t ? t[l] = u : u === !0 ? t.setAttribute(l, "") : ei(t, l, u);
        }
  }
}
function At(t, e, l) {
  switch (e) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      G("error", t), G("load", t);
      var u = !1, a = !1, n;
      for (n in l)
        if (l.hasOwnProperty(n)) {
          var i = l[n];
          if (i != null)
            switch (n) {
              case "src":
                u = !0;
                break;
              case "srcSet":
                a = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(p(137, e));
              default:
                $(t, e, n, i, l, null);
            }
        }
      a && $(t, e, "srcSet", l.srcSet, l, null), u && $(t, e, "src", l.src, l, null);
      return;
    case "input":
      G("invalid", t);
      var c = n = i = a = null, f = null, o = null;
      for (u in l)
        if (l.hasOwnProperty(u)) {
          var g = l[u];
          if (g != null)
            switch (u) {
              case "name":
                a = g;
                break;
              case "type":
                i = g;
                break;
              case "checked":
                f = g;
                break;
              case "defaultChecked":
                o = g;
                break;
              case "value":
                n = g;
                break;
              case "defaultValue":
                c = g;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (g != null)
                  throw Error(p(137, e));
                break;
              default:
                $(t, e, u, g, l, null);
            }
        }
      rd(
        t,
        n,
        c,
        f,
        o,
        i,
        a,
        !1
      ), pi(t);
      return;
    case "select":
      G("invalid", t), u = i = n = null;
      for (a in l)
        if (l.hasOwnProperty(a) && (c = l[a], c != null))
          switch (a) {
            case "value":
              n = c;
              break;
            case "defaultValue":
              i = c;
              break;
            case "multiple":
              u = c;
            default:
              $(t, e, a, c, l, null);
          }
      e = n, l = i, t.multiple = !!u, e != null ? Qu(t, !!u, e, !1) : l != null && Qu(t, !!u, l, !0);
      return;
    case "textarea":
      G("invalid", t), n = a = u = null;
      for (i in l)
        if (l.hasOwnProperty(i) && (c = l[i], c != null))
          switch (i) {
            case "value":
              u = c;
              break;
            case "defaultValue":
              a = c;
              break;
            case "children":
              n = c;
              break;
            case "dangerouslySetInnerHTML":
              if (c != null) throw Error(p(91));
              break;
            default:
              $(t, e, i, c, l, null);
          }
      hd(t, u, a, n), pi(t);
      return;
    case "option":
      for (f in l)
        if (l.hasOwnProperty(f) && (u = l[f], u != null))
          switch (f) {
            case "selected":
              t.selected = u && typeof u != "function" && typeof u != "symbol";
              break;
            default:
              $(t, e, f, u, l, null);
          }
      return;
    case "dialog":
      G("beforetoggle", t), G("toggle", t), G("cancel", t), G("close", t);
      break;
    case "iframe":
    case "object":
      G("load", t);
      break;
    case "video":
    case "audio":
      for (u = 0; u < ln.length; u++)
        G(ln[u], t);
      break;
    case "image":
      G("error", t), G("load", t);
      break;
    case "details":
      G("toggle", t);
      break;
    case "embed":
    case "source":
    case "link":
      G("error", t), G("load", t);
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (o in l)
        if (l.hasOwnProperty(o) && (u = l[o], u != null))
          switch (o) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(p(137, e));
            default:
              $(t, e, o, u, l, null);
          }
      return;
    default:
      if (Gs(e)) {
        for (g in l)
          l.hasOwnProperty(g) && (u = l[g], u !== void 0 && Vf(
            t,
            e,
            g,
            u,
            l,
            void 0
          ));
        return;
      }
  }
  for (c in l)
    l.hasOwnProperty(c) && (u = l[c], u != null && $(t, e, c, u, l, null));
}
function qg(t, e, l, u) {
  switch (e) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "input":
      var a = null, n = null, i = null, c = null, f = null, o = null, g = null;
      for (y in l) {
        var v = l[y];
        if (l.hasOwnProperty(y) && v != null)
          switch (y) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              f = v;
            default:
              u.hasOwnProperty(y) || $(t, e, y, null, u, v);
          }
      }
      for (var s in u) {
        var y = u[s];
        if (v = l[s], u.hasOwnProperty(s) && (y != null || v != null))
          switch (s) {
            case "type":
              n = y;
              break;
            case "name":
              a = y;
              break;
            case "checked":
              o = y;
              break;
            case "defaultChecked":
              g = y;
              break;
            case "value":
              i = y;
              break;
            case "defaultValue":
              c = y;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (y != null)
                throw Error(p(137, e));
              break;
            default:
              y !== v && $(
                t,
                e,
                s,
                y,
                u,
                v
              );
          }
      }
      mf(
        t,
        i,
        c,
        f,
        o,
        g,
        n,
        a
      );
      return;
    case "select":
      y = i = c = s = null;
      for (n in l)
        if (f = l[n], l.hasOwnProperty(n) && f != null)
          switch (n) {
            case "value":
              break;
            case "multiple":
              y = f;
            default:
              u.hasOwnProperty(n) || $(
                t,
                e,
                n,
                null,
                u,
                f
              );
          }
      for (a in u)
        if (n = u[a], f = l[a], u.hasOwnProperty(a) && (n != null || f != null))
          switch (a) {
            case "value":
              s = n;
              break;
            case "defaultValue":
              c = n;
              break;
            case "multiple":
              i = n;
            default:
              n !== f && $(
                t,
                e,
                a,
                n,
                u,
                f
              );
          }
      e = c, l = i, u = y, s != null ? Qu(t, !!l, s, !1) : !!u != !!l && (e != null ? Qu(t, !!l, e, !0) : Qu(t, !!l, l ? [] : "", !1));
      return;
    case "textarea":
      y = s = null;
      for (c in l)
        if (a = l[c], l.hasOwnProperty(c) && a != null && !u.hasOwnProperty(c))
          switch (c) {
            case "value":
              break;
            case "children":
              break;
            default:
              $(t, e, c, null, u, a);
          }
      for (i in u)
        if (a = u[i], n = l[i], u.hasOwnProperty(i) && (a != null || n != null))
          switch (i) {
            case "value":
              s = a;
              break;
            case "defaultValue":
              y = a;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (a != null) throw Error(p(91));
              break;
            default:
              a !== n && $(t, e, i, a, u, n);
          }
      od(t, s, y);
      return;
    case "option":
      for (var E in l)
        if (s = l[E], l.hasOwnProperty(E) && s != null && !u.hasOwnProperty(E))
          switch (E) {
            case "selected":
              t.selected = !1;
              break;
            default:
              $(
                t,
                e,
                E,
                null,
                u,
                s
              );
          }
      for (f in u)
        if (s = u[f], y = l[f], u.hasOwnProperty(f) && s !== y && (s != null || y != null))
          switch (f) {
            case "selected":
              t.selected = s && typeof s != "function" && typeof s != "symbol";
              break;
            default:
              $(
                t,
                e,
                f,
                s,
                u,
                y
              );
          }
      return;
    case "img":
    case "link":
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
    case "menuitem":
      for (var b in l)
        s = l[b], l.hasOwnProperty(b) && s != null && !u.hasOwnProperty(b) && $(t, e, b, null, u, s);
      for (o in u)
        if (s = u[o], y = l[o], u.hasOwnProperty(o) && s !== y && (s != null || y != null))
          switch (o) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (s != null)
                throw Error(p(137, e));
              break;
            default:
              $(
                t,
                e,
                o,
                s,
                u,
                y
              );
          }
      return;
    default:
      if (Gs(e)) {
        for (var O in l)
          s = l[O], l.hasOwnProperty(O) && s !== void 0 && !u.hasOwnProperty(O) && Vf(
            t,
            e,
            O,
            void 0,
            u,
            s
          );
        for (g in u)
          s = u[g], y = l[g], !u.hasOwnProperty(g) || s === y || s === void 0 && y === void 0 || Vf(
            t,
            e,
            g,
            s,
            u,
            y
          );
        return;
      }
  }
  for (var d in l)
    s = l[d], l.hasOwnProperty(d) && s != null && !u.hasOwnProperty(d) && $(t, e, d, null, u, s);
  for (v in u)
    s = u[v], y = l[v], !u.hasOwnProperty(v) || s === y || s == null && y == null || $(t, e, v, s, u, y);
}
var Jf = null, $f = null;
function ji(t) {
  return t.nodeType === 9 ? t : t.ownerDocument;
}
function Fo(t) {
  switch (t) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function yv(t, e) {
  if (t === 0)
    switch (e) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return t === 1 && e === "foreignObject" ? 0 : t;
}
function Ff(t, e) {
  return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
}
var uf = null;
function xg() {
  var t = window.event;
  return t && t.type === "popstate" ? t === uf ? !1 : (uf = t, !0) : (uf = null, !1);
}
var vv = typeof setTimeout == "function" ? setTimeout : void 0, Yg = typeof clearTimeout == "function" ? clearTimeout : void 0, Wo = typeof Promise == "function" ? Promise : void 0, Bg = typeof queueMicrotask == "function" ? queueMicrotask : typeof Wo < "u" ? function(t) {
  return Wo.resolve(null).then(t).catch(Gg);
} : vv;
function Gg(t) {
  setTimeout(function() {
    throw t;
  });
}
function Nl(t) {
  return t === "head";
}
function ko(t, e) {
  var l = e, u = 0, a = 0;
  do {
    var n = l.nextSibling;
    if (t.removeChild(l), n && n.nodeType === 8)
      if (l = n.data, l === "/$") {
        if (0 < u && 8 > u) {
          l = u;
          var i = t.ownerDocument;
          if (l & 1 && $a(i.documentElement), l & 2 && $a(i.body), l & 4)
            for (l = i.head, $a(l), i = l.firstChild; i; ) {
              var c = i.nextSibling, f = i.nodeName;
              i[On] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && i.rel.toLowerCase() === "stylesheet" || l.removeChild(i), i = c;
            }
        }
        if (a === 0) {
          t.removeChild(n), sn(e);
          return;
        }
        a--;
      } else
        l === "$" || l === "$?" || l === "$!" ? a++ : u = l.charCodeAt(0) - 48;
    else u = 0;
    l = n;
  } while (l);
  sn(e);
}
function Wf(t) {
  var e = t.firstChild;
  for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
    var l = e;
    switch (e = e.nextSibling, l.nodeName) {
      case "HTML":
      case "HEAD":
      case "BODY":
        Wf(l), Bs(l);
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (l.rel.toLowerCase() === "stylesheet") continue;
    }
    t.removeChild(l);
  }
}
function jg(t, e, l, u) {
  for (; t.nodeType === 1; ) {
    var a = l;
    if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
      if (!u && (t.nodeName !== "INPUT" || t.type !== "hidden"))
        break;
    } else if (u) {
      if (!t[On])
        switch (e) {
          case "meta":
            if (!t.hasAttribute("itemprop")) break;
            return t;
          case "link":
            if (n = t.getAttribute("rel"), n === "stylesheet" && t.hasAttribute("data-precedence"))
              break;
            if (n !== a.rel || t.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || t.getAttribute("title") !== (a.title == null ? null : a.title))
              break;
            return t;
          case "style":
            if (t.hasAttribute("data-precedence")) break;
            return t;
          case "script":
            if (n = t.getAttribute("src"), (n !== (a.src == null ? null : a.src) || t.getAttribute("type") !== (a.type == null ? null : a.type) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && n && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
              break;
            return t;
          default:
            return t;
        }
    } else if (e === "input" && t.type === "hidden") {
      var n = a.name == null ? null : "" + a.name;
      if (a.type === "hidden" && t.getAttribute("name") === n)
        return t;
    } else return t;
    if (t = ye(t.nextSibling), t === null) break;
  }
  return null;
}
function wg(t, e, l) {
  if (e === "") return null;
  for (; t.nodeType !== 3; )
    if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = ye(t.nextSibling), t === null)) return null;
  return t;
}
function kf(t) {
  return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState === "complete";
}
function Xg(t, e) {
  var l = t.ownerDocument;
  if (t.data !== "$?" || l.readyState === "complete")
    e();
  else {
    var u = function() {
      e(), l.removeEventListener("DOMContentLoaded", u);
    };
    l.addEventListener("DOMContentLoaded", u), t._reactRetry = u;
  }
}
function ye(t) {
  for (; t != null; t = t.nextSibling) {
    var e = t.nodeType;
    if (e === 1 || e === 3) break;
    if (e === 8) {
      if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "F!" || e === "F")
        break;
      if (e === "/$") return null;
    }
  }
  return t;
}
var Pf = null;
function Po(t) {
  t = t.previousSibling;
  for (var e = 0; t; ) {
    if (t.nodeType === 8) {
      var l = t.data;
      if (l === "$" || l === "$!" || l === "$?") {
        if (e === 0) return t;
        e--;
      } else l === "/$" && e++;
    }
    t = t.previousSibling;
  }
  return null;
}
function mv(t, e, l) {
  switch (e = ji(l), t) {
    case "html":
      if (t = e.documentElement, !t) throw Error(p(452));
      return t;
    case "head":
      if (t = e.head, !t) throw Error(p(453));
      return t;
    case "body":
      if (t = e.body, !t) throw Error(p(454));
      return t;
    default:
      throw Error(p(451));
  }
}
function $a(t) {
  for (var e = t.attributes; e.length; )
    t.removeAttributeNode(e[0]);
  Bs(t);
}
var re = /* @__PURE__ */ new Map(), Io = /* @__PURE__ */ new Set();
function wi(t) {
  return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
}
var Je = L.d;
L.d = {
  f: Zg,
  r: Lg,
  D: Kg,
  C: Vg,
  L: Jg,
  m: $g,
  X: Wg,
  S: Fg,
  M: kg
};
function Zg() {
  var t = Je.f(), e = cc();
  return t || e;
}
function Lg(t) {
  var e = ya(t);
  e !== null && e.tag === 5 && e.type === "form" ? sy(e) : Je.r(t);
}
var ga = typeof document > "u" ? null : document;
function gv(t, e, l) {
  var u = ga;
  if (u && typeof e == "string" && e) {
    var a = ie(e);
    a = 'link[rel="' + t + '"][href="' + a + '"]', typeof l == "string" && (a += '[crossorigin="' + l + '"]'), Io.has(a) || (Io.add(a), t = { rel: t, crossOrigin: l, href: e }, u.querySelector(a) === null && (e = u.createElement("link"), At(e, "link", t), bt(e), u.head.appendChild(e)));
  }
}
function Kg(t) {
  Je.D(t), gv("dns-prefetch", t, null);
}
function Vg(t, e) {
  Je.C(t, e), gv("preconnect", t, e);
}
function Jg(t, e, l) {
  Je.L(t, e, l);
  var u = ga;
  if (u && t && e) {
    var a = 'link[rel="preload"][as="' + ie(e) + '"]';
    e === "image" && l && l.imageSrcSet ? (a += '[imagesrcset="' + ie(
      l.imageSrcSet
    ) + '"]', typeof l.imageSizes == "string" && (a += '[imagesizes="' + ie(
      l.imageSizes
    ) + '"]')) : a += '[href="' + ie(t) + '"]';
    var n = a;
    switch (e) {
      case "style":
        n = sa(t);
        break;
      case "script":
        n = Sa(t);
    }
    re.has(n) || (t = I(
      {
        rel: "preload",
        href: e === "image" && l && l.imageSrcSet ? void 0 : t,
        as: e
      },
      l
    ), re.set(n, t), u.querySelector(a) !== null || e === "style" && u.querySelector(Cn(n)) || e === "script" && u.querySelector(Hn(n)) || (e = u.createElement("link"), At(e, "link", t), bt(e), u.head.appendChild(e)));
  }
}
function $g(t, e) {
  Je.m(t, e);
  var l = ga;
  if (l && t) {
    var u = e && typeof e.as == "string" ? e.as : "script", a = 'link[rel="modulepreload"][as="' + ie(u) + '"][href="' + ie(t) + '"]', n = a;
    switch (u) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        n = Sa(t);
    }
    if (!re.has(n) && (t = I({ rel: "modulepreload", href: t }, e), re.set(n, t), l.querySelector(a) === null)) {
      switch (u) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (l.querySelector(Hn(n)))
            return;
      }
      u = l.createElement("link"), At(u, "link", t), bt(u), l.head.appendChild(u);
    }
  }
}
function Fg(t, e, l) {
  Je.S(t, e, l);
  var u = ga;
  if (u && t) {
    var a = Uu(u).hoistableStyles, n = sa(t);
    e = e || "default";
    var i = a.get(n);
    if (!i) {
      var c = { loading: 0, preload: null };
      if (i = u.querySelector(
        Cn(n)
      ))
        c.loading = 5;
      else {
        t = I(
          { rel: "stylesheet", href: t, "data-precedence": e },
          l
        ), (l = re.get(n)) && Er(t, l);
        var f = i = u.createElement("link");
        bt(f), At(f, "link", t), f._p = new Promise(function(o, g) {
          f.onload = o, f.onerror = g;
        }), f.addEventListener("load", function() {
          c.loading |= 1;
        }), f.addEventListener("error", function() {
          c.loading |= 2;
        }), c.loading |= 4, oi(i, e, u);
      }
      i = {
        type: "stylesheet",
        instance: i,
        count: 1,
        state: c
      }, a.set(n, i);
    }
  }
}
function Wg(t, e) {
  Je.X(t, e);
  var l = ga;
  if (l && t) {
    var u = Uu(l).hoistableScripts, a = Sa(t), n = u.get(a);
    n || (n = l.querySelector(Hn(a)), n || (t = I({ src: t, async: !0 }, e), (e = re.get(a)) && Or(t, e), n = l.createElement("script"), bt(n), At(n, "link", t), l.head.appendChild(n)), n = {
      type: "script",
      instance: n,
      count: 1,
      state: null
    }, u.set(a, n));
  }
}
function kg(t, e) {
  Je.M(t, e);
  var l = ga;
  if (l && t) {
    var u = Uu(l).hoistableScripts, a = Sa(t), n = u.get(a);
    n || (n = l.querySelector(Hn(a)), n || (t = I({ src: t, async: !0, type: "module" }, e), (e = re.get(a)) && Or(t, e), n = l.createElement("script"), bt(n), At(n, "link", t), l.head.appendChild(n)), n = {
      type: "script",
      instance: n,
      count: 1,
      state: null
    }, u.set(a, n));
  }
}
function th(t, e, l, u) {
  var a = (a = bl.current) ? wi(a) : null;
  if (!a) throw Error(p(446));
  switch (t) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof l.precedence == "string" && typeof l.href == "string" ? (e = sa(l.href), l = Uu(
        a
      ).hoistableStyles, u = l.get(e), u || (u = {
        type: "style",
        instance: null,
        count: 0,
        state: null
      }, l.set(e, u)), u) : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
        t = sa(l.href);
        var n = Uu(
          a
        ).hoistableStyles, i = n.get(t);
        if (i || (a = a.ownerDocument || a, i = {
          type: "stylesheet",
          instance: null,
          count: 0,
          state: { loading: 0, preload: null }
        }, n.set(t, i), (n = a.querySelector(
          Cn(t)
        )) && !n._p && (i.instance = n, i.state.loading = 5), re.has(t) || (l = {
          rel: "preload",
          as: "style",
          href: l.href,
          crossOrigin: l.crossOrigin,
          integrity: l.integrity,
          media: l.media,
          hrefLang: l.hrefLang,
          referrerPolicy: l.referrerPolicy
        }, re.set(t, l), n || Pg(
          a,
          t,
          l,
          i.state
        ))), e && u === null)
          throw Error(p(528, ""));
        return i;
      }
      if (e && u !== null)
        throw Error(p(529, ""));
      return null;
    case "script":
      return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = Sa(l), l = Uu(
        a
      ).hoistableScripts, u = l.get(e), u || (u = {
        type: "script",
        instance: null,
        count: 0,
        state: null
      }, l.set(e, u)), u) : { type: "void", instance: null, count: 0, state: null };
    default:
      throw Error(p(444, t));
  }
}
function sa(t) {
  return 'href="' + ie(t) + '"';
}
function Cn(t) {
  return 'link[rel="stylesheet"][' + t + "]";
}
function Sv(t) {
  return I({}, t, {
    "data-precedence": t.precedence,
    precedence: null
  });
}
function Pg(t, e, l, u) {
  t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? u.loading = 1 : (e = t.createElement("link"), u.preload = e, e.addEventListener("load", function() {
    return u.loading |= 1;
  }), e.addEventListener("error", function() {
    return u.loading |= 2;
  }), At(e, "link", l), bt(e), t.head.appendChild(e));
}
function Sa(t) {
  return '[src="' + ie(t) + '"]';
}
function Hn(t) {
  return "script[async]" + t;
}
function eh(t, e, l) {
  if (e.count++, e.instance === null)
    switch (e.type) {
      case "style":
        var u = t.querySelector(
          'style[data-href~="' + ie(l.href) + '"]'
        );
        if (u)
          return e.instance = u, bt(u), u;
        var a = I({}, l, {
          "data-href": l.href,
          "data-precedence": l.precedence,
          href: null,
          precedence: null
        });
        return u = (t.ownerDocument || t).createElement(
          "style"
        ), bt(u), At(u, "style", a), oi(u, l.precedence, t), e.instance = u;
      case "stylesheet":
        a = sa(l.href);
        var n = t.querySelector(
          Cn(a)
        );
        if (n)
          return e.state.loading |= 4, e.instance = n, bt(n), n;
        u = Sv(l), (a = re.get(a)) && Er(u, a), n = (t.ownerDocument || t).createElement("link"), bt(n);
        var i = n;
        return i._p = new Promise(function(c, f) {
          i.onload = c, i.onerror = f;
        }), At(n, "link", u), e.state.loading |= 4, oi(n, l.precedence, t), e.instance = n;
      case "script":
        return n = Sa(l.src), (a = t.querySelector(
          Hn(n)
        )) ? (e.instance = a, bt(a), a) : (u = l, (a = re.get(n)) && (u = I({}, l), Or(u, a)), t = t.ownerDocument || t, a = t.createElement("script"), bt(a), At(a, "link", u), t.head.appendChild(a), e.instance = a);
      case "void":
        return null;
      default:
        throw Error(p(443, e.type));
    }
  else
    e.type === "stylesheet" && !(e.state.loading & 4) && (u = e.instance, e.state.loading |= 4, oi(u, l.precedence, t));
  return e.instance;
}
function oi(t, e, l) {
  for (var u = l.querySelectorAll(
    'link[rel="stylesheet"][data-precedence],style[data-precedence]'
  ), a = u.length ? u[u.length - 1] : null, n = a, i = 0; i < u.length; i++) {
    var c = u[i];
    if (c.dataset.precedence === e) n = c;
    else if (n !== a) break;
  }
  n ? n.parentNode.insertBefore(t, n.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
}
function Er(t, e) {
  t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
}
function Or(t, e) {
  t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
}
var hi = null;
function lh(t, e, l) {
  if (hi === null) {
    var u = /* @__PURE__ */ new Map(), a = hi = /* @__PURE__ */ new Map();
    a.set(l, u);
  } else
    a = hi, u = a.get(l), u || (u = /* @__PURE__ */ new Map(), a.set(l, u));
  if (u.has(t)) return u;
  for (u.set(t, null), l = l.getElementsByTagName(t), a = 0; a < l.length; a++) {
    var n = l[a];
    if (!(n[On] || n[Dt] || t === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
      var i = n.getAttribute(e) || "";
      i = t + i;
      var c = u.get(i);
      c ? c.push(n) : u.set(i, [n]);
    }
  }
  return u;
}
function uh(t, e, l) {
  t = t.ownerDocument || t, t.head.insertBefore(
    l,
    e === "title" ? t.querySelector("head > title") : null
  );
}
function Ig(t, e, l) {
  if (l === 1 || e.itemProp != null) return !1;
  switch (t) {
    case "meta":
    case "title":
      return !0;
    case "style":
      if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
        break;
      return !0;
    case "link":
      if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
        break;
      switch (e.rel) {
        case "stylesheet":
          return t = e.disabled, typeof e.precedence == "string" && t == null;
        default:
          return !0;
      }
    case "script":
      if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
        return !0;
  }
  return !1;
}
function bv(t) {
  return !(t.type === "stylesheet" && !(t.state.loading & 3));
}
var an = null;
function t1() {
}
function e1(t, e, l) {
  if (an === null) throw Error(p(475));
  var u = an;
  if (e.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && !(e.state.loading & 4)) {
    if (e.instance === null) {
      var a = sa(l.href), n = t.querySelector(
        Cn(a)
      );
      if (n) {
        t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (u.count++, u = Xi.bind(u), t.then(u, u)), e.state.loading |= 4, e.instance = n, bt(n);
        return;
      }
      n = t.ownerDocument || t, l = Sv(l), (a = re.get(a)) && Er(l, a), n = n.createElement("link"), bt(n);
      var i = n;
      i._p = new Promise(function(c, f) {
        i.onload = c, i.onerror = f;
      }), At(n, "link", l), e.instance = n;
    }
    u.stylesheets === null && (u.stylesheets = /* @__PURE__ */ new Map()), u.stylesheets.set(e, t), (t = e.state.preload) && !(e.state.loading & 3) && (u.count++, e = Xi.bind(u), t.addEventListener("load", e), t.addEventListener("error", e));
  }
}
function l1() {
  if (an === null) throw Error(p(475));
  var t = an;
  return t.stylesheets && t.count === 0 && If(t, t.stylesheets), 0 < t.count ? function(e) {
    var l = setTimeout(function() {
      if (t.stylesheets && If(t, t.stylesheets), t.unsuspend) {
        var u = t.unsuspend;
        t.unsuspend = null, u();
      }
    }, 6e4);
    return t.unsuspend = e, function() {
      t.unsuspend = null, clearTimeout(l);
    };
  } : null;
}
function Xi() {
  if (this.count--, this.count === 0) {
    if (this.stylesheets) If(this, this.stylesheets);
    else if (this.unsuspend) {
      var t = this.unsuspend;
      this.unsuspend = null, t();
    }
  }
}
var Zi = null;
function If(t, e) {
  t.stylesheets = null, t.unsuspend !== null && (t.count++, Zi = /* @__PURE__ */ new Map(), e.forEach(u1, t), Zi = null, Xi.call(t));
}
function u1(t, e) {
  if (!(e.state.loading & 4)) {
    var l = Zi.get(t);
    if (l) var u = l.get(null);
    else {
      l = /* @__PURE__ */ new Map(), Zi.set(t, l);
      for (var a = t.querySelectorAll(
        "link[data-precedence],style[data-precedence]"
      ), n = 0; n < a.length; n++) {
        var i = a[n];
        (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (l.set(i.dataset.precedence, i), u = i);
      }
      u && l.set(null, u);
    }
    a = e.instance, i = a.getAttribute("data-precedence"), n = l.get(i) || u, n === u && l.set(null, a), l.set(i, a), this.count++, u = Xi.bind(this), a.addEventListener("load", u), a.addEventListener("error", u), n ? n.parentNode.insertBefore(a, n.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(a, t.firstChild)), e.state.loading |= 4;
  }
}
var nn = {
  $$typeof: qe,
  Provider: null,
  Consumer: null,
  _currentValue: Wl,
  _currentValue2: Wl,
  _threadCount: 0
};
function a1(t, e, l, u, a, n, i, c) {
  this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Mc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Mc(0), this.hiddenUpdates = Mc(null), this.identifierPrefix = u, this.onUncaughtError = a, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
}
function pv(t, e, l, u, a, n, i, c, f, o, g, v) {
  return t = new a1(
    t,
    e,
    l,
    i,
    c,
    f,
    o,
    v
  ), e = 1, n === !0 && (e |= 24), n = Vt(3, null, null, e), t.current = n, n.stateNode = t, e = Ws(), e.refCount++, t.pooledCache = e, e.refCount++, n.memoizedState = {
    element: u,
    isDehydrated: l,
    cache: e
  }, Ps(n), t;
}
function Ev(t) {
  return t ? (t = Ru, t) : Ru;
}
function Ov(t, e, l, u, a, n) {
  a = Ev(a), u.context === null ? u.context = a : u.pendingContext = a, u = pl(e), u.payload = { element: l }, n = n === void 0 ? null : n, n !== null && (u.callback = n), l = El(t, u, e), l !== null && (Wt(l, t, e), ja(l, t, e));
}
function ah(t, e) {
  if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
    var l = t.retryLane;
    t.retryLane = l !== 0 && l < e ? l : e;
  }
}
function Tr(t, e) {
  ah(t, e), (t = t.alternate) && ah(t, e);
}
function Tv(t) {
  if (t.tag === 13) {
    var e = va(t, 67108864);
    e !== null && Wt(e, t, 67108864), Tr(t, 67108864);
  }
}
var Li = !0;
function n1(t, e, l, u) {
  var a = C.T;
  C.T = null;
  var n = L.p;
  try {
    L.p = 2, Ar(t, e, l, u);
  } finally {
    L.p = n, C.T = a;
  }
}
function i1(t, e, l, u) {
  var a = C.T;
  C.T = null;
  var n = L.p;
  try {
    L.p = 8, Ar(t, e, l, u);
  } finally {
    L.p = n, C.T = a;
  }
}
function Ar(t, e, l, u) {
  if (Li) {
    var a = ts(u);
    if (a === null)
      lf(
        t,
        e,
        u,
        Ki,
        l
      ), nh(t, u);
    else if (f1(
      a,
      t,
      e,
      l,
      u
    ))
      u.stopPropagation();
    else if (nh(t, u), e & 4 && -1 < c1.indexOf(t)) {
      for (; a !== null; ) {
        var n = ya(a);
        if (n !== null)
          switch (n.tag) {
            case 3:
              if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                var i = Bl(n.pendingLanes);
                if (i !== 0) {
                  var c = n;
                  for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                    var f = 1 << 31 - $t(i);
                    c.entanglements[1] |= f, i &= ~f;
                  }
                  De(n), !(J & 6) && (qi = Ae() + 500, Qn(0));
                }
              }
              break;
            case 13:
              c = va(n, 2), c !== null && Wt(c, n, 2), cc(), Tr(n, 2);
          }
        if (n = ts(u), n === null && lf(
          t,
          e,
          u,
          Ki,
          l
        ), n === a) break;
        a = n;
      }
      a !== null && u.stopPropagation();
    } else
      lf(
        t,
        e,
        u,
        null,
        l
      );
  }
}
function ts(t) {
  return t = js(t), Mr(t);
}
var Ki = null;
function Mr(t) {
  if (Ki = null, t = pu(t), t !== null) {
    var e = Sn(t);
    if (e === null) t = null;
    else {
      var l = e.tag;
      if (l === 13) {
        if (t = $h(e), t !== null) return t;
        t = null;
      } else if (l === 3) {
        if (e.stateNode.current.memoizedState.isDehydrated)
          return e.tag === 3 ? e.stateNode.containerInfo : null;
        t = null;
      } else e !== t && (t = null);
    }
  }
  return Ki = t, null;
}
function Av(t) {
  switch (t) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (V0()) {
        case Ph:
          return 2;
        case Ih:
          return 8;
        case bi:
        case J0:
          return 32;
        case td:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var es = !1, Al = null, Ml = null, Rl = null, cn = /* @__PURE__ */ new Map(), fn = /* @__PURE__ */ new Map(), ul = [], c1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
  " "
);
function nh(t, e) {
  switch (t) {
    case "focusin":
    case "focusout":
      Al = null;
      break;
    case "dragenter":
    case "dragleave":
      Ml = null;
      break;
    case "mouseover":
    case "mouseout":
      Rl = null;
      break;
    case "pointerover":
    case "pointerout":
      cn.delete(e.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      fn.delete(e.pointerId);
  }
}
function _a(t, e, l, u, a, n) {
  return t === null || t.nativeEvent !== n ? (t = {
    blockedOn: e,
    domEventName: l,
    eventSystemFlags: u,
    nativeEvent: n,
    targetContainers: [a]
  }, e !== null && (e = ya(e), e !== null && Tv(e)), t) : (t.eventSystemFlags |= u, e = t.targetContainers, a !== null && e.indexOf(a) === -1 && e.push(a), t);
}
function f1(t, e, l, u, a) {
  switch (e) {
    case "focusin":
      return Al = _a(
        Al,
        t,
        e,
        l,
        u,
        a
      ), !0;
    case "dragenter":
      return Ml = _a(
        Ml,
        t,
        e,
        l,
        u,
        a
      ), !0;
    case "mouseover":
      return Rl = _a(
        Rl,
        t,
        e,
        l,
        u,
        a
      ), !0;
    case "pointerover":
      var n = a.pointerId;
      return cn.set(
        n,
        _a(
          cn.get(n) || null,
          t,
          e,
          l,
          u,
          a
        )
      ), !0;
    case "gotpointercapture":
      return n = a.pointerId, fn.set(
        n,
        _a(
          fn.get(n) || null,
          t,
          e,
          l,
          u,
          a
        )
      ), !0;
  }
  return !1;
}
function Mv(t) {
  var e = pu(t.target);
  if (e !== null) {
    var l = Sn(e);
    if (l !== null) {
      if (e = l.tag, e === 13) {
        if (e = $h(l), e !== null) {
          t.blockedOn = e, em(t.priority, function() {
            if (l.tag === 13) {
              var u = Ft();
              u = xs(u);
              var a = va(l, u);
              a !== null && Wt(a, l, u), Tr(l, u);
            }
          });
          return;
        }
      } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
        t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
        return;
      }
    }
  }
  t.blockedOn = null;
}
function di(t) {
  if (t.blockedOn !== null) return !1;
  for (var e = t.targetContainers; 0 < e.length; ) {
    var l = ts(t.nativeEvent);
    if (l === null) {
      l = t.nativeEvent;
      var u = new l.constructor(
        l.type,
        l
      );
      Sf = u, l.target.dispatchEvent(u), Sf = null;
    } else
      return e = ya(l), e !== null && Tv(e), t.blockedOn = l, !1;
    e.shift();
  }
  return !0;
}
function ih(t, e, l) {
  di(t) && l.delete(e);
}
function s1() {
  es = !1, Al !== null && di(Al) && (Al = null), Ml !== null && di(Ml) && (Ml = null), Rl !== null && di(Rl) && (Rl = null), cn.forEach(ih), fn.forEach(ih);
}
function kn(t, e) {
  t.blockedOn === e && (t.blockedOn = null, es || (es = !0, mt.unstable_scheduleCallback(
    mt.unstable_NormalPriority,
    s1
  )));
}
var Pn = null;
function ch(t) {
  Pn !== t && (Pn = t, mt.unstable_scheduleCallback(
    mt.unstable_NormalPriority,
    function() {
      Pn === t && (Pn = null);
      for (var e = 0; e < t.length; e += 3) {
        var l = t[e], u = t[e + 1], a = t[e + 2];
        if (typeof u != "function") {
          if (Mr(u || l) === null)
            continue;
          break;
        }
        var n = ya(l);
        n !== null && (t.splice(e, 3), e -= 3, Nf(
          n,
          {
            pending: !0,
            data: a,
            method: l.method,
            action: u
          },
          u,
          a
        ));
      }
    }
  ));
}
function sn(t) {
  function e(f) {
    return kn(f, t);
  }
  Al !== null && kn(Al, t), Ml !== null && kn(Ml, t), Rl !== null && kn(Rl, t), cn.forEach(e), fn.forEach(e);
  for (var l = 0; l < ul.length; l++) {
    var u = ul[l];
    u.blockedOn === t && (u.blockedOn = null);
  }
  for (; 0 < ul.length && (l = ul[0], l.blockedOn === null); )
    Mv(l), l.blockedOn === null && ul.shift();
  if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
    for (u = 0; u < l.length; u += 3) {
      var a = l[u], n = l[u + 1], i = a[wt] || null;
      if (typeof n == "function")
        i || ch(l);
      else if (i) {
        var c = null;
        if (n && n.hasAttribute("formAction")) {
          if (a = n, i = n[wt] || null)
            c = i.formAction;
          else if (Mr(a) !== null) continue;
        } else c = i.action;
        typeof c == "function" ? l[u + 1] = c : (l.splice(u, 3), u -= 3), ch(l);
      }
    }
}
function Rr(t) {
  this._internalRoot = t;
}
oc.prototype.render = Rr.prototype.render = function(t) {
  var e = this._internalRoot;
  if (e === null) throw Error(p(409));
  var l = e.current, u = Ft();
  Ov(l, u, t, e, null, null);
};
oc.prototype.unmount = Rr.prototype.unmount = function() {
  var t = this._internalRoot;
  if (t !== null) {
    this._internalRoot = null;
    var e = t.containerInfo;
    Ov(t.current, 2, null, t, null, null), cc(), e[da] = null;
  }
};
function oc(t) {
  this._internalRoot = t;
}
oc.prototype.unstable_scheduleHydration = function(t) {
  if (t) {
    var e = nd();
    t = { blockedOn: null, target: t, priority: e };
    for (var l = 0; l < ul.length && e !== 0 && e < ul[l].priority; l++) ;
    ul.splice(l, 0, t), l === 0 && Mv(t);
  }
};
var fh = Vh.version;
if (fh !== "19.1.1")
  throw Error(
    p(
      527,
      fh,
      "19.1.1"
    )
  );
L.findDOMNode = function(t) {
  var e = t._reactInternals;
  if (e === void 0)
    throw typeof t.render == "function" ? Error(p(188)) : (t = Object.keys(t).join(","), Error(p(268, t)));
  return t = G0(e), t = t !== null ? Fh(t) : null, t = t === null ? null : t.stateNode, t;
};
var r1 = {
  bundleType: 0,
  version: "19.1.1",
  rendererPackageName: "react-dom",
  currentDispatcherRef: C,
  reconcilerVersion: "19.1.1"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var In = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!In.isDisabled && In.supportsFiber)
    try {
      bn = In.inject(
        r1
      ), Jt = In;
    } catch {
    }
}
Wi.createRoot = function(t, e) {
  if (!Jh(t)) throw Error(p(299));
  var l = !1, u = "", a = py, n = Ey, i = Oy, c = null;
  return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (a = e.onUncaughtError), e.onCaughtError !== void 0 && (n = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError), e.unstable_transitionCallbacks !== void 0 && (c = e.unstable_transitionCallbacks)), e = pv(
    t,
    1,
    !1,
    null,
    null,
    l,
    u,
    a,
    n,
    i,
    c,
    null
  ), t[da] = e.current, pr(t), new Rr(e);
};
Wi.hydrateRoot = function(t, e, l) {
  if (!Jh(t)) throw Error(p(299));
  var u = !1, a = "", n = py, i = Ey, c = Oy, f = null, o = null;
  return l != null && (l.unstable_strictMode === !0 && (u = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (n = l.onUncaughtError), l.onCaughtError !== void 0 && (i = l.onCaughtError), l.onRecoverableError !== void 0 && (c = l.onRecoverableError), l.unstable_transitionCallbacks !== void 0 && (f = l.unstable_transitionCallbacks), l.formState !== void 0 && (o = l.formState)), e = pv(
    t,
    1,
    !0,
    e,
    l ?? null,
    u,
    a,
    n,
    i,
    c,
    f,
    o
  ), e.context = Ev(null), l = e.current, u = Ft(), u = xs(u), a = pl(u), a.callback = null, El(l, a, u), l = u, e.current.lanes = l, En(e, l), De(e), t[da] = e.current, pr(t), new oc(e);
};
Wi.version = "19.1.1";
function Rv() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Rv);
    } catch (t) {
      console.error(t);
    }
}
Rv(), Zh.exports = Wi;
var hc = Zh.exports, ou = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  subscribe(t) {
    return this.listeners.add(t), this.onSubscribe(), () => {
      this.listeners.delete(t), this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}, Ql = typeof window > "u" || "Deno" in globalThis;
function dt() {
}
function o1(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function ls(t) {
  return typeof t == "number" && t >= 0 && t !== 1 / 0;
}
function Dv(t, e) {
  return Math.max(t + (e || 0) - Date.now(), 0);
}
function Dl(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function le(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function us(t, e) {
  const {
    type: l = "all",
    exact: u,
    fetchStatus: a,
    predicate: n,
    queryKey: i,
    stale: c
  } = t;
  if (i) {
    if (u) {
      if (e.queryHash !== Dr(i, e.options))
        return !1;
    } else if (!ra(e.queryKey, i))
      return !1;
  }
  if (l !== "all") {
    const f = e.isActive();
    if (l === "active" && !f || l === "inactive" && f)
      return !1;
  }
  return !(typeof c == "boolean" && e.isStale() !== c || a && a !== e.state.fetchStatus || n && !n(e));
}
function as(t, e) {
  const { exact: l, status: u, predicate: a, mutationKey: n } = t;
  if (n) {
    if (!e.options.mutationKey)
      return !1;
    if (l) {
      if (Cl(e.options.mutationKey) !== Cl(n))
        return !1;
    } else if (!ra(e.options.mutationKey, n))
      return !1;
  }
  return !(u && e.state.status !== u || a && !a(e));
}
function Dr(t, e) {
  return ((e == null ? void 0 : e.queryKeyHashFn) || Cl)(t);
}
function Cl(t) {
  return JSON.stringify(
    t,
    (e, l) => ns(l) ? Object.keys(l).sort().reduce((u, a) => (u[a] = l[a], u), {}) : l
  );
}
function ra(t, e) {
  return t === e ? !0 : typeof t != typeof e ? !1 : t && e && typeof t == "object" && typeof e == "object" ? Object.keys(e).every((l) => ra(t[l], e[l])) : !1;
}
function Nn(t, e) {
  if (t === e)
    return t;
  const l = sh(t) && sh(e);
  if (l || ns(t) && ns(e)) {
    const u = l ? t : Object.keys(t), a = u.length, n = l ? e : Object.keys(e), i = n.length, c = l ? [] : {}, f = new Set(u);
    let o = 0;
    for (let g = 0; g < i; g++) {
      const v = l ? g : n[g];
      (!l && f.has(v) || l) && t[v] === void 0 && e[v] === void 0 ? (c[v] = void 0, o++) : (c[v] = Nn(t[v], e[v]), c[v] === t[v] && t[v] !== void 0 && o++);
    }
    return a === i && o === a ? t : c;
  }
  return e;
}
function Vi(t, e) {
  if (!e || Object.keys(t).length !== Object.keys(e).length)
    return !1;
  for (const l in t)
    if (t[l] !== e[l])
      return !1;
  return !0;
}
function sh(t) {
  return Array.isArray(t) && t.length === Object.keys(t).length;
}
function ns(t) {
  if (!rh(t))
    return !1;
  const e = t.constructor;
  if (e === void 0)
    return !0;
  const l = e.prototype;
  return !(!rh(l) || !l.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(t) !== Object.prototype);
}
function rh(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
function h1(t) {
  return new Promise((e) => {
    setTimeout(e, t);
  });
}
function is(t, e, l) {
  return typeof l.structuralSharing == "function" ? l.structuralSharing(t, e) : l.structuralSharing !== !1 ? Nn(t, e) : e;
}
function d1(t) {
  return t;
}
function cs(t, e, l = 0) {
  const u = [...t, e];
  return l && u.length > l ? u.slice(1) : u;
}
function y1(t, e, l = 0) {
  const u = [e, ...t];
  return l && u.length > l ? u.slice(0, -1) : u;
}
var dc = Symbol();
function _v(t, e) {
  return !t.queryFn && (e != null && e.initialPromise) ? () => e.initialPromise : !t.queryFn || t.queryFn === dc ? () => Promise.reject(new Error(`Missing queryFn: '${t.queryHash}'`)) : t.queryFn;
}
function _r(t, e) {
  return typeof t == "function" ? t(...e) : !!t;
}
var wl, al, Bu, bh, v1 = (bh = class extends ou {
  constructor() {
    super();
    _(this, wl);
    _(this, al);
    _(this, Bu);
    A(this, Bu, (e) => {
      if (!Ql && window.addEventListener) {
        const l = () => e();
        return window.addEventListener("visibilitychange", l, !1), () => {
          window.removeEventListener("visibilitychange", l);
        };
      }
    });
  }
  onSubscribe() {
    r(this, al) || this.setEventListener(r(this, Bu));
  }
  onUnsubscribe() {
    var e;
    this.hasListeners() || ((e = r(this, al)) == null || e.call(this), A(this, al, void 0));
  }
  setEventListener(e) {
    var l;
    A(this, Bu, e), (l = r(this, al)) == null || l.call(this), A(this, al, e((u) => {
      typeof u == "boolean" ? this.setFocused(u) : this.onFocus();
    }));
  }
  setFocused(e) {
    r(this, wl) !== e && (A(this, wl, e), this.onFocus());
  }
  onFocus() {
    const e = this.isFocused();
    this.listeners.forEach((l) => {
      l(e);
    });
  }
  isFocused() {
    var e;
    return typeof r(this, wl) == "boolean" ? r(this, wl) : ((e = globalThis.document) == null ? void 0 : e.visibilityState) !== "hidden";
  }
}, wl = new WeakMap(), al = new WeakMap(), Bu = new WeakMap(), bh), yc = new v1(), Gu, nl, ju, ph, m1 = (ph = class extends ou {
  constructor() {
    super();
    _(this, Gu, !0);
    _(this, nl);
    _(this, ju);
    A(this, ju, (e) => {
      if (!Ql && window.addEventListener) {
        const l = () => e(!0), u = () => e(!1);
        return window.addEventListener("online", l, !1), window.addEventListener("offline", u, !1), () => {
          window.removeEventListener("online", l), window.removeEventListener("offline", u);
        };
      }
    });
  }
  onSubscribe() {
    r(this, nl) || this.setEventListener(r(this, ju));
  }
  onUnsubscribe() {
    var e;
    this.hasListeners() || ((e = r(this, nl)) == null || e.call(this), A(this, nl, void 0));
  }
  setEventListener(e) {
    var l;
    A(this, ju, e), (l = r(this, nl)) == null || l.call(this), A(this, nl, e(this.setOnline.bind(this)));
  }
  setOnline(e) {
    r(this, Gu) !== e && (A(this, Gu, e), this.listeners.forEach((u) => {
      u(e);
    }));
  }
  isOnline() {
    return r(this, Gu);
  }
}, Gu = new WeakMap(), nl = new WeakMap(), ju = new WeakMap(), ph), rn = new m1();
function fs() {
  let t, e;
  const l = new Promise((a, n) => {
    t = a, e = n;
  });
  l.status = "pending", l.catch(() => {
  });
  function u(a) {
    Object.assign(l, a), delete l.resolve, delete l.reject;
  }
  return l.resolve = (a) => {
    u({
      status: "fulfilled",
      value: a
    }), t(a);
  }, l.reject = (a) => {
    u({
      status: "rejected",
      reason: a
    }), e(a);
  }, l;
}
function g1(t) {
  var l;
  let e;
  if ((l = t.then((u) => (e = u, u), dt)) == null || l.catch(dt), e !== void 0)
    return { data: e };
}
function S1(t) {
  return Math.min(1e3 * 2 ** t, 3e4);
}
function zv(t) {
  return (t ?? "online") === "online" ? rn.isOnline() : !0;
}
var zr = class extends Error {
  constructor(t) {
    super("CancelledError"), this.revert = t == null ? void 0 : t.revert, this.silent = t == null ? void 0 : t.silent;
  }
};
function yi(t) {
  return t instanceof zr;
}
function Uv(t) {
  let e = !1, l = 0, u = !1, a;
  const n = fs(), i = (b) => {
    var O;
    u || (s(new zr(b)), (O = t.abort) == null || O.call(t));
  }, c = () => {
    e = !0;
  }, f = () => {
    e = !1;
  }, o = () => yc.isFocused() && (t.networkMode === "always" || rn.isOnline()) && t.canRun(), g = () => zv(t.networkMode) && t.canRun(), v = (b) => {
    var O;
    u || (u = !0, (O = t.onSuccess) == null || O.call(t, b), a == null || a(), n.resolve(b));
  }, s = (b) => {
    var O;
    u || (u = !0, (O = t.onError) == null || O.call(t, b), a == null || a(), n.reject(b));
  }, y = () => new Promise((b) => {
    var O;
    a = (d) => {
      (u || o()) && b(d);
    }, (O = t.onPause) == null || O.call(t);
  }).then(() => {
    var b;
    a = void 0, u || (b = t.onContinue) == null || b.call(t);
  }), E = () => {
    if (u)
      return;
    let b;
    const O = l === 0 ? t.initialPromise : void 0;
    try {
      b = O ?? t.fn();
    } catch (d) {
      b = Promise.reject(d);
    }
    Promise.resolve(b).then(v).catch((d) => {
      var z;
      if (u)
        return;
      const h = t.retry ?? (Ql ? 0 : 3), m = t.retryDelay ?? S1, S = typeof m == "function" ? m(l, d) : m, T = h === !0 || typeof h == "number" && l < h || typeof h == "function" && h(l, d);
      if (e || !T) {
        s(d);
        return;
      }
      l++, (z = t.onFail) == null || z.call(t, l, d), h1(S).then(() => o() ? void 0 : y()).then(() => {
        e ? s(d) : E();
      });
    });
  };
  return {
    promise: n,
    cancel: i,
    continue: () => (a == null || a(), n),
    cancelRetry: c,
    continueRetry: f,
    canStart: g,
    start: () => (g() ? E() : y().then(E), n)
  };
}
var Qv = (t) => setTimeout(t, 0);
function b1() {
  let t = [], e = 0, l = (c) => {
    c();
  }, u = (c) => {
    c();
  }, a = Qv;
  const n = (c) => {
    e ? t.push(c) : a(() => {
      l(c);
    });
  }, i = () => {
    const c = t;
    t = [], c.length && a(() => {
      u(() => {
        c.forEach((f) => {
          l(f);
        });
      });
    });
  };
  return {
    batch: (c) => {
      let f;
      e++;
      try {
        f = c();
      } finally {
        e--, e || i();
      }
      return f;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (c) => (...f) => {
      n(() => {
        c(...f);
      });
    },
    schedule: n,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (c) => {
      l = c;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (c) => {
      u = c;
    },
    setScheduler: (c) => {
      a = c;
    }
  };
}
var P = b1(), Xl, Eh, Cv = (Eh = class {
  constructor() {
    _(this, Xl);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(), ls(this.gcTime) && A(this, Xl, setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }
  updateGcTime(t) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      t ?? (Ql ? 1 / 0 : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    r(this, Xl) && (clearTimeout(r(this, Xl)), A(this, Xl, void 0));
  }
}, Xl = new WeakMap(), Eh), wu, Zl, Pt, Ll, Rt, on, Kl, oe, Qe, Oh, Hv = (Oh = class extends Cv {
  constructor(e) {
    super();
    _(this, oe);
    _(this, wu);
    _(this, Zl);
    _(this, Pt);
    _(this, Ll);
    _(this, Rt);
    _(this, on);
    _(this, Kl);
    A(this, Kl, !1), A(this, on, e.defaultOptions), this.setOptions(e.options), this.observers = [], A(this, Ll, e.client), A(this, Pt, r(this, Ll).getQueryCache()), this.queryKey = e.queryKey, this.queryHash = e.queryHash, A(this, wu, p1(this.options)), this.state = e.state ?? r(this, wu), this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    var e;
    return (e = r(this, Rt)) == null ? void 0 : e.promise;
  }
  setOptions(e) {
    this.options = { ...r(this, on), ...e }, this.updateGcTime(this.options.gcTime);
  }
  optionalRemove() {
    !this.observers.length && this.state.fetchStatus === "idle" && r(this, Pt).remove(this);
  }
  setData(e, l) {
    const u = is(this.state.data, e, this.options);
    return Q(this, oe, Qe).call(this, {
      data: u,
      type: "success",
      dataUpdatedAt: l == null ? void 0 : l.updatedAt,
      manual: l == null ? void 0 : l.manual
    }), u;
  }
  setState(e, l) {
    Q(this, oe, Qe).call(this, { type: "setState", state: e, setStateOptions: l });
  }
  cancel(e) {
    var u, a;
    const l = (u = r(this, Rt)) == null ? void 0 : u.promise;
    return (a = r(this, Rt)) == null || a.cancel(e), l ? l.then(dt).catch(dt) : Promise.resolve();
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  reset() {
    this.destroy(), this.setState(r(this, wu));
  }
  isActive() {
    return this.observers.some(
      (e) => le(e.options.enabled, this) !== !1
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === dc || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStatic() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (e) => Dl(e.options.staleTime, this) === "static"
    ) : !1;
  }
  isStale() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (e) => e.getCurrentResult().isStale
    ) : this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(e = 0) {
    return this.state.data === void 0 ? !0 : e === "static" ? !1 : this.state.isInvalidated ? !0 : !Dv(this.state.dataUpdatedAt, e);
  }
  onFocus() {
    var l;
    const e = this.observers.find((u) => u.shouldFetchOnWindowFocus());
    e == null || e.refetch({ cancelRefetch: !1 }), (l = r(this, Rt)) == null || l.continue();
  }
  onOnline() {
    var l;
    const e = this.observers.find((u) => u.shouldFetchOnReconnect());
    e == null || e.refetch({ cancelRefetch: !1 }), (l = r(this, Rt)) == null || l.continue();
  }
  addObserver(e) {
    this.observers.includes(e) || (this.observers.push(e), this.clearGcTimeout(), r(this, Pt).notify({ type: "observerAdded", query: this, observer: e }));
  }
  removeObserver(e) {
    this.observers.includes(e) && (this.observers = this.observers.filter((l) => l !== e), this.observers.length || (r(this, Rt) && (r(this, Kl) ? r(this, Rt).cancel({ revert: !0 }) : r(this, Rt).cancelRetry()), this.scheduleGc()), r(this, Pt).notify({ type: "observerRemoved", query: this, observer: e }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    this.state.isInvalidated || Q(this, oe, Qe).call(this, { type: "invalidate" });
  }
  fetch(e, l) {
    var o, g, v;
    if (this.state.fetchStatus !== "idle") {
      if (this.state.data !== void 0 && (l != null && l.cancelRefetch))
        this.cancel({ silent: !0 });
      else if (r(this, Rt))
        return r(this, Rt).continueRetry(), r(this, Rt).promise;
    }
    if (e && this.setOptions(e), !this.options.queryFn) {
      const s = this.observers.find((y) => y.options.queryFn);
      s && this.setOptions(s.options);
    }
    const u = new AbortController(), a = (s) => {
      Object.defineProperty(s, "signal", {
        enumerable: !0,
        get: () => (A(this, Kl, !0), u.signal)
      });
    }, n = () => {
      const s = _v(this.options, l), E = (() => {
        const b = {
          client: r(this, Ll),
          queryKey: this.queryKey,
          meta: this.meta
        };
        return a(b), b;
      })();
      return A(this, Kl, !1), this.options.persister ? this.options.persister(
        s,
        E,
        this
      ) : s(E);
    }, c = (() => {
      const s = {
        fetchOptions: l,
        options: this.options,
        queryKey: this.queryKey,
        client: r(this, Ll),
        state: this.state,
        fetchFn: n
      };
      return a(s), s;
    })();
    (o = this.options.behavior) == null || o.onFetch(c, this), A(this, Zl, this.state), (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((g = c.fetchOptions) == null ? void 0 : g.meta)) && Q(this, oe, Qe).call(this, { type: "fetch", meta: (v = c.fetchOptions) == null ? void 0 : v.meta });
    const f = (s) => {
      var y, E, b, O;
      yi(s) && s.silent || Q(this, oe, Qe).call(this, {
        type: "error",
        error: s
      }), yi(s) || ((E = (y = r(this, Pt).config).onError) == null || E.call(
        y,
        s,
        this
      ), (O = (b = r(this, Pt).config).onSettled) == null || O.call(
        b,
        this.state.data,
        s,
        this
      )), this.scheduleGc();
    };
    return A(this, Rt, Uv({
      initialPromise: l == null ? void 0 : l.initialPromise,
      fn: c.fetchFn,
      abort: u.abort.bind(u),
      onSuccess: (s) => {
        var y, E, b, O;
        if (s === void 0) {
          f(new Error(`${this.queryHash} data is undefined`));
          return;
        }
        try {
          this.setData(s);
        } catch (d) {
          f(d);
          return;
        }
        (E = (y = r(this, Pt).config).onSuccess) == null || E.call(y, s, this), (O = (b = r(this, Pt).config).onSettled) == null || O.call(
          b,
          s,
          this.state.error,
          this
        ), this.scheduleGc();
      },
      onError: f,
      onFail: (s, y) => {
        Q(this, oe, Qe).call(this, { type: "failed", failureCount: s, error: y });
      },
      onPause: () => {
        Q(this, oe, Qe).call(this, { type: "pause" });
      },
      onContinue: () => {
        Q(this, oe, Qe).call(this, { type: "continue" });
      },
      retry: c.options.retry,
      retryDelay: c.options.retryDelay,
      networkMode: c.options.networkMode,
      canRun: () => !0
    })), r(this, Rt).start();
  }
}, wu = new WeakMap(), Zl = new WeakMap(), Pt = new WeakMap(), Ll = new WeakMap(), Rt = new WeakMap(), on = new WeakMap(), Kl = new WeakMap(), oe = new WeakSet(), Qe = function(e) {
  const l = (u) => {
    switch (e.type) {
      case "failed":
        return {
          ...u,
          fetchFailureCount: e.failureCount,
          fetchFailureReason: e.error
        };
      case "pause":
        return {
          ...u,
          fetchStatus: "paused"
        };
      case "continue":
        return {
          ...u,
          fetchStatus: "fetching"
        };
      case "fetch":
        return {
          ...u,
          ...Nv(u.data, this.options),
          fetchMeta: e.meta ?? null
        };
      case "success":
        return A(this, Zl, void 0), {
          ...u,
          data: e.data,
          dataUpdateCount: u.dataUpdateCount + 1,
          dataUpdatedAt: e.dataUpdatedAt ?? Date.now(),
          error: null,
          isInvalidated: !1,
          status: "success",
          ...!e.manual && {
            fetchStatus: "idle",
            fetchFailureCount: 0,
            fetchFailureReason: null
          }
        };
      case "error":
        const a = e.error;
        return yi(a) && a.revert && r(this, Zl) ? { ...r(this, Zl), fetchStatus: "idle" } : {
          ...u,
          error: a,
          errorUpdateCount: u.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: u.fetchFailureCount + 1,
          fetchFailureReason: a,
          fetchStatus: "idle",
          status: "error"
        };
      case "invalidate":
        return {
          ...u,
          isInvalidated: !0
        };
      case "setState":
        return {
          ...u,
          ...e.state
        };
    }
  };
  this.state = l(this.state), P.batch(() => {
    this.observers.forEach((u) => {
      u.onQueryUpdate();
    }), r(this, Pt).notify({ query: this, type: "updated", action: e });
  });
}, Oh);
function Nv(t, e) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: zv(e.networkMode) ? "fetching" : "paused",
    ...t === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function p1(t) {
  const e = typeof t.initialData == "function" ? t.initialData() : t.initialData, l = e !== void 0, u = l ? typeof t.initialDataUpdatedAt == "function" ? t.initialDataUpdatedAt() : t.initialDataUpdatedAt : 0;
  return {
    data: e,
    dataUpdateCount: 0,
    dataUpdatedAt: l ? u ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: l ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var Se, Th, qv = (Th = class extends ou {
  constructor(e = {}) {
    super();
    _(this, Se);
    this.config = e, A(this, Se, /* @__PURE__ */ new Map());
  }
  build(e, l, u) {
    const a = l.queryKey, n = l.queryHash ?? Dr(a, l);
    let i = this.get(n);
    return i || (i = new Hv({
      client: e,
      queryKey: a,
      queryHash: n,
      options: e.defaultQueryOptions(l),
      state: u,
      defaultOptions: e.getQueryDefaults(a)
    }), this.add(i)), i;
  }
  add(e) {
    r(this, Se).has(e.queryHash) || (r(this, Se).set(e.queryHash, e), this.notify({
      type: "added",
      query: e
    }));
  }
  remove(e) {
    const l = r(this, Se).get(e.queryHash);
    l && (e.destroy(), l === e && r(this, Se).delete(e.queryHash), this.notify({ type: "removed", query: e }));
  }
  clear() {
    P.batch(() => {
      this.getAll().forEach((e) => {
        this.remove(e);
      });
    });
  }
  get(e) {
    return r(this, Se).get(e);
  }
  getAll() {
    return [...r(this, Se).values()];
  }
  find(e) {
    const l = { exact: !0, ...e };
    return this.getAll().find(
      (u) => us(l, u)
    );
  }
  findAll(e = {}) {
    const l = this.getAll();
    return Object.keys(e).length > 0 ? l.filter((u) => us(e, u)) : l;
  }
  notify(e) {
    P.batch(() => {
      this.listeners.forEach((l) => {
        l(e);
      });
    });
  }
  onFocus() {
    P.batch(() => {
      this.getAll().forEach((e) => {
        e.onFocus();
      });
    });
  }
  onOnline() {
    P.batch(() => {
      this.getAll().forEach((e) => {
        e.onOnline();
      });
    });
  }
}, Se = new WeakMap(), Th), be, Ut, Vl, pe, ke, Ah, xv = (Ah = class extends Cv {
  constructor(e) {
    super();
    _(this, pe);
    _(this, be);
    _(this, Ut);
    _(this, Vl);
    this.mutationId = e.mutationId, A(this, Ut, e.mutationCache), A(this, be, []), this.state = e.state || Yv(), this.setOptions(e.options), this.scheduleGc();
  }
  setOptions(e) {
    this.options = e, this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(e) {
    r(this, be).includes(e) || (r(this, be).push(e), this.clearGcTimeout(), r(this, Ut).notify({
      type: "observerAdded",
      mutation: this,
      observer: e
    }));
  }
  removeObserver(e) {
    A(this, be, r(this, be).filter((l) => l !== e)), this.scheduleGc(), r(this, Ut).notify({
      type: "observerRemoved",
      mutation: this,
      observer: e
    });
  }
  optionalRemove() {
    r(this, be).length || (this.state.status === "pending" ? this.scheduleGc() : r(this, Ut).remove(this));
  }
  continue() {
    var e;
    return ((e = r(this, Vl)) == null ? void 0 : e.continue()) ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(e) {
    var n, i, c, f, o, g, v, s, y, E, b, O, d, h, m, S, T, z, M, R;
    const l = () => {
      Q(this, pe, ke).call(this, { type: "continue" });
    };
    A(this, Vl, Uv({
      fn: () => this.options.mutationFn ? this.options.mutationFn(e) : Promise.reject(new Error("No mutationFn found")),
      onFail: (H, U) => {
        Q(this, pe, ke).call(this, { type: "failed", failureCount: H, error: U });
      },
      onPause: () => {
        Q(this, pe, ke).call(this, { type: "pause" });
      },
      onContinue: l,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => r(this, Ut).canRun(this)
    }));
    const u = this.state.status === "pending", a = !r(this, Vl).canStart();
    try {
      if (u)
        l();
      else {
        Q(this, pe, ke).call(this, { type: "pending", variables: e, isPaused: a }), await ((i = (n = r(this, Ut).config).onMutate) == null ? void 0 : i.call(
          n,
          e,
          this
        ));
        const U = await ((f = (c = this.options).onMutate) == null ? void 0 : f.call(c, e));
        U !== this.state.context && Q(this, pe, ke).call(this, {
          type: "pending",
          context: U,
          variables: e,
          isPaused: a
        });
      }
      const H = await r(this, Vl).start();
      return await ((g = (o = r(this, Ut).config).onSuccess) == null ? void 0 : g.call(
        o,
        H,
        e,
        this.state.context,
        this
      )), await ((s = (v = this.options).onSuccess) == null ? void 0 : s.call(v, H, e, this.state.context)), await ((E = (y = r(this, Ut).config).onSettled) == null ? void 0 : E.call(
        y,
        H,
        null,
        this.state.variables,
        this.state.context,
        this
      )), await ((O = (b = this.options).onSettled) == null ? void 0 : O.call(b, H, null, e, this.state.context)), Q(this, pe, ke).call(this, { type: "success", data: H }), H;
    } catch (H) {
      try {
        throw await ((h = (d = r(this, Ut).config).onError) == null ? void 0 : h.call(
          d,
          H,
          e,
          this.state.context,
          this
        )), await ((S = (m = this.options).onError) == null ? void 0 : S.call(
          m,
          H,
          e,
          this.state.context
        )), await ((z = (T = r(this, Ut).config).onSettled) == null ? void 0 : z.call(
          T,
          void 0,
          H,
          this.state.variables,
          this.state.context,
          this
        )), await ((R = (M = this.options).onSettled) == null ? void 0 : R.call(
          M,
          void 0,
          H,
          e,
          this.state.context
        )), H;
      } finally {
        Q(this, pe, ke).call(this, { type: "error", error: H });
      }
    } finally {
      r(this, Ut).runNext(this);
    }
  }
}, be = new WeakMap(), Ut = new WeakMap(), Vl = new WeakMap(), pe = new WeakSet(), ke = function(e) {
  const l = (u) => {
    switch (e.type) {
      case "failed":
        return {
          ...u,
          failureCount: e.failureCount,
          failureReason: e.error
        };
      case "pause":
        return {
          ...u,
          isPaused: !0
        };
      case "continue":
        return {
          ...u,
          isPaused: !1
        };
      case "pending":
        return {
          ...u,
          context: e.context,
          data: void 0,
          failureCount: 0,
          failureReason: null,
          error: null,
          isPaused: e.isPaused,
          status: "pending",
          variables: e.variables,
          submittedAt: Date.now()
        };
      case "success":
        return {
          ...u,
          data: e.data,
          failureCount: 0,
          failureReason: null,
          error: null,
          status: "success",
          isPaused: !1
        };
      case "error":
        return {
          ...u,
          data: void 0,
          error: e.error,
          failureCount: u.failureCount + 1,
          failureReason: e.error,
          isPaused: !1,
          status: "error"
        };
    }
  };
  this.state = l(this.state), P.batch(() => {
    r(this, be).forEach((u) => {
      u.onMutationUpdate(e);
    }), r(this, Ut).notify({
      mutation: this,
      type: "updated",
      action: e
    });
  });
}, Ah);
function Yv() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}
var Ce, he, hn, Mh, Bv = (Mh = class extends ou {
  constructor(e = {}) {
    super();
    _(this, Ce);
    _(this, he);
    _(this, hn);
    this.config = e, A(this, Ce, /* @__PURE__ */ new Set()), A(this, he, /* @__PURE__ */ new Map()), A(this, hn, 0);
  }
  build(e, l, u) {
    const a = new xv({
      mutationCache: this,
      mutationId: ++Bn(this, hn)._,
      options: e.defaultMutationOptions(l),
      state: u
    });
    return this.add(a), a;
  }
  add(e) {
    r(this, Ce).add(e);
    const l = ti(e);
    if (typeof l == "string") {
      const u = r(this, he).get(l);
      u ? u.push(e) : r(this, he).set(l, [e]);
    }
    this.notify({ type: "added", mutation: e });
  }
  remove(e) {
    if (r(this, Ce).delete(e)) {
      const l = ti(e);
      if (typeof l == "string") {
        const u = r(this, he).get(l);
        if (u)
          if (u.length > 1) {
            const a = u.indexOf(e);
            a !== -1 && u.splice(a, 1);
          } else u[0] === e && r(this, he).delete(l);
      }
    }
    this.notify({ type: "removed", mutation: e });
  }
  canRun(e) {
    const l = ti(e);
    if (typeof l == "string") {
      const u = r(this, he).get(l), a = u == null ? void 0 : u.find(
        (n) => n.state.status === "pending"
      );
      return !a || a === e;
    } else
      return !0;
  }
  runNext(e) {
    var u;
    const l = ti(e);
    if (typeof l == "string") {
      const a = (u = r(this, he).get(l)) == null ? void 0 : u.find((n) => n !== e && n.state.isPaused);
      return (a == null ? void 0 : a.continue()) ?? Promise.resolve();
    } else
      return Promise.resolve();
  }
  clear() {
    P.batch(() => {
      r(this, Ce).forEach((e) => {
        this.notify({ type: "removed", mutation: e });
      }), r(this, Ce).clear(), r(this, he).clear();
    });
  }
  getAll() {
    return Array.from(r(this, Ce));
  }
  find(e) {
    const l = { exact: !0, ...e };
    return this.getAll().find(
      (u) => as(l, u)
    );
  }
  findAll(e = {}) {
    return this.getAll().filter((l) => as(e, l));
  }
  notify(e) {
    P.batch(() => {
      this.listeners.forEach((l) => {
        l(e);
      });
    });
  }
  resumePausedMutations() {
    const e = this.getAll().filter((l) => l.state.isPaused);
    return P.batch(
      () => Promise.all(
        e.map((l) => l.continue().catch(dt))
      )
    );
  }
}, Ce = new WeakMap(), he = new WeakMap(), hn = new WeakMap(), Mh);
function ti(t) {
  var e;
  return (e = t.options.scope) == null ? void 0 : e.id;
}
function Ji(t) {
  return {
    onFetch: (e, l) => {
      var g, v, s, y, E;
      const u = e.options, a = (s = (v = (g = e.fetchOptions) == null ? void 0 : g.meta) == null ? void 0 : v.fetchMore) == null ? void 0 : s.direction, n = ((y = e.state.data) == null ? void 0 : y.pages) || [], i = ((E = e.state.data) == null ? void 0 : E.pageParams) || [];
      let c = { pages: [], pageParams: [] }, f = 0;
      const o = async () => {
        let b = !1;
        const O = (m) => {
          Object.defineProperty(m, "signal", {
            enumerable: !0,
            get: () => (e.signal.aborted ? b = !0 : e.signal.addEventListener("abort", () => {
              b = !0;
            }), e.signal)
          });
        }, d = _v(e.options, e.fetchOptions), h = async (m, S, T) => {
          if (b)
            return Promise.reject();
          if (S == null && m.pages.length)
            return Promise.resolve(m);
          const M = (() => {
            const rt = {
              client: e.client,
              queryKey: e.queryKey,
              pageParam: S,
              direction: T ? "backward" : "forward",
              meta: e.options.meta
            };
            return O(rt), rt;
          })(), R = await d(M), { maxPages: H } = e.options, U = T ? y1 : cs;
          return {
            pages: U(m.pages, R, H),
            pageParams: U(m.pageParams, S, H)
          };
        };
        if (a && n.length) {
          const m = a === "backward", S = m ? Gv : ss, T = {
            pages: n,
            pageParams: i
          }, z = S(u, T);
          c = await h(T, z, m);
        } else {
          const m = t ?? n.length;
          do {
            const S = f === 0 ? i[0] ?? u.initialPageParam : ss(u, c);
            if (f > 0 && S == null)
              break;
            c = await h(c, S), f++;
          } while (f < m);
        }
        return c;
      };
      e.options.persister ? e.fetchFn = () => {
        var b, O;
        return (O = (b = e.options).persister) == null ? void 0 : O.call(
          b,
          o,
          {
            client: e.client,
            queryKey: e.queryKey,
            meta: e.options.meta,
            signal: e.signal
          },
          l
        );
      } : e.fetchFn = o;
    }
  };
}
function ss(t, { pages: e, pageParams: l }) {
  const u = e.length - 1;
  return e.length > 0 ? t.getNextPageParam(
    e[u],
    e,
    l[u],
    l
  ) : void 0;
}
function Gv(t, { pages: e, pageParams: l }) {
  var u;
  return e.length > 0 ? (u = t.getPreviousPageParam) == null ? void 0 : u.call(t, e[0], e, l[0], l) : void 0;
}
function E1(t, e) {
  return e ? ss(t, e) != null : !1;
}
function O1(t, e) {
  return !e || !t.getPreviousPageParam ? !1 : Gv(t, e) != null;
}
var at, il, cl, Xu, Zu, fl, Lu, Ku, Rh, jv = (Rh = class {
  constructor(t = {}) {
    _(this, at);
    _(this, il);
    _(this, cl);
    _(this, Xu);
    _(this, Zu);
    _(this, fl);
    _(this, Lu);
    _(this, Ku);
    A(this, at, t.queryCache || new qv()), A(this, il, t.mutationCache || new Bv()), A(this, cl, t.defaultOptions || {}), A(this, Xu, /* @__PURE__ */ new Map()), A(this, Zu, /* @__PURE__ */ new Map()), A(this, fl, 0);
  }
  mount() {
    Bn(this, fl)._++, r(this, fl) === 1 && (A(this, Lu, yc.subscribe(async (t) => {
      t && (await this.resumePausedMutations(), r(this, at).onFocus());
    })), A(this, Ku, rn.subscribe(async (t) => {
      t && (await this.resumePausedMutations(), r(this, at).onOnline());
    })));
  }
  unmount() {
    var t, e;
    Bn(this, fl)._--, r(this, fl) === 0 && ((t = r(this, Lu)) == null || t.call(this), A(this, Lu, void 0), (e = r(this, Ku)) == null || e.call(this), A(this, Ku, void 0));
  }
  isFetching(t) {
    return r(this, at).findAll({ ...t, fetchStatus: "fetching" }).length;
  }
  isMutating(t) {
    return r(this, il).findAll({ ...t, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(t) {
    var l;
    const e = this.defaultQueryOptions({ queryKey: t });
    return (l = r(this, at).get(e.queryHash)) == null ? void 0 : l.state.data;
  }
  ensureQueryData(t) {
    const e = this.defaultQueryOptions(t), l = r(this, at).build(this, e), u = l.state.data;
    return u === void 0 ? this.fetchQuery(t) : (t.revalidateIfStale && l.isStaleByTime(Dl(e.staleTime, l)) && this.prefetchQuery(e), Promise.resolve(u));
  }
  getQueriesData(t) {
    return r(this, at).findAll(t).map(({ queryKey: e, state: l }) => {
      const u = l.data;
      return [e, u];
    });
  }
  setQueryData(t, e, l) {
    const u = this.defaultQueryOptions({ queryKey: t }), a = r(this, at).get(
      u.queryHash
    ), n = a == null ? void 0 : a.state.data, i = o1(e, n);
    if (i !== void 0)
      return r(this, at).build(this, u).setData(i, { ...l, manual: !0 });
  }
  setQueriesData(t, e, l) {
    return P.batch(
      () => r(this, at).findAll(t).map(({ queryKey: u }) => [
        u,
        this.setQueryData(u, e, l)
      ])
    );
  }
  getQueryState(t) {
    var l;
    const e = this.defaultQueryOptions({ queryKey: t });
    return (l = r(this, at).get(
      e.queryHash
    )) == null ? void 0 : l.state;
  }
  removeQueries(t) {
    const e = r(this, at);
    P.batch(() => {
      e.findAll(t).forEach((l) => {
        e.remove(l);
      });
    });
  }
  resetQueries(t, e) {
    const l = r(this, at);
    return P.batch(() => (l.findAll(t).forEach((u) => {
      u.reset();
    }), this.refetchQueries(
      {
        type: "active",
        ...t
      },
      e
    )));
  }
  cancelQueries(t, e = {}) {
    const l = { revert: !0, ...e }, u = P.batch(
      () => r(this, at).findAll(t).map((a) => a.cancel(l))
    );
    return Promise.all(u).then(dt).catch(dt);
  }
  invalidateQueries(t, e = {}) {
    return P.batch(() => (r(this, at).findAll(t).forEach((l) => {
      l.invalidate();
    }), (t == null ? void 0 : t.refetchType) === "none" ? Promise.resolve() : this.refetchQueries(
      {
        ...t,
        type: (t == null ? void 0 : t.refetchType) ?? (t == null ? void 0 : t.type) ?? "active"
      },
      e
    )));
  }
  refetchQueries(t, e = {}) {
    const l = {
      ...e,
      cancelRefetch: e.cancelRefetch ?? !0
    }, u = P.batch(
      () => r(this, at).findAll(t).filter((a) => !a.isDisabled() && !a.isStatic()).map((a) => {
        let n = a.fetch(void 0, l);
        return l.throwOnError || (n = n.catch(dt)), a.state.fetchStatus === "paused" ? Promise.resolve() : n;
      })
    );
    return Promise.all(u).then(dt);
  }
  fetchQuery(t) {
    const e = this.defaultQueryOptions(t);
    e.retry === void 0 && (e.retry = !1);
    const l = r(this, at).build(this, e);
    return l.isStaleByTime(
      Dl(e.staleTime, l)
    ) ? l.fetch(e) : Promise.resolve(l.state.data);
  }
  prefetchQuery(t) {
    return this.fetchQuery(t).then(dt).catch(dt);
  }
  fetchInfiniteQuery(t) {
    return t.behavior = Ji(t.pages), this.fetchQuery(t);
  }
  prefetchInfiniteQuery(t) {
    return this.fetchInfiniteQuery(t).then(dt).catch(dt);
  }
  ensureInfiniteQueryData(t) {
    return t.behavior = Ji(t.pages), this.ensureQueryData(t);
  }
  resumePausedMutations() {
    return rn.isOnline() ? r(this, il).resumePausedMutations() : Promise.resolve();
  }
  getQueryCache() {
    return r(this, at);
  }
  getMutationCache() {
    return r(this, il);
  }
  getDefaultOptions() {
    return r(this, cl);
  }
  setDefaultOptions(t) {
    A(this, cl, t);
  }
  setQueryDefaults(t, e) {
    r(this, Xu).set(Cl(t), {
      queryKey: t,
      defaultOptions: e
    });
  }
  getQueryDefaults(t) {
    const e = [...r(this, Xu).values()], l = {};
    return e.forEach((u) => {
      ra(t, u.queryKey) && Object.assign(l, u.defaultOptions);
    }), l;
  }
  setMutationDefaults(t, e) {
    r(this, Zu).set(Cl(t), {
      mutationKey: t,
      defaultOptions: e
    });
  }
  getMutationDefaults(t) {
    const e = [...r(this, Zu).values()], l = {};
    return e.forEach((u) => {
      ra(t, u.mutationKey) && Object.assign(l, u.defaultOptions);
    }), l;
  }
  defaultQueryOptions(t) {
    if (t._defaulted)
      return t;
    const e = {
      ...r(this, cl).queries,
      ...this.getQueryDefaults(t.queryKey),
      ...t,
      _defaulted: !0
    };
    return e.queryHash || (e.queryHash = Dr(
      e.queryKey,
      e
    )), e.refetchOnReconnect === void 0 && (e.refetchOnReconnect = e.networkMode !== "always"), e.throwOnError === void 0 && (e.throwOnError = !!e.suspense), !e.networkMode && e.persister && (e.networkMode = "offlineFirst"), e.queryFn === dc && (e.enabled = !1), e;
  }
  defaultMutationOptions(t) {
    return t != null && t._defaulted ? t : {
      ...r(this, cl).mutations,
      ...(t == null ? void 0 : t.mutationKey) && this.getMutationDefaults(t.mutationKey),
      ...t,
      _defaulted: !0
    };
  }
  clear() {
    r(this, at).clear(), r(this, il).clear();
  }
}, at = new WeakMap(), il = new WeakMap(), cl = new WeakMap(), Xu = new WeakMap(), Zu = new WeakMap(), fl = new WeakMap(), Lu = new WeakMap(), Ku = new WeakMap(), Rh), qt, w, dn, Qt, Jl, Vu, sl, rl, yn, Ju, $u, $l, Fl, ol, Fu, K, Ha, rs, os, hs, ds, ys, vs, ms, wv, Dh, ba = (Dh = class extends ou {
  constructor(e, l) {
    super();
    _(this, K);
    _(this, qt);
    _(this, w);
    _(this, dn);
    _(this, Qt);
    _(this, Jl);
    _(this, Vu);
    _(this, sl);
    _(this, rl);
    _(this, yn);
    _(this, Ju);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    _(this, $u);
    _(this, $l);
    _(this, Fl);
    _(this, ol);
    _(this, Fu, /* @__PURE__ */ new Set());
    this.options = l, A(this, qt, e), A(this, rl, null), A(this, sl, fs()), this.options.experimental_prefetchInRender || r(this, sl).reject(
      new Error("experimental_prefetchInRender feature flag is not enabled")
    ), this.bindMethods(), this.setOptions(l);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 && (r(this, w).addObserver(this), oh(r(this, w), this.options) ? Q(this, K, Ha).call(this) : this.updateResult(), Q(this, K, ds).call(this));
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return gs(
      r(this, w),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return gs(
      r(this, w),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), Q(this, K, ys).call(this), Q(this, K, vs).call(this), r(this, w).removeObserver(this);
  }
  setOptions(e) {
    const l = this.options, u = r(this, w);
    if (this.options = r(this, qt).defaultQueryOptions(e), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof le(this.options.enabled, r(this, w)) != "boolean")
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    Q(this, K, ms).call(this), r(this, w).setOptions(this.options), l._defaulted && !Vi(this.options, l) && r(this, qt).getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: r(this, w),
      observer: this
    });
    const a = this.hasListeners();
    a && hh(
      r(this, w),
      u,
      this.options,
      l
    ) && Q(this, K, Ha).call(this), this.updateResult(), a && (r(this, w) !== u || le(this.options.enabled, r(this, w)) !== le(l.enabled, r(this, w)) || Dl(this.options.staleTime, r(this, w)) !== Dl(l.staleTime, r(this, w))) && Q(this, K, rs).call(this);
    const n = Q(this, K, os).call(this);
    a && (r(this, w) !== u || le(this.options.enabled, r(this, w)) !== le(l.enabled, r(this, w)) || n !== r(this, ol)) && Q(this, K, hs).call(this, n);
  }
  getOptimisticResult(e) {
    const l = r(this, qt).getQueryCache().build(r(this, qt), e), u = this.createResult(l, e);
    return A1(this, u) && (A(this, Qt, u), A(this, Vu, this.options), A(this, Jl, r(this, w).state)), u;
  }
  getCurrentResult() {
    return r(this, Qt);
  }
  trackResult(e, l) {
    return new Proxy(e, {
      get: (u, a) => (this.trackProp(a), l == null || l(a), Reflect.get(u, a))
    });
  }
  trackProp(e) {
    r(this, Fu).add(e);
  }
  getCurrentQuery() {
    return r(this, w);
  }
  refetch({ ...e } = {}) {
    return this.fetch({
      ...e
    });
  }
  fetchOptimistic(e) {
    const l = r(this, qt).defaultQueryOptions(e), u = r(this, qt).getQueryCache().build(r(this, qt), l);
    return u.fetch().then(() => this.createResult(u, l));
  }
  fetch(e) {
    return Q(this, K, Ha).call(this, {
      ...e,
      cancelRefetch: e.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), r(this, Qt)));
  }
  createResult(e, l) {
    var H;
    const u = r(this, w), a = this.options, n = r(this, Qt), i = r(this, Jl), c = r(this, Vu), o = e !== u ? e.state : r(this, dn), { state: g } = e;
    let v = { ...g }, s = !1, y;
    if (l._optimisticResults) {
      const U = this.hasListeners(), rt = !U && oh(e, l), zt = U && hh(e, u, l, a);
      (rt || zt) && (v = {
        ...v,
        ...Nv(g.data, e.options)
      }), l._optimisticResults === "isRestoring" && (v.fetchStatus = "idle");
    }
    let { error: E, errorUpdatedAt: b, status: O } = v;
    y = v.data;
    let d = !1;
    if (l.placeholderData !== void 0 && y === void 0 && O === "pending") {
      let U;
      n != null && n.isPlaceholderData && l.placeholderData === (c == null ? void 0 : c.placeholderData) ? (U = n.data, d = !0) : U = typeof l.placeholderData == "function" ? l.placeholderData(
        (H = r(this, $u)) == null ? void 0 : H.state.data,
        r(this, $u)
      ) : l.placeholderData, U !== void 0 && (O = "success", y = is(
        n == null ? void 0 : n.data,
        U,
        l
      ), s = !0);
    }
    if (l.select && y !== void 0 && !d)
      if (n && y === (i == null ? void 0 : i.data) && l.select === r(this, yn))
        y = r(this, Ju);
      else
        try {
          A(this, yn, l.select), y = l.select(y), y = is(n == null ? void 0 : n.data, y, l), A(this, Ju, y), A(this, rl, null);
        } catch (U) {
          A(this, rl, U);
        }
    r(this, rl) && (E = r(this, rl), y = r(this, Ju), b = Date.now(), O = "error");
    const h = v.fetchStatus === "fetching", m = O === "pending", S = O === "error", T = m && h, z = y !== void 0, R = {
      status: O,
      fetchStatus: v.fetchStatus,
      isPending: m,
      isSuccess: O === "success",
      isError: S,
      isInitialLoading: T,
      isLoading: T,
      data: y,
      dataUpdatedAt: v.dataUpdatedAt,
      error: E,
      errorUpdatedAt: b,
      failureCount: v.fetchFailureCount,
      failureReason: v.fetchFailureReason,
      errorUpdateCount: v.errorUpdateCount,
      isFetched: v.dataUpdateCount > 0 || v.errorUpdateCount > 0,
      isFetchedAfterMount: v.dataUpdateCount > o.dataUpdateCount || v.errorUpdateCount > o.errorUpdateCount,
      isFetching: h,
      isRefetching: h && !m,
      isLoadingError: S && !z,
      isPaused: v.fetchStatus === "paused",
      isPlaceholderData: s,
      isRefetchError: S && z,
      isStale: Ur(e, l),
      refetch: this.refetch,
      promise: r(this, sl),
      isEnabled: le(l.enabled, e) !== !1
    };
    if (this.options.experimental_prefetchInRender) {
      const U = (ql) => {
        R.status === "error" ? ql.reject(R.error) : R.data !== void 0 && ql.resolve(R.data);
      }, rt = () => {
        const ql = A(this, sl, R.promise = fs());
        U(ql);
      }, zt = r(this, sl);
      switch (zt.status) {
        case "pending":
          e.queryHash === u.queryHash && U(zt);
          break;
        case "fulfilled":
          (R.status === "error" || R.data !== zt.value) && rt();
          break;
        case "rejected":
          (R.status !== "error" || R.error !== zt.reason) && rt();
          break;
      }
    }
    return R;
  }
  updateResult() {
    const e = r(this, Qt), l = this.createResult(r(this, w), this.options);
    if (A(this, Jl, r(this, w).state), A(this, Vu, this.options), r(this, Jl).data !== void 0 && A(this, $u, r(this, w)), Vi(l, e))
      return;
    A(this, Qt, l);
    const u = () => {
      if (!e)
        return !0;
      const { notifyOnChangeProps: a } = this.options, n = typeof a == "function" ? a() : a;
      if (n === "all" || !n && !r(this, Fu).size)
        return !0;
      const i = new Set(
        n ?? r(this, Fu)
      );
      return this.options.throwOnError && i.add("error"), Object.keys(r(this, Qt)).some((c) => {
        const f = c;
        return r(this, Qt)[f] !== e[f] && i.has(f);
      });
    };
    Q(this, K, wv).call(this, { listeners: u() });
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && Q(this, K, ds).call(this);
  }
}, qt = new WeakMap(), w = new WeakMap(), dn = new WeakMap(), Qt = new WeakMap(), Jl = new WeakMap(), Vu = new WeakMap(), sl = new WeakMap(), rl = new WeakMap(), yn = new WeakMap(), Ju = new WeakMap(), $u = new WeakMap(), $l = new WeakMap(), Fl = new WeakMap(), ol = new WeakMap(), Fu = new WeakMap(), K = new WeakSet(), Ha = function(e) {
  Q(this, K, ms).call(this);
  let l = r(this, w).fetch(
    this.options,
    e
  );
  return e != null && e.throwOnError || (l = l.catch(dt)), l;
}, rs = function() {
  Q(this, K, ys).call(this);
  const e = Dl(
    this.options.staleTime,
    r(this, w)
  );
  if (Ql || r(this, Qt).isStale || !ls(e))
    return;
  const u = Dv(r(this, Qt).dataUpdatedAt, e) + 1;
  A(this, $l, setTimeout(() => {
    r(this, Qt).isStale || this.updateResult();
  }, u));
}, os = function() {
  return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(r(this, w)) : this.options.refetchInterval) ?? !1;
}, hs = function(e) {
  Q(this, K, vs).call(this), A(this, ol, e), !(Ql || le(this.options.enabled, r(this, w)) === !1 || !ls(r(this, ol)) || r(this, ol) === 0) && A(this, Fl, setInterval(() => {
    (this.options.refetchIntervalInBackground || yc.isFocused()) && Q(this, K, Ha).call(this);
  }, r(this, ol)));
}, ds = function() {
  Q(this, K, rs).call(this), Q(this, K, hs).call(this, Q(this, K, os).call(this));
}, ys = function() {
  r(this, $l) && (clearTimeout(r(this, $l)), A(this, $l, void 0));
}, vs = function() {
  r(this, Fl) && (clearInterval(r(this, Fl)), A(this, Fl, void 0));
}, ms = function() {
  const e = r(this, qt).getQueryCache().build(r(this, qt), this.options);
  if (e === r(this, w))
    return;
  const l = r(this, w);
  A(this, w, e), A(this, dn, e.state), this.hasListeners() && (l == null || l.removeObserver(this), e.addObserver(this));
}, wv = function(e) {
  P.batch(() => {
    e.listeners && this.listeners.forEach((l) => {
      l(r(this, Qt));
    }), r(this, qt).getQueryCache().notify({
      query: r(this, w),
      type: "observerResultsUpdated"
    });
  });
}, Dh);
function T1(t, e) {
  return le(e.enabled, t) !== !1 && t.state.data === void 0 && !(t.state.status === "error" && e.retryOnMount === !1);
}
function oh(t, e) {
  return T1(t, e) || t.state.data !== void 0 && gs(t, e, e.refetchOnMount);
}
function gs(t, e, l) {
  if (le(e.enabled, t) !== !1 && Dl(e.staleTime, t) !== "static") {
    const u = typeof l == "function" ? l(t) : l;
    return u === "always" || u !== !1 && Ur(t, e);
  }
  return !1;
}
function hh(t, e, l, u) {
  return (t !== e || le(u.enabled, t) === !1) && (!l.suspense || t.state.status !== "error") && Ur(t, l);
}
function Ur(t, e) {
  return le(e.enabled, t) !== !1 && t.isStaleByTime(Dl(e.staleTime, t));
}
function A1(t, e) {
  return !Vi(t.getCurrentResult(), e);
}
function dh(t, e) {
  const l = new Set(e);
  return t.filter((u) => !l.has(u));
}
function M1(t, e, l) {
  const u = t.slice(0);
  return u[e] = l, u;
}
var Wu, It, ku, Pu, te, hl, vn, mn, gn, Mt, Ss, bs, ps, Es, Os, _h, Xv = (_h = class extends ou {
  constructor(e, l, u) {
    super();
    _(this, Mt);
    _(this, Wu);
    _(this, It);
    _(this, ku);
    _(this, Pu);
    _(this, te);
    _(this, hl);
    _(this, vn);
    _(this, mn);
    _(this, gn, []);
    A(this, Wu, e), A(this, Pu, u), A(this, ku, []), A(this, te, []), A(this, It, []), this.setQueries(l);
  }
  onSubscribe() {
    this.listeners.size === 1 && r(this, te).forEach((e) => {
      e.subscribe((l) => {
        Q(this, Mt, Es).call(this, e, l);
      });
    });
  }
  onUnsubscribe() {
    this.listeners.size || this.destroy();
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), r(this, te).forEach((e) => {
      e.destroy();
    });
  }
  setQueries(e, l) {
    A(this, ku, e), A(this, Pu, l), P.batch(() => {
      const u = r(this, te), a = Q(this, Mt, ps).call(this, r(this, ku));
      A(this, gn, a), a.forEach(
        (f) => f.observer.setOptions(f.defaultedQueryOptions)
      );
      const n = a.map((f) => f.observer), i = n.map(
        (f) => f.getCurrentResult()
      ), c = n.some(
        (f, o) => f !== u[o]
      );
      u.length === n.length && !c || (A(this, te, n), A(this, It, i), this.hasListeners() && (dh(u, n).forEach((f) => {
        f.destroy();
      }), dh(n, u).forEach((f) => {
        f.subscribe((o) => {
          Q(this, Mt, Es).call(this, f, o);
        });
      }), Q(this, Mt, Os).call(this)));
    });
  }
  getCurrentResult() {
    return r(this, It);
  }
  getQueries() {
    return r(this, te).map((e) => e.getCurrentQuery());
  }
  getObservers() {
    return r(this, te);
  }
  getOptimisticResult(e, l) {
    const u = Q(this, Mt, ps).call(this, e), a = u.map(
      (n) => n.observer.getOptimisticResult(n.defaultedQueryOptions)
    );
    return [
      a,
      (n) => Q(this, Mt, bs).call(this, n ?? a, l),
      () => Q(this, Mt, Ss).call(this, a, u)
    ];
  }
}, Wu = new WeakMap(), It = new WeakMap(), ku = new WeakMap(), Pu = new WeakMap(), te = new WeakMap(), hl = new WeakMap(), vn = new WeakMap(), mn = new WeakMap(), gn = new WeakMap(), Mt = new WeakSet(), Ss = function(e, l) {
  return l.map((u, a) => {
    const n = e[a];
    return u.defaultedQueryOptions.notifyOnChangeProps ? n : u.observer.trackResult(n, (i) => {
      l.forEach((c) => {
        c.observer.trackProp(i);
      });
    });
  });
}, bs = function(e, l) {
  return l ? ((!r(this, hl) || r(this, It) !== r(this, mn) || l !== r(this, vn)) && (A(this, vn, l), A(this, mn, r(this, It)), A(this, hl, Nn(
    r(this, hl),
    l(e)
  ))), r(this, hl)) : e;
}, ps = function(e) {
  const l = new Map(
    r(this, te).map((a) => [a.options.queryHash, a])
  ), u = [];
  return e.forEach((a) => {
    const n = r(this, Wu).defaultQueryOptions(a), i = l.get(n.queryHash);
    i ? u.push({
      defaultedQueryOptions: n,
      observer: i
    }) : u.push({
      defaultedQueryOptions: n,
      observer: new ba(r(this, Wu), n)
    });
  }), u;
}, Es = function(e, l) {
  const u = r(this, te).indexOf(e);
  u !== -1 && (A(this, It, M1(r(this, It), u, l)), Q(this, Mt, Os).call(this));
}, Os = function() {
  var e;
  if (this.hasListeners()) {
    const l = r(this, hl), u = Q(this, Mt, Ss).call(this, r(this, It), r(this, gn)), a = Q(this, Mt, bs).call(this, u, (e = r(this, Pu)) == null ? void 0 : e.combine);
    l !== a && P.batch(() => {
      this.listeners.forEach((n) => {
        n(r(this, It));
      });
    });
  }
}, _h), Qr = class extends ba {
  constructor(t, e) {
    super(t, e);
  }
  bindMethods() {
    super.bindMethods(), this.fetchNextPage = this.fetchNextPage.bind(this), this.fetchPreviousPage = this.fetchPreviousPage.bind(this);
  }
  setOptions(t) {
    super.setOptions({
      ...t,
      behavior: Ji()
    });
  }
  getOptimisticResult(t) {
    return t.behavior = Ji(), super.getOptimisticResult(t);
  }
  fetchNextPage(t) {
    return this.fetch({
      ...t,
      meta: {
        fetchMore: { direction: "forward" }
      }
    });
  }
  fetchPreviousPage(t) {
    return this.fetch({
      ...t,
      meta: {
        fetchMore: { direction: "backward" }
      }
    });
  }
  createResult(t, e) {
    var E, b;
    const { state: l } = t, u = super.createResult(t, e), { isFetching: a, isRefetching: n, isError: i, isRefetchError: c } = u, f = (b = (E = l.fetchMeta) == null ? void 0 : E.fetchMore) == null ? void 0 : b.direction, o = i && f === "forward", g = a && f === "forward", v = i && f === "backward", s = a && f === "backward";
    return {
      ...u,
      fetchNextPage: this.fetchNextPage,
      fetchPreviousPage: this.fetchPreviousPage,
      hasNextPage: E1(e, l.data),
      hasPreviousPage: O1(e, l.data),
      isFetchNextPageError: o,
      isFetchingNextPage: g,
      isFetchPreviousPageError: v,
      isFetchingPreviousPage: s,
      isRefetchError: c && !o && !v,
      isRefetching: n && !g && !s
    };
  }
}, dl, yl, xt, He, Xe, vi, Ts, zh, Zv = (zh = class extends ou {
  constructor(e, l) {
    super();
    _(this, Xe);
    _(this, dl);
    _(this, yl);
    _(this, xt);
    _(this, He);
    A(this, dl, e), this.setOptions(l), this.bindMethods(), Q(this, Xe, vi).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this), this.reset = this.reset.bind(this);
  }
  setOptions(e) {
    var u;
    const l = this.options;
    this.options = r(this, dl).defaultMutationOptions(e), Vi(this.options, l) || r(this, dl).getMutationCache().notify({
      type: "observerOptionsUpdated",
      mutation: r(this, xt),
      observer: this
    }), l != null && l.mutationKey && this.options.mutationKey && Cl(l.mutationKey) !== Cl(this.options.mutationKey) ? this.reset() : ((u = r(this, xt)) == null ? void 0 : u.state.status) === "pending" && r(this, xt).setOptions(this.options);
  }
  onUnsubscribe() {
    var e;
    this.hasListeners() || (e = r(this, xt)) == null || e.removeObserver(this);
  }
  onMutationUpdate(e) {
    Q(this, Xe, vi).call(this), Q(this, Xe, Ts).call(this, e);
  }
  getCurrentResult() {
    return r(this, yl);
  }
  reset() {
    var e;
    (e = r(this, xt)) == null || e.removeObserver(this), A(this, xt, void 0), Q(this, Xe, vi).call(this), Q(this, Xe, Ts).call(this);
  }
  mutate(e, l) {
    var u;
    return A(this, He, l), (u = r(this, xt)) == null || u.removeObserver(this), A(this, xt, r(this, dl).getMutationCache().build(r(this, dl), this.options)), r(this, xt).addObserver(this), r(this, xt).execute(e);
  }
}, dl = new WeakMap(), yl = new WeakMap(), xt = new WeakMap(), He = new WeakMap(), Xe = new WeakSet(), vi = function() {
  var l;
  const e = ((l = r(this, xt)) == null ? void 0 : l.state) ?? Yv();
  A(this, yl, {
    ...e,
    isPending: e.status === "pending",
    isSuccess: e.status === "success",
    isError: e.status === "error",
    isIdle: e.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, Ts = function(e) {
  P.batch(() => {
    var l, u, a, n, i, c, f, o;
    if (r(this, He) && this.hasListeners()) {
      const g = r(this, yl).variables, v = r(this, yl).context;
      (e == null ? void 0 : e.type) === "success" ? ((u = (l = r(this, He)).onSuccess) == null || u.call(l, e.data, g, v), (n = (a = r(this, He)).onSettled) == null || n.call(a, e.data, null, g, v)) : (e == null ? void 0 : e.type) === "error" && ((c = (i = r(this, He)).onError) == null || c.call(i, e.error, g, v), (o = (f = r(this, He)).onSettled) == null || o.call(
        f,
        void 0,
        e.error,
        g,
        v
      ));
    }
    this.listeners.forEach((g) => {
      g(r(this, yl));
    });
  });
}, zh);
function Lv(t) {
  return t;
}
function R1(t) {
  return {
    mutationKey: t.options.mutationKey,
    state: t.state,
    ...t.options.scope && { scope: t.options.scope },
    ...t.meta && { meta: t.meta }
  };
}
function D1(t, e, l) {
  var u;
  return {
    dehydratedAt: Date.now(),
    state: {
      ...t.state,
      ...t.state.data !== void 0 && {
        data: e(t.state.data)
      }
    },
    queryKey: t.queryKey,
    queryHash: t.queryHash,
    ...t.state.status === "pending" && {
      promise: (u = t.promise) == null ? void 0 : u.then(e).catch((a) => l(a) ? Promise.reject(new Error("redacted")) : Promise.reject(a))
    },
    ...t.meta && { meta: t.meta }
  };
}
function Kv(t) {
  return t.state.isPaused;
}
function Vv(t) {
  return t.state.status === "success";
}
function _1(t) {
  return !0;
}
function z1(t, e = {}) {
  var f, o, g, v;
  const l = e.shouldDehydrateMutation ?? ((f = t.getDefaultOptions().dehydrate) == null ? void 0 : f.shouldDehydrateMutation) ?? Kv, u = t.getMutationCache().getAll().flatMap(
    (s) => l(s) ? [R1(s)] : []
  ), a = e.shouldDehydrateQuery ?? ((o = t.getDefaultOptions().dehydrate) == null ? void 0 : o.shouldDehydrateQuery) ?? Vv, n = e.shouldRedactErrors ?? ((g = t.getDefaultOptions().dehydrate) == null ? void 0 : g.shouldRedactErrors) ?? _1, i = e.serializeData ?? ((v = t.getDefaultOptions().dehydrate) == null ? void 0 : v.serializeData) ?? Lv, c = t.getQueryCache().getAll().flatMap(
    (s) => a(s) ? [D1(s, i, n)] : []
  );
  return { mutations: u, queries: c };
}
function As(t, e, l) {
  var f, o;
  if (typeof e != "object" || e === null)
    return;
  const u = t.getMutationCache(), a = t.getQueryCache(), n = ((f = l == null ? void 0 : l.defaultOptions) == null ? void 0 : f.deserializeData) ?? ((o = t.getDefaultOptions().hydrate) == null ? void 0 : o.deserializeData) ?? Lv, i = e.mutations || [], c = e.queries || [];
  i.forEach(({ state: g, ...v }) => {
    var s, y;
    u.build(
      t,
      {
        ...(s = t.getDefaultOptions().hydrate) == null ? void 0 : s.mutations,
        ...(y = l == null ? void 0 : l.defaultOptions) == null ? void 0 : y.mutations,
        ...v
      },
      g
    );
  }), c.forEach(
    ({ queryKey: g, state: v, queryHash: s, meta: y, promise: E, dehydratedAt: b }) => {
      var z, M;
      const O = E ? g1(E) : void 0, d = v.data === void 0 ? O == null ? void 0 : O.data : v.data, h = d === void 0 ? d : n(d);
      let m = a.get(s);
      const S = (m == null ? void 0 : m.state.status) === "pending", T = (m == null ? void 0 : m.state.fetchStatus) === "fetching";
      if (m) {
        const R = O && // We only need this undefined check to handle older dehydration
        // payloads that might not have dehydratedAt
        b !== void 0 && b > m.state.dataUpdatedAt;
        if (v.dataUpdatedAt > m.state.dataUpdatedAt || R) {
          const { fetchStatus: H, ...U } = v;
          m.setState({
            ...U,
            data: h
          });
        }
      } else
        m = a.build(
          t,
          {
            ...(z = t.getDefaultOptions().hydrate) == null ? void 0 : z.queries,
            ...(M = l == null ? void 0 : l.defaultOptions) == null ? void 0 : M.queries,
            queryKey: g,
            queryHash: s,
            meta: y
          },
          // Reset fetch status to idle to avoid
          // query being stuck in fetching state upon hydration
          {
            ...v,
            data: h,
            fetchStatus: "idle",
            status: h !== void 0 ? "success" : v.status
          }
        );
      E && !S && !T && // Only hydrate if dehydration is newer than any existing data,
      // this is always true for new queries
      (b === void 0 || b > m.state.dataUpdatedAt) && m.fetch(void 0, {
        // RSC transformed promises are not thenable
        initialPromise: Promise.resolve(E).then(n)
      });
    }
  );
}
function U1({
  queryFn: t,
  refetchMode: e = "reset",
  maxChunks: l
}) {
  return async (u) => {
    const a = u.client.getQueryCache().find({ queryKey: u.queryKey, exact: !0 }), n = !!a && a.state.data !== void 0;
    n && e === "reset" && a.setState({
      status: "pending",
      data: void 0,
      error: null,
      fetchStatus: "fetching"
    });
    let i = [];
    const c = await t(u);
    for await (const f of c) {
      if (u.signal.aborted)
        break;
      (!n || e !== "replace") && u.client.setQueryData(
        u.queryKey,
        (o = []) => cs(o, f, l)
      ), i = cs(i, f, l);
    }
    return n && e === "replace" && !u.signal.aborted && u.client.setQueryData(u.queryKey, i), u.client.getQueryData(u.queryKey);
  };
}
var Q1 = Symbol("dataTagSymbol"), C1 = Symbol("dataTagErrorSymbol"), H1 = Symbol("unsetMarker"), Jv = { exports: {} }, vc = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var N1 = Symbol.for("react.transitional.element"), q1 = Symbol.for("react.fragment");
function $v(t, e, l) {
  var u = null;
  if (l !== void 0 && (u = "" + l), e.key !== void 0 && (u = "" + e.key), "key" in e) {
    l = {};
    for (var a in e)
      a !== "key" && (l[a] = e[a]);
  } else l = e;
  return e = l.ref, {
    $$typeof: N1,
    type: t,
    key: u,
    ref: e !== void 0 ? e : null,
    props: l
  };
}
vc.Fragment = q1;
vc.jsx = $v;
vc.jsxs = $v;
Jv.exports = vc;
var Fv = Jv.exports, Cr = N.createContext(
  void 0
), me = (t) => {
  const e = N.useContext(Cr);
  if (t)
    return t;
  if (!e)
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return e;
}, Wv = ({
  client: t,
  children: e
}) => (N.useEffect(() => (t.mount(), () => {
  t.unmount();
}), [t]), /* @__PURE__ */ Fv.jsx(Cr.Provider, { value: t, children: e })), kv = N.createContext(!1), Hr = () => N.useContext(kv), x1 = kv.Provider;
function Pv() {
  let t = !1;
  return {
    clearReset: () => {
      t = !1;
    },
    reset: () => {
      t = !0;
    },
    isReset: () => t
  };
}
var Iv = N.createContext(Pv()), Nr = () => N.useContext(Iv), Y1 = ({
  children: t
}) => {
  const [e] = N.useState(() => Pv());
  return /* @__PURE__ */ Fv.jsx(Iv.Provider, { value: e, children: typeof t == "function" ? t(e) : t });
}, t0 = (t, e) => {
  (t.suspense || t.throwOnError || t.experimental_prefetchInRender) && (e.isReset() || (t.retryOnMount = !1));
}, e0 = (t) => {
  N.useEffect(() => {
    t.clearReset();
  }, [t]);
}, l0 = ({
  result: t,
  errorResetBoundary: e,
  throwOnError: l,
  query: u,
  suspense: a
}) => t.isError && !e.isReset() && !t.isFetching && u && (a && t.data === void 0 || _r(l, [t.error, u])), qr = (t, e) => e.state.data === void 0, u0 = (t) => {
  if (t.suspense) {
    const e = (u) => u === "static" ? u : Math.max(u ?? 1e3, 1e3), l = t.staleTime;
    t.staleTime = typeof l == "function" ? (...u) => e(l(...u)) : e(l), typeof t.gcTime == "number" && (t.gcTime = Math.max(t.gcTime, 1e3));
  }
}, a0 = (t, e) => t.isLoading && t.isFetching && !e, Ms = (t, e) => (t == null ? void 0 : t.suspense) && e.isPending, $i = (t, e, l) => e.fetchOptimistic(t).catch(() => {
  l.clearReset();
});
function n0({
  queries: t,
  ...e
}, l) {
  const u = me(l), a = Hr(), n = Nr(), i = N.useMemo(
    () => t.map((b) => {
      const O = u.defaultQueryOptions(
        b
      );
      return O._optimisticResults = a ? "isRestoring" : "optimistic", O;
    }),
    [t, u, a]
  );
  i.forEach((b) => {
    u0(b), t0(b, n);
  }), e0(n);
  const [c] = N.useState(
    () => new Xv(
      u,
      i,
      e
    )
  ), [f, o, g] = c.getOptimisticResult(
    i,
    e.combine
  ), v = !a && e.subscribed !== !1;
  N.useSyncExternalStore(
    N.useCallback(
      (b) => v ? c.subscribe(P.batchCalls(b)) : dt,
      [c, v]
    ),
    () => c.getCurrentResult(),
    () => c.getCurrentResult()
  ), N.useEffect(() => {
    c.setQueries(
      i,
      e
    );
  }, [i, e, c]);
  const y = f.some(
    (b, O) => Ms(i[O], b)
  ) ? f.flatMap((b, O) => {
    const d = i[O];
    if (d) {
      const h = new ba(u, d);
      if (Ms(d, b))
        return $i(d, h, n);
      a0(b, a) && $i(d, h, n);
    }
    return [];
  }) : [];
  if (y.length > 0)
    throw Promise.all(y);
  const E = f.find(
    (b, O) => {
      const d = i[O];
      return d && l0({
        result: b,
        errorResetBoundary: n,
        throwOnError: d.throwOnError,
        query: u.getQueryCache().get(d.queryHash),
        suspense: d.suspense
      });
    }
  );
  if (E != null && E.error)
    throw E.error;
  return o(g());
}
function mc(t, e, l) {
  var v, s, y, E, b;
  const u = Hr(), a = Nr(), n = me(l), i = n.defaultQueryOptions(t);
  (s = (v = n.getDefaultOptions().queries) == null ? void 0 : v._experimental_beforeQuery) == null || s.call(
    v,
    i
  ), i._optimisticResults = u ? "isRestoring" : "optimistic", u0(i), t0(i, a), e0(a);
  const c = !n.getQueryCache().get(i.queryHash), [f] = N.useState(
    () => new e(
      n,
      i
    )
  ), o = f.getOptimisticResult(i), g = !u && t.subscribed !== !1;
  if (N.useSyncExternalStore(
    N.useCallback(
      (O) => {
        const d = g ? f.subscribe(P.batchCalls(O)) : dt;
        return f.updateResult(), d;
      },
      [f, g]
    ),
    () => f.getCurrentResult(),
    () => f.getCurrentResult()
  ), N.useEffect(() => {
    f.setOptions(i);
  }, [i, f]), Ms(i, o))
    throw $i(i, f, a);
  if (l0({
    result: o,
    errorResetBoundary: a,
    throwOnError: i.throwOnError,
    query: n.getQueryCache().get(i.queryHash),
    suspense: i.suspense
  }))
    throw o.error;
  if ((E = (y = n.getDefaultOptions().queries) == null ? void 0 : y._experimental_afterQuery) == null || E.call(
    y,
    i,
    o
  ), i.experimental_prefetchInRender && !Ql && a0(o, u)) {
    const O = c ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      $i(i, f, a)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      (b = n.getQueryCache().get(i.queryHash)) == null ? void 0 : b.promise
    );
    O == null || O.catch(dt).finally(() => {
      f.updateResult();
    });
  }
  return i.notifyOnChangeProps ? o : f.trackResult(o);
}
function gc(t, e) {
  return mc(t, ba, e);
}
function B1(t, e) {
  return mc(
    {
      ...t,
      enabled: !0,
      suspense: !0,
      throwOnError: qr,
      placeholderData: void 0
    },
    ba,
    e
  );
}
function G1(t, e) {
  return mc(
    {
      ...t,
      enabled: !0,
      suspense: !0,
      throwOnError: qr
    },
    Qr,
    e
  );
}
function j1(t, e) {
  return n0(
    {
      ...t,
      queries: t.queries.map((l) => ({
        ...l,
        suspense: !0,
        throwOnError: qr,
        enabled: !0,
        placeholderData: void 0
      }))
    },
    e
  );
}
function w1(t, e) {
  const l = me(e);
  l.getQueryState(t.queryKey) || l.prefetchQuery(t);
}
function X1(t, e) {
  const l = me(e);
  l.getQueryState(t.queryKey) || l.prefetchInfiniteQuery(t);
}
function Z1(t) {
  return t;
}
function L1(t) {
  return t;
}
var K1 = ({
  children: t,
  options: e = {},
  state: l,
  queryClient: u
}) => {
  const a = me(u), n = N.useRef(e);
  n.current = e;
  const i = N.useMemo(() => {
    if (l) {
      if (typeof l != "object")
        return;
      const c = a.getQueryCache(), f = l.queries || [], o = [], g = [];
      for (const v of f) {
        const s = c.get(v.queryHash);
        s ? (v.state.dataUpdatedAt > s.state.dataUpdatedAt || v.promise && s.state.status !== "pending" && s.state.fetchStatus !== "fetching" && v.dehydratedAt !== void 0 && v.dehydratedAt > s.state.dataUpdatedAt) && g.push(v) : o.push(v);
      }
      if (o.length > 0 && As(a, { queries: o }, n.current), g.length > 0)
        return g;
    }
  }, [a, l]);
  return N.useEffect(() => {
    i && As(a, { queries: i }, n.current);
  }, [a, i]), t;
};
function V1(t, e) {
  const l = me(e), u = l.getQueryCache();
  return N.useSyncExternalStore(
    N.useCallback(
      (a) => u.subscribe(P.batchCalls(a)),
      [u]
    ),
    () => l.isFetching(t),
    () => l.isFetching(t)
  );
}
function J1(t, e) {
  const l = me(e);
  return i0(
    { filters: { ...t, status: "pending" } },
    l
  ).length;
}
function yh(t, e) {
  return t.findAll(e.filters).map(
    (l) => e.select ? e.select(l) : l.state
  );
}
function i0(t = {}, e) {
  const l = me(e).getMutationCache(), u = N.useRef(t), a = N.useRef(null);
  return a.current || (a.current = yh(l, t)), N.useEffect(() => {
    u.current = t;
  }), N.useSyncExternalStore(
    N.useCallback(
      (n) => l.subscribe(() => {
        const i = Nn(
          a.current,
          yh(l, u.current)
        );
        a.current !== i && (a.current = i, P.schedule(n));
      }),
      [l]
    ),
    () => a.current,
    () => a.current
  );
}
function c0(t, e) {
  const l = me(e), [u] = N.useState(
    () => new Zv(
      l,
      t
    )
  );
  N.useEffect(() => {
    u.setOptions(t);
  }, [u, t]);
  const a = N.useSyncExternalStore(
    N.useCallback(
      (i) => u.subscribe(P.batchCalls(i)),
      [u]
    ),
    () => u.getCurrentResult(),
    () => u.getCurrentResult()
  ), n = N.useCallback(
    (i, c) => {
      u.mutate(i, c).catch(dt);
    },
    [u]
  );
  if (a.error && _r(u.options.throwOnError, [a.error]))
    throw a.error;
  return { ...a, mutate: n, mutateAsync: a.mutate };
}
function $1(t) {
  return t;
}
function F1(t, e) {
  return mc(
    t,
    Qr,
    e
  );
}
const f0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CancelledError: zr,
  HydrationBoundary: K1,
  InfiniteQueryObserver: Qr,
  IsRestoringProvider: x1,
  Mutation: xv,
  MutationCache: Bv,
  MutationObserver: Zv,
  QueriesObserver: Xv,
  Query: Hv,
  QueryCache: qv,
  QueryClient: jv,
  QueryClientContext: Cr,
  QueryClientProvider: Wv,
  QueryErrorResetBoundary: Y1,
  QueryObserver: ba,
  dataTagErrorSymbol: C1,
  dataTagSymbol: Q1,
  defaultScheduler: Qv,
  defaultShouldDehydrateMutation: Kv,
  defaultShouldDehydrateQuery: Vv,
  dehydrate: z1,
  experimental_streamedQuery: U1,
  focusManager: yc,
  hashKey: Cl,
  hydrate: As,
  infiniteQueryOptions: L1,
  isCancelledError: yi,
  isServer: Ql,
  keepPreviousData: d1,
  matchMutation: as,
  matchQuery: us,
  mutationOptions: $1,
  noop: dt,
  notifyManager: P,
  onlineManager: rn,
  partialMatchKey: ra,
  queryOptions: Z1,
  replaceEqualDeep: Nn,
  shouldThrowError: _r,
  skipToken: dc,
  unsetMarker: H1,
  useInfiniteQuery: F1,
  useIsFetching: V1,
  useIsMutating: J1,
  useIsRestoring: Hr,
  useMutation: c0,
  useMutationState: i0,
  usePrefetchInfiniteQuery: X1,
  usePrefetchQuery: w1,
  useQueries: n0,
  useQuery: gc,
  useQueryClient: me,
  useQueryErrorResetBoundary: Nr,
  useSuspenseInfiniteQuery: G1,
  useSuspenseQueries: j1,
  useSuspenseQuery: B1
}, Symbol.toStringTag, { value: "Module" })), W1 = {}, vh = (t) => {
  let e;
  const l = /* @__PURE__ */ new Set(), u = (g, v) => {
    const s = typeof g == "function" ? g(e) : g;
    if (!Object.is(s, e)) {
      const y = e;
      e = v ?? (typeof s != "object" || s === null) ? s : Object.assign({}, e, s), l.forEach((E) => E(e, y));
    }
  }, a = () => e, f = { setState: u, getState: a, getInitialState: () => o, subscribe: (g) => (l.add(g), () => l.delete(g)), destroy: () => {
    (W1 ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), l.clear();
  } }, o = e = t(u, a, f);
  return f;
}, k1 = (t) => t ? vh(t) : vh;
var s0 = { exports: {} }, r0 = {}, o0 = { exports: {} }, h0 = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oa = N;
function P1(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var I1 = typeof Object.is == "function" ? Object.is : P1, tS = oa.useState, eS = oa.useEffect, lS = oa.useLayoutEffect, uS = oa.useDebugValue;
function aS(t, e) {
  var l = e(), u = tS({ inst: { value: l, getSnapshot: e } }), a = u[0].inst, n = u[1];
  return lS(
    function() {
      a.value = l, a.getSnapshot = e, af(a) && n({ inst: a });
    },
    [t, l, e]
  ), eS(
    function() {
      return af(a) && n({ inst: a }), t(function() {
        af(a) && n({ inst: a });
      });
    },
    [t]
  ), uS(l), l;
}
function af(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var l = e();
    return !I1(t, l);
  } catch {
    return !0;
  }
}
function nS(t, e) {
  return e();
}
var iS = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? nS : aS;
h0.useSyncExternalStore = oa.useSyncExternalStore !== void 0 ? oa.useSyncExternalStore : iS;
o0.exports = h0;
var cS = o0.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sc = N, fS = cS;
function sS(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var rS = typeof Object.is == "function" ? Object.is : sS, oS = fS.useSyncExternalStore, hS = Sc.useRef, dS = Sc.useEffect, yS = Sc.useMemo, vS = Sc.useDebugValue;
r0.useSyncExternalStoreWithSelector = function(t, e, l, u, a) {
  var n = hS(null);
  if (n.current === null) {
    var i = { hasValue: !1, value: null };
    n.current = i;
  } else i = n.current;
  n = yS(
    function() {
      function f(y) {
        if (!o) {
          if (o = !0, g = y, y = u(y), a !== void 0 && i.hasValue) {
            var E = i.value;
            if (a(E, y))
              return v = E;
          }
          return v = y;
        }
        if (E = v, rS(g, y)) return E;
        var b = u(y);
        return a !== void 0 && a(E, b) ? (g = y, E) : (g = y, v = b);
      }
      var o = !1, g, v, s = l === void 0 ? null : l;
      return [
        function() {
          return f(e());
        },
        s === null ? void 0 : function() {
          return f(s());
        }
      ];
    },
    [e, l, u, a]
  );
  var c = oS(t, n[0], n[1]);
  return dS(
    function() {
      i.hasValue = !0, i.value = c;
    },
    [c]
  ), vS(c), c;
};
s0.exports = r0;
var mS = s0.exports;
const gS = /* @__PURE__ */ Rs(mS), d0 = {}, { useDebugValue: SS } = jt, { useSyncExternalStoreWithSelector: bS } = gS;
let mh = !1;
const pS = (t) => t;
function ES(t, e = pS, l) {
  (d0 ? "production" : void 0) !== "production" && l && !mh && (console.warn(
    "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
  ), mh = !0);
  const u = bS(
    t.subscribe,
    t.getState,
    t.getServerState || t.getInitialState,
    e,
    l
  );
  return SS(u), u;
}
const gh = (t) => {
  (d0 ? "production" : void 0) !== "production" && typeof t != "function" && console.warn(
    "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
  );
  const e = typeof t == "function" ? k1(t) : t, l = (u, a) => ES(e, u, a);
  return Object.assign(l, e), l;
}, pa = (t) => t ? gh(t) : gh, OS = N.createContext(null);
function TS({ children: t }) {
  const [e, l] = N.useState(typeof window < "u" ? window.location.pathname : "/"), [u, a] = N.useState({}), [n, i] = N.useState({});
  N.useEffect(() => {
    if (typeof window > "u") return;
    const f = (g) => {
      l(g.detail.pathname), g.detail.params && a(g.detail.params), g.detail.query && i(g.detail.query);
    }, o = () => {
      l(window.location.pathname);
      const g = new URLSearchParams(window.location.search), v = {};
      g.forEach((s, y) => {
        v[y] = s;
      }), i(v);
    };
    return window.addEventListener("mfa:route-changed", f), window.addEventListener("popstate", o), () => {
      window.removeEventListener("mfa:route-changed", f), window.removeEventListener("popstate", o);
    };
  }, []);
  const c = (f) => {
    typeof window < "u" && (window.history.pushState(null, "", f), window.dispatchEvent(new PopStateEvent("popstate")));
  };
  return /* @__PURE__ */ jt.createElement(OS.Provider, { value: { pathname: e, navigate: c, params: u, query: n } }, t);
}
let nf = null;
function AS() {
  return nf || (nf = new jv({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1e3,
        // 5분
        gcTime: 10 * 60 * 1e3,
        // 10분 (구 cacheTime)
        retry: 1,
        refetchOnWindowFocus: !1
      },
      mutations: {
        retry: 1
      }
    }
  })), nf;
}
function MS(t = {}) {
  const e = AS();
  return Object.entries(t).forEach(([l, u]) => {
    try {
      e.setQueryData(JSON.parse(l), u);
    } catch (a) {
      console.warn("Failed to parse query key:", l, a);
    }
  }), e;
}
function y0({ children: t, ssrQueries: e }) {
  const l = jt.useMemo(() => MS(e), [e]);
  return /* @__PURE__ */ jt.createElement(Wv, { client: l }, t);
}
const v0 = pa((t, e) => ({
  user: null,
  theme: "light",
  language: "ko",
  setUser: (l) => t({ user: l }),
  setTheme: (l) => t({ theme: l }),
  setLanguage: (l) => t({ language: l }),
  // SSR에서 초기화할 때 사용
  initializeFromSSR: (l) => {
    const u = {};
    l.user && (u.user = l.user), l.theme && (u.theme = l.theme), l.language && (u.language = l.language), t(u);
  }
})), QS = pa((t, e) => ({
  events: {},
  emit: (l, u) => {
    const { events: a } = e();
    (a[l] || []).forEach((i) => i(u));
  },
  on: (l, u) => (t((a) => ({
    events: {
      ...a.events,
      [l]: [...a.events[l] || [], u]
    }
  })), () => e().off(l, u)),
  off: (l, u) => {
    t((a) => ({
      events: {
        ...a.events,
        [l]: (a.events[l] || []).filter((n) => n !== u)
      }
    }));
  }
})), m0 = pa((t, e) => ({
  notifications: [],
  addNotification: (l) => {
    const u = Date.now().toString(), a = Date.now(), n = {
      id: u,
      timestamp: a,
      ...l
    };
    return t((i) => ({
      notifications: [...i.notifications, n]
    })), l.autoRemove !== !1 && setTimeout(() => {
      e().removeNotification(u);
    }, l.duration || 5e3), u;
  },
  removeNotification: (l) => t((u) => ({
    notifications: u.notifications.filter((a) => a.id !== l)
  })),
  clearNotifications: () => t({ notifications: [] })
})), RS = pa((t) => ({
  currentPath: typeof window < "u" ? window.location.pathname : "/",
  navigate: (e) => {
    typeof window < "u" && (window.history.pushState({}, "", e), t({ currentPath: e }), window.dispatchEvent(new PopStateEvent("popstate")));
  }
}));
function DS() {
  const { notifications: t, removeNotification: e } = m0();
  return t.length === 0 ? null : /* @__PURE__ */ jt.createElement("div", { style: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 1e4,
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  } }, t.map((l) => /* @__PURE__ */ jt.createElement(
    "div",
    {
      key: l.id,
      style: {
        background: l.type === "error" ? "#ff6b6b" : l.type === "success" ? "#51cf66" : "#339af0",
        color: "white",
        padding: "12px 16px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        minWidth: "250px",
        maxWidth: "400px",
        cursor: "pointer"
      },
      onClick: () => l.id && e(l.id)
    },
    /* @__PURE__ */ jt.createElement("div", { style: { fontWeight: "bold", marginBottom: "4px" } }, l.title),
    l.message && /* @__PURE__ */ jt.createElement("div", { style: { fontSize: "14px", opacity: 0.9 } }, l.message)
  )));
}
function _S({ children: t, ssrData: e = {} }) {
  const { initializeFromSSR: l } = v0();
  return jt.useEffect(() => {
    (e.user || e.theme || e.language) && l(e);
  }, [e, l]), /* @__PURE__ */ jt.createElement(y0, { ssrQueries: e.queries }, t, /* @__PURE__ */ jt.createElement(DS, null));
}
const CS = v0, HS = m0, NS = {
  LIGHT: "light",
  DARK: "dark",
  AUTO: "auto"
}, qS = {
  KO: "ko",
  EN: "en",
  JA: "ja"
}, xS = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error"
}, bc = {
  // 사용자 정보 조회
  getUser: async (t) => {
    const e = await fetch(`/api/users/${t}`);
    if (!e.ok) throw new Error("Failed to fetch user");
    return e.json();
  },
  // 사용자 목록 조회
  getUsers: async (t = {}) => {
    const e = new URLSearchParams(t), l = await fetch(`/api/users?${e}`);
    if (!l.ok) throw new Error("Failed to fetch users");
    return l.json();
  },
  // 사용자 업데이트
  updateUser: async ({ userId: t, data: e }) => {
    const l = await fetch(`/api/users/${t}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e)
    });
    if (!l.ok) throw new Error("Failed to update user");
    return l.json();
  },
  // 공용 설정 조회
  getSettings: async () => {
    const t = await fetch("/api/settings");
    if (!t.ok) throw new Error("Failed to fetch settings");
    return t.json();
  }
};
function YS(t) {
  return gc({
    queryKey: ["user", t],
    queryFn: () => bc.getUser(t),
    enabled: !!t
  });
}
function BS(t) {
  return gc({
    queryKey: ["users", t],
    queryFn: () => bc.getUsers(t)
  });
}
function GS() {
  return gc({
    queryKey: ["settings"],
    queryFn: bc.getSettings,
    staleTime: 10 * 60 * 1e3
    // 10분
  });
}
function jS() {
  const t = me();
  return c0({
    mutationFn: bc.updateUser,
    onSuccess: () => {
      t.invalidateQueries({ queryKey: ["user"] }), t.invalidateQueries({ queryKey: ["users"] });
    }
  });
}
const wS = () => {
  const { navigate: t, currentPath: e } = RS();
  return {
    navigate: t,
    currentPath: e,
    isActive: (l) => e === l
  };
};
function XS(t, e = "YYYY-MM-DD") {
  const l = new Date(t), u = l.getFullYear().toString(), a = String(l.getMonth() + 1).padStart(2, "0"), n = String(l.getDate()).padStart(2, "0"), i = String(l.getHours()).padStart(2, "0"), c = String(l.getMinutes()).padStart(2, "0"), f = {
    "YYYY-MM-DD": `${u}-${a}-${n}`,
    "YYYY-MM-DD HH:mm": `${u}-${a}-${n} ${i}:${c}`,
    "MM/DD/YYYY": `${a}/${n}/${u}`,
    relative: zS(l)
  };
  return f[e] || f["YYYY-MM-DD"];
}
function zS(t) {
  const l = (/* @__PURE__ */ new Date()).getTime() - t.getTime(), u = Math.floor(l / 1e3), a = Math.floor(u / 60), n = Math.floor(a / 60), i = Math.floor(n / 24);
  return i > 0 ? `${i}일 전` : n > 0 ? `${n}시간 전` : a > 0 ? `${a}분 전` : "방금 전";
}
function ZS(t, e) {
  let l;
  return function(...a) {
    const n = () => {
      clearTimeout(l), t(...a);
    };
    clearTimeout(l), l = setTimeout(n, e);
  };
}
function LS(t, e) {
  let l;
  return function(...u) {
    const a = this;
    l || (t.apply(a, u), l = !0, setTimeout(() => l = !1, e));
  };
}
const KS = {
  get: (t, e = null) => {
    try {
      const l = localStorage.getItem(t);
      return l ? JSON.parse(l) : e;
    } catch {
      return e;
    }
  },
  set: (t, e) => {
    try {
      localStorage.setItem(t, JSON.stringify(e));
    } catch (l) {
      console.warn("Failed to save to localStorage:", l);
    }
  },
  remove: (t) => {
    try {
      localStorage.removeItem(t);
    } catch (e) {
      console.warn("Failed to remove from localStorage:", e);
    }
  }
};
function VS(t = window.location.href) {
  const e = new URL(t);
  return Object.fromEntries(e.searchParams);
}
function JS(t, e = !1) {
  const l = new URL(window.location.href);
  Object.entries(t).forEach(([u, a]) => {
    a == null ? l.searchParams.delete(u) : l.searchParams.set(u, a);
  }), e ? window.history.replaceState({}, "", l.toString()) : window.history.pushState({}, "", l.toString());
}
function $S(...t) {
  return t.filter(Boolean).join(" ");
}
function Sh(t) {
  if (t === null || typeof t != "object") return t;
  if (t instanceof Date) return new Date(t.getTime());
  if (t instanceof Array) return t.map((e) => Sh(e));
  if (typeof t == "object") {
    const e = {};
    return Object.keys(t).forEach((l) => {
      e[l] = Sh(t[l]);
    }), e;
  }
  return t;
}
typeof window < "u" && !window.__MFA_APPS__ && (window.__MFA_APPS__ = /* @__PURE__ */ new Map());
function FS(t, e) {
  let l = null;
  return {
    /**
     * 컴포넌트를 DOM에 마운트
     * @param container - 마운트할 DOM 요소
     */
    mount(u) {
      if (l) {
        console.warn(`${t}는 이미 마운트되어 있습니다.`);
        return;
      }
      l = hc.createRoot(u), l.render(/* @__PURE__ */ jt.createElement(e, null)), window.__MFA_APPS__.set(t, { root: l, Component: e }), e.root = l, console.log(`✅ ${t} 마운트 완료`);
    },
    /**
     * 컴포넌트를 DOM에서 언마운트
     */
    unmount() {
      l && (l.unmount(), l = null, window.__MFA_APPS__.delete(t), e.root = null, console.log(`❌ ${t} 언마운트 완료`));
    }
  };
}
function WS(t, e, l) {
  const u = t.hot;
  u && u.accept((a) => {
    console.log(`🔥 HMR: ${e} 컴포넌트 업데이트 감지`);
    const n = window.__MFA_APPS__.get(e);
    if (!a || !n) {
      console.warn(`HMR 실패: ${e}의 정보를 찾을 수 없습니다.`);
      return;
    }
    const i = a.default || a[l.name];
    if (!i) {
      console.warn("HMR 실패: 새 컴포넌트를 찾을 수 없습니다.");
      return;
    }
    n.root.render(/* @__PURE__ */ jt.createElement(i, null)), i.root = n.root, window.__MFA_APPS__.set(e, { ...n, Component: i }), console.log(`✅ HMR 적용 완료: ${e}`);
  });
}
typeof window < "u" && (window.React = Bh, window.ReactDOM = Xh, window.ReactDOMClient = { createRoot: hc.createRoot }, window.ReactQuery = f0, window.Zustand = { create: pa });
typeof window < "u" && (window.MfaFramework = {
  React: Bh,
  ReactDOM: Xh,
  createRoot: hc.createRoot,
  RoutingProvider: TS,
  MfaGlobalProvider: _S,
  MfaQueryProvider: y0,
  ...f0,
  create: pa
});
const kS = "1.0.0", PS = hc.createRoot;
export {
  zr as CancelledError,
  K1 as HydrationBoundary,
  Qr as InfiniteQueryObserver,
  x1 as IsRestoringProvider,
  qS as LANGUAGES,
  _S as MfaGlobalProvider,
  y0 as MfaQueryProvider,
  xv as Mutation,
  Bv as MutationCache,
  Zv as MutationObserver,
  xS as NOTIFICATION_TYPES,
  Xv as QueriesObserver,
  Hv as Query,
  qv as QueryCache,
  jv as QueryClient,
  Cr as QueryClientContext,
  Wv as QueryClientProvider,
  Y1 as QueryErrorResetBoundary,
  ba as QueryObserver,
  Bh as React,
  Xh as ReactDOM,
  TS as RoutingProvider,
  kS as SHARED_VERSION,
  NS as THEMES,
  bc as api,
  $S as classNames,
  pa as create,
  FS as createMfaApp,
  PS as createRoot,
  C1 as dataTagErrorSymbol,
  Q1 as dataTagSymbol,
  ZS as debounce,
  Sh as deepClone,
  Qv as defaultScheduler,
  Kv as defaultShouldDehydrateMutation,
  Vv as defaultShouldDehydrateQuery,
  z1 as dehydrate,
  WS as enableHMR,
  U1 as experimental_streamedQuery,
  yc as focusManager,
  XS as formatDate,
  AS as getQueryClient,
  VS as getUrlParams,
  Cl as hashKey,
  As as hydrate,
  L1 as infiniteQueryOptions,
  MS as initializeQueryClient,
  yi as isCancelledError,
  Ql as isServer,
  d1 as keepPreviousData,
  as as matchMutation,
  us as matchQuery,
  $1 as mutationOptions,
  dt as noop,
  P as notifyManager,
  rn as onlineManager,
  ra as partialMatchKey,
  Z1 as queryOptions,
  Nn as replaceEqualDeep,
  _r as shouldThrowError,
  dc as skipToken,
  KS as storage,
  LS as throttle,
  H1 as unsetMarker,
  JS as updateUrlParams,
  QS as useEventStore,
  HS as useGlobalNotification,
  CS as useGlobalUser,
  F1 as useInfiniteQuery,
  V1 as useIsFetching,
  J1 as useIsMutating,
  Hr as useIsRestoring,
  c0 as useMutation,
  i0 as useMutationState,
  m0 as useNotificationStore,
  X1 as usePrefetchInfiniteQuery,
  w1 as usePrefetchQuery,
  n0 as useQueries,
  gc as useQuery,
  me as useQueryClient,
  Nr as useQueryErrorResetBoundary,
  wS as useRouting,
  RS as useRoutingStore,
  GS as useSettings,
  G1 as useSuspenseInfiniteQuery,
  j1 as useSuspenseQueries,
  B1 as useSuspenseQuery,
  jS as useUpdateUser,
  YS as useUser,
  v0 as useUserStore,
  BS as useUsers
};
