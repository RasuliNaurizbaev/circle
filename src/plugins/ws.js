
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let messages = []; 

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.send(JSON.stringify(messages));

  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    messages.push(parsedMessage);

    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify([parsedMessage]));
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://172.16.2.17:8080/");