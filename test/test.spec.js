/*global describe it expect browser $ $$*/

const path = require("path"),
  url = "file:///"+path.normalize(__dirname+"/../dist/index.html");
  
browser.url(url);

describe("Slot machine UI", function() {

  describe("Coins input", function() {

    it("test for illegal values and keys", function() {
      const input = $(".balance-input input");
      input.setValue("10000");
      expect(input.getValue()).equal("5000");
      input.setValue("0");
      expect(input.getValue()).equal("1");
      input.click();
      browser.keys("-1q �7ArrowLeft0");
      expect(input.getValue()).equal("1170");
    });

  });

  describe("Disable and enable elements", function() {
    
    it("click SPIN button", function() {
      $("#mode-fixed").click();
      $("#symbol-reel1").selectByValue("CHERRY");
      $("#position-reel1").selectByValue("top");
      $("#symbol-reel2").selectByValue("7");
      $("#position-reel2").selectByValue("center");
      $("#symbol-reel3").selectByValue("2xBAR");
      $("#position-reel3").selectByValue("bottom");
      $("#start-spin").click();
    });

    it("disabled elements", function() {
      expect($("#start-spin").getAttribute("disabled")).to.not.be.null;
      expect($("#mode-random").getAttribute("disabled")).to.not.be.null;
      expect($("#mode-fixed").getAttribute("disabled")).to.not.be.null;
      expect($("#symbol-reel1").getAttribute("disabled")).to.not.be.null;
      expect($("#position-reel1").getAttribute("disabled")).to.not.be.null;
      expect($("#symbol-reel2").getAttribute("disabled")).to.not.be.null;
      expect($("#position-reel2").getAttribute("disabled")).to.not.be.null;
      expect($("#symbol-reel3").getAttribute("disabled")).to.not.be.null;
      expect($("#position-reel3").getAttribute("disabled")).to.not.be.null;
    });

    it("enabled elements", function() {
      browser.pause(6000);
      expect($("#start-spin").getAttribute("disabled")).to.be.null;
      expect($("#mode-random").getAttribute("disabled")).to.be.null;
      expect($("#mode-fixed").getAttribute("disabled")).to.be.null;
      expect($("#symbol-reel1").getAttribute("disabled")).to.be.null;
      expect($("#position-reel1").getAttribute("disabled")).to.be.null;
      expect($("#symbol-reel2").getAttribute("disabled")).to.be.null;
      expect($("#position-reel2").getAttribute("disabled")).to.be.null;
      expect($("#symbol-reel3").getAttribute("disabled")).to.be.null;
      expect($("#position-reel3").getAttribute("disabled")).to.be.null;
    });

    it("checking reels", function() {
      expect($$("#reel-0 img").reduce((l, v) => l + path.basename(v.getAttribute("src")), "")).to.equal("CHERRY.png3xBAR.pngBAR.png");
      expect($$("#reel-1 img").reduce((l, v) => l + path.basename(v.getAttribute("src")), "")).to.equal("2xBAR.png7.pngCHERRY.png");
      expect($("#reel-1").getAttribute("style")).does.not.have.string("margin-top: 0px");
      expect($$("#reel-2 img").reduce((l, v) => l + path.basename(v.getAttribute("src")), "")).to.equal("BAR.png2xBAR.png7.png");
    });

    it("test redlines", function() {
      $("#mode-fixed").click();
      $("#symbol-reel1").selectByValue("BAR");
      $("#position-reel1").selectByValue("top");
      $("#symbol-reel2").selectByValue("2xBAR");
      $("#position-reel2").selectByValue("top");
      $("#symbol-reel3").selectByValue("3xBAR");
      $("#position-reel3").selectByValue("top");
      $("#start-spin").click();
      browser.pause(6000);
      expect("#redline-0").to.be.visible();
    });

  });

});
