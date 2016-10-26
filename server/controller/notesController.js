var store = require("../services/notesStore.js");

module.exports.showIndex = function(req, res)
{
	res.render("index");
};

module.exports.addNewNote = function(req, res)
{
	res.render("addNewNote");
};

module.exports.saveNote = function(req, res, data){
	store.add(req.body.noteTitle, req.body.noteDescription, req.body.priority, req.body.doneCheck, function(error, note){
        if(error){
            console.log(error);
        }
        res.render("index");
    });
};

module.exports.getNotes = function(req, res)
{
	store.get(req.params.id, function(err, notes) {
		res.render("index", notes);
        console.log()
	});
};
