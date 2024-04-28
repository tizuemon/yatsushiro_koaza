// map定義, 初期の緯度経度指定
const map = L.map("map").setView([32.5396102, 130.6321314], 14);

// 地理院地図読み込み
L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png", {
  attribution:
    "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
}).addTo(map);

// 地図切り替え
L.control.layers({
  "淡色地図": L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png", {
    attribution: "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>"
  }).addTo(map),
  "標準地図": L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
    attribution: "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>"
  }),
  "色別標高図": L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png", {
    attribution: "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>"
  }),
  "写真": L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg", {
    attribution: "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>"
  }),
  "OpenStreetMap": L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
  })

  // クラス名前設定
  // className: 'layer_control'

}).addTo(map);

map.zoomControl.setPosition("bottomright");

L.control.scale({
  imperial: false,
  metric: true
}).addTo(map);

// 前回の緯度経度記憶
// L.hash(map);


// 8色塗分け用
function getColor(d) {
  return d > 70 ? '#800026' :
    d > 60 ? '#7FC817' :
      d > 50 ? '#FF4F90' :
        d > 40 ? '#FFD453' :
          d > 30 ? '#FFF2CB' :
            d > 20 ? '#41D3F3' :
              d > 10 ? '#795AEE' :
                '#FFEDA0';
}

// 指定範囲の乱数生成
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// ポリゴンスタイル
function polygonstyle(feature) {

  return {
    "color": "rgb(250,10,70)",
    "weight": 2,
    "opacity": 0.8,
    // "fillColor": getColor(getRandomInt(80, 0)),
    // "fillOpacity": 0.2

    "fillColor": "rgb(255,255,255)",
    "fillOpacity": 0.2
  }

}

// geoJSON koaza 読み込み
$.getJSON("20240428_yatsushiro_koaza.geojson", function (data) {

  border = L.geoJson(data, {

    // style読み込み
    style: polygonstyle,

    onEachFeature: function (feature, layer) {
      let koaza_name = feature.properties.新小字名;
      let oaza_name = feature.properties.大字名;
      let polygon_lat = feature.properties.lat;
      let polygon_lon = feature.properties.lon;

      // 小字名表示ラベル
      var divIcon_koaza = L.divIcon({
        html: koaza_name,
        className: 'divicon_koaza',
        iconSize: [50, 50],
        iconAnchor: [20, 20],
        popupAnchor: [0, 0]
      });

      // 小字名表示
      L.marker([polygon_lat, polygon_lon], {
        icon: divIcon_koaza
      }).addTo(map);


      layer.bindPopup('大字 ： ' + oaza_name + '<br>' + '小字 ： ' + koaza_name);
    }

    // zIndex: 800
    

  }).addTo(map);


});


// var myPane = map.createPane("myPaneName");
// myPane.style.zIndex = 450;


// 大字ポリゴンスタイル
function oaza_polygonstyle(feature) {

  return {
    "color": "rgb(0,0,255)",
    "weight": 3,
    // "opacity": 1,
    // "fillColor": getColor(getRandomInt(80, 0)),
    "fillOpacity": 0,
  }

}


// geoJSON oaza 読み込み
$.getJSON("20240428_yatsushiro_oaza.geojson", function (data) {

  oaza_border = L.geoJson(data, {

    // pane: "myPane",

    // style読み込み
    style: oaza_polygonstyle,

    onEachFeature: function (feature, layer) {
      // let koaza_name = feature.properties.新小字名;
      let oaza_oaza_name = feature.properties.大字名;
      let oaza_polygon_lat = feature.properties.lat;
      let oaza_polygon_lon = feature.properties.lon;

      // 大字名表示ラベル
      var divIcon_oaza = L.divIcon({
        html: oaza_oaza_name,
        className: 'divicon_oaza',
        iconSize: [150, 50],
        iconAnchor: [100, 0],
        popupAnchor: [0, 0],
      });

      // 小字名表示
      L.marker([oaza_polygon_lat, oaza_polygon_lon], {
        icon: divIcon_oaza
      }).addTo(map);

      // layer.bindPopup('大字 ： ' + oaza_oaza_name + '<br>' + '小字 ： ' + koaza_name);
    }

    // zIndex: 9000

  }).addTo(map);

});


// スクロール判定

// window.addEventListener('click', function() {
//   console.log('クリックされました');
//   var response = map.getZoom();
//   if(response >=14){
//     console.log('ズームレベル：14以上');
//   }
// });
