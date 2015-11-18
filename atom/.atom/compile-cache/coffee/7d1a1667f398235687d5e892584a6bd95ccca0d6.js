(function() {
  var Pigments, PigmentsAPI, SERIALIZE_MARKERS_VERSION, SERIALIZE_VERSION, _ref;

  Pigments = require('../lib/pigments');

  PigmentsAPI = require('../lib/pigments-api');

  _ref = require('../lib/versions'), SERIALIZE_VERSION = _ref.SERIALIZE_VERSION, SERIALIZE_MARKERS_VERSION = _ref.SERIALIZE_MARKERS_VERSION;

  describe("Pigments", function() {
    var pigments, project, workspaceElement, _ref1;
    _ref1 = [], workspaceElement = _ref1[0], pigments = _ref1[1], project = _ref1[2];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      jasmine.attachToDOM(workspaceElement);
      atom.config.set('pigments.sourceNames', ['**/*.sass', '**/*.styl']);
      atom.config.set('pigments.ignoredNames', []);
      atom.config.set('pigments.ignoredScopes', []);
      atom.config.set('pigments.autocompleteScopes', []);
      return waitsForPromise(function() {
        return atom.packages.activatePackage('pigments').then(function(pkg) {
          pigments = pkg.mainModule;
          return project = pigments.getProject();
        });
      });
    });
    it('instanciates a ColorProject instance', function() {
      return expect(pigments.getProject()).toBeDefined();
    });
    it('serializes the project', function() {
      var date;
      date = new Date;
      spyOn(pigments.getProject(), 'getTimestamp').andCallFake(function() {
        return date;
      });
      return expect(pigments.serialize()).toEqual({
        project: {
          deserializer: 'ColorProject',
          timestamp: date,
          version: SERIALIZE_VERSION,
          markersVersion: SERIALIZE_MARKERS_VERSION,
          globalSourceNames: ['**/*.sass', '**/*.styl'],
          globalIgnoredNames: [],
          buffers: {}
        }
      });
    });
    describe('service provider API', function() {
      var buffer, editor, editorElement, service, _ref2;
      _ref2 = [], service = _ref2[0], editor = _ref2[1], editorElement = _ref2[2], buffer = _ref2[3];
      beforeEach(function() {
        waitsForPromise(function() {
          return atom.workspace.open('four-variables.styl').then(function(e) {
            editor = e;
            editorElement = atom.views.getView(e);
            return buffer = project.colorBufferForEditor(editor);
          });
        });
        runs(function() {
          return service = pigments.provideAPI();
        });
        return waitsForPromise(function() {
          return project.initialize();
        });
      });
      it('returns an object conforming to the API', function() {
        expect(service instanceof PigmentsAPI).toBeTruthy();
        expect(service.getProject()).toBe(project);
        expect(service.getPalette()).toEqual(project.getPalette());
        expect(service.getPalette()).not.toBe(project.getPalette());
        expect(service.getVariables()).toEqual(project.getVariables());
        return expect(service.getColorVariables()).toEqual(project.getColorVariables());
      });
      return describe('::observeColorBuffers', function() {
        var spy;
        spy = [][0];
        beforeEach(function() {
          spy = jasmine.createSpy('did-create-color-buffer');
          return service.observeColorBuffers(spy);
        });
        it('calls the callback for every existing color buffer', function() {
          expect(spy).toHaveBeenCalled();
          return expect(spy.calls.length).toEqual(1);
        });
        return it('calls the callback on every new buffer creation', function() {
          waitsForPromise(function() {
            return atom.workspace.open('buttons.styl');
          });
          return runs(function() {
            return expect(spy.calls.length).toEqual(2);
          });
        });
      });
    });
    describe('when deactivated', function() {
      var colorBuffer, editor, editorElement, _ref2;
      _ref2 = [], editor = _ref2[0], editorElement = _ref2[1], colorBuffer = _ref2[2];
      beforeEach(function() {
        waitsForPromise(function() {
          return atom.workspace.open('four-variables.styl').then(function(e) {
            editor = e;
            editorElement = atom.views.getView(e);
            return colorBuffer = project.colorBufferForEditor(editor);
          });
        });
        waitsFor(function() {
          return editorElement.shadowRoot.querySelector('pigments-markers');
        });
        return runs(function() {
          spyOn(project, 'destroy').andCallThrough();
          spyOn(colorBuffer, 'destroy').andCallThrough();
          return pigments.deactivate();
        });
      });
      it('destroys the pigments project', function() {
        return expect(project.destroy).toHaveBeenCalled();
      });
      it('destroys all the color buffers that were created', function() {
        expect(project.colorBufferForEditor(editor)).toBeUndefined();
        expect(project.colorBuffersByEditorId).toBeNull();
        return expect(colorBuffer.destroy).toHaveBeenCalled();
      });
      return it('destroys the color buffer element that were added to the DOM', function() {
        return expect(editorElement.shadowRoot.querySelector('pigments-markers')).not.toExist();
      });
    });
    return describe('pigments:project-settings', function() {
      var item;
      item = null;
      beforeEach(function() {
        atom.commands.dispatch(workspaceElement, 'pigments:project-settings');
        return waitsFor(function() {
          item = atom.workspace.getActivePaneItem();
          return item != null;
        });
      });
      return it('opens a settings view in the active pane', function() {
        return item.matches('pigments-color-project');
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvc3BlYy9waWdtZW50cy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx5RUFBQTs7QUFBQSxFQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsaUJBQVIsQ0FBWCxDQUFBOztBQUFBLEVBQ0EsV0FBQSxHQUFjLE9BQUEsQ0FBUSxxQkFBUixDQURkLENBQUE7O0FBQUEsRUFHQSxPQUFpRCxPQUFBLENBQVEsaUJBQVIsQ0FBakQsRUFBQyx5QkFBQSxpQkFBRCxFQUFvQixpQ0FBQSx5QkFIcEIsQ0FBQTs7QUFBQSxFQUtBLFFBQUEsQ0FBUyxVQUFULEVBQXFCLFNBQUEsR0FBQTtBQUNuQixRQUFBLDBDQUFBO0FBQUEsSUFBQSxRQUF3QyxFQUF4QyxFQUFDLDJCQUFELEVBQW1CLG1CQUFuQixFQUE2QixrQkFBN0IsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO0FBQUEsTUFDQSxPQUFPLENBQUMsV0FBUixDQUFvQixnQkFBcEIsQ0FEQSxDQUFBO0FBQUEsTUFHQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isc0JBQWhCLEVBQXdDLENBQUMsV0FBRCxFQUFjLFdBQWQsQ0FBeEMsQ0FIQSxDQUFBO0FBQUEsTUFJQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsdUJBQWhCLEVBQXlDLEVBQXpDLENBSkEsQ0FBQTtBQUFBLE1BS0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHdCQUFoQixFQUEwQyxFQUExQyxDQUxBLENBQUE7QUFBQSxNQU1BLElBQUksQ0FBQyxNQUFNLENB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

//# sourceURL=/home/cm/.atom/packages/pigments/spec/pigments-spec.coffee
