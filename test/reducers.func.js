/*global describe it expect*/

import {Reducers} from "../src/reducers";
import { redLinePositions, payStrings } from "../src/consts";

describe("Reducers", function () {

  describe("balance", function () {

    it("UPDATE_BALANCE", function() {
      expect(Reducers.balance(100, {
        type: "UPDATE_BALANCE", 
        value: -1
      })).to.equal(99);
    });

    it("SET_BALANCE", function() {
      expect(Reducers.balance(100, {
        type: "SET_BALANCE", 
        value: 1000
      })).to.equal(1000);
    });

    it("default", function() {
      expect(Reducers.balance(100, {
        type: "SHOW_BALANCE", 
        value: 1000
      })).to.equal(100);
    });

  });

  describe("payLines", function () {
    
    const payLines = payStrings.map((s) => {return {text: s, blink: false}; });

    it("BLINK_PAYLINE", function() {
      expect(Reducers.payLines(payLines, {
        type: "BLINK_PAYLINE", 
        index: 0
      })).to.be.an("array").that.deep.include.members([{text: payLines[0].text, blink: true}]);
    });

    payLines[0].blink = true;

    it("CLEAR_BLINK_PAYLINES", function() {
      expect(Reducers.payLines(payLines, {
        type: "CLEAR_BLINK_PAYLINES" 
      })).to.be.an("array").that.not.deep.include({blink: true});
    });

    it("default", function() {
      expect(Reducers.payLines(payLines, {
        type: "PAYLINES", 
        index: 0
      })).to.be.an("array").that.deep.equal(payLines);
    });

  });

  describe("redLines", function () {
    
    it("SHOW_REDLINE", function() {
      expect(Reducers.redLines([false, false, false], {
        type: "SHOW_REDLINE", 
        position: redLinePositions[0]
      })).to.be.an("array").that.deep.equal([true, false, false]);
    });

    it("HIDE_REDLINES", function() {
      expect(Reducers.redLines([true, false, true], {
        type: "HIDE_REDLINES" 
      })).to.be.an("array").that.deep.equal([false, false, false]);
    });

    it("default", function() {
      expect(Reducers.redLines([false, true, false], {
        type: "REDLINES", 
        index: 0
      })).to.be.an("array").that.deep.equal([false, true, false]);
    });

  });

  describe("reelsData", function () {
    
    let reelsData = [
      {lastScrollPosition: 0, currentScrollPosition: 0, remainSecs: 0.0, currentPosition: 0.0, secs: 0.0, spinned: false}, 
      {lastScrollPosition: 0, currentScrollPosition: 0, remainSecs: 0.0, currentPosition: 0.0, secs: 0.0, spinned: false}, 
      {lastScrollPosition: 0, currentScrollPosition: 0, remainSecs: 0.0, currentPosition: 0.0, secs: 0.0, spinned: false}
    ];


    it("SET_REEL_SPINNED", function() {
      expect(Reducers.reelsData(reelsData, {
        type: "SET_REEL_SPINNED", 
        index: 0,
        value: true
      })).to.be.an("array").that.satisfy(function(data) {
        return data[0].spinned == true;
      });
    });

    it("SET_REEL_LAST_POSITION", function() {
      expect(Reducers.reelsData(reelsData, {
        type: "SET_REEL_LAST_POSITION", 
        index: 0,
        value: 100
      })).to.be.an("array").that.satisfy(function(data) {
        return data[0].lastScrollPosition == 100;
      });
    });

    it("SET_REEL_SCROLL_POSITION", function() {
      expect(Reducers.reelsData(reelsData, {
        type: "SET_REEL_SCROLL_POSITION", 
        index: 0,
        value: 200
      })).to.be.an("array").that.satisfy(function(data) {
        return data[0].currentScrollPosition == 200;
      });
    });

    it("SET_REEL_CURRENT_POSITION", function() {
      expect(Reducers.reelsData(reelsData, {
        type: "SET_REEL_CURRENT_POSITION", 
        index: 0,
        value: 1.5
      })).to.be.an("array").that.satisfy(function(data) {
        return data[0].currentPosition == 1.5;
      });
    });

    it("SET_REEL_REMAIN_SECS", function() {
      expect(Reducers.reelsData(reelsData, {
        type: "SET_REEL_REMAIN_SECS", 
        index: 0,
        value: 2.4
      })).to.be.an("array").that.satisfy(function(data) {
        return data[0].remainSecs == 2.4;
      });
    });

    it("SET_REEL_SECS", function() {
      expect(Reducers.reelsData(reelsData, {
        type: "SET_REEL_SECS", 
        index: 0,
        value: 3.5
      })).to.be.an("array").that.satisfy(function(data) {
        return data[0].secs == 3.5;
      });
    });

    describe("SET_REEL_DATA", function () {
    
      it("set all data", function() {
        expect(Reducers.reelsData(reelsData, {
          type: "SET_REEL_DATA", 
          index: 2,
          scrollPosition: 250,
          remainSecs: 1.8,
          lastPosition: 360,
          secs: 5.1,
          position: 2.0,
          spinned: true
        })).to.be.an("array").that.satisfy(function(data) {
          return expect(data[2]).deep.equal({
            currentScrollPosition: 250,
            remainSecs: 1.8,
            lastScrollPosition: 360,
            currentPosition: 2.0,
            secs: 5.1,
            spinned: true
          });
        });
      });

      reelsData[2] = {
        currentScrollPosition: 250,
        remainSecs: 1.8,
        lastScrollPosition: 360,
        currentPosition: 2.0,
        secs: 5.1,
        spinned: true
      };

      it("set some data", function() {
        expect(Reducers.reelsData(reelsData, {
          type: "SET_REEL_DATA", 
          index: 2,
          scrollPosition: 350,
          remainSecs: 1.5,
          lastPosition: 5000
        })).to.be.an("array").that.satisfy(function(data) {
          return expect(data[2]).deep.equal({
            currentScrollPosition: 350,
            remainSecs: 1.5,
            lastScrollPosition: 5000,
            currentPosition: 2.0,
            secs: 5.1,
            spinned: true
          });
        });
      });

      it("set zero values", function() {
        expect(Reducers.reelsData(reelsData, {
          type: "SET_REEL_DATA", 
          index: 2,
          scrollPosition: 0,
          remainSecs: 0,
          lastPosition: 0,
          secs: 0,
          position: 0,
          spinned: false
        })).to.be.an("array").that.satisfy(function(data) {
          return expect(data[2]).deep.equal({
            currentScrollPosition: 0,
            remainSecs: 0,
            lastScrollPosition: 0,
            currentPosition: 0,
            secs: 0,
            spinned: false
          });
        });
      });

    });

  });

});