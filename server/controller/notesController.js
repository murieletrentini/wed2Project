var store = require("../services/notesStore.js");

module.exports.showIndex = function (req, res) {
	//TODO: bisherige notes anzeigen --> cookies?
	res.render("index");
};

module.exports.addNewNote = function (req, res) {
	res.render("addNewNote");
};

module.exports.saveNote = function (req, res, data) {
	var title = String(req.body.noteTitle || "title");
	var description = String(req.body.noteDescription || "description");
	var priority = Number(req.body.star || 1);
	var dueDate = new Date(req.body.dueDate);
	var done = req.body.doneCheck == 'on';
	if (dueDate == 'Invalid Date') {
		dueDate = Date()
	}
	store.add(title, description, priority, dueDate, done, function (error, note) {
		if (error) {
			console.log(error);
		}
		store.getAll(function (err, notes) {
			res.render("index", {notes: notes});
		});

	});
};

module.exports.editNote = function (req, res, data) {
	//TODO: implement edit functionality
};

module.exports.getNotes = function (req, res) {
	store.get(req.params.id, function (err, notes) {
		res.render("index", notes);
		console.log()
	});
};
