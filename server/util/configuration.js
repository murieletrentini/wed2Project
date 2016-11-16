module.exports.config = {
	styleSwitcher: "1",
	sortOrder: "",
	order: 1,
	showFinishedActive: "0"
};

module.exports.changeStyle = function (req, res) {
	var styleSwitcher = req.cookies.styleSwitcher;
	styleSwitcher = (styleSwitcher==="1")?"2":"1";
	res.cookie('styleSwitcher', styleSwitcher);
	res.redirect('/');
};

module.exports.switchOrder = function () {
	this.config.order = this.config.order == 1 ? 0 : 1;
};

module.exports.toggleFinishedActive = function(req, res){
	var showFinishedActive = req.cookies.showFinishedActive;
	if (this.config.showFinishedActive != showFinishedActive){
		showFinishedActive = showFinishedActive== "0" ? "1" : "0";
		this.config.showFinishedActive = showFinishedActive;
		res.cookie('showFinishedActive', showFinishedActive);
	}
};