(function() {
  var ColorParser, ColorScanner, countLines, getRegistry;

  countLines = require('./utils').countLines;

  getRegistry = require('./color-expressions').getRegistry;

  ColorParser = require('./color-parser');

  module.exports = ColorScanner = (function() {
    function ColorScanner(params) {
      if (params == null) {
        params = {};
      }
      this.parser = params.parser, this.context = params.context;
      if (this.parser == null) {
        this.parser = new ColorParser;
      }
    }

    ColorScanner.prototype.getRegExp = function() {
      var registry;
      registry = getRegistry(this.context);
      return this.regexp = new RegExp(registry.getRegExp(), 'g');
    };

    ColorScanner.prototype.search = function(text, start) {
      var color, index, lastIndex, match, matchText;
      if (start == null) {
        start = 0;
      }
      this.regexp = this.getRegExp();
      this.regexp.lastIndex = start;
      if (match = this.regexp.exec(text)) {
        matchText = match[0];
        lastIndex = this.regexp.lastIndex;
        color = this.parser.parse(matchText, this.context);
        if ((index = matchText.indexOf(color.colorExpression)) > 0) {
          lastIndex += -matchText.length + index + color.colorExpression.length;
          matchText = color.colorExpression;
        }
        return {
          color: color,
          match: matchText,
          lastIndex: lastIndex,
          range: [lastIndex - matchText.length, lastIndex],
          line: countLines(text.slice(0, +(lastIndex - matchText.length) + 1 || 9e9)) - 1
        };
      }
    };

    return ColorScanner;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL2NvbG9yLXNjYW5uZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtEQUFBOztBQUFBLEVBQUMsYUFBYyxPQUFBLENBQVEsU0FBUixFQUFkLFVBQUQsQ0FBQTs7QUFBQSxFQUNDLGNBQWUsT0FBQSxDQUFRLHFCQUFSLEVBQWYsV0FERCxDQUFBOztBQUFBLEVBRUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUZkLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ1MsSUFBQSxzQkFBQyxNQUFELEdBQUE7O1FBQUMsU0FBTztPQUNuQjtBQUFBLE1BQUMsSUFBQyxDQUFBLGdCQUFBLE1BQUYsRUFBVSxJQUFDLENBQUEsaUJBQUEsT0FBWCxDQUFBOztRQUNBLElBQUMsQ0FBQSxTQUFVLEdBQUEsQ0FBQTtPQUZBO0lBQUEsQ0FBYjs7QUFBQSwyQkFJQSxTQUFBLEdBQVcsU0FBQSxHQUFBO0FBQ1QsVUFBQSxRQUFBO0FBQUEsTUFBQSxRQUFBLEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxPQUFiLENBQVgsQ0FBQTthQUVBLElBQUMsQ0FBQSxNQUFELEdBQWMsSUFBQSxNQUFBLENBQU8sUUFBUSxDQUFDLFNBQVQsQ0FBQSxDQUFQLEVBQTZCLEdBQTdCLEVBSEw7SUFBQSxDQUpYLENBQUE7O0FBQUEsMkJBU0EsTUFBQSxHQUFRLFNBQUMsSUFBRCxFQUFPLEtBQVAsR0FBQTtBQUNOLFVBQUEseUNBQUE7O1FBRGEsUUFBTTtPQUNuQjtBQUFBLE1BQUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEsU0FBRCxDQUFBLENBQVYsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFSLEdBQW9CLEtBRHBCLENBQUE7QUFHQSxNQUFBLElBQUcsS0FBQSxHQUFRLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWDtBQUNFLFFBQUMsWUFBYSxRQUFkLENBQUE7QUFBQSxRQUNDLFlBQWEsSUFBQyxDQUFBLE9BQWQsU0FERCxDQUFBO0FBQUEsUUFHQSxLQUFBLEdBQVEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFSLENBQWMsU0FBZCxFQUF5QixJQUFDLENBQUEsT0FBMUIsQ0FIUixDQUFBO0FBS0EsUUFBQSxJQUFHLENBQUMsS0FBQSxHQUFRLFNBQVMsQ0FBQyxPQUFWLENBQWtCLEtBQUssQ0FBQyxlQUF4QixDQUFULENBQUEsR0FBcUQsQ0FBeEQ7QUFDRSxVQUFBLFNBQUEsSUFBYSxDQUFBLFNBQVUsQ0FBQyxNQUFYLEdBQW9CLEtBQXBCLEdBQTRCLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBL0QsQ0FBQTtBQUFBLFVBQ0EsU0FBQSxHQUFZLEtBQUssQ0FBQyxlQURsQixDQURGO1NBTEE7ZUFTQTtBQUFBLFVBQUEsS0FBQSxFQUFPLEtBQVA7QUFBQSxVQUNBLEtBQUEsRUFBTyxTQURQO0FBQUEsVUFFQSxTQUFBLEVBQVcsU0FGWDtBQUFBLFVBR0EsS0FBQSxFQUFPLENBQ0wsU0FBQSxHQUFZLFNBQVMsQ0FBQyxNQURqQixFQUVMLFNBRkssQ0FIUDtBQUFBLFVBT0EsSUFBQSxFQUFNLFVBQUEsQ0FBVyxJQUFLLHFEQUFoQixDQUFBLEdBQW9ELENBUDFEO1VBVkY7T0FKTTtJQUFBLENBVFIsQ0FBQTs7d0JBQUE7O01BTkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/cm/.atom/packages/pigments/lib/color-scanner.coffee
