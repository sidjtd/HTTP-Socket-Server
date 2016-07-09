
/* ▂▃▅▇█▓▒░۩۞۩     ♚  ♛  ♜  ♝  ♞  ♟      ★★     ♔   ♕  ♖  ♗  ♘  ♙     ۩۞۩░▒▓█▇▅▃▂
   ------------------------------------------------------------------------------
   |                        Creating HTTP Socket Server
   ______________________________________________________________________________
   ------------------------------------------------------------------------------  */
'use strict';
const fs = require('fs');          // I want  fs  modules :)
const net = require('net');         //I want net  modules :)
const http = require('http');     //  I want http modules :)
const server = net.createServer((socket)=>{
    // ^ "I make new server w/ the net cmd... w/ parameter socket... where data comes in!

  //socket.write('The Server\r\n');
    // ^ This writes into socket/aka incoming connexion

  socket.on('data', ( socketdata ) => {
    socketdata.toString().replace(/(\r\n|\n|\r)/gm,"");
    var strData = socketdata.toString();
    var parsedData = headParse(strData);
      if(parsedData.length===0){
        parsedData = 'index.html';
      }if(parsedData==='favicon.ico'){
        parsedData = 'index.html';
    }
  /*Reads File*/
    var read = fs.readFile(`./${parsedData}`, (err, data) => {
      if(err) throw err;
      data = data.toString();
      var header = "HTTP/1.1 200 OK \r\n\r\n";
      header += data;
      //socket.write('The Server\r\n');
      console.log(header);
      socket.write(header);

    }); //v read})
  }); //sock.on }}
}); // v server }}

server.listen('8080', () => {
  console.log("Server Listening on port:8080");
});

//_______________________________________________________________________________
var arr = [];

function headParse (dat) {
  arr = [];
  dat = dat.toString();
    // var getter = dat.search("GET");

    // Removes 1st part of HTTP Request ivo GET
  var lbr = dat.search('/r/n');
  var sliced = dat.slice(5, lbr);

    // Removes 2nd part of HTTP Request after URL
  var blank = sliced.search(' ');
  sliced = sliced.slice(0, sliced.search(' '));
  arr.push(sliced);
  return sliced;
}//func

/*______________________________________________________________________________
------------------------------------------------------------------------------*/
module.exports = headParse;



