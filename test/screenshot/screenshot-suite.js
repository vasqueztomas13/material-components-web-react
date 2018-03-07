const screenshots = [];
screenshots.concat(require('./temporary-package/screenshot-suite'));

screenshots.forEach(function(screenshotPromise) {
  screenshotPromise.then();
});
