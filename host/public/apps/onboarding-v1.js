import { useRoutingStore as s, useNotificationStore as o, createMfaApp as c } from "@mfa/framework";
import { jsx as e, jsxs as t } from "react/jsx-runtime";
function r() {
  const { navigate: l } = s(), { addNotification: a } = o(), n = (i) => {
    a({
      type: "info",
      title: i,
      message: `${i} 섹션으로 이동합니다`
    });
  };
  return /* @__PURE__ */ e("header", { className: "fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm", children: /* @__PURE__ */ t("div", { className: "flex items-center justify-between px-6 py-4 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center space-x-8", children: [
      /* @__PURE__ */ e(
        "div",
        {
          className: "text-red-500 font-bold text-xl cursor-pointer",
          onClick: () => {
            l("/");
          },
          children: "TVING"
        }
      ),
      /* @__PURE__ */ t("nav", { className: "hidden md:flex space-x-6", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => n("실시간"),
            className: "text-white hover:text-gray-300 transition-colors",
            children: "실시간"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => n("TV프로그램"),
            className: "text-white hover:text-gray-300 transition-colors",
            children: "TV프로그램"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => n("영화"),
            className: "text-white hover:text-gray-300 transition-colors",
            children: "영화"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => n("파라마운트+"),
            className: "text-white hover:text-gray-300 transition-colors",
            children: "파라마운트+"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            l("/login");
          },
          className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors",
          children: "무료 가입"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            l("/login");
          },
          className: "text-white hover:text-gray-300 transition-colors",
          children: "로그인"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            a({
              type: "info",
              title: "이용권",
              message: "이용권 구매 페이지는 준비 중입니다"
            });
          },
          className: "text-white hover:text-gray-300 transition-colors",
          children: "이용권"
        }
      )
    ] })
  ] }) });
}
function d() {
  const { addNotification: l } = o(), { navigate: a } = s();
  return /* @__PURE__ */ t("section", { className: "relative min-h-screen flex items-center justify-center", children: [
    /* @__PURE__ */ t("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ e("div", { className: "w-full h-full bg-gradient-to-br from-red-900 via-black to-blue-900" }),
      /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-black/70" }),
      /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/60" }),
      /* @__PURE__ */ e("div", { className: "absolute inset-0 backdrop-blur-[1px]" })
    ] }),
    /* @__PURE__ */ e("div", { className: "relative z-10 text-center text-white px-4", children: /* @__PURE__ */ t("div", { className: "bg-black/30 backdrop-blur-sm rounded-3xl px-8 py-12 shadow-2xl", children: [
      /* @__PURE__ */ e("div", { className: "inline-flex items-center bg-red-500 text-white px-3 py-1 rounded-full mb-4 shadow-lg", children: /* @__PURE__ */ e("span", { className: "text-sm", children: "무료 웰컴 혜택 종료 임박!" }) }),
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
              l({
                type: "info",
                title: "더 털 이용권",
                message: "월 7,900원부터 시작하는 특별 혜택을 확인하세요!"
              }), a("/main");
            },
            className: "bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors shadow-xl hover:shadow-2xl",
            children: "지금 보러가기"
          }
        )
      ] })
    ] }) })
  ] });
}
function h() {
  return /* @__PURE__ */ e("section", { className: "bg-black text-white py-16 px-6", children: /* @__PURE__ */ t("div", { className: "max-w-4xl mx-auto text-center", children: [
    /* @__PURE__ */ e("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: "티빙 오리지널 시리즈" }),
    /* @__PURE__ */ e("p", { className: "text-gray-400 text-lg", children: "오직 티빙에서만 만날 수 있는" })
  ] }) });
}
function x() {
  return /* @__PURE__ */ t("div", { className: "min-h-screen bg-black", children: [
    /* @__PURE__ */ e(r, {}),
    /* @__PURE__ */ e(d, {}),
    /* @__PURE__ */ e(h, {})
  ] });
}
const { mount: f, unmount: v } = c("onboarding", x);
export {
  f as mount,
  v as unmount
};
