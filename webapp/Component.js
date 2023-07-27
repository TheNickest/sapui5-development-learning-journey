sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/Device", "sap/ui/model/json/JSONModel"],
  function (UIComponent, Device, JSONModel) {
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

        // set Device model
        var oDeviceModel = new JSONModel(Device);
        oDeviceModel.setDefaultBindingMode("OneWay");
        this.setModel(oDeviceModel, "device");
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
