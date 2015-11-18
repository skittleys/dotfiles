(function() {
  var VariableScanner;

  VariableScanner = require('../lib/variable-scanner');

  describe('VariableScanner', function() {
    var editor, scanner, text, withScannerForTextEditor, withTextEditor, _ref;
    _ref = [], scanner = _ref[0], editor = _ref[1], text = _ref[2];
    withTextEditor = function(fixture, block) {
      return describe("with " + fixture + " buffer", function() {
        beforeEach(function() {
          waitsForPromise(function() {
            return atom.workspace.open(fixture);
          });
          return runs(function() {
            editor = atom.workspace.getActiveTextEditor();
            return text = editor.getText();
          });
        });
        afterEach(function() {
          return editor = null;
        });
        return block();
      });
    };
    withScannerForTextEditor = function(fixture, block) {
      return withTextEditor(fixture, function() {
        beforeEach(function() {
          return scanner = new VariableScanner;
        });
        afterEach(function() {
          return scanner = null;
        });
        return block();
      });
    };
    return describe('::search', function() {
      var result;
      result = [][0];
      withScannerForTextEditor('four-variables.styl', function() {
        beforeEach(function() {
          return result = scanner.search(text);
        });
        it('returns the first match', function() {
          return expect(result).toBeDefined();
        });
        describe('the result object', function() {
          it('has a match string', function() {
            return expect(result.match).toEqual('base-color = #fff');
          });
          it('has a lastIndex property', function() {
            return expect(result.lastIndex).toEqual(17);
          });
          it('has a range property', function() {
            return expect(result.range).toEqual([0, 17]);
          });
          return it('has a variable result', function() {
            expect(result[0].name).toEqual('base-color');
            expect(result[0].value).toEqual('#fff');
            expect(result[0].range).toEqual([0, 17]);
            return expect(result[0].line).toEqual(0);
          });
        });
        describe('the second result object', function() {
          beforeEach(function() {
            return result = scanner.search(text, result.lastIndex);
          });
          it('has a match string', function() {
            return expect(result.match).toEqual('other-color = transparentize(base-color, 50%)');
          });
          it('has a lastIndex property', function() {
            return expect(result.lastIndex).toEqual(64);
          });
          it('has a range property', function() {
            return expect(result.range).toEqual([19, 64]);
          });
          return it('has a variable result', function() {
            expect(result[0].name).toEqual('other-color');
            expect(result[0].value).toEqual('transparentize(base-color, 50%)');
            expect(result[0].range).toEqual([19, 64]);
            return expect(result[0].line).toEqual(2);
          });
        });
        return describe('successive searches', function() {
          return it('returns a result for each match and then undefined', function() {
            var doSearch;
            doSearch = function() {
              return result = scanner.search(text, result.lastIndex);
            };
            expect(doSearch()).toBeDefined();
            expect(doSearch()).toBeDefined();
            expect(doSearch()).toBeDefined();
            return expect(doSearch()).toBeUndefined();
          });
        });
      });
      withScannerForTextEditor('incomplete-stylus-hash.styl', function() {
        beforeEach(function() {
          return result = scanner.search(text);
        });
        return it('does not find any variables', function() {
          return expect(result).toBeUndefined();
        });
      });
      withScannerForTextEditor('variables-in-arguments.scss', function() {
        beforeEach(function() {
          return result = scanner.search(text);
        });
        return it('does not find any variables', function() {
          return expect(result).toBeUndefined();
        });
      });
      withScannerForTextEditor('attribute-selectors.scss', function() {
        beforeEach(function() {
          return result = scanner.search(text);
        });
        return it('does not find any variables', function() {
          return expect(result).toBeUndefined();
        });
      });
      withScannerForTextEditor('variables-in-conditions.scss', function() {
        beforeEach(function() {
          var doSearch;
          result = null;
          doSearch = function() {
            return result = scanner.search(text, result != null ? result.lastIndex : void 0);
          };
          doSearch();
          return doSearch();
        });
        return it('does not find the variable in the if clause', function() {
          return expect(result).toBeUndefined();
        });
      });
      withScannerForTextEditor('variables-after-mixins.scss', function() {
        beforeEach(function() {
          var doSearch;
          result = null;
          doSearch = function() {
            return result = scanner.search(text, result != null ? result.lastIndex : void 0);
          };
          return doSearch();
        });
        return it('finds the variable after the mixin', function() {
          return expect(result).toBeDefined();
        });
      });
      return withScannerForTextEditor('variables-from-other-process.less', function() {
        beforeEach(function() {
          var doSearch;
          result = null;
          doSearch = function() {
            return result = scanner.search(text, result != null ? result.lastIndex : void 0);
          };
          return doSearch();
        });
        return it('finds the variable with an interpolation tag', function() {
          return expect(result).toBeDefined();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvc3BlYy92YXJpYWJsZS1zY2FubmVyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGVBQUE7O0FBQUEsRUFBQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUSx5QkFBUixDQUFsQixDQUFBOztBQUFBLEVBRUEsUUFBQSxDQUFTLGlCQUFULEVBQTRCLFNBQUEsR0FBQTtBQUMxQixRQUFBLHFFQUFBO0FBQUEsSUFBQSxPQUEwQixFQUExQixFQUFDLGlCQUFELEVBQVUsZ0JBQVYsRUFBa0IsY0FBbEIsQ0FBQTtBQUFBLElBRUEsY0FBQSxHQUFpQixTQUFDLE9BQUQsRUFBVSxLQUFWLEdBQUE7YUFDZixRQUFBLENBQVUsT0FBQSxHQUFPLE9BQVAsR0FBZSxTQUF6QixFQUFtQyxTQUFBLEdBQUE7QUFDakMsUUFBQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsVUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTttQkFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsT0FBcEIsRUFBSDtVQUFBLENBQWhCLENBQUEsQ0FBQTtpQkFDQSxJQUFBLENBQUssU0FBQSxHQUFBO0FBQ0gsWUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBLENBQVQsQ0FBQTttQkFDQSxJQUFBLEdBQU8sTUFBTSxDQUFDLE9BQVAsQ0FBQSxFQUZKO1VBQUEsQ0FBTCxFQUZTO1FBQUEsQ0FBWCxDQUFBLENBQUE7QUFBQSxRQU1BLFNBQUEsQ0FBVSxTQUFBLEdBQUE7aUJBQUcsTUFBQSxHQUFTLEtBQVo7UUFBQSxDQUFWLENBTkEsQ0FBQTtlQVFHLEtBQUgsQ0FBQSxFQVRpQztNQUFBLENBQW5DLEVBRGU7SUFBQSxDQUZqQixDQUFBO0FBQUEsSUFjQSx3QkFB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

//# sourceURL=/home/cm/.atom/packages/pigments/spec/variable-scanner-spec.coffee
