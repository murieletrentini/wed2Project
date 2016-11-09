var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');

router.get("/", notes.showIndex);
router.post("/", notes.saveNote);
router.post("/addNewNote", notes.addNewNote);
router.get("/getNotes", notes.getNotes);

router.post("/editNote", notes.editNote);

module.exports = router;
