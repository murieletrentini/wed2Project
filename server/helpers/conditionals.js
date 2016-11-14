var _if = function(condition, options){
    if(condition)return options.fn(this);
};
module.exports = _if;

var _if_not = function(condition, options){
    if(!condition)return options.fn(this);
};
module.exports = _if_not;

var if_equal = function(val, input, options){
  if(val===input){
      return options.fn(this);
  }
};
module.exports = if_equal;