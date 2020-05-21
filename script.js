const inputBox = document.getElementById('messageInput');
const messages = document.getElementById('messages');

var forceStrings = ['Wow! This is amazing, Ben!', 'You are so great at coding!', 'You know what? You\'re hired!', 'I\'m going to contact you about that right now!'];
var responseStrings = ['Thank you!', 'I appreciate it!!', 'Wow, when do I start??', 'Awesome, looking forward to it!'];

var forceIndex = 0;

var currentForceString = 0;

inputBox.addEventListener('keypress', forceText);

inputBox.addEventListener('keydown', function(e) {
    inputBox.setSelectionRange(inputBox.value.length, inputBox.value.length);
    if (event.which == 8) {
        event.preventDefault();
    };
});

inputBox.addEventListener('click', function(e) {
    e.preventDefault();
    inputBox.setSelectionRange(inputBox.value.length, inputBox.value.length);
});

function forceText(e) {
    e.preventDefault();
    if (currentForceString < forceStrings.length) {
        if (forceIndex < forceStrings[currentForceString].length) {
            var currentCharacter = forceStrings[currentForceString][forceIndex];
            var start = e.target.selectionStart;
            var end = e.target.selectionEnd;
            e.target.value = e.target.value.substring(0, start) + currentCharacter + e.target.value.substring(end);
            e.target.setSelectionRange(start + 1, start + 1);

            forceIndex++;
        } else {
            sendMessage(inputBox.value);
            addNextResponse();
            currentForceString++;
            forceIndex = 0;
            inputBox.value = '';
        }
        if (e.keyCode == 8) {
            return false;
        };
    }
}

function sendMessage(message) {
    var wrapper = document.createElement('div');
    wrapper.className = 'messages-right';

    var node = document.createElement('div');
    node.className = 'msg msg-right';
    node.textContent = message;

    wrapper.appendChild(node);

    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
}

function addNextResponse() {
    sleep(750).then(() => {
        var wrapper = document.createElement('div');
        wrapper.className = 'messages-left';

        var node = document.createElement('div');
        node.className = 'msg msg-left';
        node.textContent = responseStrings[currentForceString - 1];

        wrapper.appendChild(node);

        messages.appendChild(wrapper);
        messages.scrollTop = messages.scrollHeight;
    })
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function onkeyup(e) {
    var code;
    if (!e) var e = window.event; // some browsers don't pass e, so get it from the window
    if (e.keyCode) code = e.keyCode; // some browsers use e.keyCode
    else if (e.which) code = e.which; // others use e.which

    if (code == 8 || code == 46)
        return false;
}