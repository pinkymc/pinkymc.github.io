const copyBtn = document.getElementById("copyBtn");
const serverIp = document.getElementById("serverIp");
const loader = document.getElementById("loader");
const openLauncher = document.getElementById("openLauncher");
const closeLauncher = document.getElementById("closeLauncher");
const launcherModal = document.getElementById("launcherModal");
const downloadLinks = document.querySelectorAll(".download-link");

// Put your installer/archive file in: /game/PinkyClient.zip
const GAME_FILE_URL = "https://cdn.discordapp.com/attachments/1188625299559153685/1487609002526511164/PinkyClient.zip?ex=69c9c358&is=69c871d8&hm=7e6affa6a92b7040c3f09ee7f4784c5fa7f74b39ee5a1906b14310001af1ffcd&";

window.addEventListener("load", () => {
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add("hide");
  }, 450);
});

if (downloadLinks.length) {
  downloadLinks.forEach((link) => {
    link.setAttribute("href", GAME_FILE_URL);
    link.setAttribute("download", GAME_FILE_NAME);
  });
}

if (copyBtn && serverIp) {
  copyBtn.addEventListener("click", async () => {
    const ip = serverIp.textContent.trim();
    if (!ip) return;

    try {
      await navigator.clipboard.writeText(ip);
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = "Copy";
      }, 1200);
    } catch {
      copyBtn.textContent = "Error";
      setTimeout(() => {
        copyBtn.textContent = "Copy";
      }, 1200);
    }
  });
}

function setModal(open) {
  if (!launcherModal) return;
  launcherModal.classList.toggle("show", open);
  launcherModal.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
}

if (openLauncher) {
  openLauncher.addEventListener("click", () => setModal(true));
}

if (closeLauncher) {
  closeLauncher.addEventListener("click", () => setModal(false));
}

if (launcherModal) {
  launcherModal.addEventListener("click", (event) => {
    if (event.target === launcherModal) {
      setModal(false);
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setModal(false);
  }
});
