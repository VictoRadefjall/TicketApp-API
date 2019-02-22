// hämta schema/mall
let EventModel = require('../models/event');

// POST
module.exports.post = async(req,res,next) => {
  try {
    let newEvent = await EventModel.create(req.body);
    console.log(newEvent)
    res.status(200).send(newEvent)
  }

  catch(err) {
    console.error(err);
    // fel av användaren
    res.status(400).send(err);
  }
};

// GET
module.exports.get = async(req,res) => {
  try {
    let events = await EventModel.find({});
    // allt gick bra
    res.status(200).send(events)
  }

  catch(err) {
    console.error(err);
    // fel hos användaren
    res.status(500).send(err);
  }
}
