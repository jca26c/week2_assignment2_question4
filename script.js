 require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/ImageryLayer",
        "esri/layers/support/RasterFunction"
      ], function(Map, MapView, ImageryLayer, RasterFunction) {
        /***************************************
         * Set up popup template of image layer
         **************************************/

        var imagePopupTemplate = {
          // autocasts as new PopupTemplate()
          title: "Data from {SensorName} satellite",
          content:
            "Rendered RGB values: <b>{Raster.ServicePixelValue} </b>" +
            "<br>Original values (B, G, R, NIR): <b>{Raster.ItemPixelValue} </b>"
        };

        /*******************************************************************
         * Create image layer with server defined raster function templates
         ******************************************************************/

        var serviceRFT = new RasterFunction({
          functionName: "NDVI",
          "rasterFunctionArguments": {
    "VisibleBandID": 2,
    "InfraredBandID": 1
  },
          variableName: "Raster"
        });

        var layer = new ImageryLayer({
          url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
          renderingRule: serviceRFT,
          popupTemplate: imagePopupTemplate
        });

        /*************************
         * Add image layer to map
         ************************/

        var map = new Map({
          basemap: "hybrid",
          layers: [layer]
        });

        var view = new MapView({
          container: "viewDiv",
          map: map,
          center: {
            // autocasts as esri/geometry/Point
            x: -90.23,
            y: 38.61,
            spatialReference: 4326
          },
          zoom: 7,
          popup: {
            actions: []
          }
        });
      });
