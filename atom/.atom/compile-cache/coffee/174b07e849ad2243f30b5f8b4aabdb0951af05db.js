(function() {
  var ColorContext, ColorParser,
    __slice = [].slice;

  ColorContext = require('../lib/color-context');

  ColorParser = require('../lib/color-parser');

  describe('ColorContext', function() {
    var context, itParses, parser, _ref;
    _ref = [], context = _ref[0], parser = _ref[1];
    itParses = function(expression) {
      return {
        asUndefinedColor: function() {
          return it("parses '" + expression + "' as undefined", function() {
            return expect(context.readColor(expression)).toBeUndefined();
          });
        },
        asInt: function(expected) {
          return it("parses '" + expression + "' as an integer with value of " + expected, function() {
            return expect(context.readInt(expression)).toEqual(expected);
          });
        },
        asFloat: function(expected) {
          return it("parses '" + expression + "' as a float with value of " + expected, function() {
            return expect(context.readFloat(expression)).toEqual(expected);
          });
        },
        asIntOrPercent: function(expected) {
          return it("parses '" + expression + "' as an integer or a percentage with value of " + expected, function() {
            return expect(context.readIntOrPercent(expression)).toEqual(expected);
          });
        },
        asFloatOrPercent: function(expected) {
          return it("parses '" + expression + "' as a float or a percentage with value of " + expected, function() {
            return expect(context.readFloatOrPercent(expression)).toEqual(expected);
          });
        },
        asColorExpression: function(expected) {
          return it("parses '" + expression + "' as a color expression", function() {
            return expect(context.readColorExpression(expression)).toEqual(expected);
          });
        },
        asColor: function() {
          var expected;
          expected = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return it("parses '" + expression + "' as a color with value of " + (jasmine.pp(expected)), function() {
            var _ref1;
            return (_ref1 = expect(context.readColor(expression))).toBeColor.apply(_ref1, expected);
          });
        }
      };
    };
    describe('created without any variables', function() {
      beforeEach(function() {
        return context = new ColorContext;
      });
      itParses('10').asInt(10);
      itParses('10').asFloat(10);
      itParses('0.5').asFloat(0.5);
      itParses('.5').asFloat(0.5);
      itParses('10').asIntOrPercent(10);
      itParses('10%').asIntOrPercent(26);
      itParses('0.1').asFloatOrPercent(0.1);
      itParses('10%').asFloatOrPercent(0.1);
      itParses('red').asColorExpression('red');
      itParses('red').asColor(255, 0, 0);
      itParses('#ff0000').asColor(255, 0, 0);
      return itParses('rgb(255,127,0)').asColor(255, 127, 0);
    });
    describe('with a variables array', function() {
      var createColorVar, createVar;
      createVar = function(name, value) {
        return {
          value: value,
          name: name,
          path: '/path/to/file.coffee'
        };
      };
      createColorVar = function(name, value) {
        var v;
        v = createVar(name, value);
        v.isColor = true;
        return v;
      };
      beforeEach(function() {
        var colorVariables, variables;
        variables = [createVar('x', '10'), createVar('y', '0.1'), createVar('z', '10%'), createColorVar('c', 'rgb(255,127,0)')];
        colorVariables = variables.filter(function(v) {
          return v.isColor;
        });
        return context = new ColorContext({
          variables: variables,
          colorVariables: colorVariables
        });
      });
      itParses('x').asInt(10);
      itParses('y').asFloat(0.1);
      itParses('z').asIntOrPercent(26);
      itParses('z').asFloatOrPercent(0.1);
      itParses('c').asColorExpression('rgb(255,127,0)');
      itParses('c').asColor(255, 127, 0);
      return describe('that contains invalid colors', function() {
        beforeEach(function() {
          var variables;
          variables = [createVar('@text-height', '@scale-b-xxl * 1rem'), createVar('@component-line-height', '@text-height'), createVar('@list-item-height', '@component-line-height')];
          return context = new ColorContext({
            variables: variables
          });
        });
        return itParses('@list-item-height').asUndefinedColor();
      });
    });
    describe('with variables from a default file', function() {
      var createColorVar, createVar, projectPath, referenceVariable, _ref1;
      _ref1 = [], projectPath = _ref1[0], referenceVariable = _ref1[1];
      createVar = function(name, value, path) {
        if (path == null) {
          path = "" + projectPath + "/file.styl";
        }
        return {
          value: value,
          name: name,
          path: path
        };
      };
      createColorVar = function(name, value, path) {
        var v;
        v = createVar(name, value, path);
        v.isColor = true;
        return v;
      };
      describe('when there is another valid value', function() {
        beforeEach(function() {
          var colorVariables, variables;
          projectPath = atom.project.getPaths()[0];
          referenceVariable = createVar('a', 'b', "" + projectPath + "/a.styl");
          variables = [referenceVariable, createVar('b', '10', "" + projectPath + "/.pigments"), createVar('b', '20', "" + projectPath + "/b.styl")];
          colorVariables = variables.filter(function(v) {
            return v.isColor;
          });
          return context = new ColorContext({
            variables: variables,
            colorVariables: colorVariables,
            referenceVariable: referenceVariable,
            rootPaths: [projectPath]
          });
        });
        return itParses('a').asInt(20);
      });
      describe('when there is no another valid value', function() {
        beforeEach(function() {
          var colorVariables, variables;
          projectPath = atom.project.getPaths()[0];
          referenceVariable = createVar('a', 'b', "" + projectPath + "/a.styl");
          variables = [referenceVariable, createVar('b', '10', "" + projectPath + "/.pigments"), createVar('b', 'c', "" + projectPath + "/b.styl")];
          colorVariables = variables.filter(function(v) {
            return v.isColor;
          });
          return context = new ColorContext({
            variables: variables,
            colorVariables: colorVariables,
            referenceVariable: referenceVariable,
            rootPaths: [projectPath]
          });
        });
        return itParses('a').asInt(10);
      });
      describe('when there is another valid color', function() {
        beforeEach(function() {
          var colorVariables, variables;
          projectPath = atom.project.getPaths()[0];
          referenceVariable = createColorVar('a', 'b', "" + projectPath + "/a.styl");
          variables = [referenceVariable, createColorVar('b', '#ff0000', "" + projectPath + "/.pigments"), createColorVar('b', '#0000ff', "" + projectPath + "/b.styl")];
          colorVariables = variables.filter(function(v) {
            return v.isColor;
          });
          return context = new ColorContext({
            variables: variables,
            colorVariables: colorVariables,
            referenceVariable: referenceVariable,
            rootPaths: [projectPath]
          });
        });
        return itParses('a').asColor(0, 0, 255);
      });
      return describe('when there is no another valid color', function() {
        beforeEach(function() {
          var colorVariables, variables;
          projectPath = atom.project.getPaths()[0];
          referenceVariable = createColorVar('a', 'b', "" + projectPath + "/a.styl");
          variables = [referenceVariable, createColorVar('b', '#ff0000', "" + projectPath + "/.pigments"), createColorVar('b', 'c', "" + projectPath + "/b.styl")];
          colorVariables = variables.filter(function(v) {
            return v.isColor;
          });
          return context = new ColorContext({
            variables: variables,
            colorVariables: colorVariables,
            referenceVariable: referenceVariable,
            rootPaths: [projectPath]
          });
        });
        return itParses('a').asColor(255, 0, 0);
      });
    });
    describe('with a reference variable', function() {
      var createColorVar, createVar, projectPath, referenceVariable, _ref1;
      _ref1 = [], projectPath = _ref1[0], referenceVariable = _ref1[1];
      createVar = function(name, value, path) {
        if (path == null) {
          path = "" + projectPath + "/file.styl";
        }
        return {
          value: value,
          name: name,
          path: path
        };
      };
      createColorVar = function(name, value) {
        var v;
        v = createVar(name, value);
        v.isColor = true;
        return v;
      };
      describe('when there is a single root path', function() {
        beforeEach(function() {
          var colorVariables, variables;
          projectPath = atom.project.getPaths()[0];
          referenceVariable = createVar('a', '10', "" + projectPath + "/a.styl");
          variables = [referenceVariable, createVar('a', '20', "" + projectPath + "/b.styl")];
          colorVariables = variables.filter(function(v) {
            return v.isColor;
          });
          return context = new ColorContext({
            variables: variables,
            colorVariables: colorVariables,
            referenceVariable: referenceVariable,
            rootPaths: [projectPath]
          });
        });
        return itParses('a').asInt(10);
      });
      return describe('when there are many root paths', function() {
        beforeEach(function() {
          var colorVariables, variables;
          projectPath = atom.project.getPaths()[0];
          referenceVariable = createVar('a', 'b', "" + projectPath + "/a.styl");
          variables = [referenceVariable, createVar('b', '10', "" + projectPath + "/b.styl"), createVar('b', '20', "" + projectPath + "2/b.styl")];
          colorVariables = variables.filter(function(v) {
            return v.isColor;
          });
          return context = new ColorContext({
            variables: variables,
            colorVariables: colorVariables,
            referenceVariable: referenceVariable,
            rootPaths: [projectPath, "" + projectPath + "2"]
          });
        });
        return itParses('a').asInt(10);
      });
    });
    return describe('with a reference path', function() {
      var createColorVar, createVar, projectPath, referenceVariable, _ref1;
      _ref1 = [], projectPath = _ref1[0], referenceVariable = _ref1[1];
      createVar = function(name, value, path) {
        if (path == null) {
          path = "" + projectPath + "/file.styl";
        }
        return {
          value: value,
          name: name,
          path: path
        };
      };
      createColorVar = function(name, value) {
        var v;
        v = createVar(name, value);
        v.isColor = true;
        return v;
      };
      describe('when there is a single root path', function() {
        beforeEach(function() {
          var colorVariables, variables;
          projectPath = atom.project.getPaths()[0];
          referenceVariable = createVar('a', '10', "" + projectPath + "/a.styl");
          variables = [referenceVariable, createVar('a', '20', "" + projectPath + "/b.styl")];
          colorVariables = variables.filter(function(v) {
            return v.isColor;
          });
          return context = new ColorContext({
            variables: variables,
            colorVariables: colorVariables,
            referencePath: "" + projectPath + "/a.styl",
            rootPaths: [projectPath]
          });
        });
        return itParses('a').asInt(10);
      });
      return describe('when there are many root paths', function() {
        beforeEach(function() {
          var colorVariables, variables;
          projectPath = atom.project.getPaths()[0];
          referenceVariable = createVar('a', 'b', "" + projectPath + "/a.styl");
          variables = [referenceVariable, createVar('b', '10', "" + projectPath + "/b.styl"), createVar('b', '20', "" + projectPath + "2/b.styl")];
          colorVariables = variables.filter(function(v) {
            return v.isColor;
          });
          return context = new ColorContext({
            variables: variables,
            colorVariables: colorVariables,
            referencePath: "" + projectPath + "/a.styl",
            rootPaths: [projectPath, "" + projectPath + "2"]
          });
        });
        return itParses('a').asInt(10);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvc3BlYy9jb2xvci1jb250ZXh0LXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQ0E7QUFBQSxNQUFBLHlCQUFBO0lBQUEsa0JBQUE7O0FBQUEsRUFBQSxZQUFBLEdBQWUsT0FBQSxDQUFRLHNCQUFSLENBQWYsQ0FBQTs7QUFBQSxFQUNBLFdBQUEsR0FBYyxPQUFBLENBQVEscUJBQVIsQ0FEZCxDQUFBOztBQUFBLEVBR0EsUUFBQSxDQUFTLGNBQVQsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLFFBQUEsK0JBQUE7QUFBQSxJQUFBLE9BQW9CLEVBQXBCLEVBQUMsaUJBQUQsRUFBVSxnQkFBVixDQUFBO0FBQUEsSUFFQSxRQUFBLEdBQVcsU0FBQyxVQUFELEdBQUE7YUFDVDtBQUFBLFFBQUEsZ0JBQUEsRUFBa0IsU0FBQSxHQUFBO2lCQUNoQixFQUFBLENBQUksVUFBQSxHQUFVLFVBQVYsR0FBcUIsZ0JBQXpCLEVBQTBDLFNBQUEsR0FBQTttQkFDeEMsTUFBQSxDQUFPLE9BQU8sQ0FBQyxTQUFSLENBQWtCLFVBQWxCLENBQVAsQ0FBcUMsQ0FBQyxhQUF0QyxDQUFBLEVBRHdDO1VBQUEsQ0FBMUMsRUFEZ0I7UUFBQSxDQUFsQjtBQUFBLFFBSUEsS0FBQSxFQUFPLFNBQUMsUUFBRCxHQUFBO2lCQUNMLEVBQUEsQ0FBSSxVQUFBLEdBQVUsVUFBVixHQUFxQixnQ0FBckIsR0FBcUQsUUFBekQsRUFBcUUsU0FBQSxHQUFBO21CQUNuRSxNQUFBLENBQU8sT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsVUFBaEIsQ0FBUCxDQUFtQyxDQUFDLE9BQXBDLENBQTRDLFFBQTVDLEVBRG1FO1VBQUEsQ0FBckUsRUFESztRQUFBLENBSlA7QUFBQSxRQVFBLE9BQUEsRUFBUyxTQUFDLFFBQUQsR0FBQTtpQkFD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

//# sourceURL=/home/cm/.atom/packages/pigments/spec/color-context-spec.coffee
