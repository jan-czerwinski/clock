const bleno = require("bleno");

const addZeros = s =>{
  s = "000"+s;
  return s.slice(s.length-3);
}

const parseBrightness = data => {
  return {
    day: parseInt(data.slice(0, 3).toString()),
    nightMode: data.slice(3, 4).toString() === "1",
    night: parseInt(data.slice(4, 7).toString()),
    startTime: data.slice(7, 11).toString(),
    endTime: data.slice(11, 15).toString()
  };
};

const compressBrightness = obj => {
  const value = 
      addZeros(obj.day.toString()) +
      (obj.nightMode ? "1" : "0") +
      addZeros(obj.night.toString()) +
      obj.startTime +
      obj.endTime;
  return value;
};

class Brightness extends bleno.Characteristic {
  constructor(Clock) {
    super({
      uuid: "3cefb002-82c1-4929-8021-6d793424227c",
      properties: ["read", "write"]
    });
    this.Clock = Clock;
  }
  onReadRequest(offset, callback) {
    callback(
      this.RESULT_SUCCESS,
      compressBrightness(this.Clock.data.brightness)
    );
  }
  onWriteRequest(data, offset, withoutResponse, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
    } else if (data.length !== 15) {
      callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    } else {
      this.Clock.data.brightness = parseBrightness(data);
      this.Clock.dataChanged();
      callback(this.RESULT_SUCCESS);
    }
  }
}

module.exports = Brightness;
