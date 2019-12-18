const bleno = require("bleno");
const clockUuid = "3cefb000-82c1-4929-8021-6d793424227c";

const SwitchCharacteristic = require("./characteristics/switch");
const BrightnessCharacteristic = require("./characteristics/brightness");
const ColorCharacteristic = require("./characteristics/color");
const TimeCharacteristic = require("./characteristics/time");
const SnakeCharacteristic = require("./characteristics/snake");


class ClockService extends bleno.PrimaryService {
  constructor(clock) {
    super({
      uuid: clockUuid,
      characteristics: [
        new SwitchCharacteristic(clock),
        new BrightnessCharacteristic(clock),
        new ColorCharacteristic(clock),
        new TimeCharacteristic(clock),
        new SnakeCharacteristic(clock)
      ]
    });
  }
}

module.exports = ClockService;
