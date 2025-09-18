function showScreen(screenId) {
  const screens = [
    "map-screen",
    "history-screen",
    "profile-screen",
    "vehicle-screen",
    "sociodemo-screen",
  ];
  screens.forEach(
    (id) =>
      (document.getElementById(id).style.display =
        id === screenId ? "block" : "none")
  );
}

const mapTab = document.getElementById("map-tab");
const historyTab = document.getElementById("history-tab");
const mapScreen = document.getElementById("map-screen");
const historyScreen = document.getElementById("history-screen");
const profileTab = document.getElementById("profile-tab");
const profileScreen = document.getElementById("profile-screen");
const sociodemoScreen = document.getElementById("sociodemo-screen");

mapTab.addEventListener("click", () => {
  showScreen("map-screen");
  mapTab.classList.add("active");
  historyTab.classList.remove("active");
  profileTab.classList.remove("active");
  map.invalidateSize();
});

historyTab.addEventListener("click", () => {
  showScreen("history-screen");
  historyTab.classList.add("active");
  mapTab.classList.remove("active");
  profileTab.classList.remove("active");
});

profileTab.addEventListener("click", () => {
  showScreen("profile-screen");
  profileTab.classList.add("active");
  mapTab.classList.remove("active");
  historyTab.classList.remove("active");
});
