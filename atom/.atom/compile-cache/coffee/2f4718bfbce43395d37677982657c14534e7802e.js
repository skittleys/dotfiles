(function() {
  var ColorScanner, TextEditor;

  ColorScanner = require('../lib/color-scanner');

  TextEditor = require('atom').TextEditor;

  describe('ColorScanner', function() {
    var editor, lastIndex, result, scanner, text, withScannerForTextEditor, withTextEditor, _ref;
    _ref = [], scanner = _ref[0], editor = _ref[1], text = _ref[2], result = _ref[3], lastIndex = _ref[4];
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
          return scanner = new ColorScanner;
        });
        afterEach(function() {
          return scanner = null;
        });
        return block();
      });
    };
    return describe('::search', function() {
      withScannerForTextEditor('html-entities.html', function() {
        beforeEach(function() {
          return result = scanner.search(text);
        });
        return it('returns nothing', function() {
          return expect(result).toBeUndefined();
        });
      });
      withScannerForTextEditor('css-color-with-prefix.less', function() {
        beforeEach(function() {
          return result = scanner.search(text);
        });
        return it('returns nothing', function() {
          return expect(result).toBeUndefined();
        });
      });
      return withScannerForTextEditor('four-variables.styl', function() {
        beforeEach(function() {
          return result = scanner.search(text);
        });
        it('returns the first buffer color match', function() {
          return expect(result).toBeDefined();
        });
        describe('the resulting buffer color', function() {
          it('has a text range', function() {
            return expect(result.range).toEqual([13, 17]);
          });
          it('has a color', function() {
            return expect(result.color).toBeColor('#ffffff');
          });
          it('stores the matched text', function() {
            return expect(result.match).toEqual('#fff');
          });
          it('stores the last index', function() {
            return expect(result.lastIndex).toEqual(17);
          });
          return it('stores match line', function() {
            return expect(result.line).toEqual(0);
          });
        });
        return describe('successive searches', function() {
          it('returns a buffer color for each match and then undefined', function() {
            var doSearch;
            doSearch = function() {
              return result = scanner.search(text, result.lastIndex);
            };
            expect(doSearch()).toBeDefined();
            expect(doSearch()).toBeDefined();
            expect(doSearch()).toBeDefined();
            return expect(doSearch()).toBeUndefined();
          });
          return it('stores the line of successive matches', function() {
            var doSearch;
            doSearch = function() {
              return result = scanner.search(text, result.lastIndex);
            };
            expect(doSearch().line).toEqual(2);
            expect(doSearch().line).toEqual(4);
            return expect(doSearch().line).toEqual(6);
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvc3BlYy9jb2xvci1zY2FubmVyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdCQUFBOztBQUFBLEVBQUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSxzQkFBUixDQUFmLENBQUE7O0FBQUEsRUFDQyxhQUFjLE9BQUEsQ0FBUSxNQUFSLEVBQWQsVUFERCxDQUFBOztBQUFBLEVBR0EsUUFBQSxDQUFTLGNBQVQsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLFFBQUEsd0ZBQUE7QUFBQSxJQUFBLE9BQTZDLEVBQTdDLEVBQUMsaUJBQUQsRUFBVSxnQkFBVixFQUFrQixjQUFsQixFQUF3QixnQkFBeEIsRUFBZ0MsbUJBQWhDLENBQUE7QUFBQSxJQUVBLGNBQUEsR0FBaUIsU0FBQyxPQUFELEVBQVUsS0FBVixHQUFBO2FBQ2YsUUFBQSxDQUFVLE9BQUEsR0FBTyxPQUFQLEdBQWUsU0FBekIsRUFBbUMsU0FBQSxHQUFBO0FBQ2pDLFFBQUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULFVBQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7bUJBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLE9BQXBCLEVBQUg7VUFBQSxDQUFoQixDQUFBLENBQUE7aUJBQ0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtBQUNILFlBQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQSxDQUFULENBQUE7bUJBQ0EsSUFBQSxHQUFPLE1BQU0sQ0FBQyxPQUFQLENBQUEsRUFGSjtVQUFBLENBQUwsRUFGUztRQUFBLENBQVgsQ0FBQSxDQUFBO0FBQUEsUUFNQSxTQUFBLENBQVUsU0FBQSxHQUFBO2lCQUFHLE1BQUEsR0FBUyxLQUFaO1FBQUEsQ0FBVixDQU5BLENBQUE7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

//# sourceURL=/home/cm/.atom/packages/pigments/spec/color-scanner-spec.coffee
