var fs = require('fs'),
    compressor = require('node-minify');

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