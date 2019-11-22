const axios = require("axios");

const url = "http://127.0.0.1:5000/";

function dataClient(Clock) {
  Clock.on("clockChanged", clock => {
    axios.post(url + "clock", clock).then(
      response => console.log("to python: ", response.status, response.data),
      error => {
        console.log("TO PYTHON ERROR:");
        console.error(error);
      }
    );
  });

  Clock.on("timeChanged", time => {
    axios.post(url + "time", time).then(
      response => console.log("to python: ", response.status, response.data),
      error => {
        console.log("TO PYTHON ERROR:");
        console.error(error);
      }
    );
  });
}

module.exports = dataClient;
