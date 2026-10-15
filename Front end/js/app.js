/*
 * Explore Kilinochchi - Tourist Information & Trip Planning Web Application
 * 
 * Module: ITE2953 Programming Group Project (25S2)
 * Degree: Bachelor of Information Technology (BIT), University of Moratuwa
 * Student ID: E2410134
 * 
 * Description:
 * Client-side script for browsing attractions, searching/filtering,
 * viewing attraction details, generating a 1-day travel itinerary,
 * and administrator management (CRUD).
 */

// Base URL for the ASP.NET Core Web API
const API_URL = "http://localhost:5000/api";

// Default list of 12 verified Kilinochchi attractions (within 25 km radius)
// Used directly if the backend server is not running
const defaultPlaces = [
  {
    id: 1,
    categoryId: 4,
    categoryName: "Recreational & Parks",
    categorySlug: "recreational-parks",
    name: "ReeCha Theme Park",
    shortDescription: "A recreational attraction offering visitors opportunities to enjoy nature, leisure activities, and a family-friendly environment.",
    longDescription: "ReeCha Theme Park is one of the main recreational parks in Kilinochchi. It features family-friendly landscaped gardens, water fountains, picnic spaces, and walking paths. Great spot for families and visitors wanting a peaceful rest in nature.",
    distanceKm: 4.20,
    latitude: 9.3951200,
    longitude: 80.4023100,
    address: "A9 Highway, Kilinochchi",
    openingHours: "09:00 AM - 07:00 PM",
    entranceFee: "LKR 200 (Adults), LKR 100 (Kids)",
    bestTimeToVisit: "Late Afternoon (04:00 PM - 06:30 PM)",
    facilities: "Parking, Restrooms, Cafeteria, Kids Play Area",
    safetyTips: "Supervise children near water areas and keep the park clean.",
    imageUrl: "images/reecha_park.svg",
    isFeatured: true
  },
  {
    id: 2,
    categoryId: 1,
    categoryName: "Historical & Heritage",
    categorySlug: "historical-heritage",
    name: "Kilinochchi War Memorial",
    shortDescription: "A significant landmark associated with the history of the Kilinochchi area and its wartime past.",
    longDescription: "Located along the A9 main highway near Kilinochchi town center, this monument features a pierced lotus symbol representing the journey towards lasting peace after conflict. An essential educational and historical stop for travelers.",
    distanceKm: 1.80,
    latitude: 9.3887000,
    longitude: 80.4011000,
    address: "Kandy-Jaffna Highway (A9), Kilinochchi",
    openingHours: "Open 24 Hours (Best: 08:00 AM - 06:00 PM)",
    entranceFee: "Free",
    bestTimeToVisit: "Early Morning or Evening",
    facilities: "Roadside Parking, Information Plaque",
    safetyTips: "Please maintain respectful decorum. Photography is allowed from designated areas.",
    imageUrl: "images/war_memorial.svg",
    isFeatured: true
  },
  {
    id: 3,
    categoryId: 3,
    categoryName: "Nature & Scenic",
    categorySlug: "nature-scenic",
    name: "Iranamadu Tank",
    shortDescription: "A major irrigation reservoir and scenic location that provides an opportunity to experience the natural environment of the area.",
    longDescription: "Iranamadu Tank is the largest freshwater reservoir in the Northern Province of Sri Lanka. Built for agricultural irrigation across vast paddy tracts, it offers expansive water views, cool breezes, and excellent photography opportunities at sunrise and sunset.",
    distanceKm: 8.50,
    latitude: 9.3378000,
    longitude: 80.4182000,
    address: "Iranamadu Dam Road, Kilinochchi",
    openingHours: "07:00 AM - 06:00 PM",
    entranceFee: "Free",
    bestTimeToVisit: "Early Morning or Sunset (around 05:00 PM)",
    facilities: "Scenic Viewpoint, Benches, Parking",
    safetyTips: "Swimming is strictly prohibited near the dam spillway. Please follow security signs.",
    imageUrl: "images/iranamadu_tank.svg",
    isFeatured: true
  },
  {
    id: 4,
    categoryId: 1,
    categoryName: "Historical & Heritage",
    categorySlug: "historical-heritage",
    name: "Poonakary Fort",
    shortDescription: "A historical site representing the cultural and historical heritage of the northern region.",
    longDescription: "Constructed originally by the Portuguese and later fortified by the Dutch in 1658, Poonakary Fort was strategically positioned to guard the Jaffna lagoon entry point. The surviving stone ramparts and watchtower ruins showcase seventeenth-century military architecture.",
    distanceKm: 23.40,
    latitude: 9.5085000,
    longitude: 80.2081000,
    address: "Pooneryn, Kilinochchi District",
    openingHours: "08:00 AM - 05:30 PM",
    entranceFee: "Free",
    bestTimeToVisit: "Morning (08:30 AM - 11:00 AM)",
    facilities: "Signboards, Open Heritage Grounds",
    safetyTips: "Wear sturdy shoes. Be cautious around old stone steps and uneven ground.",
    imageUrl: "images/poonakary_fort.svg",
    isFeatured: true
  },
  {
    id: 5,
    categoryId: 4,
    categoryName: "Recreational & Parks",
    categorySlug: "recreational-parks",
    name: "Green Park",
    shortDescription: "A local recreational space where visitors can spend time in an outdoor environment.",
    longDescription: "A pleasant municipal public park in Kilinochchi town, offering walking and jogging tracks, shaded seating under native trees, and green lawns. A popular evening meeting place for local residents and tourists taking a break from road journeys.",
    distanceKm: 1.20,
    latitude: 9.3840000,
    longitude: 80.3980000,
    address: "Main Street, Kilinochchi Town",
    openingHours: "06:00 AM - 08:00 PM",
    entranceFee: "Free",
    bestTimeToVisit: "Late Afternoon and Evening",
    facilities: "Walking Trails, Shaded Benches, Night Lighting",
    safetyTips: "Keep the area tidy and use trash bins provided.",
    imageUrl: "images/green_park.svg",
    isFeatured: false
  },
  {
    id: 6,
    categoryId: 2,
    categoryName: "Religious & Cultural",
    categorySlug: "religious-cultural",
    name: "Murukandy Pillayar Kovil",
    shortDescription: "A well-known Hindu religious site that provides visitors with an opportunity to experience local religious and cultural traditions.",
    longDescription: "Murukandy Pillayar Kovil is a famous roadside Hindu temple dedicated to Lord Ganesha along the A9 Highway. Travelers heading north have a longstanding tradition of stopping here to crack coconuts, offer camphor, and seek blessings for safe journeys.",
    distanceKm: 14.10,
    latitude: 9.2785000,
    longitude: 80.4196000,
    address: "A9 Highway, Murukandy",
    openingHours: "05:30 AM - 08:30 PM",
    entranceFee: "Free",
    bestTimeToVisit: "Morning Puja (07:30 AM) or Noon Puja (12:00 PM)",
    facilities: "Devotional Stalls, Vehicle Parking, Restrooms",
    safetyTips: "Remove footwear before stepping into the inner temple. Please dress respectfully.",
    imageUrl: "images/murukandy_temple.svg",
    isFeatured: true
  },
  {
    id: 7,
    categoryId: 2,
    categoryName: "Religious & Cultural",
    categorySlug: "religious-cultural",
    name: "Kandasamy Temple",
    shortDescription: "A Hindu place of worship representing the religious and cultural heritage of the local community.",
    longDescription: "Also called Kilinochchi Kanthaswamy Kovil, this prominent shrine features classical Dravidian temple architecture, colorful sculptures, and an impressive Rajagopuram. It hosts vibrant annual chariot festivals that draw devotees from across the region.",
    distanceKm: 2.10,
    latitude: 9.3912000,
    longitude: 80.3955000,
    address: "Kandasamy Kovil Road, Kilinochchi",
    openingHours: "06:00 AM - 07:00 PM",
    entranceFee: "Free",
    bestTimeToVisit: "Early Morning (06:30 AM - 08:30 AM) or Evening (05:00 PM - 06:30 PM)",
    facilities: "Courtyard, Parking, Drinking Water",
    safetyTips: "Cover shoulders and knees. Please refrain from taking photos inside the sanctum.",
    imageUrl: "images/kandasamy_temple.svg",
    isFeatured: false
  },
  {
    id: 8,
    categoryId: 2,
    categoryName: "Religious & Cultural",
    categorySlug: "religious-cultural",
    name: "St. Theresa's Church",
    shortDescription: "A Christian place of worship with religious and cultural significance for visitors and the local community.",
    longDescription: "A historic Catholic church in Kilinochchi known for its peaceful sanctuary, stained glass decorations, and tree-lined courtyard. It has long been a place of worship and community support for northern Catholic families.",
    distanceKm: 2.60,
    latitude: 9.3945000,
    longitude: 80.3890000,
    address: "Hospital Road, Kilinochchi",
    openingHours: "06:30 AM - 06:30 PM",
    entranceFee: "Free",
    bestTimeToVisit: "Sunday Morning Service or Quiet Afternoon",
    facilities: "Prayer Hall, Shaded Yard, Parking",
    safetyTips: "Maintain silence inside the prayer hall. Put phones on silent.",
    imageUrl: "images/st_theresas_church.svg",
    isFeatured: false
  },
  {
    id: 9,
    categoryId: 2,
    categoryName: "Religious & Cultural",
    categorySlug: "religious-cultural",
    name: "Kilinochchi Lumbini Viharaya",
    shortDescription: "A Buddhist religious site that represents the cultural and religious diversity of the Kilinochchi area.",
    longDescription: "Lumbini Viharaya features a white stupa, a sacred Bo tree, and an image house. It stands as a symbol of cultural and religious harmony in the town, welcoming visitors of all backgrounds to explore its quiet meditation grounds.",
    distanceKm: 1.90,
    latitude: 9.3790000,
    longitude: 80.3940000,
    address: "Station Road, Kilinochchi",
    openingHours: "06:00 AM - 07:30 PM",
    entranceFee: "Free",
    bestTimeToVisit: "Morning or Sunset Meditation",
    facilities: "Meditation Grounds, Footwear Area, Parking",
    safetyTips: "Remove hats and shoes before walking on the upper stupa terrace.",
    imageUrl: "images/lumbini_viharaya.svg",
    isFeatured: false
  },
  {
    id: 10,
    categoryId: 5,
    categoryName: "Food & Dining",
    categorySlug: "food-dining",
    name: "Vanniyan Restaurant",
    shortDescription: "A local food establishment that can provide visitors with an opportunity to experience local food and dining culture.",
    longDescription: "Vanniyan Restaurant is well known for traditional Northern Sri Lankan dishes, including spicy Jaffna crab curry, roasted mutton, fresh parotta, and delicious rice and curry meals served on clean banana leaves.",
    distanceKm: 1.50,
    latitude: 9.3870000,
    longitude: 80.3995000,
    address: "A9 Main Corridor, Kilinochchi",
    openingHours: "07:00 AM - 10:00 PM",
    entranceFee: "Average Meal: LKR 400 - 1,200",
    bestTimeToVisit: "Lunchtime (12:00 PM - 02:30 PM)",
    facilities: "Dining Hall, Family Seating, Parking, Washrooms",
    safetyTips: "Lunch can get busy between 12:30 and 1:30 PM. Arrive early for prime seating.",
    imageUrl: "images/vanniyan_restaurant.svg",
    isFeatured: true
  },
  {
    id: 11,
    categoryId: 5,
    categoryName: "Food & Dining",
    categorySlug: "food-dining",
    name: "Ammachchi Traditional Food Centre",
    shortDescription: "A traditional food centre where visitors can experience local cuisine and aspects of regional food culture.",
    longDescription: "Managed in partnership with the Department of Agriculture, this open food center serves healthy and affordable traditional food made by local women. Popular menu items include kurakkan (millet) pittu, fresh herbal porridge, ulundu vadai, and natural local drinks.",
    distanceKm: 3.10,
    latitude: 9.3720000,
    longitude: 80.4040000,
    address: "Agricultural Complex, A9 Road, Kilinochchi",
    openingHours: "07:00 AM - 06:00 PM",
    entranceFee: "LKR 80 - 350 per dish",
    bestTimeToVisit: "Breakfast (07:30 AM - 09:30 AM) or Afternoon Tea",
    facilities: "Self-Service Counters, Wash Basins, Parking",
    safetyTips: "Self-service order system. Healthy vegetarian options are readily available.",
    imageUrl: "images/ammachchi_food.svg",
    isFeatured: true
  },
  {
    id: 12,
    categoryId: 6,
    categoryName: "Local Markets & Lifestyle",
    categorySlug: "markets-lifestyle",
    name: "Kilinochchi Public Market",
    shortDescription: "A local marketplace that allows visitors to experience everyday community life, local products, and the commercial environment of Kilinochchi.",
    longDescription: "The central marketplace in town where local farmers and traders gather. Visitors can buy organic vegetables, tropical fruits, northern spices, dry fish, and handmade palmyrah woven handicrafts while experiencing authentic northern town life.",
    distanceKm: 0.80,
    latitude: 9.3835000,
    longitude: 80.4005000,
    address: "Market Square, Kilinochchi",
    openingHours: "06:00 AM - 07:00 PM",
    entranceFee: "Free Entry",
    bestTimeToVisit: "Morning Hours (08:00 AM - 11:00 AM)",
    facilities: "Covered Stalls, Bicycle Parking, Nearby ATMs",
    safetyTips: "Keep cash in small denominations. Ask permission before taking close-up photos of vendors.",
    imageUrl: "images/public_market.svg",
    isFeatured: false
  }
];

// Application state variables
let placesList = [];
let activeCategory = "all";
let searchKeyword = "";
let currentSort = "distance";
let tripPlanList = [];
let isAdmin = false;

// DOM Element references
const placesGrid = document.getElementById("placesGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const categoryButtons = document.querySelectorAll(".filter-btn");
const tripCountBadges = document.querySelectorAll(".badge-trip-count");
const selectedTripContainer = document.getElementById("selectedTripContainer");
const totalStopsEl = document.getElementById("totalStops");
const totalDistanceEl = document.getElementById("totalDistance");
const totalDurationEl = document.getElementById("totalDuration");
const itineraryResult = document.getElementById("itineraryResult");
const timelineContainer = document.getElementById("timelineContainer");

// Run once HTML is ready
document.addEventListener("DOMContentLoaded", async () => {
  await loadAttractions();
  initEventHandlers();
  displayAttractions();
  populateQuickAddDropdown();
  const dateInput = document.getElementById("tripDate");
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split("T")[0];
  }
  refreshTripCartUI();
});

// Load places data: try API first, then fallback to local storage or defaults
async function loadAttractions() {
  try {
    const response = await fetch(`${API_URL}/places`);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        placesList = data;
        console.log("Successfully loaded places from ASP.NET Core API.");
        return;
      }
    }
  } catch (err) {
    console.log("Backend API not reachable. Using local data.", err);
  }

  // Load from browser localStorage if available
  const saved = localStorage.getItem("kilinochchi_attractions");
  if (saved) {
    try {
      placesList = JSON.parse(saved);
    } catch (e) {
      placesList = [...defaultPlaces];
    }
  } else {
    placesList = [...defaultPlaces];
    saveToLocalStorage();
  }
}

// Save places to browser storage
function saveToLocalStorage() {
  localStorage.setItem("kilinochchi_attractions", JSON.stringify(placesList));
}

// Setup user interactions and buttons
function initEventHandlers() {
  // Real-time search box
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchKeyword = e.target.value.toLowerCase().trim();
      displayAttractions();
    });
  }

  // Sort dropdown
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      displayAttractions();
    });
  }

  // Category filter tabs
  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      activeCategory = button.getAttribute("data-category");
      displayAttractions();
    });
  });
}

// Filter and sort the places array based on user choices
function getFilteredAttractions() {
  return placesList.filter(place => {
    // Check category match
    const categoryMatches = activeCategory === "all" ||
      (place.categorySlug && place.categorySlug.toLowerCase() === activeCategory.toLowerCase()) ||
      (place.categoryName && place.categoryName.toLowerCase().includes(activeCategory.toLowerCase()));

    // Check search query match
    const searchMatches = !searchKeyword ||
      place.name.toLowerCase().includes(searchKeyword) ||
      place.shortDescription.toLowerCase().includes(searchKeyword) ||
      place.address.toLowerCase().includes(searchKeyword);

    return categoryMatches && searchMatches;
  }).sort((a, b) => {
    if (currentSort === "distance") {
      return a.distanceKm - b.distanceKm; // Closest first
    } else if (currentSort === "distance_desc") {
      return b.distanceKm - a.distanceKm; // Furthest first
    } else if (currentSort === "name") {
      return a.name.localeCompare(b.name); // Alphabetical A-Z
    }
    return 0;
  });
}

// Render place cards into the grid
function displayAttractions() {
  if (!placesGrid) return;
  const filtered = getFilteredAttractions();
  placesGrid.innerHTML = "";

  if (filtered.length === 0) {
    placesGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: #fff; border-radius: 6px; border: 1px dashed #dee2e6;">
        <h3 style="margin-bottom: 0.5rem; color: #212529;">No matching attractions found</h3>
        <p style="color: #6c757d;">Try searching for something else or reset your filter.</p>
        <button onclick="clearSearchFilters()" style="margin-top: 1rem; padding: 0.5rem 1.2rem; background: #0b62a4; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">
          Show All Attractions
        </button>
      </div>
    `;
    return;
  }

  filtered.forEach(place => {
    const alreadyInTrip = tripPlanList.some(item => item.id === place.id);
    const card = document.createElement("div");
    card.className = "place-card";
    card.innerHTML = `
      <div class="card-media">
        <img src="${place.imageUrl}" alt="${place.name}" onerror="this.src='images/default_place.svg'">
        <div class="badge-distance">${place.distanceKm.toFixed(1)} km away</div>
        <div class="badge-category">${place.categoryName || 'Attraction'}</div>
      </div>
      <div class="card-body">
        <h3 class="place-title">${place.name}</h3>
        <p class="place-desc">${place.shortDescription}</p>
        <div class="card-meta">
          <div class="meta-row"><strong>Hours:</strong> <span>${place.openingHours}</span></div>
          <div class="meta-row"><strong>Fee:</strong> <span>${place.entranceFee}</span></div>
          <div class="meta-row"><strong>Location:</strong> <span>${place.address}</span></div>
        </div>
        <div class="card-actions">
          <button class="btn-details" onclick="showPlaceModal(${place.id})">
            Details
          </button>
          <button class="btn-add-trip ${alreadyInTrip ? 'added' : ''}" onclick="toggleTripStop(${place.id})">
            ${alreadyInTrip ? 'Added to Trip' : 'Add to Trip'}
          </button>
        </div>
      </div>
    `;
    placesGrid.appendChild(card);
  });
}

// Reset search input and category selection
function clearSearchFilters() {
  searchKeyword = "";
  if (searchInput) searchInput.value = "";
  activeCategory = "all";
  categoryButtons.forEach(b => b.classList.remove("active"));
  const allBtn = document.querySelector('[data-category="all"]');
  if (allBtn) allBtn.classList.add("active");
  displayAttractions();
}

// ------------------------------------------------------------------------------
// PLACE DETAILS MODAL
// ------------------------------------------------------------------------------
function showPlaceModal(placeId) {
  const place = placesList.find(p => p.id === placeId);
  if (!place) return;

  const modal = document.getElementById("placeModal");
  document.getElementById("modalMedia").src = place.imageUrl;
  document.getElementById("modalTitle").textContent = place.name;
  document.getElementById("modalCategory").textContent = place.categoryName || "Attraction";
  document.getElementById("modalDistance").textContent = `${place.distanceKm.toFixed(1)} km from Kilinochchi center (< 25km radius)`;
  document.getElementById("modalDesc").textContent = place.longDescription || place.shortDescription;
  document.getElementById("modalHours").textContent = place.openingHours;
  document.getElementById("modalFee").textContent = place.entranceFee;
  document.getElementById("modalBestTime").textContent = place.bestTimeToVisit;
  document.getElementById("modalFacilities").textContent = place.facilities;
  document.getElementById("modalSafety").textContent = place.safetyTips || "Please follow standard visitor rules.";
  document.getElementById("modalAddress").textContent = `${place.address} (GPS: ${place.latitude.toFixed(4)}° N, ${place.longitude.toFixed(4)}° E)`;

  const actionBtn = document.getElementById("modalActionBtn");
  const alreadyInTrip = tripPlanList.some(item => item.id === place.id);
  actionBtn.textContent = alreadyInTrip ? 'Remove from Itinerary' : 'Add to One-Day Trip';
  actionBtn.className = `btn-add-trip ${alreadyInTrip ? 'added' : ''}`;
  actionBtn.onclick = () => {
    toggleTripStop(place.id);
    showPlaceModal(place.id); // update button state
  };

  modal.style.display = "flex";
}

function closePlaceModal() {
  const modal = document.getElementById("placeModal");
  if (modal) modal.style.display = "none";
}

// ------------------------------------------------------------------------------
// 1-DAY TRIP PLANNER & ROUTE OPTIMIZATION ENGINE (PERFECTED)
// ------------------------------------------------------------------------------

// Kilinochchi Town Center Reference Origin (A9 Highway intersection / Station)
const TOWN_CENTER = {
  name: "Kilinochchi Town Center",
  latitude: 9.3803000,
  longitude: 80.3985000
};

// Application state for generated plan and optimization
let currentGeneratedPlan = null;
let isRouteOptimized = false;

// Curated 1-Day Pre-Set Tour Templates (1-Click Itineraries)
const curatedTemplates = {
  heritage: {
    title: "Heritage & History Trail",
    placeIds: [2, 7, 10, 4] // War Memorial, Kandasamy, Vanniyan (Lunch), Poonakary Fort
  },
  nature: {
    title: "Scenic Nature & Family Escape",
    placeIds: [3, 5, 11, 1] // Iranamadu Tank, Green Park, Ammachchi (Lunch/Tea), ReeCha Theme Park
  },
  spiritual: {
    title: "Spiritual Harmony Trail",
    placeIds: [6, 7, 8, 9, 11] // Murukandy, Kandasamy, St. Theresa's, Lumbini, Ammachchi
  },
  highlights: {
    title: "Kilinochchi Highlights Express",
    placeIds: [12, 2, 3, 10, 1] // Market, Memorial, Iranamadu, Vanniyan, ReeCha
  }
};

// Great-circle Haversine distance with road winding multiplier
function getHaversineDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightLine = R * c;
  // Apply a road winding factor of 1.25 for northern road infrastructure
  return Math.round(straightLine * 1.25 * 10) / 10;
}

// Compute driving distance for a leg
function getLegDistanceKm(prevPlace, currentPlace) {
  if (!prevPlace) {
    return currentPlace.distanceKm || getHaversineDistanceKm(TOWN_CENTER.latitude, TOWN_CENTER.longitude, currentPlace.latitude, currentPlace.longitude);
  }
  return getHaversineDistanceKm(prevPlace.latitude, prevPlace.longitude, currentPlace.latitude, currentPlace.longitude);
}

// Load a curated 1-day itinerary preset
function loadCuratedTemplate(themeKey) {
  const template = curatedTemplates[themeKey];
  if (!template) return;

  const selected = [];
  template.placeIds.forEach(id => {
    const p = placesList.find(x => x.id === id);
    if (p) selected.push(p);
  });

  if (selected.length === 0) return;

  tripPlanList = selected;
  isRouteOptimized = false;
  const optBadge = document.getElementById("routeOptimizedBadge");
  if (optBadge) optBadge.style.display = "none";

  populateQuickAddDropdown();
  refreshTripCartUI();
  displayAttractions();
  generateItinerary();

  const plannerSection = document.getElementById("tripPlanner");
  if (plannerSection) {
    plannerSection.scrollIntoView({ behavior: "smooth" });
  }

  showToast(`✨ Loaded curated "${template.title}" with ${selected.length} destinations!`);
}

// Populate Quick Add dropdown
function populateQuickAddDropdown() {
  const select = document.getElementById("quickAddSelect");
  if (!select) return;

  select.innerHTML = `<option value="">➕ Quick Add Attraction to Itinerary...</option>`;
  placesList.forEach(place => {
    const inTrip = tripPlanList.some(p => p.id === place.id);
    const opt = document.createElement("option");
    opt.value = place.id;
    opt.textContent = `${inTrip ? '✓ ' : ''}${place.name} (${place.categoryName || 'Attraction'} • ${place.distanceKm.toFixed(1)} km)${inTrip ? ' — Already in plan' : ''}`;
    if (inTrip) {
      opt.disabled = true;
      opt.style.color = "#94a3b8";
    }
    select.appendChild(opt);
  });
}

// Quick Add handler
function quickAddPlace(val) {
  if (!val) return;
  const id = parseInt(val, 10);
  if (!isNaN(id)) {
    const place = placesList.find(p => p.id === id);
    if (place && !tripPlanList.some(p => p.id === id)) {
      tripPlanList.push(place);
      isRouteOptimized = false;
      const optBadge = document.getElementById("routeOptimizedBadge");
      if (optBadge) optBadge.style.display = "none";

      populateQuickAddDropdown();
      refreshTripCartUI();
      displayAttractions();
      if (itineraryResult && itineraryResult.style.display !== "none") {
        generateItinerary();
      }
      showToast(`Added ${place.name} to itinerary.`);
    }
  }
  const select = document.getElementById("quickAddSelect");
  if (select) select.value = "";
}

// Toggle trip stop from place card or modal
function toggleTripStop(placeId) {
  const place = placesList.find(p => p.id === placeId);
  if (!place) return;

  const existingIndex = tripPlanList.findIndex(p => p.id === placeId);
  if (existingIndex > -1) {
    tripPlanList.splice(existingIndex, 1);
  } else {
    tripPlanList.push(place);
  }

  isRouteOptimized = false;
  const optBadge = document.getElementById("routeOptimizedBadge");
  if (optBadge) optBadge.style.display = "none";

  populateQuickAddDropdown();
  refreshTripCartUI();
  displayAttractions();
}

function removeTripStop(placeId) {
  tripPlanList = tripPlanList.filter(p => p.id !== placeId);
  isRouteOptimized = false;
  const optBadge = document.getElementById("routeOptimizedBadge");
  if (optBadge) optBadge.style.display = "none";

  populateQuickAddDropdown();
  refreshTripCartUI();
  displayAttractions();
}

function clearAllTripStops() {
  if (tripPlanList.length === 0) return;
  if (confirm("Are you sure you want to clear all selected places from your trip?")) {
    tripPlanList = [];
    isRouteOptimized = false;
    currentGeneratedPlan = null;
    const optBadge = document.getElementById("routeOptimizedBadge");
    if (optBadge) optBadge.style.display = "none";

    populateQuickAddDropdown();
    refreshTripCartUI();
    displayAttractions();
  }
}

// Reorder stop positions up or down
function moveTripStop(index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= tripPlanList.length) return;
  const temp = tripPlanList[index];
  tripPlanList[index] = tripPlanList[newIndex];
  tripPlanList[newIndex] = temp;

  isRouteOptimized = false;
  const optBadge = document.getElementById("routeOptimizedBadge");
  if (optBadge) optBadge.style.display = "none";

  refreshTripCartUI();
  displayAttractions();
  if (itineraryResult && itineraryResult.style.display !== "none") {
    generateItinerary();
  }
}

// Update customizable stay duration for a place
function updateStopDuration(placeId, minutes) {
  const place = tripPlanList.find(p => p.id === placeId);
  if (place) {
    place.customDuration = parseInt(minutes, 10);
    refreshTripCartUI();
    if (itineraryResult && itineraryResult.style.display !== "none") {
      generateItinerary();
    }
  }
}

// Smart Route Optimization (TSP Nearest Neighbor starting from Town Center)
function optimizeTripRoute() {
  if (tripPlanList.length < 2) {
    alert("Please select at least 2 attractions to optimize your travel route.");
    return;
  }

  const unvisited = [...tripPlanList];
  const optimized = [];
  let currentLat = TOWN_CENTER.latitude;
  let currentLon = TOWN_CENTER.longitude;

  while (unvisited.length > 0) {
    let nearestIdx = -1;
    let shortestDist = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const p = unvisited[i];
      const d = getHaversineDistanceKm(currentLat, currentLon, p.latitude, p.longitude);
      if (d < shortestDist) {
        shortestDist = d;
        nearestIdx = i;
      }
    }

    const nextStop = unvisited.splice(nearestIdx, 1)[0];
    optimized.push(nextStop);
    currentLat = nextStop.latitude;
    currentLon = nextStop.longitude;
  }

  tripPlanList = optimized;
  isRouteOptimized = true;
  const optBadge = document.getElementById("routeOptimizedBadge");
  if (optBadge) optBadge.style.display = "inline-flex";

  refreshTripCartUI();
  displayAttractions();
  generateItinerary();
  showToast("⚡ Route optimized! Stops sequenced by geographical proximity for minimum travel distance.");
}

// Update trip planner UI counters, stop cards, summary stats, and visual pipeline
function refreshTripCartUI() {
  tripCountBadges.forEach(badge => badge.textContent = tripPlanList.length);

  const visualRoutePreview = document.getElementById("visualRoutePreview");
  const advisoriesContainer = document.getElementById("plannerAdvisories");

  if (!selectedTripContainer) return;

  if (tripPlanList.length === 0) {
    selectedTripContainer.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; color: #6c757d; background: #f8fafc; border: 1px dashed #dee2e6; border-radius: 6px;">
        <p style="font-weight: 600; color: #212529; margin-bottom: 0.3rem;">No attractions selected yet</p>
        <p style="font-size: 0.85rem;">Click "Add to Trip" on any attraction card above, pick from the quick-add dropdown, or choose a curated 1-day theme.</p>
      </div>
    `;
    totalStopsEl.textContent = "0";
    totalDistanceEl.textContent = "0.0 km";
    totalDurationEl.textContent = "0.0 hrs";
    if (document.getElementById("totalTransitTime")) document.getElementById("totalTransitTime").textContent = "0 mins";
    if (document.getElementById("totalVisitTime")) document.getElementById("totalVisitTime").textContent = "0 mins";
    if (document.getElementById("estimatedFinishTime")) document.getElementById("estimatedFinishTime").textContent = "--:--";
    if (document.getElementById("totalBudget")) document.getElementById("totalBudget").textContent = "LKR 0";
    if (visualRoutePreview) visualRoutePreview.style.display = "none";
    if (advisoriesContainer) advisoriesContainer.style.display = "none";
    itineraryResult.style.display = "none";
    return;
  }

  selectedTripContainer.innerHTML = "";
  tripPlanList.forEach((place, index) => {
    // Default duration: Food: 60 mins, Nature/Fort: 75 mins, others: 45 mins
    const defaultMins = (place.categoryId === 5) ? 60 : (place.categoryId === 1 || place.categoryId === 3 ? 75 : 45);
    const selectedDuration = place.customDuration || defaultMins;

    const card = document.createElement("div");
    card.className = "trip-stop-card";
    card.innerHTML = `
      <div class="stop-left">
        <div class="stop-number">${index + 1}</div>
        <div class="stop-info">
          <h4>${place.name}</h4>
          <span>${place.categoryName || 'Attraction'} • ${place.distanceKm.toFixed(1)} km from town</span>
        </div>
      </div>
      <div class="stop-actions">
        <select class="stop-duration-select" title="Stay Duration" onchange="updateStopDuration(${place.id}, this.value)">
          <option value="30" ${selectedDuration === 30 ? 'selected' : ''}>30m</option>
          <option value="45" ${selectedDuration === 45 ? 'selected' : ''}>45m</option>
          <option value="60" ${selectedDuration === 60 ? 'selected' : ''}>1h</option>
          <option value="75" ${selectedDuration === 75 ? 'selected' : ''}>1h 15m</option>
          <option value="90" ${selectedDuration === 90 ? 'selected' : ''}>1.5h</option>
          <option value="120" ${selectedDuration === 120 ? 'selected' : ''}>2h</option>
        </select>
        <button type="button" class="btn-move-stop" title="Move Up" ${index === 0 ? 'disabled' : ''} onclick="moveTripStop(${index}, -1)">
          ▲
        </button>
        <button type="button" class="btn-move-stop" title="Move Down" ${index === tripPlanList.length - 1 ? 'disabled' : ''} onclick="moveTripStop(${index}, 1)">
          ▼
        </button>
        <button class="btn-remove-stop" title="Remove stop" onclick="removeTripStop(${place.id})">
          ✕
        </button>
      </div>
    `;
    selectedTripContainer.appendChild(card);
  });

  // Calculate cumulative road distance and realistic transit times
  let totalKm = 0;
  let totalTransitMins = 0;
  let totalVisitMins = 0;

  for (let i = 0; i < tripPlanList.length; i++) {
    const current = tripPlanList[i];
    const prev = i === 0 ? null : tripPlanList[i - 1];
    const legDistance = getLegDistanceKm(prev, current);

    totalKm += legDistance;

    // Driving time estimate: 2.5 mins per km + 8 min buffer, min 10 mins
    const transitMins = Math.max(10, Math.round(legDistance * 2.5));
    totalTransitMins += transitMins;

    const visitMins = current.customDuration || (current.categoryId === 5 ? 60 : (current.categoryId === 1 || current.categoryId === 3 ? 75 : 45));
    totalVisitMins += visitMins;
  }

  const totalAllMinutes = totalTransitMins + totalVisitMins;
  const startTimeInput = document.getElementById("tripStartTime")?.value || "08:30";
  let [sH, sM] = startTimeInput.split(":").map(Number);
  const finishMinutes = (sH * 60 + sM + totalAllMinutes) % 1440;
  const finishTimeStr = minutesToFormattedTime(finishMinutes);

  // Budget Estimation
  const budget = calculateEstimatedBudget(tripPlanList, totalKm);

  totalStopsEl.textContent = tripPlanList.length;
  totalDistanceEl.textContent = `${totalKm.toFixed(1)} km`;
  totalDurationEl.textContent = `${(totalAllMinutes / 60).toFixed(1)} hrs`;
  if (document.getElementById("totalTransitTime")) document.getElementById("totalTransitTime").textContent = `${totalTransitMins} mins`;
  if (document.getElementById("totalVisitTime")) document.getElementById("totalVisitTime").textContent = `${totalVisitMins} mins`;
  if (document.getElementById("estimatedFinishTime")) document.getElementById("estimatedFinishTime").textContent = finishTimeStr;
  if (document.getElementById("totalBudget")) document.getElementById("totalBudget").textContent = `~LKR ${budget.totalPerPerson.toLocaleString()}`;

  // Render Visual Pipeline
  renderVisualRoutePipeline(tripPlanList, totalKm);

  // Check Advisories
  checkTripAdvisories(tripPlanList, totalAllMinutes / 60, sH * 60 + sM);
}

// Render visual route pipeline breadcrumbs
function renderVisualRoutePipeline(places, totalKm) {
  const container = document.getElementById("visualRoutePreview");
  const pipeline = document.getElementById("routePipeline");
  const distTag = document.getElementById("routeDistanceSummary");

  if (!container || !pipeline) return;

  if (places.length === 0) {
    container.style.display = "none";
    return;
  }

  container.style.display = "block";
  distTag.textContent = `${totalKm.toFixed(1)} km Total Road Route`;
  pipeline.innerHTML = "";

  // Origin node: Kilinochchi Center
  const originNode = document.createElement("div");
  originNode.className = "route-node origin-node";
  originNode.innerHTML = `
    <div class="route-node-title">🚩 Town Center</div>
    <div class="route-node-sub">Start of Day Tour</div>
  `;
  pipeline.appendChild(originNode);

  for (let i = 0; i < places.length; i++) {
    const current = places[i];
    const prev = i === 0 ? null : places[i - 1];
    const legDist = getLegDistanceKm(prev, current);
    const legMins = Math.max(10, Math.round(legDist * 2.5));

    // Leg Connector
    const connector = document.createElement("div");
    connector.className = "route-connector";
    connector.innerHTML = `
      <span>${legDist.toFixed(1)} km</span>
      <div>➔</div>
      <small style="font-size: 9px; color: #94a3b8;">${legMins}m drive</small>
    `;
    pipeline.appendChild(connector);

    // Stop node
    const stopNode = document.createElement("div");
    stopNode.className = "route-node";
    stopNode.innerHTML = `
      <div class="route-node-title">#${i + 1} ${current.name}</div>
      <div class="route-node-sub">${current.categoryName || 'Attraction'}</div>
    `;
    pipeline.appendChild(stopNode);
  }
}

// Advisories checking: Lunch detection, sunset finish warning, venue opening hours
function checkTripAdvisories(places, totalHours, startMinutes) {
  const container = document.getElementById("plannerAdvisories");
  if (!container) return;

  const advisories = [];
  const finishMinutes = startMinutes + Math.round(totalHours * 60);

  // 1. Lunch detection: if schedule crosses 12:00 PM - 02:00 PM (720 to 840 mins)
  const crossesLunch = (startMinutes <= 780 && finishMinutes >= 810);
  const hasFoodStop = places.some(p => p.categoryId === 5 || (p.categoryName && p.categoryName.toLowerCase().includes("food")));
  if (crossesLunch && !hasFoodStop) {
    advisories.push({
      type: "tip",
      text: "🍽️ <strong>Lunch Reminder:</strong> Your day tour extends past lunchtime (12:00 - 2:00 PM) without a scheduled dining stop. Consider adding Vanniyan Restaurant or Ammachchi Food Centre!"
    });
  }

  // 2. Sunset/late finish warning: if finish > 18:30 (1110 mins)
  if (finishMinutes > 1110) {
    advisories.push({
      type: "warning",
      text: "🌙 <strong>Evening Finish:</strong> Tour will finish after 06:30 PM (after sunset). We suggest departing by 07:30 or 08:00 AM for daylight travel."
    });
  }

  // 3. Trip pacing notice if > 9 hours
  if (totalHours > 9.0) {
    advisories.push({
      type: "info",
      text: "⚡ <strong>Packed Schedule:</strong> This itinerary spans over 9 hours. Ensure you pace your visit and allocate time for hydration and refreshments."
    });
  }

  if (advisories.length === 0) {
    container.style.display = "none";
    container.innerHTML = "";
    return;
  }

  container.style.display = "flex";
  container.innerHTML = advisories.map(a => `
    <div class="advisory-item advisory-${a.type}">
      ${a.text}
    </div>
  `).join("");
}

// Generate the 1-day itinerary timetable & rich voucher
async function generateItinerary() {
  if (tripPlanList.length === 0) {
    alert("Please select at least one attraction before generating your travel plan.");
    return;
  }

  const visitorName = document.getElementById("tripVisitorName")?.value.trim() || "Suwedha Sivakumar";
  const tripDate = document.getElementById("tripDate")?.value || new Date().toISOString().split("T")[0];
  const startTimeInput = document.getElementById("tripStartTime")?.value || "08:30";

  // Try calling the backend API first
  try {
    const requestData = {
      tripTitle: `Kilinochchi Day Visit (${tripDate})`,
      visitorName: visitorName,
      travelDate: tripDate,
      startTime: startTimeInput,
      placeIds: tripPlanList.map(p => p.id)
    };

    const res = await fetch(`${API_URL}/itinerary/plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData)
    });

    if (res.ok) {
      const apiPlan = await res.json();
      currentGeneratedPlan = apiPlan;
      renderItineraryVoucher(apiPlan);
      return;
    }
  } catch (err) {
    console.log("Generating itinerary using local scheduling algorithm...");
  }

  // High-precision local scheduling engine (fallback & offline mode)
  let [startHour, startMin] = startTimeInput.split(":").map(Number);
  let currentMinutes = startHour * 60 + startMin;
  let accumulatedKm = 0;
  const stops = [];

  for (let i = 0; i < tripPlanList.length; i++) {
    const place = tripPlanList[i];
    const prev = i === 0 ? null : tripPlanList[i - 1];
    const legDist = getLegDistanceKm(prev, place);
    accumulatedKm += legDist;

    // Driving time: ~2.5 mins per km + 8 min buffer, min 10 mins
    const travelMins = Math.max(10, Math.round(legDist * 2.5));
    currentMinutes += travelMins;

    const arrivalTime = minutesToFormattedTime(currentMinutes);
    const visitDuration = place.customDuration || (place.categoryId === 5 ? 60 : (place.categoryId === 1 || place.categoryId === 3 ? 75 : 45));
    currentMinutes += visitDuration;
    const departureTime = minutesToFormattedTime(currentMinutes);

    // Opening hours validation
    const parsedHours = parseOpeningHours(place.openingHours);
    let hoursStatus = "open";
    if (parsedHours) {
      const arrMins = currentMinutes - visitDuration;
      if (arrMins < parsedHours.opensMin || arrMins > parsedHours.closesMin) {
        hoursStatus = "closed";
      }
    }

    stops.push({
      stopOrder: i + 1,
      placeId: place.id,
      placeName: place.name,
      categoryName: place.categoryName || "Attraction",
      categoryId: place.categoryId,
      address: place.address,
      latitude: place.latitude,
      longitude: place.longitude,
      estimatedArrival: arrivalTime,
      estimatedDeparture: departureTime,
      suggestedDurationMinutes: visitDuration,
      distanceFromOriginKm: place.distanceKm,
      legDistanceKm: legDist,
      openingHours: place.openingHours,
      entranceFee: place.entranceFee,
      facilities: place.facilities,
      safetyTips: place.safetyTips || "Standard visitor rules apply.",
      hoursStatus: hoursStatus
    });
  }

  const totalDurationHrs = ((currentMinutes - (startHour * 60 + startMin)) / 60);

  const generatedPlan = {
    tripTitle: `Explore Kilinochchi Day Tour - ${visitorName}`,
    visitorName: visitorName,
    travelDate: tripDate,
    startTime: startTimeInput,
    finishTime: minutesToFormattedTime(currentMinutes % 1440),
    totalPlaces: tripPlanList.length,
    totalEstimatedDistanceKm: accumulatedKm,
    totalEstimatedDurationHours: totalDurationHrs,
    summaryText: `Verified 1-day exploration for ${visitorName} covering ${tripPlanList.length} destinations across Kilinochchi District (< 25 km radius).`,
    stops: stops
  };

  currentGeneratedPlan = generatedPlan;
  renderItineraryVoucher(generatedPlan);
}

// Convert minutes from midnight to "08:30 AM" format
function minutesToFormattedTime(totalMins) {
  let hours = Math.floor(totalMins / 60) % 24;
  let mins = totalMins % 60;
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${String(displayHours).padStart(2, "0")}:${String(mins).padStart(2, "0")} ${ampm}`;
}

// Display generated itinerary in the rich voucher preview
function renderItineraryVoucher(plan) {
  itineraryResult.style.display = "block";
  document.getElementById("voucherTitle").textContent = plan.tripTitle;
  document.getElementById("voucherDate").textContent = `Travel Date: ${plan.travelDate} | Departure: ${plan.startTime || '08:30 AM'} | Visitor: ${plan.visitorName}`;
  document.getElementById("voucherSummary").textContent = `${plan.summaryText} | Total Travel Distance: ${Number(plan.totalEstimatedDistanceKm).toFixed(1)} km`;

  // Dynamic voucher reference code
  const voucherCodeEl = document.getElementById("voucherCode");
  if (voucherCodeEl) {
    const hash = Math.abs((plan.visitorName + plan.travelDate).split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)) % 9000 + 1000;
    voucherCodeEl.textContent = `KIL-2026-TRIP-${hash}`;
  }

  // Quick Metrics Bar
  const metricsBar = document.getElementById("voucherMetricsBar");
  if (metricsBar) {
    const budget = calculateEstimatedBudget(plan.stops, plan.totalEstimatedDistanceKm);
    metricsBar.innerHTML = `
      <div class="metric-pill">
        <small>Total Travel</small>
        <strong>${Number(plan.totalEstimatedDistanceKm).toFixed(1)} km</strong>
      </div>
      <div class="metric-pill">
        <small>Total Duration</small>
        <strong>${Number(plan.totalEstimatedDurationHours).toFixed(1)} hrs</strong>
      </div>
      <div class="metric-pill">
        <small>Scheduled Stops</small>
        <strong>${plan.totalPlaces} Places</strong>
      </div>
      <div class="metric-pill">
        <small>Est. Day Budget</small>
        <strong>~LKR ${budget.totalPerPerson.toLocaleString()}</strong>
      </div>
    `;
  }

  // Render Timeline Stops
  timelineContainer.innerHTML = "";
  plan.stops.forEach(stop => {
    const isMeal = stop.categoryId === 5 || (stop.categoryName && stop.categoryName.toLowerCase().includes("food"));
    const isClosedAlert = stop.hoursStatus === "closed";

    const timelineItem = document.createElement("div");
    timelineItem.className = "timeline-item";
    timelineItem.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-header-line">
          <div class="timeline-time">
            ⏰ ${stop.estimatedArrival} – ${stop.estimatedDeparture} (${stop.suggestedDurationMinutes} mins allocated)
          </div>
          <div class="timeline-badges">
            <span class="timeline-tag timeline-tag-category">${stop.categoryName}</span>
            ${isMeal ? '<span class="timeline-tag timeline-tag-meal">🍽️ Dining Stop</span>' : ''}
            ${isClosedAlert ? '<span class="timeline-tag timeline-tag-alert">⚠️ May Arrive Outside Open Hours</span>' : ''}
          </div>
        </div>

        <h4 class="timeline-stop-title">Stop #${stop.stopOrder}: ${stop.placeName}</h4>

        <div style="font-size: 0.86rem; color: #475569; margin-bottom: 4px;">
          📍 <strong>Location:</strong> ${stop.address} (${stop.distanceFromOriginKm ? stop.distanceFromOriginKm.toFixed(1) + ' km from town' : ''})
        </div>

        <div class="timeline-meta-grid">
          <div><strong>Hours:</strong> ${stop.openingHours || 'Open Daily'}</div>
          <div><strong>Admission:</strong> ${stop.entranceFee || 'Free Entry'}</div>
          <div><strong>Facilities:</strong> ${stop.facilities || 'Basic amenities'}</div>
          <div><strong>Traveler Tip:</strong> ${stop.safetyTips || 'Enjoy your visit.'}</div>
        </div>
      </div>
    `;
    timelineContainer.appendChild(timelineItem);
  });

  // Budget Breakdown in Voucher
  const budgetBox = document.getElementById("voucherBudgetContent");
  if (budgetBox) {
    const budget = calculateEstimatedBudget(plan.stops, plan.totalEstimatedDistanceKm);
    budgetBox.innerHTML = `
      <table class="budget-breakdown-table">
        <tr>
          <td>Attraction Admissions / Entry:</td>
          <td style="text-align: right;"><strong>LKR ${budget.admission}</strong></td>
        </tr>
        <tr>
          <td>Estimated Dining & Refreshments:</td>
          <td style="text-align: right;"><strong>LKR ${budget.dining}</strong></td>
        </tr>
        <tr>
          <td>Est. Local Transport (~LKR 65/km):</td>
          <td style="text-align: right;"><strong>LKR ${budget.transport}</strong></td>
        </tr>
        <tr>
          <td>Total Estimated Budget (Per Person):</td>
          <td style="text-align: right; font-size: 14px;"><strong>LKR ${(budget.totalPerPerson + budget.transport).toLocaleString()}</strong></td>
        </tr>
      </table>
    `;
  }

  itineraryResult.scrollIntoView({ behavior: "smooth" });
}

// Budget Calculation helper
function calculateEstimatedBudget(stops, totalKm = 0) {
  let admissionLkr = 0;
  let diningLkr = 0;

  stops.forEach(s => {
    const feeStr = (s.entranceFee || "").toLowerCase();
    if (feeStr.includes("200")) admissionLkr += 200;
    else if (feeStr.includes("100")) admissionLkr += 100;

    const name = (s.placeName || "").toLowerCase();
    const isFood = s.categoryId === 5 || (s.categoryName && s.categoryName.toLowerCase().includes("food"));
    if (isFood) {
      if (name.includes("vanniyan")) diningLkr += 800;
      else if (name.includes("ammachchi")) diningLkr += 350;
      else diningLkr += 600;
    }
  });

  if (diningLkr === 0 && stops.length >= 3) {
    diningLkr = 400; // estimated tea / snacks
  }

  const transportEst = Math.round((totalKm || 15) * 65);

  return {
    admission: admissionLkr,
    dining: diningLkr,
    transport: transportEst,
    totalPerPerson: admissionLkr + diningLkr
  };
}

// Parse opening hours string like "09:00 AM - 07:00 PM"
function parseOpeningHours(hoursStr) {
  if (!hoursStr || hoursStr.toLowerCase().includes("24 hours")) return null;
  const match = hoursStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;

  let [_, h1, m1, p1, h2, m2, p2] = match;
  let opens = (parseInt(h1, 10) % 12 + (p1.toUpperCase() === "PM" ? 12 : 0)) * 60 + parseInt(m1, 10);
  let closes = (parseInt(h2, 10) % 12 + (p2.toUpperCase() === "PM" ? 12 : 0)) * 60 + parseInt(m2, 10);
  return { opensMin: opens, closesMin: closes };
}

// Multi-Stop Route in Google Maps navigation
function openGoogleMapsRoute() {
  if (!tripPlanList || tripPlanList.length === 0) {
    alert("Please select attractions and generate your 1-day itinerary first.");
    return;
  }

  const origin = `${TOWN_CENTER.latitude},${TOWN_CENTER.longitude}`;
  const lastStop = tripPlanList[tripPlanList.length - 1];
  const destination = `${lastStop.latitude},${lastStop.longitude}`;

  let mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;

  if (tripPlanList.length > 1) {
    const waypoints = tripPlanList.slice(0, -1).map(p => `${p.latitude},${p.longitude}`).join("|");
    mapsUrl += `&waypoints=${encodeURIComponent(waypoints)}`;
  }

  window.open(mapsUrl, "_blank");
}

// Export itinerary to standard iCalendar (.ics) file
function exportToCalendar() {
  if (!currentGeneratedPlan || !currentGeneratedPlan.stops || currentGeneratedPlan.stops.length === 0) {
    alert("Please generate an itinerary first before exporting to calendar.");
    return;
  }

  const plan = currentGeneratedPlan;
  const travelDateClean = plan.travelDate.replace(/-/g, "");

  let icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Explore Kilinochchi//1-Day Trip Planner//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:Explore Kilinochchi Day Tour - ${plan.visitorName}`
  ];

  plan.stops.forEach((stop, idx) => {
    const startIso = convertFormattedTimeToIso(plan.travelDate, stop.estimatedArrival);
    const endIso = convertFormattedTimeToIso(plan.travelDate, stop.estimatedDeparture);

    icsLines.push(
      "BEGIN:VEVENT",
      `UID:kili-${travelDateClean}-${idx}-${Date.now()}@explorekilinochchi.lk`,
      `DTSTAMP:${formatIsoToIcs(new Date().toISOString())}`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      `SUMMARY:Stop #${stop.stopOrder}: ${stop.placeName}`,
      `DESCRIPTION:Explore Kilinochchi 1-Day Tour. Category: ${stop.categoryName}. Stay duration: ${stop.suggestedDurationMinutes} mins. Distance from town: ${stop.distanceFromOriginKm} km.`,
      `LOCATION:${stop.address.replace(/,/g, "\\,")}`,
      "STATUS:CONFIRMED",
      "END:VEVENT"
    );
  });

  icsLines.push("END:VCALENDAR");

  const blob = new Blob([icsLines.join("\r\n")], { type: "text/calendar;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  if (document.body && document.body.appendChild) {
    document.body.appendChild(downloadLink);
  }
  if (typeof downloadLink.click === "function") {
    downloadLink.click();
  }
  if (document.body && document.body.removeChild) {
    document.body.removeChild(downloadLink);
  }
  showToast("📅 Calendar (.ics) file downloaded! Open it to import all stops into Google Calendar or Apple Calendar.");
}

// Convert "2026-10-16" and "08:30 AM" into "20261016T083000"
function convertFormattedTimeToIso(dateStr, formattedTime) {
  const [dYear, dMonth, dDay] = dateStr.split("-");
  const match = formattedTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return `${dYear}${dMonth}${dDay}T090000`;

  let [_, h, m, p] = match;
  let hourNum = parseInt(h, 10);
  if (p.toUpperCase() === "PM" && hourNum < 12) hourNum += 12;
  if (p.toUpperCase() === "AM" && hourNum === 12) hourNum = 0;

  return `${dYear}${dMonth}${dDay}T${String(hourNum).padStart(2, "0")}${m}00`;
}

function formatIsoToIcs(isoStr) {
  return isoStr.replace(/[-:]/g, "").split(".")[0] + "Z";
}

// Share / Copy formatted itinerary text to clipboard
function copyItineraryToClipboard() {
  if (!currentGeneratedPlan || !currentGeneratedPlan.stops) {
    alert("Please generate an itinerary first.");
    return;
  }

  const plan = currentGeneratedPlan;
  let text = `🌟 EXPLORE KILINOCHCHI - 1-DAY TRAVEL ITINERARY 🌟\n`;
  text += `👤 Visitor: ${plan.visitorName}\n`;
  text += `📅 Date: ${plan.travelDate} | Starts: ${plan.startTime || '08:30 AM'}\n`;
  text += `📍 Stops: ${plan.totalPlaces} | 🚗 Distance: ${Number(plan.totalEstimatedDistanceKm).toFixed(1)} km | ⏱️ Duration: ${Number(plan.totalEstimatedDurationHours).toFixed(1)} hrs\n\n`;
  text += `--- SCHEDULE ---\n`;

  plan.stops.forEach(s => {
    text += `🚩 Stop #${s.stopOrder}: ${s.placeName}\n`;
    text += `   ⏰ ${s.estimatedArrival} - ${s.estimatedDeparture} (${s.suggestedDurationMinutes} mins)\n`;
    text += `   🏷️ ${s.categoryName} • 📍 ${s.address}\n\n`;
  });

  text += `💡 Tips: Cover shoulders & knees at religious shrines. Carry local cash for small purchases.\n`;
  text += `🗺️ Generated via Explore Kilinochchi Web Application (BIT University of Moratuwa)`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("✓ Itinerary copied to clipboard! Ready to paste into WhatsApp, Email, or Notes.");
    }).catch(() => {
      alert("Itinerary copied to clipboard!");
    });
  } else {
    alert("Itinerary ready! Please copy from preview.");
  }
}

// Print the trip voucher
function printItinerary() {
  window.print();
}

// Floating Toast Notification
function showToast(message) {
  let toast = document.getElementById("kiliToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "kiliToast";
    toast.className = "kili-toast";
    if (document.body && document.body.appendChild) {
      document.body.appendChild(toast);
    }
  }
  toast.textContent = message;
  if (toast.classList && toast.classList.add) {
    toast.classList.add("show");
    setTimeout(() => {
      if (toast.classList && toast.classList.remove) {
        toast.classList.remove("show");
      }
    }, 3500);
  }
}

// ------------------------------------------------------------------------------
// ADMINISTRATOR AUTHENTICATION & CRUD MANAGEMENT
// ------------------------------------------------------------------------------
function openAdminLogin() {
  if (isAdmin) {
    openAdminDashboard();
  } else {
    document.getElementById("adminLoginModal").style.display = "flex";
  }
}

function closeAdminLogin() {
  document.getElementById("adminLoginModal").style.display = "none";
}

// Handle login submission
async function handleAdminLogin(e) {
  e.preventDefault();
  const user = document.getElementById("adminUsername").value.trim();
  const pass = document.getElementById("adminPassword").value.trim();

  // Try API login
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        setAdminStatus(true);
        closeAdminLogin();
        openAdminDashboard();
        return;
      }
    }
  } catch (err) {
    console.log("Checking credentials locally...");
  }

  // Local credentials check (standard demo login)
  if (user.toLowerCase() === "angel" && pass === "admin") {
    setAdminStatus(true);
    closeAdminLogin();
    openAdminDashboard();
  } else {
    alert("Invalid credentials!");
  }
}

function setAdminStatus(status) {
  isAdmin = status;
  const banner = document.getElementById("adminBanner");
  const navBtn = document.getElementById("navAdminBtn");
  if (status) {
    if (banner) banner.style.display = "flex";
    if (navBtn) navBtn.textContent = "Admin Panel";
  } else {
    if (banner) banner.style.display = "none";
    if (navBtn) navBtn.textContent = "Admin Login";
  }
}

function adminLogout() {
  setAdminStatus(false);
  closeAdminDashboard();
}

function openAdminDashboard() {
  const modal = document.getElementById("adminDashboardModal");
  renderAdminTable();
  modal.style.display = "flex";
}

function closeAdminDashboard() {
  document.getElementById("adminDashboardModal").style.display = "none";
}

// Render the attractions list inside the admin table
function renderAdminTable() {
  const tbody = document.getElementById("adminPlacesTbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  placesList.forEach(place => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${place.name}</strong></td>
      <td>${place.categoryName || 'General'}</td>
      <td>${place.distanceKm.toFixed(1)} km</td>
      <td>${place.openingHours}</td>
      <td>
        <button class="btn-icon edit" onclick="openEditModal(${place.id})">Edit</button>
        <button class="btn-icon delete" onclick="deleteAttraction(${place.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Open modal to add a new attraction
function openAddPlaceModal() {
  document.getElementById("placeForm").reset();
  document.getElementById("editPlaceId").value = "";
  document.getElementById("placeFormTitle").textContent = "Add New Tourist Attraction";
  document.getElementById("placeFormModal").style.display = "flex";
}

// Open modal to edit existing attraction
function openEditModal(id) {
  const place = placesList.find(p => p.id === id);
  if (!place) return;

  document.getElementById("editPlaceId").value = place.id;
  document.getElementById("placeFormTitle").textContent = `Edit Attraction: ${place.name}`;
  document.getElementById("formPlaceName").value = place.name;
  document.getElementById("formPlaceCategory").value = place.categoryId;
  document.getElementById("formPlaceDistance").value = place.distanceKm;
  document.getElementById("formPlaceAddress").value = place.address;
  document.getElementById("formPlaceHours").value = place.openingHours;
  document.getElementById("formPlaceFee").value = place.entranceFee;
  document.getElementById("formPlaceBestTime").value = place.bestTimeToVisit;
  document.getElementById("formPlaceShortDesc").value = place.shortDescription;
  document.getElementById("formPlaceLongDesc").value = place.longDescription;
  document.getElementById("formPlaceFacilities").value = place.facilities;

  document.getElementById("placeFormModal").style.display = "flex";
}

function closePlaceFormModal() {
  document.getElementById("placeFormModal").style.display = "none";
}

// Save added or edited attraction
async function handlePlaceFormSubmit(e) {
  e.preventDefault();
  const idStr = document.getElementById("editPlaceId").value;
  const isEditing = Boolean(idStr);
  const placeId = isEditing ? parseInt(idStr, 10) : Date.now();

  const categorySelect = document.getElementById("formPlaceCategory");
  const catId = parseInt(categorySelect.value, 10);
  const catName = categorySelect.options[categorySelect.selectedIndex].text;

  const newPlace = {
    id: placeId,
    categoryId: catId,
    categoryName: catName,
    categorySlug: catName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    name: document.getElementById("formPlaceName").value.trim(),
    distanceKm: parseFloat(document.getElementById("formPlaceDistance").value),
    address: document.getElementById("formPlaceAddress").value.trim(),
    openingHours: document.getElementById("formPlaceHours").value.trim(),
    entranceFee: document.getElementById("formPlaceFee").value.trim(),
    bestTimeToVisit: document.getElementById("formPlaceBestTime").value.trim(),
    shortDescription: document.getElementById("formPlaceShortDesc").value.trim(),
    longDescription: document.getElementById("formPlaceLongDesc").value.trim(),
    facilities: document.getElementById("formPlaceFacilities").value.trim(),
    latitude: 9.3800,
    longitude: 80.4000,
    safetyTips: "Follow local safety instructions.",
    imageUrl: isEditing ? (placesList.find(p => p.id === placeId)?.imageUrl || "images/default_place.svg") : "images/default_place.svg",
    isFeatured: true
  };

  // Try saving via API
  try {
    if (isEditing) {
      await fetch(`${API_URL}/places/${placeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlace)
      });
    } else {
      await fetch(`${API_URL}/places`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlace)
      });
    }
  } catch (err) {
    console.log("Saving locally to browser storage...");
  }

  // Update in-memory array
  if (isEditing) {
    const index = placesList.findIndex(p => p.id === placeId);
    if (index > -1) placesList[index] = newPlace;
  } else {
    placesList.push(newPlace);
  }

  saveToLocalStorage();
  closePlaceFormModal();
  renderAdminTable();
  displayAttractions();
  refreshTripCartUI();
  alert(isEditing ? "Attraction updated successfully!" : "New attraction added successfully!");
}

// Delete an attraction
async function deleteAttraction(id) {
  const place = placesList.find(p => p.id === id);
  if (!confirm(`Are you sure you want to remove "${place?.name}"?`)) return;

  try {
    await fetch(`${API_URL}/places/${id}`, { method: "DELETE" });
  } catch (err) {
    console.log("Deleted from local storage.");
  }

  placesList = placesList.filter(p => p.id !== id);
  tripPlanList = tripPlanList.filter(p => p.id !== id);
  saveToLocalStorage();
  renderAdminTable();
  displayAttractions();
  refreshTripCartUI();
}
