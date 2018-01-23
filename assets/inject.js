(function sendPageData() {

  function extractTags(tagName) {
    let tags = Array.from(window.document.getElementsByTagName(tagName)) || [];

    let normTagStr = tags
      .map(tag => tag.outerHTML)
      .map(tagStr => {
        if (!(tagStr.endsWith("/>") || tagStr.endsWith(`</${tagName}>`))) {
          return `${tagStr}</${tagName}>`;
        }
        return tagStr;
      });

    return normTagStr.join('');
  }

  const head = window.document.head;

  const data = `<head>${extractTags('title')}${extractTags("meta")}${extractTags('link')}${extractTags('img')}</head>`;

  const event = {
    data,
    url: getCanonical(head) || location.href,
    canonical: getCanonical(head)
  };

  /**
   * @returns {string} a canonical url
   */
  function getCanonical(head) {
    let tag = head.querySelector('link[rel=canonical]');
    if (tag) {
      return tag.getAttribute('href') || '';
    }

    tag = head.querySelector('meta[property="og:url"]');
    if (tag) {
      return tag.getAttribute('content') || tag.getAttribute('value') || '';
    }

    return '';
  }

  chrome.runtime.sendMessage(event);
})();
