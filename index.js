// const WebSocket = require('ws');
// const http = require('http');
// const fs = require("fs");
// const path= require("path");
// const { console } = require('inspector');


// const port = process.env.PORT || 3000;
// // Create HTTP server
// const server = http.createServer((req, res) => {
//   // res.writeHead(200, { 'Content-Type': 'text/plain' });
//   // res.end('WebSocket server running');
//   if(req.method==="GET" && req.url==="/"){
//     fs.readFile("./sockets.html",(err,data)=>{
//       if(err){
//         console.log(err);
//       }
//       res.writeHead(200,{"content-type":"text/html"});
//       res.end(data);
//     })

//   }
//   else{
//     console.log("error");
//   }
// });

// // Create WebSocket server and attach it to the HTTP server
// const wss = new WebSocket.Server({ server });

// // Store clients in an array
// let clients = [];

// wss.on('connection', (ws) => {
//   console.log('A client connected');
  
//   // Add the new client to the list of clients
//   clients.push(ws);

//   // Send a welcome message to the new client
//   ws.send('Welcome to the WebSocket server!');

//   // Handle incoming messages from clients
//   ws.on('message', (message) => {
//     console.log(`Received message: ${message}`);
//     const stringMessage=message.toString();
    
//     // Broadcast the message to all clients except the sender
//     clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(stringMessage); // Send the message to the other client
//       }
//     });
//   });

//   // Handle client disconnection
//   ws.on('close', () => {
//     console.log('A client disconnected');
//     // Remove the client from the list when they disconnect
//     clients = clients.filter(client => client !== ws);
//   });
// });

// // Start the server
// server.listen(3003, () => {
//   console.log(`WebSocket server is listening on localhost:${3000}`);
// });
const WebSocket = require('ws');
const http = require('http');
const fs = require("fs");
const path = require("path");

// Create HTTP server
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    fs.readFile("./sockets.html", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Create WebSocket server and attach it to the HTTP server
const wss = new WebSocket.Server({ server });

// Store clients in an array
let clients = [];

wss.on('connection', (ws) => {
  console.log('A client connected');
  
  // Add the new client to the list of clients
  clients.push(ws);

  // Send a welcome message to the new client
  ws.send('Welcome to the WebSocket server!');

  // Handle incoming messages from clients
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    const stringMessage = message.toString();

    // Broadcast the message to all clients except the sender
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(stringMessage); // Send the message to the other clients
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('A client disconnected');
    // Remove the client from the list when they disconnect
    clients = clients.filter(client => client !== ws);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server is listening on localhost:${PORT}`);
});
