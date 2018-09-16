import { combineReducers } from "redux";
import { redLinePositions, startBalance, payStrings } from "./consts";

const initialState = {
  balance: startBalance,
  reelsData: [{lastScrollPosition: 0, currentScrollPosition: 0, remainSecs: 0.0, currentPosition: 0.0, secs: 0.0, spinned: false}, 
    {lastScrollPosition: 0, currentScrollPosition: 0, remainSecs: 0.0, currentPosition: 0.0, secs: 0.0, spinned: false}, 
    {lastScrollPosition: 0, currentScrollPosition: 0, remainSecs: 0.0, currentPosition: 0.0, secs: 0.0, spinned: false}],
  payLines: payStrings.map((s) => {return {text: s, blink: false}; }),
  redLines: [false, false, false]
};

function balance(state = initialState.balance, action) {
  switch (action.type) {
  case "UPDATE_BALANCE":
    return state+action.value;
  case "SET_BALANCE":
    return action.value;
  default:
    return state;
  }
}

function reelsData(state = initialState.reelsData, action) {
  switch (action.type) {
  case "SET_REEL_SPINNED":
    return state.map((reel, index) => {
      if (index === action.index) {
        return Object.assign({}, reel, {
          spinned: action.value
        });
      }
      return reel;
    });
  case "SET_REEL_LAST_POSITION":
    return state.map((reel, index) => {
      if (index === action.index) {
        return Object.assign({}, reel, {
          lastScrollPosition: action.value
        });
      }
      return reel;
    });
  case "SET_REEL_SCROLL_POSITION":
    return state.map((reel, index) => {
      if (index === action.index) {
        return Object.assign({}, reel, {
          currentScrollPosition: action.value
        });
      }
      return reel;
    });
  case "SET_REEL_CURRENT_POSITION":
    return state.map((reel, index) => {
      if (index === action.index) {
        return Object.assign({}, reel, {
          currentPosition: action.value
        });
      }
      return reel;
    });
  case "SET_REEL_REMAIN_SECS":
    return state.map((reel, index) => {
      if (index === action.index) {
        return Object.assign({}, reel, {
          remainSecs: action.value
        });
      }
      return reel;
    });
  case "SET_REEL_SECS":
    return state.map((reel, index) => {
      if (index === action.index) {
        return Object.assign({}, reel, {
          secs: action.value
        });
      }
      return reel;
    });
  case "SET_REEL_DATA":
    return state.map((reel, index) => {
      let {scrollPosition, remainSecs, lastPosition, secs, position, spinned} = action;
      if (index === action.index) {
        return Object.assign({}, reel, {
          currentScrollPosition: typeof scrollPosition !== "undefined" ? scrollPosition : reel.currentScrollPosition,
          remainSecs: typeof remainSecs !== "undefined" ? remainSecs : reel.remainSecs,
          lastScrollPosition: typeof lastPosition !== "undefined" ? lastPosition : reel.lastScrollPosition,
          currentPosition: typeof position !== "undefined" ? position : reel.currentPosition,
          secs: typeof secs !== "undefined" ? secs : reel.secs,
          spinned: typeof spinned !== "undefined" ? spinned : reel.spinned
        });
      }
      return reel;
    });
  default:
    return state;
  }
}

function payLines(state = initialState.payLines, action) {
  switch (action.type) {
  case "BLINK_PAYLINE":
    return state.map((payline, index) => {
      if (index === action.index) {
        return Object.assign({}, payline, {
          blink: true
        });
      }
      return payline;
    });
  case "CLEAR_BLINK_PAYLINES":
    return state.map((payline) => {
      if (payline.blink) {
        return Object.assign({}, payline, {
          blink: false
        });
      }
      return payline;
    });
  default:
    return state;
  }
}

function redLines(state = initialState.redLines, action) {
  switch (action.type) {
  case "SHOW_REDLINE":
    return state.map((redline, index) => {
      if (redLinePositions[index] === action.position) {
        return true;
      }
      return redline;
    });
  case "HIDE_REDLINES":
    return state.map((redline, index) => {
      return false;
    });
  default:
    return state;
  }
}

const slotMachine = combineReducers({
  balance,
  reelsData,
  payLines,
  redLines
});

export default slotMachine;
export const Reducers = {
  balance,
  reelsData,
  payLines,
  redLines
};