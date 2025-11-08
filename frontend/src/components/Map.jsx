import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";

import api from "../utils/api";

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

  const [allProjects, setAllProjects] = useState([]);
  const [stopper, setStopper] = useState(1);

  const [center, setCenter] = useState([122, 13]);
  const [zoom, setZoom] = useState(1);

  const caller = async () => {
    try {
      const response = await api.get(`/data/${stopper}/`);
      console.log(response.data);
      console.log(stopper);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    caller()
  }, []);

  setInterval(() => {
    setStopper((prev) => prev + 1);
    //  caller()
  }, 5000);

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

  const handleClick = (geo) => {
    const centroid = geoCentroid(geo);
    console.log(geo);

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
    <div className="w-screen h-screen overflow-y-scroll">
      <div className="w-3/4 h-3/4"></div>
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
          scale: level === "barangays" ? 8000 : 300,
          center: [122, 13],
        }}
        width={300}
        height={100}
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
                  r={1 / zoom}
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
