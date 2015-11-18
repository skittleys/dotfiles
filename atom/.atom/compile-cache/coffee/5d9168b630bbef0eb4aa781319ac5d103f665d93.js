(function() {
  var ATOM_VARIABLES, ColorBuffer, ColorContext, ColorMarkerElement, ColorProject, ColorSearch, CompositeDisposable, Emitter, Palette, PathsLoader, PathsScanner, Range, SERIALIZE_MARKERS_VERSION, SERIALIZE_VERSION, THEME_VARIABLES, VariablesCollection, compareArray, minimatch, _ref, _ref1,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = require('atom'), Emitter = _ref.Emitter, CompositeDisposable = _ref.CompositeDisposable, Range = _ref.Range;

  minimatch = require('minimatch');

  _ref1 = require('./versions'), SERIALIZE_VERSION = _ref1.SERIALIZE_VERSION, SERIALIZE_MARKERS_VERSION = _ref1.SERIALIZE_MARKERS_VERSION;

  THEME_VARIABLES = require('./uris').THEME_VARIABLES;

  ColorBuffer = require('./color-buffer');

  ColorContext = require('./color-context');

  ColorSearch = require('./color-search');

  Palette = require('./palette');

  PathsLoader = require('./paths-loader');

  PathsScanner = require('./paths-scanner');

  ColorMarkerElement = require('./color-marker-element');

  VariablesCollection = require('./variables-collection');

  ATOM_VARIABLES = ['text-color', 'text-color-subtle', 'text-color-highlight', 'text-color-selected', 'text-color-info', 'text-color-success', 'text-color-warning', 'text-color-error', 'background-color-info', 'background-color-success', 'background-color-warning', 'background-color-error', 'background-color-highlight', 'background-color-selected', 'app-background-color', 'base-background-color', 'base-border-color', 'pane-item-background-color', 'pane-item-border-color', 'input-background-color', 'input-border-color', 'tool-panel-background-color', 'tool-panel-border-color', 'inset-panel-background-color', 'inset-panel-border-color', 'panel-heading-background-color', 'panel-heading-border-color', 'overlay-background-color', 'overlay-border-color', 'button-background-color', 'button-background-color-hover', 'button-background-color-selected', 'button-border-color', 'tab-bar-background-color', 'tab-bar-border-color', 'tab-background-color', 'tab-background-color-active', 'tab-border-color', 'tree-view-background-color', 'tree-view-border-color', 'ui-site-color-1', 'ui-site-color-2', 'ui-site-color-3', 'ui-site-color-4', 'ui-site-color-5', 'syntax-text-color', 'syntax-cursor-color', 'syntax-selection-color', 'syntax-background-color', 'syntax-wrap-guide-color', 'syntax-indent-guide-color', 'syntax-invisible-character-color', 'syntax-result-marker-color', 'syntax-result-marker-color-selected', 'syntax-gutter-text-color', 'syntax-gutter-text-color-selected', 'syntax-gutter-background-color', 'syntax-gutter-background-color-selected', 'syntax-color-renamed', 'syntax-color-added', 'syntax-color-modified', 'syntax-color-removed'];

  compareArray = function(a, b) {
    var i, v, _i, _len;
    if ((a == null) || (b == null)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (i = _i = 0, _len = a.length; _i < _len; i = ++_i) {
      v = a[i];
      if (v !== b[i]) {
        return false;
      }
    }
    return true;
  };

  module.exports = ColorProject = (function() {
    atom.deserializers.add(ColorProject);

    ColorProject.deserialize = function(state) {
      var markersVersion;
      markersVersion = SERIALIZE_MARKERS_VERSION;
      if ((state != null ? state.version : void 0) !== SERIALIZE_VERSION) {
        state = {};
      }
      if ((state != null ? state.markersVersion : void 0) !== markersVersion) {
        delete state.variables;
        delete state.buffers;
      }
      if (!compareArray(state.globalSourceNames, atom.config.get('pigments.sourceNames')) || !compareArray(state.globalIgnoredNames, atom.config.get('pigments.ignoredNames'))) {
        delete state.variables;
        delete state.buffers;
        delete state.paths;
      }
      return new ColorProject(state);
    };

    function ColorProject(state) {
      var buffers, includeThemes, timestamp, variables;
      if (state == null) {
        state = {};
      }
      includeThemes = state.includeThemes, this.ignoredNames = state.ignoredNames, this.sourceNames = state.sourceNames, this.ignoredScopes = state.ignoredScopes, this.paths = state.paths, this.searchNames = state.searchNames, this.ignoreGlobalSourceNames = state.ignoreGlobalSourceNames, this.ignoreGlobalIgnoredNames = state.ignoreGlobalIgnoredNames, this.ignoreGlobalIgnoredScopes = state.ignoreGlobalIgnoredScopes, this.ignoreGlobalSearchNames = state.ignoreGlobalSearchNames, this.ignoreGlobalSupportedFiletypes = state.ignoreGlobalSupportedFiletypes, this.supportedFiletypes = state.supportedFiletypes, variables = state.variables, timestamp = state.timestamp, buffers = state.buffers;
      this.emitter = new Emitter;
      this.subscriptions = new CompositeDisposable;
      this.colorBuffersByEditorId = {};
      if (variables != null) {
        this.variables = atom.deserializers.deserialize(variables);
      } else {
        this.variables = new VariablesCollection;
      }
      this.subscriptions.add(this.variables.onDidChange((function(_this) {
        return function(results) {
          return _this.emitVariablesChangeEvent(results);
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('pigments.sourceNames', (function(_this) {
        return function() {
          return _this.updatePaths();
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('pigments.ignoredNames', (function(_this) {
        return function() {
          return _this.updatePaths();
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('pigments.ignoredScopes', (function(_this) {
        return function() {
          return _this.emitter.emit('did-change-ignored-scopes', _this.getIgnoredScopes());
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('pigments.supportedFiletypes', (function(_this) {
        return function() {
          _this.updateIgnoredFiletypes();
          return _this.emitter.emit('did-change-ignored-scopes', _this.getIgnoredScopes());
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('pigments.markerType', function(type) {
        if (type != null) {
          return ColorMarkerElement.setMarkerType(type);
        }
      }));
      this.subscriptions.add(atom.config.observe('pigments.ignoreVcsIgnoredPaths', (function(_this) {
        return function() {
          return _this.loadPathsAndVariables();
        };
      })(this)));
      this.bufferStates = buffers != null ? buffers : {};
      if (timestamp != null) {
        this.timestamp = new Date(Date.parse(timestamp));
      }
      if (includeThemes) {
        this.setIncludeThemes(includeThemes);
      }
      this.updateIgnoredFiletypes();
      if ((this.paths != null) && (this.variables.length != null)) {
        this.initialize();
      }
      this.initializeBuffers();
    }

    ColorProject.prototype.onDidInitialize = function(callback) {
      return this.emitter.on('did-initialize', callback);
    };

    ColorProject.prototype.onDidDestroy = function(callback) {
      return this.emitter.on('did-destroy', callback);
    };

    ColorProject.prototype.onDidUpdateVariables = function(callback) {
      return this.emitter.on('did-update-variables', callback);
    };

    ColorProject.prototype.onDidCreateColorBuffer = function(callback) {
      return this.emitter.on('did-create-color-buffer', callback);
    };

    ColorProject.prototype.onDidChangeIgnoredScopes = function(callback) {
      return this.emitter.on('did-change-ignored-scopes', callback);
    };

    ColorProject.prototype.observeColorBuffers = function(callback) {
      var colorBuffer, id, _ref2;
      _ref2 = this.colorBuffersByEditorId;
      for (id in _ref2) {
        colorBuffer = _ref2[id];
        callback(colorBuffer);
      }
      return this.onDidCreateColorBuffer(callback);
    };

    ColorProject.prototype.isInitialized = function() {
      return this.initialized;
    };

    ColorProject.prototype.isDestroyed = function() {
      return this.destroyed;
    };

    ColorProject.prototype.initialize = function() {
      if (this.isInitialized()) {
        return Promise.resolve(this.variables.getVariables());
      }
      if (this.initializePromise != null) {
        return this.initializePromise;
      }
      return this.initializePromise = this.loadPathsAndVariables().then((function(_this) {
        return function() {
          var variables;
          _this.initialized = true;
          variables = _this.variables.getVariables();
          _this.emitter.emit('did-initialize', variables);
          return variables;
        };
      })(this));
    };

    ColorProject.prototype.destroy = function() {
      var buffer, id, _ref2;
      if (this.destroyed) {
        return;
      }
      this.destroyed = true;
      PathsScanner.terminateRunningTask();
      _ref2 = this.colorBuffersByEditorId;
      for (id in _ref2) {
        buffer = _ref2[id];
        buffer.destroy();
      }
      this.colorBuffersByEditorId = null;
      this.subscriptions.dispose();
      this.subscriptions = null;
      this.emitter.emit('did-destroy', this);
      return this.emitter.dispose();
    };

    ColorProject.prototype.loadPathsAndVariables = function() {
      var destroyed;
      destroyed = null;
      return this.loadPaths().then((function(_this) {
        return function(_arg) {
          var dirtied, path, removed, _i, _len;
          dirtied = _arg.dirtied, removed = _arg.removed;
          if (removed.length > 0) {
            _this.paths = _this.paths.filter(function(p) {
              return __indexOf.call(removed, p) < 0;
            });
            _this.deleteVariablesForPaths(removed);
          }
          if ((_this.paths != null) && dirtied.length > 0) {
            for (_i = 0, _len = dirtied.length; _i < _len; _i++) {
              path = dirtied[_i];
              if (__indexOf.call(_this.paths, path) < 0) {
                _this.paths.push(path);
              }
            }
            if (_this.variables.length) {
              return dirtied;
            } else {
              return _this.paths;
            }
          } else if (_this.paths == null) {
            return _this.paths = dirtied;
          } else if (!_this.variables.length) {
            return _this.paths;
          } else {
            return [];
          }
        };
      })(this)).then((function(_this) {
        return function(paths) {
          return _this.loadVariablesForPaths(paths);
        };
      })(this)).then((function(_this) {
        return function(results) {
          if (results != null) {
            return _this.variables.updateCollection(results);
          }
        };
      })(this));
    };

    ColorProject.prototype.findAllColors = function() {
      var patterns;
      patterns = this.getSearchNames();
      return new ColorSearch({
        sourceNames: patterns,
        ignoredNames: this.getIgnoredNames(),
        context: this.getContext()
      });
    };

    ColorProject.prototype.initializeBuffers = function(buffers) {
      return this.subscriptions.add(atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          var buffer, bufferElement;
          buffer = _this.colorBufferForEditor(editor);
          if (buffer != null) {
            bufferElement = atom.views.getView(buffer);
            return bufferElement.attach();
          }
        };
      })(this)));
    };

    ColorProject.prototype.colorBufferForEditor = function(editor) {
      var buffer, state, subscription;
      if (this.destroyed) {
        return;
      }
      if (editor == null) {
        return;
      }
      if (this.colorBuffersByEditorId[editor.id] != null) {
        return this.colorBuffersByEditorId[editor.id];
      }
      if (this.bufferStates[editor.id] != null) {
        state = this.bufferStates[editor.id];
        state.editor = editor;
        state.project = this;
        delete this.bufferStates[editor.id];
      } else {
        state = {
          editor: editor,
          project: this
        };
      }
      this.colorBuffersByEditorId[editor.id] = buffer = new ColorBuffer(state);
      this.subscriptions.add(subscription = buffer.onDidDestroy((function(_this) {
        return function() {
          _this.subscriptions.remove(subscription);
          subscription.dispose();
          return delete _this.colorBuffersByEditorId[editor.id];
        };
      })(this)));
      this.emitter.emit('did-create-color-buffer', buffer);
      return buffer;
    };

    ColorProject.prototype.colorBufferForPath = function(path) {
      var colorBuffer, id, _ref2;
      _ref2 = this.colorBuffersByEditorId;
      for (id in _ref2) {
        colorBuffer = _ref2[id];
        if (colorBuffer.editor.getPath() === path) {
          return colorBuffer;
        }
      }
    };

    ColorProject.prototype.getPaths = function() {
      var _ref2;
      return (_ref2 = this.paths) != null ? _ref2.slice() : void 0;
    };

    ColorProject.prototype.appendPath = function(path) {
      if (path != null) {
        return this.paths.push(path);
      }
    };

    ColorProject.prototype.loadPaths = function(noKnownPaths) {
      if (noKnownPaths == null) {
        noKnownPaths = false;
      }
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var config, knownPaths, rootPaths, _ref2;
          rootPaths = _this.getRootPaths();
          knownPaths = noKnownPaths ? [] : (_ref2 = _this.paths) != null ? _ref2 : [];
          config = {
            knownPaths: knownPaths,
            timestamp: _this.timestamp,
            ignoredNames: _this.getIgnoredNames(),
            paths: rootPaths,
            traverseIntoSymlinkDirectories: atom.config.get('pigments.traverseIntoSymlinkDirectories'),
            sourceNames: _this.getSourceNames(),
            ignoreVcsIgnores: atom.config.get('pigments.ignoreVcsIgnoredPaths')
          };
          return PathsLoader.startTask(config, function(results) {
            var isDescendentOfRootPaths, p, _i, _len;
            for (_i = 0, _len = knownPaths.length; _i < _len; _i++) {
              p = knownPaths[_i];
              isDescendentOfRootPaths = rootPaths.some(function(root) {
                return p.indexOf(root) === 0;
              });
              if (!isDescendentOfRootPaths) {
                if (results.removed == null) {
                  results.removed = [];
                }
                results.removed.push(p);
              }
            }
            return resolve(results);
          });
        };
      })(this));
    };

    ColorProject.prototype.updatePaths = function() {
      if (!this.initialized) {
        return Promise.resolve();
      }
      return this.loadPaths().then((function(_this) {
        return function(_arg) {
          var dirtied, p, removed, _i, _len;
          dirtied = _arg.dirtied, removed = _arg.removed;
          _this.deleteVariablesForPaths(removed);
          _this.paths = _this.paths.filter(function(p) {
            return __indexOf.call(removed, p) < 0;
          });
          for (_i = 0, _len = dirtied.length; _i < _len; _i++) {
            p = dirtied[_i];
            if (__indexOf.call(_this.paths, p) < 0) {
              _this.paths.push(p);
            }
          }
          return _this.reloadVariablesForPaths(dirtied);
        };
      })(this));
    };

    ColorProject.prototype.isVariablesSourcePath = function(path) {
      var source, sources, _i, _len;
      if (!path) {
        return false;
      }
      path = atom.project.relativize(path);
      sources = this.getSourceNames();
      for (_i = 0, _len = sources.length; _i < _len; _i++) {
        source = sources[_i];
        if (minimatch(path, source, {
          matchBase: true,
          dot: true
        })) {
          return true;
        }
      }
    };

    ColorProject.prototype.isIgnoredPath = function(path) {
      var ignore, ignoredNames, _i, _len;
      if (!path) {
        return false;
      }
      path = atom.project.relativize(path);
      ignoredNames = this.getIgnoredNames();
      for (_i = 0, _len = ignoredNames.length; _i < _len; _i++) {
        ignore = ignoredNames[_i];
        if (minimatch(path, ignore, {
          matchBase: true,
          dot: true
        })) {
          return true;
        }
      }
    };

    ColorProject.prototype.getPalette = function() {
      if (!this.isInitialized()) {
        return new Palette;
      }
      return new Palette(this.getColorVariables());
    };

    ColorProject.prototype.getContext = function() {
      return this.variables.getContext();
    };

    ColorProject.prototype.getVariables = function() {
      return this.variables.getVariables();
    };

    ColorProject.prototype.getVariableById = function(id) {
      return this.variables.getVariableById(id);
    };

    ColorProject.prototype.getVariableByName = function(name) {
      return this.variables.getVariableByName(name);
    };

    ColorProject.prototype.getColorVariables = function() {
      return this.variables.getColorVariables();
    };

    ColorProject.prototype.showVariableInFile = function(variable) {
      return atom.workspace.open(variable.path).then(function(editor) {
        var buffer, bufferRange;
        buffer = editor.getBuffer();
        bufferRange = Range.fromObject([buffer.positionForCharacterIndex(variable.range[0]), buffer.positionForCharacterIndex(variable.range[1])]);
        return editor.setSelectedBufferRange(bufferRange, {
          autoscroll: true
        });
      });
    };

    ColorProject.prototype.emitVariablesChangeEvent = function(results) {
      return this.emitter.emit('did-update-variables', results);
    };

    ColorProject.prototype.loadVariablesForPath = function(path) {
      return this.loadVariablesForPaths([path]);
    };

    ColorProject.prototype.loadVariablesForPaths = function(paths) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return _this.scanPathsForVariables(paths, function(results) {
            return resolve(results);
          });
        };
      })(this));
    };

    ColorProject.prototype.getVariablesForPath = function(path) {
      return this.variables.getVariablesForPath(path);
    };

    ColorProject.prototype.getVariablesForPaths = function(paths) {
      return this.variables.getVariablesForPaths(paths);
    };

    ColorProject.prototype.deleteVariablesForPath = function(path) {
      return this.deleteVariablesForPaths([path]);
    };

    ColorProject.prototype.deleteVariablesForPaths = function(paths) {
      return this.variables.deleteVariablesForPaths(paths);
    };

    ColorProject.prototype.reloadVariablesForPath = function(path) {
      return this.reloadVariablesForPaths([path]);
    };

    ColorProject.prototype.reloadVariablesForPaths = function(paths) {
      var promise;
      promise = Promise.resolve();
      if (!this.isInitialized()) {
        promise = this.initialize();
      }
      return promise.then((function(_this) {
        return function() {
          if (paths.some(function(path) {
            return __indexOf.call(_this.paths, path) < 0;
          })) {
            return Promise.resolve([]);
          }
          return _this.loadVariablesForPaths(paths);
        };
      })(this)).then((function(_this) {
        return function(results) {
          return _this.variables.updateCollection(results, paths);
        };
      })(this));
    };

    ColorProject.prototype.scanPathsForVariables = function(paths, callback) {
      var colorBuffer;
      if (paths.length === 1 && (colorBuffer = this.colorBufferForPath(paths[0]))) {
        return colorBuffer.scanBufferForVariables().then(function(results) {
          return callback(results);
        });
      } else {
        return PathsScanner.startTask(paths, function(results) {
          return callback(results);
        });
      }
    };

    ColorProject.prototype.loadThemesVariables = function() {
      var div, html, iterator, variables;
      iterator = 0;
      variables = [];
      html = '';
      ATOM_VARIABLES.forEach(function(v) {
        return html += "<div class='" + v + "'>" + v + "</div>";
      });
      div = document.createElement('div');
      div.className = 'pigments-sampler';
      div.innerHTML = html;
      document.body.appendChild(div);
      ATOM_VARIABLES.forEach(function(v, i) {
        var color, end, node, variable;
        node = div.children[i];
        color = getComputedStyle(node).color;
        end = iterator + v.length + color.length + 4;
        variable = {
          name: "@" + v,
          line: i,
          value: color,
          range: [iterator, end],
          path: THEME_VARIABLES
        };
        iterator = end;
        return variables.push(variable);
      });
      document.body.removeChild(div);
      return variables;
    };

    ColorProject.prototype.getRootPaths = function() {
      return atom.project.getPaths();
    };

    ColorProject.prototype.getSourceNames = function() {
      var names, _ref2, _ref3;
      names = ['.pigments'];
      names = names.concat((_ref2 = this.sourceNames) != null ? _ref2 : []);
      if (!this.ignoreGlobalSourceNames) {
        names = names.concat((_ref3 = atom.config.get('pigments.sourceNames')) != null ? _ref3 : []);
      }
      return names;
    };

    ColorProject.prototype.setSourceNames = function(sourceNames) {
      this.sourceNames = sourceNames != null ? sourceNames : [];
      if ((this.initialized == null) && (this.initializePromise == null)) {
        return;
      }
      return this.initialize().then((function(_this) {
        return function() {
          return _this.loadPathsAndVariables(true);
        };
      })(this));
    };

    ColorProject.prototype.setIgnoreGlobalSourceNames = function(ignoreGlobalSourceNames) {
      this.ignoreGlobalSourceNames = ignoreGlobalSourceNames;
      return this.updatePaths();
    };

    ColorProject.prototype.getSearchNames = function() {
      var names, _ref2, _ref3, _ref4, _ref5;
      names = [];
      names = names.concat((_ref2 = this.sourceNames) != null ? _ref2 : []);
      names = names.concat((_ref3 = this.searchNames) != null ? _ref3 : []);
      if (!this.ignoreGlobalSearchNames) {
        names = names.concat((_ref4 = atom.config.get('pigments.sourceNames')) != null ? _ref4 : []);
        names = names.concat((_ref5 = atom.config.get('pigments.extendedSearchNames')) != null ? _ref5 : []);
      }
      return names;
    };

    ColorProject.prototype.setSearchNames = function(searchNames) {
      this.searchNames = searchNames != null ? searchNames : [];
    };

    ColorProject.prototype.setIgnoreGlobalSearchNames = function(ignoreGlobalSearchNames) {
      this.ignoreGlobalSearchNames = ignoreGlobalSearchNames;
    };

    ColorProject.prototype.getIgnoredNames = function() {
      var names, _ref2, _ref3, _ref4;
      names = (_ref2 = this.ignoredNames) != null ? _ref2 : [];
      if (!this.ignoreGlobalIgnoredNames) {
        names = names.concat((_ref3 = this.getGlobalIgnoredNames()) != null ? _ref3 : []);
        names = names.concat((_ref4 = atom.config.get('core.ignoredNames')) != null ? _ref4 : []);
      }
      return names;
    };

    ColorProject.prototype.getGlobalIgnoredNames = function() {
      var _ref2;
      return (_ref2 = atom.config.get('pigments.ignoredNames')) != null ? _ref2.map(function(p) {
        if (/\/\*$/.test(p)) {
          return p + '*';
        } else {
          return p;
        }
      }) : void 0;
    };

    ColorProject.prototype.setIgnoredNames = function(ignoredNames) {
      this.ignoredNames = ignoredNames != null ? ignoredNames : [];
      if ((this.initialized == null) && (this.initializePromise == null)) {
        return;
      }
      return this.initialize().then((function(_this) {
        return function() {
          var dirtied;
          dirtied = _this.paths.filter(function(p) {
            return _this.isIgnoredPath(p);
          });
          _this.deleteVariablesForPaths(dirtied);
          _this.paths = _this.paths.filter(function(p) {
            return !_this.isIgnoredPath(p);
          });
          return _this.loadPathsAndVariables(true);
        };
      })(this));
    };

    ColorProject.prototype.setIgnoreGlobalIgnoredNames = function(ignoreGlobalIgnoredNames) {
      this.ignoreGlobalIgnoredNames = ignoreGlobalIgnoredNames;
      return this.updatePaths();
    };

    ColorProject.prototype.getIgnoredScopes = function() {
      var scopes, _ref2, _ref3;
      scopes = (_ref2 = this.ignoredScopes) != null ? _ref2 : [];
      if (!this.ignoreGlobalIgnoredScopes) {
        scopes = scopes.concat((_ref3 = atom.config.get('pigments.ignoredScopes')) != null ? _ref3 : []);
      }
      scopes = scopes.concat(this.ignoredFiletypes);
      return scopes;
    };

    ColorProject.prototype.setIgnoredScopes = function(ignoredScopes) {
      this.ignoredScopes = ignoredScopes != null ? ignoredScopes : [];
      return this.emitter.emit('did-change-ignored-scopes', this.getIgnoredScopes());
    };

    ColorProject.prototype.setIgnoreGlobalIgnoredScopes = function(ignoreGlobalIgnoredScopes) {
      this.ignoreGlobalIgnoredScopes = ignoreGlobalIgnoredScopes;
      return this.emitter.emit('did-change-ignored-scopes', this.getIgnoredScopes());
    };

    ColorProject.prototype.setSupportedFiletypes = function(supportedFiletypes) {
      this.supportedFiletypes = supportedFiletypes != null ? supportedFiletypes : [];
      this.updateIgnoredFiletypes();
      return this.emitter.emit('did-change-ignored-scopes', this.getIgnoredScopes());
    };

    ColorProject.prototype.updateIgnoredFiletypes = function() {
      return this.ignoredFiletypes = this.getIgnoredFiletypes();
    };

    ColorProject.prototype.getIgnoredFiletypes = function() {
      var filetypes, scopes, _ref2, _ref3;
      filetypes = (_ref2 = this.supportedFiletypes) != null ? _ref2 : [];
      if (!this.ignoreGlobalSupportedFiletypes) {
        filetypes = filetypes.concat((_ref3 = atom.config.get('pigments.supportedFiletypes')) != null ? _ref3 : []);
      }
      if (filetypes.length === 0) {
        filetypes = ['*'];
      }
      if (filetypes.some(function(type) {
        return type === '*';
      })) {
        return [];
      }
      scopes = filetypes.map(function(ext) {
        var _ref4;
        return (_ref4 = atom.grammars.selectGrammar("file." + ext)) != null ? _ref4.scopeName.replace(/\./g, '\\.') : void 0;
      }).filter(function(scope) {
        return scope != null;
      });
      return ["^(?!\\.(" + (scopes.join('|')) + "))"];
    };

    ColorProject.prototype.setIgnoreGlobalSupportedFiletypes = function(ignoreGlobalSupportedFiletypes) {
      this.ignoreGlobalSupportedFiletypes = ignoreGlobalSupportedFiletypes;
      this.updateIgnoredFiletypes();
      return this.emitter.emit('did-change-ignored-scopes', this.getIgnoredScopes());
    };

    ColorProject.prototype.themesIncluded = function() {
      return this.includeThemes;
    };

    ColorProject.prototype.setIncludeThemes = function(includeThemes) {
      if (includeThemes === this.includeThemes) {
        return Promise.resolve();
      }
      this.includeThemes = includeThemes;
      if (this.includeThemes) {
        this.themesSubscription = atom.themes.onDidChangeActiveThemes((function(_this) {
          return function() {
            var variables;
            if (!_this.includeThemes) {
              return;
            }
            variables = _this.loadThemesVariables();
            return _this.variables.updatePathCollection(THEME_VARIABLES, variables);
          };
        })(this));
        this.subscriptions.add(this.themesSubscription);
        return this.variables.addMany(this.loadThemesVariables());
      } else {
        this.subscriptions.remove(this.themesSubscription);
        this.variables.deleteVariablesForPaths([THEME_VARIABLES]);
        return this.themesSubscription.dispose();
      }
    };

    ColorProject.prototype.getTimestamp = function() {
      return new Date();
    };

    ColorProject.prototype.serialize = function() {
      var data;
      data = {
        deserializer: 'ColorProject',
        timestamp: this.getTimestamp(),
        version: SERIALIZE_VERSION,
        markersVersion: SERIALIZE_MARKERS_VERSION,
        globalSourceNames: atom.config.get('pigments.sourceNames'),
        globalIgnoredNames: atom.config.get('pigments.ignoredNames')
      };
      if (this.ignoreGlobalSourceNames != null) {
        data.ignoreGlobalSourceNames = this.ignoreGlobalSourceNames;
      }
      if (this.ignoreGlobalSearchNames != null) {
        data.ignoreGlobalSearchNames = this.ignoreGlobalSearchNames;
      }
      if (this.ignoreGlobalIgnoredNames != null) {
        data.ignoreGlobalIgnoredNames = this.ignoreGlobalIgnoredNames;
      }
      if (this.ignoreGlobalIgnoredScopes != null) {
        data.ignoreGlobalIgnoredScopes = this.ignoreGlobalIgnoredScopes;
      }
      if (this.includeThemes != null) {
        data.includeThemes = this.includeThemes;
      }
      if (this.ignoredScopes != null) {
        data.ignoredScopes = this.ignoredScopes;
      }
      if (this.ignoredNames != null) {
        data.ignoredNames = this.ignoredNames;
      }
      if (this.sourceNames != null) {
        data.sourceNames = this.sourceNames;
      }
      if (this.searchNames != null) {
        data.searchNames = this.searchNames;
      }
      data.buffers = this.serializeBuffers();
      if (this.isInitialized()) {
        data.paths = this.paths;
        data.variables = this.variables.serialize();
      }
      return data;
    };

    ColorProject.prototype.serializeBuffers = function() {
      var colorBuffer, id, out, _ref2;
      out = {};
      _ref2 = this.colorBuffersByEditorId;
      for (id in _ref2) {
        colorBuffer = _ref2[id];
        out[id] = colorBuffer.serialize();
      }
      return out;
    };

    return ColorProject;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL2NvbG9yLXByb2plY3QuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJSQUFBO0lBQUEscUpBQUE7O0FBQUEsRUFBQSxPQUF3QyxPQUFBLENBQVEsTUFBUixDQUF4QyxFQUFDLGVBQUEsT0FBRCxFQUFVLDJCQUFBLG1CQUFWLEVBQStCLGFBQUEsS0FBL0IsQ0FBQTs7QUFBQSxFQUNBLFNBQUEsR0FBWSxPQUFBLENBQVEsV0FBUixDQURaLENBQUE7O0FBQUEsRUFHQSxRQUFpRCxPQUFBLENBQVEsWUFBUixDQUFqRCxFQUFDLDBCQUFBLGlCQUFELEVBQW9CLGtDQUFBLHlCQUhwQixDQUFBOztBQUFBLEVBSUMsa0JBQW1CLE9BQUEsQ0FBUSxRQUFSLEVBQW5CLGVBSkQsQ0FBQTs7QUFBQSxFQUtBLFdBQUEsR0FBYyxPQUFBLENBQVEsZ0JBQVIsQ0FMZCxDQUFBOztBQUFBLEVBTUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSxpQkFBUixDQU5mLENBQUE7O0FBQUEsRUFPQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSLENBUGQsQ0FBQTs7QUFBQSxFQVFBLE9BQUEsR0FBVSxPQUFBLENBQVEsV0FBUixDQVJWLENBQUE7O0FBQUEsRUFTQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSLENBVGQsQ0FBQTs7QUFBQSxFQVVBLFlBQUEsR0FBZSxPQUFBLENBQVEsaUJBQVIsQ0FWZixDQUFBOztBQUFBLEVBV0Esa0JBQUEsR0FBcUIsT0FBQSxDQUFRLHdCQUFSLENBWHJCLENBQUE7O0FBQUEsRUFZQSxtQkFBQSxHQUFzQixPQUFBLENBQVEsd0JBQVIsQ0FadEIsQ0FBQTs7QUFBQSxFQWNBLGNBQUEsR0FBaUIsQ0FDZixZQURlLEVBRWYsbUJBRmUsRUFHZixzQkFIZSxF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

//# sourceURL=/home/cm/.atom/packages/pigments/lib/color-project.coffee
