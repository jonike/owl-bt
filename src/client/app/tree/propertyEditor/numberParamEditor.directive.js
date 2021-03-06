'use strict';

angular.module('editorApp')
  .directive('numberPropertyEditor', function() {

    return {
      template: '<div><form-group-param-editor property="property"><input type="number" class="form-control" ng-model="property.value" ng-model-options="{ getterSetter: true, updateOn: \'blur\' }"></input></form-group-param-editor></div>',
      restrict: 'EA',
      replace: true,
      scope: {
        property: '=',
      },

      link: function(scope, element) {
        scope.$watch('property', function(){
          if (scope.property) {
            let desc = scope.property.desc;
            if (desc.min) {
              element.attr('min', desc.min);
            }
            if (desc.max) {
              element.attr('max', desc.max);
            }
          }
        });
      }
    };
  });