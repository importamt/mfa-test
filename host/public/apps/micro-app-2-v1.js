const t = window.React.jsx, d = window.React.jsxs, c = window.MfaFramework.React, m = window.MfaFramework.enableHMR;
function s() {
  const [l, n] = c.useState([]), [r, p] = c.useState(""), a = () => {
    r.trim() && (n((e) => [...e, {
      id: Date.now(),
      text: r,
      completed: !1
    }]), p(""));
  }, x = (e) => {
    n((i) => i.map(
      (o) => o.id === e ? { ...o, completed: !o.completed } : o
    ));
  }, u = (e) => {
    n((i) => i.filter((o) => o.id !== e));
  };
  return /* @__PURE__ */ d("div", { style: {
    padding: "20px",
    border: "2px solid #2196F3",
    borderRadius: "8px",
    margin: "10px",
    backgroundColor: "#f8f9fa"
  }, children: [
    /* @__PURE__ */ t("h2", { children: "Micro App 2 (React Todo)" }),
    /* @__PURE__ */ t("p", { children: "React 기반 Todo 리스트 애플리케이션입니다." }),
    /* @__PURE__ */ d("div", { style: { marginBottom: "20px" }, children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "text",
          value: r,
          onChange: (e) => p(e.target.value),
          onKeyPress: (e) => e.key === "Enter" && a(),
          placeholder: "할 일을 입력하세요...",
          style: {
            padding: "8px 12px",
            marginRight: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            width: "200px"
          }
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          onClick: a,
          style: {
            padding: "8px 16px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          },
          children: "추가"
        }
      )
    ] }),
    /* @__PURE__ */ t("ul", { style: { listStyle: "none", padding: 0 }, children: l.map((e) => /* @__PURE__ */ d("li", { style: {
      display: "flex",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid #eee"
    }, children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "checkbox",
          checked: e.completed,
          onChange: () => x(e.id),
          style: { marginRight: "10px" }
        }
      ),
      /* @__PURE__ */ t("span", { style: {
        flex: 1,
        textDecoration: e.completed ? "line-through" : "none",
        color: e.completed ? "#888" : "#333"
      }, children: e.text }),
      /* @__PURE__ */ t(
        "button",
        {
          onClick: () => u(e.id),
          style: {
            padding: "4px 8px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px"
          },
          children: "삭제"
        }
      )
    ] }, e.id)) }),
    l.length === 0 && /* @__PURE__ */ t("p", { style: { color: "#888", fontStyle: "italic" }, children: "할 일을 추가해보세요!" })
  ] });
}
m(import.meta, "micro-app-2", s);
const h = window.MfaFramework.createMfaApp, { mount: g, unmount: b } = h("micro-app-2", s);
export {
  g as mount,
  b as unmount
};
