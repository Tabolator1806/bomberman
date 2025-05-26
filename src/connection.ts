
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
        // let utterance = new SpeechSynthesisUtterance("Hello world!");
        // speechSynthesis.speak(utterance);
        let syntesis = window.speechSynthesis
        let voices = syntesis.getVoices()
        console.log(voices)

    }

    //#### Message received from server
    websocket.onmessage = function (ev) {
        if (ev.data != "")
            try { //PHP sends Json data
                console.log(JSON.parse(ev.data))
            } catch (error) {
                //console.error(error);
                //console.log(ev.data);
            }
    };

    websocket.onerror = function (ev) {
        //  console.log(ev.data);
    };
    websocket.onclose = (ev) => {
        alert("Serwer nieodpowiada")
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }
};

function receive() {
    websocket.onmessage = function (ev) {
        if (ev.data != "")
            try {
                var msg = JSON.parse(ev.data); //PHP sends Json data
                return msg
            } catch (error) {
                //console.error(error);
                //console.log(ev.data);
            }
    };
}

export { send, init, receive, websocket }