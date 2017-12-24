/**
 * Determines if a link click event will cause the current page to upload.
 * Note: most link clicks *will* cause the current page to unload because they
 * initiate a page navigation. The most common reason a link click won't cause
 * the page to unload is if the clicked was to open the link in a new tab.
 * @param {Event} event The DOM event.
 * @param {Element} link The link element clicked on.
 * @return {boolean} True if the current page will be unloaded.
 */
module.exports = function linkClickWillUnloadCurrentPage(event, link) {
  return !// The event type can be customized; we only care about clicks here.
  (
    event.type !== 'click' ||
    // Links with target="_blank" set will open in a new window/tab.
    link.target === '_blank' ||
    // On mac, command clicking will open a link in a new tab. Control
    // clicking does this on windows.
    event.metaKey ||
    event.ctrlKey ||
    // Shift clicking in Chrome/Firefox opens the link in a new window
    // In Safari it adds the URL to a favorites list.
    event.shiftKey ||
    // On Mac, clicking with the option key is used to download a resouce.
    event.altKey ||
    // Middle mouse button clicks (which == 2) are used to open a link
    // in a new tab, and right clicks (which == 3) on Firefox trigger
    // a click event.
    event.which > 1
  );
};
