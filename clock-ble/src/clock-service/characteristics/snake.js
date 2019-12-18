const bleno = require("bleno");

class Snake extends bleno.Characteristic {
  constructor(Clock) {
    super({
      uuid: "3cefb005-82c1-4929-8021-6d793424227c",
      properties: ["write"]
    });
    this.Clock = Clock;
  }
  onWriteRequest(data, offset, withoutResponse, callback) {
    if (offset) {
        callback(this.RESULT_ATTR_NOT_LONG);
    } else if (data.length !== 1) {
        callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    } else {
        this.Clock.snakeChanged({snake: data.readUInt8()});
        callback(this.RESULT_SUCCESS);
    }
  }
}

module.exports = Snake;
