// ── Inicialización del mapa Leaflet ───────────────────────────────────────
const map = L.map('map', {
  center: [20, 0],
  zoom: 2,
  minZoom: 2,
  maxBounds: [[-90, -180], [90, 180]],
  maxBoundsViscosity: 1.0
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

let pins          = [];
let pinIdCounter  = 0;
let leafletMarkers = {};

map.on('click', function (e) {
  addPin(e.latlng.lat, e.latlng.lng);
});

function makeIcon(color) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
      <ellipse cx="14" cy="33" rx="5" ry="2" fill="rgba(0,0,0,0.3)"/>
      <path d="M14 0 C6.3 0 0 6.3 0 14 C0 22 14 36 14 36 C14 36 28 22 28 14 C28 6.3 21.7 0 14 0Z"
            fill="${color}" stroke="white" stroke-width="1.5"/>
      <circle cx="14" cy="14" r="5" fill="white" opacity="0.7"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize:    [28, 36],
    iconAnchor:  [14, 36],
    popupAnchor: [0, -36]
  });
}

function addPin(lat, lon) {
  const label = document.getElementById('pin-label').value.trim() || `Pin ${pinIdCounter + 1}`;
  const color = document.getElementById('pin-color').value;
  const id    = pinIdCounter++;

  pins.push({ id, lat, lon, label, color });

  const marker = L.marker([lat, lon], { icon: makeIcon(color) })
    .addTo(map)
    .bindPopup(`<b>${label}</b><br>${lat.toFixed(4)}°, ${lon.toFixed(4)}°`);

  leafletMarkers[id] = marker;

  document.getElementById('pin-label').value = '';
  renderChips();
  renderPlotlyChart();
  document.getElementById('pin-count').textContent = pins.length;
}

function removePin(id) {
  if (leafletMarkers[id]) {
    map.removeLayer(leafletMarkers[id]);
    delete leafletMarkers[id];
  }
  pins = pins.filter(p => p.id !== id);
  renderChips();
  renderPlotlyChart();
  document.getElementById('pin-count').textContent = pins.length;
}

function clearPins() {
  if (!pins.length || !confirm('¿Eliminar todos los pines?')) return;
  Object.values(leafletMarkers).forEach(m => map.removeLayer(m));
  leafletMarkers = {};
  pins = [];
  renderChips();
  renderPlotlyChart();
  document.getElementById('pin-count').textContent = 0;
}

function exportPins() {
  if (!pins.length) { alert('No hay pines para exportar.'); return; }
  const blob = new Blob([JSON.stringify(pins, null, 2)], { type: 'application/json' });
  const a    = Object.assign(document.createElement('a'), {
    href:     URL.createObjectURL(blob),
    download: 'pines.json'
  });
  a.click();
}

function renderChips() {
  const list = document.getElementById('pin-list');
  if (!pins.length) {
    list.innerHTML = '<span style="color:var(--muted);font-size:0.75rem;font-family:\'Space Mono\',monospace">Ningún pin aún...</span>';
    return;
  }
  list.innerHTML = pins.map(p => `
    <div class="pin-chip">
      <span class="chip-dot" style="background:${p.color}"></span>
      <span>${p.label}</span>
      <span style="color:var(--muted)">(${p.lat.toFixed(2)}°, ${p.lon.toFixed(2)}°)</span>
      <button class="remove-btn" onclick="removePin(${p.id})">✕</button>
    </div>
  `).join('');
}

function renderPlotlyChart() {
  const trace = {
    type: 'scatter',
    mode: 'markers+text',
    x:    pins.map(p => p.lon),
    y:    pins.map(p => p.lat),
    text: pins.map(p => p.label),
    textposition: 'top center',
    marker: {
      size:  12,
      color: pins.map(p => p.color),
      line:  { color: '#ffffff', width: 1 }
    },
    textfont:      { color: '#e2eaf5', size: 10, family: 'Space Mono' },
    hovertemplate: '<b>%{text}</b><br>Lon: %{x:.2f}°<br>Lat: %{y:.2f}°<extra></extra>'
  };

  const layout = {
    paper_bgcolor: '#0b0f19',
    plot_bgcolor:  '#131929',
    font:   { color: '#5a7090', family: 'Space Mono', size: 10 },
    margin: { t: 10, b: 40, l: 50, r: 10 },
    xaxis: {
      title:         'Longitud',
      color:         '#5a7090',
      gridcolor:     '#1e2d4a',
      zerolinecolor: '#1e2d4a',
      range: [-180, 180]
    },
    yaxis: {
      title:         'Latitud',
      color:         '#5a7090',
      gridcolor:     '#1e2d4a',
      zerolinecolor: '#1e2d4a',
      range: [-90, 90]
    },
    showlegend: false,
    height: 200
  };

  Plotly.react('chart', [trace], layout, { displayModeBar: false, responsive: true });
}

renderPlotlyChart();
