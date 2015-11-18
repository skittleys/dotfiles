(function() {
  var Color, ColorExpression;

  Color = require('./color');

  module.exports = ColorExpression = (function() {
    function ColorExpression(_arg) {
      this.name = _arg.name, this.regexpString = _arg.regexpString, this.handle = _arg.handle;
      this.regexp = new RegExp("^" + this.regexpString + "$");
    }

    ColorExpression.prototype.match = function(expression) {
      return this.regexp.test(expression);
    };

    ColorExpression.prototype.parse = function(expression, context) {
      var color;
      if (!this.match(expression)) {
        return null;
      }
      color = new Color();
      color.colorExpression = expression;
      this.handle.call(color, this.regexp.exec(expression), expression, context);
      return color;
    };

    ColorExpression.prototype.search = function(text, start) {
      var lastIndex, match, range, re, results, _ref;
      if (start == null) {
        start = 0;
      }
      results = void 0;
      re = new RegExp(this.regexpString, 'g');
      re.lastIndex = start;
      if (_ref = re.exec(text), match = _ref[0], _ref) {
        lastIndex = re.lastIndex;
        range = [lastIndex - match.length, lastIndex];
        results = {
          range: range,
          match: text.slice(range[0], range[1])
        };
      }
      return results;
    };

    return ColorExpression;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL2NvbG9yLWV4cHJlc3Npb24uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNCQUFBOztBQUFBLEVBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxTQUFSLENBQVIsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDUyxJQUFBLHlCQUFDLElBQUQsR0FBQTtBQUNYLE1BRGEsSUFBQyxDQUFBLFlBQUEsTUFBTSxJQUFDLENBQUEsb0JBQUEsY0FBYyxJQUFDLENBQUEsY0FBQSxNQUNwQyxDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsTUFBRCxHQUFjLElBQUEsTUFBQSxDQUFRLEdBQUEsR0FBRyxJQUFDLENBQUEsWUFBSixHQUFpQixHQUF6QixDQUFkLENBRFc7SUFBQSxDQUFiOztBQUFBLDhCQUdBLEtBQUEsR0FBTyxTQUFDLFVBQUQsR0FBQTthQUFnQixJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBYSxVQUFiLEVBQWhCO0lBQUEsQ0FIUCxDQUFBOztBQUFBLDhCQUtBLEtBQUEsR0FBTyxTQUFDLFVBQUQsRUFBYSxPQUFiLEdBQUE7QUFDTCxVQUFBLEtBQUE7QUFBQSxNQUFBLElBQUEsQ0FBQSxJQUFvQixDQUFBLEtBQUQsQ0FBTyxVQUFQLENBQW5CO0FBQUEsZUFBTyxJQUFQLENBQUE7T0FBQTtBQUFBLE1BRUEsS0FBQSxHQUFZLElBQUEsS0FBQSxDQUFBLENBRlosQ0FBQTtBQUFBLE1BR0EsS0FBSyxDQUFDLGVBQU4sR0FBd0IsVUFIeEIsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQWEsS0FBYixFQUFvQixJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBYSxVQUFiLENBQXBCLEVBQThDLFVBQTlDLEVBQTBELE9BQTFELENBSkEsQ0FBQTthQUtBLE1BTks7SUFBQSxDQUxQLENBQUE7O0FBQUEsOEJBYUEsTUFBQSxHQUFRLFNBQUMsSUFBRCxFQUFPLEtBQVAsR0FBQTtBQUNOLFVBQUEsMENBQUE7O1FBRGEsUUFBTTtPQUNuQjtBQUFBLE1BQUEsT0FBQSxHQUFVLE1BQVYsQ0FBQTtBQUFBLE1BQ0EsRUFBQSxHQUFTLElBQUEsTUFBQSxDQUFPLElBQUMsQ0FBQSxZQUFSLEVBQXNCLEdBQXRCLENBRFQsQ0FBQTtBQUFBLE1BRUEsRUFBRSxDQUFDLFNBQUgsR0FBZSxLQUZmLENBQUE7QUFHQSxNQUFBLElBQUcsT0FBVSxFQUFFLENBQUMsSUFBSCxDQUFRLElBQVIsQ0FBVixFQUFDLGVBQUQsRUFBQSxJQUFIO0FBQ0UsUUFBQyxZQUFhLEdBQWIsU0FBRCxDQUFBO0FBQUEsUUFDQSxLQUFBLEdBQVEsQ0FBQyxTQUFBLEdBQVksS0FBSyxDQUFDLE1BQW5CLEVBQTJCLFNBQTNCLENBRFIsQ0FBQTtBQUFBLFFBRUEsT0FBQSxHQUNFO0FBQUEsVUFBQSxLQUFBLEVBQU8sS0FBUDtBQUFBLFVBQ0EsS0FBQSxFQUFPLElBQUssMEJBRFo7U0FIRixDQURGO09BSEE7YUFVQSxRQVhNO0lBQUEsQ0FiUixDQUFBOzsyQkFBQTs7TUFKRixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/cm/.atom/packages/pigments/lib/color-expression.coffee
