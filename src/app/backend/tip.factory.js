(function() {
  'use strict';
  angular
    .module('backend')
    .factory('TipFactory', TipFactory);

  /** @ngInject */
  function TipFactory() {

    function Tip() {
      // fields
      this.id = null;
      this.prompt = null;

      // methods
      this.update = update;
      this.remove = remove;

      function update(new_prompt) {}
      function remove() {}
    }

    return {Tip: Tip};
  }
})();
