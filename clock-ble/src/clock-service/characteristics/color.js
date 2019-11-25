const bleno = require("bleno");

const parseColor = data => {
  data = data.readUInt32LE(0);
  const color = {
    r: Math.floor(data / 1000000),
    g: Math.floor((data % 1000000) / 1000),
    b: data % 1000
  };
  return color;
};

const compressColor = color => {
  const buf = Buffer.alloc(4);
  const { r, g, b } = color;
  buf.writeUInt32LE(parseInt(`${r}${g}${b}`));
  return buf;
};

class Color extends bleno.Characteristic {
  constructor(Clock) {
    super({
      uuid: "3cefb003-82c1-4929-8021-6d793424227c",
      properties: ["read", "write"]
    });
    this.Clock = Clock;
  }
  onReadRequest(offset, callback) {
    callback(this.RESULT_SUCCESS, compressColor(this.Clock.data.color));
  }
  onWriteRequest(data, offset, withoutResponse, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
    } else if (data.length !== 4) {
      callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    } else {
      this.Clock.data.color = parseColor(data);
      this.Clock.dataChanged();
      callback(this.RESULT_SUCCESS);
    }
  }
}

module.exports = Color;
