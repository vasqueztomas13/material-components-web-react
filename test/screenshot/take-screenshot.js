const capture = require('capture-chrome')
const fs = require('fs')
 
const takeScreenshot = function(outputPath, urlPath) {
	return capture({
	  url: 'http://localhost:8080/' + urlPath
	}).then(screenshot => {
	  fs.writeFileSync('test/screenshot/' + outputPath, screenshot)
	});
} 

module.exports = takeScreenshot;