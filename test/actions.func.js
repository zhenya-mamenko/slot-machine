/*global describe it expect*/

import * as Actions from "../src/actions";

describe("Actions", function () {

  describe("RedLine", function () {

    it("showRedLine()", function() {
      expect(Actions.showRedLine("top")).to.deep.equal({
        type: "SHOW_REDLINE",
        position: "top"
      });
    });
    
    it("hideRedLines()", function() {
      expect(Actions.hideRedLines()).to.deep.equal({
        type: "HIDE_REDLINES"
      });
    });

  });

  describe("PayLine", function () {
    
    it("blinkPayLine()", function() {
      expect(Actions.blinkPayLine(0)).to.deep.equal({
        type: "BLINK_PAYLINE",
        index: 0
      });
    });
    
    it("clearBlinkPayLines()", function() {
      expect(Actions.clearBlinkPayLines()).to.deep.equal({
        type: "CLEAR_BLINK_PAYLINES"
      });
    });

  });

  describe("Balance", function () {
    
    it("updateBalance()", function() {
      expect(Actions.updateBalance(-1)).to.deep.equal({
        type: "UPDATE_BALANCE",
        value: -1
      });
    });
    
    it("setBalance()", function() {
      expect(Actions.setBalance(100)).to.deep.equal({
        type: "SET_BALANCE",
        value: 100
      });
    });

  });

  describe("Reel", function () {
    
    it("setReelSpinned()", function() {
      expect(Actions.setReelSpinned(0, 10)).to.deep.equal({
        type: "SET_REEL_SPINNED",
        index: 0,
        value: 10
      });
    });

    it("setReelLastPosition()", function() {
      expect(Actions.setReelLastPosition(1, 2.5)).to.deep.equal({
        type: "SET_REEL_LAST_POSITION",
        index: 1,
        value: 2.5
      });
    });
    
    it("setReelScrollPosition()", function() {
      expect(Actions.setReelScrollPosition(2, 150)).to.deep.equal({
        type: "SET_REEL_SCROLL_POSITION",
        index: 2,
        value: 150
      });
    });
    
    it("setReelCurrentPosition()", function() {
      expect(Actions.setReelCurrentPosition(0, 1)).to.deep.equal({
        type: "SET_REEL_CURRENT_POSITION",
        index: 0,
        value: 1
      });
    });
    
    it("setReelRemainSecs()", function() {
      expect(Actions.setReelRemainSecs(1, 2.5)).to.deep.equal({
        type: "SET_REEL_REMAIN_SECS",
        index: 1,
        value: 2.5
      });
    });
    
    it("setReelSecs()", function() {
      expect(Actions.setReelSecs(2, 0.5)).to.deep.equal({
        type: "SET_REEL_SECS",
        index: 2,
        value: 0.5
      });
    });
    
    it("setReelData()", function() {
      expect(Actions.setReelData(1, 340, 3.4, 0.5, 3.5, 3, true)).to.deep.equal({
        type: "SET_REEL_DATA",
        index: 1,
        scrollPosition: 340,
        remainSecs: 3.4,
        lastPosition: 0.5,
        secs: 3.5,
        position: 3.0,
        spinned: true
      });
    });

  });

});