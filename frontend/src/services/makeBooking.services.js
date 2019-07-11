import axios from 'axios';

class MakeBookingServiceClass {

    makeBooking() {
        const URL = 'http://localhost:3001/test';
        return axios(URL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            data: null,
        }).then(response => {
          return response.data;
        })
            .catch(error => {
                throw error;
            });
    }
}
const MakeBookingService = new MakeBookingServiceClass();
export default MakeBookingService;
