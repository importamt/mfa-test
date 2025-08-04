const r = window.React.jsx, o = window.React.jsxs, l = window.React, k = window.MfaFramework.useUserStore, b = window.MfaFramework.useNotificationStore, C = window.MfaFramework.enableHMR;
function u() {
  var s, d, p;
  const [n, m] = l.useState(0), [i, w] = l.useState(""), { user: a, theme: e, setTheme: x } = k(), { addNotification: c } = b(), t = ((p = (d = (s = window.MFA_CONFIG) == null ? void 0 : s.ssrData) == null ? void 0 : d.queries) == null ? void 0 : p['["settings"]']) || null, g = () => {
    m((f) => f + 1), w((/* @__PURE__ */ new Date()).toLocaleTimeString()), c({
      type: "success",
      title: "클릭 완료!",
      message: `${n + 1}번째 클릭입니다.`,
      duration: 3e3
    });
  }, h = () => {
    x(e === "light" ? "dark" : "light"), c({
      type: "info",
      title: "테마 변경",
      message: `${e === "light" ? "다크" : "라이트"} 모드로 변경되었습니다.`
    });
  };
  return /* @__PURE__ */ o("div", { style: {
    padding: "20px",
    border: "2px solid #4CAF50",
    borderRadius: "8px",
    margin: "10px",
    backgroundColor: e === "dark" ? "#2d3748" : "#f8f9fa",
    color: e === "dark" ? "white" : "black"
  }, children: [
    /* @__PURE__ */ r("h2", { children: "Micro App 1 (React + Shared)" }),
    /* @__PURE__ */ r("p", { children: "React 기반 마이크로 프론트엔드 + Shared 라이브러리" }),
    a && /* @__PURE__ */ o("div", { style: { marginBottom: "15px", fontSize: "14px", opacity: 0.8 }, children: [
      "안녕하세요, ",
      a.name,
      "님! (테마: ",
      e,
      ")"
    ] }),
    t && /* @__PURE__ */ o("div", { style: { marginBottom: "15px", fontSize: "12px", opacity: 0.7 }, children: [
      t.appName,
      " v",
      t.version
    ] }),
    /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px", marginBottom: "15px" }, children: [
      /* @__PURE__ */ o(
        "button",
        {
          onClick: g,
          style: {
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          },
          children: [
            "클릭해보세요! (",
            n,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ r(
        "button",
        {
          onClick: h,
          style: {
            padding: "10px 20px",
            backgroundColor: "#FF9800",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          },
          children: "테마 변경22"
        }
      )
    ] }),
    i && /* @__PURE__ */ o("div", { style: { marginTop: "10px", color: e === "dark" ? "#a0aec0" : "#666" }, children: [
      "마지막 클릭: ",
      i
    ] })
  ] });
}
C(import.meta, "micro-app-1", u);
const y = window.MfaFramework.createMfaApp, { mount: M, unmount: R } = y("micro-app-1", u);
export {
  M as mount,
  R as unmount
};
