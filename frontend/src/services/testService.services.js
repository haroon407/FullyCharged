import axios from 'axios';
import HttpService from './HttpService';

class TestServiceClass {

  static baseURL() {return "http://localhost:3002/" }

  getData() {
    let token = window.localStorage['jwtToken'];
    console.log("My token: " + token);
    return HttpService.get(HttpService.apiURL() + '/booking', function onSuccess(res){
      console.log(res);
    }, function onError(error){
      console.log(error);
    });
  }

  asd(){
     return new Promise((resolve, reject) => {
         HttpService.get(this.baseURL(), function(data) {
             resolve(data);
         }, function(textStatus) {
             reject(textStatus);
         });
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
