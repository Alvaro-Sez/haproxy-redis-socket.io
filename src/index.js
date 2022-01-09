const express = require('express')
const app = express()
const { createServer } = require('http')
const httpServer = createServer(app)
const { Server } = require('socket.io')
const redis = require('redis')
const connectSocket = require('./socket')
const buildPubSub = require('./pubsub')

const APPID = process.env.APPID || 4000
const subscriber = redis.createClient({
    port: 6379,
    host:'redis'
})
const publisher = redis.createClient({
    port: 6379,
    host:'redis'
})

const io = connectSocket({ Server, httpServer, publisher, port:APPID })
buildPubSub({io, sub:subscriber, port:APPID})

app.get('/', (req, res) => {
    res.send({success:`yes on ${APPID}`})
})

httpServer.listen(APPID, () => console.log(`running on ${APPID}`))