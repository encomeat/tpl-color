(function() {
  'use strict';
  angular.module('tpl.color').service('tplColorService', ['$document', '$compile', '$rootScope',
    function($document, $compile, $rootScope) {

      // variables & constants
      var COLOR_NAMES = [
        'primaryColor',
        'secondaryColor',
        'primaryFontColor',
        'secondaryFontColor',
        'tertiaryColor'
      ];
      var colors = {};
      var cssRules = {};
      var cssElems = {};

      // public functions export object
      var exports = {
        setColor: setColor,
        getColors: getColors,
        getColorNames: getColorNames,
        addCssRule: addCssRule,
        removeCssRule: removeCssRule
      };


      ////////////////////////////////////////////////////////////
      //  PRIVATE FUNCTIONS
      ////////////////////////////////////////////////////////////

      function init() {
        angular.forEach(COLOR_NAMES, function(name) {
          colors[name] = null;
        });
      }


      ////////////////////////////////////////////////////////////
      //  PUBLIC FUNCTIONS
      ////////////////////////////////////////////////////////////

      function setColor(key, value) {
        colors[key] = value;

        angular.forEach(cssElems[value], function(elem) {
          elem.remove();
        });

        angular.forEach(cssRules, function(rule, selector) {
          angular.forEach(rule, function(color, property) {
            if (color === key) {
              var cssRule = '<style>' + selector + '{' + property + ':' + colors[color] + ';}</style>';
              var elem = $compile(cssRule)($rootScope);

              $document.find('head').append(elem);

              if (!cssElems[color]) {
                cssElems[color] = [];
              }
              cssElems[color].push(elem); // WITHOUT MODIFIER
            }
          });
        });
      }

      function getColors() {
        return colors;
      }

      function getColorNames() {
        return COLOR_NAMES;
      }

      function addCssRule(selector, property, color) {
        if (!cssRules[selector]) {
          cssRules[selector] = {};
        }
        cssRules[selector][property] = color;
      }

      function removeCssRule(selector, property) {
        if (cssRules[selector] && cssRules[selector][property]) {
          delete cssRules[selector][property];
          if (Object.keys(cssRules[selector]) === 0) {
            delete cssRules[selector];
          }
        }
      }

      ////////////////////////////////////////////////////////////
      //  INITIALIZATION
      ////////////////////////////////////////////////////////////
      init();



      return exports;
    }
  ]);
}());
