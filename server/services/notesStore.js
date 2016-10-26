var Datastore = require('nedb');
var db = new Datastore({ filename: './data/order.db', autoload: true });

function Note(noteTitle, description, importance, dueDate)
{
	this.noteTitle = noteTitle;
	this.discription = discription;
	this.importance = importance;
	this.dueDate = dueDate;
	this.state = "pending";
}


function publicAddNote(noteTitle, description, importance, dueDate, callback)
{
	var note = new Note(noteTitle, description, importance, dueDate);

	db.insert(note, function(err, newDoc){
		if(callback){
			callback(err, newDoc);
		}
	});
}

function publicFinished(id, callback) {
	db.update({_id: id}, {$set: {"state": "finished"}}, {}, function (err, doc) {
		publicGet(id,callback);
	});
}

function publicGet(id, callback)
{   db.findOne({ _id: id }, function (err, doc) {
	callback( err, doc);
});
}


module.exports = {add : publicAddNote, finish : publicFinished, get : publicGet};