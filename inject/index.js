const ks = require("node-key-sender");
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  this.samplingInterval(10000);
  let state = false;
  var proximity = new five.Proximity({
    controller: "HCSR04",
    pin: 9,
    freq: 1
  });

  proximity.on("change", function() {
    if (this.cm > 10) {
      if (!state) {
        ks.setOption("globalDelayPressMillisec", 1000);
        ks.sendCombination(["@157", "@17", "@81"]);
        console.log('shhh')
        state = true;
      }
    } else {
      console.log(`[📶] Working sensor - ${this.cm} cm`);
    }
  });

  setInterval(() => { 
      state = false; 
  }, 10000)

});

