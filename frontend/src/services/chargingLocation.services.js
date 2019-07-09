import axios from 'axios';

export class ChargingLocationService {
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