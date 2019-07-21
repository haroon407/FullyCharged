import axios from "axios";

class VehicleModelsServiceClass {
  getVehicleModels() {
    const URL = "http://localhost:5000/vehicles/vehicletypes"; // port of backend
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
