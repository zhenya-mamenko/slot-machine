/*global describe it expect*/

import payment from "../src/payment";

describe("Payment", function () {

  describe("Top line", function () {

    it("3 CHERRY symbols", function() {
      expect(payment([4, 4, 4], "top")).to.deep.equal({
        coins: 2000,
        line: 0,
        pay: true
      });
    });
    
    it("Any combination of CHERRY and 7", function() {
      expect(payment([3, 4, 3], "top")).to.deep.equal({
        coins: 75,
        line: 4,
        pay: true
      });
    });
    
    it("3 2xBAR symbols", function() {
      expect(payment([2, 2, 2], "top")).to.deep.equal({
        coins: 20,
        line: 6,
        pay: true
      });
    });
    
    it("Combination of any BAR symbols", function() {
      expect(payment([0, 2, 1], "top")).to.deep.equal({
        coins: 5,
        line: 8,
        pay: true
      });
    });
    
  });

  describe("Center line", function () {

    it("3 7 symbols", function() {
      expect(payment([2.5, 2.5, 2.5], "center")).to.deep.equal({
        coins: 150,
        line: 3,
        pay: true
      });
    });
    
    it("Combination of any BAR symbols", function() {
      expect(payment([0.5, 4.5, 1.5], "center")).to.deep.equal({
        coins: 5,
        line: 8,
        pay: true
      });
    });
    
  });

  describe("Bottom line", function () {

    it("3 BAR symbols", function() {
      expect(payment([0, 0, 0], "bottom")).to.deep.equal({
        coins: 10,
        line: 7,
        pay: true
      });
    });
    
    it("Combination of any BAR symbols", function() {
      expect(payment([1, 1, 0], "bottom")).to.deep.equal({
        coins: 5,
        line: 8,
        pay: true
      });
    });
    
  });

});