(function() {
  'use strict';

  angular
    .module('tpl.color')
    .service('tplColorService', TplColorService);

  function TplColorService() {

    // variables & constants
    var COLOR_NAMES = ['primaryColor', 'secondaryColor', 'primaryFontColor', 'secondaryFontColor', 'tertiaryColor'];
    var colors = {};

    // public functions export object
    var exports = {
      setColor: setColor,
      getColors: getColors,
      getColorNames: getColorNames
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
    }

    function getColors() {
      return colors;
    }

    function getColorNames() {
      return COLOR_NAMES;
    }

    ////////////////////////////////////////////////////////////
    //  INITIALIZATION
    ////////////////////////////////////////////////////////////
    init();
    return exports;

  }
})();
