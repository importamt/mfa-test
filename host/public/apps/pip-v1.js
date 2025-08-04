import { enableHMR as m, React as e, createMfaApp as g } from "@mfa/framework";
function d() {
  const [o, a] = e.useState(!1), [n, c] = e.useState({ x: 20, y: 20 }), [i, s] = e.useState(!1), [r, x] = e.useState({ x: 0, y: 0 }), u = (t) => {
    s(!0), x({
      x: t.clientX - n.x,
      y: t.clientY - n.y
    });
  }, l = (t) => {
    i && c({
      x: t.clientX - r.x,
      y: t.clientY - r.y
    });
  }, p = () => {
    s(!1);
  };
  return e.useEffect(() => {
    if (i)
      return document.addEventListener("mousemove", l), document.addEventListener("mouseup", p), () => {
        document.removeEventListener("mousemove", l), document.removeEventListener("mouseup", p);
      };
  }, [i, r]), /* @__PURE__ */ e.createElement("div", { style: {
    position: "fixed",
    bottom: `${n.y}px`,
    right: `${n.x}px`,
    zIndex: 1e3,
    userSelect: "none"
  } }, /* @__PURE__ */ e.createElement(
    "button",
    {
      onClick: () => a(!o),
      style: {
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: o ? "#51cf66" : "#ff6b6b",
        border: "none",
        color: "white",
        fontSize: "24px",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    },
    o ? "📱" : "📹"
  ), o && /* @__PURE__ */ e.createElement(
    "div",
    {
      onMouseDown: u,
      style: {
        position: "absolute",
        bottom: "70px",
        right: "0",
        width: "280px",
        height: "200px",
        background: "#fff",
        borderRadius: "12px",
        padding: "15px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        border: "1px solid #e0e0e0",
        cursor: i ? "grabbing" : "grab"
      }
    },
    /* @__PURE__ */ e.createElement("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px",
      paddingBottom: "10px",
      borderBottom: "1px solid #f0f0f0"
    } }, /* @__PURE__ */ e.createElement("h4", { style: {
      margin: 0,
      fontSize: "16px",
      color: "#333"
    } }, "📺 PIP Video (React)"), /* @__PURE__ */ e.createElement(
      "button",
      {
        onClick: () => a(!1),
        style: {
          background: "none",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
          color: "#999"
        }
      },
      "✕"
    )),
    /* @__PURE__ */ e.createElement("div", { style: {
      width: "100%",
      height: "120px",
      background: "linear-gradient(45deg, #667eea, #764ba2)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "14px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    } }, /* @__PURE__ */ e.createElement("div", null, /* @__PURE__ */ e.createElement("div", { style: { fontSize: "24px", marginBottom: "8px" } }, "▶️"), /* @__PURE__ */ e.createElement("div", null, "Video Content"), /* @__PURE__ */ e.createElement("div", { style: { fontSize: "12px", opacity: 0.8 } }, "React PIP Player")), /* @__PURE__ */ e.createElement("div", { style: {
      position: "absolute",
      bottom: "10px",
      left: "15px",
      right: "15px",
      height: "4px",
      background: "rgba(255,255,255,0.3)",
      borderRadius: "2px"
    } }, /* @__PURE__ */ e.createElement("div", { style: {
      width: "60%",
      height: "100%",
      background: "white",
      borderRadius: "2px"
    } }))),
    /* @__PURE__ */ e.createElement("div", { style: {
      marginTop: "10px",
      fontSize: "12px",
      color: "#666",
      textAlign: "center"
    } }, "드래그하여 이동 가능")
  ));
}
m(import.meta, "pip-app", d);
const { mount: f, unmount: h } = g("pip-app", d);
export {
  f as mount,
  h as unmount
};
