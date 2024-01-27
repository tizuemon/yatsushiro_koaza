const map = L.map("map").setView([35.6727, 139.662], 14);

L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png", {
  attribution:
    "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
}).addTo(map);

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
