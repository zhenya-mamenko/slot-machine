import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { redLinePositions } from "./consts";

require("./RedLines.css");

const RedLine = ({position}) => {
  const index = redLinePositions.indexOf(position);
  return <div id={"redline-"+index} className={"red-line"+index}></div>;
};
 
RedLine.propTypes = {
  id: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired
};

let RedLines = ({lines}) => (
  <div>
    { lines.map((line, index) => line && <RedLine key={index} position={redLinePositions[index]} /> ) }
  </div>
);

RedLines.propTypes = {
  lines: PropTypes.array
};

const redLinesMapStateToProps = (state, ownProps) => {
  return {
    lines: state.redLines
  };
};

RedLines = connect(redLinesMapStateToProps, null)(RedLines);

export default RedLines;