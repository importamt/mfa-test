import { useRoutingStore as r, useNotificationStore as i, createMfaApp as n } from "@mfa/framework";
import { jsx as e, jsxs as t } from "react/jsx-runtime";
function o() {
  const { navigate: a } = r();
  return /* @__PURE__ */ e("header", { className: "fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm", children: /* @__PURE__ */ t("div", { className: "flex items-center justify-between px-6 py-4 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center space-x-8", children: [
      /* @__PURE__ */ e("div", { className: "text-red-500 font-bold text-xl cursor-pointer", onClick: () => a("/"), children: "TVING" }),
      /* @__PURE__ */ t("nav", { className: "hidden md:flex space-x-6", children: [
        /* @__PURE__ */ e("a", { href: "#", className: "text-white hover:text-gray-300 transition-colors", children: "실시간" }),
        /* @__PURE__ */ e("a", { href: "#", className: "text-white hover:text-gray-300 transition-colors", children: "TV프로그램" }),
        /* @__PURE__ */ e("a", { href: "#", className: "text-white hover:text-gray-300 transition-colors", children: "영화" }),
        /* @__PURE__ */ e("a", { href: "#", className: "text-white hover:text-gray-300 transition-colors", children: "파라마운트+" })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            a("/login");
          },
          className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors",
          children: "무료 가입"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            a("/login");
          },
          className: "text-white hover:text-gray-300 transition-colors",
          children: "로그인"
        }
      ),
      /* @__PURE__ */ e("button", { className: "text-white hover:text-gray-300 transition-colors", children: "이용권" })
    ] })
  ] }) });
}
function c() {
  const { addNotification: a } = i();
  return /* @__PURE__ */ t("section", { className: "relative min-h-screen flex items-center justify-center", children: [
    /* @__PURE__ */ t("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ e("div", { className: "w-full h-full bg-gradient-to-br from-red-900 via-black to-blue-900" }),
      /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-black/70" }),
      /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/60" }),
      /* @__PURE__ */ e("div", { className: "absolute inset-0 backdrop-blur-[1px]" })
    ] }),
    /* @__PURE__ */ e("div", { className: "relative z-10 text-center text-white px-4", children: /* @__PURE__ */ t("div", { className: "bg-black/30 backdrop-blur-sm rounded-3xl px-8 py-12 shadow-2xl", children: [
      /* @__PURE__ */ e("div", { className: "inline-flex items-center bg-red-500 text-white px-3 py-1 rounded-full mb-4 shadow-lg animate-pulse", children: /* @__PURE__ */ e("span", { className: "text-sm", children: "무료 웰컴 혜택 종료 임박!" }) }),
      /* @__PURE__ */ e("div", { className: "inline-flex items-center bg-blue-600 text-white px-3 py-1 rounded-full mb-6 shadow-lg", children: /* @__PURE__ */ e("span", { className: "text-sm", children: "하나의 구독으로 더한 혜택 ✅" }) }),
      /* @__PURE__ */ t("div", { className: "mb-8", children: [
        /* @__PURE__ */ t("div", { className: "flex items-center justify-center space-x-4 mb-6", children: [
          /* @__PURE__ */ e("span", { className: "text-red-500 font-bold text-2xl drop-shadow-lg", children: "TVING" }),
          /* @__PURE__ */ e("span", { className: "text-white text-xl drop-shadow-lg", children: "×" }),
          /* @__PURE__ */ e("span", { className: "text-blue-500 font-bold text-2xl drop-shadow-lg", children: "Wavve" })
        ] }),
        /* @__PURE__ */ e("h1", { className: "text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl", children: "더 털 이용권 출시" }),
        /* @__PURE__ */ e("p", { className: "text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-lg", children: "월 7,900원부터" }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              a({
                type: "info",
                title: "더 털 이용권",
                message: "월 7,900원부터 시작하는 특별 혜택을 확인하세요!"
              });
            },
            className: "bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors shadow-xl hover:shadow-2xl transform hover:scale-105",
            children: "지금 보러가기"
          }
        )
      ] })
    ] }) })
  ] });
}
function d() {
  return /* @__PURE__ */ e("section", { className: "bg-black text-white py-16 px-6", children: /* @__PURE__ */ t("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ t("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ e("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: "티빙 오리지널 시리즈" }),
      /* @__PURE__ */ e("p", { className: "text-gray-400 text-lg", children: "오직 티빙에서만 만날 수 있는" })
    ] }),
    /* @__PURE__ */ e("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4", children: [
      { title: "재벌집 막내아들", category: "드라마" },
      { title: "환혼: 빛과 그림자", category: "드라마" },
      { title: "술꾼도시여자들", category: "예능" },
      { title: "유미의 세포들", category: "드라마" },
      { title: "눈물의 여왕", category: "드라마" },
      { title: "피라미드 게임", category: "드라마" }
    ].map((l, s) => /* @__PURE__ */ e(
      "div",
      {
        className: "group cursor-pointer transform transition-transform hover:scale-105",
        children: /* @__PURE__ */ t("div", { className: "aspect-[3/4] bg-gradient-to-br from-red-900 to-black rounded-lg mb-2 relative overflow-hidden", children: [
          /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" }),
          /* @__PURE__ */ t("div", { className: "absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent", children: [
            /* @__PURE__ */ e("p", { className: "text-xs text-gray-300", children: l.category }),
            /* @__PURE__ */ e("p", { className: "text-sm font-semibold", children: l.title })
          ] })
        ] })
      },
      s
    )) })
  ] }) });
}
function h() {
  return /* @__PURE__ */ t("div", { className: "min-h-screen bg-black", children: [
    /* @__PURE__ */ e(o, {}),
    /* @__PURE__ */ e(c, {}),
    /* @__PURE__ */ e(d, {})
  ] });
}
const { mount: g, unmount: b } = n("onboarding", h);
export {
  g as mount,
  b as unmount
};
