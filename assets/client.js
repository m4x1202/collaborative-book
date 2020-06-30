
console.log("Hello!");

function autoResizeElement(target_element)
{
    target_element.style.height = 'auto';
    target_element.style.height = target_element.scrollHeight+'px';
}

function onReceiveMessageFromServer(message_event)
{
    var json_string = message_event.data;

    var received_object = JSON.parse(json_string);

    // TODO chane UI

    var output_text_area = document.getElementById("output_text_area");
    if(received_object.type === "text")
    {
        output_text_area.value = received_object.text;
    }

    if(received_object.type === "registration")
    {
        output_text_area.value = "Start typing a story!";
    }
    autoResizeElement(output_text_area);
}

function sendToServer(websocket, json_object)
{
    websocket.send(JSON.stringify(json_object));
}

function onConnectionEstablished()
{
    // Register with the server
    var registration = { type : "registration", name : "Mobbel", room : "Doppelhaus" };
    sendToServer(websocket, registration);

    // TODO change UI
}

function openConnectionToServer()
{
    var host = "ws://" + window.location.hostname + ":8080/ws";
    console.log(host);
    
    var websocket = new WebSocket(host);
    websocket.onmessage = onReceiveMessageFromServer;
    websocket.onopen = onConnectionEstablished;
    return websocket;
}

var websocket = openConnectionToServer();

function submitText()
{
    var text = document.getElementById("input_text_area").value;

    var message = { type : "text", name : "Mobbel", room : "Doppelhaus", text : text };
    sendToServer(websocket, message);
}



// Handle auto resizing of text areas
// https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
// http://jsfiddle.net/CbqFv/

var observe;
if (window.attachEvent) {
    observe = function (element, event, handler) {
        element.attachEvent('on'+event, handler);
    };
}
else {
    observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}
function initTextAreaObserver (element_id) {
    var text = document.getElementById(element_id);
    function resize () {
        autoResizeElement(text);
    }
    /* 0-timeout to get the already changed text */
    function delayedResize () {
        window.setTimeout(resize, 0);
    }
    observe(text, 'change',  resize);
    observe(text, 'cut',     delayedResize);
    observe(text, 'paste',   delayedResize);
    observe(text, 'drop',    delayedResize);
    observe(text, 'keydown', delayedResize);

    text.focus();
    text.select();
    resize();
}

initTextAreaObserver("output_text_area");
initTextAreaObserver("input_text_area");