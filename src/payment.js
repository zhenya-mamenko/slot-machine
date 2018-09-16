function result(coins, line) { return {coins, line, pay: true}; }

function check(where, reels) { return reels.reduce((a, v) => a && (where.indexOf(v) != -1), true); }

function payment (reels, position) {
  let noop = {coins: 0, line: -1, pay: false};
  switch (position) {

  case "top":
    // 3 CHERRY symbols on top line 2000
    if (reels.join("|") == "4|4|4") return result(2000, 0);
    
    // 3 7 symbols on any line 150
    if (reels.join("|") == "3|3|3") return result(150, 3);

    // Any combination of CHERRY and 7 on any line 75
    if (check([3, 4], reels)) return result(75, 4);
    
    // 3 3xBAR symbols on any line 50
    if (reels.join("|") == "0|0|0") return result(50, 5);

    // 3 2xBAR symbols on any line 20
    if (reels.join("|") == "2|2|2") return result(20, 6);

    // 3 BAR symbols on any line 10
    if (reels.join("|") == "1|1|1") return result(10, 7);

    // Combination of any BAR symbols on any line 5
    if (check([0, 1, 2], reels)) return result(5, 8);

    return noop;

  case "center":
    // 3 CHERRY symbols on center line 1000
    if (reels.join("|") == "3.5|3.5|3.5") return result(1000, 1);
  
    // 3 7 symbols on any line 150
    if (reels.join("|") == "2.5|2.5|2.5") return result(150, 3);

    // Any combination of CHERRY and 7 on any line 75
    if (check([2.5, 3.5], reels)) return result(75, 4);

    // 3 3xBAR symbols on any line 50
    if (reels.join("|") == "4.5|4.5|4.5") return result(50, 5);

    // 3 2xBAR symbols on any line 20
    if (reels.join("|") == "1.5|1.5|1.5") return result(20, 6);

    // 3 BAR symbols on any line 10
    if (reels.join("|") == "0.5|0.5|0.5") return result(10, 7);

    // Combination of any BAR symbols on any line 5
    if (check([0.5, 1.5, 4.5], reels)) return result(5, 8);

    return noop;

  case "bottom":
    // 3 CHERRY symbols on bottom line 4000
    if (reels.join("|") == "3|3|3") return result(4000, 2);
    
    // 3 7 symbols on any line 150
    if (reels.join("|") == "2|2|2") return result(150, 3);

    // Any combination of CHERRY and 7 on any line 75
    if (check([2, 3], reels)) return result(75, 4);

    // 3 3xBAR symbols on any line 50
    if (reels.join("|") == "4|4|4") return result(50, 5);

    // 3 2xBAR symbols on any line 20
    if (reels.join("|") == "1|1|1") return result(20, 6);

    // 3 BAR symbols on any line 10
    if (reels.join("|") == "0|0|0") return result(10, 7);

    // Combination of any BAR symbols on any line 5
    if (check([1, 4, 0], reels)) return result(5, 8);

    return noop;

  default:
    return noop;
  }
}

export default payment;

