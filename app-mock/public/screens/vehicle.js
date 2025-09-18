const vehicleScreen = document.getElementById("vehicle-screen");

const saveVehicleBtn = document.getElementById("submit-add-vehicle");
const cancelVehicleBtn = document.getElementById("cancel-add-vehicle");

// Form fields
const nameInput = document.getElementById("vehicle-name");
mapScreen;
const typeSelect = document.getElementById("vehicle-type");
const colorInput = document.getElementById("vehicle-color");
const electricCheckbox = document.getElementById("vehicle-electric");
const defaultCheckbox = document.getElementById("vehicle-default");

// Cancel and return to profile
cancelVehicleBtn.addEventListener("click", () => {
  showScreen("profile-screen");
});

// Save vehicle and return to profile
saveVehicleBtn.addEventListener("click", () => {
  const name = nameInput.value.trim(); // #Nome veicolo
  const type = typeSelect.value; // #ID tipo veicolo
  const typeLabel = typeSelect.options[typeSelect.selectedIndex].text; // #Etichetta tipo veicolo
  const color = colorInput.value;
  const isElectric = electricCheckbox.checked; // #È elettrico
  const isDefault = defaultCheckbox.checked; // #È predefinito

  if (!name) {
    alert("Please enter a vehicle name."); // #Inserisci un nome per il veicolo
    return;
  }

  const newVehicle = {
    id: "v" + Date.now(),
    name,
    type,
    typeLabel,
    color,
    isElectric,
    isDefault,
  };

  // Load existing profile from localStorage
  let profile = JSON.parse(localStorage.getItem("firestore_profile"));
  if (!profile) {
    profile = { name: "", email: "", vehicles: [] };
  }

  // Unset other defaults if needed
  if (isDefault) {
    profile.vehicles.forEach((v) => (v.isDefault = false)); // #Togli "principale" da altri veicoli
  }

  profile.vehicles.push(newVehicle); // #Aggiungi nuovo veicolo
  localStorage.setItem("firestore_profile", JSON.stringify(profile));
  console.log("✅ Vehicle saved", newVehicle); // #Veicolo salvato

  // Reset form
  nameInput.value = "";
  typeSelect.value = "city_bike";
  colorInput.value = "#9ED9C0";
  electricCheckbox.checked = false;
  defaultCheckbox.checked = false;

  // Return to profile
  showScreen("profile-screen");

  // Reload profile screen if function exists
  if (typeof loadProfile === "function") {
    loadProfile(); // #Aggiorna profilo
  }
});
