const output = document.getElementById("output");

/* ---------- util ---------- */
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

/* ---------- SDK 존재 확인 (중요) ---------- */
if (!window.purecloudClientAppSdk) {
  log("ERROR", "purecloudClientAppSdk NOT loaded");
  throw new Error("Client App SDK not loaded");
}

/* ---------- App 생성 ---------- */
const ClientAppSdk = window.purecloudClientAppSdk;
const app = new ClientAppSdk.App();

/* ---------- Lifecycle ---------- */
/**
 * 공식 문서 기준:
 * app:ready 이후에만 SDK API 호출 가능
 */
app.on("app:ready", async () => {
  log("APP READY", "Handshake with Genesys Cloud completed");

  try {
    const appInfo = await app.getAppInfo();
    log("APP INFO", appInfo);
  } catch (e) {
    log("APP INFO ERROR", e.toString());
  }
});

/* ---------- 버튼: 상태 ---------- */
document.getElementById("btnStatus").onclick = async () => {
  try {
    const info = await app.getAppInfo();
    log("STATUS", info);
  } catch (e) {
    log("STATUS ERROR", e.toString());
  }
};

/* ---------- 버튼: 사용자 ---------- */
document.getElementById("btnUser").onclick = async () => {
  try {
    const user = await app.getUser();
    log("USER", user);
  } catch (e) {
    log("USER ERROR", e.toString());
  }
};

/* ---------- 버튼: Directory API ---------- */
document.getElementById("btnDirectory").onclick = async () => {
  try {
    const user = await app.getUser();

    /**
     * 공식 문서:
     * DirectoryApi는 Client App SDK 내부 API
     */
    const directoryApi = new app.DirectoryApi();

    const groups = await directoryApi.getDirectoryUsersGroups(user.id);
    log("DIRECTORY GROUPS", groups);
  } catch (e) {
    log("DIRECTORY ERROR", e.toString());
  }
};
