import React from "react";
import PayLine from "./PayLine";
import { payStrings } from "./consts";

require("./PayTable.css");

const PayTable = () => (
  <div className="pay-table">
    { payStrings.map((s, index) => <PayLine key={index} id={index}>{s}</PayLine>) }
  </div>
); 

export default PayTable;