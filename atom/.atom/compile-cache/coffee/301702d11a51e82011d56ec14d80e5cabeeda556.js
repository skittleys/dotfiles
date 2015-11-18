(function() {
  var Color, ColorContext, ColorExpression, ColorParser, getRegistry;

  Color = require('./color');

  ColorExpression = require('./color-expression');

  ColorContext = null;

  getRegistry = require('./color-expressions').getRegistry;

  module.exports = ColorParser = (function() {
    function ColorParser() {}

    ColorParser.prototype.parse = function(expression, context) {
      var e, registry, res, _i, _len, _ref;
      if (context == null) {
        if (ColorContext == null) {
          ColorContext = require('./color-context');
        }
        context = new ColorContext;
      }
      if (context.parser == null) {
        context.parser = this;
      }
      if ((expression == null) || expression === '') {
        return void 0;
      }
      registry = getRegistry(context);
      _ref = registry.getExpressions();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        if (e.match(expression)) {
          res = e.parse(expression, context);
          res.variables = context.readUsedVariables();
          return res;
        }
      }
      return void 0;
    };

    return ColorParser;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL2NvbG9yLXBhcnNlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFDQTtBQUFBLE1BQUEsOERBQUE7O0FBQUEsRUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLFNBQVIsQ0FBUixDQUFBOztBQUFBLEVBQ0EsZUFBQSxHQUFrQixPQUFBLENBQVEsb0JBQVIsQ0FEbEIsQ0FBQTs7QUFBQSxFQUVBLFlBQUEsR0FBZSxJQUZmLENBQUE7O0FBQUEsRUFJQyxjQUFlLE9BQUEsQ0FBUSxxQkFBUixFQUFmLFdBSkQsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDUyxJQUFBLHFCQUFBLEdBQUEsQ0FBYjs7QUFBQSwwQkFFQSxLQUFBLEdBQU8sU0FBQyxVQUFELEVBQWEsT0FBYixHQUFBO0FBQ0wsVUFBQSxnQ0FBQTtBQUFBLE1BQUEsSUFBTyxlQUFQOztVQUNFLGVBQWdCLE9BQUEsQ0FBUSxpQkFBUjtTQUFoQjtBQUFBLFFBQ0EsT0FBQSxHQUFVLEdBQUEsQ0FBQSxZQURWLENBREY7T0FBQTs7UUFHQSxPQUFPLENBQUMsU0FBVTtPQUhsQjtBQUtBLE1BQUEsSUFBd0Isb0JBQUosSUFBbUIsVUFBQSxLQUFjLEVBQXJEO0FBQUEsZUFBTyxNQUFQLENBQUE7T0FMQTtBQUFBLE1BT0EsUUFBQSxHQUFXLFdBQUEsQ0FBWSxPQUFaLENBUFgsQ0FBQTtBQVNBO0FBQUEsV0FBQSwyQ0FBQTtxQkFBQTtBQUNFLFFBQUEsSUFBRyxDQUFDLENBQUMsS0FBRixDQUFRLFVBQVIsQ0FBSDtBQUNFLFVBQUEsR0FBQSxHQUFNLENBQUMsQ0FBQyxLQUFGLENBQVEsVUFBUixFQUFvQixPQUFwQixDQUFOLENBQUE7QUFBQSxVQUNBLEdBQUcsQ0FBQyxTQUFKLEdBQWdCLE9BQU8sQ0FBQyxpQkFBUixDQUFBLENBRGhCLENBQUE7QUFFQSxpQkFBTyxHQUFQLENBSEY7U0FERjtBQUFBLE9BVEE7QUFlQSxhQUFPLE1BQVAsQ0FoQks7SUFBQSxDQUZQLENBQUE7O3VCQUFBOztNQVJGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/cm/.atom/packages/pigments/lib/color-parser.coffee
