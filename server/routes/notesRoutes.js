var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');
var config = require('../util/configuration.js');

router.get("/", notes.showIndex);
router.post("/", notes.saveNote);
router.post("/addNewNote", notes.addNewNote);
router.get("/getNotes", notes.getNotes);
router.post("/editNote", notes.addNewNote);
router.get("/showFinished", config.toggleFinishedActive);
router.get("/changeStyle", config.changeStyle);

module.exports = router;
