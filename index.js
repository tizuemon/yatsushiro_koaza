const map = L.map("map").setView([32.5396102, 130.6321314], 14);

L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png", {
  attribution:
    "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
}).addTo(map);


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


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// ポリゴンのスタイル設定
// const polygonStyleOptions = {
//   color: "#810FCB",
//   opacity: 1.0,
//   weight: 2.0,
//   fillColor: getColor(300),
//   fillOpacity: 0.5,
// };

// GeoJSONファイルの表示
// fetch("yatsushiro_koaza.geojson")
//   .then((response) => response.json())
//   .then((data) => {
//     L.geoJSON(data, polygonStyleOptions).addTo(map);
//   });

function style(feature) {

  // let tehepero = rgb(100,100,100);

  return {
    "color": "rgb(100,100,100)",
    "weight": 0.8,
    "opacity": 0.7,
    "fillColor": getColor(getRandomInt(80, 0)),
    "fillOpacity": 0.2
  }

}

$.getJSON("yatsushiro_koaza.geojson", function (data) {
  // L.geoJson(data,{

  border = L.geoJson(data, {

    // style: {
    //   "color": getColor(300),
    //   "weight": 2,
    //   "opacity": 0.7,
    //   "fillColor": getColor(Math.random() * ((1200 - 0) + 0)),
    //   "fillOpacity": 0.2,
    // },

    style: style,

    onEachFeature: function (feature, layer) {
      let pref = feature.properties.新小字名;      //都道府県名（使用せず）
      let country = feature.properties.大字名;   //政令指定都市及び郡部
      let city = feature.properties.lat;      //市区町名
      let name = "";
      // if (country){
      //     name = country+city;
      // }
      // else {
      //     name = city;
      // }


      let koaza = feature.properties.新小字名;

      var divIcon1 = L.divIcon({
        html: koaza,
        className: 'divicon1',
        iconSize: [50, 50],
        iconAnchor: [10, 10],
        popupAnchor: [0, 0]
      });

      L.marker([feature.properties.lat, feature.properties.lon], { icon: divIcon1 }).addTo(map);


      layer.bindPopup(pref);
    }
  }).addTo(map);

 
});

// // スクロール時のイベントを追加
// window.addEventListener('scroll', function(){

//   // var response = map.getZoom();
  
//   // if(response=14)
  
//   // const elm = document.querySelector(".map");
  
  
//   console.log("!");

//   // alert('help');

// });


// window.addEventListener('click', function() {
  
//   console.log('ページが読み込まれました！');


//   var response = map.getZoom();
  
//   if(response >=14){
//     console.log('御目ッと');
//   }


// });



// $(window).on('scroll',function(){
//   console.log("!");
// });


/*
L.vectorGrid
  .protobuf(
    "https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf",
    {
      attribution:
        "<a href='https://github.com/gsi-cyberjapan/gsimaps-vector-experiment' target='_blank'>国土地理院ベクトルタイル提供実験</a>",
      rendererFactory: L.canvas.tile,
      // 各レイヤーのスタイル設定
      vectorTileLayerStyles: {
        road: {
          color: "gray",
          weight: 1,
        },
        railway: {
          color: "green",
          weight: 2,
        },
        river: {
          color: "dodgerblue",
          weight: 1,
        },
        lake: {
          color: "dodgerblue",
          weight: 1,
        },
        // 表示しないレイヤー
        boundary: [],
        building: [],
        coastline: [],
        contour: [],
        elevation: [],
        label: [],
        landforma: [],
        landforml: [],
        landformp: [],
        searoute: [],
        structurea: [],
        structurel: [],
        symbol: [],
        transp: [],
        waterarea: [],
        wstructurea: [],
      },
    }
  )
  .addTo(map);
*/
