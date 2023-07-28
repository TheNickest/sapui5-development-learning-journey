sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   * @param {typeof sap.m.MessageToast} MessageToast
   * @param {typeof sap.ui.model.json.JSONModel} JSONModel
   */
  function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("sap.training.exc.controller.Overview", {
      onInit: function () {
        var oModel = new JSONModel();
        this.getView().setModel(oModel, "customer");

        // disable delete button
        this.getView()
          .getModel("customer")
          .setProperty("/bEnableDelete", false);
      },

      onSave: function () {
        var oModelData = this.getView().getModel("customer").getData();
        var oResourceBundle = this.getView()
          .getModel("i18n")
          .getResourceBundle();

        if (oModelData.Discount === undefined) {
          oModelData.Discount = 0;
        }

        this.byId("customerTable")
          .getBinding("items")
          .create({
            Form: oModelData.Form,
            CustomerName: oModelData.CustomerName,
            Discount: String(oModelData.Discount),
            Street: oModelData.Street,
            PostCode: oModelData.PostCode,
            City: oModelData.City,
            Country: oModelData.Country,
            Email: oModelData.Email,
            Telephone: oModelData.Telephone,
          })
          .created()
          .then(function () {
            MessageToast.show(oResourceBundle.getText("customerCreateMessage"));
          });
      },

      onDelete: function (oEvent) {
        var oSelectedItem = this.byId("customerTable").getSelectedItem();
        var oResourceBundle = this.getView()
          .getModel("i18n")
          .getResourceBundle();

        if (oSelectedItem) {
          var oBindingContext = oSelectedItem.getBindingContext();

          oBindingContext.delete().then(function () {
            MessageToast.show(
              oResourceBundle.getText("customerDeletedMessage")
            );
          });
        }
      },

      onCloseDialog: function () {
        this.byId("dialog").close();
      },

      onCustomerChange: function (oEvent) {
        var oBindingContext = oEvent
          .getParameter("listItem")
          .getBindingContext();
        this.byId("bookingTable").setBindingContext(oBindingContext);

        // enable delete button once a table line was selected
        this.getView().getModel("customer").setProperty("/bEnableDelete", true);
      },

      onFilterCustomers: function (oEvent) {
        var aFilter = [];
        var sQuery = oEvent.getParameter("newValue"); // query
        if (sQuery && sQuery.length > 0) {
          aFilter.push(
            new Filter({
              filters: [
                new Filter({
                  path: "CustomerName",
                  operator: FilterOperator.Contains,
                  value1: sQuery,
                }),
                new Filter({
                  path: "City",
                  operator: FilterOperator.Contains,
                  value1: sQuery,
                }),
              ],
              and: false,
              caseSensitive: false,
            })
          );
        }

        var oTable = this.byId("customerTable");
        var oBinding = oTable.getBinding("items");
        oBinding.filter(aFilter);
      },

      onNavToDetails: function (oEevent) {
        var oItem = oEevent.getSource();
        var oRouter = this.getOwnerComponent().getRouter();

        oRouter.navTo("detail", {
          customerId: oItem
            .getBindingContext()
            .getPath()
            .substring("/UX_Customer".length),
        });
      },
    });
  }
);
