// Initialize map
var map = L.map('map', {
    minZoom: 2,
    maxBounds: [[-85, -180], [85, 180]], // Prevents scrolling beyond the world
    maxBoundsViscosity: 1.0, // Enforce strict map boundaries
    worldCopyJump: false, // Prevents duplicate maps when panning
    noWrap: true // Ensures the map does not wrap horizontally
}).setView([20, 0], 2);

// Load tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Water crisis levels per country
var crisisLevels = {
    "India": "high",
    "United States": "moderate",
    "China": "moderate",
    "Brazil": "mild",
    "Russia": "stable",
    "Canada": "abundant",
    "Egypt": "high",
    "Australia": "stable",
    "South Africa": "mild",
    "Mexico": "moderate",
    "Germany": "stable",
    "France": "mild",
    "Saudi Arabia": "high",
    "Argentina": "mild",
    "Japan": "stable",
    "United Kingdom": "mild"
};

// Define colors for crisis levels (brighter & more distinct)
function getColor(crisis) {
    return crisis === "high" ? "#ff4d4d" :      // Bright Red
           crisis === "moderate" ? "#ff914d" :  // Vivid Orange
           crisis === "mild" ? "#ffd24d" :      // Vibrant Yellow
           crisis === "stable" ? "#4dff88" :    // Bright Green
           crisis === "abundant" ? "#4db8ff" :  // Strong Blue
           "#a0a0a0"; // Default Grey for missing data
}

// Style function for coloring countries
function style(feature) {
    return {
        fillColor: getColor(crisisLevels[feature.properties.name] || "stable"), // Default to "stable"
        weight: 1,
        opacity: 1,
        color: "white",
        fillOpacity: 0.75
    };
}

// Hover effects for interactivity
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

// Load the world map with GeoJSON
var geojsonLayer = new L.GeoJSON.AJAX("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json", {
    style: style,
    onEachFeature: function (feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight
        });

        // Tooltip for country names & crisis levels
        let crisisText = crisisLevels[feature.properties.name] || "Stable";
        layer.bindTooltip(`${feature.properties.name}: ${crisisText.charAt(0).toUpperCase() + crisisText.slice(1)} Crisis`, {
            permanent: false,
            direction: "auto",
            className: "map-tooltip"
        });
    }
}).addTo(map);
