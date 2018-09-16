import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {picHeight, picWidth, symbolsStrings} from "./consts";

require("./Reel.css");

const reelImages = symbolsStrings.map((symbol, index) => {
  let image = require("./images/"+symbol+".png");
  return <img key={index} src={image} width={picWidth} height={picHeight} />;
});


let Reel = ({position, num}) => {
  let pos = parseInt(Math.floor(position % picHeight));
  let pic = parseInt(Math.floor((parseFloat(position) / picHeight) % reelImages.length));
  let showReel = [];
  for (let i=0; i<3; i++) {
    let idx = pic + i;
    idx = idx >= reelImages.length ? idx - reelImages.length : idx;
    showReel.push(reelImages[idx]);
  }

  return (
    <div className="reel">
      <div className="inner-reel">
        <div id={"reel-"+num} style={{ marginTop: "-"+pos+"px" }}>{showReel}</div>
      </div>
    </div>
  );
};

Reel.propTypes = {
  position: PropTypes.number.isRequired,
  num: PropTypes.number.isRequired
};

const reelMapStateToProps = (state, ownProps) => {
  return {
    position: state.reelsData[ownProps.num].currentScrollPosition
  };
};
Reel = connect(reelMapStateToProps, null)(Reel);

export default Reel;