"use client";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { useMapStore } from "@/store/mapStore";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

const nitKurukshetraBounds: [[number, number], [number, number]] = [
  [76.8113, 29.944],
  [76.8265, 29.9555],
];
const campusLocations = {
  mainGate: { lng: 76.822599, lat: 29.947643 },
  library: { lng: 76.8161, lat: 29.9492 },
  canteen: { lng: 76.8178, lat: 29.9486 },
  hostel: { lng: 76.8205, lat: 29.9512 },
};



const campusMarkers = [
  {
    id: "library",
    type: "library",
    name: "Central Library",
    lng: 76.8161,
    lat: 29.9492,
  },
  {
    id: "canteen",
    type: "canteen",
    name: "Student Canteen",
    lng: 76.8178,
    lat: 29.9486,
  },
  {
    id: "hostel",
    type: "hostel",
    name: "Boys Hostel",
    lng: 76.8205,
    lat: 29.9512,
  },
];



function flyToLocation(
  map: mapboxgl.Map,
  lng: number,
  lat: number,
  zoom = 17.5
) {
  map.flyTo({
    center: [lng, lat],
    zoom,
    pitch: 65,
    bearing: Math.random() * 40 - 20, // subtle cinematic rotation
    speed: 1.2,
    curve: 1.6,
    easing: (t) => t,
    essential: true,
  });
}


export default function CampusMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const { target } = useMapStore();

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new mapboxgl.Map({
    container: mapRef.current!,
    style: "mapbox://styles/mapbox/streets-v12",
    center: [76.817966, 29.948314],
    zoom: 16,
    pitch: 60,
    bearing: -20,
    antialias: true,

    maxBounds: nitKurukshetraBounds,
    minZoom: 14,
    maxZoom: 18,
    });

    mapInstanceRef.current = map;

    map.on("load", () => {  
        map.addLayer({
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            paint: {
            "fill-extrusion-color": "#cfcfcf",
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": ["get", "min_height"],
            "fill-extrusion-opacity": 0.85,
            },
        });
        map.addSource("nit-boundary", {
            type: "geojson",
            data: "/nit-boundary.geojson",
        });

        // Fill (soft highlight)
        map.addLayer({
            id: "nit-fill",
            type: "fill",
            source: "nit-boundary",
            paint: {
            "fill-color": "#2563eb",
            "fill-opacity": 0.18,
            },
        });

        // Outline (clear boundary)
        map.addLayer({
            id: "nit-outline",
            type: "line",
            source: "nit-boundary",
            paint: {
            "line-color": "#1e40af",
            "line-width": 3,
            },
        });

        campusMarkers.forEach((place) => {
          const el = document.createElement("div");
          el.className = `campus-marker ${place.type}`;
          el.innerHTML =
            place.type === "canteen"
              ? "🍽"
              : place.type === "hostel"
              ? "🏠"
              : "📚";

          el.onclick = () => {
            flyToLocation(map, place.lng, place.lat);

            new mapboxgl.Popup()
              .setLngLat([place.lng, place.lat])
              .setHTML(`<b>${place.name}</b>`)
              .addTo(map);
          };

          new mapboxgl.Marker(el)
            .setLngLat([place.lng, place.lat])
            .addTo(map);
        });
      });

      map.on("click", "3d-buildings", (e) => {
          if (!e.features || !e.features[0]) return;

          const feature = e.features[0];
          const { lng, lat } = e.lngLat;

          flyToLocation(map, lng, lat);

          const buildingName =
            feature.properties?.name ||
            feature.properties?.["name:en"] ||
            "Campus Building";

          new mapboxgl.Popup()
            .setLngLat([lng, lat])
            .setHTML(`<b>🏢 ${buildingName}</b>`)
            .addTo(map);
        });

        map.on("mouseenter", "3d-buildings", () => {
          map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", "3d-buildings", () => {
          map.getCanvas().style.cursor = "";
        });

      return () => {
        map.remove();
        mapInstanceRef.current = null;
      };
  }, []);

  useEffect(() => {
  if (!target || !mapInstanceRef.current) return;

  const map = mapInstanceRef.current;

  flyToLocation(map, target.lng, target.lat);

  new mapboxgl.Popup()
    .setLngLat([target.lng, target.lat])
    .setHTML(`<b>${target.name}</b>`)
    .addTo(map);
}, [target]);

  return <div ref={mapRef} className="w-full h-full relative rounded-3xl" />;
}
