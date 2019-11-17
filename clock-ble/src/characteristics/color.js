const bleno = require("bleno");

class Color extends bleno.Characteristic {
  constructor() {
    super({
      uuid: "0003",
      properties: ["read", "write"],
      value: null
    });
  }
}
