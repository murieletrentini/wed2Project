var store = require("../services/notesStore.js");
var config = require("../util/configuration.js");


module.exports.showIndex = function (req, res) {
	if (req.cookies.showFinishedActive === 'undefined')req.cookies.showFinishedActive = false;
	store.getAll(function (error, notes) {
		if (error) {
			res.render("error", {error: error});
		}
		if (notes.size === 0) {
			notes.isEmpty = true;
		}
		var sortOrder = req.cookies.sortOrder;
		if (sortOrder === undefined) {
			res.render("index", {
				notes: notes,
				config: config.config,
				showFinishedActive: req.cookies.showFinishedActive
			});
		} else {
			res.redirect('/getNotes?submit=' + sortOrder);
		}

	});
};

module.exports.addNewNote = function (req, res) {
	var title;
	if (req.body._id) {
		title = "Edit Note";
		store.get(req.body._id, function (error, note) {
			if (error) {
				res.render("error", {error: error});
			}
			res.render("addNewNote", {title: title, note: note, config: config.config});
		});
	} else {
		title = "New Note";
		var note = {};
		res.render("addNewNote", {title: title, note: note, config: config.config});
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
		store.add(title, description, priority, dueDate, done, callbackShowIndex(res));
	} else {
		store.update(title, description, priority, dueDate, done, id, callbackShowIndex(res));
	}

};

module.exports.getNotes = function (req, res) {
	var sortOrder = req.query.submit;
	if (config.config.sortOrder == sortOrder) {
		config.switchOrder();
		res.cookie('order', config.config.order);
	} else {
		config.config.sortOrder = sortOrder;
		res.cookie('sortOrder', sortOrder);
	}
	store.getAll(function (error, notes) {
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

module.exports.showFinished = function (req, res) {
	var showFinishedActive = req.cookies.showFinishedActive;
	if (showFinishedActive === 'undefined') showFinishedActive = 'false';
	if (showFinishedActive === 'true') {
		store.getAll(function (err, docs) {
			if (err) {
				res.render("error", {error: err});
			}
			if (typeof docs === 'undefined') {
				docs.isEmpty = true;
			}
			res.render("index", {
				notes: docs,
				sortOrder: req.cookies.sortOrder,
				styleSwitcher: req.cookies.styleSwitcher,
				showFinishedActive: 'false'
			})
		})
	} else {
		store.getFinished(function (err, docs) {
			if (err) {
				res.render("error", {error: err});
			}
			if (docs.length === 0) {
				docs.isEmpty = true;
			}
			res.render("index", {
				notes: docs,
				sortOrder: req.cookies.sortOrder,
				styleSwitcher: req.cookies.styleSwitcher,
				showFinishedActive: 'true'
			});
		});
	}
};


var callbackShowIndex = function (res, error) {
	if (error) {
		res.render("error", {error: error});
	}
	res.redirect('/');
};