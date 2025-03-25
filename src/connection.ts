let wsUri = "ws://localhost:46089";
const websocket = new WebSocket(wsUri);
 function send() {
  var msg = {
      test2: "Hello!"
  };
  websocket.send(JSON.stringify(msg));
}
 function init() {
  websocket.onopen = function (ev) { // connection is open
      //console.log("open");
  }

  //#### Message received from server
  websocket.onmessage = function (ev) {
      if (ev.data != "")
      try {
          var msg = JSON.parse(ev.data); //PHP sends Json data
          console.log(msg);
      } catch (error) {
          //console.error(error);
          //console.log(ev.data);
      }
  };

  websocket.onerror = function (ev) {
      //  console.log(ev.data);
  };
};

export {send, init}