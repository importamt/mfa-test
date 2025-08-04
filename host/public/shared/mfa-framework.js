var Br = (t) => {
  throw TypeError(t);
};
var pc = (t, e, l) => e.has(t) || Br("Cannot " + l);
var r = (t, e, l) => (pc(t, e, "read from private field"), l ? l.call(t) : e.get(t)), D = (t, e, l) => e.has(t) ? Br("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, l), A = (t, e, l, u) => (pc(t, e, "write to private field"), u ? u.call(t, l) : e.set(t, l), l), Q = (t, e, l) => (pc(t, e, "access private method"), l);
var Yn = (t, e, l, u) => ({
  set _(a) {
    A(t, e, a, l);
  },
  get _() {
    return r(t, e, u);
  }
});
function As(t, e) {
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
function Fi(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Uh = { exports: {} }, N = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ms = Symbol.for("react.transitional.element"), y0 = Symbol.for("react.portal"), v0 = Symbol.for("react.fragment"), m0 = Symbol.for("react.strict_mode"), g0 = Symbol.for("react.profiler"), b0 = Symbol.for("react.consumer"), S0 = Symbol.for("react.context"), p0 = Symbol.for("react.forward_ref"), E0 = Symbol.for("react.suspense"), O0 = Symbol.for("react.memo"), Qh = Symbol.for("react.lazy"), Yr = Symbol.iterator;
function T0(t) {
  return t === null || typeof t != "object" ? null : (t = Yr && t[Yr] || t["@@iterator"], typeof t == "function" ? t : null);
}
var Ch = {
  isMounted: function() {
    return !1;
  },
  enqueueForceUpdate: function() {
  },
  enqueueReplaceState: function() {
  },
  enqueueSetState: function() {
  }
}, Hh = Object.assign, qh = {};
function ha(t, e, l) {
  this.props = t, this.context = e, this.refs = qh, this.updater = l || Ch;
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
function Nh() {
}
Nh.prototype = ha.prototype;
function Rs(t, e, l) {
  this.props = t, this.context = e, this.refs = qh, this.updater = l || Ch;
}
var _s = Rs.prototype = new Nh();
_s.constructor = Rs;
Hh(_s, ha.prototype);
_s.isPureReactComponent = !0;
var jr = Array.isArray, et = { H: null, A: null, T: null, S: null, V: null }, xh = Object.prototype.hasOwnProperty;
function Ds(t, e, l, u, a, n) {
  return l = n.ref, {
    $$typeof: Ms,
    type: t,
    key: e,
    ref: l !== void 0 ? l : null,
    props: n
  };
}
function A0(t, e) {
  return Ds(
    t.type,
    e,
    void 0,
    void 0,
    void 0,
    t.props
  );
}
function zs(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Ms;
}
function M0(t) {
  var e = { "=": "=0", ":": "=2" };
  return "$" + t.replace(/[=:]/g, function(l) {
    return e[l];
  });
}
var Gr = /\/+/g;
function Ec(t, e) {
  return typeof t == "object" && t !== null && t.key != null ? M0("" + t.key) : e.toString(36);
}
function Xr() {
}
function R0(t) {
  switch (t.status) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw t.reason;
    default:
      switch (typeof t.status == "string" ? t.then(Xr, Xr) : (t.status = "pending", t.then(
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
          case Ms:
          case y0:
            i = !0;
            break;
          case Qh:
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
    return a = a(t), i = u === "" ? "." + Ec(t, 0) : u, jr(a) ? (l = "", i != null && (l = i.replace(Gr, "$&/") + "/"), yu(a, e, l, "", function(o) {
      return o;
    })) : a != null && (zs(a) && (a = A0(
      a,
      l + (a.key == null || t && t.key === a.key ? "" : ("" + a.key).replace(
        Gr,
        "$&/"
      ) + "/") + i
    )), e.push(a)), 1;
  i = 0;
  var c = u === "" ? "." : u + ":";
  if (jr(t))
    for (var f = 0; f < t.length; f++)
      u = t[f], n = c + Ec(u, f), i += yu(
        u,
        e,
        l,
        n,
        a
      );
  else if (f = T0(t), typeof f == "function")
    for (t = f.call(t), f = 0; !(u = t.next()).done; )
      u = u.value, n = c + Ec(u, f++), i += yu(
        u,
        e,
        l,
        n,
        a
      );
  else if (n === "object") {
    if (typeof t.then == "function")
      return yu(
        R0(t),
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
function jn(t, e, l) {
  if (t == null) return t;
  var u = [], a = 0;
  return yu(t, u, "", "", function(n) {
    return e.call(l, n, a++);
  }), u;
}
function _0(t) {
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
var Zr = typeof reportError == "function" ? reportError : function(t) {
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
function D0() {
}
N.Children = {
  map: jn,
  forEach: function(t, e, l) {
    jn(
      t,
      function() {
        e.apply(this, arguments);
      },
      l
    );
  },
  count: function(t) {
    var e = 0;
    return jn(t, function() {
      e++;
    }), e;
  },
  toArray: function(t) {
    return jn(t, function(e) {
      return e;
    }) || [];
  },
  only: function(t) {
    if (!zs(t))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return t;
  }
};
N.Component = ha;
N.Fragment = v0;
N.Profiler = g0;
N.PureComponent = Rs;
N.StrictMode = m0;
N.Suspense = E0;
N.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = et;
N.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function(t) {
    return et.H.useMemoCache(t);
  }
};
N.cache = function(t) {
  return function() {
    return t.apply(null, arguments);
  };
};
N.cloneElement = function(t, e, l) {
  if (t == null)
    throw Error(
      "The argument must be a React element, but you passed " + t + "."
    );
  var u = Hh({}, t.props), a = t.key, n = void 0;
  if (e != null)
    for (i in e.ref !== void 0 && (n = void 0), e.key !== void 0 && (a = "" + e.key), e)
      !xh.call(e, i) || i === "key" || i === "__self" || i === "__source" || i === "ref" && e.ref === void 0 || (u[i] = e[i]);
  var i = arguments.length - 2;
  if (i === 1) u.children = l;
  else if (1 < i) {
    for (var c = Array(i), f = 0; f < i; f++)
      c[f] = arguments[f + 2];
    u.children = c;
  }
  return Ds(t.type, a, void 0, void 0, n, u);
};
N.createContext = function(t) {
  return t = {
    $$typeof: S0,
    _currentValue: t,
    _currentValue2: t,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  }, t.Provider = t, t.Consumer = {
    $$typeof: b0,
    _context: t
  }, t;
};
N.createElement = function(t, e, l) {
  var u, a = {}, n = null;
  if (e != null)
    for (u in e.key !== void 0 && (n = "" + e.key), e)
      xh.call(e, u) && u !== "key" && u !== "__self" && u !== "__source" && (a[u] = e[u]);
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
  return Ds(t, n, void 0, void 0, null, a);
};
N.createRef = function() {
  return { current: null };
};
N.forwardRef = function(t) {
  return { $$typeof: p0, render: t };
};
N.isValidElement = zs;
N.lazy = function(t) {
  return {
    $$typeof: Qh,
    _payload: { _status: -1, _result: t },
    _init: _0
  };
};
N.memo = function(t, e) {
  return {
    $$typeof: O0,
    type: t,
    compare: e === void 0 ? null : e
  };
};
N.startTransition = function(t) {
  var e = et.T, l = {};
  et.T = l;
  try {
    var u = t(), a = et.S;
    a !== null && a(l, u), typeof u == "object" && u !== null && typeof u.then == "function" && u.then(D0, Zr);
  } catch (n) {
    Zr(n);
  } finally {
    et.T = e;
  }
};
N.unstable_useCacheRefresh = function() {
  return et.H.useCacheRefresh();
};
N.use = function(t) {
  return et.H.use(t);
};
N.useActionState = function(t, e, l) {
  return et.H.useActionState(t, e, l);
};
N.useCallback = function(t, e) {
  return et.H.useCallback(t, e);
};
N.useContext = function(t) {
  return et.H.useContext(t);
};
N.useDebugValue = function() {
};
N.useDeferredValue = function(t, e) {
  return et.H.useDeferredValue(t, e);
};
N.useEffect = function(t, e, l) {
  var u = et.H;
  if (typeof l == "function")
    throw Error(
      "useEffect CRUD overload is not enabled in this build of React."
    );
  return u.useEffect(t, e);
};
N.useId = function() {
  return et.H.useId();
};
N.useImperativeHandle = function(t, e, l) {
  return et.H.useImperativeHandle(t, e, l);
};
N.useInsertionEffect = function(t, e) {
  return et.H.useInsertionEffect(t, e);
};
N.useLayoutEffect = function(t, e) {
  return et.H.useLayoutEffect(t, e);
};
N.useMemo = function(t, e) {
  return et.H.useMemo(t, e);
};
N.useOptimistic = function(t, e) {
  return et.H.useOptimistic(t, e);
};
N.useReducer = function(t, e, l) {
  return et.H.useReducer(t, e, l);
};
N.useRef = function(t) {
  return et.H.useRef(t);
};
N.useState = function(t) {
  return et.H.useState(t);
};
N.useSyncExternalStore = function(t, e, l) {
  return et.H.useSyncExternalStore(
    t,
    e,
    l
  );
};
N.useTransition = function() {
  return et.H.useTransition();
};
N.version = "19.1.1";
Uh.exports = N;
var H = Uh.exports;
const Us = /* @__PURE__ */ Fi(H), z0 = /* @__PURE__ */ As({
  __proto__: null,
  default: Us
}, [H]);
var Bh = { exports: {} }, qt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var U0 = H;
function Yh(t) {
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
      throw Error(Yh(522));
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
}, Q0 = Symbol.for("react.portal");
function C0(t, e, l) {
  var u = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Q0,
    key: u == null ? null : "" + u,
    children: t,
    containerInfo: e,
    implementation: l
  };
}
var qa = U0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function Wi(t, e) {
  if (t === "font") return "";
  if (typeof e == "string")
    return e === "use-credentials" ? e : "";
}
qt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Ht;
qt.createPortal = function(t, e) {
  var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
    throw Error(Yh(299));
  return C0(t, e, null, l);
};
qt.flushSync = function(t) {
  var e = qa.T, l = Ht.p;
  try {
    if (qa.T = null, Ht.p = 2, t) return t();
  } finally {
    qa.T = e, Ht.p = l, Ht.d.f();
  }
};
qt.preconnect = function(t, e) {
  typeof t == "string" && (e ? (e = e.crossOrigin, e = typeof e == "string" ? e === "use-credentials" ? e : "" : void 0) : e = null, Ht.d.C(t, e));
};
qt.prefetchDNS = function(t) {
  typeof t == "string" && Ht.d.D(t);
};
qt.preinit = function(t, e) {
  if (typeof t == "string" && e && typeof e.as == "string") {
    var l = e.as, u = Wi(l, e.crossOrigin), a = typeof e.integrity == "string" ? e.integrity : void 0, n = typeof e.fetchPriority == "string" ? e.fetchPriority : void 0;
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
qt.preinitModule = function(t, e) {
  if (typeof t == "string")
    if (typeof e == "object" && e !== null) {
      if (e.as == null || e.as === "script") {
        var l = Wi(
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
qt.preload = function(t, e) {
  if (typeof t == "string" && typeof e == "object" && e !== null && typeof e.as == "string") {
    var l = e.as, u = Wi(l, e.crossOrigin);
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
qt.preloadModule = function(t, e) {
  if (typeof t == "string")
    if (e) {
      var l = Wi(e.as, e.crossOrigin);
      Ht.d.m(t, {
        as: typeof e.as == "string" && e.as !== "script" ? e.as : void 0,
        crossOrigin: l,
        integrity: typeof e.integrity == "string" ? e.integrity : void 0
      });
    } else Ht.d.m(t);
};
qt.requestFormReset = function(t) {
  Ht.d.r(t);
};
qt.unstable_batchedUpdates = function(t, e) {
  return t(e);
};
qt.useFormState = function(t, e, l) {
  return qa.H.useFormState(t, e, l);
};
qt.useFormStatus = function() {
  return qa.H.useHostTransitionStatus();
};
qt.version = "19.1.1";
function jh() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(jh);
    } catch (t) {
      console.error(t);
    }
}
jh(), Bh.exports = qt;
var Qs = Bh.exports;
const Gh = /* @__PURE__ */ Fi(Qs), H0 = /* @__PURE__ */ As({
  __proto__: null,
  default: Gh
}, [Qs]);
var Xh = { exports: {} }, ki = {}, Zh = { exports: {} }, wh = {};
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
  function e(_, Y) {
    var B = _.length;
    _.push(Y);
    t: for (; 0 < B; ) {
      var ct = B - 1 >>> 1, gt = _[ct];
      if (0 < a(gt, Y))
        _[ct] = Y, _[B] = gt, B = ct;
      else break t;
    }
  }
  function l(_) {
    return _.length === 0 ? null : _[0];
  }
  function u(_) {
    if (_.length === 0) return null;
    var Y = _[0], B = _.pop();
    if (B !== Y) {
      _[0] = B;
      t: for (var ct = 0, gt = _.length, Nn = gt >>> 1; ct < Nn; ) {
        var xn = 2 * (ct + 1) - 1, Sc = _[xn], xl = xn + 1, Bn = _[xl];
        if (0 > a(Sc, B))
          xl < gt && 0 > a(Bn, Sc) ? (_[ct] = Bn, _[xl] = B, ct = xl) : (_[ct] = Sc, _[xn] = B, ct = xn);
        else if (xl < gt && 0 > a(Bn, B))
          _[ct] = Bn, _[xl] = B, ct = xl;
        else break t;
      }
    }
    return Y;
  }
  function a(_, Y) {
    var B = _.sortIndex - Y.sortIndex;
    return B !== 0 ? B : _.id - Y.id;
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
  var f = [], o = [], g = 1, v = null, s = 3, y = !1, E = !1, S = !1, O = !1, d = typeof setTimeout == "function" ? setTimeout : null, h = typeof clearTimeout == "function" ? clearTimeout : null, m = typeof setImmediate < "u" ? setImmediate : null;
  function b(_) {
    for (var Y = l(o); Y !== null; ) {
      if (Y.callback === null) u(o);
      else if (Y.startTime <= _)
        u(o), Y.sortIndex = Y.expirationTime, e(f, Y);
      else break;
      Y = l(o);
    }
  }
  function T(_) {
    if (S = !1, b(_), !E)
      if (l(f) !== null)
        E = !0, z || (z = !0, zt());
      else {
        var Y = l(o);
        Y !== null && bc(T, Y.startTime - _);
      }
  }
  var z = !1, M = -1, R = 5, q = -1;
  function U() {
    return O ? !0 : !(t.unstable_now() - q < R);
  }
  function rt() {
    if (O = !1, z) {
      var _ = t.unstable_now();
      q = _;
      var Y = !0;
      try {
        t: {
          E = !1, S && (S = !1, h(M), M = -1), y = !0;
          var B = s;
          try {
            e: {
              for (b(_), v = l(f); v !== null && !(v.expirationTime > _ && U()); ) {
                var ct = v.callback;
                if (typeof ct == "function") {
                  v.callback = null, s = v.priorityLevel;
                  var gt = ct(
                    v.expirationTime <= _
                  );
                  if (_ = t.unstable_now(), typeof gt == "function") {
                    v.callback = gt, b(_), Y = !0;
                    break e;
                  }
                  v === l(f) && u(f), b(_);
                } else u(f);
                v = l(f);
              }
              if (v !== null) Y = !0;
              else {
                var Nn = l(o);
                Nn !== null && bc(
                  T,
                  Nn.startTime - _
                ), Y = !1;
              }
            }
            break t;
          } finally {
            v = null, s = B, y = !1;
          }
          Y = void 0;
        }
      } finally {
        Y ? zt() : z = !1;
      }
    }
  }
  var zt;
  if (typeof m == "function")
    zt = function() {
      m(rt);
    };
  else if (typeof MessageChannel < "u") {
    var Nl = new MessageChannel(), d0 = Nl.port2;
    Nl.port1.onmessage = rt, zt = function() {
      d0.postMessage(null);
    };
  } else
    zt = function() {
      d(rt, 0);
    };
  function bc(_, Y) {
    M = d(function() {
      _(t.unstable_now());
    }, Y);
  }
  t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(_) {
    _.callback = null;
  }, t.unstable_forceFrameRate = function(_) {
    0 > _ || 125 < _ ? console.error(
      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
    ) : R = 0 < _ ? Math.floor(1e3 / _) : 5;
  }, t.unstable_getCurrentPriorityLevel = function() {
    return s;
  }, t.unstable_next = function(_) {
    switch (s) {
      case 1:
      case 2:
      case 3:
        var Y = 3;
        break;
      default:
        Y = s;
    }
    var B = s;
    s = Y;
    try {
      return _();
    } finally {
      s = B;
    }
  }, t.unstable_requestPaint = function() {
    O = !0;
  }, t.unstable_runWithPriority = function(_, Y) {
    switch (_) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        _ = 3;
    }
    var B = s;
    s = _;
    try {
      return Y();
    } finally {
      s = B;
    }
  }, t.unstable_scheduleCallback = function(_, Y, B) {
    var ct = t.unstable_now();
    switch (typeof B == "object" && B !== null ? (B = B.delay, B = typeof B == "number" && 0 < B ? ct + B : ct) : B = ct, _) {
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
    return gt = B + gt, _ = {
      id: g++,
      callback: Y,
      priorityLevel: _,
      startTime: B,
      expirationTime: gt,
      sortIndex: -1
    }, B > ct ? (_.sortIndex = B, e(o, _), l(f) === null && _ === l(o) && (S ? (h(M), M = -1) : S = !0, bc(T, B - ct))) : (_.sortIndex = gt, e(f, _), E || y || (E = !0, z || (z = !0, zt()))), _;
  }, t.unstable_shouldYield = U, t.unstable_wrapCallback = function(_) {
    var Y = s;
    return function() {
      var B = s;
      s = Y;
      try {
        return _.apply(this, arguments);
      } finally {
        s = B;
      }
    };
  };
})(wh);
Zh.exports = wh;
var q0 = Zh.exports;
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mt = q0, Lh = H, N0 = Qs;
function p(t) {
  var e = "https://react.dev/errors/" + t;
  if (1 < arguments.length) {
    e += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var l = 2; l < arguments.length; l++)
      e += "&args[]=" + encodeURIComponent(arguments[l]);
  }
  return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function Vh(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
}
function bn(t) {
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
function Kh(t) {
  if (t.tag === 13) {
    var e = t.memoizedState;
    if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
  }
  return null;
}
function wr(t) {
  if (bn(t) !== t)
    throw Error(p(188));
}
function x0(t) {
  var e = t.alternate;
  if (!e) {
    if (e = bn(t), e === null) throw Error(p(188));
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
        if (n === l) return wr(a), t;
        if (n === u) return wr(a), e;
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
function Jh(t) {
  var e = t.tag;
  if (e === 5 || e === 26 || e === 27 || e === 6) return t;
  for (t = t.child; t !== null; ) {
    if (e = Jh(t), e !== null) return e;
    t = t.sibling;
  }
  return null;
}
var I = Object.assign, B0 = Symbol.for("react.element"), Gn = Symbol.for("react.transitional.element"), za = Symbol.for("react.portal"), bu = Symbol.for("react.fragment"), $h = Symbol.for("react.strict_mode"), af = Symbol.for("react.profiler"), Y0 = Symbol.for("react.provider"), Fh = Symbol.for("react.consumer"), Ne = Symbol.for("react.context"), Cs = Symbol.for("react.forward_ref"), nf = Symbol.for("react.suspense"), cf = Symbol.for("react.suspense_list"), Hs = Symbol.for("react.memo"), Pe = Symbol.for("react.lazy"), ff = Symbol.for("react.activity"), j0 = Symbol.for("react.memo_cache_sentinel"), Lr = Symbol.iterator;
function Ea(t) {
  return t === null || typeof t != "object" ? null : (t = Lr && t[Lr] || t["@@iterator"], typeof t == "function" ? t : null);
}
var G0 = Symbol.for("react.client.reference");
function sf(t) {
  if (t == null) return null;
  if (typeof t == "function")
    return t.$$typeof === G0 ? null : t.displayName || t.name || null;
  if (typeof t == "string") return t;
  switch (t) {
    case bu:
      return "Fragment";
    case af:
      return "Profiler";
    case $h:
      return "StrictMode";
    case nf:
      return "Suspense";
    case cf:
      return "SuspenseList";
    case ff:
      return "Activity";
  }
  if (typeof t == "object")
    switch (t.$$typeof) {
      case za:
        return "Portal";
      case Ne:
        return (t.displayName || "Context") + ".Provider";
      case Fh:
        return (t._context.displayName || "Context") + ".Consumer";
      case Cs:
        var e = t.render;
        return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
      case Hs:
        return e = t.displayName || null, e !== null ? e : sf(t.type) || "Memo";
      case Pe:
        e = t._payload, t = t._init;
        try {
          return sf(t(e));
        } catch {
        }
    }
  return null;
}
var Ua = Array.isArray, C = Lh.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = N0.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Wl = {
  pending: !1,
  data: null,
  method: null,
  action: null
}, rf = [], Su = -1;
function Me(t) {
  return { current: t };
}
function Et(t) {
  0 > Su || (t.current = rf[Su], rf[Su] = null, Su--);
}
function lt(t, e) {
  Su++, rf[Su] = t.current, t.current = e;
}
var Oe = Me(null), Fa = Me(null), Sl = Me(null), mi = Me(null);
function gi(t, e) {
  switch (lt(Sl, e), lt(Fa, t), lt(Oe, null), e.nodeType) {
    case 9:
    case 11:
      t = (t = e.documentElement) && (t = t.namespaceURI) ? Wo(t) : 0;
      break;
    default:
      if (t = e.tagName, e = e.namespaceURI)
        e = Wo(e), t = hv(e, t);
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
  Et(Oe), lt(Oe, t);
}
function Iu() {
  Et(Oe), Et(Fa), Et(Sl);
}
function of(t) {
  t.memoizedState !== null && lt(mi, t);
  var e = Oe.current, l = hv(e, t.type);
  e !== l && (lt(Fa, t), lt(Oe, l));
}
function bi(t) {
  Fa.current === t && (Et(Oe), Et(Fa)), mi.current === t && (Et(mi), nn._currentValue = Wl);
}
var hf = Object.prototype.hasOwnProperty, qs = mt.unstable_scheduleCallback, Oc = mt.unstable_cancelCallback, X0 = mt.unstable_shouldYield, Z0 = mt.unstable_requestPaint, Te = mt.unstable_now, w0 = mt.unstable_getCurrentPriorityLevel, Wh = mt.unstable_ImmediatePriority, kh = mt.unstable_UserBlockingPriority, Si = mt.unstable_NormalPriority, L0 = mt.unstable_LowPriority, Ph = mt.unstable_IdlePriority, V0 = mt.log, K0 = mt.unstable_setDisableYieldValue, Sn = null, Kt = null;
function vl(t) {
  if (typeof V0 == "function" && K0(t), Kt && typeof Kt.setStrictMode == "function")
    try {
      Kt.setStrictMode(Sn, t);
    } catch {
    }
}
var Jt = Math.clz32 ? Math.clz32 : F0, J0 = Math.log, $0 = Math.LN2;
function F0(t) {
  return t >>>= 0, t === 0 ? 32 : 31 - (J0(t) / $0 | 0) | 0;
}
var Xn = 256, Zn = 4194304;
function Yl(t) {
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
function Pi(t, e, l) {
  var u = t.pendingLanes;
  if (u === 0) return 0;
  var a = 0, n = t.suspendedLanes, i = t.pingedLanes;
  t = t.warmLanes;
  var c = u & 134217727;
  return c !== 0 ? (u = c & ~n, u !== 0 ? a = Yl(u) : (i &= c, i !== 0 ? a = Yl(i) : l || (l = c & ~t, l !== 0 && (a = Yl(l))))) : (c = u & ~n, c !== 0 ? a = Yl(c) : i !== 0 ? a = Yl(i) : l || (l = u & ~t, l !== 0 && (a = Yl(l)))), a === 0 ? 0 : e !== 0 && e !== a && !(e & n) && (n = a & -a, l = e & -e, n >= l || n === 32 && (l & 4194048) !== 0) ? e : a;
}
function pn(t, e) {
  return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
}
function W0(t, e) {
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
function Ih() {
  var t = Xn;
  return Xn <<= 1, !(Xn & 4194048) && (Xn = 256), t;
}
function td() {
  var t = Zn;
  return Zn <<= 1, !(Zn & 62914560) && (Zn = 4194304), t;
}
function Tc(t) {
  for (var e = [], l = 0; 31 > l; l++) e.push(t);
  return e;
}
function En(t, e) {
  t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
}
function k0(t, e, l, u, a, n) {
  var i = t.pendingLanes;
  t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
  var c = t.entanglements, f = t.expirationTimes, o = t.hiddenUpdates;
  for (l = i & ~l; 0 < l; ) {
    var g = 31 - Jt(l), v = 1 << g;
    c[g] = 0, f[g] = -1;
    var s = o[g];
    if (s !== null)
      for (o[g] = null, g = 0; g < s.length; g++) {
        var y = s[g];
        y !== null && (y.lane &= -536870913);
      }
    l &= ~v;
  }
  u !== 0 && ed(t, u, 0), n !== 0 && a === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(i & ~e));
}
function ed(t, e, l) {
  t.pendingLanes |= e, t.suspendedLanes &= ~e;
  var u = 31 - Jt(e);
  t.entangledLanes |= e, t.entanglements[u] = t.entanglements[u] | 1073741824 | l & 4194090;
}
function ld(t, e) {
  var l = t.entangledLanes |= e;
  for (t = t.entanglements; l; ) {
    var u = 31 - Jt(l), a = 1 << u;
    a & e | t[u] & e && (t[u] |= e), l &= ~a;
  }
}
function Ns(t) {
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
function xs(t) {
  return t &= -t, 2 < t ? 8 < t ? t & 134217727 ? 32 : 268435456 : 8 : 2;
}
function ud() {
  var t = L.p;
  return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Ov(t.type));
}
function P0(t, e) {
  var l = L.p;
  try {
    return L.p = t, e();
  } finally {
    L.p = l;
  }
}
var Hl = Math.random().toString(36).slice(2), _t = "__reactFiber$" + Hl, Gt = "__reactProps$" + Hl, da = "__reactContainer$" + Hl, df = "__reactEvents$" + Hl, I0 = "__reactListeners$" + Hl, tm = "__reactHandles$" + Hl, Vr = "__reactResources$" + Hl, On = "__reactMarker$" + Hl;
function Bs(t) {
  delete t[_t], delete t[Gt], delete t[df], delete t[I0], delete t[tm];
}
function pu(t) {
  var e = t[_t];
  if (e) return e;
  for (var l = t.parentNode; l; ) {
    if (e = l[da] || l[_t]) {
      if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
        for (t = Io(t); t !== null; ) {
          if (l = t[_t]) return l;
          t = Io(t);
        }
      return e;
    }
    t = l, l = t.parentNode;
  }
  return null;
}
function ya(t) {
  if (t = t[_t] || t[da]) {
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
  var e = t[Vr];
  return e || (e = t[Vr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
}
function St(t) {
  t[On] = !0;
}
var ad = /* @__PURE__ */ new Set(), nd = {};
function cu(t, e) {
  ta(t, e), ta(t + "Capture", e);
}
function ta(t, e) {
  for (nd[t] = e, t = 0; t < e.length; t++)
    ad.add(e[t]);
}
var em = RegExp(
  "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
), Kr = {}, Jr = {};
function lm(t) {
  return hf.call(Jr, t) ? !0 : hf.call(Kr, t) ? !1 : em.test(t) ? Jr[t] = !0 : (Kr[t] = !0, !1);
}
function ei(t, e, l) {
  if (lm(e))
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
function wn(t, e, l) {
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
function De(t, e, l, u) {
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
var Ac, $r;
function vu(t) {
  if (Ac === void 0)
    try {
      throw Error();
    } catch (l) {
      var e = l.stack.trim().match(/\n( *(at )?)/);
      Ac = e && e[1] || "", $r = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
  return `
` + Ac + t + $r;
}
var Mc = !1;
function Rc(t, e) {
  if (!t || Mc) return "";
  Mc = !0;
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
    Mc = !1, Error.prepareStackTrace = l;
  }
  return (l = t ? t.displayName || t.name : "") ? vu(l) : "";
}
function um(t) {
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
      return Rc(t.type, !1);
    case 11:
      return Rc(t.type.render, !1);
    case 1:
      return Rc(t.type, !0);
    case 31:
      return vu("Activity");
    default:
      return "";
  }
}
function Fr(t) {
  try {
    var e = "";
    do
      e += um(t), t = t.return;
    while (t);
    return e;
  } catch (l) {
    return `
Error generating stack: ` + l.message + `
` + l.stack;
  }
}
function le(t) {
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
function id(t) {
  var e = t.type;
  return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
}
function am(t) {
  var e = id(t) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(
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
  t._valueTracker || (t._valueTracker = am(t));
}
function cd(t) {
  if (!t) return !1;
  var e = t._valueTracker;
  if (!e) return !0;
  var l = e.getValue(), u = "";
  return t && (u = id(t) ? t.checked ? "true" : "false" : t.value), t = u, t !== l ? (e.setValue(t), !0) : !1;
}
function Ei(t) {
  if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
  try {
    return t.activeElement || t.body;
  } catch {
    return t.body;
  }
}
var nm = /[\n"\\]/g;
function ne(t) {
  return t.replace(
    nm,
    function(e) {
      return "\\" + e.charCodeAt(0).toString(16) + " ";
    }
  );
}
function yf(t, e, l, u, a, n, i, c) {
  t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), e != null ? i === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + le(e)) : t.value !== "" + le(e) && (t.value = "" + le(e)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), e != null ? vf(t, i, le(e)) : l != null ? vf(t, i, le(l)) : u != null && t.removeAttribute("value"), a == null && n != null && (t.defaultChecked = !!n), a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.name = "" + le(c) : t.removeAttribute("name");
}
function fd(t, e, l, u, a, n, i, c) {
  if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (t.type = n), e != null || l != null) {
    if (!(n !== "submit" && n !== "reset" || e != null))
      return;
    l = l != null ? "" + le(l) : "", e = e != null ? "" + le(e) : l, c || e === t.value || (t.value = e), t.defaultValue = e;
  }
  u = u ?? a, u = typeof u != "function" && typeof u != "symbol" && !!u, t.checked = c ? t.checked : !!u, t.defaultChecked = !!u, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i);
}
function vf(t, e, l) {
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
    for (l = "" + le(l), e = null, a = 0; a < t.length; a++) {
      if (t[a].value === l) {
        t[a].selected = !0, u && (t[a].defaultSelected = !0);
        return;
      }
      e !== null || t[a].disabled || (e = t[a]);
    }
    e !== null && (e.selected = !0);
  }
}
function sd(t, e, l) {
  if (e != null && (e = "" + le(e), e !== t.value && (t.value = e), l == null)) {
    t.defaultValue !== e && (t.defaultValue = e);
    return;
  }
  t.defaultValue = l != null ? "" + le(l) : "";
}
function rd(t, e, l, u) {
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
  l = le(e), t.defaultValue = l, u = t.textContent, u === l && u !== "" && u !== null && (t.value = u);
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
var im = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " "
  )
);
function Wr(t, e, l) {
  var u = e.indexOf("--") === 0;
  l == null || typeof l == "boolean" || l === "" ? u ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : u ? t.setProperty(e, l) : typeof l != "number" || l === 0 || im.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
}
function od(t, e, l) {
  if (e != null && typeof e != "object")
    throw Error(p(62));
  if (t = t.style, l != null) {
    for (var u in l)
      !l.hasOwnProperty(u) || e != null && e.hasOwnProperty(u) || (u.indexOf("--") === 0 ? t.setProperty(u, "") : u === "float" ? t.cssFloat = "" : t[u] = "");
    for (var a in e)
      u = e[a], e.hasOwnProperty(a) && l[a] !== u && Wr(t, a, u);
  } else
    for (var n in e)
      e.hasOwnProperty(n) && Wr(t, n, e[n]);
}
function Ys(t) {
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
var cm = /* @__PURE__ */ new Map([
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
]), fm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function li(t) {
  return fm.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
}
var mf = null;
function js(t) {
  return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
}
var Eu = null, Cu = null;
function kr(t) {
  var e = ya(t);
  if (e && (t = e.stateNode)) {
    var l = t[Gt] || null;
    t: switch (t = e.stateNode, e.type) {
      case "input":
        if (yf(
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
            'input[name="' + ne(
              "" + e
            ) + '"][type="radio"]'
          ), e = 0; e < l.length; e++) {
            var u = l[e];
            if (u !== t && u.form === t.form) {
              var a = u[Gt] || null;
              if (!a) throw Error(p(90));
              yf(
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
            u = l[e], u.form === t.form && cd(u);
        }
        break t;
      case "textarea":
        sd(t, l.value, l.defaultValue);
        break t;
      case "select":
        e = l.value, e != null && Qu(t, !!l.multiple, e, !1);
    }
  }
}
var _c = !1;
function hd(t, e, l) {
  if (_c) return t(e, l);
  _c = !0;
  try {
    var u = t(e);
    return u;
  } finally {
    if (_c = !1, (Eu !== null || Cu !== null) && (fc(), Eu && (e = Eu, t = Cu, Cu = Eu = null, kr(e), t)))
      for (e = 0; e < t.length; e++) kr(t[e]);
  }
}
function Wa(t, e) {
  var l = t.stateNode;
  if (l === null) return null;
  var u = l[Gt] || null;
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
var we = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), gf = !1;
if (we)
  try {
    var Oa = {};
    Object.defineProperty(Oa, "passive", {
      get: function() {
        gf = !0;
      }
    }), window.addEventListener("test", Oa, Oa), window.removeEventListener("test", Oa, Oa);
  } catch {
    gf = !1;
  }
var ml = null, Gs = null, ui = null;
function dd() {
  if (ui) return ui;
  var t, e = Gs, l = e.length, u, a = "value" in ml ? ml.value : ml.textContent, n = a.length;
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
function Pr() {
  return !1;
}
function Xt(t) {
  function e(l, u, a, n, i) {
    this._reactName = l, this._targetInst = a, this.type = u, this.nativeEvent = n, this.target = i, this.currentTarget = null;
    for (var c in t)
      t.hasOwnProperty(c) && (l = t[c], this[c] = l ? l(n) : n[c]);
    return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Ln : Pr, this.isPropagationStopped = Pr, this;
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
}, Ii = Xt(fu), Tn = I({}, fu, { view: 0, detail: 0 }), sm = Xt(Tn), Dc, zc, Ta, tc = I({}, Tn, {
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
    return "movementX" in t ? t.movementX : (t !== Ta && (Ta && t.type === "mousemove" ? (Dc = t.screenX - Ta.screenX, zc = t.screenY - Ta.screenY) : zc = Dc = 0, Ta = t), Dc);
  },
  movementY: function(t) {
    return "movementY" in t ? t.movementY : zc;
  }
}), Ir = Xt(tc), rm = I({}, tc, { dataTransfer: 0 }), om = Xt(rm), hm = I({}, Tn, { relatedTarget: 0 }), Uc = Xt(hm), dm = I({}, fu, {
  animationName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), ym = Xt(dm), vm = I({}, fu, {
  clipboardData: function(t) {
    return "clipboardData" in t ? t.clipboardData : window.clipboardData;
  }
}), mm = Xt(vm), gm = I({}, fu, { data: 0 }), to = Xt(gm), bm = {
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
}, Sm = {
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
}, pm = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};
function Em(t) {
  var e = this.nativeEvent;
  return e.getModifierState ? e.getModifierState(t) : (t = pm[t]) ? !!e[t] : !1;
}
function Xs() {
  return Em;
}
var Om = I({}, Tn, {
  key: function(t) {
    if (t.key) {
      var e = bm[t.key] || t.key;
      if (e !== "Unidentified") return e;
    }
    return t.type === "keypress" ? (t = ai(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Sm[t.keyCode] || "Unidentified" : "";
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
}), Tm = Xt(Om), Am = I({}, tc, {
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
}), eo = Xt(Am), Mm = I({}, Tn, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: Xs
}), Rm = Xt(Mm), _m = I({}, fu, {
  propertyName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), Dm = Xt(_m), zm = I({}, tc, {
  deltaX: function(t) {
    return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
  },
  deltaY: function(t) {
    return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Um = Xt(zm), Qm = I({}, fu, {
  newState: 0,
  oldState: 0
}), Cm = Xt(Qm), Hm = [9, 13, 27, 32], Zs = we && "CompositionEvent" in window, Na = null;
we && "documentMode" in document && (Na = document.documentMode);
var qm = we && "TextEvent" in window && !Na, yd = we && (!Zs || Na && 8 < Na && 11 >= Na), lo = " ", uo = !1;
function vd(t, e) {
  switch (t) {
    case "keyup":
      return Hm.indexOf(e.keyCode) !== -1;
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
function md(t) {
  return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
}
var Ou = !1;
function Nm(t, e) {
  switch (t) {
    case "compositionend":
      return md(e);
    case "keypress":
      return e.which !== 32 ? null : (uo = !0, lo);
    case "textInput":
      return t = e.data, t === lo && uo ? null : t;
    default:
      return null;
  }
}
function xm(t, e) {
  if (Ou)
    return t === "compositionend" || !Zs && vd(t, e) ? (t = dd(), ui = Gs = ml = null, Ou = !1, t) : null;
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
      return yd && e.locale !== "ko" ? null : e.data;
    default:
      return null;
  }
}
var Bm = {
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
function ao(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e === "input" ? !!Bm[t.type] : e === "textarea";
}
function gd(t, e, l, u) {
  Eu ? Cu ? Cu.push(u) : Cu = [u] : Eu = u, e = ji(e, "onChange"), 0 < e.length && (l = new Ii(
    "onChange",
    "change",
    null,
    l,
    u
  ), t.push({ event: l, listeners: e }));
}
var xa = null, ka = null;
function Ym(t) {
  sv(t, 0);
}
function ec(t) {
  var e = Qa(t);
  if (cd(e)) return t;
}
function no(t, e) {
  if (t === "change") return e;
}
var bd = !1;
if (we) {
  var Qc;
  if (we) {
    var Cc = "oninput" in document;
    if (!Cc) {
      var io = document.createElement("div");
      io.setAttribute("oninput", "return;"), Cc = typeof io.oninput == "function";
    }
    Qc = Cc;
  } else Qc = !1;
  bd = Qc && (!document.documentMode || 9 < document.documentMode);
}
function co() {
  xa && (xa.detachEvent("onpropertychange", Sd), ka = xa = null);
}
function Sd(t) {
  if (t.propertyName === "value" && ec(ka)) {
    var e = [];
    gd(
      e,
      ka,
      t,
      js(t)
    ), hd(Ym, e);
  }
}
function jm(t, e, l) {
  t === "focusin" ? (co(), xa = e, ka = l, xa.attachEvent("onpropertychange", Sd)) : t === "focusout" && co();
}
function Gm(t) {
  if (t === "selectionchange" || t === "keyup" || t === "keydown")
    return ec(ka);
}
function Xm(t, e) {
  if (t === "click") return ec(e);
}
function Zm(t, e) {
  if (t === "input" || t === "change")
    return ec(e);
}
function wm(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var Wt = typeof Object.is == "function" ? Object.is : wm;
function Pa(t, e) {
  if (Wt(t, e)) return !0;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null)
    return !1;
  var l = Object.keys(t), u = Object.keys(e);
  if (l.length !== u.length) return !1;
  for (u = 0; u < l.length; u++) {
    var a = l[u];
    if (!hf.call(e, a) || !Wt(t[a], e[a]))
      return !1;
  }
  return !0;
}
function fo(t) {
  for (; t && t.firstChild; ) t = t.firstChild;
  return t;
}
function so(t, e) {
  var l = fo(t);
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
    l = fo(l);
  }
}
function pd(t, e) {
  return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? pd(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
}
function Ed(t) {
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
function ws(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
}
var Lm = we && "documentMode" in document && 11 >= document.documentMode, Tu = null, bf = null, Ba = null, Sf = !1;
function ro(t, e, l) {
  var u = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
  Sf || Tu == null || Tu !== Ei(u) || (u = Tu, "selectionStart" in u && ws(u) ? u = { start: u.selectionStart, end: u.selectionEnd } : (u = (u.ownerDocument && u.ownerDocument.defaultView || window).getSelection(), u = {
    anchorNode: u.anchorNode,
    anchorOffset: u.anchorOffset,
    focusNode: u.focusNode,
    focusOffset: u.focusOffset
  }), Ba && Pa(Ba, u) || (Ba = u, u = ji(bf, "onSelect"), 0 < u.length && (e = new Ii(
    "onSelect",
    "select",
    null,
    e,
    l
  ), t.push({ event: e, listeners: u }), e.target = Tu)));
}
function Bl(t, e) {
  var l = {};
  return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
}
var Au = {
  animationend: Bl("Animation", "AnimationEnd"),
  animationiteration: Bl("Animation", "AnimationIteration"),
  animationstart: Bl("Animation", "AnimationStart"),
  transitionrun: Bl("Transition", "TransitionRun"),
  transitionstart: Bl("Transition", "TransitionStart"),
  transitioncancel: Bl("Transition", "TransitionCancel"),
  transitionend: Bl("Transition", "TransitionEnd")
}, Hc = {}, Od = {};
we && (Od = document.createElement("div").style, "AnimationEvent" in window || (delete Au.animationend.animation, delete Au.animationiteration.animation, delete Au.animationstart.animation), "TransitionEvent" in window || delete Au.transitionend.transition);
function su(t) {
  if (Hc[t]) return Hc[t];
  if (!Au[t]) return t;
  var e = Au[t], l;
  for (l in e)
    if (e.hasOwnProperty(l) && l in Od)
      return Hc[t] = e[l];
  return t;
}
var Td = su("animationend"), Ad = su("animationiteration"), Md = su("animationstart"), Vm = su("transitionrun"), Km = su("transitionstart"), Jm = su("transitioncancel"), Rd = su("transitionend"), _d = /* @__PURE__ */ new Map(), pf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
  " "
);
pf.push("scrollEnd");
function ve(t, e) {
  _d.set(t, e), cu(e, [t]);
}
var oo = /* @__PURE__ */ new WeakMap();
function ie(t, e) {
  if (typeof t == "object" && t !== null) {
    var l = oo.get(t);
    return l !== void 0 ? l : (e = {
      value: t,
      source: e,
      stack: Fr(e)
    }, oo.set(t, e), e);
  }
  return {
    value: t,
    source: e,
    stack: Fr(e)
  };
}
var te = [], Mu = 0, Ls = 0;
function lc() {
  for (var t = Mu, e = Ls = Mu = 0; e < t; ) {
    var l = te[e];
    te[e++] = null;
    var u = te[e];
    te[e++] = null;
    var a = te[e];
    te[e++] = null;
    var n = te[e];
    if (te[e++] = null, u !== null && a !== null) {
      var i = u.pending;
      i === null ? a.next = a : (a.next = i.next, i.next = a), u.pending = a;
    }
    n !== 0 && Dd(l, a, n);
  }
}
function uc(t, e, l, u) {
  te[Mu++] = t, te[Mu++] = e, te[Mu++] = l, te[Mu++] = u, Ls |= u, t.lanes |= u, t = t.alternate, t !== null && (t.lanes |= u);
}
function Vs(t, e, l, u) {
  return uc(t, e, l, u), Oi(t);
}
function va(t, e) {
  return uc(t, null, null, e), Oi(t);
}
function Dd(t, e, l) {
  t.lanes |= l;
  var u = t.alternate;
  u !== null && (u.lanes |= l);
  for (var a = !1, n = t.return; n !== null; )
    n.childLanes |= l, u = n.alternate, u !== null && (u.childLanes |= l), n.tag === 22 && (t = n.stateNode, t === null || t._visibility & 1 || (a = !0)), t = n, n = n.return;
  return t.tag === 3 ? (n = t.stateNode, a && e !== null && (a = 31 - Jt(l), t = n.hiddenUpdates, u = t[a], u === null ? t[a] = [e] : u.push(e), e.lane = l | 536870912), n) : null;
}
function Oi(t) {
  if (50 < Ja)
    throw Ja = 0, Xf = null, Error(p(185));
  for (var e = t.return; e !== null; )
    t = e, e = t.return;
  return t.tag === 3 ? t.stateNode : null;
}
var Ru = {};
function $m(t, e, l, u) {
  this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = u, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Vt(t, e, l, u) {
  return new $m(t, e, l, u);
}
function Ks(t) {
  return t = t.prototype, !(!t || !t.isReactComponent);
}
function Ge(t, e) {
  var l = t.alternate;
  return l === null ? (l = Vt(
    t.tag,
    e,
    t.key,
    t.mode
  ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 65011712, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
}
function zd(t, e) {
  t.flags &= 65011714;
  var l = t.alternate;
  return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
    lanes: e.lanes,
    firstContext: e.firstContext
  }), t;
}
function ni(t, e, l, u, a, n) {
  var i = 0;
  if (u = t, typeof t == "function") Ks(t) && (i = 1);
  else if (typeof t == "string")
    i = Wg(
      t,
      l,
      Oe.current
    ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
  else
    t: switch (t) {
      case ff:
        return t = Vt(31, l, e, a), t.elementType = ff, t.lanes = n, t;
      case bu:
        return kl(l.children, a, n, e);
      case $h:
        i = 8, a |= 24;
        break;
      case af:
        return t = Vt(12, l, e, a | 2), t.elementType = af, t.lanes = n, t;
      case nf:
        return t = Vt(13, l, e, a), t.elementType = nf, t.lanes = n, t;
      case cf:
        return t = Vt(19, l, e, a), t.elementType = cf, t.lanes = n, t;
      default:
        if (typeof t == "object" && t !== null)
          switch (t.$$typeof) {
            case Y0:
            case Ne:
              i = 10;
              break t;
            case Fh:
              i = 9;
              break t;
            case Cs:
              i = 11;
              break t;
            case Hs:
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
function qc(t, e, l) {
  return t = Vt(6, t, null, e), t.lanes = l, t;
}
function Nc(t, e, l) {
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
var _u = [], Du = 0, Ti = null, Ai = 0, ue = [], ae = 0, Pl = null, xe = 1, Be = "";
function jl(t, e) {
  _u[Du++] = Ai, _u[Du++] = Ti, Ti = t, Ai = e;
}
function Ud(t, e, l) {
  ue[ae++] = xe, ue[ae++] = Be, ue[ae++] = Pl, Pl = t;
  var u = xe;
  t = Be;
  var a = 32 - Jt(u) - 1;
  u &= ~(1 << a), l += 1;
  var n = 32 - Jt(e) + a;
  if (30 < n) {
    var i = a - a % 5;
    n = (u & (1 << i) - 1).toString(32), u >>= i, a -= i, xe = 1 << 32 - Jt(e) + a | l << a | u, Be = n + t;
  } else
    xe = 1 << n | l << a | u, Be = t;
}
function Js(t) {
  t.return !== null && (jl(t, 1), Ud(t, 1, 0));
}
function $s(t) {
  for (; t === Ti; )
    Ti = _u[--Du], _u[Du] = null, Ai = _u[--Du], _u[Du] = null;
  for (; t === Pl; )
    Pl = ue[--ae], ue[ae] = null, Be = ue[--ae], ue[ae] = null, xe = ue[--ae], ue[ae] = null;
}
var Ct = null, nt = null, w = !1, Il = null, pe = !1, Ef = Error(p(519));
function uu(t) {
  var e = Error(p(418, ""));
  throw Ia(ie(e, t)), Ef;
}
function ho(t) {
  var e = t.stateNode, l = t.type, u = t.memoizedProps;
  switch (e[_t] = t, e[Gt] = u, l) {
    case "dialog":
      j("cancel", e), j("close", e);
      break;
    case "iframe":
    case "object":
    case "embed":
      j("load", e);
      break;
    case "video":
    case "audio":
      for (l = 0; l < ln.length; l++)
        j(ln[l], e);
      break;
    case "source":
      j("error", e);
      break;
    case "img":
    case "image":
    case "link":
      j("error", e), j("load", e);
      break;
    case "details":
      j("toggle", e);
      break;
    case "input":
      j("invalid", e), fd(
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
      j("invalid", e);
      break;
    case "textarea":
      j("invalid", e), rd(e, u.value, u.defaultValue, u.children), pi(e);
  }
  l = u.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || u.suppressHydrationWarning === !0 || ov(e.textContent, l) ? (u.popover != null && (j("beforetoggle", e), j("toggle", e)), u.onScroll != null && j("scroll", e), u.onScrollEnd != null && j("scrollend", e), u.onClick != null && (e.onclick = oc), e = !0) : e = !1, e || uu(t);
}
function yo(t) {
  for (Ct = t.return; Ct; )
    switch (Ct.tag) {
      case 5:
      case 13:
        pe = !1;
        return;
      case 27:
      case 3:
        pe = !0;
        return;
      default:
        Ct = Ct.return;
    }
}
function Aa(t) {
  if (t !== Ct) return !1;
  if (!w) return yo(t), w = !0, !1;
  var e = t.tag, l;
  if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Jf(t.type, t.memoizedProps)), l = !l), l && nt && uu(t), yo(t), e === 13) {
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
    e === 27 ? (e = nt, ql(t.type) ? (t = Wf, Wf = null, nt = t) : nt = e) : nt = Ct ? ye(t.stateNode.nextSibling) : null;
  return !0;
}
function An() {
  nt = Ct = null, w = !1;
}
function vo() {
  var t = Il;
  return t !== null && (jt === null ? jt = t : jt.push.apply(
    jt,
    t
  ), Il = null), t;
}
function Ia(t) {
  Il === null ? Il = [t] : Il.push(t);
}
var Of = Me(null), ru = null, Ye = null;
function tl(t, e, l) {
  lt(Of, e._currentValue), e._currentValue = l;
}
function Xe(t) {
  t._currentValue = Of.current, Et(Of);
}
function Tf(t, e, l) {
  for (; t !== null; ) {
    var u = t.alternate;
    if ((t.childLanes & e) !== e ? (t.childLanes |= e, u !== null && (u.childLanes |= e)) : u !== null && (u.childLanes & e) !== e && (u.childLanes |= e), t === l) break;
    t = t.return;
  }
}
function Af(t, e, l, u) {
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
            n.lanes |= l, c = n.alternate, c !== null && (c.lanes |= l), Tf(
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
      i.lanes |= l, n = i.alternate, n !== null && (n.lanes |= l), Tf(i, l, t), i = null;
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
        Wt(a.pendingProps.value, i.value) || (t !== null ? t.push(c) : t = [c]);
      }
    } else if (a === mi.current) {
      if (i = a.alternate, i === null) throw Error(p(387));
      i.memoizedState.memoizedState !== a.memoizedState.memoizedState && (t !== null ? t.push(nn) : t = [nn]);
    }
    a = a.return;
  }
  t !== null && Af(
    e,
    t,
    l,
    u
  ), e.flags |= 262144;
}
function Mi(t) {
  for (t = t.firstContext; t !== null; ) {
    if (!Wt(
      t.context._currentValue,
      t.memoizedValue
    ))
      return !0;
    t = t.next;
  }
  return !1;
}
function au(t) {
  ru = t, Ye = null, t = t.dependencies, t !== null && (t.firstContext = null);
}
function Dt(t) {
  return Qd(ru, t);
}
function Vn(t, e) {
  return ru === null && au(t), Qd(t, e);
}
function Qd(t, e) {
  var l = e._currentValue;
  if (e = { context: e, memoizedValue: l, next: null }, Ye === null) {
    if (t === null) throw Error(p(308));
    Ye = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
  } else Ye = Ye.next = e;
  return l;
}
var Fm = typeof AbortController < "u" ? AbortController : function() {
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
}, Wm = mt.unstable_scheduleCallback, km = mt.unstable_NormalPriority, yt = {
  $$typeof: Ne,
  Consumer: null,
  Provider: null,
  _currentValue: null,
  _currentValue2: null,
  _threadCount: 0
};
function Fs() {
  return {
    controller: new Fm(),
    data: /* @__PURE__ */ new Map(),
    refCount: 0
  };
}
function Rn(t) {
  t.refCount--, t.refCount === 0 && Wm(km, function() {
    t.controller.abort();
  });
}
var Ya = null, Mf = 0, la = 0, Hu = null;
function Pm(t, e) {
  if (Ya === null) {
    var l = Ya = [];
    Mf = 0, la = br(), Hu = {
      status: "pending",
      value: void 0,
      then: function(u) {
        l.push(u);
      }
    };
  }
  return Mf++, e.then(mo, mo), e;
}
function mo() {
  if (--Mf === 0 && Ya !== null) {
    Hu !== null && (Hu.status = "fulfilled");
    var t = Ya;
    Ya = null, la = 0, Hu = null;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
}
function Im(t, e) {
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
var go = C.S;
C.S = function(t, e) {
  typeof e == "object" && e !== null && typeof e.then == "function" && Pm(t, e), go !== null && go(t, e);
};
var tu = Me(null);
function Ws() {
  var t = tu.current;
  return t !== null ? t : k.pooledCache;
}
function ii(t, e) {
  e === null ? lt(tu, tu.current) : lt(tu, e.pool);
}
function Cd() {
  var t = Ws();
  return t === null ? null : { parent: yt._currentValue, pool: t };
}
var _n = Error(p(460)), Hd = Error(p(474)), ac = Error(p(542)), Rf = { then: function() {
} };
function bo(t) {
  return t = t.status, t === "fulfilled" || t === "rejected";
}
function Kn() {
}
function qd(t, e, l) {
  switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(Kn, Kn), e = l), e.status) {
    case "fulfilled":
      return e.value;
    case "rejected":
      throw t = e.reason, po(t), t;
    default:
      if (typeof e.status == "string") e.then(Kn, Kn);
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
          throw t = e.reason, po(t), t;
      }
      throw ja = e, _n;
  }
}
var ja = null;
function So() {
  if (ja === null) throw Error(p(459));
  var t = ja;
  return ja = null, t;
}
function po(t) {
  if (t === _n || t === ac)
    throw Error(p(483));
}
var Ie = !1;
function ks(t) {
  t.updateQueue = {
    baseState: t.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null
  };
}
function _f(t, e) {
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
    return a === null ? e.next = e : (e.next = a.next, a.next = e), u.pending = e, e = Oi(t), Dd(t, null, l), e;
  }
  return uc(t, u, e, l), Oi(t);
}
function Ga(t, e, l) {
  if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
    var u = e.lanes;
    u &= t.pendingLanes, l |= u, e.lanes = l, ld(t, l);
  }
}
function xc(t, e) {
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
var Df = !1;
function Xa() {
  if (Df) {
    var t = Hu;
    if (t !== null) throw t;
  }
}
function Za(t, e, l, u) {
  Df = !1;
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
      if (y ? (Z & s) === s : (u & s) === s) {
        s !== 0 && s === la && (Df = !0), g !== null && (g = g.next = {
          lane: 0,
          tag: c.tag,
          payload: c.payload,
          callback: null,
          next: null
        });
        t: {
          var E = t, S = c;
          s = e;
          var O = l;
          switch (S.tag) {
            case 1:
              if (E = S.payload, typeof E == "function") {
                v = E.call(O, v, s);
                break t;
              }
              v = E;
              break t;
            case 3:
              E.flags = E.flags & -65537 | 128;
            case 0:
              if (E = S.payload, s = typeof E == "function" ? E.call(O, v, s) : E, s == null) break t;
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
function Nd(t, e) {
  if (typeof t != "function")
    throw Error(p(191, t));
  t.call(e);
}
function xd(t, e) {
  var l = t.callbacks;
  if (l !== null)
    for (t.callbacks = null, t = 0; t < l.length; t++)
      Nd(l[t], e);
}
var ua = Me(null), Ri = Me(0);
function Eo(t, e) {
  t = Ke, lt(Ri, t), lt(ua, e), Ke = t | e.baseLanes;
}
function zf() {
  lt(Ri, Ke), lt(ua, ua.current);
}
function Ps() {
  Ke = Ri.current, Et(ua), Et(Ri);
}
var Dl = 0, x = null, F = null, ot = null, _i = !1, qu = !1, nu = !1, Di = 0, tn = 0, Nu = null, tg = 0;
function ft() {
  throw Error(p(321));
}
function Is(t, e) {
  if (e === null) return !1;
  for (var l = 0; l < e.length && l < t.length; l++)
    if (!Wt(t[l], e[l])) return !1;
  return !0;
}
function tr(t, e, l, u, a, n) {
  return Dl = n, x = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, C.H = t === null || t.memoizedState === null ? dy : yy, nu = !1, n = l(u, a), nu = !1, qu && (n = Yd(
    e,
    l,
    u,
    a
  )), Bd(t), n;
}
function Bd(t) {
  C.H = zi;
  var e = F !== null && F.next !== null;
  if (Dl = 0, ot = F = x = null, _i = !1, tn = 0, Nu = null, e) throw Error(p(300));
  t === null || pt || (t = t.dependencies, t !== null && Mi(t) && (pt = !0));
}
function Yd(t, e, l, u) {
  x = t;
  var a = 0;
  do {
    if (qu && (Nu = null), tn = 0, qu = !1, 25 <= a) throw Error(p(301));
    if (a += 1, ot = F = null, t.updateQueue != null) {
      var n = t.updateQueue;
      n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
    }
    C.H = cg, n = e(l, u);
  } while (qu);
  return n;
}
function eg() {
  var t = C.H, e = t.useState()[0];
  return e = typeof e.then == "function" ? Dn(e) : e, t = t.useState()[0], (F !== null ? F.memoizedState : null) !== t && (x.flags |= 1024), e;
}
function er() {
  var t = Di !== 0;
  return Di = 0, t;
}
function lr(t, e, l) {
  e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
}
function ur(t) {
  if (_i) {
    for (t = t.memoizedState; t !== null; ) {
      var e = t.queue;
      e !== null && (e.pending = null), t = t.next;
    }
    _i = !1;
  }
  Dl = 0, ot = F = x = null, qu = !1, tn = Di = 0, Nu = null;
}
function Bt() {
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
function ar() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function Dn(t) {
  var e = tn;
  return tn += 1, Nu === null && (Nu = []), t = qd(Nu, t, e), e = x, (ot === null ? e.memoizedState : ot.next) === null && (e = e.alternate, C.H = e === null || e.memoizedState === null ? dy : yy), t;
}
function nc(t) {
  if (t !== null && typeof t == "object") {
    if (typeof t.then == "function") return Dn(t);
    if (t.$$typeof === Ne) return Dt(t);
  }
  throw Error(p(438, String(t)));
}
function nr(t) {
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
  if (e == null && (e = { data: [], index: 0 }), l === null && (l = ar(), x.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
    for (l = e.data[e.index] = Array(t), u = 0; u < t; u++)
      l[u] = j0;
  return e.index++, l;
}
function Le(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function ci(t) {
  var e = ht();
  return ir(e, F, t);
}
function ir(t, e, l) {
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
      if (v !== o.lane ? (Z & v) === v : (Dl & v) === v) {
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
        else if ((Dl & s) === s) {
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
    if (f === null ? i = n : f.next = c, !Wt(n, t.memoizedState) && (pt = !0, g && (l = Hu, l !== null)))
      throw l;
    t.memoizedState = n, t.baseState = i, t.baseQueue = f, u.lastRenderedState = n;
  }
  return a === null && (u.lanes = 0), [t.memoizedState, u.dispatch];
}
function Bc(t) {
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
    Wt(n, e.memoizedState) || (pt = !0), e.memoizedState = n, e.baseQueue === null && (e.baseState = n), l.lastRenderedState = n;
  }
  return [n, u];
}
function jd(t, e, l) {
  var u = x, a = ht(), n = w;
  if (n) {
    if (l === void 0) throw Error(p(407));
    l = l();
  } else l = e();
  var i = !Wt(
    (F || a).memoizedState,
    l
  );
  i && (a.memoizedState = l, pt = !0), a = a.queue;
  var c = Zd.bind(null, u, a, t);
  if (zn(2048, 8, c, [t]), a.getSnapshot !== e || i || ot !== null && ot.memoizedState.tag & 1) {
    if (u.flags |= 2048, aa(
      9,
      ic(),
      Xd.bind(
        null,
        u,
        a,
        l,
        e
      ),
      null
    ), k === null) throw Error(p(349));
    n || Dl & 124 || Gd(u, e, l);
  }
  return l;
}
function Gd(t, e, l) {
  t.flags |= 16384, t = { getSnapshot: e, value: l }, e = x.updateQueue, e === null ? (e = ar(), x.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
}
function Xd(t, e, l, u) {
  e.value = l, e.getSnapshot = u, wd(e) && Ld(t);
}
function Zd(t, e, l) {
  return l(function() {
    wd(e) && Ld(t);
  });
}
function wd(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var l = e();
    return !Wt(t, l);
  } catch {
    return !0;
  }
}
function Ld(t) {
  var e = va(t, 2);
  e !== null && Ft(e, t, 2);
}
function Uf(t) {
  var e = Bt();
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
function Vd(t, e, l, u) {
  return t.baseState = l, ir(
    t,
    F,
    typeof u == "function" ? u : Le
  );
}
function lg(t, e, l, u, a) {
  if (cc(t)) throw Error(p(485));
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
    C.T !== null ? l(!0) : n.isTransition = !1, u(n), l = e.pending, l === null ? (n.next = e.pending = n, Kd(e, n)) : (n.next = l.next, e.pending = l.next = n);
  }
}
function Kd(t, e) {
  var l = e.action, u = e.payload, a = t.state;
  if (e.isTransition) {
    var n = C.T, i = {};
    C.T = i;
    try {
      var c = l(a, u), f = C.S;
      f !== null && f(i, c), Oo(t, e, c);
    } catch (o) {
      Qf(t, e, o);
    } finally {
      C.T = n;
    }
  } else
    try {
      n = l(a, u), Oo(t, e, n);
    } catch (o) {
      Qf(t, e, o);
    }
}
function Oo(t, e, l) {
  l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
    function(u) {
      To(t, e, u);
    },
    function(u) {
      return Qf(t, e, u);
    }
  ) : To(t, e, l);
}
function To(t, e, l) {
  e.status = "fulfilled", e.value = l, Jd(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, Kd(t, l)));
}
function Qf(t, e, l) {
  var u = t.pending;
  if (t.pending = null, u !== null) {
    u = u.next;
    do
      e.status = "rejected", e.reason = l, Jd(e), e = e.next;
    while (e !== u);
  }
  t.action = null;
}
function Jd(t) {
  t = t.listeners;
  for (var e = 0; e < t.length; e++) (0, t[e])();
}
function $d(t, e) {
  return e;
}
function Ao(t, e) {
  if (w) {
    var l = k.formState;
    if (l !== null) {
      t: {
        var u = x;
        if (w) {
          if (nt) {
            e: {
              for (var a = nt, n = pe; a.nodeType !== 8; ) {
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
  return l = Bt(), l.memoizedState = l.baseState = e, u = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: $d,
    lastRenderedState: e
  }, l.queue = u, l = ry.bind(
    null,
    x,
    u
  ), u.dispatch = l, u = Uf(!1), n = rr.bind(
    null,
    x,
    !1,
    u.queue
  ), u = Bt(), a = {
    state: e,
    dispatch: null,
    action: t,
    pending: null
  }, u.queue = a, l = lg.bind(
    null,
    x,
    a,
    n,
    l
  ), a.dispatch = l, u.memoizedState = t, [e, l, !1];
}
function Mo(t) {
  var e = ht();
  return Fd(e, F, t);
}
function Fd(t, e, l) {
  if (e = ir(
    t,
    e,
    $d
  )[0], t = ci(Le)[0], typeof e == "object" && e !== null && typeof e.then == "function")
    try {
      var u = Dn(e);
    } catch (i) {
      throw i === _n ? ac : i;
    }
  else u = e;
  e = ht();
  var a = e.queue, n = a.dispatch;
  return l !== e.memoizedState && (x.flags |= 2048, aa(
    9,
    ic(),
    ug.bind(null, a, l),
    null
  )), [u, n, t];
}
function ug(t, e) {
  t.action = e;
}
function Ro(t) {
  var e = ht(), l = F;
  if (l !== null)
    return Fd(e, l, t);
  ht(), e = e.memoizedState, l = ht();
  var u = l.queue.dispatch;
  return l.memoizedState = t, [e, u, !1];
}
function aa(t, e, l, u) {
  return t = { tag: t, create: l, deps: u, inst: e, next: null }, e = x.updateQueue, e === null && (e = ar(), x.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (u = l.next, l.next = t, t.next = u, e.lastEffect = t), t;
}
function ic() {
  return { destroy: void 0, resource: void 0 };
}
function Wd() {
  return ht().memoizedState;
}
function fi(t, e, l, u) {
  var a = Bt();
  u = u === void 0 ? null : u, x.flags |= t, a.memoizedState = aa(
    1 | e,
    ic(),
    l,
    u
  );
}
function zn(t, e, l, u) {
  var a = ht();
  u = u === void 0 ? null : u;
  var n = a.memoizedState.inst;
  F !== null && u !== null && Is(u, F.memoizedState.deps) ? a.memoizedState = aa(e, n, l, u) : (x.flags |= t, a.memoizedState = aa(
    1 | e,
    n,
    l,
    u
  ));
}
function _o(t, e) {
  fi(8390656, 8, t, e);
}
function kd(t, e) {
  zn(2048, 8, t, e);
}
function Pd(t, e) {
  return zn(4, 2, t, e);
}
function Id(t, e) {
  return zn(4, 4, t, e);
}
function ty(t, e) {
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
function ey(t, e, l) {
  l = l != null ? l.concat([t]) : null, zn(4, 4, ty.bind(null, e, t), l);
}
function cr() {
}
function ly(t, e) {
  var l = ht();
  e = e === void 0 ? null : e;
  var u = l.memoizedState;
  return e !== null && Is(e, u[1]) ? u[0] : (l.memoizedState = [t, e], t);
}
function uy(t, e) {
  var l = ht();
  e = e === void 0 ? null : e;
  var u = l.memoizedState;
  if (e !== null && Is(e, u[1]))
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
function fr(t, e, l) {
  return l === void 0 || Dl & 1073741824 ? t.memoizedState = e : (t.memoizedState = l, t = Jy(), x.lanes |= t, Ul |= t, l);
}
function ay(t, e, l, u) {
  return Wt(l, e) ? l : ua.current !== null ? (t = fr(t, l, u), Wt(t, e) || (pt = !0), t) : Dl & 42 ? (t = Jy(), x.lanes |= t, Ul |= t, e) : (pt = !0, t.memoizedState = l);
}
function ny(t, e, l, u, a) {
  var n = L.p;
  L.p = n !== 0 && 8 > n ? n : 8;
  var i = C.T, c = {};
  C.T = c, rr(t, !1, e, l);
  try {
    var f = a(), o = C.S;
    if (o !== null && o(c, f), f !== null && typeof f == "object" && typeof f.then == "function") {
      var g = Im(
        f,
        u
      );
      wa(
        t,
        e,
        g,
        $t(t)
      );
    } else
      wa(
        t,
        e,
        u,
        $t(t)
      );
  } catch (v) {
    wa(
      t,
      e,
      { then: function() {
      }, status: "rejected", reason: v },
      $t()
    );
  } finally {
    L.p = n, C.T = i;
  }
}
function ag() {
}
function Cf(t, e, l, u) {
  if (t.tag !== 5) throw Error(p(476));
  var a = iy(t).queue;
  ny(
    t,
    a,
    e,
    Wl,
    l === null ? ag : function() {
      return cy(t), l(u);
    }
  );
}
function iy(t) {
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
function cy(t) {
  var e = iy(t).next.queue;
  wa(t, e, {}, $t());
}
function sr() {
  return Dt(nn);
}
function fy() {
  return ht().memoizedState;
}
function sy() {
  return ht().memoizedState;
}
function ng(t) {
  for (var e = t.return; e !== null; ) {
    switch (e.tag) {
      case 24:
      case 3:
        var l = $t();
        t = pl(l);
        var u = El(e, t, l);
        u !== null && (Ft(u, e, l), Ga(u, e, l)), e = { cache: Fs() }, t.payload = e;
        return;
    }
    e = e.return;
  }
}
function ig(t, e, l) {
  var u = $t();
  l = {
    lane: u,
    revertLane: 0,
    action: l,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, cc(t) ? oy(e, l) : (l = Vs(t, e, l, u), l !== null && (Ft(l, t, u), hy(l, e, u)));
}
function ry(t, e, l) {
  var u = $t();
  wa(t, e, l, u);
}
function wa(t, e, l, u) {
  var a = {
    lane: u,
    revertLane: 0,
    action: l,
    hasEagerState: !1,
    eagerState: null,
    next: null
  };
  if (cc(t)) oy(e, a);
  else {
    var n = t.alternate;
    if (t.lanes === 0 && (n === null || n.lanes === 0) && (n = e.lastRenderedReducer, n !== null))
      try {
        var i = e.lastRenderedState, c = n(i, l);
        if (a.hasEagerState = !0, a.eagerState = c, Wt(c, i))
          return uc(t, e, a, 0), k === null && lc(), !1;
      } catch {
      } finally {
      }
    if (l = Vs(t, e, a, u), l !== null)
      return Ft(l, t, u), hy(l, e, u), !0;
  }
  return !1;
}
function rr(t, e, l, u) {
  if (u = {
    lane: 2,
    revertLane: br(),
    action: u,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, cc(t)) {
    if (e) throw Error(p(479));
  } else
    e = Vs(
      t,
      l,
      u,
      2
    ), e !== null && Ft(e, t, 2);
}
function cc(t) {
  var e = t.alternate;
  return t === x || e !== null && e === x;
}
function oy(t, e) {
  qu = _i = !0;
  var l = t.pending;
  l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
}
function hy(t, e, l) {
  if (l & 4194048) {
    var u = e.lanes;
    u &= t.pendingLanes, l |= u, e.lanes = l, ld(t, l);
  }
}
var zi = {
  readContext: Dt,
  use: nc,
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
}, dy = {
  readContext: Dt,
  use: nc,
  useCallback: function(t, e) {
    return Bt().memoizedState = [
      t,
      e === void 0 ? null : e
    ], t;
  },
  useContext: Dt,
  useEffect: _o,
  useImperativeHandle: function(t, e, l) {
    l = l != null ? l.concat([t]) : null, fi(
      4194308,
      4,
      ty.bind(null, e, t),
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
    var l = Bt();
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
    var u = Bt();
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
    }, u.queue = t, t = t.dispatch = ig.bind(
      null,
      x,
      t
    ), [u.memoizedState, t];
  },
  useRef: function(t) {
    var e = Bt();
    return t = { current: t }, e.memoizedState = t;
  },
  useState: function(t) {
    t = Uf(t);
    var e = t.queue, l = ry.bind(null, x, e);
    return e.dispatch = l, [t.memoizedState, l];
  },
  useDebugValue: cr,
  useDeferredValue: function(t, e) {
    var l = Bt();
    return fr(l, t, e);
  },
  useTransition: function() {
    var t = Uf(!1);
    return t = ny.bind(
      null,
      x,
      t.queue,
      !0,
      !1
    ), Bt().memoizedState = t, [!1, t];
  },
  useSyncExternalStore: function(t, e, l) {
    var u = x, a = Bt();
    if (w) {
      if (l === void 0)
        throw Error(p(407));
      l = l();
    } else {
      if (l = e(), k === null)
        throw Error(p(349));
      Z & 124 || Gd(u, e, l);
    }
    a.memoizedState = l;
    var n = { value: l, getSnapshot: e };
    return a.queue = n, _o(Zd.bind(null, u, n, t), [
      t
    ]), u.flags |= 2048, aa(
      9,
      ic(),
      Xd.bind(
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
    var t = Bt(), e = k.identifierPrefix;
    if (w) {
      var l = Be, u = xe;
      l = (u & ~(1 << 32 - Jt(u) - 1)).toString(32) + l, e = "«" + e + "R" + l, l = Di++, 0 < l && (e += "H" + l.toString(32)), e += "»";
    } else
      l = tg++, e = "«" + e + "r" + l.toString(32) + "»";
    return t.memoizedState = e;
  },
  useHostTransitionStatus: sr,
  useFormState: Ao,
  useActionState: Ao,
  useOptimistic: function(t) {
    var e = Bt();
    e.memoizedState = e.baseState = t;
    var l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: null,
      lastRenderedState: null
    };
    return e.queue = l, e = rr.bind(
      null,
      x,
      !0,
      l
    ), l.dispatch = e, [t, e];
  },
  useMemoCache: nr,
  useCacheRefresh: function() {
    return Bt().memoizedState = ng.bind(
      null,
      x
    );
  }
}, yy = {
  readContext: Dt,
  use: nc,
  useCallback: ly,
  useContext: Dt,
  useEffect: kd,
  useImperativeHandle: ey,
  useInsertionEffect: Pd,
  useLayoutEffect: Id,
  useMemo: uy,
  useReducer: ci,
  useRef: Wd,
  useState: function() {
    return ci(Le);
  },
  useDebugValue: cr,
  useDeferredValue: function(t, e) {
    var l = ht();
    return ay(
      l,
      F.memoizedState,
      t,
      e
    );
  },
  useTransition: function() {
    var t = ci(Le)[0], e = ht().memoizedState;
    return [
      typeof t == "boolean" ? t : Dn(t),
      e
    ];
  },
  useSyncExternalStore: jd,
  useId: fy,
  useHostTransitionStatus: sr,
  useFormState: Mo,
  useActionState: Mo,
  useOptimistic: function(t, e) {
    var l = ht();
    return Vd(l, F, t, e);
  },
  useMemoCache: nr,
  useCacheRefresh: sy
}, cg = {
  readContext: Dt,
  use: nc,
  useCallback: ly,
  useContext: Dt,
  useEffect: kd,
  useImperativeHandle: ey,
  useInsertionEffect: Pd,
  useLayoutEffect: Id,
  useMemo: uy,
  useReducer: Bc,
  useRef: Wd,
  useState: function() {
    return Bc(Le);
  },
  useDebugValue: cr,
  useDeferredValue: function(t, e) {
    var l = ht();
    return F === null ? fr(l, t, e) : ay(
      l,
      F.memoizedState,
      t,
      e
    );
  },
  useTransition: function() {
    var t = Bc(Le)[0], e = ht().memoizedState;
    return [
      typeof t == "boolean" ? t : Dn(t),
      e
    ];
  },
  useSyncExternalStore: jd,
  useId: fy,
  useHostTransitionStatus: sr,
  useFormState: Ro,
  useActionState: Ro,
  useOptimistic: function(t, e) {
    var l = ht();
    return F !== null ? Vd(l, F, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
  },
  useMemoCache: nr,
  useCacheRefresh: sy
}, xu = null, en = 0;
function Jn(t) {
  var e = en;
  return en += 1, xu === null && (xu = []), qd(xu, t, e);
}
function Ma(t, e) {
  e = e.props.ref, t.ref = e !== void 0 ? e : null;
}
function $n(t, e) {
  throw e.$$typeof === B0 ? Error(p(525)) : (t = Object.prototype.toString.call(e), Error(
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
function vy(t) {
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
    return d = Ge(d, h), d.index = 0, d.sibling = null, d;
  }
  function n(d, h, m) {
    return d.index = m, t ? (m = d.alternate, m !== null ? (m = m.index, m < h ? (d.flags |= 67108866, h) : m) : (d.flags |= 67108866, h)) : (d.flags |= 1048576, h);
  }
  function i(d) {
    return t && d.alternate === null && (d.flags |= 67108866), d;
  }
  function c(d, h, m, b) {
    return h === null || h.tag !== 6 ? (h = qc(m, d.mode, b), h.return = d, h) : (h = a(h, m), h.return = d, h);
  }
  function f(d, h, m, b) {
    var T = m.type;
    return T === bu ? g(
      d,
      h,
      m.props.children,
      b,
      m.key
    ) : h !== null && (h.elementType === T || typeof T == "object" && T !== null && T.$$typeof === Pe && Do(T) === h.type) ? (h = a(h, m.props), Ma(h, m), h.return = d, h) : (h = ni(
      m.type,
      m.key,
      m.props,
      null,
      d.mode,
      b
    ), Ma(h, m), h.return = d, h);
  }
  function o(d, h, m, b) {
    return h === null || h.tag !== 4 || h.stateNode.containerInfo !== m.containerInfo || h.stateNode.implementation !== m.implementation ? (h = Nc(m, d.mode, b), h.return = d, h) : (h = a(h, m.children || []), h.return = d, h);
  }
  function g(d, h, m, b, T) {
    return h === null || h.tag !== 7 ? (h = kl(
      m,
      d.mode,
      b,
      T
    ), h.return = d, h) : (h = a(h, m), h.return = d, h);
  }
  function v(d, h, m) {
    if (typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint")
      return h = qc(
        "" + h,
        d.mode,
        m
      ), h.return = d, h;
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case Gn:
          return m = ni(
            h.type,
            h.key,
            h.props,
            null,
            d.mode,
            m
          ), Ma(m, h), m.return = d, m;
        case za:
          return h = Nc(
            h,
            d.mode,
            m
          ), h.return = d, h;
        case Pe:
          var b = h._init;
          return h = b(h._payload), v(d, h, m);
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
      if (h.$$typeof === Ne)
        return v(
          d,
          Vn(d, h),
          m
        );
      $n(d, h);
    }
    return null;
  }
  function s(d, h, m, b) {
    var T = h !== null ? h.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
      return T !== null ? null : c(d, h, "" + m, b);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Gn:
          return m.key === T ? f(d, h, m, b) : null;
        case za:
          return m.key === T ? o(d, h, m, b) : null;
        case Pe:
          return T = m._init, m = T(m._payload), s(d, h, m, b);
      }
      if (Ua(m) || Ea(m))
        return T !== null ? null : g(d, h, m, b, null);
      if (typeof m.then == "function")
        return s(
          d,
          h,
          Jn(m),
          b
        );
      if (m.$$typeof === Ne)
        return s(
          d,
          h,
          Vn(d, m),
          b
        );
      $n(d, m);
    }
    return null;
  }
  function y(d, h, m, b, T) {
    if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
      return d = d.get(m) || null, c(h, d, "" + b, T);
    if (typeof b == "object" && b !== null) {
      switch (b.$$typeof) {
        case Gn:
          return d = d.get(
            b.key === null ? m : b.key
          ) || null, f(h, d, b, T);
        case za:
          return d = d.get(
            b.key === null ? m : b.key
          ) || null, o(h, d, b, T);
        case Pe:
          var z = b._init;
          return b = z(b._payload), y(
            d,
            h,
            m,
            b,
            T
          );
      }
      if (Ua(b) || Ea(b))
        return d = d.get(m) || null, g(h, d, b, T, null);
      if (typeof b.then == "function")
        return y(
          d,
          h,
          m,
          Jn(b),
          T
        );
      if (b.$$typeof === Ne)
        return y(
          d,
          h,
          m,
          Vn(h, b),
          T
        );
      $n(h, b);
    }
    return null;
  }
  function E(d, h, m, b) {
    for (var T = null, z = null, M = h, R = h = 0, q = null; M !== null && R < m.length; R++) {
      M.index > R ? (q = M, M = null) : q = M.sibling;
      var U = s(
        d,
        M,
        m[R],
        b
      );
      if (U === null) {
        M === null && (M = q);
        break;
      }
      t && M && U.alternate === null && e(d, M), h = n(U, h, R), z === null ? T = U : z.sibling = U, z = U, M = q;
    }
    if (R === m.length)
      return l(d, M), w && jl(d, R), T;
    if (M === null) {
      for (; R < m.length; R++)
        M = v(d, m[R], b), M !== null && (h = n(
          M,
          h,
          R
        ), z === null ? T = M : z.sibling = M, z = M);
      return w && jl(d, R), T;
    }
    for (M = u(M); R < m.length; R++)
      q = y(
        M,
        d,
        R,
        m[R],
        b
      ), q !== null && (t && q.alternate !== null && M.delete(
        q.key === null ? R : q.key
      ), h = n(
        q,
        h,
        R
      ), z === null ? T = q : z.sibling = q, z = q);
    return t && M.forEach(function(rt) {
      return e(d, rt);
    }), w && jl(d, R), T;
  }
  function S(d, h, m, b) {
    if (m == null) throw Error(p(151));
    for (var T = null, z = null, M = h, R = h = 0, q = null, U = m.next(); M !== null && !U.done; R++, U = m.next()) {
      M.index > R ? (q = M, M = null) : q = M.sibling;
      var rt = s(d, M, U.value, b);
      if (rt === null) {
        M === null && (M = q);
        break;
      }
      t && M && rt.alternate === null && e(d, M), h = n(rt, h, R), z === null ? T = rt : z.sibling = rt, z = rt, M = q;
    }
    if (U.done)
      return l(d, M), w && jl(d, R), T;
    if (M === null) {
      for (; !U.done; R++, U = m.next())
        U = v(d, U.value, b), U !== null && (h = n(U, h, R), z === null ? T = U : z.sibling = U, z = U);
      return w && jl(d, R), T;
    }
    for (M = u(M); !U.done; R++, U = m.next())
      U = y(M, d, R, U.value, b), U !== null && (t && U.alternate !== null && M.delete(U.key === null ? R : U.key), h = n(U, h, R), z === null ? T = U : z.sibling = U, z = U);
    return t && M.forEach(function(zt) {
      return e(d, zt);
    }), w && jl(d, R), T;
  }
  function O(d, h, m, b) {
    if (typeof m == "object" && m !== null && m.type === bu && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Gn:
          t: {
            for (var T = m.key; h !== null; ) {
              if (h.key === T) {
                if (T = m.type, T === bu) {
                  if (h.tag === 7) {
                    l(
                      d,
                      h.sibling
                    ), b = a(
                      h,
                      m.props.children
                    ), b.return = d, d = b;
                    break t;
                  }
                } else if (h.elementType === T || typeof T == "object" && T !== null && T.$$typeof === Pe && Do(T) === h.type) {
                  l(
                    d,
                    h.sibling
                  ), b = a(h, m.props), Ma(b, m), b.return = d, d = b;
                  break t;
                }
                l(d, h);
                break;
              } else e(d, h);
              h = h.sibling;
            }
            m.type === bu ? (b = kl(
              m.props.children,
              d.mode,
              b,
              m.key
            ), b.return = d, d = b) : (b = ni(
              m.type,
              m.key,
              m.props,
              null,
              d.mode,
              b
            ), Ma(b, m), b.return = d, d = b);
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
                  ), b = a(h, m.children || []), b.return = d, d = b;
                  break t;
                } else {
                  l(d, h);
                  break;
                }
              else e(d, h);
              h = h.sibling;
            }
            b = Nc(m, d.mode, b), b.return = d, d = b;
          }
          return i(d);
        case Pe:
          return T = m._init, m = T(m._payload), O(
            d,
            h,
            m,
            b
          );
      }
      if (Ua(m))
        return E(
          d,
          h,
          m,
          b
        );
      if (Ea(m)) {
        if (T = Ea(m), typeof T != "function") throw Error(p(150));
        return m = T.call(m), S(
          d,
          h,
          m,
          b
        );
      }
      if (typeof m.then == "function")
        return O(
          d,
          h,
          Jn(m),
          b
        );
      if (m.$$typeof === Ne)
        return O(
          d,
          h,
          Vn(d, m),
          b
        );
      $n(d, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint" ? (m = "" + m, h !== null && h.tag === 6 ? (l(d, h.sibling), b = a(h, m), b.return = d, d = b) : (l(d, h), b = qc(m, d.mode, b), b.return = d, d = b), i(d)) : l(d, h);
  }
  return function(d, h, m, b) {
    try {
      en = 0;
      var T = O(
        d,
        h,
        m,
        b
      );
      return xu = null, T;
    } catch (M) {
      if (M === _n || M === ac) throw M;
      var z = Vt(29, M, null, d.mode);
      return z.lanes = b, z.return = d, z;
    } finally {
    }
  };
}
var na = vy(!0), my = vy(!1), se = Me(null), Ae = null;
function el(t) {
  var e = t.alternate;
  lt(vt, vt.current & 1), lt(se, t), Ae === null && (e === null || ua.current !== null || e.memoizedState !== null) && (Ae = t);
}
function gy(t) {
  if (t.tag === 22) {
    if (lt(vt, vt.current), lt(se, t), Ae === null) {
      var e = t.alternate;
      e !== null && e.memoizedState !== null && (Ae = t);
    }
  } else ll();
}
function ll() {
  lt(vt, vt.current), lt(se, se.current);
}
function je(t) {
  Et(se), Ae === t && (Ae = null), Et(vt);
}
var vt = Me(0);
function Ui(t) {
  for (var e = t; e !== null; ) {
    if (e.tag === 13) {
      var l = e.memoizedState;
      if (l !== null && (l = l.dehydrated, l === null || l.data === "$?" || Ff(l)))
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
function Yc(t, e, l, u) {
  e = t.memoizedState, l = l(u, e), l = l == null ? e : I({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
}
var Hf = {
  enqueueSetState: function(t, e, l) {
    t = t._reactInternals;
    var u = $t(), a = pl(u);
    a.payload = e, l != null && (a.callback = l), e = El(t, a, u), e !== null && (Ft(e, t, u), Ga(e, t, u));
  },
  enqueueReplaceState: function(t, e, l) {
    t = t._reactInternals;
    var u = $t(), a = pl(u);
    a.tag = 1, a.payload = e, l != null && (a.callback = l), e = El(t, a, u), e !== null && (Ft(e, t, u), Ga(e, t, u));
  },
  enqueueForceUpdate: function(t, e) {
    t = t._reactInternals;
    var l = $t(), u = pl(l);
    u.tag = 2, e != null && (u.callback = e), e = El(t, u, l), e !== null && (Ft(e, t, l), Ga(e, t, l));
  }
};
function zo(t, e, l, u, a, n, i) {
  return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(u, n, i) : e.prototype && e.prototype.isPureReactComponent ? !Pa(l, u) || !Pa(a, n) : !0;
}
function Uo(t, e, l, u) {
  t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, u), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, u), e.state !== t && Hf.enqueueReplaceState(e, e.state, null);
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
function by(t) {
  Qi(t);
}
function Sy(t) {
  console.error(t);
}
function py(t) {
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
function Qo(t, e, l) {
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
function qf(t, e, l) {
  return l = pl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
    Ci(t, e);
  }, l;
}
function Ey(t) {
  return t = pl(t), t.tag = 3, t;
}
function Oy(t, e, l, u) {
  var a = l.type.getDerivedStateFromError;
  if (typeof a == "function") {
    var n = u.value;
    t.payload = function() {
      return a(n);
    }, t.callback = function() {
      Qo(e, l, u);
    };
  }
  var i = l.stateNode;
  i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
    Qo(e, l, u), typeof a != "function" && (Ol === null ? Ol = /* @__PURE__ */ new Set([this]) : Ol.add(this));
    var c = u.stack;
    this.componentDidCatch(u.value, {
      componentStack: c !== null ? c : ""
    });
  });
}
function fg(t, e, l, u, a) {
  if (l.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
    if (e = l.alternate, e !== null && Mn(
      e,
      l,
      a,
      !0
    ), l = se.current, l !== null) {
      switch (l.tag) {
        case 13:
          return Ae === null ? Zf() : l.alternate === null && it === 0 && (it = 3), l.flags &= -257, l.flags |= 65536, l.lanes = a, u === Rf ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([u]) : e.add(u), Fc(t, u, a)), !1;
        case 22:
          return l.flags |= 65536, u === Rf ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
            transitions: null,
            markerInstances: null,
            retryQueue: /* @__PURE__ */ new Set([u])
          }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([u]) : l.add(u)), Fc(t, u, a)), !1;
      }
      throw Error(p(435, l.tag));
    }
    return Fc(t, u, a), Zf(), !1;
  }
  if (w)
    return e = se.current, e !== null ? (!(e.flags & 65536) && (e.flags |= 256), e.flags |= 65536, e.lanes = a, u !== Ef && (t = Error(p(422), { cause: u }), Ia(ie(t, l)))) : (u !== Ef && (e = Error(p(423), {
      cause: u
    }), Ia(
      ie(e, l)
    )), t = t.current.alternate, t.flags |= 65536, a &= -a, t.lanes |= a, u = ie(u, l), a = qf(
      t.stateNode,
      u,
      a
    ), xc(t, a), it !== 4 && (it = 2)), !1;
  var n = Error(p(520), { cause: u });
  if (n = ie(n, l), Ka === null ? Ka = [n] : Ka.push(n), it !== 4 && (it = 2), e === null) return !0;
  u = ie(u, l), l = e;
  do {
    switch (l.tag) {
      case 3:
        return l.flags |= 65536, t = a & -a, l.lanes |= t, t = qf(l.stateNode, u, t), xc(l, t), !1;
      case 1:
        if (e = l.type, n = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (Ol === null || !Ol.has(n))))
          return l.flags |= 65536, a &= -a, l.lanes |= a, a = Ey(a), Oy(
            a,
            t,
            l,
            u
          ), xc(l, a), !1;
    }
    l = l.return;
  } while (l !== null);
  return !1;
}
var Ty = Error(p(461)), pt = !1;
function Ot(t, e, l, u) {
  e.child = t === null ? my(e, null, l, u) : na(
    e,
    t.child,
    l,
    u
  );
}
function Co(t, e, l, u, a) {
  l = l.render;
  var n = e.ref;
  if ("ref" in u) {
    var i = {};
    for (var c in u)
      c !== "ref" && (i[c] = u[c]);
  } else i = u;
  return au(e), u = tr(
    t,
    e,
    l,
    i,
    n,
    a
  ), c = er(), t !== null && !pt ? (lr(t, e, a), Ve(t, e, a)) : (w && c && Js(e), e.flags |= 1, Ot(t, e, u, a), e.child);
}
function Ho(t, e, l, u, a) {
  if (t === null) {
    var n = l.type;
    return typeof n == "function" && !Ks(n) && n.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = n, Ay(
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
  if (n = t.child, !or(t, a)) {
    var i = n.memoizedProps;
    if (l = l.compare, l = l !== null ? l : Pa, l(i, u) && t.ref === e.ref)
      return Ve(t, e, a);
  }
  return e.flags |= 1, t = Ge(n, u), t.ref = e.ref, t.return = e, e.child = t;
}
function Ay(t, e, l, u, a) {
  if (t !== null) {
    var n = t.memoizedProps;
    if (Pa(n, u) && t.ref === e.ref)
      if (pt = !1, e.pendingProps = u = n, or(t, a))
        t.flags & 131072 && (pt = !0);
      else
        return e.lanes = t.lanes, Ve(t, e, a);
  }
  return Nf(
    t,
    e,
    l,
    u,
    a
  );
}
function My(t, e, l) {
  var u = e.pendingProps, a = u.children, n = t !== null ? t.memoizedState : null;
  if (u.mode === "hidden") {
    if (e.flags & 128) {
      if (u = n !== null ? n.baseLanes | l : l, t !== null) {
        for (a = e.child = t.child, n = 0; a !== null; )
          n = n | a.lanes | a.childLanes, a = a.sibling;
        e.childLanes = n & ~u;
      } else e.childLanes = 0, e.child = null;
      return qo(
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
      ), n !== null ? Eo(e, n) : zf(), gy(e);
    else
      return e.lanes = e.childLanes = 536870912, qo(
        t,
        e,
        n !== null ? n.baseLanes | l : l,
        l
      );
  } else
    n !== null ? (ii(e, n.cachePool), Eo(e, n), ll(), e.memoizedState = null) : (t !== null && ii(e, null), zf(), ll());
  return Ot(t, e, a, l), e.child;
}
function qo(t, e, l, u) {
  var a = Ws();
  return a = a === null ? null : { parent: yt._currentValue, pool: a }, e.memoizedState = {
    baseLanes: l,
    cachePool: a
  }, t !== null && ii(e, null), zf(), gy(e), t !== null && Mn(t, e, u, !0), null;
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
function Nf(t, e, l, u, a) {
  return au(e), l = tr(
    t,
    e,
    l,
    u,
    void 0,
    a
  ), u = er(), t !== null && !pt ? (lr(t, e, a), Ve(t, e, a)) : (w && u && Js(e), e.flags |= 1, Ot(t, e, l, a), e.child);
}
function No(t, e, l, u, a, n) {
  return au(e), e.updateQueue = null, l = Yd(
    e,
    u,
    l,
    a
  ), Bd(t), u = er(), t !== null && !pt ? (lr(t, e, n), Ve(t, e, n)) : (w && u && Js(e), e.flags |= 1, Ot(t, e, l, n), e.child);
}
function xo(t, e, l, u, a) {
  if (au(e), e.stateNode === null) {
    var n = Ru, i = l.contextType;
    typeof i == "object" && i !== null && (n = Dt(i)), n = new l(u, n), e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Hf, e.stateNode = n, n._reactInternals = e, n = e.stateNode, n.props = u, n.state = e.memoizedState, n.refs = {}, ks(e), i = l.contextType, n.context = typeof i == "object" && i !== null ? Dt(i) : Ru, n.state = e.memoizedState, i = l.getDerivedStateFromProps, typeof i == "function" && (Yc(
      e,
      l,
      i,
      u
    ), n.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && Hf.enqueueReplaceState(n, n.state, null), Za(e, u, n, a), Xa(), n.state = e.memoizedState), typeof n.componentDidMount == "function" && (e.flags |= 4194308), u = !0;
  } else if (t === null) {
    n = e.stateNode;
    var c = e.memoizedProps, f = iu(l, c);
    n.props = f;
    var o = n.context, g = l.contextType;
    i = Ru, typeof g == "object" && g !== null && (i = Dt(g));
    var v = l.getDerivedStateFromProps;
    g = typeof v == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = e.pendingProps !== c, g || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || o !== i) && Uo(
      e,
      n,
      u,
      i
    ), Ie = !1;
    var s = e.memoizedState;
    n.state = s, Za(e, u, n, a), Xa(), o = e.memoizedState, c || s !== o || Ie ? (typeof v == "function" && (Yc(
      e,
      l,
      v,
      u
    ), o = e.memoizedState), (f = Ie || zo(
      e,
      l,
      f,
      u,
      s,
      o,
      i
    )) ? (g || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = u, e.memoizedState = o), n.props = u, n.state = o, n.context = i, u = f) : (typeof n.componentDidMount == "function" && (e.flags |= 4194308), u = !1);
  } else {
    n = e.stateNode, _f(t, e), i = e.memoizedProps, g = iu(l, i), n.props = g, v = e.pendingProps, s = n.context, o = l.contextType, f = Ru, typeof o == "object" && o !== null && (f = Dt(o)), c = l.getDerivedStateFromProps, (o = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== v || s !== f) && Uo(
      e,
      n,
      u,
      f
    ), Ie = !1, s = e.memoizedState, n.state = s, Za(e, u, n, a), Xa();
    var y = e.memoizedState;
    i !== v || s !== y || Ie || t !== null && t.dependencies !== null && Mi(t.dependencies) ? (typeof c == "function" && (Yc(
      e,
      l,
      c,
      u
    ), y = e.memoizedState), (g = Ie || zo(
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
  )) : Ot(t, e, l, a), e.memoizedState = n.state, t = e.child) : t = Ve(
    t,
    e,
    a
  ), t;
}
function Bo(t, e, l, u) {
  return An(), e.flags |= 256, Ot(t, e, l, u), e.child;
}
var jc = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0,
  hydrationErrors: null
};
function Gc(t) {
  return { baseLanes: t, cachePool: Cd() };
}
function Xc(t, e, l) {
  return t = t !== null ? t.childLanes & ~l : 0, e && (t |= ce), t;
}
function Ry(t, e, l) {
  var u = e.pendingProps, a = !1, n = (e.flags & 128) !== 0, i;
  if ((i = n) || (i = t !== null && t.memoizedState === null ? !1 : (vt.current & 2) !== 0), i && (a = !0, e.flags &= -129), i = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
    if (w) {
      if (a ? el(e) : ll(), w) {
        var c = nt, f;
        if (f = c) {
          t: {
            for (f = c, c = pe; f.nodeType !== 8; ) {
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
            treeContext: Pl !== null ? { id: xe, overflow: Be } : null,
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
        return Ff(c) ? e.lanes = 32 : e.lanes = 536870912, null;
      je(e);
    }
    return c = u.children, u = u.fallback, a ? (ll(), a = e.mode, c = Hi(
      { mode: "hidden", children: c },
      a
    ), u = kl(
      u,
      a,
      l,
      null
    ), c.return = e, u.return = e, c.sibling = u, e.child = c, a = e.child, a.memoizedState = Gc(l), a.childLanes = Xc(
      t,
      i,
      l
    ), e.memoizedState = jc, u) : (el(e), xf(e, c));
  }
  if (f = t.memoizedState, f !== null && (c = f.dehydrated, c !== null)) {
    if (n)
      e.flags & 256 ? (el(e), e.flags &= -257, e = Zc(
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
      ), u = e.child, u.memoizedState = Gc(l), u.childLanes = Xc(
        t,
        i,
        l
      ), e.memoizedState = jc, e = a);
    else if (el(e), Ff(c)) {
      if (i = c.nextSibling && c.nextSibling.dataset, i) var o = i.dgst;
      i = o, u = Error(p(419)), u.stack = "", u.digest = i, Ia({ value: u, source: null, stack: null }), e = Zc(
        t,
        e,
        l
      );
    } else if (pt || Mn(t, e, l, !1), i = (l & t.childLanes) !== 0, pt || i) {
      if (i = k, i !== null && (u = l & -l, u = u & 42 ? 1 : Ns(u), u = u & (i.suspendedLanes | l) ? 0 : u, u !== 0 && u !== f.retryLane))
        throw f.retryLane = u, va(t, u), Ft(i, t, u), Ty;
      c.data === "$?" || Zf(), e = Zc(
        t,
        e,
        l
      );
    } else
      c.data === "$?" ? (e.flags |= 192, e.child = t.child, e = null) : (t = f.treeContext, nt = ye(
        c.nextSibling
      ), Ct = e, w = !0, Il = null, pe = !1, t !== null && (ue[ae++] = xe, ue[ae++] = Be, ue[ae++] = Pl, xe = t.id, Be = t.overflow, Pl = e), e = xf(
        e,
        u.children
      ), e.flags |= 4096);
    return e;
  }
  return a ? (ll(), a = u.fallback, c = e.mode, f = t.child, o = f.sibling, u = Ge(f, {
    mode: "hidden",
    children: u.children
  }), u.subtreeFlags = f.subtreeFlags & 65011712, o !== null ? a = Ge(o, a) : (a = kl(
    a,
    c,
    l,
    null
  ), a.flags |= 2), a.return = e, u.return = e, u.sibling = a, e.child = u, u = a, a = e.child, c = t.child.memoizedState, c === null ? c = Gc(l) : (f = c.cachePool, f !== null ? (o = yt._currentValue, f = f.parent !== o ? { parent: o, pool: o } : f) : f = Cd(), c = {
    baseLanes: c.baseLanes | l,
    cachePool: f
  }), a.memoizedState = c, a.childLanes = Xc(
    t,
    i,
    l
  ), e.memoizedState = jc, u) : (el(e), l = t.child, t = l.sibling, l = Ge(l, {
    mode: "visible",
    children: u.children
  }), l.return = e, l.sibling = null, t !== null && (i = e.deletions, i === null ? (e.deletions = [t], e.flags |= 16) : i.push(t)), e.child = l, e.memoizedState = null, l);
}
function xf(t, e) {
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
function Zc(t, e, l) {
  return na(e, t.child, null, l), t = xf(
    e,
    e.pendingProps.children
  ), t.flags |= 2, e.memoizedState = null, t;
}
function Yo(t, e, l) {
  t.lanes |= e;
  var u = t.alternate;
  u !== null && (u.lanes |= e), Tf(t.return, e, l);
}
function wc(t, e, l, u, a) {
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
function _y(t, e, l) {
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
      l = a, l === null ? (a = e.child, e.child = null) : (a = l.sibling, l.sibling = null), wc(
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
      wc(
        e,
        !0,
        l,
        null,
        n
      );
      break;
    case "together":
      wc(e, !1, null, null, void 0);
      break;
    default:
      e.memoizedState = null;
  }
  return e.child;
}
function Ve(t, e, l) {
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
    for (t = e.child, l = Ge(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
      t = t.sibling, l = l.sibling = Ge(t, t.pendingProps), l.return = e;
    l.sibling = null;
  }
  return e.child;
}
function or(t, e) {
  return t.lanes & e ? !0 : (t = t.dependencies, !!(t !== null && Mi(t)));
}
function sg(t, e, l) {
  switch (e.tag) {
    case 3:
      gi(e, e.stateNode.containerInfo), tl(e, yt, t.memoizedState.cache), An();
      break;
    case 27:
    case 5:
      of(e);
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
        return u.dehydrated !== null ? (el(e), e.flags |= 128, null) : l & e.child.childLanes ? Ry(t, e, l) : (el(e), t = Ve(
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
          return _y(
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
      return e.lanes = 0, My(t, e, l);
    case 24:
      tl(e, yt, t.memoizedState.cache);
  }
  return Ve(t, e, l);
}
function Dy(t, e, l) {
  if (t !== null)
    if (t.memoizedProps !== e.pendingProps)
      pt = !0;
    else {
      if (!or(t, l) && !(e.flags & 128))
        return pt = !1, sg(
          t,
          e,
          l
        );
      pt = !!(t.flags & 131072);
    }
  else
    pt = !1, w && e.flags & 1048576 && Ud(e, Ai, e.index);
  switch (e.lanes = 0, e.tag) {
    case 16:
      t: {
        t = e.pendingProps;
        var u = e.elementType, a = u._init;
        if (u = a(u._payload), e.type = u, typeof u == "function")
          Ks(u) ? (t = iu(u, t), e.tag = 1, e = xo(
            null,
            e,
            u,
            t,
            l
          )) : (e.tag = 0, e = Nf(
            null,
            e,
            u,
            t,
            l
          ));
        else {
          if (u != null) {
            if (a = u.$$typeof, a === Cs) {
              e.tag = 11, e = Co(
                null,
                e,
                u,
                t,
                l
              );
              break t;
            } else if (a === Hs) {
              e.tag = 14, e = Ho(
                null,
                e,
                u,
                t,
                l
              );
              break t;
            }
          }
          throw e = sf(u) || u, Error(p(306, e, ""));
        }
      }
      return e;
    case 0:
      return Nf(
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
      ), xo(
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
        a = n.element, _f(t, e), Za(e, u, null, l);
        var i = e.memoizedState;
        if (u = i.cache, tl(e, yt, u), u !== n.cache && Af(
          e,
          [yt],
          l,
          !0
        ), Xa(), u = i.element, n.isDehydrated)
          if (n = {
            element: u,
            isDehydrated: !1,
            cache: i.cache
          }, e.updateQueue.baseState = n, e.memoizedState = n, e.flags & 256) {
            e = Bo(
              t,
              e,
              u,
              l
            );
            break t;
          } else if (u !== a) {
            a = ie(
              Error(p(424)),
              e
            ), Ia(a), e = Bo(
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
            for (nt = ye(t.firstChild), Ct = e, w = !0, Il = null, pe = !0, l = my(
              e,
              null,
              u,
              l
            ), e.child = l; l; )
              l.flags = l.flags & -3 | 4096, l = l.sibling;
          }
        else {
          if (An(), u === a) {
            e = Ve(
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
      return si(t, e), t === null ? (l = eh(
        e.type,
        null,
        e.pendingProps,
        null
      )) ? e.memoizedState = l : w || (l = e.type, t = e.pendingProps, u = Gi(
        Sl.current
      ).createElement(l), u[_t] = e, u[Gt] = t, At(u, l, t), St(u), e.stateNode = u) : e.memoizedState = eh(
        e.type,
        t.memoizedProps,
        e.pendingProps,
        t.memoizedState
      ), null;
    case 27:
      return of(e), t === null && w && (u = e.stateNode = yv(
        e.type,
        e.pendingProps,
        Sl.current
      ), Ct = e, pe = !0, a = nt, ql(e.type) ? (Wf = a, nt = ye(
        u.firstChild
      )) : nt = a), Ot(
        t,
        e,
        e.pendingProps.children,
        l
      ), si(t, e), t === null && (e.flags |= 4194304), e.child;
    case 5:
      return t === null && w && ((a = u = nt) && (u = Bg(
        u,
        e.type,
        e.pendingProps,
        pe
      ), u !== null ? (e.stateNode = u, Ct = e, nt = ye(
        u.firstChild
      ), pe = !1, a = !0) : a = !1), a || uu(e)), of(e), a = e.type, n = e.pendingProps, i = t !== null ? t.memoizedProps : null, u = n.children, Jf(a, n) ? u = null : i !== null && Jf(a, i) && (e.flags |= 32), e.memoizedState !== null && (a = tr(
        t,
        e,
        eg,
        null,
        null,
        l
      ), nn._currentValue = a), si(t, e), Ot(t, e, u, l), e.child;
    case 6:
      return t === null && w && ((t = l = nt) && (l = Yg(
        l,
        e.pendingProps,
        pe
      ), l !== null ? (e.stateNode = l, Ct = e, nt = null, t = !0) : t = !1), t || uu(e)), null;
    case 13:
      return Ry(t, e, l);
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
      return Co(
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
      return a = e.type._context, u = e.pendingProps.children, au(e), a = Dt(a), u = u(a), e.flags |= 1, Ot(t, e, u, l), e.child;
    case 14:
      return Ho(
        t,
        e,
        e.type,
        e.pendingProps,
        l
      );
    case 15:
      return Ay(
        t,
        e,
        e.type,
        e.pendingProps,
        l
      );
    case 19:
      return _y(t, e, l);
    case 31:
      return u = e.pendingProps, l = e.mode, u = {
        mode: u.mode,
        children: u.children
      }, t === null ? (l = Hi(
        u,
        l
      ), l.ref = e.ref, e.child = l, l.return = e, e = l) : (l = Ge(t.child, u), l.ref = e.ref, e.child = l, l.return = e, e = l), e;
    case 22:
      return My(t, e, l);
    case 24:
      return au(e), u = Dt(yt), t === null ? (a = Ws(), a === null && (a = k, n = Fs(), a.pooledCache = n, n.refCount++, n !== null && (a.pooledCacheLanes |= l), a = n), e.memoizedState = {
        parent: u,
        cache: a
      }, ks(e), tl(e, yt, a)) : (t.lanes & l && (_f(t, e), Za(e, null, null, l), Xa()), a = t.memoizedState, n = e.memoizedState, a.parent !== u ? (a = { parent: u, cache: u }, e.memoizedState = a, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = a), tl(e, yt, u)) : (u = n.cache, tl(e, yt, u), u !== a.cache && Af(
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
function jo(t, e) {
  if (e.type !== "stylesheet" || e.state.loading & 4)
    t.flags &= -16777217;
  else if (t.flags |= 16777216, !gv(e)) {
    if (e = se.current, e !== null && ((Z & 4194048) === Z ? Ae !== null : (Z & 62914560) !== Z && !(Z & 536870912) || e !== Ae))
      throw ja = Rf, Hd;
    t.flags |= 8192;
  }
}
function Fn(t, e) {
  e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? td() : 536870912, t.lanes |= e, ia |= e);
}
function Ra(t, e) {
  if (!w)
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
function rg(t, e, l) {
  var u = e.pendingProps;
  switch ($s(e), e.tag) {
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
      return l = e.stateNode, u = null, t !== null && (u = t.memoizedState.cache), e.memoizedState.cache !== u && (e.flags |= 2048), Xe(yt), Iu(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (Aa(e) ? ze(e) : t === null || t.memoizedState.isDehydrated && !(e.flags & 256) || (e.flags |= 1024, vo())), ut(e), null;
    case 26:
      return l = e.memoizedState, t === null ? (ze(e), l !== null ? (ut(e), jo(e, l)) : (ut(e), e.flags &= -16777217)) : l ? l !== t.memoizedState ? (ze(e), ut(e), jo(e, l)) : (ut(e), e.flags &= -16777217) : (t.memoizedProps !== u && ze(e), ut(e), e.flags &= -16777217), null;
    case 27:
      bi(e), l = Sl.current;
      var a = e.type;
      if (t !== null && e.stateNode != null)
        t.memoizedProps !== u && ze(e);
      else {
        if (!u) {
          if (e.stateNode === null)
            throw Error(p(166));
          return ut(e), null;
        }
        t = Oe.current, Aa(e) ? ho(e) : (t = yv(a, u, l), e.stateNode = t, ze(e));
      }
      return ut(e), null;
    case 5:
      if (bi(e), l = e.type, t !== null && e.stateNode != null)
        t.memoizedProps !== u && ze(e);
      else {
        if (!u) {
          if (e.stateNode === null)
            throw Error(p(166));
          return ut(e), null;
        }
        if (t = Oe.current, Aa(e))
          ho(e);
        else {
          switch (a = Gi(
            Sl.current
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
          t[_t] = e, t[Gt] = u;
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
        if (t = Sl.current, Aa(e)) {
          if (t = e.stateNode, l = e.memoizedProps, u = null, a = Ct, a !== null)
            switch (a.tag) {
              case 27:
              case 5:
                u = a.memoizedProps;
            }
          t[_t] = e, t = !!(t.nodeValue === l || u !== null && u.suppressHydrationWarning === !0 || ov(t.nodeValue, l)), t || uu(e);
        } else
          t = Gi(t).createTextNode(
            u
          ), t[_t] = e, e.stateNode = t;
      }
      return ut(e), null;
    case 13:
      if (u = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
        if (a = Aa(e), u !== null && u.dehydrated !== null) {
          if (t === null) {
            if (!a) throw Error(p(318));
            if (a = e.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(p(317));
            a[_t] = e;
          } else
            An(), !(e.flags & 128) && (e.memoizedState = null), e.flags |= 4;
          ut(e), a = !1;
        } else
          a = vo(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), a = !0;
        if (!a)
          return e.flags & 256 ? (je(e), e) : (je(e), null);
      }
      if (je(e), e.flags & 128)
        return e.lanes = l, e;
      if (l = u !== null, t = t !== null && t.memoizedState !== null, l) {
        u = e.child, a = null, u.alternate !== null && u.alternate.memoizedState !== null && u.alternate.memoizedState.cachePool !== null && (a = u.alternate.memoizedState.cachePool.pool);
        var n = null;
        u.memoizedState !== null && u.memoizedState.cachePool !== null && (n = u.memoizedState.cachePool.pool), n !== a && (u.flags |= 2048);
      }
      return l !== t && l && (e.child.flags |= 8192), Fn(e, e.updateQueue), ut(e), null;
    case 4:
      return Iu(), t === null && Sr(e.stateNode.containerInfo), ut(e), null;
    case 10:
      return Xe(e.type), ut(e), null;
    case 19:
      if (Et(vt), a = e.memoizedState, a === null) return ut(e), null;
      if (u = (e.flags & 128) !== 0, n = a.rendering, n === null)
        if (u) Ra(a, !1);
        else {
          if (it !== 0 || t !== null && t.flags & 128)
            for (t = e.child; t !== null; ) {
              if (n = Ui(t), n !== null) {
                for (e.flags |= 128, Ra(a, !1), t = n.updateQueue, e.updateQueue = t, Fn(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                  zd(l, t), l = l.sibling;
                return lt(
                  vt,
                  vt.current & 1 | 2
                ), e.child;
              }
              t = t.sibling;
            }
          a.tail !== null && Te() > Ni && (e.flags |= 128, u = !0, Ra(a, !1), e.lanes = 4194304);
        }
      else {
        if (!u)
          if (t = Ui(n), t !== null) {
            if (e.flags |= 128, u = !0, t = t.updateQueue, e.updateQueue = t, Fn(e, t), Ra(a, !0), a.tail === null && a.tailMode === "hidden" && !n.alternate && !w)
              return ut(e), null;
          } else
            2 * Te() - a.renderingStartTime > Ni && l !== 536870912 && (e.flags |= 128, u = !0, Ra(a, !1), e.lanes = 4194304);
        a.isBackwards ? (n.sibling = e.child, e.child = n) : (t = a.last, t !== null ? t.sibling = n : e.child = n, a.last = n);
      }
      return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = Te(), e.sibling = null, t = vt.current, lt(vt, u ? t & 1 | 2 : t & 1), e) : (ut(e), null);
    case 22:
    case 23:
      return je(e), Ps(), u = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== u && (e.flags |= 8192) : u && (e.flags |= 8192), u ? l & 536870912 && !(e.flags & 128) && (ut(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : ut(e), l = e.updateQueue, l !== null && Fn(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), u = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (u = e.memoizedState.cachePool.pool), u !== l && (e.flags |= 2048), t !== null && Et(tu), null;
    case 24:
      return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), Xe(yt), ut(e), null;
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(p(156, e.tag));
}
function og(t, e) {
  switch ($s(e), e.tag) {
    case 1:
      return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 3:
      return Xe(yt), Iu(), t = e.flags, t & 65536 && !(t & 128) ? (e.flags = t & -65537 | 128, e) : null;
    case 26:
    case 27:
    case 5:
      return bi(e), null;
    case 13:
      if (je(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
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
      return Xe(e.type), null;
    case 22:
    case 23:
      return je(e), Ps(), t !== null && Et(tu), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 24:
      return Xe(yt), null;
    case 25:
      return null;
    default:
      return null;
  }
}
function zy(t, e) {
  switch ($s(e), e.tag) {
    case 3:
      Xe(yt), Iu();
      break;
    case 26:
    case 27:
    case 5:
      bi(e);
      break;
    case 4:
      Iu();
      break;
    case 13:
      je(e);
      break;
    case 19:
      Et(vt);
      break;
    case 10:
      Xe(e.type);
      break;
    case 22:
    case 23:
      je(e), Ps(), t !== null && Et(tu);
      break;
    case 24:
      Xe(yt);
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
function Uy(t) {
  var e = t.updateQueue;
  if (e !== null) {
    var l = t.stateNode;
    try {
      xd(e, l);
    } catch (u) {
      W(t, t.return, u);
    }
  }
}
function Qy(t, e, l) {
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
function Ee(t, e) {
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
function Cy(t) {
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
function Lc(t, e, l) {
  try {
    var u = t.stateNode;
    Cg(u, t.type, l, e), u[Gt] = e;
  } catch (a) {
    W(t, t.return, a);
  }
}
function Hy(t) {
  return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ql(t.type) || t.tag === 4;
}
function Vc(t) {
  t: for (; ; ) {
    for (; t.sibling === null; ) {
      if (t.return === null || Hy(t.return)) return null;
      t = t.return;
    }
    for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
      if (t.tag === 27 && ql(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
      t.child.return = t, t = t.child;
    }
    if (!(t.flags & 2)) return t.stateNode;
  }
}
function Bf(t, e, l) {
  var u = t.tag;
  if (u === 5 || u === 6)
    t = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(t, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(t), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = oc));
  else if (u !== 4 && (u === 27 && ql(t.type) && (l = t.stateNode, e = null), t = t.child, t !== null))
    for (Bf(t, e, l), t = t.sibling; t !== null; )
      Bf(t, e, l), t = t.sibling;
}
function qi(t, e, l) {
  var u = t.tag;
  if (u === 5 || u === 6)
    t = t.stateNode, e ? l.insertBefore(t, e) : l.appendChild(t);
  else if (u !== 4 && (u === 27 && ql(t.type) && (l = t.stateNode), t = t.child, t !== null))
    for (qi(t, e, l), t = t.sibling; t !== null; )
      qi(t, e, l), t = t.sibling;
}
function qy(t) {
  var e = t.stateNode, l = t.memoizedProps;
  try {
    for (var u = t.type, a = e.attributes; a.length; )
      e.removeAttributeNode(a[0]);
    At(e, u, l), e[_t] = t, e[Gt] = l;
  } catch (n) {
    W(t, t.return, n);
  }
}
var qe = !1, st = !1, Kc = !1, Go = typeof WeakSet == "function" ? WeakSet : Set, bt = null;
function hg(t, e) {
  if (t = t.containerInfo, Vf = Li, t = Ed(t), ws(t)) {
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
  for (Kf = { focusedElem: t, selectionRange: l }, Li = !1, bt = e; bt !== null; )
    if (e = bt, t = e.child, (e.subtreeFlags & 1024) !== 0 && t !== null)
      t.return = e, bt = t;
    else
      for (; bt !== null; ) {
        switch (e = bt, n = e.alternate, t = e.flags, e.tag) {
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
              } catch (S) {
                W(
                  l,
                  l.return,
                  S
                );
              }
            }
            break;
          case 3:
            if (t & 1024) {
              if (t = e.stateNode.containerInfo, l = t.nodeType, l === 9)
                $f(t);
              else if (l === 1)
                switch (t.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    $f(t);
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
          t.return = e.return, bt = t;
          break;
        }
        bt = e.return;
      }
}
function Ny(t, e, l) {
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
      u & 64 && Uy(l), u & 512 && La(l, l.return);
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
          xd(t, e);
        } catch (i) {
          W(l, l.return, i);
        }
      }
      break;
    case 27:
      e === null && u & 4 && qy(l);
    case 26:
    case 5:
      Fe(t, l), e === null && u & 4 && Cy(l), u & 512 && La(l, l.return);
      break;
    case 12:
      Fe(t, l);
      break;
    case 13:
      Fe(t, l), u & 4 && Yy(t, l), u & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = Eg.bind(
        null,
        l
      ), jg(t, l))));
      break;
    case 22:
      if (u = l.memoizedState !== null || qe, !u) {
        e = e !== null && e.memoizedState !== null || st, a = qe;
        var n = st;
        qe = u, (st = e) && !n ? We(
          t,
          l,
          (l.subtreeFlags & 8772) !== 0
        ) : Fe(t, l), qe = a, st = n;
      }
      break;
    case 30:
      break;
    default:
      Fe(t, l);
  }
}
function xy(t) {
  var e = t.alternate;
  e !== null && (t.alternate = null, xy(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Bs(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
}
var tt = null, Yt = !1;
function Ue(t, e, l) {
  for (l = l.child; l !== null; )
    By(t, e, l), l = l.sibling;
}
function By(t, e, l) {
  if (Kt && typeof Kt.onCommitFiberUnmount == "function")
    try {
      Kt.onCommitFiberUnmount(Sn, l);
    } catch {
    }
  switch (l.tag) {
    case 26:
      st || Ee(l, e), Ue(
        t,
        e,
        l
      ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
      break;
    case 27:
      st || Ee(l, e);
      var u = tt, a = Yt;
      ql(l.type) && (tt = l.stateNode, Yt = !1), Ue(
        t,
        e,
        l
      ), $a(l.stateNode), tt = u, Yt = a;
      break;
    case 5:
      st || Ee(l, e);
    case 6:
      if (u = tt, a = Yt, tt = null, Ue(
        t,
        e,
        l
      ), tt = u, Yt = a, tt !== null)
        if (Yt)
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
      tt !== null && (Yt ? (t = tt, Po(
        t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
        l.stateNode
      ), sn(t)) : Po(tt, l.stateNode));
      break;
    case 4:
      u = tt, a = Yt, tt = l.stateNode.containerInfo, Yt = !0, Ue(
        t,
        e,
        l
      ), tt = u, Yt = a;
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
      st || (Ee(l, e), u = l.stateNode, typeof u.componentWillUnmount == "function" && Qy(
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
function Yy(t, e) {
  if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
    try {
      sn(t);
    } catch (l) {
      W(e, e.return, l);
    }
}
function dg(t) {
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
function Jc(t, e) {
  var l = dg(t);
  e.forEach(function(u) {
    var a = Og.bind(null, t, u);
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
            if (ql(c.type)) {
              tt = c.stateNode, Yt = !1;
              break t;
            }
            break;
          case 5:
            tt = c.stateNode, Yt = !1;
            break t;
          case 3:
          case 4:
            tt = c.stateNode.containerInfo, Yt = !0;
            break t;
        }
        c = c.return;
      }
      if (tt === null) throw Error(p(160));
      By(n, i, a), tt = null, Yt = !1, n = a.alternate, n !== null && (n.return = null), a.return = null;
    }
  if (e.subtreeFlags & 13878)
    for (e = e.child; e !== null; )
      jy(e, t), e = e.sibling;
}
var de = null;
function jy(t, e) {
  var l = t.alternate, u = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      Zt(e, t), wt(t), u & 4 && (zl(3, t, t.return), Un(3, t), zl(5, t, t.return));
      break;
    case 1:
      Zt(e, t), wt(t), u & 512 && (st || l === null || Ee(l, l.return)), u & 64 && qe && (t = t.updateQueue, t !== null && (u = t.callbacks, u !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? u : l.concat(u))));
      break;
    case 26:
      var a = de;
      if (Zt(e, t), wt(t), u & 512 && (st || l === null || Ee(l, l.return)), u & 4) {
        var n = l !== null ? l.memoizedState : null;
        if (u = t.memoizedState, l === null)
          if (u === null)
            if (t.stateNode === null) {
              t: {
                u = t.type, l = t.memoizedProps, a = a.ownerDocument || a;
                e: switch (u) {
                  case "title":
                    n = a.getElementsByTagName("title")[0], (!n || n[On] || n[_t] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = a.createElement(u), a.head.insertBefore(
                      n,
                      a.querySelector("head > title")
                    )), At(n, u, l), n[_t] = t, St(n), u = n;
                    break t;
                  case "link":
                    var i = uh(
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
                    if (i = uh(
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
                n[_t] = t, St(n), u = n;
              }
              t.stateNode = u;
            } else
              ah(
                a,
                t.type,
                t.stateNode
              );
          else
            t.stateNode = lh(
              a,
              u,
              t.memoizedProps
            );
        else
          n !== u ? (n === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : n.count--, u === null ? ah(
            a,
            t.type,
            t.stateNode
          ) : lh(
            a,
            u,
            t.memoizedProps
          )) : u === null && t.stateNode !== null && Lc(
            t,
            t.memoizedProps,
            l.memoizedProps
          );
      }
      break;
    case 27:
      Zt(e, t), wt(t), u & 512 && (st || l === null || Ee(l, l.return)), l !== null && u & 4 && Lc(
        t,
        t.memoizedProps,
        l.memoizedProps
      );
      break;
    case 5:
      if (Zt(e, t), wt(t), u & 512 && (st || l === null || Ee(l, l.return)), t.flags & 32) {
        a = t.stateNode;
        try {
          ea(a, "");
        } catch (y) {
          W(t, t.return, y);
        }
      }
      u & 4 && t.stateNode != null && (a = t.memoizedProps, Lc(
        t,
        a,
        l !== null ? l.memoizedProps : a
      )), u & 1024 && (Kc = !0);
      break;
    case 6:
      if (Zt(e, t), wt(t), u & 4) {
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
      if (hi = null, a = de, de = Xi(e.containerInfo), Zt(e, t), de = a, wt(t), u & 4 && l !== null && l.memoizedState.isDehydrated)
        try {
          sn(e.containerInfo);
        } catch (y) {
          W(t, t.return, y);
        }
      Kc && (Kc = !1, Gy(t));
      break;
    case 4:
      u = de, de = Xi(
        t.stateNode.containerInfo
      ), Zt(e, t), wt(t), de = u;
      break;
    case 12:
      Zt(e, t), wt(t);
      break;
    case 13:
      Zt(e, t), wt(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (mr = Te()), u & 4 && (u = t.updateQueue, u !== null && (t.updateQueue = null, Jc(t, u)));
      break;
    case 22:
      a = t.memoizedState !== null;
      var f = l !== null && l.memoizedState !== null, o = qe, g = st;
      if (qe = o || a, st = g || f, Zt(e, t), st = g, qe = o, wt(t), u & 8192)
        t: for (e = t.stateNode, e._visibility = a ? e._visibility & -2 : e._visibility | 1, a && (l === null || f || qe || st || Gl(t)), l = null, e = t; ; ) {
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
      u & 4 && (u = t.updateQueue, u !== null && (l = u.retryQueue, l !== null && (u.retryQueue = null, Jc(t, l))));
      break;
    case 19:
      Zt(e, t), wt(t), u & 4 && (u = t.updateQueue, u !== null && (t.updateQueue = null, Jc(t, u)));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      Zt(e, t), wt(t);
  }
}
function wt(t) {
  var e = t.flags;
  if (e & 2) {
    try {
      for (var l, u = t.return; u !== null; ) {
        if (Hy(u)) {
          l = u;
          break;
        }
        u = u.return;
      }
      if (l == null) throw Error(p(160));
      switch (l.tag) {
        case 27:
          var a = l.stateNode, n = Vc(t);
          qi(t, n, a);
          break;
        case 5:
          var i = l.stateNode;
          l.flags & 32 && (ea(i, ""), l.flags &= -33);
          var c = Vc(t);
          qi(t, c, i);
          break;
        case 3:
        case 4:
          var f = l.stateNode.containerInfo, o = Vc(t);
          Bf(
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
function Gy(t) {
  if (t.subtreeFlags & 1024)
    for (t = t.child; t !== null; ) {
      var e = t;
      Gy(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
    }
}
function Fe(t, e) {
  if (e.subtreeFlags & 8772)
    for (e = e.child; e !== null; )
      Ny(t, e.alternate, e), e = e.sibling;
}
function Gl(t) {
  for (t = t.child; t !== null; ) {
    var e = t;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        zl(4, e, e.return), Gl(e);
        break;
      case 1:
        Ee(e, e.return);
        var l = e.stateNode;
        typeof l.componentWillUnmount == "function" && Qy(
          e,
          e.return,
          l
        ), Gl(e);
        break;
      case 27:
        $a(e.stateNode);
      case 26:
      case 5:
        Ee(e, e.return), Gl(e);
        break;
      case 22:
        e.memoizedState === null && Gl(e);
        break;
      case 30:
        Gl(e);
        break;
      default:
        Gl(e);
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
                Nd(f[a], c);
          } catch (o) {
            W(u, u.return, o);
          }
        }
        l && i & 64 && Uy(n), La(n, n.return);
        break;
      case 27:
        qy(n);
      case 26:
      case 5:
        We(
          a,
          n,
          l
        ), l && u === null && i & 4 && Cy(n), La(n, n.return);
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
        ), l && i & 4 && Yy(a, n);
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
function hr(t, e) {
  var l = null;
  t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && Rn(l));
}
function dr(t, e) {
  t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Rn(t));
}
function me(t, e, l, u) {
  if (e.subtreeFlags & 10256)
    for (e = e.child; e !== null; )
      Xy(
        t,
        e,
        l,
        u
      ), e = e.sibling;
}
function Xy(t, e, l, u) {
  var a = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 15:
      me(
        t,
        e,
        l,
        u
      ), a & 2048 && Un(9, e);
      break;
    case 1:
      me(
        t,
        e,
        l,
        u
      );
      break;
    case 3:
      me(
        t,
        e,
        l,
        u
      ), a & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Rn(t)));
      break;
    case 12:
      if (a & 2048) {
        me(
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
        me(
          t,
          e,
          l,
          u
        );
      break;
    case 13:
      me(
        t,
        e,
        l,
        u
      );
      break;
    case 23:
      break;
    case 22:
      n = e.stateNode, i = e.alternate, e.memoizedState !== null ? n._visibility & 2 ? me(
        t,
        e,
        l,
        u
      ) : Va(t, e) : n._visibility & 2 ? me(
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
      )), a & 2048 && hr(i, e);
      break;
    case 24:
      me(
        t,
        e,
        l,
        u
      ), a & 2048 && dr(e.alternate, e);
      break;
    default:
      me(
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
        ) : Va(
          n,
          i
        ) : (g._visibility |= 2, mu(
          n,
          i,
          c,
          f,
          a
        )), a && o & 2048 && hr(
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
        ), a && o & 2048 && dr(i.alternate, i);
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
function Va(t, e) {
  if (e.subtreeFlags & 10256)
    for (e = e.child; e !== null; ) {
      var l = t, u = e, a = u.flags;
      switch (u.tag) {
        case 22:
          Va(l, u), a & 2048 && hr(
            u.alternate,
            u
          );
          break;
        case 24:
          Va(l, u), a & 2048 && dr(u.alternate, u);
          break;
        default:
          Va(l, u);
      }
      e = e.sibling;
    }
}
var Ca = 8192;
function hu(t) {
  if (t.subtreeFlags & Ca)
    for (t = t.child; t !== null; )
      Zy(t), t = t.sibling;
}
function Zy(t) {
  switch (t.tag) {
    case 26:
      hu(t), t.flags & Ca && t.memoizedState !== null && Pg(
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
      de = Xi(t.stateNode.containerInfo), hu(t), de = e;
      break;
    case 22:
      t.memoizedState === null && (e = t.alternate, e !== null && e.memoizedState !== null ? (e = Ca, Ca = 16777216, hu(t), Ca = e) : hu(t));
      break;
    default:
      hu(t);
  }
}
function wy(t) {
  var e = t.alternate;
  if (e !== null && (t = e.child, t !== null)) {
    e.child = null;
    do
      e = t.sibling, t.sibling = null, t = e;
    while (t !== null);
  }
}
function _a(t) {
  var e = t.deletions;
  if (t.flags & 16) {
    if (e !== null)
      for (var l = 0; l < e.length; l++) {
        var u = e[l];
        bt = u, Vy(
          u,
          t
        );
      }
    wy(t);
  }
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; )
      Ly(t), t = t.sibling;
}
function Ly(t) {
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      _a(t), t.flags & 2048 && zl(9, t, t.return);
      break;
    case 3:
      _a(t);
      break;
    case 12:
      _a(t);
      break;
    case 22:
      var e = t.stateNode;
      t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, ri(t)) : _a(t);
      break;
    default:
      _a(t);
  }
}
function ri(t) {
  var e = t.deletions;
  if (t.flags & 16) {
    if (e !== null)
      for (var l = 0; l < e.length; l++) {
        var u = e[l];
        bt = u, Vy(
          u,
          t
        );
      }
    wy(t);
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
function Vy(t, e) {
  for (; bt !== null; ) {
    var l = bt;
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
    if (u = l.child, u !== null) u.return = l, bt = u;
    else
      t: for (l = t; bt !== null; ) {
        u = bt;
        var a = u.sibling, n = u.return;
        if (xy(u), u === l) {
          bt = null;
          break t;
        }
        if (a !== null) {
          a.return = n, bt = a;
          break t;
        }
        bt = n;
      }
  }
}
var yg = {
  getCacheForType: function(t) {
    var e = Dt(yt), l = e.data.get(t);
    return l === void 0 && (l = t(), e.data.set(t, l)), l;
  }
}, vg = typeof WeakMap == "function" ? WeakMap : Map, J = 0, k = null, G = null, Z = 0, K = 0, Lt = null, gl = !1, ma = !1, yr = !1, Ke = 0, it = 0, Ul = 0, eu = 0, vr = 0, ce = 0, ia = 0, Ka = null, jt = null, Yf = !1, mr = 0, Ni = 1 / 0, xi = null, Ol = null, Tt = 0, Tl = null, ca = null, Bu = 0, jf = 0, Gf = null, Ky = null, Ja = 0, Xf = null;
function $t() {
  if (J & 2 && Z !== 0)
    return Z & -Z;
  if (C.T !== null) {
    var t = la;
    return t !== 0 ? t : br();
  }
  return ud();
}
function Jy() {
  ce === 0 && (ce = !(Z & 536870912) || w ? Ih() : 536870912);
  var t = se.current;
  return t !== null && (t.flags |= 32), ce;
}
function Ft(t, e, l) {
  (t === k && (K === 2 || K === 9) || t.cancelPendingCommit !== null) && (fa(t, 0), bl(
    t,
    Z,
    ce,
    !1
  )), En(t, l), (!(J & 2) || t !== k) && (t === k && (!(J & 2) && (eu |= l), it === 4 && bl(
    t,
    Z,
    ce,
    !1
  )), Re(t));
}
function $y(t, e, l) {
  if (J & 6) throw Error(p(327));
  var u = !l && (e & 124) === 0 && (e & t.expiredLanes) === 0 || pn(t, e), a = u ? bg(t, e) : $c(t, e, !0), n = u;
  do {
    if (a === 0) {
      ma && !u && bl(t, e, 0, !1);
      break;
    } else {
      if (l = t.current.alternate, n && !mg(l)) {
        a = $c(t, e, !1), n = !1;
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
            a = Ka;
            var f = c.current.memoizedState.isDehydrated;
            if (f && (fa(c, i).flags |= 256), i = $c(
              c,
              i,
              !1
            ), i !== 2) {
              if (yr && !f) {
                c.errorRecoveryDisabledLanes |= n, eu |= n, a = 4;
                break t;
              }
              n = jt, jt = a, n !== null && (jt === null ? jt = n : jt.push.apply(
                jt,
                n
              ));
            }
            a = i;
          }
          if (n = !1, a !== 2) continue;
        }
      }
      if (a === 1) {
        fa(t, 0), bl(t, e, 0, !0);
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
            bl(
              u,
              e,
              ce,
              !gl
            );
            break t;
          case 2:
            jt = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(p(329));
        }
        if ((e & 62914560) === e && (a = mr + 300 - Te(), 10 < a)) {
          if (bl(
            u,
            e,
            ce,
            !gl
          ), Pi(u, 0, !0) !== 0) break t;
          u.timeoutHandle = dv(
            Xo.bind(
              null,
              u,
              l,
              jt,
              xi,
              Yf,
              e,
              ce,
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
        Xo(
          u,
          l,
          jt,
          xi,
          Yf,
          e,
          ce,
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
  Re(t);
}
function Xo(t, e, l, u, a, n, i, c, f, o, g, v, s, y) {
  if (t.timeoutHandle = -1, v = e.subtreeFlags, (v & 8192 || (v & 16785408) === 16785408) && (an = { stylesheets: null, count: 0, unsuspend: kg }, Zy(e), v = Ig(), v !== null)) {
    t.cancelPendingCommit = v(
      wo.bind(
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
    ), bl(t, n, i, !o);
    return;
  }
  wo(
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
function mg(t) {
  for (var e = t; ; ) {
    var l = e.tag;
    if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
      for (var u = 0; u < l.length; u++) {
        var a = l[u], n = a.getSnapshot;
        a = a.value;
        try {
          if (!Wt(n(), a)) return !1;
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
function bl(t, e, l, u) {
  e &= ~vr, e &= ~eu, t.suspendedLanes |= e, t.pingedLanes &= ~e, u && (t.warmLanes |= e), u = t.expirationTimes;
  for (var a = e; 0 < a; ) {
    var n = 31 - Jt(a), i = 1 << n;
    u[n] = -1, a &= ~i;
  }
  l !== 0 && ed(t, l, e);
}
function fc() {
  return J & 6 ? !0 : (Qn(0), !1);
}
function gr() {
  if (G !== null) {
    if (K === 0)
      var t = G.return;
    else
      t = G, Ye = ru = null, ur(t), xu = null, en = 0, t = G;
    for (; t !== null; )
      zy(t.alternate, t), t = t.return;
    G = null;
  }
}
function fa(t, e) {
  var l = t.timeoutHandle;
  l !== -1 && (t.timeoutHandle = -1, qg(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), gr(), k = t, G = l = Ge(t.current, null), Z = e, K = 0, Lt = null, gl = !1, ma = pn(t, e), yr = !1, ia = ce = vr = eu = Ul = it = 0, jt = Ka = null, Yf = !1, e & 8 && (e |= e & 32);
  var u = t.entangledLanes;
  if (u !== 0)
    for (t = t.entanglements, u &= e; 0 < u; ) {
      var a = 31 - Jt(u), n = 1 << a;
      e |= t[a], u &= ~n;
    }
  return Ke = e, lc(), l;
}
function Fy(t, e) {
  x = null, C.H = zi, e === _n || e === ac ? (e = So(), K = 3) : e === Hd ? (e = So(), K = 4) : K = e === Ty ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Lt = e, G === null && (it = 1, Ci(
    t,
    ie(e, t.current)
  ));
}
function Wy() {
  var t = C.H;
  return C.H = zi, t === null ? zi : t;
}
function ky() {
  var t = C.A;
  return C.A = yg, t;
}
function Zf() {
  it = 4, gl || (Z & 4194048) !== Z && se.current !== null || (ma = !0), !(Ul & 134217727) && !(eu & 134217727) || k === null || bl(
    k,
    Z,
    ce,
    !1
  );
}
function $c(t, e, l) {
  var u = J;
  J |= 2;
  var a = Wy(), n = ky();
  (k !== t || Z !== e) && (xi = null, fa(t, e)), e = !1;
  var i = it;
  t: do
    try {
      if (K !== 0 && G !== null) {
        var c = G, f = Lt;
        switch (K) {
          case 8:
            gr(), i = 6;
            break t;
          case 3:
          case 2:
          case 9:
          case 6:
            se.current === null && (e = !0);
            var o = K;
            if (K = 0, Lt = null, zu(t, c, f, o), l && ma) {
              i = 0;
              break t;
            }
            break;
          default:
            o = K, K = 0, Lt = null, zu(t, c, f, o);
        }
      }
      gg(), i = it;
      break;
    } catch (g) {
      Fy(t, g);
    }
  while (!0);
  return e && t.shellSuspendCounter++, Ye = ru = null, J = u, C.H = a, C.A = n, G === null && (k = null, Z = 0, lc()), i;
}
function gg() {
  for (; G !== null; ) Py(G);
}
function bg(t, e) {
  var l = J;
  J |= 2;
  var u = Wy(), a = ky();
  k !== t || Z !== e ? (xi = null, Ni = Te() + 500, fa(t, e)) : ma = pn(
    t,
    e
  );
  t: do
    try {
      if (K !== 0 && G !== null) {
        e = G;
        var n = Lt;
        e: switch (K) {
          case 1:
            K = 0, Lt = null, zu(t, e, n, 1);
            break;
          case 2:
          case 9:
            if (bo(n)) {
              K = 0, Lt = null, Zo(e);
              break;
            }
            e = function() {
              K !== 2 && K !== 9 || k !== t || (K = 7), Re(t);
            }, n.then(e, e);
            break t;
          case 3:
            K = 7;
            break t;
          case 4:
            K = 5;
            break t;
          case 7:
            bo(n) ? (K = 0, Lt = null, Zo(e)) : (K = 0, Lt = null, zu(t, e, n, 7));
            break;
          case 5:
            var i = null;
            switch (G.tag) {
              case 26:
                i = G.memoizedState;
              case 5:
              case 27:
                var c = G;
                if (!i || gv(i)) {
                  K = 0, Lt = null;
                  var f = c.sibling;
                  if (f !== null) G = f;
                  else {
                    var o = c.return;
                    o !== null ? (G = o, sc(o)) : G = null;
                  }
                  break e;
                }
            }
            K = 0, Lt = null, zu(t, e, n, 5);
            break;
          case 6:
            K = 0, Lt = null, zu(t, e, n, 6);
            break;
          case 8:
            gr(), it = 6;
            break t;
          default:
            throw Error(p(462));
        }
      }
      Sg();
      break;
    } catch (g) {
      Fy(t, g);
    }
  while (!0);
  return Ye = ru = null, C.H = u, C.A = a, J = l, G !== null ? 0 : (k = null, Z = 0, lc(), it);
}
function Sg() {
  for (; G !== null && !X0(); )
    Py(G);
}
function Py(t) {
  var e = Dy(t.alternate, t, Ke);
  t.memoizedProps = t.pendingProps, e === null ? sc(t) : G = e;
}
function Zo(t) {
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
        Z
      );
      break;
    case 11:
      e = No(
        l,
        e,
        e.pendingProps,
        e.type.render,
        e.ref,
        Z
      );
      break;
    case 5:
      ur(e);
    default:
      zy(l, e), e = G = zd(e, Ke), e = Dy(l, e, Ke);
  }
  t.memoizedProps = t.pendingProps, e === null ? sc(t) : G = e;
}
function zu(t, e, l, u) {
  Ye = ru = null, ur(e), xu = null, en = 0;
  var a = e.return;
  try {
    if (fg(
      t,
      a,
      e,
      l,
      Z
    )) {
      it = 1, Ci(
        t,
        ie(l, t.current)
      ), G = null;
      return;
    }
  } catch (n) {
    if (a !== null) throw G = a, n;
    it = 1, Ci(
      t,
      ie(l, t.current)
    ), G = null;
    return;
  }
  e.flags & 32768 ? (w || u === 1 ? t = !0 : ma || Z & 536870912 ? t = !1 : (gl = t = !0, (u === 2 || u === 9 || u === 3 || u === 6) && (u = se.current, u !== null && u.tag === 13 && (u.flags |= 16384))), Iy(e, t)) : sc(e);
}
function sc(t) {
  var e = t;
  do {
    if (e.flags & 32768) {
      Iy(
        e,
        gl
      );
      return;
    }
    t = e.return;
    var l = rg(
      e.alternate,
      e,
      Ke
    );
    if (l !== null) {
      G = l;
      return;
    }
    if (e = e.sibling, e !== null) {
      G = e;
      return;
    }
    G = e = t;
  } while (e !== null);
  it === 0 && (it = 5);
}
function Iy(t, e) {
  do {
    var l = og(t.alternate, t);
    if (l !== null) {
      l.flags &= 32767, G = l;
      return;
    }
    if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
      G = t;
      return;
    }
    G = t = l;
  } while (t !== null);
  it = 6, G = null;
}
function wo(t, e, l, u, a, n, i, c, f) {
  t.cancelPendingCommit = null;
  do
    rc();
  while (Tt !== 0);
  if (J & 6) throw Error(p(327));
  if (e !== null) {
    if (e === t.current) throw Error(p(177));
    if (n = e.lanes | e.childLanes, n |= Ls, k0(
      t,
      l,
      n,
      i,
      c,
      f
    ), t === k && (G = k = null, Z = 0), ca = e, Tl = t, Bu = l, jf = n, Gf = a, Ky = u, e.subtreeFlags & 10256 || e.flags & 10256 ? (t.callbackNode = null, t.callbackPriority = 0, Tg(Si, function() {
      return av(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), u = (e.flags & 13878) !== 0, e.subtreeFlags & 13878 || u) {
      u = C.T, C.T = null, a = L.p, L.p = 2, i = J, J |= 4;
      try {
        hg(t, e, l);
      } finally {
        J = i, L.p = a, C.T = u;
      }
    }
    Tt = 1, tv(), ev(), lv();
  }
}
function tv() {
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
        jy(e, t);
        var n = Kf, i = Ed(t.containerInfo), c = n.focusedElem, f = n.selectionRange;
        if (i !== c && c && c.ownerDocument && pd(
          c.ownerDocument.documentElement,
          c
        )) {
          if (f !== null && ws(c)) {
            var o = f.start, g = f.end;
            if (g === void 0 && (g = o), "selectionStart" in c)
              c.selectionStart = o, c.selectionEnd = Math.min(
                g,
                c.value.length
              );
            else {
              var v = c.ownerDocument || document, s = v && v.defaultView || window;
              if (s.getSelection) {
                var y = s.getSelection(), E = c.textContent.length, S = Math.min(f.start, E), O = f.end === void 0 ? S : Math.min(f.end, E);
                !y.extend && S > O && (i = O, O = S, S = i);
                var d = so(
                  c,
                  S
                ), h = so(
                  c,
                  O
                );
                if (d && h && (y.rangeCount !== 1 || y.anchorNode !== d.node || y.anchorOffset !== d.offset || y.focusNode !== h.node || y.focusOffset !== h.offset)) {
                  var m = v.createRange();
                  m.setStart(d.node, d.offset), y.removeAllRanges(), S > O ? (y.addRange(m), y.extend(h.node, h.offset)) : (m.setEnd(h.node, h.offset), y.addRange(m));
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
            var b = v[c];
            b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
          }
        }
        Li = !!Vf, Kf = Vf = null;
      } finally {
        J = a, L.p = u, C.T = l;
      }
    }
    t.current = e, Tt = 2;
  }
}
function ev() {
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
        Ny(t, e.alternate, e);
      } finally {
        J = a, L.p = u, C.T = l;
      }
    }
    Tt = 3;
  }
}
function lv() {
  if (Tt === 4 || Tt === 3) {
    Tt = 0, Z0();
    var t = Tl, e = ca, l = Bu, u = Ky;
    e.subtreeFlags & 10256 || e.flags & 10256 ? Tt = 5 : (Tt = 0, ca = Tl = null, uv(t, t.pendingLanes));
    var a = t.pendingLanes;
    if (a === 0 && (Ol = null), xs(l), e = e.stateNode, Kt && typeof Kt.onCommitFiberRoot == "function")
      try {
        Kt.onCommitFiberRoot(
          Sn,
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
    Bu & 3 && rc(), Re(t), a = t.pendingLanes, l & 4194090 && a & 42 ? t === Xf ? Ja++ : (Ja = 0, Xf = t) : Ja = 0, Qn(0);
  }
}
function uv(t, e) {
  (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Rn(e)));
}
function rc(t) {
  return tv(), ev(), lv(), av();
}
function av() {
  if (Tt !== 5) return !1;
  var t = Tl, e = jf;
  jf = 0;
  var l = xs(Bu), u = C.T, a = L.p;
  try {
    L.p = 32 > l ? 32 : l, C.T = null, l = Gf, Gf = null;
    var n = Tl, i = Bu;
    if (Tt = 0, ca = Tl = null, Bu = 0, J & 6) throw Error(p(331));
    var c = J;
    if (J |= 4, Ly(n.current), Xy(
      n,
      n.current,
      i,
      l
    ), J = c, Qn(0, !1), Kt && typeof Kt.onPostCommitFiberRoot == "function")
      try {
        Kt.onPostCommitFiberRoot(Sn, n);
      } catch {
      }
    return !0;
  } finally {
    L.p = a, C.T = u, uv(t, e);
  }
}
function Lo(t, e, l) {
  e = ie(l, e), e = qf(t.stateNode, e, 2), t = El(t, e, 2), t !== null && (En(t, 2), Re(t));
}
function W(t, e, l) {
  if (t.tag === 3)
    Lo(t, t, l);
  else
    for (; e !== null; ) {
      if (e.tag === 3) {
        Lo(
          e,
          t,
          l
        );
        break;
      } else if (e.tag === 1) {
        var u = e.stateNode;
        if (typeof e.type.getDerivedStateFromError == "function" || typeof u.componentDidCatch == "function" && (Ol === null || !Ol.has(u))) {
          t = ie(l, t), l = Ey(2), u = El(e, l, 2), u !== null && (Oy(
            l,
            u,
            e,
            t
          ), En(u, 2), Re(u));
          break;
        }
      }
      e = e.return;
    }
}
function Fc(t, e, l) {
  var u = t.pingCache;
  if (u === null) {
    u = t.pingCache = new vg();
    var a = /* @__PURE__ */ new Set();
    u.set(e, a);
  } else
    a = u.get(e), a === void 0 && (a = /* @__PURE__ */ new Set(), u.set(e, a));
  a.has(l) || (yr = !0, a.add(l), t = pg.bind(null, t, e, l), e.then(t, t));
}
function pg(t, e, l) {
  var u = t.pingCache;
  u !== null && u.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, k === t && (Z & l) === l && (it === 4 || it === 3 && (Z & 62914560) === Z && 300 > Te() - mr ? !(J & 2) && fa(t, 0) : vr |= l, ia === Z && (ia = 0)), Re(t);
}
function nv(t, e) {
  e === 0 && (e = td()), t = va(t, e), t !== null && (En(t, e), Re(t));
}
function Eg(t) {
  var e = t.memoizedState, l = 0;
  e !== null && (l = e.retryLane), nv(t, l);
}
function Og(t, e) {
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
  u !== null && u.delete(e), nv(t, l);
}
function Tg(t, e) {
  return qs(t, e);
}
var Bi = null, gu = null, wf = !1, Yi = !1, Wc = !1, lu = 0;
function Re(t) {
  t !== gu && t.next === null && (gu === null ? Bi = gu = t : gu = gu.next = t), Yi = !0, wf || (wf = !0, Mg());
}
function Qn(t, e) {
  if (!Wc && Yi) {
    Wc = !0;
    do
      for (var l = !1, u = Bi; u !== null; ) {
        if (t !== 0) {
          var a = u.pendingLanes;
          if (a === 0) var n = 0;
          else {
            var i = u.suspendedLanes, c = u.pingedLanes;
            n = (1 << 31 - Jt(42 | t) + 1) - 1, n &= a & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
          }
          n !== 0 && (l = !0, Vo(u, n));
        } else
          n = Z, n = Pi(
            u,
            u === k ? n : 0,
            u.cancelPendingCommit !== null || u.timeoutHandle !== -1
          ), !(n & 3) || pn(u, n) || (l = !0, Vo(u, n));
        u = u.next;
      }
    while (l);
    Wc = !1;
  }
}
function Ag() {
  iv();
}
function iv() {
  Yi = wf = !1;
  var t = 0;
  lu !== 0 && (Hg() && (t = lu), lu = 0);
  for (var e = Te(), l = null, u = Bi; u !== null; ) {
    var a = u.next, n = cv(u, e);
    n === 0 ? (u.next = null, l === null ? Bi = a : l.next = a, a === null && (gu = l)) : (l = u, (t !== 0 || n & 3) && (Yi = !0)), u = a;
  }
  Qn(t);
}
function cv(t, e) {
  for (var l = t.suspendedLanes, u = t.pingedLanes, a = t.expirationTimes, n = t.pendingLanes & -62914561; 0 < n; ) {
    var i = 31 - Jt(n), c = 1 << i, f = a[i];
    f === -1 ? (!(c & l) || c & u) && (a[i] = W0(c, e)) : f <= e && (t.expiredLanes |= c), n &= ~c;
  }
  if (e = k, l = Z, l = Pi(
    t,
    t === e ? l : 0,
    t.cancelPendingCommit !== null || t.timeoutHandle !== -1
  ), u = t.callbackNode, l === 0 || t === e && (K === 2 || K === 9) || t.cancelPendingCommit !== null)
    return u !== null && u !== null && Oc(u), t.callbackNode = null, t.callbackPriority = 0;
  if (!(l & 3) || pn(t, l)) {
    if (e = l & -l, e === t.callbackPriority) return e;
    switch (u !== null && Oc(u), xs(l)) {
      case 2:
      case 8:
        l = kh;
        break;
      case 32:
        l = Si;
        break;
      case 268435456:
        l = Ph;
        break;
      default:
        l = Si;
    }
    return u = fv.bind(null, t), l = qs(l, u), t.callbackPriority = e, t.callbackNode = l, e;
  }
  return u !== null && u !== null && Oc(u), t.callbackPriority = 2, t.callbackNode = null, 2;
}
function fv(t, e) {
  if (Tt !== 0 && Tt !== 5)
    return t.callbackNode = null, t.callbackPriority = 0, null;
  var l = t.callbackNode;
  if (rc() && t.callbackNode !== l)
    return null;
  var u = Z;
  return u = Pi(
    t,
    t === k ? u : 0,
    t.cancelPendingCommit !== null || t.timeoutHandle !== -1
  ), u === 0 ? null : ($y(t, u, e), cv(t, Te()), t.callbackNode != null && t.callbackNode === l ? fv.bind(null, t) : null);
}
function Vo(t, e) {
  if (rc()) return null;
  $y(t, e, !0);
}
function Mg() {
  Ng(function() {
    J & 6 ? qs(
      Wh,
      Ag
    ) : iv();
  });
}
function br() {
  return lu === 0 && (lu = Ih()), lu;
}
function Ko(t) {
  return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : li("" + t);
}
function Jo(t, e) {
  var l = e.ownerDocument.createElement("input");
  return l.name = e.name, l.value = e.value, t.id && l.setAttribute("form", t.id), e.parentNode.insertBefore(l, e), t = new FormData(t), l.parentNode.removeChild(l), t;
}
function Rg(t, e, l, u, a) {
  if (e === "submit" && l && l.stateNode === a) {
    var n = Ko(
      (a[Gt] || null).action
    ), i = u.submitter;
    i && (e = (e = i[Gt] || null) ? Ko(e.formAction) : i.getAttribute("formAction"), e !== null && (n = e, i = null));
    var c = new Ii(
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
                var f = i ? Jo(a, i) : new FormData(a);
                Cf(
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
              typeof n == "function" && (c.preventDefault(), f = i ? Jo(a, i) : new FormData(a), Cf(
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
for (var kc = 0; kc < pf.length; kc++) {
  var Pc = pf[kc], _g = Pc.toLowerCase(), Dg = Pc[0].toUpperCase() + Pc.slice(1);
  ve(
    _g,
    "on" + Dg
  );
}
ve(Td, "onAnimationEnd");
ve(Ad, "onAnimationIteration");
ve(Md, "onAnimationStart");
ve("dblclick", "onDoubleClick");
ve("focusin", "onFocus");
ve("focusout", "onBlur");
ve(Vm, "onTransitionRun");
ve(Km, "onTransitionStart");
ve(Jm, "onTransitionCancel");
ve(Rd, "onTransitionEnd");
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
), zg = new Set(
  "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ln)
);
function sv(t, e) {
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
function j(t, e) {
  var l = e[df];
  l === void 0 && (l = e[df] = /* @__PURE__ */ new Set());
  var u = t + "__bubble";
  l.has(u) || (rv(e, t, 2, !1), l.add(u));
}
function Ic(t, e, l) {
  var u = 0;
  e && (u |= 4), rv(
    l,
    t,
    u,
    e
  );
}
var Wn = "_reactListening" + Math.random().toString(36).slice(2);
function Sr(t) {
  if (!t[Wn]) {
    t[Wn] = !0, ad.forEach(function(l) {
      l !== "selectionchange" && (zg.has(l) || Ic(l, !1, t), Ic(l, !0, t));
    });
    var e = t.nodeType === 9 ? t : t.ownerDocument;
    e === null || e[Wn] || (e[Wn] = !0, Ic("selectionchange", !1, e));
  }
}
function rv(t, e, l, u) {
  switch (Ov(e)) {
    case 2:
      var a = l1;
      break;
    case 8:
      a = u1;
      break;
    default:
      a = Tr;
  }
  l = a.bind(
    null,
    e,
    l,
    t
  ), a = void 0, !gf || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (a = !0), u ? a !== void 0 ? t.addEventListener(e, l, {
    capture: !0,
    passive: a
  }) : t.addEventListener(e, l, !0) : a !== void 0 ? t.addEventListener(e, l, {
    passive: a
  }) : t.addEventListener(e, l, !1);
}
function tf(t, e, l, u, a) {
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
  hd(function() {
    var o = n, g = js(l), v = [];
    t: {
      var s = _d.get(t);
      if (s !== void 0) {
        var y = Ii, E = t;
        switch (t) {
          case "keypress":
            if (ai(l) === 0) break t;
          case "keydown":
          case "keyup":
            y = Tm;
            break;
          case "focusin":
            E = "focus", y = Uc;
            break;
          case "focusout":
            E = "blur", y = Uc;
            break;
          case "beforeblur":
          case "afterblur":
            y = Uc;
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
            y = Ir;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = om;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Rm;
            break;
          case Td:
          case Ad:
          case Md:
            y = ym;
            break;
          case Rd:
            y = Dm;
            break;
          case "scroll":
          case "scrollend":
            y = sm;
            break;
          case "wheel":
            y = Um;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = mm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = eo;
            break;
          case "toggle":
          case "beforetoggle":
            y = Cm;
        }
        var S = (e & 4) !== 0, O = !S && (t === "scroll" || t === "scrollend"), d = S ? s !== null ? s + "Capture" : null : s;
        S = [];
        for (var h = o, m; h !== null; ) {
          var b = h;
          if (m = b.stateNode, b = b.tag, b !== 5 && b !== 26 && b !== 27 || m === null || d === null || (b = Wa(h, d), b != null && S.push(
            un(h, b, m)
          )), O) break;
          h = h.return;
        }
        0 < S.length && (s = new y(
          s,
          E,
          null,
          l,
          g
        ), v.push({ event: s, listeners: S }));
      }
    }
    if (!(e & 7)) {
      t: {
        if (s = t === "mouseover" || t === "pointerover", y = t === "mouseout" || t === "pointerout", s && l !== mf && (E = l.relatedTarget || l.fromElement) && (pu(E) || E[da]))
          break t;
        if ((y || s) && (s = g.window === g ? g : (s = g.ownerDocument) ? s.defaultView || s.parentWindow : window, y ? (E = l.relatedTarget || l.toElement, y = o, E = E ? pu(E) : null, E !== null && (O = bn(E), S = E.tag, E !== O || S !== 5 && S !== 27 && S !== 6) && (E = null)) : (y = null, E = o), y !== E)) {
          if (S = Ir, b = "onMouseLeave", d = "onMouseEnter", h = "mouse", (t === "pointerout" || t === "pointerover") && (S = eo, b = "onPointerLeave", d = "onPointerEnter", h = "pointer"), O = y == null ? s : Qa(y), m = E == null ? s : Qa(E), s = new S(
            b,
            h + "leave",
            y,
            l,
            g
          ), s.target = O, s.relatedTarget = m, b = null, pu(g) === o && (S = new S(
            d,
            h + "enter",
            E,
            l,
            g
          ), S.target = m, S.relatedTarget = O, b = S), O = b, y && E)
            e: {
              for (S = y, d = E, h = 0, m = S; m; m = du(m))
                h++;
              for (m = 0, b = d; b; b = du(b))
                m++;
              for (; 0 < h - m; )
                S = du(S), h--;
              for (; 0 < m - h; )
                d = du(d), m--;
              for (; h--; ) {
                if (S === d || d !== null && S === d.alternate)
                  break e;
                S = du(S), d = du(d);
              }
              S = null;
            }
          else S = null;
          y !== null && $o(
            v,
            s,
            y,
            S,
            !1
          ), E !== null && O !== null && $o(
            v,
            O,
            E,
            S,
            !0
          );
        }
      }
      t: {
        if (s = o ? Qa(o) : window, y = s.nodeName && s.nodeName.toLowerCase(), y === "select" || y === "input" && s.type === "file")
          var T = no;
        else if (ao(s))
          if (bd)
            T = Zm;
          else {
            T = Gm;
            var z = jm;
          }
        else
          y = s.nodeName, !y || y.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? o && Ys(o.elementType) && (T = no) : T = Xm;
        if (T && (T = T(t, o))) {
          gd(
            v,
            T,
            l,
            g
          );
          break t;
        }
        z && z(t, s, o), t === "focusout" && o && s.type === "number" && o.memoizedProps.value != null && vf(s, "number", s.value);
      }
      switch (z = o ? Qa(o) : window, t) {
        case "focusin":
          (ao(z) || z.contentEditable === "true") && (Tu = z, bf = o, Ba = null);
          break;
        case "focusout":
          Ba = bf = Tu = null;
          break;
        case "mousedown":
          Sf = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Sf = !1, ro(v, l, g);
          break;
        case "selectionchange":
          if (Lm) break;
        case "keydown":
        case "keyup":
          ro(v, l, g);
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
        Ou ? vd(t, l) && (R = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (R = "onCompositionStart");
      R && (yd && l.locale !== "ko" && (Ou || R !== "onCompositionStart" ? R === "onCompositionEnd" && Ou && (M = dd()) : (ml = g, Gs = "value" in ml ? ml.value : ml.textContent, Ou = !0)), z = ji(o, R), 0 < z.length && (R = new to(
        R,
        t,
        null,
        l,
        g
      ), v.push({ event: R, listeners: z }), M ? R.data = M : (M = md(l), M !== null && (R.data = M)))), (M = qm ? Nm(t, l) : xm(t, l)) && (R = ji(o, "onBeforeInput"), 0 < R.length && (z = new to(
        "onBeforeInput",
        "beforeinput",
        null,
        l,
        g
      ), v.push({
        event: z,
        listeners: R
      }), z.data = M)), Rg(
        v,
        t,
        o,
        l,
        g
      );
    }
    sv(v, e);
  });
}
function un(t, e, l) {
  return {
    instance: t,
    listener: e,
    currentTarget: l
  };
}
function ji(t, e) {
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
function $o(t, e, l, u, a) {
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
var Ug = /\r\n?/g, Qg = /\u0000|\uFFFD/g;
function Fo(t) {
  return (typeof t == "string" ? t : "" + t).replace(Ug, `
`).replace(Qg, "");
}
function ov(t, e) {
  return e = Fo(e), Fo(t) === e;
}
function oc() {
}
function $(t, e, l, u, a, n) {
  switch (l) {
    case "children":
      typeof u == "string" ? e === "body" || e === "textarea" && u === "" || ea(t, u) : (typeof u == "number" || typeof u == "bigint") && e !== "body" && ea(t, "" + u);
      break;
    case "className":
      wn(t, "class", u);
      break;
    case "tabIndex":
      wn(t, "tabindex", u);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      wn(t, l, u);
      break;
    case "style":
      od(t, u, n);
      break;
    case "data":
      if (e !== "object") {
        wn(t, "data", u);
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
      u != null && (t.onclick = oc);
      break;
    case "onScroll":
      u != null && j("scroll", t);
      break;
    case "onScrollEnd":
      u != null && j("scrollend", t);
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
      j("beforetoggle", t), j("toggle", t), ei(t, "popover", u);
      break;
    case "xlinkActuate":
      De(
        t,
        "http://www.w3.org/1999/xlink",
        "xlink:actuate",
        u
      );
      break;
    case "xlinkArcrole":
      De(
        t,
        "http://www.w3.org/1999/xlink",
        "xlink:arcrole",
        u
      );
      break;
    case "xlinkRole":
      De(
        t,
        "http://www.w3.org/1999/xlink",
        "xlink:role",
        u
      );
      break;
    case "xlinkShow":
      De(
        t,
        "http://www.w3.org/1999/xlink",
        "xlink:show",
        u
      );
      break;
    case "xlinkTitle":
      De(
        t,
        "http://www.w3.org/1999/xlink",
        "xlink:title",
        u
      );
      break;
    case "xlinkType":
      De(
        t,
        "http://www.w3.org/1999/xlink",
        "xlink:type",
        u
      );
      break;
    case "xmlBase":
      De(
        t,
        "http://www.w3.org/XML/1998/namespace",
        "xml:base",
        u
      );
      break;
    case "xmlLang":
      De(
        t,
        "http://www.w3.org/XML/1998/namespace",
        "xml:lang",
        u
      );
      break;
    case "xmlSpace":
      De(
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
      (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = cm.get(l) || l, ei(t, l, u));
  }
}
function Lf(t, e, l, u, a, n) {
  switch (l) {
    case "style":
      od(t, u, n);
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
      u != null && j("scroll", t);
      break;
    case "onScrollEnd":
      u != null && j("scrollend", t);
      break;
    case "onClick":
      u != null && (t.onclick = oc);
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
      if (!nd.hasOwnProperty(l))
        t: {
          if (l[0] === "o" && l[1] === "n" && (a = l.endsWith("Capture"), e = l.slice(2, a ? l.length - 7 : void 0), n = t[Gt] || null, n = n != null ? n[l] : null, typeof n == "function" && t.removeEventListener(e, n, a), typeof u == "function")) {
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
      j("error", t), j("load", t);
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
      j("invalid", t);
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
      fd(
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
      j("invalid", t), u = i = n = null;
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
      j("invalid", t), n = a = u = null;
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
      rd(t, u, a, n), pi(t);
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
      j("beforetoggle", t), j("toggle", t), j("cancel", t), j("close", t);
      break;
    case "iframe":
    case "object":
      j("load", t);
      break;
    case "video":
    case "audio":
      for (u = 0; u < ln.length; u++)
        j(ln[u], t);
      break;
    case "image":
      j("error", t), j("load", t);
      break;
    case "details":
      j("toggle", t);
      break;
    case "embed":
    case "source":
    case "link":
      j("error", t), j("load", t);
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
      if (Ys(e)) {
        for (g in l)
          l.hasOwnProperty(g) && (u = l[g], u !== void 0 && Lf(
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
function Cg(t, e, l, u) {
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
      yf(
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
      sd(t, s, y);
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
      for (var S in l)
        s = l[S], l.hasOwnProperty(S) && s != null && !u.hasOwnProperty(S) && $(t, e, S, null, u, s);
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
      if (Ys(e)) {
        for (var O in l)
          s = l[O], l.hasOwnProperty(O) && s !== void 0 && !u.hasOwnProperty(O) && Lf(
            t,
            e,
            O,
            void 0,
            u,
            s
          );
        for (g in u)
          s = u[g], y = l[g], !u.hasOwnProperty(g) || s === y || s === void 0 && y === void 0 || Lf(
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
var Vf = null, Kf = null;
function Gi(t) {
  return t.nodeType === 9 ? t : t.ownerDocument;
}
function Wo(t) {
  switch (t) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function hv(t, e) {
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
function Jf(t, e) {
  return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
}
var ef = null;
function Hg() {
  var t = window.event;
  return t && t.type === "popstate" ? t === ef ? !1 : (ef = t, !0) : (ef = null, !1);
}
var dv = typeof setTimeout == "function" ? setTimeout : void 0, qg = typeof clearTimeout == "function" ? clearTimeout : void 0, ko = typeof Promise == "function" ? Promise : void 0, Ng = typeof queueMicrotask == "function" ? queueMicrotask : typeof ko < "u" ? function(t) {
  return ko.resolve(null).then(t).catch(xg);
} : dv;
function xg(t) {
  setTimeout(function() {
    throw t;
  });
}
function ql(t) {
  return t === "head";
}
function Po(t, e) {
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
function $f(t) {
  var e = t.firstChild;
  for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
    var l = e;
    switch (e = e.nextSibling, l.nodeName) {
      case "HTML":
      case "HEAD":
      case "BODY":
        $f(l), Bs(l);
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
function Bg(t, e, l, u) {
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
function Yg(t, e, l) {
  if (e === "") return null;
  for (; t.nodeType !== 3; )
    if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = ye(t.nextSibling), t === null)) return null;
  return t;
}
function Ff(t) {
  return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState === "complete";
}
function jg(t, e) {
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
var Wf = null;
function Io(t) {
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
function yv(t, e, l) {
  switch (e = Gi(l), t) {
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
var re = /* @__PURE__ */ new Map(), th = /* @__PURE__ */ new Set();
function Xi(t) {
  return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
}
var Je = L.d;
L.d = {
  f: Gg,
  r: Xg,
  D: Zg,
  C: wg,
  L: Lg,
  m: Vg,
  X: Jg,
  S: Kg,
  M: $g
};
function Gg() {
  var t = Je.f(), e = fc();
  return t || e;
}
function Xg(t) {
  var e = ya(t);
  e !== null && e.tag === 5 && e.type === "form" ? cy(e) : Je.r(t);
}
var ga = typeof document > "u" ? null : document;
function vv(t, e, l) {
  var u = ga;
  if (u && typeof e == "string" && e) {
    var a = ne(e);
    a = 'link[rel="' + t + '"][href="' + a + '"]', typeof l == "string" && (a += '[crossorigin="' + l + '"]'), th.has(a) || (th.add(a), t = { rel: t, crossOrigin: l, href: e }, u.querySelector(a) === null && (e = u.createElement("link"), At(e, "link", t), St(e), u.head.appendChild(e)));
  }
}
function Zg(t) {
  Je.D(t), vv("dns-prefetch", t, null);
}
function wg(t, e) {
  Je.C(t, e), vv("preconnect", t, e);
}
function Lg(t, e, l) {
  Je.L(t, e, l);
  var u = ga;
  if (u && t && e) {
    var a = 'link[rel="preload"][as="' + ne(e) + '"]';
    e === "image" && l && l.imageSrcSet ? (a += '[imagesrcset="' + ne(
      l.imageSrcSet
    ) + '"]', typeof l.imageSizes == "string" && (a += '[imagesizes="' + ne(
      l.imageSizes
    ) + '"]')) : a += '[href="' + ne(t) + '"]';
    var n = a;
    switch (e) {
      case "style":
        n = sa(t);
        break;
      case "script":
        n = ba(t);
    }
    re.has(n) || (t = I(
      {
        rel: "preload",
        href: e === "image" && l && l.imageSrcSet ? void 0 : t,
        as: e
      },
      l
    ), re.set(n, t), u.querySelector(a) !== null || e === "style" && u.querySelector(Cn(n)) || e === "script" && u.querySelector(Hn(n)) || (e = u.createElement("link"), At(e, "link", t), St(e), u.head.appendChild(e)));
  }
}
function Vg(t, e) {
  Je.m(t, e);
  var l = ga;
  if (l && t) {
    var u = e && typeof e.as == "string" ? e.as : "script", a = 'link[rel="modulepreload"][as="' + ne(u) + '"][href="' + ne(t) + '"]', n = a;
    switch (u) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        n = ba(t);
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
      u = l.createElement("link"), At(u, "link", t), St(u), l.head.appendChild(u);
    }
  }
}
function Kg(t, e, l) {
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
        ), (l = re.get(n)) && pr(t, l);
        var f = i = u.createElement("link");
        St(f), At(f, "link", t), f._p = new Promise(function(o, g) {
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
function Jg(t, e) {
  Je.X(t, e);
  var l = ga;
  if (l && t) {
    var u = Uu(l).hoistableScripts, a = ba(t), n = u.get(a);
    n || (n = l.querySelector(Hn(a)), n || (t = I({ src: t, async: !0 }, e), (e = re.get(a)) && Er(t, e), n = l.createElement("script"), St(n), At(n, "link", t), l.head.appendChild(n)), n = {
      type: "script",
      instance: n,
      count: 1,
      state: null
    }, u.set(a, n));
  }
}
function $g(t, e) {
  Je.M(t, e);
  var l = ga;
  if (l && t) {
    var u = Uu(l).hoistableScripts, a = ba(t), n = u.get(a);
    n || (n = l.querySelector(Hn(a)), n || (t = I({ src: t, async: !0, type: "module" }, e), (e = re.get(a)) && Er(t, e), n = l.createElement("script"), St(n), At(n, "link", t), l.head.appendChild(n)), n = {
      type: "script",
      instance: n,
      count: 1,
      state: null
    }, u.set(a, n));
  }
}
function eh(t, e, l, u) {
  var a = (a = Sl.current) ? Xi(a) : null;
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
        }, re.set(t, l), n || Fg(
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
      return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = ba(l), l = Uu(
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
  return 'href="' + ne(t) + '"';
}
function Cn(t) {
  return 'link[rel="stylesheet"][' + t + "]";
}
function mv(t) {
  return I({}, t, {
    "data-precedence": t.precedence,
    precedence: null
  });
}
function Fg(t, e, l, u) {
  t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? u.loading = 1 : (e = t.createElement("link"), u.preload = e, e.addEventListener("load", function() {
    return u.loading |= 1;
  }), e.addEventListener("error", function() {
    return u.loading |= 2;
  }), At(e, "link", l), St(e), t.head.appendChild(e));
}
function ba(t) {
  return '[src="' + ne(t) + '"]';
}
function Hn(t) {
  return "script[async]" + t;
}
function lh(t, e, l) {
  if (e.count++, e.instance === null)
    switch (e.type) {
      case "style":
        var u = t.querySelector(
          'style[data-href~="' + ne(l.href) + '"]'
        );
        if (u)
          return e.instance = u, St(u), u;
        var a = I({}, l, {
          "data-href": l.href,
          "data-precedence": l.precedence,
          href: null,
          precedence: null
        });
        return u = (t.ownerDocument || t).createElement(
          "style"
        ), St(u), At(u, "style", a), oi(u, l.precedence, t), e.instance = u;
      case "stylesheet":
        a = sa(l.href);
        var n = t.querySelector(
          Cn(a)
        );
        if (n)
          return e.state.loading |= 4, e.instance = n, St(n), n;
        u = mv(l), (a = re.get(a)) && pr(u, a), n = (t.ownerDocument || t).createElement("link"), St(n);
        var i = n;
        return i._p = new Promise(function(c, f) {
          i.onload = c, i.onerror = f;
        }), At(n, "link", u), e.state.loading |= 4, oi(n, l.precedence, t), e.instance = n;
      case "script":
        return n = ba(l.src), (a = t.querySelector(
          Hn(n)
        )) ? (e.instance = a, St(a), a) : (u = l, (a = re.get(n)) && (u = I({}, l), Er(u, a)), t = t.ownerDocument || t, a = t.createElement("script"), St(a), At(a, "link", u), t.head.appendChild(a), e.instance = a);
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
function pr(t, e) {
  t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
}
function Er(t, e) {
  t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
}
var hi = null;
function uh(t, e, l) {
  if (hi === null) {
    var u = /* @__PURE__ */ new Map(), a = hi = /* @__PURE__ */ new Map();
    a.set(l, u);
  } else
    a = hi, u = a.get(l), u || (u = /* @__PURE__ */ new Map(), a.set(l, u));
  if (u.has(t)) return u;
  for (u.set(t, null), l = l.getElementsByTagName(t), a = 0; a < l.length; a++) {
    var n = l[a];
    if (!(n[On] || n[_t] || t === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
      var i = n.getAttribute(e) || "";
      i = t + i;
      var c = u.get(i);
      c ? c.push(n) : u.set(i, [n]);
    }
  }
  return u;
}
function ah(t, e, l) {
  t = t.ownerDocument || t, t.head.insertBefore(
    l,
    e === "title" ? t.querySelector("head > title") : null
  );
}
function Wg(t, e, l) {
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
function gv(t) {
  return !(t.type === "stylesheet" && !(t.state.loading & 3));
}
var an = null;
function kg() {
}
function Pg(t, e, l) {
  if (an === null) throw Error(p(475));
  var u = an;
  if (e.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && !(e.state.loading & 4)) {
    if (e.instance === null) {
      var a = sa(l.href), n = t.querySelector(
        Cn(a)
      );
      if (n) {
        t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (u.count++, u = Zi.bind(u), t.then(u, u)), e.state.loading |= 4, e.instance = n, St(n);
        return;
      }
      n = t.ownerDocument || t, l = mv(l), (a = re.get(a)) && pr(l, a), n = n.createElement("link"), St(n);
      var i = n;
      i._p = new Promise(function(c, f) {
        i.onload = c, i.onerror = f;
      }), At(n, "link", l), e.instance = n;
    }
    u.stylesheets === null && (u.stylesheets = /* @__PURE__ */ new Map()), u.stylesheets.set(e, t), (t = e.state.preload) && !(e.state.loading & 3) && (u.count++, e = Zi.bind(u), t.addEventListener("load", e), t.addEventListener("error", e));
  }
}
function Ig() {
  if (an === null) throw Error(p(475));
  var t = an;
  return t.stylesheets && t.count === 0 && kf(t, t.stylesheets), 0 < t.count ? function(e) {
    var l = setTimeout(function() {
      if (t.stylesheets && kf(t, t.stylesheets), t.unsuspend) {
        var u = t.unsuspend;
        t.unsuspend = null, u();
      }
    }, 6e4);
    return t.unsuspend = e, function() {
      t.unsuspend = null, clearTimeout(l);
    };
  } : null;
}
function Zi() {
  if (this.count--, this.count === 0) {
    if (this.stylesheets) kf(this, this.stylesheets);
    else if (this.unsuspend) {
      var t = this.unsuspend;
      this.unsuspend = null, t();
    }
  }
}
var wi = null;
function kf(t, e) {
  t.stylesheets = null, t.unsuspend !== null && (t.count++, wi = /* @__PURE__ */ new Map(), e.forEach(t1, t), wi = null, Zi.call(t));
}
function t1(t, e) {
  if (!(e.state.loading & 4)) {
    var l = wi.get(t);
    if (l) var u = l.get(null);
    else {
      l = /* @__PURE__ */ new Map(), wi.set(t, l);
      for (var a = t.querySelectorAll(
        "link[data-precedence],style[data-precedence]"
      ), n = 0; n < a.length; n++) {
        var i = a[n];
        (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (l.set(i.dataset.precedence, i), u = i);
      }
      u && l.set(null, u);
    }
    a = e.instance, i = a.getAttribute("data-precedence"), n = l.get(i) || u, n === u && l.set(null, a), l.set(i, a), this.count++, u = Zi.bind(this), a.addEventListener("load", u), a.addEventListener("error", u), n ? n.parentNode.insertBefore(a, n.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(a, t.firstChild)), e.state.loading |= 4;
  }
}
var nn = {
  $$typeof: Ne,
  Provider: null,
  Consumer: null,
  _currentValue: Wl,
  _currentValue2: Wl,
  _threadCount: 0
};
function e1(t, e, l, u, a, n, i, c) {
  this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Tc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Tc(0), this.hiddenUpdates = Tc(null), this.identifierPrefix = u, this.onUncaughtError = a, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
}
function bv(t, e, l, u, a, n, i, c, f, o, g, v) {
  return t = new e1(
    t,
    e,
    l,
    i,
    c,
    f,
    o,
    v
  ), e = 1, n === !0 && (e |= 24), n = Vt(3, null, null, e), t.current = n, n.stateNode = t, e = Fs(), e.refCount++, t.pooledCache = e, e.refCount++, n.memoizedState = {
    element: u,
    isDehydrated: l,
    cache: e
  }, ks(n), t;
}
function Sv(t) {
  return t ? (t = Ru, t) : Ru;
}
function pv(t, e, l, u, a, n) {
  a = Sv(a), u.context === null ? u.context = a : u.pendingContext = a, u = pl(e), u.payload = { element: l }, n = n === void 0 ? null : n, n !== null && (u.callback = n), l = El(t, u, e), l !== null && (Ft(l, t, e), Ga(l, t, e));
}
function nh(t, e) {
  if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
    var l = t.retryLane;
    t.retryLane = l !== 0 && l < e ? l : e;
  }
}
function Or(t, e) {
  nh(t, e), (t = t.alternate) && nh(t, e);
}
function Ev(t) {
  if (t.tag === 13) {
    var e = va(t, 67108864);
    e !== null && Ft(e, t, 67108864), Or(t, 67108864);
  }
}
var Li = !0;
function l1(t, e, l, u) {
  var a = C.T;
  C.T = null;
  var n = L.p;
  try {
    L.p = 2, Tr(t, e, l, u);
  } finally {
    L.p = n, C.T = a;
  }
}
function u1(t, e, l, u) {
  var a = C.T;
  C.T = null;
  var n = L.p;
  try {
    L.p = 8, Tr(t, e, l, u);
  } finally {
    L.p = n, C.T = a;
  }
}
function Tr(t, e, l, u) {
  if (Li) {
    var a = Pf(u);
    if (a === null)
      tf(
        t,
        e,
        u,
        Vi,
        l
      ), ih(t, u);
    else if (n1(
      a,
      t,
      e,
      l,
      u
    ))
      u.stopPropagation();
    else if (ih(t, u), e & 4 && -1 < a1.indexOf(t)) {
      for (; a !== null; ) {
        var n = ya(a);
        if (n !== null)
          switch (n.tag) {
            case 3:
              if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                var i = Yl(n.pendingLanes);
                if (i !== 0) {
                  var c = n;
                  for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                    var f = 1 << 31 - Jt(i);
                    c.entanglements[1] |= f, i &= ~f;
                  }
                  Re(n), !(J & 6) && (Ni = Te() + 500, Qn(0));
                }
              }
              break;
            case 13:
              c = va(n, 2), c !== null && Ft(c, n, 2), fc(), Or(n, 2);
          }
        if (n = Pf(u), n === null && tf(
          t,
          e,
          u,
          Vi,
          l
        ), n === a) break;
        a = n;
      }
      a !== null && u.stopPropagation();
    } else
      tf(
        t,
        e,
        u,
        null,
        l
      );
  }
}
function Pf(t) {
  return t = js(t), Ar(t);
}
var Vi = null;
function Ar(t) {
  if (Vi = null, t = pu(t), t !== null) {
    var e = bn(t);
    if (e === null) t = null;
    else {
      var l = e.tag;
      if (l === 13) {
        if (t = Kh(e), t !== null) return t;
        t = null;
      } else if (l === 3) {
        if (e.stateNode.current.memoizedState.isDehydrated)
          return e.tag === 3 ? e.stateNode.containerInfo : null;
        t = null;
      } else e !== t && (t = null);
    }
  }
  return Vi = t, null;
}
function Ov(t) {
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
      switch (w0()) {
        case Wh:
          return 2;
        case kh:
          return 8;
        case Si:
        case L0:
          return 32;
        case Ph:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var If = !1, Al = null, Ml = null, Rl = null, cn = /* @__PURE__ */ new Map(), fn = /* @__PURE__ */ new Map(), ul = [], a1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
  " "
);
function ih(t, e) {
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
function Da(t, e, l, u, a, n) {
  return t === null || t.nativeEvent !== n ? (t = {
    blockedOn: e,
    domEventName: l,
    eventSystemFlags: u,
    nativeEvent: n,
    targetContainers: [a]
  }, e !== null && (e = ya(e), e !== null && Ev(e)), t) : (t.eventSystemFlags |= u, e = t.targetContainers, a !== null && e.indexOf(a) === -1 && e.push(a), t);
}
function n1(t, e, l, u, a) {
  switch (e) {
    case "focusin":
      return Al = Da(
        Al,
        t,
        e,
        l,
        u,
        a
      ), !0;
    case "dragenter":
      return Ml = Da(
        Ml,
        t,
        e,
        l,
        u,
        a
      ), !0;
    case "mouseover":
      return Rl = Da(
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
        Da(
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
        Da(
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
function Tv(t) {
  var e = pu(t.target);
  if (e !== null) {
    var l = bn(e);
    if (l !== null) {
      if (e = l.tag, e === 13) {
        if (e = Kh(l), e !== null) {
          t.blockedOn = e, P0(t.priority, function() {
            if (l.tag === 13) {
              var u = $t();
              u = Ns(u);
              var a = va(l, u);
              a !== null && Ft(a, l, u), Or(l, u);
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
    var l = Pf(t.nativeEvent);
    if (l === null) {
      l = t.nativeEvent;
      var u = new l.constructor(
        l.type,
        l
      );
      mf = u, l.target.dispatchEvent(u), mf = null;
    } else
      return e = ya(l), e !== null && Ev(e), t.blockedOn = l, !1;
    e.shift();
  }
  return !0;
}
function ch(t, e, l) {
  di(t) && l.delete(e);
}
function i1() {
  If = !1, Al !== null && di(Al) && (Al = null), Ml !== null && di(Ml) && (Ml = null), Rl !== null && di(Rl) && (Rl = null), cn.forEach(ch), fn.forEach(ch);
}
function kn(t, e) {
  t.blockedOn === e && (t.blockedOn = null, If || (If = !0, mt.unstable_scheduleCallback(
    mt.unstable_NormalPriority,
    i1
  )));
}
var Pn = null;
function fh(t) {
  Pn !== t && (Pn = t, mt.unstable_scheduleCallback(
    mt.unstable_NormalPriority,
    function() {
      Pn === t && (Pn = null);
      for (var e = 0; e < t.length; e += 3) {
        var l = t[e], u = t[e + 1], a = t[e + 2];
        if (typeof u != "function") {
          if (Ar(u || l) === null)
            continue;
          break;
        }
        var n = ya(l);
        n !== null && (t.splice(e, 3), e -= 3, Cf(
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
    Tv(l), l.blockedOn === null && ul.shift();
  if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
    for (u = 0; u < l.length; u += 3) {
      var a = l[u], n = l[u + 1], i = a[Gt] || null;
      if (typeof n == "function")
        i || fh(l);
      else if (i) {
        var c = null;
        if (n && n.hasAttribute("formAction")) {
          if (a = n, i = n[Gt] || null)
            c = i.formAction;
          else if (Ar(a) !== null) continue;
        } else c = i.action;
        typeof c == "function" ? l[u + 1] = c : (l.splice(u, 3), u -= 3), fh(l);
      }
    }
}
function Mr(t) {
  this._internalRoot = t;
}
hc.prototype.render = Mr.prototype.render = function(t) {
  var e = this._internalRoot;
  if (e === null) throw Error(p(409));
  var l = e.current, u = $t();
  pv(l, u, t, e, null, null);
};
hc.prototype.unmount = Mr.prototype.unmount = function() {
  var t = this._internalRoot;
  if (t !== null) {
    this._internalRoot = null;
    var e = t.containerInfo;
    pv(t.current, 2, null, t, null, null), fc(), e[da] = null;
  }
};
function hc(t) {
  this._internalRoot = t;
}
hc.prototype.unstable_scheduleHydration = function(t) {
  if (t) {
    var e = ud();
    t = { blockedOn: null, target: t, priority: e };
    for (var l = 0; l < ul.length && e !== 0 && e < ul[l].priority; l++) ;
    ul.splice(l, 0, t), l === 0 && Tv(t);
  }
};
var sh = Lh.version;
if (sh !== "19.1.1")
  throw Error(
    p(
      527,
      sh,
      "19.1.1"
    )
  );
L.findDOMNode = function(t) {
  var e = t._reactInternals;
  if (e === void 0)
    throw typeof t.render == "function" ? Error(p(188)) : (t = Object.keys(t).join(","), Error(p(268, t)));
  return t = x0(e), t = t !== null ? Jh(t) : null, t = t === null ? null : t.stateNode, t;
};
var c1 = {
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
      Sn = In.inject(
        c1
      ), Kt = In;
    } catch {
    }
}
ki.createRoot = function(t, e) {
  if (!Vh(t)) throw Error(p(299));
  var l = !1, u = "", a = by, n = Sy, i = py, c = null;
  return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (a = e.onUncaughtError), e.onCaughtError !== void 0 && (n = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError), e.unstable_transitionCallbacks !== void 0 && (c = e.unstable_transitionCallbacks)), e = bv(
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
  ), t[da] = e.current, Sr(t), new Mr(e);
};
ki.hydrateRoot = function(t, e, l) {
  if (!Vh(t)) throw Error(p(299));
  var u = !1, a = "", n = by, i = Sy, c = py, f = null, o = null;
  return l != null && (l.unstable_strictMode === !0 && (u = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (n = l.onUncaughtError), l.onCaughtError !== void 0 && (i = l.onCaughtError), l.onRecoverableError !== void 0 && (c = l.onRecoverableError), l.unstable_transitionCallbacks !== void 0 && (f = l.unstable_transitionCallbacks), l.formState !== void 0 && (o = l.formState)), e = bv(
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
  ), e.context = Sv(null), l = e.current, u = $t(), u = Ns(u), a = pl(u), a.callback = null, El(l, a, u), l = u, e.current.lanes = l, En(e, l), Re(e), t[da] = e.current, Sr(t), new hc(e);
};
ki.version = "19.1.1";
function Av() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Av);
    } catch (t) {
      console.error(t);
    }
}
Av(), Xh.exports = ki;
var Rr = Xh.exports;
const f1 = /* @__PURE__ */ Fi(Rr), s1 = /* @__PURE__ */ As({
  __proto__: null,
  default: f1
}, [Rr]);
var ou = class {
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
function r1(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function ts(t) {
  return typeof t == "number" && t >= 0 && t !== 1 / 0;
}
function Mv(t, e) {
  return Math.max(t + (e || 0) - Date.now(), 0);
}
function _l(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function ee(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function es(t, e) {
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
      if (e.queryHash !== _r(i, e.options))
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
function ls(t, e) {
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
function _r(t, e) {
  return ((e == null ? void 0 : e.queryKeyHashFn) || Cl)(t);
}
function Cl(t) {
  return JSON.stringify(
    t,
    (e, l) => us(l) ? Object.keys(l).sort().reduce((u, a) => (u[a] = l[a], u), {}) : l
  );
}
function ra(t, e) {
  return t === e ? !0 : typeof t != typeof e ? !1 : t && e && typeof t == "object" && typeof e == "object" ? Object.keys(e).every((l) => ra(t[l], e[l])) : !1;
}
function qn(t, e) {
  if (t === e)
    return t;
  const l = rh(t) && rh(e);
  if (l || us(t) && us(e)) {
    const u = l ? t : Object.keys(t), a = u.length, n = l ? e : Object.keys(e), i = n.length, c = l ? [] : {}, f = new Set(u);
    let o = 0;
    for (let g = 0; g < i; g++) {
      const v = l ? g : n[g];
      (!l && f.has(v) || l) && t[v] === void 0 && e[v] === void 0 ? (c[v] = void 0, o++) : (c[v] = qn(t[v], e[v]), c[v] === t[v] && t[v] !== void 0 && o++);
    }
    return a === i && o === a ? t : c;
  }
  return e;
}
function Ki(t, e) {
  if (!e || Object.keys(t).length !== Object.keys(e).length)
    return !1;
  for (const l in t)
    if (t[l] !== e[l])
      return !1;
  return !0;
}
function rh(t) {
  return Array.isArray(t) && t.length === Object.keys(t).length;
}
function us(t) {
  if (!oh(t))
    return !1;
  const e = t.constructor;
  if (e === void 0)
    return !0;
  const l = e.prototype;
  return !(!oh(l) || !l.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(t) !== Object.prototype);
}
function oh(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
function o1(t) {
  return new Promise((e) => {
    setTimeout(e, t);
  });
}
function as(t, e, l) {
  return typeof l.structuralSharing == "function" ? l.structuralSharing(t, e) : l.structuralSharing !== !1 ? qn(t, e) : e;
}
function h1(t) {
  return t;
}
function ns(t, e, l = 0) {
  const u = [...t, e];
  return l && u.length > l ? u.slice(1) : u;
}
function d1(t, e, l = 0) {
  const u = [e, ...t];
  return l && u.length > l ? u.slice(0, -1) : u;
}
var dc = Symbol();
function Rv(t, e) {
  return !t.queryFn && (e != null && e.initialPromise) ? () => e.initialPromise : !t.queryFn || t.queryFn === dc ? () => Promise.reject(new Error(`Missing queryFn: '${t.queryHash}'`)) : t.queryFn;
}
function Dr(t, e) {
  return typeof t == "function" ? t(...e) : !!t;
}
var Xl, al, Yu, Sh, y1 = (Sh = class extends ou {
  constructor() {
    super();
    D(this, Xl);
    D(this, al);
    D(this, Yu);
    A(this, Yu, (e) => {
      if (!Ql && window.addEventListener) {
        const l = () => e();
        return window.addEventListener("visibilitychange", l, !1), () => {
          window.removeEventListener("visibilitychange", l);
        };
      }
    });
  }
  onSubscribe() {
    r(this, al) || this.setEventListener(r(this, Yu));
  }
  onUnsubscribe() {
    var e;
    this.hasListeners() || ((e = r(this, al)) == null || e.call(this), A(this, al, void 0));
  }
  setEventListener(e) {
    var l;
    A(this, Yu, e), (l = r(this, al)) == null || l.call(this), A(this, al, e((u) => {
      typeof u == "boolean" ? this.setFocused(u) : this.onFocus();
    }));
  }
  setFocused(e) {
    r(this, Xl) !== e && (A(this, Xl, e), this.onFocus());
  }
  onFocus() {
    const e = this.isFocused();
    this.listeners.forEach((l) => {
      l(e);
    });
  }
  isFocused() {
    var e;
    return typeof r(this, Xl) == "boolean" ? r(this, Xl) : ((e = globalThis.document) == null ? void 0 : e.visibilityState) !== "hidden";
  }
}, Xl = new WeakMap(), al = new WeakMap(), Yu = new WeakMap(), Sh), yc = new y1(), ju, nl, Gu, ph, v1 = (ph = class extends ou {
  constructor() {
    super();
    D(this, ju, !0);
    D(this, nl);
    D(this, Gu);
    A(this, Gu, (e) => {
      if (!Ql && window.addEventListener) {
        const l = () => e(!0), u = () => e(!1);
        return window.addEventListener("online", l, !1), window.addEventListener("offline", u, !1), () => {
          window.removeEventListener("online", l), window.removeEventListener("offline", u);
        };
      }
    });
  }
  onSubscribe() {
    r(this, nl) || this.setEventListener(r(this, Gu));
  }
  onUnsubscribe() {
    var e;
    this.hasListeners() || ((e = r(this, nl)) == null || e.call(this), A(this, nl, void 0));
  }
  setEventListener(e) {
    var l;
    A(this, Gu, e), (l = r(this, nl)) == null || l.call(this), A(this, nl, e(this.setOnline.bind(this)));
  }
  setOnline(e) {
    r(this, ju) !== e && (A(this, ju, e), this.listeners.forEach((u) => {
      u(e);
    }));
  }
  isOnline() {
    return r(this, ju);
  }
}, ju = new WeakMap(), nl = new WeakMap(), Gu = new WeakMap(), ph), rn = new v1();
function is() {
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
function m1(t) {
  var l;
  let e;
  if ((l = t.then((u) => (e = u, u), dt)) == null || l.catch(dt), e !== void 0)
    return { data: e };
}
function g1(t) {
  return Math.min(1e3 * 2 ** t, 3e4);
}
function _v(t) {
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
function Dv(t) {
  let e = !1, l = 0, u = !1, a;
  const n = is(), i = (S) => {
    var O;
    u || (s(new zr(S)), (O = t.abort) == null || O.call(t));
  }, c = () => {
    e = !0;
  }, f = () => {
    e = !1;
  }, o = () => yc.isFocused() && (t.networkMode === "always" || rn.isOnline()) && t.canRun(), g = () => _v(t.networkMode) && t.canRun(), v = (S) => {
    var O;
    u || (u = !0, (O = t.onSuccess) == null || O.call(t, S), a == null || a(), n.resolve(S));
  }, s = (S) => {
    var O;
    u || (u = !0, (O = t.onError) == null || O.call(t, S), a == null || a(), n.reject(S));
  }, y = () => new Promise((S) => {
    var O;
    a = (d) => {
      (u || o()) && S(d);
    }, (O = t.onPause) == null || O.call(t);
  }).then(() => {
    var S;
    a = void 0, u || (S = t.onContinue) == null || S.call(t);
  }), E = () => {
    if (u)
      return;
    let S;
    const O = l === 0 ? t.initialPromise : void 0;
    try {
      S = O ?? t.fn();
    } catch (d) {
      S = Promise.reject(d);
    }
    Promise.resolve(S).then(v).catch((d) => {
      var z;
      if (u)
        return;
      const h = t.retry ?? (Ql ? 0 : 3), m = t.retryDelay ?? g1, b = typeof m == "function" ? m(l, d) : m, T = h === !0 || typeof h == "number" && l < h || typeof h == "function" && h(l, d);
      if (e || !T) {
        s(d);
        return;
      }
      l++, (z = t.onFail) == null || z.call(t, l, d), o1(b).then(() => o() ? void 0 : y()).then(() => {
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
var zv = (t) => setTimeout(t, 0);
function b1() {
  let t = [], e = 0, l = (c) => {
    c();
  }, u = (c) => {
    c();
  }, a = zv;
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
var P = b1(), Zl, Eh, Uv = (Eh = class {
  constructor() {
    D(this, Zl);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(), ts(this.gcTime) && A(this, Zl, setTimeout(() => {
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
    r(this, Zl) && (clearTimeout(r(this, Zl)), A(this, Zl, void 0));
  }
}, Zl = new WeakMap(), Eh), Xu, wl, kt, Ll, Rt, on, Vl, oe, Qe, Oh, Qv = (Oh = class extends Uv {
  constructor(e) {
    super();
    D(this, oe);
    D(this, Xu);
    D(this, wl);
    D(this, kt);
    D(this, Ll);
    D(this, Rt);
    D(this, on);
    D(this, Vl);
    A(this, Vl, !1), A(this, on, e.defaultOptions), this.setOptions(e.options), this.observers = [], A(this, Ll, e.client), A(this, kt, r(this, Ll).getQueryCache()), this.queryKey = e.queryKey, this.queryHash = e.queryHash, A(this, Xu, S1(this.options)), this.state = e.state ?? r(this, Xu), this.scheduleGc();
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
    !this.observers.length && this.state.fetchStatus === "idle" && r(this, kt).remove(this);
  }
  setData(e, l) {
    const u = as(this.state.data, e, this.options);
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
    this.destroy(), this.setState(r(this, Xu));
  }
  isActive() {
    return this.observers.some(
      (e) => ee(e.options.enabled, this) !== !1
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === dc || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStatic() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (e) => _l(e.options.staleTime, this) === "static"
    ) : !1;
  }
  isStale() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (e) => e.getCurrentResult().isStale
    ) : this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(e = 0) {
    return this.state.data === void 0 ? !0 : e === "static" ? !1 : this.state.isInvalidated ? !0 : !Mv(this.state.dataUpdatedAt, e);
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
    this.observers.includes(e) || (this.observers.push(e), this.clearGcTimeout(), r(this, kt).notify({ type: "observerAdded", query: this, observer: e }));
  }
  removeObserver(e) {
    this.observers.includes(e) && (this.observers = this.observers.filter((l) => l !== e), this.observers.length || (r(this, Rt) && (r(this, Vl) ? r(this, Rt).cancel({ revert: !0 }) : r(this, Rt).cancelRetry()), this.scheduleGc()), r(this, kt).notify({ type: "observerRemoved", query: this, observer: e }));
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
        get: () => (A(this, Vl, !0), u.signal)
      });
    }, n = () => {
      const s = Rv(this.options, l), E = (() => {
        const S = {
          client: r(this, Ll),
          queryKey: this.queryKey,
          meta: this.meta
        };
        return a(S), S;
      })();
      return A(this, Vl, !1), this.options.persister ? this.options.persister(
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
    (o = this.options.behavior) == null || o.onFetch(c, this), A(this, wl, this.state), (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((g = c.fetchOptions) == null ? void 0 : g.meta)) && Q(this, oe, Qe).call(this, { type: "fetch", meta: (v = c.fetchOptions) == null ? void 0 : v.meta });
    const f = (s) => {
      var y, E, S, O;
      yi(s) && s.silent || Q(this, oe, Qe).call(this, {
        type: "error",
        error: s
      }), yi(s) || ((E = (y = r(this, kt).config).onError) == null || E.call(
        y,
        s,
        this
      ), (O = (S = r(this, kt).config).onSettled) == null || O.call(
        S,
        this.state.data,
        s,
        this
      )), this.scheduleGc();
    };
    return A(this, Rt, Dv({
      initialPromise: l == null ? void 0 : l.initialPromise,
      fn: c.fetchFn,
      abort: u.abort.bind(u),
      onSuccess: (s) => {
        var y, E, S, O;
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
        (E = (y = r(this, kt).config).onSuccess) == null || E.call(y, s, this), (O = (S = r(this, kt).config).onSettled) == null || O.call(
          S,
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
}, Xu = new WeakMap(), wl = new WeakMap(), kt = new WeakMap(), Ll = new WeakMap(), Rt = new WeakMap(), on = new WeakMap(), Vl = new WeakMap(), oe = new WeakSet(), Qe = function(e) {
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
          ...Cv(u.data, this.options),
          fetchMeta: e.meta ?? null
        };
      case "success":
        return A(this, wl, void 0), {
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
        return yi(a) && a.revert && r(this, wl) ? { ...r(this, wl), fetchStatus: "idle" } : {
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
    }), r(this, kt).notify({ query: this, type: "updated", action: e });
  });
}, Oh);
function Cv(t, e) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: _v(e.networkMode) ? "fetching" : "paused",
    ...t === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function S1(t) {
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
var ge, Th, Hv = (Th = class extends ou {
  constructor(e = {}) {
    super();
    D(this, ge);
    this.config = e, A(this, ge, /* @__PURE__ */ new Map());
  }
  build(e, l, u) {
    const a = l.queryKey, n = l.queryHash ?? _r(a, l);
    let i = this.get(n);
    return i || (i = new Qv({
      client: e,
      queryKey: a,
      queryHash: n,
      options: e.defaultQueryOptions(l),
      state: u,
      defaultOptions: e.getQueryDefaults(a)
    }), this.add(i)), i;
  }
  add(e) {
    r(this, ge).has(e.queryHash) || (r(this, ge).set(e.queryHash, e), this.notify({
      type: "added",
      query: e
    }));
  }
  remove(e) {
    const l = r(this, ge).get(e.queryHash);
    l && (e.destroy(), l === e && r(this, ge).delete(e.queryHash), this.notify({ type: "removed", query: e }));
  }
  clear() {
    P.batch(() => {
      this.getAll().forEach((e) => {
        this.remove(e);
      });
    });
  }
  get(e) {
    return r(this, ge).get(e);
  }
  getAll() {
    return [...r(this, ge).values()];
  }
  find(e) {
    const l = { exact: !0, ...e };
    return this.getAll().find(
      (u) => es(l, u)
    );
  }
  findAll(e = {}) {
    const l = this.getAll();
    return Object.keys(e).length > 0 ? l.filter((u) => es(e, u)) : l;
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
}, ge = new WeakMap(), Th), be, Ut, Kl, Se, ke, Ah, qv = (Ah = class extends Uv {
  constructor(e) {
    super();
    D(this, Se);
    D(this, be);
    D(this, Ut);
    D(this, Kl);
    this.mutationId = e.mutationId, A(this, Ut, e.mutationCache), A(this, be, []), this.state = e.state || Nv(), this.setOptions(e.options), this.scheduleGc();
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
    return ((e = r(this, Kl)) == null ? void 0 : e.continue()) ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(e) {
    var n, i, c, f, o, g, v, s, y, E, S, O, d, h, m, b, T, z, M, R;
    const l = () => {
      Q(this, Se, ke).call(this, { type: "continue" });
    };
    A(this, Kl, Dv({
      fn: () => this.options.mutationFn ? this.options.mutationFn(e) : Promise.reject(new Error("No mutationFn found")),
      onFail: (q, U) => {
        Q(this, Se, ke).call(this, { type: "failed", failureCount: q, error: U });
      },
      onPause: () => {
        Q(this, Se, ke).call(this, { type: "pause" });
      },
      onContinue: l,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => r(this, Ut).canRun(this)
    }));
    const u = this.state.status === "pending", a = !r(this, Kl).canStart();
    try {
      if (u)
        l();
      else {
        Q(this, Se, ke).call(this, { type: "pending", variables: e, isPaused: a }), await ((i = (n = r(this, Ut).config).onMutate) == null ? void 0 : i.call(
          n,
          e,
          this
        ));
        const U = await ((f = (c = this.options).onMutate) == null ? void 0 : f.call(c, e));
        U !== this.state.context && Q(this, Se, ke).call(this, {
          type: "pending",
          context: U,
          variables: e,
          isPaused: a
        });
      }
      const q = await r(this, Kl).start();
      return await ((g = (o = r(this, Ut).config).onSuccess) == null ? void 0 : g.call(
        o,
        q,
        e,
        this.state.context,
        this
      )), await ((s = (v = this.options).onSuccess) == null ? void 0 : s.call(v, q, e, this.state.context)), await ((E = (y = r(this, Ut).config).onSettled) == null ? void 0 : E.call(
        y,
        q,
        null,
        this.state.variables,
        this.state.context,
        this
      )), await ((O = (S = this.options).onSettled) == null ? void 0 : O.call(S, q, null, e, this.state.context)), Q(this, Se, ke).call(this, { type: "success", data: q }), q;
    } catch (q) {
      try {
        throw await ((h = (d = r(this, Ut).config).onError) == null ? void 0 : h.call(
          d,
          q,
          e,
          this.state.context,
          this
        )), await ((b = (m = this.options).onError) == null ? void 0 : b.call(
          m,
          q,
          e,
          this.state.context
        )), await ((z = (T = r(this, Ut).config).onSettled) == null ? void 0 : z.call(
          T,
          void 0,
          q,
          this.state.variables,
          this.state.context,
          this
        )), await ((R = (M = this.options).onSettled) == null ? void 0 : R.call(
          M,
          void 0,
          q,
          e,
          this.state.context
        )), q;
      } finally {
        Q(this, Se, ke).call(this, { type: "error", error: q });
      }
    } finally {
      r(this, Ut).runNext(this);
    }
  }
}, be = new WeakMap(), Ut = new WeakMap(), Kl = new WeakMap(), Se = new WeakSet(), ke = function(e) {
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
function Nv() {
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
var Ce, he, hn, Mh, xv = (Mh = class extends ou {
  constructor(e = {}) {
    super();
    D(this, Ce);
    D(this, he);
    D(this, hn);
    this.config = e, A(this, Ce, /* @__PURE__ */ new Set()), A(this, he, /* @__PURE__ */ new Map()), A(this, hn, 0);
  }
  build(e, l, u) {
    const a = new qv({
      mutationCache: this,
      mutationId: ++Yn(this, hn)._,
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
      (u) => ls(l, u)
    );
  }
  findAll(e = {}) {
    return this.getAll().filter((l) => ls(e, l));
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
        let S = !1;
        const O = (m) => {
          Object.defineProperty(m, "signal", {
            enumerable: !0,
            get: () => (e.signal.aborted ? S = !0 : e.signal.addEventListener("abort", () => {
              S = !0;
            }), e.signal)
          });
        }, d = Rv(e.options, e.fetchOptions), h = async (m, b, T) => {
          if (S)
            return Promise.reject();
          if (b == null && m.pages.length)
            return Promise.resolve(m);
          const M = (() => {
            const rt = {
              client: e.client,
              queryKey: e.queryKey,
              pageParam: b,
              direction: T ? "backward" : "forward",
              meta: e.options.meta
            };
            return O(rt), rt;
          })(), R = await d(M), { maxPages: q } = e.options, U = T ? d1 : ns;
          return {
            pages: U(m.pages, R, q),
            pageParams: U(m.pageParams, b, q)
          };
        };
        if (a && n.length) {
          const m = a === "backward", b = m ? Bv : cs, T = {
            pages: n,
            pageParams: i
          }, z = b(u, T);
          c = await h(T, z, m);
        } else {
          const m = t ?? n.length;
          do {
            const b = f === 0 ? i[0] ?? u.initialPageParam : cs(u, c);
            if (f > 0 && b == null)
              break;
            c = await h(c, b), f++;
          } while (f < m);
        }
        return c;
      };
      e.options.persister ? e.fetchFn = () => {
        var S, O;
        return (O = (S = e.options).persister) == null ? void 0 : O.call(
          S,
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
function cs(t, { pages: e, pageParams: l }) {
  const u = e.length - 1;
  return e.length > 0 ? t.getNextPageParam(
    e[u],
    e,
    l[u],
    l
  ) : void 0;
}
function Bv(t, { pages: e, pageParams: l }) {
  var u;
  return e.length > 0 ? (u = t.getPreviousPageParam) == null ? void 0 : u.call(t, e[0], e, l[0], l) : void 0;
}
function p1(t, e) {
  return e ? cs(t, e) != null : !1;
}
function E1(t, e) {
  return !e || !t.getPreviousPageParam ? !1 : Bv(t, e) != null;
}
var at, il, cl, Zu, wu, fl, Lu, Vu, Rh, Yv = (Rh = class {
  constructor(e = {}) {
    D(this, at);
    D(this, il);
    D(this, cl);
    D(this, Zu);
    D(this, wu);
    D(this, fl);
    D(this, Lu);
    D(this, Vu);
    A(this, at, e.queryCache || new Hv()), A(this, il, e.mutationCache || new xv()), A(this, cl, e.defaultOptions || {}), A(this, Zu, /* @__PURE__ */ new Map()), A(this, wu, /* @__PURE__ */ new Map()), A(this, fl, 0);
  }
  mount() {
    Yn(this, fl)._++, r(this, fl) === 1 && (A(this, Lu, yc.subscribe(async (e) => {
      e && (await this.resumePausedMutations(), r(this, at).onFocus());
    })), A(this, Vu, rn.subscribe(async (e) => {
      e && (await this.resumePausedMutations(), r(this, at).onOnline());
    })));
  }
  unmount() {
    var e, l;
    Yn(this, fl)._--, r(this, fl) === 0 && ((e = r(this, Lu)) == null || e.call(this), A(this, Lu, void 0), (l = r(this, Vu)) == null || l.call(this), A(this, Vu, void 0));
  }
  isFetching(e) {
    return r(this, at).findAll({ ...e, fetchStatus: "fetching" }).length;
  }
  isMutating(e) {
    return r(this, il).findAll({ ...e, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(e) {
    var u;
    const l = this.defaultQueryOptions({ queryKey: e });
    return (u = r(this, at).get(l.queryHash)) == null ? void 0 : u.state.data;
  }
  ensureQueryData(e) {
    const l = this.defaultQueryOptions(e), u = r(this, at).build(this, l), a = u.state.data;
    return a === void 0 ? this.fetchQuery(e) : (e.revalidateIfStale && u.isStaleByTime(_l(l.staleTime, u)) && this.prefetchQuery(l), Promise.resolve(a));
  }
  getQueriesData(e) {
    return r(this, at).findAll(e).map(({ queryKey: l, state: u }) => {
      const a = u.data;
      return [l, a];
    });
  }
  setQueryData(e, l, u) {
    const a = this.defaultQueryOptions({ queryKey: e }), n = r(this, at).get(
      a.queryHash
    ), i = n == null ? void 0 : n.state.data, c = r1(l, i);
    if (c !== void 0)
      return r(this, at).build(this, a).setData(c, { ...u, manual: !0 });
  }
  setQueriesData(e, l, u) {
    return P.batch(
      () => r(this, at).findAll(e).map(({ queryKey: a }) => [
        a,
        this.setQueryData(a, l, u)
      ])
    );
  }
  getQueryState(e) {
    var u;
    const l = this.defaultQueryOptions({ queryKey: e });
    return (u = r(this, at).get(
      l.queryHash
    )) == null ? void 0 : u.state;
  }
  removeQueries(e) {
    const l = r(this, at);
    P.batch(() => {
      l.findAll(e).forEach((u) => {
        l.remove(u);
      });
    });
  }
  resetQueries(e, l) {
    const u = r(this, at);
    return P.batch(() => (u.findAll(e).forEach((a) => {
      a.reset();
    }), this.refetchQueries(
      {
        type: "active",
        ...e
      },
      l
    )));
  }
  cancelQueries(e, l = {}) {
    const u = { revert: !0, ...l }, a = P.batch(
      () => r(this, at).findAll(e).map((n) => n.cancel(u))
    );
    return Promise.all(a).then(dt).catch(dt);
  }
  invalidateQueries(e, l = {}) {
    return P.batch(() => (r(this, at).findAll(e).forEach((u) => {
      u.invalidate();
    }), (e == null ? void 0 : e.refetchType) === "none" ? Promise.resolve() : this.refetchQueries(
      {
        ...e,
        type: (e == null ? void 0 : e.refetchType) ?? (e == null ? void 0 : e.type) ?? "active"
      },
      l
    )));
  }
  refetchQueries(e, l = {}) {
    const u = {
      ...l,
      cancelRefetch: l.cancelRefetch ?? !0
    }, a = P.batch(
      () => r(this, at).findAll(e).filter((n) => !n.isDisabled() && !n.isStatic()).map((n) => {
        let i = n.fetch(void 0, u);
        return u.throwOnError || (i = i.catch(dt)), n.state.fetchStatus === "paused" ? Promise.resolve() : i;
      })
    );
    return Promise.all(a).then(dt);
  }
  fetchQuery(e) {
    const l = this.defaultQueryOptions(e);
    l.retry === void 0 && (l.retry = !1);
    const u = r(this, at).build(this, l);
    return u.isStaleByTime(
      _l(l.staleTime, u)
    ) ? u.fetch(l) : Promise.resolve(u.state.data);
  }
  prefetchQuery(e) {
    return this.fetchQuery(e).then(dt).catch(dt);
  }
  fetchInfiniteQuery(e) {
    return e.behavior = Ji(e.pages), this.fetchQuery(e);
  }
  prefetchInfiniteQuery(e) {
    return this.fetchInfiniteQuery(e).then(dt).catch(dt);
  }
  ensureInfiniteQueryData(e) {
    return e.behavior = Ji(e.pages), this.ensureQueryData(e);
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
  setDefaultOptions(e) {
    A(this, cl, e);
  }
  setQueryDefaults(e, l) {
    r(this, Zu).set(Cl(e), {
      queryKey: e,
      defaultOptions: l
    });
  }
  getQueryDefaults(e) {
    const l = [...r(this, Zu).values()], u = {};
    return l.forEach((a) => {
      ra(e, a.queryKey) && Object.assign(u, a.defaultOptions);
    }), u;
  }
  setMutationDefaults(e, l) {
    r(this, wu).set(Cl(e), {
      mutationKey: e,
      defaultOptions: l
    });
  }
  getMutationDefaults(e) {
    const l = [...r(this, wu).values()], u = {};
    return l.forEach((a) => {
      ra(e, a.mutationKey) && Object.assign(u, a.defaultOptions);
    }), u;
  }
  defaultQueryOptions(e) {
    if (e._defaulted)
      return e;
    const l = {
      ...r(this, cl).queries,
      ...this.getQueryDefaults(e.queryKey),
      ...e,
      _defaulted: !0
    };
    return l.queryHash || (l.queryHash = _r(
      l.queryKey,
      l
    )), l.refetchOnReconnect === void 0 && (l.refetchOnReconnect = l.networkMode !== "always"), l.throwOnError === void 0 && (l.throwOnError = !!l.suspense), !l.networkMode && l.persister && (l.networkMode = "offlineFirst"), l.queryFn === dc && (l.enabled = !1), l;
  }
  defaultMutationOptions(e) {
    return e != null && e._defaulted ? e : {
      ...r(this, cl).mutations,
      ...(e == null ? void 0 : e.mutationKey) && this.getMutationDefaults(e.mutationKey),
      ...e,
      _defaulted: !0
    };
  }
  clear() {
    r(this, at).clear(), r(this, il).clear();
  }
}, at = new WeakMap(), il = new WeakMap(), cl = new WeakMap(), Zu = new WeakMap(), wu = new WeakMap(), fl = new WeakMap(), Lu = new WeakMap(), Vu = new WeakMap(), Rh), Nt, X, dn, Qt, Jl, Ku, sl, rl, yn, Ju, $u, $l, Fl, ol, Fu, V, Ha, fs, ss, rs, os, hs, ds, ys, jv, _h, Sa = (_h = class extends ou {
  constructor(e, l) {
    super();
    D(this, V);
    D(this, Nt);
    D(this, X);
    D(this, dn);
    D(this, Qt);
    D(this, Jl);
    D(this, Ku);
    D(this, sl);
    D(this, rl);
    D(this, yn);
    D(this, Ju);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    D(this, $u);
    D(this, $l);
    D(this, Fl);
    D(this, ol);
    D(this, Fu, /* @__PURE__ */ new Set());
    this.options = l, A(this, Nt, e), A(this, rl, null), A(this, sl, is()), this.options.experimental_prefetchInRender || r(this, sl).reject(
      new Error("experimental_prefetchInRender feature flag is not enabled")
    ), this.bindMethods(), this.setOptions(l);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 && (r(this, X).addObserver(this), hh(r(this, X), this.options) ? Q(this, V, Ha).call(this) : this.updateResult(), Q(this, V, os).call(this));
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return vs(
      r(this, X),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return vs(
      r(this, X),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), Q(this, V, hs).call(this), Q(this, V, ds).call(this), r(this, X).removeObserver(this);
  }
  setOptions(e) {
    const l = this.options, u = r(this, X);
    if (this.options = r(this, Nt).defaultQueryOptions(e), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof ee(this.options.enabled, r(this, X)) != "boolean")
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    Q(this, V, ys).call(this), r(this, X).setOptions(this.options), l._defaulted && !Ki(this.options, l) && r(this, Nt).getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: r(this, X),
      observer: this
    });
    const a = this.hasListeners();
    a && dh(
      r(this, X),
      u,
      this.options,
      l
    ) && Q(this, V, Ha).call(this), this.updateResult(), a && (r(this, X) !== u || ee(this.options.enabled, r(this, X)) !== ee(l.enabled, r(this, X)) || _l(this.options.staleTime, r(this, X)) !== _l(l.staleTime, r(this, X))) && Q(this, V, fs).call(this);
    const n = Q(this, V, ss).call(this);
    a && (r(this, X) !== u || ee(this.options.enabled, r(this, X)) !== ee(l.enabled, r(this, X)) || n !== r(this, ol)) && Q(this, V, rs).call(this, n);
  }
  getOptimisticResult(e) {
    const l = r(this, Nt).getQueryCache().build(r(this, Nt), e), u = this.createResult(l, e);
    return T1(this, u) && (A(this, Qt, u), A(this, Ku, this.options), A(this, Jl, r(this, X).state)), u;
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
    return r(this, X);
  }
  refetch({ ...e } = {}) {
    return this.fetch({
      ...e
    });
  }
  fetchOptimistic(e) {
    const l = r(this, Nt).defaultQueryOptions(e), u = r(this, Nt).getQueryCache().build(r(this, Nt), l);
    return u.fetch().then(() => this.createResult(u, l));
  }
  fetch(e) {
    return Q(this, V, Ha).call(this, {
      ...e,
      cancelRefetch: e.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), r(this, Qt)));
  }
  createResult(e, l) {
    var q;
    const u = r(this, X), a = this.options, n = r(this, Qt), i = r(this, Jl), c = r(this, Ku), o = e !== u ? e.state : r(this, dn), { state: g } = e;
    let v = { ...g }, s = !1, y;
    if (l._optimisticResults) {
      const U = this.hasListeners(), rt = !U && hh(e, l), zt = U && dh(e, u, l, a);
      (rt || zt) && (v = {
        ...v,
        ...Cv(g.data, e.options)
      }), l._optimisticResults === "isRestoring" && (v.fetchStatus = "idle");
    }
    let { error: E, errorUpdatedAt: S, status: O } = v;
    y = v.data;
    let d = !1;
    if (l.placeholderData !== void 0 && y === void 0 && O === "pending") {
      let U;
      n != null && n.isPlaceholderData && l.placeholderData === (c == null ? void 0 : c.placeholderData) ? (U = n.data, d = !0) : U = typeof l.placeholderData == "function" ? l.placeholderData(
        (q = r(this, $u)) == null ? void 0 : q.state.data,
        r(this, $u)
      ) : l.placeholderData, U !== void 0 && (O = "success", y = as(
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
          A(this, yn, l.select), y = l.select(y), y = as(n == null ? void 0 : n.data, y, l), A(this, Ju, y), A(this, rl, null);
        } catch (U) {
          A(this, rl, U);
        }
    r(this, rl) && (E = r(this, rl), y = r(this, Ju), S = Date.now(), O = "error");
    const h = v.fetchStatus === "fetching", m = O === "pending", b = O === "error", T = m && h, z = y !== void 0, R = {
      status: O,
      fetchStatus: v.fetchStatus,
      isPending: m,
      isSuccess: O === "success",
      isError: b,
      isInitialLoading: T,
      isLoading: T,
      data: y,
      dataUpdatedAt: v.dataUpdatedAt,
      error: E,
      errorUpdatedAt: S,
      failureCount: v.fetchFailureCount,
      failureReason: v.fetchFailureReason,
      errorUpdateCount: v.errorUpdateCount,
      isFetched: v.dataUpdateCount > 0 || v.errorUpdateCount > 0,
      isFetchedAfterMount: v.dataUpdateCount > o.dataUpdateCount || v.errorUpdateCount > o.errorUpdateCount,
      isFetching: h,
      isRefetching: h && !m,
      isLoadingError: b && !z,
      isPaused: v.fetchStatus === "paused",
      isPlaceholderData: s,
      isRefetchError: b && z,
      isStale: Ur(e, l),
      refetch: this.refetch,
      promise: r(this, sl),
      isEnabled: ee(l.enabled, e) !== !1
    };
    if (this.options.experimental_prefetchInRender) {
      const U = (Nl) => {
        R.status === "error" ? Nl.reject(R.error) : R.data !== void 0 && Nl.resolve(R.data);
      }, rt = () => {
        const Nl = A(this, sl, R.promise = is());
        U(Nl);
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
    const e = r(this, Qt), l = this.createResult(r(this, X), this.options);
    if (A(this, Jl, r(this, X).state), A(this, Ku, this.options), r(this, Jl).data !== void 0 && A(this, $u, r(this, X)), Ki(l, e))
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
    Q(this, V, jv).call(this, { listeners: u() });
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && Q(this, V, os).call(this);
  }
}, Nt = new WeakMap(), X = new WeakMap(), dn = new WeakMap(), Qt = new WeakMap(), Jl = new WeakMap(), Ku = new WeakMap(), sl = new WeakMap(), rl = new WeakMap(), yn = new WeakMap(), Ju = new WeakMap(), $u = new WeakMap(), $l = new WeakMap(), Fl = new WeakMap(), ol = new WeakMap(), Fu = new WeakMap(), V = new WeakSet(), Ha = function(e) {
  Q(this, V, ys).call(this);
  let l = r(this, X).fetch(
    this.options,
    e
  );
  return e != null && e.throwOnError || (l = l.catch(dt)), l;
}, fs = function() {
  Q(this, V, hs).call(this);
  const e = _l(
    this.options.staleTime,
    r(this, X)
  );
  if (Ql || r(this, Qt).isStale || !ts(e))
    return;
  const u = Mv(r(this, Qt).dataUpdatedAt, e) + 1;
  A(this, $l, setTimeout(() => {
    r(this, Qt).isStale || this.updateResult();
  }, u));
}, ss = function() {
  return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(r(this, X)) : this.options.refetchInterval) ?? !1;
}, rs = function(e) {
  Q(this, V, ds).call(this), A(this, ol, e), !(Ql || ee(this.options.enabled, r(this, X)) === !1 || !ts(r(this, ol)) || r(this, ol) === 0) && A(this, Fl, setInterval(() => {
    (this.options.refetchIntervalInBackground || yc.isFocused()) && Q(this, V, Ha).call(this);
  }, r(this, ol)));
}, os = function() {
  Q(this, V, fs).call(this), Q(this, V, rs).call(this, Q(this, V, ss).call(this));
}, hs = function() {
  r(this, $l) && (clearTimeout(r(this, $l)), A(this, $l, void 0));
}, ds = function() {
  r(this, Fl) && (clearInterval(r(this, Fl)), A(this, Fl, void 0));
}, ys = function() {
  const e = r(this, Nt).getQueryCache().build(r(this, Nt), this.options);
  if (e === r(this, X))
    return;
  const l = r(this, X);
  A(this, X, e), A(this, dn, e.state), this.hasListeners() && (l == null || l.removeObserver(this), e.addObserver(this));
}, jv = function(e) {
  P.batch(() => {
    e.listeners && this.listeners.forEach((l) => {
      l(r(this, Qt));
    }), r(this, Nt).getQueryCache().notify({
      query: r(this, X),
      type: "observerResultsUpdated"
    });
  });
}, _h);
function O1(t, e) {
  return ee(e.enabled, t) !== !1 && t.state.data === void 0 && !(t.state.status === "error" && e.retryOnMount === !1);
}
function hh(t, e) {
  return O1(t, e) || t.state.data !== void 0 && vs(t, e, e.refetchOnMount);
}
function vs(t, e, l) {
  if (ee(e.enabled, t) !== !1 && _l(e.staleTime, t) !== "static") {
    const u = typeof l == "function" ? l(t) : l;
    return u === "always" || u !== !1 && Ur(t, e);
  }
  return !1;
}
function dh(t, e, l, u) {
  return (t !== e || ee(u.enabled, t) === !1) && (!l.suspense || t.state.status !== "error") && Ur(t, l);
}
function Ur(t, e) {
  return ee(e.enabled, t) !== !1 && t.isStaleByTime(_l(e.staleTime, t));
}
function T1(t, e) {
  return !Ki(t.getCurrentResult(), e);
}
function yh(t, e) {
  const l = new Set(e);
  return t.filter((u) => !l.has(u));
}
function A1(t, e, l) {
  const u = t.slice(0);
  return u[e] = l, u;
}
var Wu, Pt, ku, Pu, It, hl, vn, mn, gn, Mt, ms, gs, bs, Ss, ps, Dh, Gv = (Dh = class extends ou {
  constructor(e, l, u) {
    super();
    D(this, Mt);
    D(this, Wu);
    D(this, Pt);
    D(this, ku);
    D(this, Pu);
    D(this, It);
    D(this, hl);
    D(this, vn);
    D(this, mn);
    D(this, gn, []);
    A(this, Wu, e), A(this, Pu, u), A(this, ku, []), A(this, It, []), A(this, Pt, []), this.setQueries(l);
  }
  onSubscribe() {
    this.listeners.size === 1 && r(this, It).forEach((e) => {
      e.subscribe((l) => {
        Q(this, Mt, Ss).call(this, e, l);
      });
    });
  }
  onUnsubscribe() {
    this.listeners.size || this.destroy();
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), r(this, It).forEach((e) => {
      e.destroy();
    });
  }
  setQueries(e, l) {
    A(this, ku, e), A(this, Pu, l), P.batch(() => {
      const u = r(this, It), a = Q(this, Mt, bs).call(this, r(this, ku));
      A(this, gn, a), a.forEach(
        (f) => f.observer.setOptions(f.defaultedQueryOptions)
      );
      const n = a.map((f) => f.observer), i = n.map(
        (f) => f.getCurrentResult()
      ), c = n.some(
        (f, o) => f !== u[o]
      );
      u.length === n.length && !c || (A(this, It, n), A(this, Pt, i), this.hasListeners() && (yh(u, n).forEach((f) => {
        f.destroy();
      }), yh(n, u).forEach((f) => {
        f.subscribe((o) => {
          Q(this, Mt, Ss).call(this, f, o);
        });
      }), Q(this, Mt, ps).call(this)));
    });
  }
  getCurrentResult() {
    return r(this, Pt);
  }
  getQueries() {
    return r(this, It).map((e) => e.getCurrentQuery());
  }
  getObservers() {
    return r(this, It);
  }
  getOptimisticResult(e, l) {
    const u = Q(this, Mt, bs).call(this, e), a = u.map(
      (n) => n.observer.getOptimisticResult(n.defaultedQueryOptions)
    );
    return [
      a,
      (n) => Q(this, Mt, gs).call(this, n ?? a, l),
      () => Q(this, Mt, ms).call(this, a, u)
    ];
  }
}, Wu = new WeakMap(), Pt = new WeakMap(), ku = new WeakMap(), Pu = new WeakMap(), It = new WeakMap(), hl = new WeakMap(), vn = new WeakMap(), mn = new WeakMap(), gn = new WeakMap(), Mt = new WeakSet(), ms = function(e, l) {
  return l.map((u, a) => {
    const n = e[a];
    return u.defaultedQueryOptions.notifyOnChangeProps ? n : u.observer.trackResult(n, (i) => {
      l.forEach((c) => {
        c.observer.trackProp(i);
      });
    });
  });
}, gs = function(e, l) {
  return l ? ((!r(this, hl) || r(this, Pt) !== r(this, mn) || l !== r(this, vn)) && (A(this, vn, l), A(this, mn, r(this, Pt)), A(this, hl, qn(
    r(this, hl),
    l(e)
  ))), r(this, hl)) : e;
}, bs = function(e) {
  const l = new Map(
    r(this, It).map((a) => [a.options.queryHash, a])
  ), u = [];
  return e.forEach((a) => {
    const n = r(this, Wu).defaultQueryOptions(a), i = l.get(n.queryHash);
    i ? u.push({
      defaultedQueryOptions: n,
      observer: i
    }) : u.push({
      defaultedQueryOptions: n,
      observer: new Sa(r(this, Wu), n)
    });
  }), u;
}, Ss = function(e, l) {
  const u = r(this, It).indexOf(e);
  u !== -1 && (A(this, Pt, A1(r(this, Pt), u, l)), Q(this, Mt, ps).call(this));
}, ps = function() {
  var e;
  if (this.hasListeners()) {
    const l = r(this, hl), u = Q(this, Mt, ms).call(this, r(this, Pt), r(this, gn)), a = Q(this, Mt, gs).call(this, u, (e = r(this, Pu)) == null ? void 0 : e.combine);
    l !== a && P.batch(() => {
      this.listeners.forEach((n) => {
        n(r(this, Pt));
      });
    });
  }
}, Dh), Qr = class extends Sa {
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
    var E, S;
    const { state: l } = t, u = super.createResult(t, e), { isFetching: a, isRefetching: n, isError: i, isRefetchError: c } = u, f = (S = (E = l.fetchMeta) == null ? void 0 : E.fetchMore) == null ? void 0 : S.direction, o = i && f === "forward", g = a && f === "forward", v = i && f === "backward", s = a && f === "backward";
    return {
      ...u,
      fetchNextPage: this.fetchNextPage,
      fetchPreviousPage: this.fetchPreviousPage,
      hasNextPage: p1(e, l.data),
      hasPreviousPage: E1(e, l.data),
      isFetchNextPageError: o,
      isFetchingNextPage: g,
      isFetchPreviousPageError: v,
      isFetchingPreviousPage: s,
      isRefetchError: c && !o && !v,
      isRefetching: n && !g && !s
    };
  }
}, dl, yl, xt, He, Ze, vi, Es, zh, Xv = (zh = class extends ou {
  constructor(e, l) {
    super();
    D(this, Ze);
    D(this, dl);
    D(this, yl);
    D(this, xt);
    D(this, He);
    A(this, dl, e), this.setOptions(l), this.bindMethods(), Q(this, Ze, vi).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this), this.reset = this.reset.bind(this);
  }
  setOptions(e) {
    var u;
    const l = this.options;
    this.options = r(this, dl).defaultMutationOptions(e), Ki(this.options, l) || r(this, dl).getMutationCache().notify({
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
    Q(this, Ze, vi).call(this), Q(this, Ze, Es).call(this, e);
  }
  getCurrentResult() {
    return r(this, yl);
  }
  reset() {
    var e;
    (e = r(this, xt)) == null || e.removeObserver(this), A(this, xt, void 0), Q(this, Ze, vi).call(this), Q(this, Ze, Es).call(this);
  }
  mutate(e, l) {
    var u;
    return A(this, He, l), (u = r(this, xt)) == null || u.removeObserver(this), A(this, xt, r(this, dl).getMutationCache().build(r(this, dl), this.options)), r(this, xt).addObserver(this), r(this, xt).execute(e);
  }
}, dl = new WeakMap(), yl = new WeakMap(), xt = new WeakMap(), He = new WeakMap(), Ze = new WeakSet(), vi = function() {
  var l;
  const e = ((l = r(this, xt)) == null ? void 0 : l.state) ?? Nv();
  A(this, yl, {
    ...e,
    isPending: e.status === "pending",
    isSuccess: e.status === "success",
    isError: e.status === "error",
    isIdle: e.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, Es = function(e) {
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
function Zv(t) {
  return t;
}
function M1(t) {
  return {
    mutationKey: t.options.mutationKey,
    state: t.state,
    ...t.options.scope && { scope: t.options.scope },
    ...t.meta && { meta: t.meta }
  };
}
function R1(t, e, l) {
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
function wv(t) {
  return t.state.isPaused;
}
function Lv(t) {
  return t.state.status === "success";
}
function _1(t) {
  return !0;
}
function D1(t, e = {}) {
  var f, o, g, v;
  const l = e.shouldDehydrateMutation ?? ((f = t.getDefaultOptions().dehydrate) == null ? void 0 : f.shouldDehydrateMutation) ?? wv, u = t.getMutationCache().getAll().flatMap(
    (s) => l(s) ? [M1(s)] : []
  ), a = e.shouldDehydrateQuery ?? ((o = t.getDefaultOptions().dehydrate) == null ? void 0 : o.shouldDehydrateQuery) ?? Lv, n = e.shouldRedactErrors ?? ((g = t.getDefaultOptions().dehydrate) == null ? void 0 : g.shouldRedactErrors) ?? _1, i = e.serializeData ?? ((v = t.getDefaultOptions().dehydrate) == null ? void 0 : v.serializeData) ?? Zv, c = t.getQueryCache().getAll().flatMap(
    (s) => a(s) ? [R1(s, i, n)] : []
  );
  return { mutations: u, queries: c };
}
function Os(t, e, l) {
  var f, o;
  if (typeof e != "object" || e === null)
    return;
  const u = t.getMutationCache(), a = t.getQueryCache(), n = ((f = l == null ? void 0 : l.defaultOptions) == null ? void 0 : f.deserializeData) ?? ((o = t.getDefaultOptions().hydrate) == null ? void 0 : o.deserializeData) ?? Zv, i = e.mutations || [], c = e.queries || [];
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
    ({ queryKey: g, state: v, queryHash: s, meta: y, promise: E, dehydratedAt: S }) => {
      var z, M;
      const O = E ? m1(E) : void 0, d = v.data === void 0 ? O == null ? void 0 : O.data : v.data, h = d === void 0 ? d : n(d);
      let m = a.get(s);
      const b = (m == null ? void 0 : m.state.status) === "pending", T = (m == null ? void 0 : m.state.fetchStatus) === "fetching";
      if (m) {
        const R = O && // We only need this undefined check to handle older dehydration
        // payloads that might not have dehydratedAt
        S !== void 0 && S > m.state.dataUpdatedAt;
        if (v.dataUpdatedAt > m.state.dataUpdatedAt || R) {
          const { fetchStatus: q, ...U } = v;
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
      E && !b && !T && // Only hydrate if dehydration is newer than any existing data,
      // this is always true for new queries
      (S === void 0 || S > m.state.dataUpdatedAt) && m.fetch(void 0, {
        // RSC transformed promises are not thenable
        initialPromise: Promise.resolve(E).then(n)
      });
    }
  );
}
function z1({
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
        (o = []) => ns(o, f, l)
      ), i = ns(i, f, l);
    }
    return n && e === "replace" && !u.signal.aborted && u.client.setQueryData(u.queryKey, i), u.client.getQueryData(u.queryKey);
  };
}
var U1 = Symbol("dataTagSymbol"), Q1 = Symbol("dataTagErrorSymbol"), C1 = Symbol("unsetMarker"), Vv = { exports: {} }, vc = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var H1 = Symbol.for("react.transitional.element"), q1 = Symbol.for("react.fragment");
function Kv(t, e, l) {
  var u = null;
  if (l !== void 0 && (u = "" + l), e.key !== void 0 && (u = "" + e.key), "key" in e) {
    l = {};
    for (var a in e)
      a !== "key" && (l[a] = e[a]);
  } else l = e;
  return e = l.ref, {
    $$typeof: H1,
    type: t,
    key: u,
    ref: e !== void 0 ? e : null,
    props: l
  };
}
vc.Fragment = q1;
vc.jsx = Kv;
vc.jsxs = Kv;
Vv.exports = vc;
var fe = Vv.exports, Cr = H.createContext(
  void 0
), _e = (t) => {
  const e = H.useContext(Cr);
  if (t)
    return t;
  if (!e)
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return e;
}, Jv = ({
  client: t,
  children: e
}) => (H.useEffect(() => (t.mount(), () => {
  t.unmount();
}), [t]), /* @__PURE__ */ fe.jsx(Cr.Provider, { value: t, children: e })), $v = H.createContext(!1), Hr = () => H.useContext($v), N1 = $v.Provider;
function Fv() {
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
var Wv = H.createContext(Fv()), qr = () => H.useContext(Wv), x1 = ({
  children: t
}) => {
  const [e] = H.useState(() => Fv());
  return /* @__PURE__ */ fe.jsx(Wv.Provider, { value: e, children: typeof t == "function" ? t(e) : t });
}, kv = (t, e) => {
  (t.suspense || t.throwOnError || t.experimental_prefetchInRender) && (e.isReset() || (t.retryOnMount = !1));
}, Pv = (t) => {
  H.useEffect(() => {
    t.clearReset();
  }, [t]);
}, Iv = ({
  result: t,
  errorResetBoundary: e,
  throwOnError: l,
  query: u,
  suspense: a
}) => t.isError && !e.isReset() && !t.isFetching && u && (a && t.data === void 0 || Dr(l, [t.error, u])), Nr = (t, e) => e.state.data === void 0, t0 = (t) => {
  if (t.suspense) {
    const e = (u) => u === "static" ? u : Math.max(u ?? 1e3, 1e3), l = t.staleTime;
    t.staleTime = typeof l == "function" ? (...u) => e(l(...u)) : e(l), typeof t.gcTime == "number" && (t.gcTime = Math.max(t.gcTime, 1e3));
  }
}, e0 = (t, e) => t.isLoading && t.isFetching && !e, Ts = (t, e) => (t == null ? void 0 : t.suspense) && e.isPending, $i = (t, e, l) => e.fetchOptimistic(t).catch(() => {
  l.clearReset();
});
function l0({
  queries: t,
  ...e
}, l) {
  const u = _e(l), a = Hr(), n = qr(), i = H.useMemo(
    () => t.map((S) => {
      const O = u.defaultQueryOptions(
        S
      );
      return O._optimisticResults = a ? "isRestoring" : "optimistic", O;
    }),
    [t, u, a]
  );
  i.forEach((S) => {
    t0(S), kv(S, n);
  }), Pv(n);
  const [c] = H.useState(
    () => new Gv(
      u,
      i,
      e
    )
  ), [f, o, g] = c.getOptimisticResult(
    i,
    e.combine
  ), v = !a && e.subscribed !== !1;
  H.useSyncExternalStore(
    H.useCallback(
      (S) => v ? c.subscribe(P.batchCalls(S)) : dt,
      [c, v]
    ),
    () => c.getCurrentResult(),
    () => c.getCurrentResult()
  ), H.useEffect(() => {
    c.setQueries(
      i,
      e
    );
  }, [i, e, c]);
  const y = f.some(
    (S, O) => Ts(i[O], S)
  ) ? f.flatMap((S, O) => {
    const d = i[O];
    if (d) {
      const h = new Sa(u, d);
      if (Ts(d, S))
        return $i(d, h, n);
      e0(S, a) && $i(d, h, n);
    }
    return [];
  }) : [];
  if (y.length > 0)
    throw Promise.all(y);
  const E = f.find(
    (S, O) => {
      const d = i[O];
      return d && Iv({
        result: S,
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
  var v, s, y, E, S;
  const u = Hr(), a = qr(), n = _e(l), i = n.defaultQueryOptions(t);
  (s = (v = n.getDefaultOptions().queries) == null ? void 0 : v._experimental_beforeQuery) == null || s.call(
    v,
    i
  ), i._optimisticResults = u ? "isRestoring" : "optimistic", t0(i), kv(i, a), Pv(a);
  const c = !n.getQueryCache().get(i.queryHash), [f] = H.useState(
    () => new e(
      n,
      i
    )
  ), o = f.getOptimisticResult(i), g = !u && t.subscribed !== !1;
  if (H.useSyncExternalStore(
    H.useCallback(
      (O) => {
        const d = g ? f.subscribe(P.batchCalls(O)) : dt;
        return f.updateResult(), d;
      },
      [f, g]
    ),
    () => f.getCurrentResult(),
    () => f.getCurrentResult()
  ), H.useEffect(() => {
    f.setOptions(i);
  }, [i, f]), Ts(i, o))
    throw $i(i, f, a);
  if (Iv({
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
  ), i.experimental_prefetchInRender && !Ql && e0(o, u)) {
    const O = c ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      $i(i, f, a)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      (S = n.getQueryCache().get(i.queryHash)) == null ? void 0 : S.promise
    );
    O == null || O.catch(dt).finally(() => {
      f.updateResult();
    });
  }
  return i.notifyOnChangeProps ? o : f.trackResult(o);
}
function B1(t, e) {
  return mc(t, Sa, e);
}
function Y1(t, e) {
  return mc(
    {
      ...t,
      enabled: !0,
      suspense: !0,
      throwOnError: Nr,
      placeholderData: void 0
    },
    Sa,
    e
  );
}
function j1(t, e) {
  return mc(
    {
      ...t,
      enabled: !0,
      suspense: !0,
      throwOnError: Nr
    },
    Qr,
    e
  );
}
function G1(t, e) {
  return l0(
    {
      ...t,
      queries: t.queries.map((l) => ({
        ...l,
        suspense: !0,
        throwOnError: Nr,
        enabled: !0,
        placeholderData: void 0
      }))
    },
    e
  );
}
function X1(t, e) {
  const l = _e(e);
  l.getQueryState(t.queryKey) || l.prefetchQuery(t);
}
function Z1(t, e) {
  const l = _e(e);
  l.getQueryState(t.queryKey) || l.prefetchInfiniteQuery(t);
}
function w1(t) {
  return t;
}
function L1(t) {
  return t;
}
var V1 = ({
  children: t,
  options: e = {},
  state: l,
  queryClient: u
}) => {
  const a = _e(u), n = H.useRef(e);
  n.current = e;
  const i = H.useMemo(() => {
    if (l) {
      if (typeof l != "object")
        return;
      const c = a.getQueryCache(), f = l.queries || [], o = [], g = [];
      for (const v of f) {
        const s = c.get(v.queryHash);
        s ? (v.state.dataUpdatedAt > s.state.dataUpdatedAt || v.promise && s.state.status !== "pending" && s.state.fetchStatus !== "fetching" && v.dehydratedAt !== void 0 && v.dehydratedAt > s.state.dataUpdatedAt) && g.push(v) : o.push(v);
      }
      if (o.length > 0 && Os(a, { queries: o }, n.current), g.length > 0)
        return g;
    }
  }, [a, l]);
  return H.useEffect(() => {
    i && Os(a, { queries: i }, n.current);
  }, [a, i]), t;
};
function K1(t, e) {
  const l = _e(e), u = l.getQueryCache();
  return H.useSyncExternalStore(
    H.useCallback(
      (a) => u.subscribe(P.batchCalls(a)),
      [u]
    ),
    () => l.isFetching(t),
    () => l.isFetching(t)
  );
}
function J1(t, e) {
  const l = _e(e);
  return u0(
    { filters: { ...t, status: "pending" } },
    l
  ).length;
}
function vh(t, e) {
  return t.findAll(e.filters).map(
    (l) => e.select ? e.select(l) : l.state
  );
}
function u0(t = {}, e) {
  const l = _e(e).getMutationCache(), u = H.useRef(t), a = H.useRef(null);
  return a.current || (a.current = vh(l, t)), H.useEffect(() => {
    u.current = t;
  }), H.useSyncExternalStore(
    H.useCallback(
      (n) => l.subscribe(() => {
        const i = qn(
          a.current,
          vh(l, u.current)
        );
        a.current !== i && (a.current = i, P.schedule(n));
      }),
      [l]
    ),
    () => a.current,
    () => a.current
  );
}
function $1(t, e) {
  const l = _e(e), [u] = H.useState(
    () => new Xv(
      l,
      t
    )
  );
  H.useEffect(() => {
    u.setOptions(t);
  }, [u, t]);
  const a = H.useSyncExternalStore(
    H.useCallback(
      (i) => u.subscribe(P.batchCalls(i)),
      [u]
    ),
    () => u.getCurrentResult(),
    () => u.getCurrentResult()
  ), n = H.useCallback(
    (i, c) => {
      u.mutate(i, c).catch(dt);
    },
    [u]
  );
  if (a.error && Dr(u.options.throwOnError, [a.error]))
    throw a.error;
  return { ...a, mutate: n, mutateAsync: a.mutate };
}
function F1(t) {
  return t;
}
function W1(t, e) {
  return mc(
    t,
    Qr,
    e
  );
}
const k1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CancelledError: zr,
  HydrationBoundary: V1,
  InfiniteQueryObserver: Qr,
  IsRestoringProvider: N1,
  Mutation: qv,
  MutationCache: xv,
  MutationObserver: Xv,
  QueriesObserver: Gv,
  Query: Qv,
  QueryCache: Hv,
  QueryClient: Yv,
  QueryClientContext: Cr,
  QueryClientProvider: Jv,
  QueryErrorResetBoundary: x1,
  QueryObserver: Sa,
  dataTagErrorSymbol: Q1,
  dataTagSymbol: U1,
  defaultScheduler: zv,
  defaultShouldDehydrateMutation: wv,
  defaultShouldDehydrateQuery: Lv,
  dehydrate: D1,
  experimental_streamedQuery: z1,
  focusManager: yc,
  hashKey: Cl,
  hydrate: Os,
  infiniteQueryOptions: L1,
  isCancelledError: yi,
  isServer: Ql,
  keepPreviousData: h1,
  matchMutation: ls,
  matchQuery: es,
  mutationOptions: F1,
  noop: dt,
  notifyManager: P,
  onlineManager: rn,
  partialMatchKey: ra,
  queryOptions: w1,
  replaceEqualDeep: qn,
  shouldThrowError: Dr,
  skipToken: dc,
  unsetMarker: C1,
  useInfiniteQuery: W1,
  useIsFetching: K1,
  useIsMutating: J1,
  useIsRestoring: Hr,
  useMutation: $1,
  useMutationState: u0,
  usePrefetchInfiniteQuery: Z1,
  usePrefetchQuery: X1,
  useQueries: l0,
  useQuery: B1,
  useQueryClient: _e,
  useQueryErrorResetBoundary: qr,
  useSuspenseInfiniteQuery: j1,
  useSuspenseQueries: G1,
  useSuspenseQuery: Y1
}, Symbol.toStringTag, { value: "Module" })), P1 = {}, mh = (t) => {
  let e;
  const l = /* @__PURE__ */ new Set(), u = (g, v) => {
    const s = typeof g == "function" ? g(e) : g;
    if (!Object.is(s, e)) {
      const y = e;
      e = v ?? (typeof s != "object" || s === null) ? s : Object.assign({}, e, s), l.forEach((E) => E(e, y));
    }
  }, a = () => e, f = { setState: u, getState: a, getInitialState: () => o, subscribe: (g) => (l.add(g), () => l.delete(g)), destroy: () => {
    (P1 ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), l.clear();
  } }, o = e = t(u, a, f);
  return f;
}, a0 = (t) => t ? mh(t) : mh;
var n0 = { exports: {} }, i0 = {}, c0 = { exports: {} }, f0 = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oa = H;
function I1(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var tb = typeof Object.is == "function" ? Object.is : I1, eb = oa.useState, lb = oa.useEffect, ub = oa.useLayoutEffect, ab = oa.useDebugValue;
function nb(t, e) {
  var l = e(), u = eb({ inst: { value: l, getSnapshot: e } }), a = u[0].inst, n = u[1];
  return ub(
    function() {
      a.value = l, a.getSnapshot = e, lf(a) && n({ inst: a });
    },
    [t, l, e]
  ), lb(
    function() {
      return lf(a) && n({ inst: a }), t(function() {
        lf(a) && n({ inst: a });
      });
    },
    [t]
  ), ab(l), l;
}
function lf(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var l = e();
    return !tb(t, l);
  } catch {
    return !0;
  }
}
function ib(t, e) {
  return e();
}
var cb = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? ib : nb;
f0.useSyncExternalStore = oa.useSyncExternalStore !== void 0 ? oa.useSyncExternalStore : cb;
c0.exports = f0;
var fb = c0.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gc = H, sb = fb;
function rb(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var ob = typeof Object.is == "function" ? Object.is : rb, hb = sb.useSyncExternalStore, db = gc.useRef, yb = gc.useEffect, vb = gc.useMemo, mb = gc.useDebugValue;
i0.useSyncExternalStoreWithSelector = function(t, e, l, u, a) {
  var n = db(null);
  if (n.current === null) {
    var i = { hasValue: !1, value: null };
    n.current = i;
  } else i = n.current;
  n = vb(
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
        if (E = v, ob(g, y)) return E;
        var S = u(y);
        return a !== void 0 && a(E, S) ? (g = y, E) : (g = y, v = S);
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
  var c = hb(t, n[0], n[1]);
  return yb(
    function() {
      i.hasValue = !0, i.value = c;
    },
    [c]
  ), mb(c), c;
};
n0.exports = i0;
var gb = n0.exports;
const bb = /* @__PURE__ */ Fi(gb), xr = {}, { useDebugValue: Sb } = Us, { useSyncExternalStoreWithSelector: pb } = bb;
let gh = !1;
const Eb = (t) => t;
function s0(t, e = Eb, l) {
  (xr ? "production" : void 0) !== "production" && l && !gh && (console.warn(
    "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
  ), gh = !0);
  const u = pb(
    t.subscribe,
    t.getState,
    t.getServerState || t.getInitialState,
    e,
    l
  );
  return Sb(u), u;
}
const bh = (t) => {
  (xr ? "production" : void 0) !== "production" && typeof t != "function" && console.warn(
    "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
  );
  const e = typeof t == "function" ? a0(t) : t, l = (u, a) => s0(e, u, a);
  return Object.assign(l, e), l;
}, pa = (t) => t ? bh(t) : bh;
var Ob = (t) => ((xr ? "production" : void 0) !== "production" && console.warn(
  "[DEPRECATED] Default export is deprecated. Instead use `import { create } from 'zustand'`."
), pa(t));
const Tb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  create: pa,
  createStore: a0,
  default: Ob,
  useStore: s0
}, Symbol.toStringTag, { value: "Module" }));
let uf = null;
function Ab() {
  return uf || (uf = new Yv({
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
  })), uf;
}
function Mb(t = {}) {
  const e = Ab();
  return Object.entries(t).forEach(([l, u]) => {
    try {
      e.setQueryData(JSON.parse(l), u);
    } catch (a) {
      console.warn("Failed to parse query key:", l, a);
    }
  }), e;
}
function Rb({ children: t, ssrQueries: e }) {
  const l = H.useMemo(() => Mb(e), [e]);
  return /* @__PURE__ */ fe.jsx(Jv, { client: l, children: t });
}
const r0 = pa((t, e) => ({
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
})), Ub = pa((t, e) => ({
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
})), o0 = pa((t, e) => ({
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
})), Qb = pa((t) => ({
  currentPath: typeof window < "u" ? window.location.pathname : "/",
  navigate: (e) => {
    typeof window < "u" && (window.history.pushState({}, "", e), t({ currentPath: e }), window.dispatchEvent(new PopStateEvent("popstate")));
  }
}));
function _b() {
  const { notifications: t, removeNotification: e } = o0();
  return t.length === 0 ? null : /* @__PURE__ */ fe.jsx("div", { style: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 1e4,
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }, children: t.map((l) => /* @__PURE__ */ fe.jsxs(
    "div",
    {
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
      onClick: () => l.id && e(l.id),
      children: [
        /* @__PURE__ */ fe.jsx("div", { style: { fontWeight: "bold", marginBottom: "4px" }, children: l.title }),
        l.message && /* @__PURE__ */ fe.jsx("div", { style: { fontSize: "14px", opacity: 0.9 }, children: l.message })
      ]
    },
    l.id
  )) });
}
function Cb({ children: t, ssrData: e = {} }) {
  const { initializeFromSSR: l } = r0();
  return H.useEffect(() => {
    (e.user || e.theme || e.language) && l(e);
  }, [e, l]), /* @__PURE__ */ fe.jsxs(Rb, { ssrQueries: e.queries, children: [
    t,
    /* @__PURE__ */ fe.jsx(_b, {})
  ] });
}
const Hb = r0, qb = o0, h0 = H.createContext(null);
function Nb({ children: t }) {
  const [e, l] = H.useState(typeof window < "u" ? window.location.pathname : "/"), [u, a] = H.useState({}), [n, i] = H.useState({});
  H.useEffect(() => {
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
  return /* @__PURE__ */ fe.jsx(h0.Provider, { value: { pathname: e, navigate: c, params: u, query: n }, children: t });
}
function xb() {
  const t = H.useContext(h0);
  if (!t)
    throw new Error("useRouting must be used within RoutingProvider");
  return t;
}
typeof window < "u" && !window.__MFA_APPS__ && (window.__MFA_APPS__ = /* @__PURE__ */ new Map());
function Bb(t, e) {
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
      l = Rr.createRoot(u), l.render(/* @__PURE__ */ fe.jsx(e, {})), window.__MFA_APPS__.set(t, { root: l, Component: e }), e.root = l, console.log(`✅ ${t} 마운트 완료`);
    },
    /**
     * 컴포넌트를 DOM에서 언마운트
     */
    unmount() {
      l && (l.unmount(), l = null, window.__MFA_APPS__.delete(t), e.root = null, console.log(`❌ ${t} 언마운트 완료`));
    }
  };
}
function Yb(t, e, l) {
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
    n.root.render(/* @__PURE__ */ fe.jsx(i, {})), i.root = n.root, window.__MFA_APPS__.set(e, { ...n, Component: i }), console.log(`✅ HMR 적용 완료: ${e}`);
  });
}
const jb = Us, {
  useState: Gb,
  useEffect: Xb,
  useContext: Zb,
  createContext: wb,
  useReducer: Lb,
  useCallback: Vb,
  useMemo: Kb,
  useRef: Jb,
  forwardRef: $b,
  memo: Fb,
  Fragment: Wb,
  Component: kb,
  PureComponent: Pb,
  Children: Ib,
  cloneElement: tS,
  createElement: eS,
  isValidElement: lS,
  lazy: uS,
  Suspense: aS,
  StrictMode: nS
} = z0, iS = Gh, { render: cS, hydrate: fS, unmountComponentAtNode: sS, findDOMNode: rS } = H0, { createRoot: oS, hydrateRoot: hS } = s1, {
  QueryClient: dS,
  QueryClientProvider: yS,
  useQuery: vS,
  useMutation: mS,
  useQueryClient: gS,
  useQueries: bS,
  useInfiniteQuery: SS,
  useSuspenseQuery: pS,
  HydrationBoundary: ES,
  dehydrate: OS,
  hydrate: TS
} = k1, { create: AS, createStore: MS } = Tb;
export {
  Ib as Children,
  kb as Component,
  Wb as Fragment,
  ES as HydrationBoundary,
  Cb as MfaGlobalProvider,
  Rb as MfaQueryProvider,
  Pb as PureComponent,
  dS as QueryClient,
  yS as QueryClientProvider,
  jb as React,
  iS as ReactDOM,
  Nb as RoutingProvider,
  nS as StrictMode,
  aS as Suspense,
  tS as cloneElement,
  AS as create,
  wb as createContext,
  eS as createElement,
  Bb as createMfaApp,
  oS as createRoot,
  MS as createStore,
  OS as dehydrate,
  Yb as enableHMR,
  rS as findDOMNode,
  $b as forwardRef,
  Ab as getQueryClient,
  fS as hydrate,
  TS as hydrateQuery,
  hS as hydrateRoot,
  Mb as initializeQueryClient,
  lS as isValidElement,
  uS as lazy,
  Fb as memo,
  cS as render,
  sS as unmountComponentAtNode,
  Vb as useCallback,
  Zb as useContext,
  Xb as useEffect,
  Ub as useEventStore,
  qb as useGlobalNotification,
  Hb as useGlobalUser,
  SS as useInfiniteQuery,
  Kb as useMemo,
  mS as useMutation,
  o0 as useNotificationStore,
  bS as useQueries,
  vS as useQuery,
  gS as useQueryClient,
  Lb as useReducer,
  Jb as useRef,
  xb as useRouting,
  Qb as useRoutingStore,
  Gb as useState,
  pS as useSuspenseQuery,
  r0 as useUserStore
};
