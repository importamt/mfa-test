var Ke = (e) => {
  throw TypeError(e);
};
var de = (e, t, s) => t.has(e) || Ke("Cannot " + s);
var i = (e, t, s) => (de(e, t, "read from private field"), s ? s.call(e) : t.get(e)), f = (e, t, s) => t.has(e) ? Ke("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), o = (e, t, s, r) => (de(e, t, "write to private field"), r ? r.call(e, s) : t.set(e, s), s), m = (e, t, s) => (de(e, t, "access private method"), s);
var se = (e, t, s, r) => ({
  set _(n) {
    o(e, t, n, s);
  },
  get _() {
    return i(e, t, r);
  }
});
import { r as P } from "./react-BNwpUHf-.js";
var Ft = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  subscribe(e) {
    return this.listeners.add(e), this.onSubscribe(), () => {
      this.listeners.delete(e), this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}, Qt = typeof window > "u" || "Deno" in globalThis;
function A() {
}
function Is(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ye(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function us(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function pt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function B(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function He(e, t) {
  const {
    type: s = "all",
    exact: r,
    fetchStatus: n,
    predicate: a,
    queryKey: u,
    stale: h
  } = e;
  if (u) {
    if (r) {
      if (t.queryHash !== qe(u, t.options))
        return !1;
    } else if (!zt(t.queryKey, u))
      return !1;
  }
  if (s !== "all") {
    const c = t.isActive();
    if (s === "active" && !c || s === "inactive" && c)
      return !1;
  }
  return !(typeof h == "boolean" && t.isStale() !== h || n && n !== t.state.fetchStatus || a && !a(t));
}
function _e(e, t) {
  const { exact: s, status: r, predicate: n, mutationKey: a } = e;
  if (a) {
    if (!t.options.mutationKey)
      return !1;
    if (s) {
      if (Et(t.options.mutationKey) !== Et(a))
        return !1;
    } else if (!zt(t.options.mutationKey, a))
      return !1;
  }
  return !(r && t.state.status !== r || n && !n(t));
}
function qe(e, t) {
  return ((t == null ? void 0 : t.queryKeyHashFn) || Et)(e);
}
function Et(e) {
  return JSON.stringify(
    e,
    (t, s) => pe(s) ? Object.keys(s).sort().reduce((r, n) => (r[n] = s[n], r), {}) : s
  );
}
function zt(e, t) {
  return e === t ? !0 : typeof e != typeof t ? !1 : e && t && typeof e == "object" && typeof t == "object" ? Object.keys(t).every((s) => zt(e[s], t[s])) : !1;
}
function he(e, t) {
  if (e === t)
    return e;
  const s = Ne(e) && Ne(t);
  if (s || pe(e) && pe(t)) {
    const r = s ? e : Object.keys(e), n = r.length, a = s ? t : Object.keys(t), u = a.length, h = s ? [] : {}, c = new Set(r);
    let v = 0;
    for (let b = 0; b < u; b++) {
      const l = s ? b : a[b];
      (!s && c.has(l) || s) && e[l] === void 0 && t[l] === void 0 ? (h[l] = void 0, v++) : (h[l] = he(e[l], t[l]), h[l] === e[l] && e[l] !== void 0 && v++);
    }
    return n === u && v === n ? e : h;
  }
  return t;
}
function ne(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const s in e)
    if (e[s] !== t[s])
      return !1;
  return !0;
}
function Ne(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function pe(e) {
  if (!Ge(e))
    return !1;
  const t = e.constructor;
  if (t === void 0)
    return !0;
  const s = t.prototype;
  return !(!Ge(s) || !s.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype);
}
function Ge(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function qs(e) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
function ve(e, t, s) {
  return typeof s.structuralSharing == "function" ? s.structuralSharing(e, t) : s.structuralSharing !== !1 ? he(e, t) : t;
}
function dr(e) {
  return e;
}
function me(e, t, s = 0) {
  const r = [...e, t];
  return s && r.length > s ? r.slice(1) : r;
}
function Us(e, t, s = 0) {
  const r = [t, ...e];
  return s && r.length > s ? r.slice(0, -1) : r;
}
var Ue = Symbol();
function os(e, t) {
  return !e.queryFn && (t != null && t.initialPromise) ? () => t.initialPromise : !e.queryFn || e.queryFn === Ue ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)) : e.queryFn;
}
function hs(e, t) {
  return typeof e == "function" ? e(...t) : !!e;
}
var mt, it, Dt, We, ks = (We = class extends Ft {
  constructor() {
    super();
    f(this, mt);
    f(this, it);
    f(this, Dt);
    o(this, Dt, (t) => {
      if (!Qt && window.addEventListener) {
        const s = () => t();
        return window.addEventListener("visibilitychange", s, !1), () => {
          window.removeEventListener("visibilitychange", s);
        };
      }
    });
  }
  onSubscribe() {
    i(this, it) || this.setEventListener(i(this, Dt));
  }
  onUnsubscribe() {
    var t;
    this.hasListeners() || ((t = i(this, it)) == null || t.call(this), o(this, it, void 0));
  }
  setEventListener(t) {
    var s;
    o(this, Dt, t), (s = i(this, it)) == null || s.call(this), o(this, it, t((r) => {
      typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
    }));
  }
  setFocused(t) {
    i(this, mt) !== t && (o(this, mt, t), this.onFocus());
  }
  onFocus() {
    const t = this.isFocused();
    this.listeners.forEach((s) => {
      s(t);
    });
  }
  isFocused() {
    var t;
    return typeof i(this, mt) == "boolean" ? i(this, mt) : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !== "hidden";
  }
}, mt = new WeakMap(), it = new WeakMap(), Dt = new WeakMap(), We), ke = new ks(), xt, nt, At, Ye, js = (Ye = class extends Ft {
  constructor() {
    super();
    f(this, xt, !0);
    f(this, nt);
    f(this, At);
    o(this, At, (t) => {
      if (!Qt && window.addEventListener) {
        const s = () => t(!0), r = () => t(!1);
        return window.addEventListener("online", s, !1), window.addEventListener("offline", r, !1), () => {
          window.removeEventListener("online", s), window.removeEventListener("offline", r);
        };
      }
    });
  }
  onSubscribe() {
    i(this, nt) || this.setEventListener(i(this, At));
  }
  onUnsubscribe() {
    var t;
    this.hasListeners() || ((t = i(this, nt)) == null || t.call(this), o(this, nt, void 0));
  }
  setEventListener(t) {
    var s;
    o(this, At, t), (s = i(this, nt)) == null || s.call(this), o(this, nt, t(this.setOnline.bind(this)));
  }
  setOnline(t) {
    i(this, xt) !== t && (o(this, xt, t), this.listeners.forEach((r) => {
      r(t);
    }));
  }
  isOnline() {
    return i(this, xt);
  }
}, xt = new WeakMap(), nt = new WeakMap(), At = new WeakMap(), Ye), ae = new js();
function ge() {
  let e, t;
  const s = new Promise((n, a) => {
    e = n, t = a;
  });
  s.status = "pending", s.catch(() => {
  });
  function r(n) {
    Object.assign(s, n), delete s.resolve, delete s.reject;
  }
  return s.resolve = (n) => {
    r({
      status: "fulfilled",
      value: n
    }), e(n);
  }, s.reject = (n) => {
    r({
      status: "rejected",
      reason: n
    }), t(n);
  }, s;
}
function Ls(e) {
  var s;
  let t;
  if ((s = e.then((r) => (t = r, r), A)) == null || s.catch(A), t !== void 0)
    return { data: t };
}
function Ks(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function cs(e) {
  return (e ?? "online") === "online" ? ae.isOnline() : !0;
}
var ls = class extends Error {
  constructor(e) {
    super("CancelledError"), this.revert = e == null ? void 0 : e.revert, this.silent = e == null ? void 0 : e.silent;
  }
};
function fe(e) {
  return e instanceof ls;
}
function ds(e) {
  let t = !1, s = 0, r = !1, n;
  const a = ge(), u = (d) => {
    var p;
    r || (y(new ls(d)), (p = e.abort) == null || p.call(e));
  }, h = () => {
    t = !0;
  }, c = () => {
    t = !1;
  }, v = () => ke.isFocused() && (e.networkMode === "always" || ae.isOnline()) && e.canRun(), b = () => cs(e.networkMode) && e.canRun(), l = (d) => {
    var p;
    r || (r = !0, (p = e.onSuccess) == null || p.call(e, d), n == null || n(), a.resolve(d));
  }, y = (d) => {
    var p;
    r || (r = !0, (p = e.onError) == null || p.call(e, d), n == null || n(), a.reject(d));
  }, g = () => new Promise((d) => {
    var p;
    n = (R) => {
      (r || v()) && d(R);
    }, (p = e.onPause) == null || p.call(e);
  }).then(() => {
    var d;
    n = void 0, r || (d = e.onContinue) == null || d.call(e);
  }), O = () => {
    if (r)
      return;
    let d;
    const p = s === 0 ? e.initialPromise : void 0;
    try {
      d = p ?? e.fn();
    } catch (R) {
      d = Promise.reject(R);
    }
    Promise.resolve(d).then(l).catch((R) => {
      var L;
      if (r)
        return;
      const E = e.retry ?? (Qt ? 0 : 3), C = e.retryDelay ?? Ks, x = typeof C == "function" ? C(s, R) : C, U = E === !0 || typeof E == "number" && s < E || typeof E == "function" && E(s, R);
      if (t || !U) {
        y(R);
        return;
      }
      s++, (L = e.onFail) == null || L.call(e, s, R), qs(x).then(() => v() ? void 0 : g()).then(() => {
        t ? y(R) : O();
      });
    });
  };
  return {
    promise: a,
    cancel: u,
    continue: () => (n == null || n(), a),
    cancelRetry: h,
    continueRetry: c,
    canStart: b,
    start: () => (b() ? O() : g().then(O), a)
  };
}
var Hs = (e) => setTimeout(e, 0);
function _s() {
  let e = [], t = 0, s = (h) => {
    h();
  }, r = (h) => {
    h();
  }, n = Hs;
  const a = (h) => {
    t ? e.push(h) : n(() => {
      s(h);
    });
  }, u = () => {
    const h = e;
    e = [], h.length && n(() => {
      r(() => {
        h.forEach((c) => {
          s(c);
        });
      });
    });
  };
  return {
    batch: (h) => {
      let c;
      t++;
      try {
        c = h();
      } finally {
        t--, t || u();
      }
      return c;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (h) => (...c) => {
      a(() => {
        h(...c);
      });
    },
    schedule: a,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (h) => {
      s = h;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (h) => {
      r = h;
    },
    setScheduler: (h) => {
      n = h;
    }
  };
}
var Q = _s(), gt, Xe, fs = (Xe = class {
  constructor() {
    f(this, gt);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(), ye(this.gcTime) && o(this, gt, setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }
  updateGcTime(e) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      e ?? (Qt ? 1 / 0 : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    i(this, gt) && (clearTimeout(i(this, gt)), o(this, gt, void 0));
  }
}, gt = new WeakMap(), Xe), Tt, bt, _, Ot, q, $t, Rt, z, Y, Ze, Ns = (Ze = class extends fs {
  constructor(t) {
    super();
    f(this, z);
    f(this, Tt);
    f(this, bt);
    f(this, _);
    f(this, Ot);
    f(this, q);
    f(this, $t);
    f(this, Rt);
    o(this, Rt, !1), o(this, $t, t.defaultOptions), this.setOptions(t.options), this.observers = [], o(this, Ot, t.client), o(this, _, i(this, Ot).getQueryCache()), this.queryKey = t.queryKey, this.queryHash = t.queryHash, o(this, Tt, Gs(this.options)), this.state = t.state ?? i(this, Tt), this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    var t;
    return (t = i(this, q)) == null ? void 0 : t.promise;
  }
  setOptions(t) {
    this.options = { ...i(this, $t), ...t }, this.updateGcTime(this.options.gcTime);
  }
  optionalRemove() {
    !this.observers.length && this.state.fetchStatus === "idle" && i(this, _).remove(this);
  }
  setData(t, s) {
    const r = ve(this.state.data, t, this.options);
    return m(this, z, Y).call(this, {
      data: r,
      type: "success",
      dataUpdatedAt: s == null ? void 0 : s.updatedAt,
      manual: s == null ? void 0 : s.manual
    }), r;
  }
  setState(t, s) {
    m(this, z, Y).call(this, { type: "setState", state: t, setStateOptions: s });
  }
  cancel(t) {
    var r, n;
    const s = (r = i(this, q)) == null ? void 0 : r.promise;
    return (n = i(this, q)) == null || n.cancel(t), s ? s.then(A).catch(A) : Promise.resolve();
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  reset() {
    this.destroy(), this.setState(i(this, Tt));
  }
  isActive() {
    return this.observers.some(
      (t) => B(t.options.enabled, this) !== !1
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === Ue || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStatic() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (t) => pt(t.options.staleTime, this) === "static"
    ) : !1;
  }
  isStale() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (t) => t.getCurrentResult().isStale
    ) : this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(t = 0) {
    return this.state.data === void 0 ? !0 : t === "static" ? !1 : this.state.isInvalidated ? !0 : !us(this.state.dataUpdatedAt, t);
  }
  onFocus() {
    var s;
    const t = this.observers.find((r) => r.shouldFetchOnWindowFocus());
    t == null || t.refetch({ cancelRefetch: !1 }), (s = i(this, q)) == null || s.continue();
  }
  onOnline() {
    var s;
    const t = this.observers.find((r) => r.shouldFetchOnReconnect());
    t == null || t.refetch({ cancelRefetch: !1 }), (s = i(this, q)) == null || s.continue();
  }
  addObserver(t) {
    this.observers.includes(t) || (this.observers.push(t), this.clearGcTimeout(), i(this, _).notify({ type: "observerAdded", query: this, observer: t }));
  }
  removeObserver(t) {
    this.observers.includes(t) && (this.observers = this.observers.filter((s) => s !== t), this.observers.length || (i(this, q) && (i(this, Rt) ? i(this, q).cancel({ revert: !0 }) : i(this, q).cancelRetry()), this.scheduleGc()), i(this, _).notify({ type: "observerRemoved", query: this, observer: t }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    this.state.isInvalidated || m(this, z, Y).call(this, { type: "invalidate" });
  }
  fetch(t, s) {
    var v, b, l;
    if (this.state.fetchStatus !== "idle") {
      if (this.state.data !== void 0 && (s != null && s.cancelRefetch))
        this.cancel({ silent: !0 });
      else if (i(this, q))
        return i(this, q).continueRetry(), i(this, q).promise;
    }
    if (t && this.setOptions(t), !this.options.queryFn) {
      const y = this.observers.find((g) => g.options.queryFn);
      y && this.setOptions(y.options);
    }
    const r = new AbortController(), n = (y) => {
      Object.defineProperty(y, "signal", {
        enumerable: !0,
        get: () => (o(this, Rt, !0), r.signal)
      });
    }, a = () => {
      const y = os(this.options, s), O = (() => {
        const d = {
          client: i(this, Ot),
          queryKey: this.queryKey,
          meta: this.meta
        };
        return n(d), d;
      })();
      return o(this, Rt, !1), this.options.persister ? this.options.persister(
        y,
        O,
        this
      ) : y(O);
    }, h = (() => {
      const y = {
        fetchOptions: s,
        options: this.options,
        queryKey: this.queryKey,
        client: i(this, Ot),
        state: this.state,
        fetchFn: a
      };
      return n(y), y;
    })();
    (v = this.options.behavior) == null || v.onFetch(h, this), o(this, bt, this.state), (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((b = h.fetchOptions) == null ? void 0 : b.meta)) && m(this, z, Y).call(this, { type: "fetch", meta: (l = h.fetchOptions) == null ? void 0 : l.meta });
    const c = (y) => {
      var g, O, d, p;
      fe(y) && y.silent || m(this, z, Y).call(this, {
        type: "error",
        error: y
      }), fe(y) || ((O = (g = i(this, _).config).onError) == null || O.call(
        g,
        y,
        this
      ), (p = (d = i(this, _).config).onSettled) == null || p.call(
        d,
        this.state.data,
        y,
        this
      )), this.scheduleGc();
    };
    return o(this, q, ds({
      initialPromise: s == null ? void 0 : s.initialPromise,
      fn: h.fetchFn,
      abort: r.abort.bind(r),
      onSuccess: (y) => {
        var g, O, d, p;
        if (y === void 0) {
          c(new Error(`${this.queryHash} data is undefined`));
          return;
        }
        try {
          this.setData(y);
        } catch (R) {
          c(R);
          return;
        }
        (O = (g = i(this, _).config).onSuccess) == null || O.call(g, y, this), (p = (d = i(this, _).config).onSettled) == null || p.call(
          d,
          y,
          this.state.error,
          this
        ), this.scheduleGc();
      },
      onError: c,
      onFail: (y, g) => {
        m(this, z, Y).call(this, { type: "failed", failureCount: y, error: g });
      },
      onPause: () => {
        m(this, z, Y).call(this, { type: "pause" });
      },
      onContinue: () => {
        m(this, z, Y).call(this, { type: "continue" });
      },
      retry: h.options.retry,
      retryDelay: h.options.retryDelay,
      networkMode: h.options.networkMode,
      canRun: () => !0
    })), i(this, q).start();
  }
}, Tt = new WeakMap(), bt = new WeakMap(), _ = new WeakMap(), Ot = new WeakMap(), q = new WeakMap(), $t = new WeakMap(), Rt = new WeakMap(), z = new WeakSet(), Y = function(t) {
  const s = (r) => {
    switch (t.type) {
      case "failed":
        return {
          ...r,
          fetchFailureCount: t.failureCount,
          fetchFailureReason: t.error
        };
      case "pause":
        return {
          ...r,
          fetchStatus: "paused"
        };
      case "continue":
        return {
          ...r,
          fetchStatus: "fetching"
        };
      case "fetch":
        return {
          ...r,
          ...ys(r.data, this.options),
          fetchMeta: t.meta ?? null
        };
      case "success":
        return o(this, bt, void 0), {
          ...r,
          data: t.data,
          dataUpdateCount: r.dataUpdateCount + 1,
          dataUpdatedAt: t.dataUpdatedAt ?? Date.now(),
          error: null,
          isInvalidated: !1,
          status: "success",
          ...!t.manual && {
            fetchStatus: "idle",
            fetchFailureCount: 0,
            fetchFailureReason: null
          }
        };
      case "error":
        const n = t.error;
        return fe(n) && n.revert && i(this, bt) ? { ...i(this, bt), fetchStatus: "idle" } : {
          ...r,
          error: n,
          errorUpdateCount: r.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: r.fetchFailureCount + 1,
          fetchFailureReason: n,
          fetchStatus: "idle",
          status: "error"
        };
      case "invalidate":
        return {
          ...r,
          isInvalidated: !0
        };
      case "setState":
        return {
          ...r,
          ...t.state
        };
    }
  };
  this.state = s(this.state), Q.batch(() => {
    this.observers.forEach((r) => {
      r.onQueryUpdate();
    }), i(this, _).notify({ query: this, type: "updated", action: t });
  });
}, Ze);
function ys(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: cs(t.networkMode) ? "fetching" : "paused",
    ...e === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function Gs(e) {
  const t = typeof e.initialData == "function" ? e.initialData() : e.initialData, s = t !== void 0, r = s ? typeof e.initialDataUpdatedAt == "function" ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: s ? r ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: s ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var V, ts, Bs = (ts = class extends Ft {
  constructor(t = {}) {
    super();
    f(this, V);
    this.config = t, o(this, V, /* @__PURE__ */ new Map());
  }
  build(t, s, r) {
    const n = s.queryKey, a = s.queryHash ?? qe(n, s);
    let u = this.get(a);
    return u || (u = new Ns({
      client: t,
      queryKey: n,
      queryHash: a,
      options: t.defaultQueryOptions(s),
      state: r,
      defaultOptions: t.getQueryDefaults(n)
    }), this.add(u)), u;
  }
  add(t) {
    i(this, V).has(t.queryHash) || (i(this, V).set(t.queryHash, t), this.notify({
      type: "added",
      query: t
    }));
  }
  remove(t) {
    const s = i(this, V).get(t.queryHash);
    s && (t.destroy(), s === t && i(this, V).delete(t.queryHash), this.notify({ type: "removed", query: t }));
  }
  clear() {
    Q.batch(() => {
      this.getAll().forEach((t) => {
        this.remove(t);
      });
    });
  }
  get(t) {
    return i(this, V).get(t);
  }
  getAll() {
    return [...i(this, V).values()];
  }
  find(t) {
    const s = { exact: !0, ...t };
    return this.getAll().find(
      (r) => He(s, r)
    );
  }
  findAll(t = {}) {
    const s = this.getAll();
    return Object.keys(t).length > 0 ? s.filter((r) => He(t, r)) : s;
  }
  notify(t) {
    Q.batch(() => {
      this.listeners.forEach((s) => {
        s(t);
      });
    });
  }
  onFocus() {
    Q.batch(() => {
      this.getAll().forEach((t) => {
        t.onFocus();
      });
    });
  }
  onOnline() {
    Q.batch(() => {
      this.getAll().forEach((t) => {
        t.onOnline();
      });
    });
  }
}, V = new WeakMap(), ts), J, k, Ct, W, rt, es, zs = (es = class extends fs {
  constructor(t) {
    super();
    f(this, W);
    f(this, J);
    f(this, k);
    f(this, Ct);
    this.mutationId = t.mutationId, o(this, k, t.mutationCache), o(this, J, []), this.state = t.state || ps(), this.setOptions(t.options), this.scheduleGc();
  }
  setOptions(t) {
    this.options = t, this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(t) {
    i(this, J).includes(t) || (i(this, J).push(t), this.clearGcTimeout(), i(this, k).notify({
      type: "observerAdded",
      mutation: this,
      observer: t
    }));
  }
  removeObserver(t) {
    o(this, J, i(this, J).filter((s) => s !== t)), this.scheduleGc(), i(this, k).notify({
      type: "observerRemoved",
      mutation: this,
      observer: t
    });
  }
  optionalRemove() {
    i(this, J).length || (this.state.status === "pending" ? this.scheduleGc() : i(this, k).remove(this));
  }
  continue() {
    var t;
    return ((t = i(this, Ct)) == null ? void 0 : t.continue()) ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(t) {
    var a, u, h, c, v, b, l, y, g, O, d, p, R, E, C, x, U, L, st, T;
    const s = () => {
      m(this, W, rt).call(this, { type: "continue" });
    };
    o(this, Ct, ds({
      fn: () => this.options.mutationFn ? this.options.mutationFn(t) : Promise.reject(new Error("No mutationFn found")),
      onFail: (F, M) => {
        m(this, W, rt).call(this, { type: "failed", failureCount: F, error: M });
      },
      onPause: () => {
        m(this, W, rt).call(this, { type: "pause" });
      },
      onContinue: s,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => i(this, k).canRun(this)
    }));
    const r = this.state.status === "pending", n = !i(this, Ct).canStart();
    try {
      if (r)
        s();
      else {
        m(this, W, rt).call(this, { type: "pending", variables: t, isPaused: n }), await ((u = (a = i(this, k).config).onMutate) == null ? void 0 : u.call(
          a,
          t,
          this
        ));
        const M = await ((c = (h = this.options).onMutate) == null ? void 0 : c.call(h, t));
        M !== this.state.context && m(this, W, rt).call(this, {
          type: "pending",
          context: M,
          variables: t,
          isPaused: n
        });
      }
      const F = await i(this, Ct).start();
      return await ((b = (v = i(this, k).config).onSuccess) == null ? void 0 : b.call(
        v,
        F,
        t,
        this.state.context,
        this
      )), await ((y = (l = this.options).onSuccess) == null ? void 0 : y.call(l, F, t, this.state.context)), await ((O = (g = i(this, k).config).onSettled) == null ? void 0 : O.call(
        g,
        F,
        null,
        this.state.variables,
        this.state.context,
        this
      )), await ((p = (d = this.options).onSettled) == null ? void 0 : p.call(d, F, null, t, this.state.context)), m(this, W, rt).call(this, { type: "success", data: F }), F;
    } catch (F) {
      try {
        throw await ((E = (R = i(this, k).config).onError) == null ? void 0 : E.call(
          R,
          F,
          t,
          this.state.context,
          this
        )), await ((x = (C = this.options).onError) == null ? void 0 : x.call(
          C,
          F,
          t,
          this.state.context
        )), await ((L = (U = i(this, k).config).onSettled) == null ? void 0 : L.call(
          U,
          void 0,
          F,
          this.state.variables,
          this.state.context,
          this
        )), await ((T = (st = this.options).onSettled) == null ? void 0 : T.call(
          st,
          void 0,
          F,
          t,
          this.state.context
        )), F;
      } finally {
        m(this, W, rt).call(this, { type: "error", error: F });
      }
    } finally {
      i(this, k).runNext(this);
    }
  }
}, J = new WeakMap(), k = new WeakMap(), Ct = new WeakMap(), W = new WeakSet(), rt = function(t) {
  const s = (r) => {
    switch (t.type) {
      case "failed":
        return {
          ...r,
          failureCount: t.failureCount,
          failureReason: t.error
        };
      case "pause":
        return {
          ...r,
          isPaused: !0
        };
      case "continue":
        return {
          ...r,
          isPaused: !1
        };
      case "pending":
        return {
          ...r,
          context: t.context,
          data: void 0,
          failureCount: 0,
          failureReason: null,
          error: null,
          isPaused: t.isPaused,
          status: "pending",
          variables: t.variables,
          submittedAt: Date.now()
        };
      case "success":
        return {
          ...r,
          data: t.data,
          failureCount: 0,
          failureReason: null,
          error: null,
          status: "success",
          isPaused: !1
        };
      case "error":
        return {
          ...r,
          data: void 0,
          error: t.error,
          failureCount: r.failureCount + 1,
          failureReason: t.error,
          isPaused: !1,
          status: "error"
        };
    }
  };
  this.state = s(this.state), Q.batch(() => {
    i(this, J).forEach((r) => {
      r.onMutationUpdate(t);
    }), i(this, k).notify({
      mutation: this,
      type: "updated",
      action: t
    });
  });
}, es);
function ps() {
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
var X, $, Vt, ss, $s = (ss = class extends Ft {
  constructor(t = {}) {
    super();
    f(this, X);
    f(this, $);
    f(this, Vt);
    this.config = t, o(this, X, /* @__PURE__ */ new Set()), o(this, $, /* @__PURE__ */ new Map()), o(this, Vt, 0);
  }
  build(t, s, r) {
    const n = new zs({
      mutationCache: this,
      mutationId: ++se(this, Vt)._,
      options: t.defaultMutationOptions(s),
      state: r
    });
    return this.add(n), n;
  }
  add(t) {
    i(this, X).add(t);
    const s = re(t);
    if (typeof s == "string") {
      const r = i(this, $).get(s);
      r ? r.push(t) : i(this, $).set(s, [t]);
    }
    this.notify({ type: "added", mutation: t });
  }
  remove(t) {
    if (i(this, X).delete(t)) {
      const s = re(t);
      if (typeof s == "string") {
        const r = i(this, $).get(s);
        if (r)
          if (r.length > 1) {
            const n = r.indexOf(t);
            n !== -1 && r.splice(n, 1);
          } else r[0] === t && i(this, $).delete(s);
      }
    }
    this.notify({ type: "removed", mutation: t });
  }
  canRun(t) {
    const s = re(t);
    if (typeof s == "string") {
      const r = i(this, $).get(s), n = r == null ? void 0 : r.find(
        (a) => a.state.status === "pending"
      );
      return !n || n === t;
    } else
      return !0;
  }
  runNext(t) {
    var r;
    const s = re(t);
    if (typeof s == "string") {
      const n = (r = i(this, $).get(s)) == null ? void 0 : r.find((a) => a !== t && a.state.isPaused);
      return (n == null ? void 0 : n.continue()) ?? Promise.resolve();
    } else
      return Promise.resolve();
  }
  clear() {
    Q.batch(() => {
      i(this, X).forEach((t) => {
        this.notify({ type: "removed", mutation: t });
      }), i(this, X).clear(), i(this, $).clear();
    });
  }
  getAll() {
    return Array.from(i(this, X));
  }
  find(t) {
    const s = { exact: !0, ...t };
    return this.getAll().find(
      (r) => _e(s, r)
    );
  }
  findAll(t = {}) {
    return this.getAll().filter((s) => _e(t, s));
  }
  notify(t) {
    Q.batch(() => {
      this.listeners.forEach((s) => {
        s(t);
      });
    });
  }
  resumePausedMutations() {
    const t = this.getAll().filter((s) => s.state.isPaused);
    return Q.batch(
      () => Promise.all(
        t.map((s) => s.continue().catch(A))
      )
    );
  }
}, X = new WeakMap(), $ = new WeakMap(), Vt = new WeakMap(), ss);
function re(e) {
  var t;
  return (t = e.options.scope) == null ? void 0 : t.id;
}
function ue(e) {
  return {
    onFetch: (t, s) => {
      var b, l, y, g, O;
      const r = t.options, n = (y = (l = (b = t.fetchOptions) == null ? void 0 : b.meta) == null ? void 0 : l.fetchMore) == null ? void 0 : y.direction, a = ((g = t.state.data) == null ? void 0 : g.pages) || [], u = ((O = t.state.data) == null ? void 0 : O.pageParams) || [];
      let h = { pages: [], pageParams: [] }, c = 0;
      const v = async () => {
        let d = !1;
        const p = (C) => {
          Object.defineProperty(C, "signal", {
            enumerable: !0,
            get: () => (t.signal.aborted ? d = !0 : t.signal.addEventListener("abort", () => {
              d = !0;
            }), t.signal)
          });
        }, R = os(t.options, t.fetchOptions), E = async (C, x, U) => {
          if (d)
            return Promise.reject();
          if (x == null && C.pages.length)
            return Promise.resolve(C);
          const st = (() => {
            const vt = {
              client: t.client,
              queryKey: t.queryKey,
              pageParam: x,
              direction: U ? "backward" : "forward",
              meta: t.options.meta
            };
            return p(vt), vt;
          })(), T = await R(st), { maxPages: F } = t.options, M = U ? Us : me;
          return {
            pages: M(C.pages, T, F),
            pageParams: M(C.pageParams, x, F)
          };
        };
        if (n && a.length) {
          const C = n === "backward", x = C ? vs : be, U = {
            pages: a,
            pageParams: u
          }, L = x(r, U);
          h = await E(U, L, C);
        } else {
          const C = e ?? a.length;
          do {
            const x = c === 0 ? u[0] ?? r.initialPageParam : be(r, h);
            if (c > 0 && x == null)
              break;
            h = await E(h, x), c++;
          } while (c < C);
        }
        return h;
      };
      t.options.persister ? t.fetchFn = () => {
        var d, p;
        return (p = (d = t.options).persister) == null ? void 0 : p.call(
          d,
          v,
          {
            client: t.client,
            queryKey: t.queryKey,
            meta: t.options.meta,
            signal: t.signal
          },
          s
        );
      } : t.fetchFn = v;
    }
  };
}
function be(e, { pages: t, pageParams: s }) {
  const r = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(
    t[r],
    t,
    s[r],
    s
  ) : void 0;
}
function vs(e, { pages: t, pageParams: s }) {
  var r;
  return t.length > 0 ? (r = e.getPreviousPageParam) == null ? void 0 : r.call(e, t[0], t, s[0], s) : void 0;
}
function Vs(e, t) {
  return t ? be(e, t) != null : !1;
}
function Js(e, t) {
  return !t || !e.getPreviousPageParam ? !1 : vs(e, t) != null;
}
var D, at, ut, It, qt, ot, Ut, kt, rs, fr = (rs = class {
  constructor(e = {}) {
    f(this, D);
    f(this, at);
    f(this, ut);
    f(this, It);
    f(this, qt);
    f(this, ot);
    f(this, Ut);
    f(this, kt);
    o(this, D, e.queryCache || new Bs()), o(this, at, e.mutationCache || new $s()), o(this, ut, e.defaultOptions || {}), o(this, It, /* @__PURE__ */ new Map()), o(this, qt, /* @__PURE__ */ new Map()), o(this, ot, 0);
  }
  mount() {
    se(this, ot)._++, i(this, ot) === 1 && (o(this, Ut, ke.subscribe(async (e) => {
      e && (await this.resumePausedMutations(), i(this, D).onFocus());
    })), o(this, kt, ae.subscribe(async (e) => {
      e && (await this.resumePausedMutations(), i(this, D).onOnline());
    })));
  }
  unmount() {
    var e, t;
    se(this, ot)._--, i(this, ot) === 0 && ((e = i(this, Ut)) == null || e.call(this), o(this, Ut, void 0), (t = i(this, kt)) == null || t.call(this), o(this, kt, void 0));
  }
  isFetching(e) {
    return i(this, D).findAll({ ...e, fetchStatus: "fetching" }).length;
  }
  isMutating(e) {
    return i(this, at).findAll({ ...e, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(e) {
    var s;
    const t = this.defaultQueryOptions({ queryKey: e });
    return (s = i(this, D).get(t.queryHash)) == null ? void 0 : s.state.data;
  }
  ensureQueryData(e) {
    const t = this.defaultQueryOptions(e), s = i(this, D).build(this, t), r = s.state.data;
    return r === void 0 ? this.fetchQuery(e) : (e.revalidateIfStale && s.isStaleByTime(pt(t.staleTime, s)) && this.prefetchQuery(t), Promise.resolve(r));
  }
  getQueriesData(e) {
    return i(this, D).findAll(e).map(({ queryKey: t, state: s }) => {
      const r = s.data;
      return [t, r];
    });
  }
  setQueryData(e, t, s) {
    const r = this.defaultQueryOptions({ queryKey: e }), n = i(this, D).get(
      r.queryHash
    ), a = n == null ? void 0 : n.state.data, u = Is(t, a);
    if (u !== void 0)
      return i(this, D).build(this, r).setData(u, { ...s, manual: !0 });
  }
  setQueriesData(e, t, s) {
    return Q.batch(
      () => i(this, D).findAll(e).map(({ queryKey: r }) => [
        r,
        this.setQueryData(r, t, s)
      ])
    );
  }
  getQueryState(e) {
    var s;
    const t = this.defaultQueryOptions({ queryKey: e });
    return (s = i(this, D).get(
      t.queryHash
    )) == null ? void 0 : s.state;
  }
  removeQueries(e) {
    const t = i(this, D);
    Q.batch(() => {
      t.findAll(e).forEach((s) => {
        t.remove(s);
      });
    });
  }
  resetQueries(e, t) {
    const s = i(this, D);
    return Q.batch(() => (s.findAll(e).forEach((r) => {
      r.reset();
    }), this.refetchQueries(
      {
        type: "active",
        ...e
      },
      t
    )));
  }
  cancelQueries(e, t = {}) {
    const s = { revert: !0, ...t }, r = Q.batch(
      () => i(this, D).findAll(e).map((n) => n.cancel(s))
    );
    return Promise.all(r).then(A).catch(A);
  }
  invalidateQueries(e, t = {}) {
    return Q.batch(() => (i(this, D).findAll(e).forEach((s) => {
      s.invalidate();
    }), (e == null ? void 0 : e.refetchType) === "none" ? Promise.resolve() : this.refetchQueries(
      {
        ...e,
        type: (e == null ? void 0 : e.refetchType) ?? (e == null ? void 0 : e.type) ?? "active"
      },
      t
    )));
  }
  refetchQueries(e, t = {}) {
    const s = {
      ...t,
      cancelRefetch: t.cancelRefetch ?? !0
    }, r = Q.batch(
      () => i(this, D).findAll(e).filter((n) => !n.isDisabled() && !n.isStatic()).map((n) => {
        let a = n.fetch(void 0, s);
        return s.throwOnError || (a = a.catch(A)), n.state.fetchStatus === "paused" ? Promise.resolve() : a;
      })
    );
    return Promise.all(r).then(A);
  }
  fetchQuery(e) {
    const t = this.defaultQueryOptions(e);
    t.retry === void 0 && (t.retry = !1);
    const s = i(this, D).build(this, t);
    return s.isStaleByTime(
      pt(t.staleTime, s)
    ) ? s.fetch(t) : Promise.resolve(s.state.data);
  }
  prefetchQuery(e) {
    return this.fetchQuery(e).then(A).catch(A);
  }
  fetchInfiniteQuery(e) {
    return e.behavior = ue(e.pages), this.fetchQuery(e);
  }
  prefetchInfiniteQuery(e) {
    return this.fetchInfiniteQuery(e).then(A).catch(A);
  }
  ensureInfiniteQueryData(e) {
    return e.behavior = ue(e.pages), this.ensureQueryData(e);
  }
  resumePausedMutations() {
    return ae.isOnline() ? i(this, at).resumePausedMutations() : Promise.resolve();
  }
  getQueryCache() {
    return i(this, D);
  }
  getMutationCache() {
    return i(this, at);
  }
  getDefaultOptions() {
    return i(this, ut);
  }
  setDefaultOptions(e) {
    o(this, ut, e);
  }
  setQueryDefaults(e, t) {
    i(this, It).set(Et(e), {
      queryKey: e,
      defaultOptions: t
    });
  }
  getQueryDefaults(e) {
    const t = [...i(this, It).values()], s = {};
    return t.forEach((r) => {
      zt(e, r.queryKey) && Object.assign(s, r.defaultOptions);
    }), s;
  }
  setMutationDefaults(e, t) {
    i(this, qt).set(Et(e), {
      mutationKey: e,
      defaultOptions: t
    });
  }
  getMutationDefaults(e) {
    const t = [...i(this, qt).values()], s = {};
    return t.forEach((r) => {
      zt(e, r.mutationKey) && Object.assign(s, r.defaultOptions);
    }), s;
  }
  defaultQueryOptions(e) {
    if (e._defaulted)
      return e;
    const t = {
      ...i(this, ut).queries,
      ...this.getQueryDefaults(e.queryKey),
      ...e,
      _defaulted: !0
    };
    return t.queryHash || (t.queryHash = qe(
      t.queryKey,
      t
    )), t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== "always"), t.throwOnError === void 0 && (t.throwOnError = !!t.suspense), !t.networkMode && t.persister && (t.networkMode = "offlineFirst"), t.queryFn === Ue && (t.enabled = !1), t;
  }
  defaultMutationOptions(e) {
    return e != null && e._defaulted ? e : {
      ...i(this, ut).mutations,
      ...(e == null ? void 0 : e.mutationKey) && this.getMutationDefaults(e.mutationKey),
      ...e,
      _defaulted: !0
    };
  }
  clear() {
    i(this, D).clear(), i(this, at).clear();
  }
}, D = new WeakMap(), at = new WeakMap(), ut = new WeakMap(), It = new WeakMap(), qt = new WeakMap(), ot = new WeakMap(), Ut = new WeakMap(), kt = new WeakMap(), rs), K, w, Jt, j, wt, jt, ht, ct, Wt, Lt, Kt, Pt, St, lt, Ht, S, Bt, Oe, Re, Ce, we, Pe, Se, Qe, ms, is, te = (is = class extends Ft {
  constructor(t, s) {
    super();
    f(this, S);
    f(this, K);
    f(this, w);
    f(this, Jt);
    f(this, j);
    f(this, wt);
    f(this, jt);
    f(this, ht);
    f(this, ct);
    f(this, Wt);
    f(this, Lt);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    f(this, Kt);
    f(this, Pt);
    f(this, St);
    f(this, lt);
    f(this, Ht, /* @__PURE__ */ new Set());
    this.options = s, o(this, K, t), o(this, ct, null), o(this, ht, ge()), this.options.experimental_prefetchInRender || i(this, ht).reject(
      new Error("experimental_prefetchInRender feature flag is not enabled")
    ), this.bindMethods(), this.setOptions(s);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 && (i(this, w).addObserver(this), Be(i(this, w), this.options) ? m(this, S, Bt).call(this) : this.updateResult(), m(this, S, we).call(this));
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return Ee(
      i(this, w),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return Ee(
      i(this, w),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), m(this, S, Pe).call(this), m(this, S, Se).call(this), i(this, w).removeObserver(this);
  }
  setOptions(t) {
    const s = this.options, r = i(this, w);
    if (this.options = i(this, K).defaultQueryOptions(t), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof B(this.options.enabled, i(this, w)) != "boolean")
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    m(this, S, Qe).call(this), i(this, w).setOptions(this.options), s._defaulted && !ne(this.options, s) && i(this, K).getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: i(this, w),
      observer: this
    });
    const n = this.hasListeners();
    n && ze(
      i(this, w),
      r,
      this.options,
      s
    ) && m(this, S, Bt).call(this), this.updateResult(), n && (i(this, w) !== r || B(this.options.enabled, i(this, w)) !== B(s.enabled, i(this, w)) || pt(this.options.staleTime, i(this, w)) !== pt(s.staleTime, i(this, w))) && m(this, S, Oe).call(this);
    const a = m(this, S, Re).call(this);
    n && (i(this, w) !== r || B(this.options.enabled, i(this, w)) !== B(s.enabled, i(this, w)) || a !== i(this, lt)) && m(this, S, Ce).call(this, a);
  }
  getOptimisticResult(t) {
    const s = i(this, K).getQueryCache().build(i(this, K), t), r = this.createResult(s, t);
    return Ys(this, r) && (o(this, j, r), o(this, jt, this.options), o(this, wt, i(this, w).state)), r;
  }
  getCurrentResult() {
    return i(this, j);
  }
  trackResult(t, s) {
    return new Proxy(t, {
      get: (r, n) => (this.trackProp(n), s == null || s(n), Reflect.get(r, n))
    });
  }
  trackProp(t) {
    i(this, Ht).add(t);
  }
  getCurrentQuery() {
    return i(this, w);
  }
  refetch({ ...t } = {}) {
    return this.fetch({
      ...t
    });
  }
  fetchOptimistic(t) {
    const s = i(this, K).defaultQueryOptions(t), r = i(this, K).getQueryCache().build(i(this, K), s);
    return r.fetch().then(() => this.createResult(r, s));
  }
  fetch(t) {
    return m(this, S, Bt).call(this, {
      ...t,
      cancelRefetch: t.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), i(this, j)));
  }
  createResult(t, s) {
    var F;
    const r = i(this, w), n = this.options, a = i(this, j), u = i(this, wt), h = i(this, jt), v = t !== r ? t.state : i(this, Jt), { state: b } = t;
    let l = { ...b }, y = !1, g;
    if (s._optimisticResults) {
      const M = this.hasListeners(), vt = !M && Be(t, s), Mt = M && ze(t, r, s, n);
      (vt || Mt) && (l = {
        ...l,
        ...ys(b.data, t.options)
      }), s._optimisticResults === "isRestoring" && (l.fetchStatus = "idle");
    }
    let { error: O, errorUpdatedAt: d, status: p } = l;
    g = l.data;
    let R = !1;
    if (s.placeholderData !== void 0 && g === void 0 && p === "pending") {
      let M;
      a != null && a.isPlaceholderData && s.placeholderData === (h == null ? void 0 : h.placeholderData) ? (M = a.data, R = !0) : M = typeof s.placeholderData == "function" ? s.placeholderData(
        (F = i(this, Kt)) == null ? void 0 : F.state.data,
        i(this, Kt)
      ) : s.placeholderData, M !== void 0 && (p = "success", g = ve(
        a == null ? void 0 : a.data,
        M,
        s
      ), y = !0);
    }
    if (s.select && g !== void 0 && !R)
      if (a && g === (u == null ? void 0 : u.data) && s.select === i(this, Wt))
        g = i(this, Lt);
      else
        try {
          o(this, Wt, s.select), g = s.select(g), g = ve(a == null ? void 0 : a.data, g, s), o(this, Lt, g), o(this, ct, null);
        } catch (M) {
          o(this, ct, M);
        }
    i(this, ct) && (O = i(this, ct), g = i(this, Lt), d = Date.now(), p = "error");
    const E = l.fetchStatus === "fetching", C = p === "pending", x = p === "error", U = C && E, L = g !== void 0, T = {
      status: p,
      fetchStatus: l.fetchStatus,
      isPending: C,
      isSuccess: p === "success",
      isError: x,
      isInitialLoading: U,
      isLoading: U,
      data: g,
      dataUpdatedAt: l.dataUpdatedAt,
      error: O,
      errorUpdatedAt: d,
      failureCount: l.fetchFailureCount,
      failureReason: l.fetchFailureReason,
      errorUpdateCount: l.errorUpdateCount,
      isFetched: l.dataUpdateCount > 0 || l.errorUpdateCount > 0,
      isFetchedAfterMount: l.dataUpdateCount > v.dataUpdateCount || l.errorUpdateCount > v.errorUpdateCount,
      isFetching: E,
      isRefetching: E && !C,
      isLoadingError: x && !L,
      isPaused: l.fetchStatus === "paused",
      isPlaceholderData: y,
      isRefetchError: x && L,
      isStale: je(t, s),
      refetch: this.refetch,
      promise: i(this, ht),
      isEnabled: B(s.enabled, t) !== !1
    };
    if (this.options.experimental_prefetchInRender) {
      const M = (ee) => {
        T.status === "error" ? ee.reject(T.error) : T.data !== void 0 && ee.resolve(T.data);
      }, vt = () => {
        const ee = o(this, ht, T.promise = ge());
        M(ee);
      }, Mt = i(this, ht);
      switch (Mt.status) {
        case "pending":
          t.queryHash === r.queryHash && M(Mt);
          break;
        case "fulfilled":
          (T.status === "error" || T.data !== Mt.value) && vt();
          break;
        case "rejected":
          (T.status !== "error" || T.error !== Mt.reason) && vt();
          break;
      }
    }
    return T;
  }
  updateResult() {
    const t = i(this, j), s = this.createResult(i(this, w), this.options);
    if (o(this, wt, i(this, w).state), o(this, jt, this.options), i(this, wt).data !== void 0 && o(this, Kt, i(this, w)), ne(s, t))
      return;
    o(this, j, s);
    const r = () => {
      if (!t)
        return !0;
      const { notifyOnChangeProps: n } = this.options, a = typeof n == "function" ? n() : n;
      if (a === "all" || !a && !i(this, Ht).size)
        return !0;
      const u = new Set(
        a ?? i(this, Ht)
      );
      return this.options.throwOnError && u.add("error"), Object.keys(i(this, j)).some((h) => {
        const c = h;
        return i(this, j)[c] !== t[c] && u.has(c);
      });
    };
    m(this, S, ms).call(this, { listeners: r() });
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && m(this, S, we).call(this);
  }
}, K = new WeakMap(), w = new WeakMap(), Jt = new WeakMap(), j = new WeakMap(), wt = new WeakMap(), jt = new WeakMap(), ht = new WeakMap(), ct = new WeakMap(), Wt = new WeakMap(), Lt = new WeakMap(), Kt = new WeakMap(), Pt = new WeakMap(), St = new WeakMap(), lt = new WeakMap(), Ht = new WeakMap(), S = new WeakSet(), Bt = function(t) {
  m(this, S, Qe).call(this);
  let s = i(this, w).fetch(
    this.options,
    t
  );
  return t != null && t.throwOnError || (s = s.catch(A)), s;
}, Oe = function() {
  m(this, S, Pe).call(this);
  const t = pt(
    this.options.staleTime,
    i(this, w)
  );
  if (Qt || i(this, j).isStale || !ye(t))
    return;
  const r = us(i(this, j).dataUpdatedAt, t) + 1;
  o(this, Pt, setTimeout(() => {
    i(this, j).isStale || this.updateResult();
  }, r));
}, Re = function() {
  return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(i(this, w)) : this.options.refetchInterval) ?? !1;
}, Ce = function(t) {
  m(this, S, Se).call(this), o(this, lt, t), !(Qt || B(this.options.enabled, i(this, w)) === !1 || !ye(i(this, lt)) || i(this, lt) === 0) && o(this, St, setInterval(() => {
    (this.options.refetchIntervalInBackground || ke.isFocused()) && m(this, S, Bt).call(this);
  }, i(this, lt)));
}, we = function() {
  m(this, S, Oe).call(this), m(this, S, Ce).call(this, m(this, S, Re).call(this));
}, Pe = function() {
  i(this, Pt) && (clearTimeout(i(this, Pt)), o(this, Pt, void 0));
}, Se = function() {
  i(this, St) && (clearInterval(i(this, St)), o(this, St, void 0));
}, Qe = function() {
  const t = i(this, K).getQueryCache().build(i(this, K), this.options);
  if (t === i(this, w))
    return;
  const s = i(this, w);
  o(this, w, t), o(this, Jt, t.state), this.hasListeners() && (s == null || s.removeObserver(this), t.addObserver(this));
}, ms = function(t) {
  Q.batch(() => {
    t.listeners && this.listeners.forEach((s) => {
      s(i(this, j));
    }), i(this, K).getQueryCache().notify({
      query: i(this, w),
      type: "observerResultsUpdated"
    });
  });
}, is);
function Ws(e, t) {
  return B(t.enabled, e) !== !1 && e.state.data === void 0 && !(e.state.status === "error" && t.retryOnMount === !1);
}
function Be(e, t) {
  return Ws(e, t) || e.state.data !== void 0 && Ee(e, t, t.refetchOnMount);
}
function Ee(e, t, s) {
  if (B(t.enabled, e) !== !1 && pt(t.staleTime, e) !== "static") {
    const r = typeof s == "function" ? s(e) : s;
    return r === "always" || r !== !1 && je(e, t);
  }
  return !1;
}
function ze(e, t, s, r) {
  return (e !== t || B(r.enabled, e) === !1) && (!s.suspense || e.state.status !== "error") && je(e, s);
}
function je(e, t) {
  return B(t.enabled, e) !== !1 && e.isStaleByTime(pt(t.staleTime, e));
}
function Ys(e, t) {
  return !ne(e.getCurrentResult(), t);
}
function $e(e, t) {
  const s = new Set(t);
  return e.filter((r) => !s.has(r));
}
function Xs(e, t, s) {
  const r = e.slice(0);
  return r[t] = s, r;
}
var _t, N, Nt, Gt, G, dt, Yt, Xt, Zt, I, Fe, Me, De, xe, Ae, ns, Zs = (ns = class extends Ft {
  constructor(t, s, r) {
    super();
    f(this, I);
    f(this, _t);
    f(this, N);
    f(this, Nt);
    f(this, Gt);
    f(this, G);
    f(this, dt);
    f(this, Yt);
    f(this, Xt);
    f(this, Zt, []);
    o(this, _t, t), o(this, Gt, r), o(this, Nt, []), o(this, G, []), o(this, N, []), this.setQueries(s);
  }
  onSubscribe() {
    this.listeners.size === 1 && i(this, G).forEach((t) => {
      t.subscribe((s) => {
        m(this, I, xe).call(this, t, s);
      });
    });
  }
  onUnsubscribe() {
    this.listeners.size || this.destroy();
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), i(this, G).forEach((t) => {
      t.destroy();
    });
  }
  setQueries(t, s) {
    o(this, Nt, t), o(this, Gt, s), Q.batch(() => {
      const r = i(this, G), n = m(this, I, De).call(this, i(this, Nt));
      o(this, Zt, n), n.forEach(
        (c) => c.observer.setOptions(c.defaultedQueryOptions)
      );
      const a = n.map((c) => c.observer), u = a.map(
        (c) => c.getCurrentResult()
      ), h = a.some(
        (c, v) => c !== r[v]
      );
      r.length === a.length && !h || (o(this, G, a), o(this, N, u), this.hasListeners() && ($e(r, a).forEach((c) => {
        c.destroy();
      }), $e(a, r).forEach((c) => {
        c.subscribe((v) => {
          m(this, I, xe).call(this, c, v);
        });
      }), m(this, I, Ae).call(this)));
    });
  }
  getCurrentResult() {
    return i(this, N);
  }
  getQueries() {
    return i(this, G).map((t) => t.getCurrentQuery());
  }
  getObservers() {
    return i(this, G);
  }
  getOptimisticResult(t, s) {
    const r = m(this, I, De).call(this, t), n = r.map(
      (a) => a.observer.getOptimisticResult(a.defaultedQueryOptions)
    );
    return [
      n,
      (a) => m(this, I, Me).call(this, a ?? n, s),
      () => m(this, I, Fe).call(this, n, r)
    ];
  }
}, _t = new WeakMap(), N = new WeakMap(), Nt = new WeakMap(), Gt = new WeakMap(), G = new WeakMap(), dt = new WeakMap(), Yt = new WeakMap(), Xt = new WeakMap(), Zt = new WeakMap(), I = new WeakSet(), Fe = function(t, s) {
  return s.map((r, n) => {
    const a = t[n];
    return r.defaultedQueryOptions.notifyOnChangeProps ? a : r.observer.trackResult(a, (u) => {
      s.forEach((h) => {
        h.observer.trackProp(u);
      });
    });
  });
}, Me = function(t, s) {
  return s ? ((!i(this, dt) || i(this, N) !== i(this, Xt) || s !== i(this, Yt)) && (o(this, Yt, s), o(this, Xt, i(this, N)), o(this, dt, he(
    i(this, dt),
    s(t)
  ))), i(this, dt)) : t;
}, De = function(t) {
  const s = new Map(
    i(this, G).map((n) => [n.options.queryHash, n])
  ), r = [];
  return t.forEach((n) => {
    const a = i(this, _t).defaultQueryOptions(n), u = s.get(a.queryHash);
    u ? r.push({
      defaultedQueryOptions: a,
      observer: u
    }) : r.push({
      defaultedQueryOptions: a,
      observer: new te(i(this, _t), a)
    });
  }), r;
}, xe = function(t, s) {
  const r = i(this, G).indexOf(t);
  r !== -1 && (o(this, N, Xs(i(this, N), r, s)), m(this, I, Ae).call(this));
}, Ae = function() {
  var t;
  if (this.hasListeners()) {
    const s = i(this, dt), r = m(this, I, Fe).call(this, i(this, N), i(this, Zt)), n = m(this, I, Me).call(this, r, (t = i(this, Gt)) == null ? void 0 : t.combine);
    s !== n && Q.batch(() => {
      this.listeners.forEach((a) => {
        a(i(this, N));
      });
    });
  }
}, ns), gs = class extends te {
  constructor(e, t) {
    super(e, t);
  }
  bindMethods() {
    super.bindMethods(), this.fetchNextPage = this.fetchNextPage.bind(this), this.fetchPreviousPage = this.fetchPreviousPage.bind(this);
  }
  setOptions(e) {
    super.setOptions({
      ...e,
      behavior: ue()
    });
  }
  getOptimisticResult(e) {
    return e.behavior = ue(), super.getOptimisticResult(e);
  }
  fetchNextPage(e) {
    return this.fetch({
      ...e,
      meta: {
        fetchMore: { direction: "forward" }
      }
    });
  }
  fetchPreviousPage(e) {
    return this.fetch({
      ...e,
      meta: {
        fetchMore: { direction: "backward" }
      }
    });
  }
  createResult(e, t) {
    var O, d;
    const { state: s } = e, r = super.createResult(e, t), { isFetching: n, isRefetching: a, isError: u, isRefetchError: h } = r, c = (d = (O = s.fetchMeta) == null ? void 0 : O.fetchMore) == null ? void 0 : d.direction, v = u && c === "forward", b = n && c === "forward", l = u && c === "backward", y = n && c === "backward";
    return {
      ...r,
      fetchNextPage: this.fetchNextPage,
      fetchPreviousPage: this.fetchPreviousPage,
      hasNextPage: Vs(t, s.data),
      hasPreviousPage: Js(t, s.data),
      isFetchNextPageError: v,
      isFetchingNextPage: b,
      isFetchPreviousPageError: l,
      isFetchingPreviousPage: y,
      isRefetchError: h && !v && !l,
      isRefetching: a && !b && !y
    };
  }
}, ft, yt, H, Z, tt, ie, Te, as, tr = (as = class extends Ft {
  constructor(t, s) {
    super();
    f(this, tt);
    f(this, ft);
    f(this, yt);
    f(this, H);
    f(this, Z);
    o(this, ft, t), this.setOptions(s), this.bindMethods(), m(this, tt, ie).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this), this.reset = this.reset.bind(this);
  }
  setOptions(t) {
    var r;
    const s = this.options;
    this.options = i(this, ft).defaultMutationOptions(t), ne(this.options, s) || i(this, ft).getMutationCache().notify({
      type: "observerOptionsUpdated",
      mutation: i(this, H),
      observer: this
    }), s != null && s.mutationKey && this.options.mutationKey && Et(s.mutationKey) !== Et(this.options.mutationKey) ? this.reset() : ((r = i(this, H)) == null ? void 0 : r.state.status) === "pending" && i(this, H).setOptions(this.options);
  }
  onUnsubscribe() {
    var t;
    this.hasListeners() || (t = i(this, H)) == null || t.removeObserver(this);
  }
  onMutationUpdate(t) {
    m(this, tt, ie).call(this), m(this, tt, Te).call(this, t);
  }
  getCurrentResult() {
    return i(this, yt);
  }
  reset() {
    var t;
    (t = i(this, H)) == null || t.removeObserver(this), o(this, H, void 0), m(this, tt, ie).call(this), m(this, tt, Te).call(this);
  }
  mutate(t, s) {
    var r;
    return o(this, Z, s), (r = i(this, H)) == null || r.removeObserver(this), o(this, H, i(this, ft).getMutationCache().build(i(this, ft), this.options)), i(this, H).addObserver(this), i(this, H).execute(t);
  }
}, ft = new WeakMap(), yt = new WeakMap(), H = new WeakMap(), Z = new WeakMap(), tt = new WeakSet(), ie = function() {
  var s;
  const t = ((s = i(this, H)) == null ? void 0 : s.state) ?? ps();
  o(this, yt, {
    ...t,
    isPending: t.status === "pending",
    isSuccess: t.status === "success",
    isError: t.status === "error",
    isIdle: t.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, Te = function(t) {
  Q.batch(() => {
    var s, r, n, a, u, h, c, v;
    if (i(this, Z) && this.hasListeners()) {
      const b = i(this, yt).variables, l = i(this, yt).context;
      (t == null ? void 0 : t.type) === "success" ? ((r = (s = i(this, Z)).onSuccess) == null || r.call(s, t.data, b, l), (a = (n = i(this, Z)).onSettled) == null || a.call(n, t.data, null, b, l)) : (t == null ? void 0 : t.type) === "error" && ((h = (u = i(this, Z)).onError) == null || h.call(u, t.error, b, l), (v = (c = i(this, Z)).onSettled) == null || v.call(
        c,
        void 0,
        t.error,
        b,
        l
      ));
    }
    this.listeners.forEach((b) => {
      b(i(this, yt));
    });
  });
}, as);
function bs(e) {
  return e;
}
function er(e) {
  return {
    mutationKey: e.options.mutationKey,
    state: e.state,
    ...e.options.scope && { scope: e.options.scope },
    ...e.meta && { meta: e.meta }
  };
}
function sr(e, t, s) {
  var r;
  return {
    dehydratedAt: Date.now(),
    state: {
      ...e.state,
      ...e.state.data !== void 0 && {
        data: t(e.state.data)
      }
    },
    queryKey: e.queryKey,
    queryHash: e.queryHash,
    ...e.state.status === "pending" && {
      promise: (r = e.promise) == null ? void 0 : r.then(t).catch((n) => s(n) ? Promise.reject(new Error("redacted")) : Promise.reject(n))
    },
    ...e.meta && { meta: e.meta }
  };
}
function rr(e) {
  return e.state.isPaused;
}
function ir(e) {
  return e.state.status === "success";
}
function nr(e) {
  return !0;
}
function yr(e, t = {}) {
  var c, v, b, l;
  const s = t.shouldDehydrateMutation ?? ((c = e.getDefaultOptions().dehydrate) == null ? void 0 : c.shouldDehydrateMutation) ?? rr, r = e.getMutationCache().getAll().flatMap(
    (y) => s(y) ? [er(y)] : []
  ), n = t.shouldDehydrateQuery ?? ((v = e.getDefaultOptions().dehydrate) == null ? void 0 : v.shouldDehydrateQuery) ?? ir, a = t.shouldRedactErrors ?? ((b = e.getDefaultOptions().dehydrate) == null ? void 0 : b.shouldRedactErrors) ?? nr, u = t.serializeData ?? ((l = e.getDefaultOptions().dehydrate) == null ? void 0 : l.serializeData) ?? bs, h = e.getQueryCache().getAll().flatMap(
    (y) => n(y) ? [sr(y, u, a)] : []
  );
  return { mutations: r, queries: h };
}
function Ve(e, t, s) {
  var c, v;
  if (typeof t != "object" || t === null)
    return;
  const r = e.getMutationCache(), n = e.getQueryCache(), a = ((c = s == null ? void 0 : s.defaultOptions) == null ? void 0 : c.deserializeData) ?? ((v = e.getDefaultOptions().hydrate) == null ? void 0 : v.deserializeData) ?? bs, u = t.mutations || [], h = t.queries || [];
  u.forEach(({ state: b, ...l }) => {
    var y, g;
    r.build(
      e,
      {
        ...(y = e.getDefaultOptions().hydrate) == null ? void 0 : y.mutations,
        ...(g = s == null ? void 0 : s.defaultOptions) == null ? void 0 : g.mutations,
        ...l
      },
      b
    );
  }), h.forEach(
    ({ queryKey: b, state: l, queryHash: y, meta: g, promise: O, dehydratedAt: d }) => {
      var L, st;
      const p = O ? Ls(O) : void 0, R = l.data === void 0 ? p == null ? void 0 : p.data : l.data, E = R === void 0 ? R : a(R);
      let C = n.get(y);
      const x = (C == null ? void 0 : C.state.status) === "pending", U = (C == null ? void 0 : C.state.fetchStatus) === "fetching";
      if (C) {
        const T = p && // We only need this undefined check to handle older dehydration
        // payloads that might not have dehydratedAt
        d !== void 0 && d > C.state.dataUpdatedAt;
        if (l.dataUpdatedAt > C.state.dataUpdatedAt || T) {
          const { fetchStatus: F, ...M } = l;
          C.setState({
            ...M,
            data: E
          });
        }
      } else
        C = n.build(
          e,
          {
            ...(L = e.getDefaultOptions().hydrate) == null ? void 0 : L.queries,
            ...(st = s == null ? void 0 : s.defaultOptions) == null ? void 0 : st.queries,
            queryKey: b,
            queryHash: y,
            meta: g
          },
          // Reset fetch status to idle to avoid
          // query being stuck in fetching state upon hydration
          {
            ...l,
            data: E,
            fetchStatus: "idle",
            status: E !== void 0 ? "success" : l.status
          }
        );
      O && !x && !U && // Only hydrate if dehydration is newer than any existing data,
      // this is always true for new queries
      (d === void 0 || d > C.state.dataUpdatedAt) && C.fetch(void 0, {
        // RSC transformed promises are not thenable
        initialPromise: Promise.resolve(O).then(a)
      });
    }
  );
}
function pr({
  queryFn: e,
  refetchMode: t = "reset",
  maxChunks: s
}) {
  return async (r) => {
    const n = r.client.getQueryCache().find({ queryKey: r.queryKey, exact: !0 }), a = !!n && n.state.data !== void 0;
    a && t === "reset" && n.setState({
      status: "pending",
      data: void 0,
      error: null,
      fetchStatus: "fetching"
    });
    let u = [];
    const h = await e(r);
    for await (const c of h) {
      if (r.signal.aborted)
        break;
      (!a || t !== "replace") && r.client.setQueryData(
        r.queryKey,
        (v = []) => me(v, c, s)
      ), u = me(u, c, s);
    }
    return a && t === "replace" && !r.signal.aborted && r.client.setQueryData(r.queryKey, u), r.client.getQueryData(r.queryKey);
  };
}
var vr = Symbol("dataTagSymbol"), mr = Symbol("dataTagErrorSymbol"), gr = Symbol("unsetMarker"), Os = { exports: {} }, ce = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ar = Symbol.for("react.transitional.element"), ur = Symbol.for("react.fragment");
function Rs(e, t, s) {
  var r = null;
  if (s !== void 0 && (r = "" + s), t.key !== void 0 && (r = "" + t.key), "key" in t) {
    s = {};
    for (var n in t)
      n !== "key" && (s[n] = t[n]);
  } else s = t;
  return t = s.ref, {
    $$typeof: ar,
    type: e,
    key: r,
    ref: t !== void 0 ? t : null,
    props: s
  };
}
ce.Fragment = ur;
ce.jsx = Rs;
ce.jsxs = Rs;
Os.exports = ce;
var Cs = Os.exports, ws = P.createContext(
  void 0
), et = (e) => {
  const t = P.useContext(ws);
  if (e)
    return e;
  if (!t)
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return t;
}, br = ({
  client: e,
  children: t
}) => (P.useEffect(() => (e.mount(), () => {
  e.unmount();
}), [e]), /* @__PURE__ */ Cs.jsx(ws.Provider, { value: e, children: t })), Ps = P.createContext(!1), Ss = () => P.useContext(Ps), Or = Ps.Provider;
function Qs() {
  let e = !1;
  return {
    clearReset: () => {
      e = !1;
    },
    reset: () => {
      e = !0;
    },
    isReset: () => e
  };
}
var Es = P.createContext(Qs()), Fs = () => P.useContext(Es), Rr = ({
  children: e
}) => {
  const [t] = P.useState(() => Qs());
  return /* @__PURE__ */ Cs.jsx(Es.Provider, { value: t, children: typeof e == "function" ? e(t) : e });
}, Ms = (e, t) => {
  (e.suspense || e.throwOnError || e.experimental_prefetchInRender) && (t.isReset() || (e.retryOnMount = !1));
}, Ds = (e) => {
  P.useEffect(() => {
    e.clearReset();
  }, [e]);
}, xs = ({
  result: e,
  errorResetBoundary: t,
  throwOnError: s,
  query: r,
  suspense: n
}) => e.isError && !t.isReset() && !e.isFetching && r && (n && e.data === void 0 || hs(s, [e.error, r])), Le = (e, t) => t.state.data === void 0, As = (e) => {
  if (e.suspense) {
    const t = (r) => r === "static" ? r : Math.max(r ?? 1e3, 1e3), s = e.staleTime;
    e.staleTime = typeof s == "function" ? (...r) => t(s(...r)) : t(s), typeof e.gcTime == "number" && (e.gcTime = Math.max(e.gcTime, 1e3));
  }
}, Ts = (e, t) => e.isLoading && e.isFetching && !t, Ie = (e, t) => (e == null ? void 0 : e.suspense) && t.isPending, oe = (e, t, s) => t.fetchOptimistic(e).catch(() => {
  s.clearReset();
});
function or({
  queries: e,
  ...t
}, s) {
  const r = et(s), n = Ss(), a = Fs(), u = P.useMemo(
    () => e.map((d) => {
      const p = r.defaultQueryOptions(
        d
      );
      return p._optimisticResults = n ? "isRestoring" : "optimistic", p;
    }),
    [e, r, n]
  );
  u.forEach((d) => {
    As(d), Ms(d, a);
  }), Ds(a);
  const [h] = P.useState(
    () => new Zs(
      r,
      u,
      t
    )
  ), [c, v, b] = h.getOptimisticResult(
    u,
    t.combine
  ), l = !n && t.subscribed !== !1;
  P.useSyncExternalStore(
    P.useCallback(
      (d) => l ? h.subscribe(Q.batchCalls(d)) : A,
      [h, l]
    ),
    () => h.getCurrentResult(),
    () => h.getCurrentResult()
  ), P.useEffect(() => {
    h.setQueries(
      u,
      t
    );
  }, [u, t, h]);
  const g = c.some(
    (d, p) => Ie(u[p], d)
  ) ? c.flatMap((d, p) => {
    const R = u[p];
    if (R) {
      const E = new te(r, R);
      if (Ie(R, d))
        return oe(R, E, a);
      Ts(d, n) && oe(R, E, a);
    }
    return [];
  }) : [];
  if (g.length > 0)
    throw Promise.all(g);
  const O = c.find(
    (d, p) => {
      const R = u[p];
      return R && xs({
        result: d,
        errorResetBoundary: a,
        throwOnError: R.throwOnError,
        query: r.getQueryCache().get(R.queryHash),
        suspense: R.suspense
      });
    }
  );
  if (O != null && O.error)
    throw O.error;
  return v(b());
}
function le(e, t, s) {
  var l, y, g, O, d;
  const r = Ss(), n = Fs(), a = et(s), u = a.defaultQueryOptions(e);
  (y = (l = a.getDefaultOptions().queries) == null ? void 0 : l._experimental_beforeQuery) == null || y.call(
    l,
    u
  ), u._optimisticResults = r ? "isRestoring" : "optimistic", As(u), Ms(u, n), Ds(n);
  const h = !a.getQueryCache().get(u.queryHash), [c] = P.useState(
    () => new t(
      a,
      u
    )
  ), v = c.getOptimisticResult(u), b = !r && e.subscribed !== !1;
  if (P.useSyncExternalStore(
    P.useCallback(
      (p) => {
        const R = b ? c.subscribe(Q.batchCalls(p)) : A;
        return c.updateResult(), R;
      },
      [c, b]
    ),
    () => c.getCurrentResult(),
    () => c.getCurrentResult()
  ), P.useEffect(() => {
    c.setOptions(u);
  }, [u, c]), Ie(u, v))
    throw oe(u, c, n);
  if (xs({
    result: v,
    errorResetBoundary: n,
    throwOnError: u.throwOnError,
    query: a.getQueryCache().get(u.queryHash),
    suspense: u.suspense
  }))
    throw v.error;
  if ((O = (g = a.getDefaultOptions().queries) == null ? void 0 : g._experimental_afterQuery) == null || O.call(
    g,
    u,
    v
  ), u.experimental_prefetchInRender && !Qt && Ts(v, r)) {
    const p = h ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      oe(u, c, n)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      (d = a.getQueryCache().get(u.queryHash)) == null ? void 0 : d.promise
    );
    p == null || p.catch(A).finally(() => {
      c.updateResult();
    });
  }
  return u.notifyOnChangeProps ? v : c.trackResult(v);
}
function Cr(e, t) {
  return le(e, te, t);
}
function wr(e, t) {
  return le(
    {
      ...e,
      enabled: !0,
      suspense: !0,
      throwOnError: Le,
      placeholderData: void 0
    },
    te,
    t
  );
}
function Pr(e, t) {
  return le(
    {
      ...e,
      enabled: !0,
      suspense: !0,
      throwOnError: Le
    },
    gs,
    t
  );
}
function Sr(e, t) {
  return or(
    {
      ...e,
      queries: e.queries.map((s) => ({
        ...s,
        suspense: !0,
        throwOnError: Le,
        enabled: !0,
        placeholderData: void 0
      }))
    },
    t
  );
}
function Qr(e, t) {
  const s = et(t);
  s.getQueryState(e.queryKey) || s.prefetchQuery(e);
}
function Er(e, t) {
  const s = et(t);
  s.getQueryState(e.queryKey) || s.prefetchInfiniteQuery(e);
}
function Fr(e) {
  return e;
}
function Mr(e) {
  return e;
}
var Dr = ({
  children: e,
  options: t = {},
  state: s,
  queryClient: r
}) => {
  const n = et(r), a = P.useRef(t);
  a.current = t;
  const u = P.useMemo(() => {
    if (s) {
      if (typeof s != "object")
        return;
      const h = n.getQueryCache(), c = s.queries || [], v = [], b = [];
      for (const l of c) {
        const y = h.get(l.queryHash);
        y ? (l.state.dataUpdatedAt > y.state.dataUpdatedAt || l.promise && y.state.status !== "pending" && y.state.fetchStatus !== "fetching" && l.dehydratedAt !== void 0 && l.dehydratedAt > y.state.dataUpdatedAt) && b.push(l) : v.push(l);
      }
      if (v.length > 0 && Ve(n, { queries: v }, a.current), b.length > 0)
        return b;
    }
  }, [n, s]);
  return P.useEffect(() => {
    u && Ve(n, { queries: u }, a.current);
  }, [n, u]), e;
};
function xr(e, t) {
  const s = et(t), r = s.getQueryCache();
  return P.useSyncExternalStore(
    P.useCallback(
      (n) => r.subscribe(Q.batchCalls(n)),
      [r]
    ),
    () => s.isFetching(e),
    () => s.isFetching(e)
  );
}
function Ar(e, t) {
  const s = et(t);
  return hr(
    { filters: { ...e, status: "pending" } },
    s
  ).length;
}
function Je(e, t) {
  return e.findAll(t.filters).map(
    (s) => t.select ? t.select(s) : s.state
  );
}
function hr(e = {}, t) {
  const s = et(t).getMutationCache(), r = P.useRef(e), n = P.useRef(null);
  return n.current || (n.current = Je(s, e)), P.useEffect(() => {
    r.current = e;
  }), P.useSyncExternalStore(
    P.useCallback(
      (a) => s.subscribe(() => {
        const u = he(
          n.current,
          Je(s, r.current)
        );
        n.current !== u && (n.current = u, Q.schedule(a));
      }),
      [s]
    ),
    () => n.current,
    () => n.current
  );
}
function Tr(e, t) {
  const s = et(t), [r] = P.useState(
    () => new tr(
      s,
      e
    )
  );
  P.useEffect(() => {
    r.setOptions(e);
  }, [r, e]);
  const n = P.useSyncExternalStore(
    P.useCallback(
      (u) => r.subscribe(Q.batchCalls(u)),
      [r]
    ),
    () => r.getCurrentResult(),
    () => r.getCurrentResult()
  ), a = P.useCallback(
    (u, h) => {
      r.mutate(u, h).catch(A);
    },
    [r]
  );
  if (n.error && hs(r.options.throwOnError, [n.error]))
    throw n.error;
  return { ...n, mutate: a, mutateAsync: n.mutate };
}
function Ir(e) {
  return e;
}
function qr(e, t) {
  return le(
    e,
    gs,
    t
  );
}
export {
  ls as CancelledError,
  Dr as HydrationBoundary,
  gs as InfiniteQueryObserver,
  Or as IsRestoringProvider,
  zs as Mutation,
  $s as MutationCache,
  tr as MutationObserver,
  Zs as QueriesObserver,
  Ns as Query,
  Bs as QueryCache,
  fr as QueryClient,
  ws as QueryClientContext,
  br as QueryClientProvider,
  Rr as QueryErrorResetBoundary,
  te as QueryObserver,
  mr as dataTagErrorSymbol,
  vr as dataTagSymbol,
  Hs as defaultScheduler,
  rr as defaultShouldDehydrateMutation,
  ir as defaultShouldDehydrateQuery,
  yr as dehydrate,
  pr as experimental_streamedQuery,
  ke as focusManager,
  Et as hashKey,
  Ve as hydrate,
  Mr as infiniteQueryOptions,
  fe as isCancelledError,
  Qt as isServer,
  dr as keepPreviousData,
  _e as matchMutation,
  He as matchQuery,
  Ir as mutationOptions,
  A as noop,
  Q as notifyManager,
  ae as onlineManager,
  zt as partialMatchKey,
  Fr as queryOptions,
  he as replaceEqualDeep,
  hs as shouldThrowError,
  Ue as skipToken,
  gr as unsetMarker,
  qr as useInfiniteQuery,
  xr as useIsFetching,
  Ar as useIsMutating,
  Ss as useIsRestoring,
  Tr as useMutation,
  hr as useMutationState,
  Er as usePrefetchInfiniteQuery,
  Qr as usePrefetchQuery,
  or as useQueries,
  Cr as useQuery,
  et as useQueryClient,
  Fs as useQueryErrorResetBoundary,
  Pr as useSuspenseInfiniteQuery,
  Sr as useSuspenseQueries,
  wr as useSuspenseQuery
};
