const ClientAppSdk = window.purecloudClientAppSdk;
const app = new ClientAppSdk.App();

const output = document.getElementById("output");

function log(title, data) {
  output.textContent += `\n=== ${title} ===\n`;
  if (data !== undefined) {
    output.textContent +=
      typeof data === "string"
        ? data
        : JSON.stringify(data, null, 2);
    output.textContent += "\n";
  }
}

/**
 * 1️⃣ 앱이 Genesys Cloud 안에서 정상적으로 초기화되었는지
 */
app.on("app:ready", async () => {
  log("APP READY", "Client App handshake completed");

  try {
    const appInfo = await app.getAppInfo();
    log("APP INFO (auto)", appInfo);
  } catch (e) {
    log("APP INFO ERROR (auto)", e.toString());
  }

  try {
    const user = await app.getUser();
    log("USER (auto)", user);
  } catch (e) {
    log("USER ERROR (auto)", e.toString());
  }
});

/**
 * 2️⃣ 수동 상태 확인
 */
document.getElementById("btnStatus").onclick = async () => {
  log("STATUS CHECK", "button clicked");

  try {
    const info = await app.getAppInfo();
    log("APP INFO", info);
  } catch (e) {
    log("APP INFO ERROR", e.toString());
  }
};

/**
 * 3️⃣ 사용자 컨텍스트 확인 (인증 확인용 핵심)
 */
document.getElementById("btnUser").onclick = async () => {
  try {
    const user = await app.getUser();
    log("USER", user);
  } catch (e) {
    log("USER ERROR", e.toString());
  }
};

/**
 * 4️⃣ App Info 버튼
 */
document.getElementById("btnAppInfo").onclick = async () => {
  try {
    const info = await app.getAppInfo();
    log("APP INFO", info);
  } catch (e) {
    log("APP INFO ERROR", e.toString());
  }
};
