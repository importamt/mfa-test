import { r as ya, R as Gl, a as b0 } from "./react-BNwpUHf-.js";
import { r as h1, R as z0 } from "./react-dom-BBRd-7mp.js";
import { CancelledError as o1, HydrationBoundary as m1, InfiniteQueryObserver as S1, IsRestoringProvider as g1, Mutation as b1, MutationCache as z1, MutationObserver as T1, QueriesObserver as A1, Query as M1, QueryCache as E1, QueryClient as T0, QueryClientContext as r1, QueryClientProvider as A0, QueryErrorResetBoundary as O1, QueryObserver as D1, dataTagErrorSymbol as U1, dataTagSymbol as _1, defaultScheduler as R1, defaultShouldDehydrateMutation as H1, defaultShouldDehydrateQuery as N1, dehydrate as q1, experimental_streamedQuery as Y1, focusManager as Q1, hashKey as B1, hydrate as G1, infiniteQueryOptions as X1, isCancelledError as Z1, isServer as x1, keepPreviousData as p1, matchMutation as V1, matchQuery as j1, mutationOptions as C1, noop as K1, notifyManager as L1, onlineManager as J1, partialMatchKey as w1, queryOptions as W1, replaceEqualDeep as $1, shouldThrowError as k1, skipToken as F1, unsetMarker as I1, useInfiniteQuery as P1, useIsFetching as ld, useIsMutating as td, useIsRestoring as ad, useMutation as M0, useMutationState as ud, usePrefetchInfiniteQuery as ed, usePrefetchQuery as nd, useQueries as fd, useQuery as un, useQueryClient as E0, useQueryErrorResetBoundary as cd, useSuspenseInfiniteQuery as id, useSuspenseQueries as sd, useSuspenseQuery as yd } from "./react-query.js";
import { create as ja } from "./zustand.js";
var r0 = { exports: {} }, en = {}, O0 = { exports: {} }, D0 = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(l) {
  function t(T, R) {
    var _ = T.length;
    T.push(R);
    l: for (; 0 < _; ) {
      var k = _ - 1 >>> 1, el = T[k];
      if (0 < e(el, R))
        T[k] = R, T[_] = el, _ = k;
      else break l;
    }
  }
  function a(T) {
    return T.length === 0 ? null : T[0];
  }
  function u(T) {
    if (T.length === 0) return null;
    var R = T[0], _ = T.pop();
    if (_ !== R) {
      T[0] = _;
      l: for (var k = 0, el = T.length, Fu = el >>> 1; k < Fu; ) {
        var Iu = 2 * (k + 1) - 1, rn = T[Iu], xt = Iu + 1, Pu = T[xt];
        if (0 > e(rn, _))
          xt < el && 0 > e(Pu, rn) ? (T[k] = Pu, T[xt] = _, k = xt) : (T[k] = rn, T[Iu] = _, k = Iu);
        else if (xt < el && 0 > e(Pu, _))
          T[k] = Pu, T[xt] = _, k = xt;
        else break l;
      }
    }
    return R;
  }
  function e(T, R) {
    var _ = T.sortIndex - R.sortIndex;
    return _ !== 0 ? _ : T.id - R.id;
  }
  if (l.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
    var n = performance;
    l.unstable_now = function() {
      return n.now();
    };
  } else {
    var f = Date, c = f.now();
    l.unstable_now = function() {
      return f.now() - c;
    };
  }
  var i = [], d = [], m = 1, S = null, v = 3, o = !1, E = !1, M = !1, Q = !1, y = typeof setTimeout == "function" ? setTimeout : null, s = typeof clearTimeout == "function" ? clearTimeout : null, h = typeof setImmediate < "u" ? setImmediate : null;
  function g(T) {
    for (var R = a(d); R !== null; ) {
      if (R.callback === null) u(d);
      else if (R.startTime <= T)
        u(d), R.sortIndex = R.expirationTime, t(i, R);
      else break;
      R = a(d);
    }
  }
  function z(T) {
    if (M = !1, g(T), !E)
      if (a(i) !== null)
        E = !0, D || (D = !0, ht());
      else {
        var R = a(d);
        R !== null && En(z, R.startTime - T);
      }
  }
  var D = !1, A = -1, r = 5, $ = -1;
  function q() {
    return Q ? !0 : !(l.unstable_now() - $ < r);
  }
  function Rl() {
    if (Q = !1, D) {
      var T = l.unstable_now();
      $ = T;
      var R = !0;
      try {
        l: {
          E = !1, M && (M = !1, s(A), A = -1), o = !0;
          var _ = v;
          try {
            t: {
              for (g(T), S = a(i); S !== null && !(S.expirationTime > T && q()); ) {
                var k = S.callback;
                if (typeof k == "function") {
                  S.callback = null, v = S.priorityLevel;
                  var el = k(
                    S.expirationTime <= T
                  );
                  if (T = l.unstable_now(), typeof el == "function") {
                    S.callback = el, g(T), R = !0;
                    break t;
                  }
                  S === a(i) && u(i), g(T);
                } else u(i);
                S = a(i);
              }
              if (S !== null) R = !0;
              else {
                var Fu = a(d);
                Fu !== null && En(
                  z,
                  Fu.startTime - T
                ), R = !1;
              }
            }
            break l;
          } finally {
            S = null, v = _, o = !1;
          }
          R = void 0;
        }
      } finally {
        R ? ht() : D = !1;
      }
    }
  }
  var ht;
  if (typeof h == "function")
    ht = function() {
      h(Rl);
    };
  else if (typeof MessageChannel < "u") {
    var kc = new MessageChannel(), v1 = kc.port2;
    kc.port1.onmessage = Rl, ht = function() {
      v1.postMessage(null);
    };
  } else
    ht = function() {
      y(Rl, 0);
    };
  function En(T, R) {
    A = y(function() {
      T(l.unstable_now());
    }, R);
  }
  l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(T) {
    T.callback = null;
  }, l.unstable_forceFrameRate = function(T) {
    0 > T || 125 < T ? console.error(
      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
    ) : r = 0 < T ? Math.floor(1e3 / T) : 5;
  }, l.unstable_getCurrentPriorityLevel = function() {
    return v;
  }, l.unstable_next = function(T) {
    switch (v) {
      case 1:
      case 2:
      case 3:
        var R = 3;
        break;
      default:
        R = v;
    }
    var _ = v;
    v = R;
    try {
      return T();
    } finally {
      v = _;
    }
  }, l.unstable_requestPaint = function() {
    Q = !0;
  }, l.unstable_runWithPriority = function(T, R) {
    switch (T) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        T = 3;
    }
    var _ = v;
    v = T;
    try {
      return R();
    } finally {
      v = _;
    }
  }, l.unstable_scheduleCallback = function(T, R, _) {
    var k = l.unstable_now();
    switch (typeof _ == "object" && _ !== null ? (_ = _.delay, _ = typeof _ == "number" && 0 < _ ? k + _ : k) : _ = k, T) {
      case 1:
        var el = -1;
        break;
      case 2:
        el = 250;
        break;
      case 5:
        el = 1073741823;
        break;
      case 4:
        el = 1e4;
        break;
      default:
        el = 5e3;
    }
    return el = _ + el, T = {
      id: m++,
      callback: R,
      priorityLevel: T,
      startTime: _,
      expirationTime: el,
      sortIndex: -1
    }, _ > k ? (T.sortIndex = _, t(d, T), a(i) === null && T === a(d) && (M ? (s(A), A = -1) : M = !0, En(z, _ - k))) : (T.sortIndex = el, t(i, T), E || o || (E = !0, D || (D = !0, ht()))), T;
  }, l.unstable_shouldYield = q, l.unstable_wrapCallback = function(T) {
    var R = v;
    return function() {
      var _ = v;
      v = R;
      try {
        return T.apply(this, arguments);
      } finally {
        v = _;
      }
    };
  };
})(D0);
O0.exports = D0;
var dd = O0.exports;
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ul = dd, U0 = ya, vd = h1;
function b(l) {
  var t = "https://react.dev/errors/" + l;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var a = 2; a < arguments.length; a++)
      t += "&args[]=" + encodeURIComponent(arguments[a]);
  }
  return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function _0(l) {
  return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
}
function Bu(l) {
  var t = l, a = l;
  if (l.alternate) for (; t.return; ) t = t.return;
  else {
    l = t;
    do
      t = l, t.flags & 4098 && (a = t.return), l = t.return;
    while (l);
  }
  return t.tag === 3 ? a : null;
}
function R0(l) {
  if (l.tag === 13) {
    var t = l.memoizedState;
    if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Fc(l) {
  if (Bu(l) !== l)
    throw Error(b(188));
}
function hd(l) {
  var t = l.alternate;
  if (!t) {
    if (t = Bu(l), t === null) throw Error(b(188));
    return t !== l ? null : l;
  }
  for (var a = l, u = t; ; ) {
    var e = a.return;
    if (e === null) break;
    var n = e.alternate;
    if (n === null) {
      if (u = e.return, u !== null) {
        a = u;
        continue;
      }
      break;
    }
    if (e.child === n.child) {
      for (n = e.child; n; ) {
        if (n === a) return Fc(e), l;
        if (n === u) return Fc(e), t;
        n = n.sibling;
      }
      throw Error(b(188));
    }
    if (a.return !== u.return) a = e, u = n;
    else {
      for (var f = !1, c = e.child; c; ) {
        if (c === a) {
          f = !0, a = e, u = n;
          break;
        }
        if (c === u) {
          f = !0, u = e, a = n;
          break;
        }
        c = c.sibling;
      }
      if (!f) {
        for (c = n.child; c; ) {
          if (c === a) {
            f = !0, a = n, u = e;
            break;
          }
          if (c === u) {
            f = !0, u = n, a = e;
            break;
          }
          c = c.sibling;
        }
        if (!f) throw Error(b(189));
      }
    }
    if (a.alternate !== u) throw Error(b(190));
  }
  if (a.tag !== 3) throw Error(b(188));
  return a.stateNode.current === a ? l : t;
}
function H0(l) {
  var t = l.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return l;
  for (l = l.child; l !== null; ) {
    if (t = H0(l), t !== null) return t;
    l = l.sibling;
  }
  return null;
}
var C = Object.assign, od = Symbol.for("react.element"), le = Symbol.for("react.transitional.element"), uu = Symbol.for("react.portal"), da = Symbol.for("react.fragment"), N0 = Symbol.for("react.strict_mode"), ff = Symbol.for("react.profiler"), md = Symbol.for("react.provider"), q0 = Symbol.for("react.consumer"), tt = Symbol.for("react.context"), ac = Symbol.for("react.forward_ref"), cf = Symbol.for("react.suspense"), sf = Symbol.for("react.suspense_list"), uc = Symbol.for("react.memo"), St = Symbol.for("react.lazy"), yf = Symbol.for("react.activity"), Sd = Symbol.for("react.memo_cache_sentinel"), Ic = Symbol.iterator;
function $a(l) {
  return l === null || typeof l != "object" ? null : (l = Ic && l[Ic] || l["@@iterator"], typeof l == "function" ? l : null);
}
var gd = Symbol.for("react.client.reference");
function df(l) {
  if (l == null) return null;
  if (typeof l == "function")
    return l.$$typeof === gd ? null : l.displayName || l.name || null;
  if (typeof l == "string") return l;
  switch (l) {
    case da:
      return "Fragment";
    case ff:
      return "Profiler";
    case N0:
      return "StrictMode";
    case cf:
      return "Suspense";
    case sf:
      return "SuspenseList";
    case yf:
      return "Activity";
  }
  if (typeof l == "object")
    switch (l.$$typeof) {
      case uu:
        return "Portal";
      case tt:
        return (l.displayName || "Context") + ".Provider";
      case q0:
        return (l._context.displayName || "Context") + ".Consumer";
      case ac:
        var t = l.render;
        return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
      case uc:
        return t = l.displayName || null, t !== null ? t : df(l.type) || "Memo";
      case St:
        t = l._payload, l = l._init;
        try {
          return df(l(t));
        } catch {
        }
    }
  return null;
}
var eu = Array.isArray, O = U0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, G = vd.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Kt = {
  pending: !1,
  data: null,
  method: null,
  action: null
}, vf = [], va = -1;
function $l(l) {
  return { current: l };
}
function il(l) {
  0 > va || (l.current = vf[va], vf[va] = null, va--);
}
function L(l, t) {
  va++, vf[va] = l.current, l.current = t;
}
var Jl = $l(null), Au = $l(null), Dt = $l(null), Ue = $l(null);
function _e(l, t) {
  switch (L(Dt, t), L(Au, l), L(Jl, null), t.nodeType) {
    case 9:
    case 11:
      l = (l = t.documentElement) && (l = l.namespaceURI) ? u0(l) : 0;
      break;
    default:
      if (l = t.tagName, t = t.namespaceURI)
        t = u0(t), l = $y(t, l);
      else
        switch (l) {
          case "svg":
            l = 1;
            break;
          case "math":
            l = 2;
            break;
          default:
            l = 0;
        }
  }
  il(Jl), L(Jl, l);
}
function Na() {
  il(Jl), il(Au), il(Dt);
}
function hf(l) {
  l.memoizedState !== null && L(Ue, l);
  var t = Jl.current, a = $y(t, l.type);
  t !== a && (L(Au, l), L(Jl, a));
}
function Re(l) {
  Au.current === l && (il(Jl), il(Au)), Ue.current === l && (il(Ue), Nu._currentValue = Kt);
}
var of = Object.prototype.hasOwnProperty, ec = ul.unstable_scheduleCallback, On = ul.unstable_cancelCallback, bd = ul.unstable_shouldYield, zd = ul.unstable_requestPaint, wl = ul.unstable_now, Td = ul.unstable_getCurrentPriorityLevel, Y0 = ul.unstable_ImmediatePriority, Q0 = ul.unstable_UserBlockingPriority, He = ul.unstable_NormalPriority, Ad = ul.unstable_LowPriority, B0 = ul.unstable_IdlePriority, Md = ul.log, Ed = ul.unstable_setDisableYieldValue, Gu = null, rl = null;
function Mt(l) {
  if (typeof Md == "function" && Ed(l), rl && typeof rl.setStrictMode == "function")
    try {
      rl.setStrictMode(Gu, l);
    } catch {
    }
}
var Ol = Math.clz32 ? Math.clz32 : Dd, rd = Math.log, Od = Math.LN2;
function Dd(l) {
  return l >>>= 0, l === 0 ? 32 : 31 - (rd(l) / Od | 0) | 0;
}
var te = 256, ae = 4194304;
function Vt(l) {
  var t = l & 42;
  if (t !== 0) return t;
  switch (l & -l) {
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
      return l & 4194048;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return l & 62914560;
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
      return l;
  }
}
function nn(l, t, a) {
  var u = l.pendingLanes;
  if (u === 0) return 0;
  var e = 0, n = l.suspendedLanes, f = l.pingedLanes;
  l = l.warmLanes;
  var c = u & 134217727;
  return c !== 0 ? (u = c & ~n, u !== 0 ? e = Vt(u) : (f &= c, f !== 0 ? e = Vt(f) : a || (a = c & ~l, a !== 0 && (e = Vt(a))))) : (c = u & ~n, c !== 0 ? e = Vt(c) : f !== 0 ? e = Vt(f) : a || (a = u & ~l, a !== 0 && (e = Vt(a)))), e === 0 ? 0 : t !== 0 && t !== e && !(t & n) && (n = e & -e, a = t & -t, n >= a || n === 32 && (a & 4194048) !== 0) ? t : e;
}
function Xu(l, t) {
  return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
}
function Ud(l, t) {
  switch (l) {
    case 1:
    case 2:
    case 4:
    case 8:
    case 64:
      return t + 250;
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
      return t + 5e3;
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
function G0() {
  var l = te;
  return te <<= 1, !(te & 4194048) && (te = 256), l;
}
function X0() {
  var l = ae;
  return ae <<= 1, !(ae & 62914560) && (ae = 4194304), l;
}
function Dn(l) {
  for (var t = [], a = 0; 31 > a; a++) t.push(l);
  return t;
}
function Zu(l, t) {
  l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
}
function _d(l, t, a, u, e, n) {
  var f = l.pendingLanes;
  l.pendingLanes = a, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= a, l.entangledLanes &= a, l.errorRecoveryDisabledLanes &= a, l.shellSuspendCounter = 0;
  var c = l.entanglements, i = l.expirationTimes, d = l.hiddenUpdates;
  for (a = f & ~a; 0 < a; ) {
    var m = 31 - Ol(a), S = 1 << m;
    c[m] = 0, i[m] = -1;
    var v = d[m];
    if (v !== null)
      for (d[m] = null, m = 0; m < v.length; m++) {
        var o = v[m];
        o !== null && (o.lane &= -536870913);
      }
    a &= ~S;
  }
  u !== 0 && Z0(l, u, 0), n !== 0 && e === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(f & ~t));
}
function Z0(l, t, a) {
  l.pendingLanes |= t, l.suspendedLanes &= ~t;
  var u = 31 - Ol(t);
  l.entangledLanes |= t, l.entanglements[u] = l.entanglements[u] | 1073741824 | a & 4194090;
}
function x0(l, t) {
  var a = l.entangledLanes |= t;
  for (l = l.entanglements; a; ) {
    var u = 31 - Ol(a), e = 1 << u;
    e & t | l[u] & t && (l[u] |= t), a &= ~e;
  }
}
function nc(l) {
  switch (l) {
    case 2:
      l = 1;
      break;
    case 8:
      l = 4;
      break;
    case 32:
      l = 16;
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
      l = 128;
      break;
    case 268435456:
      l = 134217728;
      break;
    default:
      l = 0;
  }
  return l;
}
function fc(l) {
  return l &= -l, 2 < l ? 8 < l ? l & 134217727 ? 32 : 268435456 : 8 : 2;
}
function p0() {
  var l = G.p;
  return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : n1(l.type));
}
function Rd(l, t) {
  var a = G.p;
  try {
    return G.p = l, t();
  } finally {
    G.p = a;
  }
}
var Xt = Math.random().toString(36).slice(2), vl = "__reactFiber$" + Xt, bl = "__reactProps$" + Xt, Ca = "__reactContainer$" + Xt, mf = "__reactEvents$" + Xt, Hd = "__reactListeners$" + Xt, Nd = "__reactHandles$" + Xt, Pc = "__reactResources$" + Xt, xu = "__reactMarker$" + Xt;
function cc(l) {
  delete l[vl], delete l[bl], delete l[mf], delete l[Hd], delete l[Nd];
}
function ha(l) {
  var t = l[vl];
  if (t) return t;
  for (var a = l.parentNode; a; ) {
    if (t = a[Ca] || a[vl]) {
      if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
        for (l = f0(l); l !== null; ) {
          if (a = l[vl]) return a;
          l = f0(l);
        }
      return t;
    }
    l = a, a = l.parentNode;
  }
  return null;
}
function Ka(l) {
  if (l = l[vl] || l[Ca]) {
    var t = l.tag;
    if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
      return l;
  }
  return null;
}
function nu(l) {
  var t = l.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
  throw Error(b(33));
}
function Ea(l) {
  var t = l[Pc];
  return t || (t = l[Pc] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
}
function fl(l) {
  l[xu] = !0;
}
var V0 = /* @__PURE__ */ new Set(), j0 = {};
function ta(l, t) {
  qa(l, t), qa(l + "Capture", t);
}
function qa(l, t) {
  for (j0[l] = t, l = 0; l < t.length; l++)
    V0.add(t[l]);
}
var qd = RegExp(
  "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
), li = {}, ti = {};
function Yd(l) {
  return of.call(ti, l) ? !0 : of.call(li, l) ? !1 : qd.test(l) ? ti[l] = !0 : (li[l] = !0, !1);
}
function oe(l, t, a) {
  if (Yd(t))
    if (a === null) l.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
          l.removeAttribute(t);
          return;
        case "boolean":
          var u = t.toLowerCase().slice(0, 5);
          if (u !== "data-" && u !== "aria-") {
            l.removeAttribute(t);
            return;
          }
      }
      l.setAttribute(t, "" + a);
    }
}
function ue(l, t, a) {
  if (a === null) l.removeAttribute(t);
  else {
    switch (typeof a) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        l.removeAttribute(t);
        return;
    }
    l.setAttribute(t, "" + a);
  }
}
function Fl(l, t, a, u) {
  if (u === null) l.removeAttribute(a);
  else {
    switch (typeof u) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        l.removeAttribute(a);
        return;
    }
    l.setAttributeNS(t, a, "" + u);
  }
}
var Un, ai;
function ca(l) {
  if (Un === void 0)
    try {
      throw Error();
    } catch (a) {
      var t = a.stack.trim().match(/\n( *(at )?)/);
      Un = t && t[1] || "", ai = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
  return `
` + Un + l + ai;
}
var _n = !1;
function Rn(l, t) {
  if (!l || _n) return "";
  _n = !0;
  var a = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var u = {
      DetermineComponentFrameRoot: function() {
        try {
          if (t) {
            var S = function() {
              throw Error();
            };
            if (Object.defineProperty(S.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(S, []);
              } catch (o) {
                var v = o;
              }
              Reflect.construct(l, [], S);
            } else {
              try {
                S.call();
              } catch (o) {
                v = o;
              }
              l.call(S.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (o) {
              v = o;
            }
            (S = l()) && typeof S.catch == "function" && S.catch(function() {
            });
          }
        } catch (o) {
          if (o && v && typeof o.stack == "string")
            return [o.stack, v.stack];
        }
        return [null, null];
      }
    };
    u.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var e = Object.getOwnPropertyDescriptor(
      u.DetermineComponentFrameRoot,
      "name"
    );
    e && e.configurable && Object.defineProperty(
      u.DetermineComponentFrameRoot,
      "name",
      { value: "DetermineComponentFrameRoot" }
    );
    var n = u.DetermineComponentFrameRoot(), f = n[0], c = n[1];
    if (f && c) {
      var i = f.split(`
`), d = c.split(`
`);
      for (e = u = 0; u < i.length && !i[u].includes("DetermineComponentFrameRoot"); )
        u++;
      for (; e < d.length && !d[e].includes(
        "DetermineComponentFrameRoot"
      ); )
        e++;
      if (u === i.length || e === d.length)
        for (u = i.length - 1, e = d.length - 1; 1 <= u && 0 <= e && i[u] !== d[e]; )
          e--;
      for (; 1 <= u && 0 <= e; u--, e--)
        if (i[u] !== d[e]) {
          if (u !== 1 || e !== 1)
            do
              if (u--, e--, 0 > e || i[u] !== d[e]) {
                var m = `
` + i[u].replace(" at new ", " at ");
                return l.displayName && m.includes("<anonymous>") && (m = m.replace("<anonymous>", l.displayName)), m;
              }
            while (1 <= u && 0 <= e);
          break;
        }
    }
  } finally {
    _n = !1, Error.prepareStackTrace = a;
  }
  return (a = l ? l.displayName || l.name : "") ? ca(a) : "";
}
function Qd(l) {
  switch (l.tag) {
    case 26:
    case 27:
    case 5:
      return ca(l.type);
    case 16:
      return ca("Lazy");
    case 13:
      return ca("Suspense");
    case 19:
      return ca("SuspenseList");
    case 0:
    case 15:
      return Rn(l.type, !1);
    case 11:
      return Rn(l.type.render, !1);
    case 1:
      return Rn(l.type, !0);
    case 31:
      return ca("Activity");
    default:
      return "";
  }
}
function ui(l) {
  try {
    var t = "";
    do
      t += Qd(l), l = l.return;
    while (l);
    return t;
  } catch (a) {
    return `
Error generating stack: ` + a.message + `
` + a.stack;
  }
}
function Nl(l) {
  switch (typeof l) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return l;
    case "object":
      return l;
    default:
      return "";
  }
}
function C0(l) {
  var t = l.type;
  return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Bd(l) {
  var t = C0(l) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(
    l.constructor.prototype,
    t
  ), u = "" + l[t];
  if (!l.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
    var e = a.get, n = a.set;
    return Object.defineProperty(l, t, {
      configurable: !0,
      get: function() {
        return e.call(this);
      },
      set: function(f) {
        u = "" + f, n.call(this, f);
      }
    }), Object.defineProperty(l, t, {
      enumerable: a.enumerable
    }), {
      getValue: function() {
        return u;
      },
      setValue: function(f) {
        u = "" + f;
      },
      stopTracking: function() {
        l._valueTracker = null, delete l[t];
      }
    };
  }
}
function Ne(l) {
  l._valueTracker || (l._valueTracker = Bd(l));
}
function K0(l) {
  if (!l) return !1;
  var t = l._valueTracker;
  if (!t) return !0;
  var a = t.getValue(), u = "";
  return l && (u = C0(l) ? l.checked ? "true" : "false" : l.value), l = u, l !== a ? (t.setValue(l), !0) : !1;
}
function qe(l) {
  if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
  try {
    return l.activeElement || l.body;
  } catch {
    return l.body;
  }
}
var Gd = /[\n"\\]/g;
function Ql(l) {
  return l.replace(
    Gd,
    function(t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    }
  );
}
function Sf(l, t, a, u, e, n, f, c) {
  l.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.type = f : l.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + Nl(t)) : l.value !== "" + Nl(t) && (l.value = "" + Nl(t)) : f !== "submit" && f !== "reset" || l.removeAttribute("value"), t != null ? gf(l, f, Nl(t)) : a != null ? gf(l, f, Nl(a)) : u != null && l.removeAttribute("value"), e == null && n != null && (l.defaultChecked = !!n), e != null && (l.checked = e && typeof e != "function" && typeof e != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + Nl(c) : l.removeAttribute("name");
}
function L0(l, t, a, u, e, n, f, c) {
  if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || a != null) {
    if (!(n !== "submit" && n !== "reset" || t != null))
      return;
    a = a != null ? "" + Nl(a) : "", t = t != null ? "" + Nl(t) : a, c || t === l.value || (l.value = t), l.defaultValue = t;
  }
  u = u ?? e, u = typeof u != "function" && typeof u != "symbol" && !!u, l.checked = c ? l.checked : !!u, l.defaultChecked = !!u, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (l.name = f);
}
function gf(l, t, a) {
  t === "number" && qe(l.ownerDocument) === l || l.defaultValue === "" + a || (l.defaultValue = "" + a);
}
function ra(l, t, a, u) {
  if (l = l.options, t) {
    t = {};
    for (var e = 0; e < a.length; e++)
      t["$" + a[e]] = !0;
    for (a = 0; a < l.length; a++)
      e = t.hasOwnProperty("$" + l[a].value), l[a].selected !== e && (l[a].selected = e), e && u && (l[a].defaultSelected = !0);
  } else {
    for (a = "" + Nl(a), t = null, e = 0; e < l.length; e++) {
      if (l[e].value === a) {
        l[e].selected = !0, u && (l[e].defaultSelected = !0);
        return;
      }
      t !== null || l[e].disabled || (t = l[e]);
    }
    t !== null && (t.selected = !0);
  }
}
function J0(l, t, a) {
  if (t != null && (t = "" + Nl(t), t !== l.value && (l.value = t), a == null)) {
    l.defaultValue !== t && (l.defaultValue = t);
    return;
  }
  l.defaultValue = a != null ? "" + Nl(a) : "";
}
function w0(l, t, a, u) {
  if (t == null) {
    if (u != null) {
      if (a != null) throw Error(b(92));
      if (eu(u)) {
        if (1 < u.length) throw Error(b(93));
        u = u[0];
      }
      a = u;
    }
    a == null && (a = ""), t = a;
  }
  a = Nl(t), l.defaultValue = a, u = l.textContent, u === a && u !== "" && u !== null && (l.value = u);
}
function Ya(l, t) {
  if (t) {
    var a = l.firstChild;
    if (a && a === l.lastChild && a.nodeType === 3) {
      a.nodeValue = t;
      return;
    }
  }
  l.textContent = t;
}
var Xd = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " "
  )
);
function ei(l, t, a) {
  var u = t.indexOf("--") === 0;
  a == null || typeof a == "boolean" || a === "" ? u ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : u ? l.setProperty(t, a) : typeof a != "number" || a === 0 || Xd.has(t) ? t === "float" ? l.cssFloat = a : l[t] = ("" + a).trim() : l[t] = a + "px";
}
function W0(l, t, a) {
  if (t != null && typeof t != "object")
    throw Error(b(62));
  if (l = l.style, a != null) {
    for (var u in a)
      !a.hasOwnProperty(u) || t != null && t.hasOwnProperty(u) || (u.indexOf("--") === 0 ? l.setProperty(u, "") : u === "float" ? l.cssFloat = "" : l[u] = "");
    for (var e in t)
      u = t[e], t.hasOwnProperty(e) && a[e] !== u && ei(l, e, u);
  } else
    for (var n in t)
      t.hasOwnProperty(n) && ei(l, n, t[n]);
}
function ic(l) {
  if (l.indexOf("-") === -1) return !1;
  switch (l) {
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
var Zd = /* @__PURE__ */ new Map([
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
]), xd = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function me(l) {
  return xd.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
}
var bf = null;
function sc(l) {
  return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
}
var oa = null, Oa = null;
function ni(l) {
  var t = Ka(l);
  if (t && (l = t.stateNode)) {
    var a = l[bl] || null;
    l: switch (l = t.stateNode, t.type) {
      case "input":
        if (Sf(
          l,
          a.value,
          a.defaultValue,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name
        ), t = a.name, a.type === "radio" && t != null) {
          for (a = l; a.parentNode; ) a = a.parentNode;
          for (a = a.querySelectorAll(
            'input[name="' + Ql(
              "" + t
            ) + '"][type="radio"]'
          ), t = 0; t < a.length; t++) {
            var u = a[t];
            if (u !== l && u.form === l.form) {
              var e = u[bl] || null;
              if (!e) throw Error(b(90));
              Sf(
                u,
                e.value,
                e.defaultValue,
                e.defaultValue,
                e.checked,
                e.defaultChecked,
                e.type,
                e.name
              );
            }
          }
          for (t = 0; t < a.length; t++)
            u = a[t], u.form === l.form && K0(u);
        }
        break l;
      case "textarea":
        J0(l, a.value, a.defaultValue);
        break l;
      case "select":
        t = a.value, t != null && ra(l, !!a.multiple, t, !1);
    }
  }
}
var Hn = !1;
function $0(l, t, a) {
  if (Hn) return l(t, a);
  Hn = !0;
  try {
    var u = l(t);
    return u;
  } finally {
    if (Hn = !1, (oa !== null || Oa !== null) && (Sn(), oa && (t = oa, l = Oa, Oa = oa = null, ni(t), l)))
      for (t = 0; t < l.length; t++) ni(l[t]);
  }
}
function Mu(l, t) {
  var a = l.stateNode;
  if (a === null) return null;
  var u = a[bl] || null;
  if (u === null) return null;
  a = u[t];
  l: switch (t) {
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
      (u = !u.disabled) || (l = l.type, u = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !u;
      break l;
    default:
      l = !1;
  }
  if (l) return null;
  if (a && typeof a != "function")
    throw Error(
      b(231, t, typeof a)
    );
  return a;
}
var it = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), zf = !1;
if (it)
  try {
    var ka = {};
    Object.defineProperty(ka, "passive", {
      get: function() {
        zf = !0;
      }
    }), window.addEventListener("test", ka, ka), window.removeEventListener("test", ka, ka);
  } catch {
    zf = !1;
  }
var Et = null, yc = null, Se = null;
function k0() {
  if (Se) return Se;
  var l, t = yc, a = t.length, u, e = "value" in Et ? Et.value : Et.textContent, n = e.length;
  for (l = 0; l < a && t[l] === e[l]; l++) ;
  var f = a - l;
  for (u = 1; u <= f && t[a - u] === e[n - u]; u++) ;
  return Se = e.slice(l, 1 < u ? 1 - u : void 0);
}
function ge(l) {
  var t = l.keyCode;
  return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
}
function ee() {
  return !0;
}
function fi() {
  return !1;
}
function zl(l) {
  function t(a, u, e, n, f) {
    this._reactName = a, this._targetInst = e, this.type = u, this.nativeEvent = n, this.target = f, this.currentTarget = null;
    for (var c in l)
      l.hasOwnProperty(c) && (a = l[c], this[c] = a ? a(n) : n[c]);
    return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? ee : fi, this.isPropagationStopped = fi, this;
  }
  return C(t.prototype, {
    preventDefault: function() {
      this.defaultPrevented = !0;
      var a = this.nativeEvent;
      a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = ee);
    },
    stopPropagation: function() {
      var a = this.nativeEvent;
      a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = ee);
    },
    persist: function() {
    },
    isPersistent: ee
  }), t;
}
var aa = {
  eventPhase: 0,
  bubbles: 0,
  cancelable: 0,
  timeStamp: function(l) {
    return l.timeStamp || Date.now();
  },
  defaultPrevented: 0,
  isTrusted: 0
}, fn = zl(aa), pu = C({}, aa, { view: 0, detail: 0 }), pd = zl(pu), Nn, qn, Fa, cn = C({}, pu, {
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
  getModifierState: dc,
  button: 0,
  buttons: 0,
  relatedTarget: function(l) {
    return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
  },
  movementX: function(l) {
    return "movementX" in l ? l.movementX : (l !== Fa && (Fa && l.type === "mousemove" ? (Nn = l.screenX - Fa.screenX, qn = l.screenY - Fa.screenY) : qn = Nn = 0, Fa = l), Nn);
  },
  movementY: function(l) {
    return "movementY" in l ? l.movementY : qn;
  }
}), ci = zl(cn), Vd = C({}, cn, { dataTransfer: 0 }), jd = zl(Vd), Cd = C({}, pu, { relatedTarget: 0 }), Yn = zl(Cd), Kd = C({}, aa, {
  animationName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), Ld = zl(Kd), Jd = C({}, aa, {
  clipboardData: function(l) {
    return "clipboardData" in l ? l.clipboardData : window.clipboardData;
  }
}), wd = zl(Jd), Wd = C({}, aa, { data: 0 }), ii = zl(Wd), $d = {
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
}, kd = {
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
}, Fd = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};
function Id(l) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(l) : (l = Fd[l]) ? !!t[l] : !1;
}
function dc() {
  return Id;
}
var Pd = C({}, pu, {
  key: function(l) {
    if (l.key) {
      var t = $d[l.key] || l.key;
      if (t !== "Unidentified") return t;
    }
    return l.type === "keypress" ? (l = ge(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? kd[l.keyCode] || "Unidentified" : "";
  },
  code: 0,
  location: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  repeat: 0,
  locale: 0,
  getModifierState: dc,
  charCode: function(l) {
    return l.type === "keypress" ? ge(l) : 0;
  },
  keyCode: function(l) {
    return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  },
  which: function(l) {
    return l.type === "keypress" ? ge(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  }
}), lv = zl(Pd), tv = C({}, cn, {
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
}), si = zl(tv), av = C({}, pu, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: dc
}), uv = zl(av), ev = C({}, aa, {
  propertyName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), nv = zl(ev), fv = C({}, cn, {
  deltaX: function(l) {
    return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
  },
  deltaY: function(l) {
    return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), cv = zl(fv), iv = C({}, aa, {
  newState: 0,
  oldState: 0
}), sv = zl(iv), yv = [9, 13, 27, 32], vc = it && "CompositionEvent" in window, cu = null;
it && "documentMode" in document && (cu = document.documentMode);
var dv = it && "TextEvent" in window && !cu, F0 = it && (!vc || cu && 8 < cu && 11 >= cu), yi = " ", di = !1;
function I0(l, t) {
  switch (l) {
    case "keyup":
      return yv.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function P0(l) {
  return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
}
var ma = !1;
function vv(l, t) {
  switch (l) {
    case "compositionend":
      return P0(t);
    case "keypress":
      return t.which !== 32 ? null : (di = !0, yi);
    case "textInput":
      return l = t.data, l === yi && di ? null : l;
    default:
      return null;
  }
}
function hv(l, t) {
  if (ma)
    return l === "compositionend" || !vc && I0(l, t) ? (l = k0(), Se = yc = Et = null, ma = !1, l) : null;
  switch (l) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length)
          return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return F0 && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var ov = {
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
function vi(l) {
  var t = l && l.nodeName && l.nodeName.toLowerCase();
  return t === "input" ? !!ov[l.type] : t === "textarea";
}
function ls(l, t, a, u) {
  oa ? Oa ? Oa.push(u) : Oa = [u] : oa = u, t = ke(t, "onChange"), 0 < t.length && (a = new fn(
    "onChange",
    "change",
    null,
    a,
    u
  ), l.push({ event: a, listeners: t }));
}
var iu = null, Eu = null;
function mv(l) {
  Jy(l, 0);
}
function sn(l) {
  var t = nu(l);
  if (K0(t)) return l;
}
function hi(l, t) {
  if (l === "change") return t;
}
var ts = !1;
if (it) {
  var Qn;
  if (it) {
    var Bn = "oninput" in document;
    if (!Bn) {
      var oi = document.createElement("div");
      oi.setAttribute("oninput", "return;"), Bn = typeof oi.oninput == "function";
    }
    Qn = Bn;
  } else Qn = !1;
  ts = Qn && (!document.documentMode || 9 < document.documentMode);
}
function mi() {
  iu && (iu.detachEvent("onpropertychange", as), Eu = iu = null);
}
function as(l) {
  if (l.propertyName === "value" && sn(Eu)) {
    var t = [];
    ls(
      t,
      Eu,
      l,
      sc(l)
    ), $0(mv, t);
  }
}
function Sv(l, t, a) {
  l === "focusin" ? (mi(), iu = t, Eu = a, iu.attachEvent("onpropertychange", as)) : l === "focusout" && mi();
}
function gv(l) {
  if (l === "selectionchange" || l === "keyup" || l === "keydown")
    return sn(Eu);
}
function bv(l, t) {
  if (l === "click") return sn(t);
}
function zv(l, t) {
  if (l === "input" || l === "change")
    return sn(t);
}
function Tv(l, t) {
  return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
}
var _l = typeof Object.is == "function" ? Object.is : Tv;
function ru(l, t) {
  if (_l(l, t)) return !0;
  if (typeof l != "object" || l === null || typeof t != "object" || t === null)
    return !1;
  var a = Object.keys(l), u = Object.keys(t);
  if (a.length !== u.length) return !1;
  for (u = 0; u < a.length; u++) {
    var e = a[u];
    if (!of.call(t, e) || !_l(l[e], t[e]))
      return !1;
  }
  return !0;
}
function Si(l) {
  for (; l && l.firstChild; ) l = l.firstChild;
  return l;
}
function gi(l, t) {
  var a = Si(l);
  l = 0;
  for (var u; a; ) {
    if (a.nodeType === 3) {
      if (u = l + a.textContent.length, l <= t && u >= t)
        return { node: a, offset: t - l };
      l = u;
    }
    l: {
      for (; a; ) {
        if (a.nextSibling) {
          a = a.nextSibling;
          break l;
        }
        a = a.parentNode;
      }
      a = void 0;
    }
    a = Si(a);
  }
}
function us(l, t) {
  return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? us(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
}
function es(l) {
  l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
  for (var t = qe(l.document); t instanceof l.HTMLIFrameElement; ) {
    try {
      var a = typeof t.contentWindow.location.href == "string";
    } catch {
      a = !1;
    }
    if (a) l = t.contentWindow;
    else break;
    t = qe(l.document);
  }
  return t;
}
function hc(l) {
  var t = l && l.nodeName && l.nodeName.toLowerCase();
  return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
}
var Av = it && "documentMode" in document && 11 >= document.documentMode, Sa = null, Tf = null, su = null, Af = !1;
function bi(l, t, a) {
  var u = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
  Af || Sa == null || Sa !== qe(u) || (u = Sa, "selectionStart" in u && hc(u) ? u = { start: u.selectionStart, end: u.selectionEnd } : (u = (u.ownerDocument && u.ownerDocument.defaultView || window).getSelection(), u = {
    anchorNode: u.anchorNode,
    anchorOffset: u.anchorOffset,
    focusNode: u.focusNode,
    focusOffset: u.focusOffset
  }), su && ru(su, u) || (su = u, u = ke(Tf, "onSelect"), 0 < u.length && (t = new fn(
    "onSelect",
    "select",
    null,
    t,
    a
  ), l.push({ event: t, listeners: u }), t.target = Sa)));
}
function pt(l, t) {
  var a = {};
  return a[l.toLowerCase()] = t.toLowerCase(), a["Webkit" + l] = "webkit" + t, a["Moz" + l] = "moz" + t, a;
}
var ga = {
  animationend: pt("Animation", "AnimationEnd"),
  animationiteration: pt("Animation", "AnimationIteration"),
  animationstart: pt("Animation", "AnimationStart"),
  transitionrun: pt("Transition", "TransitionRun"),
  transitionstart: pt("Transition", "TransitionStart"),
  transitioncancel: pt("Transition", "TransitionCancel"),
  transitionend: pt("Transition", "TransitionEnd")
}, Gn = {}, ns = {};
it && (ns = document.createElement("div").style, "AnimationEvent" in window || (delete ga.animationend.animation, delete ga.animationiteration.animation, delete ga.animationstart.animation), "TransitionEvent" in window || delete ga.transitionend.transition);
function ua(l) {
  if (Gn[l]) return Gn[l];
  if (!ga[l]) return l;
  var t = ga[l], a;
  for (a in t)
    if (t.hasOwnProperty(a) && a in ns)
      return Gn[l] = t[a];
  return l;
}
var fs = ua("animationend"), cs = ua("animationiteration"), is = ua("animationstart"), Mv = ua("transitionrun"), Ev = ua("transitionstart"), rv = ua("transitioncancel"), ss = ua("transitionend"), ys = /* @__PURE__ */ new Map(), Mf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
  " "
);
Mf.push("scrollEnd");
function jl(l, t) {
  ys.set(l, t), ta(t, [l]);
}
var zi = /* @__PURE__ */ new WeakMap();
function Bl(l, t) {
  if (typeof l == "object" && l !== null) {
    var a = zi.get(l);
    return a !== void 0 ? a : (t = {
      value: l,
      source: t,
      stack: ui(t)
    }, zi.set(l, t), t);
  }
  return {
    value: l,
    source: t,
    stack: ui(t)
  };
}
var Hl = [], ba = 0, oc = 0;
function yn() {
  for (var l = ba, t = oc = ba = 0; t < l; ) {
    var a = Hl[t];
    Hl[t++] = null;
    var u = Hl[t];
    Hl[t++] = null;
    var e = Hl[t];
    Hl[t++] = null;
    var n = Hl[t];
    if (Hl[t++] = null, u !== null && e !== null) {
      var f = u.pending;
      f === null ? e.next = e : (e.next = f.next, f.next = e), u.pending = e;
    }
    n !== 0 && ds(a, e, n);
  }
}
function dn(l, t, a, u) {
  Hl[ba++] = l, Hl[ba++] = t, Hl[ba++] = a, Hl[ba++] = u, oc |= u, l.lanes |= u, l = l.alternate, l !== null && (l.lanes |= u);
}
function mc(l, t, a, u) {
  return dn(l, t, a, u), Ye(l);
}
function La(l, t) {
  return dn(l, null, null, t), Ye(l);
}
function ds(l, t, a) {
  l.lanes |= a;
  var u = l.alternate;
  u !== null && (u.lanes |= a);
  for (var e = !1, n = l.return; n !== null; )
    n.childLanes |= a, u = n.alternate, u !== null && (u.childLanes |= a), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (e = !0)), l = n, n = n.return;
  return l.tag === 3 ? (n = l.stateNode, e && t !== null && (e = 31 - Ol(a), l = n.hiddenUpdates, u = l[e], u === null ? l[e] = [t] : u.push(t), t.lane = a | 536870912), n) : null;
}
function Ye(l) {
  if (50 < zu)
    throw zu = 0, Cf = null, Error(b(185));
  for (var t = l.return; t !== null; )
    l = t, t = l.return;
  return l.tag === 3 ? l.stateNode : null;
}
var za = {};
function Ov(l, t, a, u) {
  this.tag = l, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = u, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function El(l, t, a, u) {
  return new Ov(l, t, a, u);
}
function Sc(l) {
  return l = l.prototype, !(!l || !l.isReactComponent);
}
function ft(l, t) {
  var a = l.alternate;
  return a === null ? (a = El(
    l.tag,
    t,
    l.key,
    l.mode
  ), a.elementType = l.elementType, a.type = l.type, a.stateNode = l.stateNode, a.alternate = l, l.alternate = a) : (a.pendingProps = t, a.type = l.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = l.flags & 65011712, a.childLanes = l.childLanes, a.lanes = l.lanes, a.child = l.child, a.memoizedProps = l.memoizedProps, a.memoizedState = l.memoizedState, a.updateQueue = l.updateQueue, t = l.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = l.sibling, a.index = l.index, a.ref = l.ref, a.refCleanup = l.refCleanup, a;
}
function vs(l, t) {
  l.flags &= 65011714;
  var a = l.alternate;
  return a === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = a.childLanes, l.lanes = a.lanes, l.child = a.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = a.memoizedProps, l.memoizedState = a.memoizedState, l.updateQueue = a.updateQueue, l.type = a.type, t = a.dependencies, l.dependencies = t === null ? null : {
    lanes: t.lanes,
    firstContext: t.firstContext
  }), l;
}
function be(l, t, a, u, e, n) {
  var f = 0;
  if (u = l, typeof l == "function") Sc(l) && (f = 1);
  else if (typeof l == "string")
    f = Uh(
      l,
      a,
      Jl.current
    ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
  else
    l: switch (l) {
      case yf:
        return l = El(31, a, t, e), l.elementType = yf, l.lanes = n, l;
      case da:
        return Lt(a.children, e, n, t);
      case N0:
        f = 8, e |= 24;
        break;
      case ff:
        return l = El(12, a, t, e | 2), l.elementType = ff, l.lanes = n, l;
      case cf:
        return l = El(13, a, t, e), l.elementType = cf, l.lanes = n, l;
      case sf:
        return l = El(19, a, t, e), l.elementType = sf, l.lanes = n, l;
      default:
        if (typeof l == "object" && l !== null)
          switch (l.$$typeof) {
            case md:
            case tt:
              f = 10;
              break l;
            case q0:
              f = 9;
              break l;
            case ac:
              f = 11;
              break l;
            case uc:
              f = 14;
              break l;
            case St:
              f = 16, u = null;
              break l;
          }
        f = 29, a = Error(
          b(130, l === null ? "null" : typeof l, "")
        ), u = null;
    }
  return t = El(f, a, t, e), t.elementType = l, t.type = u, t.lanes = n, t;
}
function Lt(l, t, a, u) {
  return l = El(7, l, u, t), l.lanes = a, l;
}
function Xn(l, t, a) {
  return l = El(6, l, null, t), l.lanes = a, l;
}
function Zn(l, t, a) {
  return t = El(
    4,
    l.children !== null ? l.children : [],
    l.key,
    t
  ), t.lanes = a, t.stateNode = {
    containerInfo: l.containerInfo,
    pendingChildren: null,
    implementation: l.implementation
  }, t;
}
var Ta = [], Aa = 0, Qe = null, Be = 0, ql = [], Yl = 0, Jt = null, at = 1, ut = "";
function jt(l, t) {
  Ta[Aa++] = Be, Ta[Aa++] = Qe, Qe = l, Be = t;
}
function hs(l, t, a) {
  ql[Yl++] = at, ql[Yl++] = ut, ql[Yl++] = Jt, Jt = l;
  var u = at;
  l = ut;
  var e = 32 - Ol(u) - 1;
  u &= ~(1 << e), a += 1;
  var n = 32 - Ol(t) + e;
  if (30 < n) {
    var f = e - e % 5;
    n = (u & (1 << f) - 1).toString(32), u >>= f, e -= f, at = 1 << 32 - Ol(t) + e | a << e | u, ut = n + l;
  } else
    at = 1 << n | a << e | u, ut = l;
}
function gc(l) {
  l.return !== null && (jt(l, 1), hs(l, 1, 0));
}
function bc(l) {
  for (; l === Qe; )
    Qe = Ta[--Aa], Ta[Aa] = null, Be = Ta[--Aa], Ta[Aa] = null;
  for (; l === Jt; )
    Jt = ql[--Yl], ql[Yl] = null, ut = ql[--Yl], ql[Yl] = null, at = ql[--Yl], ql[Yl] = null;
}
var ol = null, w = null, B = !1, wt = null, Kl = !1, Ef = Error(b(519));
function Ft(l) {
  var t = Error(b(418, ""));
  throw Ou(Bl(t, l)), Ef;
}
function Ti(l) {
  var t = l.stateNode, a = l.type, u = l.memoizedProps;
  switch (t[vl] = l, t[bl] = u, a) {
    case "dialog":
      H("cancel", t), H("close", t);
      break;
    case "iframe":
    case "object":
    case "embed":
      H("load", t);
      break;
    case "video":
    case "audio":
      for (a = 0; a < _u.length; a++)
        H(_u[a], t);
      break;
    case "source":
      H("error", t);
      break;
    case "img":
    case "image":
    case "link":
      H("error", t), H("load", t);
      break;
    case "details":
      H("toggle", t);
      break;
    case "input":
      H("invalid", t), L0(
        t,
        u.value,
        u.defaultValue,
        u.checked,
        u.defaultChecked,
        u.type,
        u.name,
        !0
      ), Ne(t);
      break;
    case "select":
      H("invalid", t);
      break;
    case "textarea":
      H("invalid", t), w0(t, u.value, u.defaultValue, u.children), Ne(t);
  }
  a = u.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || u.suppressHydrationWarning === !0 || Wy(t.textContent, a) ? (u.popover != null && (H("beforetoggle", t), H("toggle", t)), u.onScroll != null && H("scroll", t), u.onScrollEnd != null && H("scrollend", t), u.onClick != null && (t.onclick = zn), t = !0) : t = !1, t || Ft(l);
}
function Ai(l) {
  for (ol = l.return; ol; )
    switch (ol.tag) {
      case 5:
      case 13:
        Kl = !1;
        return;
      case 27:
      case 3:
        Kl = !0;
        return;
      default:
        ol = ol.return;
    }
}
function Ia(l) {
  if (l !== ol) return !1;
  if (!B) return Ai(l), B = !0, !1;
  var t = l.tag, a;
  if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = l.type, a = !(a !== "form" && a !== "button") || $f(l.type, l.memoizedProps)), a = !a), a && w && Ft(l), Ai(l), t === 13) {
    if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(b(317));
    l: {
      for (l = l.nextSibling, t = 0; l; ) {
        if (l.nodeType === 8)
          if (a = l.data, a === "/$") {
            if (t === 0) {
              w = Vl(l.nextSibling);
              break l;
            }
            t--;
          } else
            a !== "$" && a !== "$!" && a !== "$?" || t++;
        l = l.nextSibling;
      }
      w = null;
    }
  } else
    t === 27 ? (t = w, Zt(l.type) ? (l = If, If = null, w = l) : w = t) : w = ol ? Vl(l.stateNode.nextSibling) : null;
  return !0;
}
function Vu() {
  w = ol = null, B = !1;
}
function Mi() {
  var l = wt;
  return l !== null && (gl === null ? gl = l : gl.push.apply(
    gl,
    l
  ), wt = null), l;
}
function Ou(l) {
  wt === null ? wt = [l] : wt.push(l);
}
var rf = $l(null), ea = null, et = null;
function bt(l, t, a) {
  L(rf, t._currentValue), t._currentValue = a;
}
function ct(l) {
  l._currentValue = rf.current, il(rf);
}
function Of(l, t, a) {
  for (; l !== null; ) {
    var u = l.alternate;
    if ((l.childLanes & t) !== t ? (l.childLanes |= t, u !== null && (u.childLanes |= t)) : u !== null && (u.childLanes & t) !== t && (u.childLanes |= t), l === a) break;
    l = l.return;
  }
}
function Df(l, t, a, u) {
  var e = l.child;
  for (e !== null && (e.return = l); e !== null; ) {
    var n = e.dependencies;
    if (n !== null) {
      var f = e.child;
      n = n.firstContext;
      l: for (; n !== null; ) {
        var c = n;
        n = e;
        for (var i = 0; i < t.length; i++)
          if (c.context === t[i]) {
            n.lanes |= a, c = n.alternate, c !== null && (c.lanes |= a), Of(
              n.return,
              a,
              l
            ), u || (f = null);
            break l;
          }
        n = c.next;
      }
    } else if (e.tag === 18) {
      if (f = e.return, f === null) throw Error(b(341));
      f.lanes |= a, n = f.alternate, n !== null && (n.lanes |= a), Of(f, a, l), f = null;
    } else f = e.child;
    if (f !== null) f.return = e;
    else
      for (f = e; f !== null; ) {
        if (f === l) {
          f = null;
          break;
        }
        if (e = f.sibling, e !== null) {
          e.return = f.return, f = e;
          break;
        }
        f = f.return;
      }
    e = f;
  }
}
function ju(l, t, a, u) {
  l = null;
  for (var e = t, n = !1; e !== null; ) {
    if (!n) {
      if (e.flags & 524288) n = !0;
      else if (e.flags & 262144) break;
    }
    if (e.tag === 10) {
      var f = e.alternate;
      if (f === null) throw Error(b(387));
      if (f = f.memoizedProps, f !== null) {
        var c = e.type;
        _l(e.pendingProps.value, f.value) || (l !== null ? l.push(c) : l = [c]);
      }
    } else if (e === Ue.current) {
      if (f = e.alternate, f === null) throw Error(b(387));
      f.memoizedState.memoizedState !== e.memoizedState.memoizedState && (l !== null ? l.push(Nu) : l = [Nu]);
    }
    e = e.return;
  }
  l !== null && Df(
    t,
    l,
    a,
    u
  ), t.flags |= 262144;
}
function Ge(l) {
  for (l = l.firstContext; l !== null; ) {
    if (!_l(
      l.context._currentValue,
      l.memoizedValue
    ))
      return !0;
    l = l.next;
  }
  return !1;
}
function It(l) {
  ea = l, et = null, l = l.dependencies, l !== null && (l.firstContext = null);
}
function hl(l) {
  return os(ea, l);
}
function ne(l, t) {
  return ea === null && It(l), os(l, t);
}
function os(l, t) {
  var a = t._currentValue;
  if (t = { context: t, memoizedValue: a, next: null }, et === null) {
    if (l === null) throw Error(b(308));
    et = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
  } else et = et.next = t;
  return a;
}
var Dv = typeof AbortController < "u" ? AbortController : function() {
  var l = [], t = this.signal = {
    aborted: !1,
    addEventListener: function(a, u) {
      l.push(u);
    }
  };
  this.abort = function() {
    t.aborted = !0, l.forEach(function(a) {
      return a();
    });
  };
}, Uv = ul.unstable_scheduleCallback, _v = ul.unstable_NormalPriority, tl = {
  $$typeof: tt,
  Consumer: null,
  Provider: null,
  _currentValue: null,
  _currentValue2: null,
  _threadCount: 0
};
function zc() {
  return {
    controller: new Dv(),
    data: /* @__PURE__ */ new Map(),
    refCount: 0
  };
}
function Cu(l) {
  l.refCount--, l.refCount === 0 && Uv(_v, function() {
    l.controller.abort();
  });
}
var yu = null, Uf = 0, Qa = 0, Da = null;
function Rv(l, t) {
  if (yu === null) {
    var a = yu = [];
    Uf = 0, Qa = jc(), Da = {
      status: "pending",
      value: void 0,
      then: function(u) {
        a.push(u);
      }
    };
  }
  return Uf++, t.then(Ei, Ei), t;
}
function Ei() {
  if (--Uf === 0 && yu !== null) {
    Da !== null && (Da.status = "fulfilled");
    var l = yu;
    yu = null, Qa = 0, Da = null;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
}
function Hv(l, t) {
  var a = [], u = {
    status: "pending",
    value: null,
    reason: null,
    then: function(e) {
      a.push(e);
    }
  };
  return l.then(
    function() {
      u.status = "fulfilled", u.value = t;
      for (var e = 0; e < a.length; e++) (0, a[e])(t);
    },
    function(e) {
      for (u.status = "rejected", u.reason = e, e = 0; e < a.length; e++)
        (0, a[e])(void 0);
    }
  ), u;
}
var ri = O.S;
O.S = function(l, t) {
  typeof t == "object" && t !== null && typeof t.then == "function" && Rv(l, t), ri !== null && ri(l, t);
};
var Wt = $l(null);
function Tc() {
  var l = Wt.current;
  return l !== null ? l : j.pooledCache;
}
function ze(l, t) {
  t === null ? L(Wt, Wt.current) : L(Wt, t.pool);
}
function ms() {
  var l = Tc();
  return l === null ? null : { parent: tl._currentValue, pool: l };
}
var Ku = Error(b(460)), Ss = Error(b(474)), vn = Error(b(542)), _f = { then: function() {
} };
function Oi(l) {
  return l = l.status, l === "fulfilled" || l === "rejected";
}
function fe() {
}
function gs(l, t, a) {
  switch (a = l[a], a === void 0 ? l.push(t) : a !== t && (t.then(fe, fe), t = a), t.status) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw l = t.reason, Ui(l), l;
    default:
      if (typeof t.status == "string") t.then(fe, fe);
      else {
        if (l = j, l !== null && 100 < l.shellSuspendCounter)
          throw Error(b(482));
        l = t, l.status = "pending", l.then(
          function(u) {
            if (t.status === "pending") {
              var e = t;
              e.status = "fulfilled", e.value = u;
            }
          },
          function(u) {
            if (t.status === "pending") {
              var e = t;
              e.status = "rejected", e.reason = u;
            }
          }
        );
      }
      switch (t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw l = t.reason, Ui(l), l;
      }
      throw du = t, Ku;
  }
}
var du = null;
function Di() {
  if (du === null) throw Error(b(459));
  var l = du;
  return du = null, l;
}
function Ui(l) {
  if (l === Ku || l === vn)
    throw Error(b(483));
}
var gt = !1;
function Ac(l) {
  l.updateQueue = {
    baseState: l.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null
  };
}
function Rf(l, t) {
  l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
    baseState: l.baseState,
    firstBaseUpdate: l.firstBaseUpdate,
    lastBaseUpdate: l.lastBaseUpdate,
    shared: l.shared,
    callbacks: null
  });
}
function Ut(l) {
  return { lane: l, tag: 0, payload: null, callback: null, next: null };
}
function _t(l, t, a) {
  var u = l.updateQueue;
  if (u === null) return null;
  if (u = u.shared, Z & 2) {
    var e = u.pending;
    return e === null ? t.next = t : (t.next = e.next, e.next = t), u.pending = t, t = Ye(l), ds(l, null, a), t;
  }
  return dn(l, u, t, a), Ye(l);
}
function vu(l, t, a) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
    var u = t.lanes;
    u &= l.pendingLanes, a |= u, t.lanes = a, x0(l, a);
  }
}
function xn(l, t) {
  var a = l.updateQueue, u = l.alternate;
  if (u !== null && (u = u.updateQueue, a === u)) {
    var e = null, n = null;
    if (a = a.firstBaseUpdate, a !== null) {
      do {
        var f = {
          lane: a.lane,
          tag: a.tag,
          payload: a.payload,
          callback: null,
          next: null
        };
        n === null ? e = n = f : n = n.next = f, a = a.next;
      } while (a !== null);
      n === null ? e = n = t : n = n.next = t;
    } else e = n = t;
    a = {
      baseState: u.baseState,
      firstBaseUpdate: e,
      lastBaseUpdate: n,
      shared: u.shared,
      callbacks: u.callbacks
    }, l.updateQueue = a;
    return;
  }
  l = a.lastBaseUpdate, l === null ? a.firstBaseUpdate = t : l.next = t, a.lastBaseUpdate = t;
}
var Hf = !1;
function hu() {
  if (Hf) {
    var l = Da;
    if (l !== null) throw l;
  }
}
function ou(l, t, a, u) {
  Hf = !1;
  var e = l.updateQueue;
  gt = !1;
  var n = e.firstBaseUpdate, f = e.lastBaseUpdate, c = e.shared.pending;
  if (c !== null) {
    e.shared.pending = null;
    var i = c, d = i.next;
    i.next = null, f === null ? n = d : f.next = d, f = i;
    var m = l.alternate;
    m !== null && (m = m.updateQueue, c = m.lastBaseUpdate, c !== f && (c === null ? m.firstBaseUpdate = d : c.next = d, m.lastBaseUpdate = i));
  }
  if (n !== null) {
    var S = e.baseState;
    f = 0, m = d = i = null, c = n;
    do {
      var v = c.lane & -536870913, o = v !== c.lane;
      if (o ? (Y & v) === v : (u & v) === v) {
        v !== 0 && v === Qa && (Hf = !0), m !== null && (m = m.next = {
          lane: 0,
          tag: c.tag,
          payload: c.payload,
          callback: null,
          next: null
        });
        l: {
          var E = l, M = c;
          v = t;
          var Q = a;
          switch (M.tag) {
            case 1:
              if (E = M.payload, typeof E == "function") {
                S = E.call(Q, S, v);
                break l;
              }
              S = E;
              break l;
            case 3:
              E.flags = E.flags & -65537 | 128;
            case 0:
              if (E = M.payload, v = typeof E == "function" ? E.call(Q, S, v) : E, v == null) break l;
              S = C({}, S, v);
              break l;
            case 2:
              gt = !0;
          }
        }
        v = c.callback, v !== null && (l.flags |= 64, o && (l.flags |= 8192), o = e.callbacks, o === null ? e.callbacks = [v] : o.push(v));
      } else
        o = {
          lane: v,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null
        }, m === null ? (d = m = o, i = S) : m = m.next = o, f |= v;
      if (c = c.next, c === null) {
        if (c = e.shared.pending, c === null)
          break;
        o = c, c = o.next, o.next = null, e.lastBaseUpdate = o, e.shared.pending = null;
      }
    } while (!0);
    m === null && (i = S), e.baseState = i, e.firstBaseUpdate = d, e.lastBaseUpdate = m, n === null && (e.shared.lanes = 0), Gt |= f, l.lanes = f, l.memoizedState = S;
  }
}
function bs(l, t) {
  if (typeof l != "function")
    throw Error(b(191, l));
  l.call(t);
}
function zs(l, t) {
  var a = l.callbacks;
  if (a !== null)
    for (l.callbacks = null, l = 0; l < a.length; l++)
      bs(a[l], t);
}
var Ba = $l(null), Xe = $l(0);
function _i(l, t) {
  l = dt, L(Xe, l), L(Ba, t), dt = l | t.baseLanes;
}
function Nf() {
  L(Xe, dt), L(Ba, Ba.current);
}
function Mc() {
  dt = Xe.current, il(Ba), il(Xe);
}
var Qt = 0, U = null, p = null, P = null, Ze = !1, Ua = !1, Pt = !1, xe = 0, Du = 0, _a = null, Nv = 0;
function F() {
  throw Error(b(321));
}
function Ec(l, t) {
  if (t === null) return !1;
  for (var a = 0; a < t.length && a < l.length; a++)
    if (!_l(l[a], t[a])) return !1;
  return !0;
}
function rc(l, t, a, u, e, n) {
  return Qt = n, U = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = l === null || l.memoizedState === null ? ks : Fs, Pt = !1, n = a(u, e), Pt = !1, Ua && (n = As(
    t,
    a,
    u,
    e
  )), Ts(l), n;
}
function Ts(l) {
  O.H = pe;
  var t = p !== null && p.next !== null;
  if (Qt = 0, P = p = U = null, Ze = !1, Du = 0, _a = null, t) throw Error(b(300));
  l === null || cl || (l = l.dependencies, l !== null && Ge(l) && (cl = !0));
}
function As(l, t, a, u) {
  U = l;
  var e = 0;
  do {
    if (Ua && (_a = null), Du = 0, Ua = !1, 25 <= e) throw Error(b(301));
    if (e += 1, P = p = null, l.updateQueue != null) {
      var n = l.updateQueue;
      n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
    }
    O.H = Zv, n = t(a, u);
  } while (Ua);
  return n;
}
function qv() {
  var l = O.H, t = l.useState()[0];
  return t = typeof t.then == "function" ? Lu(t) : t, l = l.useState()[0], (p !== null ? p.memoizedState : null) !== l && (U.flags |= 1024), t;
}
function Oc() {
  var l = xe !== 0;
  return xe = 0, l;
}
function Dc(l, t, a) {
  t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~a;
}
function Uc(l) {
  if (Ze) {
    for (l = l.memoizedState; l !== null; ) {
      var t = l.queue;
      t !== null && (t.pending = null), l = l.next;
    }
    Ze = !1;
  }
  Qt = 0, P = p = U = null, Ua = !1, Du = xe = 0, _a = null;
}
function ml() {
  var l = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  return P === null ? U.memoizedState = P = l : P = P.next = l, P;
}
function ll() {
  if (p === null) {
    var l = U.alternate;
    l = l !== null ? l.memoizedState : null;
  } else l = p.next;
  var t = P === null ? U.memoizedState : P.next;
  if (t !== null)
    P = t, p = l;
  else {
    if (l === null)
      throw U.alternate === null ? Error(b(467)) : Error(b(310));
    p = l, l = {
      memoizedState: p.memoizedState,
      baseState: p.baseState,
      baseQueue: p.baseQueue,
      queue: p.queue,
      next: null
    }, P === null ? U.memoizedState = P = l : P = P.next = l;
  }
  return P;
}
function _c() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function Lu(l) {
  var t = Du;
  return Du += 1, _a === null && (_a = []), l = gs(_a, l, t), t = U, (P === null ? t.memoizedState : P.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? ks : Fs), l;
}
function hn(l) {
  if (l !== null && typeof l == "object") {
    if (typeof l.then == "function") return Lu(l);
    if (l.$$typeof === tt) return hl(l);
  }
  throw Error(b(438, String(l)));
}
function Rc(l) {
  var t = null, a = U.updateQueue;
  if (a !== null && (t = a.memoCache), t == null) {
    var u = U.alternate;
    u !== null && (u = u.updateQueue, u !== null && (u = u.memoCache, u != null && (t = {
      data: u.data.map(function(e) {
        return e.slice();
      }),
      index: 0
    })));
  }
  if (t == null && (t = { data: [], index: 0 }), a === null && (a = _c(), U.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
    for (a = t.data[t.index] = Array(l), u = 0; u < l; u++)
      a[u] = Sd;
  return t.index++, a;
}
function st(l, t) {
  return typeof t == "function" ? t(l) : t;
}
function Te(l) {
  var t = ll();
  return Hc(t, p, l);
}
function Hc(l, t, a) {
  var u = l.queue;
  if (u === null) throw Error(b(311));
  u.lastRenderedReducer = a;
  var e = l.baseQueue, n = u.pending;
  if (n !== null) {
    if (e !== null) {
      var f = e.next;
      e.next = n.next, n.next = f;
    }
    t.baseQueue = e = n, u.pending = null;
  }
  if (n = l.baseState, e === null) l.memoizedState = n;
  else {
    t = e.next;
    var c = f = null, i = null, d = t, m = !1;
    do {
      var S = d.lane & -536870913;
      if (S !== d.lane ? (Y & S) === S : (Qt & S) === S) {
        var v = d.revertLane;
        if (v === 0)
          i !== null && (i = i.next = {
            lane: 0,
            revertLane: 0,
            action: d.action,
            hasEagerState: d.hasEagerState,
            eagerState: d.eagerState,
            next: null
          }), S === Qa && (m = !0);
        else if ((Qt & v) === v) {
          d = d.next, v === Qa && (m = !0);
          continue;
        } else
          S = {
            lane: 0,
            revertLane: d.revertLane,
            action: d.action,
            hasEagerState: d.hasEagerState,
            eagerState: d.eagerState,
            next: null
          }, i === null ? (c = i = S, f = n) : i = i.next = S, U.lanes |= v, Gt |= v;
        S = d.action, Pt && a(n, S), n = d.hasEagerState ? d.eagerState : a(n, S);
      } else
        v = {
          lane: S,
          revertLane: d.revertLane,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        }, i === null ? (c = i = v, f = n) : i = i.next = v, U.lanes |= S, Gt |= S;
      d = d.next;
    } while (d !== null && d !== t);
    if (i === null ? f = n : i.next = c, !_l(n, l.memoizedState) && (cl = !0, m && (a = Da, a !== null)))
      throw a;
    l.memoizedState = n, l.baseState = f, l.baseQueue = i, u.lastRenderedState = n;
  }
  return e === null && (u.lanes = 0), [l.memoizedState, u.dispatch];
}
function pn(l) {
  var t = ll(), a = t.queue;
  if (a === null) throw Error(b(311));
  a.lastRenderedReducer = l;
  var u = a.dispatch, e = a.pending, n = t.memoizedState;
  if (e !== null) {
    a.pending = null;
    var f = e = e.next;
    do
      n = l(n, f.action), f = f.next;
    while (f !== e);
    _l(n, t.memoizedState) || (cl = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), a.lastRenderedState = n;
  }
  return [n, u];
}
function Ms(l, t, a) {
  var u = U, e = ll(), n = B;
  if (n) {
    if (a === void 0) throw Error(b(407));
    a = a();
  } else a = t();
  var f = !_l(
    (p || e).memoizedState,
    a
  );
  f && (e.memoizedState = a, cl = !0), e = e.queue;
  var c = Os.bind(null, u, e, l);
  if (Ju(2048, 8, c, [l]), e.getSnapshot !== t || f || P !== null && P.memoizedState.tag & 1) {
    if (u.flags |= 2048, Ga(
      9,
      on(),
      rs.bind(
        null,
        u,
        e,
        a,
        t
      ),
      null
    ), j === null) throw Error(b(349));
    n || Qt & 124 || Es(u, t, a);
  }
  return a;
}
function Es(l, t, a) {
  l.flags |= 16384, l = { getSnapshot: t, value: a }, t = U.updateQueue, t === null ? (t = _c(), U.updateQueue = t, t.stores = [l]) : (a = t.stores, a === null ? t.stores = [l] : a.push(l));
}
function rs(l, t, a, u) {
  t.value = a, t.getSnapshot = u, Ds(t) && Us(l);
}
function Os(l, t, a) {
  return a(function() {
    Ds(t) && Us(l);
  });
}
function Ds(l) {
  var t = l.getSnapshot;
  l = l.value;
  try {
    var a = t();
    return !_l(l, a);
  } catch {
    return !0;
  }
}
function Us(l) {
  var t = La(l, 2);
  t !== null && Ul(t, l, 2);
}
function qf(l) {
  var t = ml();
  if (typeof l == "function") {
    var a = l;
    if (l = a(), Pt) {
      Mt(!0);
      try {
        a();
      } finally {
        Mt(!1);
      }
    }
  }
  return t.memoizedState = t.baseState = l, t.queue = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: st,
    lastRenderedState: l
  }, t;
}
function _s(l, t, a, u) {
  return l.baseState = a, Hc(
    l,
    p,
    typeof u == "function" ? u : st
  );
}
function Yv(l, t, a, u, e) {
  if (mn(l)) throw Error(b(485));
  if (l = t.action, l !== null) {
    var n = {
      payload: e,
      action: l,
      next: null,
      isTransition: !0,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function(f) {
        n.listeners.push(f);
      }
    };
    O.T !== null ? a(!0) : n.isTransition = !1, u(n), a = t.pending, a === null ? (n.next = t.pending = n, Rs(t, n)) : (n.next = a.next, t.pending = a.next = n);
  }
}
function Rs(l, t) {
  var a = t.action, u = t.payload, e = l.state;
  if (t.isTransition) {
    var n = O.T, f = {};
    O.T = f;
    try {
      var c = a(e, u), i = O.S;
      i !== null && i(f, c), Ri(l, t, c);
    } catch (d) {
      Yf(l, t, d);
    } finally {
      O.T = n;
    }
  } else
    try {
      n = a(e, u), Ri(l, t, n);
    } catch (d) {
      Yf(l, t, d);
    }
}
function Ri(l, t, a) {
  a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
    function(u) {
      Hi(l, t, u);
    },
    function(u) {
      return Yf(l, t, u);
    }
  ) : Hi(l, t, a);
}
function Hi(l, t, a) {
  t.status = "fulfilled", t.value = a, Hs(t), l.state = a, t = l.pending, t !== null && (a = t.next, a === t ? l.pending = null : (a = a.next, t.next = a, Rs(l, a)));
}
function Yf(l, t, a) {
  var u = l.pending;
  if (l.pending = null, u !== null) {
    u = u.next;
    do
      t.status = "rejected", t.reason = a, Hs(t), t = t.next;
    while (t !== u);
  }
  l.action = null;
}
function Hs(l) {
  l = l.listeners;
  for (var t = 0; t < l.length; t++) (0, l[t])();
}
function Ns(l, t) {
  return t;
}
function Ni(l, t) {
  if (B) {
    var a = j.formState;
    if (a !== null) {
      l: {
        var u = U;
        if (B) {
          if (w) {
            t: {
              for (var e = w, n = Kl; e.nodeType !== 8; ) {
                if (!n) {
                  e = null;
                  break t;
                }
                if (e = Vl(
                  e.nextSibling
                ), e === null) {
                  e = null;
                  break t;
                }
              }
              n = e.data, e = n === "F!" || n === "F" ? e : null;
            }
            if (e) {
              w = Vl(
                e.nextSibling
              ), u = e.data === "F!";
              break l;
            }
          }
          Ft(u);
        }
        u = !1;
      }
      u && (t = a[0]);
    }
  }
  return a = ml(), a.memoizedState = a.baseState = t, u = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: Ns,
    lastRenderedState: t
  }, a.queue = u, a = ws.bind(
    null,
    U,
    u
  ), u.dispatch = a, u = qf(!1), n = Qc.bind(
    null,
    U,
    !1,
    u.queue
  ), u = ml(), e = {
    state: t,
    dispatch: null,
    action: l,
    pending: null
  }, u.queue = e, a = Yv.bind(
    null,
    U,
    e,
    n,
    a
  ), e.dispatch = a, u.memoizedState = l, [t, a, !1];
}
function qi(l) {
  var t = ll();
  return qs(t, p, l);
}
function qs(l, t, a) {
  if (t = Hc(
    l,
    t,
    Ns
  )[0], l = Te(st)[0], typeof t == "object" && t !== null && typeof t.then == "function")
    try {
      var u = Lu(t);
    } catch (f) {
      throw f === Ku ? vn : f;
    }
  else u = t;
  t = ll();
  var e = t.queue, n = e.dispatch;
  return a !== t.memoizedState && (U.flags |= 2048, Ga(
    9,
    on(),
    Qv.bind(null, e, a),
    null
  )), [u, n, l];
}
function Qv(l, t) {
  l.action = t;
}
function Yi(l) {
  var t = ll(), a = p;
  if (a !== null)
    return qs(t, a, l);
  ll(), t = t.memoizedState, a = ll();
  var u = a.queue.dispatch;
  return a.memoizedState = l, [t, u, !1];
}
function Ga(l, t, a, u) {
  return l = { tag: l, create: a, deps: u, inst: t, next: null }, t = U.updateQueue, t === null && (t = _c(), U.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = l.next = l : (u = a.next, a.next = l, l.next = u, t.lastEffect = l), l;
}
function on() {
  return { destroy: void 0, resource: void 0 };
}
function Ys() {
  return ll().memoizedState;
}
function Ae(l, t, a, u) {
  var e = ml();
  u = u === void 0 ? null : u, U.flags |= l, e.memoizedState = Ga(
    1 | t,
    on(),
    a,
    u
  );
}
function Ju(l, t, a, u) {
  var e = ll();
  u = u === void 0 ? null : u;
  var n = e.memoizedState.inst;
  p !== null && u !== null && Ec(u, p.memoizedState.deps) ? e.memoizedState = Ga(t, n, a, u) : (U.flags |= l, e.memoizedState = Ga(
    1 | t,
    n,
    a,
    u
  ));
}
function Qi(l, t) {
  Ae(8390656, 8, l, t);
}
function Qs(l, t) {
  Ju(2048, 8, l, t);
}
function Bs(l, t) {
  return Ju(4, 2, l, t);
}
function Gs(l, t) {
  return Ju(4, 4, l, t);
}
function Xs(l, t) {
  if (typeof t == "function") {
    l = l();
    var a = t(l);
    return function() {
      typeof a == "function" ? a() : t(null);
    };
  }
  if (t != null)
    return l = l(), t.current = l, function() {
      t.current = null;
    };
}
function Zs(l, t, a) {
  a = a != null ? a.concat([l]) : null, Ju(4, 4, Xs.bind(null, t, l), a);
}
function Nc() {
}
function xs(l, t) {
  var a = ll();
  t = t === void 0 ? null : t;
  var u = a.memoizedState;
  return t !== null && Ec(t, u[1]) ? u[0] : (a.memoizedState = [l, t], l);
}
function ps(l, t) {
  var a = ll();
  t = t === void 0 ? null : t;
  var u = a.memoizedState;
  if (t !== null && Ec(t, u[1]))
    return u[0];
  if (u = l(), Pt) {
    Mt(!0);
    try {
      l();
    } finally {
      Mt(!1);
    }
  }
  return a.memoizedState = [u, t], u;
}
function qc(l, t, a) {
  return a === void 0 || Qt & 1073741824 ? l.memoizedState = t : (l.memoizedState = a, l = Hy(), U.lanes |= l, Gt |= l, a);
}
function Vs(l, t, a, u) {
  return _l(a, t) ? a : Ba.current !== null ? (l = qc(l, a, u), _l(l, t) || (cl = !0), l) : Qt & 42 ? (l = Hy(), U.lanes |= l, Gt |= l, t) : (cl = !0, l.memoizedState = a);
}
function js(l, t, a, u, e) {
  var n = G.p;
  G.p = n !== 0 && 8 > n ? n : 8;
  var f = O.T, c = {};
  O.T = c, Qc(l, !1, t, a);
  try {
    var i = e(), d = O.S;
    if (d !== null && d(c, i), i !== null && typeof i == "object" && typeof i.then == "function") {
      var m = Hv(
        i,
        u
      );
      mu(
        l,
        t,
        m,
        Dl(l)
      );
    } else
      mu(
        l,
        t,
        u,
        Dl(l)
      );
  } catch (S) {
    mu(
      l,
      t,
      { then: function() {
      }, status: "rejected", reason: S },
      Dl()
    );
  } finally {
    G.p = n, O.T = f;
  }
}
function Bv() {
}
function Qf(l, t, a, u) {
  if (l.tag !== 5) throw Error(b(476));
  var e = Cs(l).queue;
  js(
    l,
    e,
    t,
    Kt,
    a === null ? Bv : function() {
      return Ks(l), a(u);
    }
  );
}
function Cs(l) {
  var t = l.memoizedState;
  if (t !== null) return t;
  t = {
    memoizedState: Kt,
    baseState: Kt,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: st,
      lastRenderedState: Kt
    },
    next: null
  };
  var a = {};
  return t.next = {
    memoizedState: a,
    baseState: a,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: st,
      lastRenderedState: a
    },
    next: null
  }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
}
function Ks(l) {
  var t = Cs(l).next.queue;
  mu(l, t, {}, Dl());
}
function Yc() {
  return hl(Nu);
}
function Ls() {
  return ll().memoizedState;
}
function Js() {
  return ll().memoizedState;
}
function Gv(l) {
  for (var t = l.return; t !== null; ) {
    switch (t.tag) {
      case 24:
      case 3:
        var a = Dl();
        l = Ut(a);
        var u = _t(t, l, a);
        u !== null && (Ul(u, t, a), vu(u, t, a)), t = { cache: zc() }, l.payload = t;
        return;
    }
    t = t.return;
  }
}
function Xv(l, t, a) {
  var u = Dl();
  a = {
    lane: u,
    revertLane: 0,
    action: a,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, mn(l) ? Ws(t, a) : (a = mc(l, t, a, u), a !== null && (Ul(a, l, u), $s(a, t, u)));
}
function ws(l, t, a) {
  var u = Dl();
  mu(l, t, a, u);
}
function mu(l, t, a, u) {
  var e = {
    lane: u,
    revertLane: 0,
    action: a,
    hasEagerState: !1,
    eagerState: null,
    next: null
  };
  if (mn(l)) Ws(t, e);
  else {
    var n = l.alternate;
    if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
      try {
        var f = t.lastRenderedState, c = n(f, a);
        if (e.hasEagerState = !0, e.eagerState = c, _l(c, f))
          return dn(l, t, e, 0), j === null && yn(), !1;
      } catch {
      } finally {
      }
    if (a = mc(l, t, e, u), a !== null)
      return Ul(a, l, u), $s(a, t, u), !0;
  }
  return !1;
}
function Qc(l, t, a, u) {
  if (u = {
    lane: 2,
    revertLane: jc(),
    action: u,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, mn(l)) {
    if (t) throw Error(b(479));
  } else
    t = mc(
      l,
      a,
      u,
      2
    ), t !== null && Ul(t, l, 2);
}
function mn(l) {
  var t = l.alternate;
  return l === U || t !== null && t === U;
}
function Ws(l, t) {
  Ua = Ze = !0;
  var a = l.pending;
  a === null ? t.next = t : (t.next = a.next, a.next = t), l.pending = t;
}
function $s(l, t, a) {
  if (a & 4194048) {
    var u = t.lanes;
    u &= l.pendingLanes, a |= u, t.lanes = a, x0(l, a);
  }
}
var pe = {
  readContext: hl,
  use: hn,
  useCallback: F,
  useContext: F,
  useEffect: F,
  useImperativeHandle: F,
  useLayoutEffect: F,
  useInsertionEffect: F,
  useMemo: F,
  useReducer: F,
  useRef: F,
  useState: F,
  useDebugValue: F,
  useDeferredValue: F,
  useTransition: F,
  useSyncExternalStore: F,
  useId: F,
  useHostTransitionStatus: F,
  useFormState: F,
  useActionState: F,
  useOptimistic: F,
  useMemoCache: F,
  useCacheRefresh: F
}, ks = {
  readContext: hl,
  use: hn,
  useCallback: function(l, t) {
    return ml().memoizedState = [
      l,
      t === void 0 ? null : t
    ], l;
  },
  useContext: hl,
  useEffect: Qi,
  useImperativeHandle: function(l, t, a) {
    a = a != null ? a.concat([l]) : null, Ae(
      4194308,
      4,
      Xs.bind(null, t, l),
      a
    );
  },
  useLayoutEffect: function(l, t) {
    return Ae(4194308, 4, l, t);
  },
  useInsertionEffect: function(l, t) {
    Ae(4, 2, l, t);
  },
  useMemo: function(l, t) {
    var a = ml();
    t = t === void 0 ? null : t;
    var u = l();
    if (Pt) {
      Mt(!0);
      try {
        l();
      } finally {
        Mt(!1);
      }
    }
    return a.memoizedState = [u, t], u;
  },
  useReducer: function(l, t, a) {
    var u = ml();
    if (a !== void 0) {
      var e = a(t);
      if (Pt) {
        Mt(!0);
        try {
          a(t);
        } finally {
          Mt(!1);
        }
      }
    } else e = t;
    return u.memoizedState = u.baseState = e, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: l,
      lastRenderedState: e
    }, u.queue = l, l = l.dispatch = Xv.bind(
      null,
      U,
      l
    ), [u.memoizedState, l];
  },
  useRef: function(l) {
    var t = ml();
    return l = { current: l }, t.memoizedState = l;
  },
  useState: function(l) {
    l = qf(l);
    var t = l.queue, a = ws.bind(null, U, t);
    return t.dispatch = a, [l.memoizedState, a];
  },
  useDebugValue: Nc,
  useDeferredValue: function(l, t) {
    var a = ml();
    return qc(a, l, t);
  },
  useTransition: function() {
    var l = qf(!1);
    return l = js.bind(
      null,
      U,
      l.queue,
      !0,
      !1
    ), ml().memoizedState = l, [!1, l];
  },
  useSyncExternalStore: function(l, t, a) {
    var u = U, e = ml();
    if (B) {
      if (a === void 0)
        throw Error(b(407));
      a = a();
    } else {
      if (a = t(), j === null)
        throw Error(b(349));
      Y & 124 || Es(u, t, a);
    }
    e.memoizedState = a;
    var n = { value: a, getSnapshot: t };
    return e.queue = n, Qi(Os.bind(null, u, n, l), [
      l
    ]), u.flags |= 2048, Ga(
      9,
      on(),
      rs.bind(
        null,
        u,
        n,
        a,
        t
      ),
      null
    ), a;
  },
  useId: function() {
    var l = ml(), t = j.identifierPrefix;
    if (B) {
      var a = ut, u = at;
      a = (u & ~(1 << 32 - Ol(u) - 1)).toString(32) + a, t = "«" + t + "R" + a, a = xe++, 0 < a && (t += "H" + a.toString(32)), t += "»";
    } else
      a = Nv++, t = "«" + t + "r" + a.toString(32) + "»";
    return l.memoizedState = t;
  },
  useHostTransitionStatus: Yc,
  useFormState: Ni,
  useActionState: Ni,
  useOptimistic: function(l) {
    var t = ml();
    t.memoizedState = t.baseState = l;
    var a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: null,
      lastRenderedState: null
    };
    return t.queue = a, t = Qc.bind(
      null,
      U,
      !0,
      a
    ), a.dispatch = t, [l, t];
  },
  useMemoCache: Rc,
  useCacheRefresh: function() {
    return ml().memoizedState = Gv.bind(
      null,
      U
    );
  }
}, Fs = {
  readContext: hl,
  use: hn,
  useCallback: xs,
  useContext: hl,
  useEffect: Qs,
  useImperativeHandle: Zs,
  useInsertionEffect: Bs,
  useLayoutEffect: Gs,
  useMemo: ps,
  useReducer: Te,
  useRef: Ys,
  useState: function() {
    return Te(st);
  },
  useDebugValue: Nc,
  useDeferredValue: function(l, t) {
    var a = ll();
    return Vs(
      a,
      p.memoizedState,
      l,
      t
    );
  },
  useTransition: function() {
    var l = Te(st)[0], t = ll().memoizedState;
    return [
      typeof l == "boolean" ? l : Lu(l),
      t
    ];
  },
  useSyncExternalStore: Ms,
  useId: Ls,
  useHostTransitionStatus: Yc,
  useFormState: qi,
  useActionState: qi,
  useOptimistic: function(l, t) {
    var a = ll();
    return _s(a, p, l, t);
  },
  useMemoCache: Rc,
  useCacheRefresh: Js
}, Zv = {
  readContext: hl,
  use: hn,
  useCallback: xs,
  useContext: hl,
  useEffect: Qs,
  useImperativeHandle: Zs,
  useInsertionEffect: Bs,
  useLayoutEffect: Gs,
  useMemo: ps,
  useReducer: pn,
  useRef: Ys,
  useState: function() {
    return pn(st);
  },
  useDebugValue: Nc,
  useDeferredValue: function(l, t) {
    var a = ll();
    return p === null ? qc(a, l, t) : Vs(
      a,
      p.memoizedState,
      l,
      t
    );
  },
  useTransition: function() {
    var l = pn(st)[0], t = ll().memoizedState;
    return [
      typeof l == "boolean" ? l : Lu(l),
      t
    ];
  },
  useSyncExternalStore: Ms,
  useId: Ls,
  useHostTransitionStatus: Yc,
  useFormState: Yi,
  useActionState: Yi,
  useOptimistic: function(l, t) {
    var a = ll();
    return p !== null ? _s(a, p, l, t) : (a.baseState = l, [l, a.queue.dispatch]);
  },
  useMemoCache: Rc,
  useCacheRefresh: Js
}, Ra = null, Uu = 0;
function ce(l) {
  var t = Uu;
  return Uu += 1, Ra === null && (Ra = []), gs(Ra, l, t);
}
function Pa(l, t) {
  t = t.props.ref, l.ref = t !== void 0 ? t : null;
}
function ie(l, t) {
  throw t.$$typeof === od ? Error(b(525)) : (l = Object.prototype.toString.call(t), Error(
    b(
      31,
      l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
    )
  ));
}
function Bi(l) {
  var t = l._init;
  return t(l._payload);
}
function Is(l) {
  function t(y, s) {
    if (l) {
      var h = y.deletions;
      h === null ? (y.deletions = [s], y.flags |= 16) : h.push(s);
    }
  }
  function a(y, s) {
    if (!l) return null;
    for (; s !== null; )
      t(y, s), s = s.sibling;
    return null;
  }
  function u(y) {
    for (var s = /* @__PURE__ */ new Map(); y !== null; )
      y.key !== null ? s.set(y.key, y) : s.set(y.index, y), y = y.sibling;
    return s;
  }
  function e(y, s) {
    return y = ft(y, s), y.index = 0, y.sibling = null, y;
  }
  function n(y, s, h) {
    return y.index = h, l ? (h = y.alternate, h !== null ? (h = h.index, h < s ? (y.flags |= 67108866, s) : h) : (y.flags |= 67108866, s)) : (y.flags |= 1048576, s);
  }
  function f(y) {
    return l && y.alternate === null && (y.flags |= 67108866), y;
  }
  function c(y, s, h, g) {
    return s === null || s.tag !== 6 ? (s = Xn(h, y.mode, g), s.return = y, s) : (s = e(s, h), s.return = y, s);
  }
  function i(y, s, h, g) {
    var z = h.type;
    return z === da ? m(
      y,
      s,
      h.props.children,
      g,
      h.key
    ) : s !== null && (s.elementType === z || typeof z == "object" && z !== null && z.$$typeof === St && Bi(z) === s.type) ? (s = e(s, h.props), Pa(s, h), s.return = y, s) : (s = be(
      h.type,
      h.key,
      h.props,
      null,
      y.mode,
      g
    ), Pa(s, h), s.return = y, s);
  }
  function d(y, s, h, g) {
    return s === null || s.tag !== 4 || s.stateNode.containerInfo !== h.containerInfo || s.stateNode.implementation !== h.implementation ? (s = Zn(h, y.mode, g), s.return = y, s) : (s = e(s, h.children || []), s.return = y, s);
  }
  function m(y, s, h, g, z) {
    return s === null || s.tag !== 7 ? (s = Lt(
      h,
      y.mode,
      g,
      z
    ), s.return = y, s) : (s = e(s, h), s.return = y, s);
  }
  function S(y, s, h) {
    if (typeof s == "string" && s !== "" || typeof s == "number" || typeof s == "bigint")
      return s = Xn(
        "" + s,
        y.mode,
        h
      ), s.return = y, s;
    if (typeof s == "object" && s !== null) {
      switch (s.$$typeof) {
        case le:
          return h = be(
            s.type,
            s.key,
            s.props,
            null,
            y.mode,
            h
          ), Pa(h, s), h.return = y, h;
        case uu:
          return s = Zn(
            s,
            y.mode,
            h
          ), s.return = y, s;
        case St:
          var g = s._init;
          return s = g(s._payload), S(y, s, h);
      }
      if (eu(s) || $a(s))
        return s = Lt(
          s,
          y.mode,
          h,
          null
        ), s.return = y, s;
      if (typeof s.then == "function")
        return S(y, ce(s), h);
      if (s.$$typeof === tt)
        return S(
          y,
          ne(y, s),
          h
        );
      ie(y, s);
    }
    return null;
  }
  function v(y, s, h, g) {
    var z = s !== null ? s.key : null;
    if (typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint")
      return z !== null ? null : c(y, s, "" + h, g);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case le:
          return h.key === z ? i(y, s, h, g) : null;
        case uu:
          return h.key === z ? d(y, s, h, g) : null;
        case St:
          return z = h._init, h = z(h._payload), v(y, s, h, g);
      }
      if (eu(h) || $a(h))
        return z !== null ? null : m(y, s, h, g, null);
      if (typeof h.then == "function")
        return v(
          y,
          s,
          ce(h),
          g
        );
      if (h.$$typeof === tt)
        return v(
          y,
          s,
          ne(y, h),
          g
        );
      ie(y, h);
    }
    return null;
  }
  function o(y, s, h, g, z) {
    if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
      return y = y.get(h) || null, c(s, y, "" + g, z);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case le:
          return y = y.get(
            g.key === null ? h : g.key
          ) || null, i(s, y, g, z);
        case uu:
          return y = y.get(
            g.key === null ? h : g.key
          ) || null, d(s, y, g, z);
        case St:
          var D = g._init;
          return g = D(g._payload), o(
            y,
            s,
            h,
            g,
            z
          );
      }
      if (eu(g) || $a(g))
        return y = y.get(h) || null, m(s, y, g, z, null);
      if (typeof g.then == "function")
        return o(
          y,
          s,
          h,
          ce(g),
          z
        );
      if (g.$$typeof === tt)
        return o(
          y,
          s,
          h,
          ne(s, g),
          z
        );
      ie(s, g);
    }
    return null;
  }
  function E(y, s, h, g) {
    for (var z = null, D = null, A = s, r = s = 0, $ = null; A !== null && r < h.length; r++) {
      A.index > r ? ($ = A, A = null) : $ = A.sibling;
      var q = v(
        y,
        A,
        h[r],
        g
      );
      if (q === null) {
        A === null && (A = $);
        break;
      }
      l && A && q.alternate === null && t(y, A), s = n(q, s, r), D === null ? z = q : D.sibling = q, D = q, A = $;
    }
    if (r === h.length)
      return a(y, A), B && jt(y, r), z;
    if (A === null) {
      for (; r < h.length; r++)
        A = S(y, h[r], g), A !== null && (s = n(
          A,
          s,
          r
        ), D === null ? z = A : D.sibling = A, D = A);
      return B && jt(y, r), z;
    }
    for (A = u(A); r < h.length; r++)
      $ = o(
        A,
        y,
        r,
        h[r],
        g
      ), $ !== null && (l && $.alternate !== null && A.delete(
        $.key === null ? r : $.key
      ), s = n(
        $,
        s,
        r
      ), D === null ? z = $ : D.sibling = $, D = $);
    return l && A.forEach(function(Rl) {
      return t(y, Rl);
    }), B && jt(y, r), z;
  }
  function M(y, s, h, g) {
    if (h == null) throw Error(b(151));
    for (var z = null, D = null, A = s, r = s = 0, $ = null, q = h.next(); A !== null && !q.done; r++, q = h.next()) {
      A.index > r ? ($ = A, A = null) : $ = A.sibling;
      var Rl = v(y, A, q.value, g);
      if (Rl === null) {
        A === null && (A = $);
        break;
      }
      l && A && Rl.alternate === null && t(y, A), s = n(Rl, s, r), D === null ? z = Rl : D.sibling = Rl, D = Rl, A = $;
    }
    if (q.done)
      return a(y, A), B && jt(y, r), z;
    if (A === null) {
      for (; !q.done; r++, q = h.next())
        q = S(y, q.value, g), q !== null && (s = n(q, s, r), D === null ? z = q : D.sibling = q, D = q);
      return B && jt(y, r), z;
    }
    for (A = u(A); !q.done; r++, q = h.next())
      q = o(A, y, r, q.value, g), q !== null && (l && q.alternate !== null && A.delete(q.key === null ? r : q.key), s = n(q, s, r), D === null ? z = q : D.sibling = q, D = q);
    return l && A.forEach(function(ht) {
      return t(y, ht);
    }), B && jt(y, r), z;
  }
  function Q(y, s, h, g) {
    if (typeof h == "object" && h !== null && h.type === da && h.key === null && (h = h.props.children), typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case le:
          l: {
            for (var z = h.key; s !== null; ) {
              if (s.key === z) {
                if (z = h.type, z === da) {
                  if (s.tag === 7) {
                    a(
                      y,
                      s.sibling
                    ), g = e(
                      s,
                      h.props.children
                    ), g.return = y, y = g;
                    break l;
                  }
                } else if (s.elementType === z || typeof z == "object" && z !== null && z.$$typeof === St && Bi(z) === s.type) {
                  a(
                    y,
                    s.sibling
                  ), g = e(s, h.props), Pa(g, h), g.return = y, y = g;
                  break l;
                }
                a(y, s);
                break;
              } else t(y, s);
              s = s.sibling;
            }
            h.type === da ? (g = Lt(
              h.props.children,
              y.mode,
              g,
              h.key
            ), g.return = y, y = g) : (g = be(
              h.type,
              h.key,
              h.props,
              null,
              y.mode,
              g
            ), Pa(g, h), g.return = y, y = g);
          }
          return f(y);
        case uu:
          l: {
            for (z = h.key; s !== null; ) {
              if (s.key === z)
                if (s.tag === 4 && s.stateNode.containerInfo === h.containerInfo && s.stateNode.implementation === h.implementation) {
                  a(
                    y,
                    s.sibling
                  ), g = e(s, h.children || []), g.return = y, y = g;
                  break l;
                } else {
                  a(y, s);
                  break;
                }
              else t(y, s);
              s = s.sibling;
            }
            g = Zn(h, y.mode, g), g.return = y, y = g;
          }
          return f(y);
        case St:
          return z = h._init, h = z(h._payload), Q(
            y,
            s,
            h,
            g
          );
      }
      if (eu(h))
        return E(
          y,
          s,
          h,
          g
        );
      if ($a(h)) {
        if (z = $a(h), typeof z != "function") throw Error(b(150));
        return h = z.call(h), M(
          y,
          s,
          h,
          g
        );
      }
      if (typeof h.then == "function")
        return Q(
          y,
          s,
          ce(h),
          g
        );
      if (h.$$typeof === tt)
        return Q(
          y,
          s,
          ne(y, h),
          g
        );
      ie(y, h);
    }
    return typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint" ? (h = "" + h, s !== null && s.tag === 6 ? (a(y, s.sibling), g = e(s, h), g.return = y, y = g) : (a(y, s), g = Xn(h, y.mode, g), g.return = y, y = g), f(y)) : a(y, s);
  }
  return function(y, s, h, g) {
    try {
      Uu = 0;
      var z = Q(
        y,
        s,
        h,
        g
      );
      return Ra = null, z;
    } catch (A) {
      if (A === Ku || A === vn) throw A;
      var D = El(29, A, null, y.mode);
      return D.lanes = g, D.return = y, D;
    } finally {
    }
  };
}
var Xa = Is(!0), Ps = Is(!1), Zl = $l(null), Wl = null;
function zt(l) {
  var t = l.alternate;
  L(al, al.current & 1), L(Zl, l), Wl === null && (t === null || Ba.current !== null || t.memoizedState !== null) && (Wl = l);
}
function ly(l) {
  if (l.tag === 22) {
    if (L(al, al.current), L(Zl, l), Wl === null) {
      var t = l.alternate;
      t !== null && t.memoizedState !== null && (Wl = l);
    }
  } else Tt();
}
function Tt() {
  L(al, al.current), L(Zl, Zl.current);
}
function nt(l) {
  il(Zl), Wl === l && (Wl = null), il(al);
}
var al = $l(0);
function Ve(l) {
  for (var t = l; t !== null; ) {
    if (t.tag === 13) {
      var a = t.memoizedState;
      if (a !== null && (a = a.dehydrated, a === null || a.data === "$?" || Ff(a)))
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === l) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === l) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
function Vn(l, t, a, u) {
  t = l.memoizedState, a = a(u, t), a = a == null ? t : C({}, t, a), l.memoizedState = a, l.lanes === 0 && (l.updateQueue.baseState = a);
}
var Bf = {
  enqueueSetState: function(l, t, a) {
    l = l._reactInternals;
    var u = Dl(), e = Ut(u);
    e.payload = t, a != null && (e.callback = a), t = _t(l, e, u), t !== null && (Ul(t, l, u), vu(t, l, u));
  },
  enqueueReplaceState: function(l, t, a) {
    l = l._reactInternals;
    var u = Dl(), e = Ut(u);
    e.tag = 1, e.payload = t, a != null && (e.callback = a), t = _t(l, e, u), t !== null && (Ul(t, l, u), vu(t, l, u));
  },
  enqueueForceUpdate: function(l, t) {
    l = l._reactInternals;
    var a = Dl(), u = Ut(a);
    u.tag = 2, t != null && (u.callback = t), t = _t(l, u, a), t !== null && (Ul(t, l, a), vu(t, l, a));
  }
};
function Gi(l, t, a, u, e, n, f) {
  return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(u, n, f) : t.prototype && t.prototype.isPureReactComponent ? !ru(a, u) || !ru(e, n) : !0;
}
function Xi(l, t, a, u) {
  l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, u), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, u), t.state !== l && Bf.enqueueReplaceState(t, t.state, null);
}
function la(l, t) {
  var a = t;
  if ("ref" in t) {
    a = {};
    for (var u in t)
      u !== "ref" && (a[u] = t[u]);
  }
  if (l = l.defaultProps) {
    a === t && (a = C({}, a));
    for (var e in l)
      a[e] === void 0 && (a[e] = l[e]);
  }
  return a;
}
var je = typeof reportError == "function" ? reportError : function(l) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var t = new window.ErrorEvent("error", {
      bubbles: !0,
      cancelable: !0,
      message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
      error: l
    });
    if (!window.dispatchEvent(t)) return;
  } else if (typeof process == "object" && typeof process.emit == "function") {
    process.emit("uncaughtException", l);
    return;
  }
  console.error(l);
};
function ty(l) {
  je(l);
}
function ay(l) {
  console.error(l);
}
function uy(l) {
  je(l);
}
function Ce(l, t) {
  try {
    var a = l.onUncaughtError;
    a(t.value, { componentStack: t.stack });
  } catch (u) {
    setTimeout(function() {
      throw u;
    });
  }
}
function Zi(l, t, a) {
  try {
    var u = l.onCaughtError;
    u(a.value, {
      componentStack: a.stack,
      errorBoundary: t.tag === 1 ? t.stateNode : null
    });
  } catch (e) {
    setTimeout(function() {
      throw e;
    });
  }
}
function Gf(l, t, a) {
  return a = Ut(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
    Ce(l, t);
  }, a;
}
function ey(l) {
  return l = Ut(l), l.tag = 3, l;
}
function ny(l, t, a, u) {
  var e = a.type.getDerivedStateFromError;
  if (typeof e == "function") {
    var n = u.value;
    l.payload = function() {
      return e(n);
    }, l.callback = function() {
      Zi(t, a, u);
    };
  }
  var f = a.stateNode;
  f !== null && typeof f.componentDidCatch == "function" && (l.callback = function() {
    Zi(t, a, u), typeof e != "function" && (Rt === null ? Rt = /* @__PURE__ */ new Set([this]) : Rt.add(this));
    var c = u.stack;
    this.componentDidCatch(u.value, {
      componentStack: c !== null ? c : ""
    });
  });
}
function xv(l, t, a, u, e) {
  if (a.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
    if (t = a.alternate, t !== null && ju(
      t,
      a,
      e,
      !0
    ), a = Zl.current, a !== null) {
      switch (a.tag) {
        case 13:
          return Wl === null ? Kf() : a.alternate === null && W === 0 && (W = 3), a.flags &= -257, a.flags |= 65536, a.lanes = e, u === _f ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([u]) : t.add(u), In(l, u, e)), !1;
        case 22:
          return a.flags |= 65536, u === _f ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
            transitions: null,
            markerInstances: null,
            retryQueue: /* @__PURE__ */ new Set([u])
          }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([u]) : a.add(u)), In(l, u, e)), !1;
      }
      throw Error(b(435, a.tag));
    }
    return In(l, u, e), Kf(), !1;
  }
  if (B)
    return t = Zl.current, t !== null ? (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = e, u !== Ef && (l = Error(b(422), { cause: u }), Ou(Bl(l, a)))) : (u !== Ef && (t = Error(b(423), {
      cause: u
    }), Ou(
      Bl(t, a)
    )), l = l.current.alternate, l.flags |= 65536, e &= -e, l.lanes |= e, u = Bl(u, a), e = Gf(
      l.stateNode,
      u,
      e
    ), xn(l, e), W !== 4 && (W = 2)), !1;
  var n = Error(b(520), { cause: u });
  if (n = Bl(n, a), bu === null ? bu = [n] : bu.push(n), W !== 4 && (W = 2), t === null) return !0;
  u = Bl(u, a), a = t;
  do {
    switch (a.tag) {
      case 3:
        return a.flags |= 65536, l = e & -e, a.lanes |= l, l = Gf(a.stateNode, u, l), xn(a, l), !1;
      case 1:
        if (t = a.type, n = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (Rt === null || !Rt.has(n))))
          return a.flags |= 65536, e &= -e, a.lanes |= e, e = ey(e), ny(
            e,
            l,
            a,
            u
          ), xn(a, e), !1;
    }
    a = a.return;
  } while (a !== null);
  return !1;
}
var fy = Error(b(461)), cl = !1;
function sl(l, t, a, u) {
  t.child = l === null ? Ps(t, null, a, u) : Xa(
    t,
    l.child,
    a,
    u
  );
}
function xi(l, t, a, u, e) {
  a = a.render;
  var n = t.ref;
  if ("ref" in u) {
    var f = {};
    for (var c in u)
      c !== "ref" && (f[c] = u[c]);
  } else f = u;
  return It(t), u = rc(
    l,
    t,
    a,
    f,
    n,
    e
  ), c = Oc(), l !== null && !cl ? (Dc(l, t, e), yt(l, t, e)) : (B && c && gc(t), t.flags |= 1, sl(l, t, u, e), t.child);
}
function pi(l, t, a, u, e) {
  if (l === null) {
    var n = a.type;
    return typeof n == "function" && !Sc(n) && n.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = n, cy(
      l,
      t,
      n,
      u,
      e
    )) : (l = be(
      a.type,
      null,
      u,
      t,
      t.mode,
      e
    ), l.ref = t.ref, l.return = t, t.child = l);
  }
  if (n = l.child, !Bc(l, e)) {
    var f = n.memoizedProps;
    if (a = a.compare, a = a !== null ? a : ru, a(f, u) && l.ref === t.ref)
      return yt(l, t, e);
  }
  return t.flags |= 1, l = ft(n, u), l.ref = t.ref, l.return = t, t.child = l;
}
function cy(l, t, a, u, e) {
  if (l !== null) {
    var n = l.memoizedProps;
    if (ru(n, u) && l.ref === t.ref)
      if (cl = !1, t.pendingProps = u = n, Bc(l, e))
        l.flags & 131072 && (cl = !0);
      else
        return t.lanes = l.lanes, yt(l, t, e);
  }
  return Xf(
    l,
    t,
    a,
    u,
    e
  );
}
function iy(l, t, a) {
  var u = t.pendingProps, e = u.children, n = l !== null ? l.memoizedState : null;
  if (u.mode === "hidden") {
    if (t.flags & 128) {
      if (u = n !== null ? n.baseLanes | a : a, l !== null) {
        for (e = t.child = l.child, n = 0; e !== null; )
          n = n | e.lanes | e.childLanes, e = e.sibling;
        t.childLanes = n & ~u;
      } else t.childLanes = 0, t.child = null;
      return Vi(
        l,
        t,
        u,
        a
      );
    }
    if (a & 536870912)
      t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && ze(
        t,
        n !== null ? n.cachePool : null
      ), n !== null ? _i(t, n) : Nf(), ly(t);
    else
      return t.lanes = t.childLanes = 536870912, Vi(
        l,
        t,
        n !== null ? n.baseLanes | a : a,
        a
      );
  } else
    n !== null ? (ze(t, n.cachePool), _i(t, n), Tt(), t.memoizedState = null) : (l !== null && ze(t, null), Nf(), Tt());
  return sl(l, t, e, a), t.child;
}
function Vi(l, t, a, u) {
  var e = Tc();
  return e = e === null ? null : { parent: tl._currentValue, pool: e }, t.memoizedState = {
    baseLanes: a,
    cachePool: e
  }, l !== null && ze(t, null), Nf(), ly(t), l !== null && ju(l, t, u, !0), null;
}
function Me(l, t) {
  var a = t.ref;
  if (a === null)
    l !== null && l.ref !== null && (t.flags |= 4194816);
  else {
    if (typeof a != "function" && typeof a != "object")
      throw Error(b(284));
    (l === null || l.ref !== a) && (t.flags |= 4194816);
  }
}
function Xf(l, t, a, u, e) {
  return It(t), a = rc(
    l,
    t,
    a,
    u,
    void 0,
    e
  ), u = Oc(), l !== null && !cl ? (Dc(l, t, e), yt(l, t, e)) : (B && u && gc(t), t.flags |= 1, sl(l, t, a, e), t.child);
}
function ji(l, t, a, u, e, n) {
  return It(t), t.updateQueue = null, a = As(
    t,
    u,
    a,
    e
  ), Ts(l), u = Oc(), l !== null && !cl ? (Dc(l, t, n), yt(l, t, n)) : (B && u && gc(t), t.flags |= 1, sl(l, t, a, n), t.child);
}
function Ci(l, t, a, u, e) {
  if (It(t), t.stateNode === null) {
    var n = za, f = a.contextType;
    typeof f == "object" && f !== null && (n = hl(f)), n = new a(u, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Bf, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = u, n.state = t.memoizedState, n.refs = {}, Ac(t), f = a.contextType, n.context = typeof f == "object" && f !== null ? hl(f) : za, n.state = t.memoizedState, f = a.getDerivedStateFromProps, typeof f == "function" && (Vn(
      t,
      a,
      f,
      u
    ), n.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (f = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), f !== n.state && Bf.enqueueReplaceState(n, n.state, null), ou(t, u, n, e), hu(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), u = !0;
  } else if (l === null) {
    n = t.stateNode;
    var c = t.memoizedProps, i = la(a, c);
    n.props = i;
    var d = n.context, m = a.contextType;
    f = za, typeof m == "object" && m !== null && (f = hl(m));
    var S = a.getDerivedStateFromProps;
    m = typeof S == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, m || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || d !== f) && Xi(
      t,
      n,
      u,
      f
    ), gt = !1;
    var v = t.memoizedState;
    n.state = v, ou(t, u, n, e), hu(), d = t.memoizedState, c || v !== d || gt ? (typeof S == "function" && (Vn(
      t,
      a,
      S,
      u
    ), d = t.memoizedState), (i = gt || Gi(
      t,
      a,
      i,
      u,
      v,
      d,
      f
    )) ? (m || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = u, t.memoizedState = d), n.props = u, n.state = d, n.context = f, u = i) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), u = !1);
  } else {
    n = t.stateNode, Rf(l, t), f = t.memoizedProps, m = la(a, f), n.props = m, S = t.pendingProps, v = n.context, d = a.contextType, i = za, typeof d == "object" && d !== null && (i = hl(d)), c = a.getDerivedStateFromProps, (d = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (f !== S || v !== i) && Xi(
      t,
      n,
      u,
      i
    ), gt = !1, v = t.memoizedState, n.state = v, ou(t, u, n, e), hu();
    var o = t.memoizedState;
    f !== S || v !== o || gt || l !== null && l.dependencies !== null && Ge(l.dependencies) ? (typeof c == "function" && (Vn(
      t,
      a,
      c,
      u
    ), o = t.memoizedState), (m = gt || Gi(
      t,
      a,
      m,
      u,
      v,
      o,
      i
    ) || l !== null && l.dependencies !== null && Ge(l.dependencies)) ? (d || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(u, o, i), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
      u,
      o,
      i
    )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && v === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && v === l.memoizedState || (t.flags |= 1024), t.memoizedProps = u, t.memoizedState = o), n.props = u, n.state = o, n.context = i, u = m) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && v === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && v === l.memoizedState || (t.flags |= 1024), u = !1);
  }
  return n = u, Me(l, t), u = (t.flags & 128) !== 0, n || u ? (n = t.stateNode, a = u && typeof a.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && u ? (t.child = Xa(
    t,
    l.child,
    null,
    e
  ), t.child = Xa(
    t,
    null,
    a,
    e
  )) : sl(l, t, a, e), t.memoizedState = n.state, l = t.child) : l = yt(
    l,
    t,
    e
  ), l;
}
function Ki(l, t, a, u) {
  return Vu(), t.flags |= 256, sl(l, t, a, u), t.child;
}
var jn = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0,
  hydrationErrors: null
};
function Cn(l) {
  return { baseLanes: l, cachePool: ms() };
}
function Kn(l, t, a) {
  return l = l !== null ? l.childLanes & ~a : 0, t && (l |= Xl), l;
}
function sy(l, t, a) {
  var u = t.pendingProps, e = !1, n = (t.flags & 128) !== 0, f;
  if ((f = n) || (f = l !== null && l.memoizedState === null ? !1 : (al.current & 2) !== 0), f && (e = !0, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
    if (B) {
      if (e ? zt(t) : Tt(), B) {
        var c = w, i;
        if (i = c) {
          l: {
            for (i = c, c = Kl; i.nodeType !== 8; ) {
              if (!c) {
                c = null;
                break l;
              }
              if (i = Vl(
                i.nextSibling
              ), i === null) {
                c = null;
                break l;
              }
            }
            c = i;
          }
          c !== null ? (t.memoizedState = {
            dehydrated: c,
            treeContext: Jt !== null ? { id: at, overflow: ut } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, i = El(
            18,
            null,
            null,
            0
          ), i.stateNode = c, i.return = t, t.child = i, ol = t, w = null, i = !0) : i = !1;
        }
        i || Ft(t);
      }
      if (c = t.memoizedState, c !== null && (c = c.dehydrated, c !== null))
        return Ff(c) ? t.lanes = 32 : t.lanes = 536870912, null;
      nt(t);
    }
    return c = u.children, u = u.fallback, e ? (Tt(), e = t.mode, c = Ke(
      { mode: "hidden", children: c },
      e
    ), u = Lt(
      u,
      e,
      a,
      null
    ), c.return = t, u.return = t, c.sibling = u, t.child = c, e = t.child, e.memoizedState = Cn(a), e.childLanes = Kn(
      l,
      f,
      a
    ), t.memoizedState = jn, u) : (zt(t), Zf(t, c));
  }
  if (i = l.memoizedState, i !== null && (c = i.dehydrated, c !== null)) {
    if (n)
      t.flags & 256 ? (zt(t), t.flags &= -257, t = Ln(
        l,
        t,
        a
      )) : t.memoizedState !== null ? (Tt(), t.child = l.child, t.flags |= 128, t = null) : (Tt(), e = u.fallback, c = t.mode, u = Ke(
        { mode: "visible", children: u.children },
        c
      ), e = Lt(
        e,
        c,
        a,
        null
      ), e.flags |= 2, u.return = t, e.return = t, u.sibling = e, t.child = u, Xa(
        t,
        l.child,
        null,
        a
      ), u = t.child, u.memoizedState = Cn(a), u.childLanes = Kn(
        l,
        f,
        a
      ), t.memoizedState = jn, t = e);
    else if (zt(t), Ff(c)) {
      if (f = c.nextSibling && c.nextSibling.dataset, f) var d = f.dgst;
      f = d, u = Error(b(419)), u.stack = "", u.digest = f, Ou({ value: u, source: null, stack: null }), t = Ln(
        l,
        t,
        a
      );
    } else if (cl || ju(l, t, a, !1), f = (a & l.childLanes) !== 0, cl || f) {
      if (f = j, f !== null && (u = a & -a, u = u & 42 ? 1 : nc(u), u = u & (f.suspendedLanes | a) ? 0 : u, u !== 0 && u !== i.retryLane))
        throw i.retryLane = u, La(l, u), Ul(f, l, u), fy;
      c.data === "$?" || Kf(), t = Ln(
        l,
        t,
        a
      );
    } else
      c.data === "$?" ? (t.flags |= 192, t.child = l.child, t = null) : (l = i.treeContext, w = Vl(
        c.nextSibling
      ), ol = t, B = !0, wt = null, Kl = !1, l !== null && (ql[Yl++] = at, ql[Yl++] = ut, ql[Yl++] = Jt, at = l.id, ut = l.overflow, Jt = t), t = Zf(
        t,
        u.children
      ), t.flags |= 4096);
    return t;
  }
  return e ? (Tt(), e = u.fallback, c = t.mode, i = l.child, d = i.sibling, u = ft(i, {
    mode: "hidden",
    children: u.children
  }), u.subtreeFlags = i.subtreeFlags & 65011712, d !== null ? e = ft(d, e) : (e = Lt(
    e,
    c,
    a,
    null
  ), e.flags |= 2), e.return = t, u.return = t, u.sibling = e, t.child = u, u = e, e = t.child, c = l.child.memoizedState, c === null ? c = Cn(a) : (i = c.cachePool, i !== null ? (d = tl._currentValue, i = i.parent !== d ? { parent: d, pool: d } : i) : i = ms(), c = {
    baseLanes: c.baseLanes | a,
    cachePool: i
  }), e.memoizedState = c, e.childLanes = Kn(
    l,
    f,
    a
  ), t.memoizedState = jn, u) : (zt(t), a = l.child, l = a.sibling, a = ft(a, {
    mode: "visible",
    children: u.children
  }), a.return = t, a.sibling = null, l !== null && (f = t.deletions, f === null ? (t.deletions = [l], t.flags |= 16) : f.push(l)), t.child = a, t.memoizedState = null, a);
}
function Zf(l, t) {
  return t = Ke(
    { mode: "visible", children: t },
    l.mode
  ), t.return = l, l.child = t;
}
function Ke(l, t) {
  return l = El(22, l, null, t), l.lanes = 0, l.stateNode = {
    _visibility: 1,
    _pendingMarkers: null,
    _retryCache: null,
    _transitions: null
  }, l;
}
function Ln(l, t, a) {
  return Xa(t, l.child, null, a), l = Zf(
    t,
    t.pendingProps.children
  ), l.flags |= 2, t.memoizedState = null, l;
}
function Li(l, t, a) {
  l.lanes |= t;
  var u = l.alternate;
  u !== null && (u.lanes |= t), Of(l.return, t, a);
}
function Jn(l, t, a, u, e) {
  var n = l.memoizedState;
  n === null ? l.memoizedState = {
    isBackwards: t,
    rendering: null,
    renderingStartTime: 0,
    last: u,
    tail: a,
    tailMode: e
  } : (n.isBackwards = t, n.rendering = null, n.renderingStartTime = 0, n.last = u, n.tail = a, n.tailMode = e);
}
function yy(l, t, a) {
  var u = t.pendingProps, e = u.revealOrder, n = u.tail;
  if (sl(l, t, u.children, a), u = al.current, u & 2)
    u = u & 1 | 2, t.flags |= 128;
  else {
    if (l !== null && l.flags & 128)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && Li(l, a, t);
        else if (l.tag === 19)
          Li(l, a, t);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t)
            break l;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    u &= 1;
  }
  switch (L(al, u), e) {
    case "forwards":
      for (a = t.child, e = null; a !== null; )
        l = a.alternate, l !== null && Ve(l) === null && (e = a), a = a.sibling;
      a = e, a === null ? (e = t.child, t.child = null) : (e = a.sibling, a.sibling = null), Jn(
        t,
        !1,
        e,
        a,
        n
      );
      break;
    case "backwards":
      for (a = null, e = t.child, t.child = null; e !== null; ) {
        if (l = e.alternate, l !== null && Ve(l) === null) {
          t.child = e;
          break;
        }
        l = e.sibling, e.sibling = a, a = e, e = l;
      }
      Jn(
        t,
        !0,
        a,
        null,
        n
      );
      break;
    case "together":
      Jn(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function yt(l, t, a) {
  if (l !== null && (t.dependencies = l.dependencies), Gt |= t.lanes, !(a & t.childLanes))
    if (l !== null) {
      if (ju(
        l,
        t,
        a,
        !1
      ), (a & t.childLanes) === 0)
        return null;
    } else return null;
  if (l !== null && t.child !== l.child)
    throw Error(b(153));
  if (t.child !== null) {
    for (l = t.child, a = ft(l, l.pendingProps), t.child = a, a.return = t; l.sibling !== null; )
      l = l.sibling, a = a.sibling = ft(l, l.pendingProps), a.return = t;
    a.sibling = null;
  }
  return t.child;
}
function Bc(l, t) {
  return l.lanes & t ? !0 : (l = l.dependencies, !!(l !== null && Ge(l)));
}
function pv(l, t, a) {
  switch (t.tag) {
    case 3:
      _e(t, t.stateNode.containerInfo), bt(t, tl, l.memoizedState.cache), Vu();
      break;
    case 27:
    case 5:
      hf(t);
      break;
    case 4:
      _e(t, t.stateNode.containerInfo);
      break;
    case 10:
      bt(
        t,
        t.type,
        t.memoizedProps.value
      );
      break;
    case 13:
      var u = t.memoizedState;
      if (u !== null)
        return u.dehydrated !== null ? (zt(t), t.flags |= 128, null) : a & t.child.childLanes ? sy(l, t, a) : (zt(t), l = yt(
          l,
          t,
          a
        ), l !== null ? l.sibling : null);
      zt(t);
      break;
    case 19:
      var e = (l.flags & 128) !== 0;
      if (u = (a & t.childLanes) !== 0, u || (ju(
        l,
        t,
        a,
        !1
      ), u = (a & t.childLanes) !== 0), e) {
        if (u)
          return yy(
            l,
            t,
            a
          );
        t.flags |= 128;
      }
      if (e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null), L(al, al.current), u) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, iy(l, t, a);
    case 24:
      bt(t, tl, l.memoizedState.cache);
  }
  return yt(l, t, a);
}
function dy(l, t, a) {
  if (l !== null)
    if (l.memoizedProps !== t.pendingProps)
      cl = !0;
    else {
      if (!Bc(l, a) && !(t.flags & 128))
        return cl = !1, pv(
          l,
          t,
          a
        );
      cl = !!(l.flags & 131072);
    }
  else
    cl = !1, B && t.flags & 1048576 && hs(t, Be, t.index);
  switch (t.lanes = 0, t.tag) {
    case 16:
      l: {
        l = t.pendingProps;
        var u = t.elementType, e = u._init;
        if (u = e(u._payload), t.type = u, typeof u == "function")
          Sc(u) ? (l = la(u, l), t.tag = 1, t = Ci(
            null,
            t,
            u,
            l,
            a
          )) : (t.tag = 0, t = Xf(
            null,
            t,
            u,
            l,
            a
          ));
        else {
          if (u != null) {
            if (e = u.$$typeof, e === ac) {
              t.tag = 11, t = xi(
                null,
                t,
                u,
                l,
                a
              );
              break l;
            } else if (e === uc) {
              t.tag = 14, t = pi(
                null,
                t,
                u,
                l,
                a
              );
              break l;
            }
          }
          throw t = df(u) || u, Error(b(306, t, ""));
        }
      }
      return t;
    case 0:
      return Xf(
        l,
        t,
        t.type,
        t.pendingProps,
        a
      );
    case 1:
      return u = t.type, e = la(
        u,
        t.pendingProps
      ), Ci(
        l,
        t,
        u,
        e,
        a
      );
    case 3:
      l: {
        if (_e(
          t,
          t.stateNode.containerInfo
        ), l === null) throw Error(b(387));
        u = t.pendingProps;
        var n = t.memoizedState;
        e = n.element, Rf(l, t), ou(t, u, null, a);
        var f = t.memoizedState;
        if (u = f.cache, bt(t, tl, u), u !== n.cache && Df(
          t,
          [tl],
          a,
          !0
        ), hu(), u = f.element, n.isDehydrated)
          if (n = {
            element: u,
            isDehydrated: !1,
            cache: f.cache
          }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
            t = Ki(
              l,
              t,
              u,
              a
            );
            break l;
          } else if (u !== e) {
            e = Bl(
              Error(b(424)),
              t
            ), Ou(e), t = Ki(
              l,
              t,
              u,
              a
            );
            break l;
          } else {
            switch (l = t.stateNode.containerInfo, l.nodeType) {
              case 9:
                l = l.body;
                break;
              default:
                l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
            }
            for (w = Vl(l.firstChild), ol = t, B = !0, wt = null, Kl = !0, a = Ps(
              t,
              null,
              u,
              a
            ), t.child = a; a; )
              a.flags = a.flags & -3 | 4096, a = a.sibling;
          }
        else {
          if (Vu(), u === e) {
            t = yt(
              l,
              t,
              a
            );
            break l;
          }
          sl(
            l,
            t,
            u,
            a
          );
        }
        t = t.child;
      }
      return t;
    case 26:
      return Me(l, t), l === null ? (a = i0(
        t.type,
        null,
        t.pendingProps,
        null
      )) ? t.memoizedState = a : B || (a = t.type, l = t.pendingProps, u = Fe(
        Dt.current
      ).createElement(a), u[vl] = t, u[bl] = l, dl(u, a, l), fl(u), t.stateNode = u) : t.memoizedState = i0(
        t.type,
        l.memoizedProps,
        t.pendingProps,
        l.memoizedState
      ), null;
    case 27:
      return hf(t), l === null && B && (u = t.stateNode = Fy(
        t.type,
        t.pendingProps,
        Dt.current
      ), ol = t, Kl = !0, e = w, Zt(t.type) ? (If = e, w = Vl(
        u.firstChild
      )) : w = e), sl(
        l,
        t,
        t.pendingProps.children,
        a
      ), Me(l, t), l === null && (t.flags |= 4194304), t.child;
    case 5:
      return l === null && B && ((e = u = w) && (u = oh(
        u,
        t.type,
        t.pendingProps,
        Kl
      ), u !== null ? (t.stateNode = u, ol = t, w = Vl(
        u.firstChild
      ), Kl = !1, e = !0) : e = !1), e || Ft(t)), hf(t), e = t.type, n = t.pendingProps, f = l !== null ? l.memoizedProps : null, u = n.children, $f(e, n) ? u = null : f !== null && $f(e, f) && (t.flags |= 32), t.memoizedState !== null && (e = rc(
        l,
        t,
        qv,
        null,
        null,
        a
      ), Nu._currentValue = e), Me(l, t), sl(l, t, u, a), t.child;
    case 6:
      return l === null && B && ((l = a = w) && (a = mh(
        a,
        t.pendingProps,
        Kl
      ), a !== null ? (t.stateNode = a, ol = t, w = null, l = !0) : l = !1), l || Ft(t)), null;
    case 13:
      return sy(l, t, a);
    case 4:
      return _e(
        t,
        t.stateNode.containerInfo
      ), u = t.pendingProps, l === null ? t.child = Xa(
        t,
        null,
        u,
        a
      ) : sl(
        l,
        t,
        u,
        a
      ), t.child;
    case 11:
      return xi(
        l,
        t,
        t.type,
        t.pendingProps,
        a
      );
    case 7:
      return sl(
        l,
        t,
        t.pendingProps,
        a
      ), t.child;
    case 8:
      return sl(
        l,
        t,
        t.pendingProps.children,
        a
      ), t.child;
    case 12:
      return sl(
        l,
        t,
        t.pendingProps.children,
        a
      ), t.child;
    case 10:
      return u = t.pendingProps, bt(t, t.type, u.value), sl(
        l,
        t,
        u.children,
        a
      ), t.child;
    case 9:
      return e = t.type._context, u = t.pendingProps.children, It(t), e = hl(e), u = u(e), t.flags |= 1, sl(l, t, u, a), t.child;
    case 14:
      return pi(
        l,
        t,
        t.type,
        t.pendingProps,
        a
      );
    case 15:
      return cy(
        l,
        t,
        t.type,
        t.pendingProps,
        a
      );
    case 19:
      return yy(l, t, a);
    case 31:
      return u = t.pendingProps, a = t.mode, u = {
        mode: u.mode,
        children: u.children
      }, l === null ? (a = Ke(
        u,
        a
      ), a.ref = t.ref, t.child = a, a.return = t, t = a) : (a = ft(l.child, u), a.ref = t.ref, t.child = a, a.return = t, t = a), t;
    case 22:
      return iy(l, t, a);
    case 24:
      return It(t), u = hl(tl), l === null ? (e = Tc(), e === null && (e = j, n = zc(), e.pooledCache = n, n.refCount++, n !== null && (e.pooledCacheLanes |= a), e = n), t.memoizedState = {
        parent: u,
        cache: e
      }, Ac(t), bt(t, tl, e)) : (l.lanes & a && (Rf(l, t), ou(t, null, null, a), hu()), e = l.memoizedState, n = t.memoizedState, e.parent !== u ? (e = { parent: u, cache: u }, t.memoizedState = e, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = e), bt(t, tl, u)) : (u = n.cache, bt(t, tl, u), u !== e.cache && Df(
        t,
        [tl],
        a,
        !0
      ))), sl(
        l,
        t,
        t.pendingProps.children,
        a
      ), t.child;
    case 29:
      throw t.pendingProps;
  }
  throw Error(b(156, t.tag));
}
function Il(l) {
  l.flags |= 4;
}
function Ji(l, t) {
  if (t.type !== "stylesheet" || t.state.loading & 4)
    l.flags &= -16777217;
  else if (l.flags |= 16777216, !l1(t)) {
    if (t = Zl.current, t !== null && ((Y & 4194048) === Y ? Wl !== null : (Y & 62914560) !== Y && !(Y & 536870912) || t !== Wl))
      throw du = _f, Ss;
    l.flags |= 8192;
  }
}
function se(l, t) {
  t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? X0() : 536870912, l.lanes |= t, Za |= t);
}
function lu(l, t) {
  if (!B)
    switch (l.tailMode) {
      case "hidden":
        t = l.tail;
        for (var a = null; t !== null; )
          t.alternate !== null && (a = t), t = t.sibling;
        a === null ? l.tail = null : a.sibling = null;
        break;
      case "collapsed":
        a = l.tail;
        for (var u = null; a !== null; )
          a.alternate !== null && (u = a), a = a.sibling;
        u === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : u.sibling = null;
    }
}
function J(l) {
  var t = l.alternate !== null && l.alternate.child === l.child, a = 0, u = 0;
  if (t)
    for (var e = l.child; e !== null; )
      a |= e.lanes | e.childLanes, u |= e.subtreeFlags & 65011712, u |= e.flags & 65011712, e.return = l, e = e.sibling;
  else
    for (e = l.child; e !== null; )
      a |= e.lanes | e.childLanes, u |= e.subtreeFlags, u |= e.flags, e.return = l, e = e.sibling;
  return l.subtreeFlags |= u, l.childLanes = a, t;
}
function Vv(l, t, a) {
  var u = t.pendingProps;
  switch (bc(t), t.tag) {
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
      return J(t), null;
    case 1:
      return J(t), null;
    case 3:
      return a = t.stateNode, u = null, l !== null && (u = l.memoizedState.cache), t.memoizedState.cache !== u && (t.flags |= 2048), ct(tl), Na(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (l === null || l.child === null) && (Ia(t) ? Il(t) : l === null || l.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Mi())), J(t), null;
    case 26:
      return a = t.memoizedState, l === null ? (Il(t), a !== null ? (J(t), Ji(t, a)) : (J(t), t.flags &= -16777217)) : a ? a !== l.memoizedState ? (Il(t), J(t), Ji(t, a)) : (J(t), t.flags &= -16777217) : (l.memoizedProps !== u && Il(t), J(t), t.flags &= -16777217), null;
    case 27:
      Re(t), a = Dt.current;
      var e = t.type;
      if (l !== null && t.stateNode != null)
        l.memoizedProps !== u && Il(t);
      else {
        if (!u) {
          if (t.stateNode === null)
            throw Error(b(166));
          return J(t), null;
        }
        l = Jl.current, Ia(t) ? Ti(t) : (l = Fy(e, u, a), t.stateNode = l, Il(t));
      }
      return J(t), null;
    case 5:
      if (Re(t), a = t.type, l !== null && t.stateNode != null)
        l.memoizedProps !== u && Il(t);
      else {
        if (!u) {
          if (t.stateNode === null)
            throw Error(b(166));
          return J(t), null;
        }
        if (l = Jl.current, Ia(t))
          Ti(t);
        else {
          switch (e = Fe(
            Dt.current
          ), l) {
            case 1:
              l = e.createElementNS(
                "http://www.w3.org/2000/svg",
                a
              );
              break;
            case 2:
              l = e.createElementNS(
                "http://www.w3.org/1998/Math/MathML",
                a
              );
              break;
            default:
              switch (a) {
                case "svg":
                  l = e.createElementNS(
                    "http://www.w3.org/2000/svg",
                    a
                  );
                  break;
                case "math":
                  l = e.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    a
                  );
                  break;
                case "script":
                  l = e.createElement("div"), l.innerHTML = "<script><\/script>", l = l.removeChild(l.firstChild);
                  break;
                case "select":
                  l = typeof u.is == "string" ? e.createElement("select", { is: u.is }) : e.createElement("select"), u.multiple ? l.multiple = !0 : u.size && (l.size = u.size);
                  break;
                default:
                  l = typeof u.is == "string" ? e.createElement(a, { is: u.is }) : e.createElement(a);
              }
          }
          l[vl] = t, l[bl] = u;
          l: for (e = t.child; e !== null; ) {
            if (e.tag === 5 || e.tag === 6)
              l.appendChild(e.stateNode);
            else if (e.tag !== 4 && e.tag !== 27 && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break l;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t)
                break l;
              e = e.return;
            }
            e.sibling.return = e.return, e = e.sibling;
          }
          t.stateNode = l;
          l: switch (dl(l, a, u), a) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              l = !!u.autoFocus;
              break l;
            case "img":
              l = !0;
              break l;
            default:
              l = !1;
          }
          l && Il(t);
        }
      }
      return J(t), t.flags &= -16777217, null;
    case 6:
      if (l && t.stateNode != null)
        l.memoizedProps !== u && Il(t);
      else {
        if (typeof u != "string" && t.stateNode === null)
          throw Error(b(166));
        if (l = Dt.current, Ia(t)) {
          if (l = t.stateNode, a = t.memoizedProps, u = null, e = ol, e !== null)
            switch (e.tag) {
              case 27:
              case 5:
                u = e.memoizedProps;
            }
          l[vl] = t, l = !!(l.nodeValue === a || u !== null && u.suppressHydrationWarning === !0 || Wy(l.nodeValue, a)), l || Ft(t);
        } else
          l = Fe(l).createTextNode(
            u
          ), l[vl] = t, t.stateNode = l;
      }
      return J(t), null;
    case 13:
      if (u = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
        if (e = Ia(t), u !== null && u.dehydrated !== null) {
          if (l === null) {
            if (!e) throw Error(b(318));
            if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(b(317));
            e[vl] = t;
          } else
            Vu(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          J(t), e = !1;
        } else
          e = Mi(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), e = !0;
        if (!e)
          return t.flags & 256 ? (nt(t), t) : (nt(t), null);
      }
      if (nt(t), t.flags & 128)
        return t.lanes = a, t;
      if (a = u !== null, l = l !== null && l.memoizedState !== null, a) {
        u = t.child, e = null, u.alternate !== null && u.alternate.memoizedState !== null && u.alternate.memoizedState.cachePool !== null && (e = u.alternate.memoizedState.cachePool.pool);
        var n = null;
        u.memoizedState !== null && u.memoizedState.cachePool !== null && (n = u.memoizedState.cachePool.pool), n !== e && (u.flags |= 2048);
      }
      return a !== l && a && (t.child.flags |= 8192), se(t, t.updateQueue), J(t), null;
    case 4:
      return Na(), l === null && Cc(t.stateNode.containerInfo), J(t), null;
    case 10:
      return ct(t.type), J(t), null;
    case 19:
      if (il(al), e = t.memoizedState, e === null) return J(t), null;
      if (u = (t.flags & 128) !== 0, n = e.rendering, n === null)
        if (u) lu(e, !1);
        else {
          if (W !== 0 || l !== null && l.flags & 128)
            for (l = t.child; l !== null; ) {
              if (n = Ve(l), n !== null) {
                for (t.flags |= 128, lu(e, !1), l = n.updateQueue, t.updateQueue = l, se(t, l), t.subtreeFlags = 0, l = a, a = t.child; a !== null; )
                  vs(a, l), a = a.sibling;
                return L(
                  al,
                  al.current & 1 | 2
                ), t.child;
              }
              l = l.sibling;
            }
          e.tail !== null && wl() > Je && (t.flags |= 128, u = !0, lu(e, !1), t.lanes = 4194304);
        }
      else {
        if (!u)
          if (l = Ve(n), l !== null) {
            if (t.flags |= 128, u = !0, l = l.updateQueue, t.updateQueue = l, se(t, l), lu(e, !0), e.tail === null && e.tailMode === "hidden" && !n.alternate && !B)
              return J(t), null;
          } else
            2 * wl() - e.renderingStartTime > Je && a !== 536870912 && (t.flags |= 128, u = !0, lu(e, !1), t.lanes = 4194304);
        e.isBackwards ? (n.sibling = t.child, t.child = n) : (l = e.last, l !== null ? l.sibling = n : t.child = n, e.last = n);
      }
      return e.tail !== null ? (t = e.tail, e.rendering = t, e.tail = t.sibling, e.renderingStartTime = wl(), t.sibling = null, l = al.current, L(al, u ? l & 1 | 2 : l & 1), t) : (J(t), null);
    case 22:
    case 23:
      return nt(t), Mc(), u = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== u && (t.flags |= 8192) : u && (t.flags |= 8192), u ? a & 536870912 && !(t.flags & 128) && (J(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : J(t), a = t.updateQueue, a !== null && se(t, a.retryQueue), a = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), u = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (u = t.memoizedState.cachePool.pool), u !== a && (t.flags |= 2048), l !== null && il(Wt), null;
    case 24:
      return a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), ct(tl), J(t), null;
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(b(156, t.tag));
}
function jv(l, t) {
  switch (bc(t), t.tag) {
    case 1:
      return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 3:
      return ct(tl), Na(), l = t.flags, l & 65536 && !(l & 128) ? (t.flags = l & -65537 | 128, t) : null;
    case 26:
    case 27:
    case 5:
      return Re(t), null;
    case 13:
      if (nt(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
        if (t.alternate === null)
          throw Error(b(340));
        Vu();
      }
      return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 19:
      return il(al), null;
    case 4:
      return Na(), null;
    case 10:
      return ct(t.type), null;
    case 22:
    case 23:
      return nt(t), Mc(), l !== null && il(Wt), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 24:
      return ct(tl), null;
    case 25:
      return null;
    default:
      return null;
  }
}
function vy(l, t) {
  switch (bc(t), t.tag) {
    case 3:
      ct(tl), Na();
      break;
    case 26:
    case 27:
    case 5:
      Re(t);
      break;
    case 4:
      Na();
      break;
    case 13:
      nt(t);
      break;
    case 19:
      il(al);
      break;
    case 10:
      ct(t.type);
      break;
    case 22:
    case 23:
      nt(t), Mc(), l !== null && il(Wt);
      break;
    case 24:
      ct(tl);
  }
}
function wu(l, t) {
  try {
    var a = t.updateQueue, u = a !== null ? a.lastEffect : null;
    if (u !== null) {
      var e = u.next;
      a = e;
      do {
        if ((a.tag & l) === l) {
          u = void 0;
          var n = a.create, f = a.inst;
          u = n(), f.destroy = u;
        }
        a = a.next;
      } while (a !== e);
    }
  } catch (c) {
    V(t, t.return, c);
  }
}
function Bt(l, t, a) {
  try {
    var u = t.updateQueue, e = u !== null ? u.lastEffect : null;
    if (e !== null) {
      var n = e.next;
      u = n;
      do {
        if ((u.tag & l) === l) {
          var f = u.inst, c = f.destroy;
          if (c !== void 0) {
            f.destroy = void 0, e = t;
            var i = a, d = c;
            try {
              d();
            } catch (m) {
              V(
                e,
                i,
                m
              );
            }
          }
        }
        u = u.next;
      } while (u !== n);
    }
  } catch (m) {
    V(t, t.return, m);
  }
}
function hy(l) {
  var t = l.updateQueue;
  if (t !== null) {
    var a = l.stateNode;
    try {
      zs(t, a);
    } catch (u) {
      V(l, l.return, u);
    }
  }
}
function oy(l, t, a) {
  a.props = la(
    l.type,
    l.memoizedProps
  ), a.state = l.memoizedState;
  try {
    a.componentWillUnmount();
  } catch (u) {
    V(l, t, u);
  }
}
function Su(l, t) {
  try {
    var a = l.ref;
    if (a !== null) {
      switch (l.tag) {
        case 26:
        case 27:
        case 5:
          var u = l.stateNode;
          break;
        case 30:
          u = l.stateNode;
          break;
        default:
          u = l.stateNode;
      }
      typeof a == "function" ? l.refCleanup = a(u) : a.current = u;
    }
  } catch (e) {
    V(l, t, e);
  }
}
function Ll(l, t) {
  var a = l.ref, u = l.refCleanup;
  if (a !== null)
    if (typeof u == "function")
      try {
        u();
      } catch (e) {
        V(l, t, e);
      } finally {
        l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
      }
    else if (typeof a == "function")
      try {
        a(null);
      } catch (e) {
        V(l, t, e);
      }
    else a.current = null;
}
function my(l) {
  var t = l.type, a = l.memoizedProps, u = l.stateNode;
  try {
    l: switch (t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        a.autoFocus && u.focus();
        break l;
      case "img":
        a.src ? u.src = a.src : a.srcSet && (u.srcset = a.srcSet);
    }
  } catch (e) {
    V(l, l.return, e);
  }
}
function wn(l, t, a) {
  try {
    var u = l.stateNode;
    sh(u, l.type, a, t), u[bl] = t;
  } catch (e) {
    V(l, l.return, e);
  }
}
function Sy(l) {
  return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && Zt(l.type) || l.tag === 4;
}
function Wn(l) {
  l: for (; ; ) {
    for (; l.sibling === null; ) {
      if (l.return === null || Sy(l.return)) return null;
      l = l.return;
    }
    for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
      if (l.tag === 27 && Zt(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
      l.child.return = l, l = l.child;
    }
    if (!(l.flags & 2)) return l.stateNode;
  }
}
function xf(l, t, a) {
  var u = l.tag;
  if (u === 5 || u === 6)
    l = l.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(l, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(l), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = zn));
  else if (u !== 4 && (u === 27 && Zt(l.type) && (a = l.stateNode, t = null), l = l.child, l !== null))
    for (xf(l, t, a), l = l.sibling; l !== null; )
      xf(l, t, a), l = l.sibling;
}
function Le(l, t, a) {
  var u = l.tag;
  if (u === 5 || u === 6)
    l = l.stateNode, t ? a.insertBefore(l, t) : a.appendChild(l);
  else if (u !== 4 && (u === 27 && Zt(l.type) && (a = l.stateNode), l = l.child, l !== null))
    for (Le(l, t, a), l = l.sibling; l !== null; )
      Le(l, t, a), l = l.sibling;
}
function gy(l) {
  var t = l.stateNode, a = l.memoizedProps;
  try {
    for (var u = l.type, e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    dl(t, u, a), t[vl] = l, t[bl] = a;
  } catch (n) {
    V(l, l.return, n);
  }
}
var lt = !1, I = !1, $n = !1, wi = typeof WeakSet == "function" ? WeakSet : Set, nl = null;
function Cv(l, t) {
  if (l = l.containerInfo, wf = tn, l = es(l), hc(l)) {
    if ("selectionStart" in l)
      var a = {
        start: l.selectionStart,
        end: l.selectionEnd
      };
    else
      l: {
        a = (a = l.ownerDocument) && a.defaultView || window;
        var u = a.getSelection && a.getSelection();
        if (u && u.rangeCount !== 0) {
          a = u.anchorNode;
          var e = u.anchorOffset, n = u.focusNode;
          u = u.focusOffset;
          try {
            a.nodeType, n.nodeType;
          } catch {
            a = null;
            break l;
          }
          var f = 0, c = -1, i = -1, d = 0, m = 0, S = l, v = null;
          t: for (; ; ) {
            for (var o; S !== a || e !== 0 && S.nodeType !== 3 || (c = f + e), S !== n || u !== 0 && S.nodeType !== 3 || (i = f + u), S.nodeType === 3 && (f += S.nodeValue.length), (o = S.firstChild) !== null; )
              v = S, S = o;
            for (; ; ) {
              if (S === l) break t;
              if (v === a && ++d === e && (c = f), v === n && ++m === u && (i = f), (o = S.nextSibling) !== null) break;
              S = v, v = S.parentNode;
            }
            S = o;
          }
          a = c === -1 || i === -1 ? null : { start: c, end: i };
        } else a = null;
      }
    a = a || { start: 0, end: 0 };
  } else a = null;
  for (Wf = { focusedElem: l, selectionRange: a }, tn = !1, nl = t; nl !== null; )
    if (t = nl, l = t.child, (t.subtreeFlags & 1024) !== 0 && l !== null)
      l.return = t, nl = l;
    else
      for (; nl !== null; ) {
        switch (t = nl, n = t.alternate, l = t.flags, t.tag) {
          case 0:
            break;
          case 11:
          case 15:
            break;
          case 1:
            if (l & 1024 && n !== null) {
              l = void 0, a = t, e = n.memoizedProps, n = n.memoizedState, u = a.stateNode;
              try {
                var E = la(
                  a.type,
                  e,
                  a.elementType === a.type
                );
                l = u.getSnapshotBeforeUpdate(
                  E,
                  n
                ), u.__reactInternalSnapshotBeforeUpdate = l;
              } catch (M) {
                V(
                  a,
                  a.return,
                  M
                );
              }
            }
            break;
          case 3:
            if (l & 1024) {
              if (l = t.stateNode.containerInfo, a = l.nodeType, a === 9)
                kf(l);
              else if (a === 1)
                switch (l.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    kf(l);
                    break;
                  default:
                    l.textContent = "";
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
            if (l & 1024) throw Error(b(163));
        }
        if (l = t.sibling, l !== null) {
          l.return = t.return, nl = l;
          break;
        }
        nl = t.return;
      }
}
function by(l, t, a) {
  var u = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 15:
      ot(l, a), u & 4 && wu(5, a);
      break;
    case 1:
      if (ot(l, a), u & 4)
        if (l = a.stateNode, t === null)
          try {
            l.componentDidMount();
          } catch (f) {
            V(a, a.return, f);
          }
        else {
          var e = la(
            a.type,
            t.memoizedProps
          );
          t = t.memoizedState;
          try {
            l.componentDidUpdate(
              e,
              t,
              l.__reactInternalSnapshotBeforeUpdate
            );
          } catch (f) {
            V(
              a,
              a.return,
              f
            );
          }
        }
      u & 64 && hy(a), u & 512 && Su(a, a.return);
      break;
    case 3:
      if (ot(l, a), u & 64 && (l = a.updateQueue, l !== null)) {
        if (t = null, a.child !== null)
          switch (a.child.tag) {
            case 27:
            case 5:
              t = a.child.stateNode;
              break;
            case 1:
              t = a.child.stateNode;
          }
        try {
          zs(l, t);
        } catch (f) {
          V(a, a.return, f);
        }
      }
      break;
    case 27:
      t === null && u & 4 && gy(a);
    case 26:
    case 5:
      ot(l, a), t === null && u & 4 && my(a), u & 512 && Su(a, a.return);
      break;
    case 12:
      ot(l, a);
      break;
    case 13:
      ot(l, a), u & 4 && Ay(l, a), u & 64 && (l = a.memoizedState, l !== null && (l = l.dehydrated, l !== null && (a = Iv.bind(
        null,
        a
      ), Sh(l, a))));
      break;
    case 22:
      if (u = a.memoizedState !== null || lt, !u) {
        t = t !== null && t.memoizedState !== null || I, e = lt;
        var n = I;
        lt = u, (I = t) && !n ? mt(
          l,
          a,
          (a.subtreeFlags & 8772) !== 0
        ) : ot(l, a), lt = e, I = n;
      }
      break;
    case 30:
      break;
    default:
      ot(l, a);
  }
}
function zy(l) {
  var t = l.alternate;
  t !== null && (l.alternate = null, zy(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && cc(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
}
var K = null, Sl = !1;
function Pl(l, t, a) {
  for (a = a.child; a !== null; )
    Ty(l, t, a), a = a.sibling;
}
function Ty(l, t, a) {
  if (rl && typeof rl.onCommitFiberUnmount == "function")
    try {
      rl.onCommitFiberUnmount(Gu, a);
    } catch {
    }
  switch (a.tag) {
    case 26:
      I || Ll(a, t), Pl(
        l,
        t,
        a
      ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
      break;
    case 27:
      I || Ll(a, t);
      var u = K, e = Sl;
      Zt(a.type) && (K = a.stateNode, Sl = !1), Pl(
        l,
        t,
        a
      ), Tu(a.stateNode), K = u, Sl = e;
      break;
    case 5:
      I || Ll(a, t);
    case 6:
      if (u = K, e = Sl, K = null, Pl(
        l,
        t,
        a
      ), K = u, Sl = e, K !== null)
        if (Sl)
          try {
            (K.nodeType === 9 ? K.body : K.nodeName === "HTML" ? K.ownerDocument.body : K).removeChild(a.stateNode);
          } catch (n) {
            V(
              a,
              t,
              n
            );
          }
        else
          try {
            K.removeChild(a.stateNode);
          } catch (n) {
            V(
              a,
              t,
              n
            );
          }
      break;
    case 18:
      K !== null && (Sl ? (l = K, n0(
        l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
        a.stateNode
      ), Qu(l)) : n0(K, a.stateNode));
      break;
    case 4:
      u = K, e = Sl, K = a.stateNode.containerInfo, Sl = !0, Pl(
        l,
        t,
        a
      ), K = u, Sl = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      I || Bt(2, a, t), I || Bt(4, a, t), Pl(
        l,
        t,
        a
      );
      break;
    case 1:
      I || (Ll(a, t), u = a.stateNode, typeof u.componentWillUnmount == "function" && oy(
        a,
        t,
        u
      )), Pl(
        l,
        t,
        a
      );
      break;
    case 21:
      Pl(
        l,
        t,
        a
      );
      break;
    case 22:
      I = (u = I) || a.memoizedState !== null, Pl(
        l,
        t,
        a
      ), I = u;
      break;
    default:
      Pl(
        l,
        t,
        a
      );
  }
}
function Ay(l, t) {
  if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
    try {
      Qu(l);
    } catch (a) {
      V(t, t.return, a);
    }
}
function Kv(l) {
  switch (l.tag) {
    case 13:
    case 19:
      var t = l.stateNode;
      return t === null && (t = l.stateNode = new wi()), t;
    case 22:
      return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new wi()), t;
    default:
      throw Error(b(435, l.tag));
  }
}
function kn(l, t) {
  var a = Kv(l);
  t.forEach(function(u) {
    var e = Pv.bind(null, l, u);
    a.has(u) || (a.add(u), u.then(e, e));
  });
}
function Tl(l, t) {
  var a = t.deletions;
  if (a !== null)
    for (var u = 0; u < a.length; u++) {
      var e = a[u], n = l, f = t, c = f;
      l: for (; c !== null; ) {
        switch (c.tag) {
          case 27:
            if (Zt(c.type)) {
              K = c.stateNode, Sl = !1;
              break l;
            }
            break;
          case 5:
            K = c.stateNode, Sl = !1;
            break l;
          case 3:
          case 4:
            K = c.stateNode.containerInfo, Sl = !0;
            break l;
        }
        c = c.return;
      }
      if (K === null) throw Error(b(160));
      Ty(n, f, e), K = null, Sl = !1, n = e.alternate, n !== null && (n.return = null), e.return = null;
    }
  if (t.subtreeFlags & 13878)
    for (t = t.child; t !== null; )
      My(t, l), t = t.sibling;
}
var pl = null;
function My(l, t) {
  var a = l.alternate, u = l.flags;
  switch (l.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      Tl(t, l), Al(l), u & 4 && (Bt(3, l, l.return), wu(3, l), Bt(5, l, l.return));
      break;
    case 1:
      Tl(t, l), Al(l), u & 512 && (I || a === null || Ll(a, a.return)), u & 64 && lt && (l = l.updateQueue, l !== null && (u = l.callbacks, u !== null && (a = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = a === null ? u : a.concat(u))));
      break;
    case 26:
      var e = pl;
      if (Tl(t, l), Al(l), u & 512 && (I || a === null || Ll(a, a.return)), u & 4) {
        var n = a !== null ? a.memoizedState : null;
        if (u = l.memoizedState, a === null)
          if (u === null)
            if (l.stateNode === null) {
              l: {
                u = l.type, a = l.memoizedProps, e = e.ownerDocument || e;
                t: switch (u) {
                  case "title":
                    n = e.getElementsByTagName("title")[0], (!n || n[xu] || n[vl] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = e.createElement(u), e.head.insertBefore(
                      n,
                      e.querySelector("head > title")
                    )), dl(n, u, a), n[vl] = l, fl(n), u = n;
                    break l;
                  case "link":
                    var f = y0(
                      "link",
                      "href",
                      e
                    ).get(u + (a.href || ""));
                    if (f) {
                      for (var c = 0; c < f.length; c++)
                        if (n = f[c], n.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && n.getAttribute("rel") === (a.rel == null ? null : a.rel) && n.getAttribute("title") === (a.title == null ? null : a.title) && n.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                          f.splice(c, 1);
                          break t;
                        }
                    }
                    n = e.createElement(u), dl(n, u, a), e.head.appendChild(n);
                    break;
                  case "meta":
                    if (f = y0(
                      "meta",
                      "content",
                      e
                    ).get(u + (a.content || ""))) {
                      for (c = 0; c < f.length; c++)
                        if (n = f[c], n.getAttribute("content") === (a.content == null ? null : "" + a.content) && n.getAttribute("name") === (a.name == null ? null : a.name) && n.getAttribute("property") === (a.property == null ? null : a.property) && n.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && n.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                          f.splice(c, 1);
                          break t;
                        }
                    }
                    n = e.createElement(u), dl(n, u, a), e.head.appendChild(n);
                    break;
                  default:
                    throw Error(b(468, u));
                }
                n[vl] = l, fl(n), u = n;
              }
              l.stateNode = u;
            } else
              d0(
                e,
                l.type,
                l.stateNode
              );
          else
            l.stateNode = s0(
              e,
              u,
              l.memoizedProps
            );
        else
          n !== u ? (n === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : n.count--, u === null ? d0(
            e,
            l.type,
            l.stateNode
          ) : s0(
            e,
            u,
            l.memoizedProps
          )) : u === null && l.stateNode !== null && wn(
            l,
            l.memoizedProps,
            a.memoizedProps
          );
      }
      break;
    case 27:
      Tl(t, l), Al(l), u & 512 && (I || a === null || Ll(a, a.return)), a !== null && u & 4 && wn(
        l,
        l.memoizedProps,
        a.memoizedProps
      );
      break;
    case 5:
      if (Tl(t, l), Al(l), u & 512 && (I || a === null || Ll(a, a.return)), l.flags & 32) {
        e = l.stateNode;
        try {
          Ya(e, "");
        } catch (o) {
          V(l, l.return, o);
        }
      }
      u & 4 && l.stateNode != null && (e = l.memoizedProps, wn(
        l,
        e,
        a !== null ? a.memoizedProps : e
      )), u & 1024 && ($n = !0);
      break;
    case 6:
      if (Tl(t, l), Al(l), u & 4) {
        if (l.stateNode === null)
          throw Error(b(162));
        u = l.memoizedProps, a = l.stateNode;
        try {
          a.nodeValue = u;
        } catch (o) {
          V(l, l.return, o);
        }
      }
      break;
    case 3:
      if (Oe = null, e = pl, pl = Ie(t.containerInfo), Tl(t, l), pl = e, Al(l), u & 4 && a !== null && a.memoizedState.isDehydrated)
        try {
          Qu(t.containerInfo);
        } catch (o) {
          V(l, l.return, o);
        }
      $n && ($n = !1, Ey(l));
      break;
    case 4:
      u = pl, pl = Ie(
        l.stateNode.containerInfo
      ), Tl(t, l), Al(l), pl = u;
      break;
    case 12:
      Tl(t, l), Al(l);
      break;
    case 13:
      Tl(t, l), Al(l), l.child.flags & 8192 && l.memoizedState !== null != (a !== null && a.memoizedState !== null) && (pc = wl()), u & 4 && (u = l.updateQueue, u !== null && (l.updateQueue = null, kn(l, u)));
      break;
    case 22:
      e = l.memoizedState !== null;
      var i = a !== null && a.memoizedState !== null, d = lt, m = I;
      if (lt = d || e, I = m || i, Tl(t, l), I = m, lt = d, Al(l), u & 8192)
        l: for (t = l.stateNode, t._visibility = e ? t._visibility & -2 : t._visibility | 1, e && (a === null || i || lt || I || Ct(l)), a = null, t = l; ; ) {
          if (t.tag === 5 || t.tag === 26) {
            if (a === null) {
              i = a = t;
              try {
                if (n = i.stateNode, e)
                  f = n.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                else {
                  c = i.stateNode;
                  var S = i.memoizedProps.style, v = S != null && S.hasOwnProperty("display") ? S.display : null;
                  c.style.display = v == null || typeof v == "boolean" ? "" : ("" + v).trim();
                }
              } catch (o) {
                V(i, i.return, o);
              }
            }
          } else if (t.tag === 6) {
            if (a === null) {
              i = t;
              try {
                i.stateNode.nodeValue = e ? "" : i.memoizedProps;
              } catch (o) {
                V(i, i.return, o);
              }
            }
          } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === l) break l;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === l) break l;
            a === t && (a = null), t = t.return;
          }
          a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
        }
      u & 4 && (u = l.updateQueue, u !== null && (a = u.retryQueue, a !== null && (u.retryQueue = null, kn(l, a))));
      break;
    case 19:
      Tl(t, l), Al(l), u & 4 && (u = l.updateQueue, u !== null && (l.updateQueue = null, kn(l, u)));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      Tl(t, l), Al(l);
  }
}
function Al(l) {
  var t = l.flags;
  if (t & 2) {
    try {
      for (var a, u = l.return; u !== null; ) {
        if (Sy(u)) {
          a = u;
          break;
        }
        u = u.return;
      }
      if (a == null) throw Error(b(160));
      switch (a.tag) {
        case 27:
          var e = a.stateNode, n = Wn(l);
          Le(l, n, e);
          break;
        case 5:
          var f = a.stateNode;
          a.flags & 32 && (Ya(f, ""), a.flags &= -33);
          var c = Wn(l);
          Le(l, c, f);
          break;
        case 3:
        case 4:
          var i = a.stateNode.containerInfo, d = Wn(l);
          xf(
            l,
            d,
            i
          );
          break;
        default:
          throw Error(b(161));
      }
    } catch (m) {
      V(l, l.return, m);
    }
    l.flags &= -3;
  }
  t & 4096 && (l.flags &= -4097);
}
function Ey(l) {
  if (l.subtreeFlags & 1024)
    for (l = l.child; l !== null; ) {
      var t = l;
      Ey(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
    }
}
function ot(l, t) {
  if (t.subtreeFlags & 8772)
    for (t = t.child; t !== null; )
      by(l, t.alternate, t), t = t.sibling;
}
function Ct(l) {
  for (l = l.child; l !== null; ) {
    var t = l;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Bt(4, t, t.return), Ct(t);
        break;
      case 1:
        Ll(t, t.return);
        var a = t.stateNode;
        typeof a.componentWillUnmount == "function" && oy(
          t,
          t.return,
          a
        ), Ct(t);
        break;
      case 27:
        Tu(t.stateNode);
      case 26:
      case 5:
        Ll(t, t.return), Ct(t);
        break;
      case 22:
        t.memoizedState === null && Ct(t);
        break;
      case 30:
        Ct(t);
        break;
      default:
        Ct(t);
    }
    l = l.sibling;
  }
}
function mt(l, t, a) {
  for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
    var u = t.alternate, e = l, n = t, f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        mt(
          e,
          n,
          a
        ), wu(4, n);
        break;
      case 1:
        if (mt(
          e,
          n,
          a
        ), u = n, e = u.stateNode, typeof e.componentDidMount == "function")
          try {
            e.componentDidMount();
          } catch (d) {
            V(u, u.return, d);
          }
        if (u = n, e = u.updateQueue, e !== null) {
          var c = u.stateNode;
          try {
            var i = e.shared.hiddenCallbacks;
            if (i !== null)
              for (e.shared.hiddenCallbacks = null, e = 0; e < i.length; e++)
                bs(i[e], c);
          } catch (d) {
            V(u, u.return, d);
          }
        }
        a && f & 64 && hy(n), Su(n, n.return);
        break;
      case 27:
        gy(n);
      case 26:
      case 5:
        mt(
          e,
          n,
          a
        ), a && u === null && f & 4 && my(n), Su(n, n.return);
        break;
      case 12:
        mt(
          e,
          n,
          a
        );
        break;
      case 13:
        mt(
          e,
          n,
          a
        ), a && f & 4 && Ay(e, n);
        break;
      case 22:
        n.memoizedState === null && mt(
          e,
          n,
          a
        ), Su(n, n.return);
        break;
      case 30:
        break;
      default:
        mt(
          e,
          n,
          a
        );
    }
    t = t.sibling;
  }
}
function Gc(l, t) {
  var a = null;
  l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (l != null && l.refCount++, a != null && Cu(a));
}
function Xc(l, t) {
  l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Cu(l));
}
function Cl(l, t, a, u) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; )
      ry(
        l,
        t,
        a,
        u
      ), t = t.sibling;
}
function ry(l, t, a, u) {
  var e = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      Cl(
        l,
        t,
        a,
        u
      ), e & 2048 && wu(9, t);
      break;
    case 1:
      Cl(
        l,
        t,
        a,
        u
      );
      break;
    case 3:
      Cl(
        l,
        t,
        a,
        u
      ), e & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Cu(l)));
      break;
    case 12:
      if (e & 2048) {
        Cl(
          l,
          t,
          a,
          u
        ), l = t.stateNode;
        try {
          var n = t.memoizedProps, f = n.id, c = n.onPostCommit;
          typeof c == "function" && c(
            f,
            t.alternate === null ? "mount" : "update",
            l.passiveEffectDuration,
            -0
          );
        } catch (i) {
          V(t, t.return, i);
        }
      } else
        Cl(
          l,
          t,
          a,
          u
        );
      break;
    case 13:
      Cl(
        l,
        t,
        a,
        u
      );
      break;
    case 23:
      break;
    case 22:
      n = t.stateNode, f = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Cl(
        l,
        t,
        a,
        u
      ) : gu(l, t) : n._visibility & 2 ? Cl(
        l,
        t,
        a,
        u
      ) : (n._visibility |= 2, ia(
        l,
        t,
        a,
        u,
        (t.subtreeFlags & 10256) !== 0
      )), e & 2048 && Gc(f, t);
      break;
    case 24:
      Cl(
        l,
        t,
        a,
        u
      ), e & 2048 && Xc(t.alternate, t);
      break;
    default:
      Cl(
        l,
        t,
        a,
        u
      );
  }
}
function ia(l, t, a, u, e) {
  for (e = e && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
    var n = l, f = t, c = a, i = u, d = f.flags;
    switch (f.tag) {
      case 0:
      case 11:
      case 15:
        ia(
          n,
          f,
          c,
          i,
          e
        ), wu(8, f);
        break;
      case 23:
        break;
      case 22:
        var m = f.stateNode;
        f.memoizedState !== null ? m._visibility & 2 ? ia(
          n,
          f,
          c,
          i,
          e
        ) : gu(
          n,
          f
        ) : (m._visibility |= 2, ia(
          n,
          f,
          c,
          i,
          e
        )), e && d & 2048 && Gc(
          f.alternate,
          f
        );
        break;
      case 24:
        ia(
          n,
          f,
          c,
          i,
          e
        ), e && d & 2048 && Xc(f.alternate, f);
        break;
      default:
        ia(
          n,
          f,
          c,
          i,
          e
        );
    }
    t = t.sibling;
  }
}
function gu(l, t) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; ) {
      var a = l, u = t, e = u.flags;
      switch (u.tag) {
        case 22:
          gu(a, u), e & 2048 && Gc(
            u.alternate,
            u
          );
          break;
        case 24:
          gu(a, u), e & 2048 && Xc(u.alternate, u);
          break;
        default:
          gu(a, u);
      }
      t = t.sibling;
    }
}
var fu = 8192;
function na(l) {
  if (l.subtreeFlags & fu)
    for (l = l.child; l !== null; )
      Oy(l), l = l.sibling;
}
function Oy(l) {
  switch (l.tag) {
    case 26:
      na(l), l.flags & fu && l.memoizedState !== null && Rh(
        pl,
        l.memoizedState,
        l.memoizedProps
      );
      break;
    case 5:
      na(l);
      break;
    case 3:
    case 4:
      var t = pl;
      pl = Ie(l.stateNode.containerInfo), na(l), pl = t;
      break;
    case 22:
      l.memoizedState === null && (t = l.alternate, t !== null && t.memoizedState !== null ? (t = fu, fu = 16777216, na(l), fu = t) : na(l));
      break;
    default:
      na(l);
  }
}
function Dy(l) {
  var t = l.alternate;
  if (t !== null && (l = t.child, l !== null)) {
    t.child = null;
    do
      t = l.sibling, l.sibling = null, l = t;
    while (l !== null);
  }
}
function tu(l) {
  var t = l.deletions;
  if (l.flags & 16) {
    if (t !== null)
      for (var a = 0; a < t.length; a++) {
        var u = t[a];
        nl = u, _y(
          u,
          l
        );
      }
    Dy(l);
  }
  if (l.subtreeFlags & 10256)
    for (l = l.child; l !== null; )
      Uy(l), l = l.sibling;
}
function Uy(l) {
  switch (l.tag) {
    case 0:
    case 11:
    case 15:
      tu(l), l.flags & 2048 && Bt(9, l, l.return);
      break;
    case 3:
      tu(l);
      break;
    case 12:
      tu(l);
      break;
    case 22:
      var t = l.stateNode;
      l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, Ee(l)) : tu(l);
      break;
    default:
      tu(l);
  }
}
function Ee(l) {
  var t = l.deletions;
  if (l.flags & 16) {
    if (t !== null)
      for (var a = 0; a < t.length; a++) {
        var u = t[a];
        nl = u, _y(
          u,
          l
        );
      }
    Dy(l);
  }
  for (l = l.child; l !== null; ) {
    switch (t = l, t.tag) {
      case 0:
      case 11:
      case 15:
        Bt(8, t, t.return), Ee(t);
        break;
      case 22:
        a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, Ee(t));
        break;
      default:
        Ee(t);
    }
    l = l.sibling;
  }
}
function _y(l, t) {
  for (; nl !== null; ) {
    var a = nl;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Bt(8, a, t);
        break;
      case 23:
      case 22:
        if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
          var u = a.memoizedState.cachePool.pool;
          u != null && u.refCount++;
        }
        break;
      case 24:
        Cu(a.memoizedState.cache);
    }
    if (u = a.child, u !== null) u.return = a, nl = u;
    else
      l: for (a = l; nl !== null; ) {
        u = nl;
        var e = u.sibling, n = u.return;
        if (zy(u), u === a) {
          nl = null;
          break l;
        }
        if (e !== null) {
          e.return = n, nl = e;
          break l;
        }
        nl = n;
      }
  }
}
var Lv = {
  getCacheForType: function(l) {
    var t = hl(tl), a = t.data.get(l);
    return a === void 0 && (a = l(), t.data.set(l, a)), a;
  }
}, Jv = typeof WeakMap == "function" ? WeakMap : Map, Z = 0, j = null, N = null, Y = 0, X = 0, Ml = null, rt = !1, Ja = !1, Zc = !1, dt = 0, W = 0, Gt = 0, $t = 0, xc = 0, Xl = 0, Za = 0, bu = null, gl = null, pf = !1, pc = 0, Je = 1 / 0, we = null, Rt = null, yl = 0, Ht = null, xa = null, Ha = 0, Vf = 0, jf = null, Ry = null, zu = 0, Cf = null;
function Dl() {
  if (Z & 2 && Y !== 0)
    return Y & -Y;
  if (O.T !== null) {
    var l = Qa;
    return l !== 0 ? l : jc();
  }
  return p0();
}
function Hy() {
  Xl === 0 && (Xl = !(Y & 536870912) || B ? G0() : 536870912);
  var l = Zl.current;
  return l !== null && (l.flags |= 32), Xl;
}
function Ul(l, t, a) {
  (l === j && (X === 2 || X === 9) || l.cancelPendingCommit !== null) && (pa(l, 0), Ot(
    l,
    Y,
    Xl,
    !1
  )), Zu(l, a), (!(Z & 2) || l !== j) && (l === j && (!(Z & 2) && ($t |= a), W === 4 && Ot(
    l,
    Y,
    Xl,
    !1
  )), kl(l));
}
function Ny(l, t, a) {
  if (Z & 6) throw Error(b(327));
  var u = !a && (t & 124) === 0 && (t & l.expiredLanes) === 0 || Xu(l, t), e = u ? $v(l, t) : Fn(l, t, !0), n = u;
  do {
    if (e === 0) {
      Ja && !u && Ot(l, t, 0, !1);
      break;
    } else {
      if (a = l.current.alternate, n && !wv(a)) {
        e = Fn(l, t, !1), n = !1;
        continue;
      }
      if (e === 2) {
        if (n = t, l.errorRecoveryDisabledLanes & n)
          var f = 0;
        else
          f = l.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
        if (f !== 0) {
          t = f;
          l: {
            var c = l;
            e = bu;
            var i = c.current.memoizedState.isDehydrated;
            if (i && (pa(c, f).flags |= 256), f = Fn(
              c,
              f,
              !1
            ), f !== 2) {
              if (Zc && !i) {
                c.errorRecoveryDisabledLanes |= n, $t |= n, e = 4;
                break l;
              }
              n = gl, gl = e, n !== null && (gl === null ? gl = n : gl.push.apply(
                gl,
                n
              ));
            }
            e = f;
          }
          if (n = !1, e !== 2) continue;
        }
      }
      if (e === 1) {
        pa(l, 0), Ot(l, t, 0, !0);
        break;
      }
      l: {
        switch (u = l, n = e, n) {
          case 0:
          case 1:
            throw Error(b(345));
          case 4:
            if ((t & 4194048) !== t) break;
          case 6:
            Ot(
              u,
              t,
              Xl,
              !rt
            );
            break l;
          case 2:
            gl = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(b(329));
        }
        if ((t & 62914560) === t && (e = pc + 300 - wl(), 10 < e)) {
          if (Ot(
            u,
            t,
            Xl,
            !rt
          ), nn(u, 0, !0) !== 0) break l;
          u.timeoutHandle = ky(
            Wi.bind(
              null,
              u,
              a,
              gl,
              we,
              pf,
              t,
              Xl,
              $t,
              Za,
              rt,
              n,
              2,
              -0,
              0
            ),
            e
          );
          break l;
        }
        Wi(
          u,
          a,
          gl,
          we,
          pf,
          t,
          Xl,
          $t,
          Za,
          rt,
          n,
          0,
          -0,
          0
        );
      }
    }
    break;
  } while (!0);
  kl(l);
}
function Wi(l, t, a, u, e, n, f, c, i, d, m, S, v, o) {
  if (l.timeoutHandle = -1, S = t.subtreeFlags, (S & 8192 || (S & 16785408) === 16785408) && (Hu = { stylesheets: null, count: 0, unsuspend: _h }, Oy(t), S = Hh(), S !== null)) {
    l.cancelPendingCommit = S(
      ki.bind(
        null,
        l,
        t,
        n,
        a,
        u,
        e,
        f,
        c,
        i,
        m,
        1,
        v,
        o
      )
    ), Ot(l, n, f, !d);
    return;
  }
  ki(
    l,
    t,
    n,
    a,
    u,
    e,
    f,
    c,
    i
  );
}
function wv(l) {
  for (var t = l; ; ) {
    var a = t.tag;
    if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
      for (var u = 0; u < a.length; u++) {
        var e = a[u], n = e.getSnapshot;
        e = e.value;
        try {
          if (!_l(n(), e)) return !1;
        } catch {
          return !1;
        }
      }
    if (a = t.child, t.subtreeFlags & 16384 && a !== null)
      a.return = t, t = a;
    else {
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function Ot(l, t, a, u) {
  t &= ~xc, t &= ~$t, l.suspendedLanes |= t, l.pingedLanes &= ~t, u && (l.warmLanes |= t), u = l.expirationTimes;
  for (var e = t; 0 < e; ) {
    var n = 31 - Ol(e), f = 1 << n;
    u[n] = -1, e &= ~f;
  }
  a !== 0 && Z0(l, a, t);
}
function Sn() {
  return Z & 6 ? !0 : (Wu(0), !1);
}
function Vc() {
  if (N !== null) {
    if (X === 0)
      var l = N.return;
    else
      l = N, et = ea = null, Uc(l), Ra = null, Uu = 0, l = N;
    for (; l !== null; )
      vy(l.alternate, l), l = l.return;
    N = null;
  }
}
function pa(l, t) {
  var a = l.timeoutHandle;
  a !== -1 && (l.timeoutHandle = -1, dh(a)), a = l.cancelPendingCommit, a !== null && (l.cancelPendingCommit = null, a()), Vc(), j = l, N = a = ft(l.current, null), Y = t, X = 0, Ml = null, rt = !1, Ja = Xu(l, t), Zc = !1, Za = Xl = xc = $t = Gt = W = 0, gl = bu = null, pf = !1, t & 8 && (t |= t & 32);
  var u = l.entangledLanes;
  if (u !== 0)
    for (l = l.entanglements, u &= t; 0 < u; ) {
      var e = 31 - Ol(u), n = 1 << e;
      t |= l[e], u &= ~n;
    }
  return dt = t, yn(), a;
}
function qy(l, t) {
  U = null, O.H = pe, t === Ku || t === vn ? (t = Di(), X = 3) : t === Ss ? (t = Di(), X = 4) : X = t === fy ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Ml = t, N === null && (W = 1, Ce(
    l,
    Bl(t, l.current)
  ));
}
function Yy() {
  var l = O.H;
  return O.H = pe, l === null ? pe : l;
}
function Qy() {
  var l = O.A;
  return O.A = Lv, l;
}
function Kf() {
  W = 4, rt || (Y & 4194048) !== Y && Zl.current !== null || (Ja = !0), !(Gt & 134217727) && !($t & 134217727) || j === null || Ot(
    j,
    Y,
    Xl,
    !1
  );
}
function Fn(l, t, a) {
  var u = Z;
  Z |= 2;
  var e = Yy(), n = Qy();
  (j !== l || Y !== t) && (we = null, pa(l, t)), t = !1;
  var f = W;
  l: do
    try {
      if (X !== 0 && N !== null) {
        var c = N, i = Ml;
        switch (X) {
          case 8:
            Vc(), f = 6;
            break l;
          case 3:
          case 2:
          case 9:
          case 6:
            Zl.current === null && (t = !0);
            var d = X;
            if (X = 0, Ml = null, Ma(l, c, i, d), a && Ja) {
              f = 0;
              break l;
            }
            break;
          default:
            d = X, X = 0, Ml = null, Ma(l, c, i, d);
        }
      }
      Wv(), f = W;
      break;
    } catch (m) {
      qy(l, m);
    }
  while (!0);
  return t && l.shellSuspendCounter++, et = ea = null, Z = u, O.H = e, O.A = n, N === null && (j = null, Y = 0, yn()), f;
}
function Wv() {
  for (; N !== null; ) By(N);
}
function $v(l, t) {
  var a = Z;
  Z |= 2;
  var u = Yy(), e = Qy();
  j !== l || Y !== t ? (we = null, Je = wl() + 500, pa(l, t)) : Ja = Xu(
    l,
    t
  );
  l: do
    try {
      if (X !== 0 && N !== null) {
        t = N;
        var n = Ml;
        t: switch (X) {
          case 1:
            X = 0, Ml = null, Ma(l, t, n, 1);
            break;
          case 2:
          case 9:
            if (Oi(n)) {
              X = 0, Ml = null, $i(t);
              break;
            }
            t = function() {
              X !== 2 && X !== 9 || j !== l || (X = 7), kl(l);
            }, n.then(t, t);
            break l;
          case 3:
            X = 7;
            break l;
          case 4:
            X = 5;
            break l;
          case 7:
            Oi(n) ? (X = 0, Ml = null, $i(t)) : (X = 0, Ml = null, Ma(l, t, n, 7));
            break;
          case 5:
            var f = null;
            switch (N.tag) {
              case 26:
                f = N.memoizedState;
              case 5:
              case 27:
                var c = N;
                if (!f || l1(f)) {
                  X = 0, Ml = null;
                  var i = c.sibling;
                  if (i !== null) N = i;
                  else {
                    var d = c.return;
                    d !== null ? (N = d, gn(d)) : N = null;
                  }
                  break t;
                }
            }
            X = 0, Ml = null, Ma(l, t, n, 5);
            break;
          case 6:
            X = 0, Ml = null, Ma(l, t, n, 6);
            break;
          case 8:
            Vc(), W = 6;
            break l;
          default:
            throw Error(b(462));
        }
      }
      kv();
      break;
    } catch (m) {
      qy(l, m);
    }
  while (!0);
  return et = ea = null, O.H = u, O.A = e, Z = a, N !== null ? 0 : (j = null, Y = 0, yn(), W);
}
function kv() {
  for (; N !== null && !bd(); )
    By(N);
}
function By(l) {
  var t = dy(l.alternate, l, dt);
  l.memoizedProps = l.pendingProps, t === null ? gn(l) : N = t;
}
function $i(l) {
  var t = l, a = t.alternate;
  switch (t.tag) {
    case 15:
    case 0:
      t = ji(
        a,
        t,
        t.pendingProps,
        t.type,
        void 0,
        Y
      );
      break;
    case 11:
      t = ji(
        a,
        t,
        t.pendingProps,
        t.type.render,
        t.ref,
        Y
      );
      break;
    case 5:
      Uc(t);
    default:
      vy(a, t), t = N = vs(t, dt), t = dy(a, t, dt);
  }
  l.memoizedProps = l.pendingProps, t === null ? gn(l) : N = t;
}
function Ma(l, t, a, u) {
  et = ea = null, Uc(t), Ra = null, Uu = 0;
  var e = t.return;
  try {
    if (xv(
      l,
      e,
      t,
      a,
      Y
    )) {
      W = 1, Ce(
        l,
        Bl(a, l.current)
      ), N = null;
      return;
    }
  } catch (n) {
    if (e !== null) throw N = e, n;
    W = 1, Ce(
      l,
      Bl(a, l.current)
    ), N = null;
    return;
  }
  t.flags & 32768 ? (B || u === 1 ? l = !0 : Ja || Y & 536870912 ? l = !1 : (rt = l = !0, (u === 2 || u === 9 || u === 3 || u === 6) && (u = Zl.current, u !== null && u.tag === 13 && (u.flags |= 16384))), Gy(t, l)) : gn(t);
}
function gn(l) {
  var t = l;
  do {
    if (t.flags & 32768) {
      Gy(
        t,
        rt
      );
      return;
    }
    l = t.return;
    var a = Vv(
      t.alternate,
      t,
      dt
    );
    if (a !== null) {
      N = a;
      return;
    }
    if (t = t.sibling, t !== null) {
      N = t;
      return;
    }
    N = t = l;
  } while (t !== null);
  W === 0 && (W = 5);
}
function Gy(l, t) {
  do {
    var a = jv(l.alternate, l);
    if (a !== null) {
      a.flags &= 32767, N = a;
      return;
    }
    if (a = l.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (l = l.sibling, l !== null)) {
      N = l;
      return;
    }
    N = l = a;
  } while (l !== null);
  W = 6, N = null;
}
function ki(l, t, a, u, e, n, f, c, i) {
  l.cancelPendingCommit = null;
  do
    bn();
  while (yl !== 0);
  if (Z & 6) throw Error(b(327));
  if (t !== null) {
    if (t === l.current) throw Error(b(177));
    if (n = t.lanes | t.childLanes, n |= oc, _d(
      l,
      a,
      n,
      f,
      c,
      i
    ), l === j && (N = j = null, Y = 0), xa = t, Ht = l, Ha = a, Vf = n, jf = e, Ry = u, t.subtreeFlags & 10256 || t.flags & 10256 ? (l.callbackNode = null, l.callbackPriority = 0, lh(He, function() {
      return Vy(), null;
    })) : (l.callbackNode = null, l.callbackPriority = 0), u = (t.flags & 13878) !== 0, t.subtreeFlags & 13878 || u) {
      u = O.T, O.T = null, e = G.p, G.p = 2, f = Z, Z |= 4;
      try {
        Cv(l, t, a);
      } finally {
        Z = f, G.p = e, O.T = u;
      }
    }
    yl = 1, Xy(), Zy(), xy();
  }
}
function Xy() {
  if (yl === 1) {
    yl = 0;
    var l = Ht, t = xa, a = (t.flags & 13878) !== 0;
    if (t.subtreeFlags & 13878 || a) {
      a = O.T, O.T = null;
      var u = G.p;
      G.p = 2;
      var e = Z;
      Z |= 4;
      try {
        My(t, l);
        var n = Wf, f = es(l.containerInfo), c = n.focusedElem, i = n.selectionRange;
        if (f !== c && c && c.ownerDocument && us(
          c.ownerDocument.documentElement,
          c
        )) {
          if (i !== null && hc(c)) {
            var d = i.start, m = i.end;
            if (m === void 0 && (m = d), "selectionStart" in c)
              c.selectionStart = d, c.selectionEnd = Math.min(
                m,
                c.value.length
              );
            else {
              var S = c.ownerDocument || document, v = S && S.defaultView || window;
              if (v.getSelection) {
                var o = v.getSelection(), E = c.textContent.length, M = Math.min(i.start, E), Q = i.end === void 0 ? M : Math.min(i.end, E);
                !o.extend && M > Q && (f = Q, Q = M, M = f);
                var y = gi(
                  c,
                  M
                ), s = gi(
                  c,
                  Q
                );
                if (y && s && (o.rangeCount !== 1 || o.anchorNode !== y.node || o.anchorOffset !== y.offset || o.focusNode !== s.node || o.focusOffset !== s.offset)) {
                  var h = S.createRange();
                  h.setStart(y.node, y.offset), o.removeAllRanges(), M > Q ? (o.addRange(h), o.extend(s.node, s.offset)) : (h.setEnd(s.node, s.offset), o.addRange(h));
                }
              }
            }
          }
          for (S = [], o = c; o = o.parentNode; )
            o.nodeType === 1 && S.push({
              element: o,
              left: o.scrollLeft,
              top: o.scrollTop
            });
          for (typeof c.focus == "function" && c.focus(), c = 0; c < S.length; c++) {
            var g = S[c];
            g.element.scrollLeft = g.left, g.element.scrollTop = g.top;
          }
        }
        tn = !!wf, Wf = wf = null;
      } finally {
        Z = e, G.p = u, O.T = a;
      }
    }
    l.current = t, yl = 2;
  }
}
function Zy() {
  if (yl === 2) {
    yl = 0;
    var l = Ht, t = xa, a = (t.flags & 8772) !== 0;
    if (t.subtreeFlags & 8772 || a) {
      a = O.T, O.T = null;
      var u = G.p;
      G.p = 2;
      var e = Z;
      Z |= 4;
      try {
        by(l, t.alternate, t);
      } finally {
        Z = e, G.p = u, O.T = a;
      }
    }
    yl = 3;
  }
}
function xy() {
  if (yl === 4 || yl === 3) {
    yl = 0, zd();
    var l = Ht, t = xa, a = Ha, u = Ry;
    t.subtreeFlags & 10256 || t.flags & 10256 ? yl = 5 : (yl = 0, xa = Ht = null, py(l, l.pendingLanes));
    var e = l.pendingLanes;
    if (e === 0 && (Rt = null), fc(a), t = t.stateNode, rl && typeof rl.onCommitFiberRoot == "function")
      try {
        rl.onCommitFiberRoot(
          Gu,
          t,
          void 0,
          (t.current.flags & 128) === 128
        );
      } catch {
      }
    if (u !== null) {
      t = O.T, e = G.p, G.p = 2, O.T = null;
      try {
        for (var n = l.onRecoverableError, f = 0; f < u.length; f++) {
          var c = u[f];
          n(c.value, {
            componentStack: c.stack
          });
        }
      } finally {
        O.T = t, G.p = e;
      }
    }
    Ha & 3 && bn(), kl(l), e = l.pendingLanes, a & 4194090 && e & 42 ? l === Cf ? zu++ : (zu = 0, Cf = l) : zu = 0, Wu(0);
  }
}
function py(l, t) {
  (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Cu(t)));
}
function bn(l) {
  return Xy(), Zy(), xy(), Vy();
}
function Vy() {
  if (yl !== 5) return !1;
  var l = Ht, t = Vf;
  Vf = 0;
  var a = fc(Ha), u = O.T, e = G.p;
  try {
    G.p = 32 > a ? 32 : a, O.T = null, a = jf, jf = null;
    var n = Ht, f = Ha;
    if (yl = 0, xa = Ht = null, Ha = 0, Z & 6) throw Error(b(331));
    var c = Z;
    if (Z |= 4, Uy(n.current), ry(
      n,
      n.current,
      f,
      a
    ), Z = c, Wu(0, !1), rl && typeof rl.onPostCommitFiberRoot == "function")
      try {
        rl.onPostCommitFiberRoot(Gu, n);
      } catch {
      }
    return !0;
  } finally {
    G.p = e, O.T = u, py(l, t);
  }
}
function Fi(l, t, a) {
  t = Bl(a, t), t = Gf(l.stateNode, t, 2), l = _t(l, t, 2), l !== null && (Zu(l, 2), kl(l));
}
function V(l, t, a) {
  if (l.tag === 3)
    Fi(l, l, a);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Fi(
          t,
          l,
          a
        );
        break;
      } else if (t.tag === 1) {
        var u = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof u.componentDidCatch == "function" && (Rt === null || !Rt.has(u))) {
          l = Bl(a, l), a = ey(2), u = _t(t, a, 2), u !== null && (ny(
            a,
            u,
            t,
            l
          ), Zu(u, 2), kl(u));
          break;
        }
      }
      t = t.return;
    }
}
function In(l, t, a) {
  var u = l.pingCache;
  if (u === null) {
    u = l.pingCache = new Jv();
    var e = /* @__PURE__ */ new Set();
    u.set(t, e);
  } else
    e = u.get(t), e === void 0 && (e = /* @__PURE__ */ new Set(), u.set(t, e));
  e.has(a) || (Zc = !0, e.add(a), l = Fv.bind(null, l, t, a), t.then(l, l));
}
function Fv(l, t, a) {
  var u = l.pingCache;
  u !== null && u.delete(t), l.pingedLanes |= l.suspendedLanes & a, l.warmLanes &= ~a, j === l && (Y & a) === a && (W === 4 || W === 3 && (Y & 62914560) === Y && 300 > wl() - pc ? !(Z & 2) && pa(l, 0) : xc |= a, Za === Y && (Za = 0)), kl(l);
}
function jy(l, t) {
  t === 0 && (t = X0()), l = La(l, t), l !== null && (Zu(l, t), kl(l));
}
function Iv(l) {
  var t = l.memoizedState, a = 0;
  t !== null && (a = t.retryLane), jy(l, a);
}
function Pv(l, t) {
  var a = 0;
  switch (l.tag) {
    case 13:
      var u = l.stateNode, e = l.memoizedState;
      e !== null && (a = e.retryLane);
      break;
    case 19:
      u = l.stateNode;
      break;
    case 22:
      u = l.stateNode._retryCache;
      break;
    default:
      throw Error(b(314));
  }
  u !== null && u.delete(t), jy(l, a);
}
function lh(l, t) {
  return ec(l, t);
}
var We = null, sa = null, Lf = !1, $e = !1, Pn = !1, kt = 0;
function kl(l) {
  l !== sa && l.next === null && (sa === null ? We = sa = l : sa = sa.next = l), $e = !0, Lf || (Lf = !0, ah());
}
function Wu(l, t) {
  if (!Pn && $e) {
    Pn = !0;
    do
      for (var a = !1, u = We; u !== null; ) {
        if (l !== 0) {
          var e = u.pendingLanes;
          if (e === 0) var n = 0;
          else {
            var f = u.suspendedLanes, c = u.pingedLanes;
            n = (1 << 31 - Ol(42 | l) + 1) - 1, n &= e & ~(f & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
          }
          n !== 0 && (a = !0, Ii(u, n));
        } else
          n = Y, n = nn(
            u,
            u === j ? n : 0,
            u.cancelPendingCommit !== null || u.timeoutHandle !== -1
          ), !(n & 3) || Xu(u, n) || (a = !0, Ii(u, n));
        u = u.next;
      }
    while (a);
    Pn = !1;
  }
}
function th() {
  Cy();
}
function Cy() {
  $e = Lf = !1;
  var l = 0;
  kt !== 0 && (yh() && (l = kt), kt = 0);
  for (var t = wl(), a = null, u = We; u !== null; ) {
    var e = u.next, n = Ky(u, t);
    n === 0 ? (u.next = null, a === null ? We = e : a.next = e, e === null && (sa = a)) : (a = u, (l !== 0 || n & 3) && ($e = !0)), u = e;
  }
  Wu(l);
}
function Ky(l, t) {
  for (var a = l.suspendedLanes, u = l.pingedLanes, e = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
    var f = 31 - Ol(n), c = 1 << f, i = e[f];
    i === -1 ? (!(c & a) || c & u) && (e[f] = Ud(c, t)) : i <= t && (l.expiredLanes |= c), n &= ~c;
  }
  if (t = j, a = Y, a = nn(
    l,
    l === t ? a : 0,
    l.cancelPendingCommit !== null || l.timeoutHandle !== -1
  ), u = l.callbackNode, a === 0 || l === t && (X === 2 || X === 9) || l.cancelPendingCommit !== null)
    return u !== null && u !== null && On(u), l.callbackNode = null, l.callbackPriority = 0;
  if (!(a & 3) || Xu(l, a)) {
    if (t = a & -a, t === l.callbackPriority) return t;
    switch (u !== null && On(u), fc(a)) {
      case 2:
      case 8:
        a = Q0;
        break;
      case 32:
        a = He;
        break;
      case 268435456:
        a = B0;
        break;
      default:
        a = He;
    }
    return u = Ly.bind(null, l), a = ec(a, u), l.callbackPriority = t, l.callbackNode = a, t;
  }
  return u !== null && u !== null && On(u), l.callbackPriority = 2, l.callbackNode = null, 2;
}
function Ly(l, t) {
  if (yl !== 0 && yl !== 5)
    return l.callbackNode = null, l.callbackPriority = 0, null;
  var a = l.callbackNode;
  if (bn() && l.callbackNode !== a)
    return null;
  var u = Y;
  return u = nn(
    l,
    l === j ? u : 0,
    l.cancelPendingCommit !== null || l.timeoutHandle !== -1
  ), u === 0 ? null : (Ny(l, u, t), Ky(l, wl()), l.callbackNode != null && l.callbackNode === a ? Ly.bind(null, l) : null);
}
function Ii(l, t) {
  if (bn()) return null;
  Ny(l, t, !0);
}
function ah() {
  vh(function() {
    Z & 6 ? ec(
      Y0,
      th
    ) : Cy();
  });
}
function jc() {
  return kt === 0 && (kt = G0()), kt;
}
function Pi(l) {
  return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : me("" + l);
}
function l0(l, t) {
  var a = t.ownerDocument.createElement("input");
  return a.name = t.name, a.value = t.value, l.id && a.setAttribute("form", l.id), t.parentNode.insertBefore(a, t), l = new FormData(l), a.parentNode.removeChild(a), l;
}
function uh(l, t, a, u, e) {
  if (t === "submit" && a && a.stateNode === e) {
    var n = Pi(
      (e[bl] || null).action
    ), f = u.submitter;
    f && (t = (t = f[bl] || null) ? Pi(t.formAction) : f.getAttribute("formAction"), t !== null && (n = t, f = null));
    var c = new fn(
      "action",
      "action",
      null,
      u,
      e
    );
    l.push({
      event: c,
      listeners: [
        {
          instance: null,
          listener: function() {
            if (u.defaultPrevented) {
              if (kt !== 0) {
                var i = f ? l0(e, f) : new FormData(e);
                Qf(
                  a,
                  {
                    pending: !0,
                    data: i,
                    method: e.method,
                    action: n
                  },
                  null,
                  i
                );
              }
            } else
              typeof n == "function" && (c.preventDefault(), i = f ? l0(e, f) : new FormData(e), Qf(
                a,
                {
                  pending: !0,
                  data: i,
                  method: e.method,
                  action: n
                },
                n,
                i
              ));
          },
          currentTarget: e
        }
      ]
    });
  }
}
for (var lf = 0; lf < Mf.length; lf++) {
  var tf = Mf[lf], eh = tf.toLowerCase(), nh = tf[0].toUpperCase() + tf.slice(1);
  jl(
    eh,
    "on" + nh
  );
}
jl(fs, "onAnimationEnd");
jl(cs, "onAnimationIteration");
jl(is, "onAnimationStart");
jl("dblclick", "onDoubleClick");
jl("focusin", "onFocus");
jl("focusout", "onBlur");
jl(Mv, "onTransitionRun");
jl(Ev, "onTransitionStart");
jl(rv, "onTransitionCancel");
jl(ss, "onTransitionEnd");
qa("onMouseEnter", ["mouseout", "mouseover"]);
qa("onMouseLeave", ["mouseout", "mouseover"]);
qa("onPointerEnter", ["pointerout", "pointerover"]);
qa("onPointerLeave", ["pointerout", "pointerover"]);
ta(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
ta(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
ta("onBeforeInput", [
  "compositionend",
  "keypress",
  "textInput",
  "paste"
]);
ta(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
ta(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
ta(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var _u = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
  " "
), fh = new Set(
  "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(_u)
);
function Jy(l, t) {
  t = (t & 4) !== 0;
  for (var a = 0; a < l.length; a++) {
    var u = l[a], e = u.event;
    u = u.listeners;
    l: {
      var n = void 0;
      if (t)
        for (var f = u.length - 1; 0 <= f; f--) {
          var c = u[f], i = c.instance, d = c.currentTarget;
          if (c = c.listener, i !== n && e.isPropagationStopped())
            break l;
          n = c, e.currentTarget = d;
          try {
            n(e);
          } catch (m) {
            je(m);
          }
          e.currentTarget = null, n = i;
        }
      else
        for (f = 0; f < u.length; f++) {
          if (c = u[f], i = c.instance, d = c.currentTarget, c = c.listener, i !== n && e.isPropagationStopped())
            break l;
          n = c, e.currentTarget = d;
          try {
            n(e);
          } catch (m) {
            je(m);
          }
          e.currentTarget = null, n = i;
        }
    }
  }
}
function H(l, t) {
  var a = t[mf];
  a === void 0 && (a = t[mf] = /* @__PURE__ */ new Set());
  var u = l + "__bubble";
  a.has(u) || (wy(t, l, 2, !1), a.add(u));
}
function af(l, t, a) {
  var u = 0;
  t && (u |= 4), wy(
    a,
    l,
    u,
    t
  );
}
var ye = "_reactListening" + Math.random().toString(36).slice(2);
function Cc(l) {
  if (!l[ye]) {
    l[ye] = !0, V0.forEach(function(a) {
      a !== "selectionchange" && (fh.has(a) || af(a, !1, l), af(a, !0, l));
    });
    var t = l.nodeType === 9 ? l : l.ownerDocument;
    t === null || t[ye] || (t[ye] = !0, af("selectionchange", !1, t));
  }
}
function wy(l, t, a, u) {
  switch (n1(t)) {
    case 2:
      var e = Yh;
      break;
    case 8:
      e = Qh;
      break;
    default:
      e = wc;
  }
  a = e.bind(
    null,
    t,
    a,
    l
  ), e = void 0, !zf || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (e = !0), u ? e !== void 0 ? l.addEventListener(t, a, {
    capture: !0,
    passive: e
  }) : l.addEventListener(t, a, !0) : e !== void 0 ? l.addEventListener(t, a, {
    passive: e
  }) : l.addEventListener(t, a, !1);
}
function uf(l, t, a, u, e) {
  var n = u;
  if (!(t & 1) && !(t & 2) && u !== null)
    l: for (; ; ) {
      if (u === null) return;
      var f = u.tag;
      if (f === 3 || f === 4) {
        var c = u.stateNode.containerInfo;
        if (c === e) break;
        if (f === 4)
          for (f = u.return; f !== null; ) {
            var i = f.tag;
            if ((i === 3 || i === 4) && f.stateNode.containerInfo === e)
              return;
            f = f.return;
          }
        for (; c !== null; ) {
          if (f = ha(c), f === null) return;
          if (i = f.tag, i === 5 || i === 6 || i === 26 || i === 27) {
            u = n = f;
            continue l;
          }
          c = c.parentNode;
        }
      }
      u = u.return;
    }
  $0(function() {
    var d = n, m = sc(a), S = [];
    l: {
      var v = ys.get(l);
      if (v !== void 0) {
        var o = fn, E = l;
        switch (l) {
          case "keypress":
            if (ge(a) === 0) break l;
          case "keydown":
          case "keyup":
            o = lv;
            break;
          case "focusin":
            E = "focus", o = Yn;
            break;
          case "focusout":
            E = "blur", o = Yn;
            break;
          case "beforeblur":
          case "afterblur":
            o = Yn;
            break;
          case "click":
            if (a.button === 2) break l;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            o = ci;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            o = jd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            o = uv;
            break;
          case fs:
          case cs:
          case is:
            o = Ld;
            break;
          case ss:
            o = nv;
            break;
          case "scroll":
          case "scrollend":
            o = pd;
            break;
          case "wheel":
            o = cv;
            break;
          case "copy":
          case "cut":
          case "paste":
            o = wd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            o = si;
            break;
          case "toggle":
          case "beforetoggle":
            o = sv;
        }
        var M = (t & 4) !== 0, Q = !M && (l === "scroll" || l === "scrollend"), y = M ? v !== null ? v + "Capture" : null : v;
        M = [];
        for (var s = d, h; s !== null; ) {
          var g = s;
          if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || y === null || (g = Mu(s, y), g != null && M.push(
            Ru(s, g, h)
          )), Q) break;
          s = s.return;
        }
        0 < M.length && (v = new o(
          v,
          E,
          null,
          a,
          m
        ), S.push({ event: v, listeners: M }));
      }
    }
    if (!(t & 7)) {
      l: {
        if (v = l === "mouseover" || l === "pointerover", o = l === "mouseout" || l === "pointerout", v && a !== bf && (E = a.relatedTarget || a.fromElement) && (ha(E) || E[Ca]))
          break l;
        if ((o || v) && (v = m.window === m ? m : (v = m.ownerDocument) ? v.defaultView || v.parentWindow : window, o ? (E = a.relatedTarget || a.toElement, o = d, E = E ? ha(E) : null, E !== null && (Q = Bu(E), M = E.tag, E !== Q || M !== 5 && M !== 27 && M !== 6) && (E = null)) : (o = null, E = d), o !== E)) {
          if (M = ci, g = "onMouseLeave", y = "onMouseEnter", s = "mouse", (l === "pointerout" || l === "pointerover") && (M = si, g = "onPointerLeave", y = "onPointerEnter", s = "pointer"), Q = o == null ? v : nu(o), h = E == null ? v : nu(E), v = new M(
            g,
            s + "leave",
            o,
            a,
            m
          ), v.target = Q, v.relatedTarget = h, g = null, ha(m) === d && (M = new M(
            y,
            s + "enter",
            E,
            a,
            m
          ), M.target = h, M.relatedTarget = Q, g = M), Q = g, o && E)
            t: {
              for (M = o, y = E, s = 0, h = M; h; h = fa(h))
                s++;
              for (h = 0, g = y; g; g = fa(g))
                h++;
              for (; 0 < s - h; )
                M = fa(M), s--;
              for (; 0 < h - s; )
                y = fa(y), h--;
              for (; s--; ) {
                if (M === y || y !== null && M === y.alternate)
                  break t;
                M = fa(M), y = fa(y);
              }
              M = null;
            }
          else M = null;
          o !== null && t0(
            S,
            v,
            o,
            M,
            !1
          ), E !== null && Q !== null && t0(
            S,
            Q,
            E,
            M,
            !0
          );
        }
      }
      l: {
        if (v = d ? nu(d) : window, o = v.nodeName && v.nodeName.toLowerCase(), o === "select" || o === "input" && v.type === "file")
          var z = hi;
        else if (vi(v))
          if (ts)
            z = zv;
          else {
            z = gv;
            var D = Sv;
          }
        else
          o = v.nodeName, !o || o.toLowerCase() !== "input" || v.type !== "checkbox" && v.type !== "radio" ? d && ic(d.elementType) && (z = hi) : z = bv;
        if (z && (z = z(l, d))) {
          ls(
            S,
            z,
            a,
            m
          );
          break l;
        }
        D && D(l, v, d), l === "focusout" && d && v.type === "number" && d.memoizedProps.value != null && gf(v, "number", v.value);
      }
      switch (D = d ? nu(d) : window, l) {
        case "focusin":
          (vi(D) || D.contentEditable === "true") && (Sa = D, Tf = d, su = null);
          break;
        case "focusout":
          su = Tf = Sa = null;
          break;
        case "mousedown":
          Af = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Af = !1, bi(S, a, m);
          break;
        case "selectionchange":
          if (Av) break;
        case "keydown":
        case "keyup":
          bi(S, a, m);
      }
      var A;
      if (vc)
        l: {
          switch (l) {
            case "compositionstart":
              var r = "onCompositionStart";
              break l;
            case "compositionend":
              r = "onCompositionEnd";
              break l;
            case "compositionupdate":
              r = "onCompositionUpdate";
              break l;
          }
          r = void 0;
        }
      else
        ma ? I0(l, a) && (r = "onCompositionEnd") : l === "keydown" && a.keyCode === 229 && (r = "onCompositionStart");
      r && (F0 && a.locale !== "ko" && (ma || r !== "onCompositionStart" ? r === "onCompositionEnd" && ma && (A = k0()) : (Et = m, yc = "value" in Et ? Et.value : Et.textContent, ma = !0)), D = ke(d, r), 0 < D.length && (r = new ii(
        r,
        l,
        null,
        a,
        m
      ), S.push({ event: r, listeners: D }), A ? r.data = A : (A = P0(a), A !== null && (r.data = A)))), (A = dv ? vv(l, a) : hv(l, a)) && (r = ke(d, "onBeforeInput"), 0 < r.length && (D = new ii(
        "onBeforeInput",
        "beforeinput",
        null,
        a,
        m
      ), S.push({
        event: D,
        listeners: r
      }), D.data = A)), uh(
        S,
        l,
        d,
        a,
        m
      );
    }
    Jy(S, t);
  });
}
function Ru(l, t, a) {
  return {
    instance: l,
    listener: t,
    currentTarget: a
  };
}
function ke(l, t) {
  for (var a = t + "Capture", u = []; l !== null; ) {
    var e = l, n = e.stateNode;
    if (e = e.tag, e !== 5 && e !== 26 && e !== 27 || n === null || (e = Mu(l, a), e != null && u.unshift(
      Ru(l, e, n)
    ), e = Mu(l, t), e != null && u.push(
      Ru(l, e, n)
    )), l.tag === 3) return u;
    l = l.return;
  }
  return [];
}
function fa(l) {
  if (l === null) return null;
  do
    l = l.return;
  while (l && l.tag !== 5 && l.tag !== 27);
  return l || null;
}
function t0(l, t, a, u, e) {
  for (var n = t._reactName, f = []; a !== null && a !== u; ) {
    var c = a, i = c.alternate, d = c.stateNode;
    if (c = c.tag, i !== null && i === u) break;
    c !== 5 && c !== 26 && c !== 27 || d === null || (i = d, e ? (d = Mu(a, n), d != null && f.unshift(
      Ru(a, d, i)
    )) : e || (d = Mu(a, n), d != null && f.push(
      Ru(a, d, i)
    ))), a = a.return;
  }
  f.length !== 0 && l.push({ event: t, listeners: f });
}
var ch = /\r\n?/g, ih = /\u0000|\uFFFD/g;
function a0(l) {
  return (typeof l == "string" ? l : "" + l).replace(ch, `
`).replace(ih, "");
}
function Wy(l, t) {
  return t = a0(t), a0(l) === t;
}
function zn() {
}
function x(l, t, a, u, e, n) {
  switch (a) {
    case "children":
      typeof u == "string" ? t === "body" || t === "textarea" && u === "" || Ya(l, u) : (typeof u == "number" || typeof u == "bigint") && t !== "body" && Ya(l, "" + u);
      break;
    case "className":
      ue(l, "class", u);
      break;
    case "tabIndex":
      ue(l, "tabindex", u);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      ue(l, a, u);
      break;
    case "style":
      W0(l, u, n);
      break;
    case "data":
      if (t !== "object") {
        ue(l, "data", u);
        break;
      }
    case "src":
    case "href":
      if (u === "" && (t !== "a" || a !== "href")) {
        l.removeAttribute(a);
        break;
      }
      if (u == null || typeof u == "function" || typeof u == "symbol" || typeof u == "boolean") {
        l.removeAttribute(a);
        break;
      }
      u = me("" + u), l.setAttribute(a, u);
      break;
    case "action":
    case "formAction":
      if (typeof u == "function") {
        l.setAttribute(
          a,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
        );
        break;
      } else
        typeof n == "function" && (a === "formAction" ? (t !== "input" && x(l, t, "name", e.name, e, null), x(
          l,
          t,
          "formEncType",
          e.formEncType,
          e,
          null
        ), x(
          l,
          t,
          "formMethod",
          e.formMethod,
          e,
          null
        ), x(
          l,
          t,
          "formTarget",
          e.formTarget,
          e,
          null
        )) : (x(l, t, "encType", e.encType, e, null), x(l, t, "method", e.method, e, null), x(l, t, "target", e.target, e, null)));
      if (u == null || typeof u == "symbol" || typeof u == "boolean") {
        l.removeAttribute(a);
        break;
      }
      u = me("" + u), l.setAttribute(a, u);
      break;
    case "onClick":
      u != null && (l.onclick = zn);
      break;
    case "onScroll":
      u != null && H("scroll", l);
      break;
    case "onScrollEnd":
      u != null && H("scrollend", l);
      break;
    case "dangerouslySetInnerHTML":
      if (u != null) {
        if (typeof u != "object" || !("__html" in u))
          throw Error(b(61));
        if (a = u.__html, a != null) {
          if (e.children != null) throw Error(b(60));
          l.innerHTML = a;
        }
      }
      break;
    case "multiple":
      l.multiple = u && typeof u != "function" && typeof u != "symbol";
      break;
    case "muted":
      l.muted = u && typeof u != "function" && typeof u != "symbol";
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
        l.removeAttribute("xlink:href");
        break;
      }
      a = me("" + u), l.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        a
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
      u != null && typeof u != "function" && typeof u != "symbol" ? l.setAttribute(a, "" + u) : l.removeAttribute(a);
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
      u && typeof u != "function" && typeof u != "symbol" ? l.setAttribute(a, "") : l.removeAttribute(a);
      break;
    case "capture":
    case "download":
      u === !0 ? l.setAttribute(a, "") : u !== !1 && u != null && typeof u != "function" && typeof u != "symbol" ? l.setAttribute(a, u) : l.removeAttribute(a);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      u != null && typeof u != "function" && typeof u != "symbol" && !isNaN(u) && 1 <= u ? l.setAttribute(a, u) : l.removeAttribute(a);
      break;
    case "rowSpan":
    case "start":
      u == null || typeof u == "function" || typeof u == "symbol" || isNaN(u) ? l.removeAttribute(a) : l.setAttribute(a, u);
      break;
    case "popover":
      H("beforetoggle", l), H("toggle", l), oe(l, "popover", u);
      break;
    case "xlinkActuate":
      Fl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:actuate",
        u
      );
      break;
    case "xlinkArcrole":
      Fl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:arcrole",
        u
      );
      break;
    case "xlinkRole":
      Fl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:role",
        u
      );
      break;
    case "xlinkShow":
      Fl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:show",
        u
      );
      break;
    case "xlinkTitle":
      Fl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:title",
        u
      );
      break;
    case "xlinkType":
      Fl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:type",
        u
      );
      break;
    case "xmlBase":
      Fl(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:base",
        u
      );
      break;
    case "xmlLang":
      Fl(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:lang",
        u
      );
      break;
    case "xmlSpace":
      Fl(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:space",
        u
      );
      break;
    case "is":
      oe(l, "is", u);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = Zd.get(a) || a, oe(l, a, u));
  }
}
function Jf(l, t, a, u, e, n) {
  switch (a) {
    case "style":
      W0(l, u, n);
      break;
    case "dangerouslySetInnerHTML":
      if (u != null) {
        if (typeof u != "object" || !("__html" in u))
          throw Error(b(61));
        if (a = u.__html, a != null) {
          if (e.children != null) throw Error(b(60));
          l.innerHTML = a;
        }
      }
      break;
    case "children":
      typeof u == "string" ? Ya(l, u) : (typeof u == "number" || typeof u == "bigint") && Ya(l, "" + u);
      break;
    case "onScroll":
      u != null && H("scroll", l);
      break;
    case "onScrollEnd":
      u != null && H("scrollend", l);
      break;
    case "onClick":
      u != null && (l.onclick = zn);
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
      if (!j0.hasOwnProperty(a))
        l: {
          if (a[0] === "o" && a[1] === "n" && (e = a.endsWith("Capture"), t = a.slice(2, e ? a.length - 7 : void 0), n = l[bl] || null, n = n != null ? n[a] : null, typeof n == "function" && l.removeEventListener(t, n, e), typeof u == "function")) {
            typeof n != "function" && n !== null && (a in l ? l[a] = null : l.hasAttribute(a) && l.removeAttribute(a)), l.addEventListener(t, u, e);
            break l;
          }
          a in l ? l[a] = u : u === !0 ? l.setAttribute(a, "") : oe(l, a, u);
        }
  }
}
function dl(l, t, a) {
  switch (t) {
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
      H("error", l), H("load", l);
      var u = !1, e = !1, n;
      for (n in a)
        if (a.hasOwnProperty(n)) {
          var f = a[n];
          if (f != null)
            switch (n) {
              case "src":
                u = !0;
                break;
              case "srcSet":
                e = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(b(137, t));
              default:
                x(l, t, n, f, a, null);
            }
        }
      e && x(l, t, "srcSet", a.srcSet, a, null), u && x(l, t, "src", a.src, a, null);
      return;
    case "input":
      H("invalid", l);
      var c = n = f = e = null, i = null, d = null;
      for (u in a)
        if (a.hasOwnProperty(u)) {
          var m = a[u];
          if (m != null)
            switch (u) {
              case "name":
                e = m;
                break;
              case "type":
                f = m;
                break;
              case "checked":
                i = m;
                break;
              case "defaultChecked":
                d = m;
                break;
              case "value":
                n = m;
                break;
              case "defaultValue":
                c = m;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (m != null)
                  throw Error(b(137, t));
                break;
              default:
                x(l, t, u, m, a, null);
            }
        }
      L0(
        l,
        n,
        c,
        i,
        d,
        f,
        e,
        !1
      ), Ne(l);
      return;
    case "select":
      H("invalid", l), u = f = n = null;
      for (e in a)
        if (a.hasOwnProperty(e) && (c = a[e], c != null))
          switch (e) {
            case "value":
              n = c;
              break;
            case "defaultValue":
              f = c;
              break;
            case "multiple":
              u = c;
            default:
              x(l, t, e, c, a, null);
          }
      t = n, a = f, l.multiple = !!u, t != null ? ra(l, !!u, t, !1) : a != null && ra(l, !!u, a, !0);
      return;
    case "textarea":
      H("invalid", l), n = e = u = null;
      for (f in a)
        if (a.hasOwnProperty(f) && (c = a[f], c != null))
          switch (f) {
            case "value":
              u = c;
              break;
            case "defaultValue":
              e = c;
              break;
            case "children":
              n = c;
              break;
            case "dangerouslySetInnerHTML":
              if (c != null) throw Error(b(91));
              break;
            default:
              x(l, t, f, c, a, null);
          }
      w0(l, u, e, n), Ne(l);
      return;
    case "option":
      for (i in a)
        if (a.hasOwnProperty(i) && (u = a[i], u != null))
          switch (i) {
            case "selected":
              l.selected = u && typeof u != "function" && typeof u != "symbol";
              break;
            default:
              x(l, t, i, u, a, null);
          }
      return;
    case "dialog":
      H("beforetoggle", l), H("toggle", l), H("cancel", l), H("close", l);
      break;
    case "iframe":
    case "object":
      H("load", l);
      break;
    case "video":
    case "audio":
      for (u = 0; u < _u.length; u++)
        H(_u[u], l);
      break;
    case "image":
      H("error", l), H("load", l);
      break;
    case "details":
      H("toggle", l);
      break;
    case "embed":
    case "source":
    case "link":
      H("error", l), H("load", l);
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
      for (d in a)
        if (a.hasOwnProperty(d) && (u = a[d], u != null))
          switch (d) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(b(137, t));
            default:
              x(l, t, d, u, a, null);
          }
      return;
    default:
      if (ic(t)) {
        for (m in a)
          a.hasOwnProperty(m) && (u = a[m], u !== void 0 && Jf(
            l,
            t,
            m,
            u,
            a,
            void 0
          ));
        return;
      }
  }
  for (c in a)
    a.hasOwnProperty(c) && (u = a[c], u != null && x(l, t, c, u, a, null));
}
function sh(l, t, a, u) {
  switch (t) {
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
      var e = null, n = null, f = null, c = null, i = null, d = null, m = null;
      for (o in a) {
        var S = a[o];
        if (a.hasOwnProperty(o) && S != null)
          switch (o) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              i = S;
            default:
              u.hasOwnProperty(o) || x(l, t, o, null, u, S);
          }
      }
      for (var v in u) {
        var o = u[v];
        if (S = a[v], u.hasOwnProperty(v) && (o != null || S != null))
          switch (v) {
            case "type":
              n = o;
              break;
            case "name":
              e = o;
              break;
            case "checked":
              d = o;
              break;
            case "defaultChecked":
              m = o;
              break;
            case "value":
              f = o;
              break;
            case "defaultValue":
              c = o;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (o != null)
                throw Error(b(137, t));
              break;
            default:
              o !== S && x(
                l,
                t,
                v,
                o,
                u,
                S
              );
          }
      }
      Sf(
        l,
        f,
        c,
        i,
        d,
        m,
        n,
        e
      );
      return;
    case "select":
      o = f = c = v = null;
      for (n in a)
        if (i = a[n], a.hasOwnProperty(n) && i != null)
          switch (n) {
            case "value":
              break;
            case "multiple":
              o = i;
            default:
              u.hasOwnProperty(n) || x(
                l,
                t,
                n,
                null,
                u,
                i
              );
          }
      for (e in u)
        if (n = u[e], i = a[e], u.hasOwnProperty(e) && (n != null || i != null))
          switch (e) {
            case "value":
              v = n;
              break;
            case "defaultValue":
              c = n;
              break;
            case "multiple":
              f = n;
            default:
              n !== i && x(
                l,
                t,
                e,
                n,
                u,
                i
              );
          }
      t = c, a = f, u = o, v != null ? ra(l, !!a, v, !1) : !!u != !!a && (t != null ? ra(l, !!a, t, !0) : ra(l, !!a, a ? [] : "", !1));
      return;
    case "textarea":
      o = v = null;
      for (c in a)
        if (e = a[c], a.hasOwnProperty(c) && e != null && !u.hasOwnProperty(c))
          switch (c) {
            case "value":
              break;
            case "children":
              break;
            default:
              x(l, t, c, null, u, e);
          }
      for (f in u)
        if (e = u[f], n = a[f], u.hasOwnProperty(f) && (e != null || n != null))
          switch (f) {
            case "value":
              v = e;
              break;
            case "defaultValue":
              o = e;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (e != null) throw Error(b(91));
              break;
            default:
              e !== n && x(l, t, f, e, u, n);
          }
      J0(l, v, o);
      return;
    case "option":
      for (var E in a)
        if (v = a[E], a.hasOwnProperty(E) && v != null && !u.hasOwnProperty(E))
          switch (E) {
            case "selected":
              l.selected = !1;
              break;
            default:
              x(
                l,
                t,
                E,
                null,
                u,
                v
              );
          }
      for (i in u)
        if (v = u[i], o = a[i], u.hasOwnProperty(i) && v !== o && (v != null || o != null))
          switch (i) {
            case "selected":
              l.selected = v && typeof v != "function" && typeof v != "symbol";
              break;
            default:
              x(
                l,
                t,
                i,
                v,
                u,
                o
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
      for (var M in a)
        v = a[M], a.hasOwnProperty(M) && v != null && !u.hasOwnProperty(M) && x(l, t, M, null, u, v);
      for (d in u)
        if (v = u[d], o = a[d], u.hasOwnProperty(d) && v !== o && (v != null || o != null))
          switch (d) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (v != null)
                throw Error(b(137, t));
              break;
            default:
              x(
                l,
                t,
                d,
                v,
                u,
                o
              );
          }
      return;
    default:
      if (ic(t)) {
        for (var Q in a)
          v = a[Q], a.hasOwnProperty(Q) && v !== void 0 && !u.hasOwnProperty(Q) && Jf(
            l,
            t,
            Q,
            void 0,
            u,
            v
          );
        for (m in u)
          v = u[m], o = a[m], !u.hasOwnProperty(m) || v === o || v === void 0 && o === void 0 || Jf(
            l,
            t,
            m,
            v,
            u,
            o
          );
        return;
      }
  }
  for (var y in a)
    v = a[y], a.hasOwnProperty(y) && v != null && !u.hasOwnProperty(y) && x(l, t, y, null, u, v);
  for (S in u)
    v = u[S], o = a[S], !u.hasOwnProperty(S) || v === o || v == null && o == null || x(l, t, S, v, u, o);
}
var wf = null, Wf = null;
function Fe(l) {
  return l.nodeType === 9 ? l : l.ownerDocument;
}
function u0(l) {
  switch (l) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function $y(l, t) {
  if (l === 0)
    switch (t) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return l === 1 && t === "foreignObject" ? 0 : l;
}
function $f(l, t) {
  return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var ef = null;
function yh() {
  var l = window.event;
  return l && l.type === "popstate" ? l === ef ? !1 : (ef = l, !0) : (ef = null, !1);
}
var ky = typeof setTimeout == "function" ? setTimeout : void 0, dh = typeof clearTimeout == "function" ? clearTimeout : void 0, e0 = typeof Promise == "function" ? Promise : void 0, vh = typeof queueMicrotask == "function" ? queueMicrotask : typeof e0 < "u" ? function(l) {
  return e0.resolve(null).then(l).catch(hh);
} : ky;
function hh(l) {
  setTimeout(function() {
    throw l;
  });
}
function Zt(l) {
  return l === "head";
}
function n0(l, t) {
  var a = t, u = 0, e = 0;
  do {
    var n = a.nextSibling;
    if (l.removeChild(a), n && n.nodeType === 8)
      if (a = n.data, a === "/$") {
        if (0 < u && 8 > u) {
          a = u;
          var f = l.ownerDocument;
          if (a & 1 && Tu(f.documentElement), a & 2 && Tu(f.body), a & 4)
            for (a = f.head, Tu(a), f = a.firstChild; f; ) {
              var c = f.nextSibling, i = f.nodeName;
              f[xu] || i === "SCRIPT" || i === "STYLE" || i === "LINK" && f.rel.toLowerCase() === "stylesheet" || a.removeChild(f), f = c;
            }
        }
        if (e === 0) {
          l.removeChild(n), Qu(t);
          return;
        }
        e--;
      } else
        a === "$" || a === "$?" || a === "$!" ? e++ : u = a.charCodeAt(0) - 48;
    else u = 0;
    a = n;
  } while (a);
  Qu(t);
}
function kf(l) {
  var t = l.firstChild;
  for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
    var a = t;
    switch (t = t.nextSibling, a.nodeName) {
      case "HTML":
      case "HEAD":
      case "BODY":
        kf(a), cc(a);
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (a.rel.toLowerCase() === "stylesheet") continue;
    }
    l.removeChild(a);
  }
}
function oh(l, t, a, u) {
  for (; l.nodeType === 1; ) {
    var e = a;
    if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
      if (!u && (l.nodeName !== "INPUT" || l.type !== "hidden"))
        break;
    } else if (u) {
      if (!l[xu])
        switch (t) {
          case "meta":
            if (!l.hasAttribute("itemprop")) break;
            return l;
          case "link":
            if (n = l.getAttribute("rel"), n === "stylesheet" && l.hasAttribute("data-precedence"))
              break;
            if (n !== e.rel || l.getAttribute("href") !== (e.href == null || e.href === "" ? null : e.href) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin) || l.getAttribute("title") !== (e.title == null ? null : e.title))
              break;
            return l;
          case "style":
            if (l.hasAttribute("data-precedence")) break;
            return l;
          case "script":
            if (n = l.getAttribute("src"), (n !== (e.src == null ? null : e.src) || l.getAttribute("type") !== (e.type == null ? null : e.type) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
              break;
            return l;
          default:
            return l;
        }
    } else if (t === "input" && l.type === "hidden") {
      var n = e.name == null ? null : "" + e.name;
      if (e.type === "hidden" && l.getAttribute("name") === n)
        return l;
    } else return l;
    if (l = Vl(l.nextSibling), l === null) break;
  }
  return null;
}
function mh(l, t, a) {
  if (t === "") return null;
  for (; l.nodeType !== 3; )
    if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !a || (l = Vl(l.nextSibling), l === null)) return null;
  return l;
}
function Ff(l) {
  return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState === "complete";
}
function Sh(l, t) {
  var a = l.ownerDocument;
  if (l.data !== "$?" || a.readyState === "complete")
    t();
  else {
    var u = function() {
      t(), a.removeEventListener("DOMContentLoaded", u);
    };
    a.addEventListener("DOMContentLoaded", u), l._reactRetry = u;
  }
}
function Vl(l) {
  for (; l != null; l = l.nextSibling) {
    var t = l.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        break;
      if (t === "/$") return null;
    }
  }
  return l;
}
var If = null;
function f0(l) {
  l = l.previousSibling;
  for (var t = 0; l; ) {
    if (l.nodeType === 8) {
      var a = l.data;
      if (a === "$" || a === "$!" || a === "$?") {
        if (t === 0) return l;
        t--;
      } else a === "/$" && t++;
    }
    l = l.previousSibling;
  }
  return null;
}
function Fy(l, t, a) {
  switch (t = Fe(a), l) {
    case "html":
      if (l = t.documentElement, !l) throw Error(b(452));
      return l;
    case "head":
      if (l = t.head, !l) throw Error(b(453));
      return l;
    case "body":
      if (l = t.body, !l) throw Error(b(454));
      return l;
    default:
      throw Error(b(451));
  }
}
function Tu(l) {
  for (var t = l.attributes; t.length; )
    l.removeAttributeNode(t[0]);
  cc(l);
}
var xl = /* @__PURE__ */ new Map(), c0 = /* @__PURE__ */ new Set();
function Ie(l) {
  return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
}
var vt = G.d;
G.d = {
  f: gh,
  r: bh,
  D: zh,
  C: Th,
  L: Ah,
  m: Mh,
  X: rh,
  S: Eh,
  M: Oh
};
function gh() {
  var l = vt.f(), t = Sn();
  return l || t;
}
function bh(l) {
  var t = Ka(l);
  t !== null && t.tag === 5 && t.type === "form" ? Ks(t) : vt.r(l);
}
var wa = typeof document > "u" ? null : document;
function Iy(l, t, a) {
  var u = wa;
  if (u && typeof t == "string" && t) {
    var e = Ql(t);
    e = 'link[rel="' + l + '"][href="' + e + '"]', typeof a == "string" && (e += '[crossorigin="' + a + '"]'), c0.has(e) || (c0.add(e), l = { rel: l, crossOrigin: a, href: t }, u.querySelector(e) === null && (t = u.createElement("link"), dl(t, "link", l), fl(t), u.head.appendChild(t)));
  }
}
function zh(l) {
  vt.D(l), Iy("dns-prefetch", l, null);
}
function Th(l, t) {
  vt.C(l, t), Iy("preconnect", l, t);
}
function Ah(l, t, a) {
  vt.L(l, t, a);
  var u = wa;
  if (u && l && t) {
    var e = 'link[rel="preload"][as="' + Ql(t) + '"]';
    t === "image" && a && a.imageSrcSet ? (e += '[imagesrcset="' + Ql(
      a.imageSrcSet
    ) + '"]', typeof a.imageSizes == "string" && (e += '[imagesizes="' + Ql(
      a.imageSizes
    ) + '"]')) : e += '[href="' + Ql(l) + '"]';
    var n = e;
    switch (t) {
      case "style":
        n = Va(l);
        break;
      case "script":
        n = Wa(l);
    }
    xl.has(n) || (l = C(
      {
        rel: "preload",
        href: t === "image" && a && a.imageSrcSet ? void 0 : l,
        as: t
      },
      a
    ), xl.set(n, l), u.querySelector(e) !== null || t === "style" && u.querySelector($u(n)) || t === "script" && u.querySelector(ku(n)) || (t = u.createElement("link"), dl(t, "link", l), fl(t), u.head.appendChild(t)));
  }
}
function Mh(l, t) {
  vt.m(l, t);
  var a = wa;
  if (a && l) {
    var u = t && typeof t.as == "string" ? t.as : "script", e = 'link[rel="modulepreload"][as="' + Ql(u) + '"][href="' + Ql(l) + '"]', n = e;
    switch (u) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        n = Wa(l);
    }
    if (!xl.has(n) && (l = C({ rel: "modulepreload", href: l }, t), xl.set(n, l), a.querySelector(e) === null)) {
      switch (u) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (a.querySelector(ku(n)))
            return;
      }
      u = a.createElement("link"), dl(u, "link", l), fl(u), a.head.appendChild(u);
    }
  }
}
function Eh(l, t, a) {
  vt.S(l, t, a);
  var u = wa;
  if (u && l) {
    var e = Ea(u).hoistableStyles, n = Va(l);
    t = t || "default";
    var f = e.get(n);
    if (!f) {
      var c = { loading: 0, preload: null };
      if (f = u.querySelector(
        $u(n)
      ))
        c.loading = 5;
      else {
        l = C(
          { rel: "stylesheet", href: l, "data-precedence": t },
          a
        ), (a = xl.get(n)) && Kc(l, a);
        var i = f = u.createElement("link");
        fl(i), dl(i, "link", l), i._p = new Promise(function(d, m) {
          i.onload = d, i.onerror = m;
        }), i.addEventListener("load", function() {
          c.loading |= 1;
        }), i.addEventListener("error", function() {
          c.loading |= 2;
        }), c.loading |= 4, re(f, t, u);
      }
      f = {
        type: "stylesheet",
        instance: f,
        count: 1,
        state: c
      }, e.set(n, f);
    }
  }
}
function rh(l, t) {
  vt.X(l, t);
  var a = wa;
  if (a && l) {
    var u = Ea(a).hoistableScripts, e = Wa(l), n = u.get(e);
    n || (n = a.querySelector(ku(e)), n || (l = C({ src: l, async: !0 }, t), (t = xl.get(e)) && Lc(l, t), n = a.createElement("script"), fl(n), dl(n, "link", l), a.head.appendChild(n)), n = {
      type: "script",
      instance: n,
      count: 1,
      state: null
    }, u.set(e, n));
  }
}
function Oh(l, t) {
  vt.M(l, t);
  var a = wa;
  if (a && l) {
    var u = Ea(a).hoistableScripts, e = Wa(l), n = u.get(e);
    n || (n = a.querySelector(ku(e)), n || (l = C({ src: l, async: !0, type: "module" }, t), (t = xl.get(e)) && Lc(l, t), n = a.createElement("script"), fl(n), dl(n, "link", l), a.head.appendChild(n)), n = {
      type: "script",
      instance: n,
      count: 1,
      state: null
    }, u.set(e, n));
  }
}
function i0(l, t, a, u) {
  var e = (e = Dt.current) ? Ie(e) : null;
  if (!e) throw Error(b(446));
  switch (l) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof a.precedence == "string" && typeof a.href == "string" ? (t = Va(a.href), a = Ea(
        e
      ).hoistableStyles, u = a.get(t), u || (u = {
        type: "style",
        instance: null,
        count: 0,
        state: null
      }, a.set(t, u)), u) : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
        l = Va(a.href);
        var n = Ea(
          e
        ).hoistableStyles, f = n.get(l);
        if (f || (e = e.ownerDocument || e, f = {
          type: "stylesheet",
          instance: null,
          count: 0,
          state: { loading: 0, preload: null }
        }, n.set(l, f), (n = e.querySelector(
          $u(l)
        )) && !n._p && (f.instance = n, f.state.loading = 5), xl.has(l) || (a = {
          rel: "preload",
          as: "style",
          href: a.href,
          crossOrigin: a.crossOrigin,
          integrity: a.integrity,
          media: a.media,
          hrefLang: a.hrefLang,
          referrerPolicy: a.referrerPolicy
        }, xl.set(l, a), n || Dh(
          e,
          l,
          a,
          f.state
        ))), t && u === null)
          throw Error(b(528, ""));
        return f;
      }
      if (t && u !== null)
        throw Error(b(529, ""));
      return null;
    case "script":
      return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Wa(a), a = Ea(
        e
      ).hoistableScripts, u = a.get(t), u || (u = {
        type: "script",
        instance: null,
        count: 0,
        state: null
      }, a.set(t, u)), u) : { type: "void", instance: null, count: 0, state: null };
    default:
      throw Error(b(444, l));
  }
}
function Va(l) {
  return 'href="' + Ql(l) + '"';
}
function $u(l) {
  return 'link[rel="stylesheet"][' + l + "]";
}
function Py(l) {
  return C({}, l, {
    "data-precedence": l.precedence,
    precedence: null
  });
}
function Dh(l, t, a, u) {
  l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? u.loading = 1 : (t = l.createElement("link"), u.preload = t, t.addEventListener("load", function() {
    return u.loading |= 1;
  }), t.addEventListener("error", function() {
    return u.loading |= 2;
  }), dl(t, "link", a), fl(t), l.head.appendChild(t));
}
function Wa(l) {
  return '[src="' + Ql(l) + '"]';
}
function ku(l) {
  return "script[async]" + l;
}
function s0(l, t, a) {
  if (t.count++, t.instance === null)
    switch (t.type) {
      case "style":
        var u = l.querySelector(
          'style[data-href~="' + Ql(a.href) + '"]'
        );
        if (u)
          return t.instance = u, fl(u), u;
        var e = C({}, a, {
          "data-href": a.href,
          "data-precedence": a.precedence,
          href: null,
          precedence: null
        });
        return u = (l.ownerDocument || l).createElement(
          "style"
        ), fl(u), dl(u, "style", e), re(u, a.precedence, l), t.instance = u;
      case "stylesheet":
        e = Va(a.href);
        var n = l.querySelector(
          $u(e)
        );
        if (n)
          return t.state.loading |= 4, t.instance = n, fl(n), n;
        u = Py(a), (e = xl.get(e)) && Kc(u, e), n = (l.ownerDocument || l).createElement("link"), fl(n);
        var f = n;
        return f._p = new Promise(function(c, i) {
          f.onload = c, f.onerror = i;
        }), dl(n, "link", u), t.state.loading |= 4, re(n, a.precedence, l), t.instance = n;
      case "script":
        return n = Wa(a.src), (e = l.querySelector(
          ku(n)
        )) ? (t.instance = e, fl(e), e) : (u = a, (e = xl.get(n)) && (u = C({}, a), Lc(u, e)), l = l.ownerDocument || l, e = l.createElement("script"), fl(e), dl(e, "link", u), l.head.appendChild(e), t.instance = e);
      case "void":
        return null;
      default:
        throw Error(b(443, t.type));
    }
  else
    t.type === "stylesheet" && !(t.state.loading & 4) && (u = t.instance, t.state.loading |= 4, re(u, a.precedence, l));
  return t.instance;
}
function re(l, t, a) {
  for (var u = a.querySelectorAll(
    'link[rel="stylesheet"][data-precedence],style[data-precedence]'
  ), e = u.length ? u[u.length - 1] : null, n = e, f = 0; f < u.length; f++) {
    var c = u[f];
    if (c.dataset.precedence === t) n = c;
    else if (n !== e) break;
  }
  n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(l, t.firstChild));
}
function Kc(l, t) {
  l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
}
function Lc(l, t) {
  l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
}
var Oe = null;
function y0(l, t, a) {
  if (Oe === null) {
    var u = /* @__PURE__ */ new Map(), e = Oe = /* @__PURE__ */ new Map();
    e.set(a, u);
  } else
    e = Oe, u = e.get(a), u || (u = /* @__PURE__ */ new Map(), e.set(a, u));
  if (u.has(l)) return u;
  for (u.set(l, null), a = a.getElementsByTagName(l), e = 0; e < a.length; e++) {
    var n = a[e];
    if (!(n[xu] || n[vl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
      var f = n.getAttribute(t) || "";
      f = l + f;
      var c = u.get(f);
      c ? c.push(n) : u.set(f, [n]);
    }
  }
  return u;
}
function d0(l, t, a) {
  l = l.ownerDocument || l, l.head.insertBefore(
    a,
    t === "title" ? l.querySelector("head > title") : null
  );
}
function Uh(l, t, a) {
  if (a === 1 || t.itemProp != null) return !1;
  switch (l) {
    case "meta":
    case "title":
      return !0;
    case "style":
      if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
        break;
      return !0;
    case "link":
      if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
        break;
      switch (t.rel) {
        case "stylesheet":
          return l = t.disabled, typeof t.precedence == "string" && l == null;
        default:
          return !0;
      }
    case "script":
      if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
        return !0;
  }
  return !1;
}
function l1(l) {
  return !(l.type === "stylesheet" && !(l.state.loading & 3));
}
var Hu = null;
function _h() {
}
function Rh(l, t, a) {
  if (Hu === null) throw Error(b(475));
  var u = Hu;
  if (t.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && !(t.state.loading & 4)) {
    if (t.instance === null) {
      var e = Va(a.href), n = l.querySelector(
        $u(e)
      );
      if (n) {
        l = n._p, l !== null && typeof l == "object" && typeof l.then == "function" && (u.count++, u = Pe.bind(u), l.then(u, u)), t.state.loading |= 4, t.instance = n, fl(n);
        return;
      }
      n = l.ownerDocument || l, a = Py(a), (e = xl.get(e)) && Kc(a, e), n = n.createElement("link"), fl(n);
      var f = n;
      f._p = new Promise(function(c, i) {
        f.onload = c, f.onerror = i;
      }), dl(n, "link", a), t.instance = n;
    }
    u.stylesheets === null && (u.stylesheets = /* @__PURE__ */ new Map()), u.stylesheets.set(t, l), (l = t.state.preload) && !(t.state.loading & 3) && (u.count++, t = Pe.bind(u), l.addEventListener("load", t), l.addEventListener("error", t));
  }
}
function Hh() {
  if (Hu === null) throw Error(b(475));
  var l = Hu;
  return l.stylesheets && l.count === 0 && Pf(l, l.stylesheets), 0 < l.count ? function(t) {
    var a = setTimeout(function() {
      if (l.stylesheets && Pf(l, l.stylesheets), l.unsuspend) {
        var u = l.unsuspend;
        l.unsuspend = null, u();
      }
    }, 6e4);
    return l.unsuspend = t, function() {
      l.unsuspend = null, clearTimeout(a);
    };
  } : null;
}
function Pe() {
  if (this.count--, this.count === 0) {
    if (this.stylesheets) Pf(this, this.stylesheets);
    else if (this.unsuspend) {
      var l = this.unsuspend;
      this.unsuspend = null, l();
    }
  }
}
var ln = null;
function Pf(l, t) {
  l.stylesheets = null, l.unsuspend !== null && (l.count++, ln = /* @__PURE__ */ new Map(), t.forEach(Nh, l), ln = null, Pe.call(l));
}
function Nh(l, t) {
  if (!(t.state.loading & 4)) {
    var a = ln.get(l);
    if (a) var u = a.get(null);
    else {
      a = /* @__PURE__ */ new Map(), ln.set(l, a);
      for (var e = l.querySelectorAll(
        "link[data-precedence],style[data-precedence]"
      ), n = 0; n < e.length; n++) {
        var f = e[n];
        (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (a.set(f.dataset.precedence, f), u = f);
      }
      u && a.set(null, u);
    }
    e = t.instance, f = e.getAttribute("data-precedence"), n = a.get(f) || u, n === u && a.set(null, e), a.set(f, e), this.count++, u = Pe.bind(this), e.addEventListener("load", u), e.addEventListener("error", u), n ? n.parentNode.insertBefore(e, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(e, l.firstChild)), t.state.loading |= 4;
  }
}
var Nu = {
  $$typeof: tt,
  Provider: null,
  Consumer: null,
  _currentValue: Kt,
  _currentValue2: Kt,
  _threadCount: 0
};
function qh(l, t, a, u, e, n, f, c) {
  this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Dn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Dn(0), this.hiddenUpdates = Dn(null), this.identifierPrefix = u, this.onUncaughtError = e, this.onCaughtError = n, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
}
function t1(l, t, a, u, e, n, f, c, i, d, m, S) {
  return l = new qh(
    l,
    t,
    a,
    f,
    c,
    i,
    d,
    S
  ), t = 1, n === !0 && (t |= 24), n = El(3, null, null, t), l.current = n, n.stateNode = l, t = zc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
    element: u,
    isDehydrated: a,
    cache: t
  }, Ac(n), l;
}
function a1(l) {
  return l ? (l = za, l) : za;
}
function u1(l, t, a, u, e, n) {
  e = a1(e), u.context === null ? u.context = e : u.pendingContext = e, u = Ut(t), u.payload = { element: a }, n = n === void 0 ? null : n, n !== null && (u.callback = n), a = _t(l, u, t), a !== null && (Ul(a, l, t), vu(a, l, t));
}
function v0(l, t) {
  if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
    var a = l.retryLane;
    l.retryLane = a !== 0 && a < t ? a : t;
  }
}
function Jc(l, t) {
  v0(l, t), (l = l.alternate) && v0(l, t);
}
function e1(l) {
  if (l.tag === 13) {
    var t = La(l, 67108864);
    t !== null && Ul(t, l, 67108864), Jc(l, 67108864);
  }
}
var tn = !0;
function Yh(l, t, a, u) {
  var e = O.T;
  O.T = null;
  var n = G.p;
  try {
    G.p = 2, wc(l, t, a, u);
  } finally {
    G.p = n, O.T = e;
  }
}
function Qh(l, t, a, u) {
  var e = O.T;
  O.T = null;
  var n = G.p;
  try {
    G.p = 8, wc(l, t, a, u);
  } finally {
    G.p = n, O.T = e;
  }
}
function wc(l, t, a, u) {
  if (tn) {
    var e = lc(u);
    if (e === null)
      uf(
        l,
        t,
        u,
        an,
        a
      ), h0(l, u);
    else if (Gh(
      e,
      l,
      t,
      a,
      u
    ))
      u.stopPropagation();
    else if (h0(l, u), t & 4 && -1 < Bh.indexOf(l)) {
      for (; e !== null; ) {
        var n = Ka(e);
        if (n !== null)
          switch (n.tag) {
            case 3:
              if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                var f = Vt(n.pendingLanes);
                if (f !== 0) {
                  var c = n;
                  for (c.pendingLanes |= 2, c.entangledLanes |= 2; f; ) {
                    var i = 1 << 31 - Ol(f);
                    c.entanglements[1] |= i, f &= ~i;
                  }
                  kl(n), !(Z & 6) && (Je = wl() + 500, Wu(0));
                }
              }
              break;
            case 13:
              c = La(n, 2), c !== null && Ul(c, n, 2), Sn(), Jc(n, 2);
          }
        if (n = lc(u), n === null && uf(
          l,
          t,
          u,
          an,
          a
        ), n === e) break;
        e = n;
      }
      e !== null && u.stopPropagation();
    } else
      uf(
        l,
        t,
        u,
        null,
        a
      );
  }
}
function lc(l) {
  return l = sc(l), Wc(l);
}
var an = null;
function Wc(l) {
  if (an = null, l = ha(l), l !== null) {
    var t = Bu(l);
    if (t === null) l = null;
    else {
      var a = t.tag;
      if (a === 13) {
        if (l = R0(t), l !== null) return l;
        l = null;
      } else if (a === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        l = null;
      } else t !== l && (l = null);
    }
  }
  return an = l, null;
}
function n1(l) {
  switch (l) {
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
      switch (Td()) {
        case Y0:
          return 2;
        case Q0:
          return 8;
        case He:
        case Ad:
          return 32;
        case B0:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var tc = !1, Nt = null, qt = null, Yt = null, qu = /* @__PURE__ */ new Map(), Yu = /* @__PURE__ */ new Map(), At = [], Bh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
  " "
);
function h0(l, t) {
  switch (l) {
    case "focusin":
    case "focusout":
      Nt = null;
      break;
    case "dragenter":
    case "dragleave":
      qt = null;
      break;
    case "mouseover":
    case "mouseout":
      Yt = null;
      break;
    case "pointerover":
    case "pointerout":
      qu.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Yu.delete(t.pointerId);
  }
}
function au(l, t, a, u, e, n) {
  return l === null || l.nativeEvent !== n ? (l = {
    blockedOn: t,
    domEventName: a,
    eventSystemFlags: u,
    nativeEvent: n,
    targetContainers: [e]
  }, t !== null && (t = Ka(t), t !== null && e1(t)), l) : (l.eventSystemFlags |= u, t = l.targetContainers, e !== null && t.indexOf(e) === -1 && t.push(e), l);
}
function Gh(l, t, a, u, e) {
  switch (t) {
    case "focusin":
      return Nt = au(
        Nt,
        l,
        t,
        a,
        u,
        e
      ), !0;
    case "dragenter":
      return qt = au(
        qt,
        l,
        t,
        a,
        u,
        e
      ), !0;
    case "mouseover":
      return Yt = au(
        Yt,
        l,
        t,
        a,
        u,
        e
      ), !0;
    case "pointerover":
      var n = e.pointerId;
      return qu.set(
        n,
        au(
          qu.get(n) || null,
          l,
          t,
          a,
          u,
          e
        )
      ), !0;
    case "gotpointercapture":
      return n = e.pointerId, Yu.set(
        n,
        au(
          Yu.get(n) || null,
          l,
          t,
          a,
          u,
          e
        )
      ), !0;
  }
  return !1;
}
function f1(l) {
  var t = ha(l.target);
  if (t !== null) {
    var a = Bu(t);
    if (a !== null) {
      if (t = a.tag, t === 13) {
        if (t = R0(a), t !== null) {
          l.blockedOn = t, Rd(l.priority, function() {
            if (a.tag === 13) {
              var u = Dl();
              u = nc(u);
              var e = La(a, u);
              e !== null && Ul(e, a, u), Jc(a, u);
            }
          });
          return;
        }
      } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
        l.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
        return;
      }
    }
  }
  l.blockedOn = null;
}
function De(l) {
  if (l.blockedOn !== null) return !1;
  for (var t = l.targetContainers; 0 < t.length; ) {
    var a = lc(l.nativeEvent);
    if (a === null) {
      a = l.nativeEvent;
      var u = new a.constructor(
        a.type,
        a
      );
      bf = u, a.target.dispatchEvent(u), bf = null;
    } else
      return t = Ka(a), t !== null && e1(t), l.blockedOn = a, !1;
    t.shift();
  }
  return !0;
}
function o0(l, t, a) {
  De(l) && a.delete(t);
}
function Xh() {
  tc = !1, Nt !== null && De(Nt) && (Nt = null), qt !== null && De(qt) && (qt = null), Yt !== null && De(Yt) && (Yt = null), qu.forEach(o0), Yu.forEach(o0);
}
function de(l, t) {
  l.blockedOn === t && (l.blockedOn = null, tc || (tc = !0, ul.unstable_scheduleCallback(
    ul.unstable_NormalPriority,
    Xh
  )));
}
var ve = null;
function m0(l) {
  ve !== l && (ve = l, ul.unstable_scheduleCallback(
    ul.unstable_NormalPriority,
    function() {
      ve === l && (ve = null);
      for (var t = 0; t < l.length; t += 3) {
        var a = l[t], u = l[t + 1], e = l[t + 2];
        if (typeof u != "function") {
          if (Wc(u || a) === null)
            continue;
          break;
        }
        var n = Ka(a);
        n !== null && (l.splice(t, 3), t -= 3, Qf(
          n,
          {
            pending: !0,
            data: e,
            method: a.method,
            action: u
          },
          u,
          e
        ));
      }
    }
  ));
}
function Qu(l) {
  function t(i) {
    return de(i, l);
  }
  Nt !== null && de(Nt, l), qt !== null && de(qt, l), Yt !== null && de(Yt, l), qu.forEach(t), Yu.forEach(t);
  for (var a = 0; a < At.length; a++) {
    var u = At[a];
    u.blockedOn === l && (u.blockedOn = null);
  }
  for (; 0 < At.length && (a = At[0], a.blockedOn === null); )
    f1(a), a.blockedOn === null && At.shift();
  if (a = (l.ownerDocument || l).$$reactFormReplay, a != null)
    for (u = 0; u < a.length; u += 3) {
      var e = a[u], n = a[u + 1], f = e[bl] || null;
      if (typeof n == "function")
        f || m0(a);
      else if (f) {
        var c = null;
        if (n && n.hasAttribute("formAction")) {
          if (e = n, f = n[bl] || null)
            c = f.formAction;
          else if (Wc(e) !== null) continue;
        } else c = f.action;
        typeof c == "function" ? a[u + 1] = c : (a.splice(u, 3), u -= 3), m0(a);
      }
    }
}
function $c(l) {
  this._internalRoot = l;
}
Tn.prototype.render = $c.prototype.render = function(l) {
  var t = this._internalRoot;
  if (t === null) throw Error(b(409));
  var a = t.current, u = Dl();
  u1(a, u, l, t, null, null);
};
Tn.prototype.unmount = $c.prototype.unmount = function() {
  var l = this._internalRoot;
  if (l !== null) {
    this._internalRoot = null;
    var t = l.containerInfo;
    u1(l.current, 2, null, l, null, null), Sn(), t[Ca] = null;
  }
};
function Tn(l) {
  this._internalRoot = l;
}
Tn.prototype.unstable_scheduleHydration = function(l) {
  if (l) {
    var t = p0();
    l = { blockedOn: null, target: l, priority: t };
    for (var a = 0; a < At.length && t !== 0 && t < At[a].priority; a++) ;
    At.splice(a, 0, l), a === 0 && f1(l);
  }
};
var S0 = U0.version;
if (S0 !== "19.1.1")
  throw Error(
    b(
      527,
      S0,
      "19.1.1"
    )
  );
G.findDOMNode = function(l) {
  var t = l._reactInternals;
  if (t === void 0)
    throw typeof l.render == "function" ? Error(b(188)) : (l = Object.keys(l).join(","), Error(b(268, l)));
  return l = hd(t), l = l !== null ? H0(l) : null, l = l === null ? null : l.stateNode, l;
};
var Zh = {
  bundleType: 0,
  version: "19.1.1",
  rendererPackageName: "react-dom",
  currentDispatcherRef: O,
  reconcilerVersion: "19.1.1"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var he = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!he.isDisabled && he.supportsFiber)
    try {
      Gu = he.inject(
        Zh
      ), rl = he;
    } catch {
    }
}
en.createRoot = function(l, t) {
  if (!_0(l)) throw Error(b(299));
  var a = !1, u = "", e = ty, n = ay, f = uy, c = null;
  return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onUncaughtError !== void 0 && (e = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (c = t.unstable_transitionCallbacks)), t = t1(
    l,
    1,
    !1,
    null,
    null,
    a,
    u,
    e,
    n,
    f,
    c,
    null
  ), l[Ca] = t.current, Cc(l), new $c(t);
};
en.hydrateRoot = function(l, t, a) {
  if (!_0(l)) throw Error(b(299));
  var u = !1, e = "", n = ty, f = ay, c = uy, i = null, d = null;
  return a != null && (a.unstable_strictMode === !0 && (u = !0), a.identifierPrefix !== void 0 && (e = a.identifierPrefix), a.onUncaughtError !== void 0 && (n = a.onUncaughtError), a.onCaughtError !== void 0 && (f = a.onCaughtError), a.onRecoverableError !== void 0 && (c = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (i = a.unstable_transitionCallbacks), a.formState !== void 0 && (d = a.formState)), t = t1(
    l,
    1,
    !0,
    t,
    a ?? null,
    u,
    e,
    n,
    f,
    c,
    i,
    d
  ), t.context = a1(null), a = t.current, u = Dl(), u = nc(u), e = Ut(u), e.callback = null, _t(a, e, u), a = u, t.current.lanes = a, Zu(t, a), kl(t), l[Ca] = t.current, Cc(l), new Tn(t);
};
en.version = "19.1.1";
function c1() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c1);
    } catch (l) {
      console.error(l);
    }
}
c1(), r0.exports = en;
var An = r0.exports;
const i1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CancelledError: o1,
  HydrationBoundary: m1,
  InfiniteQueryObserver: S1,
  IsRestoringProvider: g1,
  Mutation: b1,
  MutationCache: z1,
  MutationObserver: T1,
  QueriesObserver: A1,
  Query: M1,
  QueryCache: E1,
  QueryClient: T0,
  QueryClientContext: r1,
  QueryClientProvider: A0,
  QueryErrorResetBoundary: O1,
  QueryObserver: D1,
  dataTagErrorSymbol: U1,
  dataTagSymbol: _1,
  defaultScheduler: R1,
  defaultShouldDehydrateMutation: H1,
  defaultShouldDehydrateQuery: N1,
  dehydrate: q1,
  experimental_streamedQuery: Y1,
  focusManager: Q1,
  hashKey: B1,
  hydrate: G1,
  infiniteQueryOptions: X1,
  isCancelledError: Z1,
  isServer: x1,
  keepPreviousData: p1,
  matchMutation: V1,
  matchQuery: j1,
  mutationOptions: C1,
  noop: K1,
  notifyManager: L1,
  onlineManager: J1,
  partialMatchKey: w1,
  queryOptions: W1,
  replaceEqualDeep: $1,
  shouldThrowError: k1,
  skipToken: F1,
  unsetMarker: I1,
  useInfiniteQuery: P1,
  useIsFetching: ld,
  useIsMutating: td,
  useIsRestoring: ad,
  useMutation: M0,
  useMutationState: ud,
  usePrefetchInfiniteQuery: ed,
  usePrefetchQuery: nd,
  useQueries: fd,
  useQuery: un,
  useQueryClient: E0,
  useQueryErrorResetBoundary: cd,
  useSuspenseInfiniteQuery: id,
  useSuspenseQueries: sd,
  useSuspenseQuery: yd
}, Symbol.toStringTag, { value: "Module" })), xh = ya.createContext(null);
function ph({ children: l }) {
  const [t, a] = ya.useState(typeof window < "u" ? window.location.pathname : "/"), [u, e] = ya.useState({}), [n, f] = ya.useState({});
  ya.useEffect(() => {
    if (typeof window > "u") return;
    const i = (m) => {
      a(m.detail.pathname), m.detail.params && e(m.detail.params), m.detail.query && f(m.detail.query);
    }, d = () => {
      a(window.location.pathname);
      const m = new URLSearchParams(window.location.search), S = {};
      m.forEach((v, o) => {
        S[o] = v;
      }), f(S);
    };
    return window.addEventListener("mfa:route-changed", i), window.addEventListener("popstate", d), () => {
      window.removeEventListener("mfa:route-changed", i), window.removeEventListener("popstate", d);
    };
  }, []);
  const c = (i) => {
    typeof window < "u" && (window.history.pushState(null, "", i), window.dispatchEvent(new PopStateEvent("popstate")));
  };
  return /* @__PURE__ */ Gl.createElement(xh.Provider, { value: { pathname: t, navigate: c, params: u, query: n } }, l);
}
let nf = null;
function Vh() {
  return nf || (nf = new T0({
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
function jh(l = {}) {
  const t = Vh();
  return Object.entries(l).forEach(([a, u]) => {
    try {
      t.setQueryData(JSON.parse(a), u);
    } catch (e) {
      console.warn("Failed to parse query key:", a, e);
    }
  }), t;
}
function s1({ children: l, ssrQueries: t }) {
  const a = Gl.useMemo(() => jh(t), [t]);
  return /* @__PURE__ */ Gl.createElement(A0, { client: a }, l);
}
const y1 = ja((l, t) => ({
  user: null,
  theme: "light",
  language: "ko",
  setUser: (a) => l({ user: a }),
  setTheme: (a) => l({ theme: a }),
  setLanguage: (a) => l({ language: a }),
  // SSR에서 초기화할 때 사용
  initializeFromSSR: (a) => {
    const u = {};
    a.user && (u.user = a.user), a.theme && (u.theme = a.theme), a.language && (u.language = a.language), l(u);
  }
})), Fh = ja((l, t) => ({
  events: {},
  emit: (a, u) => {
    const { events: e } = t();
    (e[a] || []).forEach((f) => f(u));
  },
  on: (a, u) => (l((e) => ({
    events: {
      ...e.events,
      [a]: [...e.events[a] || [], u]
    }
  })), () => t().off(a, u)),
  off: (a, u) => {
    l((e) => ({
      events: {
        ...e.events,
        [a]: (e.events[a] || []).filter((n) => n !== u)
      }
    }));
  }
})), d1 = ja((l, t) => ({
  notifications: [],
  addNotification: (a) => {
    const u = Date.now().toString(), e = Date.now(), n = {
      id: u,
      timestamp: e,
      ...a
    };
    return l((f) => ({
      notifications: [...f.notifications, n]
    })), a.autoRemove !== !1 && setTimeout(() => {
      t().removeNotification(u);
    }, a.duration || 5e3), u;
  },
  removeNotification: (a) => l((u) => ({
    notifications: u.notifications.filter((e) => e.id !== a)
  })),
  clearNotifications: () => l({ notifications: [] })
})), Ch = ja((l) => ({
  currentPath: typeof window < "u" ? window.location.pathname : "/",
  navigate: (t) => {
    typeof window < "u" && (window.history.pushState({}, "", t), l({ currentPath: t }), window.dispatchEvent(new PopStateEvent("popstate")));
  }
}));
function Kh() {
  const { notifications: l, removeNotification: t } = d1();
  return l.length === 0 ? null : /* @__PURE__ */ Gl.createElement("div", { style: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 1e4,
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  } }, l.map((a) => /* @__PURE__ */ Gl.createElement(
    "div",
    {
      key: a.id,
      style: {
        background: a.type === "error" ? "#ff6b6b" : a.type === "success" ? "#51cf66" : "#339af0",
        color: "white",
        padding: "12px 16px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        minWidth: "250px",
        maxWidth: "400px",
        cursor: "pointer"
      },
      onClick: () => a.id && t(a.id)
    },
    /* @__PURE__ */ Gl.createElement("div", { style: { fontWeight: "bold", marginBottom: "4px" } }, a.title),
    a.message && /* @__PURE__ */ Gl.createElement("div", { style: { fontSize: "14px", opacity: 0.9 } }, a.message)
  )));
}
function Lh({ children: l, ssrData: t = {} }) {
  const { initializeFromSSR: a } = y1();
  return Gl.useEffect(() => {
    (t.user || t.theme || t.language) && a(t);
  }, [t, a]), /* @__PURE__ */ Gl.createElement(s1, { ssrQueries: t.queries }, l, /* @__PURE__ */ Gl.createElement(Kh, null));
}
const Ih = y1, Ph = d1, lo = {
  LIGHT: "light",
  DARK: "dark",
  AUTO: "auto"
}, to = {
  KO: "ko",
  EN: "en",
  JA: "ja"
}, ao = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error"
}, Mn = {
  // 사용자 정보 조회
  getUser: async (l) => {
    const t = await fetch(`/api/users/${l}`);
    if (!t.ok) throw new Error("Failed to fetch user");
    return t.json();
  },
  // 사용자 목록 조회
  getUsers: async (l = {}) => {
    const t = new URLSearchParams(l), a = await fetch(`/api/users?${t}`);
    if (!a.ok) throw new Error("Failed to fetch users");
    return a.json();
  },
  // 사용자 업데이트
  updateUser: async ({ userId: l, data: t }) => {
    const a = await fetch(`/api/users/${l}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t)
    });
    if (!a.ok) throw new Error("Failed to update user");
    return a.json();
  },
  // 공용 설정 조회
  getSettings: async () => {
    const l = await fetch("/api/settings");
    if (!l.ok) throw new Error("Failed to fetch settings");
    return l.json();
  }
};
function uo(l) {
  return un({
    queryKey: ["user", l],
    queryFn: () => Mn.getUser(l),
    enabled: !!l
  });
}
function eo(l) {
  return un({
    queryKey: ["users", l],
    queryFn: () => Mn.getUsers(l)
  });
}
function no() {
  return un({
    queryKey: ["settings"],
    queryFn: Mn.getSettings,
    staleTime: 10 * 60 * 1e3
    // 10분
  });
}
function fo() {
  const l = E0();
  return M0({
    mutationFn: Mn.updateUser,
    onSuccess: () => {
      l.invalidateQueries({ queryKey: ["user"] }), l.invalidateQueries({ queryKey: ["users"] });
    }
  });
}
const co = () => {
  const { navigate: l, currentPath: t } = Ch();
  return {
    navigate: l,
    currentPath: t,
    isActive: (a) => t === a
  };
};
function io(l, t = "YYYY-MM-DD") {
  const a = new Date(l), u = a.getFullYear().toString(), e = String(a.getMonth() + 1).padStart(2, "0"), n = String(a.getDate()).padStart(2, "0"), f = String(a.getHours()).padStart(2, "0"), c = String(a.getMinutes()).padStart(2, "0"), i = {
    "YYYY-MM-DD": `${u}-${e}-${n}`,
    "YYYY-MM-DD HH:mm": `${u}-${e}-${n} ${f}:${c}`,
    "MM/DD/YYYY": `${e}/${n}/${u}`,
    relative: Jh(a)
  };
  return i[t] || i["YYYY-MM-DD"];
}
function Jh(l) {
  const a = (/* @__PURE__ */ new Date()).getTime() - l.getTime(), u = Math.floor(a / 1e3), e = Math.floor(u / 60), n = Math.floor(e / 60), f = Math.floor(n / 24);
  return f > 0 ? `${f}일 전` : n > 0 ? `${n}시간 전` : e > 0 ? `${e}분 전` : "방금 전";
}
function so(l, t) {
  let a;
  return function(...e) {
    const n = () => {
      clearTimeout(a), l(...e);
    };
    clearTimeout(a), a = setTimeout(n, t);
  };
}
function yo(l, t) {
  let a;
  return function(...u) {
    const e = this;
    a || (l.apply(e, u), a = !0, setTimeout(() => a = !1, t));
  };
}
const vo = {
  get: (l, t = null) => {
    try {
      const a = localStorage.getItem(l);
      return a ? JSON.parse(a) : t;
    } catch {
      return t;
    }
  },
  set: (l, t) => {
    try {
      localStorage.setItem(l, JSON.stringify(t));
    } catch (a) {
      console.warn("Failed to save to localStorage:", a);
    }
  },
  remove: (l) => {
    try {
      localStorage.removeItem(l);
    } catch (t) {
      console.warn("Failed to remove from localStorage:", t);
    }
  }
};
function ho(l = window.location.href) {
  const t = new URL(l);
  return Object.fromEntries(t.searchParams);
}
function oo(l, t = !1) {
  const a = new URL(window.location.href);
  Object.entries(l).forEach(([u, e]) => {
    e == null ? a.searchParams.delete(u) : a.searchParams.set(u, e);
  }), t ? window.history.replaceState({}, "", a.toString()) : window.history.pushState({}, "", a.toString());
}
function mo(...l) {
  return l.filter(Boolean).join(" ");
}
function g0(l) {
  if (l === null || typeof l != "object") return l;
  if (l instanceof Date) return new Date(l.getTime());
  if (l instanceof Array) return l.map((t) => g0(t));
  if (typeof l == "object") {
    const t = {};
    return Object.keys(l).forEach((a) => {
      t[a] = g0(l[a]);
    }), t;
  }
  return l;
}
typeof window < "u" && !window.__MFA_APPS__ && (window.__MFA_APPS__ = /* @__PURE__ */ new Map());
function So(l, t) {
  let a = null;
  return {
    /**
     * 컴포넌트를 DOM에 마운트
     * @param container - 마운트할 DOM 요소
     */
    mount(u) {
      if (a) {
        console.warn(`${l}는 이미 마운트되어 있습니다.`);
        return;
      }
      a = An.createRoot(u), a.render(/* @__PURE__ */ Gl.createElement(t, null)), window.__MFA_APPS__.set(l, { root: a, Component: t }), t.root = a, console.log(`✅ ${l} 마운트 완료`);
    },
    /**
     * 컴포넌트를 DOM에서 언마운트
     */
    unmount() {
      a && (a.unmount(), a = null, window.__MFA_APPS__.delete(l), t.root = null, console.log(`❌ ${l} 언마운트 완료`));
    }
  };
}
function go(l, t, a) {
  const u = l.hot;
  u && u.accept((e) => {
    console.log(`🔥 HMR: ${t} 컴포넌트 업데이트 감지`);
    const n = window.__MFA_APPS__.get(t);
    if (!e || !n) {
      console.warn(`HMR 실패: ${t}의 정보를 찾을 수 없습니다.`);
      return;
    }
    const f = e.default || e[a.name];
    if (!f) {
      console.warn("HMR 실패: 새 컴포넌트를 찾을 수 없습니다.");
      return;
    }
    n.root.render(/* @__PURE__ */ Gl.createElement(f, null)), f.root = n.root, window.__MFA_APPS__.set(t, { ...n, Component: f }), console.log(`✅ HMR 적용 완료: ${t}`);
  });
}
typeof window < "u" && (window.React = b0, window.ReactDOM = z0, window.ReactDOMClient = { createRoot: An.createRoot }, window.ReactQuery = i1, window.Zustand = { create: ja });
typeof window < "u" && (window.MfaFramework = {
  React: b0,
  ReactDOM: z0,
  createRoot: An.createRoot,
  RoutingProvider: ph,
  MfaGlobalProvider: Lh,
  MfaQueryProvider: s1,
  ...i1,
  create: ja
});
const bo = "1.0.0", zo = An.createRoot;
export {
  o1 as CancelledError,
  m1 as HydrationBoundary,
  S1 as InfiniteQueryObserver,
  g1 as IsRestoringProvider,
  to as LANGUAGES,
  Lh as MfaGlobalProvider,
  s1 as MfaQueryProvider,
  b1 as Mutation,
  z1 as MutationCache,
  T1 as MutationObserver,
  ao as NOTIFICATION_TYPES,
  A1 as QueriesObserver,
  M1 as Query,
  E1 as QueryCache,
  T0 as QueryClient,
  r1 as QueryClientContext,
  A0 as QueryClientProvider,
  O1 as QueryErrorResetBoundary,
  D1 as QueryObserver,
  b0 as React,
  z0 as ReactDOM,
  ph as RoutingProvider,
  bo as SHARED_VERSION,
  lo as THEMES,
  Mn as api,
  mo as classNames,
  ja as create,
  So as createMfaApp,
  zo as createRoot,
  U1 as dataTagErrorSymbol,
  _1 as dataTagSymbol,
  so as debounce,
  g0 as deepClone,
  R1 as defaultScheduler,
  H1 as defaultShouldDehydrateMutation,
  N1 as defaultShouldDehydrateQuery,
  q1 as dehydrate,
  go as enableHMR,
  Y1 as experimental_streamedQuery,
  Q1 as focusManager,
  io as formatDate,
  Vh as getQueryClient,
  ho as getUrlParams,
  B1 as hashKey,
  G1 as hydrate,
  X1 as infiniteQueryOptions,
  jh as initializeQueryClient,
  Z1 as isCancelledError,
  x1 as isServer,
  p1 as keepPreviousData,
  V1 as matchMutation,
  j1 as matchQuery,
  C1 as mutationOptions,
  K1 as noop,
  L1 as notifyManager,
  J1 as onlineManager,
  w1 as partialMatchKey,
  W1 as queryOptions,
  $1 as replaceEqualDeep,
  k1 as shouldThrowError,
  F1 as skipToken,
  vo as storage,
  yo as throttle,
  I1 as unsetMarker,
  oo as updateUrlParams,
  Fh as useEventStore,
  Ph as useGlobalNotification,
  Ih as useGlobalUser,
  P1 as useInfiniteQuery,
  ld as useIsFetching,
  td as useIsMutating,
  ad as useIsRestoring,
  M0 as useMutation,
  ud as useMutationState,
  d1 as useNotificationStore,
  ed as usePrefetchInfiniteQuery,
  nd as usePrefetchQuery,
  fd as useQueries,
  un as useQuery,
  E0 as useQueryClient,
  cd as useQueryErrorResetBoundary,
  co as useRouting,
  Ch as useRoutingStore,
  no as useSettings,
  id as useSuspenseInfiniteQuery,
  sd as useSuspenseQueries,
  yd as useSuspenseQuery,
  fo as useUpdateUser,
  uo as useUser,
  y1 as useUserStore,
  eo as useUsers
};
