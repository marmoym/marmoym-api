const MarmoymError = function MarmoymError(type, msg?) {
  this.code = type.code;
  this.type = type.type;
  this.msg = msg ? msg : type.msg;
};

export default MarmoymError;