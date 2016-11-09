var Datastore = require('nedb');
var db = new Datastore({filename: '../data/order.db', autoload: true});

function Note(noteTitle, description, priority, dueDate, done) {
	this.noteTitle = noteTitle;
	this.description = description;
	this.priority = priority;
	this.dueDate = dueDate;
	this.createdDate = new Date().toLocaleString();
	this.done = done;
}

function publicAddNote(noteTitle, description, priority, dueDate, done, callback) {
	var note = new Note(noteTitle, description, priority, dueDate, done);

	db.insert(note, function (err, newDoc) {
		if (callback) {
			callback(err, newDoc);
		}
	});
}

function publicUpdate(noteTitle, description, priority, dueDate, done, id,callback) {
	var note = new Note(noteTitle, description, priority, dueDate, done);
	db.update({_id: id}, note ,function (err, doc) {
		if (callback) {
			callback(err, doc);
		}
	});
}

function publicFinished(id, callback) {
	db.update({_id: id}, {$set: {"done": "true"}}, {}, function (err, doc) {
		publicGet(id, callback);
	});
}

function publicGet(id, callback) {
	db.findOne({_id: id}, function (err, doc) {
		callback(err, doc);
	});
}

function publicGetAll(callback) {
	db.find({}, function (err, docs) {
		callback(err, docs);
	});
}



module.exports = {add: publicAddNote, finish: publicFinished, get: publicGet, getAll: publicGetAll, update: publicUpdate};