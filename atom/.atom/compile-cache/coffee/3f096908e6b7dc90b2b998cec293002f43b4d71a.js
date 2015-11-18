(function() {
  var BufferColorsScanner, ColorContext, ColorScanner, ColorsChunkSize, createVariableExpression, getRegistry;

  ColorScanner = require('../color-scanner');

  ColorContext = require('../color-context');

  getRegistry = require('../color-expressions').getRegistry;

  createVariableExpression = require('../utils').createVariableExpression;

  ColorsChunkSize = 100;

  BufferColorsScanner = (function() {
    function BufferColorsScanner(config) {
      var bufferPath, colorVariables, variables;
      this.buffer = config.buffer, variables = config.variables, colorVariables = config.colorVariables, bufferPath = config.bufferPath;
      this.context = new ColorContext({
        variables: variables,
        colorVariables: colorVariables,
        referencePath: bufferPath
      });
      this.scanner = new ColorScanner({
        context: this.context
      });
      this.results = [];
    }

    BufferColorsScanner.prototype.scan = function() {
      var lastIndex, result;
      lastIndex = 0;
      while (result = this.scanner.search(this.buffer, lastIndex)) {
        this.results.push(result);
        if (this.results.length >= ColorsChunkSize) {
          this.flushColors();
        }
        lastIndex = result.lastIndex;
      }
      return this.flushColors();
    };

    BufferColorsScanner.prototype.flushColors = function() {
      emit('scan-buffer:colors-found', this.results);
      return this.results = [];
    };

    return BufferColorsScanner;

  })();

  module.exports = function(config) {
    return new BufferColorsScanner(config).scan();
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL3Rhc2tzL3NjYW4tYnVmZmVyLWNvbG9ycy1oYW5kbGVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx1R0FBQTs7QUFBQSxFQUFBLFlBQUEsR0FBZSxPQUFBLENBQVEsa0JBQVIsQ0FBZixDQUFBOztBQUFBLEVBQ0EsWUFBQSxHQUFlLE9BQUEsQ0FBUSxrQkFBUixDQURmLENBQUE7O0FBQUEsRUFFQyxjQUFlLE9BQUEsQ0FBUSxzQkFBUixFQUFmLFdBRkQsQ0FBQTs7QUFBQSxFQUdDLDJCQUE0QixPQUFBLENBQVEsVUFBUixFQUE1Qix3QkFIRCxDQUFBOztBQUFBLEVBSUEsZUFBQSxHQUFrQixHQUpsQixDQUFBOztBQUFBLEVBTU07QUFDUyxJQUFBLDZCQUFDLE1BQUQsR0FBQTtBQUNYLFVBQUEscUNBQUE7QUFBQSxNQUFDLElBQUMsQ0FBQSxnQkFBQSxNQUFGLEVBQVUsbUJBQUEsU0FBVixFQUFxQix3QkFBQSxjQUFyQixFQUFxQyxvQkFBQSxVQUFyQyxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsT0FBRCxHQUFlLElBQUEsWUFBQSxDQUFhO0FBQUEsUUFBQyxXQUFBLFNBQUQ7QUFBQSxRQUFZLGdCQUFBLGNBQVo7QUFBQSxRQUE0QixhQUFBLEVBQWUsVUFBM0M7T0FBYixDQURmLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxPQUFELEdBQWUsSUFBQSxZQUFBLENBQWE7QUFBQSxRQUFFLFNBQUQsSUFBQyxDQUFBLE9BQUY7T0FBYixDQUZmLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxPQUFELEdBQVcsRUFIWCxDQURXO0lBQUEsQ0FBYjs7QUFBQSxrQ0FNQSxJQUFBLEdBQU0sU0FBQSxHQUFBO0FBQ0osVUFBQSxpQkFBQTtBQUFBLE1BQUEsU0FBQSxHQUFZLENBQVosQ0FBQTtBQUNBLGFBQU0sTUFBQSxHQUFTLElBQUMsQ0FBQSxPQUFPLENBQUMsTUFBVCxDQUFnQixJQUFDLENBQUEsTUFBakIsRUFBeUIsU0FBekIsQ0FBZixHQUFBO0FBQ0UsUUFBQSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxNQUFkLENBQUEsQ0FBQTtBQUVBLFFBQUEsSUFBa0IsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULElBQW1CLGVBQXJDO0FBQUEsVUFBQSxJQUFDLENBQUEsV0FBRCxDQUFBLENBQUEsQ0FBQTtTQUZBO0FBQUEsUUFHQyxZQUFhLE9BQWIsU0FIRCxDQURGO01BQUEsQ0FEQTthQU9BLElBQUMsQ0FBQSxXQUFELENBQUEsRUFSSTtJQUFBLENBTk4sQ0FBQTs7QUFBQSxrQ0FnQkEsV0FBQSxHQUFhLFNBQUEsR0FBQTtBQUNYLE1BQUEsSUFBQSxDQUFLLDBCQUFMLEVBQWlDLElBQUMsQ0FBQSxPQUFsQyxDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsT0FBRCxHQUFXLEdBRkE7SUFBQSxDQWhCYixDQUFBOzsrQkFBQTs7TUFQRixDQUFBOztBQUFBLEVBMkJBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsTUFBRCxHQUFBO1dBQ1gsSUFBQSxtQkFBQSxDQUFvQixNQUFwQixDQUEyQixDQUFDLElBQTVCLENBQUEsRUFEVztFQUFBLENBM0JqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/cm/.atom/packages/pigments/lib/tasks/scan-buffer-colors-handler.coffee
