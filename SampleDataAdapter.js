define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/Deferred",
    "dojo/number",
    "dojo/promise/all",
    "dojo/json",
    "dojo/store/Memory",
    "dojo/data/ObjectStore",
    "dojo/text!./data/Esri_Offices.json",
    "dojo/text!./data/UK_Cities.json",
    "dojo/text!./data/Murder.json"  //5 points from our Houston Metro murder file
], function(declare, array, Deferred, number, all, JSON, Memory, ObjectStore,
    offices, ukcities, murder) {

    function createStore(data) {
        var memory = new Memory({
            label: data.label,
            primaryKey: data.primaryKey,
            fields: data.fields,
            records: data.records
        });
        return new ObjectStore({
            objectStore: memory
        });
    }

    return declare(null, {
        _dataSources: {},

        constructor: function() {
            this._dataSources.Esri_Offices = createStore(JSON.parse(offices));
            this._dataSources.UK_Cities = createStore(JSON.parse(ukcities));
            this._dataSources.Murder = createStore(JSON.parse(murder));

        },

        getTableInfo: function(tableId) {
            var dataSource = this._dataSources[tableId];

            return {
                idField: dataSource.objectStore.primaryKey,
                fields: dataSource.objectStore.fields
            }
        },

        //This could be made A LOT more robust. For now, just return all the features
        query: function(options) {
            var dataSource = this._dataSources[options.tableId];
            return {
                features: dataSource.objectStore.records
            }
        },

    });
});
