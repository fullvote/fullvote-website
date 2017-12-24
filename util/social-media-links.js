const escapeFn = function(s) {
  return encodeURI(s)
    .replace(/&/g, '%26')
    .replace(/#/g, '%23')
    .replace(/\+/g, '%2B')
    .replace(/@/g, '%40')
    .replace(/:/g, '%3A');
};

module.exports.getFacebookUrl = currentUrl => {
  return `https://www.facebook.com/sharer/sharer.php?u=${escapeFn(currentUrl)}`;
};

module.exports.getTwitterUrl = (currentUrl, description) => {
  const tweet = description
    ? escapeFn(`${description} - ${currentUrl}`)
    : escapeFn(currentUrl);
  return `https://twitter.com/home?status=${tweet}`;
};

module.exports.getPinterestUrl = (
  currentUrl,
  imageUrl,
  description
) => {
  return (
    'https://pinterest.com/pin/create/button/?' +
    `url=${escapeFn(currentUrl)}&` +
    `media=${escapeFn(imageUrl)}&` +
    `description=${escapeFn(description)}`
  );
};

module.exports.getGooglePlusUrl = currentUrl => {
  return `https://plus.google.com/share?url=${escapeFn(currentUrl)}`;
};

module.exports.getEmailUrl = ({ to, subject, body }) => {
  let url = 'mailto:';
  if (to) url = url + to;
  if (subject) url = url + '?subject=' + subject;
  if (subject && body) url = url + '&body=' + body;
  else if (body) url = url + '?body=' + body;
  return url;
};
