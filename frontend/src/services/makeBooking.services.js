import axios from 'axios';
import HttpService from '../services/HttpService';

class MakeBookingServiceClass {

  parseLocation(data){
    let location = data.address.street + ", " + data.address.postalCode + ", " +
    data.address.city + ", " + data.address.state + ", " + data.address.country
    return location;
  }

  parseChargers(data){
    let result = [];
    var i;
    for (i=0; i<data.chargingUnits.length; i++){
      if (true){
      // if (data.chargingUnits[i].status === "OK"){
        let charger = {
          id: data.chargingUnits[i]._id,
          basicBookingFee: data.basicBookingFee,
          maxAvailabilityHours: data.chargingUnits[i].maxDuration,
          power: data.chargingUnits[i].charger.power,
          cost: data.chargingUnits[i].energyPrice,
          charger: data.chargingUnits[i].name + " | " + data.chargingUnits[i].charger.power + "kW | " + data.chargingUnits[i].energyPrice + " €"
        }
        result.push(charger);
      }
    }
    return result;
  }

  getCostDetails(charger, hours, user) {
    let estimatedCharge = (Math.round(Math.min(hours * charger.power, user.vehicleModel.batteryCapacity) * 100) / 100);
    let basicBookingFee = (charger.basicBookingFee);
    let estimatedChargingCost = (Math.round(estimatedCharge * charger.cost * 100) / 100);
    let volumeFee = (Math.round(((estimatedChargingCost * user.volumeFeePrecentage) / 100) * 100) / 100);
    let estimatedTotalCost = (basicBookingFee + estimatedChargingCost + volumeFee).toFixed(2);
    let result = {
      estimatedCharge: estimatedCharge,
      basicBookingFee: basicBookingFee,
      estimatedChargingCost: estimatedChargingCost,
      volumeFee: volumeFee,
      estimatedTotalCost: estimatedTotalCost
    };
    return result;
  }

  getData() {
    let token = window.localStorage['jwtToken'];
    console.log("Searching..");
    const URL = HttpService.apiURL() + '/locations/search?sw=48.25653029401251,11.633186874796593&ne=48.27181450576806,11.713309822489464&startDate=2019-07-21&startTime=10&price=0.34';
    return axios(URL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(response => {
      let data = response.data[0];
      console.log(data);
      let location = this.parseLocation(data);
      let date = "TODO: Get date";
      let startTime = "TODO: Get available start time";
      let chargers = this.parseChargers(data);
      // TODO: Get first element
      let result = {
        chargingLocation: location,
        chargerTypes: chargers,
        date: date,
        startTime: startTime,
        defaultHours: 1
      };
      return result;
    }).catch(error => {
      console.log("Error: " + error);
      throw error;
    });
  }

  makeBooking(id) {
    let token = window.localStorage['jwtToken'];
    const URL = HttpService.apiURL();
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

}

const MakeBookingService = new MakeBookingServiceClass();
export default MakeBookingService;
