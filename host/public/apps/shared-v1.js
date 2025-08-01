import s, { createContext as x, useState as p, useEffect as F } from "react";
import { createRoot as R } from "react-dom/client";
import { QueryClientProvider as T, QueryClient as U, useQuery as h, useQueryClient as Y, useMutation as C } from "@tanstack/react-query";
import { create as f } from "zustand";
const H = {
  LIGHT: "light",
  DARK: "dark",
  AUTO: "auto"
}, K = {
  KO: "ko",
  EN: "en",
  JA: "ja"
}, _ = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error"
};
let g = null;
function N() {
  return g || (g = new U({
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
  })), g;
}
function O(t = {}) {
  const n = N();
  return Object.entries(t).forEach(([e, r]) => {
    try {
      n.setQueryData(JSON.parse(e), r);
    } catch (o) {
      console.warn("Failed to parse query key:", e, o);
    }
  }), n;
}
function $({ children: t, ssrQueries: n }) {
  const e = s.useMemo(() => O(n), [n]);
  return /* @__PURE__ */ s.createElement(T, { client: e }, t);
}
const v = f((t, n) => ({
  user: null,
  theme: "light",
  language: "ko",
  setUser: (e) => t({ user: e }),
  setTheme: (e) => t({ theme: e }),
  setLanguage: (e) => t({ language: e }),
  // SSR에서 초기화할 때 사용
  initializeFromSSR: (e) => {
    const r = {};
    e.user && (r.user = e.user), e.theme && (r.theme = e.theme), e.language && (r.language = e.language), t(r);
  }
})), j = f((t, n) => ({
  events: {},
  emit: (e, r) => {
    const { events: o } = n();
    (o[e] || []).forEach((a) => a(r));
  },
  on: (e, r) => (t((o) => ({
    events: {
      ...o.events,
      [e]: [...o.events[e] || [], r]
    }
  })), () => {
    t((o) => ({
      events: {
        ...o.events,
        [e]: (o.events[e] || []).filter((i) => i !== r)
      }
    }));
  }),
  off: (e, r) => {
    t((o) => ({
      events: {
        ...o.events,
        [e]: (o.events[e] || []).filter((i) => i !== r)
      }
    }));
  }
})), E = f((t, n) => ({
  notifications: [],
  addNotification: (e) => {
    const r = Date.now().toString(), o = Date.now(), i = {
      id: r,
      timestamp: o,
      ...e
    };
    return t((a) => ({
      notifications: [...a.notifications, i]
    })), e.autoRemove !== !1 && setTimeout(() => {
      n().removeNotification(r);
    }, e.duration || 5e3), r;
  },
  removeNotification: (e) => t((r) => ({
    notifications: r.notifications.filter((o) => o.id !== e)
  })),
  clearNotifications: () => t({ notifications: [] })
})), b = f((t) => ({
  currentPath: typeof window < "u" ? window.location.pathname : "/",
  navigate: (n) => {
    typeof window < "u" && (window.history.pushState({}, "", n), t({ currentPath: n }), window.dispatchEvent(new PopStateEvent("popstate")));
  }
}));
function q() {
  const { notifications: t, removeNotification: n } = E();
  return t.length === 0 ? null : /* @__PURE__ */ s.createElement("div", { style: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 1e4,
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  } }, t.map((e) => /* @__PURE__ */ s.createElement(
    "div",
    {
      key: e.id,
      style: {
        background: e.type === "error" ? "#ff6b6b" : e.type === "success" ? "#51cf66" : "#339af0",
        color: "white",
        padding: "12px 16px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        minWidth: "250px",
        maxWidth: "400px",
        cursor: "pointer"
      },
      onClick: () => e.id && n(e.id)
    },
    /* @__PURE__ */ s.createElement("div", { style: { fontWeight: "bold", marginBottom: "4px" } }, e.title),
    e.message && /* @__PURE__ */ s.createElement("div", { style: { fontSize: "14px", opacity: 0.9 } }, e.message)
  )));
}
function D({ children: t, ssrData: n = {} }) {
  const { initializeFromSSR: e } = v();
  return s.useEffect(() => {
    (n.user || n.theme || n.language) && e(n);
  }, [n, e]), /* @__PURE__ */ s.createElement($, { ssrQueries: n.queries }, t, /* @__PURE__ */ s.createElement(q, null));
}
function z() {
  return v();
}
function J() {
  return E();
}
const A = x(null);
function W({ children: t }) {
  const [n, e] = p(typeof window < "u" ? window.location.pathname : "/"), [r, o] = p({}), [i, a] = p({});
  F(() => {
    if (typeof window > "u") return;
    const u = (c) => {
      e(c.detail.pathname), c.detail.params && o(c.detail.params), c.detail.query && a(c.detail.query);
    }, w = () => {
      e(window.location.pathname);
      const c = new URLSearchParams(window.location.search), y = {};
      c.forEach((M, P) => {
        y[P] = M;
      }), a(y);
    };
    return window.addEventListener("mfa:route-changed", u), window.addEventListener("popstate", w), () => {
      window.removeEventListener("mfa:route-changed", u), window.removeEventListener("popstate", w);
    };
  }, []);
  const m = (u) => {
    typeof window < "u" && (window.history.pushState(null, "", u), window.dispatchEvent(new PopStateEvent("popstate")));
  };
  return /* @__PURE__ */ s.createElement(A.Provider, { value: { pathname: n, navigate: m, params: r, query: i } }, t);
}
const d = {
  // 사용자 정보 조회
  getUser: async (t) => {
    const n = await fetch(`/api/users/${t}`);
    if (!n.ok) throw new Error("Failed to fetch user");
    return n.json();
  },
  // 사용자 목록 조회
  getUsers: async (t = {}) => {
    const n = new URLSearchParams(t), e = await fetch(`/api/users?${n}`);
    if (!e.ok) throw new Error("Failed to fetch users");
    return e.json();
  },
  // 사용자 업데이트
  updateUser: async ({ userId: t, data: n }) => {
    const e = await fetch(`/api/users/${t}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(n)
    });
    if (!e.ok) throw new Error("Failed to update user");
    return e.json();
  },
  // 공용 설정 조회
  getSettings: async () => {
    const t = await fetch("/api/settings");
    if (!t.ok) throw new Error("Failed to fetch settings");
    return t.json();
  }
};
function B(t) {
  return h({
    queryKey: ["user", t],
    queryFn: () => d.getUser(t),
    enabled: !!t
  });
}
function V(t) {
  return h({
    queryKey: ["users", t],
    queryFn: () => d.getUsers(t)
  });
}
function X() {
  return h({
    queryKey: ["settings"],
    queryFn: d.getSettings,
    staleTime: 10 * 60 * 1e3
    // 10분
  });
}
function Z() {
  const t = Y();
  return C({
    mutationFn: d.updateUser,
    onSuccess: () => {
      t.invalidateQueries({ queryKey: ["user"] }), t.invalidateQueries({ queryKey: ["users"] });
    }
  });
}
const ee = () => {
  const { navigate: t, currentPath: n } = b();
  return {
    navigate: t,
    currentPath: n,
    isActive: (e) => n === e
  };
};
function te(t, n = "YYYY-MM-DD") {
  const e = new Date(t), r = e.getFullYear().toString(), o = String(e.getMonth() + 1).padStart(2, "0"), i = String(e.getDate()).padStart(2, "0"), a = String(e.getHours()).padStart(2, "0"), m = String(e.getMinutes()).padStart(2, "0"), u = {
    "YYYY-MM-DD": `${r}-${o}-${i}`,
    "YYYY-MM-DD HH:mm": `${r}-${o}-${i} ${a}:${m}`,
    "MM/DD/YYYY": `${o}/${i}/${r}`,
    relative: L(e)
  };
  return u[n] || u["YYYY-MM-DD"];
}
function L(t) {
  const e = (/* @__PURE__ */ new Date()).getTime() - t.getTime(), r = Math.floor(e / 1e3), o = Math.floor(r / 60), i = Math.floor(o / 60), a = Math.floor(i / 24);
  return a > 0 ? `${a}일 전` : i > 0 ? `${i}시간 전` : o > 0 ? `${o}분 전` : "방금 전";
}
function ne(t, n) {
  let e;
  return function(...o) {
    const i = () => {
      clearTimeout(e), t(...o);
    };
    clearTimeout(e), e = setTimeout(i, n);
  };
}
function re(t, n) {
  let e;
  return function(...r) {
    const o = this;
    e || (t.apply(o, r), e = !0, setTimeout(() => e = !1, n));
  };
}
const oe = {
  get: (t, n = null) => {
    try {
      const e = localStorage.getItem(t);
      return e ? JSON.parse(e) : n;
    } catch {
      return n;
    }
  },
  set: (t, n) => {
    try {
      localStorage.setItem(t, JSON.stringify(n));
    } catch (e) {
      console.warn("Failed to save to localStorage:", e);
    }
  },
  remove: (t) => {
    try {
      localStorage.removeItem(t);
    } catch (n) {
      console.warn("Failed to remove from localStorage:", n);
    }
  }
};
function ie(t = window.location.href) {
  const n = new URL(t);
  return Object.fromEntries(n.searchParams);
}
function se(t, n = !1) {
  const e = new URL(window.location.href);
  Object.entries(t).forEach(([r, o]) => {
    o == null ? e.searchParams.delete(r) : e.searchParams.set(r, o);
  }), n ? window.history.replaceState({}, "", e.toString()) : window.history.pushState({}, "", e.toString());
}
function ae(...t) {
  return t.filter(Boolean).join(" ");
}
function S(t) {
  if (t === null || typeof t != "object") return t;
  if (t instanceof Date) return new Date(t.getTime());
  if (t instanceof Array) return t.map((n) => S(n));
  if (typeof t == "object") {
    const n = {};
    return Object.keys(t).forEach((e) => {
      n[e] = S(t[e]);
    }), n;
  }
  return t;
}
const ue = "1.0.0";
function ce(t, n) {
  process.env.NODE_ENV === "development" && console.log(`[MFA Debug] ${t}`, n);
}
let l = null;
function le(t) {
  var r;
  if (l) return;
  const n = ((r = window.MFA_CONFIG) == null ? void 0 : r.ssrData) || {}, e = t.innerHTML;
  l = R(t), l.render(
    /* @__PURE__ */ s.createElement(D, { ssrData: n }, /* @__PURE__ */ s.createElement("div", { dangerouslySetInnerHTML: { __html: e } }))
  ), console.log("MFA Global Provider 마운트 완료", { ssrData: n });
}
function fe() {
  l && (l.unmount(), l = null, console.log("MFA Global Provider 언마운트 완료"));
}
export {
  K as LANGUAGES,
  D as MfaGlobalProvider,
  $ as MfaQueryProvider,
  _ as NOTIFICATION_TYPES,
  W as RoutingProvider,
  ue as SHARED_VERSION,
  H as THEMES,
  d as api,
  ae as classNames,
  ne as debounce,
  ce as debugMFA,
  S as deepClone,
  te as formatDate,
  N as getQueryClient,
  ie as getUrlParams,
  O as initializeQueryClient,
  le as mount,
  oe as storage,
  re as throttle,
  fe as unmount,
  se as updateUrlParams,
  j as useEventStore,
  J as useGlobalNotification,
  z as useGlobalUser,
  E as useNotificationStore,
  ee as useRouting,
  b as useRoutingStore,
  X as useSettings,
  Z as useUpdateUser,
  B as useUser,
  v as useUserStore,
  V as useUsers
};
