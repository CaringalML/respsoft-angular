'use strict';
const fs = require('fs');
const prettier = require('prettier');
const pug = require('pug');
const upath = require('upath');
const workerpool = require('workerpool');

const srcPath = upath.resolve(upath.dirname(__filename), '../src');

function renderPug(filePath) {
    console.log(`### INFO: Rendering ${filePath}`);
    let html;
    try {
        html = pug.renderFile(filePath, {
            doctype: 'html',
            filename: filePath,
            basedir: srcPath,
        });    
    } catch (error) {
        return console.error(error);
    }

    const prettified = prettier.format(html, {
        printWidth: 1000,
        tabWidth: 4,
        singleQuote: true,
        proseWrap: 'preserve',
        endOfLine: 'lf',
        parser: 'html'
    });

    fs.writeFileSync(filePath.replace(/\.pug$/, '.html'), prettified);
}

workerpool.worker({
    renderPug: renderPug,
});
