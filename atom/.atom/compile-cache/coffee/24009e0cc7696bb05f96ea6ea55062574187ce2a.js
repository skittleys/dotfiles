(function() {
  var ColorBufferElement, ColorMarkerElement, CompositeDisposable, Emitter, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = require('atom'), Emitter = _ref.Emitter, CompositeDisposable = _ref.CompositeDisposable;

  ColorMarkerElement = require('./color-marker-element');

  ColorBufferElement = (function(_super) {
    __extends(ColorBufferElement, _super);

    function ColorBufferElement() {
      return ColorBufferElement.__super__.constructor.apply(this, arguments);
    }

    ColorBufferElement.prototype.createdCallback = function() {
      var _ref1;
      _ref1 = [0, 0], this.editorScrollLeft = _ref1[0], this.editorScrollTop = _ref1[1];
      this.emitter = new Emitter;
      this.subscriptions = new CompositeDisposable;
      this.shadowRoot = this.createShadowRoot();
      this.displayedMarkers = [];
      this.usedMarkers = [];
      this.unusedMarkers = [];
      this.viewsByMarkers = new WeakMap;
      return this.subscriptions.add(atom.config.observe('pigments.markerType', (function(_this) {
        return function(type) {
          if (type === 'background') {
            return _this.classList.add('above-editor-content');
          } else {
            return _this.classList.remove('above-editor-content');
          }
        };
      })(this)));
    };

    ColorBufferElement.prototype.attachedCallback = function() {
      this.attached = true;
      return this.updateMarkers();
    };

    ColorBufferElement.prototype.detachedCallback = function() {
      return this.attached = false;
    };

    ColorBufferElement.prototype.onDidUpdate = function(callback) {
      return this.emitter.on('did-update', callback);
    };

    ColorBufferElement.prototype.getModel = function() {
      return this.colorBuffer;
    };

    ColorBufferElement.prototype.setModel = function(colorBuffer) {
      var scrollLeftListener, scrollTopListener;
      this.colorBuffer = colorBuffer;
      this.editor = this.colorBuffer.editor;
      if (this.editor.isDestroyed()) {
        return;
      }
      this.editorElement = atom.views.getView(this.editor);
      this.colorBuffer.initialize().then((function(_this) {
        return function() {
          return _this.updateMarkers();
        };
      })(this));
      this.subscriptions.add(this.colorBuffer.onDidUpdateColorMarkers((function(_this) {
        return function() {
          return _this.updateMarkers();
        };
      })(this)));
      this.subscriptions.add(this.colorBuffer.onDidDestroy((function(_this) {
        return function() {
          return _this.destroy();
        };
      })(this)));
      scrollLeftListener = (function(_this) {
        return function(editorScrollLeft) {
          _this.editorScrollLeft = editorScrollLeft;
          return _this.updateScroll();
        };
      })(this);
      scrollTopListener = (function(_this) {
        return function(editorScrollTop) {
          _this.editorScrollTop = editorScrollTop;
          _this.updateScroll();
          return requestAnimationFrame(function() {
            return _this.updateMarkers();
          });
        };
      })(this);
      if (this.editorElement.onDidChangeScrollLeft != null) {
        this.subscriptions.add(this.editorElement.onDidChangeScrollLeft(scrollLeftListener));
        this.subscriptions.add(this.editorElement.onDidChangeScrollTop(scrollTopListener));
      } else {
        this.subscriptions.add(this.editor.onDidChangeScrollLeft(scrollLeftListener));
        this.subscriptions.add(this.editor.onDidChangeScrollTop(scrollTopListener));
      }
      this.subscriptions.add(this.editor.onDidChange((function(_this) {
        return function() {
          return _this.usedMarkers.forEach(function(marker) {
            var _ref1;
            if ((_ref1 = marker.colorMarker) != null) {
              _ref1.invalidateScreenRangeCache();
            }
            return marker.checkScreenRange();
          });
        };
      })(this)));
      this.subscriptions.add(this.editor.onDidAddCursor((function(_this) {
        return function() {
          return _this.requestSelectionUpdate();
        };
      })(this)));
      this.subscriptions.add(this.editor.onDidRemoveCursor((function(_this) {
        return function() {
          return _this.requestSelectionUpdate();
        };
      })(this)));
      this.subscriptions.add(this.editor.onDidChangeCursorPosition((function(_this) {
        return function() {
          return _this.requestSelectionUpdate();
        };
      })(this)));
      this.subscriptions.add(this.editor.onDidAddSelection((function(_this) {
        return function() {
          return _this.requestSelectionUpdate();
        };
      })(this)));
      this.subscriptions.add(this.editor.onDidRemoveSelection((function(_this) {
        return function() {
          return _this.requestSelectionUpdate();
        };
      })(this)));
      this.subscriptions.add(this.editor.onDidChangeSelectionRange((function(_this) {
        return function() {
          return _this.requestSelectionUpdate();
        };
      })(this)));
      this.subscriptions.add(this.editor.displayBuffer.onDidTokenize((function(_this) {
        return function() {
          return _this.editorConfigChanged();
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('editor.fontSize', (function(_this) {
        return function() {
          return _this.editorConfigChanged();
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('editor.lineHeight', (function(_this) {
        return function() {
          return _this.editorConfigChanged();
        };
      })(this)));
      this.subscriptions.add(atom.styles.onDidAddStyleElement((function(_this) {
        return function() {
          return _this.editorConfigChanged();
        };
      })(this)));
      this.subscriptions.add(this.editorElement.onDidAttach((function(_this) {
        return function() {
          return _this.attach();
        };
      })(this)));
      return this.subscriptions.add(this.editorElement.onDidDetach((function(_this) {
        return function() {
          return _this.detach();
        };
      })(this)));
    };

    ColorBufferElement.prototype.attach = function() {
      var _ref1;
      if (this.parentNode != null) {
        return;
      }
      if (this.editorElement == null) {
        return;
      }
      return (_ref1 = this.getEditorRoot().querySelector('.lines')) != null ? _ref1.appendChild(this) : void 0;
    };

    ColorBufferElement.prototype.detach = function() {
      if (this.parentNode == null) {
        return;
      }
      return this.parentNode.removeChild(this);
    };

    ColorBufferElement.prototype.updateScroll = function() {
      if (this.editorElement.hasTiledRendering) {
        return this.style.webkitTransform = "translate3d(" + (-this.editorScrollLeft) + "px, " + (-this.editorScrollTop) + "px, 0)";
      }
    };

    ColorBufferElement.prototype.destroy = function() {
      this.detach();
      this.subscriptions.dispose();
      this.releaseAllMarkerViews();
      return this.colorModel = null;
    };

    ColorBufferElement.prototype.getEditorRoot = function() {
      var _ref1;
      return (_ref1 = this.editorElement.shadowRoot) != null ? _ref1 : this.editorElement;
    };

    ColorBufferElement.prototype.editorConfigChanged = function() {
      if (this.parentNode == null) {
        return;
      }
      this.usedMarkers.forEach((function(_this) {
        return function(marker) {
          if (marker.colorMarker != null) {
            return marker.render();
          } else {
            console.warn("A marker view was found in the used instance pool while having a null model", marker);
            return _this.releaseMarkerElement(marker);
          }
        };
      })(this));
      return this.updateMarkers();
    };

    ColorBufferElement.prototype.requestSelectionUpdate = function() {
      if (this.updateRequested) {
        return;
      }
      this.updateRequested = true;
      return requestAnimationFrame((function(_this) {
        return function() {
          _this.updateRequested = false;
          if (_this.editor.getBuffer().isDestroyed()) {
            return;
          }
          return _this.updateSelections();
        };
      })(this));
    };

    ColorBufferElement.prototype.updateSelections = function() {
      var marker, view, _i, _len, _ref1, _results;
      if (this.editor.isDestroyed()) {
        return;
      }
      _ref1 = this.displayedMarkers;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        marker = _ref1[_i];
        view = this.viewsByMarkers.get(marker);
        if (view != null) {
          view.classList.remove('hidden');
          view.classList.remove('in-fold');
          _results.push(this.hideMarkerIfInSelectionOrFold(marker, view));
        } else {
          _results.push(console.warn("A color marker was found in the displayed markers array without an associated view", marker));
        }
      }
      return _results;
    };

    ColorBufferElement.prototype.updateMarkers = function() {
      var m, markers, _base, _base1, _i, _j, _len, _len1, _ref1, _ref2, _ref3;
      if (this.editor.isDestroyed()) {
        return;
      }
      markers = this.colorBuffer.findValidColorMarkers({
        intersectsScreenRowRange: (_ref1 = typeof (_base = this.editorElement).getVisibleRowRange === "function" ? _base.getVisibleRowRange() : void 0) != null ? _ref1 : typeof (_base1 = this.editor.displayBuffer).getVisibleRowRange === "function" ? _base1.getVisibleRowRange() : void 0
      });
      _ref2 = this.displayedMarkers;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        m = _ref2[_i];
        if (__indexOf.call(markers, m) < 0) {
          this.releaseMarkerView(m);
        }
      }
      for (_j = 0, _len1 = markers.length; _j < _len1; _j++) {
        m = markers[_j];
        if (((_ref3 = m.color) != null ? _ref3.isValid() : void 0) && __indexOf.call(this.displayedMarkers, m) < 0) {
          this.requestMarkerView(m);
        }
      }
      this.displayedMarkers = markers;
      return this.emitter.emit('did-update');
    };

    ColorBufferElement.prototype.requestMarkerView = function(marker) {
      var view;
      if (this.unusedMarkers.length) {
        view = this.unusedMarkers.shift();
      } else {
        view = new ColorMarkerElement;
        view.onDidRelease((function(_this) {
          return function(_arg) {
            var marker;
            marker = _arg.marker;
            _this.displayedMarkers.splice(_this.displayedMarkers.indexOf(marker), 1);
            return _this.releaseMarkerView(marker);
          };
        })(this));
        this.shadowRoot.appendChild(view);
      }
      view.setModel(marker);
      this.hideMarkerIfInSelectionOrFold(marker, view);
      this.usedMarkers.push(view);
      this.viewsByMarkers.set(marker, view);
      return view;
    };

    ColorBufferElement.prototype.releaseMarkerView = function(markerOrView) {
      var marker, view;
      marker = markerOrView;
      view = this.viewsByMarkers.get(markerOrView);
      if (view != null) {
        if (marker != null) {
          this.viewsByMarkers["delete"](marker);
        }
        return this.releaseMarkerElement(view);
      }
    };

    ColorBufferElement.prototype.releaseMarkerElement = function(view) {
      this.usedMarkers.splice(this.usedMarkers.indexOf(view), 1);
      if (!view.isReleased()) {
        view.release(false);
      }
      return this.unusedMarkers.push(view);
    };

    ColorBufferElement.prototype.releaseAllMarkerViews = function() {
      var view, _i, _j, _len, _len1, _ref1, _ref2;
      _ref1 = this.usedMarkers;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        view = _ref1[_i];
        view.destroy();
      }
      _ref2 = this.unusedMarkers;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        view = _ref2[_j];
        view.destroy();
      }
      this.usedMarkers = [];
      return this.unusedMarkers = [];
    };

    ColorBufferElement.prototype.hideMarkerIfInSelectionOrFold = function(marker, view) {
      var markerRange, range, selection, selections, _i, _len, _results;
      selections = this.editor.getSelections();
      _results = [];
      for (_i = 0, _len = selections.length; _i < _len; _i++) {
        selection = selections[_i];
        range = selection.getScreenRange();
        markerRange = marker.getScreenRange();
        if (!((markerRange != null) && (range != null))) {
          continue;
        }
        if (markerRange.intersectsWith(range)) {
          view.classList.add('hidden');
        }
        if (this.editor.isFoldedAtBufferRow(marker.getBufferRange().start.row)) {
          _results.push(view.classList.add('in-fold'));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    ColorBufferElement.prototype.colorMarkerForMouseEvent = function(event) {
      var bufferPosition, position;
      position = this.screenPositionForMouseEvent(event);
      bufferPosition = this.colorBuffer.displayBuffer.bufferPositionForScreenPosition(position);
      return this.colorBuffer.getColorMarkerAtBufferPosition(bufferPosition);
    };

    ColorBufferElement.prototype.screenPositionForMouseEvent = function(event) {
      var pixelPosition;
      pixelPosition = this.pixelPositionForMouseEvent(event);
      if (this.editorElement.screenPositionForPixelPosition != null) {
        return this.editorElement.screenPositionForPixelPosition(pixelPosition);
      } else {
        return this.editor.screenPositionForPixelPosition(pixelPosition);
      }
    };

    ColorBufferElement.prototype.pixelPositionForMouseEvent = function(event) {
      var clientX, clientY, left, rootElement, scrollTarget, top, _ref1, _ref2;
      clientX = event.clientX, clientY = event.clientY;
      scrollTarget = this.editorElement.getScrollTop != null ? this.editorElement : this.editor;
      rootElement = (_ref1 = this.editorElement.shadowRoot) != null ? _ref1 : this.editorElement;
      _ref2 = rootElement.querySelector('.lines').getBoundingClientRect(), top = _ref2.top, left = _ref2.left;
      top = clientY - top + scrollTarget.getScrollTop();
      left = clientX - left + scrollTarget.getScrollLeft();
      return {
        top: top,
        left: left
      };
    };

    return ColorBufferElement;

  })(HTMLElement);

  module.exports = ColorBufferElement = document.registerElement('pigments-markers', {
    prototype: ColorBufferElement.prototype
  });

  ColorBufferElement.registerViewProvider = function(modelClass) {
    return atom.views.addViewProvider(modelClass, function(model) {
      var element;
      element = new ColorBufferElement;
      element.setModel(model);
      return element;
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL2NvbG9yLWJ1ZmZlci1lbGVtZW50LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwwRUFBQTtJQUFBOzt5SkFBQTs7QUFBQSxFQUFBLE9BQWlDLE9BQUEsQ0FBUSxNQUFSLENBQWpDLEVBQUMsZUFBQSxPQUFELEVBQVUsMkJBQUEsbUJBQVYsQ0FBQTs7QUFBQSxFQUNBLGtCQUFBLEdBQXFCLE9BQUEsQ0FBUSx3QkFBUixDQURyQixDQUFBOztBQUFBLEVBR007QUFFSix5Q0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsaUNBQUEsZUFBQSxHQUFpQixTQUFBLEdBQUE7QUFDZixVQUFBLEtBQUE7QUFBQSxNQUFBLFFBQXdDLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBeEMsRUFBQyxJQUFDLENBQUEsMkJBQUYsRUFBb0IsSUFBQyxDQUFBLDBCQUFyQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsT0FBRCxHQUFXLEdBQUEsQ0FBQSxPQURYLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxhQUFELEdBQWlCLEdBQUEsQ0FBQSxtQkFGakIsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLFVBQUQsR0FBYyxJQUFDLENBQUEsZ0JBQUQsQ0FBQSxDQUhkLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxnQkFBRCxHQUFvQixFQUpwQixDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUEsV0FBRCxHQUFlLEVBTGYsQ0FBQTtBQUFBLE1BTUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsRUFOakIsQ0FBQTtBQUFBLE1BT0EsSUFBQyxDQUFBLGNBQUQsR0FBa0IsR0FBQSxDQUFBLE9BUGxCLENBQUE7YUFTQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLE1BQU0sQ0FB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

//# sourceURL=/home/cm/.atom/packages/pigments/lib/color-buffer-element.coffee
