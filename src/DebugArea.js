import React from "react";
import DebugReelComponent from "./DebugReelComponent";

require("./DebugArea.css");

const DebugArea = () => ( 
  <div>
    <div>
      <label className="l1">Mode:</label>
      <input type="radio" name="mode" id="mode-random" /><label htmlFor="mode-random">random</label>
      <input type="radio" name="mode" id="mode-fixed" /><label htmlFor="mode-fixed">fixed</label>
    </div>

    <div>
      <DebugReelComponent id="reel1" label="Left" />
      <DebugReelComponent id="reel2" label="Middle" />
      <DebugReelComponent id="reel3" label="Right" />
    </div>
  </div>
);

export default DebugArea;