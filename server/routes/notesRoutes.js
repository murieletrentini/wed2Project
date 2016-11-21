let express = require('express');
let router = express.Router();
let notes = require('../controller/notesController.js');
let config = require('../util/configuration.js');

router.get("/", notes.showIndex);
router.post("/", notes.saveNote);
router.get("/addOrEditNote", notes.addOrEditNote);
router.get("/getNotes", notes.getNotes);
router.post("/editNote", notes.addOrEditNote);
router.get("/showFinished", config.toggleFinishedActive);
router.get("/changeStyle", config.changeStyle);

module.exports = router;
