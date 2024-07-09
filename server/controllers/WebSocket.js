const { verify } = require('jsonwebtoken');
const WebSocket = require('ws');
const { WebSocketServer } = require('ws');

function performAuth(req) {
  //perform auth
  const { token } = req.signedCookies;
  if (!token) {
    return false;
  }
  const validClient = verify(token, process.env.CLIENT_SECRET);
  if (!validClient) {
    return false;
  }
  req.user = validClient;
  return true;
}

//when handling the httpserver
function onSocketPreError(e) {
  console.log(e);
}

//when handling the websocket server
function onSocketPostError(e) {
  console.log(e);
}

const startWebSocketServer = (server) => {
  const was = new WebSocketServer({ noServer: true, path: '/ws' });
  const clients = new Map();
  console.log('ws connected');

  server.on('upgrade', (req, socket, head) => {
    socket.on('error', onSocketPreError);

    // if (!performAuth(req)) {
    //   socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    //   socket.destroy();
    //   return;
    // }

    was.handleUpgrade(req, socket, head, (ws) => {
      socket.removeListener('error', onSocketPreError);
      was.emit('connection', ws, req);
    });
  });

  was.on('connection', (ws, req) => {
    ws.on('error', onSocketPostError);
    console.log('client connected');

    ws.on('message', (msg, isBinary) => {
      try {
        const data = JSON.parse(msg);
        was.clients.forEach((client) => {
          //ws !== client && add this if avoiding sending message to the owner
          if (client.readyState === WebSocket.OPEN) {
            client.send(msg, { binary: isBinary });
          }
        });
      } catch (error) {}
    });

    ws.on('close', () => {
      console.log('Connection closed ');
    });
  });
};

module.exports = { startWebSocketServer };
