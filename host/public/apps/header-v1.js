const r = window.React.jsx, n = window.React.jsxs, l = window.MfaFramework.React, u = window.MfaFramework.useRouting, g = window.MfaFramework.enableHMR, { useState: d } = l;
function s() {
  const [a, c] = d("Admin"), [i, p] = d(!1), { currentPath: t, navigate: o } = u();
  return /* @__PURE__ */ r("header", { style: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "1rem 2rem",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1e3
  }, children: /* @__PURE__ */ n("div", { style: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }, children: [
    /* @__PURE__ */ n("div", { style: { display: "flex", alignItems: "center", gap: "2rem" }, children: [
      /* @__PURE__ */ r("h1", { style: { margin: 0, fontSize: "1.5rem" }, children: "🚀 MFA Platform (React)" }),
      /* @__PURE__ */ n("nav", { style: { display: "flex", gap: "1rem" }, children: [
        /* @__PURE__ */ r(
          "button",
          {
            onClick: () => o("/main"),
            style: {
              color: "white",
              textDecoration: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              fontSize: "14px",
              transition: "background 0.2s",
              background: t === "/main" ? "rgba(255,255,255,0.3)" : "transparent",
              border: "none",
              cursor: "pointer"
            },
            onMouseEnter: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)",
            onMouseLeave: (e) => e.currentTarget.style.background = t === "/main" ? "rgba(255,255,255,0.3)" : "transparent",
            children: "메인"
          }
        ),
        /* @__PURE__ */ r(
          "button",
          {
            onClick: () => o("/dashboard"),
            style: {
              color: "white",
              textDecoration: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              fontSize: "14px",
              transition: "background 0.2s",
              background: t === "/dashboard" ? "rgba(255,255,255,0.3)" : "transparent",
              border: "none",
              cursor: "pointer"
            },
            onMouseEnter: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)",
            onMouseLeave: (e) => e.currentTarget.style.background = t === "/dashboard" ? "rgba(255,255,255,0.3)" : "transparent",
            children: "대시보드"
          }
        ),
        /* @__PURE__ */ r(
          "button",
          {
            onClick: () => o("/profile"),
            style: {
              color: "white",
              textDecoration: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              fontSize: "14px",
              transition: "background 0.2s",
              background: t === "/profile" ? "rgba(255,255,255,0.3)" : "transparent",
              border: "none",
              cursor: "pointer"
            },
            onMouseEnter: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)",
            onMouseLeave: (e) => e.currentTarget.style.background = t === "/profile" ? "rgba(255,255,255,0.3)" : "transparent",
            children: "프로필"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ n("nav", { style: { display: "flex", gap: "1rem", alignItems: "center" }, children: [
      /* @__PURE__ */ n("span", { style: {
        padding: "0.5rem 1rem",
        background: "rgba(255,255,255,0.2)",
        borderRadius: "4px",
        fontSize: "14px"
      }, children: [
        "👤 ",
        a
      ] }),
      /* @__PURE__ */ n("div", { style: { position: "relative" }, children: [
        /* @__PURE__ */ r(
          "button",
          {
            onClick: () => p(!i),
            style: {
              padding: "0.5rem 1rem",
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px"
            },
            children: "설정 ⚙️"
          }
        ),
        i && /* @__PURE__ */ n("div", { style: {
          position: "absolute",
          right: 0,
          top: "100%",
          marginTop: "5px",
          background: "white",
          color: "#333",
          borderRadius: "4px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          minWidth: "150px",
          overflow: "hidden"
        }, children: [
          /* @__PURE__ */ r("button", { style: {
            width: "100%",
            padding: "10px 15px",
            border: "none",
            background: "transparent",
            textAlign: "left",
            cursor: "pointer",
            fontSize: "14px"
          }, children: "프로필 설정" }),
          /* @__PURE__ */ r("button", { style: {
            width: "100%",
            padding: "10px 15px",
            border: "none",
            background: "transparent",
            textAlign: "left",
            cursor: "pointer",
            fontSize: "14px"
          }, children: "테마 변경" }),
          /* @__PURE__ */ r(
            "button",
            {
              onClick: () => c(a === "Admin" ? "Guest" : "Admin"),
              style: {
                width: "100%",
                padding: "10px 15px",
                border: "none",
                background: "transparent",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "14px"
              },
              children: "사용자 전환"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
g(import.meta, "header-app", s);
const b = window.MfaFramework.createMfaApp, { mount: x, unmount: h } = b("header-app", s);
export {
  x as mount,
  h as unmount
};
