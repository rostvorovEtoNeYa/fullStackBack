const Ticket = require("../../db/models/ticket/index");

module.exports.addNewTicket = (req, res, next) => {
	const body = req.body;
	const { text, cost } = body;
	if (
		body.hasOwnProperty("text") &&
		text.trim().length &&
		body.hasOwnProperty("cost") &&
		+cost
	) {
		const ticket = new Ticket(req.body);
		ticket.save()
			.then((result) => {
				return res.send(result);
			})
			.catch((err) => {
				return res.send("Error!");
			});

module.exports.deleteTicket = (req, res, next) => {
	const query = req.query;
	if (query.hasOwnProperty("id") && query.id.trim().length) {
		const id = req.query.id;
		Ticket.deleteOne({ _id: id }).then((result) => {
			return res.send(result);
		})
			.catch((err) => {
				res.status(422).send("Error!");
			});
		} else
		res.status(422).send("Some fields are missing or not valid!(text or cost)");
	};

module.exports.getAllTickets = (req, res, next) => {
	Ticket.find().then((result) => {
		res.send({ data: result });
	})
		.catch((err) => res.status(422).send("Error! Cannot find tasks"));
};

module.exports.allUserSpending = (req, res, next) => {
	Ticket.aggregate([{ $group: { _id: null, total: { $sum: "$cost" } } }])
		.then((result) => res.send(result.length ? result[0] : { total: 0 }))
		.catch((err) => res.status(422).send("Error! Cannot find all spending"));
};
