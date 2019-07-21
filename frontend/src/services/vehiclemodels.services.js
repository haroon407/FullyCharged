import axios from "axios";
import baseUrl from './baseUrl';

class VehicleModelsServiceClass {
  getVehicleModels() {
    const URL = baseUrl +"/vehicles/"; // port of backend
    return axios(URL, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
}

const VehicleModelsService = new VehicleModelsServiceClass();
export default VehicleModelsService;
