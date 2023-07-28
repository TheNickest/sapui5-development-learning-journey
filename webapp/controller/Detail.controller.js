sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   * @param {type of sap.ui.core.routing.History} History
   */
  function (Controller, History) {
    "use strict";

    return Controller.extend("sap.training.exc.controller.Detail", {
      onInit: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("detail")
          .attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
        this.getView().bindElement(
          "/UX_Customer" + oEvent.getParameter("arguments").customerId
        );
      },

      onNavButtonBack: function () {
        var oHistory = History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("overview", {}, true);
        }
      },
    });
  }
);
