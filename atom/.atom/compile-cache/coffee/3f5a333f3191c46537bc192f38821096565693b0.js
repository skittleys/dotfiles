(function() {
  var BlendModes, Color, ColorExpression, ExpressionsRegistry, MAX_PER_COMPONENT, SVGColors, blendMethod, clamp, clampInt, comma, contrast, createVariableRegExpString, cssColor, float, floatOrPercent, hexadecimal, int, intOrPercent, isInvalid, mixColors, namePrefixes, notQuote, optionalPercent, pe, percent, ps, readParam, split, strip, variables, _ref, _ref1,
    __slice = [].slice;

  cssColor = require('css-color-function');

  _ref = require('./regexes'), int = _ref.int, float = _ref.float, percent = _ref.percent, optionalPercent = _ref.optionalPercent, intOrPercent = _ref.intOrPercent, floatOrPercent = _ref.floatOrPercent, comma = _ref.comma, notQuote = _ref.notQuote, hexadecimal = _ref.hexadecimal, ps = _ref.ps, pe = _ref.pe, variables = _ref.variables, namePrefixes = _ref.namePrefixes, createVariableRegExpString = _ref.createVariableRegExpString;

  _ref1 = require('./utils'), strip = _ref1.strip, split = _ref1.split, clamp = _ref1.clamp, clampInt = _ref1.clampInt;

  ExpressionsRegistry = require('./expressions-registry');

  ColorExpression = require('./color-expression');

  SVGColors = require('./svg-colors');

  Color = require('./color');

  BlendModes = require('./blend-modes');

  MAX_PER_COMPONENT = {
    red: 255,
    green: 255,
    blue: 255,
    alpha: 1,
    hue: 360,
    saturation: 100,
    lightness: 100
  };

  mixColors = function(color1, color2, amount) {
    var color, inverse;
    if (amount == null) {
      amount = 0.5;
    }
    inverse = 1 - amount;
    color = new Color;
    color.rgba = [Math.floor(color1.red * amount) + Math.floor(color2.red * inverse), Math.floor(color1.green * amount) + Math.floor(color2.green * inverse), Math.floor(color1.blue * amount) + Math.floor(color2.blue * inverse), color1.alpha * amount + color2.alpha * inverse];
    return color;
  };

  contrast = function(base, dark, light, threshold) {
    var _ref2;
    if (dark == null) {
      dark = new Color('black');
    }
    if (light == null) {
      light = new Color('white');
    }
    if (threshold == null) {
      threshold = 0.43;
    }
    if (dark.luma > light.luma) {
      _ref2 = [dark, light], light = _ref2[0], dark = _ref2[1];
    }
    if (base.luma > threshold) {
      return dark;
    } else {
      return light;
    }
  };

  blendMethod = function(registry, name, method) {
    return registry.createExpression(name, strip("" + name + ps + " ( " + notQuote + " " + comma + " " + notQuote + " ) " + pe), function(match, expression, context) {
      var baseColor1, baseColor2, color1, color2, expr, _, _ref2, _ref3;
      _ = match[0], expr = match[1];
      _ref2 = split(expr), color1 = _ref2[0], color2 = _ref2[1];
      baseColor1 = context.readColor(color1);
      baseColor2 = context.readColor(color2);
      if (isInvalid(baseColor1) || isInvalid(baseColor2)) {
        return this.invalid = true;
      }
      return _ref3 = baseColor1.blend(baseColor2, method), this.rgba = _ref3.rgba, _ref3;
    });
  };

  readParam = function(param, block) {
    var name, re, value, _, _ref2;
    re = RegExp("\\$(\\w+):\\s*((-?" + float + ")|" + variables + ")");
    if (re.test(param)) {
      _ref2 = re.exec(param), _ = _ref2[0], name = _ref2[1], value = _ref2[2];
      return block(name, value);
    }
  };

  isInvalid = function(color) {
    return !(color != null ? color.isValid() : void 0);
  };

  module.exports = {
    getRegistry: function(context) {
      var colorRegexp, colors, elmAngle, elmDegreesRegexp, paletteRegexpString, registry;
      registry = new ExpressionsRegistry(ColorExpression);
      registry.createExpression('css_hexa_8', "#(" + hexadecimal + "{8})(?![\\d\\w])", function(match, expression, context) {
        var hexa, _;
        _ = match[0], hexa = match[1];
        return this.hexRGBA = hexa;
      });
      registry.createExpression('css_hexa_6', "#(" + hexadecimal + "{6})(?![\\d\\w])", function(match, expression, context) {
        var hexa, _;
        _ = match[0], hexa = match[1];
        return this.hex = hexa;
      });
      registry.createExpression('css_hexa_4', "(?:" + namePrefixes + ")#(" + hexadecimal + "{4})(?![\\d\\w])", function(match, expression, context) {
        var colorAsInt, hexa, _;
        _ = match[0], hexa = match[1];
        colorAsInt = context.readInt(hexa, 16);
        this.colorExpression = "#" + hexa;
        this.red = (colorAsInt >> 12 & 0xf) * 17;
        this.green = (colorAsInt >> 8 & 0xf) * 17;
        this.blue = (colorAsInt >> 4 & 0xf) * 17;
        return this.alpha = ((colorAsInt & 0xf) * 17) / 255;
      });
      registry.createExpression('css_hexa_3', "(?:" + namePrefixes + ")#(" + hexadecimal + "{3})(?![\\d\\w])", function(match, expression, context) {
        var colorAsInt, hexa, _;
        _ = match[0], hexa = match[1];
        colorAsInt = context.readInt(hexa, 16);
        this.colorExpression = "#" + hexa;
        this.red = (colorAsInt >> 8 & 0xf) * 17;
        this.green = (colorAsInt >> 4 & 0xf) * 17;
        return this.blue = (colorAsInt & 0xf) * 17;
      });
      registry.createExpression('int_hexa_8', "0x(" + hexadecimal + "{8})(?!" + hexadecimal + ")", function(match, expression, context) {
        var hexa, _;
        _ = match[0], hexa = match[1];
        return this.hexARGB = hexa;
      });
      registry.createExpression('int_hexa_6', "0x(" + hexadecimal + "{6})(?!" + hexadecimal + ")", function(match, expression, context) {
        var hexa, _;
        _ = match[0], hexa = match[1];
        return this.hex = hexa;
      });
      registry.createExpression('css_rgb', strip("rgb" + ps + "\\s* (" + intOrPercent + "|" + variables + ") " + comma + " (" + intOrPercent + "|" + variables + ") " + comma + " (" + intOrPercent + "|" + variables + ") " + pe), function(match, expression, context) {
        var b, g, r, _;
        _ = match[0], r = match[1], g = match[2], b = match[3];
        this.red = context.readIntOrPercent(r);
        this.green = context.readIntOrPercent(g);
        this.blue = context.readIntOrPercent(b);
        return this.alpha = 1;
      });
      registry.createExpression('css_rgba', strip("rgba" + ps + "\\s* (" + intOrPercent + "|" + variables + ") " + comma + " (" + intOrPercent + "|" + variables + ") " + comma + " (" + intOrPercent + "|" + variables + ") " + comma + " (" + float + "|" + variables + ") " + pe), function(match, expression, context) {
        var a, b, g, r, _;
        _ = match[0], r = match[1], g = match[2], b = match[3], a = match[4];
        this.red = context.readIntOrPercent(r);
        this.green = context.readIntOrPercent(g);
        this.blue = context.readIntOrPercent(b);
        return this.alpha = context.readFloat(a);
      });
      registry.createExpression('stylus_rgba', strip("rgba" + ps + "\\s* (" + notQuote + ") " + comma + " (" + float + "|" + variables + ") " + pe), function(match, expression, context) {
        var a, baseColor, subexpr, _;
        _ = match[0], subexpr = match[1], a = match[2];
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        this.rgb = baseColor.rgb;
        return this.alpha = context.readFloat(a);
      });
      registry.createExpression('css_hsl', strip("hsl" + ps + "\\s* (" + int + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + pe), function(match, expression, context) {
        var h, hsl, l, s, _;
        _ = match[0], h = match[1], s = match[2], l = match[3];
        hsl = [context.readInt(h), context.readFloat(s), context.readFloat(l)];
        if (hsl.some(function(v) {
          return (v == null) || isNaN(v);
        })) {
          return this.invalid = true;
        }
        this.hsl = hsl;
        return this.alpha = 1;
      });
      registry.createExpression('css_hsla', strip("hsla" + ps + "\\s* (" + int + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + float + "|" + variables + ") " + pe), function(match, expression, context) {
        var a, h, hsl, l, s, _;
        _ = match[0], h = match[1], s = match[2], l = match[3], a = match[4];
        hsl = [context.readInt(h), context.readFloat(s), context.readFloat(l)];
        if (hsl.some(function(v) {
          return (v == null) || isNaN(v);
        })) {
          return this.invalid = true;
        }
        this.hsl = hsl;
        return this.alpha = context.readFloat(a);
      });
      registry.createExpression('hsv', strip("(?:hsv|hsb)" + ps + "\\s* (" + int + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + pe), function(match, expression, context) {
        var h, hsv, s, v, _;
        _ = match[0], h = match[1], s = match[2], v = match[3];
        hsv = [context.readInt(h), context.readFloat(s), context.readFloat(v)];
        if (hsv.some(function(v) {
          return (v == null) || isNaN(v);
        })) {
          return this.invalid = true;
        }
        this.hsv = hsv;
        return this.alpha = 1;
      });
      registry.createExpression('hsva', strip("(?:hsva|hsba)" + ps + "\\s* (" + int + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + float + "|" + variables + ") " + pe), function(match, expression, context) {
        var a, h, hsv, s, v, _;
        _ = match[0], h = match[1], s = match[2], v = match[3], a = match[4];
        hsv = [context.readInt(h), context.readFloat(s), context.readFloat(v)];
        if (hsv.some(function(v) {
          return (v == null) || isNaN(v);
        })) {
          return this.invalid = true;
        }
        this.hsv = hsv;
        return this.alpha = context.readFloat(a);
      });
      registry.createExpression('vec4', strip("vec4" + ps + "\\s* (" + float + ") " + comma + " (" + float + ") " + comma + " (" + float + ") " + comma + " (" + float + ") " + pe), function(match, expression, context) {
        var a, h, l, s, _;
        _ = match[0], h = match[1], s = match[2], l = match[3], a = match[4];
        return this.rgba = [context.readFloat(h) * 255, context.readFloat(s) * 255, context.readFloat(l) * 255, context.readFloat(a)];
      });
      registry.createExpression('hwb', strip("hwb" + ps + "\\s* (" + int + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") (?:" + comma + "(" + float + "|" + variables + "))? " + pe), function(match, expression, context) {
        var a, b, h, w, _;
        _ = match[0], h = match[1], w = match[2], b = match[3], a = match[4];
        this.hwb = [context.readInt(h), context.readFloat(w), context.readFloat(b)];
        return this.alpha = a != null ? context.readFloat(a) : 1;
      });
      registry.createExpression('gray', strip("gray" + ps + "\\s* (" + optionalPercent + "|" + variables + ") (?:" + comma + "(" + float + "|" + variables + "))? " + pe), 1, function(match, expression, context) {
        var a, p, _;
        _ = match[0], p = match[1], a = match[2];
        p = context.readFloat(p) / 100 * 255;
        this.rgb = [p, p, p];
        return this.alpha = a != null ? context.readFloat(a) : 1;
      });
      colors = Object.keys(SVGColors.allCases);
      colorRegexp = "(?:" + namePrefixes + ")(" + (colors.join('|')) + ")(?!\\s*[-\\.:=\\(])\\b";
      registry.createExpression('named_colors', colorRegexp, function(match, expression, context) {
        var name, _;
        _ = match[0], name = match[1];
        this.colorExpression = this.name = name;
        return this.hex = SVGColors.allCases[name].replace('#', '');
      });
      registry.createExpression('darken', strip("darken" + ps + " (" + notQuote + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + pe), function(match, expression, context) {
        var amount, baseColor, h, l, s, subexpr, _, _ref2;
        _ = match[0], subexpr = match[1], amount = match[2];
        amount = context.readFloat(amount);
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        _ref2 = baseColor.hsl, h = _ref2[0], s = _ref2[1], l = _ref2[2];
        this.hsl = [h, s, clampInt(l - amount)];
        return this.alpha = baseColor.alpha;
      });
      registry.createExpression('lighten', strip("lighten" + ps + " (" + notQuote + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + pe), function(match, expression, context) {
        var amount, baseColor, h, l, s, subexpr, _, _ref2;
        _ = match[0], subexpr = match[1], amount = match[2];
        amount = context.readFloat(amount);
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        _ref2 = baseColor.hsl, h = _ref2[0], s = _ref2[1], l = _ref2[2];
        this.hsl = [h, s, clampInt(l + amount)];
        return this.alpha = baseColor.alpha;
      });
      registry.createExpression('fade', strip("(?:fade|alpha)" + ps + " (" + notQuote + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), function(match, expression, context) {
        var amount, baseColor, subexpr, _;
        _ = match[0], subexpr = match[1], amount = match[2];
        amount = context.readFloatOrPercent(amount);
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        this.rgb = baseColor.rgb;
        return this.alpha = amount;
      });
      registry.createExpression('transparentize', strip("(?:transparentize|fadeout|fade-out|fade_out)" + ps + " (" + notQuote + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), function(match, expression, context) {
        var amount, baseColor, subexpr, _;
        _ = match[0], subexpr = match[1], amount = match[2];
        amount = context.readFloatOrPercent(amount);
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        this.rgb = baseColor.rgb;
        return this.alpha = clamp(baseColor.alpha - amount);
      });
      registry.createExpression('opacify', strip("(?:opacify|fadein|fade-in|fade_in)" + ps + " (" + notQuote + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), function(match, expression, context) {
        var amount, baseColor, subexpr, _;
        _ = match[0], subexpr = match[1], amount = match[2];
        amount = context.readFloatOrPercent(amount);
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        this.rgb = baseColor.rgb;
        return this.alpha = clamp(baseColor.alpha + amount);
      });
      registry.createExpression('stylus_component_functions', strip("(red|green|blue)" + ps + " (" + notQuote + ") " + comma + " (" + int + "|" + variables + ") " + pe), function(match, expression, context) {
        var amount, baseColor, channel, subexpr, _;
        _ = match[0], channel = match[1], subexpr = match[2], amount = match[3];
        amount = context.readInt(amount);
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        if (isNaN(amount)) {
          return this.invalid = true;
        }
        return this[channel] = amount;
      });
      registry.createExpression('transparentify', strip("transparentify" + ps + " (" + notQuote + ") " + pe), function(match, expression, context) {
        var alpha, bestAlpha, bottom, expr, processChannel, top, _, _ref2;
        _ = match[0], expr = match[1];
        _ref2 = split(expr), top = _ref2[0], bottom = _ref2[1], alpha = _ref2[2];
        top = context.readColor(top);
        bottom = context.readColor(bottom);
        alpha = context.readFloatOrPercent(alpha);
        if (isInvalid(top)) {
          return this.invalid = true;
        }
        if ((bottom != null) && isInvalid(bottom)) {
          return this.invalid = true;
        }
        if (bottom == null) {
          bottom = new Color(255, 255, 255, 1);
        }
        if (isNaN(alpha)) {
          alpha = void 0;
        }
        bestAlpha = ['red', 'green', 'blue'].map(function(channel) {
          var res;
          res = (top[channel] - bottom[channel]) / ((0 < top[channel] - bottom[channel] ? 255 : 0) - bottom[channel]);
          return res;
        }).sort(function(a, b) {
          return a < b;
        })[0];
        processChannel = function(channel) {
          if (bestAlpha === 0) {
            return bottom[channel];
          } else {
            return bottom[channel] + (top[channel] - bottom[channel]) / bestAlpha;
          }
        };
        if (alpha != null) {
          bestAlpha = alpha;
        }
        bestAlpha = Math.max(Math.min(bestAlpha, 1), 0);
        this.red = processChannel('red');
        this.green = processChannel('green');
        this.blue = processChannel('blue');
        return this.alpha = Math.round(bestAlpha * 100) / 100;
      });
      registry.createExpression('hue', strip("hue" + ps + " (" + notQuote + ") " + comma + " (" + int + "deg|" + variables + ") " + pe), function(match, expression, context) {
        var amount, baseColor, h, l, s, subexpr, _, _ref2;
        _ = match[0], subexpr = match[1], amount = match[2];
        amount = context.readFloat(amount);
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        if (isNaN(amount)) {
          return this.invalid = true;
        }
        _ref2 = baseColor.hsl, h = _ref2[0], s = _ref2[1], l = _ref2[2];
        this.hsl = [amount % 360, s, l];
        return this.alpha = baseColor.alpha;
      });
      registry.createExpression('stylus_sl_component_functions', strip("(saturation|lightness)" + ps + " (" + notQuote + ") " + comma + " (" + intOrPercent + "|" + variables + ") " + pe), function(match, expression, context) {
        var amount, baseColor, channel, subexpr, _;
        _ = match[0], channel = match[1], subexpr = match[2], amount = match[3];
        amount = context.readInt(amount);
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        if (isNaN(amount)) {
          return this.invalid = true;
        }
        baseColor[channel] = amount;
        return this.rgba = baseColor.rgba;
      });
      registry.createExpression('adjust-hue', strip("adjust-hue" + ps + " (" + notQuote + ") " + comma + " (-?" + int + "deg|" + variables + "|-?" + optionalPercent + ") " + pe), function(match, expression, context) {
        var amount, baseColor, h, l, s, subexpr, _, _ref2;
        _ = match[0], subexpr = match[1], amount = match[2];
        amount = context.readFloat(amount);
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        _ref2 = baseColor.hsl, h = _ref2[0], s = _ref2[1], l = _ref2[2];
        this.hsl = [(h + amount) % 360, s, l];
        return this.alpha = baseColor.alpha;
      });
      registry.createExpression('mix', strip("mix" + ps + " ( " + notQuote + " " + comma + " " + notQuote + " " + comma + " (" + floatOrPercent + "|" + variables + ") ) " + pe), function(match, expression, context) {
        var amount, baseColor1, baseColor2, color1, color2, expr, _, _ref2, _ref3;
        _ = match[0], expr = match[1];
        _ref2 = split(expr), color1 = _ref2[0], color2 = _ref2[1], amount = _ref2[2];
        if (amount != null) {
          amount = context.readFloatOrPercent(amount);
        } else {
          amount = 0.5;
        }
        baseColor1 = context.readColor(color1);
        baseColor2 = context.readColor(color2);
        if (isInvalid(baseColor1) || isInvalid(baseColor2)) {
          return this.invalid = true;
        }
        return _ref3 = mixColors(baseColor1, baseColor2, amount), this.rgba = _ref3.rgba, _ref3;
      });
      registry.createExpression('tint', strip("tint" + ps + " (" + notQuote + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), function(match, expression, context) {
        var amount, baseColor, subexpr, white, _;
        _ = match[0], subexpr = match[1], amount = match[2];
        amount = context.readFloatOrPercent(amount);
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        white = new Color(255, 255, 255);
        return this.rgba = mixColors(white, baseColor, amount).rgba;
      });
      registry.createExpression('shade', strip("shade" + ps + " (" + notQuote + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), function(match, expression, context) {
        var amount, baseColor, black, subexpr, _;
        _ = match[0], subexpr = match[1], amount = match[2];
        amount = context.readFloatOrPercent(amount);
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        black = new Color(0, 0, 0);
        return this.rgba = mixColors(black, baseColor, amount).rgba;
      });
      registry.createExpression('desaturate', "desaturate" + ps + "(" + notQuote + ")" + comma + "(" + floatOrPercent + "|" + variables + ")" + pe, function(match, expression, context) {
        var amount, baseColor, h, l, s, subexpr, _, _ref2;
        _ = match[0], subexpr = match[1], amount = match[2];
        amount = context.readFloatOrPercent(amount);
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        _ref2 = baseColor.hsl, h = _ref2[0], s = _ref2[1], l = _ref2[2];
        this.hsl = [h, clampInt(s - amount * 100), l];
        return this.alpha = baseColor.alpha;
      });
      registry.createExpression('saturate', strip("saturate" + ps + " (" + notQuote + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), function(match, expression, context) {
        var amount, baseColor, h, l, s, subexpr, _, _ref2;
        _ = match[0], subexpr = match[1], amount = match[2];
        amount = context.readFloatOrPercent(amount);
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        _ref2 = baseColor.hsl, h = _ref2[0], s = _ref2[1], l = _ref2[2];
        this.hsl = [h, clampInt(s + amount * 100), l];
        return this.alpha = baseColor.alpha;
      });
      registry.createExpression('grayscale', "gr(?:a|e)yscale" + ps + "(" + notQuote + ")" + pe, function(match, expression, context) {
        var baseColor, h, l, s, subexpr, _, _ref2;
        _ = match[0], subexpr = match[1];
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        _ref2 = baseColor.hsl, h = _ref2[0], s = _ref2[1], l = _ref2[2];
        this.hsl = [h, 0, l];
        return this.alpha = baseColor.alpha;
      });
      registry.createExpression('invert', "invert" + ps + "(" + notQuote + ")" + pe, function(match, expression, context) {
        var b, baseColor, g, r, subexpr, _, _ref2;
        _ = match[0], subexpr = match[1];
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        _ref2 = baseColor.rgb, r = _ref2[0], g = _ref2[1], b = _ref2[2];
        this.rgb = [255 - r, 255 - g, 255 - b];
        return this.alpha = baseColor.alpha;
      });
      registry.createExpression('complement', "complement" + ps + "(" + notQuote + ")" + pe, function(match, expression, context) {
        var baseColor, h, l, s, subexpr, _, _ref2;
        _ = match[0], subexpr = match[1];
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        _ref2 = baseColor.hsl, h = _ref2[0], s = _ref2[1], l = _ref2[2];
        this.hsl = [(h + 180) % 360, s, l];
        return this.alpha = baseColor.alpha;
      });
      registry.createExpression('spin', strip("spin" + ps + " (" + notQuote + ") " + comma + " (-?(" + int + ")(deg)?|" + variables + ") " + pe), function(match, expression, context) {
        var angle, baseColor, h, l, s, subexpr, _, _ref2;
        _ = match[0], subexpr = match[1], angle = match[2];
        baseColor = context.readColor(subexpr);
        angle = context.readInt(angle);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        _ref2 = baseColor.hsl, h = _ref2[0], s = _ref2[1], l = _ref2[2];
        this.hsl = [(360 + h + angle) % 360, s, l];
        return this.alpha = baseColor.alpha;
      });
      registry.createExpression('contrast_n_arguments', strip("contrast" + ps + " ( " + notQuote + " " + comma + " " + notQuote + " ) " + pe), function(match, expression, context) {
        var base, baseColor, dark, expr, light, res, threshold, _, _ref2, _ref3;
        _ = match[0], expr = match[1];
        _ref2 = split(expr), base = _ref2[0], dark = _ref2[1], light = _ref2[2], threshold = _ref2[3];
        baseColor = context.readColor(base);
        dark = context.readColor(dark);
        light = context.readColor(light);
        if (threshold != null) {
          threshold = context.readPercent(threshold);
        }
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        if (dark != null ? dark.invalid : void 0) {
          return this.invalid = true;
        }
        if (light != null ? light.invalid : void 0) {
          return this.invalid = true;
        }
        res = contrast(baseColor, dark, light);
        if (isInvalid(res)) {
          return this.invalid = true;
        }
        return _ref3 = contrast(baseColor, dark, light, threshold), this.rgb = _ref3.rgb, _ref3;
      });
      registry.createExpression('contrast_1_argument', strip("contrast" + ps + " (" + notQuote + ") " + pe), function(match, expression, context) {
        var baseColor, subexpr, _, _ref2;
        _ = match[0], subexpr = match[1];
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        return _ref2 = contrast(baseColor), this.rgb = _ref2.rgb, _ref2;
      });
      registry.createExpression('css_color_function', "(?:" + namePrefixes + ")(color" + ps + "(" + notQuote + ")" + pe + ")", function(match, expression, context) {
        var e, expr, rgba, _;
        try {
          _ = match[0], expr = match[1];
          rgba = cssColor.convert(expr);
          this.rgba = context.readColor(rgba).rgba;
          return this.colorExpression = expr;
        } catch (_error) {
          e = _error;
          return this.invalid = true;
        }
      });
      registry.createExpression('sass_adjust_color', "adjust-color" + ps + "(" + notQuote + ")" + pe, 1, function(match, expression, context) {
        var baseColor, param, params, subexpr, subject, _, _i, _len, _ref2;
        _ = match[0], subexpr = match[1];
        _ref2 = split(subexpr), subject = _ref2[0], params = 2 <= _ref2.length ? __slice.call(_ref2, 1) : [];
        baseColor = context.readColor(subject);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        for (_i = 0, _len = params.length; _i < _len; _i++) {
          param = params[_i];
          readParam(param, function(name, value) {
            return baseColor[name] += context.readFloat(value);
          });
        }
        return this.rgba = baseColor.rgba;
      });
      registry.createExpression('sass_scale_color', "scale-color" + ps + "(" + notQuote + ")" + pe, 1, function(match, expression, context) {
        var baseColor, param, params, subexpr, subject, _, _i, _len, _ref2;
        _ = match[0], subexpr = match[1];
        _ref2 = split(subexpr), subject = _ref2[0], params = 2 <= _ref2.length ? __slice.call(_ref2, 1) : [];
        baseColor = context.readColor(subject);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        for (_i = 0, _len = params.length; _i < _len; _i++) {
          param = params[_i];
          readParam(param, function(name, value) {
            var dif, result;
            value = context.readFloat(value) / 100;
            result = value > 0 ? (dif = MAX_PER_COMPONENT[name] - baseColor[name], result = baseColor[name] + dif * value) : result = baseColor[name] * (1 + value);
            return baseColor[name] = result;
          });
        }
        return this.rgba = baseColor.rgba;
      });
      registry.createExpression('sass_change_color', "change-color" + ps + "(" + notQuote + ")" + pe, 1, function(match, expression, context) {
        var baseColor, param, params, subexpr, subject, _, _i, _len, _ref2;
        _ = match[0], subexpr = match[1];
        _ref2 = split(subexpr), subject = _ref2[0], params = 2 <= _ref2.length ? __slice.call(_ref2, 1) : [];
        baseColor = context.readColor(subject);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        for (_i = 0, _len = params.length; _i < _len; _i++) {
          param = params[_i];
          readParam(param, function(name, value) {
            return baseColor[name] = context.readFloat(value);
          });
        }
        return this.rgba = baseColor.rgba;
      });
      registry.createExpression('stylus_blend', strip("blend" + ps + " ( " + notQuote + " " + comma + " " + notQuote + " ) " + pe), function(match, expression, context) {
        var baseColor1, baseColor2, color1, color2, expr, _, _ref2;
        _ = match[0], expr = match[1];
        _ref2 = split(expr), color1 = _ref2[0], color2 = _ref2[1];
        baseColor1 = context.readColor(color1);
        baseColor2 = context.readColor(color2);
        if (isInvalid(baseColor1) || isInvalid(baseColor2)) {
          return this.invalid = true;
        }
        return this.rgba = [baseColor1.red * baseColor1.alpha + baseColor2.red * (1 - baseColor1.alpha), baseColor1.green * baseColor1.alpha + baseColor2.green * (1 - baseColor1.alpha), baseColor1.blue * baseColor1.alpha + baseColor2.blue * (1 - baseColor1.alpha), baseColor1.alpha + baseColor2.alpha - baseColor1.alpha * baseColor2.alpha];
      });
      blendMethod(registry, 'multiply', BlendModes.MULTIPLY);
      blendMethod(registry, 'screen', BlendModes.SCREEN);
      blendMethod(registry, 'overlay', BlendModes.OVERLAY);
      blendMethod(registry, 'softlight', BlendModes.SOFT_LIGHT);
      blendMethod(registry, 'hardlight', BlendModes.HARD_LIGHT);
      blendMethod(registry, 'difference', BlendModes.DIFFERENCE);
      blendMethod(registry, 'exclusion', BlendModes.EXCLUSION);
      blendMethod(registry, 'average', BlendModes.AVERAGE);
      blendMethod(registry, 'negation', BlendModes.NEGATION);
      registry.createExpression('lua_rgba', strip("Color" + ps + "\\s* (" + int + "|" + variables + ") " + comma + " (" + int + "|" + variables + ") " + comma + " (" + int + "|" + variables + ") " + comma + " (" + int + "|" + variables + ") " + pe), function(match, expression, context) {
        var a, b, g, r, _;
        _ = match[0], r = match[1], g = match[2], b = match[3], a = match[4];
        this.red = context.readInt(r);
        this.green = context.readInt(g);
        this.blue = context.readInt(b);
        return this.alpha = context.readInt(a) / 255;
      });
      registry.createExpression('elm_rgba', strip("rgba\\s+ (" + int + "|" + variables + ") \\s+ (" + int + "|" + variables + ") \\s+ (" + int + "|" + variables + ") \\s+ (" + float + "|" + variables + ")"), function(match, expression, context) {
        var a, b, g, r, _;
        _ = match[0], r = match[1], g = match[2], b = match[3], a = match[4];
        this.red = context.readInt(r);
        this.green = context.readInt(g);
        this.blue = context.readInt(b);
        return this.alpha = context.readFloat(a);
      });
      registry.createExpression('elm_rgb', strip("rgb\\s+ (" + int + "|" + variables + ") \\s+ (" + int + "|" + variables + ") \\s+ (" + int + "|" + variables + ")"), function(match, expression, context) {
        var b, g, r, _;
        _ = match[0], r = match[1], g = match[2], b = match[3];
        this.red = context.readInt(r);
        this.green = context.readInt(g);
        return this.blue = context.readInt(b);
      });
      elmAngle = "(?:" + float + "|\\(degrees\\s+(?:" + int + "|" + variables + ")\\))";
      elmDegreesRegexp = new RegExp("\\(degrees\\s+(" + int + "|" + variables + ")\\)");
      registry.createExpression('elm_hsl', strip("hsl\\s+ (" + elmAngle + "|" + variables + ") \\s+ (" + float + "|" + variables + ") \\s+ (" + float + "|" + variables + ")"), function(match, expression, context) {
        var h, hsl, l, m, s, _;
        _ = match[0], h = match[1], s = match[2], l = match[3];
        if (m = elmDegreesRegexp.exec(h)) {
          h = context.readInt(m[1]);
        } else {
          h = context.readFloat(h) * 180 / Math.PI;
        }
        hsl = [h, context.readFloat(s), context.readFloat(l)];
        if (hsl.some(function(v) {
          return (v == null) || isNaN(v);
        })) {
          return this.invalid = true;
        }
        this.hsl = hsl;
        return this.alpha = 1;
      });
      registry.createExpression('elm_hsla', strip("hsla\\s+ (" + elmAngle + "|" + variables + ") \\s+ (" + float + "|" + variables + ") \\s+ (" + float + "|" + variables + ") \\s+ (" + float + "|" + variables + ")"), function(match, expression, context) {
        var a, h, hsl, l, m, s, _;
        _ = match[0], h = match[1], s = match[2], l = match[3], a = match[4];
        if (m = elmDegreesRegexp.exec(h)) {
          h = context.readInt(m[1]);
        } else {
          h = context.readFloat(h) * 180 / Math.PI;
        }
        hsl = [h, context.readFloat(s), context.readFloat(l)];
        if (hsl.some(function(v) {
          return (v == null) || isNaN(v);
        })) {
          return this.invalid = true;
        }
        this.hsl = hsl;
        return this.alpha = context.readFloat(a);
      });
      registry.createExpression('elm_grayscale', "gr(?:a|e)yscale\\s+(" + float + "|" + variables + ")", function(match, expression, context) {
        var amount, _;
        _ = match[0], amount = match[1];
        amount = Math.floor(255 - context.readFloat(amount) * 255);
        return this.rgb = [amount, amount, amount];
      });
      registry.createExpression('elm_complement', strip("complement\\s+(" + notQuote + ")"), function(match, expression, context) {
        var baseColor, h, l, s, subexpr, _, _ref2;
        _ = match[0], subexpr = match[1];
        baseColor = context.readColor(subexpr);
        if (isInvalid(baseColor)) {
          return this.invalid = true;
        }
        _ref2 = baseColor.hsl, h = _ref2[0], s = _ref2[1], l = _ref2[2];
        this.hsl = [(h + 180) % 360, s, l];
        return this.alpha = baseColor.alpha;
      });
      if (context != null ? context.hasColorVariables() : void 0) {
        paletteRegexpString = createVariableRegExpString(context.getColorVariables());
        registry.createExpression('variables', paletteRegexpString, 1, function(match, expression, context) {
          var baseColor, name, _;
          _ = match[0], name = match[1];
          baseColor = context.readColor(name);
          this.colorExpression = name;
          this.variables = baseColor != null ? baseColor.variables : void 0;
          if (isInvalid(baseColor)) {
            return this.invalid = true;
          }
          return this.rgba = baseColor.rgba;
        });
      }
      return registry;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL2NvbG9yLWV4cHJlc3Npb25zLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxrV0FBQTtJQUFBLGtCQUFBOztBQUFBLEVBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxvQkFBUixDQUFYLENBQUE7O0FBQUEsRUFFQSxPQWVJLE9BQUEsQ0FBUSxXQUFSLENBZkosRUFDRSxXQUFBLEdBREYsRUFFRSxhQUFBLEtBRkYsRUFHRSxlQUFBLE9BSEYsRUFJRSx1QkFBQSxlQUpGLEVBS0Usb0JBQUEsWUFMRixFQU1FLHNCQUFBLGNBTkYsRUFPRSxhQUFBLEtBUEYsRUFRRSxnQkFBQSxRQVJGLEVBU0UsbUJBQUEsV0FURixFQVVFLFVBQUEsRUFWRixFQVdFLFVBQUEsRUFYRixFQVlFLGlCQUFBLFNBWkYsRUFhRSxvQkFBQSxZQWJGLEVBY0Usa0NBQUEsMEJBaEJGLENBQUE7O0FBQUEsRUFtQkEsUUFLSSxPQUFBLENBQVEsU0FBUixDQUxKLEVBQ0UsY0FBQSxLQURGLEVBRUUsY0FBQSxLQUZGLEVBR0UsY0FBQSxLQUhGLEVBSUUsaUJBQUEsUUF2QkYsQ0FBQTs7QUFBQSxFQTBCQSxtQkFBQSxHQUFzQixPQUFBLENBQVEsd0JBQVIsQ0ExQnRCLENBQUE7O0FBQUEsRUEyQkEsZUFBQSxHQUFrQixPQUFBLENBQVEsb0JBQVIsQ0EzQmxCLENBQUE7O0FBQUEsRUE0QkEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxjQUFSLENBNUJaLENBQUE7O0FBQUEsRUE2QkEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxTQUFSLENBN0JSLENBQUE7O0FBQUEsRUE4QkEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBOUJiLENBQUE7O0FBQUEsRUFnQ0EsaUJBQUEsR0FDRTtBQUFBLElBQUEsR0FBQSxF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

//# sourceURL=/home/cm/.atom/packages/pigments/lib/color-expressions.coffee
