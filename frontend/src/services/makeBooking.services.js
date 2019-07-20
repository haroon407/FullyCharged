import axios from 'axios';
import HttpService from '../services/HttpService';

class MakeBookingServiceClass {

  getData() {
    let token = window.localStorage['jwtToken'];
    console.log("Searching..");
    const URL = 'http://localhost:3002/locations/search?sw=48.25653029401251,11.633186874796593&ne=48.27181450576806,11.713309822489464&startDate=2019-07-21&startTime=10&price=0.34';
    return axios(URL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(response => {
      console.log("Retrieved: " + response);
      return response.data;
    }).catch(error => {
      console.log("Error: " + error);
      throw error;
    });
  }

  getBookingInformation() {
    let token = window.localStorage['jwtToken'];
    console.log("My token: " + token);
    return HttpService.get(HttpService.apiURL() + '/location/analytics', function onSuccess(res){
      console.log(res);
    }, function onError(error){
      console.log(error);
    });
  }

  getChargers() {
    let token = window.localStorage['jwtToken'];
    console.log("My token: " + token);
    return HttpService.get(HttpService.apiURL() + '/location/analytics', function onSuccess(res){
      console.log(res);
    }, function onError(error){
      console.log(error);
    });
  }


  testFunc() {

    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", 'http://localhost:3001/auth/register', true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify({
    //   name: "Peta",
    //   email: 'petuh2@gmail.com',
    //   password: 'test2012ktl',
    //   role: 'EVCP'
    // }));
    // xhr.onload = function() {
    //   console.log("HELLO")
    //   console.log(this.responseText);
    //   var data = JSON.parse(this.responseText);
    //   console.log(data);
    // }

    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", 'http://localhost:3001/auth/login', true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify({
    //   email: 'petuh2@gmail.com',
    //   password: 'test2012ktl'
    // }));
    // xhr.onload = function() {
    //   // console.log(this.responseText);
    //   var data = JSON.parse(this.responseText);
    //   var str = data.token;
    //   console.log("Got: " + str);
    //   this.callnext(str);
    //
    // }
    // return null;
    let token = window.localStorage['jwtToken'];
    //5d307313f7d3a906618b3a49/
    const URL = 'http://localhost:3002/locations/analytics';
    return axios(URL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(response => {
      return response.data;
    }).catch(error => {
      throw error;
    });
  }

  callnext(){
    let token = window.localStorage['jwtToken'];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:3002/locations/search?sw=48.25653029401251,11.633186874796593&ne=48.27181450576806,11.713309822489464&startDate=2019-07-15&startTime=10&price=0.3', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.onload = function() {
      console.log("HELLO2")
      console.log(this.responseText);
      var data = JSON.parse(this.responseText);
      console.log(data);
    };
  }

    makeBooking(id) {
        const URL = 'http://localhost:3002';
        return axios(URL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        }).then(response => {
          return response.data;
        })
            .catch(error => {
                throw error;
            });
    }

    calculateCost(id) {
        const URL = 'http://localhost:3002';
        return axios(URL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        }).then(response => {
          return response.data;
        })
            .catch(error => {
                throw error;
            });
    }

    getChargers2() {
        const URL = 'http://localhost:3002';
        return axios(URL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        }).then(response => {
          return [
              {id: 1, chargingLevel: 1, power: 7.4, connector: "Tesla HPWC"},
              {id: 2, chargingLevel: 2, power: 22, connector: "Type 2 plug"},
              {id: 3, chargingLevel: 3, power: 50, connector: "TCHAdeMO plug"},
              {id: 4, chargingLevel: 3, power: 150, connector: "Tesla Supercharger"}
          ];
          // return response.data;
        })
            .catch(error => {
                throw error;
            });
    }
}
const MakeBookingService = new MakeBookingServiceClass();
export default MakeBookingService;
