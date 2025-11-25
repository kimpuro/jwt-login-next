"use client";

import { useState } from "react";

export default function Home() {
  const [cookieName, setCookieName] = useState("");
  const [cookieValue, setCookieValue] = useState("");

  const handleGetRequest = async () => {
    try {
      const response = await fetch("http://localhost:3001/", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log("응답:", data);
      alert(`응답 받음: ${data.message}`);
    } catch (error) {
      console.error("요청 실패:", error);
      alert("요청 실패! 서버가 실행 중인지 확인하세요.");
    }
  };

  const handleCreateHttpOnlyCookie = () => {
    if (!cookieName || !cookieValue) {
      alert("쿠키 이름과 값을 모두 입력하세요!");
      return;
    }

    console.log("=== HttpOnly 쿠키 생성 시도 ===");
    console.log(`이름: ${cookieName}, 값: ${cookieValue}`);

    // 시도 1: HttpOnly 옵션과 함께 쿠키 생성 시도
    document.cookie = `${cookieName}=${cookieValue}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`;
    console.log("시도 1: HttpOnly 옵션 포함");

    // 결과 확인
    const allCookies = document.cookie;
    console.log("현재 쿠키들:", allCookies);

    // HttpOnly 없이 생성 (비교용)
    const testCookieName = `${cookieName}_noHttpOnly`;
    document.cookie = `${testCookieName}=${cookieValue}; Max-Age=3600`;
    console.log("시도 2: HttpOnly 없이 생성 (비교용)");

    const afterCookies = document.cookie;
    console.log("생성 후 쿠키들:", afterCookies);

    // 결과 분석
    const hasHttpOnly = afterCookies.includes(`${cookieName}=`);
    const hasNormal = afterCookies.includes(`${testCookieName}=`);

    let message = "🔍 결과:\n\n";
    if (hasHttpOnly) {
      message += `❌ ${cookieName}: 생성됨 (하지만 HttpOnly는 무시됨)\n`;
      message += "→ JavaScript로 접근 가능 (보안 취약)\n\n";
    } else {
      message += `❌ ${cookieName}: HttpOnly로 생성 실패\n`;
      message += "→ 클라이언트에서는 HttpOnly 쿠키를 만들 수 없습니다!\n\n";
    }

    if (hasNormal) {
      message += `✅ ${testCookieName}: 일반 쿠키로 생성됨\n`;
      message += "→ JavaScript로 접근 가능\n\n";
    }

    message +=
      "💡 결론: HttpOnly 쿠키는 서버(Set-Cookie)에서만 만들 수 있습니다!";

    alert(message);
    console.log("=".repeat(50));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold mb-4">HTTP 요청 테스트</h1>

        {/* GET 요청 섹션 */}
        <div className="border-b pb-6">
          <button
            type="button"
            onClick={handleGetRequest}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            GET 요청 보내기 (포트 3001)
          </button>
        </div>

        {/* HttpOnly 쿠키 생성 시도 섹션 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            HttpOnly 쿠키 생성 시도
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            클라이언트에서 HttpOnly 쿠키를 만들 수 있는지 테스트
          </p>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="쿠키 이름 (예: myToken)"
              value={cookieName}
              onChange={(e) => setCookieName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="쿠키 값 (예: abc123)"
              value={cookieValue}
              onChange={(e) => setCookieValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={handleCreateHttpOnlyCookie}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
            >
              HttpOnly 쿠키 생성 시도
            </button>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            💡 콘솔(F12)을 열어서 자세한 결과를 확인하세요
          </div>
        </div>
      </div>
    </div>
  );
}
