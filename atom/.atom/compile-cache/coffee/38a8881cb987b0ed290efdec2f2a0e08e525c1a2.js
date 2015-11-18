(function() {
  var ColorExpression, ExpressionsRegistry;

  ColorExpression = require('./color-expression');

  module.exports = ExpressionsRegistry = (function() {
    function ExpressionsRegistry(expressionsType) {
      this.expressionsType = expressionsType;
      this.colorExpressions = {};
    }

    ExpressionsRegistry.prototype.getExpressions = function() {
      var e, k;
      return ((function() {
        var _ref, _results;
        _ref = this.colorExpressions;
        _results = [];
        for (k in _ref) {
          e = _ref[k];
          _results.push(e);
        }
        return _results;
      }).call(this)).sort(function(a, b) {
        return b.priority - a.priority;
      });
    };

    ExpressionsRegistry.prototype.getExpression = function(name) {
      return this.colorExpressions[name];
    };

    ExpressionsRegistry.prototype.getRegExp = function() {
      return this.getExpressions().map(function(e) {
        return "(" + e.regexpString + ")";
      }).join('|');
    };

    ExpressionsRegistry.prototype.createExpression = function(name, regexpString, priority, handle) {
      var newExpression, _ref;
      if (priority == null) {
        priority = 0;
      }
      if (typeof priority === 'function') {
        _ref = [0, priority], priority = _ref[0], handle = _ref[1];
      }
      newExpression = new this.expressionsType({
        name: name,
        regexpString: regexpString,
        handle: handle
      });
      newExpression.priority = priority;
      return this.addExpression(newExpression);
    };

    ExpressionsRegistry.prototype.addExpression = function(expression) {
      return this.colorExpressions[expression.name] = expression;
    };

    ExpressionsRegistry.prototype.removeExpression = function(name) {
      return delete this.colorExpressions[name];
    };

    return ExpressionsRegistry;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL2V4cHJlc3Npb25zLXJlZ2lzdHJ5LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxvQ0FBQTs7QUFBQSxFQUFBLGVBQUEsR0FBa0IsT0FBQSxDQUFRLG9CQUFSLENBQWxCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRVMsSUFBQSw2QkFBRSxlQUFGLEdBQUE7QUFDWCxNQURZLElBQUMsQ0FBQSxrQkFBQSxlQUNiLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxnQkFBRCxHQUFvQixFQUFwQixDQURXO0lBQUEsQ0FBYjs7QUFBQSxrQ0FHQSxjQUFBLEdBQWdCLFNBQUEsR0FBQTtBQUNkLFVBQUEsSUFBQTthQUFBOztBQUFDO0FBQUE7YUFBQSxTQUFBO3NCQUFBO0FBQUEsd0JBQUEsRUFBQSxDQUFBO0FBQUE7O21CQUFELENBQWdDLENBQUMsSUFBakMsQ0FBc0MsU0FBQyxDQUFELEVBQUcsQ0FBSCxHQUFBO2VBQVMsQ0FBQyxDQUFDLFFBQUYsR0FBYSxDQUFDLENBQUMsU0FBeEI7TUFBQSxDQUF0QyxFQURjO0lBQUEsQ0FIaEIsQ0FBQTs7QUFBQSxrQ0FNQSxhQUFBLEdBQWUsU0FBQyxJQUFELEdBQUE7YUFBVSxJQUFDLENBQUEsZ0JBQWlCLENBQUEsSUFBQSxFQUE1QjtJQUFBLENBTmYsQ0FBQTs7QUFBQSxrQ0FRQSxTQUFBLEdBQVcsU0FBQSxHQUFBO2FBQ1QsSUFBQyxDQUFBLGNBQUQsQ0FBQSxDQUFpQixDQUFDLEdBQWxCLENBQXNCLFNBQUMsQ0FBRCxHQUFBO2VBQVEsR0FBQSxHQUFHLENBQUMsQ0FBQyxZQUFMLEdBQWtCLElBQTFCO01BQUEsQ0FBdEIsQ0FBbUQsQ0FBQyxJQUFwRCxDQUF5RCxHQUF6RCxFQURTO0lBQUEsQ0FSWCxDQUFBOztBQUFBLGtDQVdBLGdCQUFBLEdBQWtCLFNBQUMsSUFBRCxFQUFPLFlBQVAsRUFBcUIsUUFBckIsRUFBaUMsTUFBakMsR0FBQTtBQUNoQixVQUFBLG1CQUFBOztRQURxQyxXQUFTO09BQzlDO0FBQUEsTUFBQSxJQUFzQyxNQUFBLENBQUEsUUFBQSxLQUFtQixVQUF6RDtBQUFBLFFBQUEsT0FBcUIsQ0FBQyxDQUFELEVBQUksUUFBSixDQUFyQixFQUFDLGtCQUFELEVBQVcsZ0JBQVgsQ0FBQTtPQUFBO0FBQUEsTUFDQSxhQUFBLEdBQW9CLElBQUEsSUFBQyxDQUFBLGVBQUQsQ0FBaUI7QUFBQSxRQUFDLE1BQUEsSUFBRDtBQUFBLFFBQU8sY0FBQSxZQUFQO0FBQUEsUUFBcUIsUUFBQSxNQUFyQjtPQUFqQixDQURwQixDQUFBO0FBQUEsTUFFQSxhQUFhLENBQUMsUUFBZCxHQUF5QixRQUZ6QixDQUFBO2FBR0EsSUFBQyxDQUFBLGFBQUQsQ0FBZSxhQUFmLEVBSmdCO0lBQUEsQ0FYbEIsQ0FBQTs7QUFBQSxrQ0FpQkEsYUFBQSxHQUFlLFNBQUMsVUFBRCxHQUFBO2FBQ2IsSUFBQyxDQUFBLGdCQUFpQixDQUFBLFVBQVUsQ0FBQyxJQUFYLENBQWxCLEdBQXFDLFdBRHhCO0lBQUEsQ0FqQmYsQ0FBQTs7QUFBQSxrQ0FvQkEsZ0JBQUEsR0FBa0IsU0FBQyxJQUFELEdBQUE7YUFBVSxNQUFBLENBQUEsSUFBUSxDQUFBLGdCQUFpQixDQUFBLElBQUEsRUFBbkM7SUFBQSxDQXBCbEIsQ0FBQTs7K0JBQUE7O01BTEYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/cm/.atom/packages/pigments/lib/expressions-registry.coffee
