"use client";

export default function Home() {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">HTTP 요청 테스트</h1>
        <button
          type="button"
          onClick={handleGetRequest}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          GET 요청 보내기 (포트 3001)
        </button>
      </div>
    </div>
  );
}
