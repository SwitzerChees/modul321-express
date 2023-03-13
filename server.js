const serverPort = 3000;
const http = require("http");
const express = require("express");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const websocketServer = new WebSocket.Server({ server });

//when a websocket connection is established
websocketServer.on("connection", (webSocketClient) => {
  //send feedback to the incoming connection
  webSocketClient.send('{ "connection" : "ok"}');

  // receive message from client
  webSocketClient.on("message", (messageBuffer) => {
    const message = messageBuffer.toString()
    console.log(message);
  });

  // send periodic message to client
    setInterval(() => {
        const timestamp = new Date().toLocaleTimeString();
        webSocketClient.send(`{ "message" : ${timestamp} }`);
    }, 1000);
});


// normal rest endpoint
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//start the web server
server.listen(serverPort, () => {
  console.log(`Websocket server started on port ` + serverPort);
});
