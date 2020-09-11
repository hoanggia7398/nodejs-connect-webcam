const express = require('express')
const app = express()
const path = require('path');
const cv = require('opencv4nodejs')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = 3000

const FPS = 10
const wCap = new cv.VideoCapture(0)
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300)
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 300)




setInterval(() => {
    const frame = wCap.read()
    const image = cv.imencode('.jpg', frame).toString('base64')
    io.emit('image', image)
}, 1000 / FPS)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`))

