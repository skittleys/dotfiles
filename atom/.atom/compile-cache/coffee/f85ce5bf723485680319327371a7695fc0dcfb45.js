(function() {
  var ColorProject, CompositeDisposable, PigmentsAPI, PigmentsProvider, uris, url, _ref;

  CompositeDisposable = require('atom').CompositeDisposable;

  uris = require('./uris');

  ColorProject = require('./color-project');

  _ref = [], PigmentsProvider = _ref[0], PigmentsAPI = _ref[1], url = _ref[2];

  module.exports = {
    config: {
      traverseIntoSymlinkDirectories: {
        type: 'boolean',
        "default": false
      },
      sourceNames: {
        type: 'array',
        "default": ['**/*.styl', '**/*.stylus', '**/*.less', '**/*.sass', '**/*.scss'],
        description: "Glob patterns of files to scan for variables.",
        items: {
          type: 'string'
        }
      },
      ignoredNames: {
        type: 'array',
        "default": ["vendor/*", "node_modules/*", "spec/*", "test/*"],
        description: "Glob patterns of files to ignore when scanning the project for variables.",
        items: {
          type: 'string'
        }
      },
      extendedSearchNames: {
        type: 'array',
        "default": ['**/*.css'],
        description: "When performing the `find-colors` command, the search will scans all the files that match the `sourceNames` glob patterns and the one defined in this setting."
      },
      supportedFiletypes: {
        type: 'array',
        "default": ['*'],
        description: "An array of file extensions where colors will be highlighted. If the wildcard `*` is present in this array then colors in every file will be highlighted."
      },
      ignoredScopes: {
        type: 'array',
        "default": [],
        description: "Regular expressions of scopes in which colors are ignored. For example, to ignore all colors in comments you can use `\\.comment`.",
        items: {
          type: 'string'
        }
      },
      autocompleteScopes: {
        type: 'array',
        "default": ['.source.css', '.source.css.less', '.source.sass', '.source.css.scss', '.source.stylus'],
        description: 'The autocomplete provider will only complete color names in editors whose scope is present in this list.',
        items: {
          type: 'string'
        }
      },
      extendAutocompleteToVariables: {
        type: 'boolean',
        "default": false,
        description: 'When enabled, the autocomplete provider will also provides completion for non-color variables.'
      },
      markerType: {
        type: 'string',
        "default": 'background',
        "enum": ['background', 'outline', 'underline', 'dot', 'square-dot']
      },
      sortPaletteColors: {
        type: 'string',
        "default": 'none',
        "enum": ['none', 'by name', 'by color']
      },
      groupPaletteColors: {
        type: 'string',
        "default": 'none',
        "enum": ['none', 'by file']
      },
      mergeColorDuplicates: {
        type: 'boolean',
        "default": false
      },
      delayBeforeScan: {
        type: 'integer',
        "default": 500,
        description: 'Number of milliseconds after which the current buffer will be scanned for changes in the colors. This delay starts at the end of the text input and will be aborted if you start typing again during the interval.'
      },
      ignoreVcsIgnoredPaths: {
        type: 'boolean',
        "default": true,
        title: 'Ignore VCS Ignored Paths'
      }
    },
    activate: function(state) {
      var convertMethod;
      require('./register-elements');
      this.project = state.project != null ? atom.deserializers.deserialize(state.project) : new ColorProject();
      atom.commands.add('atom-workspace', {
        'pigments:find-colors': (function(_this) {
          return function() {
            return _this.findColors();
          };
        })(this),
        'pigments:show-palette': (function(_this) {
          return function() {
            return _this.showPalette();
          };
        })(this),
        'pigments:project-settings': (function(_this) {
          return function() {
            return _this.showSettings();
          };
        })(this),
        'pigments:reload': (function(_this) {
          return function() {
            return _this.reloadProjectVariables();
          };
        })(this)
      });
      convertMethod = (function(_this) {
        return function(action) {
          return function(event) {
            var colorBuffer, editor, marker;
            marker = _this.lastEvent != null ? action(_this.colorMarkerForMouseEvent(_this.lastEvent)) : (editor = atom.workspace.getActiveTextEditor(), colorBuffer = _this.project.colorBufferForEditor(editor), editor.getCursors().forEach(function(cursor) {
              marker = colorBuffer.getColorMarkerAtBufferPosition(cursor.getBufferPosition());
              return action(marker);
            }));
            return _this.lastEvent = null;
          };
        };
      })(this);
      atom.commands.add('atom-text-editor', {
        'pigments:convert-to-hex': convertMethod(function(marker) {
          if (marker != null) {
            return marker.convertContentToHex();
          }
        }),
        'pigments:convert-to-rgb': convertMethod(function(marker) {
          if (marker != null) {
            return marker.convertContentToRGB();
          }
        }),
        'pigments:convert-to-rgba': convertMethod(function(marker) {
          if (marker != null) {
            return marker.convertContentToRGBA();
          }
        })
      });
      atom.workspace.addOpener((function(_this) {
        return function(uriToOpen) {
          var host, protocol, _ref1;
          url || (url = require('url'));
          _ref1 = url.parse(uriToOpen), protocol = _ref1.protocol, host = _ref1.host;
          if (protocol !== 'pigments:') {
            return;
          }
          switch (host) {
            case 'search':
              return atom.views.getView(_this.project.findAllColors());
            case 'palette':
              return atom.views.getView(_this.project.getPalette());
            case 'settings':
              return atom.views.getView(_this.project);
          }
        };
      })(this));
      return atom.contextMenu.add({
        'atom-text-editor': [
          {
            label: 'Pigments',
            submenu: [
              {
                label: 'Convert to hexadecimal',
                command: 'pigments:convert-to-hex'
              }, {
                label: 'Convert to RGB',
                command: 'pigments:convert-to-rgb'
              }, {
                label: 'Convert to RGBA',
                command: 'pigments:convert-to-rgba'
              }
            ],
            shouldDisplay: (function(_this) {
              return function(event) {
                return _this.shouldDisplayContextMenu(event);
              };
            })(this)
          }
        ]
      });
    },
    deactivate: function() {
      var _ref1;
      return (_ref1 = this.getProject()) != null ? typeof _ref1.destroy === "function" ? _ref1.destroy() : void 0 : void 0;
    },
    provideAutocomplete: function() {
      if (PigmentsProvider == null) {
        PigmentsProvider = require('./pigments-provider');
      }
      return new PigmentsProvider(this);
    },
    provideAPI: function() {
      if (PigmentsAPI == null) {
        PigmentsAPI = require('./pigments-api');
      }
      return new PigmentsAPI(this.getProject());
    },
    shouldDisplayContextMenu: function(event) {
      this.lastEvent = event;
      setTimeout(((function(_this) {
        return function() {
          return _this.lastEvent = null;
        };
      })(this)), 10);
      return this.colorMarkerForMouseEvent(event) != null;
    },
    colorMarkerForMouseEvent: function(event) {
      var colorBuffer, colorBufferElement, editor;
      editor = atom.workspace.getActiveTextEditor();
      colorBuffer = this.project.colorBufferForEditor(editor);
      colorBufferElement = atom.views.getView(colorBuffer);
      return colorBufferElement != null ? colorBufferElement.colorMarkerForMouseEvent(event) : void 0;
    },
    serialize: function() {
      return {
        project: this.project.serialize()
      };
    },
    getProject: function() {
      return this.project;
    },
    findColors: function() {
      var pane;
      pane = atom.workspace.paneForURI(uris.SEARCH);
      pane || (pane = atom.workspace.getActivePane());
      return atom.workspace.openURIInPane(uris.SEARCH, pane, {});
    },
    showPalette: function() {
      return this.project.initialize().then(function() {
        var pane;
        pane = atom.workspace.paneForURI(uris.PALETTE);
        pane || (pane = atom.workspace.getActivePane());
        return atom.workspace.openURIInPane(uris.PALETTE, pane, {});
      })["catch"](function(reason) {
        return console.error(reason);
      });
    },
    showSettings: function() {
      return this.project.initialize().then(function() {
        var pane;
        pane = atom.workspace.paneForURI(uris.SETTINGS);
        pane || (pane = atom.workspace.getActivePane());
        return atom.workspace.openURIInPane(uris.SETTINGS, pane, {});
      })["catch"](function(reason) {
        return console.error(reason);
      });
    },
    reloadProjectVariables: function() {
      return this.project.initialize().then((function(_this) {
        return function() {
          return _this.project.loadPathsAndVariables();
        };
      })(this))["catch"](function(reason) {
        return console.error(reason);
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL3BpZ21lbnRzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxpRkFBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxRQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUVBLFlBQUEsR0FBZSxPQUFBLENBQVEsaUJBQVIsQ0FGZixDQUFBOztBQUFBLEVBR0EsT0FBdUMsRUFBdkMsRUFBQywwQkFBRCxFQUFtQixxQkFBbkIsRUFBZ0MsYUFIaEMsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLE1BQUEsRUFDRTtBQUFBLE1BQUEsOEJBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxLQURUO09BREY7QUFBQSxNQUdBLFdBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLE9BQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxDQUNQLFdBRE8sRUFFUCxhQUZPLEVBR1AsV0FITyxFQUlQLFdBSk8sRUFLUCxXQUxPLENBRFQ7QUFBQSxRQVFBLFdBQUEsRUFBYSwrQ0FSYjtBQUFBLFFBU0EsS0FBQSxFQUNFO0FBQUEsVUFBQSxJQUFBLEVBQU0sUUFBTjtTQVZGO09BSkY7QUFBQSxNQWVBLFlBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLE9BQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxDQUNQLFVBRE8sRUFFUCxnQkFGTyxFQUdQLFFBSE8sRUFJUCxRQUpPLENBRFQ7QUFBQSxRQU9BLFdBQUEsRUFBYSwyRUFQYjtBQUFBLFFBUUEsS0FBQSxFQUNFO0FBQUEsVUFBQSxJQUFBLEVBQU0sUUFBTjtT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

//# sourceURL=/home/cm/.atom/packages/pigments/lib/pigments.coffee
