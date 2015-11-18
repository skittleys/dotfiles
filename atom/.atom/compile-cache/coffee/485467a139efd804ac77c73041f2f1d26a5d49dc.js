(function() {
  var ColorMarkerElement, CompositeDisposable, Emitter, RENDERERS, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, Emitter = _ref.Emitter;

  RENDERERS = {
    'background': require('./renderers/background'),
    'outline': require('./renderers/outline'),
    'underline': require('./renderers/underline'),
    'dot': require('./renderers/dot'),
    'square-dot': require('./renderers/square-dot')
  };

  ColorMarkerElement = (function(_super) {
    __extends(ColorMarkerElement, _super);

    function ColorMarkerElement() {
      return ColorMarkerElement.__super__.constructor.apply(this, arguments);
    }

    ColorMarkerElement.prototype.renderer = new RENDERERS.background;

    ColorMarkerElement.prototype.createdCallback = function() {
      this.emitter = new Emitter;
      return this.released = true;
    };

    ColorMarkerElement.prototype.attachedCallback = function() {};

    ColorMarkerElement.prototype.detachedCallback = function() {};

    ColorMarkerElement.prototype.onDidRelease = function(callback) {
      return this.emitter.on('did-release', callback);
    };

    ColorMarkerElement.prototype.getModel = function() {
      return this.colorMarker;
    };

    ColorMarkerElement.prototype.setModel = function(colorMarker) {
      this.colorMarker = colorMarker;
      if (!this.released) {
        return;
      }
      this.released = false;
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(this.colorMarker.marker.onDidDestroy((function(_this) {
        return function() {
          return _this.release();
        };
      })(this)));
      this.subscriptions.add(this.colorMarker.marker.onDidChange((function(_this) {
        return function(data) {
          var isValid;
          isValid = data.isValid;
          if (isValid) {
            return _this.render();
          } else {
            return _this.release();
          }
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('pigments.markerType', (function(_this) {
        return function(type) {
          return _this.render();
        };
      })(this)));
      return this.render();
    };

    ColorMarkerElement.prototype.destroy = function() {
      var _ref1, _ref2;
      if ((_ref1 = this.parentNode) != null) {
        _ref1.removeChild(this);
      }
      if ((_ref2 = this.subscriptions) != null) {
        _ref2.dispose();
      }
      return this.clear();
    };

    ColorMarkerElement.prototype.render = function() {
      var cls, k, region, regions, style, v, _i, _len, _ref1;
      if (this.colorMarker.marker.displayBuffer.isDestroyed()) {
        return;
      }
      this.innerHTML = '';
      _ref1 = this.renderer.render(this.colorMarker), style = _ref1.style, regions = _ref1.regions, cls = _ref1["class"];
      if (regions != null) {
        for (_i = 0, _len = regions.length; _i < _len; _i++) {
          region = regions[_i];
          this.appendChild(region);
        }
      }
      if (cls != null) {
        this.className = cls;
      } else {
        this.className = '';
      }
      if (style != null) {
        for (k in style) {
          v = style[k];
          this.style[k] = v;
        }
      } else {
        this.style.cssText = '';
      }
      return this.lastMarkerScreenRange = this.colorMarker.getScreenRange();
    };

    ColorMarkerElement.prototype.checkScreenRange = function() {
      if (this.colorMarker == null) {
        return;
      }
      if (!this.lastMarkerScreenRange.isEqual(this.colorMarker.getScreenRange())) {
        return this.render();
      }
    };

    ColorMarkerElement.prototype.isReleased = function() {
      return this.released;
    };

    ColorMarkerElement.prototype.release = function(dispatchEvent) {
      var marker;
      if (dispatchEvent == null) {
        dispatchEvent = true;
      }
      if (this.released) {
        return;
      }
      this.subscriptions.dispose();
      marker = this.colorMarker;
      this.clear();
      if (dispatchEvent) {
        return this.emitter.emit('did-release', {
          marker: marker,
          view: this
        });
      }
    };

    ColorMarkerElement.prototype.clear = function() {
      this.subscriptions = null;
      this.colorMarker = null;
      this.released = true;
      this.innerHTML = '';
      this.className = '';
      return this.style.cssText = '';
    };

    return ColorMarkerElement;

  })(HTMLElement);

  module.exports = ColorMarkerElement = document.registerElement('pigments-color-marker', {
    prototype: ColorMarkerElement.prototype
  });

  ColorMarkerElement.setMarkerType = function(markerType) {
    return this.prototype.renderer = new RENDERERS[markerType];
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL2NvbG9yLW1hcmtlci1lbGVtZW50LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxpRUFBQTtJQUFBO21TQUFBOztBQUFBLEVBQUEsT0FBaUMsT0FBQSxDQUFRLE1BQVIsQ0FBakMsRUFBQywyQkFBQSxtQkFBRCxFQUFzQixlQUFBLE9BQXRCLENBQUE7O0FBQUEsRUFFQSxTQUFBLEdBQ0U7QUFBQSxJQUFBLFlBQUEsRUFBYyxPQUFBLENBQVEsd0JBQVIsQ0FBZDtBQUFBLElBQ0EsU0FBQSxFQUFXLE9BQUEsQ0FBUSxxQkFBUixDQURYO0FBQUEsSUFFQSxXQUFBLEVBQWEsT0FBQSxDQUFRLHVCQUFSLENBRmI7QUFBQSxJQUdBLEtBQUEsRUFBTyxPQUFBLENBQVEsaUJBQVIsQ0FIUDtBQUFBLElBSUEsWUFBQSxFQUFjLE9BQUEsQ0FBUSx3QkFBUixDQUpkO0dBSEYsQ0FBQTs7QUFBQSxFQVNNO0FBQ0oseUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLGlDQUFBLFFBQUEsR0FBVSxHQUFBLENBQUEsU0FBYSxDQUFDLFVBQXhCLENBQUE7O0FBQUEsaUNBRUEsZUFBQSxHQUFpQixTQUFBLEdBQUE7QUFDZixNQUFBLElBQUMsQ0FBQSxPQUFELEdBQVcsR0FBQSxDQUFBLE9BQVgsQ0FBQTthQUNBLElBQUMsQ0FBQSxRQUFELEdBQVksS0FGRztJQUFBLENBRmpCLENBQUE7O0FBQUEsaUNBTUEsZ0JBQUEsR0FBa0IsU0FBQSxHQUFBLENBTmxCLENBQUE7O0FBQUEsaUNBUUEsZ0JBQUEsR0FBa0IsU0FBQSxHQUFBLENBUmxCLENBQUE7O0FBQUEsaUNBVUEsWUFBQSxHQUFjLFNBQUMsUUFBRCxHQUFBO2FBQ1osSUFBQyxDQUFBLE9BQU8sQ0FBQyxFQUFULENBQVksYUFB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

//# sourceURL=/home/cm/.atom/packages/pigments/lib/color-marker-element.coffee
