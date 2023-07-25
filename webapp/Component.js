sap.ui.define(["sap/ui/core/UIComponent"], function (UIComponent) {
  "use strict";

  return UIComponent.extend("sap.training.exc.Component", {
    // must have!
    metadata: {
      manifest: "json",
      interfaces: ["sap.ui.core.IAsyncContentCreation"],
    },

    init: function () {
      UIComponent.prototype.init.apply(this, arguments);
    },
  });
});
