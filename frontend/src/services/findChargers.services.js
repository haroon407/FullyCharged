import axios from 'axios';
import baseUrl from './baseUrl';

class FindChargersServiceClass {

  getChargers(user) {
    let token = user.token;
    const URL = baseUrl + '/locations/analytics';
    return axios(URL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(response => {
      // return response.data;
      return [
        {latitude: 47.49855629475769, longitude: -122.14184416996333, name: "GA01", id: 1},
        {latitude: 47.359423, longitude: -122.021071, name: "GA02", id: 2},
        {latitude: 47.2052192687988, longitude: -121.988426208496, name: "GA03", id: 3},
        {latitude: 47.6307081, longitude: -122.1434325, name: "GA04", id: 4},
        {latitude: 47.3084488, longitude: -122.2140121, name: "GA05", id: 5},
        {latitude: 47.5524695, longitude: -122.0425407, name: "GA06", id: 6}
      ];
    }).catch(error => {
      throw error;
    });
  }

  getData(sw1, sw2, ne1, ne2, startDate, startTime, user) {
    let token = user.token;
    console.log("Searching..");
    //&price=0.34
    //sw48.089953, 11.452432
    //ne48.232632, 11.617728
    // def sw=48.25653029401251,11.633186874796593&ne=48.27181450576806,11.713309822489464
    //startDate=2019-07-24
    // sw1 = 48.089953;
    // sw2 = 11.452432;
    // ne1 = 48.232632;
    // ne2 = 11.617728;
    //
    // // sw1 = 48.25653029401251;
    // // sw2 = 11.633186874796593;
    // // ne1 = 48.27181450576806;
    // // ne2 = 11.713309822489464;
    //
    // startDate = '2019-07-24';
    // startTime = 10;
    const URL = baseUrl+'/locations/search?sw='+sw1+','+sw2+'&ne='+ne1+','+ne2+'&startDate='+startDate+'&startTime='+startTime;
    console.log(URL);
    return axios(URL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(response => {
      console.log(response);
      let arr = response.data;
      var i;
      var result = [];
      for (i=0; i<arr.length; i++){

        let option = {
          latitude: arr[i].geoPoint.coordinates[1],
          longitude: arr[i].geoPoint.coordinates[0],
          name: arr[i].name,
          id: arr[i]._id
        }
        result.push(option);
        console.log(option);
      }
      return result;
    }).catch(error => {
      console.log("Error: " + error);
      throw error;
    });
  }

  selectCharger(chargerId, date, startTime){
    // TODO: User clicked on charging location and time
  }

}
const FindChargersService = new FindChargersServiceClass();
export default FindChargersService;
