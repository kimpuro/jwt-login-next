const http = require("http");
const url = require("url");

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const timestamp = new Date().toISOString();

  // 요청 헤더 정보
  const headers = JSON.stringify(req.headers, null, 2);

  console.log("\n=".repeat(80));
  console.log(`[${timestamp}] 새로운 HTTP 요청`);
  console.log("=".repeat(80));
  console.log(`메소드: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`경로: ${parsedUrl.pathname}`);
  console.log(`쿼리 파라미터:`, parsedUrl.query);
  console.log(`헤더:\n${headers}`);

  // 요청 본문(body) 읽기
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    if (body) {
      console.log(`본문: ${body}`);
      try {
        const jsonBody = JSON.parse(body);
        console.log(`JSON 본문:`, JSON.stringify(jsonBody, null, 2));
      } catch (e) {
        // JSON이 아닌 경우 무시
      }
    }
    console.log("=".repeat(80) + "\n");

    // 응답 전송
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });

    res.end(
      JSON.stringify({
        message: "요청이 로그에 기록되었습니다",
        timestamp: timestamp,
        method: req.method,
        url: req.url,
        receivedBody: body || null,
      }),
    );
  });
});

server.listen(PORT, () => {
  console.log("\n🚀 로깅 백엔드 서버 시작됨");
  console.log(`📡 포트: ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log("\n모든 HTTP 요청이 콘솔에 로그로 출력됩니다.\n");
});
