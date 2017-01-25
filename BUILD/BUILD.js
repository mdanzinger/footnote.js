var fs = require('fs'),
    compressor = require('node-minify'),
    sass = require("node-sass");

sass.render({
        file: "../style.scss",
        outFile: "../style.css",
        outputStyle: 'compressed',
    },
    function(err, result){
        if (err) {
            console.log(err);
        }
        else {
            fs.writeFile("../style.css", result.css, function(err) {
                if(!err) {
                    console.log("SCSS compiled sucessfully");
                }
                else {
                    console.log(err)
                }
            })
        }
    }
)

compressor.minify({
    compressor: 'gcc',
    input: '../footnote.js',
    output: '../minified/footnote.min.js',
    callback: function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("JS minified successfully.");
        }
    }
});