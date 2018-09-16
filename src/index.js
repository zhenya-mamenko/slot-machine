import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { picHeight, redLinePositions } from "./consts";
import * as Actions from "./actions";
import slotMachine from "./reducers";
import payment from "./payment";
import Reels from "./Reels";
import PayTable from "./PayTable";
import RightPanel from "./RightPanel";

require("./index.html");
require("./index.css");

const timerDelay = 8;
const spinTime = 2.0;
const secsPerRound = 0.4;

const store = createStore(slotMachine);

/*
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
*/

function testPay() {
  const reels = store.getState().reelsData.map(r => r.currentPosition);
  redLinePositions.map(position => {
    const result = payment(reels, position);
    if (result.pay) {
      store.dispatch(Actions.updateBalance(result.coins));
      store.dispatch(Actions.blinkPayLine(result.line));
      store.dispatch(Actions.showRedLine(position));
    }
  });
}

function changeElements(disable) {
  let container = document.getElementsByClassName("right-panel")[0], elements;
  elements = container.getElementsByTagName("input");
  for (let i=0; i<elements.length; i++)
    if (disable) {
      elements[i].setAttribute("disabled", disable);
    }
    else {
      elements[i].removeAttribute("disabled");
    }
  elements = container.getElementsByTagName("select");
  for (let i=0; i<elements.length; i++)
    if (disable) {
      elements[i].setAttribute("disabled", disable);
    }
    else {
      elements[i].removeAttribute("disabled");
    }
  elements = container.getElementsByTagName("button");
  for (let i=0; i<elements.length; i++)
    if (disable) {
      elements[i].setAttribute("disabled", disable);
    }
    else {
      elements[i].removeAttribute("disabled");
    }
}

const EasingFunctions = {
  // no easing, no acceleration
  linear: function (t) { return t; },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t; },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t); },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t; },
  // accelerating from zero velocity 
  easeInCubic: function (t) { return t*t*t; },
  // decelerating to zero velocity 
  easeOutCubic: function (t) { return (--t)*t*t+1; },
  // acceleration until halfway, then deceleration 
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; },
  // accelerating from zero velocity 
  easeInQuart: function (t) { return t*t*t*t; },
  // decelerating to zero velocity 
  easeOutQuart: function (t) { return 1-(--t)*t*t*t; },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t; },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t; },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t; },
  // acceleration until halfway, then deceleration 
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t; }
};

function calcIncrement(currentScrollPosition, lastScrollPosition, remainSecs, secs, easing, currentPosition) {
  let rounds = Math.floor(spinTime / secsPerRound);
  let spinTimeScrollPosition = (rounds*5)*picHeight;
  let t, last;
  
  if (secs-remainSecs <= spinTime) {
    t = (secs-remainSecs)/spinTime;
    last = spinTimeScrollPosition;
  }
  else {
    t = (secs-spinTime-remainSecs)/(secs-spinTime);
    last = lastScrollPosition-spinTimeScrollPosition;
  }
  return (last)*easing(t)+(secs-remainSecs > spinTime ? spinTimeScrollPosition : 0);
}

function calcReelScrollPosition(currentScrollPosition, lastScrollPosition, remainSecs, secs, currentPosition, easing1, easing2) {
  let scrollPosition = (currentPosition*picHeight)+calcIncrement(currentScrollPosition, lastScrollPosition, remainSecs, secs, secs-remainSecs < spinTime ? easing1 : easing2, currentPosition);
  return scrollPosition > lastScrollPosition ? lastScrollPosition : scrollPosition;
}

function initReel(index, position, secs) {
  let rounds = Math.floor(secs / secsPerRound)+1;
  let currentPosition = store.getState().reelsData[index].currentPosition;
  let lastScrollPosition = (rounds*5 + position)*picHeight;
  let currentScrollPosition = currentPosition*picHeight;
  store.dispatch(Actions.setReelData(index, currentScrollPosition, secs, lastScrollPosition, secs, currentPosition, true));
}

function spinReel(index, newPosition) {
  let {lastScrollPosition, currentScrollPosition, remainSecs, secs, currentPosition} = store.getState().reelsData[index];
  let scrollPosition = calcReelScrollPosition(currentScrollPosition, lastScrollPosition, remainSecs, secs, currentPosition, EasingFunctions.easeInCubic, EasingFunctions.easeOutQuad);
  remainSecs = remainSecs - (timerDelay*0.001);    
  if (remainSecs <= 0) {
    remainSecs = 0.0;
    scrollPosition = newPosition*picHeight;
    store.dispatch(Actions.setReelCurrentPosition(index, newPosition));
    store.dispatch(Actions.setReelSpinned(index, false));
  }
  store.dispatch(Actions.setReelData(index, scrollPosition, remainSecs));
}

function spin(newPositions) {
  let {reelsData} = store.getState();
  if (!(reelsData[0].spinned || reelsData[1].spinned || reelsData[2].spinned)) {
    testPay();
    changeElements(false);
    return;
  }  
  reelsData.map((reel, index) => {
    if (reel.spinned) spinReel(index, newPositions[index]);
  });
  setTimeout(() => {spin(newPositions);}, timerDelay);
}

function startReels() {
  let {balance} = store.getState();
  if (balance > 1) {
    store.dispatch(Actions.updateBalance(-1));
  }
  
  let to1, to2, to3;
  if (document.getElementById("mode-fixed").checked) {
    to1 = document.getElementById("symbol-reel1").selectedIndex-(document.getElementById("position-reel1").selectedIndex/2);
    to1 = to1 < 0 ? to1 + 5 : to1;
    to2 = document.getElementById("symbol-reel2").selectedIndex-(document.getElementById("position-reel2").selectedIndex/2);
    to2 = to2 < 0 ? to2 + 5 : to2;
    to3 = document.getElementById("symbol-reel3").selectedIndex-(document.getElementById("position-reel3").selectedIndex/2);
    to3 = to3 < 0 ? to3 + 5 : to3;
  }
  else {
    to1 = Math.floor(Math.random()*9)/2;
    to2 = Math.floor(Math.random()*9)/2;
    to3 = Math.floor(Math.random()*9)/2;
  }
   
  changeElements(true);
  
  initReel(2, to3, 3.5);
  initReel(1, to2, 3.0);
  initReel(0, to1, 2.5);
  store.dispatch(Actions.clearBlinkPayLines());
  store.dispatch(Actions.hideRedLines());
  spin([to1, to2, to3]);
}

const SlotMachine = () => (
  <div>
    <Reels />
    <PayTable />
    <RightPanel buttonClick={ () => startReels() } />
  </div>
);

render((
  <Provider store={ store } >
    <SlotMachine />
  </Provider>  
), 
document.getElementById("root"));
document.getElementById("mode-random").checked = true;