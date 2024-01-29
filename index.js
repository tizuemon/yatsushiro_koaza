const map = L.map("map").setView([32.507,130.602], 14);

L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png", {
  attribution:
    "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
}).addTo(map);


// ポリゴンのスタイル設定
const polygonStyleOptions = {
  color: "#810FCB",
  opacity: 1.0,
  weight: 2.0,
  fillColor: "#810FCB",
  fillOpacity: 0.5,
};

// GeoJSONファイルの表示
fetch("yatsushiro_koaza.geojson")
  .then((response) => response.json())
  .then((data) => {
    L.geoJSON(data, polygonStyleOptions).addTo(map);
  });




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
