import { React as d, enableHMR as p, useRouting as h, createMfaApp as u } from "@mfa/framework";
import { jsx as e, jsxs as t } from "react/jsx-runtime";
const { useState: i } = d;
function a() {
  const [o, l] = i("Admin"), [s, c] = i(!1), { currentPath: r, navigate: n } = h();
  return /* @__PURE__ */ e("header", { className: "bg-gradient-to-br from-blue-500 to-purple-600 text-white px-8 py-4 shadow-lg sticky top-0 z-[1000]", children: /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center gap-8", children: [
      /* @__PURE__ */ e("h1", { className: "m-0 text-2xl", children: "🚀 MFA Platform (React)" }),
      /* @__PURE__ */ t("nav", { className: "flex gap-4", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => n("/main"),
            className: `
                                text-white no-underline px-4 py-2 rounded text-sm transition-colors duration-200 
                                border-none cursor-pointer
                                ${r === "/main" ? "bg-white/30" : "bg-transparent hover:bg-white/20"}
                            `,
            children: "메인"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => n("/dashboard"),
            className: `
                                text-white no-underline px-4 py-2 rounded text-sm transition-colors duration-200 
                                border-none cursor-pointer
                                ${r === "/dashboard" ? "bg-white/30" : "bg-transparent hover:bg-white/20"}
                            `,
            children: "대시보드"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => n("/profile"),
            className: `
                                text-white no-underline px-4 py-2 rounded text-sm transition-colors duration-200 
                                border-none cursor-pointer
                                ${r === "/profile" ? "bg-white/30" : "bg-transparent hover:bg-white/20"}
                            `,
            children: "프로필"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t("nav", { className: "flex gap-4 items-center", children: [
      /* @__PURE__ */ t("span", { className: "px-4 py-2 bg-white/20 rounded text-sm", children: [
        "👤 ",
        o
      ] }),
      /* @__PURE__ */ t("div", { className: "relative", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => c(!s),
            className: "px-4 py-2 bg-white/20 border-none text-white rounded cursor-pointer text-sm hover:bg-white/30 transition-colors",
            children: "설정 ⚙️"
          }
        ),
        s && /* @__PURE__ */ t("div", { className: "absolute right-0 top-full mt-1 bg-white text-tving-gray-600 rounded shadow-lg min-w-[150px] overflow-hidden", children: [
          /* @__PURE__ */ e("button", { className: "w-full px-4 py-3 border-none bg-transparent text-left cursor-pointer text-sm hover:bg-tving-gray-100 transition-colors", children: "프로필 설정" }),
          /* @__PURE__ */ e("button", { className: "w-full px-4 py-3 border-none bg-transparent text-left cursor-pointer text-sm hover:bg-tving-gray-100 transition-colors", children: "테마 변경" }),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => l(o === "Admin" ? "Guest" : "Admin"),
              className: "w-full px-4 py-3 border-none bg-transparent text-left cursor-pointer text-sm hover:bg-tving-gray-100 transition-colors",
              children: "사용자 전환"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
p(import.meta, "header-app", a);
const { mount: g, unmount: x } = u("header", a);
export {
  g as mount,
  x as unmount
};
