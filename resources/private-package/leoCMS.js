let fs = require('fs');
global.site = {
    pages: []
};
if (global.site.pages.length === 0)
    global.site.pages = JSON.parse(fs.readFileSync('./resources/site.json', "utf8"));

module.exports = global.site;