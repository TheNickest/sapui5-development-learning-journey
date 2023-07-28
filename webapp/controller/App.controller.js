sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("sap.training.exc.controller.App", {
      // to manipulate xml view
      onInit: function () {
        var sClass = this.getOwnerComponent().getContentDensityClass();
        this.getView().addStyleClass(sClass);
      },
    });
  }
);
