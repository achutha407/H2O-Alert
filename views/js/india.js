// Initialize map centered on India
var map = L.map('map', {
    minZoom: 4,
    maxZoom: 8,
    maxBounds: [[6, 68], [37, 97]], // India boundaries
    maxBoundsViscosity: 1.0,
    worldCopyJump: false
}).setView([22, 78], 5);

// Load tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    noWrap: true
}).addTo(map);

// Water crisis levels per Indian state
var crisisLevels = {
    "Rajasthan": "high",
    "Maharashtra": "moderate",
    "Punjab": "mild",
    "Kerala": "stable",
    "Tamil Nadu": "high",
    "Uttar Pradesh": "moderate",
    "West Bengal": "mild",
    "Karnataka": "high",
    "Gujarat": "moderate",
    "Madhya Pradesh": "stable",
    "Bihar": "high",
    "Andhra Pradesh": "moderate",
    "Odisha": "mild",
    "Assam": "abundant",
    "Himachal Pradesh": "stable",
    "Goa": "abundant"
};

// Define colors for crisis levels
function getColor(crisis) {
    return crisis === "high" ? "#ff4d4d" :
           crisis === "moderate" ? "#ff914d" :
           crisis === "mild" ? "#ffd24d" :
           crisis === "stable" ? "#4dff88" :
           crisis === "abundant" ? "#4db8ff" :
           "#a0a0a0";
}

// Style function for coloring states
function style(feature) {
    return {
        fillColor: getColor(crisisLevels[feature.properties.shapeName] || "stable"),
        weight: 1,
        opacity: 1,
        color: "white",
        fillOpacity: 0.75
    };
}

// Hover effect
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 2,
        color: '#000',
        fillOpacity: 0.9
    });
    layer.bringToFront();
}

// Reset style on mouseout
function resetHighlight(e) {
    geojsonLayer.resetStyle(e.target);
}

// Load India state map with GeoJSON (Directly from GitHub)
var geojsonLayer = new L.GeoJSON.AJAX("https://raw.githubusercontent.com/achutha407/H2O-Alert/main/geoBoundaries-IND-ADM1_simplified.geojson", {
    style: style,
    onEachFeature: function (feature, layer) {
        console.log(feature.properties); // Debugging
        let crisisText = crisisLevels[feature.properties.shapeName] || "Stable";
        layer.bindTooltip(`${feature.properties.shapeName}: ${crisisText.charAt(0).toUpperCase() + crisisText.slice(1)} Crisis`, {
            permanent: false,
            direction: "auto",
            className: "map-tooltip"
        });
    }
}).addTo(map);
