sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("sap.training.exc.controller.App", {
      onSayHello: function () {
        MessageBox.information("Hello World!");
      },
    });
  }
);
