const port = process.env.PORT || 80
const io = require('socket.io')(port, { cors: { origin: '*' } })
console.log(11111111100011111111)
io.on('connection', (socket) => {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients,
        sender: id,
        text,
      })
    })
  })
})
