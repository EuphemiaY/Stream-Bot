const protobuf = require('protobufjs');
const WebSocket = require('ws');
var fs = require('fs');

const Server = require('./ServerPort.json');
// importing the port since on a VPN I have no control over what port it's on
ServerPort = Server["port"];


async function main() {
  const root = await protobuf.load('./V1.proto');
  const Base = root.lookupType('Pokelink.Core.Proto.V1.Base');
  const PartyMessage = root.lookupType('Pokelink.Core.Proto.V1.PartyMessage');

  const ws = new WebSocket('ws://127.0.0.1:'+ServerPort+'/?user=Euph');

  ws.on('open', () => {
    ws.send(JSON.stringify({
      handshake: { version: 2, client: "WebSource", dataType: "Protobuf", gzip: false }
    }));
  });

  ws.on('message', (data) => {
    if (typeof data === 'string') {
      console.log('Handshake response:', data);
      return;
    }

    const { channel } = Base.decode(data);
    console.log('Channel:', channel);

    if (channel === 'client:party:updated') {
      const decoded = PartyMessage.decode(data);
      console.log(JSON.stringify(PartyMessage.toObject(decoded), null, 2));
      jsonData = JSON.stringify(PartyMessage.toObject(decoded));
      // Writing party data to a text file
      fs.writeFile("EuphParty.json", jsonData, function(err) {
        if (err) {
            console.log(err);
        }
});
    } else {
      console.log('No matching schema yet for this channel — length:', data.length);
    }
  });
}

main();