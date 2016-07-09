const net = require('net');
const client = new net.Socket();

client.connect({port: 8080}, (() => {
  console.log('connected to server');
  process.stdin.on('data', ( data ) => {
    client.write(data);
  });
}));


client.on('data', (data)=>{
  process.stdout.write(data);
});



























