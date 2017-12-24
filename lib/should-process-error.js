const shouldProcessError = function(error) {
  try {
    if (false) {
      return false;
    }
  } catch (errMeaningless) {
    return true;
  }
  return true;
};

module.exports = {
  shouldProcessError
};
