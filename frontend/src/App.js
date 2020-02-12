import React, { useState, useEffect } from "react"
import "./App.scss"
import io from "socket.io-client"
let socket

function App() {
  const [form, setForm] = useState({ name: "", message: "" })
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState({ name: "" })

  useEffect(() => {
    if (!socket) {
      socket = io(":3333")
    }

    socket.on("message", msg => {
      setMessages(messages => [...messages, msg])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    socket.on("typing", name => {
      setTyping({ name })
    })
  }, [socket])

  function handleForm(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }
  useEffect(() => {
    if (form.message !== "") {
      socket.emit("typing", form.name)
    } else {
      socket.emit("typing", "")
    }
  }, [form])

  function handleSubmit(event) {
    event.preventDefault()
    if (form.name !== "" && form.message !== "") {
      socket.emit("message", form)
      setForm({ ...form, message: "" })
      setTyping({ name: "" })
    }
  }

  return (
    <div className="App">
      <div className="title">Snahier's Websocket Chat</div>
      <div className="chat-area">
        <ul>
          {messages.map((msg, index) => {
            return (
              <li key={index}>
                {msg.name}: {msg.message}
              </li>
            )
          })}
        </ul>
        {typing.name !== "" && <span>{typing.name} is typing...</span>}
      </div>
      <form onSubmit={handleSubmit}>
        <label>Nickname:</label>
        <input
          type="text"
          name="name"
          onChange={handleForm}
          value={form.name}
          autoComplete="off"
        />
        <label>Message:</label>
        <input
          type="text"
          name="message"
          onChange={handleForm}
          value={form.message}
          autoComplete="off"
        />
        <button>Send message</button>
      </form>
    </div>
  )
}

export default App
