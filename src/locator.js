/* globals L:false, html2canvas:false, _:false, Ractive:false */

/**
 * Locator
 */

(function() {
  "use strict";

  // Main contructor
  var Locator = function(options) {
    this.options = _.extend({}, {
      // Template
      template: "REPLACE-DEFAULT-TEMPLATE",

      // Text
      title: "Locator",
      footer: "Made by the <a href=\"http://datanews.tumblr.com/\" target=\"_blank\">WNYC DataNews</a> team.  Locator only works in <a href=\"http://google.com/chrome\" target=\"_blank\">Chrome</a>.",

      // Main map
      tilesets: {
        "CartoDB Positron": {
          url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
          attribution: "&copy; <a target=\"_blank\" href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, &copy; <a target=\"_blank\" href=\"http://cartodb.com/attributions\">CartoDB</a>"
        },
        "Stamen Toner": {
          url: "http://tile.stamen.com/toner/{z}/{x}/{y}.png",
          attribution: "Map tiles by <a target=\"_blank\" href=\"http://stamen.com\">Stamen Design</a>, under <a  target=\"_blank\" href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a>. Data by <a  target=\"_blank\" href=\"http://openstreetmap.org\">OpenStreetMap</a>, under <a target=\"_blank\" href=\"http://www.openstreetmap.org/copyright\">ODbL</a>"
        },
        "Mapbox Streets (via WNYC)": {
          url: "https://api.mapbox.com/v4/jkeefe.np44bm6o/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamtlZWZlIiwiYSI6ImVCXzdvUGsifQ.5tFwEhRfLmH36EUxuvUQLA",
          attribution: "&copy; <a target='_blank' href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy; <a target='_blank' href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
        },
        "Mapbox Satellite (via WNYC)": {
          url: "https://api.mapbox.com/v4/jkeefe.oee0fah0/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamtlZWZlIiwiYSI6ImVCXzdvUGsifQ.5tFwEhRfLmH36EUxuvUQLA",
          attribution: "&copy; <a target='_blank' href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy; <a target='_blank' href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>; &copy; <a target='_blank' href='https://www.digitalglobe.com/'>DigitalGlobe</a>"
        },
        "Mapbox Run, Bike, Hike (via WNYC)": {
          url: "https://api.mapbox.com/v4/jkeefe.oee1c53c/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamtlZWZlIiwiYSI6ImVCXzdvUGsifQ.5tFwEhRfLmH36EUxuvUQLA",
          attribution: "&copy; <a target='_blank' href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy; <a target='_blank' href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
        },

        // Example of just url
        //"Stamen Toner": "http://tile.stamen.com/toner/{z}/{x}/{y}.png"
      },
      tileset: "CartoDB Positron",
      zoom: 17,
      minZoom: 1,
      maxZoom: 18,
      lat: 40.74844,
      lng: -73.98566,

      // Attribution (or source) that goes on top of map
      embedAttribution: false,
      overrideAttribution: undefined,

      // Mini map
      miniWidth: "15w",
      miniHeight: "15w",
      miniZoomOffset: -6,
      miniExtentStyles: {
        fill: false,
        stroke: true,
        color: "#000000",
        opacity: 0.9,
        weight: 4
      },
      miniStyles: {
        backgroundColor: "#FFFFFF",
        padding: 3,
        shadow: true,
        shadowColor: "rgba(0, 0, 0, 0.65)",
        shadowBlur: 5,
        shadowOffsetX: 1,
        shadowOffsetY: 1
      },

      // Markers
      markers: [{
        text: "Empire State Building",
        lat: 40.74844,
        lng: -73.98566
      }],

      // Marker defaults
      markerDefaults: {
        text: "Empire State Building",
        background: "rgba(0, 0, 0, 0.9)",
        foreground: "rgba(255, 255, 255, 0.9)",
        radius: 5,
        fontSize: 16,
        font: "\"Open Sans\", Helvetica, Arial, sans-serif",
        labelDistance: 20,
        labelWidth: 3,
        padding: 10
      },

      // Draggable marker.  For URI, See src/images and generated at
      // http://dopiaza.org/tools/datauri/index.php
      draggableMarker: L.icon({
        iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wwLFSU1meAbBQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAACOUlEQVR42u3bP0sjQRjH8W8S/wYVFEFR1LOxMaSxsrKQlPcaBH1bCvcSvMrCQhAsbE5FwcZ/hVUQQcQ7CLheMSPYqjOzzyS/DyzpdnZ/u5k8s/sERERERERERERERERERERERERERERExJCKkeOoA7PAFDANjABjQD/QAZ791vbbPfDS6wH2AfPAug/rsx6AI+AWeO2lAKtAA2gF3Oc+cAEU3R7gOLAZad9vwC/gsVsDbAHNBONcA7vdFuAGMJnwYj0B2ykGqiUYYwuYSDxVDPl59iT3ADdKCO/dIPADOM81wBawWHKZNuqDvItZUsT6tW1iwwowl1OA1Yilylf9zCnAhsEl6zCwlkOAfYFXGCE1cwhwHrsGYoQYOsB1bFu1HGCdrz1VSaluOcBZ7KsCC1YDnCIPy1YDnM4kwCWrAY7Qg0IGONaD5xx0Z/2ZBFixGmAnkwDfrAb4nEmAhQLs0juwnUmAVwrwey6tBnifyfx3YzXAF1y7hWV/TReVuF4Vy46tB3hrOLwOcGo9wFdco49FZ+bXhd5F6ForgH/AYS4BFrguKUv2Yu041ov1R1yXlAV/Ys7N1YgHvovrkipTGziIOUAtwdVv4PpTypj3dmIPkqK97QTXJTWa+M7bSTFQLdEJnfu7cCbRnPc71ZVK3SM9h2v0GY70ld1LXcyX9TeHNVybxUCgFcZZrDrPaoDvmrh2i/onK4LCPxg4jrE8yynAjxZwL72XPpRYFb+qKfznFe553g0iAvwHgeJXccwK1poAAAAASUVORK5CYII=",
        iconSize:     [80, 80],
        iconAnchor:   [40, 55],
        popupAnchor:  [-75, 0]
      }),

      // Dimensions
      widths: {
        Small: 400,
        Medium: 600,
        Large: 800,
      },
      width: "Medium",
      ratios: {
        "1:1": 1 / 1,
        "4:3": 4 / 3,
        "16:9": 16 / 9
      },
      ratio: "4:3",

      // Interface
      controlsOpen: true,
      centerToMarker: true,
      markerToCenter: true,

      // Basic defalt geocoder with Google
      geocoder: this.defaultGeocoder,

      // Super class is just a top level class that goes in the markup
      // that is helpful for dynamic options and preDraw and styling
      superClass: undefined,

      // Use this hook to change options with each re-draw
      /*
      preDraw: function(options) {
        // Update marker color on darker tileset
        if (options.tileset === "Stamen Toner") {
          options.markerBackground = "rgba(51, 102, 255, 1)";
        }
        else {
          options.markerBackground = "rgba(0, 0, 0, 0.9)";
        }
      }
      */
    }, options);

    // Generate a unique id
    this.id = _.uniqueId("locator-");

    // Make some options that won't change more accessible
    this.el = this.options.el;

    // Tilesets can be just a URL, or an object with a URL and
    // preview
    // TODO: This could technically change while drawing and should
    // be placed where it affects that.
    this.options.tilesets = this.parseTilesets(this.options.tilesets);

    // Build interface
    this.drawInterface();
  };

  // Add methods and properties
  _.extend(Locator.prototype, {
    // Make interface
    drawInterface: function() {
      // Place holder to work around object reference changes
      var oldReference = _.clone(this.options);

      // Certain properties should not re-generate map but may be updated.
      var noGenerate = {
        controlsOpen: this.options.controlsOpen
      };

      // Create ractive object
      this.interface = new Ractive({
        el: this.options.el,
        template: this.options.template,
        data: {
          options: this.options,
          noGenerate: noGenerate,
          isGeocoding: false,
          geocodeInput: "",
          _: _
        }
      });

      // Match up events
      this.interface.on("generate", _.bind(this.generate, this));

      // Throttle some functions
      this.throttledDrawMaps = _.throttle(_.bind(this.drawMaps, this), 1500);
      if (_.isFunction(this.options.geocoder)) {
        this.throttledGeocoder = _.throttle(_.bind(this.options.geocoder, this), 1500);
      }

      // Handle general config updates
      this.interface.observe("options", _.bind(function(options) {
        // TODO: Recenter should only happen if the lat, lng is outside
        // the current map view.
        var recenter = (options.lat !== oldReference.lat ||
          options.lng !== oldReference.lng);

        // The reference to options is maintained
        this.throttledDrawMaps(recenter);

        // Update past reference
        oldReference = _.clone(options);
      }, this), { init: false });

      // Handle geocoding
      this.interface.observe("geocodeInput", _.bind(function(input) {
        if (_.isFunction(this.throttledGeocoder)) {
          this.throttledGeocoder(input, _.bind(function(lat, lng) {
            this.options.lat = lat;
            this.options.lng = lng;
            this.throttledDrawMaps(true);
          }, this));
        }
      }, this), { init: false });

      // If someone override attribution, then it should be on
      // the map
      this.interface.observe("options.overrideAttribution", function(attribution) {
        var e = this.get("options.embedAttribution");
        if (attribution && !e) {
          this.set("options.embedAttribution", true);
        }
      }, { init: true });

      // General toggle event functions
      this.interface.on("toggle", function(e, property) {
        this.set(property, !this.get(property));
      });

      // General set event functions
      this.interface.on("set", function(e, property, value) {
        this.set(property, value);
      });

      // TODO: These two things need to work with multiple markers.  A button for each ??

      // Move marker to center of map
      this.interface.on("marker-to-center", _.bind(function() {
        var center = this.map.getCenter();
        this.options.lat = center.lat;
        this.options.lng = center.lng;
        this.interface.update();
      }, this));

      // Center map around marker
      this.interface.on("center-to-marker", _.bind(function() {
        this.map.setView([this.options.lat, this.options.lng]);
      }, this));

      // Initialize map parts
      this.drawMaps();
    },

    // Draw map parts
    drawMaps: function(recenter) {
      this.alterOptions("preDraw");
      this.drawMap(recenter);
      this.drawMarkers();
      this.drawMinimap();

      // Some style fixes
      this.fixMapVerticalAlign();
    },

    // Alter options with custom function
    alterOptions: function(property) {
      if (_.isFunction(this.options[property])) {
        _.bind(this.options[property], this)(this.options);
      }
    },

    // Make main map
    drawMap: function(recenter) {
      recenter = recenter || false;
      var mapEl = this.getEl(".locator-map");
      var width;
      var height;
      var view;

      // Generate an id for the map
      mapEl.id = this.id + "-map";

      // Kill map if existings, but get the current view if we are
      // not recentering
      view = [this.options.lat, this.options.lng, this.options.zoom];
      if (this.map && !recenter) {
        view[0] = this.map.getCenter().lat;
        view[1] = this.map.getCenter().lng;
        view[2] = this.map.getZoom();
        this.map.remove();
      }
      else if (this.map) {
        this.map.remove();
      }

      // Determine size of map.  Use options if available, or check for
      // number, or use size of container
      width = _.size(this.options.widths) ?
        this.options.widths[this.options.width] :
        _.isNumber(this.options.width) ? this.options.width :
        mapEl.getBoundingClientRect().width;

      height = _.size(this.options.ratios) ?
        width / this.options.ratios[this.options.ratio] :
        _.isNumber(this.options.ratio) ? width / this.options.ratio :
        mapEl.getBoundingClientRect().height;

      mapEl.style.width = width + "px";
      mapEl.style.height = height + "px";

      // Make map and set view
      this.map = new L.Map(mapEl.id, {
        minZoom: this.options.minZoom,
        maxZoom: this.options.maxZoom,
        attributionControl: false
      });
      this.map.setView([view[0], view[1]], view[2]);

      // Tile layer
      this.mapLayer = new L.TileLayer(this.options.tilesets[this.options.tileset].url);
      this.map.addLayer(this.mapLayer);
    },

    // Draw minimap
    drawMinimap: function() {
      var miniEl;

      // Determine height and width.  The value can be a number which
      // we use as pixels, or it can be an percentage of height or width
      var w = this.getEl(".locator-map").getBoundingClientRect().width;
      var h = this.getEl(".locator-map").getBoundingClientRect().height;
      var mW = (_.isNumber(this.options.miniWidth)) ? this.options.miniWidth :
        (this.options.miniWidth.indexOf("w") !== -1) ?
        +this.options.miniWidth.replace("w", "") / 100 * w :
        +this.options.miniWidth.replace("h", "") / 100 * h;
      var mH = (_.isNumber(this.options.miniHeight)) ? this.options.miniHeight :
        (this.options.miniHeight.indexOf("w") !== -1) ?
        +this.options.miniHeight.replace("w", "") / 100 * w :
        +this.options.miniHeight.replace("h", "") / 100 * h;

      // Create layer for minimap
      this.minimapLayer = new L.TileLayer(this.options.tilesets[this.options.tileset].url);

      // Create control
      this.miniMap = new L.Control.MiniMap(this.minimapLayer, {
        width: mW,
        height: mH,
        zoomLevelOffset: this.options.miniZoomOffset,

        // Don't show original rectangle (see below)
        aimingRectOptions: {
          fill: false,
          stroke: false
        }
      });

      // Add control
      this.map.addControl(this.miniMap);

      // We have to manually create a canvas layer, since using the L.preferCanvas
      // method really screws things up, and Leaflet 1.0.0 which has better
      // support for the canvas preference does not work with Leaflet Minimap
      this.miniMap._miniMap.addLayer(this.drawMiniCanvasLayer(this.options.miniExtentStyles));

      // Manually style due to canvas2html limitations that require
      // us to manually make box
      miniEl = this.getEl(".locator-map .leaflet-control-minimap");
      _.each(this.miniStylesToCSS(this.options.miniStyles), function(def, prop) {
        miniEl.style[prop] = def;
      });
    },

    // Minimap custom canvas layer
    drawMiniCanvasLayer: function(styles) {
      this.miniCanvasLayer = L.tileLayer.canvas();
      this.miniCanvasLayer.drawTile = _.bind(function(canvas, tilePoint, zoom) {
        var ctx = canvas.getContext("2d");

        // Clear out tile
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Get some dimensions
        var dim = {};
        dim.nwPoint = tilePoint.multiplyBy(256);
        dim.sePoint = dim.nwPoint.add(new L.Point(256, 256));
        dim.nwCoord = this.map.unproject(dim.nwPoint, zoom, true);
        dim.seCoord = this.map.unproject(dim.sePoint, zoom, true);
        dim.bCoord = L.latLngBounds([[dim.nwCoord.lat, dim.seCoord.lng],
          [dim.seCoord.lat, dim.nwCoord.lng]]);
        dim.bPoint = [dim.nwPoint, dim.sePoint];

        // TODO: Use a buffer or some calculation so that we only draw into tiles
        // that the marker spills into.
        // bCoord.contains(bCoord)
        if (true) {
          var bounds = this.map.getBounds();
          var nw = this.map.project(bounds.getNorthWest(), zoom, true);
          var se = this.map.project(bounds.getSouthEast(), zoom, true);

          // Draw box
          ctx.beginPath();
          ctx.rect(nw.x - dim.nwPoint.x, nw.y - dim.nwPoint.y, se.x - nw.x, se.y - nw.y);
          ctx = this.leafletStylesToCanvas(styles, ctx);
          ctx.closePath();
        }
      }, this);

      // Track the movements of the main map
      this.map.on("moveend", _.bind(function() {
        this.miniCanvasLayer.redraw();
      }, this));

      return this.miniCanvasLayer;
    },

    // Set up marker canvase layer and draw all markers
    drawMarkers: function() {
      // Remove existing layer if there
      if (this.markerCanvas && this.map && this.markerCanvas._map) {
        this.map.removeLayer(this.markerCanvas);
      }

      // Set up canvas layer
      this.markerCanvas = L.tileLayer.canvas();
      this.markerCanvas.drawTile = _.bind(this.drawMarkerTile, this);
      this.markerCanvas.addTo(this.map);

      // Make draggable marker
      _.each(this.options.markers, _.bind(function(m, mi) {
        this.options.markers[mi] = _.extend(_.clone(this.options.markerDefaults), m);
        this.draggableMarker(this.options.markers[mi], mi);
      }, this));
    },

    // Make marker draggable via an invisble marker
    draggableMarker: function(marker, markerIndex) {
      this.draggableMarkers = this.draggableMarkers || {};
      var draggable = this.draggableMarkers[markerIndex];

      // Remove first
      if (draggable && this.map && draggable._map) {
        draggable.clearAllEventListeners();
        this.map.removeLayer(draggable);
      }

      // Create marker
      this.draggableMarkers[markerIndex] = draggable = L.marker(L.latLng(marker.lat, marker.lng), {
        icon: this.options.draggableMarker,
        draggable: true,
        opacity: 0,
        title: "Drag marker here"
      }).addTo(this.map);

      // Hover over
      draggable.on("mouseover", function(e) {
        if (!draggable.isDragging) {
          e.target.setOpacity(0.3);
        }
      });

      // Hover out
      draggable.on("mouseout", function(e) {
        if (!draggable.isDragging) {
          e.target.setOpacity(0);
        }
      });

      // Start dragging
      draggable.on("dragstart", function(e) {
        draggable.isDragging = true;
        e.target.setOpacity(1);
      });

      // Start dragging
      draggable.on("dragend", _.bind(function(e) {
        draggable.isDragging = false;
        e.target.setOpacity(0);

        // Set lat, lng
        var l = e.target.getLatLng();
        marker.lat = l.lat;
        marker.lng = l.lng;
        this.drawMarkers();
      }, this));
    },

    // Marker canvas layer tile draw function
    drawMarkerTile: function(canvas, tilePoint, zoom) {
      var ctx = canvas.getContext("2d");

      // Clear out tile
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw each marker
      _.each(this.options.markers, _.bind(function(m) {
        m = _.extend(_.clone(this.options.markerDefaults), m);
        this.drawMarker(m, canvas, tilePoint, zoom);
      }, this));
    },

    // Marker layer draw handler
    drawMarker: function(marker, canvas, tilePoint, zoom) {
      var ctx = canvas.getContext("2d");
      var placement;
      var textWidth;
      var labelWidth;

      // Handle line breaks in text
      var text = marker.text.split("<br>");
      text = _.map(text, function(t) {
        return t.trim();
      });

      // Determine lines values
      var lines = text.length;
      var lineHeight = 1.25;
      var labelHeight = ((marker.fontSize * lineHeight) * lines) + (marker.padding * 2);

      // Get some dimensions
      var dim = {};
      dim.nwPoint = tilePoint.multiplyBy(256);
      dim.sePoint = dim.nwPoint.add(new L.Point(256, 256));
      dim.nwCoord = this.map.unproject(dim.nwPoint, zoom, true);
      dim.seCoord = this.map.unproject(dim.sePoint, zoom, true);
      dim.bCoord = L.latLngBounds([[dim.nwCoord.lat, dim.seCoord.lng],
        [dim.seCoord.lat, dim.nwCoord.lng]]);
      dim.bPoint = [dim.nwPoint, dim.sePoint];
      dim.locCoord = L.latLng(marker.lat, marker.lng);
      dim.locPoint = this.map.project(dim.locCoord, zoom, true);

      // TODO: Use a buffer or some calculation so that we only draw into tiles
      // that the marker spills into.
      // bCoord.contains(bCoord)
      if (true) {
        // Determine placement in tile
        placement = {
          x: dim.locPoint.x - dim.nwPoint.x,
          y: dim.locPoint.y - dim.nwPoint.y
        };

        // Draw point on location
        ctx.beginPath();
        ctx.translate(placement.x - marker.radius, placement.y - marker.radius);
        ctx.fillStyle = marker.background;
        ctx.fillRect(0, 0,
          marker.radius * 2,
          marker.radius * 2
        );
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.closePath();

        // Label connection line
        ctx.beginPath();
        ctx.translate(placement.x - (marker.labelWidth / 2),
          placement.y - marker.radius - marker.labelDistance);
        ctx.fillStyle = marker.background;
        ctx.fillRect(0, 0,
          marker.labelWidth,
          marker.labelDistance
        );
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.closePath();

        // Determine width of text
        ctx.beginPath();
        ctx.font = marker.fontSize + "px " + marker.font;
        ctx.fillStyle = marker.foreground;
        ctx.textAlign = "center";

        // Get the width of the longest text
        textWidth = _.max(text, function(t) {
          return ctx.measureText(t).width;
        });

        textWidth = ctx.measureText(textWidth).width;
        labelWidth = textWidth + marker.padding * 2;
        ctx.closePath();

        // Make label rectangle
        ctx.beginPath();
        ctx.translate(placement.x - (labelWidth / 2),
          placement.y - marker.radius - marker.labelDistance - labelHeight);
        ctx.fillStyle = marker.background;
        ctx.fillRect(0, 0, labelWidth, labelHeight);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.closePath();

        // Add label(s)
        _.each(text, _.bind(function(t, ti) {
          // There's a tad extra space at bottom of text
          var offset = 1;

          ctx.beginPath();
          ctx.translate(placement.x,
            placement.y - marker.radius - marker.labelDistance -
            labelHeight + marker.padding + offset +
            ((marker.fontSize * lineHeight) * (ti)));

          ctx.font = marker.fontSize + "px " + marker.font;
          ctx.fillStyle = marker.foreground;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(t, 0, 0);

          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.closePath();
        }, this));
      }
    },

    // Generate image
    generate: function() {
      // Hide parts not to render
      this.getEl(".locator-map .leaflet-control-zoom").style.display = "none";
      this.getEl(".locator-map .leaflet-control-minimap").style.display = "none";

      // Turn main map into canvas
      html2canvas(this.getEl(".locator-map"), {
        useCORS: true,
        onrendered: _.bind(function(mapCanvas) {
          // Re-display parts
          this.getEl(".locator-map .leaflet-control-zoom").style.display = "block";
          this.getEl(".locator-map .leaflet-control-minimap").style.display = "block";

          // Make mini map
          html2canvas(this.getEl(".locator-map .leaflet-control-minimap"), {
            useCORS: true,
            onrendered: _.bind(function(miniCanvas) {
              var mapCtx = this.drawCanvasMiniMap(mapCanvas, miniCanvas);

              // Preview and export
              this.preview(mapCtx);
              this.export(mapCtx);
            }, this)
          });
        }, this)
      });
    },

    // Draw minimap
    drawCanvasMiniMap: function(mapCanvas, miniCanvas) {
      // Create context
      var mapCtx = mapCanvas.getContext("2d");
      var miniEl = this.getEl(".locator-map .leaflet-control-minimap");
      var w = miniEl.getBoundingClientRect().width;
      var h = miniEl.getBoundingClientRect().height;
      var styles = this.options.miniStyles;

      // TODO: Determine how far away the minimap is from the edge
      var fromRight = 10;
      var fromBottom = 10;

      // Make back drop
      mapCtx.beginPath();
      mapCtx.fillStyle = styles.backgroundColor;

      if (styles.shadow) {
        mapCtx.shadowColor = styles.shadowColor;
        mapCtx.shadowBlur = styles.shadowBlur;
        mapCtx.shadowOffsetX = styles.shadowOffsetX;
        mapCtx.shadowOffsetY = styles.shadowOffsetY;
      }

      mapCtx.fillRect(
        mapCtx.canvas.width - fromRight - w - (styles.padding * 2),
        mapCtx.canvas.height - fromBottom - h - (styles.padding * 2),
        w + (styles.padding * 2),
        h + (styles.padding * 2));
      mapCtx.closePath();

      // Make map
      mapCtx.beginPath();
      mapCtx.shadowColor = 0;
      mapCtx.shadowBlur = 0;
      mapCtx.shadowOffsetX = 0;
      mapCtx.shadowOffsetY = 0;
      mapCtx.drawImage(miniCanvas,
        mapCtx.canvas.width - fromRight - w - styles.padding,
        mapCtx.canvas.height - fromBottom - h - styles.padding,
        w,
        h);
      mapCtx.closePath();

      return mapCtx;
    },

    // Preview
    preview: function(mapCtx) {
      this.getEl(".preview img").src = mapCtx.canvas.toDataURL();

      // Uncomment for some more debugging
      //this.getEl(".preview").style.display = "block";
    },

    // Export/download.  TODO: use marker text for name
    export: function(mapCtx) {
      var download = this.getEl(".download-link");
      download.href = mapCtx.canvas.toDataURL();
      download.download = this.makeID(this.options.markerText) + ".png";
      download.click();
    },

    // Get element from query selector relative to locator
    getEl: function(element) {
      return document.querySelector(this.el + " " + element);
    },

    // Turn mini styles to CSS
    miniStylesToCSS: function(options) {
      var props = {
        "background-color": options.backgroundColor,
        border: options.padding + "px solid " + options.backgroundColor
      };

      if (options.shadow) {
        props["box-shadow"] = options.shadowOffsetX + "px " +
          options.shadowOffsetY + "px " +
          options.shadowBlur + "px " +
          options.shadowColor;
      }

      return props;
    },

    // Leaflet path styles to canvas context
    // Borrowed from:
    // https://github.com/Leaflet/Leaflet/blob/2a5857d172f0fa982c6c54fa5511e9b29ae13ec7/src/layer/vector/Canvas.js#L175
    leafletStylesToCanvas: function(styles, context) {
      if (styles.fill) {
        context.globalAlpha = styles.fillOpacity || 1;
        context.fillStyle = styles.fillColor || styles.color;
        context.fill(styles.fillRule || "evenodd");
      }

      if (styles.stroke && styles.weight !== 0) {
        context.globalAlpha = styles.opacity || 1;
        context.strokeStyle = styles.color;
        context.lineCap = styles.lineCap;
        context.lineJoin = styles.lineJoin;
        context.stroke();
      }

      return context;
    },

    // A vrey crude geocoder that uses Google goeocoding
    defaultGeocoder: function(address, done) {
      var httpRequest = new XMLHttpRequest();
      var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address);
      var once = _.once(done);

      httpRequest.onreadystatechange = function() {
        var data;

        if (httpRequest.status === 200 && httpRequest.responseText) {
          data = JSON.parse(httpRequest.responseText);

          if (data && data.results && data.results.length) {
            once(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
          }
        }
      };

      httpRequest.open("GET", url);
      httpRequest.send();
    },

    // Standarize tileset options
    parseTilesets: function(tilesets) {
      _.each(tilesets, function(t, ti) {
        // Make into object
        if (_.isString(t)) {
          tilesets[ti] = {
            url: t
          };
        }

        // Check for preview
        if (!tilesets[ti].preview) {
          // Pick a fairly arbitrary tile to use
          tilesets[ti].preview = tilesets[ti].url.replace("{s}", "a")
            .replace("{x}", "301")
            .replace("{y}", "385")
            .replace("{z}", "10");
        }
      });

      return tilesets;
    },

    // Create a slug/id
    makeID: function(input) {
      input = input.toString();
      input = input.toLowerCase().trim().replace(/\W+/g, "-");
      input = input ? input : "locator";
      return _.uniqueId(input + "-");
    },

    // Check if element is overflowed
    overflowed: function(element, direction) {
      return (!direction) ?
        (element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) :
        (direction === "y") ? (element.scrollHeight > element.clientHeight) :
        (direction === "x") ? (element.scrollWidth > element.clientWidth) : false;
    },

    // Some hackery to fix the map vertical alignment
    fixMapVerticalAlign: function() {
      var display = this.getEl(".locator-display");

      if (this.overflowed(display, "y")) {
        display.classList.add("overflowed-y");
      }
      else {
        display.classList.remove("overflowed-y");
      }
    }
  });

  // Add to window
  window.Locator = Locator;
})();
