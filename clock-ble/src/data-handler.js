function dataHandler(clock) {
  clock.on("switchChanged", function(switchData) {
    console.log("from event: ", switchData);
  });
  clock.on("brightnessChanged", function(brightnessData) {
    console.log("from event: ", brightnessData);
  });
  clock.on("colorChanged", function(colorData) {
    console.log("from event: ", colorData);
  });
}

module.exports = dataHandler;
