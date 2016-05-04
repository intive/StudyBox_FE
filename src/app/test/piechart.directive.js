(function() {
  'use strict';

  angular
    .module('test')
    .directive('pieChart', PieChartDirective);

  /** @ngInject */
  function PieChartDirective() {
    return {
      restrict: 'E',
      template: '<canvas></canvas>',

      link: function(scope, element, attributes) {

        var correct = parseInt(attributes.correct);
        var wrong = parseInt(attributes.wrong);

        if(angular.isUndefined(correct))
          throw "must provide number of correct answers";
        if(angular.isUndefined(wrong))
          throw "must provide number of wrong answers";

        var canvas = element.contents()[0];

        paintPieChart(correct, wrong, canvas);
      }
    };

    function paintPieChart(correct, wrong, canvas) {
      var ctx = canvas.getContext("2d");
      var lastend = 0;
      var data = [wrong, correct];
      var myTotal = 0;
      var red = '#C24642';
      var green = '#369EAD';
      var myColor = [red, green];

      for(var e = 0; e < data.length; e++) {
        myTotal += data[e];
      }

      for (var i = 0; i < data.length; i++) {
        ctx.fillStyle = myColor[i];
        ctx.beginPath();
        ctx.moveTo(canvas.width/2,canvas.height/2);
        ctx.arc(canvas.width/2,canvas.height/2,canvas.height/2,
                lastend,lastend+(Math.PI*2*(data[i]/myTotal)),false);
        ctx.lineTo(canvas.width/2,canvas.height/2);
        ctx.fill();
        lastend += Math.PI*2*(data[i]/myTotal);
      }

      var font_px = 30;
      ctx.font = font_px + "px Arial";
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      var all = correct + wrong;
      ctx.fillText(correct+"/"+all, canvas.width/2, canvas.height/2 + font_px/3);
    }
  }

})();
