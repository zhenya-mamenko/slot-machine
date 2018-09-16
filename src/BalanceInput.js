import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setBalance } from "./actions";

require("./BalanceInput.css");

let BalanceInput = ({ balance, onChange }) => (
  <div className="balance-input">
    <input type="text" value={balance} onChange={ onChange } />                                                
  </div>
);

BalanceInput.propTypes = {
  balance: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

const balanceMapStateToProps = (state, ownProps) => {
  return {
    balance: state.balance
  };
};

const balanceDispatchToProps = dispatch => {
  return {
    onChange: (event) => {
      let v = parseInt(event.target.value);
      if (!isNaN(v)) {
        v = v < 1 ? 1 : v;
        v = v > 5000 ? 5000 : v;
        dispatch(setBalance(v));
      }
    }
  };
};

BalanceInput = connect(balanceMapStateToProps, balanceDispatchToProps)(BalanceInput);

export default BalanceInput;