"use strict";
let store = require("../services/notesStore.js");
let config = require("../util/configuration.js");


module.exports.showIndex = function (req, res) {
	store.getAll(function (err, docs) {
		let notes = docs;
		if (config.config.showFinishedActive == "1") {
			notes = docs.filter(function (a) {
				return !a.done;
			});
		}
		if (err) {
			res.render("error", {error: error});
		}
		let sortOrder = config.config.sortOrder;

		if (sortOrder === undefined) {
			res.render("index", {
				notes: notes,
				config: config.config
			});
		} else {
			getSorted(sortOrder,res);
		}

	});
};

module.exports.addOrEditNote = function (req, res) {
	var title;
	if (req.body._id) {
		title = "Edit Note";
		store.get(req.body._id, function (error, note) {
			if (error) {
				res.render("error", {error: error});
			}
			res.render("addOrEditNote", {title: title, note: note, config: config.config});
		});
	} else {
		title = "New Note";
		var note = {};
		res.render("addOrEditNote", {title: title, note: note, config: config.config});
	}

};

module.exports.saveNote = function (req, res) {
	var id = String(req.body.id || "");
	var title = String(req.body.noteTitle);
	var description = String(req.body.noteDescription || "description");
	var priority = Number(req.body.priority || 1);
	var dueDate = new Date(req.body.dueDate);
	var done = req.body.doneCheck == 'on';
	if (dueDate == 'Invalid Date') {
		dueDate = new Date();
	}
	if (!id) {
		store.add(title, description, priority, dueDate, done, callbackShowIndex(res));
	} else {
		store.update(title, description, priority, dueDate, done, id, callbackShowIndex(res));
	}

};

module.exports.getNotes = function (req, res) {
	let sortOrder = req.query.submit;
	if (config.config.sortOrder == sortOrder) {
		config.switchOrder();
		res.cookie('order', config.config.order);
	} else {
		config.config.sortOrder = sortOrder;
		res.cookie('sortOrder', sortOrder);
	}
	getSorted(sortOrder, res);
};

let getSorted = function (sortOrder, res) {
	store.getAll(function (error, docs) {
		var notes = docs;
		if (config.config.showFinishedActive == "1") {
			notes = docs.filter(function (a) {
				return !a.done;
			});
		}
		if (error) {
			res.render("error", {error: error});
		}
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
		if (config.config.order == 1){
			notes.reverse();
		}
		res.render("index", {notes: notes, config: config.config});
	});
};


let callbackShowIndex = function (res, error) {
	if (error) {
		res.render("error", {error: error});
	}
	res.redirect('/');
};