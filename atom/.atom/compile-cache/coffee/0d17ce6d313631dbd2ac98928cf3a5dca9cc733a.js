(function() {
  var ScopeNameProvider, extname;

  extname = require('path').extname;

  module.exports = ScopeNameProvider = (function() {
    function ScopeNameProvider() {
      this._exts = {};
      this._matchers = {};
      this._scopeNames = {};
    }

    ScopeNameProvider.prototype.registerExtension = function(ext, scopeName) {
      this._exts["." + ext] = scopeName;
      this._scopeNames[scopeName] = scopeName;
    };

    ScopeNameProvider.prototype.registerMatcher = function(matcher, scopeName) {
      var _base;
      if ((_base = this._matchers)[scopeName] == null) {
        _base[scopeName] = [];
      }
      this._matchers[scopeName].push(matcher);
      this._scopeNames[scopeName] = scopeName;
    };

    ScopeNameProvider.prototype.getScopeName = function(filename, opts) {
      var ext, matches, scopeName;
      if (opts == null) {
        opts = {};
      }
      ext = extname(filename);
      if (opts.caseSensitive) {
        scopeName = this._exts[ext];
      } else {
        matches = Object.keys(this._exts).filter(function(e) {
          return e.toLowerCase() === ext.toLowerCase();
        });
        if (matches.length >= 1) {
          scopeName = this._exts[matches[0]];
          if (matches.length > 1) {
            atom.notifications.addWarning('[file-types] Multiple Matches', {
              detail: "Assuming '" + matches[0] + "' (" + scopeName + ") for file '" + filename + "'.",
              dismissable: true
            });
          }
        }
      }
      if (scopeName != null) {
        return scopeName;
      }
      return this._matchFilename(filename, opts);
    };

    ScopeNameProvider.prototype.getScopeNames = function() {
      return Object.keys(this._scopeNames);
    };

    ScopeNameProvider.prototype._matchFilename = function(filename, opts) {
      var matcher, matchers, regexp, scopeName, _i, _len, _ref;
      if (opts == null) {
        opts = {};
      }
      _ref = this._matchers;
      for (scopeName in _ref) {
        matchers = _ref[scopeName];
        for (_i = 0, _len = matchers.length; _i < _len; _i++) {
          matcher = matchers[_i];
          if (opts.caseSensitive) {
            regexp = new RegExp(matcher);
          } else {
            regexp = new RegExp(matcher, 'i');
          }
          if (regexp.test(filename)) {
            return scopeName;
          }
        }
      }
    };

    return ScopeNameProvider;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvZmlsZS10eXBlcy9saWIvc2NvcGUtbmFtZS1wcm92aWRlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMEJBQUE7O0FBQUEsRUFBQyxVQUFXLE9BQUEsQ0FBUSxNQUFSLEVBQVgsT0FBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNTLElBQUEsMkJBQUEsR0FBQTtBQUNYLE1BQUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxFQUFULENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxTQUFELEdBQWEsRUFEYixDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsV0FBRCxHQUFlLEVBRmYsQ0FEVztJQUFBLENBQWI7O0FBQUEsZ0NBS0EsaUJBQUEsR0FBbUIsU0FBQyxHQUFELEVBQU0sU0FBTixHQUFBO0FBQ2pCLE1BQUEsSUFBQyxDQUFBLEtBQU0sQ0FBQyxHQUFBLEdBQUcsR0FBSixDQUFQLEdBQW9CLFNBQXBCLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxXQUFZLENBQUEsU0FBQSxDQUFiLEdBQTBCLFNBRDFCLENBRGlCO0lBQUEsQ0FMbkIsQ0FBQTs7QUFBQSxnQ0FVQSxlQUFBLEdBQWlCLFNBQUMsT0FBRCxFQUFVLFNBQVYsR0FBQTtBQUNmLFVBQUEsS0FBQTs7YUFBVyxDQUFBLFNBQUEsSUFBYztPQUF6QjtBQUFBLE1BQ0EsSUFBQyxDQUFBLFNBQVUsQ0FBQSxTQUFBLENBQVUsQ0FBQyxJQUF0QixDQUEyQixPQUEzQixDQURBLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxXQUFZLENBQUEsU0FBQSxDQUFiLEdBQTBCLFNBRjFCLENBRGU7SUFBQSxDQVZqQixDQUFBOztBQUFBLGdDQWdCQSxZQUFBLEdBQWMsU0FBQyxRQUFELEVBQVcsSUFBWCxHQUFBO0FBQ1osVUFBQSx1QkFBQTs7UUFEdUIsT0FBTztPQUM5QjtBQUFBLE1BQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTtBQUVBLE1BQUEsSUFBRyxJQUFJLENBQUMsYUFBUjtBQUNFLFFBQUEsU0FBQSxHQUFZLElBQUMsQ0FBQSxLQUFNLENBQUEsR0FBQSxDQUFuQixDQURGO09BQUEsTUFBQTtBQUdFLFFBQUEsT0FBQSxHQUFVLE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBQyxDQUFBLEtBQWIsQ0FBbUIsQ0FBQyxNQUFwQixDQUEyQixTQUFDLENBQUQsR0FBQTtpQkFDbkMsQ0FBQyxDQUFDLFdBQUYsQ0FBQSxDQUFBLEtBQW1CLEdBQUcsQ0FBQyxXQUFKLENBQUEsRUFEZ0I7UUFBQSxDQUEzQixDQUFWLENBQUE7QUFFQSxRQUFBLElBQUcsT0FBTyxDQUFDLE1BQVIsSUFBa0IsQ0FBckI7QUFDRSxVQUFBLFNBQUEsR0FBWSxJQUFDLENBQUEsS0FBTSxDQUFBLE9BQVEsQ0FBQSxDQUFBLENBQVIsQ0FBbkIsQ0FBQTtBQUNBLFVBQUEsSUFBRyxPQUFPLENBQUMsTUFBUixHQUFpQixDQUFwQjtBQUNFLFlBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFuQixDQUE4QiwrQkFBOUIsRUFDRTtBQUFBLGNBQUEsTUFBQSxFQUFTLFlBQUEsR0FBWSxPQUFRLENBQUEsQ0FBQSxDQUFwQixHQUF1QixLQUF2QixHQUE0QixTQUE1QixHQUFzQyxjQUF0QyxHQUFvRCxRQUFwRCxHQUE2RCxJQUF0RTtBQUFBLGNBQ0EsV0FBQSxFQUFhLElBRGI7YUFERixDQUFBLENBREY7V0FGRjtTQUxGO09BRkE7QUFjQSxNQUFBLElBQW9CLGlCQUFwQjtBQUFBLGVBQU8sU0FBUCxDQUFBO09BZEE7YUFnQkEsSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsUUFBaEIsRUFBMEIsSUFBMUIsRUFqQlk7SUFBQSxDQWhCZCxDQUFBOztBQUFBLGdDQW1DQSxhQUFBLEdBQWUsU0FBQSxHQUFBO2FBQ2IsTUFBTSxDQUFDLElBQVAsQ0FBWSxJQUFDLENBQUEsV0FBYixFQURhO0lBQUEsQ0FuQ2YsQ0FBQTs7QUFBQSxnQ0EwQ0EsY0FBQSxHQUFnQixTQUFDLFFBQUQsRUFBVyxJQUFYLEdBQUE7QUFDZCxVQUFBLG9EQUFBOztRQUR5QixPQUFPO09BQ2hDO0FBQUE7QUFBQSxXQUFBLGlCQUFBO21DQUFBO0FBQ0UsYUFBQSwrQ0FBQTtpQ0FBQTtBQUNFLFVBQUEsSUFBRyxJQUFJLENBQUMsYUFBUjtBQUNFLFlBQUEsTUFBQSxHQUFhLElBQUEsTUFBQSxDQUFPLE9BQVAsQ0FBYixDQURGO1dBQUEsTUFBQTtBQUdFLFlBQUEsTUFBQSxHQUFhLElBQUEsTUFBQSxDQUFPLE9BQVAsRUFBZ0IsR0FBaEIsQ0FBYixDQUhGO1dBQUE7QUFJQSxVQUFBLElBQW9CLE1BQU0sQ0FBQyxJQUFQLENBQVksUUFBWixDQUFwQjtBQUFBLG1CQUFPLFNBQVAsQ0FBQTtXQUxGO0FBQUEsU0FERjtBQUFBLE9BRGM7SUFBQSxDQTFDaEIsQ0FBQTs7NkJBQUE7O01BSkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/cm/.atom/packages/file-types/lib/scope-name-provider.coffee
