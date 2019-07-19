import axios from 'axios';
import HttpService from '../services/HttpService';

class AnalyticsServiceClass {

  getChargerLocations() {
    let token = window.localStorage['jwtToken'];
    const URL = 'http://localhost:3001/locations/analytics';
    return axios(URL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(response => {
      let locations = response.data.locations;
      var locs = [];
      var i;
      for (i=0; i<locations.length; i++) {
        let option = {
          id: locations[i]._id,
          location: this.parseLocation(locations[i])
        }
        locs.push(option);
      }
      return locs;
    }).catch(error => {
      throw error;
    });
  }

  parseLocation(data){
    let location = data.address.street + ", " + data.address.postalCode + ", " +
    data.address.city + ", " + data.address.state + ", " + data.address.country
    return location;
  }

  parseChargerNames(data){
    let result = [];
    var i;
    for (i=0; i<data.length; i++) {
      result.push(data[i].name);
    }
    return result;
  }

  parseChargerLevels(data){
    let result = [];
    var i;
    for (i=0; i<data.length; i++) {
      result.push("Level " + data[i].charger.type.chargingLevel);
    }
    return result;
  }

  parseChargerPowers(data){
    let result = [];
    var i;
    for (i=0; i<data.length; i++) {
      result.push(data[i].charger.power);
    }
    return result;
  }

  parseChargerConnectors(data){
    let result = [];
    var i;
    for (i=0; i<data.length; i++) {
      result.push(data[i].charger.type.connector);
    }
    return result;
  }

  parseChargerCosts(data){
    let result = [];
    var i;
    for (i=0; i<data.length; i++) {
      result.push(data[i].energyPrice);
    }
    return result;
  }

  parseDataEnergy(data){
    let labels = [];
    let series = [];
    var i;

    for (i=0; i<data.length; i++) {
      labels.push(this.parseDateDays(data[i].date));
      series.push(data[i].energySold);
    }
    return {
      labels: labels.reverse(),
      series: [series.reverse()]
    };
  }

  parseDataRevenue(data){
    let labels = [];
    let series = [];
    var i;

    for (i=0; i<data.length; i++) {
      let str = this.parseDateMonths(data[i].date);
      labels.push(str);
      series.push(data[i].revenue);
    }
    return {
      labels: labels.reverse(),
      series: [series.reverse()]
    };
  }

  parseDataBookings(data){
    let labels = [];
    let series = [];
    var i;

    for (i=0; i<data.length; i++) {
      labels.push(this.parseDateDays(data[i].date));
      series.push(data[i].numberOfBookings);
    }
    return {
      labels: labels.reverse(),
      series: [series.reverse()]
    };
  }

  parseDataChargeTime(data){
    let labels = [];
    let series = [];
    var i;

    for (i=0; i<data.length; i++) {
      labels.push(this.parseDateDays(data[i].date));
      series.push(data[i].chargeTime);
    }
    return {
      labels: labels.reverse(),
      series: [series.reverse()]
    };
  }

  parseDateDays(dateString){
    let date = new Date(dateString);
    let s1 = (date.getMonth()+1);
    let n1 = (s1 < 10 ? '0' : '') + s1;
    let s2 = date.getDate();
    let n2 = (s2 < 10 ? '0' : '') + s2;
    return n2 + "." + n1;
  }


  parseDateMonths(dateString){
    let date = new Date(dateString);
    let s1 = (date.getMonth()+1);
    let n1 = (s1 < 10 ? '0' : '') + s1;
    let s2 = date.getFullYear().toString().substring(2);
    return n1 + "." + s2;
  }

  getChargerDetails(id) {
    let token = window.localStorage['jwtToken'];
    const URL = 'http://localhost:3001/locations/' + id + '/analytics';
    return axios(URL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(response => {
      console.log(response.data);
      return {
        selectedLocationId: id,
        chargerLocation: this.parseLocation(response.data.location),
        chargerNames: this.parseChargerNames(response.data.location.chargingUnits),
        chargerLevels: this.parseChargerLevels(response.data.location.chargingUnits),
        chargerPowers: this.parseChargerPowers(response.data.location.chargingUnits),
        chargerConnectors: this.parseChargerConnectors(response.data.location.chargingUnits),
        chargerCosts: this.parseChargerCosts(response.data.location.chargingUnits),
        chargersBar: {
          names: this.parseChargerNames(response.data.location.chargingUnits),
          types: ["info", "danger", "warning"]
        },
        dataEnegry: this.parseDataEnergy(response.data.dailyStatistics),
        dataRevenue: this.parseDataRevenue(response.data.monthlyStatistics),
        dataBookings: this.parseDataBookings(response.data.dailyStatistics),
        dataChargeTime: this.parseDataChargeTime(response.data.dailyStatistics)
      };
    }).catch(error => { throw error; });
  }


}
const AnalyticsService = new AnalyticsServiceClass();
export default AnalyticsService;
