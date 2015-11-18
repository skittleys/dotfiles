(function() {
  var ColorContext, ColorParser, ColorSearch, Emitter, Minimatch, getRegistry;

  Emitter = require('atom').Emitter;

  Minimatch = require('minimatch').Minimatch;

  getRegistry = require('./color-expressions').getRegistry;

  ColorParser = require('./color-parser');

  ColorContext = require('./color-context');

  module.exports = ColorSearch = (function() {
    function ColorSearch(options) {
      var error, ignore, ignoredNames, _i, _len;
      if (options == null) {
        options = {};
      }
      this.sourceNames = options.sourceNames, ignoredNames = options.ignoredNames, this.context = options.context;
      this.emitter = new Emitter;
      this.parser = new ColorParser;
      if (this.context == null) {
        this.context = new ColorContext([]);
      }
      this.variables = this.context.getVariables();
      if (this.sourceNames == null) {
        this.sourceNames = [];
      }
      this.context.parser = this.parser;
      if (ignoredNames == null) {
        ignoredNames = [];
      }
      this.ignoredNames = [];
      for (_i = 0, _len = ignoredNames.length; _i < _len; _i++) {
        ignore = ignoredNames[_i];
        if (ignore != null) {
          try {
            this.ignoredNames.push(new Minimatch(ignore, {
              matchBase: true,
              dot: true
            }));
          } catch (_error) {
            error = _error;
            console.warn("Error parsing ignore pattern (" + ignore + "): " + error.message);
          }
        }
      }
    }

    ColorSearch.prototype.onDidFindMatches = function(callback) {
      return this.emitter.on('did-find-matches', callback);
    };

    ColorSearch.prototype.onDidCompleteSearch = function(callback) {
      return this.emitter.on('did-complete-search', callback);
    };

    ColorSearch.prototype.search = function() {
      var promise, re, registry, results;
      registry = getRegistry(this.context);
      re = new RegExp(registry.getRegExp());
      results = [];
      promise = atom.workspace.scan(re, {
        paths: this.sourceNames
      }, (function(_this) {
        return function(m) {
          var newMatches, relativePath, result, _i, _len, _ref, _ref1;
          relativePath = atom.project.relativize(m.filePath);
          if (_this.isIgnored(relativePath)) {
            return;
          }
          newMatches = [];
          _ref = m.matches;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            result = _ref[_i];
            result.color = _this.parser.parse(result.matchText, _this.context);
            if (!((_ref1 = result.color) != null ? _ref1.isValid() : void 0)) {
              continue;
            }
            if (result.range[0] == null) {
              console.warn("Color search returned a result with an invalid range", result);
              continue;
            }
            result.range[0][1] += result.matchText.indexOf(result.color.colorExpression);
            result.matchText = result.color.colorExpression;
            results.push(result);
            newMatches.push(result);
          }
          m.matches = newMatches;
          if (m.matches.length > 0) {
            return _this.emitter.emit('did-find-matches', m);
          }
        };
      })(this));
      return promise.then((function(_this) {
        return function() {
          _this.results = results;
          return _this.emitter.emit('did-complete-search', results);
        };
      })(this));
    };

    ColorSearch.prototype.isIgnored = function(relativePath) {
      var ignoredName, _i, _len, _ref;
      _ref = this.ignoredNames;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ignoredName = _ref[_i];
        if (ignoredName.match(relativePath)) {
          return true;
        }
      }
    };

    return ColorSearch;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL2NvbG9yLXNlYXJjaC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsdUVBQUE7O0FBQUEsRUFBQyxVQUFXLE9BQUEsQ0FBUSxNQUFSLEVBQVgsT0FBRCxDQUFBOztBQUFBLEVBQ0MsWUFBYSxPQUFBLENBQVEsV0FBUixFQUFiLFNBREQsQ0FBQTs7QUFBQSxFQUVDLGNBQWUsT0FBQSxDQUFRLHFCQUFSLEVBQWYsV0FGRCxDQUFBOztBQUFBLEVBR0EsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUhkLENBQUE7O0FBQUEsRUFJQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGlCQUFSLENBSmYsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDUyxJQUFBLHFCQUFDLE9BQUQsR0FBQTtBQUNYLFVBQUEscUNBQUE7O1FBRFksVUFBUTtPQUNwQjtBQUFBLE1BQUMsSUFBQyxDQUFBLHNCQUFBLFdBQUYsRUFBZSx1QkFBQSxZQUFmLEVBQTZCLElBQUMsQ0FBQSxrQkFBQSxPQUE5QixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsT0FBRCxHQUFXLEdBQUEsQ0FBQSxPQURYLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxNQUFELEdBQVUsR0FBQSxDQUFBLFdBRlYsQ0FBQTs7UUFHQSxJQUFDLENBQUEsVUFBZSxJQUFBLFlBQUEsQ0FBYSxFQUFiO09BSGhCO0FBQUEsTUFJQSxJQUFDLENBQUEsU0FBRCxHQUFhLElBQUMsQ0FBQSxPQUFPLENBQUMsWUFBVCxDQUFBLENBSmIsQ0FBQTs7UUFLQSxJQUFDLENBQUEsY0FBZTtPQUxoQjtBQUFBLE1BTUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULEdBQWtCLElBQUMsQ0FBQSxNQU5uQixDQUFBOztRQU9BLGVBQWdCO09BUGhCO0FBQUEsTUFTQSxJQUFDLENBQUEsWUFBRCxHQUFnQixFQVRoQixDQUFBO0FBVUEsV0FBQSxtREFBQTtrQ0FBQTtZQUFnQztBQUM5QjtBQUNFLFlBQUEsSUFBQyxDQUFBLFlBQVksQ0FBQyxJQUFkLENBQXVCLElBQUEsU0FBQSxDQUFVLE1BQVYsRUFBa0I7QUFBQSxjQUFBLFNBQUEsRUFBVyxJQUFYO0FBQUEsY0FBaUIsR0FBQSxFQUFLLElBQXRCO2FBQWxCLENBQXZCLENBQUEsQ0FERjtXQUFBLGNBQUE7QUFHRSxZQURJLGNBQ0osQ0FBQTtBQUFBLFlBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYyxnQ0FBQSxHQUFnQyxNQUFoQyxHQUF1QyxLQUF2QyxHQUE0QyxLQUFLLENBQUMsT0FBaEUsQ0FBQSxDQUhGOztTQURGO0FBQUEsT0FYVztJQUFBLENBQWI7O0FBQUEsMEJBaUJBLGdCQUFBLEdBQWtCLFNBQUMsUUFBRCxHQUFBO2FBQ2hCLElBQUMsQ0FBQSxPQUFPLENBQUMsRUFBVCxDQUFZLGtCQUFaLEVBQWdDLFFBQWhDLEVBRGdCO0lBQUEsQ0FqQmxCLENBQUE7O0FBQUEsMEJBb0JBLG1CQUFBLEdBQXFCLFNBQUMsUUFBRCxHQUFBO2FBQ25CLElBQUMsQ0FBQSxPQUFPLENBQUMsRUFBVCxDQUFZLHFCQUFaLEVBQW1DLFFBQW5DLEVBRG1CO0lBQUEsQ0FwQnJCLENBQUE7O0FBQUEsMEJBdUJBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixVQUFBLDhCQUFBO0FBQUEsTUFBQSxRQUFBLEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxPQUFiLENBQVgsQ0FBQTtBQUFBLE1BRUEsRUFBQSxHQUFTLElBQUEsTUFBQSxDQUFPLFFBQVEsQ0FBQyxTQUFULENBQUEsQ0FBUCxDQUZULENBQUE7QUFBQSxNQUdBLE9BQUEsR0FBVSxFQUhWLENBQUE7QUFBQSxNQUtBLE9BQUEsR0FBVSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsRUFBcEIsRUFBd0I7QUFBQSxRQUFBLEtBQUEsRUFBTyxJQUFDLENBQUEsV0FBUjtPQUF4QixFQUE2QyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxDQUFELEdBQUE7QUFDckQsY0FBQSx1REFBQTtBQUFBLFVBQUEsWUFBQSxHQUFlLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBYixDQUF3QixDQUFDLENBQUMsUUFBMUIsQ0FBZixDQUFBO0FBQ0EsVUFBQSxJQUFVLEtBQUMsQ0FBQSxTQUFELENBQVcsWUFBWCxDQUFWO0FBQUEsa0JBQUEsQ0FBQTtXQURBO0FBQUEsVUFHQSxVQUFBLEdBQWEsRUFIYixDQUFBO0FBSUE7QUFBQSxlQUFBLDJDQUFBOzhCQUFBO0FBQ0UsWUFBQSxNQUFNLENBQUMsS0FBUCxHQUFlLEtBQUMsQ0FBQSxNQUFNLENBQUMsS0FBUixDQUFjLE1BQU0sQ0FBQyxTQUFyQixFQUFnQyxLQUFDLENBQUEsT0FBakMsQ0FBZixDQUFBO0FBR0EsWUFBQSxJQUFBLENBQUEsdUNBQTRCLENBQUUsT0FBZCxDQUFBLFdBQWhCO0FBQUEsdUJBQUE7YUFIQTtBQU1BLFlBQUEsSUFBTyx1QkFBUDtBQUNFLGNBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxzREFBYixFQUFxRSxNQUFyRSxDQUFBLENBQUE7QUFDQSx1QkFGRjthQU5BO0FBQUEsWUFTQSxNQUFNLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBaEIsSUFBc0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFqQixDQUF5QixNQUFNLENBQUMsS0FBSyxDQUFDLGVBQXRDLENBVHRCLENBQUE7QUFBQSxZQVVBLE1BQU0sQ0FBQyxTQUFQLEdBQW1CLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFWaEMsQ0FBQTtBQUFBLFlBWUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBWkEsQ0FBQTtBQUFBLFlBYUEsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsTUFBaEIsQ0FiQSxDQURGO0FBQUEsV0FKQTtBQUFBLFVBb0JBLENBQUMsQ0FBQyxPQUFGLEdBQVksVUFwQlosQ0FBQTtBQXNCQSxVQUFBLElBQXVDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBVixHQUFtQixDQUExRDttQkFBQSxLQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxrQkFBZCxFQUFrQyxDQUFsQyxFQUFBO1dBdkJxRDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTdDLENBTFYsQ0FBQTthQThCQSxPQUFPLENBQUMsSUFBUixDQUFhLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDWCxVQUFBLEtBQUMsQ0FBQSxPQUFELEdBQVcsT0FBWCxDQUFBO2lCQUNBLEtBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLHFCQUFkLEVBQXFDLE9BQXJDLEVBRlc7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFiLEVBL0JNO0lBQUEsQ0F2QlIsQ0FBQTs7QUFBQSwwQkEwREEsU0FBQSxHQUFXLFNBQUMsWUFBRCxHQUFBO0FBQ1QsVUFBQSwyQkFBQTtBQUFBO0FBQUEsV0FBQSwyQ0FBQTsrQkFBQTtBQUNFLFFBQUEsSUFBZSxXQUFXLENBQUMsS0FBWixDQUFrQixZQUFsQixDQUFmO0FBQUEsaUJBQU8sSUFBUCxDQUFBO1NBREY7QUFBQSxPQURTO0lBQUEsQ0ExRFgsQ0FBQTs7dUJBQUE7O01BUkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/cm/.atom/packages/pigments/lib/color-search.coffee
