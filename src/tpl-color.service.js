(function() {
    'use strict';

    angular
        .module('tpl.color')
        .service('tplColorService', TplColorService);

    function TplColorService() {
      var COLOR_NAMES = ['primaryColor', 'secondaryColor', 'primaryFontColor', 'secondaryFontColor', 'tertiaryColor'];
      var colors = {};

      var exports = {
        setColor: setColor,
        getColors: getColors,
        getColorNames: getColorNames
      };

      return exports;

      function setColor(key, value) {
        colors.key = value;
      }

      function getColors() {
        return colors;
      }

      function getColorNames() {
        return COLOR_NAMES;
      }

    }
})();
