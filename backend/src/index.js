const express = require("express")
const app = express()
const server = require("http").Server(app)
const cors = require("cors")

const io = require("socket.io")(server)

app.use(express.json())
app.use(cors())

io.on("connection", socket => {
  socket.on("message", msg => {
    io.emit("message", msg)
  })

  socket.on("typing", name => {
    io.emit("typing", name)
  })
})

server.listen(3333)
console.log("listening on 3333")
