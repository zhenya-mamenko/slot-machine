import React from "react";
import PropTypes from "prop-types";

require("./SpinButton.css");

const SpinButton = ({ onClick }) => (
  <div className="spin-button">
    <button id="start-spin" className="need-to-disable" onClick={ onClick }>SPIN</button>
  </div>
);

SpinButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default SpinButton;