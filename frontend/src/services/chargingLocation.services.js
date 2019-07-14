import axios from 'axios';

class ChargingLocationServiceClass {
    addLocation(locationObject) {
        const URL = 'http://localhost:3200/addlocation';
        return axios(URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            data: locationObject,
        }).then(response => response.data)
            .catch(error => {
                throw error;
            });
    }
}
const ChargingLocationService = new ChargingLocationServiceClass();
export default ChargingLocationService;