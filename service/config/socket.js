const { Server } = require('socket.io');
// const { chat_room_service, messages_service } = require('../../Server/services');

module.exports = async (server) => {
    const io = new Server(server,{
        cors: {
            origin: "http://localhost:3000",
        }
    })

    io.on("connection", (socket) => {
        console.log('Socket.io is connected socketId: ', socket.id);
        socket.on("disconnect", () => {
            console.log('Socket.io is disconnected socketId: ', socket.id);
        });
        socket.on("join", (roomId) => {
            socket.emit("run",{})
            console.log('roomId: ', roomId);
            socket.join(roomId);
        });
       
    }); 
}

