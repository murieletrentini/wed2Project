module.exports.changeStyle = function (req, res) {
	var styleSwitcher = req.cookies.styleSwitcher;
	styleSwitcher = (styleSwitcher === "true")?"false":"true";
	res.cookie('styleSwitcher', styleSwitcher);
	res.redirect('/');
};

