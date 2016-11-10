var store = require("../services/notesStore.js");

module.exports.showIndex = function (req, res) {
	store.getAll(function (err, notes) {
		var cookie = req.cookies.sortOrder;
		if (cookie === undefined) {
			res.render("index", {notes: notes});
		} else {
			res.redirect('/getNotes?submit='+cookie);
		}

	});
};

module.exports.addNewNote = function (req, res) {
	var note = {};
	note.noteMode = "New";
	res.render("addNewNote", {note: note});
};

module.exports.saveNote = function (req, res, data) {
	var id = String(req.body.id || "");
	var title = String(req.body.noteTitle || "title");
	var description = String(req.body.noteDescription || "description");
	var priority = Number(req.body.priority || 1);
	var dueDate = new Date(req.body.dueDate);
	var done = req.body.doneCheck == 'on';
	if (dueDate == 'Invalid Date') {
		dueDate = new Date();
	}
	if (!id){
		store.add(title, description, priority, dueDate, done, function (error, note) {
			if (error) {
				console.log(error);
			}
			res.redirect('/');

		});
	} else {
		store.update(title, description, priority, dueDate, done,id, function (error, note) {
			if (error) {
				console.log(error);
			}
			res.redirect('/');

		});
	}

};

module.exports.editNote = function (req, res, data) {
	console.log(data);
	store.get(req.body._id, function(err, note){
		if(err){
			console.log(err);
		}
		note.noteMode = "Edit";
		note.prioHelper = [4];


		res.render("addNewNote", note);
	});
};

module.exports.getNotes = function (req, res) {
	store.getAll(function (err, notes) {
		if(err){
			console.log(err);
		}
		switch(req.query.submit){
			case 'dateDue':
				notes.sort(function(noteA, noteB){
					return noteA.dueDate < noteB.dueDate;
				});
				break;
			case 'dateCreated':
				notes.sort(function(noteA, noteB){
					return noteA.createdDate < noteB.createdDate;
				});
				break;
			case 'priority':
				notes.sort(function(noteA, noteB){
					return noteA.priority<noteB.priority;
				});
				break;
		}
		if (req.query.submit !== undefined){
			res.cookie('sortOrder', req.query.submit);
		}
		res.render("index", {notes: notes});
	});
};
