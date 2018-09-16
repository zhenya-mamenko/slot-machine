import React from "react";
import Reel from "./Reel";
import RedLines from "./RedLines";

require("./Reels.css");

const Reels = () => (
  <div className="reels">
    <div className="outer-reel"><Reel num={0} position="0" /></div>
    <div className="outer-reel"><div className="separator"></div></div>
    <div className="outer-reel"><Reel num={1} position="0" /></div>
    <div className="outer-reel"><div className="separator"></div></div>
    <div className="outer-reel"><Reel num={2} position="0" /></div>
    <RedLines />
  </div>
);

export default Reels;