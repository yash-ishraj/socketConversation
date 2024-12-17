const WebSocket = require('ws');
const http = require('http');

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server running');
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
    const stringMessage=message.toString();
    
    // Broadcast the message to all clients except the sender
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(stringMessage); // Send the message to the other client
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
server.listen(3000, () => {
  console.log('WebSocket server is listening on ws://192.168.207.234:3000');
});
