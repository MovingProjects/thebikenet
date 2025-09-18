function hexToRgba(hex, alpha = 0.2) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const profileInfoDiv = document.querySelector(".profile-info");
const vehicleList = document.getElementById("vehicle-list");
const addVehicleBtn = document.getElementById("add-vehicle-btn");
const logoutBtn = document.getElementById("logout-btn");

const emailText = document.getElementById("email-text");

let userProfile = null;

// Load user profile from localStorage or fallback JSON
function loadProfile() {
  const stored = localStorage.getItem("firestore_profile");
  if (stored) {
    console.log("✅ Profile loaded from localStorage");
    userProfile = JSON.parse(stored);
    renderProfile();
  } else {
    console.log("➡️ Loading profile from db_mock/profile.json");
    fetch("db_mock/profile.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load profile JSON");
        return res.json();
      })
      .then((data) => {
        userProfile = data;
        saveProfile();
        renderProfile();
      })
      .catch((err) => console.error("Error loading profile:", err));
  }
}

// Render profile info and vehicles
function renderProfile() {
  emailText.textContent = userProfile.email || "";

  vehicleList.innerHTML = "";

  if (userProfile.vehicles?.length > 0) {
    userProfile.vehicles.forEach((vehicle) => {
      const el = createVehicleElement(vehicle);
      vehicleList.appendChild(el);
    });
  } else {
    vehicleList.innerHTML = `<p>No vehicles added yet.</p>`; // #Nessun veicolo registrato
  }
}

function getTypeLabel(type) {
  // Map vehicle type IDs to labels
  const types = {
    city_bike: "Bicicletta da città",
    sport_bike: "Bicicletta sportiva",
    folding_bike: "Bicicletta pieghevole",
    cargo_bike: "Bicicletta cargo",
    scooter: "Monopattino",
    other: "Altro",
  };

  return types[type] || "Altro";
}

// Create vehicle card element
function createVehicleElement(vehicle) {
  const div = document.createElement("div");
  div.classList.add("vehicle-item");
  div.dataset.id = vehicle.id;

  const label = getTypeLabel(vehicle.type);
  const iconHTML = `
    <div class="vehicle-icon" style="background-color: ${
      vehicle.color || "#F5F5F5"
    }">
      <img src="images/${vehicle.type}.png" alt="${label}" />
    </div>
  `;

  div.innerHTML = `
    <div class="vehicle-header">
      ${iconHTML}
      <div>
        <p>
          <strong style="color:${vehicle.color || "#1E4E4E"}">${
    vehicle.name
  }</strong>
          ${
            vehicle.isElectric
              ? '<i class="bi bi-lightning-charge-fill" title="Electric" style="color:#F5C25C; margin-left: 6px;"></i>'
              : ""
          }
        </p>
        <p>${label}</p>        
        ${
          vehicle.isDefault
            ? '<span class="default-badge">Main</span>' // #Principale
            : ""
        }
      </div>
    </div>
<button class="remove-vehicle-btn"><i class="bi bi-trash"></i></button>
  `;

  const iconDiv = document.createElement("div");
  iconDiv.className = "vehicle-icon";
  iconDiv.style.backgroundColor = hexToRgba(vehicle.color, 0.2); // personalizzato

  div.querySelector(".remove-vehicle-btn").addEventListener("click", () => {
    removeVehicle(vehicle.id);
  });

  return div;
}

// Remove a vehicle from the list
function removeVehicle(id) {
  userProfile.vehicles = userProfile.vehicles.filter((v) => v.id !== id);
  document.querySelector(`.vehicle-item[data-id="${id}"]`)?.remove();
  saveProfile();
}

// Show add vehicle screen
addVehicleBtn.addEventListener("click", () => {
  showScreen("vehicle-screen");
});

// Save profile to localStorage
function saveProfile() {
  localStorage.setItem("firestore_profile", JSON.stringify(userProfile));
  console.log("💾 Profile saved to localStorage");
}

// Logout and reset session
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("firestore_profile");
  console.log("🔐 Logged out. Session cleared.");
  loadProfile(); // Reload from fallback file
});

// Init
loadProfile();
