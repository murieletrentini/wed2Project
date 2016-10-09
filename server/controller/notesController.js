var store = require("../services/notesStore.js");

module.exports.showIndex = function(req, res)
{
	res.render("index");
};

module.exports.addNewNote = function(req, res)
{
	res.render("addNewNote");
};

module.exports.getNotes = function(req, res)
{
	store.get(req.params.id, function(err, notes) {
		res.render("index", notes);
	});
};
