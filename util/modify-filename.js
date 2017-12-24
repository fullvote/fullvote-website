const appendToEndOfFilename = function(filename, toAppend) {
  const firstPart = filename.slice(0, filename.lastIndexOf('.'));
  const secondPart = filename.slice(filename.lastIndexOf('.'));
  return `${firstPart}-${toAppend}${secondPart}`;
};

module.exports = {
  appendToEndOfFilename
};
