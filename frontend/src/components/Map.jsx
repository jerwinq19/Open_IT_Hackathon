import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";

import regionsData from "../assets/Regions.json";
import provincesData from "../assets/Provinces.json";
import municitiesData from "../assets/MuniCities.json";
import barangaysData from "../assets/Barangays.json";

export default function Map() {
  const [level, setLevel] = useState("regions");

  const [regions, setRegions] = useState(null);
  const [provinces, setProvinces] = useState(null);
  const [municities, setMunicities] = useState(null);
  const [barangays, setBarangays] = useState(null);

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedMuniCity, setSelectedMuniCity] = useState(null);
  const [selectedBarangay, setSelectedBarangay] = useState(null);

  const [center, setCenter] = useState([122, 13]);
  const [zoom, setZoom] = useState(1);

  // ✅ Normalize helper
  const normalize = (s) =>
    (s || "")
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "");

  useEffect(() => {
    //  nilagay ko sila sa kanilang estado, kaibigan
    setRegions(regionsData);
    setProvinces(provincesData);
    setMunicities(municitiesData);
    setBarangays(barangaysData);

    console.log("nalagay na siguro");
  }, []);

  let allProjects = [
    {
      id: 1,
      date_time_ph: "2025-11-07T14:28:00Z",
      latitude: 6.34,
      longtitude: 127.09,
      magnitude: 3.1,
      location: "106 km S 42° E of Tarragona (Davao Oriental)",
      specific_loc: "Tarragona",
      general_loc: "Davao Oriental",
    },
    {
      id: 2,
      date_time_ph: "2025-11-07T14:21:00Z",
      latitude: 16.06,
      longtitude: 119.95,
      magnitude: 1.8,
      location: "011 km N 45° E of Dasol (Pangasinan)",
      specific_loc: "Dasol",
      general_loc: "Pangasinan",
    },
    {
      id: 3,
      date_time_ph: "2025-11-07T14:18:00Z",
      latitude: 15.97,
      longtitude: 119.89,
      magnitude: 2.9,
      location: "003 km S 11° E of Dasol (Pangasinan)",
      specific_loc: "Dasol",
      general_loc: "Pangasinan",
    },
    {
      id: 4,
      date_time_ph: "2025-11-07T14:14:00Z",
      latitude: 16.01,
      longtitude: 119.81,
      magnitude: 3.1,
      location: "008 km N 70° W of Dasol (Pangasinan)",
      specific_loc: "Dasol",
      general_loc: "Pangasinan",
    },
    {
      id: 5,
      date_time_ph: "2025-11-07T13:38:00Z",
      latitude: 16.07,
      longtitude: 120.03,
      magnitude: 1.7,
      location: "009 km S 88° E of Mabini (Pangasinan)",
      specific_loc: "Mabini",
      general_loc: "Pangasinan",
    },
    {
      id: 6,
      date_time_ph: "2025-11-07T13:23:00Z",
      latitude: 15.98,
      longtitude: 119.81,
      magnitude: 4.4,
      location: "007 km S 84° W of Dasol (Pangasinan)",
      specific_loc: "Dasol",
      general_loc: "Pangasinan",
    },
    {
      id: 7,
      date_time_ph: "2025-11-07T13:21:00Z",
      latitude: 7.48,
      longtitude: 126.73,
      magnitude: 2.3,
      location: "036 km N 35° E of Manay (Davao Oriental)",
      specific_loc: "Manay",
      general_loc: "Davao Oriental",
    },
    {
      id: 8,
      date_time_ph: "2025-11-07T13:12:00Z",
      latitude: 11.07,
      longtitude: 124.1,
      magnitude: 2.2,
      location: "014 km N 79° E of City Of Bogo (Cebu)",
      specific_loc: "City Of Bogo",
      general_loc: "Cebu",
    },
    {
      id: 9,
      date_time_ph: "2025-11-07T12:37:00Z",
      latitude: 12.11,
      longtitude: 125.09,
      magnitude: 2.2,
      location: "009 km N 46° E of San Jose De Buan (Samar)",
      specific_loc: "San Jose De Buan",
      general_loc: "Samar",
    },
    {
      id: 10,
      date_time_ph: "2025-11-07T12:36:00Z",
      latitude: 6.92,
      longtitude: 126.4,
      magnitude: 2.2,
      location: "016 km S 21° W of Tarragona (Davao Oriental)",
      specific_loc: "Tarragona",
      general_loc: "Davao Oriental",
    },
    {
      id: 11,
      date_time_ph: "2025-11-07T11:51:00Z",
      latitude: 18.76,
      longtitude: 121.5,
      magnitude: 2.7,
      location: "017 km S 55° E of Fuga Island (Aparri) (Cagayan)",
      specific_loc: "Fuga Island",
      general_loc: "Cagayan",
    },
    {
      id: 12,
      date_time_ph: "2025-11-07T11:34:00Z",
      latitude: 11.17,
      longtitude: 123.96,
      magnitude: 3.0,
      location: "014 km N 09° W of City Of Bogo (Cebu)",
      specific_loc: "City Of Bogo",
      general_loc: "Cebu",
    },
    {
      id: 13,
      date_time_ph: "2025-11-07T11:23:00Z",
      latitude: 14.11,
      longtitude: 120.6,
      magnitude: 1.6,
      location: "006 km N 37° W of Nasugbu (Batangas)",
      specific_loc: "Nasugbu",
      general_loc: "Batangas",
    },
    {
      id: 14,
      date_time_ph: "2025-11-07T11:17:00Z",
      latitude: 11.15,
      longtitude: 123.96,
      magnitude: 2.0,
      location: "011 km N 09° W of City Of Bogo (Cebu)",
      specific_loc: "City Of Bogo",
      general_loc: "Cebu",
    },
    {
      id: 15,
      date_time_ph: "2025-11-07T11:10:00Z",
      latitude: 7.94,
      longtitude: 124.6,
      magnitude: 2.5,
      location: "020 km N 29° W of Amai Manabilang (Lanao Del Sur)",
      specific_loc: "Amai Manabilang",
      general_loc: "Lanao Del Sur",
    },
    {
      id: 16,
      date_time_ph: "2025-11-07T10:43:00Z",
      latitude: 11.31,
      longtitude: 124.48,
      magnitude: 3.1,
      location: "006 km S 06° W of Leyte (Leyte)",
      specific_loc: "Leyte",
      general_loc: "Leyte",
    },
    {
      id: 17,
      date_time_ph: "2025-11-07T10:42:00Z",
      latitude: 9.68,
      longtitude: 126.25,
      magnitude: 1.9,
      location: "015 km S 42° E of General Luna (Surigao Del Norte)",
      specific_loc: "General Luna",
      general_loc: "Surigao Del Norte",
    },
    {
      id: 18,
      date_time_ph: "2025-11-07T10:27:00Z",
      latitude: 5.99,
      longtitude: 126.2,
      magnitude: 3.8,
      location: "061 km S 68° E of Don Marcelino (Davao Occidental)",
      specific_loc: "Don Marcelino",
      general_loc: "Davao Occidental",
    },
    {
      id: 19,
      date_time_ph: "2025-11-07T10:06:00Z",
      latitude: 6.83,
      longtitude: 126.75,
      magnitude: 2.7,
      location: "048 km S 29° E of Manay (Davao Oriental)",
      specific_loc: "Manay",
      general_loc: "Davao Oriental",
    },
    {
      id: 20,
      date_time_ph: "2025-11-07T09:53:00Z",
      latitude: 6.96,
      longtitude: 126.99,
      magnitude: 2.8,
      location: "058 km S 61° E of Manay (Davao Oriental)",
      specific_loc: "Manay",
      general_loc: "Davao Oriental",
    }
  ];

  const handleClick = (geo) => {
    const centroid = geoCentroid(geo);

    if (level === "regions") {
      setSelectedRegion(geo.properties.REGION);
      setLevel("provinces");
      setCenter(centroid);
      setZoom(4);
    } else if (level === "provinces") {
      setSelectedProvince(geo.properties.PROVINCE || geo.properties.NAME_1);
      setLevel("municities");
      setCenter(centroid);
      setZoom(6);
    } else if (level === "municities") {
      setSelectedMuniCity(geo.properties.NAME_2 || geo.properties.NAME_1);
      setLevel("barangays");
      setCenter(centroid);
      setZoom((prevZoom) => (prevZoom < 8 ? 8 : prevZoom));
    } else if (level === "barangays") {
      setSelectedBarangay(geo.properties.BARANGAY || geo.properties.NAME_3);
      // setCenter(centroid); nagba-bug pag nag-click sa brgy level
    }
  };

  const goBack = () => {
    if (level === "barangays") {
      setLevel("municities");
      setSelectedMuniCity(null);
      setSelectedBarangay(null);
      setZoom(6);
    } else if (level === "municities") {
      setLevel("provinces");
      setSelectedProvince(null);
      setZoom(4);
    } else if (level === "provinces") {
      setLevel("regions");
      setSelectedRegion(null);
      setZoom(1);
      setCenter([122, 13]);
    }
  };

  let features = [];
  if (level === "regions" && regions) {
    features = regions.features;
  } else if (level === "provinces" && provinces) {
    features = provinces.features.filter(
      (f) => normalize(f.properties.REGION) === normalize(selectedRegion)
    );
  } else if (level === "municities" && municities) {
    features = municities.features.filter(
      (f) => normalize(f.properties.PROVINCE) === normalize(selectedProvince)
    );
  } else if (level === "barangays" && barangays) {
    features = barangays.features.filter(
      (f) => normalize(f.properties.NAME_2) === normalize(selectedMuniCity)
    );
  }

  const getEarthquakeEvent = (event) => {
    let match = null;

    let case_1 = null;
    let case_2 = null;

    case_1 = event.specific_loc;
    case_2 = event.general_loc;

    // there should be a way to iterate through brgy to check if either exists
    // if there is no match for either, go to municity
    // ...province
    // ...region

    // matches should be stored in an array within a state
    if (municities) {
      console.log(municities);
      match = municities.features.find(
        (b) => normalize(b.properties.NAME_2) === normalize(case_1)
      );
      if (!match || match === null || match === undefined) {
        match = municities.features.find(
          (b) => normalize(b.properties.NAME_2) === normalize(case_2)
        );
      }
    }

    return match ? geoCentroid(match) : null;
  };

  function testHayop(eventloc) {
    console.log("start point nibus");
    console.log(municities);

    if (municities) {
      municities.features.map((b) => {
        if (eventloc === b.properties.NAME_1) {
          console.log(b.properties.NAME_1 + eventloc);
        }
        if (eventloc === b.properties.NAME_2) {
          console.log(b.properties.NAME_2 + eventloc);
        }
        if (eventloc === b.properties.NAME_3) {
          console.log(b.properties.NAME_3 + eventloc);
        }
      });
    }
  }

  // un-comment this thing for testing purps
  // if (municities) {
  //   testHayop(allProjects[0].specific_loc)
  // }

  return (
    <div>
      <div style={{ position: "relative" }}>
        <h2>{"Level:" + " " + level.toUpperCase()}</h2>
        <h4>Region: {selectedRegion ? selectedRegion : "Select a Region."}</h4>
        <h4>
          Province: {selectedProvince ? selectedProvince : "Select a Province."}
        </h4>
        <h4>
          MuniCity: {selectedMuniCity ? selectedMuniCity : "Select a MuniCity."}
        </h4>
        <h4>
          Barangay: {selectedBarangay ? selectedBarangay : "Select a Barangay."}
        </h4>
        {level !== "regions" && (
          <button onClick={goBack} style={{ marginBottom: "10px" }}>
            ⬅ Back
          </button>
        )}
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: level === "barangays" ? 8000 : 2000,
          center: [122, 13],
        }}
        width={800}
        height={600}
      >
        <ZoomableGroup
          center={center}
          zoom={zoom}
          minZoom={1}
          maxZoom={level === "barangays" ? 100 : 10}
        >
          {features.length > 0 && (
            <Geographies geography={{ type: "FeatureCollection", features }}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(geo);
                    }}
                    tabIndex={-1}
                    style={{
                      default: {
                        fill: "#133B48",
                        stroke: "white",
                        strokeWidth: level === "barangays" ? 0.05 : 0.1,
                      },
                      hover: {
                        fill: level === "barangays" ? "orange" : "#205e72ff",
                      },
                      pressed: {
                        fill: level === "barangays" ? "orange" : "#133B48",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          )}

          {allProjects.map((eqe) => {
            const coords = getEarthquakeEvent(eqe);
            if (!coords) return null;
            return (
              <Marker key={eqe.id} coordinates={coords}>
                <circle
                  r={4 / zoom}
                  fill="red"
                  stroke="white"
                  strokeWidth={0.75 / zoom}
                  style={{ cursor: "pointer" }}
                />
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
