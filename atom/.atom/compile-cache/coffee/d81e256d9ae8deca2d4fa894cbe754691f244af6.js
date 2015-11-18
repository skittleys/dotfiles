(function() {
  var ColorContext, ColorParser;

  require('./spec-helper');

  ColorParser = require('../lib/color-parser');

  ColorContext = require('../lib/color-context');

  describe('ColorParser', function() {
    var asColor, itParses, parser;
    parser = [][0];
    asColor = function(value) {
      return "color:" + value;
    };
    itParses = function(expression) {
      return {
        description: '',
        asColor: function(r, g, b, a) {
          var context;
          if (a == null) {
            a = 1;
          }
          context = this.context;
          return describe(this.description, function() {
            return it("parses '" + expression + "' as a color", function() {
              if (context != null) {
                return expect(parser.parse(expression, context)).toBeColor(r, g, b, a, context.getVariablesNames().sort());
              } else {
                return expect(parser.parse(expression)).toBeColor(r, g, b, a);
              }
            });
          });
        },
        asUndefined: function() {
          var context;
          context = this.context;
          return describe(this.description, function() {
            return it("does not parse '" + expression + "' and return undefined", function() {
              return expect(parser.parse(expression, context)).toBeUndefined();
            });
          });
        },
        asInvalid: function() {
          var context;
          context = this.context;
          return describe(this.description, function() {
            return it("parses '" + expression + "' as an invalid color", function() {
              return expect(parser.parse(expression, context)).not.toBeValid();
            });
          });
        },
        withContext: function(variables) {
          var colorVars, name, path, value, vars;
          vars = [];
          colorVars = [];
          path = "/path/to/file.styl";
          for (name in variables) {
            value = variables[name];
            if (value.indexOf('color:') !== -1) {
              value = value.replace('color:', '');
              vars.push({
                name: name,
                value: value,
                path: path
              });
              colorVars.push({
                name: name,
                value: value,
                path: path
              });
            } else {
              vars.push({
                name: name,
                value: value,
                path: path
              });
            }
          }
          this.context = new ColorContext({
            variables: vars,
            colorVariables: colorVars
          });
          this.description = "with variables context " + (jasmine.pp(variables)) + " ";
          return this;
        }
      };
    };
    beforeEach(function() {
      return parser = new ColorParser;
    });
    itParses('@list-item-height').withContext({
      '@text-height': '@scale-b-xxl * 1rem',
      '@component-line-height': '@text-height',
      '@list-item-height': '@component-line-height'
    }).asUndefined();
    itParses('c').withContext({
      'c': 'c'
    }).asUndefined();
    itParses('c').withContext({
      'c': 'd',
      'd': 'e',
      'e': 'c'
    }).asUndefined();
    itParses('#ff7f00').asColor(255, 127, 0);
    itParses('#f70').asColor(255, 119, 0);
    itParses('#ff7f00cc').asColor(255, 127, 0, 0.8);
    itParses('#f70c').asColor(255, 119, 0, 0.8);
    itParses('0xff7f00').asColor(255, 127, 0);
    itParses('0x00ff7f00').asColor(255, 127, 0, 0);
    itParses('rgb(255,127,0)').asColor(255, 127, 0);
    itParses('rgb(255,127,0)').asColor(255, 127, 0);
    itParses('rgb($r,$g,$b)').asInvalid();
    itParses('rgb($r,0,0)').asInvalid();
    itParses('rgb(0,$g,0)').asInvalid();
    itParses('rgb(0,0,$b)').asInvalid();
    itParses('rgb($r,$g,$b)').withContext({
      '$r': '255',
      '$g': '127',
      '$b': '0'
    }).asColor(255, 127, 0);
    itParses('rgba(255,127,0,0.5)').asColor(255, 127, 0, 0.5);
    itParses('rgba(255,127,0,.5)').asColor(255, 127, 0, 0.5);
    itParses('rgba(255,127,0,)').asUndefined();
    itParses('rgba($r,$g,$b,$a)').asInvalid();
    itParses('rgba($r,0,0,0)').asInvalid();
    itParses('rgba(0,$g,0,0)').asInvalid();
    itParses('rgba(0,0,$b,0)').asInvalid();
    itParses('rgba(0,0,0,$a)').asInvalid();
    itParses('rgba($r,$g,$b,$a)').withContext({
      '$r': '255',
      '$g': '127',
      '$b': '0',
      '$a': '0.5'
    }).asColor(255, 127, 0, 0.5);
    itParses('rgba(green, 0.5)').asColor(0, 128, 0, 0.5);
    itParses('rgba($c,$a,)').asUndefined();
    itParses('rgba($c,$a)').asInvalid();
    itParses('rgba($c,1)').asInvalid();
    itParses('rgba($c, $r)').withContext({
      '$c': asColor('hsv($h, $s, $v)'),
      '$r': '1'
    }).asInvalid();
    itParses('rgba($c,$a)').withContext({
      '$c': asColor('green'),
      '$a': '0.5'
    }).asColor(0, 128, 0, 0.5);
    itParses('hsl(200,50%,50%)').asColor(64, 149, 191);
    itParses('hsl(200,50,50)').asColor(64, 149, 191);
    itParses('hsl($h,$s,$l,)').asUndefined();
    itParses('hsl($h,$s,$l)').asInvalid();
    itParses('hsl($h,0%,0%)').asInvalid();
    itParses('hsl(0,$s,0%)').asInvalid();
    itParses('hsl(0,0%,$l)').asInvalid();
    itParses('hsl($h,$s,$l)').withContext({
      '$h': '200',
      '$s': '50%',
      '$l': '50%'
    }).asColor(64, 149, 191);
    itParses('hsla(200,50%,50%,0.5)').asColor(64, 149, 191, 0.5);
    itParses('hsla(200,50%,50%,.5)').asColor(64, 149, 191, 0.5);
    itParses('hsla(200,50,50,.5)').asColor(64, 149, 191, 0.5);
    itParses('hsla(200,50%,50%,)').asUndefined();
    itParses('hsla($h,$s,$l,$a)').asInvalid();
    itParses('hsla($h,0%,0%,0)').asInvalid();
    itParses('hsla(0,$s,0%,0)').asInvalid();
    itParses('hsla(0,0%,$l,0)').asInvalid();
    itParses('hsla(0,0%,0%,$a)').asInvalid();
    itParses('hsla($h,$s,$l,$a)').withContext({
      '$h': '200',
      '$s': '50%',
      '$l': '50%',
      '$a': '0.5'
    }).asColor(64, 149, 191, 0.5);
    itParses('hsv(200,50%,50%)').asColor(64, 106, 128);
    itParses('hsb(200,50%,50%)').asColor(64, 106, 128);
    itParses('hsb(200,50,50)').asColor(64, 106, 128);
    itParses('hsv($h,$s,$v,)').asUndefined();
    itParses('hsv($h,$s,$v)').asInvalid();
    itParses('hsv($h,0%,0%)').asInvalid();
    itParses('hsv(0,$s,0%)').asInvalid();
    itParses('hsv(0,0%,$v)').asInvalid();
    itParses('hsv($h,$s,$v)').withContext({
      '$h': '200',
      '$s': '50%',
      '$v': '50%'
    }).asColor(64, 106, 128);
    itParses('hsva(200,50%,50%,0.5)').asColor(64, 106, 128, 0.5);
    itParses('hsva(200,50,50,0.5)').asColor(64, 106, 128, 0.5);
    itParses('hsba(200,50%,50%,0.5)').asColor(64, 106, 128, 0.5);
    itParses('hsva(200,50%,50%,.5)').asColor(64, 106, 128, 0.5);
    itParses('hsva(200,50%,50%,)').asUndefined();
    itParses('hsva($h,$s,$v,$a)').asInvalid();
    itParses('hsva($h,0%,0%,0)').asInvalid();
    itParses('hsva(0,$s,0%,0)').asInvalid();
    itParses('hsva(0,0%,$v,0)').asInvalid();
    itParses('hsva($h,$s,$v,$a)').withContext({
      '$h': '200',
      '$s': '50%',
      '$v': '50%',
      '$a': '0.5'
    }).asColor(64, 106, 128, 0.5);
    itParses('hwb(210,40%,40%)').asColor(102, 128, 153);
    itParses('hwb(210,40,40)').asColor(102, 128, 153);
    itParses('hwb(210,40%,40%, 0.5)').asColor(102, 128, 153, 0.5);
    itParses('hwb($h,$w,$b,)').asUndefined();
    itParses('hwb($h,$w,$b)').asInvalid();
    itParses('hwb($h,0%,0%)').asInvalid();
    itParses('hwb(0,$w,0%)').asInvalid();
    itParses('hwb(0,0%,$b)').asInvalid();
    itParses('hwb($h,0%,0%,0)').asInvalid();
    itParses('hwb(0,$w,0%,0)').asInvalid();
    itParses('hwb(0,0%,$b,0)').asInvalid();
    itParses('hwb(0,0%,0%,$a)').asInvalid();
    itParses('hwb($h,$w,$b)').withContext({
      '$h': '210',
      '$w': '40%',
      '$b': '40%'
    }).asColor(102, 128, 153);
    itParses('hwb($h,$w,$b,$a)').withContext({
      '$h': '210',
      '$w': '40%',
      '$b': '40%',
      '$a': '0.5'
    }).asColor(102, 128, 153, 0.5);
    itParses('gray(100%)').asColor(255, 255, 255);
    itParses('gray(100)').asColor(255, 255, 255);
    itParses('gray(100%, 0.5)').asColor(255, 255, 255, 0.5);
    itParses('gray($c, $a,)').asUndefined();
    itParses('gray($c, $a)').asInvalid();
    itParses('gray(0%, $a)').asInvalid();
    itParses('gray($c, 0)').asInvalid();
    itParses('gray($c, $a)').withContext({
      '$c': '100%',
      '$a': '0.5'
    }).asColor(255, 255, 255, 0.5);
    itParses('yellowgreen').asColor('#9acd32');
    itParses('YELLOWGREEN').asColor('#9acd32');
    itParses('yellowGreen').asColor('#9acd32');
    itParses('YellowGreen').asColor('#9acd32');
    itParses('yellow_green').asColor('#9acd32');
    itParses('YELLOW_GREEN').asColor('#9acd32');
    itParses('darken(cyan, 20%)').asColor(0, 153, 153);
    itParses('darken(cyan, 20)').asColor(0, 153, 153);
    itParses('darken(#fff, 100%)').asColor(0, 0, 0);
    itParses('darken(cyan, $r)').asInvalid();
    itParses('darken($c, $r)').withContext({
      '$c': asColor('hsv($h, $s, $v)'),
      '$r': '1'
    }).asInvalid();
    itParses('darken($c, $r)').withContext({
      '$c': asColor('cyan'),
      '$r': '20%'
    }).asColor(0, 153, 153);
    itParses('darken($a, $r)').withContext({
      '$a': asColor('rgba($c, 1)'),
      '$c': asColor('cyan'),
      '$r': '20%'
    }).asColor(0, 153, 153);
    itParses('lighten(cyan, 20%)').asColor(102, 255, 255);
    itParses('lighten(cyan, 20)').asColor(102, 255, 255);
    itParses('lighten(#000, 100%)').asColor(255, 255, 255);
    itParses('lighten(cyan, $r)').asInvalid();
    itParses('lighten($c, $r)').withContext({
      '$c': asColor('hsv($h, $s, $v)'),
      '$r': '1'
    }).asInvalid();
    itParses('lighten($c, $r)').withContext({
      '$c': asColor('cyan'),
      '$r': '20%'
    }).asColor(102, 255, 255);
    itParses('lighten($a, $r)').withContext({
      '$a': asColor('rgba($c, 1)'),
      '$c': asColor('cyan'),
      '$r': '20%'
    }).asColor(102, 255, 255);
    itParses('transparentize(cyan, 50%)').asColor(0, 255, 255, 0.5);
    itParses('transparentize(cyan, 50)').asColor(0, 255, 255, 0.5);
    itParses('transparentize(cyan, 0.5)').asColor(0, 255, 255, 0.5);
    itParses('transparentize(cyan, .5)').asColor(0, 255, 255, 0.5);
    itParses('fadeout(cyan, 0.5)').asColor(0, 255, 255, 0.5);
    itParses('fade-out(cyan, 0.5)').asColor(0, 255, 255, 0.5);
    itParses('fade_out(cyan, 0.5)').asColor(0, 255, 255, 0.5);
    itParses('fadeout(cyan, .5)').asColor(0, 255, 255, 0.5);
    itParses('fadeout(cyan, @r)').asInvalid();
    itParses('fadeout($c, $r)').withContext({
      '$c': asColor('hsv($h, $s, $v)'),
      '$r': '1'
    }).asInvalid();
    itParses('fadeout(@c, @r)').withContext({
      '@c': asColor('cyan'),
      '@r': '0.5'
    }).asColor(0, 255, 255, 0.5);
    itParses('fadeout(@a, @r)').withContext({
      '@a': asColor('rgba(@c, 1)'),
      '@c': asColor('cyan'),
      '@r': '0.5'
    }).asColor(0, 255, 255, 0.5);
    itParses('opacify(0x7800FFFF, 50%)').asColor(0, 255, 255, 1);
    itParses('opacify(0x7800FFFF, 50)').asColor(0, 255, 255, 1);
    itParses('opacify(0x7800FFFF, 0.5)').asColor(0, 255, 255, 1);
    itParses('opacify(0x7800FFFF, .5)').asColor(0, 255, 255, 1);
    itParses('fadein(0x7800FFFF, 0.5)').asColor(0, 255, 255, 1);
    itParses('fade-in(0x7800FFFF, 0.5)').asColor(0, 255, 255, 1);
    itParses('fade_in(0x7800FFFF, 0.5)').asColor(0, 255, 255, 1);
    itParses('fadein(0x7800FFFF, .5)').asColor(0, 255, 255, 1);
    itParses('fadein(0x7800FFFF, @r)').asInvalid();
    itParses('fadein($c, $r)').withContext({
      '$c': asColor('hsv($h, $s, $v)'),
      '$r': '1'
    }).asInvalid();
    itParses('fadein(@c, @r)').withContext({
      '@c': asColor('0x7800FFFF'),
      '@r': '0.5'
    }).asColor(0, 255, 255, 1);
    itParses('fadein(@a, @r)').withContext({
      '@a': asColor('rgba(@c, 1)'),
      '@c': asColor('0x7800FFFF'),
      '@r': '0.5'
    }).asColor(0, 255, 255, 1);
    itParses('saturate(#855, 20%)').asColor(158, 63, 63);
    itParses('saturate(#855, 20)').asColor(158, 63, 63);
    itParses('saturate(#855, 0.2)').asColor(158, 63, 63);
    itParses('saturate(#855, @r)').asInvalid();
    itParses('saturate($c, $r)').withContext({
      '$c': asColor('hsv($h, $s, $v)'),
      '$r': '1'
    }).asInvalid();
    itParses('saturate(@c, @r)').withContext({
      '@c': asColor('#855'),
      '@r': '0.2'
    }).asColor(158, 63, 63);
    itParses('saturate(@a, @r)').withContext({
      '@a': asColor('rgba(@c, 1)'),
      '@c': asColor('#855'),
      '@r': '0.2'
    }).asColor(158, 63, 63);
    itParses('desaturate(#9e3f3f, 20%)').asColor(136, 85, 85);
    itParses('desaturate(#9e3f3f, 20)').asColor(136, 85, 85);
    itParses('desaturate(#9e3f3f, 0.2)').asColor(136, 85, 85);
    itParses('desaturate(#9e3f3f, .2)').asColor(136, 85, 85);
    itParses('desaturate(#9e3f3f, @r)').asInvalid();
    itParses('desaturate($c, $r)').withContext({
      '$c': asColor('hsv($h, $s, $v)'),
      '$r': '1'
    }).asInvalid();
    itParses('desaturate(@c, @r)').withContext({
      '@c': asColor('#9e3f3f'),
      '@r': '0.2'
    }).asColor(136, 85, 85);
    itParses('desaturate(@a, @r)').withContext({
      '@a': asColor('rgba(@c, 1)'),
      '@c': asColor('#9e3f3f'),
      '@r': '0.2'
    }).asColor(136, 85, 85);
    itParses('grayscale(#9e3f3f)').asColor(111, 111, 111);
    itParses('greyscale(#9e3f3f)').asColor(111, 111, 111);
    itParses('grayscale(@c)').asInvalid();
    itParses('grayscale($c)').withContext({
      '$c': asColor('hsv($h, $s, $v)')
    }).asInvalid();
    itParses('grayscale(@c)').withContext({
      '@c': asColor('#9e3f3f')
    }).asColor(111, 111, 111);
    itParses('grayscale(@a)').withContext({
      '@a': asColor('rgba(@c, 1)'),
      '@c': asColor('#9e3f3f')
    }).asColor(111, 111, 111);
    itParses('invert(#9e3f3f)').asColor(97, 192, 192);
    itParses('invert(@c)').asInvalid();
    itParses('invert($c)').withContext({
      '$c': asColor('hsv($h, $s, $v)')
    }).asInvalid();
    itParses('invert(@c)').withContext({
      '@c': asColor('#9e3f3f')
    }).asColor(97, 192, 192);
    itParses('invert(@a)').withContext({
      '@a': asColor('rgba(@c, 1)'),
      '@c': asColor('#9e3f3f')
    }).asColor(97, 192, 192);
    itParses('adjust-hue(#811, 45deg)').asColor(136, 106, 17);
    itParses('adjust-hue(#811, -45deg)').asColor(136, 17, 106);
    itParses('adjust-hue(#811, 45%)').asColor(136, 106, 17);
    itParses('adjust-hue(#811, -45%)').asColor(136, 17, 106);
    itParses('adjust-hue(#811, 45)').asColor(136, 106, 17);
    itParses('adjust-hue(#811, -45)').asColor(136, 17, 106);
    itParses('adjust-hue($c, $r)').asInvalid();
    itParses('adjust-hue($c, $r)').withContext({
      '$c': asColor('hsv($h, $s, $v)'),
      '$r': '1'
    }).asInvalid();
    itParses('adjust-hue($c, $r)').withContext({
      '$c': asColor('#811'),
      '$r': '-45deg'
    }).asColor(136, 17, 106);
    itParses('adjust-hue($a, $r)').withContext({
      '$a': asColor('rgba($c, 0.5)'),
      '$c': asColor('#811'),
      '$r': '-45deg'
    }).asColor(136, 17, 106, 0.5);
    itParses('mix(rgb(255,0,0), blue)').asColor(127, 0, 127);
    itParses('mix(red, rgb(0,0,255), 25%)').asColor(63, 0, 191);
    itParses('mix(red, rgb(0,0,255), 25)').asColor(63, 0, 191);
    itParses('mix($a, $b, $r)').asInvalid();
    itParses('mix($a, $b, $r)').withContext({
      '$a': asColor('hsv($h, $s, $v)'),
      '$b': asColor('blue'),
      '$r': '25%'
    }).asInvalid();
    itParses('mix($a, $b, $r)').withContext({
      '$a': asColor('blue'),
      '$b': asColor('hsv($h, $s, $v)'),
      '$r': '25%'
    }).asInvalid();
    itParses('mix($a, $b, $r)').withContext({
      '$a': asColor('red'),
      '$b': asColor('blue'),
      '$r': '25%'
    }).asColor(63, 0, 191);
    itParses('mix($c, $d, $r)').withContext({
      '$a': asColor('red'),
      '$b': asColor('blue'),
      '$c': asColor('rgba($a, 1)'),
      '$d': asColor('rgba($b, 1)'),
      '$r': '25%'
    }).asColor(63, 0, 191);
    itParses('tint(#fd0cc7,66%)').asColor(254, 172, 235);
    itParses('tint(#fd0cc7,66)').asColor(254, 172, 235);
    itParses('tint($c,$r)').asInvalid();
    itParses('tint($c, $r)').withContext({
      '$c': asColor('hsv($h, $s, $v)'),
      '$r': '1'
    }).asInvalid();
    itParses('tint($c,$r)').withContext({
      '$c': asColor('#fd0cc7'),
      '$r': '66%'
    }).asColor(254, 172, 235);
    itParses('tint($c,$r)').withContext({
      '$a': asColor('#fd0cc7'),
      '$c': asColor('rgba($a, 0.9)'),
      '$r': '66%'
    }).asColor(254, 172, 235, 0.966);
    itParses('shade(#fd0cc7,66%)').asColor(86, 4, 67);
    itParses('shade(#fd0cc7,66)').asColor(86, 4, 67);
    itParses('shade($c,$r)').asInvalid();
    itParses('shade($c, $r)').withContext({
      '$c': asColor('hsv($h, $s, $v)'),
      '$r': '1'
    }).asInvalid();
    itParses('shade($c,$r)').withContext({
      '$c': asColor('#fd0cc7'),
      '$r': '66%'
    }).asColor(86, 4, 67);
    itParses('shade($c,$r)').withContext({
      '$a': asColor('#fd0cc7'),
      '$c': asColor('rgba($a, 0.9)'),
      '$r': '66%'
    }).asColor(86, 4, 67, 0.966);
    itParses('color(#fd0cc7 tint(66%))').asColor(254, 172, 236);
    itParses('adjust-color(#102030, $red: -5, $blue: 5)', 11, 32, 53);
    itParses('adjust-color(hsl(25, 100%, 80%), $lightness: -30%, $alpha: -0.4)', 255, 106, 0, 0.6);
    itParses('adjust-color($c, $red: $a, $blue: $b)').asInvalid();
    itParses('adjust-color($d, $red: $a, $blue: $b)').withContext({
      '$a': '-5',
      '$b': '5',
      '$d': asColor('rgba($c, 1)')
    }).asInvalid();
    itParses('adjust-color($c, $red: $a, $blue: $b)').withContext({
      '$a': '-5',
      '$b': '5',
      '$c': asColor('#102030')
    }).asColor(11, 32, 53);
    itParses('adjust-color($d, $red: $a, $blue: $b)').withContext({
      '$a': '-5',
      '$b': '5',
      '$c': asColor('#102030'),
      '$d': asColor('rgba($c, 1)')
    }).asColor(11, 32, 53);
    itParses('scale-color(rgb(200, 150, 170), $green: -40%, $blue: 70%)').asColor(200, 90, 230);
    itParses('change-color(rgb(200, 150, 170), $green: 40, $blue: 70)').asColor(200, 40, 70);
    itParses('scale-color($c, $green: $a, $blue: $b)').asInvalid();
    itParses('scale-color($d, $green: $a, $blue: $b)').withContext({
      '$a': '-40%',
      '$b': '70%',
      '$d': asColor('rgba($c, 1)')
    }).asInvalid();
    itParses('scale-color($c, $green: $a, $blue: $b)').withContext({
      '$a': '-40%',
      '$b': '70%',
      '$c': asColor('rgb(200, 150, 170)')
    }).asColor(200, 90, 230);
    itParses('scale-color($d, $green: $a, $blue: $b)').withContext({
      '$a': '-40%',
      '$b': '70%',
      '$c': asColor('rgb(200, 150, 170)'),
      '$d': asColor('rgba($c, 1)')
    }).asColor(200, 90, 230);
    itParses('spin(#F00, 120)').asColor(0, 255, 0);
    itParses('spin(#F00, 120)').asColor(0, 255, 0);
    itParses('spin(#F00, 120deg)').asColor(0, 255, 0);
    itParses('spin(#F00, -120)').asColor(0, 0, 255);
    itParses('spin(#F00, -120deg)').asColor(0, 0, 255);
    itParses('spin(@c, @a)').withContext({
      '@c': asColor('#F00'),
      '@a': '120'
    }).asColor(0, 255, 0);
    itParses('spin(@c, @a)').withContext({
      '@a': '120'
    }).asInvalid();
    itParses('spin(@c, @a)').withContext({
      '@a': '120'
    }).asInvalid();
    itParses('spin(@c, @a,)').asUndefined();
    itParses('fade(#F00, 0.5)').asColor(255, 0, 0, 0.5);
    itParses('fade(#F00, 50%)').asColor(255, 0, 0, 0.5);
    itParses('fade(#F00, 50)').asColor(255, 0, 0, 0.5);
    itParses('fade(@c, @a)').withContext({
      '@c': asColor('#F00'),
      '@a': '0.5'
    }).asColor(255, 0, 0, 0.5);
    itParses('fade(@c, @a)').withContext({
      '@a': '0.5'
    }).asInvalid();
    itParses('fade(@c, @a)').withContext({
      '@a': '0.5'
    }).asInvalid();
    itParses('fade(@c, @a,)').asUndefined();
    itParses('contrast(#bbbbbb)').asColor(0, 0, 0);
    itParses('contrast(#333333)').asColor(255, 255, 255);
    itParses('contrast(#bbbbbb, rgb(20,20,20))').asColor(20, 20, 20);
    itParses('contrast(#333333, rgb(20,20,20), rgb(140,140,140))').asColor(140, 140, 140);
    itParses('contrast(#666666, rgb(20,20,20), rgb(140,140,140), 13%)').asColor(140, 140, 140);
    itParses('contrast(@base)').withContext({
      '@base': asColor('#bbbbbb')
    }).asColor(0, 0, 0);
    itParses('contrast(@base)').withContext({
      '@base': asColor('#333333')
    }).asColor(255, 255, 255);
    itParses('contrast(@base, @dark)').withContext({
      '@base': asColor('#bbbbbb'),
      '@dark': asColor('rgb(20,20,20)')
    }).asColor(20, 20, 20);
    itParses('contrast(@base, @dark, @light)').withContext({
      '@base': asColor('#333333'),
      '@dark': asColor('rgb(20,20,20)'),
      '@light': asColor('rgb(140,140,140)')
    }).asColor(140, 140, 140);
    itParses('contrast(@base, @dark, @light, @threshold)').withContext({
      '@base': asColor('#666666'),
      '@dark': asColor('rgb(20,20,20)'),
      '@light': asColor('rgb(140,140,140)'),
      '@threshold': '13%'
    }).asColor(140, 140, 140);
    itParses('contrast(@base)').asInvalid();
    itParses('contrast(@base)').asInvalid();
    itParses('contrast(@base, @dark)').asInvalid();
    itParses('contrast(@base, @dark, @light)').asInvalid();
    itParses('contrast(@base, @dark, @light, @threshold)').asInvalid();
    itParses('multiply(#ff6600, 0x666666)').asColor('#662900');
    itParses('multiply(@base, @modifier)').withContext({
      '@base': asColor('#ff6600'),
      '@modifier': asColor('#666666')
    }).asColor('#662900');
    itParses('multiply(@base, @modifier)').asInvalid();
    itParses('screen(#ff6600, 0x666666)').asColor('#ffa366');
    itParses('screen(@base, @modifier)').withContext({
      '@base': asColor('#ff6600'),
      '@modifier': asColor('#666666')
    }).asColor('#ffa366');
    itParses('screen(@base, @modifier)').asInvalid();
    itParses('overlay(#ff6600, 0x666666)').asColor('#ff5200');
    itParses('overlay(@base, @modifier)').withContext({
      '@base': asColor('#ff6600'),
      '@modifier': asColor('#666666')
    }).asColor('#ff5200');
    itParses('overlay(@base, @modifier)').asInvalid();
    itParses('softlight(#ff6600, 0x666666)').asColor('#ff5a00');
    itParses('softlight(@base, @modifier)').withContext({
      '@base': asColor('#ff6600'),
      '@modifier': asColor('#666666')
    }).asColor('#ff5a00');
    itParses('softlight(@base, @modifier)').asInvalid();
    itParses('hardlight(#ff6600, 0x666666)').asColor('#cc5200');
    itParses('hardlight(@base, @modifier)').withContext({
      '@base': asColor('#ff6600'),
      '@modifier': asColor('#666666')
    }).asColor('#cc5200');
    itParses('hardlight(@base, @modifier)').asInvalid();
    itParses('difference(#ff6600, 0x666666)').asColor('#990066');
    itParses('difference(#ff6600,)()').asInvalid();
    itParses('difference(@base, @modifier)').withContext({
      '@base': asColor('#ff6600'),
      '@modifier': asColor('#666666')
    }).asColor('#990066');
    itParses('difference(@base, @modifier)').asInvalid();
    itParses('exclusion(#ff6600, 0x666666)').asColor('#997a66');
    itParses('exclusion(@base, @modifier)').withContext({
      '@base': asColor('#ff6600'),
      '@modifier': asColor('#666666')
    }).asColor('#997a66');
    itParses('exclusion(@base, @modifier)').asInvalid();
    itParses('average(#ff6600, 0x666666)').asColor('#b36633');
    itParses('average(@base, @modifier)').withContext({
      '@base': asColor('#ff6600'),
      '@modifier': asColor('#666666')
    }).asColor('#b36633');
    itParses('average(@base, @modifier)').asInvalid();
    itParses('negation(#ff6600, 0x666666)').asColor('#99cc66');
    itParses('negation(@base, @modifier)').withContext({
      '@base': asColor('#ff6600'),
      '@modifier': asColor('#666666')
    }).asColor('#99cc66');
    itParses('negation(@base, @modifier)').asInvalid();
    itParses('blend(rgba(#FFDE00,.42), 0x19C261)').asColor('#7ace38');
    itParses('blend(@top, @bottom)').withContext({
      '@top': asColor('rgba(#FFDE00,.42)'),
      '@bottom': asColor('0x19C261')
    }).asColor('#7ace38');
    itParses('blend(@top, @bottom)').asInvalid();
    itParses('complement(red)').asColor('#00ffff');
    itParses('complement(@base)').withContext({
      '@base': asColor('red')
    }).asColor('#00ffff');
    itParses('complement(@base)').asInvalid();
    itParses('transparentify(#808080)').asColor(0, 0, 0, 0.5);
    itParses('transparentify(#414141, black)').asColor(255, 255, 255, 0.25);
    itParses('transparentify(#91974C, 0xF34949, 0.5)').asColor(47, 229, 79, 0.5);
    itParses('transparentify(a)').withContext({
      'a': asColor('#808080')
    }).asColor(0, 0, 0, 0.5);
    itParses('transparentify(a, b, 0.5)').withContext({
      'a': asColor('#91974C'),
      'b': asColor('#F34949')
    }).asColor(47, 229, 79, 0.5);
    itParses('transparentify(a)').asInvalid();
    itParses('red(#000, 255)').asColor(255, 0, 0);
    itParses('red(a, b)').withContext({
      'a': asColor('#000'),
      'b': '255'
    }).asColor(255, 0, 0);
    itParses('red(a, b)').asInvalid();
    itParses('green(#000, 255)').asColor(0, 255, 0);
    itParses('green(a, b)').withContext({
      'a': asColor('#000'),
      'b': '255'
    }).asColor(0, 255, 0);
    itParses('green(a, b)').asInvalid();
    itParses('blue(#000, 255)').asColor(0, 0, 255);
    itParses('blue(a, b)').withContext({
      'a': asColor('#000'),
      'b': '255'
    }).asColor(0, 0, 255);
    itParses('blue(a, b)').asInvalid();
    itParses('alpha(#000, 0.5)').asColor(0, 0, 0, 0.5);
    itParses('alpha(a, b)').withContext({
      'a': asColor('#000'),
      'b': '0.5'
    }).asColor(0, 0, 0, 0.5);
    itParses('alpha(a, b)').asInvalid();
    itParses('hue(#00c, 90deg)').asColor(0x66, 0xCC, 0);
    itParses('hue(a, b)').withContext({
      'a': asColor('#00c'),
      'b': '90deg'
    }).asColor(0x66, 0xCC, 0);
    itParses('hue(a, b)').asInvalid();
    itParses('saturation(#00c, 50%)').asColor(0x33, 0x33, 0x99);
    itParses('saturation(a, b)').withContext({
      'a': asColor('#00c'),
      'b': '50%'
    }).asColor(0x33, 0x33, 0x99);
    itParses('saturation(a, b)').asInvalid();
    itParses('lightness(#00c, 80%)').asColor(0x99, 0x99, 0xff);
    itParses('lightness(a, b)').withContext({
      'a': asColor('#00c'),
      'b': '80%'
    }).asColor(0x99, 0x99, 0xff);
    itParses('lightness(a, b)').asInvalid();
    itParses('Color(255, 0, 0, 255)').asColor(255, 0, 0);
    itParses('Color(r, g, b, a)').withContext({
      'r': '255',
      'g': '0',
      'b': '0',
      'a': '255'
    }).asColor(255, 0, 0);
    itParses('Color(r, g, b, a)').asInvalid();
    return describe('elm-lang support', function() {
      itParses('rgba 255 0 0 1').asColor(255, 0, 0);
      itParses('rgba r g b a').withContext({
        'r': '255',
        'g': '0',
        'b': '0',
        'a': '1'
      }).asColor(255, 0, 0);
      itParses('rgba r g b a').asInvalid();
      itParses('rgb 255 0 0').asColor(255, 0, 0);
      itParses('rgb r g b').withContext({
        'r': '255',
        'g': '0',
        'b': '0'
      }).asColor(255, 0, 0);
      itParses('rgb r g b').asInvalid();
      itParses('hsla (degrees 200) 50 50 0.5').asColor(64, 149, 191, 0.5);
      itParses('hsla (degrees h) s l a').withContext({
        'h': '200',
        's': '50',
        'l': '50',
        'a': '0.5'
      }).asColor(64, 149, 191, 0.5);
      itParses('hsla (degrees h) s l a').asInvalid();
      itParses('hsla 3.49 50 50 0.5').asColor(64, 149, 191, 0.5);
      itParses('hsla h s l a').withContext({
        'h': '3.49',
        's': '50',
        'l': '50',
        'a': '0.5'
      }).asColor(64, 149, 191, 0.5);
      itParses('hsla h s l a').asInvalid();
      itParses('hsl (degrees 200) 50 50').asColor(64, 149, 191);
      itParses('hsl (degrees h) s l').withContext({
        'h': '200',
        's': '50',
        'l': '50'
      }).asColor(64, 149, 191);
      itParses('hsl (degrees h) s l').asInvalid();
      itParses('hsl 3.49 50 50').asColor(64, 149, 191);
      itParses('hsl h s l').withContext({
        'h': '3.49',
        's': '50',
        'l': '50'
      }).asColor(64, 149, 191);
      itParses('hsl h s l').asInvalid();
      itParses('grayscale 1').asColor(0, 0, 0);
      itParses('greyscale 0.5').asColor(127, 127, 127);
      itParses('grayscale 0').asColor(255, 255, 255);
      itParses('grayscale g').withContext({
        'g': '0.5'
      }).asColor(127, 127, 127);
      itParses('grayscale g').asInvalid();
      itParses('complement rgb 255 0 0').asColor('#00ffff');
      itParses('complement base').withContext({
        'base': asColor('red')
      }).asColor('#00ffff');
      return itParses('complement base').asInvalid();
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvcGlnbWVudHMvc3BlYy9jb2xvci1wYXJzZXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEseUJBQUE7O0FBQUEsRUFBQSxPQUFBLENBQVEsZUFBUixDQUFBLENBQUE7O0FBQUEsRUFFQSxXQUFBLEdBQWMsT0FBQSxDQUFRLHFCQUFSLENBRmQsQ0FBQTs7QUFBQSxFQUdBLFlBQUEsR0FBZSxPQUFBLENBQVEsc0JBQVIsQ0FIZixDQUFBOztBQUFBLEVBS0EsUUFBQSxDQUFTLGFBQVQsRUFBd0IsU0FBQSxHQUFBO0FBQ3RCLFFBQUEseUJBQUE7QUFBQSxJQUFDLFNBQVUsS0FBWCxDQUFBO0FBQUEsSUFFQSxPQUFBLEdBQVUsU0FBQyxLQUFELEdBQUE7YUFBWSxRQUFBLEdBQVEsTUFBcEI7SUFBQSxDQUZWLENBQUE7QUFBQSxJQUlBLFFBQUEsR0FBVyxTQUFDLFVBQUQsR0FBQTthQUNUO0FBQUEsUUFBQSxXQUFBLEVBQWEsRUFBYjtBQUFBLFFBQ0EsT0FBQSxFQUFTLFNBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxHQUFBO0FBQ1AsY0FBQSxPQUFBOztZQURjLElBQUU7V0FDaEI7QUFBQSxVQUFBLE9BQUEsR0FBVSxJQUFDLENBQUEsT0FBWCxDQUFBO2lCQUNBLFFBQUEsQ0FBUyxJQUFDLENBQUEsV0FBVixFQUF1QixTQUFBLEdBQUE7bUJBQ3JCLEVBQUEsQ0FBSSxVQUFBLEdBQVUsVUFBVixHQUFxQixjQUF6QixFQUF3QyxTQUFBLEdBQUE7QUFDdEMsY0FBQSxJQUFHLGVBQUg7dUJBQ0UsTUFBQSxDQUFPLE1BQU0sQ0FBQyxLQUFQLENBQWEsVUFBYixFQUF5QixPQUF6QixDQUFQLENBQXlDLENBQUMsU0FBMUMsQ0FBb0QsQ0FBcEQsRUFBc0Qs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

//# sourceURL=/home/cm/.atom/packages/pigments/spec/color-parser-spec.coffee
