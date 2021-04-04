const io = require('socket.io')();
const socketapi = {
    io: io
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Add your socket.io logic here!
io.on('connection', async (socket) => {
    console.log("A user connected");

    const ids = Array.from(await io.allSockets());
    // if this client is the first one, emit 'first client'
    if (ids.length==1) {
        io.to(socket.id).emit('setState', 'first client');
    }
    else { // elsewise, get video's state from another random client
        let randomClientId = ids[getRandomInt(0, ids.length-2)];
        io.to(randomClientId).emit('askForState', 'empty');
    }
    socket.on('setState', msg => {
        io.emit('setState', msg);
    });
    socket.on('togglePlay', msg => {
        console.log(msg);
        io.emit('togglePlay', msg);
    });
    socket.on('skipAhead', skipTo => {
        io.emit('skipAhead', skipTo);
    });
});
// end of socket.io logic

module.exports = socketapi;