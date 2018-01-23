/**
 * Injects script to get page's head content
 * @param {object} tab
 * @returns {Promise}
 */
function getTabContent(tab) {
  if (tab.url.indexOf('chrome:') === 0) {
    return Promise.reject(null);
  }

  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.onMessage.addListener(message => resolve(message));
      chrome.tabs.executeScript(tab.id, { file: 'inject.js' });
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Check promise
 * @returns {Promise} a promise with an active tab url
 */
export default function getActiveTabContent() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      const tab = tabs && tabs[0];
      if (tab) {
        getTabContent(tab).then(tabData => resolve(tabData), reject.bind(null, {}));
      } else {
        reject({});
      }
    });
  });
}

