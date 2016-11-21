"use strict";
let multiply = function(n, block) {
	let accum = '';
	for(let i = 0; i < n; ++i)
		accum += block.fn(i);
	return accum;
};

module.exports = multiply;