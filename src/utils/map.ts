// Initialize and add the map
let map;

const markers = [];

var varInfoWindow;
var varMap;
var infoWindow;

const createMapVars = async () => {
  const { InfoWindow } = await google.maps.importLibrary('maps');
  infoWindow = new InfoWindow();
};

export const initMap = async () => {
  createMapVars();
  const mapEl = document.querySelector('.the-map');
  if (!mapEl) return;
  const mapCoordWraps = document.querySelectorAll('.the-map-coord-wrap');
  const positions = [];
  mapCoordWraps.forEach((w) => {
    const name = w.getAttribute('title') ?? 'No name';
    let lat = w.getAttribute('lat');
    let lng = w.getAttribute('lng');
    const slug = w.getAttribute('slug');
    if (!lat || !lng || !slug) return;
    lat = Number(lat);
    lng = Number(lng);
    if (isNaN(lat) || isNaN(lng)) return;
    positions.push({
      name: name,
      slug: slug,
      position: {
        lat: lat,
        lng: lng,
      },
    });
  });
  console.log(positions);
  const { Map } = await google.maps.importLibrary('maps');

  if (positions.length === 0) {
    let lat = mapEl.getAttribute('default-lat');
    let lng = mapEl.getAttribute('default-lng');
    if (!lat || !lng) return;
    lat = Number(lat);
    lng = Number(lng);
    if (isNaN(lat) || isNaN(lng)) return;
    const name = mapEl.getAttribute('default-title') ?? 'No name';
    positions.push({
      name: name,
      position: {
        lat: lat,
        lng: lng,
      },
    });
  }

  const lats = positions.map((p) => p.position.lat);
  const lngs = positions.map((p) => p.position.lng);

  const position = {
    lat: (Math.max(...lats) + Math.min(...lats)) / 2,
    lng: (Math.max(...lngs) + Math.min(...lngs)) / 2,
  };

  const s = [
    {
      featureType: 'all',
      elementType: 'geometry.fill',
      stylers: [
        {
          weight: '2.00',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#9c9c9c',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        {
          color: '#f2f2f2',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#7b7b7b',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [
        {
          visibility: 'simplified',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          color: '#46bcec',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#c8d7d4',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#070707',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
  ];

  map = new Map(mapEl, {
    zoom: 17,
    center: position,
    mapId: 'DEMO_MAP_ID',
  });

  positions.forEach((p) => {
    createMarker(p, false, infoWindow);
  });

  mapInteractions(positions, infoWindow);
};

const createMarker = async (p, active, infoWindow) => {
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

  const parser = new DOMParser();

  let pinSvgString = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="18" cy="18" r="18" fill="#FFFDF7"/>
  <path d="M26 16.5555C26 22.7778 18 28.1111 18 28.1111C18 28.1111 10 22.7778 10 16.5555C10 14.4338 10.8429 12.399 12.3431 10.8987C13.8434 9.3984 15.8783 8.55554 18 8.55554C20.1217 8.55554 22.1566 9.3984 23.6569 10.8987C25.1571 12.399 26 14.4338 26 16.5555Z" stroke="#272516" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18.0002 19.2222C19.4729 19.2222 20.6668 18.0283 20.6668 16.5555C20.6668 15.0828 19.4729 13.8889 18.0002 13.8889C16.5274 13.8889 15.3335 15.0828 15.3335 16.5555C15.3335 18.0283 16.5274 19.2222 18.0002 19.2222Z" stroke="#272516" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
  if (active) {
    pinSvgString = `<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="36" cy="36" r="36" fill="#272516"/>
  <path d="M52 33.5C52 46.3333 35.5 57.3333 35.5 57.3333C35.5 57.3333 19 46.3333 19 33.5C19 29.1239 20.7384 24.9271 23.8327 21.8327C26.9271 18.7384 31.1239 17 35.5 17C39.8761 17 44.0729 18.7384 47.1673 21.8327C50.2616 24.9271 52 29.1239 52 33.5Z" stroke="#F0EEE4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M35.5 39C38.5376 39 41 36.5376 41 33.5C41 30.4624 38.5376 28 35.5 28C32.4624 28 30 30.4624 30 33.5C30 36.5376 32.4624 39 35.5 39Z" stroke="#F0EEE4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
  }

  const pinSvg = parser.parseFromString(pinSvgString, 'image/svg+xml').documentElement;

  const marker = new AdvancedMarkerElement({
    map: map,
    position: p.position,
    content: pinSvg,
    title: p.name,
    gmpClickable: true,
  });

  markers.push({ marker: marker, slug: p.slug });
  // Add a click listener for each marker, and set up the info window.
  marker.addListener('click', ({ domEvent, latLng }) => {
    const { target } = domEvent;

    infoWindow.close();
    infoWindow.setContent(marker.title);
    infoWindow.open(marker.map, marker);
  });
};

const destroyMarker = (slug) => {
  const removeSlugs = markers.filter((m) => m.slug === slug);
  removeSlugs.forEach((m) => {
    for (let key in m) {
      delete m[key];
    }
  });
  console.log(markers);
};

const mapInteractions = (positions, infoWindow) => {
  const accordion = document.querySelector('.section_bg-accordion.is-map-accordion');
  console.log(accordion);
  if (!accordion) return;
  accordion.addEventListener('click', (e) => {
    const slugEl = document.querySelector('.the-map-slug');
    if (!slugEl) return;
    const slug = slugEl.textContent;
    if (!slug) return;
    // destroyMarker(slug);
    positions.forEach((p) => {
      createMarker(p, p.slug === slug, infoWindow);
    });
  });
};
