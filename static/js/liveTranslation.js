var socket = io();
scrollToBottom(true);
function scrollToBottom(isStart) {
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var prevMessageHeight = newMessage.prev().innerHeight();
    
    if (isStart || (clientHeight + scrollTop + newMessageHeight + prevMessageHeight >= scrollHeight)) {
        messages.scrollTop(scrollHeight);
    }

}

socket.on('connect', function() {
    console.log('Connected to server!');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server!');
});

socket.on('newMessage', function(message) {
    // console.log('newMessage: ', message);
    $('#messages').append('<li class="message left appeared">' +
                                '<div class="avatar">' +
                                    '<img src="/images/' + message.userId.image  + '" width="60" alt="">' +
                                '</div>' + 
                                '<div class="text_wrapper">' +
                                    '<div class="text">' + message.text + '</div>' +
                                '</div>' +
                            '</li>');
    $.playSound("http://localhost:3000/audio/zvuk-soobshcheniya-v-kontakte.mp3");
    scrollToBottom();
});
$('div .text').click(function(event) {
    var text = $('input[name=messageText]');
    socket.emit('createMessage', { userId: '5a0430f6cd214d0fd489e86a', text: text.val() });
    text.val('');
    scrollToBottom();
});
