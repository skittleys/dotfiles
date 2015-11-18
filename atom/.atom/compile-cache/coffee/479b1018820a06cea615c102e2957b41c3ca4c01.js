(function() {
  var ExpressionsRegistry, VariableExpression, registry, strip;

  strip = require('./utils').strip;

  ExpressionsRegistry = require('./expressions-registry');

  VariableExpression = require('./variable-expression');

  module.exports = registry = new ExpressionsRegistry(VariableExpression);

  registry.createExpression('less', '^[ \\t]*(@[a-zA-Z0-9\\-_]+)\\s*:\\s*([^;\\n]+);?');

  registry.createExpression('scss_params', '^[ \\t]*@(mixin|include|function)\\s+[a-zA-Z0-9\\-_]+\\s*\\([^\\)]+\\)', function(match, solver) {
    match = match[0];
    return solver.endParsing(match.length - 1);
  });

  registry.createExpression('scss', '^[ \\t]*(\\$[a-zA-Z0-9\\-_]+)\\s*:\\s*(.*?)(\\s*!default)?;');

  registry.createExpression('sass', '^[ \\t]*(\\$[a-zA-Z0-9\\-_]+):\\s*([^\\{]*?)(\\s*!default)?$');

  registry.createExpression('stylus_hash', '^[ \\t]*([a-zA-Z_$][a-zA-Z0-9\\-_]*)\\s*=\\s*\\{([^=]*)\\}', function(match, solver) {
    var buffer, char, commaSensitiveBegin, commaSensitiveEnd, content, current, inCommaSensitiveContext, key, name, scope, scopeBegin, scopeEnd, value, _i, _len, _ref, _ref1;
    buffer = '';
    _ref = match, match = _ref[0], name = _ref[1], content = _ref[2];
    current = match.indexOf(content);
    scope = [name];
    scopeBegin = /\{/;
    scopeEnd = /\}/;
    commaSensitiveBegin = /\(|\[/;
    commaSensitiveEnd = /\)|\]/;
    inCommaSensitiveContext = false;
    for (_i = 0, _len = content.length; _i < _len; _i++) {
      char = content[_i];
      if (scopeBegin.test(char)) {
        scope.push(buffer.replace(/[\s:]/g, ''));
        buffer = '';
      } else if (scopeEnd.test(char)) {
        scope.pop();
        if (scope.length === 0) {
          return solver.endParsing(current);
        }
      } else if (commaSensitiveBegin.test(char)) {
        buffer += char;
        inCommaSensitiveContext = true;
      } else if (inCommaSensitiveContext) {
        buffer += char;
        inCommaSensitiveContext = !commaSensitiveEnd.test(char);
      } else if (/[,\n]/.test(char)) {
        buffer = strip(buffer);
        if (buffer.length) {
          _ref1 = buffer.split(/\s*:\s*/), key = _ref1[0], value = _ref1[1];
          solver.appendResult([scope.concat(key).join('.'), value, current - buffer.length - 1, current]);
        }
        buffer = '';
      } else {
        buffer += char;
      }
      current++;
    }
    scope.pop();
    if (scope.length === 0) {
      return solver.endParsing(current + 1);
    } else {
      return solver.abortParsing();
    }
  });

  registry.createExpression('stylus', '^[ \\t]*([a-zA-Z_$][a-zA-Z0-9\\-_]*)\\s*=(?!=)\\s*([^\\n;]*);?$');

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL3ZhcmlhYmxlLWV4cHJlc3Npb25zLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx3REFBQTs7QUFBQSxFQUFDLFFBQVMsT0FBQSxDQUFRLFNBQVIsRUFBVCxLQUFELENBQUE7O0FBQUEsRUFDQSxtQkFBQSxHQUFzQixPQUFBLENBQVEsd0JBQVIsQ0FEdEIsQ0FBQTs7QUFBQSxFQUVBLGtCQUFBLEdBQXFCLE9BQUEsQ0FBUSx1QkFBUixDQUZyQixDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsUUFBQSxHQUFlLElBQUEsbUJBQUEsQ0FBb0Isa0JBQXBCLENBSmhDLENBQUE7O0FBQUEsRUFNQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsTUFBMUIsRUFBa0Msa0RBQWxDLENBTkEsQ0FBQTs7QUFBQSxFQVNBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixhQUExQixFQUF5Qyx3RUFBekMsRUFBbUgsU0FBQyxLQUFELEVBQVEsTUFBUixHQUFBO0FBQ2pILElBQUMsUUFBUyxRQUFWLENBQUE7V0FDQSxNQUFNLENBQUMsVUFBUCxDQUFrQixLQUFLLENBQUMsTUFBTixHQUFlLENBQWpDLEVBRmlIO0VBQUEsQ0FBbkgsQ0FUQSxDQUFBOztBQUFBLEVBYUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLE1BQTFCLEVBQWtDLDZEQUFsQyxDQWJBLENBQUE7O0FBQUEsRUFlQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsTUFBMUIsRUFBa0MsOERBQWxDLENBZkEsQ0FBQTs7QUFBQSxFQWlCQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsYUFBMUIsRUFBeUMsNERBQXpDLEVBQXVHLFNBQUMsS0FBRCxFQUFRLE1BQVIsR0FBQTtBQUNyRyxRQUFBLHFLQUFBO0FBQUEsSUFB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

//# sourceURL=/home/cm/.atom/packages/pigments/lib/variable-expressions.coffee
