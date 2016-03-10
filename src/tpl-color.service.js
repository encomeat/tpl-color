(function() {
    'use strict';

    angular
        .module('tpl.color')
        .service('tplColorService', TplColorService);

    function TplColorService() {
      var colors = {};

      var exports = {
        setColor: setColor,
        getColors: getColors
      };

      return exports;

      function setColor(key, value) {
        colors.key = value;
      }

      function getColors() {
        return colors;
      }

    }
})();
