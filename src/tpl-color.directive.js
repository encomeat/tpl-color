(function() {
  'use strict';

  angular.module('tpl.color')
    .directive('tplColor', [
      '$timeout',
      '$rootScope',
      'scopeListenerManager',
      '$compile',
      '$document',
      'tplColorService',
      function(
        $timeout,
        $rootScope,
        scopeListenerManager,
        $compile,
        $document,
        tplColorService) {

        return {
          link: function(scope, element, attrs) {

            var cleanUp;
            var setCustomStyle;
            var setElementHover;

            var TPL_COLORS = tplColorService.getColorNames();
            var attrsString = attrs.tplColor.replace(/ /g, '');
            var options = [];

            scope.colors = {};

            var mouseListener = {
              'primaryColor': [],
              'secondaryColor': [],
              'primaryFontColor': [],
              'secondaryFontColor': [],
              'tertiaryColor': []
            };

            var cssRules = {
              'primaryColor': [],
              'secondaryColor': [],
              'primaryFontColor': [],
              'secondaryFontColor': [],
              'tertiaryColor': []
            };

            ////////////////////////////////////////////////////////////////////////////
            // LISTENERS / WATCHES
            ////////////////////////////////////////////////////////////////////////////

            scopeListenerManager.saveAddListener(scope, scope.$watch('colors.' + TPL_COLORS[0], function(value) {
              if (value && options && options.length > 0) {
                cleanUp(TPL_COLORS[0]);
                $timeout(function() {
                  angular.forEach(options, function(option) {
                    if (option.color === TPL_COLORS[0]) {
                      setCustomStyle(option, value);
                    }
                  });
                });
              }
            }));

            scopeListenerManager.saveAddListener(scope, scope.$watch('colors.' + TPL_COLORS[1], function(value) {
              if (value && options && options.length > 0) {
                cleanUp(TPL_COLORS[2]);
                $timeout(function() {
                  angular.forEach(options, function(option) {
                    if (option.color === TPL_COLORS[1]) {
                      setCustomStyle(option, value);
                    }
                  });
                });
              }
            }));

            scopeListenerManager.saveAddListener(scope, scope.$watch('colors.' + TPL_COLORS[2], function(value) {
              if (value && options && options.length > 0) {
                cleanUp(TPL_COLORS[2]);
                $timeout(function() {
                  angular.forEach(options, function(option) {
                    if (option.color === TPL_COLORS[2]) {
                      setCustomStyle(option, value);
                    }
                  });
                });
              }
            }));

            scopeListenerManager.saveAddListener(scope, scope.$watch('colors.' + TPL_COLORS[3], function(value) {
              if (value && options && options.length > 0) {
                cleanUp(TPL_COLORS[3]);
                $timeout(function() {
                  angular.forEach(options, function(option) {
                    if (option.color === TPL_COLORS[3]) {
                      setCustomStyle(option, value);
                    }
                  });
                });
              }
            }));

            scopeListenerManager.saveAddListener(scope, scope.$watch('colors.' + TPL_COLORS[4], function(value) {
              if (value && options && options.length > 0) {
                cleanUp(TPL_COLORS[4]);
                $timeout(function() {
                  angular.forEach(options, function(option) {
                    if (option.color === TPL_COLORS[4]) {
                      setCustomStyle(option, value);
                    }
                  });
                });
              }
            }));

            scope.$on('$destroy', function() {
              cleanUp();
            });


            ////////////////////////////////////////////////////////////////////////////
            // PRIVATE FUNCTIONS
            ////////////////////////////////////////////////////////////////////////////

            var init = function init() {

              TPL_COLORS = tplColorService.getColorNames();
              scope.colors = tplColorService.getColors();

              angular.forEach(attrsString.split(';'), function(optionString) {

                var optionObject = {
                  color: null,
                  attribute: null,
                  selector: null
                };

                var optionArray = optionString.split(':');
                for (var i = 0; i < optionArray.length; i++) {
                  if (optionArray[i]) {
                    if (i === 0) {
                      optionObject.color = optionArray[i];
                    } else if (i === 1) {
                      optionObject.attribute = optionArray[i];
                    } else if (i === 2) {
                      optionObject.selector = optionArray[i];
                    }
                  }
                }

                options.push(optionObject);
              });

              angular.forEach(options, function(option) {
                if (option.color === TPL_COLORS[0]) {
                  setCustomStyle(option, $rootScope[TPL_COLORS[0]]);
                }
                if (option.color === TPL_COLORS[1]) {
                  setCustomStyle(option, $rootScope[TPL_COLORS[1]]);
                }
                if (option.color === TPL_COLORS[2]) {
                  setCustomStyle(option, $rootScope[TPL_COLORS[2]]);
                }
                if (option.color === TPL_COLORS[3]) {
                  setCustomStyle(option, $rootScope[TPL_COLORS[3]]);
                }
              });
            };

            cleanUp = function cleanUp(tplColor) {
              if (tplColor) {
                angular.forEach(mouseListener[tplColor], function(listener) {
                  element.off(listener);
                  element.off(listener);
                });
                angular.forEach(cssRules[tplColor], function(rule) {
                  rule.remove();
                });
              } else {
                angular.forEach(TPL_COLORS, function(color) {
                  angular.forEach(mouseListener[color], function(listener) {
                    element.off(listener);
                    element.off(listener);
                  });
                  angular.forEach(cssRules[color], function(rule) {
                    rule.remove();
                  });
                });
              }
            };

            setCustomStyle = function setCustomeStyle(option, value) {
              // HOVER
              if (option.selector === 'hover') {

                setElementHover(option, value);

              } else if (option.selector === 'active' || option.selector === 'focus') {

                var elementId = element.attr('id');
                var cssRule = null;
                var elem = null;

                if (!elementId) {
                  // generate random hash-string to identifie the correct element with the created css rule
                  // add a letter (in this case 'x') in front of the hash, to avoid IDs starting with numbers
                  elementId = 'x' + Math.random().toString(36).substring(7);
                }
                element.attr('id', elementId);

                // ACTIVE
                if (option.selector === 'active') {
                  cssRule = '<style>#' + elementId + '.active {' + option.attribute + ':' + value + ';}</style>';
                  elem = $compile(cssRule)(scope);

                // FOCUS
                } else if (option.selector === 'focus') {
                  cssRule = '<style>#' + elementId + ':focus {' + option.attribute + ':' + value + ';}</style>';
                  elem = $compile(cssRule)(scope);
                }

                $document.find('head').append(elem);
                cssRules[option.color].push(elem);

              // WITHOUT MODIFIER
              } else {
                element.css(option.attribute, value);
              }
            };

            setElementHover = function setElementHover(option, value) {
              var oldValue = element.css(option.attribute);
              element.on('mouseenter.tpl-color', function() {
                element.css(option.attribute, value);
              });
              mouseListener[option.color].push('mouseenter.tpl-color');
              element.on('mouseleave.tpl-color', function() {
                element.css(option.attribute, oldValue);
              });
              mouseListener[option.color].push('mouseleave.tpl-color');
            };

            ////////////////////////////////////////////////////////////////////////////
            // INIT
            ////////////////////////////////////////////////////////////////////////////

            init();

          }
        };
      }
    ]);
}());
