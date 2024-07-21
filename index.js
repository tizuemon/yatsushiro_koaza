// 地図の初期設定
const map = L.map("map").setView([32.507, 130.602], 15);

// 地理院地図のレイヤー設定
const paleMap = L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png", {
  attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
}).addTo(map);

const standardMap = L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
  attribution: "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>"
});

const reliefMap = L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png", {
  attribution: "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>"
});

const photoMap = L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg", {
  attribution: "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>"
});

const osmMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
});

// レイヤーコントロールの追加
L.control.layers({
  "淡色地図": paleMap,
  "標準地図": standardMap,
  "色別標高図": reliefMap,
  "写真": photoMap,
  "OpenStreetMap": osmMap
}).addTo(map);

// ズームコントロールの位置設定
map.zoomControl.setPosition("bottomright");

// スケールコントロールの追加
L.control.scale({
  imperial: false,
  metric: true
}).addTo(map);

// 色分け関数
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

// 乱数生成関数
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// 大字ごとにランダムな色を生成
const oazaColors = {};
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// 小字ポリゴンスタイル設定
function polygonStyle(feature) {
  const oazaName = feature.properties.大字名;
  if (!oazaColors[oazaName]) {
    oazaColors[oazaName] = getRandomColor();
  }
  return {
    color: "rgb(50,50,50)",
    weight: 1.5,
    opacity: 0.8,
    fillColor: oazaColors[oazaName],
    fillOpacity: 0.3
  };
}

// 小字ポリゴンの読み込みと表示
let koazaMarkers = [];

$.getJSON("20240721_yatsushiro_koaza.geojson", function (data) {
  L.geoJson(data, {
    style: polygonStyle,
    onEachFeature: function (feature, layer) {
      const koazaName = feature.properties.新小字名;
      const oazaName = feature.properties.大字名;
      const lat = feature.properties.lat;
      const lon = feature.properties.lon;

      const divIconKoaza = L.divIcon({
        html: koazaName,
        className: 'divicon_koaza',
        iconSize: [50, 50],
        iconAnchor: [20, 20],
        popupAnchor: [0, 0]
      });

      const marker = L.marker([lat, lon], { icon: divIconKoaza }).addTo(map);
      koazaMarkers.push(marker);
      layer.bindPopup(`大字 ： ${oazaName}<br>小字 ： ${koazaName}`);
    }
  }).addTo(map);
});

// 大字ポリゴンスタイル設定
function oazaPolygonStyle(feature) {
  return {
    color: "rgb(0,0,255)",
    weight: 3,
    fillOpacity: 0
  };
}

// 大字ポリゴンの読み込みと表示
// $.getJSON("yatsushiro_oaza.geojson", function (data) {
//   L.geoJson(data, {
//     style: oazaPolygonStyle,
//     onEachFeature: function (feature, layer) {
//       const oazaName = feature.properties.大字名;
//       const lat = feature.properties.lat;
//       const lon = feature.properties.lon;

//       const divIconOaza = L.divIcon({
//         html: oazaName,
//         className: 'divicon_oaza',
//         iconSize: [150, 50],
//         iconAnchor: [100, 0],
//         popupAnchor: [0, 0]
//       });

//       L.marker([lat, lon], { icon: divIconOaza }).addTo(map);
//     }
//   }).addTo(map);
// });

// ズームレベルに応じたラベルの表示・非表示
map.on('zoomend', function() {
  const zoomLevel = map.getZoom();
  koazaMarkers.forEach(marker => {
    if (zoomLevel < 15) {
      map.removeLayer(marker);
    } else {
      map.addLayer(marker);
    }
  });
});
