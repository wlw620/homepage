const ws = require("nodejs-websocket");

const server = ws.createServer(function (conn) {

  console.log("New connection");

  conn.on("text", str => {
    console.log("Received " + str);
    conn.sendText(str);
    setInterval(() => {
      conn.sendText(new Date().getSeconds() + str);
    }, 3000)
  });

  conn.on("close", function (code, reason) {
    console.log("Connection closed")
  });

}).listen(7001);
