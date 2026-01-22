// Global SDK
const ClientApps = window.purecloudClientAppSdk;

// Create app
const app = new ClientApps.App();
const output = document.getElementById("output");

// Logging helper
function log(title, data) {
  output.textContent += `\n=== ${title} ===\n`;
  if (data !== undefined) {
    output.textContent += JSON.stringify(data, null, 2) + "\n";
  }
}

// When SDK handshake completes
app.on("app:ready", async () => {
  log("APP READY", "Client App Initialized");
});

// Button click handler
document.getElementById("btnWhoAmI").onclick = async () => {
  try {
    // Basic user info
    const user = await app.getUser();
    log("User Info", user);

    // DirectoryApi invocation
    const directory = new app.DirectoryApi();

    // e.g., search groups the user is in (example filter by given user ID)
    const groupResponse = await directory.getDirectoryUsersGroups(user.id);
    log("User Groups", groupResponse);
    
  } catch (error) {
    log("Error", error.toString());
  }
};
