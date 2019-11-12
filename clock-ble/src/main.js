const Clock = require("./clock");
const clock = new Clock();

const dataHandler = require("./data-handler");
dataHandler(clock);

const serviceStart = require("./service");
serviceStart(clock);
