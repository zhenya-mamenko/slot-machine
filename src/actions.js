export function showRedLine(position) {
  return {
    type: "SHOW_REDLINE",
    position
  };
}

export function hideRedLines() {
  return {
    type: "HIDE_REDLINES"
  };
}

export function blinkPayLine(index) {
  return {
    type: "BLINK_PAYLINE",
    index
  };
}

export function clearBlinkPayLines() {
  return {
    type: "CLEAR_BLINK_PAYLINES"
  };
}

export function updateBalance(value) {
  return {
    type: "UPDATE_BALANCE",
    value
  };
}

export function setBalance(value) {
  return {
    type: "SET_BALANCE",
    value
  };
}

export function setReelSpinned(index, value) {
  return {
    type: "SET_REEL_SPINNED",
    index,
    value
  };
}

export function setReelLastPosition(index, value) {
  return {
    type: "SET_REEL_LAST_POSITION",
    index,
    value
  };
}

export function setReelScrollPosition(index, value) {
  return {
    type: "SET_REEL_SCROLL_POSITION",
    index,
    value
  };
}

export function setReelRemainSecs(index, value) {
  return {
    type: "SET_REEL_REMAIN_SECS",
    index,
    value
  };
}

export function setReelSecs(index, value) {
  return {
    type: "SET_REEL_SECS",
    index,
    value
  };
}

export function setReelCurrentPosition(index, value) {
  return {
    type: "SET_REEL_CURRENT_POSITION",
    index,
    value
  };
}

export function setReelData(index, scrollPosition, remainSecs, lastPosition, secs, position, spinned) {
  return {
    type: "SET_REEL_DATA",
    index,
    scrollPosition,
    remainSecs,
    lastPosition,
    secs,
    position,
    spinned
  };
}
