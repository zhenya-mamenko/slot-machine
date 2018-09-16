import React from "react";
import PropTypes from "prop-types";
import BalanceInput from "./BalanceInput";
import SpinButton from "./SpinButton";
import DebugArea from "./DebugArea";

require("./RightPanel.css");

const RightPanel = ({ buttonClick }) => (
  <div className="right-panel">
    <div className="balance-spin">
      <BalanceInput />
      <SpinButton onClick = { buttonClick }/>
    </div>
    <div className="debug-area">
      <DebugArea />
    </div>
  </div>
);

RightPanel.propTypes = {
  buttonClick: PropTypes.func.isRequired
};

export default RightPanel;