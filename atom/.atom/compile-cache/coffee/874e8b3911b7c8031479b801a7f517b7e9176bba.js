(function() {
  var ExpressionsRegistry;

  ExpressionsRegistry = require('../lib/expressions-registry');

  describe('ExpressionsRegistry', function() {
    var Dummy, registry, _ref;
    _ref = [], registry = _ref[0], Dummy = _ref[1];
    beforeEach(function() {
      Dummy = (function() {
        function Dummy(_arg) {
          this.name = _arg.name;
        }

        return Dummy;

      })();
      return registry = new ExpressionsRegistry(Dummy);
    });
    describe('::createExpression', function() {
      return describe('called with enough data', function() {
        return it('creates a new expression of this registry expressions type', function() {
          var expression;
          expression = registry.createExpression('dummy', 'foo');
          expect(expression.constructor).toBe(Dummy);
          return expect(registry.getExpressions()).toEqual([expression]);
        });
      });
    });
    describe('::addExpression', function() {
      return it('adds a previously created expression in the registry', function() {
        var expression;
        expression = new Dummy({
          name: 'bar'
        });
        registry.addExpression(expression);
        expect(registry.getExpression('bar')).toBe(expression);
        return expect(registry.getExpressions()).toEqual([expression]);
      });
    });
    describe('::getExpressions', function() {
      return it('returns the expression based on their priority', function() {
        var expression1, expression2, expression3;
        expression1 = registry.createExpression('dummy1', '', 2);
        expression2 = registry.createExpression('dummy2', '', 0);
        expression3 = registry.createExpression('dummy3', '', 1);
        return expect(registry.getExpressions()).toEqual([expression1, expression3, expression2]);
      });
    });
    return describe('::removeExpression', function() {
      return it('removes an expression with its name', function() {
        registry.createExpression('dummy', 'foo');
        registry.removeExpression('dummy');
        return expect(registry.getExpressions()).toEqual([]);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvc3BlYy9leHByZXNzaW9ucy1yZWdpc3RyeS1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxtQkFBQTs7QUFBQSxFQUFBLG1CQUFBLEdBQXNCLE9BQUEsQ0FBUSw2QkFBUixDQUF0QixDQUFBOztBQUFBLEVBRUEsUUFBQSxDQUFTLHFCQUFULEVBQWdDLFNBQUEsR0FBQTtBQUM5QixRQUFBLHFCQUFBO0FBQUEsSUFBQSxPQUFvQixFQUFwQixFQUFDLGtCQUFELEVBQVcsZUFBWCxDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBTTtBQUNTLFFBQUEsZUFBQyxJQUFELEdBQUE7QUFBVyxVQUFULElBQUMsQ0FBQSxPQUFGLEtBQUUsSUFBUSxDQUFYO1FBQUEsQ0FBYjs7cUJBQUE7O1VBREYsQ0FBQTthQUdBLFFBQUEsR0FBZSxJQUFBLG1CQUFBLENBQW9CLEtBQXBCLEVBSk47SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBUUEsUUFBQSxDQUFTLG9CQUFULEVBQStCLFNBQUEsR0FBQTthQUM3QixRQUFBLENBQVMseUJBQVQsRUFBb0MsU0FBQSxHQUFBO2VBQ2xDLEVBQUEsQ0FBRyw0REFBSCxFQUFpRSxTQUFBLEdBQUE7QUFDL0QsY0FBQSxVQUFBO0FBQUEsVUFBQSxVQUFBLEdBQWEsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLEtBQW5DLENBQWIsQ0FBQTtBQUFBLFVBRUEsTUFBQSxDQUFPLFVBQVUsQ0FBQyxXQUFsQixDQUE4QixDQUFDLElBQS9CLENBQW9DLEtBQXBDLENBRkEsQ0FBQTtpQkFHQSxNQUFBLENBQU8sUUFBUSxDQUFDLGNBQVQsQ0FBQSxDQUFQLENBQWlDLENBQUMsT0FBbEMsQ0FBMEMsQ0FBQyxVQUFELENBQTFDLEVBSitEO1FBQUEsQ0FBakUsRUFEa0M7TUFBQSxDQUFwQyxFQUQ2QjtJQUFBLENBQS9CLENBUkEsQ0FBQTtBQUFBLElBZ0JBLFFBQUEsQ0FBUyxpQkFBVCxFQUE0QixTQUFBLEdBQUE7YUFDMUIsRUFBQSxDQUFHLHNEQUFILEVBQTJELFNBQUEsR0FBQTtBQUN6RCxZQUFBLFVBQUE7QUFBQSxRQUFBLFVBQUEsR0FBaUIsSUFBQSxLQUFBLENBQU07QUFBQSxVQUFBLElBQUEsRUFBTSxLQUFOO1NBQU4sQ0FBakIsQ0FBQTtBQUFBLFFBRUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FGQSxDQUFBO0FBQUEsUUFJQSxNQUFBLENBQU8sUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBUCxDQUFxQyxDQUFDLElBQXRDLENBQTJDLFVBQTNDLENBSkEsQ0FBQTtlQUtBLE1BQUEsQ0FBTyxRQUFRLENBQUMsY0FBVCxDQUFBLENBQVAsQ0FBaUMsQ0FBQyxPQUFsQyxDQUEwQyxDQUFDLFVBQUQsQ0FBMUMsRUFOeUQ7TUFBQSxDQUEzRCxFQUQwQjtJQUFBLENBQTVCLENBaEJBLENBQUE7QUFBQSxJQXlCQSxRQUFBLENBQVMsa0JBQVQsRUFBNkIsU0FBQSxHQUFBO2FBQzNCLEVBQUEsQ0FBRyxnREFBSCxFQUFxRCxTQUFBLEdBQUE7QUFDbkQsWUFBQSxxQ0FBQTtBQUFBLFFBQUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixRQUExQixFQUFvQyxFQUFwQyxFQUF3QyxDQUF4QyxDQUFkLENBQUE7QUFBQSxRQUNBLFdBQUEsR0FBYyxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0MsRUFBcEMsRUFBd0MsQ0FBeEMsQ0FEZCxDQUFBO0FBQUEsUUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLGdCQUFULENBQTBCLFFBQTFCLEVBQW9DLEVBQXBDLEVBQXdDLENBQXhDLENBRmQsQ0FBQTtlQUlBLE1BQUEsQ0FBTyxRQUFRLENBQUMsY0FBVCxDQUFBLENBQVAsQ0FBaUMsQ0FBQyxPQUFsQyxDQUEwQyxDQUN4QyxXQUR3QyxFQUV4QyxXQUZ3QyxFQUd4QyxXQUh3QyxDQUExQyxFQUxtRDtNQUFBLENBQXJELEVBRDJCO0lBQUEsQ0FBN0IsQ0F6QkEsQ0FBQTtXQXFDQSxRQUFBLENBQVMsb0JBQVQsRUFBK0IsU0FBQSxHQUFBO2FBQzdCLEVBQUEsQ0FBRyxxQ0FBSCxFQUEwQyxTQUFBLEdBQUE7QUFDeEMsUUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsS0FBbkMsQ0FBQSxDQUFBO0FBQUEsUUFFQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsT0FBMUIsQ0FGQSxDQUFBO2VBSUEsTUFBQSxDQUFPLFFBQVEsQ0FBQyxjQUFULENBQUEsQ0FBUCxDQUFpQyxDQUFDLE9BQWxDLENBQTBDLEVBQTFDLEVBTHdDO01BQUEsQ0FBMUMsRUFENkI7SUFBQSxDQUEvQixFQXRDOEI7RUFBQSxDQUFoQyxDQUZBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/cm/.atom/packages/pigments/spec/expressions-registry-spec.coffee
