module.exports = function connectSocket({httpServer, Server, publisher, port}){
    const io = new Server(httpServer, {
        cors:{
            origin:['http://localhost:3000'],
            methods:['GET', 'POST'],
            credentials: true
        }
    })
    io.on('connection', socket => {  
        socket.on('buttonClicked', msg => {
            const data = {
                message:msg,
                server: port
            }

            publisher.publish('channel', JSON.stringify(data))
            
            socket.emit('message', `Message: ${data.message} reported from server ${data.server} (not pubsubed)`)
        })
    })

    return io
}