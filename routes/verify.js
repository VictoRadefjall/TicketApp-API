let Ticket = require('../models/ticket.js');

// GET
module.exports.get = async (req, res) => {

    let ticket = await Ticket.find({ code: req.params.code });

    console.log(ticket);
    
    if(ticket.length == 1){
        res.send( { message: `Thank you, ${ticket[0].uniqueName}! We hope you'll enjoy ${ticket[0].event.name} at ${ticket[0].event.place}.`, verified: true } ).status(200);
        console.log('Gick bra');
    } else {
        res.send( { message: 'This ticket is not valid, you thief!', verified: false }).status(406);
    }

}