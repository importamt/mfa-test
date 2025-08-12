import { useState as s, useNotificationStore as g, useRoutingStore as d, createMfaApp as b } from "@mfa/framework";
import { jsx as t, jsxs as r } from "react/jsx-runtime";
function m() {
  const [n, o] = s(""), { addNotification: l } = g(), { navigate: i } = d(), a = [
    {
      id: "tving",
      name: "TVING ID로 시작하기",
      icon: "T",
      bgColor: "bg-red-600 hover:bg-red-700",
      textColor: "text-white",
      iconBg: "bg-red-600",
      badge: "추천"
    },
    {
      id: "naver",
      name: "네이버로 시작하기",
      icon: "N",
      bgColor: "bg-green-500 hover:bg-green-600",
      textColor: "text-white",
      iconBg: "bg-green-500"
    },
    {
      id: "kakao",
      name: "카카오로 시작하기",
      icon: "💬",
      bgColor: "bg-yellow-400 hover:bg-yellow-500",
      textColor: "text-gray-900",
      iconBg: "bg-yellow-400"
    },
    {
      id: "cjone",
      name: "CJ ONE으로 시작하기",
      icon: "O",
      bgColor: "bg-purple-600 hover:bg-purple-700",
      textColor: "text-white",
      iconBg: "bg-purple-600"
    },
    {
      id: "apple",
      name: "Apple로 계속하기",
      icon: "🍎",
      bgColor: "bg-gray-900 hover:bg-black",
      textColor: "text-white",
      iconBg: "bg-gray-900"
    },
    {
      id: "facebook",
      name: "페이스북으로 시작하기",
      icon: "f",
      bgColor: "bg-blue-600 hover:bg-blue-700",
      textColor: "text-white",
      iconBg: "bg-blue-600"
    },
    {
      id: "twitter",
      name: "X(구 트위터)로 시작하기",
      icon: "X",
      bgColor: "bg-gray-800 hover:bg-gray-900",
      textColor: "text-white",
      iconBg: "bg-gray-800"
    }
  ], c = (e) => {
    o(e), l({
      type: "info",
      title: "로그인 시도",
      message: `${e.toUpperCase()}로 로그인 중...`
    }), setTimeout(() => {
      l({
        type: "success",
        title: "로그인 성공",
        message: "메인 페이지로 이동합니다"
      }), i("/");
    }, 1500);
  };
  return /* @__PURE__ */ t("div", { className: "min-h-screen bg-black flex items-center justify-center px-4", children: /* @__PURE__ */ r("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ t("div", { className: "text-center mb-12", children: /* @__PURE__ */ t("h1", { className: "text-red-500 font-bold text-4xl tracking-tight", children: "TVING" }) }),
    /* @__PURE__ */ r("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ t("h2", { className: "text-white text-2xl font-bold mb-2", children: "반가워요!" }),
      /* @__PURE__ */ t("p", { className: "text-gray-400", children: "계정을 선택해주세요." })
    ] }),
    /* @__PURE__ */ t("div", { className: "space-y-3 mb-8", children: a.map((e) => /* @__PURE__ */ r(
      "button",
      {
        onClick: () => c(e.id),
        className: `w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] relative ${e.bgColor} ${n === e.id ? "ring-2 ring-white ring-offset-2 ring-offset-black" : ""}`,
        children: [
          /* @__PURE__ */ t("div", { className: `w-7 h-7 rounded flex items-center justify-center ${e.iconBg} flex-shrink-0`, children: /* @__PURE__ */ t("span", { className: `${e.textColor} font-bold text-sm`, children: e.icon }) }),
          /* @__PURE__ */ t("span", { className: `${e.textColor} font-medium flex-1 text-left`, children: e.name }),
          e.badge && /* @__PURE__ */ t("div", { className: "absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-pulse", children: e.badge })
        ]
      },
      e.id
    )) }),
    /* @__PURE__ */ t("div", { className: "text-center", children: /* @__PURE__ */ r("p", { className: "text-gray-500 text-sm", children: [
      "아이디를 잊으신 경우",
      " ",
      /* @__PURE__ */ t(
        "button",
        {
          onClick: () => {
            l({
              type: "info",
              title: "아이디 찾기",
              message: "아이디 찾기 기능은 준비 중입니다"
            });
          },
          className: "text-gray-400 underline hover:text-gray-300 transition-colors",
          children: "아이디 찾기"
        }
      )
    ] }) })
  ] }) });
}
function x() {
  return /* @__PURE__ */ t(m, {});
}
const { mount: f, unmount: p } = b("login", x);
export {
  f as mount,
  p as unmount
};
