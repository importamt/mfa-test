import { useState as a, createMfaApp as h } from "@mfa/framework";
import { jsxs as t, jsx as e } from "react/jsx-runtime";
function g() {
  const [l, o] = a(!1), [c, d] = a(50), [s, x] = a(0), [n] = a(180), m = () => {
    o(!l);
  }, i = (r) => {
    const u = Math.floor(r / 60), p = Math.floor(r % 60);
    return `${u}:${p.toString().padStart(2, "0")}`;
  };
  return /* @__PURE__ */ t("div", { className: "fixed bottom-0 left-0 right-0 bg-tving-gray-700 text-white px-5 py-4 flex items-center gap-5 shadow-[0_-2px_10px_rgba(0,0,0,0.3)] z-[9999]", children: [
    /* @__PURE__ */ e(
      "button",
      {
        onClick: m,
        className: "w-10 h-10 rounded-full bg-blue-500 border-none text-white flex items-center justify-center cursor-pointer text-lg hover:bg-blue-600 transition-colors",
        children: l ? "⏸" : "▶"
      }
    ),
    /* @__PURE__ */ t("div", { className: "flex-[0_0_200px]", children: [
      /* @__PURE__ */ e("div", { className: "font-bold mb-1", children: "Sample Track" }),
      /* @__PURE__ */ e("div", { className: "text-xs opacity-70", children: "Artist Name" })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex-1 flex items-center gap-3", children: [
      /* @__PURE__ */ e("span", { className: "text-xs", children: i(s) }),
      /* @__PURE__ */ t("div", { className: "flex-1 h-1 bg-tving-gray-600 rounded-sm relative cursor-pointer group", children: [
        /* @__PURE__ */ e(
          "div",
          {
            className: "absolute left-0 top-0 h-full bg-blue-500 rounded-sm transition-all",
            style: { width: `${s / n * 100}%` }
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            className: "absolute w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1",
            style: { left: `${s / n * 100}%`, transform: "translateX(-50%) translateY(-25%)" }
          }
        )
      ] }),
      /* @__PURE__ */ e("span", { className: "text-xs", children: i(n) })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ e("span", { className: "text-sm", children: "🔊" }),
      /* @__PURE__ */ t("div", { className: "relative", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "range",
            min: "0",
            max: "100",
            value: c,
            onChange: (r) => d(Number(r.target.value)),
            className: "w-20 h-1 bg-tving-gray-600 rounded-sm appearance-none cursor-pointer slider"
          }
        ),
        /* @__PURE__ */ e("style", { jsx: !0, children: `
            .slider::-webkit-slider-thumb {
              appearance: none;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #3b82f6;
              cursor: pointer;
            }
            .slider::-moz-range-thumb {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #3b82f6;
              cursor: pointer;
              border: none;
            }
          ` })
      ] })
    ] })
  ] });
}
const { mount: v, unmount: y } = h("player", g);
export {
  v as mount,
  y as unmount
};
