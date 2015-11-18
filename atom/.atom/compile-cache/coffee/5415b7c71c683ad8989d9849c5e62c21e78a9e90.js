(function() {
  var Color, ColorBuffer, ColorMarker, CompositeDisposable, Emitter, Range, Task, VariablesCollection, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = require('atom'), Emitter = _ref.Emitter, CompositeDisposable = _ref.CompositeDisposable, Task = _ref.Task, Range = _ref.Range;

  Color = require('./color');

  ColorMarker = require('./color-marker');

  VariablesCollection = require('./variables-collection');

  module.exports = ColorBuffer = (function() {
    function ColorBuffer(params) {
      var colorMarkers, _ref1;
      if (params == null) {
        params = {};
      }
      this.editor = params.editor, this.project = params.project, colorMarkers = params.colorMarkers;
      _ref1 = this.editor, this.id = _ref1.id, this.displayBuffer = _ref1.displayBuffer;
      this.emitter = new Emitter;
      this.subscriptions = new CompositeDisposable;
      this.ignoredScopes = [];
      this.colorMarkersByMarkerId = {};
      this.subscriptions.add(this.editor.onDidDestroy((function(_this) {
        return function() {
          return _this.destroy();
        };
      })(this)));
      this.subscriptions.add(this.editor.displayBuffer.onDidTokenize((function(_this) {
        return function() {
          var _ref2;
          return (_ref2 = _this.getColorMarkers()) != null ? _ref2.forEach(function(marker) {
            return marker.checkMarkerScope(true);
          }) : void 0;
        };
      })(this)));
      this.subscriptions.add(this.editor.onDidChange((function(_this) {
        return function() {
          if (_this.initialized && _this.variableInitialized) {
            _this.terminateRunningTask();
          }
          if (_this.timeout != null) {
            return clearTimeout(_this.timeout);
          }
        };
      })(this)));
      this.subscriptions.add(this.editor.onDidStopChanging((function(_this) {
        return function() {
          if (_this.delayBeforeScan === 0) {
            return _this.update();
          } else {
            if (_this.timeout != null) {
              clearTimeout(_this.timeout);
            }
            return _this.timeout = setTimeout(function() {
              _this.update();
              return _this.timeout = null;
            }, _this.delayBeforeScan);
          }
        };
      })(this)));
      this.subscriptions.add(this.editor.onDidChangePath((function(_this) {
        return function(path) {
          if (_this.isVariablesSource()) {
            _this.project.appendPath(path);
          }
          return _this.update();
        };
      })(this)));
      this.subscriptions.add(this.project.onDidUpdateVariables((function(_this) {
        return function() {
          if (!_this.variableInitialized) {
            return;
          }
          return _this.scanBufferForColors().then(function(results) {
            return _this.updateColorMarkers(results);
          });
        };
      })(this)));
      this.subscriptions.add(this.project.onDidChangeIgnoredScopes((function(_this) {
        return function() {
          return _this.updateIgnoredScopes();
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('pigments.delayBeforeScan', (function(_this) {
        return function(delayBeforeScan) {
          _this.delayBeforeScan = delayBeforeScan != null ? delayBeforeScan : 0;
        };
      })(this)));
      this.editor.findMarkers({
        type: 'pigments-variable'
      }).forEach(function(m) {
        return m.destroy();
      });
      if (colorMarkers != null) {
        this.restoreMarkersState(colorMarkers);
        this.cleanUnusedTextEditorMarkers();
      }
      this.updateIgnoredScopes();
      this.initialize();
    }

    ColorBuffer.prototype.onDidUpdateColorMarkers = function(callback) {
      return this.emitter.on('did-update-color-markers', callback);
    };

    ColorBuffer.prototype.onDidDestroy = function(callback) {
      return this.emitter.on('did-destroy', callback);
    };

    ColorBuffer.prototype.initialize = function() {
      if (this.colorMarkers != null) {
        return Promise.resolve();
      }
      if (this.initializePromise != null) {
        return this.initializePromise;
      }
      this.updateVariableRanges();
      this.initializePromise = this.scanBufferForColors().then((function(_this) {
        return function(results) {
          return _this.createColorMarkers(results);
        };
      })(this)).then((function(_this) {
        return function(results) {
          _this.colorMarkers = results;
          return _this.initialized = true;
        };
      })(this));
      this.initializePromise.then((function(_this) {
        return function() {
          return _this.variablesAvailable();
        };
      })(this));
      return this.initializePromise;
    };

    ColorBuffer.prototype.restoreMarkersState = function(colorMarkers) {
      this.updateVariableRanges();
      return this.colorMarkers = colorMarkers.filter(function(state) {
        return state != null;
      }).map((function(_this) {
        return function(state) {
          var color, marker, _ref1;
          marker = (_ref1 = _this.editor.getMarker(state.markerId)) != null ? _ref1 : _this.editor.markBufferRange(state.bufferRange, {
            type: 'pigments-color',
            invalidate: 'touch'
          });
          color = new Color(state.color);
          color.variables = state.variables;
          color.invalid = state.invalid;
          return _this.colorMarkersByMarkerId[marker.id] = new ColorMarker({
            marker: marker,
            color: color,
            text: state.text,
            colorBuffer: _this
          });
        };
      })(this));
    };

    ColorBuffer.prototype.cleanUnusedTextEditorMarkers = function() {
      return this.editor.findMarkers({
        type: 'pigments-color'
      }).forEach((function(_this) {
        return function(m) {
          if (_this.colorMarkersByMarkerId[m.id] == null) {
            return m.destroy();
          }
        };
      })(this));
    };

    ColorBuffer.prototype.variablesAvailable = function() {
      if (this.variablesPromise != null) {
        return this.variablesPromise;
      }
      return this.variablesPromise = this.project.initialize().then((function(_this) {
        return function(results) {
          if (_this.destroyed) {
            return;
          }
          if (results == null) {
            return;
          }
          if (_this.isIgnored() && _this.isVariablesSource()) {
            return _this.scanBufferForVariables();
          }
        };
      })(this)).then((function(_this) {
        return function(results) {
          return _this.scanBufferForColors({
            variables: results
          });
        };
      })(this)).then((function(_this) {
        return function(results) {
          return _this.updateColorMarkers(results);
        };
      })(this)).then((function(_this) {
        return function() {
          return _this.variableInitialized = true;
        };
      })(this))["catch"](function(reason) {
        return console.log(reason);
      });
    };

    ColorBuffer.prototype.update = function() {
      var promise;
      this.terminateRunningTask();
      promise = this.isIgnored() ? this.scanBufferForVariables() : !this.isVariablesSource() ? Promise.resolve([]) : this.project.reloadVariablesForPath(this.editor.getPath());
      return promise.then((function(_this) {
        return function(results) {
          return _this.scanBufferForColors({
            variables: results
          });
        };
      })(this)).then((function(_this) {
        return function(results) {
          return _this.updateColorMarkers(results);
        };
      })(this))["catch"](function(reason) {
        return console.log(reason);
      });
    };

    ColorBuffer.prototype.terminateRunningTask = function() {
      var _ref1;
      return (_ref1 = this.task) != null ? _ref1.terminate() : void 0;
    };

    ColorBuffer.prototype.destroy = function() {
      var _ref1;
      if (this.destroyed) {
        return;
      }
      this.terminateRunningTask();
      this.subscriptions.dispose();
      if ((_ref1 = this.colorMarkers) != null) {
        _ref1.forEach(function(marker) {
          return marker.destroy();
        });
      }
      this.destroyed = true;
      this.emitter.emit('did-destroy');
      return this.emitter.dispose();
    };

    ColorBuffer.prototype.isVariablesSource = function() {
      return this.project.isVariablesSourcePath(this.editor.getPath());
    };

    ColorBuffer.prototype.isIgnored = function() {
      var p;
      p = this.editor.getPath();
      return this.project.isIgnoredPath(p) || !atom.project.contains(p);
    };

    ColorBuffer.prototype.isDestroyed = function() {
      return this.destroyed;
    };

    ColorBuffer.prototype.getPath = function() {
      return this.editor.getPath();
    };

    ColorBuffer.prototype.updateIgnoredScopes = function() {
      var _ref1;
      this.ignoredScopes = this.project.getIgnoredScopes().map(function(scope) {
        try {
          return new RegExp(scope);
        } catch (_error) {}
      }).filter(function(re) {
        return re != null;
      });
      if ((_ref1 = this.getColorMarkers()) != null) {
        _ref1.forEach(function(marker) {
          return marker.checkMarkerScope(true);
        });
      }
      return this.emitter.emit('did-update-color-markers', {
        created: [],
        destroyed: []
      });
    };

    ColorBuffer.prototype.updateVariableRanges = function() {
      var variablesForBuffer;
      variablesForBuffer = this.project.getVariablesForPath(this.editor.getPath());
      return variablesForBuffer.forEach((function(_this) {
        return function(variable) {
          return variable.bufferRange != null ? variable.bufferRange : variable.bufferRange = Range.fromObject([_this.editor.getBuffer().positionForCharacterIndex(variable.range[0]), _this.editor.getBuffer().positionForCharacterIndex(variable.range[1])]);
        };
      })(this));
    };

    ColorBuffer.prototype.scanBufferForVariables = function() {
      var buffer, config, editor, results, taskPath;
      if (this.destroyed) {
        return Promise.reject("This ColorBuffer is already destroyed");
      }
      results = [];
      taskPath = require.resolve('./tasks/scan-buffer-variables-handler');
      editor = this.editor;
      buffer = this.editor.getBuffer();
      config = {
        buffer: this.editor.getText()
      };
      return new Promise((function(_this) {
        return function(resolve, reject) {
          _this.task = Task.once(taskPath, config, function() {
            _this.task = null;
            return resolve(results);
          });
          return _this.task.on('scan-buffer:variables-found', function(variables) {
            return results = results.concat(variables.map(function(variable) {
              variable.path = editor.getPath();
              variable.bufferRange = Range.fromObject([buffer.positionForCharacterIndex(variable.range[0]), buffer.positionForCharacterIndex(variable.range[1])]);
              return variable;
            }));
          });
        };
      })(this));
    };

    ColorBuffer.prototype.getColorMarkers = function() {
      return this.colorMarkers;
    };

    ColorBuffer.prototype.getValidColorMarkers = function() {
      return this.getColorMarkers().filter(function(m) {
        return m.color.isValid();
      });
    };

    ColorBuffer.prototype.getColorMarkerAtBufferPosition = function(bufferPosition) {
      var marker, markers, _i, _len;
      markers = this.editor.findMarkers({
        type: 'pigments-color',
        containsBufferPosition: bufferPosition
      });
      for (_i = 0, _len = markers.length; _i < _len; _i++) {
        marker = markers[_i];
        if (this.colorMarkersByMarkerId[marker.id] != null) {
          return this.colorMarkersByMarkerId[marker.id];
        }
      }
    };

    ColorBuffer.prototype.createColorMarkers = function(results) {
      if (this.destroyed) {
        return Promise.resolve([]);
      }
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var newResults, processResults;
          newResults = [];
          processResults = function() {
            var marker, result, startDate;
            startDate = new Date;
            if (_this.editor.isDestroyed()) {
              return resolve([]);
            }
            while (results.length) {
              result = results.shift();
              marker = _this.editor.markBufferRange(result.bufferRange, {
                type: 'pigments-color',
                invalidate: 'touch'
              });
              newResults.push(_this.colorMarkersByMarkerId[marker.id] = new ColorMarker({
                marker: marker,
                color: result.color,
                text: result.match,
                colorBuffer: _this
              }));
              if (new Date() - startDate > 10) {
                requestAnimationFrame(processResults);
                return;
              }
            }
            return resolve(newResults);
          };
          return processResults();
        };
      })(this));
    };

    ColorBuffer.prototype.findExistingMarkers = function(results) {
      var newMarkers, toCreate;
      newMarkers = [];
      toCreate = [];
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var processResults;
          processResults = function() {
            var marker, result, startDate;
            startDate = new Date;
            while (results.length) {
              result = results.shift();
              if (marker = _this.findColorMarker(result)) {
                newMarkers.push(marker);
              } else {
                toCreate.push(result);
              }
              if (new Date() - startDate > 10) {
                requestAnimationFrame(processResults);
                return;
              }
            }
            return resolve({
              newMarkers: newMarkers,
              toCreate: toCreate
            });
          };
          return processResults();
        };
      })(this));
    };

    ColorBuffer.prototype.updateColorMarkers = function(results) {
      var createdMarkers, newMarkers;
      newMarkers = null;
      createdMarkers = null;
      return this.findExistingMarkers(results).then((function(_this) {
        return function(_arg) {
          var markers, toCreate;
          markers = _arg.newMarkers, toCreate = _arg.toCreate;
          newMarkers = markers;
          return _this.createColorMarkers(toCreate);
        };
      })(this)).then((function(_this) {
        return function(results) {
          var toDestroy;
          createdMarkers = results;
          newMarkers = newMarkers.concat(results);
          if (_this.colorMarkers != null) {
            toDestroy = _this.colorMarkers.filter(function(marker) {
              return __indexOf.call(newMarkers, marker) < 0;
            });
            toDestroy.forEach(function(marker) {
              delete _this.colorMarkersByMarkerId[marker.id];
              return marker.destroy();
            });
          } else {
            toDestroy = [];
          }
          _this.colorMarkers = newMarkers;
          return _this.emitter.emit('did-update-color-markers', {
            created: createdMarkers,
            destroyed: toDestroy
          });
        };
      })(this));
    };

    ColorBuffer.prototype.findColorMarker = function(properties) {
      var marker, _i, _len, _ref1;
      if (properties == null) {
        properties = {};
      }
      if (this.colorMarkers == null) {
        return;
      }
      _ref1 = this.colorMarkers;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        marker = _ref1[_i];
        if (marker != null ? marker.match(properties) : void 0) {
          return marker;
        }
      }
    };

    ColorBuffer.prototype.findColorMarkers = function(properties) {
      var markers;
      if (properties == null) {
        properties = {};
      }
      properties.type = 'pigments-color';
      markers = this.editor.findMarkers(properties);
      return markers.map((function(_this) {
        return function(marker) {
          return _this.colorMarkersByMarkerId[marker.id];
        };
      })(this)).filter(function(marker) {
        return marker != null;
      });
    };

    ColorBuffer.prototype.findValidColorMarkers = function(properties) {
      return this.findColorMarkers(properties).filter((function(_this) {
        return function(marker) {
          var _ref1;
          return (marker != null) && ((_ref1 = marker.color) != null ? _ref1.isValid() : void 0) && !(marker != null ? marker.isIgnored() : void 0);
        };
      })(this));
    };

    ColorBuffer.prototype.scanBufferForColors = function(options) {
      var buffer, collection, config, results, taskPath, variables, _ref1, _ref2, _ref3, _ref4, _ref5;
      if (options == null) {
        options = {};
      }
      if (this.destroyed) {
        return Promise.reject("This ColorBuffer is already destroyed");
      }
      results = [];
      taskPath = require.resolve('./tasks/scan-buffer-colors-handler');
      buffer = this.editor.getBuffer();
      if (options.variables != null) {
        collection = new VariablesCollection();
        collection.addMany(options.variables);
        options.variables = collection;
      }
      variables = this.isVariablesSource() ? ((_ref2 = (_ref3 = options.variables) != null ? _ref3.getVariables() : void 0) != null ? _ref2 : []).concat((_ref1 = this.project.getVariables()) != null ? _ref1 : []) : (_ref4 = (_ref5 = options.variables) != null ? _ref5.getVariables() : void 0) != null ? _ref4 : [];
      config = {
        buffer: this.editor.getText(),
        bufferPath: this.getPath(),
        variables: variables,
        colorVariables: variables.filter(function(v) {
          return v.isColor;
        })
      };
      return new Promise((function(_this) {
        return function(resolve, reject) {
          _this.task = Task.once(taskPath, config, function() {
            _this.task = null;
            return resolve(results);
          });
          return _this.task.on('scan-buffer:colors-found', function(colors) {
            return results = results.concat(colors.map(function(res) {
              res.color = new Color(res.color);
              res.bufferRange = Range.fromObject([buffer.positionForCharacterIndex(res.range[0]), buffer.positionForCharacterIndex(res.range[1])]);
              return res;
            }));
          });
        };
      })(this));
    };

    ColorBuffer.prototype.serialize = function() {
      var _ref1;
      return {
        id: this.id,
        path: this.editor.getPath(),
        colorMarkers: (_ref1 = this.colorMarkers) != null ? _ref1.map(function(marker) {
          return marker.serialize();
        }) : void 0
      };
    };

    return ColorBuffer;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL2NvbG9yLWJ1ZmZlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEscUdBQUE7SUFBQSxxSkFBQTs7QUFBQSxFQUFBLE9BQThDLE9BQUEsQ0FBUSxNQUFSLENBQTlDLEVBQUMsZUFBQSxPQUFELEVBQVUsMkJBQUEsbUJBQVYsRUFBK0IsWUFBQSxJQUEvQixFQUFxQyxhQUFBLEtBQXJDLENBQUE7O0FBQUEsRUFDQSxLQUFBLEdBQVEsT0FBQSxDQUFRLFNBQVIsQ0FEUixDQUFBOztBQUFBLEVBRUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUZkLENBQUE7O0FBQUEsRUFHQSxtQkFBQSxHQUFzQixPQUFBLENBQVEsd0JBQVIsQ0FIdEIsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDUyxJQUFBLHFCQUFDLE1BQUQsR0FBQTtBQUNYLFVBQUEsbUJBQUE7O1FBRFksU0FBTztPQUNuQjtBQUFBLE1BQUMsSUFBQyxDQUFBLGdCQUFBLE1BQUYsRUFBVSxJQUFDLENBQUEsaUJBQUEsT0FBWCxFQUFvQixzQkFBQSxZQUFwQixDQUFBO0FBQUEsTUFDQSxRQUF3QixJQUFDLENBQUEsTUFBekIsRUFBQyxJQUFDLENBQUEsV0FBQSxFQUFGLEVBQU0sSUFBQyxDQUFBLHNCQUFBLGFBRFAsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxHQUFBLENBQUEsT0FGWCxDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBSGpCLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxhQUFELEdBQWUsRUFKZixDQUFBO0FBQUEsTUFNQSxJQUFDLENBQUEsc0JBQUQsR0FBMEIsRUFOMUIsQ0FBQTtBQUFBLE1B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

//# sourceURL=/home/cm/.atom/packages/pigments/lib/color-buffer.coffee
