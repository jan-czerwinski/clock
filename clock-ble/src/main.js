const Clock = require("./clock");
const clock = new Clock();

const dataClient = require("./data-client");
dataClient(clock);

const peripheralStart = require("./peripheral-start");
peripheralStart(clock);
