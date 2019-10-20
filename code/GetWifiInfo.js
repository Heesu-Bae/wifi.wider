// 참조 (https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula)
function getDistance(lat1,lon1,lat2,lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2-lat1);
  const dLon = deg2rad(lon2-lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

module.exports.function = function getWifiInfo (near, point, self) {
  const dummyData = require("./data/Wifi_data_json.js");
  const console = require('console');
  
  // console.log(near);
  // console.log(point);
  console.log(self);
  
  let result = [];
  let temp_list =[];
  
  if(near != undefined){
    let distance = 0;
    
    for(let i = 0; i < dummyData.length; i++){
      distance = getDistance(point.point.latitude, point.point.longitude,
                             dummyData[i].point.point.latitude, dummyData[i].point.point.longitude);      
      
      if(distance < 1){
        if(self.nameInfo != undefined){
          if(self.nameInfo.nickName){
            dummyData[i].username = self.nameInfo.nickName;
          }else{
            dummyData[i].username = self.nameInfo.structuredName;
          }  
        }else{
          dummyData[i].username = '사용자';
        }
              
        dummyData[i].flag = true;

        temp_list.push(dummyData[i].username);
        temp_list.push(dummyData[i].wifissid);
        temp_list.push(dummyData[i].rdnmadr);
        temp_list.push(dummyData[i].lnmadr);
        temp_list.push(dummyData[i].point);
        temp_list.push(dummyData[i].flag);

        result.push(temp_list);
      }   
    }
   
  }else{    
    for(let i = 0; i < dummyData.length; i++){
      dummyData[i].username = '사용자';
      dummyData[i].flag = true;
      temp_list.push(dummyData[i].username);
      temp_list.push(dummyData[i].wifissid);
      temp_list.push(dummyData[i].rdnmadr);
      temp_list.push(dummyData[i].lnmadr);
      temp_list.push(dummyData[i].point);
      temp_list.push(dummyData[i].flag);

      result.push(temp_list);
    }
  }
  
  return result;
}