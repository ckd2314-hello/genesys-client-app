// Client Apps SDK 전역 객체
const ClientApps = window.purecloud.apps;

// SDK 인스턴스 생성
const app = new ClientApps.ClientApp();

// DOM
const log = document.getElementById("log");
const showInfoBtn = document.getElementById("showInfoBtn");

// 앱 준비 완료 이벤트
app.on('app:ready', () => {
  log.textContent += "Client App Ready\n";
});

// 버튼 클릭 시 앱 정보 표시
showInfoBtn.onclick = async () => {
  try {
    const info = await app.getAppInfo();
    log.textContent += JSON.stringify(info, null, 2) + "\n";
  } catch (e) {
    log.textContent += "getAppInfo error: " + e + "\n";
  }
};
