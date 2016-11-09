var if_equal = function(val, input, options){
  if(val===input){
      return options.fn(this);
  }
};
module.exports = if_equal;
/*
var larger_equal_than = function(val, input, options){
    if(val>=input){
        return options.fn();
    }
};
module.exports = larger_equal_than;*/