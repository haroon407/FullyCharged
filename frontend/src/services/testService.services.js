import axios from 'axios';
import HttpService from './HttpService';

class TestServiceClass {

  static baseURL() {return "http://localhost:3001/" }

  addLocation(locationObject) {
      return axios(this.baseURL(), {
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

    static testGet(){
       return new Promise((resolve, reject) => {
           HttpService.get(this.baseURL(), function(data) {
               resolve(data);
           }, function(textStatus) {
               reject(textStatus);
           });
       });
    }
}
const TestService = new TestServiceClass();
export default TestServiceClass;
