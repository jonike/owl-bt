'use strict';

(function() {
  class AddTreeNodeAction {
    constructor(ActionExecutor, TreeStore, TreeNode) {
        this._ActionExecutor = ActionExecutor;
        this._TreeStore = TreeStore;
        this._TreeNode = TreeNode;
      }
      /**
       * @param  {object} params
       * @param  {node} params.node - node to which should be the child node added
       * @param  {node} params.childNode - child node that should be added
       * @param  {int} params.index - (optional) target index. Node is added to the end if not provided
     */
    exec(params) {
      let _this = this;
      this._ActionExecutor.exec({
        exec: () => {
          _this._TreeNode.addChildNodeAt(params.node, params.childNode, params.index);

          _this._TreeStore.updateVersion();
          _this._TreeNode.updateVersion(params.node);
        },
        undo: () => {
          _this._TreeNode.removeChildNode(params.node, params.childNode);

          _this._TreeStore.updateVersion();
          _this._TreeNode.updateVersion(params.node);
        }
      });
    }
  }

  angular.module('editorApp')
    .service('AddTreeNodeAction', AddTreeNodeAction);
})();
