(function () {
  'use strict';

  var campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  var incoming = new URLSearchParams(window.location.search);
  var sitePaths = ['/', '/index.html', '/calculator', '/calculator.html', '/japan', '/japan.html'];
  var bookingPaths = [
    '/kengo-shibazaki-nvr07t/10-minute-fundingkit-intro',
    '/kengo-shibazaki-nvr07t/30min'
  ];

  function updateLink(anchor) {
    if (!anchor) return;
    var destination;
    try {
      destination = new URL(anchor.href, window.location.href);
    } catch (error) {
      return;
    }

    var isSiteLink = destination.origin === window.location.origin &&
      sitePaths.indexOf(destination.pathname) !== -1;
    var isBookingLink = destination.origin === 'https://cal.com' &&
      bookingPaths.indexOf(destination.pathname) !== -1;
    if (!isSiteLink && !isBookingLink) return;

    campaignKeys.forEach(function (key) {
      var value = incoming.get(key);
      if (value && /^[A-Za-z0-9_-]{1,100}$/.test(value)) {
        destination.searchParams.set(key, value);
      }
    });
    anchor.href = destination.href;
  }

  document.querySelectorAll('a[href]').forEach(updateLink);
  function updateClickedLink(event) {
    if (event.target instanceof Element) {
      updateLink(event.target.closest('a[href]'));
    }
  }
  document.addEventListener('click', updateClickedLink, true);
  document.addEventListener('auxclick', updateClickedLink, true);
})();
