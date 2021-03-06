'use strict';


angular.module('editorApp')
  .directive('propertyEditorList', function($compile, PropertyViewModelProvider, TreeSelection, ProjectStore) {

    let childScope;

    function updateEditors(scope, element) {
      if (childScope) { //no leaking watchers
        childScope.$destroy();
        element.empty();
      }
      childScope = scope.$new();

      if (TreeSelection.selNode() && TreeSelection.selItem()) {
        childScope.properties = PropertyViewModelProvider.create(TreeSelection.selNode(), TreeSelection.selItem());
        for (let i = 0; i < childScope.properties.length; i++) {
          let propertyType = childScope.properties[i].desc.type;
          let template = $compile(`<li class="property-editor"><div ${propertyType}-property-editor property="properties[${i}]"><label>{{properties[${i}].name()}}</label><div>Missing editor for <em>${propertyType}</em> property type</div></div></li>`);
          element.append(template(childScope));
        }
      }
    }

    return {
      template: '<ul class="property-list"></ul>',
      restrict: 'EA',
      replace: true,
      scope: {},

      link: function(scope, element) {

        scope.$watch(() => ProjectStore.version, function() {
          updateEditors(scope, element);
        });
        scope.$watch(() => TreeSelection.selItem(), function() {
          updateEditors(scope, element);
        });
      }
    };
  });
