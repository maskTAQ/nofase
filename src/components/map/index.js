import React, { Component } from "react";
import { WebView, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
// const html = `
// <!doctype html>
//   <head>
//     <meta charset="utf-8">
//     <meta http-equiv="X-UA-Compatible" content="chrome=1">
//     <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
//     <style type="text/css">
//       body,html,#container{
//         height: 100%;
//         margin: 0px;
//       }
//     </style>
//     <title>快速入门</title>
//   </head>
//   <body>
//     <div id="container" tabindex="0"></div>
//     <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.3&key=amapqcXF9V36&plugin=AMap.Riding"></script>
//     <script type="text/javascript">
//     (function() {
//         var originalPostMessage = window.postMessage;

//         var patchedPostMessage = function(message, targetOrigin, transfer) {
//           originalPostMessage(message, targetOrigin, transfer);
//         };

//         patchedPostMessage.toString = function() {
//           return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
//         };

//         window.postMessage = patchedPostMessage;
//       })();
//     var Map = function (option) {
//         option = {
//             markers: [],
//             onMarkerClick: function (o) {
//                 console.log(o)
//             }
//         }
//         this.option = option;
//         this.init();
//     };

//     Map.prototype = {
//         constructor: Map,
//         init: function () {
//             this.map = new AMap.Map('container', {
//                 resizeEnable: true,
//                 zoom: 16
//             });

//         },
//         setMarkers: function () {
//             var that = this;
//             this.option.markers.forEach(function (markerLoaction) {
//                 var marker = new AMap.Marker({
//                     position: markerLoaction,
//                     // icon: new AMap.Icon({
//                     //     image: 'http://vdata.amap.com/icons/b18/1/2.png',//24px*24px
//                     //     //icon可缺省，缺省时为默认的蓝色水滴图标，
//                     //     size: new AMap.Size(24, 24)
//                     // }),
//                     clickable: true
//                 });
//                 marker.setMap(that.map);
//                 AMap.event.addListener(marker, 'click', function () {
//                     that.option.onMarkerClick({});
//                 });
//             });
//         },
//         setLine: function (start, end) {
//             //骑行导航
//             var riding = new AMap.Riding({
//                 map: this.map
//             });
//             //根据起终点坐标规划骑行路线
//             riding.search([116.397933, 39.844818], [116.440655, 39.878694]);
//         }
//     };

//     window.onload = function(){
//         var map = new Map({
//             markers: [],
//             onMarkerClick: function (o) {
//                 //发送消息给rn
//                 window.postMessage(o);
//             }
//         });
//         window.postMessage(8888);
//         //监听rn 发送过来的消息
//         window.addEventListener('message', function(){

//         }, false);
//     }
//     </script>

//   </body>
// </html>

// `;
export default class Map extends Component {
  state = {};
  render() {
    //发送消息给 html
    // setTimeout(()=>{
    //   this.webview.postMessage('1333')
    // },10000)

    /* eslint-disable */
    const patchPostMessageFunction = function() {
      var originalPostMessage = window.postMessage;

      var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
      };

      patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace(
          "hasOwnProperty",
          "postMessage"
        );
      };

      window.postMessage = patchedPostMessage;
    };
    const { userLng, userLat } = this.props.location;

    const patchPostMessageJsCode =
      "(" + String(patchPostMessageFunction) + ")();";

    return (
      <WebView
        source={{
          uri: `https://vmslq.cn/webview/map/index.html?userLng=${userLng}&userLat=${userLat}&platform=${
            Platform.OS
          }&right=${(42 - 16 - 12) / width * 100}%`
        }}
        ref={w => (this.webview = w)}
        style={{ flex: 1 }}
        injectedJavaScript={patchPostMessageJsCode}
        onMessage={e => {
          const storeId = e.nativeEvent.data;
          this.props.onStoreTap(storeId);
          console.log(e.nativeEvent.data, "这是html发送过来的消息");
        }}
      />
    );
  }
}
