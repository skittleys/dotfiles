(function() {
  var VariableExpression;

  module.exports = VariableExpression = (function() {
    VariableExpression.DEFAULT_HANDLE = function(match, solver) {
      var end, name, start, value, _;
      _ = match[0], name = match[1], value = match[2];
      start = _.indexOf(name);
      end = _.indexOf(value) + value.length;
      solver.appendResult([name, value, start, end]);
      return solver.endParsing(end);
    };

    function VariableExpression(_arg) {
      this.name = _arg.name, this.regexpString = _arg.regexpString, this.handle = _arg.handle;
      this.regexp = new RegExp("" + this.regexpString, 'm');
      if (this.handle == null) {
        this.handle = this.constructor.DEFAULT_HANDLE;
      }
    }

    VariableExpression.prototype.match = function(expression) {
      return this.regexp.test(expression);
    };

    VariableExpression.prototype.parse = function(expression) {
      var lastIndex, match, matchText, parsingAborted, results, solver, startIndex;
      parsingAborted = false;
      results = [];
      match = this.regexp.exec(expression);
      if (match != null) {
        matchText = match[0];
        lastIndex = this.regexp.lastIndex;
        startIndex = lastIndex - matchText.length;
        solver = {
          endParsing: function(end) {
            var start;
            start = expression.indexOf(matchText);
            results.lastIndex = end;
            results.range = [start, end];
            return results.match = matchText.slice(start, end);
          },
          abortParsing: function() {
            return parsingAborted = true;
          },
          appendResult: function(_arg) {
            var end, name, range, reName, start, value;
            name = _arg[0], value = _arg[1], start = _arg[2], end = _arg[3];
            range = [start, end];
            reName = name.replace('$', '\\$');
            if (!RegExp("" + reName + "(?![-_])").test(value)) {
              return results.push({
                name: name,
                value: value,
                range: range
              });
            }
          }
        };
        this.handle(match, solver);
      }
      if (parsingAborted) {
        return void 0;
      } else {
        return results;
      }
    };

    return VariableExpression;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL3ZhcmlhYmxlLWV4cHJlc3Npb24uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtCQUFBOztBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLElBQUEsa0JBQUMsQ0FBQSxjQUFELEdBQWlCLFNBQUMsS0FBRCxFQUFRLE1BQVIsR0FBQTtBQUNmLFVBQUEsMEJBQUE7QUFBQSxNQUFDLFlBQUQsRUFBSSxlQUFKLEVBQVUsZ0JBQVYsQ0FBQTtBQUFBLE1BQ0EsS0FBQSxHQUFRLENBQUMsQ0FBQyxPQUFGLENBQVUsSUFBVixDQURSLENBQUE7QUFBQSxNQUVBLEdBQUEsR0FBTSxDQUFDLENBQUMsT0FBRixDQUFVLEtBQVYsQ0FBQSxHQUFtQixLQUFLLENBQUMsTUFGL0IsQ0FBQTtBQUFBLE1BR0EsTUFBTSxDQUFDLFlBQVAsQ0FBb0IsQ0FBQyxJQUFELEVBQU8sS0FBUCxFQUFjLEtBQWQsRUFBcUIsR0FBckIsQ0FBcEIsQ0FIQSxDQUFBO2FBSUEsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsR0FBbEIsRUFMZTtJQUFBLENBQWpCLENBQUE7O0FBT2EsSUFBQSw0QkFBQyxJQUFELEdBQUE7QUFDWCxNQURhLElBQUMsQ0FBQSxZQUFBLE1BQU0sSUFBQyxDQUFBLG9CQUFBLGNBQWMsSUFBQyxDQUFBLGNBQUEsTUFDcEMsQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLE1BQUQsR0FBYyxJQUFBLE1BQUEsQ0FBTyxFQUFBLEdBQUcsSUFBQyxDQUFBLFlBQVgsRUFBMkIsR0FBM0IsQ0FBZCxDQUFBOztRQUNBLElBQUMsQ0FBQSxTQUFVLElBQUMsQ0FBQSxXQUFXLENBQUM7T0FGYjtJQUFBLENBUGI7O0FBQUEsaUNBV0EsS0FBQSxHQUFPLFNBQUMsVUFBRCxHQUFBO2FBQWdCLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLFVBQWIsRUFBaEI7SUFBQSxDQVhQLENBQUE7O0FBQUEsaUNBYUEsS0FBQSxHQUFPLFNBQUMsVUFBRCxHQUFBO0FBQ0wsVUFBQSx3RUFBQTtBQUFBLE1BQUEsY0FBQSxHQUFpQixLQUFqQixDQUFBO0FBQUEsTUFDQSxPQUFBLEdBQVUsRUFEVixDQUFBO0FBQUEsTUFHQSxLQUFBLEdBQVEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQWEsVUFBYixDQUhSLENBQUE7QUFJQSxNQUFBLElBQUcsYUFBSDtBQUVFLFFBQUMsWUFBYSxRQUFkLENBQUE7QUFBQSxRQUNDLFlBQWEsSUFBQyxDQUFBLE9BQWQsU0FERCxDQUFBO0FBQUEsUUFFQSxVQUFBLEdBQWEsU0FBQSxHQUFZLFNBQVMsQ0FBQyxNQUZuQyxDQUFBO0FBQUEsUUFJQSxNQUFBLEdBQ0U7QUFBQSxVQUFBLFVBQUEsRUFBWSxTQUFDLEdBQUQsR0FBQTtBQUNWLGdCQUFBLEtBQUE7QUFBQSxZQUFBLEtBQUEsR0FBUSxVQUFVLENBQUMsT0FBWCxDQUFtQixTQUFuQixDQUFSLENBQUE7QUFBQSxZQUNBLE9BQU8sQ0FBQyxTQUFSLEdBQW9CLEdBRHBCLENBQUE7QUFBQSxZQUVBLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLENBQUMsS0FBRCxFQUFPLEdBQVAsQ0FGaEIsQ0FBQTttQkFHQSxPQUFPLENBQUMsS0FBUixHQUFnQixTQUFVLG1CQUpoQjtVQUFBLENBQVo7QUFBQSxVQUtBLFlBQUEsRUFBYyxTQUFBLEdBQUE7bUJBQ1osY0FBQSxHQUFpQixLQURMO1VBQUEsQ0FMZDtBQUFBLFVBT0EsWUFBQSxFQUFjLFNBQUMsSUFBRCxHQUFBO0FBQ1osZ0JBQUEsc0NBQUE7QUFBQSxZQURjLGdCQUFNLGlCQUFPLGlCQUFPLGFBQ2xDLENBQUE7QUFBQSxZQUFBLEtBQUEsR0FBUSxDQUFDLEtBQUQsRUFBUSxHQUFSLENBQVIsQ0FBQTtBQUFBLFlBQ0EsTUFBQSxHQUFTLElBQUksQ0FBQyxPQUFMLENBQWEsR0FBYixFQUFrQixLQUFsQixDQURULENBQUE7QUFFQSxZQUFBLElBQUEsQ0FBQSxNQUFPLENBQUEsRUFBQSxHQUFLLE1BQUwsR0FBWSxVQUFaLENBQXVCLENBQUMsSUFBeEIsQ0FBNkIsS0FBN0IsQ0FBUDtxQkFDRSxPQUFPLENBQUMsSUFBUixDQUFhO0FBQUEsZ0JBQUMsTUFBQSxJQUFEO0FBQUEsZ0JBQU8sT0FBQSxLQUFQO0FBQUEsZ0JBQWMsT0FBQSxLQUFkO2VBQWIsRUFERjthQUhZO1VBQUEsQ0FQZDtTQUxGLENBQUE7QUFBQSxRQWtCQSxJQUFDLENBQUEsTUFBRCxDQUFRLEtBQVIsRUFBZSxNQUFmLENBbEJBLENBRkY7T0FKQTtBQTBCQSxNQUFBLElBQUcsY0FBSDtlQUF1QixPQUF2QjtPQUFBLE1BQUE7ZUFBc0MsUUFBdEM7T0EzQks7SUFBQSxDQWJQLENBQUE7OzhCQUFBOztNQUZGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/cm/.atom/packages/pigments/lib/variable-expression.coffee
