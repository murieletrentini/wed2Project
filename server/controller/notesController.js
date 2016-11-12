var store = require("../services/notesStore.js");


module.exports.showIndex = function (req, res) {
	store.getAll(function (error, notes) {
		if (error) {
			res.render("error", {error: error});
		}
		var sortOrder = req.cookies.sortOrder;
		if (sortOrder === undefined) {
			res.render("index", {notes: notes,  styleSwitcher: req.cookies.styleSwitcher});
		} else {
			res.redirect('/getNotes?submit=' + sortOrder);
		}

	});
};

module.exports.addNewNote = function (req, res) {
	var title;
	if (req.body._id){
		title = "Edit Note";
		store.get(req.body._id, function (error, note) {
			if (error) {
				res.render("error", {error: error});
			}
			res.render("addNewNote", {title: title, note: note});
		});
	} else {
		title = "New Note";
		var note = {};
		res.render("addNewNote", {title: title, note: note});
	}

};

module.exports.saveNote = function (req, res) {
	var id = String(req.body.id || "");
	var title = String(req.body.noteTitle || "title");
	var description = String(req.body.noteDescription || "description");
	var priority = Number(req.body.priority || 1);
	var dueDate = new Date(req.body.dueDate);
	var done = req.body.doneCheck == 'on';
	if (dueDate == 'Invalid Date') {
		dueDate = new Date();
	}
	if (!id) {
		store.add(title, description, priority, dueDate, done, function (error, note) {
			if (error) {
				res.render("error", {error: error});
			}
			res.redirect('/');

		});
	} else {
		store.update(title, description, priority, dueDate, done, id, function (error, note) {
			if (error) {
				res.render("error", {error: error});
			}
			res.redirect('/');

		});
	}

};

module.exports.getNotes = function (req, res) {
	store.getAll(function (err, notes) {
		if (err) {
			res.render("error", {error: error});
		}
		var sortOrder = req.query.submit;
		switch (sortOrder) {
			case 'dateDue':
				notes.sort(function (noteA, noteB) {
					return noteA.dueDate < noteB.dueDate;
				});
				break;
			case 'dateCreated':
				notes.sort(function (noteA, noteB) {
					return noteA.createdDate < noteB.createdDate;
				});
				break;
			case 'priority':
				notes.sort(function (noteA, noteB) {
					return noteA.priority < noteB.priority;
				});
				break;
		}
		res.cookie('sortOrder', sortOrder);
		res.render("index", {notes: notes, sortOrder: sortOrder, styleSwitcher: req.cookies.styleSwitcher});
	});
};

