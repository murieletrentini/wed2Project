let if_equal = function(val, input, options){
  if(val===input){
      return options.fn(this);
  }
};
module.exports = if_equal;