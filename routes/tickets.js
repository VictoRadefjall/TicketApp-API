let TicketModel = require('../models/ticket')
let EventModel = require('../models/event')

// GET
module.exports.get = async (req, res) => {

  try {
      res.status(200).send( await TicketModel.find({}) );
  } catch(err){
      res.status(500).send(err.stack);
  }
}

// POST
module.exports.post = async(req,res,next) => {

  try {
    let event = await EventModel.findById(req.body.event);

    if (event.tickets.spots >= (event.tickets.sold + req.body.numOfTickets)) {
      console.info('Tickets are available!');

      let newSold = event.tickets.sold + req.body.numOfTickets;

      await EventModel.findOneAndUpdate({_id: req.body.event}, {
        tickets: {
          spots: event.tickets.spots,
          sold: newSold
        }
      }) 

      let tickets = [];
      for(let i = 0; i < req.body.numOfTickets; i++){
        let ticket = {
            event: event,
            code: uid(6),
            used: false,
            uniqueName: `${req.body.uniqueName}`
        }
        tickets.push(ticket);
      }
    
      let newTicket = await TicketModel.create(tickets);
      // Skicka till front end
      res.status(200).send(newTicket)
    }

    else {
      console.info('Sorry, not enough tickets left for you.');
      res.status(200).send('Not enough tickets left.');
    }

  }

  catch(err) {
    // fel hos användaren
    res.status(500).send(err.stack)
  }

}

// unikt ID
function uid(len){
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = [];

  for (let i = 0; i < len; i++) {
    let rand = Math.floor(Math.random()*chars.length);
    code.push(chars[rand]);
  }
  return code.join("");
}