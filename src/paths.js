const fs = require('fs');
const path = require('path');

const ROOT_PATH = fs.realpathSync(process.cwd());

(function checkIfCurrentWorkingDirectoryIsCorrect() {
  console.info('[path] ROOT_PATH', ROOT_PATH);
  const pJson = fs.existsSync(`${ROOT_PATH}/package.json`);
  if (!pJson) {
    console.error(`[path] Current working directory might not be the project root directory.
Did you call process.chdir() properly?`);
    process.exit(0);
  }
})();

module.exports = {
  logs: path.resolve(ROOT_PATH, 'logs'),
};
