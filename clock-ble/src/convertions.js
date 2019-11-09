//stack overflow <3
function hex2str(hexx) {
  const hex = hexx.toString("hex");
  let str = "";
  for (var i = 0; i < hex.length && hex.substr(i, 2) !== "00"; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

module.exports = { hex2str };
