const MarmoymError = function MarmoymError(type, msg?) {
  this.code = type.code;
  this.type = type;
  this.msg = msg ? msg : type.msg;
  this.label = type.label;
};

export default MarmoymError;