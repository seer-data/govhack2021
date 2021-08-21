/* eslint-disable */
import * as React from "react";
import { Map, GeoJSON } from "react-leaflet";
import { Dropdown } from "semantic-ui-react";

// import actData from "./data/actData.json";

const data = require("./data/ausData17MB.json");

const states = {
  1: "NSW",
  2: "VIC",
  3: "QLD",
  4: "SA",
  5: "WA",
  6: "TAS",
  7: "NT",
  8: "ACT",
};

const originalVariables = {
  "a": "Transferred Households",
  "b": "Estimated Wealth Transfer",  // show
  "c": "Average Wealth Transfer per Household Transferred",  // show
  "d": "Median gift reported by taxpayers ($, 2018)",
  "e": "Percent of persons undertaking voluntary work for an organisation or group (%, 2016)",
  "f": "Taxpayers reporting gifts\/donations per Working Age Population (15-64 years) (%, 2018)",
  "g": "Giving Index (percentile)",
  "h": "Widows (2016)",
  "i": "Percent of population widows (%, 2016)",
  "j": "Women over 65 (2016)",
  "k": "Women over 65 with at most one child (2016)",
  "l": "Percent of population women over 65 (%, 2016)",
  "m": "Percent of population women over 65 with at most one child (%, 2016)",
  "n": "Owner manager of incorporated enterprise with employees (2016)",
  "o": "Percent of population owner managers (%, 2016)",
};

const renamedVariables = {
  "a": "Transferred Households",
  "b": "Estimated Wealth Transfer",  // show
  "c": "Avg. Wealth Transfer per Household",  // show
  "d": "Median gift $ reported by taxpayers",
  "e": "% undertaking voluntary work",
  "f": "% taxpayers reporting gifts/donations",
  "g": "Giving Index (percentile)",
  "h": "Number of Widows",
  "i": "% of population widows",
  "j": "Women over 65 (2016)",
  "k": "Women over 65 with at most one child",
  "l": "% of population women > 65",
  "m": "% of pop. women > 65 with <= 1 child",
  "n": "Owner manager enterprise with employees",
  "o": "% of population owner managers",
};

const valueRanges = Object.fromEntries(Object.keys(originalVariables).map(
  (v) => [v, { lowest: 999999999, highest: 0 }]
));

console.log(valueRanges);

// Object.keys(originalVariables).forEach(
//   (v) => valueRanges[v]: { lowest: 99999999, highest: 0 }
// );

data.features.forEach(feature => {
  Object.keys(originalVariables).forEach(v => {
    const value = feature.properties[v];
    if (value < valueRanges[v].lowest) {
      valueRanges[v] = { ...valueRanges[v], lowest: value };
    }
    value > valueRanges[v].highest ? valueRanges[v].highest = value : null;
  });
});

console.log(valueRanges);

export const MapTest = () => {

  const DEFAULT_VARIABLE_A = "g";
  const DEFAULT_VARIABLE_B = "c";
  const [variableA, setVariableA] = React.useState(DEFAULT_VARIABLE_A);
  const [variableB, setVariableB] = React.useState(DEFAULT_VARIABLE_B);


  const zoom = 8;
  const position = [-35.2809, 149.13];

  // const getColor = (d) => {
  //   return d > 90 ? '#800026' :
  //          d > 80  ? '#BD0026' :
  //          d > 70  ? '#E31A1C' :
  //          d > 60  ? '#FC4E2A' :
  //          d > 50   ? '#FD8D3C' :
  //          d > 30   ? '#FEB24C' :
  //          d > 10   ? '#FED976' :
  //                     '#FFEDA0';
  // }

  const getColor = (a, b) => {
    return a > 90 && b > 1000 ? '#002654' :
      a > 80 && b > 800 ? '#003B8D' :
        a > 70 && b > 600 ? '#0049C6' :
          a > 60 && b > 600 ? '#0055FF' :
            a > 50 && b > 400 ? '#5394FD' :
              a > 30 && b > 200 ? '#A6CDFC' :
                a > 10 && b > 100 ? '#F7F8F9' :
                  '#FFFFFF';
  };


  const geoJSONStyle = (feature) => ({
    // color: '#1f2021',
    weight: 0.7,
    fillOpacity: 0.5,
    fillColor: getColor(feature.properties[variableA], feature.properties[variableB]),
    // fillColor: '#fff2af',
    // color: "white",
    color: getColor(feature.properties[variableA], feature.properties[variableB]),
    // dashArray: '3',
  });

  const onEachFeature = (feature: any, layer: any) => {
    // const popupContent = ` <Popup><p>Customizable Popups <br />with feature information.</p><pre>Name: <br />${feature.properties.name}</pre></Popup>`

    const popupContent = `
      <Popup>
        <p><strong>${feature.properties.name}</strong></p>
        <p>
          State: <br /><strong>${states[feature.properties.state]}</strong>
        </p>
        <p>
        ${
      Object.entries(renamedVariables).map(([v, name]) =>
        `${name}: <strong>${Math.round(feature.properties[v] * 100) / 100}</strong></br/>`
      ).join("")
    }
        </p>
      </Popup>
    `;


    layer.bindPopup(popupContent);
  };

  console.log("data", data);

  const dropdownOptions = Object.entries(originalVariables).map(([k, v]) => {
    return {
      key: k,
      value: k,
      text: v
    }
  });

  const handleDropdownChange = (data, callFunc) => {
    callFunc(data.value);
  };

  return (
    <>
      <div className="text-center mb-5">
        <h1>TITLE</h1>
        <Dropdown
          options={dropdownOptions.map(o => o.value !== variableB ? o : { ...o, disabled: true })}
          defaultValue={DEFAULT_VARIABLE_A}
          onChange={(_e: any, data) => handleDropdownChange(data, setVariableA)}
          className="z-index-max mr-5"
        />
        <Dropdown
          options={dropdownOptions.map(o => o.value !== variableA ? o : { ...o, disabled: true })}
          defaultValue={DEFAULT_VARIABLE_B}
          onChange={(_e: any, data) => handleDropdownChange(data, setVariableB)}
          className="z-index-max"
        />
      </div>

      <Map center={position} zoom={zoom}>
        {/* <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
        /> */}
        <GeoJSON
          data={data.features}
          style={geoJSONStyle}
          onEachFeature={onEachFeature}
        />
      </Map>
    </>
  );

};
