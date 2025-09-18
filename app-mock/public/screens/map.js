const map = L.map("map", { zoomControl: false }).setView(
  [41.9028, 12.4964],
  13
);
L.tileLayer(
  "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
  {
    attribution: "© OpenStreetMap contributors, © CyclOSM",
  }
).addTo(map);

let userMarker;
const locateBtn = document.getElementById("locate-btn");
locateBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocalizzazione non supportata dal browser");
    return;
  }
  locateBtn.classList.add("active");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      map.setView([latitude, longitude], 16);
      if (userMarker) {
        userMarker.setLatLng([latitude, longitude]);
      } else {
        userMarker = L.circleMarker([latitude, longitude], {
          radius: 8,
          color: "#3b82f6",
          fillColor: "#3b82f6",
          fillOpacity: 1,
          weight: 2,
        }).addTo(map);
      }
      setTimeout(() => locateBtn.classList.remove("active"), 1000);
    },
    (err) => {
      alert("Permesso negato o errore nella geolocalizzazione");
      locateBtn.classList.remove("active");
    }
  );
});

let directionMarker;

// Funzione per aggiornare o creare la freccia di direzione
function updateDirectionMarker(lat, lon, heading) {
  if (directionMarker) {
    directionMarker.setLatLng([lat, lon]);
    directionMarker.setRotationAngle(heading);
  } else {
    const iconArrow = L.icon({
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Arrow_up_font_awesome.svg/512px-Arrow_up_font_awesome.svg.png",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    directionMarker = L.marker([lat, lon], {
      icon: iconArrow,
      rotationAngle: heading,
      rotationOrigin: "center center", // opzionale, ma consigliato
    }).addTo(map);
  }
}

// Listener per la bussola
window.addEventListener("deviceorientation", (event) => {
  if (!userMarker) return; // solo se la posizione è già stata trovata
  const heading = event.alpha || 0;
  const latlng = userMarker.getLatLng();
  updateDirectionMarker(latlng.lat, latlng.lng, heading);
});

const legendBtn = document.getElementById("legend-btn");
const legendModal = document.getElementById("legend-modal");
const legendClose = document.getElementById("legend-close");

legendBtn.addEventListener("click", () => {
  legendModal.style.display = "flex";
});

legendClose.addEventListener("click", () => {
  legendModal.style.display = "none";
});
