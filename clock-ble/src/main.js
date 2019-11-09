const Clock = require("./clock");
const clock = new Clock();

clock.on("switchChanged", function(switchData) {
  console.log("from event: ", switchData);
});
const serviceStart = require("./service");
serviceStart(clock);
