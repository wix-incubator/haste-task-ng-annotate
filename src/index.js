const ngAnnotate = require('ng-annotate');
const globby = require('globby');
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = async (options) => {
  const paths = await globby([options.directory + '/**/*.js']);
  await Promise.all(paths.map(async (path) => {
    const sourceCode = await readFile(path);
    const r = ngAnnotate(sourceCode.toString(), {
      add: true,
      single_quotes: true
    });
    await writeFile(path, r.src);
  }));
};