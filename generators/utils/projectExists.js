/**
 * projectExists
 *
 * Check whether the given project exist in the current directory
 */

const fs = require('fs');
const projects = fs.readdirSync(process.cwd());

function projectExists(project) {
  return projects.indexOf(project) >= 0;
}

module.exports = projectExists;
