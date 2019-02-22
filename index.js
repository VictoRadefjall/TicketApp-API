const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // för att kunna prata mellan olika portar

// koppla till databas
mongoose.connect(`mongodb+srv://chef:${process.env.PASSWORD}@whereitsat-data-1db3p.mongodb.net/whereitsat?retryWrites=true`, {useNewUrlParser: true})
.then(() => {
  console.log('Password OK, connected to database.')
})
.catch(err => {
  console.error(err);
});

// routes
let events = require('./routes/events');
let tickets = require('./routes/tickets')
let verify = require('./routes/verify')

let app = express();
app.use(express.json());
app.use(cors());

/////

app.route('/events')
.post(events.post)
.get(events.get)

app.route('/tickets')
.post(tickets.post)

app.route('/verify/:code')
.get(verify.get)

/////


let port = 3000;
app.listen(port, () => {
  console.log(`Servern körs på port: ${port}.`);
})
