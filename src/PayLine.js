import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { symbolsStrings } from "./consts";

require("./PayLine.css");

const payTablePrefix = ""; // you can use string like "- " or JSX object like <img src= "http://mamenko.ru/temp/Reel/star.gif" className="fancy-star" />
const payTableBlinkAllLine = false;
const payTableFancing = true;                                       

function preparePayLine(payline) {
  let result = payline.replace(/ symbols/ig, "").replace(new RegExp("("+symbolsStrings.join("|")+")", "g"), "|$1|").split("|");
  for (let i=0; i<result.length; i++) {
    let index;
    if ((index = symbolsStrings.indexOf(result[i])) != -1) {
      let image = require("./images/"+result[i]+".png");
      result[i] = <img key={index} className="fancy-image" src={image} />;
    }
  }
  return result;
}
 
let PayLine = ({id, blink, children}) => {
  let className = "pay-line";
  let contents = [];
  contents.push(<span key="prefix">{payTablePrefix}</span>);
  let arr = (/^(.+) (\d+)$/ig).exec(children), content = arr[1], coins = arr[2];
  
  if (!payTableFancing) {
    contents.push(<span key="content">{content}</span>);
  }
  else {
    contents = contents.concat(<span key="content">{preparePayLine(content)}</span>);
  }
  if (payTableBlinkAllLine) {
    className += (blink ? " blink" : "");
    contents.push(<span key="coins" className="coins">{coins}</span>);
  }
  else {
    contents.push(<span key="coins" className={"coins" + (blink ? " blink" : "")}>{coins}</span>);
  }
  return (
    <div id={"payline-"+id} className={className}>{contents}</div>
  );
};

PayLine.propTypes = {
  id: PropTypes.number.isRequired,
  blink: PropTypes.bool,
  children: PropTypes.node.isRequired
};

const payLineMapStateToProps = (state, ownProps) => {
  return {
    blink: state.payLines[ownProps.id].blink
  };
};

PayLine = connect(payLineMapStateToProps, null)(PayLine);

export default PayLine;