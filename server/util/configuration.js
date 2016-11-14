module.exports.config = {
	styleSwitcher: "",
	sortOrder: "",
	order: 1
};

module.exports.changeStyle = function (req, res) {
	var styleSwitcher = req.cookies.styleSwitcher;
	styleSwitcher = (styleSwitcher === "true") ? "false" : "true";
	res.cookie('styleSwitcher', styleSwitcher);
	res.redirect('/');
};

module.exports.switchOrder = function () {
	this.config.order = this.config.order == 1 ? 0 : 1;
};
