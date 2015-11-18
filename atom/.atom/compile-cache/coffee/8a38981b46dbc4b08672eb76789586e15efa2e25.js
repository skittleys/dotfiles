(function() {
  var CONFIG_KEY, ScopeNameProvider, basename,
    __slice = [].slice;

  basename = require('path').basename;

  ScopeNameProvider = require('./scope-name-provider');

  CONFIG_KEY = 'file-types';

  module.exports = {
    config: {
      $debug: {
        type: 'boolean',
        "default": false
      },
      $caseSensitive: {
        type: 'boolean',
        "default": false
      }
    },
    debug: false,
    snp: new ScopeNameProvider(),
    _off: [],
    activate: function(state) {
      var updateEditorGrammars;
      this._off.push(atom.config.observe(CONFIG_KEY, (function(_this) {
        return function(newValue) {
          var editor, _i, _len, _ref, _results;
          _this.loadConfig(newValue);
          _ref = atom.workspace.getTextEditors();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            editor = _ref[_i];
            _results.push(_this._tryToSetGrammar(editor));
          }
          return _results;
        };
      })(this)));
      this._off.push(atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          _this._off.push(editor.onDidChangePath(function() {
            return _this._tryToSetGrammar(editor);
          }));
          return _this._tryToSetGrammar(editor);
        };
      })(this)));
      updateEditorGrammars = (function(_this) {
        return function(g) {
          var editor, scopeName, _i, _len, _ref, _results;
          _ref = _this.snp.getScopeNames();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            scopeName = _ref[_i];
            if (g.scopeName === scopeName) {
              _results.push((function() {
                var _j, _len1, _ref1, _results1;
                _ref1 = atom.workspace.getTextEditors();
                _results1 = [];
                for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                  editor = _ref1[_j];
                  _results1.push(this._tryToSetGrammar(editor));
                }
                return _results1;
              }).call(_this));
            }
          }
          return _results;
        };
      })(this);
      this._off.push(atom.grammars.onDidAddGrammar(updateEditorGrammars));
      return this._off.push(atom.grammars.onDidUpdateGrammar(updateEditorGrammars));
    },
    deactivate: function() {
      var o, _i, _len, _ref, _results;
      _ref = this._off;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        o = _ref[_i];
        _results.push(typeof o === "function" ? o() : void 0);
      }
      return _results;
    },
    serialize: function() {},
    loadConfig: function(config) {
      var fileType, scopeName;
      if (config == null) {
        config = {};
      }
      this.debug = config.$debug === true;
      this.caseSensitive = config.$caseSensitive === true;
      this.snp = new ScopeNameProvider();
      for (fileType in config) {
        scopeName = config[fileType];
        if (/^\$/.test(fileType)) {
          continue;
        }
        if (/(^\^)|(\.)|(\$$)/.test(fileType)) {
          this.snp.registerMatcher(fileType, scopeName);
        } else {
          this.snp.registerExtension(fileType, scopeName);
        }
      }
      return this._log(this.snp);
    },
    _tryToSetGrammar: function(editor) {
      var filename, g, scopeName;
      filename = basename(editor.getPath());
      scopeName = this.snp.getScopeName(filename, {
        caseSensitive: this.caseSensitive
      });
      if (scopeName == null) {
        this._log("no custom scopeName for " + filename + "...skipping");
        return;
      }
      g = atom.grammars.grammarForScopeName(scopeName);
      if (g == null) {
        this._log("no grammar for " + scopeName + "!?");
        return;
      }
      this._log("setting " + scopeName + " as grammar for " + filename);
      return editor.setGrammar(g);
    },
    _log: function() {
      var argv;
      argv = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (!this.debug) {
        return;
      }
      argv.unshift('[file-types]');
      return console.debug.apply(console, argv);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvZmlsZS10eXBlcy9saWIvZmlsZS10eXBlcy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsdUNBQUE7SUFBQSxrQkFBQTs7QUFBQSxFQUFDLFdBQVksT0FBQSxDQUFRLE1BQVIsRUFBWixRQUFELENBQUE7O0FBQUEsRUFFQSxpQkFBQSxHQUFvQixPQUFBLENBQVEsdUJBQVIsQ0FGcEIsQ0FBQTs7QUFBQSxFQUlBLFVBQUEsR0FBYSxZQUpiLENBQUE7O0FBQUEsRUFNQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLE1BQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxLQURUO09BREY7QUFBQSxNQUdBLGNBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxLQURUO09BSkY7S0FERjtBQUFBLElBUUEsS0FBQSxFQUFPLEtBUlA7QUFBQSxJQVVBLEdBQUEsRUFBUyxJQUFBLGlCQUFBLENBQUEsQ0FWVDtBQUFBLElBWUEsSUFBQSxFQUFNLEVBWk47QUFBQSxJQWNBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUNSLFVBQUEsb0JBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixDQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQixVQUFwQixFQUFnQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxRQUFELEdBQUE7QUFDekMsY0FBQSxnQ0FBQTtBQUFBLFVBQUEsS0FBQyxDQUFBLFVBQUQsQ0FBWSxRQUFaLENBQUEsQ0FBQTtBQUNBO0FBQUE7ZUFBQSwyQ0FBQTs4QkFBQTtBQUNFLDBCQUFBLEtBQUMsQ0FBQSxnQkFBRCxDQUFrQixNQUFsQixFQUFBLENBREY7QUFBQTswQkFGeUM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQyxDQUFYLENBQUEsQ0FBQTtBQUFBLE1BS0EsSUFBQyxDQUFBLElBQUksQ0FBQyxJQUFOLENBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBZixDQUFrQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxNQUFELEdBQUE7QUFFM0MsVUFBQSxLQUFDLENBQUEsSUFBSSxDQUFDLElBQU4sQ0FBVyxNQUFNLENBQUMsZUFBUCxDQUF1QixTQUFBLEdBQUE7bUJBQ2hDLEtBQUMsQ0FBQSxnQkFBRCxDQUFrQixNQUFsQixFQURnQztVQUFBLENBQXZCLENBQVgsQ0FBQSxDQUFBO2lCQUVBLEtBQUMsQ0FBQSxnQkFBRCxDQUFrQixNQUFsQixFQUoyQztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxDLENBQVgsQ0FMQSxDQUFBO0FBQUEsTUFZQSxvQkFBQSxHQUF1QixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxDQUFELEdBQUE7QUFDckIsY0FBQSwyQ0FBQTtBQUFBO0FBQUE7ZUFBQSwyQ0FBQTtpQ0FBQTtnQkFBMkMsQ0FBQyxDQUFDLFNBQUYsS0FBZTtBQUN4RDs7QUFBQTtBQUFBO3FCQUFBLDhDQUFBO3FDQUFBO0FBQ0UsaUNBQUEsSUFBQyxDQUFBLGdCQUFELENBQWtCLE1BQWxCLEVBQUEsQ0FERjtBQUFBOzs2QkFBQTthQURGO0FBQUE7MEJBRHFCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FadkIsQ0FBQTtBQUFBLE1BZ0JBLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixDQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixvQkFBOUIsQ0FBWCxDQWhCQSxDQUFBO2FBaUJBLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixDQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWQsQ0FBaUMsb0JBQWpDLENBQVgsRUFsQlE7SUFBQSxDQWRWO0FBQUEsSUFrQ0EsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLFVBQUEsMkJBQUE7QUFBQTtBQUFBO1dBQUEsMkNBQUE7cUJBQUE7QUFBQSxnREFBQSxhQUFBLENBQUE7QUFBQTtzQkFEVTtJQUFBLENBbENaO0FBQUEsSUFxQ0EsU0FBQSxFQUFXLFNBQUEsR0FBQSxDQXJDWDtBQUFBLElBdUNBLFVBQUEsRUFBWSxTQUFDLE1BQUQsR0FBQTtBQUNWLFVBQUEsbUJBQUE7O1FBRFcsU0FBUztPQUNwQjtBQUFBLE1BQUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxNQUFNLENBQUMsTUFBUCxLQUFpQixJQUExQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsYUFBRCxHQUFpQixNQUFNLENBQUMsY0FBUCxLQUF5QixJQUQxQyxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsR0FBRCxHQUFXLElBQUEsaUJBQUEsQ0FBQSxDQUZYLENBQUE7QUFHQSxXQUFBLGtCQUFBO3FDQUFBO0FBR0UsUUFBQSxJQUFZLEtBQUssQ0FBQyxJQUFOLENBQVcsUUFBWCxDQUFaO0FBQUEsbUJBQUE7U0FBQTtBQUlBLFFBQUEsSUFBRyxrQkFBa0IsQ0FBQyxJQUFuQixDQUF3QixRQUF4QixDQUFIO0FBQ0UsVUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLGVBQUwsQ0FBcUIsUUFBckIsRUFBK0IsU0FBL0IsQ0FBQSxDQURGO1NBQUEsTUFBQTtBQUlFLFVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxpQkFBTCxDQUF1QixRQUF2QixFQUFpQyxTQUFqQyxDQUFBLENBSkY7U0FQRjtBQUFBLE9BSEE7YUFlQSxJQUFDLENBQUEsSUFBRCxDQUFNLElBQUMsQ0FBQSxHQUFQLEVBaEJVO0lBQUEsQ0F2Q1o7QUFBQSxJQXlEQSxnQkFBQSxFQUFrQixTQUFDLE1BQUQsR0FBQTtBQUNoQixVQUFBLHNCQUFBO0FBQUEsTUFBQSxRQUFBLEdBQVcsUUFBQSxDQUFTLE1BQU0sQ0FBQyxPQUFQLENBQUEsQ0FBVCxDQUFYLENBQUE7QUFBQSxNQUNBLFNBQUEsR0FBWSxJQUFDLENBQUEsR0FBRyxDQUFDLFlBQUwsQ0FBa0IsUUFBbEIsRUFBNEI7QUFBQSxRQUFBLGFBQUEsRUFBZSxJQUFDLENBQUEsYUFBaEI7T0FBNUIsQ0FEWixDQUFBO0FBRUEsTUFBQSxJQUFPLGlCQUFQO0FBQ0UsUUFBQSxJQUFDLENBQUEsSUFBRCxDQUFPLDBCQUFBLEdBQTBCLFFBQTFCLEdBQW1DLGFBQTFDLENBQUEsQ0FBQTtBQUNBLGNBQUEsQ0FGRjtPQUZBO0FBQUEsTUFLQSxDQUFBLEdBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxTQUFsQyxDQUxKLENBQUE7QUFNQSxNQUFBLElBQU8sU0FBUDtBQUNFLFFBQUEsSUFBQyxDQUFBLElBQUQsQ0FBTyxpQkFBQSxHQUFpQixTQUFqQixHQUEyQixJQUFsQyxDQUFBLENBQUE7QUFDQSxjQUFBLENBRkY7T0FOQTtBQUFBLE1BU0EsSUFBQyxDQUFBLElBQUQsQ0FBTyxVQUFBLEdBQVUsU0FBVixHQUFvQixrQkFBcEIsR0FBc0MsUUFBN0MsQ0FUQSxDQUFBO2FBVUEsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsQ0FBbEIsRUFYZ0I7SUFBQSxDQXpEbEI7QUFBQSxJQXNFQSxJQUFBLEVBQU0sU0FBQSxHQUFBO0FBQ0osVUFBQSxJQUFBO0FBQUEsTUFESyw4REFDTCxDQUFBO0FBQUEsTUFBQSxJQUFBLENBQUEsSUFBZSxDQUFBLEtBQWY7QUFBQSxjQUFBLENBQUE7T0FBQTtBQUFBLE1BQ0EsSUFBSSxDQUFDLE9BQUwsQ0FBYSxjQUFiLENBREEsQ0FBQTthQUVBLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBZCxDQUFvQixPQUFwQixFQUE2QixJQUE3QixFQUhJO0lBQUEsQ0F0RU47R0FQRixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/cm/.atom/packages/file-types/lib/file-types.coffee
