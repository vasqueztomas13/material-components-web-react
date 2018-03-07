const takeScreenshot = require('../take-screenshot');
 
const screenshots = [];
screenshots.push(takeScreenshot('temporary-package/main.png', 'temporary-package'));

//TODO add more screenshots 

module.exports = screenshots;