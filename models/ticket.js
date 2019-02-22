const mongoose = require('mongoose');

let Schema = mongoose.Schema;

// schema/mall för tickets
let ticketSchema = new Schema({
  event: {
    type: Object,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  used: {
    type: Boolean,
    default: false
  },
  uniqueName: {
    type: String,
    required: true
  }
});

let TicketModel = mongoose.model('ticket', ticketSchema);

module.exports = TicketModel;