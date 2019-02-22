const mongoose = require('mongoose');

let Schema = mongoose.Schema;

// schema/mall för events
let eventSchema = new Schema ({
  name: {
    type: String,
    required: [true, "Event must have a name."]
  },
  place: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: [true, "Event must have a numeric price."]
  },
  date: {
    date: {
      type: Number,
      required: true
    },
    month: {
      type: String,
      required: true
    }
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  tickets: {
    spots: Number,
    sold: Number
  }
});

let EventModel = mongoose.model('event', eventSchema);

module.exports = EventModel;
