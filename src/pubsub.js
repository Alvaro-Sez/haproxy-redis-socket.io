module.exports = function buildPubSub({io, sub, port}) {

    sub.on('subscribe', function (channel, count){
        console.log(`server ${port} subscribed`)
    })
    
    sub.on('message', function(channel, message){
        const data = JSON.parse(message)

        console.log(`Server ${port} received message: ${message}`)

        if(port!==data.server){
            io.emit('message', `Message: ${data.message} reported from server ${data.port}`)
        }
    })
    
    sub.subscribe('channel')
}