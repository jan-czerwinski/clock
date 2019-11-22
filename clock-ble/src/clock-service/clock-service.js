const bleno = require("bleno");
const clockUuid = "3cefb000-82c1-4929-8021-6d793424227c";

const SwitchCharacteristic = require("./characteristics/switch");
const BrightnessCharacteristic = require("./characteristics/brightness");
const ColorCharacteristic = require("./characteristics/color");

class ClockService extends bleno.PrimaryService {
  constructor(clock) {
    super({
      uuid: clockUuid,
      characteristics: [
        new SwitchCharacteristic(clock),
        new BrightnessCharacteristic(clock),
        new ColorCharacteristic(clock)
      ]
    });
  }
}

module.exports = ClockService;
