(function() {
  var Color, ColorMarker, ColorMarkerElement, TextEditor, path, stylesheet, stylesheetPath;

  path = require('path');

  Color = require('../lib/color');

  ColorMarker = require('../lib/color-marker');

  ColorMarkerElement = require('../lib/color-marker-element');

  TextEditor = require('atom').TextEditor;

  stylesheetPath = path.resolve(__dirname, '..', 'styles', 'pigments.less');

  stylesheet = atom.themes.loadStylesheet(stylesheetPath);

  describe('ColorMarkerElement', function() {
    var colorMarker, colorMarkerElement, editor, jasmineContent, marker, _ref;
    _ref = [], editor = _ref[0], marker = _ref[1], colorMarker = _ref[2], colorMarkerElement = _ref[3], jasmineContent = _ref[4];
    beforeEach(function() {
      var color, styleNode, text;
      jasmineContent = document.body.querySelector('#jasmine-content');
      styleNode = document.createElement('style');
      styleNode.textContent = "" + stylesheet;
      jasmineContent.appendChild(styleNode);
      editor = new TextEditor({});
      editor.setText("body {\n  color: red;\n  bar: foo;\n  foo: bar;\n}");
      marker = editor.markBufferRange([[1, 9], [4, 1]], {
        type: 'pigments-color',
        invalidate: 'touch'
      });
      color = new Color('#ff0000');
      text = 'red';
      return colorMarker = new ColorMarker({
        marker: marker,
        color: color,
        text: text,
        colorBuffer: {
          editor: editor,
          ignoredScopes: []
        }
      });
    });
    it('releases itself when the marker is destroyed', function() {
      var eventSpy;
      colorMarkerElement = new ColorMarkerElement;
      colorMarkerElement.setModel(colorMarker);
      eventSpy = jasmine.createSpy('did-release');
      colorMarkerElement.onDidRelease(eventSpy);
      spyOn(colorMarkerElement, 'release').andCallThrough();
      marker.destroy();
      expect(colorMarkerElement.release).toHaveBeenCalled();
      return expect(eventSpy).toHaveBeenCalled();
    });
    describe('when the render mode is set to background', function() {
      var regions;
      regions = [][0];
      beforeEach(function() {
        ColorMarkerElement.setMarkerType('background');
        colorMarkerElement = new ColorMarkerElement;
        colorMarkerElement.setModel(colorMarker);
        return regions = colorMarkerElement.querySelectorAll('.region.background');
      });
      it('creates a region div for the color', function() {
        return expect(regions.length).toEqual(4);
      });
      it('fills the region with the covered text', function() {
        expect(regions[0].textContent).toEqual('red;');
        expect(regions[1].textContent).toEqual('  bar: foo;');
        expect(regions[2].textContent).toEqual('  foo: bar;');
        return expect(regions[3].textContent).toEqual('}');
      });
      it('sets the background of the region with the color css value', function() {
        var region, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = regions.length; _i < _len; _i++) {
          region = regions[_i];
          _results.push(expect(region.style.backgroundColor).toEqual('rgb(255, 0, 0)'));
        }
        return _results;
      });
      describe('when the marker is modified', function() {
        beforeEach(function() {
          spyOn(colorMarkerElement.renderer, 'render').andCallThrough();
          editor.moveToTop();
          return editor.insertText('\n\n');
        });
        return it('renders again the marker content', function() {
          expect(colorMarkerElement.renderer.render).toHaveBeenCalled();
          return expect(colorMarkerElement.querySelectorAll('.region').length).toEqual(4);
        });
      });
      return describe('when released', function() {
        return it('removes all the previously rendered content', function() {
          colorMarkerElement.release();
          return expect(colorMarkerElement.children.length).toEqual(0);
        });
      });
    });
    describe('when the render mode is set to outline', function() {
      var regions;
      regions = [][0];
      beforeEach(function() {
        ColorMarkerElement.setMarkerType('outline');
        colorMarkerElement = new ColorMarkerElement;
        colorMarkerElement.setModel(colorMarker);
        return regions = colorMarkerElement.querySelectorAll('.region.outline');
      });
      it('creates a region div for the color', function() {
        return expect(regions.length).toEqual(4);
      });
      it('fills the region with the covered text', function() {
        expect(regions[0].textContent).toEqual('');
        expect(regions[1].textContent).toEqual('');
        expect(regions[2].textContent).toEqual('');
        return expect(regions[3].textContent).toEqual('');
      });
      it('sets the drop shadow color of the region with the color css value', function() {
        var region, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = regions.length; _i < _len; _i++) {
          region = regions[_i];
          _results.push(expect(region.style.borderColor).toEqual('rgb(255, 0, 0)'));
        }
        return _results;
      });
      describe('when the marker is modified', function() {
        beforeEach(function() {
          spyOn(colorMarkerElement.renderer, 'render').andCallThrough();
          editor.moveToTop();
          return editor.insertText('\n\n');
        });
        return it('renders again the marker content', function() {
          expect(colorMarkerElement.renderer.render).toHaveBeenCalled();
          return expect(colorMarkerElement.querySelectorAll('.region').length).toEqual(4);
        });
      });
      return describe('when released', function() {
        return it('removes all the previously rendered content', function() {
          colorMarkerElement.release();
          return expect(colorMarkerElement.children.length).toEqual(0);
        });
      });
    });
    describe('when the render mode is set to underline', function() {
      var regions;
      regions = [][0];
      beforeEach(function() {
        ColorMarkerElement.setMarkerType('underline');
        colorMarkerElement = new ColorMarkerElement;
        colorMarkerElement.setModel(colorMarker);
        return regions = colorMarkerElement.querySelectorAll('.region.underline');
      });
      it('creates a region div for the color', function() {
        return expect(regions.length).toEqual(4);
      });
      it('fills the region with the covered text', function() {
        expect(regions[0].textContent).toEqual('');
        expect(regions[1].textContent).toEqual('');
        expect(regions[2].textContent).toEqual('');
        return expect(regions[3].textContent).toEqual('');
      });
      it('sets the background of the region with the color css value', function() {
        var region, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = regions.length; _i < _len; _i++) {
          region = regions[_i];
          _results.push(expect(region.style.backgroundColor).toEqual('rgb(255, 0, 0)'));
        }
        return _results;
      });
      describe('when the marker is modified', function() {
        beforeEach(function() {
          spyOn(colorMarkerElement.renderer, 'render').andCallThrough();
          editor.moveToTop();
          return editor.insertText('\n\n');
        });
        return it('renders again the marker content', function() {
          expect(colorMarkerElement.renderer.render).toHaveBeenCalled();
          return expect(colorMarkerElement.querySelectorAll('.region').length).toEqual(4);
        });
      });
      return describe('when released', function() {
        return it('removes all the previously rendered content', function() {
          colorMarkerElement.release();
          return expect(colorMarkerElement.children.length).toEqual(0);
        });
      });
    });
    describe('when the render mode is set to dot', function() {
      var createMarker, markers, markersElements, regions, _ref1;
      _ref1 = [], regions = _ref1[0], markers = _ref1[1], markersElements = _ref1[2];
      createMarker = function(range, color, text) {
        marker = editor.markBufferRange(range, {
          type: 'pigments-color',
          invalidate: 'touch'
        });
        color = new Color(color);
        text = text;
        return colorMarker = new ColorMarker({
          marker: marker,
          color: color,
          text: text,
          colorBuffer: {
            editor: editor,
            ignoredScopes: []
          }
        });
      };
      beforeEach(function() {
        var editorElement;
        editor = new TextEditor({});
        editor.setText("body {\n  background: red, green, blue;\n}");
        editorElement = atom.views.getView(editor);
        jasmineContent.appendChild(editorElement);
        markers = [createMarker([[1, 13], [1, 16]], '#ff0000', 'red'), createMarker([[1, 18], [1, 23]], '#00ff00', 'green'), createMarker([[1, 25], [1, 29]], '#0000ff', 'blue')];
        ColorMarkerElement.setMarkerType('dot');
        return markersElements = markers.map(function(colorMarker) {
          colorMarkerElement = new ColorMarkerElement;
          colorMarkerElement.setModel(colorMarker);
          jasmineContent.appendChild(colorMarkerElement);
          return colorMarkerElement;
        });
      });
      return it('adds the dot class on the marker', function() {
        var markersElement, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = markersElements.length; _i < _len; _i++) {
          markersElement = markersElements[_i];
          _results.push(expect(markersElement.classList.contains('dot')).toBeTruthy());
        }
        return _results;
      });
    });
    return describe('when the render mode is set to dot', function() {
      var createMarker, markers, markersElements, regions, _ref1;
      _ref1 = [], regions = _ref1[0], markers = _ref1[1], markersElements = _ref1[2];
      createMarker = function(range, color, text) {
        marker = editor.markBufferRange(range, {
          type: 'pigments-color',
          invalidate: 'touch'
        });
        color = new Color(color);
        text = text;
        return colorMarker = new ColorMarker({
          marker: marker,
          color: color,
          text: text,
          colorBuffer: {
            editor: editor,
            ignoredScopes: []
          }
        });
      };
      beforeEach(function() {
        var editorElement;
        editor = new TextEditor({});
        editor.setText("body {\n  background: red, green, blue;\n}");
        editorElement = atom.views.getView(editor);
        jasmineContent.appendChild(editorElement);
        markers = [createMarker([[1, 13], [1, 16]], '#ff0000', 'red'), createMarker([[1, 18], [1, 23]], '#00ff00', 'green'), createMarker([[1, 25], [1, 29]], '#0000ff', 'blue')];
        ColorMarkerElement.setMarkerType('square-dot');
        return markersElements = markers.map(function(colorMarker) {
          colorMarkerElement = new ColorMarkerElement;
          colorMarkerElement.setModel(colorMarker);
          jasmineContent.appendChild(colorMarkerElement);
          return colorMarkerElement;
        });
      });
      return it('adds the dot class on the marker', function() {
        var markersElement, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = markersElements.length; _i < _len; _i++) {
          markersElement = markersElements[_i];
          expect(markersElement.classList.contains('dot')).toBeTruthy();
          _results.push(expect(markersElement.classList.contains('square')).toBeTruthy());
        }
        return _results;
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvc3BlYy9jb2xvci1tYXJrZXItZWxlbWVudC1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxvRkFBQTs7QUFBQSxFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUFQLENBQUE7O0FBQUEsRUFDQSxLQUFBLEdBQVEsT0FBQSxDQUFRLGNBQVIsQ0FEUixDQUFBOztBQUFBLEVBRUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxxQkFBUixDQUZkLENBQUE7O0FBQUEsRUFHQSxrQkFBQSxHQUFxQixPQUFBLENBQVEsNkJBQVIsQ0FIckIsQ0FBQTs7QUFBQSxFQUlDLGFBQWMsT0FBQSxDQUFRLE1BQVIsRUFBZCxVQUpELENBQUE7O0FBQUEsRUFNQSxjQUFBLEdBQWlCLElBQUksQ0FBQyxPQUFMLENBQWEsU0FBYixFQUF3QixJQUF4QixFQUE4QixRQUE5QixFQUF3QyxlQUF4QyxDQU5qQixDQUFBOztBQUFBLEVBT0EsVUFBQSxHQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBWixDQUEyQixjQUEzQixDQVBiLENBQUE7O0FBQUEsRUFTQSxRQUFBLENBQVMsb0JBQVQsRUFBK0IsU0FBQSxHQUFBO0FBQzdCLFFBQUEscUVBQUE7QUFBQSxJQUFBLE9BQW9FLEVBQXBFLEVBQUMsZ0JBQUQsRUFBUyxnQkFBVCxFQUFpQixxQkFBakIsRUFBOEIsNEJBQTlCLEVBQWtELHdCQUFsRCxDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsVUFBQSxzQkFBQTtBQUFBLE1BQUEsY0FBQSxHQUFpQixRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWQsQ0FBNEIsa0JBQTVCLENBQWpCLENBQUE7QUFBQSxNQUVBLFNBQUEsR0FBWSxRQUFRLENBQUMsYUFBVCxDQUF1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

//# sourceURL=/home/cm/.atom/packages/pigments/spec/color-marker-element-spec.coffee
