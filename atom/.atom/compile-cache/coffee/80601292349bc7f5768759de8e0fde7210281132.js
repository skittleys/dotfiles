(function() {
  var Task;

  Task = require('atom').Task;

  module.exports = {
    startTask: function(paths, callback) {
      var results, taskPath;
      results = [];
      taskPath = require.resolve('./tasks/scan-paths-handler');
      this.task = Task.once(taskPath, paths, (function(_this) {
        return function() {
          _this.task = null;
          return callback(results);
        };
      })(this));
      this.task.on('scan-paths:path-scanned', function(result) {
        return results = results.concat(result);
      });
      return this.task;
    },
    terminateRunningTask: function() {
      var _ref;
      return (_ref = this.task) != null ? _ref.terminate() : void 0;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL3BhdGhzLXNjYW5uZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLElBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsU0FBQSxFQUFXLFNBQUMsS0FBRCxFQUFRLFFBQVIsR0FBQTtBQUNULFVBQUEsaUJBQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSxFQUFWLENBQUE7QUFBQSxNQUNBLFFBQUEsR0FBVyxPQUFPLENBQUMsT0FBUixDQUFnQiw0QkFBaEIsQ0FEWCxDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUksQ0FBQyxJQUFMLENBQ04sUUFETSxFQUVOLEtBRk0sRUFHTixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQ0UsVUFBQSxLQUFDLENBQUEsSUFBRCxHQUFRLElBQVIsQ0FBQTtpQkFDQSxRQUFBLENBQVMsT0FBVCxFQUZGO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FITSxDQUhSLENBQUE7QUFBQSxNQVdBLElBQUMsQ0FBQSxJQUFJLENBQUMsRUFBTixDQUFTLHlCQUFULEVBQW9DLFNBQUMsTUFBRCxHQUFBO2VBQ2xDLE9BQUEsR0FBVSxPQUFPLENBQUMsTUFBUixDQUFlLE1BQWYsRUFEd0I7TUFBQSxDQUFwQyxDQVhBLENBQUE7YUFjQSxJQUFDLENBQUEsS0FmUTtJQUFBLENBQVg7QUFBQSxJQWlCQSxvQkFBQSxFQUFzQixTQUFBLEdBQUE7QUFDcEIsVUFBQSxJQUFBOzhDQUFLLENBQUUsU0FBUCxDQUFBLFdBRG9CO0lBQUEsQ0FqQnRCO0dBSEYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/cm/.atom/packages/pigments/lib/paths-scanner.coffee
