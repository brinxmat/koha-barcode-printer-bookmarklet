const main = "main.js"

const bookmarklet = require('bookmarklet')
const handlebars = require('handlebars')

const version = require('./version.js')

const fs = require('fs')

var revision = null;

var templateData = {
    "title": "Barcode bookmarklet for Koha",
    "revision": version.hash,
    "revisionText": "Build: ",
    "copyText": "Drag and drop this on your bookmarks toolbar: ",
    "bookmarkletName": "Strekkodegenerator"
}

console.log("========== BUILDING BOOKMARKLET (REV: " + version.hash + ") ==========")

fs.readFile(main, 'utf8', function (err, data) {
    if (err) {
        throw err
    }
    writeBookmarklet(data)
})

fs.readFile(main, 'utf8', function (err, data) {
    if (err) {
        throw err
    }
    writeBookmarklet(data)
})



function writeBookmarklet(data) {

    const bmkl = bookmarklet.convert(data, {})

    templateData.javascript = bmkl

    const renderer = handlebars.compile(fs.readFileSync("tmpl/template.hjs", 'utf8'))

    console.log("========== ADDING JAVASCRIPT ==========")
    fs.writeFile("../build/index.js", bmkl, function (err) {
        if (err) {
            throw err
        }
    })
    console.log("========== ADDING HTML ==========")
    fs.writeFile("../build/index.html", renderer(templateData), function (err) {
        if (err) {
            throw err
        }
    })
    console.log("========== BUILD SUCCESSFUL ==========")
}
