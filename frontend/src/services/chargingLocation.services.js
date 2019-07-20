import axios from 'axios';
import baseUrl from './baseUrl';

class ChargingLocationServiceClass {
    addLocation(locationObject) {
        const URL = baseUrl + '/locations/addlocation';
        return axios(URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDJmYjUyNzBjOGMzYzMzYWJmYjBlNzIiLCJpYXQiOjE1NjM0MDc2NTUsImV4cCI6MTU2MzQ5NDA1NX0.YNZXuLEwvG8Uj-y6lxwy5tIxhEBS1zK48msTmU31m14'
            },
            data: locationObject,
        }).then(response => response.data)
            .catch(error => {
                throw error;
            });
    }

    getChargerTypes() {
        const URL = baseUrl + '/locations/chargertypes';
        return axios(URL, {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDJmYjUyNzBjOGMzYzMzYWJmYjBlNzIiLCJpYXQiOjE1NjM0MDc2NTUsImV4cCI6MTU2MzQ5NDA1NX0.YNZXuLEwvG8Uj-y6lxwy5tIxhEBS1zK48msTmU31m14'
            },
        }).then(response => response.data)
            .catch(error => {
                throw error;
            });

    }

    getAllLocations() {
        const URL = baseUrl + '/locations/alllocations';
        return axios(URL, {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDJmYjUyNzBjOGMzYzMzYWJmYjBlNzIiLCJpYXQiOjE1NjM0MDc2NTUsImV4cCI6MTU2MzQ5NDA1NX0.YNZXuLEwvG8Uj-y6lxwy5tIxhEBS1zK48msTmU31m14'
            },
        }).then(response => response.data)
            .catch(error => {
                throw error;
            });

    }
}

const ChargingLocationService = new ChargingLocationServiceClass();
export default ChargingLocationService;