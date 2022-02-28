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
				return res.send(err);
			});
	} else
		return res
			.status(422).send("Some fields are missing or not valid!(text or cost)");
};

module.exports.getAllTickets = (req, res, next) => {
	Ticket.find().then((result) => {
		return res.send({ data: result });
	})
		.catch((err) => {
			return res.status(422).send(err);
		});
};

module.exports.allUserSpending = (req, res, next) => {
	Ticket.aggregate([{ $group: { _id: null, total: { $sum: "$cost" } } }])
		.then((result) => {
			return res.send(result.length ? result[0] : { total: 0 });
		})
		.catch((err) => {
			return res.status(422).send(err);
		});
};