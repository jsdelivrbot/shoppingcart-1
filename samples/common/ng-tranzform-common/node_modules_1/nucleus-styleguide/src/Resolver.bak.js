/* Resolver.js -- Resolves calculated values, e.g. from color mixins
 *
 * Copyright (C) 2016 Michael Seibt
 *
 * With contributions from: -
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

'use strict';

/** Dependencies */
var Verbose = require('./Verbose');
var _ = require('lodash');
var sass = require('node-sass');

/** Instantiation */
var Resolver = {};

Resolver.resolveAll = function (styles) {
  // return styles;
  var allColors = [];

  _.forEach(styles, function (style) {
    // If it's not a color, continue
    if(!style.annotations.color) {
      return;
    }

    allColors.push(Resolver.generateDummyCode(style.element.prop, style.element.value));
  });

  Verbose.debug(allColors);
  Verbose.log('---');

  Verbose.log(allColors.join(' '));

  var result = sass.renderSync({
    data: allColors.join(' '),
    outputStyle: 'compact'
  }).css.toString();

  result = this.cssToJson(result);

  Verbose.debug(result);


  var original;
  _.forEach(styles, function (style, i) {
    // If it's not a color, continue
    if(!style.annotations.color) {
      return;
    }

    original = style.element.prop;

    if(result[original]) {
      styles[i].element.value = result[original];
      styles[i].computed = true;
    }
  });

  // Verbose.debug(styles);
  return styles;
};

Resolver.generateDummyCode = function (property, value) {
  var code = property + ': ' + value + ';';

  //if(value.indexOf('(') !== -1) {
    code += 'dummy.' + property.replace(/^\$/, '') + ' {color: ' + property + ';}';
  //}

  return code;
};

Resolver.cssToJson = function (css) {
  css =
    '{' +
    css
    .replace(/; }/mg, '",')
    .replace(/dummy\./mg, '"$')
    .replace(/ { color: /mg, '": "') + '}';
  Verbose.log(css);
  css = css.replace(/,\s\}/, '}');
  return JSON.parse(css);
};

module.exports = Resolver;
