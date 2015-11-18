(function() {
  var VariableParser, VariableScanner, countLines, regexp, regexpString, registry, _ref;

  countLines = require('./utils').countLines;

  VariableParser = require('./variable-parser');

  _ref = [], registry = _ref[0], regexpString = _ref[1], regexp = _ref[2];

  module.exports = VariableScanner = (function() {
    function VariableScanner(params) {
      if (params == null) {
        params = {};
      }
      this.parser = params.parser;
      if (this.parser == null) {
        this.parser = new VariableParser;
      }
    }

    VariableScanner.prototype.getRegExp = function() {
      if (registry == null) {
        registry = require('./variable-expressions');
      }
      if (regexpString == null) {
        regexpString = registry.getRegExp();
      }
      return regexp != null ? regexp : regexp = new RegExp(regexpString, 'gm');
    };

    VariableScanner.prototype.search = function(text, start) {
      var index, lastIndex, line, lineCountIndex, match, matchText, result, v, _i, _len;
      if (start == null) {
        start = 0;
      }
      regexp = this.getRegExp();
      regexp.lastIndex = start;
      while (match = regexp.exec(text)) {
        matchText = match[0];
        index = match.index;
        lastIndex = regexp.lastIndex;
        result = this.parser.parse(matchText);
        if (result != null) {
          result.lastIndex += index;
          if (result.length > 0) {
            result.range[0] += index;
            result.range[1] += index;
            line = -1;
            lineCountIndex = 0;
            for (_i = 0, _len = result.length; _i < _len; _i++) {
              v = result[_i];
              v.range[0] += index;
              v.range[1] += index;
              line = v.line = line + countLines(text.slice(lineCountIndex, +v.range[0] + 1 || 9e9));
              lineCountIndex = v.range[0];
            }
            return result;
          } else {
            regexp.lastIndex = result.lastIndex;
          }
        }
      }
      return void 0;
    };

    return VariableScanner;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL3ZhcmlhYmxlLXNjYW5uZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGlGQUFBOztBQUFBLEVBQUMsYUFBYyxPQUFBLENBQVEsU0FBUixFQUFkLFVBQUQsQ0FBQTs7QUFBQSxFQUNBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLG1CQUFSLENBRGpCLENBQUE7O0FBQUEsRUFFQSxPQUFtQyxFQUFuQyxFQUFDLGtCQUFELEVBQVcsc0JBQVgsRUFBeUIsZ0JBRnpCLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ1MsSUFBQSx5QkFBQyxNQUFELEdBQUE7O1FBQUMsU0FBTztPQUNuQjtBQUFBLE1BQUMsSUFBQyxDQUFBLFNBQVUsT0FBVixNQUFGLENBQUE7O1FBQ0EsSUFBQyxDQUFBLFNBQVUsR0FBQSxDQUFBO09BRkE7SUFBQSxDQUFiOztBQUFBLDhCQUlBLFNBQUEsR0FBVyxTQUFBLEdBQUE7O1FBQ1QsV0FBWSxPQUFBLENBQVEsd0JBQVI7T0FBWjs7UUFDQSxlQUFnQixRQUFRLENBQUMsU0FBVCxDQUFBO09BRGhCOzhCQUdBLFNBQUEsU0FBYyxJQUFBLE1BQUEsQ0FBTyxZQUFQLEVBQXFCLElBQXJCLEVBSkw7SUFBQSxDQUpYLENBQUE7O0FBQUEsOEJBVUEsTUFBQSxHQUFRLFNBQUMsSUFBRCxFQUFPLEtBQVAsR0FBQTtBQUNOLFVBQUEsNkVBQUE7O1FBRGEsUUFBTTtPQUNuQjtBQUFBLE1BQUEsTUFBQSxHQUFTLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBVCxDQUFBO0FBQUEsTUFDQSxNQUFNLENBQUMsU0FBUCxHQUFtQixLQURuQixDQUFBO0FBR0EsYUFBTSxLQUFBLEdBQVEsTUFBTSxDQUFDLElBQVAsQ0FBWSxJQUFaLENBQWQsR0FBQTtBQUNFLFFBQUMsWUFBYSxRQUFkLENBQUE7QUFBQSxRQUNDLFFBQVMsTUFBVCxLQURELENBQUE7QUFBQSxRQUVDLFlBQWEsT0FBYixTQUZELENBQUE7QUFBQSxRQUlBLE1BQUEsR0FBUyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQVIsQ0FBYyxTQUFkLENBSlQsQ0FBQTtBQU1BLFFBQUEsSUFBRyxjQUFIO0FBQ0UsVUFBQSxNQUFNLENBQUMsU0FBUCxJQUFvQixLQUFwQixDQUFBO0FBRUEsVUFBQSxJQUFHLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLENBQW5CO0FBQ0UsWUFBQSxNQUFNLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBYixJQUFtQixLQUFuQixDQUFBO0FBQUEsWUFDQSxNQUFNLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBYixJQUFtQixLQURuQixDQUFBO0FBQUEsWUFHQSxJQUFBLEdBQU8sQ0FBQSxDQUhQLENBQUE7QUFBQSxZQUlBLGNBQUEsR0FBaUIsQ0FKakIsQ0FBQTtBQU1BLGlCQUFBLDZDQUFBOzZCQUFBO0FBQ0UsY0FBQSxDQUFDLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBUixJQUFjLEtBQWQsQ0FBQTtBQUFBLGNBQ0EsQ0FBQyxDQUFDLEtBQU0sQ0FBQSxDQUFBLENBQVIsSUFBYyxLQURkLENBQUE7QUFBQSxjQUVBLElBQUEsR0FBTyxDQUFDLENBQUMsSUFBRixHQUFTLElBQUEsR0FBTyxVQUFBLENBQVcsSUFBSyw4Q0FBaEIsQ0FGdkIsQ0FBQTtBQUFBLGNBR0EsY0FBQSxHQUFpQixDQUFDLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FIekIsQ0FERjtBQUFBLGFBTkE7QUFZQSxtQkFBTyxNQUFQLENBYkY7V0FBQSxNQUFBO0FBZUUsWUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQixNQUFNLENBQUMsU0FBMUIsQ0FmRjtXQUhGO1NBUEY7TUFBQSxDQUhBO0FBOEJBLGFBQU8sTUFBUCxDQS9CTTtJQUFBLENBVlIsQ0FBQTs7MkJBQUE7O01BTkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/cm/.atom/packages/pigments/lib/variable-scanner.coffee
