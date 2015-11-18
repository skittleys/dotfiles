(function() {
  var BufferVariablesScanner, ColorContext, VariableScanner, VariablesChunkSize;

  VariableScanner = require('../variable-scanner');

  ColorContext = require('../color-context');

  VariablesChunkSize = 100;

  BufferVariablesScanner = (function() {
    function BufferVariablesScanner(config) {
      this.buffer = config.buffer;
      this.scanner = new VariableScanner();
      this.results = [];
    }

    BufferVariablesScanner.prototype.scan = function() {
      var lastIndex, results;
      lastIndex = 0;
      while (results = this.scanner.search(this.buffer, lastIndex)) {
        this.results = this.results.concat(results);
        if (this.results.length >= VariablesChunkSize) {
          this.flushVariables();
        }
        lastIndex = results.lastIndex;
      }
      return this.flushVariables();
    };

    BufferVariablesScanner.prototype.flushVariables = function() {
      emit('scan-buffer:variables-found', this.results);
      return this.results = [];
    };

    return BufferVariablesScanner;

  })();

  module.exports = function(config) {
    return new BufferVariablesScanner(config).scan();
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL3Rhc2tzL3NjYW4tYnVmZmVyLXZhcmlhYmxlcy1oYW5kbGVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx5RUFBQTs7QUFBQSxFQUFBLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHFCQUFSLENBQWxCLENBQUE7O0FBQUEsRUFDQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGtCQUFSLENBRGYsQ0FBQTs7QUFBQSxFQUdBLGtCQUFBLEdBQXFCLEdBSHJCLENBQUE7O0FBQUEsRUFLTTtBQUNTLElBQUEsZ0NBQUMsTUFBRCxHQUFBO0FBQ1gsTUFBQyxJQUFDLENBQUEsU0FBVSxPQUFWLE1BQUYsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE9BQUQsR0FBZSxJQUFBLGVBQUEsQ0FBQSxDQURmLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxPQUFELEdBQVcsRUFGWCxDQURXO0lBQUEsQ0FBYjs7QUFBQSxxQ0FLQSxJQUFBLEdBQU0sU0FBQSxHQUFBO0FBQ0osVUFBQSxrQkFBQTtBQUFBLE1BQUEsU0FBQSxHQUFZLENBQVosQ0FBQTtBQUNBLGFBQU0sT0FBQSxHQUFVLElBQUMsQ0FBQSxPQUFPLENBQUMsTUFBVCxDQUFnQixJQUFDLENBQUEsTUFBakIsRUFBeUIsU0FBekIsQ0FBaEIsR0FBQTtBQUNFLFFBQUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsQ0FBZ0IsT0FBaEIsQ0FBWCxDQUFBO0FBRUEsUUFBQSxJQUFxQixJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsSUFBbUIsa0JBQXhDO0FBQUEsVUFBQSxJQUFDLENBQUEsY0FBRCxDQUFBLENBQUEsQ0FBQTtTQUZBO0FBQUEsUUFHQyxZQUFhLFFBQWIsU0FIRCxDQURGO01BQUEsQ0FEQTthQU9BLElBQUMsQ0FBQSxjQUFELENBQUEsRUFSSTtJQUFBLENBTE4sQ0FBQTs7QUFBQSxxQ0FlQSxjQUFBLEdBQWdCLFNBQUEsR0FBQTtBQUNkLE1BQUEsSUFBQSxDQUFLLDZCQUFMLEVBQW9DLElBQUMsQ0FBQSxPQUFyQyxDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsT0FBRCxHQUFXLEdBRkc7SUFBQSxDQWZoQixDQUFBOztrQ0FBQTs7TUFORixDQUFBOztBQUFBLEVBeUJBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsTUFBRCxHQUFBO1dBQ1gsSUFBQSxzQkFBQSxDQUF1QixNQUF2QixDQUE4QixDQUFDLElBQS9CLENBQUEsRUFEVztFQUFBLENBekJqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/cm/.atom/packages/pigments/lib/tasks/scan-buffer-variables-handler.coffee
