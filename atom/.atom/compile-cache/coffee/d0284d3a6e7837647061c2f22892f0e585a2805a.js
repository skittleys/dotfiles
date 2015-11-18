(function() {
  var VariableParser, registry;

  registry = require('./variable-expressions');

  module.exports = VariableParser = (function() {
    function VariableParser() {}

    VariableParser.prototype.parse = function(expression) {
      var e, _i, _len, _ref;
      _ref = registry.getExpressions();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        if (e.match(expression)) {
          return e.parse(expression);
        }
      }
    };

    return VariableParser;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL3ZhcmlhYmxlLXBhcnNlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFDQTtBQUFBLE1BQUEsd0JBQUE7O0FBQUEsRUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLHdCQUFSLENBQVgsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ007Z0NBQ0o7O0FBQUEsNkJBQUEsS0FBQSxHQUFPLFNBQUMsVUFBRCxHQUFBO0FBQ0wsVUFBQSxpQkFBQTtBQUFBO0FBQUEsV0FBQSwyQ0FBQTtxQkFBQTtBQUNFLFFBQUEsSUFBOEIsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxVQUFSLENBQTlCO0FBQUEsaUJBQU8sQ0FBQyxDQUFDLEtBQUYsQ0FBUSxVQUFSLENBQVAsQ0FBQTtTQURGO0FBQUEsT0FESztJQUFBLENBQVAsQ0FBQTs7MEJBQUE7O01BSkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/cm/.atom/packages/pigments/lib/variable-parser.coffee
