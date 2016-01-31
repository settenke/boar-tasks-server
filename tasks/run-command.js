'use strict';

module.exports = function(gulp, config) {
  return function(command, cb) {
    var _ = require('lodash');
    var spawn = require('child_process').spawn;
    var env = _.extend({}, process.env, config.server.environmentVariables);
    var argv = process.argv.slice(2);
    var proc = spawn('node', [command].concat(argv), { env: env });
    proc.stdout.pipe(process.stdout);
    proc.stdin.pipe(process.stdin);
    proc.stderr.pipe(process.stderr);

    proc.on('close', function (code) {
      console.log('child process exited with code ' + code);
    });
  };
};
