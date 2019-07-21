import axios from 'axios';
import baseUrl from './baseUrl';

class ChargingLocationServiceClass {
    addLocation(locationObject, user) {
        const URL = baseUrl + '/locations/addlocation';
        locationObject.owner = user.user.id;
        return axios(URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': user.token
            },
            data: locationObject,
        }).then(response => response.data)
            .catch(error => {
                throw error;
            });
    }

    getChargerTypes(user) {
        const URL = baseUrl + '/locations/chargertypes';
        return axios(URL, {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                'Authorization': user.token
            },
        }).then(response => response.data)
            .catch(error => {
                throw error;
            });

    }

    getAllLocations(user) {
        const URL = baseUrl + '/locations/alllocations/' + user.user.id;
        return axios(URL, {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                'Authorization': user.token
            },
        }).then(response => response.data)
            .catch(error => {
                throw error;
            });

    }

    updateLocation(locationObject, user) {
        const URL = baseUrl + '/locations/';
        return axios(URL, {
            method: 'Put',
            headers: {
                'content-type': 'application/json',
                'Authorization': user.token
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