function computeDistance(lat1,lon1,lat2,lon2) {
    var startLatRads = degreesToRadians(lat1);
    var startLongRads = degreesToRadians(lon1);
    var destLatRads = degreesToRadians(lat2);
    var destLongRads = degreesToRadians(lon2);

    var Radius = 6371; //지구의 반경(km)
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
                    Math.cos(startLatRads) * Math.cos(destLatRads) *
                    Math.cos(startLongRads - destLongRads)) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    radians = (degrees * Math.PI)/180;
    return radians;
}

module.exports.function = function getWifiInfo (near, point, self) {
  const dummyData = require("./data/Wifi_data.js");
  const console = require('console');
    
  let result = [];
  
  if(near != undefined){
    let distance = 0;
    
    for(let i = 0; i < dummyData.length; i++){
      distance = computeDistance(point.point.latitude, point.point.longitude,
                             dummyData[i].point.point.latitude, dummyData[i].point.point.longitude);  
      if(distance < 1){
        if(self.nameInfo != undefined){
          if(self.nameInfo.nickName){
            dummyData[i].username = self.nameInfo.nickName;
            console.log(dummyData[i].username);
          }else{
            dummyData[i].username = self.nameInfo.structuredName;
          }  
        }else{
          dummyData[i].username = '사용자';
        }
              
        dummyData[i].flag = true;
        
        result.push(dummyData[i]);
      }   
    }
   
  }else{    
    for(let i = 0; i < dummyData.length; i++){
      result.push(dummyData[i]);
    }
  }
  
  return result;
}