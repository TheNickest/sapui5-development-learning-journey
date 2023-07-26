sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/Device"],
  function (UIComponent, Device) {
    "use strict";

    return UIComponent.extend("sap.training.exc.Component", {
      // must have!
      metadata: {
        manifest: "json",
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
      },

      init: function () {
        // call init of super class
        UIComponent.prototype.init.apply(this, arguments);
      },

      getContentDensityClass: function () {
        if (!this._sContentDensityClass) {
          if (Device.support.touch) {
            this._sContentDensityClass = "sapUiSizeCozy";
          } else {
            this._sContentDensityClass = "sapUiSizeCompact";
          }
        }
        return this._sContentDensityClass;
      },
    });
  }
);
