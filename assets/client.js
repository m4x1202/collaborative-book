

var login_button = document.getElementById("login_button"); 
var login_name_area = document.getElementById("login_name_area"); 
var login_room_area = document.getElementById("login_room_area"); 
var output_text_area = document.getElementById("output_text_area");
var input_text_area = document.getElementById("input_text_area");
var submit_story_view = document.getElementById("submit_story_view");
var login_view = document.getElementById("login_view");
var submit_story_button = document.getElementById("submit_story_button");
var round_display_text = document.getElementById("round_display_text");

disableLoginButton();
var websocket = openConnectionToServer();
showLoginView();

///
/// Handling showing and hiding views.
///

function hideAllViews()
{
    submit_story_view.style.display = "none";
    login_view.style.display = "none";
}

function showLoginView()
{
    hideAllViews();
    login_view.style.display = "";
}

function showSubmitStoryView()
{
    hideAllViews();
    submit_story_view.style.display = "";
    autoResizeElement(input_text_area);
    autoResizeElement(output_text_area);
    enableSubmitStoryButton();
}

///
/// Websocket connection handling and message sending / receiving.
/// 

function onReceiveMessageFromServer(message_event)
{
    var json_string = message_event.data;

    var received_object = JSON.parse(json_string);

    if(received_object.type === "submit_story")
    {
        output_text_area.value = received_object.payload;
        showSubmitStoryView();
    }

    if(received_object.type === "user_update")
    {
        output_text_area.value = received_object.user_list;
        showSubmitStoryView();
    }

    if(received_object.type === "registration" && received_object.result === "success")
    {
        output_text_area.value = "Start typing a story!";
        showSubmitStoryView();
    }
    autoResizeElement(output_text_area);
}

function sendToServer(websocket, json_object)
{
    websocket.send(JSON.stringify(json_object));
}

function onConnectionEstablished()
{
    enableLoginButton();
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


/// 
/// Button related functions. 
///

function submitText()
{
    var text = input_text_area.value;

    var message = { type : "submit_story", name : login_name_area.value, room : login_room_area.value, payload : text };
    sendToServer(websocket, message);

    input_text_area.value = "";
    disableSubmitStoryButton();
}

function enterRoom()
{
    // Register with the server
    var registration = { type : "registration", name : login_name_area.value, room : login_room_area.value, payload : "" };
    sendToServer(websocket, registration);

    // Disable login button so we don't send it again
    disableLoginButton();
}

function enableLoginButton()
{
    login_button.disabled = false;
}

function disableLoginButton()
{
    login_button.disabled = true;
}

function enableSubmitStoryButton()
{
    submit_story_button.disabled = false;
}

function disableSubmitStoryButton()
{
    submit_story_button.disabled = true;
}

///
/// Handle auto resizing of text areas
/// https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
/// http://jsfiddle.net/CbqFv/
///

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

function autoResizeElement(target_element)
{
    target_element.style.height = 'auto';
    target_element.style.height = target_element.scrollHeight+'px';
}

function initTextAreaObserver (textarea) {
    function resize () {
        autoResizeElement(textarea);
    }
    // 0-timeout to get the already changed text
    function delayedResize () {
        window.setTimeout(resize, 0);
    }
    observe(textarea, 'change',  resize);
    observe(textarea, 'cut',     delayedResize);
    observe(textarea, 'paste',   delayedResize);
    observe(textarea, 'drop',    delayedResize);
    observe(textarea, 'keydown', delayedResize);

    textarea.focus();
    textarea.select();
    resize();
}

initTextAreaObserver(output_text_area);
initTextAreaObserver(input_text_area);