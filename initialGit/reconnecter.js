// Generated by CoffeeScript 1.6.2
(function() {
  var exec, getTeamName, gitOptions;

  if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function(str) {
      return this.slice(0, str.length) === str;
    };
  }

  exec = require('child_process').exec;

  gitOptions = {
    cwd: process.cwd()
  };

  getTeamName = function(callback) {
    console.log("getting Team Name");
    return exec("git branch", gitOptions, function(error, stdout, stderr) {
      var branches, line, lines, _i, _len, _results;

      branches = [];
      lines = stdout.toString().split("\n");
      _results = [];
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        if (line.startsWith("* ")) {
          console.log(line);
          _results.push(callback(line.substring(2)));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    });
  };

  getTeamName(function(teamName) {
    return exec("git pull", gitOptions, function(error, stdout, stderr) {
      return exec("git reset --hard origin/" + teamName, gitOptions, function(error, stdout, stderr) {
        return console.log("Reconnected to " + teamName);
      });
    });
  });

}).call(this);