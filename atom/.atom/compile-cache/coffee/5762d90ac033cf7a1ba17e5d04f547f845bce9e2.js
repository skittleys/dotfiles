(function() {
  var ColorBuffer, ColorBufferElement, ColorMarkerElement, ColorProject, ColorProjectElement, ColorResultsElement, ColorSearch, Palette, PaletteElement;

  ColorBuffer = require('./color-buffer');

  ColorSearch = require('./color-search');

  ColorProject = require('./color-project');

  Palette = require('./palette');

  ColorBufferElement = require('./color-buffer-element');

  ColorMarkerElement = require('./color-marker-element');

  ColorResultsElement = require('./color-results-element');

  ColorProjectElement = require('./color-project-element');

  PaletteElement = require('./palette-element');

  ColorBufferElement.registerViewProvider(ColorBuffer);

  ColorResultsElement.registerViewProvider(ColorSearch);

  ColorProjectElement.registerViewProvider(ColorProject);

  PaletteElement.registerViewProvider(Palette);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL3JlZ2lzdGVyLWVsZW1lbnRzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxpSkFBQTs7QUFBQSxFQUFBLFdBQUEsR0FBYyxPQUFBLENBQVEsZ0JBQVIsQ0FBZCxDQUFBOztBQUFBLEVBQ0EsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQURkLENBQUE7O0FBQUEsRUFFQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGlCQUFSLENBRmYsQ0FBQTs7QUFBQSxFQUdBLE9BQUEsR0FBVSxPQUFBLENBQVEsV0FBUixDQUhWLENBQUE7O0FBQUEsRUFJQSxrQkFBQSxHQUFxQixPQUFBLENBQVEsd0JBQVIsQ0FKckIsQ0FBQTs7QUFBQSxFQUtBLGtCQUFBLEdBQXFCLE9BQUEsQ0FBUSx3QkFBUixDQUxyQixDQUFBOztBQUFBLEVBTUEsbUJBQUEsR0FBc0IsT0FBQSxDQUFRLHlCQUFSLENBTnRCLENBQUE7O0FBQUEsRUFPQSxtQkFBQSxHQUFzQixPQUFBLENBQVEseUJBQVIsQ0FQdEIsQ0FBQTs7QUFBQSxFQVFBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLG1CQUFSLENBUmpCLENBQUE7O0FBQUEsRUFVQSxrQkFBa0IsQ0FBQyxvQkFBbkIsQ0FBd0MsV0FBeEMsQ0FWQSxDQUFBOztBQUFBLEVBV0EsbUJBQW1CLENBQUMsb0JBQXBCLENBQXlDLFdBQXpDLENBWEEsQ0FBQTs7QUFBQSxFQVlBLG1CQUFtQixDQUFDLG9CQUFwQixDQUF5QyxZQUF6QyxDQVpBLENBQUE7O0FBQUEsRUFhQSxjQUFjLENBQUMsb0JBQWYsQ0FBb0MsT0FBcEMsQ0FiQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/home/cm/.atom/packages/pigments/lib/register-elements.coffee
