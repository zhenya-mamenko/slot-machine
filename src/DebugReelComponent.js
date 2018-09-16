import React from "react";
import PropTypes from "prop-types";
import {symbolsStrings, redLinePositions} from "./consts";

require("./DebugReelComponent.css");

const DebugReelComponent = ({label, id}) => (
  <div className="debug-reel-component">
    <label>{label}:</label>
    <select id={"symbol-"+id}>
      { symbolsStrings.map((v, index) => <option key={index} value={v}>{v}</option>) } 
    </select>  
    <select id={"position-"+id}>
      { redLinePositions.map((v, index) => <option key={index} value={v}>{v}</option>) }
    </select>  
  </div>
);

DebugReelComponent.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default DebugReelComponent;